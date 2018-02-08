<template>
  <div id="dashboard">
    <dashboard-nav class="dashboard-nav" />
    <loading-icon id="loader" v-if="!user && !err" />
    <p class="error" v-if="err">{{ err }}</p>
    <div id="panes">
      <account-info v-if="user && !err" :user="user" />
      <deposit-maker v-if="user && !err" :user="user" />
    </div>
  </div>
</template>

<script>
import Utils from './Utils.js'
import Cookies from 'js-cookie'
import DashboardNav from './DashboardNav.vue'
import LoadingIcon from './LoadingIcon.vue'
import AccountInfo from './AccountInfo.vue'
import DepositMaker from './DepositMaker.vue'

export default {
  created () {
    Utils.get('/users/' + Cookies.get('username')).then(user => {
      this.user = user
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
    LoadingIcon,
    AccountInfo,
    DepositMaker
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

#panes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -16px;
  justify-content: center;
}

#panes * {
  margin: 16px;
  display: inline-block;
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
