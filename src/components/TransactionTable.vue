<template>
  <div id="transaction-table">
    <loading-icon v-if="pageContent.length < pageSize && moreContent" />
    <p v-if="pageContent.length === 0 && !moreContent">No Content</p>
    <table id="transactions" v-if="pageContent.length !== 0">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in pageContent" :key="row.id">
          <td v-for="column in columns" :key="column">
            {{row[column]}}
          </td>
        </tr>
      </tbody>
    </table>
    <button class="text-button" @click="nextPage" :disabled="!moreContent && content.length <= currentPage * pageSize">Next</button>
    <button class="text-button" @click="previousPage" :disabled="currentPage === 1">Previous</button>
  </div>
</template>

<script>
import LoadingIcon from './LoadingIcon.vue'

export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    content: {
      type: Array,
      default: () => []
    },
    moreContent: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      currentPage: 1,
      pageContent: []
    }
  },
  components: {
    LoadingIcon
  },
  methods: {
    getPage () {
      this.pageContent = []
      let pageStart = (this.currentPage - 1) * this.pageSize
      if (this.moreContent && pageStart + this.pageSize < this.content.length) {
        console.log('getting more data')
        this.$emit('moreData')
      } else {
        console.log('page start is ' + pageStart)
        console.log('content is ' + this.content)
        this.pageContent = this.content.slice(pageStart, pageStart + this.pageSize)
      }
    },
    nextPage () {
      if (this.moreContent || this.content.length > this.currentPage * this.pageSize) {
        this.currentPage++
        this.getPage()
      }
    },
    previousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.getPage()
      }
    }
  },
  created () {
    this.getPage()
  },
  watch: {
    content () {
      this.getPage()
    }
  }
}
</script>

<style scoped>
.text-button {
  float: right;
}

#transaction-table {
  display: block;
  width: 100%;
}

.transactions {
  min-width: 200px;
  max-width: 300px;
}
</style>
