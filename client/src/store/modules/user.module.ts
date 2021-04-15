import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import {
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  USER_REQUEST_ACTION,
  USER_REGISTER_ACTION
} from '../actions/user'
import UserService from '@/services/user.service'
import { ReturnCode } from '@/helper/enums.helper'
import Constants from '@/helper/constants'

@Module
export default class UserModule extends VuexModule {
  status = ''
  profile = {}

  @Mutation
  [USER_REQUEST] () {
    this.status = 'loading'
  }

  @Mutation
  [USER_SUCCESS] (resp: any) {
    this.status = 'success'
    Vue.set(this, 'profile', resp)
  }

  @Mutation
  [USER_ERROR] () {
    this.status = 'error'
  }

  @Mutation
  [AUTH_LOGOUT] () {
    this.profile = {}
  }

  @Action({ commit: USER_REQUEST })
  [USER_REGISTER_ACTION] (payload: any) {
    const userService = new UserService()
    userService.register(payload.username, payload.password, payload.name)
      .then(res => {
        if (res.status === ReturnCode.Success) {
          const userSessionInfo = {
            [Constants.TAG_TOKEN]: res[Constants.TAG_TOKEN]
          }
          console.log(JSON.stringify(userSessionInfo))
          localStorage.setItem('userSessionInfo', JSON.stringify(userSessionInfo))
          return userSessionInfo
        }
      })
      .catch(err => {
        this.context.commit(USER_ERROR, err)
        localStorage.removeItem('userSessionInfo')
      })
  }
}
