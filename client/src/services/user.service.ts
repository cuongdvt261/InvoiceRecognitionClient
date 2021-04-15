import axios from 'axios'

import Constants from '@/helper/constants'

export default class ProcessService {
  private BASE_URL = 'http://localhost:3000'

  public async login (username: string, password: string): Promise<any> {
    const reqObj = {
      [Constants.TAG_USERNAME]: username,
      [Constants.TAG_PASSWORD]: password
    }
    const res = await axios.post(`${this.BASE_URL}/api/auth`, reqObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await res.data
  }

  public async register (username: string, password: string, name: string): Promise<any> {
    const reqObj = {
      [Constants.TAG_USERNAME]: username,
      [Constants.TAG_PASSWORD]: password,
      [Constants.TAG_NAME]: name
    }
    const res = await axios.post(`${this.BASE_URL}/api/user/register`, reqObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await res.data
  }
}
