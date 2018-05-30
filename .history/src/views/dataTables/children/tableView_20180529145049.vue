<template lang="pug">
  section.tableView
    .table-con
      CheckboxGroup(v-model="tableName", @on-change='handleFields')
        Checkbox(label='product')
        Checkbox(label='shop')
    .field-con
      Select(v-model="field", multiple, style="width:300px", @on-change='handleOption', not-found-text='请选择表名', clearable)
        OptionGroup(label='product', v-if="tableName.length===2")
          Option(v-for="(item,index) in fields.productField", :value="`product.${item.column_name}`", :key="index") {{ item.column_name }}
        OptionGroup(label='shop', v-if="tableName.length===2")
          Option(v-for="(item,index) in fields.shopField", :value="`shop.${item.column_name}`", :key="index") {{ item.column_name }}
        Option(v-for="(item,index) in fields", :value="`${tableName}.${item.column_name}`", :key="index", v-else) {{ item.column_name }}
</template>

<script>
export default {
  name: 'tableView',
  props: {
    data: {
      type: [Object, String]
    }
  },
  data() {
    return {
      initialData: '',
      tableName: [],
      field: [],
      fields: [],
      selectConditions: ''
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
      if (this.field.length !== 0) {
        this.selectConditions = this.field.join()
      }
    }
  },
  mounted() {
    this.initialData = this.data
    const a='http://192.168.10.24:9200/_sql?sql=select product.commentCount,product.goodCommentRate,product.monthSale from product where product.commentCount>32 and product.isAvailable=false and product.productName!='34' limit 2,20‘
  }
}
</script>

<style lang="scss">
.tableView {
  flex-grow: 1;
}
.table {
  &-con {
    margin-bottom: 10px;
  }
}
</style>

