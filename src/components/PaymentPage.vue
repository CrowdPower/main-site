<template>
  <div id="payment">
    <dashboard-nav class="dashboard-nav" selected="payment"/>
    <loading-icon id="loader" v-if="!user && !err" />
    <p class="error" v-if="err">{{ err }}</p>
    <div class="user-info" v-if="user">
      <p class="balance">{{ user.balance }}</p>
      <h3 class="subtitle">Account Balance</h3>
    </div>
    <payment-maker id="payment-maker" v-if="user && !err" v-on:update="getUser"
      :username="user.username" :prefillUrl="prefillUrl" :prefillAmount="prefillAmount" />
  </div>
</template>

<script>
import Utils from './Utils.js'
import Cookies from 'js-cookie'
import DashboardNav from './DashboardNav.vue'
import LoadingIcon from './LoadingIcon.vue'
import PaymentMaker from './PaymentMaker.vue'

export default {
  created () {
    this.getUser()
    this.prefillAmount = this.$route.query.amount || 0
    this.prefillUrl = this.$route.query.url || ''
  },
  data () {
    return {
      user: undefined,
      err: '',
      prefillAmount: 0,
      prefillUrl: ''
    }
  },
  components: {
    DashboardNav,
    LoadingIcon,
    PaymentMaker
  },
  methods: {
    getUser () {
      Utils.get(Utils.makeAbsolute('/v1/users/' + Cookies.get('username'))).then(response => {
        this.user = response.data
      }).catch(err => {
        if (err.response.data.error.code === 404) {
          Utils.clearData()
        }
        console.log(err)
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

#payment-maker {
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
