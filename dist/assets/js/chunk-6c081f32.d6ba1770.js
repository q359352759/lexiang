(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c081f32"],{"0458":function(t,e,i){"use strict";var n=i("6a10"),a=i.n(n);a.a},"6a10":function(t,e,i){},"7f7f":function(t,e,i){var n=i("86cc").f,a=Function.prototype,o=/^\s*function ([^ (]*)/,s="name";s in a||i("9e1e")&&n(a,s,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},af18:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"ApplicationAgent"}},[i("header",{staticClass:"mui-bar mui-bar-nav"},[i("a",{staticClass:"mui-action-back mui-icon mui-icon-left-nav mui-pull-left"}),i("h1",{staticClass:"mui-title"},[t._v(t._s(this.$store.state.isweixin?"":"申请代理人"))])]),i("div",{staticClass:"mui-content"},[i("form",{on:{submit:function(e){e.preventDefault(),t.add()}}},[i("table",{staticClass:"table_1"},[i("tbody",[i("tr",[i("td",[t._v("申请人：")]),i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.realName,expression:"realName"}],attrs:{type:"text",maxlength:"10",placeholder:"您的真实名字",required:""},domProps:{value:t.realName},on:{input:function(e){e.target.composing||(t.realName=e.target.value)}}})])]),i("tr",[i("td",[t._v("推荐人：")]),i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.referrerPhone,expression:"referrerPhone"}],attrs:{type:"text",pattern:"^1\\d{10}$",placeholder:"推荐人电话号码"},domProps:{value:t.referrerPhone},on:{input:function(e){e.target.composing||(t.referrerPhone=e.target.value)}}})])]),i("tr",[i("td",[t._v("实名认证：")]),i("td",{on:{click:function(e){t.renzheng()}}},[i("span",{staticClass:"Authentication",class:{active:0==t.userInfo.iaiState}},[t._v(t._s(0==t.userInfo.iaiState?"未认证":"已认证"))]),i("i",{staticClass:"mui-icon mui-icon-arrowright mui-pull-right"})])]),i("tr",[i("td",[t._v("申请区域：")]),i("td",{on:{click:function(e){t.change_city()}}},[t._m(0),i("span",{staticClass:"region"},[t._v("\n                                "+t._s(0==t.city.length?"选择区域":"")+"\n                                "+t._s(t.city[0]?t.city[0].text:"")+"\n                                "+t._s(t.city[1]&&t.city[1].text?" "+t.city[1].text:"")+"\n                                "+t._s(t.city[2]&&t.city[2].text?" "+t.city[2].text:"")+"\n                            ")])])]),t._m(1)])]),t._m(2),i("ul",{staticClass:"box_3"},[i("li",{on:{click:function(e){t.change_radio_1(1)}}},[i("div",{staticClass:"radio_1 ",class:{active:1==t.radio_type_1}},[i("i",{staticClass:"icon iconfont icon-xuanze"})]),i("i",{staticClass:"icon iconfont icon-weixin weixin"}),i("span",[t._v("微信支付")])]),i("li",{staticClass:"haochu"},[i("span",{on:{click:function(e){t.AgentAdvantage()}}},[t._v("\n                        成为代理人的好处？\n                    ")])])]),i("div",{staticClass:"box_4"},[i("div",{staticClass:"radio_1",class:{active:t.radio_type_2},on:{click:function(e){t.change_radio_2()}}},[i("i",{staticClass:"icon iconfont icon-xuanze"})]),i("span",{on:{click:function(e){t.change_radio_2()}}},[t._v("我也阅读并同意")]),i("span",{on:{click:function(e){t.BusinessAgreement()}}},[t._v("《业务代理合作协议》")])]),i("button",{staticClass:"btn_1",attrs:{type:"submit"}},[t._v("确定")])])]),i("circularNav")],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"Surplus mui-pull-right"},[i("i",{staticClass:"mui-icon mui-icon-arrowright "})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("tr",[i("td",[t._v("费  用：")]),i("td",{staticClass:"money"},[i("span",[t._v("￥88")]),i("span",[t._v("(vip年费：买一赠三，所有商品优惠5%-50%)")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box_2"},[i("span",[t._v("\n                    支付方式：\n                ")])])}],o=(i("7f7f"),i("cadf"),i("551c"),i("097d"),i("1aa4")),s={name:"ApplicationAgent",components:{circularNav:o["a"]},data:function(){return{radio_type_1:1,radio_type_2:!0,cityPicker3:"",city:[],realName:"",referrerPhone:"",areaCode:"",mo:.1,userInfo:"",Authentication:{}}},computed:{weixinobj:function(){return this.$store.state.weixinobj}},methods:{renzheng:function(){0==this.userInfo.iaiState?this.$router.push("/RealName"):this.$router.push("/AlreadyRealName")},AgentAdvantage:function(){this.$router.push("/AgentAdvantage")},BusinessAgreement:function(){this.$router.push("/BusinessAgreement?name=名字")},change_radio_1:function(t){this.radio_type_1=t},change_radio_2:function(){this.radio_type_2=!this.radio_type_2},change_city:function(){var t=this;this.cityPicker3.show(function(e){console.log(e),t.city=e})},add:function(){0!=this.city.length?this.radio_type_2?this.$axios({method:"post",url:"/wxpay/h5pay/order",data:this.$qs.stringify({openid:this.weixinobj.openid})}).then(function(t){console.log(t);var e=t.data;wx.chooseWXPay({timestamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paysign,success:function(t){console.log(t),this.registered()}})}).catch(function(t){console.log(t)}):mui.toast("请同意业务代理合作协议!",{duration:2e3,type:"div"}):mui.toast("请选择区域",{duration:2e3,type:"div"})},registered:function(){var t=this;if(this.referrerPhone){var e="";this.city[2].value?e=this.city[2].value:this.city[1].value?e=this.city[1].value:this.city[0].value&&(e=this.city[0].value);var i={referrerPhone:this.referrerPhone,areaCode:e,realName:this.realName,userid:this.$store.state.userInfo.username};this.$axios({method:"post",url:"/api-u/agentUser/registered",data:i}).then(function(e){console.log(e),e.data.code?mui.toast(e.data.message,{duration:2e3,type:"div"}):mui.alert("申请成功","提示",function(){t.$store.commit("setagentUser"),t.$router.push("/Agent")},"div")}).catch(function(t){console.log(t),mui.toast("系统错误请稍后再试！",{duration:2e3,type:"div"})})}else mui.toast("请填写推荐人号码",{duration:2e3,type:"div"})}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){var t=this;this.$store.state.isweixin&&(document.getElementsByTagName("title")[0].innerText="申请代理人"),localStorage.userInfo&&(this.userInfo=JSON.parse(localStorage.userInfo)),this.$axios({method:"get",url:"/api-u/agentUser/me?userid="+this.userInfo.phone}).then(function(e){console.log("获取用户代理人信息",e),200==e.data.code&&t.$router.push("/Agent")}).catch(function(t){console.log("获取代理人信息失败")}),this.$axios({method:"get",url:"/api-u/certification/findByUserid?userid="+this.userInfo.username}).then(function(e){console.log("获取认证信息",e),""!=e.data&&(t.Authentication=e.data,t.realName=e.data.name)}).catch(function(t){console.log("获取认证信息错误",t)}),this.$axios({method:"get",url:"/api-u/area/findAll",params:{start:0,length:3e4}}).then(function(e){function i(t,e){for(var n=[],a=0;a<t.length;a++)t[a].value=t[a].id,t[a].text=t[a].name,t[a].parentid==e&&(n.push(t[a]),t[a].children=i(t,t[a].id));return n}var n=i(e.data.data,null);t.cityPicker3=new mui.PopPicker({layer:3}),t.cityPicker3.setData(n),console.log("递归后的数据",n)}).catch(function(t){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},watch:{userInfo:function(t){console.log(t)}}},r=s,c=(i("0458"),i("2877")),u=Object(c["a"])(r,n,a,!1,null,null,null);u.options.__file="ApplicationAgent.vue";e["default"]=u.exports}}]);