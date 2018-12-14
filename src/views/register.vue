<template>
    <div id="register">
        
        <div class="mui-content" :style="{'height':height}">
            <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">注册</h1>
        </header>
            <div class="bg">
                <div class="bg_1">
                    <img src="image/bg_1.png" alt="" srcset="">
                    <img src="image/WechatIMG311.png" alt="" >
                </div>
                <!-- <div class="bg_2">
                    <img src="image/bg_3.png" alt="" srcset="">
                </div> -->
            </div>
            <form class="box_1" @submit.prevent="submit()">
                <ul>
                    <li>
                        <i class="icon iconfont icon-shouji"></i>
                        <input type="text" v-model="phone" required pattern="^1\d{10}$">
                        <span v-if="!phone" class="tishi_1">手机号码</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-yanzhengma"></i>
                        <input type="text" v-model="code" required />
                        <span @click="get_codes()" class="Verification">{{time==0 ? '获取验证码' : time+'s'}}</span>
                        <span v-if="!code" class="tishi_1">验证码</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input type="password" v-model="password" required >
                        <span v-if="!password" class="tishi">（6-16位数字字母组成）</span>
                        <span v-if="!password" class="tishi_1">登录密码</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input type="password" v-model="password1" required >
                        <span v-if="!password1" class="tishi_1">确认密码</span>
                    </li>
                </ul>
                <div class="Agreement">
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span @click="change_radio_2()"> 我也阅读并同意</span>
                    <span @click="RegistrationAgreement()">《用户注册协议》</span>
                </div>
                <button class="btn_1" type="submit">立即注册</button>
            </form>
            <div class="box_2">
                <img src="image/bg_3.png" alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";
export default {
    name: "register",
    components: {},
    data() {
        return {
            time: 0,
            phone: "", //手机号码  //18583034205   18227754002
            code: "", //验证码
            key: "", //获取手机验证码的返回值
            password: "",
            password1: "",
            radio_type_2: true, //协议
            height:'100%',
            //============邀请人信息
            pid:'',              //  邀请的父元素Id
            invitationtype:'',       //  邀请类型 1普通用户邀请注册
        };
    },
    methods: {
        //获取手机验证码
        get_codes() {
            var phone_test = /^1\d{10}$/;
            if (this.time != 0) {
                return;
            } else if (this.phone == "" || !phone_test.test(this.phone)) {
                return;
            }

            var this_1 = this;
            this.time = 60;
            var time = setInterval(function() {
                this_1.time--;
                if (this_1.time == 0) {
                    clearInterval(time);
                }
            }, 1000);
            this.$axios({
                method: "post",
                url: "/api-n/notification-anon/codes?phone=" + this.phone
            })
                .then(x => {
                    console.log(x);
                    localStorage.keys = x.data.key;
                    // this.key = x.data.key;
                })
                .catch(err => {
                    console.log(err);
                    mui.toast('系统错误，稍后再试。', { duration: 2000, type: "div" });
                });
        },
        //用户注册协议
        RegistrationAgreement() {
            this.$router.push("/RegistrationAgreement");
        },
        //同意协议
        change_radio_2(x) {
            this.radio_type_2 = !this.radio_type_2;
        },

        submit() {
            console.log("注册开始");
            if (!this.radio_type_2) {
                mui.alert("请同意用户注册协议。", "提示");
                return;
            }
            if (this.password != this.password1) {
                //alert('两次密码不一致');
                mui.alert("两次密码不一致", "提示");
                return;
            }
            this.register();
            return;
        },
        register() {
            openloading(true);
            //注册
            this.$axios({
                method: "post",
                url:"/api-u/users-anon/register?phone=" + this.phone + "&key=" + localStorage.keys + "&code=" + this.code,
                // url:"/api-u/users-anon/register?phone=" +this.phone +"&code=" +this.code,
                // url:"/api-u/users-anon/register",
                data: {
                    username: this.phone,
                    password: this.password,
                    phone: this.phone,
                    referrerid:this.pid
                }
            }).then(x => {
                console.log(x);
                if (x.data.code == 200) {
                    mui.toast("注册成功", { duration: 2000, type: "div" });
                    this.$router.push("/login");
                } else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
                openloading(false);
            }).catch(err => {
                    console.log(err);
                mui.toast("系统错误，请稍后再试。", {
                    duration: 2000,
                    type: "div"
                });
                openloading(false);
            });
        }
    },
    beforeCreate: function() {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        //获取邀请信息
        if(localStorage.yaoqing){
            var yaoqing = localStorage.yaoqing;
            var pid=yaoqing.substring(yaoqing.indexOf('pid')+4,yaoqing.indexOf('&'));
            var invitationtype=yaoqing.substring(yaoqing.lastIndexOf('invitationtype')+15);
            this.pid=pid;
            this.invitationtype=invitationtype;
            // console.log(pid,invitationtype)
        }else{
            var query=this.$route.query;
            this.pid=query.pid;
            this.invitationtype=query.invitationtype;
        }
        
       
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        var this_1=this;
        setTimeout(function(){
            //  console.log(document.getElementById('register').offsetHeight);
            // document.getElementById('register').style.height=document.getElementById('register').offsetHeight+'px';
            this_1.height=document.getElementById('register').offsetHeight+'px';
        },1000)
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

<style lang="scss">
@import "@/assets/css/config.scss";
#register {
    height: 100%;
    .mui-content {
        height: 100%;
        // background: #ffffff;
        position: relative;
        background:#92c6dd;
    }
}



#register .mui-bar {
    background: none;
    box-shadow: none;
    a {
        color: #ffffff;
    }
}
#register .mui-title {
    color: #ffffff;
}
#register .swiper-pagination-bullet-active {
    background: $header_background;
}


#register .bg{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    .bg_1{
        position: relative;
        width: 2rem;
        margin: 0px auto;
        >img:nth-child(1){
            width: 100%;
        }
        >img:nth-child(2){
            border-radius: 9px;
            position: absolute;
            width: 0.4rem;
            height: 0.4rem;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            margin: auto;
        }
    }
    .bg_2{
        position: absolute;
        width: 100%;
        left:0px;
        bottom: 0px;
        font-size: 0px;
        img{
            width: 100%;
        }
    }
}

#register .box_1 {
    padding: 2.4rem 0px 0px 0px;
    width: 2.9rem;
    display: block;
    margin: 0px auto 0px;
    white-space: nowrap;
    position: relative;
    z-index: 1;
    > ul {
        > li {
            display: flex;
            align-items: center;
            margin: 0px 0px 0.35rem 0px;
            border-bottom: 1px solid #e5e5e5;
            position: relative;
            height: 0.24rem;
            .tishi {
                position: absolute;
                left: 1rem;
                bottom: 0px;
                font-size: 12px;
                color: #e5e5e5;
            }
            .tishi_1{
                position: absolute;
                font-size: 0.14rem;
                left: 27px;
                color: #e5e5e5;
                bottom: 0px;
                line-height: 0.24rem;
            }
            input {
                font-size: 0.14rem;
                margin: 0px;
                padding: 0px 0.1rem 0px;
                height: auto;
                background: none;
                border: none;
                opacity: 0.7;
                position: relative;
                z-index: 2;
                color: #e5e5e5;
            }
            i {
                 color: #e5e5e5;
                // opacity: 0.7;
            }
        }
    }
    .Verification {
        color: #2a82e4;
        font-size: 0.14rem;
    }
    .btn_1 {
        width: 1.77rem;
        display: block;
        margin: 0px auto;
        height: 35px;
        background: $header_background;
        border: none;
        border-radius: 35px;
        color: #ffffff;
    }

    .Agreement {
        display: flex;
        padding: 0px 20px;
        font-size: 12px;
        align-items: center;
        margin: 20px 0px;
        > span:nth-child(2) {
            margin: 0px 0px 0px 5px;
            color: #ffffff;
        }
        > span:nth-child(3) {
            /* color: rgba(58, 182, 237, 1) */
            color: rgba(42, 130, 228, 1);
        }
        > span:nth-child(4) {
            flex-grow: 1;
            text-align: right;
            color: rgba(42, 130, 228, 1);
        }
    }
}

#register .box_2{
    margin: -60px 0px 0px;
    font-size: 0px;
    img{
        width: 100%;
    }
}
// 单选
#register .radio_1 {
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
#register .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
    }
}
</style>
