<template lang="pug">
  .home-con
    .search-con
      Input(placeholder="数据库查询语句", style="width: 300px")
      Button(type="primary") 查询
    .body-con
      tableView(:data='tableData',ref='tabView', @changeTabData='changeTabData')
      whereView(:whereData='whereData',:selectedTabName='selectedTabName', ref='whereView')
    Button(type='primary', @click='handleStatement') 查看
</template>

<script>
// @ is an alias to /src
import tableView from './children/tableView'
import whereView from './children/where'
import testData from './test.json'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    tableView,
    whereView
  },
  data() {
    return {
      tableData: '',
      whereData: [],
      whereConditions: '',
      selectedTabName: []
    }
  },
  methods: {
    changeTabData(value) {
      if (value.length === 1) {
        this.whereData=[]
        this.selectedTabName = value
        this.whereData = this.tableData[`${value[0]}Field`]
      } else if (value.length === 2) {
        this.whereData=[]
        this.selectedTabName = value
        this.whereData = this.tableData
      } else {
        this.selectedTabName = value
      }
    },
    handleStatement() {
      if (this.$refs.whereView.confitions.items[0].field !== '') {
        const statementArr = this.$refs.whereView.confitions.items.map((item, index) => {
          // if (item.type === 'String') return `${item.field}${item.queryCriteria}'${item.value}'`
          return `${item.field}${item.queryCriteria}${item.value}`
        })
        this.whereConditions = statementArr.join(` ${this.$refs.whereView.character} `)
      }
      var a
      if (this.$refs.tabView.tableName.length === 2) {
        a = `select ${this.$refs.tabView.selectConditions} from productField product join shopField shopField on productField.shopRawId=shopField.shopRawId  where ${this.whereConditions} limit 2,20`
      } else {
        a = `select ${this.$refs.tabView.selectConditions} from ${this.$refs.tabView.tableName[0]} where ${this.whereConditions} limit 2,20`
      }
      console.log(a)
    }
  },
  mounted () {
    // console.log(this.selectedTabName)
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

