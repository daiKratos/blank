<template lang="pug">
  .home-con
    .search-con
      Input(placeholder="数据库查询语句", style="width: 300px")
      Button(type="primary") 查询
    .body-con
      tableView(:data='tableData',ref='tabView', @changeTabData='changeTabData')
      whereView(:whereData='whereData',:selectedTabName='selectedTabName', :selectField='selectField', ref='whereView')
    Button(type='primary', @click='handleStatement') 查看
</template>

<script>
// @ is an alias to /src
import tableView from './children/tableView'
import whereView from './children/where'
import testData from './test.json'
// import axios from 'axios'
export default {
  name: 'home',
  components: {
    tableView,
    whereView
  },
  wt
  data() {
    return {
      tableData: [],
      whereData: [],
      whereConditions: '',
      selectedTabName: [],
      selectField:''
    }
  },
  methods: {
    changeTabData(value) {
      this.whereData = []
      this.selectedTabName = value
      if (value.length === 1) this.whereData = this.tableData[`${value[0]}Field`]
      else if (value.length === 2) this.whereData = this.tableData
    },

    handleStatement() {
      if (this.$refs.whereView.confitions.items[0].field !== '') {
        const statementArr = this.$refs.whereView.confitions.items.map((item, index) => {
          if (item.type === 'String' && !item.value.includes('(')) return `${item.field}${item.queryCriteria}'${item.value}'`
          else if (item.type === 'String' && item.value.includes('(')) return `${item.field}${item.queryCriteria}${item.value}`
          else return `${item.tabName}.${item.field}${item.queryCriteria}${item.value}`
        })
        this.whereConditions = statementArr.join(` ${this.$refs.whereView.character} `)
      }
      var queryStatements
      if (this.$refs.tabView.tableName.length === 2) {
        queryStatements = `select ${this.$refs.tabView.selectConditions} from product product join shop shop on product.shopRawId=shop.shopRawId  where ${
          this.whereConditions
        } limit 2,20`
      } else {
        console.log(this.$refs.tabView.selectConditions)
        queryStatements = `select ${this.$refs.tabView.selectConditions} from ${this.$refs.tabView.tableName[0]} where ${this.whereConditions} limit 2,20`
      }
      console.log(queryStatements)
    }
  },
  created() {
    // axios.get('http://192.168.10.218:8080/poc_ylink/pro').then(res => {
    //   this.tableData = res.data.data
    //   console.log(this.tableData)
    // })
    this.tableData = testData.data
  }
}
</script>

<style lang="scss">
.home {
  &-con {
    margin: 20px 20px 0;
  }
}
.search {
  &-con {
    .ivu-btn {
      margin-left: 10px;
    }
  }
}
.body {
  &-con {
    margin-top: 20px;
    display: flex;
  }
}
</style>

