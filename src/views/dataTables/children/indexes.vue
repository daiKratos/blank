<template lang="pug">
  .indexesView
    section
      p.titleName 索引表名：
      .input 
        Input(placeholder="索引表名", v-model="indexName")
    section
      p.titleName 数据源表：
      .input
        Select(v-model="dataSource", @on-change='handleFields')
          Option(value="product") product
          Option(value="shop") shop
    .field
      p.titleName 索引字段：
      .input
        .list(v-for="(item,index) in columns", :key="index")
          .split
            Select(v-model="item.columnName", @on-change="columnNameChange")
              Option(v-for="(val,index) in fields", :key="index", :value="val.column_name")
          .split(v-if="item.show")
            Select(v-model="item.columnType")
              Option(value="text") text
              Option(value="keyword") keyword
          .split.min
            Icon(type='ios-trash-outline', @click='handleDelete(index)')
        .btn
          Button(type='dashed', @click='handleAdd', icon="plus") 新增索引字段
</template>

<script>
export default {
  name: 'indexesView',
  props: ['data'],
  watch: {
    data() {
      this.initialData = this.data
      this.handleAdd()
    }
  },
  data() {
    return {
      initialData: [],
      fields: [],
      indexName: '',
      columns: [],
      dataSource: ''
    }
  },
  methods: {
    handleFields(data) {
      this.fields = this.initialData[`${data}Field`]
    },
    columnNameChange(value) {
      this.columns.forEach(c => {
        this.fields.forEach(f => {
          if (c.columnName === f.column_name) {
            if (f.colum_type !== 'String') {
              if (f.colum_type === 'Int') {
                c.columnType = 'integer'
              } else {
                c.columnType = f.colum_type.toLowerCase()
              }
            } else {
              c.show = true
            }
          }
        })
      })
    },
    handleAdd() {
      this.columns.push({
        columnName: '',
        columnType: '',
        show: false
      })
    },
    handleDelete(index) {
      this.columns.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 10px;
  &:last-child {
    margin: 0;
  }
  .titleName {
    vertical-align: middle !important;
  }
}
.input {
  display: inline-block;
  width: 40%;
  .list {
    margin-bottom: 10px;
    .split {
      width: 44%;
      display: inline-block;
      margin-right: 2%;
      &.min {
        width: 6%;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.btn {
  margin: 0 !important;
  .ivu-btn-dashed {
    width: 48%;
  }
}
</style>

