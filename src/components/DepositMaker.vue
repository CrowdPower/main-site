<template>
  <form @submit.prevent="makeDeposit">
    <p class="error">{{ err }}</p>
    <input type="number" name="amount" v-model="amount" placeholder="amount" min="0">
    <button>Make Deposit</button>
  </form>
</template>

<script>
import Utils from './Utils.js'

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
  methods: {
    makeDeposit: function () {
      this.err = ''
      let toSend = parseInt(this.amount)
      this.amount = 0
      Utils.post(Utils.makeAbsolute('/v1/users/' + this.username + '/deposit'), { amount: toSend })
        .then(response => {
          this.$emit('update')
        })
        .catch(err => {
          this.err = 'Error making deposit: ' + err.response.data.error.message
          console.log(err)
          this.$emit('update')
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
  width: auto;
}

input {
  font-size: 1.75em;
}
</style>
