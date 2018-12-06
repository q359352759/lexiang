<template>
    <div id="login">
        <!-- <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">登录</h1>
        </header> -->
        <div class="mui-content">
            <div class="bg">
                <div>
                    <div>
                        <img src="image/bg_1.png" alt="" srcset="">
                        <img src="image/WechatIMG311.png" alt="" >
                    </div>
                </div>
            </div>
            <!-- <div class="logo_img">
                <img src="@/assets/image/lxlogo_180.png" alt="" srcset="">
            </div> -->

            <div class="form_box">
                <form @submit.prevent="login()">
                    <ul class="box_1">
                        <li>
                            <i class="icon iconfont icon-shouji"></i>
                            <input type="text" required v-model="username">
                            <span v-if="!username">请输入手机号码</span>
                        </li>
                        <li>
                            <i class="icon iconfont icon-san"></i>
                            <input type="password" required  v-model="password">
                            <span v-if="!password">请输入密码</span>
                        </li>
                    </ul>
                    <button class="Sign_in" type="submit">登录</button>
                    <div class="weixing">
                        <!-- <div><i class="mui-icon mui-icon-weixin"></i></div> -->
                    </div>
                    <ul class="box_2">
                        <li @click="ForgetPassword()">忘记密码？</li>
                        <li @click="register()">立即注册></li>
                    </ul>
                </form>
            </div>
            
            <div class="box_3">
                <img src="image/bg_3.png" alt="" srcset="">
            </div>
           
        </div>

    </div>
</template>

<script>
import { dateFtt, openloading } from "@/assets/js/currency";
export default {
    name: "login",
    components: {},
    filters: {},
    data() {
        return {
            // phone: "15123456789",
            username: "",
            password: "",
        };
    },
    methods: {
        
        //跳转忘记密码
        ForgetPassword(){
            this.$router.push('/ForgetPassword');
        },
        //跳转注册
        register() {
            this.$router.push("/register");
        },
        login() {
            // localStorage.loginDate='登录';
            // this.$router.push("/my");
            openloading(true);
            this.$axios({
                method: "post",
                url: "/sys/login",
                data: this.$qs.stringify({
                    username: this.username,
                    password: this.password
                })
                //get请求方式
                // params:{
                //     firstName: '1',
                //     lastName: '2'
                // }
            }).then(x => {
                    console.log(x);
                    // {"access_token":"3ca33ff6-3192-40c6-bea6-aff30ea8af14","token_type":"bearer","refresh_token":"df4b6595-39f6-4cc7-8467-369975091bf7","expires_in":28799,"scope":"app"}
                    if (x.data.code && x.data.code!=200) {
                        openloading(false);
                        //登录失败
                        // error_description
                        if(x.data.error_description=="Bad credentials"){
                            mui.toast('密码错误', {duration: "long", type: "div" });
                        }else{
                            mui.toast(x.data.error_description ? x.data.error_description : x.data.message, { duration: "long",type: "div" });
                        }
                    } else if(x.data.error){
                        if(error_description)
                        mui.toast(x.data.error_description ? x.data.error_description : x.data.message, {duration: "long",type: "div" });
                    }else{
                        localStorage.loginDate = JSON.stringify(x.data);
                        //更新store 用户登录信息
                        this.$store.commit(
                            "setloginDate",
                            JSON.stringify(x.data)
                        );

                        this.$axios({
                            method: "get",
                            url:"/api-u/users/current?access_token="+x.data.access_token
                            // data: qs.stringify({})
                        }).then(x => {
                            console.log("获取个人信息主要用户Id", x);
                            localStorage.id = x.data.data;

                            //获取用户信息                                
                            this.$axios({
                                method: "get",
                                url: "/api-u/users/" + x.data.data
                            }).then(x => {
                                if (x.data.code != 200) {
                                    mui.toast('获取个人信息失败。', {duration: "long", type: "div"});
                                    return;
                                } else {
                                    // console.log("获取个人信息", x);
                                    // state.userInfo = x.data.data;
                                    localStorage.userInfo = JSON.stringify(x.data.data);
                                    this.$router.push("/my");
                                }
                                openloading(false);
                            }).catch(error => {
                                mui.toast('获取个人信息失败.', {duration: "long", type: "div"});
                                openloading(false);
                            });

                        }).catch(error => {
                            console.log("获取个人信息失败", error);
                            openloading(false);
                            // router.push("/login");
                        });
                    }
                })
                .catch(err => {
                    openloading(false);
                    console.log(err);
                    mui.toast("登录失败。", { duration: 2000, type: "div" });
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
#login {
    height: 100%;
}

#login .mui-content {
    height: 100%;
    background:#92c6dd;
    overflow: auto;
    // min-height: 667px;
}

#login .mui-bar {
    background: $header_background;
    box-shadow: none;

    a {
        color: #ffffff;
    }
}

#login .mui-title {
    color: #ffffff;
}

#login .bg{
    // position: absolute;
    // top: 0px;
    // bottom: 0px;
    // left: 0px;
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    >div:nth-child(1){
        flex-grow: 1;
        >div{
            position: relative;
        }
        position: relative;
        text-align:center;
        img:nth-child(1){
            width: 2.67rem;
        }
        img:nth-child(2){
            width: 0.6rem;
            height: 0.6rem;
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            margin: auto;
            border-radius: 10px;
        }
    }
    >div:nth-child(2){
        width: 100%;
        bottom: 0px;
        left: 0px;
        font-size: 0px;
        img{
            width: 100%;
        }
    }
}

#login .box_3{
    // position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    font-size: 0px;
    margin: -0.84rem 0px 0px;
    img{
        width: 100%;
    }
}



#login .swiper-pagination-bullet-active {
    background: $header_background;
}

#login .logo_img {
    width: 0.8rem;
    height: 0.8rem;
    margin: 0.3rem auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }
}
#login form{
    position: relative;
    z-index: 2;
    margin:  -0.68rem 0px 0px;
    // position: absolute;
    // width: 100%;
    // // top: 300px;
    // bottom: 100px;
    // left: 0px;
}

#login .form_box{
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}
#login .box_1 {
    width: 2.5rem;
    margin: 0px auto;
    position: relative;
    z-index: 2;
    color: #ffffff;
    li {
        margin: 0px 0px 0.3rem 0px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ffffff;
        padding: 0px 3px;
        position: relative;
        input {
            margin: 0px;
            border: none;
            padding: 0px 0.1rem 0px;
            height: 0.3rem;
            background: none;
            font-size: 0.14rem;
            color: #ffffff;
            position: relative;
            z-index: 2;
        }
        span{
            font-size: 0.14rem;
            position: absolute;
            left: 0.3rem
        }
    }
}

#login .Sign_in {
    width: 1.77rem;
    // width: 2.5rem;
    margin: 0px auto;
    display: block;
    height: 0.34rem;
    border-radius: 0.34rem;
    background: $header_background;
    color: #ffffff;
    border: none;
}

#login .weixing {
    width: 30px;
    // margin: 30px auto;
    margin: 18px auto;
    text-align: center;
    line-height: 28px;
    color: #cccccc;
    min-height: 1px;
    div {
        border: 1px solid #cccccc;
        border-radius: 30px;
        height: 30px;
        width: 30px;
        margin: 0px auto;
    }
    i {
        font-size: 20px;
    }
}

#login .box_2 {
    width: 2.5rem;
    margin: 0px auto;
    display: flex;
    color: #ffffff;
    font-size: 0.14rem;
    li {
        width: 50%;
        text-align: center;
    }

    li:nth-child(1) {
        border-right: 2px solid #ffffff;
    }
}
</style>
