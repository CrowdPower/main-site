<template>
  <div id="dashboard">
    <dashboard-nav class="dashboard-nav" />
    <loading-icon id="loader" v-if="!user && !err"></loading-icon>
    <p class="error" v-if="err">{{ err }}</p>
  </div>
</template>

<script>
import Utils from './Utils.js'
import Cookies from 'js-cookie'
import DashboardNav from './DashboardNav.vue'
import LoadingIcon from './LoadingIcon.vue'

export default {
  created () {
    Utils.get('/users/' + Cookies.get('username')).then(user => {
      this.user = user
      console.log(this.user)
    }).catch(err => {
      console.log(err)
      this.err = 'Could not authenticate with server'
    })
  },
  data: () => {
    return {
      user: undefined,
      err: ''
    }
  },
  components: {
    DashboardNav,
    LoadingIcon
  }
}
</script>

<style scoped>
#loader {
  margin: auto;
  margin-top: 32px;
  margin-bottom: 32px;
  width: 64px;
  height: 64px;
}

.error {
  margin: 16px;
  font-size: 1.2em;
}
</style>
