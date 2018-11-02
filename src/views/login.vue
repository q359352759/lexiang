<template>
    <div id="login">
        <header class="mui-bar mui-bar-nav" v-show="!this.$store.state.isweixin">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">
            <div class="logo_img">
                <img src="@/assets/image/lxlogo_180.png" alt="" srcset="">
            </div>

            <form @submit.prevent="login()">
                <ul class="box_1">
                    <li>
                        <i class="mui-icon mui-icon-person"></i>
                        <input type="text" required v-model="username">
                    </li>
                    <li>
                        <i class="mui-icon mui-icon-locked"></i>
                        <input type="password" required name="" id="" v-model="password">
                    </li>
                </ul>
                <button class="Sign_in" type="submit">登录</button>
            </form>

            <div class="weixing">
                <!-- <div><i class="mui-icon mui-icon-weixin"></i></div> -->
            </div>

            <ul class="box_2">
                <li>忘记密码？</li>
                <li @click="register()">立即注册></li>
            </ul>

        </div>

        <circularNav />
    </div>
</template>

<script>
import circularNav from "@/components/circularNav.vue";
export default {
    name: "login",
    components: {
        circularNav
    },
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        register() {
            this.$router.push("/register");
        },
        login() {
            // localStorage.loginDate='登录';
            // this.$router.push("/my");
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
            })
                .then(x => {
                    console.log(x);
                    // {"access_token":"3ca33ff6-3192-40c6-bea6-aff30ea8af14","token_type":"bearer","refresh_token":"df4b6595-39f6-4cc7-8467-369975091bf7","expires_in":28799,"scope":"app"}
                    if (x.data.code) {
                        //登录失败
                        // error_description
                        mui.toast(x.data.error_description, {
                            duration: "long",
                            type: "div"
                        });
                    } else {
                        localStorage.loginDate = JSON.stringify(x.data);
                        //更新store 用户登录信息
                        this.$store.commit(
                            "setloginDate",
                            JSON.stringify(x.data)
                        );
                        //获取用户信息
                        this.$store.commit("setCurrent");

                        this.$router.push("/my");
                    }
                })
                .catch(err => {
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
        if (this.$store.state.isweixin) {
            document.getElementsByTagName("title")[0].innerText = "登录";
        }
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
    background: #ffffff;
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

#login .box_1 {
    width: 2.5rem;
    margin: 0px auto;

    li {
        margin: 0px 0px 0.3rem 0px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #cccccc;

        input {
            margin: 0px;
            border: none;
            padding: 0px;
            height: 0.3rem;
            background: none;
        }
    }
}

#login .Sign_in {
    width: 2.5rem;
    margin: 0px auto;
    display: block;
    height: 0.35rem;
    border-radius: 0.35rem;
    background: $header_background;
    color: #ffffff;
    border: none;
}

#login .weixing {
    width: 30px;
    margin: 30px auto;
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
    color: rgba(148, 148, 148, 1);

    li {
        width: 50%;
        text-align: center;
    }

    li:nth-child(1) {
        border-right: 2px solid rgba(148, 148, 148, 1);
    }
}
</style>
