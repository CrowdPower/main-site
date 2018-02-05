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
    if (!(this.refreshToken && this.accessToken)) {
      this.$router.push('/login')
    }
    console.log(this.accessToken)
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
