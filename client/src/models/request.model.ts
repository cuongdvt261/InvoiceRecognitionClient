import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class Request {
  baseUrl: string
  isRefreshing: boolean
  failedRequests: []
  client: AxiosInstance

  constructor() {
    this.baseUrl = process.env.VUE_APP_SERVER_URL || 'localhost:3000'
    this.isRefreshing = false;
    this.failedRequests = [];
    this.tokenService = new TokenService();
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        clientSecret: this.clientSecret,
      },
    });
    this.beforeRequest = this.beforeRequest.bind(this);
    this.onRequestFailure = this.onRequestFailure.bind(this);
    this.processQueue = this.processQueue.bind(this);
    this.client.interceptors.request.use(this.beforeRequest);
    this.client.interceptors.response.use(this.onRequestSuccess, this.onRequestFailure);
  }

  beforeRequest(request: AxiosRequestConfig) {
    const token = TokenService.getAccessToken();
    request.headers.defaults['x-access-token'] = token
    return request;
  }

  static onRequestSuccess(response: AxiosResponse) {
    return response.data;
  }

  async onRequestFailure(err: AxiosError) {
    const { response } = err;
    if (response!.status === 401 && err && err.config && !err.config.__isRetryRequest) {
      if (this.isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            this.failedRequests.push({ resolve, reject });
          });
          err.config.headers.Authorization = `Bearer ${token}`;
          return this.client(err.config);
        }
        catch (e) {
          return e;
        }
      }
      this.isRefreshing = true;
      err.config.__isRetryRequest = true;
      return new Promise((resolve, reject) => {
        this.tokenService.refreshAccessToken().then((token) => {
          this.tokenService.setAccessToken(token);
          err.config.headers.Authorization = `Bearer ${token}`;
          this.isRefreshing = false;
          this.processQueue(null, token);
          resolve(this.client(err.config));
        }).catch((e) => {
          this.processQueue(e, null);
          reject(err.response);
        });
      });
    }
    throw response;
  }

  processQueue(error, token = null) {
    this.failedRequests.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedRequests = [];
  }

}