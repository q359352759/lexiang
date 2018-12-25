<template>
    <div id="Advertising">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <!-- <h1 class="mui-title">{{this.$store.state.isweixin ? "":"广告机"}}</h1> -->
            <h1 class="mui-title" >广告机</h1>
            <span v-if="jihuoma" @click="jihuo(true)">激活</span>
        </header>
        <div class="mui-content">
            <div class="box_1">
                <img src="image/7.jpg" alt="">
            </div>

            <ul class="mui-table-view box_2">
                <li class="mui-table-view-cell">
                    <div>一键拨号：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>一键微信：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>一键跳转：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>悬浮广告：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>语音广告：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>全屏广告：</div>
                    <div>支持！</div>
                </li>
            </ul>

            <ul class="mui-table-view box_2">
                <li class="mui-table-view-cell">
                    <div>广告数量：</div>
                    <div>3600条！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>有效时长：</div>
                    <div>365天！</div>
                </li>
            </ul>

            <ul class="mui-table-view box_2">
                <li class="mui-table-view-cell">
                    <div>套餐价格：</div>
                    <div>498元</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>平均价格:</div>
                    <div>0.14元/条</div>
                </li>
            </ul>

            <ul class="box_3">
                <li @click="video_Exhibition()">视频介绍</li>
                <li @tap="EffectDisplay()">效果展示</li>
            </ul>
            <div class="Agreement">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <span><i class="icon iconfont icon-weixin weixin"></i></span>
                <span @click="change_radio_2()">
                    微信支付
                </span>
                <!-- <span @click="RegistrationAgreement()">《用户注册协议》</span> -->
            </div>
            <!-- <button @click="goumai()" class="btn_1">购买</button> -->
            <div class="btn_1">
                <btn @click.native="goumai()" value="购买"/>
            </div>
        </div>

        <div class="jihuo_box" v-show="jihuo_box">
            <div class="cont_1">
                <div class="close_1" @click="jihuo(false)"><i class="icon iconfont icon-quxiao"></i></div>
                <ul class="header_1">
                    <li>你有一个套餐</li>
                    <li>可直接激活</li>
                </ul>
                <ul class="shuru">
                    <li>
                        <div>手机：</div>
                        <div><input type="text" v-model="jihuo_obj.phone" placeholder="请输入客户手机号" required></div>
                    </li>
                    <li>
                        <div>手机：</div>
                        <div><input type="password" v-model="jihuo_obj.pwd" placeholder="请输入初始密码" required></div>
                    </li>
                </ul>
                <div class="btn_1">
                    <btn @click.native="use()" value="激活"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {openloading } from "@/assets/js/currency";
import btn from '@/components/button.vue';

export default {
    name: "",
    components: {
        btn  
    },
    data() {
        return {
            radio_type_2: true,
            userInfo:'',
            jihuoma:'',
            jihuo_box:false,
            jihuo_obj:{
                username:'',
                phone:'',
                pwd:''
            }
        };
    },
    computed: {
        weixinobj() {
            return this.$store.state.weixinobj;
        }
    },
    methods: {
        //购买
        goumai() {
            var this_1=this;
            // mui.toast("功能开发中！", { duration: 2000, type: "div" });
            openloading(true);

            this.$axios({
                method:'post',
                url:'/api-u/users/weixinpay/guanggaoji',
                data:this.$qs.stringify({'openid':this.weixinobj.openid})
            }).then(x=>{
                console.log(x);
                openloading(false);
                var data = x.data;
                setTimeout(function(){
                    wx.chooseWXPay({
                        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paysign, // 支付签名
                        success: function(res) {
                            // 支付成功后的回调函数
                            console.log(res);
                            this_1.addguanggaoji()
                        }
                    });
                },1000)
            }).catch(error=>{
                console.log(error);
                openloading(false);
                mui.toast("系统错误，请稍后再试。", { duration: 2000, type: "div" });
            })
        },
        addguanggaoji(){
            var this_1=this;
            var tishi="恭喜您购买广告机成功，点击公众号内的“广告管理”使用，初始账号为您的手机号，密码为手机号后6位，请在广告机内点击“会员服务”修改密码（请勿在红包乐购中修改）。";
            var tishi1="恭喜您成功获得广告机套餐，已经叠加到您的广告机账户。";
            var obj={
                    'username':this.userInfo.nickname ? this.userInfo.nickname : '红包乐购',
                    'pwd':this.userInfo.phone.substring(this.userInfo.phone.length-6),
                    'repwd':this.userInfo.phone.substring(this.userInfo.phone.length-6),
                    'qq':'',
                    'anums':'3600',                  //文章条数 增加的
                    'userid':this.userInfo.phone,        //手机号码
                    'beizhu1':'365',           //备注 到期天数  增加
                    'beizhu2':'红包乐购单独购买',
                    'shuyu':'admin',     //您的上级ID
                    'adnums':30           //广告条数
                }
            this.$axios({
                method:'post',
                // http://www.lxad.vip/index.php
                url:'http://www.lxad.vip/api_register.php',
                data:this.$qs.stringify(obj)
            }).then(x=>{
                openloading(false)
                console.log(x);
                //x.data==1 表示 新增加 x.data==0表示已经有了修改了数据
                if(x.data==0 || x.data==1){
                    mui.alert(x.data==1 ? tishi : tishi1, "提示", function() {},"div");
                }else{
                    mui.alert('支付成功，购买广告机失败请联系客服。', "提示", function() {
                    },"div");
                }
                openloading(true)
            }).catch(error=>{
                openloading(false)
                mui.alert('支付成功，购买广告机失败请联系客服。', "提示", function() {
                },"div");
                console.log(error);
            })
        },

        //
        jihuo(x){
            this.jihuo_box=x;
        },
        //视频展示
        video_Exhibition(){
            window.location.href="http://www.lxad.vip/about_1.php"
        },
        //效果展示
        EffectDisplay(){
            window.location.href="http://www.lxad.vip/view_1.php?fid=1542077512213"
        },
        //获取广告机激活状态
        get_angentActivation(){
            var obj={
                    username:this.userInfo.username
                }
            this.$axios.post('http://www.lxad.vip/api/get_angentActivation.php',this.$qs.stringify(obj)).then(x=>{
                console.log(x)
                if(x.data){
                    this.jihuoma=x.data;
                }else{
                    this.jihuoma='';
                }
            }).catch(err=>{
                this.jihuoma='';
                console.log(err);
            })
        },
        use(){

            var phone_test=/^[1][0-9]{10}/;
            if(!this.jihuo_obj.phone || !phone_test.test(this.jihuo_obj.phone)){
                mui.toast('请输入正确电话号码。', { duration: 2000, type: "div" });                 
                return
            }else if(!this.jihuo_obj.pwd || this.jihuo_obj.pwd.length<6 || this.jihuo_obj.pwd.length>12){
                mui.toast('密码为6-12位。', { duration: 2000, type: "div" });
                return;
            }
            openloading(true);
            this.jihuo_obj.username=this.userInfo.username;
            this.$axios.post('http://www.lxad.vip/api/use_angentActivation.php',this.$qs.stringify(this.jihuo_obj)).then(x=>{
                console.log(x)
                openloading(false);
                var tishi="恭喜您激活成功，点击公众号内的“广告管理”使用，请在广告机内点击“会员服务”修改密码（请勿在红包乐购中修改）。";
                var tishi1="恭喜您激活成功，已经叠加到您的广告机账户。";
                if(x.data==0 || x.data==1){
                    mui.alert(x.data==1 ? tishi : tishi1, "提示", function() {},"div");
                }else{
                    mui.alert(x.data, "提示", function() {},"div");
                }
                this.get_angentActivation();
                this.jihuo_box=false;
                
            }).catch(err=>{
                console.log(err);
                openloading(false);
                this.jihuo_box=false;
                this.get_angentActivation();
                mui.alert('激活失败，请联系管理员。', "提示", function() {},"div");
            })
        }
    },
    beforeCreate: function() {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}

        this.get_angentActivation();
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
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
#Advertising {
    height: 100%;
    .mui-content {
        height: 100%;
        // background: #ffffff;
    }
}
#Advertising .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
    span{
        position: absolute;
        color: rgba(255, 255, 255, 1);
    	font-size: 14px;
        line-height: 44px;
        top: 0px;
        right: 15px;
    }
}
#Advertising .mui-title {
    color: #ffffff;
}

#Advertising .box_1 {
    img {
        width: 100%;
    }
}

#Advertising .box_2 {
    margin: 5px 0px 0px 0px;
    font-size: 0.14rem;
    .mui-table-view-cell {
        display: flex;
        padding: 0.1rem 0px;
        > div:nth-child(1) {
            width: 1.1rem;
            text-align: right;
            color: rgba(80, 80, 80, 1);
        }
        > div:nth-child(2) {
            flex-grow: 1;
            text-align: center;
            color: rgba(212, 48, 48, 1);
            font-weight: bold;
        }
    }
    .mui-table-view-cell::after {
        left: 0px;
    }
}
#Advertising .box_3 {
    padding: 0.1rem;
    display: flex;
    justify-content: space-around;
    li {
        font-size: 0.11rem;
        background: #ffffff;
        color: $header_background;
        height: 0.2rem;
        line-height: 0.2rem;
        padding: 0px 10px;
        border-radius: 0.2rem;
    }
}

#Advertising .Agreement {
    display: flex;
    padding: 0px 0.3rem;
    font-size: 12px;
    align-items: center;
    margin: 0px 0px;
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
    // > span:nth-child(3) {
    //     color: rgba(42, 130, 228, 1);
    // }
    // > span:nth-child(4) {
    //     flex-grow: 1;
    //     text-align: right;
    //     color: rgba(42, 130, 228, 1);
    // }
}

#Advertising .btn_1 {
    margin: 0.18rem auto 0.5rem;
}

// 单选
#Advertising .radio_1 {
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 16px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    overflow: hidden;
    i {
        font-size: 18px;
        display: none;
    }
}
#Advertising .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
    }
}

#Advertising .jihuo_box{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    .cont_1{
        width: 239px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 16px;
        font-size: 14px;
        position: relative;
    }
    .close_1{
        position: absolute;
        top: 12px;
        right: 12px;
        color: #999999;
    }
    .header_1{
        padding: 14px 0px 18px;
        font-weight: bold;
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
        text-align: center;
    }
    .shuru{
        li{
            display: flex;
            align-items: center;
            margin: 0px 0px 11px 0px;
            div:nth-child(1){
                width: 80px;
                text-align: right;
                flex-shrink: 0;
            }
            div:nth-child(2){
                flex-grow: 1;
                padding: 0px 14px 0px 0px;
            }
            input{
                height: 27px;
                color: rgba(166, 166, 166, 1);
                background-color: rgba(246, 246, 246, 1);
                font-size: 14px;
                padding: 0px 5px 0px;
                margin: 0px;
                border:none;
            }
        }
    }
    .btn_1{
        margin: 26px 0px 35px;
    }
}
</style>
