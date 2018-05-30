<template lang="pug">
  section.tableView
    .table-con
      CheckboxGroup(v-model="tableName", @on-change='handleFields')
        Checkbox(label='productField')
        Checkbox(label='shopField')
    .field-con
      Select(v-model="field", multiple, style="width:300px", @on-change='handleOption', not-found-text='请选择表名', clearable)
        OptionGroup(label='productField', v-if="tableName.length===2")
          Option(v-for="(item,index) in fields.productField", :value="`productField.${item.column_name}`", :key="index") {{ item.column_name }}
        OptionGroup(label='shopField', v-if="tableName.length===2")
          Option(v-for="(item,index) in fields.shopField", :value="`shopField.${item.column_name}`", :key="index") {{ item.column_name }}
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
      selectConditions:''
    }
  },
  methods: {
    handleFields(data) {
      this.field = []
      this.fields = []
      if (data.length === 1) this.fields = this.initialData[data[0]]
      else if (data.length === 2) this.fields = this.initialData
    },
    handleOption() {
      if (this.field.length !== 0) {
        this.selectConditions = this.field.join()
        console.log(queryConditions)
      }
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

