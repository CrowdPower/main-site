<template>
  <div id="info" class="box">
    <loading-icon id="loader" v-if="!username && !err"></loading-icon>
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
        console.log('got response ')
        console.log(response)
        this.deposits = this.deposits.concat(response.data)
        this.nextDeposits = response.nextLink
        this.gettingData = false
      }).catch(err => {
        this.err = 'Error getting deposits'
        console.log(err)
        this.gettingData = false
      })
    }
  }
}
</script>

<style scoped>
#info {
  min-width: 400px;
  max-width: 600px;
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
