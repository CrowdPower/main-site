<template>
<nav>
  <a href="/#/payment"><img src="/static/icon.png" class="icon"></a>
  <a href="/#/payment" :class="[selected === 'payment' ? 'selected' : '', 'text-button']">Payment</a>
  <a href="/#/deposit" :class="[selected === 'deposit' ? 'selected' : '', 'text-button']">Deposit</a>
  <a href="/#/history" :class="[selected === 'history' ? 'selected' : '', 'text-button']">History</a>
  <button class="text-button" @click="logOut">Sign Out</button>
</nav>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  props: {
    selected: String
  },
  methods: {
    logOut () {
      Cookies.remove('refreshToken')
      Cookies.remove('accessToken')
      Cookies.remove('username')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
nav .icon {
  width: 35px;
  height: 35px;
  margin-right: auto;
}

nav a {
  margin-left: 8px;
  margin-right: 8px;
  color: #FFF;
  transition: 0.2s;
}

nav :nth-child(2) {
  margin-left: auto;
}
</style>
