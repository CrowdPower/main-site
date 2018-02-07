<template>
<nav>
  <a href="/#/dashboard"><img src="/static/icon.png" class="icon"></a>
  <button @click="logOut">Sign Out</button>
</nav>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  methods: {
    logOut: function () {
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

nav button {
  margin-left: 8px;
  margin-right: 8px;
  color: #FFF;
  transition: 0.2s;
  background: none;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0;
}

nav button:hover {
  color: #B9BABB;
}
</style>
