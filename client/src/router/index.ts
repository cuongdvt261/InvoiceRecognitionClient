import store from '@/store'
import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const ifNotAuthenticated = (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home Page - Invoice Recognation System'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
    meta: {
      title: 'Login Page - Invoice Recognation System'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   ifAuthenticated(to, from, next)
// })

export default router
