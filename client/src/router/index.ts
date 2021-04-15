import store from '@/store'
import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const ifAuthenticated = (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (to.path !== '/login' && !store.getters.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && store.getters.isAuthenticated) {
    next('/about')
  } else {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title
    next()
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '*'
  },
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
    meta: {
      title: 'Login Page - Invoice Recognation System'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Page - Invoice Recognation System'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  ifAuthenticated(to, from, next)
})

export default router
