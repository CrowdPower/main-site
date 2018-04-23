<template>
  <div id="payment">
    <dashboard-nav class="dashboard-nav" selected="deposit"/>
    <loading-icon id="loader" v-if="!user && !err" />
    <p class="error" v-if="err">{{ err }}</p>
    <div class="user-info" v-if="user">
      <p class="balance">{{ user.balance }}</p>
      <h3 class="subtitle">Account Balance</h3>
    </div>
    <deposit-maker id="deposit-maker" v-if="user && !err" v-on:update="getUser" :username="user.username" />
  </div>
</template>

<script>
import Utils from './Utils.js'
import Cookies from 'js-cookie'
import DashboardNav from './DashboardNav.vue'
import LoadingIcon from './LoadingIcon.vue'
import DepositMaker from './DepositMaker.vue'

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
    LoadingIcon,
    DepositMaker
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

.subtitle {
  font-size: 1.5em;
  margin-top: 0;
}

.balance {
  font-size: 8em;
  font-weight: bold;
  margin: 0;
  line-height: 1;
}
</style>
