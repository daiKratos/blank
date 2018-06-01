<template lang="pug">
  section.tableView
    Card
      p(slot='title')
        Icon(type="android-options")
        | 索引
      .table-con
        CheckboxGroup(v-model="tableName", @on-change='handleFields')
          Checkbox(label='product')
          Checkbox(label='shop')
      .field-con
        Select(v-model="field", multiple, style="width:300px", @on-change='handleOption', not-found-text='请选择查询字段')
          OptionGroup(label='product', v-if="tableName.length===2")
            Option(v-for="(item,index) in fields.productField", :value="`product.${item.column_name}`", :key="index") {{ item.column_name }}
          OptionGroup(label='shop', v-if="tableName.length===2")
            Option(v-for="(item,index) in fields.shopField", :value="`shop.${item.column_name}`", :key="index") {{ item.column_name }}
          Option(v-for="(item,index) in fields", :value="`${item.column_name}`", :key="index", v-else) {{ item.column_name }}
    Button(type="primary", style="margin-top:10px;float:right;", @click="createIndexes") 创建索引

    Modal(title="创建索引", v-model="showIndexes")
      p(style='word-break: break-all;') 正在创建索引.....
</template>

<script>
export default {
  name: 'tableView',
  props: {
    data: {
      type: [Object, String, Array]
    }
  },
  watch: {
    data(val) {
      this.initialData = this.data
    }
  },
  data() {
    return {
      showIndexes: false,
      field: [],
      fields: [],
      initialData: '',
      selectConditions: '',
      tableName: []
    }
  },
  methods: {
    handleFields(data) {
      this.field = []
      this.fields = []
      if (data.length === 1) this.fields = this.initialData[`${data[0]}Field`]
      else if (data.length === 2) this.fields = this.initialData
    },
    handleOption() {
      if (this.field.length !== 0) this.selectConditions = this.field.join()
    },
    createIndexes() {
      if (this.fields && this.selectConditions) {
        this.showIndexes = true
      } else {
        this.$Message.error('请选择要创建的字段')
      }
    }
  }
}
</script>

<style lang="scss">
.tableView {
  flex-grow: 1;
  .ivu-icon-android-options {
    margin-right: 5px;
  }
}
.table {
  &-con {
    margin-bottom: 10px;
  }
}
</style>

