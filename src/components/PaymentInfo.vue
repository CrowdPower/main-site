<template>
  <div id="info" class="box">
    <h3>Payments</h3>
    <button id="refresh" class="text-button" @click="refresh" :disabled="gettingData">&#x21bb;</button>
    <loading-icon class="small-loader" v-if="!username && !err"></loading-icon>
    <p class="error" v-if="err">{{ err }}</p>
    <!-- '&& true' makes moreContent a boolean -->
    <transaction-table
      :columns="['url', 'amount', 'time']"
      :content="this.payments"
      :moreContent="this.nextPayments && true"
      v-on:moreData="moreData"
    />
  </div>
</template>

<script>
import Utils from './Utils.js'
import LoadingIcon from './LoadingIcon.vue'
import TransactionTable from './TransactionTable.vue'

export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      err: '',
      payments: [],
      nextPayments: Utils.makeAbsolute('/v1/users/' + this.username + '/payments'),
      gettingData: false
    }
  },
  components: {
    LoadingIcon,
    TransactionTable
  },
  created () {
    this.moreData()
  },
  methods: {
    moreData () {
      if (this.gettingData) {
        return
      }
      this.gettingData = true
      Utils.get(this.nextPayments).then(response => {
        this.payments = this.payments.concat(response.data)
        this.nextPayments = response.nextLink
        this.gettingData = false
      }).catch(err => {
        this.err = 'Error getting payments'
        console.log(err)
        this.gettingData = false
      })
    },
    refresh () {
      this.nextPayments = Utils.makeAbsolute('/v1/users/' + this.username + '/payments')
      this.payments = []
      this.moreData()
    }
  }
}
</script>

<style scoped>
h3 {
  display: block;
  float: left;
  margin: 0;
  margin-bottom: 8px;
}

#info {
  min-width: 400px;
  max-width: 600px;
}

.error {
  margin: 16px;
  font-size: 1.2em;
}

#refresh {
  float: right;
}
</style>
