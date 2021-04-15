import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './modules/auth.module'
import UserModule from './modules/user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AuthModule,
    UserModule
  }
})
