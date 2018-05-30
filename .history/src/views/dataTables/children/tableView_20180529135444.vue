<template lang="pug">
  section.tableView
    .table-con
      CheckboxGroup(v-model="tableName", @on-change='handleFields')
        Checkbox(label='productField')
        Checkbox(label='shopField')
    .field-con
      Select(v-model="field", multiple, style="width:300px", @on-change='handleOption', not-found-text='请选择表名', clearable)
        OptionGroup(label='productField', v-if="tableName.length===2")
          Option(v-for="(item,index) in fields.productField", :value="`productField-${item.column_name}`", :key="index") {{ item.column_name }}
        OptionGroup(label='shopField', v-if="tableName.length===2")
          Option(v-for="(item,index) in fields.shopField", :value="`shopField-${item.column_name}`", :key="index") {{ item.column_name }}
        Option(v-for="(item,index) in fields", :value="item.column_name", :key="index", v-else) {{ item.column_name }}
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
      fields: []
    }
  },
  methods: {
    handleFields(data) {
      this.fields = []
      if (data.length === 1) this.fields = this.initialData[data[0]]
      else if (data.length === 2) this.fields = this.initialData
      // else if(data.length===0) document.querySelector('.field-con .ivu-select .ivu-select-selection>div').innerHTML='<span class="ivu-select-placeholder">请选择</span><i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>'
    },
    handleOption() {
      console.log(this.field)
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

