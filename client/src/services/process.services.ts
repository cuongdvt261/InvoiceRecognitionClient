import axios from 'axios'

export default class ProcessService {
  private BASE_URL = 'http://localhost:3000'

  public async upload (files: any) {
    const formData = new FormData()
    formData.append('image', files[0])
    const res = await axios.post(`${this.BASE_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return await res.data
  }

  public async results () {
    const res = await axios.get(`${this.BASE_URL}/api/results`)
    return await res.data.result
  }
}
