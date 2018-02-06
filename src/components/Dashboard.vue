<template>
  <div id="dashboard">
    <dashboard-nav class="dashboard-nav" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import DashboardNav from './DashboardNav.vue'

export default {
  created: () => {
    this.refreshToken = Cookies.get('refreshToken')
    this.accessToken = Cookies.get('accessToken')
  },
  components: {
    DashboardNav
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
