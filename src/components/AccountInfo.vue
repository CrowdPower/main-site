<template>
  <div id="info">
    <p id="balance">{{ user.balance }}</p>
    <loading-icon id="loader" v-if="!user && !err"></loading-icon>
    <p class="error" v-if="err">{{ err }}</p>
  </div>
</template>

<script>
import Utils from './Utils.js'
import LoadingIcon from './LoadingIcon.vue'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created () {
    Utils.get('/users/' + this.user.username).then(user => {
      console.log(user)
    }).catch(err => {
      console.log(err)
    })
  },
  data: () => {
    return {
      err: ''
    }
  },
  components: {
    LoadingIcon
  }
}
</script>

<style scoped>
#info {
  min-width: 400px;
  display: flex;
}

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
