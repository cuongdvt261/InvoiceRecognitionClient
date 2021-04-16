import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.module'
import user from './modules/user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user
  }
})
