<template>
  <form class="box" @submit.prevent="makePayment">
    <p class="error">{{ err }}</p>
    <input type="number" name="amount" v-model="amount" placeholder="amount" min="0">
    <input type="url" name="url" v-model="url" placeholder="url">
    <button>Payment</button>
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
      url: '',
      err: ''
    }
  },
  components: {
    LoadingIcon
  },
  methods: {
    makePayment: function () {
      this.err = ''
      let toSend = parseInt(this.amount)
      let toUrl = this.url
      this.amount = 0
      this.url = ''
      Utils.post(Utils.makeAbsolute('/v1/users/' + this.username + '/payment'), { amount: toSend, url: toUrl }).catch(err => {
        this.err = 'Error making payment'
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
