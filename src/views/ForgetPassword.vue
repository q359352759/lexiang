<template>
    <div id="ForgetPassword">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">忘记密码</h1>
        </header>
        <div class="mui-content">
            <form class="box_1" @submit.prevent="submit()">
                <ul>
                    <li>
                        <i class="icon iconfont icon-shouji"></i>
                        <input type="text" v-model="phone" required placeholder="手机号码" required pattern="^1\d{10}$">
                    </li>
                    <li>
                        <i class="icon iconfont icon-mima"></i>
                        <input type="text" v-model="code" required placeholder="验证码">
                        <span @tap='get_codes()' class="Verification">{{time==0 ? '获取验证码' : time+'s'}}</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-mima"></i>
                        <input v-model="password" type="password" required placeholder="新密码">
                        <span v-if="password==''" class="tishi">（6-16位数字字母组成）</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-mima"></i>
                        <input v-model="password1" type="password" required placeholder="确认密码">
                    </li>
                </ul>
                <btn type="submit"/>
            </form>
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";
import btn from '@/components/button.vue';
export default {
    name: "ForgetPassword",
    components: {
        btn
    },
    data() {
        return {
            time: 0,
            phone:'',   //手机号码
            code: "", //验证码
            key: "", //获取手机验证码的返回值
            password: "",
            password1: "",
            userInfo: ""
        };
    },
    methods: {
        //判断用户是否存在
        // /users/findByPhone

        //获取手机验证码
        get_codes() {
            var this_1 = this;
            var phone_test = /^1\d{10}$/;
            if (this.time != 0) {
                return;
            } else if (this.phone == "" || !phone_test.test(this.phone)) {
                 mui.toast("请输入手机号码。", { duration: 2000, type: "div"});
                return;
            }
            this.$axios({
                method:'get',
                url:'/api-u/users/findByPhone?phone='+this.phone
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    this.codes();
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        codes(){
            var this_1 = this;
            var phone_test = /^1\d{10}$/;
            if (this.time != 0) {
                return;
            } else if (this.phone == "" || !phone_test.test(this.phone)) {
                 mui.toast("请输入手机号码。", { duration: 2000, type: "div"});
                return;
            }
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
            }).then(x => {
                    console.log(x);
                    localStorage.keys = x.data.key;
                    // this.key = x.data.key;
            }).catch(err => {
                console.log(err);
                mui.toast('发送验证码失败。', { duration: 2000, type: "div" });
            });
        },
        //提交修改
        submit() {
            if (this.password != this.password1) {
                //alert('两次密码不一致');
                mui.alert("两次密码不一致", "提示");
                return;
            }
            openloading(true);
            this.$axios({
                method: "put",
                url:"/api-u/users/"+this.phone+"/forgetPassword",
                data:{
                    password: this.password,
                    phone: this.phone,
                    key: localStorage.keys,
                    code:this.code
                },
                params:{
                    password: this.password,
                    phone: this.phone,
                    key: localStorage.keys,
                    code:this.code
                }
            }).then(x => {
                console.log(x);
                openloading(false);
                if(x.data.code==200){
                    mui.toast("修改成功", { duration: 2000, type: "div"});
                    this.$router.push("/login");
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err => {
                console.log(err);
                mui.toast("系统错误，请稍后再试。", { duration: 2000, type: "div"});
                openloading(false);
            });
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
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (error) {}
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
#ForgetPassword {
    height: 100%;
    .mui-content {
        height: 100%;
        background: #ffffff;
    }
}
#ForgetPassword .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#ForgetPassword .mui-title {
    color: #ffffff;
}
#ForgetPassword .swiper-pagination-bullet-active {
    background: $header_background;
}

#ForgetPassword .box_1 {
    width: 2.9rem;
    display: block;
    margin: 0.6rem auto 0px;
    white-space: nowrap;
    > ul {
        > li {
            display: flex;
            align-items: flex-end;
            margin: 0px 0px 0.35rem 0px;
            border-bottom: 1px solid rgba(164, 164, 164, 1);
            position: relative;
            .tishi {
                position: absolute;
                left: 1rem;
                bottom: 0px;
                font-size: 12px;
                color: #ababab;
            }
            input {
                margin: 0px;
                padding: 0px 0.1rem 0px;
                height: auto;
                background: none;
                border: none;
                opacity: 0.7;
                position: relative;
                z-index: 1;
            }
            i {
                color: #ababab;
                // opacity: 0.7;
            }
        }
    }
    .Verification {
        color: $header_background;
    }
    .btn_1 {
        width: 2.5rem;
        display: block;
        margin: 0px auto;
        height: 35px;
        background: $header_background;
        border: none;
        border-radius: 35px;
        color: #ffffff;
    }
}
</style>
