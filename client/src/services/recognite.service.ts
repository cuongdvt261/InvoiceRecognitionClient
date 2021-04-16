import axios from 'axios'

export default class RecogniteService {
  private BASE_URL = 'http://localhost:3000'

  public async upload (files: any, token: string) {
    const formData = new FormData()
    formData.append('image', files[0])
    const res = await axios.post(`${this.BASE_URL}/api/recognite`, formData, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data'
      }
    })
    return await res.data
  }

  public async selectAllRecogByUser (token: string) {
    const res = await axios.get(`${this.BASE_URL}/api/recognite/all`, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'text/html'
      }
    })
    return await res.data
  }
}
