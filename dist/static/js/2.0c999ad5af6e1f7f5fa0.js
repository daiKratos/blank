webpackJsonp([2],{XYFw:function(t,e){},"x/AD":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"indexesView"},[a("section",[a("p",{staticClass:"titleName"},[t._v("索引表名：")]),a("div",{staticClass:"input"},[a("Input",{attrs:{placeholder:"索引表名"},model:{value:t.indexName,callback:function(e){t.indexName=e},expression:"indexName"}})],1)]),a("section",[a("p",{staticClass:"titleName"},[t._v("数据源表：")]),a("div",{staticClass:"input"},[a("Select",{on:{"on-change":t.handleFields},model:{value:t.dataSource,callback:function(e){t.dataSource=e},expression:"dataSource"}},[a("Option",{attrs:{value:"product"}},[t._v("product")]),a("Option",{attrs:{value:"shop"}},[t._v("shop")])],1)],1)]),a("div",{staticClass:"field"},[a("p",{staticClass:"titleName"},[t._v("索引字段：")]),a("div",{staticClass:"input"},[t._l(t.columns,function(e,n){return a("div",{key:n,staticClass:"list"},[a("div",{staticClass:"split"},[a("Select",{on:{"on-change":t.columnNameChange},model:{value:e.columnName,callback:function(a){t.$set(e,"columnName",a)},expression:"item.columnName"}},t._l(t.fields,function(t,e){return a("Option",{key:e,attrs:{value:t.column_name}})}))],1),e.show?a("div",{staticClass:"split"},[a("Select",{attrs:{placeholder:"请选择类型"},model:{value:e.columnType,callback:function(a){t.$set(e,"columnType",a)},expression:"item.columnType"}},[a("Option",{attrs:{value:"text"}},[t._v("text")]),a("Option",{attrs:{value:"keyword"}},[t._v("keyword")])],1)],1):t._e(),a("div",{staticClass:"split min"},[a("Icon",{attrs:{type:"ios-trash-outline"},on:{click:function(e){t.handleDelete(n)}}})],1)])}),a("div",{staticClass:"btn"},[a("Button",{attrs:{type:"dashed",icon:"plus"},on:{click:t.handleAdd}},[t._v("新增索引字段")])],1)],2)])])},staticRenderFns:[]};var i=a("vSla")({name:"indexesView",props:["data"],watch:{data:function(){this.initialData=this.data,this.handleAdd()}},data:function(){return{initialData:[],fields:[],indexName:"",columns:[],dataSource:""}},methods:{handleFields:function(t){this.fields=this.initialData[t+"Field"]},columnNameChange:function(t){var e=this;this.columns.forEach(function(t){e.fields.forEach(function(e){t.columnName===e.column_name&&("String"!==e.colum_type?"Int"===e.colum_type?t.columnType="integer":t.columnType=e.colum_type.toLowerCase():t.show=!0)})})},handleAdd:function(){this.columns.push({columnName:"",columnType:"",show:!1})},handleDelete:function(t){this.columns.splice(t,1)}}},n,!1,function(t){a("XYFw")},"data-v-7d4e0a52",null);e.default=i.exports}});