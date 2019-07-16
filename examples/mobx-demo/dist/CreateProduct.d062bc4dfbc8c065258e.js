(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{315:function(e,t,a){"use strict";var r,n,c=a(290),o=a.n(c),l=(a(57),a(18)),i=a.n(l),u=(a(292),a(289)),p=a.n(u),s=(a(309),a(312)),d=a.n(s),m=a(0),b=a.n(m),g=a(99),O=a(45),h=d.a.Item,j=p.a.Option,f=Object(g.c)(r=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.attributes,a=e.formItemLayout,r=e.form.getFieldDecorator;return b.a.createElement("div",null,t.map(function(e){return b.a.createElement(h,o()({},a,{label:e.name,key:e.id}),r("attrs.attrId"+e.id,{rules:[{required:!0,message:""+Object(O.a)("text.please_select")+e.name+"！"}]})(b.a.createElement(p.a,{mode:"multiple",placeholder:""+Object(O.a)("text.please_select")+e.name+"！"},e.options.map(function(e){return b.a.createElement(j,{key:e.id,value:e.id},e.name)}))))}))},t}(m.Component))||r,y=Object(g.c)(n=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.attributeTexts;return b.a.createElement("span",null,e.map(function(e,t){var a=e.name,r=e.value;return b.a.createElement("div",{key:t},a+": "+r.join(","))}))},t}(m.Component))||n;a.d(t,"b",function(){return f}),a.d(t,"a",function(){return y})},607:function(e,t,a){"use strict";a.r(t);a(271);var r,n,c=a(273),o=a.n(c),l=a(290),i=a.n(l),u=(a(346),a(351)),p=a.n(u),s=(a(109),a(518),a(107),a(74),a(62),a(48),a(75),a(112)),d=a.n(s),m=(a(348),a(18)),b=a.n(m),g=(a(309),a(312)),O=a.n(g),h=(a(350),a(367)),j=a.n(h),f=a(0),y=a.n(f),E=a(99),v=(a(528),a(530)),x=a.n(v),_=Object(E.b)("category")(r=Object(E.c)(r=function(n){function e(){for(var t,e=arguments.length,a=new Array(e),r=0;r<e;r++)a[r]=arguments[r];return(t=n.call.apply(n,[this].concat(a))||this).loadData=function(e){t.props.category.getCategory({level:e.length+1})},t}return b()(e,n),e.prototype.render=function(){var e=this.props,t=e.category,a=d()(e,["category"]);return y.a.createElement(x.a,i()({},a,{loadData:this.loadData,changeOnSelect:!0,options:t.categoriesTree}))},e}(f.Component))||r)||r,C=a(315),w=a(45),k=j.a.Panel,q=O.a.Item,D={labelCol:{span:4},wrapperCol:{span:8}},A={wrapperCol:{span:8,offset:4}},I=Object(E.b)("productEdit","category")(n=Object(E.c)(n=function(n){function e(){for(var a,e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(a=n.call.apply(n,[this].concat(t))||this).handleCategoryChange=function(e){var t=a.props.productEdit;2==e.length&&t.getAttributes(e[e.length-1])},a.onSubmit=function(){var e=a.props,c=e.productEdit,t=e.form;e.match.params.id;t.validateFields(function(e,t){if(!e){var a={},r=t.attrs,n=d()(t,["attrs"]);Object.keys(r).map(function(e){a[e.slice(6)]=r[e]}),c.setValues(Object.assign({},n,{attrValues:a})),c.saveProduct()}})},a}b()(e,n);var t=e.prototype;return t.componentDidMount=function(){var e=this.props,a=e.productEdit,r=e.category,n=e.form,t=e.match.params.id;t?a.getProduct(t).then(function(e){if(e){var t=a.cids;Promise.all([r.getCategoryByLevels(t),a.getAttributes(t[t.length-1])]).then(function(e){e&&n.setFieldsValue(a.pageValues)})}}):r.getCategory({level:1})},t.render=function(){console.log(123456782);var e=this.props,t=e.productEdit,a=e.form,r=a.getFieldDecorator;return y.a.createElement(j.a,{defaultActiveKey:["1"]},y.a.createElement(k,{header:t.id?""+Object(w.a)("action.edit")+Object(w.a)("text.product")+" id:"+t.id:""+Object(w.a)("action.edit")+Object(w.a)("text.product"),key:"1"},y.a.createElement(O.a,null,y.a.createElement(q,i()({},D,{label:Object(w.a)("model.product.name")}),r("name",{rules:[{required:!0,message:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.name")}]})(y.a.createElement(p.a,{placeholder:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.name")}))),y.a.createElement(q,i()({},D,{label:Object(w.a)("model.product.categories")}),r("cids",{rules:[{required:!0,message:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.categories")}]})(y.a.createElement(_,{placeholder:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.categories"),onChange:this.handleCategoryChange}))),y.a.createElement(C.b,{attributes:t.attributes,formItemLayout:D,form:a}),y.a.createElement(q,i()({},D,{label:Object(w.a)("model.product.price")}),r("price",{rules:[{required:!0,message:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.price")},{pattern:/^([1-9](\d+)?|0)(\.\d{1,2})?$/,message:Object(w.a)("text.should_be_two_decimals")}]})(y.a.createElement(p.a,{placeholder:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.price")}))),y.a.createElement(q,i()({},D,{label:Object(w.a)("model.product.num")}),r("num",{rules:[{required:!0,message:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.num")},{pattern:/^[1-9](\d+)?|0$/,message:Object(w.a)("text.should_be_integer")}]})(y.a.createElement(p.a,{placeholder:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.num")}))),y.a.createElement(q,i()({},D,{label:Object(w.a)("model.product.desc")}),r("desc",{rules:[{required:!0,message:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.desc")}]})(y.a.createElement(p.a,{type:"textarea",placeholder:""+Object(w.a)("text.please_input")+Object(w.a)("model.product.desc")}))),y.a.createElement(q,A,y.a.createElement(o.a,{type:"primary",htmlType:"submit",onClick:this.onSubmit},Object(w.a)("action.submit"))))))},e}(f.Component))||n)||n;t.default=O.a.create()(I)}}]);