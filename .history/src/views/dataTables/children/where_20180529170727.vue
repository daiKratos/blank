<template lang="pug">
  section.where
    .action-con
      ButtonGroup
        Button(:type="hasType", @click='handleToggle') 并且
        Button(:type="hasReverseType", @click='handleToggle') 或者
      Button(type='primary', @click='handleAdd',style='marginLeft:10px') 添加新行
    .conditions-con
      Form(ref='confitions', :model='confitions')
        FormItem(v-for="(item,index) in confitions.items", :key="index")
          Row
            Col(span='7')
              Select(style="width:300px", @on-change='handleCriterias')
                OptionGroup(v-if="selectedTabName.length > 1", v-for="(selectedName,nameIndex) in selectedTabName", :label='selectedName', :key='nameIndex')
                  Option(v-for="(optionItem,itemIndex) in whereData[selectedName+'Field']", :value='`${selectedName}-${index}-${optionItem.column_name}-${optionItem.colum_type}`', :key="itemIndex") {{optionItem.column_name}}
                Option(v-if='selectedTabName.length < 1', v-for="(radioItem,radioIndex) in whereData", :value='`${radioItem.column_name}`', :key='radioIndex') {{radioItem.column_name}}
                //- Option(v-if='selectedTabName.length < 1', v-for="(itemTest,testindex) in test", :value="`${item.column_name}`", :key="testindex") {{ itemTest.column_name }}




            Col(span='7', v-if="item.Remaining")
              //- Select(v-model="item.queryCriteria", style='width:300px')
                //- Option(v-for="(query,index) in queryCriterias", :value="query.value", :key="index") {{ query.label }}
            Col(span='7', v-if="item.Remaining&&item.showValue")
              Input(placeholder="请输入内容", v-model="item.value")
</template>

<script>
export default {
  name: 'where',
  props: {
    whereData: {
      type: [Array, Object, String]
    },
    selectedTabName: {
      type: [Array, String]
    }
  },
  watch
  data() {
    return {
      test: [
        {
          column_name: 'commentCount',
          colum_type: 'Int'
        },
        {
          column_name: 'currentPrice',
          colum_type: 'Double'
        }
      ],
      showType: true,
      character: 'and',

      confitions: {
        items: [
          {
            tabName: '',
            field: '',
            queryCriteria: '',
            value: '',
            Remaining: true,
            showValue: true,
            type: ''
          }
        ]
      },
      productFields: [],
      shopFields: [],
      queryCriterias: [],
      stringCriteria: [
        {
          value: '=',
          label: '等于'
        },
        {
          value: ' is not ',
          label: '不等于'
        },
        {
          value: ' in ',
          label: '包含'
        },
        {
          value: ' not in ',
          label: '不包含'
        }
      ],
      defaultCriteria: [
        {
          value: '=',
          label: '等于'
        },
        {
          value: '>',
          label: '大于'
        },
        {
          value: '<',
          label: '小于'
        },
        {
          value: '>=',
          label: '大于等于'
        },
        {
          value: '<=',
          label: '小于等于'
        },
        {
          value: ' is not ',
          label: '不等于'
        }
      ],
      boolCriteria: [
        {
          value: '=true',
          label: '真'
        },
        {
          value: '=false',
          label: '假'
        }
      ],
      focusItem: 0
    }
  },
  computed: {
    hasType() {
      return this.showType ? 'primary' : 'ghost'
    },
    hasReverseType() {
      return !this.showType ? 'primary' : 'ghost'
    }
  },
  methods: {
    handleToggle() {
      this.showType = !this.showType
      if (event.target.innerHTML === '并且') {
        this.character = 'and'
      } else {
        this.character = 'or'
      }
    },
    handleAdd() {
      this.confitions.items.push({
        tabName: '',
        field: '',
        queryCriteria: '',
        value: '',
        Remaining: false,
        showValue: false,
        type: ''
      })
    },
    handleCriterias(value) {
      // const queryParam = value.split('-')
      // this.focusItem = queryParam[1]
      // this.confitions.items[this.focusItem].tabName = queryParam[0]
      // this.confitions.items[this.focusItem].field = queryParam[2]
      // this.confitions.items[this.focusItem].Remaining = true
      // this.confitions.items[this.focusItem].queryCriteria = ''
      // this.confitions.items[this.focusItem].value = ''
      // this.queryCriterias = []
      // if (queryParam[3] === 'String') {
      //   this.queryCriterias = this.stringCriteria
      //   this.confitions.items[this.focusItem].showValue = true
      //   this.confitions.items[this.focusItem].type = 'String'
      // } else if (queryParam[3] === 'Boolean') {
      //   this.queryCriterias = this.boolCriteria
      //   this.confitions.items[this.focusItem].showValue = false
      //   this.confitions.items[this.focusItem].type = ''
      // } else {
      //   this.queryCriterias = this.defaultCriteria
      //   this.confitions.items[this.focusItem].showValue = true
      //   this.confitions.items[this.focusItem].type = ''
      // }
    }
  },
  mounted() {
    // this.productFields = this.data.productField
    // this.shopFields = this.data.shopField
  }
}
</script>

<style lang="scss">
.where {
  flex-grow: 20;
  .ivu-form-item {
    margin-bottom: 10px;
  }
}
.action-con {
  margin-bottom: 10px;
}
</style>

