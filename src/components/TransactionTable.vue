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
          <td v-for="column in columns" :key="column">{{row[column]}}</td>
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
        this.$emit('moreData')
      } else {
        this.pageContent = this.content.slice(pageStart, pageStart + this.pageSize)
        // pad with empty items so the table always has the same row count
        while (this.pageContent.length < this.pageSize) {
          this.pageContent.push({})
        }
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

#transactions {
  border-radius: 3px;
  border: 2px solid #4A5056;
  margin-bottom: 16px;
  width: 100%;
  background-color: #4A5056;
}

#transactions th {
  padding: 8px;
  font-size: 1.2em;
}

#transactions tr {
  background-color: #4A5056;
  height: 2.5em;
}

#transactions tr:nth-child(odd) {
  background-color: #6A6D71;
  border-radius: 4px;
}

#transactions td {
  padding: 8px;
}

#transactions td:empty {
  background-color: #4A5056;
}

</style>
