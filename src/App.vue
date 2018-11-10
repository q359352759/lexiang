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
    </div>
</template>

<script>
import { Get_URL_parameters } from "@/assets/js/currency";
export default {
    name: "",
    data() {
        return {
            transitionName: ""
        };
    },
    methods: {},
    beforeCreate: function() {
        // console.log(this.$route);
        var agent = navigator.userAgent.toLowerCase();
        if (agent.match(/MicroMessenger/i) == "micromessenger") {
            // return true;
            console.log("微信浏览器内访问");
            var path = this.$route.path;
            var weixin = localStorage.weixin;
            if (!weixin || weixin == null || weixin == undefined) {
                console.log('没有微信信息')
                // location.href = "getopenid.html?url=" + path;
            } else {
                console.log("已有微信信息");
                //检测是否登录
            }
        } else {
            // return false;
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
        // var path = this.$route.path;
        var path = window.location.hash;
        var loginDate = localStorage.loginDate;
        var baimingdan = ["#/login", "#/register", "#/RegistrationAgreement"]; //未登录可以访问的白名单
        if (!loginDate || loginDate == null || loginDate == undefined) {
            if (baimingdan.indexOf(path) == -1) {
                console.log("没有登录准备跳转至登录");
                // this.$router.push("/login");
            }
            return;
        }


        //支付宝授权后跳转地址
        var url = Get_URL_parameters("url");
        if (url) {
            var url_1 =
                location.protocol +
                "//" +
                location.host +
                location.pathname +
                "#/" +
                url +
                location.search;
            console.log(url_1);
            location.href = url_1;
        }

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
            // "getLocation",  //获取地理位置接口
            "openLocation", //使用微信内置地图查看位置接口
        ];

        // 获取js签名
        this.$axios({
            method: "post",
            // url: '/api-v/pay/getSandboxSignKey',
            // url: "http://m.lxad.vip/test/jssdk/jssdk.php"
            url: "http://m.lxad.vip/test/jssdk/jssdktest.php"
        })
            .then(x => {
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
            })
            .catch(err => {
                console.log(err);
            });

        wx.ready(function() {
            // console.log('config信息验证后会执行ready方法');
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
        wx.error(function(res) {
            console.log("config信息验证失败", res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });

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
        $route(to, from) {
            var topath = to.path;
            var formpath = from.path;
            // sessionStorage.path=from.path;  //当前页面
            // console.log(to)
            // console.log(from)
            if (to.meta.index > from.meta.index) {
                //设置动画名称
                this.transitionName = "slide-left";
            } else {
                this.transitionName = "slide-right";
            }
        }
    }
};
</script>


<style lang="scss">
@import "@/assets/css/config.scss";

.mui-bar{
    background-color: $header_background;
    a{
        color: #ffffff;
    }
}
.mui-title {
    color: #ffffff;
}



html,
body {
    height: 100%;
    line-height: initial;
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
</style>
