<template lang="pug">
  section.tableView
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
</template>

<script>
export default {
  name: 'tableView',
  props: {
    data: {
      type: [Object, String]
    }
  },
  watch: {
    field(val) {
      this.$emit('changeField', val)
    }
  },
  data() {
    return {
      field: [],
      fields: [],
      initialData: '',
      selectConditions: '',
      tableName: [],
      tabColumns: []
    }
  },
  methods: {
    handleFields(data) {
      this.field = []
      this.fields = []
      if (data.length === 1) this.fields = this.initialData[`${data[0]}Field`]
      else if (data.length === 2) this.fields = this.initialData
      this.$emit('changeTabData', this.tableName)
    },
    handleOption() {
      this.tabColumns = this.field.map(item => {return {title: item,
          key: item
        }
      })
      if (this.field.length !== 0) this.selectConditions = this.field.join()
    }
  },
  mounted() {
    this.initialData = this.data
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

