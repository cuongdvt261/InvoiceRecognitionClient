import axios from 'axios'

export default class RecogniteService {
  public async upload (files: any, token: string) {
    const formData = new FormData()
    formData.append('image', files[0])
    const res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/recognite`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return await res.data
  }

  public async selectAllRecogByUser (token: string) {
    const res = await axios.get(`${process.env.VUE_APP_SERVER_URL}/api/recognite/all`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await res.data
  }
}
