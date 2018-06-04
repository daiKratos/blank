<template lang="pug">
  section.where
    .action-con
      ButtonGroup
        Button(:type="hasType", @click='handleToggle') 并且
        Button(:type="hasReverseType", @click='handleToggle') 或者
    .conditions-con
      Form(ref='confitions', :model='confitions')
        FormItem(v-for="(item,index) in confitions.items", :key="index")
          Row
            Col(span='6')
              Select(@on-change='handleCriterias', :disabled='selectField.length===0')
                OptionGroup(v-if="selectedTabName.length > 1", v-for="(selectedName,nameIndex) in selectedTabName", :label='selectedName', :key='nameIndex')
                  Option(v-for="(optionItem,itemIndex) in whereData[selectedName+'Field']", :value='`${selectedName}-${index}-${optionItem.column_name}-${optionItem.colum_type}`', :key="itemIndex") {{optionItem.column_name}}
                Option(v-if="selectedTabName.length <= 1", v-for="(radioItem,radioIndex) in whereData", :value='`${index}-${radioItem.column_name}-${radioItem.colum_type}`', :key='radioIndex') {{radioItem.column_name}}
            Col(span='6', v-if="item.Remaining")
              Select(v-model="item.queryCriteria", v-if="item.type==='String'", :disabled='selectField.length===0')
                Option(v-for="(query,index) in stringCriteria", :value="query.value", :key="query.label") {{ query.label }}
              Select(v-model="item.queryCriteria", v-else-if="item.type==='Boolean'", :disabled='selectField.length===0')
                Option(v-for="(query,index) in boolCriteria", :value="query.value", :key="query.label") {{ query.label }}
              Select(v-model="item.queryCriteria", v-else,   :disabled='selectField.length===0')
                Option(v-for="(query,index) in defaultCriteria", :value="query.value", :key="query.label") {{ query.label }}
              //- span(v-if="item.type==='String'") string
              //- span(v-else-if="item.type==='Boolean'") boolean
              //- span(v-else) default


              //- Select(v-model="item.queryCriterias",   :disabled='selectField.length===0')
                //- Option(v-for="(query,index) in item.queryCriterias", :value="query.value", :key="index") {{ query.label }}
            Col(span='6', v-if="item.Remaining && item.showValue")
              Input(placeholder="请输入内容", v-model="item.copyValue", @on-blur='handleValue(index)', :disabled='selectField.length===0')
            Col(span='1', v-if="confitions.items.length > 1")
              Icon(type='ios-trash-outline', @click='handleDelete(index)')
      Row
        Col(span='6')
          Button(type='dashed', @click='handleAdd', icon="plus") 新增查询条件
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
    },
    selectField: {
      type: [Array, String]
    }
  },
  data() {
    return {
      showType: true,
      character: 'and',
      confitions: {
        items: [
          {
            tabName: '',
            field: '',
            queryCriteria: '',
            value: '',
            copyValue: '',
            Remaining: true,
            showValue: true,
            type: '',
            queryCriterias: []
          }
        ]
      },
      productFields: [],
      shopFields: [],
      // queryCriterias: [],
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
          value: '="true"',
          label: '真'
        },
        {
          value: '="false"',
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
    handleDelete(index) {
      this.confitions.items.splice(index, 1)
    },
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
        copyValue: '',
        Remaining: false,
        showValue: false,
        type: '',
        queryCriterias: []
      })
    },
    handleCriterias(value) {
      const queryParam = value.split('-')
      // this.queryCriterias = []
      if (queryParam.length > 3) {
        this.focusItem = queryParam[1]
        this.confitions.items[this.focusItem].tabName = queryParam[0]
        this.confitions.items[this.focusItem].field = queryParam[2]
        this.confitions.items[this.focusItem].Remaining = true
        this.confitions.items[this.focusItem].queryCriteria = ''
        this.confitions.items[this.focusItem].value = ''
        this.confitions.items[this.focusItem].copyValue = ''
        if (queryParam[3] === 'String') {
          // this.confitions.items[this.focusItem].queryCriterias = this.stringCriteria
          this.confitions.items[this.focusItem].showValue = true
          this.confitions.items[this.focusItem].type = 'String'
        } else if (queryParam[3] === 'Boolean') {
          // this.confitions.items[this.focusItem].queryCriterias = this.boolCriteria
          this.confitions.items[this.focusItem].showValue = false
          this.confitions.items[this.focusItem].type = 'Boolean'
        } else {
          // this.confitions.items[this.focusItem].queryCriterias = this.defaultCriteria
          this.confitions.items[this.focusItem].showValue = true
          this.confitions.items[this.focusItem].type = ''
        }
      } else {
        this.focusItem = queryParam[0]
        this.confitions.items[this.focusItem].field = queryParam[1]
        this.confitions.items[this.focusItem].Remaining = true
        this.confitions.items[this.focusItem].queryCriteria = ''
        this.confitions.items[this.focusItem].value = ''
        if (queryParam[2] === 'String') {
          // this.confitions.items[this.focusItem].queryCriterias = this.stringCriteria
          // console.log(this.confitions.items[this.focusItem].queryCriterias)
          this.confitions.items[this.focusItem].showValue = true
          this.confitions.items[this.focusItem].type = 'String'
        } else if (queryParam[2] === 'Boolean') {
          // this.confitions.items[this.focusItem].queryCriterias = this.boolCriteria
          this.confitions.items[this.focusItem].showValue = false
          this.confitions.items[this.focusItem].type = 'Boolean'
        } else {
          // this.confitions.items[this.focusItem].queryCriterias = this.defaultCriteria
          this.confitions.items[this.focusItem].showValue = true
          this.confitions.items[this.focusItem].type = ''
        }
      }
    },
    handleValue(index) {
      const conditionsArr = [' not in ', ' in ']
      if (conditionsArr.includes(this.confitions.items[index].queryCriteria)) {
        const containsValue = this.confitions.items[index].copyValue.split(',')
        let showValue = '('
        containsValue.forEach((item, index) => {
          if (index === containsValue.length - 1) showValue = showValue + `'${item}'`
          else showValue = showValue + `'${item}',`
        })
        this.confitions.items[index].value = showValue + ')'
      } else {
        this.confitions.items[index].value = this.confitions.items[index].copyValue
      }
    }
  }
}
</script>

<style lang="scss">
.where {
  display: inline-block;
  width: 88%;
  .ivu-form-item {
    margin-bottom: 0;
  }
  .ivu-form-item-content{
    margin-bottom: 10px;
  }
  .ivu-col-span-6 {
    margin-right: 10px;
    .ivu-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
  .ivu-icon-ios-trash-outline {
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
    color: red;
  }
  .ivu-btn-group {
    width: 20%;
    .ivu-btn {
      margin: 0 !important;
    }
  }
}
.action-con {
  margin-bottom: 20px;
}
</style>

