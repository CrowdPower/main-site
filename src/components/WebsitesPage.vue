<template>
  <div id="payment">
    <dashboard-nav class="dashboard-nav" selected="websites"/>
    <loading-icon id="loader" v-if="!user && !err" />
    <p class="error" v-if="err">{{ err }}</p>
    <ul v-if="user && user.websites && user.websites.length !== 0">
      ...
    </ul>
    <p v-if="!user.websites || user.websites.length === 0">
      No configured websites. Add your website here (add a link at some point)
    </p>
  </div>
</template>

<script>
import Utils from './Utils.js'
import Cookies from 'js-cookie'
import DashboardNav from './DashboardNav.vue'
import LoadingIcon from './LoadingIcon.vue'

export default {
  created () {
    this.getUser()
  },
  data () {
    return {
      user: undefined,
      err: ''
    }
  },
  components: {
    DashboardNav,
    LoadingIcon
  },
  methods: {
    getUser () {
      Utils.get(Utils.makeAbsolute('/v1/users/' + Cookies.get('username'))).then(response => {
        this.user = response.data
      }).catch(err => {
        if (err.response.data.error.code === 404) {
          Utils.clearData()
        }
        this.err = 'Could not authenticate with server'
      })
    }
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

#deposit-maker {
  margin: auto;
}

.error {
  margin: 16px;
  font-size: 1.2em;
}
</style>
