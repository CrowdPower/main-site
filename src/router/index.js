import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Login from '@/components/LoginPage'
import History from '@/components/HistoryPage'
import Payment from '@/components/PaymentPage'
import Deposit from '@/components/DepositPage'
import Websites from '@/components/WebsitesPage'
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
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/deposit',
      name: 'Deposit',
      component: Deposit
    },
    {
      path: '/websites',
      name: 'Websites',
      component: Websites
    }
  ]
})

function isAuthenticated () {
  return Cookies.get('refreshToken') && Cookies.get('accessToken') && Cookies.get('username')
}

let authProtected = ['payment', 'deposit', 'history', 'websites']
let redirectToDashboard = ['', 'login']

router.beforeEach((to, from, next) => {
  let path = to.path.split('/')[1]
  if (isAuthenticated()) {
    if (redirectToDashboard.includes(path)) {
      next({ path: '/payment' })
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
