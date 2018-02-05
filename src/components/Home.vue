<template>
  <div id="home">
    <main-nav class="main-nav" selected="sign-up"/>
    <div id="intro">
      <h1><span class="crowd">Crowd</span><span class="power">Power</span></h1>
      <p class="tagline">Supporting the websites you love and the people behind them</p>
    </div>
    <sign-up id="sign-up"/>
  </div>
</template>

<script>
import MainNav from './MainNav.vue'
import SignUp from './SignUp.vue'

export default {
  components: {
    MainNav,
    SignUp
  },
  data () {
    return {
      msg: process.env.NODE_ENV
    }
  }
}
</script>

<style scoped>
#home {
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

#sign-up {
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
