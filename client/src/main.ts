import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import dotenv from 'dotenv'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import Constants from './helper/constants'

dotenv.config({ path: `${__dirname}/.env` })

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Auto authentication
const token = localStorage.getItem('userSessionInfo')
console.log('token: ' + token)
if (token) {
  axios.defaults.headers.common['x-access-token'] = JSON.parse(token)[Constants.TAG_TOKEN]
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
