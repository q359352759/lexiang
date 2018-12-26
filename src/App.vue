<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

        <transition :name="transitionName">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>

        <router-view name="circularNav"></router-view>

        <!-- <div class="hongbaotishi">
            <div>
                <div>
                    <div>恭喜你</div>
                    <div>领取成功</div> 
                </div>            
            </div>
        </div> -->
        <!-- <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
            <i class="icon iconfont icon-xuanze"></i>
        </div> -->
    </div>
</template>

<script>
import { Get_URL_parameters } from "@/assets/js/currency";
import { mapGetters,mapState, mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            transitionName: "",
            userInfo:''
        };
    },
    methods: {
        ...mapActions({
            updated_user:'user/updated_user',
            get_user:'user/get_user',
        })
    },
    beforeCreate: function() {
        //邀请注册页面 http://192.168.1.13:8080/#/Recommend?pid=9379FECD5A5C1CAB47983D6870DF6D27&invitationtype=1

        // console.log(this.$route);
        var agent = navigator.userAgent.toLowerCase();
        var hash=window.location.hash;
        if(hash.indexOf('invitationtype')!=-1){
            localStorage.yaoqing=window.location.hash;
        }
            localStorage.return_url=window.location.hash;
        if (agent.match(/MicroMessenger/i) == "micromessenger") {
            console.log("微信浏览器内访问");
            //判断是否是邀请页面
            
            var weixin = localStorage.weixin;
            var weixininfo = localStorage.weixininfo;
            if (!weixin || weixin == null || weixin == undefined || weixin == 'undefined' || !weixininfo || weixininfo==null || weixininfo==undefined || weixininfo=='undefined'){
                console.log("没有微信信息");
                // location.href = "getopenid.html";
            } else {
                console.log("已有微信信息");      
            }
        } else {
            console.log("不是微信");
        }

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
        // var path = this.$route.path;
        var path = window.location.hash;
        
        try {
            this.userInfo = JSON.parse(localStorage.userInfo)
        } catch (error) {}
        var baimingdan = [  "#/login", "#/register","#/home",
                            "#/commodity/CommodityDetails",    //首页商品详情
                            "#/BusinessDetails",     //首页商家详情
                            "#/RedEnvelopesList",     //首页商家领取红包页面
                            "#/RegistrationAgreement",
                            "#/ForgetPassword",
                            "#/Recommend",      //分享页面
                            "#/BeInvited",      //分享注册页面
                        ]; //未登录可以访问的白名单
            var index=path.indexOf('?');
            if(index!=-1){
                path=path.substring(0,index);
            }

        if (!this.userInfo) {
            console.log("没有登录准备跳转至登录");
            if (baimingdan.indexOf(path) == -1) {
                this.$router.push("/login");
                return;
            }
        }else if(!this.userInfo.headImgUrl){
            this.updated_user().then(x=>{
                console.log('修改用户头像',x)
                // this.$store.commit('setCurrent');
                this.get_user().then(res=>{
                    console.log('获取用户头像',res)
                }).catch(err=>{
                    console.log('获取头像失败',err)
                })
            }).catch(err=>{
                console.log(err)
            })
        }

        //支付宝授权后跳转地址
        // var url = Get_URL_parameters("url");
        // console.log('支付宝授权页面',url)
        // if (url) {
        //     var url_1 =location.protocol+"//"+location.host+location.pathname+"#/"+url+location.search;
        //     console.log(url_1);
        //     location.href = url_1;
        // }

        var jsApiList = [
            // 'onMenuShareTimeline',  //分享  即将废弃
            "onMenuShareAppMessage", //分享 即将废弃
            // 'onMenuShareQQ',            //分享 即将废弃
            // 'onMenuShareWeibo',         //分享到腾讯微博
            // 'onMenuShareQZone',
            "updateAppMessageShareData", //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
            // 'startRecord',      //开始录音接口
            // 'stopRecord',       //停止录音接口
            "onVoiceRecordEnd", //监听录音自动停止接口
            "playVoice", //播放语音接口
            "pauseVoice", //暂停播放接口
            "chooseWXPay", //微信支付
            // "getLocation",   //获取地理位置接口
            "openLocation",     //使用微信内置地图查看位置接口
            'scanQRCode'        //扫一扫
        ];

        // 获取js签名
        this.$axios({
            method: "post",
            // url: '/api-v/pay/getSandboxSignKey',
            url: "http://m.lxad.vip/test/jssdk/jssdk.php"
            // url: "http://m.lxad.vip/test/jssdk/jssdktest.php"
        }).then(x => {
            console.log("jssdk签名", x);
            var data = x.data;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名
                jsApiList: jsApiList // 必填，需要使用的JS接口列表
            });
            wx.ready(function() {
                console.log(123)
                this_1.$store.state.weixin_ready=true;
                // console.log('config信息验证后会执行ready方法');
            });
            wx.error(function(res) {
                console.log("config信息验证失败", res);
            });
        }).catch(err => {
            console.log(err);
        });


        //初始化一些vuex数据
        // 判断是不是微信
        var agent = navigator.userAgent.toLowerCase();
        if (agent.match(/MicroMessenger/i) == "micromessenger") {
            this.$store.state.isweixin = true;
        } else {
            this.$store.state.isweixin = false;
        }
        //登录信息
        var loginDate = localStorage.loginDate;
        this.$store.commit("setloginDate", loginDate);
        //微信登录的信息
        var weixinobj = localStorage.weixin;
        this.$store.commit("setweixinobj", weixinobj);
        //查询店铺类型
        this.$store.commit('setShopTree')
        //获取地区
        if (localStorage.area && localStorage.area != "" && localStorage.area != undefined && localStorage.area != "undefined") {
            this.$store.state.area = JSON.parse(localStorage.area);
        }
        //初始化分类
        try {
            var list=JSON.parse(localStorage.shops_tree_list);
            this.$store.state.shops_tree_list=list;
        } catch (error) {}
        //获取地区
        this.$store.dispatch('get_area');

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
        // $route(to, from) {
        //     var topath = to.path;
        //     var formpath = from.path;
        //     // sessionStorage.path=from.path;  //当前页面
        //     // console.log(to)
        //     // console.log(from)
        //     if (to.meta.index > from.meta.index) {
        //         //设置动画名称
        //         this.transitionName = "slide-left";
        //     } else {
        //         this.transitionName = "slide-right";
        //     }
        // }
    }
};
</script>


<style lang="scss">
@import "@/assets/css/config.scss";
.mui-poppicker{
    z-index: 1000;
}
.mui-table-view:after{
    display: none
}
.mui-table-view:before{
    display: none;
}


.mui-bar {
    background-color: $header_background;
    a {
        color: #ffffff;
    }
}
.mui-title {
    color: #ffffff;
}

html,
body {
    height: 100%;
    line-height: inherit;
}

#app {
    height: 100%;
}

ul {
    padding: 0px;
    margin: 0px;
}

li {
    list-style: none;
}

.mui-toast-container {
    bottom: 50%;
}
.mui-content {
    overflow: auto;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    /* will-change: transform; */
    transition: all 0.3s;
    // position: absolute;
    // width: 100%;
}
.slide-right-enter {
    opacity: 0;
    // transform: translate3d(100%, 0, 0);
}
.slide-right-leave-active {
    opacity: 0;
    // transform: translate3d(-100%, 0, 0);
}
.slide-left-enter {
    opacity: 0;
    // transform: translate3d(-100%, 0, 0);
}
.slide-left-leave-active {
    opacity: 0;
    // transform: translate3d(100%, 0, 0);
}

.radio_1 {
    display: inline-block;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 12px;
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
