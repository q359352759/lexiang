(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fee1a89"],{"0443":function(i,e,n){"use strict";var a=n("4ff8"),t=n.n(a);t.a},"4ff8":function(i,e,n){},6515:function(i,e,n){i.exports=n.p+"assets/img/4.6130945b.png"},"7f7f":function(i,e,n){var a=n("86cc").f,t=Function.prototype,o=/^\s*function ([^ (]*)/,s="name";s in t||n("9e1e")&&a(t,s,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(i){return""}}})},a322:function(i,e,n){"use strict";function a(i,e,n){return e in i?Object.defineProperty(i,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[e]=n,i}n.d(e,"a",function(){return a})},b203:function(i,e,n){i.exports=n.p+"assets/img/3.b218e78f.png"},f4a0:function(i,e,n){"use strict";n.r(e);var a=function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("div",{attrs:{id:"RealName"}},[a("header",{staticClass:"mui-bar mui-bar-nav"},[a("a",{staticClass:"mui-action-back mui-icon mui-icon-left-nav mui-pull-left"}),a("h1",{staticClass:"mui-title"},[i._v(i._s(this.$store.state.isweixin?"":"实名认证"))])]),a("div",{staticClass:"mui-content"},[a("ul",{directives:[{name:"show",rawName:"v-show",value:!i.Uncertified,expression:"!Uncertified"}],staticClass:"box_1"},[a("li",{staticClass:"zhengmian",on:{click:function(e){i.zhengmian(!0)}}},[a("span",{directives:[{name:"show",rawName:"v-show",value:""==i.zhengmian_img,expression:"zhengmian_img==''"}]},[i._v("请选择身份证正面")]),a("div",{directives:[{name:"show",rawName:"v-show",value:""==i.zhengmian_img,expression:"zhengmian_img==''"}]},[a("img",{attrs:{src:n("6515"),alt:""}})]),a("img",{directives:[{name:"show",rawName:"v-show",value:""!=i.zhengmian_img,expression:"zhengmian_img!=''"}],attrs:{src:i.zhengmian_img,alt:""}}),a("div",{directives:[{name:"show",rawName:"v-show",value:i.zhengmian_loading,expression:"zhengmian_loading"}],staticClass:"loading"},[i._m(0)])]),a("li",{staticClass:"beimian",on:{click:function(e){i.zhengmian(!1)}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:""==i.fanmian_img,expression:"fanmian_img==''"}]},[a("img",{attrs:{src:n("b203"),alt:""}})]),a("span",{directives:[{name:"show",rawName:"v-show",value:""==i.fanmian_img,expression:"fanmian_img==''"}]},[i._v("请选择身份证背面")]),a("img",{directives:[{name:"show",rawName:"v-show",value:""!=i.fanmian_img,expression:"fanmian_img!=''"}],attrs:{src:i.fanmian_img,alt:""}}),a("div",{directives:[{name:"show",rawName:"v-show",value:i.fanmian_loading,expression:"fanmian_loading"}],staticClass:"loading"},[i._m(1)])])]),a("ul",{staticClass:"box_2"},[a("li",{directives:[{name:"show",rawName:"v-show",value:i.zhengmian_ok,expression:"zhengmian_ok"}]},[a("div",[i._v("姓名")]),a("div",[i._v(i._s(i.Positive_obj.name))])]),a("li",{directives:[{name:"show",rawName:"v-show",value:i.zhengmian_ok,expression:"zhengmian_ok"}]},[a("div",[i._v("性别")]),a("div",[i._v(i._s(i.Positive_obj.sex))])]),a("li",{directives:[{name:"show",rawName:"v-show",value:i.zhengmian_ok,expression:"zhengmian_ok"}]},[a("div",[i._v("名族")]),a("div",[i._v(i._s(i.Positive_obj.nation))])]),a("li",{directives:[{name:"show",rawName:"v-show",value:i.zhengmian_ok,expression:"zhengmian_ok"}]},[a("div",[i._v("出生")]),a("div",[i._v(i._s(i.Positive_obj.birthday))])]),a("li",{directives:[{name:"show",rawName:"v-show",value:i.zhengmian_ok,expression:"zhengmian_ok"}]},[a("div",[i._v("住址")]),a("div",[i._v(i._s(i.Positive_obj.address))])]),a("li",{directives:[{name:"show",rawName:"v-show",value:i.zhengmian_ok,expression:"zhengmian_ok"}]},[a("div",[i._v("身份证号")]),a("div",[i._v(i._s(i.Positive_obj.idNumber))])]),a("li",{directives:[{name:"show",rawName:"v-show",value:i.fanmian_ok,expression:"fanmian_ok"}]},[a("div",[i._v("签发机关")]),a("div",[i._v(i._s(i.The_other_side.issueArea))])]),a("li",{directives:[{name:"show",rawName:"v-show",value:i.fanmian_ok,expression:"fanmian_ok"}]},[a("div",[i._v("有效期")]),a("div",[i._v("\n                    "+i._s(i.The_other_side.Invalid)+"\n                ")])])]),a("button",{staticClass:"btn_1",on:{click:function(e){i.add()}}},[i._v("提交审核")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:i.add_loading,expression:"add_loading"}],staticClass:"loading loading_1"},[i._m(2)]),a("div",{directives:[{name:"show",rawName:"v-show",value:i.Cropper_show,expression:"Cropper_show"}],staticClass:"Cropper_box",class:{zhengmian:i.Positive,fanmian:!i.Positive}},[a("div",{staticClass:"cont_1"},[a("VueCropper",{ref:"cropper",attrs:{img:i.option.img,outputSize:i.option.size,outputType:i.option.outputType,info:!0,full:i.option.full,canMove:i.option.canMove,fixedBox:i.option.fixedBox,canMoveBox:i.option.canMoveBox,autoCrop:!0,autoCropWidth:350,autoCropHeight:220}})],1),a("ul",{staticClass:"footer_1"},[a("li",{on:{click:function(e){i.close_1()}}},[a("i",{staticClass:"icon iconfont icon-quxiao"})]),a("li",{on:{click:function(e){i.rotateLeft()}}},[a("i",{staticClass:"icon iconfont icon-xuanzhuan1"})]),a("li",{on:{click:function(e){i.rotateRight()}}},[a("i",{staticClass:"icon iconfont icon-xuanzhuan"})]),a("li",{on:{click:function(e){i.confirm()}}},[a("i",{staticClass:"icon iconfont icon-xuanze"})])])]),a("div",{attrs:{id:"zhengmianInput"}},[a("input",{attrs:{type:"file",accept:"*/image",name:"",id:""},on:{change:function(e){i.input_change(e)}}})])])},t=[function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("div",[n("i",{staticClass:"mui-icon mui-icon-spinner mui-spin"})])},function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("div",[n("i",{staticClass:"mui-icon mui-icon-spinner mui-spin"})])},function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("div",[n("i",{staticClass:"mui-icon mui-icon-spinner mui-spin"})])}],o=(n("7f7f"),n("a322")),s=n("7e79"),r={name:"RealName",components:{VueCropper:s["VueCropper"]},data:function(){return{add_loading:!1,zhengmian_ok:!1,fanmian_ok:!1,zhengmian_loading:!1,fanmian_loading:!1,Cropper_show:!1,Uncertified:!1,zhengmian_img:"",fanmian_img:"",access_token:"",Positive:!0,option:Object(o["a"])({img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!0,original:!1,canMoveBox:!1,autoCrop:!0},"outputType","jpeg"),Positive_obj:{address:"",idNumber:"",birthday:"",name:"",sex:"",nation:""},The_other_side:{Invalid:"",Date_of_issue:"",issueArea:""},image_status:{normal:"识别正常",reversed_side:"身份证正反面颠倒",non_idcard:"上传的图片中不包含身份证",blurred:"身份证模糊",other_type_card:"其他类型证照",over_exposure:"身份证关键字段反光或过曝",unknown:"未知状态"}}},computed:{userinfo:function(){return this.$store.state.userInfo}},methods:{rotateLeft:function(){this.$refs.cropper.rotateLeft()},rotateRight:function(){this.$refs.cropper.rotateRight()},confirm:function(){var i=this;this.Cropper_show=!1,this.$refs.cropper.getCropData(function(e){i.Positive?i.zhengmian_img=e:i.fanmian_img=e,i.idcard(i.Positive)})},close_1:function(){this.Cropper_show=!1},realTime:function(i){this.previews=i},get_token:function(){var i=this;this.$axios({method:"get",url:"/api-u/baidu/identify"}).then(function(e){console.log(e),i.access_token=e.data}).catch(function(i){console.log(i)})},zhengmian:function(i){this.Positive=i,document.getElementById("zhengmianInput").getElementsByTagName("input")[0].click()},input_change:function(i){console.log(i);var e=this,n=i.target.files[0],a=new FileReader;a.readAsDataURL(n),a.onloadend=function(){e.Cropper_show=!0,e.option.img=a.result}},idcard:function(i){var e=this;i?this.zhengmian_loading=!0:this.fanmian_loading=!0;var n={id_card_side:this.Positive?"front":"back",image:this.Positive?this.zhengmian_img.substring(this.zhengmian_img.indexOf("4")+2):this.fanmian_img.substring(this.fanmian_img.indexOf("4")+2),detect_direction:!0};this.$axios({method:"post",url:"https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token="+this.access_token,data:this.$qs.stringify(n)}).then(function(n){if(console.log(n),"normal"==n.data.image_status){var a=n.data.words_result;i?(e.zhengmian_ok=!0,e.zhengmian_loading=!1,e.Positive_obj={address:a["住址"].words,idNumber:a["公民身份号码"].words,birthday:a["出生"].words,name:a["姓名"].words,sex:a["性别"].words,nation:a["民族"].words}):(e.fanmian_ok=!0,e.fanmian_loading=!1,e.The_other_side={Invalid:a["失效日期"].words,Date_of_issue:a["签发日期"].words,issueArea:a["签发机关"].words})}else i?e.zhengmian_loading=!1:e.fanmian_loading=!1,mui.toast(e.image_status[n.data.image_status],{duration:2e3,type:"div"})}).catch(function(i){console.log(i)})},add:function(){var i=this;if(this.zhengmian_ok&&this.fanmian_ok){this.add_loading=!0;var e={userid:this.userinfo.username,name:this.Positive_obj.name,nation:this.Positive_obj.nation,birthday:this.Positive_obj.birthday,address:this.Positive_obj.address,idNumber:this.Positive_obj.idNumber,issueArea:this.The_other_side.issueArea,frontImg:this.zhengmian_img,reverseImg:this.fanmian_img};this.$axios({method:"post",data:e,url:"/api-u/certification/add"}).then(function(e){console.log("实名认证",e),e.data.error?mui.alert(e.data.error,"提示",function(){},"div"):(i.$store.commit("setCurrent"),mui.alert("认证成功","提示",function(){history.back()},"div")),i.add_loading=!1}).catch(function(e){i.add_loading=!1,console.log("实名认证错误",e),mui.alert("认证失败，稍后再试！","提示",function(){},"div")})}else mui.toast("请先上传完整的证件照！",{duration:2e3,type:"div"})}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$store.state.isweixin&&(document.getElementsByTagName("title")[0].innerText="实名认证"),this.get_token(),console.log(this.userinfo)},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},watch:{userinfo:function(i){this.$store.commit("setagentUser")}}},c=r,m=(n("0443"),n("2877")),u=Object(m["a"])(c,a,t,!1,null,null,null);u.options.__file="RealName.vue";e["default"]=u.exports}}]);