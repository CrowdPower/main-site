<template>
  <div id="dashboard">
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  created: () => {
    this.refreshToken = Cookies.get('refreshToken')
    this.accessToken = Cookies.get('accessToken')
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
