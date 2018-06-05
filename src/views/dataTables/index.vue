<template lang="pug">
  .home-con
    .card
      .indexes
        h1 索引配置
        .form
          .select
            indexesView(:data='tableData', ref='indexView')
          .btn
            Button(type="ghost", @click='handleCreate') 创建索引表
            Button(type='primary', @click='handleData') 导入数据
      .sentence
        h1 语句查询
        .form
          .select
            p.titleName 数据库查询语句：
            Input(type="textarea", placeholder="数据库查询语句", v-model="searchStatements")
          .btn
            Button(type="primary", @click='handleSearch') 查询
      .condition
        h1 条件查询
        .form
          .select
            p.titleName 数据表：
            tableView(:data='tableData', ref='tabView', @changeTabData='changeTabData', @changeField='changeField')
          .select
            p.titleName 查询条件：
            whereView(:whereData='whereData', :selectedTabName='selectedTabName', :selectField='selectField', ref='whereView')
          .btn
            Button(type="ghost", @click='handleStatement', :disabled='btnDisable') 查看
            Button(type='primary', @click='handleCommit', :disabled='btnDisable') 查询
    .card
      .result
        h1 查询结果
        .form
          .select
            Table(:columns="(showColumns?columns:[])", :data="data")
            Page(:total="200", :page-size='20', @on-change='handlePage', v-if="data.length!==0")

    Modal(title="查询语句", v-model="showQuery")
      p(style='word-break: break-all;') {{queryStatements}}
    
    Modal(title="导出数据", v-model="showIndexes")
      p(style='word-break: break-all;') 正在导出数据.....
</template>

<script>
// @ is an alias to /src
import indexesView from './children/indexes'
import tableView from './children/tableView'
import whereView from './children/where'
import testData from './test.json'
import tabComData from './table.json'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'home',
  components: {
    indexesView,
    tableView,
    whereView
  },
  data() {
    return {
      showIndexes: false,
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
      searchStatements: '',
      pageModelResult: ''
    }
  },
  methods: {
    indexData() {
      let indexName = this.$refs.indexView.indexName
      let dataSource = this.$refs.indexView.dataSource
      let columns = this.$refs.indexView.columns
      let arr = JSON.parse(JSON.stringify(columns))
      arr.forEach(e => {
        delete e.show
      })
      if (!indexName) {
        this.$Message.error('索引表名不能为空')
        return false
      } else if (!dataSource) {
        this.$Message.error('请选择数据源表')
        return false
      }
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].columnName && !arr[i].columnType) {
          this.$Message.error('请选择索引字段')
          return false
        }
      }
      let json = {
        indexName: indexName,
        columns: arr
      }
      this.pageModelResult = JSON.stringify(json)
    },
    handleCreate() {
      this.indexData()
      if (this.pageModelResult) {
        axios
          .post(
            `${process.env.defaultDateUrl}:${process.env.defaultPort}/poc_ylink/sou`,
            qs.stringify({
              pageModelResult: this.pageModelResult
            })
          )
          .then(res => {
            this.$Message.info(res.data.respMsg)
          })
      }
    },
    handleData() {
      this.indexData()
      if (this.pageModelResult) {
        this.showIndexes = true
      }
    },
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
    .card {
      background: #fff;
      padding: 40px 120px 24px;
      margin-bottom: 24px;
      & > div {
        margin-bottom: 24px;
      }
      h1 {
        height: 44px;
        line-height: 44px;
        padding-left: 52px;
        font-size: 14px;
        color: #646464;
      }
      .form {
        margin-left: 25px;
        .select {
          margin: 16px 0 24px;
          p.titleName {
            font-size: 14px;
            text-align: right;
            vertical-align: top;
            display: inline-block;
            width: 12%;
          }
        }
        .btn {
          margin-left: 12%;
          .ivu-btn {
            margin-right: 16px;
          }
        }
      }
      .sentence {
        h1 {
          background: url('../../assets/sentence.png') no-repeat left center;
        }
        .select {
          height: 70px;
        }
        .ivu-input-wrapper {
          width: 88%;
          height: 100%;
          textarea.ivu-input {
            height: 100%;
          }
        }
      }
      .indexes {
        h1 {
          background: url('../../assets/indexes.png') no-repeat left center;
        }
      }
      .condition {
        h1 {
          background: url('../../assets/condition.png') no-repeat left center;
        }
      }
      .result {
        h1 {
          background: url('../../assets/result.png') no-repeat left center;
        }
      }
    }
    .ivu-icon-ios-trash-outline {
      cursor: pointer;
      font-size: 20px;
      vertical-align: middle;
      color: red;
    }
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
</style>

