import store from '@/store'
import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const ifAuthenticated = (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (to.path !== '/login') {
    next('/login')
  } else {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
      document.title = nearestWithTitle.meta.title
    }
    next()
  }
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
    component: () => import('@/views/Login.vue'),
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

router.beforeEach((to, from, next) => {
  ifAuthenticated(to, from, next)
})

export default router
