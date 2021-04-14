import Vue from 'vue'
import Vuex from 'vuex'

import Constants from '@/helper/constants'
import UserService from '@/services/user.service'
import { ReturnCode } from '@/helper/enums.helper'
import { AUTH_SUCCESS } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.userSessionInfo !== undefined ? JSON.parse(localStorage.userSessionInfo)[Constants.TAG_TOKEN] : '',
    groupuser: localStorage.userSessionInfo !== undefined ? JSON.parse(localStorage.userSessionInfo)[Constants.TAG_GROUP] : 0
  },
  mutations: {
    [AUTH_SUCCESS]: (state, payload) => {
      state.token = payload[Constants.TAG_TOKEN]
      state.groupuser = payload[Constants.TAG_GROUP]
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit, dispatch }, payload) => {
      const userService = new UserService()
      userService.login(payload.username, payload.password).then(response => {
        if (response === ReturnCode.Success) {
          const userSessionInfo = {
            [Constants.TAG_TOKEN]: response[Constants.TAG_CONTENT][Constants.TAG_TOKEN],
            [Constants.TAG_GROUP]: response[Constants.TAG_CONTENT][Constants.TAG_GROUP]
          }
          localStorage.setItem('userSessionInfo', JSON.stringify(userSessionInfo))
          commit(AUTH_SUCCESS, userSessionInfo)
        }
      })
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
})
