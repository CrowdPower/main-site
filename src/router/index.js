import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Cookies from 'js-cookie'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

function isAuthenticated () {
  return Cookies.get('refreshToken') && Cookies.get('accessToken')
}

let authProtected = ['dashboard']
let redirectToDashboard = ['', 'login']

router.beforeEach((to, from, next) => {
  let path = to.path.split('/')[1]
  if (isAuthenticated()) {
    if (redirectToDashboard.includes(path)) {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  } else if (authProtected.includes(path)) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
