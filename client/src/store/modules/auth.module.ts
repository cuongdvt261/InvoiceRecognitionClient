import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REQUEST_ACTION,
  AUTH_LOGOUT_ACTION
} from '../actions/auth'
import Constants from '@/helper/constants'
import UserService from '@/services/user.service'
import { ReturnCode } from '@/helper/enums.helper'
import axios from 'axios'

@Module
export default class AuthModule extends VuexModule {
  status = ''
  token = localStorage.userSessionInfo ? JSON.parse(localStorage.userSessionInfo)[Constants.TAG_TOKEN] : ''
  hasLoadedOnce = false

  @Mutation
  [AUTH_REQUEST] () {
    this.status = 'loading'
  }

  @Mutation
  [AUTH_SUCCESS] (resp: any) {
    this.status = 'success'
    console.log('resp.token: ' + JSON.stringify(resp.token))
    this.token = resp.token
  }

  @Mutation
  [AUTH_ERROR] () {
    this.status = 'error'
    this.token = ''
  }

  @Mutation
  [AUTH_LOGOUT] () {
    this.token = ''
  }

  @Action
  [AUTH_REQUEST_ACTION] (payload: any) {
    const userService = new UserService()
    userService.login(payload.username, payload.password)
      .then(res => {
        if (res.status === ReturnCode.Success) {
          const userSessionInfo = {
            [Constants.TAG_TOKEN]: res[Constants.TAG_TOKEN]
          }
          localStorage.setItem('userSessionInfo', JSON.stringify(userSessionInfo))
          axios.defaults.headers.common['x-access-token'] = res[Constants.TAG_TOKEN]
          this.context.commit(AUTH_SUCCESS, userSessionInfo)
        }
      })
      .catch(err => {
        this.context.commit(AUTH_ERROR, err)
        localStorage.removeItem('userSessionInfo')
      })
  }

  @Action({ commit: AUTH_LOGOUT })
  [AUTH_LOGOUT_ACTION] () {
    localStorage.removeItem('userSessionInfo')
  }

  get isAuthenticated () {
    return !!this.token
  }

  get authStatus () {
    return this.status
  }
}
