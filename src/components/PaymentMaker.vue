<template>
  <form @submit.prevent="makePayment">
    <p class="error">{{ err }}</p>
    <input type="number" name="amount" v-model="amount" placeholder="amount" min="0">
    <input type="url" name="url" v-model="url" placeholder="url">
    <button>Pay Website</button>
  </form>
</template>

<script>
import Utils from './Utils.js'

export default {
  props: {
    username: {
      type: String,
      required: true
    },
    prefillUrl: {
      type: String,
      required: false
    },
    prefillAmount: {
      required: false
    }
  },
  data () {
    return {
      amount: this.prefillAmount || 0,
      url: this.prefillUrl || '',
      err: ''
    }
  },
  methods: {
    makePayment: function () {
      this.err = ''
      let toSend = parseInt(this.amount)
      let toUrl = this.url
      this.amount = 0
      this.url = ''
      Utils.post(Utils.makeAbsolute('/v1/users/' + this.username + '/payment'), { amount: toSend, url: toUrl })
        .then(() => {
          this.$emit('update')
        })
        .catch(err => {
          this.err = 'Error making payment: ' + err.response.data.error.message
          console.log(err)
          this.$emit('update')
        })
    }
  }
}
</script>

<style scoped>
form {
  min-width: 300px;
  max-width: 400px;
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

input {
  font-size: 1.75em;
}
</style>
