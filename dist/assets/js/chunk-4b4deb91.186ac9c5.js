(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b4deb91"],{"658d":function(t,i,e){"use strict";e.r(i);var a,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"market"}},[e("header",{staticClass:"mui-bar mui-bar-nav"},[e("a",{staticClass:"mui-action-back mui-icon mui-icon-left-nav mui-pull-left"}),e("h1",{staticClass:"mui-title"},[t._v(t._s(this.$store.state.isweixin?"":"业务市场"))])]),e("div",{staticClass:"mui-content"},[e("div",{staticClass:"swiper-container box_1"},[e("div",{staticClass:"swiper-wrapper"},t._l(t.img_list,function(t,i){return e("div",{key:i,staticClass:"swiper-slide"},[e("img",{attrs:{src:"image/"+t,alt:""}})])})),e("div",{staticClass:"swiper-pagination"})]),t._m(0),e("ul",{staticClass:"box_2"},t._l(t.img_list2,function(i,a){return e("li",{key:a},[e("div",[e("img",{attrs:{src:i.imgUrl,alt:""}})]),e("span",[t._v(t._s(i.name))])])})),t._m(1)])])},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"banyuan"},[e("div")])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("ul",{staticClass:"box_3"},[e("li",[e("div",{staticClass:"img_box"},[e("img",{attrs:{src:"image/5.jpg",alt:""}})]),e("div",{staticClass:"text_1"},[e("div",{staticClass:"title"},[e("img",{attrs:{src:"image/5.jpg",alt:""}}),e("span",[t._v("公司名称")])]),e("ul",[e("li",[t._v("业务:进口红酒")]),e("li",[t._v("佣金:25%")]),e("li",[t._v("合作:1280人")]),e("li",[t._v("四川省成都市武侯区")])])]),e("ul",{staticClass:"text_2"},[e("li",[t._v("波尔多独家代理")]),e("li",[t._v("市场份额35%")]),e("li",[t._v("全国四家分公司")]),e("li",[t._v("9250家网点")])])])])}],r=e("a322"),l=(a={name:"",data:function(){return{img_list:[],img_list2:[{name:"酒水",imgUrl:"image/t1.png"},{name:"养生",imgUrl:"image/t2.png"},{name:"美容",imgUrl:"image/t3.png"},{name:"医疗",imgUrl:"image/t4.png"},{name:"文教",imgUrl:"image/t5.png"},{name:"建材",imgUrl:"image/t6.png"},{name:"家具",imgUrl:"image/t7.png"},{name:"家电",imgUrl:"image/t8.png"},{name:"婚嫁",imgUrl:"image/t9.png"},{name:"更多",imgUrl:"image/t10.png"}]}},methods:{getswiper:function(){new Swiper("#market .swiper-container",{loop:!0,autoplay:!0,pagination:{el:".swiper-pagination"}})}},beforeCreate:function(){},created:function(){}},Object(r["a"])(a,"beforeCreate",function(){}),Object(r["a"])(a,"mounted",function(){this.img_list=["5.jpg","6.jpg","7.jpg"],this.$store.state.isweixin&&(document.getElementsByTagName("title")[0].innerText="业务市场")}),Object(r["a"])(a,"beforeUpdate",function(){}),Object(r["a"])(a,"updated",function(){}),Object(r["a"])(a,"beforeDestroy",function(){}),Object(r["a"])(a,"destroyed",function(){}),Object(r["a"])(a,"watch",{img_list:function(){this.$nextTick(function(){console.log("数据渲染完成"),this.getswiper()})}}),a),c=l,m=(e("b589"),e("2877")),o=Object(m["a"])(c,n,s,!1,null,null,null);o.options.__file="market.vue";i["default"]=o.exports},a322:function(t,i,e){"use strict";function a(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}e.d(i,"a",function(){return a})},b589:function(t,i,e){"use strict";var a=e("c094"),n=e.n(a);n.a},c094:function(t,i,e){}}]);