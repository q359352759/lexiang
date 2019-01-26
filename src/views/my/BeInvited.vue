<template>
    <div>
        <!-- <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">
                红购
            </h1>
        </header> -->
        <div class="mui-content mui-fullscreen">
            <div class="full" :style="{'height':height}">
                <div class="box_1">
                    <img src="image/bg_4.jpg" alt="">
                </div>
                <div class="box_3">
                    <img src="image/redpackage_1.png" alt="" srcset="">
                    <div>
                        <span>20</span>
                        <span>元</span>
                    </div>
                </div>
                <ul class="box_4">
                    <li>注册即可到账红包20元</li>
                    <li>天天领红包，每笔消费都实惠！</li>
                    <li>线下红包购物第一平台</li>
                </ul>
                <form @submit.prevent="register()" class="box_2">
                    <ul>
                        <li>
                            <i class="icon iconfont icon-shouji1"></i>
                            <input type="text" v-model="phone">
                            <span v-if="!phone" class="tishi">手机号码</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-yanzhengma"></i>
                            <input type="text" v-model="code">
                            <span @tap="get_codes()">{{time==0 ? '获取验证码' : time+'s'}}</span>
                            <span v-if="!code" class="tishi">验证码</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-mima"></i>
                            <input type="password" v-model="password">
                            <span v-if="!password" class="tishi">登录密码</span>
                        </li>
                    </ul>
                    <button type="submit">领&nbsp;&nbsp;取</button>
                </form>

                <div @click="go_login()" class="login">已有账号，去登陆</div>
                <div class="box_5">
                    <img src="image/bg_5.png" alt="" srcset="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";
export default {
    name: "",
    data() {
        return {
            pid: "", //  邀请的父元素Id
            invitationtype: "", //  邀请类型 1普通用户邀请注册
            //==========
            time: 0, //
            phone: "",
            code: "",
            key: "",
            password: "",
            height: "100%"
        };
    },
    methods: {
        //跳转登录
        go_login() {
            this.$router.push("/login");
        },
        //获取手机验证码
        get_codes() {
            var phone_test = /^1\d{10}$/;
            if (this.time != 0) {
                return;
            } else if (this.phone == "" || !phone_test.test(this.phone)) {
                mui.toast("请输入手机号码。", { duration: 2000, type: "div" });
                return;
            }
            var this_1 = this;
            this.time = 60;
            var time = setInterval(function () {
                this_1.time--;
                if (this_1.time == 0) {
                    clearInterval(time);
                }
            }, 1000);
            this.$axios({
                method: "post",
                url: "/api-n/notification-anon/codes?phone=" + this.phone
            }).then(x => {
                console.log(x);
                localStorage.keys = x.data.key;
            }).catch(err => {
                console.log(err);
                mui.toast("系统错误,稍后再试。", { duration: 2000, type: "div" });
            });
        },
        //注册
        register() {
            if (!this.phone) {
                mui.toast("请填写手机号码。", { duration: 2000, type: "div" });
                return;
            } else if (!this.code) {
                mui.toast("请填写验证码。", { duration: 2000, type: "div" });
                return;
            } else if (!this.password) {
                mui.toast("请填写密码。", { duration: 2000, type: "div" });
                return;
            }
            openloading(true);
            this.$axios({
                method: "post",
                url: "/api-u/users-anon/register?phone=" + this.phone + "&key=" + localStorage.keys + "&code=" + this.code,
                data: {
                    username: this.phone,
                    password: this.password,
                    phone: this.phone,
                    referrerid: this.pid
                }
            }).then(x => {
                console.log(x);
                if (x.data.code == 200) {
                    mui.toast("注册成功", { duration: 2000, type: "div" });
                    this.$router.push("/login");
                } else {
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                }
                openloading(false);
            }).catch(err => {
                console.log(err);
                mui.toast("系统错误，请稍后再试。", { duration: 2000, type: "div" });
                openloading(false);
            });
        }
    },
    created: function () {
        var userInfo = "";
        try {
            userInfo = JSON.parse(localStorage.userInfo);
        } catch (error) { }
        if (userInfo) {
            this.$router.push("/my");
        }
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function () {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted() {
        console.log(window.innerHeight);
        this.height = window.innerHeight + "px";
        //获取邀请信息
        if (localStorage.yaoqing) {
            var yaoqing = localStorage.yaoqing;
            var pid = yaoqing.substring(
                yaoqing.indexOf("pid") + 4,
                yaoqing.indexOf("&")
            );
            var invitationtype = yaoqing.substring(
                yaoqing.lastIndexOf("invitationtype") + 15
            );
            this.pid = pid;
            this.invitationtype = invitationtype;
            // console.log(pid,invitationtype)
        } else {
            var query = this.$route.query;
            this.pid = query.pid;
            this.invitationtype = query.invitationtype;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-content {
    // background: #fdba2c;
}

.full {
    min-height: 100%;
    height: 100%;
    position: relative;
    padding: 1px 0px;
}
.box_1 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.box_3 {
    width: 1.4rem;
    height: 1.7rem;
    position: relative;
    z-index: 1;
    margin: 0.43rem auto 0px;
    img {
        width: 100%;
        height: 100%;
    }
    > div {
        position: absolute;
        bottom: 0.27rem;
        padding-left: 0.15rem;
        left: 0px;
        width: 100%;
        color: #ffffff;
        text-align: center;
        > span:nth-child(1) {
            font-size: 0.4rem;
        }
        > span:nth-child(2) {
            font-size: 0.12rem;
        }
    }
}
.box_4 {
    position: relative;
    z-index: 1;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-size: 12px;
    line-height: 0.2rem;
}

.box_2 {
    position: relative;
    z-index: 2;
    margin: -10px 0px 0px;
    display: block;
    padding: 0.56rem 0.3rem 50px;
    // background: #fdba2c;
    li {
        display: flex;
        border-bottom: 1px solid #ffffff;
        align-items: center;
        color: #ffffff;
        margin: 0px 0px 0.2rem 0px;
        padding: 0px 0px 0px 0.03rem;
        height: 0.3rem;
        position: relative;
        input {
            height: 100%;
            padding: 0px 0.14rem;
            margin: 0px;
            border: none;
            background: none;
            font-size: 0.14rem;
            flex-grow: 1;
            position: relative;
            z-index: 1;
        }
        span {
            font-size: 0.14rem;
            white-space: nowrap;
        }
        i {
            font-size: 0.16rem;
        }
        .tishi {
            font-size: 14px;
            height: 100%;
            position: absolute;
            line-height: 0.3rem;
            top: 0px;
            left: 0.33rem;
        }
    }
    button {
        display: block;
        width: 1.53rem;
        height: 0.32rem;
        padding: 0px;
        margin: 0.22rem auto 0.14rem;
        background: #ec1515;
        color: #ffffff;
        border-radius: 0.32rem;
        border: none;
        box-shadow: 0px 2px 36px 0px rgba(0, 0, 0, 0.6142857142857143);
    }
}
.login {
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0.35rem;
    z-index: 2;
}
.box_5 {
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 0px;
    z-index: 1;
    font-size: 0px;
    img {
        width: 100%;
    }
}
</style>
