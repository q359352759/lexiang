<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请区域代理</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view ">
                    <li class="mui-table-view-cell item_box">
                        <span>申请人：</span>
                        <!-- <input type="text" v-model="shop_obj.name"> -->
                        <span>{{agentUser.realName}}</span>
                    </li>
                    <li class="mui-table-view-cell item_box">
                        <span>手机号：</span>
                        <span>{{agentUser.phone}}</span>
                    </li>
                    <li class="mui-table-view-cell" @click="select_city()">
                        <a class="mui-navigate-right item_box">
                            <span>申请区域：</span>
                            <span class="selset_ctiy" v-if="city.length==0">请选择</span>
                            <span class="city" v-if="city.length>0">
                                {{city[0] ? city[0].name : ''}} {{city[1] ? '/'+city[1].name : ''}} {{city[2] ? '/'+city[2].name : ''}}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="box_2">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <span><i class="icon iconfont icon-weixin weixin"></i></span>
                <span @click="change_radio_2()" class="money">
                    ￥3000
                </span>
                <span @click="change_radio_2()" class="tishi">
                    （预选区域代理诚意金）
                </span>
                <!-- <span @click="RegistrationAgreement()">《用户注册协议》</span> -->
            </div>
            <div class="box_4">
                <span @tap="ExampleOfRevenue()">区域代理收益示例</span>
            </div>
            <button @click="add()" class="box_3">确定</button>

        </div>
    </div>
</template>



<script>
import {openloading,convert} from "@/assets/js/currency";
export default {
    name:'',
    data(){
        return{
            city:[],
            shop_obj:{},
            area:[],
            cityPicker3:'',
            radio_type_2:true,
            Apply_type:1,       //1有代理商 2 没有 3 有但不合格
            userInfo:'',
        }
    },
    computed:{
        agentUser(){
            return this.$store.state.agentUser;
        },
        weixinobj() {
            return this.$store.state.weixinobj;
        }
    },
    methods:{
        //跳转收入案例
        ExampleOfRevenue(){
            this.$router.push('/ExampleOfRevenue')
        },
        change_radio_2(){
            this.radio_type_2=!this.radio_type_2;
        },
        //点击添加
        add(){
            var this_1 = this;
            if(this.city.length==0){
                mui.toast('请选择区域。', { duration: 2000, type: "div" });
                return;
            }else if(this.Apply_type==1){
                mui.toast('该区域以后代理商，请选择其他区域申请。', { duration: 2000, type: "div" });
                return;
            }
            openloading(true)
            //先支付
            this.$axios({
                method: "post",
                // url: '/api-v/pay/getSandboxSignKey',
                url: "/api-u/users/weixinpay/areaManager",
                data: this.$qs.stringify({
                    openid: this.weixinobj.openid
                })
            }).then(x => {
                openloading(false);
                this_1.Apply();      //正式环境放在支付成功后面
                console.log(x);
                var data = x.data;
                wx.chooseWXPay({
                    timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: data.paysign, // 支付签名
                    success: function(res) {
                        // 支付成功后的回调函数
                        console.log(res);
                        this_1.Apply();
                    }
                });
            }).catch(err => {
                openloading(false);
                mui.toast('支付信息错误，稍后再试。', { duration: 2000, type: "div" });
                console.log(err);
            });
        },
        //添加区域代理
        Apply(){
            openloading(true);
            var obj={
                name:this.agentUser.realName,    //姓名
                areaCode:this.city[this.city.length-1].id,    //区域编码
                phone: this.agentUser.phone ,       //电话号码 电话号码是搜索出来的
                userid:this.agentUser.userid,      //输入的电话号码的Id 需要查询出来
            }
            this.$axios({
                method:'post',
                url:'/api-u/areaManager/optAdd/'+this.userInfo.id,
                data:obj
            }).then(x=>{
                
                console.log(x);
                if(x.data.code==200){
                    this.addguanggaoji()
                }else{
                    openloading(false);
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                openloading(false);
                console.log(err);
            })
        },
        //添加广告机
        addguanggaoji(){
            var this_1=this;
            var tishi="恭喜您已成为区域代理，成功获得价值498元的广告机套餐，点击公众号内的“广告管理”使用，初始账号为您的手机号，密码为手机号后6位，请在广告机内点击“会员服务”修改密码（请勿在红包乐购中修改）。";
            var tishi1="恭喜您已成为区域代理，成功获得价值498元的广告机套餐，已经叠加到您的广告机账户。";
            var obj={
                    'username':this.userInfo.nickname ? this.userInfo.nickname : '红包乐购区域代理',
                    'pwd':this.userInfo.phone.substring(this.userInfo.phone.length-6),
                    'repwd':this.userInfo.phone.substring(this.userInfo.phone.length-6),
                    'qq':'',
                    'anums':'3600',                  //文章条数 增加的
                    'userid':this.userInfo.phone,        //手机号码
                    'beizhu1':'365',           //备注 到期天数  增加
                    'beizhu2':'红包乐购区域代理注册',
                    'shuyu':'admin',     //您的上级ID
                    'adnums':30           //广告条数
                }
            this.$axios({
                method:'post',
                url:'http://www.lxad.vip/api_register.php',
                data:this.$qs.stringify(obj)
            }).then(x=>{
                openloading(false)
                console.log(x);
                //x.data==1 表示 新增加 x.data==0表示已经有了修改了数据
                if(x.data==0 || x.data==1){
                    mui.alert(x.data==1 ? tishi : tishi1, "提示", function() {
                        // this_1.$store.commit("setagentUser"); //更新代理人信息
                        this_1.$router.push("/RegionalAgent");
                    },"div");
                }else{
                    mui.alert('注册成功区域代理商,赠送广告机失败，如有需要请联系客服。', "提示", function() {
                        // this_1.$store.commit("setagentUser"); //更新代理人信息
                        this_1.$router.push("/RegionalAgent");
                    },"div");
                }
            }).catch(error=>{
                openloading(false)
                mui.alert('注册成功区域代理商,赠送广告机失败，如有需要请联系客服。', "提示", function() {
                    // this_1.$store.commit("setagentUser"); //更新代理人信息
                    this_1.$router.push("/RegionalAgent");
                },"div");
                console.log(error);
            })
        },
        //选择地区
        select_city(){
            if(!this.cityPicker3){
                mui.toast('正在初始化地区信息。', { duration: 2000, type: "div" });
                return;
            }
            if(this.area.length==0){
                mui.toast('正在初始化地区信息。', { duration: 2000, type: "div" });
                return;
            }
            this.cityPicker3.show((items)=>{
                // console.log(items);
                this.city = items;
                this.get_areaManager();
            });
        },
        //查询区域是否有代理商
        get_areaManager(){
             openloading(true)
            this.$axios({
                method:'get',
                url:'/api-u/areaManager/findByAreaCode?areaCode='+this.city[this.city.length-1].id
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){           //有代理商
                    this.Apply_type=1
                    mui.alert('该区域已有代理商，请选择其他区域申请。', "提示", function() {
                    },"div");
                }else if(x.data.code==201){     //没有代理商
                    this.Apply_type=2
                    mui.alert('恭喜！该区域代理商尚属空缺，请第一时间申请，不然随时可能被其他代理人申请，机会只有一次！', "提示", function() {
                    },"div");
                }else if(x.data.code==202){     //有代理商不合格
                    this.Apply_type=3
                    mui.alert('该区域已有代理商，但你目前还有机会该区域代理商的备选人员，请联系我公司客服进行申请区域代理的具体事项，客服电话：<a href="tel:028-83401283">028-83401283</a>', "提示", function() {
                    },"div");
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
                openloading(false)
            }).catch(err=>{
                openloading(false)
                mui.toast('系统错误，稍后再试。', { duration: 2000, type: "div" });
                console.log(err);
            })
        }
    },
    beforeCreate: function() {
        //获取代理人信息
        this.$store.commit('setagentUser');
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        var this_1=this
        try {
            this.userInfo=JSON.parse(localStorage.userInfo)
        } catch (error) {}

        var cityData3=[];
        try {
            this.area=JSON.parse(localStorage.area);
            cityData3=JSON.parse(localStorage.cityData3)
        } catch (error) {}

        setTimeout(()=>{
            if(cityData3.length==0){
                cityData3 = convert(this.area, null);
            }
            this.cityPicker3 = new mui.PopPicker({
                layer: 3
            });
            this.cityPicker3.setData(cityData3);
        },300)
        

        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function() {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function() {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function() {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function() {
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1{
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    .item_box{
        display: flex;
        >span:nth-child(1){
            width: 0.9rem;
            flex-shrink: 0;
        }
        .city{
            width: 0;
            flex-grow: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0px 20px 0px 0px;
        }
        .selset_ctiy{
            color: rgba(217, 217, 217, 1);
        	font-size: 14px;
        }
    }
}


.box_2 {
    display: flex;
    padding: 0px 0.3rem;
    font-size: 12px;
    align-items: center;
    margin: 3px 0px 0px;
    height: 0.38rem;
    background: #ffffff;
    > span:nth-child(2) {
        margin: 0px 0px 0px 5px;
    }
    .weixin{
        font-size: 0.24rem;
        color: rgba(68, 172, 61, 1);
        margin: 0px 5px 0px 15px;
    }
    .money{
        color: rgba(212, 48, 48, 1);
    	font-size: 14px;
    }
    .tishi{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
    // > span:nth-child(3) {
    //     color: rgba(42, 130, 228, 1);
    // }
    // > span:nth-child(4) {
    //     flex-grow: 1;
    //     text-align: right;
    //     color: rgba(42, 130, 228, 1);
    // }
}

// header_background
.box_3{
    display: block;
    background: $header_background;
    width: 175px;
	height: 34px;
    padding: 0px;
    margin: 73px auto 0px;
    border-radius: 34px;
    border: none;
    color: #ffffff;
}
.box_4{
    text-align: right;
    padding: 0px 24px 10px;
    color: #007aff;
    font-size: 12px;
    background: #ffffff;
}
// 单选
.radio_1 {
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 16px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    overflow: hidden;
    i {
        font-size: 8px;
        display: none;
    }
}

.radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;

    i {
        display: inline-block;
    }
}
</style>

