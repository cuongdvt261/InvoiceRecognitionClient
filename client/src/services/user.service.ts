import axios from 'axios'

import Constants from '@/helper/constants'

export default class ProcessService {
  private BASE_URL = 'http://localhost:3000'

  public async login (username: string, password: string): Promise<any> {
    const formData = new FormData()
    formData.append(Constants.TAG_USERNAME, username)
    formData.append(Constants.TAG_PASSWORD, password)
    const res = await axios.post(`${this.BASE_URL}/api/login`, formData, {
      headers: {
        'Content-Type': 'application/javascript'
      }
    })
    return await res.data
  }

  public async results () {
    const res = await axios.get(`${this.BASE_URL}/api/results`)
    return await res.data.result
  }
}
