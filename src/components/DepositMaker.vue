<template>
  <form class="box" @submit.prevent="makeDeposit">
    <p class="error">{{ err }}</p>
    <input type="number" name="amount" v-model="amount">
    <button>Deposit</button>
  </form>
</template>

<script>
import Utils from './Utils.js'
import LoadingIcon from './LoadingIcon.vue'

export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      amount: 0,
      err: ''
    }
  },
  components: {
    LoadingIcon
  },
  methods: {
    makeDeposit: function () {
      let toSend = parseInt(this.amount)
      this.amount = 0
      Utils.post(Utils.makeAbsolute('/v1/users/' + this.username + '/deposit'), { amount: toSend }).catch(err => {
        this.err = 'Error making deposit'
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
form {
  min-width: 200px;
  max-width: 300px;
}

.error {
  margin-bottom: 16px;
  font-size: 1.2em;
}

input {
  float: right;
  display: block;
  width: 99%;
}

button {
  float: right;
}
</style>
