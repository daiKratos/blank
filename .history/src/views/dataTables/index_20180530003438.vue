<template lang="pug">
  .home-con
    Card
      p(slot='title')
        Icon(type="pinpoint")
        | 数据库查询语句
      .search-con
        Input(placeholder="数据库查询语句", style="width: 300px")
        Button(type="primary") 查询
    .body-con
      tableView(:data='tableData',ref='tabView', @changeTabData='changeTabData', @changeField='changeField')
      whereView(:whereData='whereData',:selectedTabName='selectedTabName', :selectField='selectField', ref='whereView')
    .btn-con
      Button(type='primary', @click='handleStatement') 查看
      Button(type='info', @click='handleCommit') 提交
    Card.show-con
      p(slot='title')
        Icon(type="ios-keypad")
        | 查询结果
      Table(:columns="(showColumns?columns:[])" :data="data")
      Page(:total="200", :page-size='20', @on-change='handlePage')
</template>

<script>
// @ is an alias to /src
import tableView from './children/tableView'
import whereView from './children/where'
import testData from './test.json'
import tabComData from './table.json'
// import axios from 'axios'
export default {
  name: 'home',
  components: {
    tableView,
    whereView
  },
  data() {
    return {
      tableData: [],
      whereData: [],
      whereConditions: '',
      selectedTabName: [],
      selectField: '',

      columns: [],
      data: [],
      // queryStatements: '',
      showColumns: false,
      activePage: 0
    }
  },
  methods: {
    changeField(value) {
      this.selectField = value
      this.columns = [
        {
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
        },
        ...value.map(item => {
          return { title: item, key: item }
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
    handleDealwith(page = this.activePage) {
      if (this.$refs.whereView.confitions.items[0].field !== '') {
        const statementArr = this.$refs.whereView.confitions.items.map((item, index) => {
          if (item.type === 'String' && !item.value.includes('(')) return `${item.field}${item.queryCriteria}'${item.value}'`
          else if (item.type === 'String' && item.value.includes('(')) return `${item.field}${item.queryCriteria}${item.value}`
          else if (item.tabName === '') return `${item.field}${item.queryCriteria}${item.value}`
          else return `${item.tabName}.${item.field}${item.queryCriteria}${item.value}`
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
    handleStatement() {
      console.log(this.handleDealwith())
    },
    handleCommit() {
      this.showColumns = true
      axios({
        methods:'post',
        url:`${http://192.168.10.24:9200/_sql?sql=}`,
      })
      this.data = tabComData.hits.hits.map(item => {
        return item._source
      })
    },
    handlePage(page) {
      this.activePage = page
    }
  },
  created() {
    axios.get('http://192.168.10.218:8080/poc_ylink/pro').then(res => {
      this.tableData = res.data.data
    })
    this.tableData = testData.data
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

