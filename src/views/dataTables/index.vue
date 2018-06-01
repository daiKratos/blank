<template lang="pug">
  .home-con
    Card
      p(slot='title')
        Icon(type="pinpoint")
        | 数据库查询语句
      .search-con
        Input(placeholder="数据库查询语句", v-model="searchStatements",style="width: 90%")
        Button(type="primary", @click='handleSearch') 查询
    .body-con
      indexes(:data='tableData',ref='indexesView')
      tableView(:data='tableData',ref='tabView', @changeTabData='changeTabData', @changeField='changeField')
      whereView(:whereData='whereData',:selectedTabName='selectedTabName', :selectField='selectField', ref='whereView')
    .btn-con
      Button(type='primary', @click='handleStatement', :disabled='btnDisable') 查看
      Button(type='info', @click='handleCommit', :disabled='btnDisable') 提交
    Card.show-con
      p(slot='title')
        Icon(type="ios-keypad")
        | 查询结果
      Table(:columns="(showColumns?columns:[])", :data="data")
      Page(:total="200", :page-size='20', @on-change='handlePage', v-if="data.length!==0")
    Modal(title="查询语句", v-model="showQuery")
      p(style='word-break: break-all;') {{queryStatements}}
</template>

<script>
// @ is an alias to /src
import indexes from './children/indexes'
import tableView from './children/tableView'
import whereView from './children/where'
import testData from './test.json'
import tabComData from './table.json'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    indexes,
    tableView,
    whereView
  },
  data() {
    return {
      showQuery: false,
      tableData: [],
      whereData: [],
      whereConditions: '',
      selectedTabName: [],
      selectField: '',
      columns: [],
      defaultColumns: [],
      data: [],
      queryStatements: '',
      showColumns: false,
      btnDisable: false,
      activePage: 0,
      searchStatements: ''
    }
  },
  methods: {
    changeField(value) {
      this.selectField = value

      this.defaultColumns = [
        {
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
        },
        ...value.map(item => {
          return { title: item, key: item, width: 150 }
        })
      ]
    },
    changeTabData(value) {
      this.whereData = []
      this.selectedTabName = value
      if (value.length === 1) this.whereData = this.tableData[`${value[0]}Field`]
      else if (value.length === 2) this.whereData = this.tableData
      this.$refs.whereView.confitions.items = [{ tabName: '', field: '', queryCriteria: '', value: '', Remaining: true, showValue: true, type: '' }]
    },
    handleDealwith(page = 0) {
      if (this.$refs.whereView.confitions.items[0].field !== '') {
        const statementArr = this.$refs.whereView.confitions.items.map((item, index) => {
          console.log(item)
          if (item.type === 'String' && !item.value.includes('(')) {
            if (item.tabName === '') {
              return `${item.field}${item.queryCriteria}'${item.value}'`
            } else {
              return `${item.tabName}.${item.field}${item.queryCriteria}'${item.value}'`
            }
          } else if (item.type === 'String' && item.value.includes('(')) {
            if (item.tabName) {
              return `${item.tabName}.${item.field}${item.queryCriteria}${item.value}`
            } else {
              return `${item.field}${item.queryCriteria}${item.value}`
            }
          } else if (item.tabName === '') {
            return `${item.field}${item.queryCriteria}${item.value}`
          } else {
            return `${item.tabName}.${item.field}${item.queryCriteria}${item.value}`
          }
        })
        this.whereConditions = statementArr.join(` ${this.$refs.whereView.character} `)
      }
      if (this.$refs.tabView.tableName.length === 2) {
        return `select ${this.$refs.tabView.selectConditions} from product product join shop shop on product.shopRawId=shop.shopRawId  where ${
          this.whereConditions
        } limit ${page},20`
      } else {
        return `select ${this.$refs.tabView.selectConditions} from ${this.$refs.tabView.tableName[0]} where ${this.whereConditions} limit ${page},20`
      }
    },
    handleSearch() {
      if (this.searchStatements !== '') {
        this.showColumns = true
        axios({
          methods: 'get',
          url: `${process.env.searchUrl}:${process.env.searchPort}/_sql?sql=${this.searchStatements}`
        }).then(res => {
          // 这个地方会出现问题，因为不知道具体的返回结构
          this.data = res.data.hits.hits.map(item => {
            return item._source
          })
          let arr = [
            {
              type: 'index',
              width: 60,
              align: 'center',
              title: '序号'
            }
          ]
          for (let item in this.data[0]) {
            arr.push({ title: item, key: item, width: 150 })
          }
          this.columns = arr
        })
      } else {
        this.$Message.info('查询语句不能为空')
      }
    },
    handleStatement() {
      this.showQuery = true
      if (this.$refs.tabView.selectConditions !== '') {
        this.queryStatements = this.handleDealwith()
      } else {
        this.queryStatements = '请选择查询的表名、字段名、查询条件'
      }
    },
    handleCommit() {
      if (this.$refs.tabView.selectConditions !== '') {
        this.columns = []
        this.columns = this.defaultColumns
        this.showColumns = true
        axios({
          methods: 'get',
          url: `${process.env.searchUrl}:${process.env.searchPort}/_sql?sql=${this.handleDealwith(this.activePage)}`
        }).then(res => {
          // 这个地方会出现问题，因为不知道具体的返回结构
          this.data = res.data.hits.hits.map(item => {
            return item._source
          })
        })
        // this.data = tabComData.data.hits.hits.map(item => {
        //   return item._source
        // })
      } else {
        this.showQuery = false
        this.queryStatements = '请选择查询的表名、字段名、查询条件'
      }
    },
    handlePage(page) {
      this.activePage = page
      this.handleCommit()
    }
  },
  created() {
    axios.get(`${process.env.defaultDateUrl}:${process.env.defaultPort}/poc_ylink/pro`).then(res => {
      this.tableData = res.data.data
    })
    // setTimeout(() => {
    //   this.tableData = testData.data
    // }, 100)
  }
}
</script>

<style lang="scss">
.home {
  &-con {
    margin: 0 20px;
    .ivu-icon-pinpoint,
    .ivu-icon-ios-keypad {
      margin-right: 5px;
    }
    .ivu-page {
      text-align: right;
      margin-top: 15px;
    }
  }
}
.search {
  &-con {
    background-color: #fff;
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
.show-con {
  margin-top: 20px;
}
.btn-con {
  text-align: right;
  margin: 10px 0;
  .ivu-btn {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>

