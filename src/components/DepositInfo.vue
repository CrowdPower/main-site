<template>
  <div id="info" class="box">
    <h3>Deposits</h3>
    <button id="refresh" class="text-button" @click="refresh" :disabled="gettingData">&#x21bb;</button>
    <loading-icon class="small-loader" v-if="!username && !err"></loading-icon>
    <p class="error" v-if="err">{{ err }}</p>
    <!-- '&& true' makes moreContent a boolean -->
    <transaction-table
      :columns="['amount', 'time']"
      :content="this.deposits"
      :moreContent="this.nextDeposits && true"
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
      deposits: [],
      nextDeposits: Utils.makeAbsolute('/v1/users/' + this.username + '/deposits'),
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
      Utils.get(this.nextDeposits).then(response => {
        this.deposits = this.deposits.concat(response.data)
        this.nextDeposits = response.nextLink
        this.gettingData = false
      }).catch(err => {
        this.err = 'Error getting deposits'
        console.log(err)
        this.gettingData = false
      })
    },
    refresh () {
      this.nextDeposits = Utils.makeAbsolute('/v1/users/' + this.username + '/deposits')
      this.deposits = []
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
