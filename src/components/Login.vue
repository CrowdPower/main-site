<template>
  <div id="login">
    <main-nav class="main-nav" selected="sign-in"/>
    <sign-in id="sign-in"/>
  </div>
</template>

<script>
import MainNav from './MainNav.vue'
import SignIn from './SignIn.vue'

export default {
  components: {
    MainNav,
    SignIn
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
#login {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -16px;
  justify-content: center;
}

#intro {
  margin-right: 16px;
  width: 400px;
}

#sign-in {
  margin-right: 16px;
  width: 400px;
}

h1 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 3em;
  margin-right: 16px;
}

.power {
  color: #B9BABB;
}

p.tagline {
  font-size: 1.5em;
  color: #B9BABB;
  margin-top: 0;
  margin-right: 16px;
}
</style>
