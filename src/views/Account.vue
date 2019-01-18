<template>
    <div id="Account">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">收款账号</h1>
        </header>
        <div class="mui-content">
            <ul class="box_1">
                <li>
                    <div>
                        <i class="icon iconfont icon-z-alipay zhifubao"></i>
                        <span>支付宝账户：{{Account_obj.account ? Account_obj.account : ''}}</span>
                        <span v-if="Account_obj.account" @click="xiugai()" class="modify">更换</span>
                    </div>
                    <div @click="change_radio_2()" v-if="Account_obj.account" class="radio_1" :class="{'active':radio_type_1==1}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div v-if="!Account_obj.account" @click="addzhifubao()">
                        <i class="mui-icon mui-icon-plusempty"></i>
                    </div>
                </li>
            </ul>
            <div class="box_2">
                提示：目前只支持提现到支付宝账号，请确定您已经有支付宝账号，绑定账号时请输入支付宝的手机号码，因用户自行输入错误造成的损失，本公司概不负责！
                <br/>
                提现到微信功能正在开发中。
            </div>
        </div>

        <div class="Popup" v-show="Popup">
            <div class="Mask"></div>
            <form @submit.prevent="form()">
                <span class="close_1" @click="close()">
                    <i class="icon iconfont icon-quxiao"></i>
                </span>
                <div class="header_1">绑定支付宝</div>
                <ul>
                    <!-- <li>
                        <input required type="text" v-model="name" placeholder="请输入对应账号的用户名">
                    </li> -->
                    <li>
                        <input type="text" v-model="account" required placeholder="请输入支付宝登录手机号">
                        <div @click="Verification()" class="Verification">{{time==0 ? '获取验证码' : time+'s'}}</div>
                    </li>
                    <li>
                        <input required type="text" v-model="code" placeholder="请输入验证码">
                    </li>
                </ul>
                <button type="submit">确定</button>
            </form>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            Popup: false, //添加支付宝弹出框
            radio_type_1: 1,
            tishi: false,
            app_auth_code: "",
            zhifubaozhangfu: "",
            // ===================
            userInfo: "",
            Account_obj: {}, //支付账号相关信息
            code: "", //短信验证
            key: "", //短信key
            time: 0,
            account: "", //绑定的账号
            submit_add: true //提交类型 添加或修改
        };
    },
    methods: {
    //添加
        form() {
            this.Popup = false;
            var obj = {
                    userid: this.userInfo.username,
                    type: 0, //0支付宝 1微信 2...
                    account: this.account,
                    normal: 1 //0和 1 1选中
                };
            if (this.submit_add) {
                this.$axios({
                    method: "post",
                    url:"/api-u/users/account?phone=" + this.userInfo.phone + "&key=" + this.key + "&code=" + this.code,
                    data: obj
                    // params:obj,
                }).then( x => {
                    console.log(x);
                    if (x.data.code == 200) {
                        this.findAccount();
                        this.Popup = false;
                        mui.toast("设置成功！", { duration: 2000, type: "div" });
                    } else if (x.data.code == 400) {
                        mui.toast("验证码错误！", { duration: 2000, type: "div" });
                    } else {
                        //   mui.toast(x.data.message, { duration: 2000, type: "div" });
                        mui.alert( x.data.message ? x.data.message : x.data.msg,"提示","我知道了", function() {},"div");
                    }
                }).catch(err=>{
                    mui.toast("系统错误，请稍后再试！", {duration: 2000,type: "div"});
                })
            } else {
                var obj = {
                        id: this.Account_obj.id,
                        account: this.account,
                        phone: this.userInfo.phone,
                        key: this.key,
                        code: this.code
                    };
                this.$axios({
                    method: "put",
                    url: "/api-u/users/" + this.Account_obj.id + "/account",
                    data: obj,
                    params: obj
                }).then(x => {
                    console.log(x);
                    if (x.data.code == 200) {
                       this.findAccount();
                        mui.toast("设置成功！", {duration: 2000,type: "div"});
                    } else if (x.data.code == 400) {
                        mui.toast("验证码错误！", {duration: 2000,type: "div"});
                    } else {
                    //  mui.toast(x.data.message, {duration: 2000,type: "div"});
                        mui.alert(x.data.message ? x.data.message : x.data.msg, "提示", "我知道了", function() {},"div");
                    }
                }).catch(error => {
                    mui.toast("系统错误，请稍后再试！", {duration: 2000,type: "div"});
                });
            }
        },
        //获取验证码
        Verification() {
            if (this.time != 0) {
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
                url: "/api-n/notification-anon/codes?phone=" + this.userInfo.phone
            }).then(x => {
                this.key = x.data.key;
                mui.toast("短信已发送至" + this.userInfo.phone + "号码，请注意查收。",{ duration: 2000, type: "div" });
            }).catch(err => {
                mui.toast("系统错误，请稍后再试！", {duration: 2000,type: "div"});
            });
        },
        addweixin() {
            if (!this.$store.state.isweixin) {
                mui.toast("请在微信公众号中打开", {
                    duration: 2000,
                    type: "div"
                });
            }
        },
        //修改支付账号
        xiugai() {
            this.code = ""  //短信验证
            this.key = ""   //短信key
            this.account = this.Account_obj.account //绑定的账号
            this.Popup = true;
            this.submit_add = false;
        },
        //添加支付宝账号弹出框
        close() {
            this.Popup = false;
        },
        addzhifubao() {
            this.code = "" //短信验证
            this.key = "" //短信key
            this.account = "" //绑定的账号
            this.Popup = true;
            this.submit_add = true;
        },
        //获取支付宝账号
        findAccount() {
            this.$axios({
                method: "get",
                url: "/api-u/users/findAccount?userid=" + this.userInfo.username
            }).then(x => {
                console.log("获取支付宝账号", x);
                if (x.data.data != null) {
                    this.Account_obj = x.data.data;
                }
            }).catch(err=>{

            })
        }
    },
    mounted() {
        try {
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (error) {}
        this.findAccount();
    },
    updated() {
        // console.log('updated 更新完成状态===============》');
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
#Account {
    height: 100%;
    .mui-content {
        height: 100%;
        // background:#ffffff;
        // display: flex;
        // flex-direction:column;
    }
}
#Account .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#Account .mui-title {
    color: #ffffff;
}

#Account .box_1 {
    padding: 6px;
    li {
        background-color: rgba(229, 229, 229, 1);
        display: flex;
        height: 45px;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px;
        margin: 0px 0px 5px 0px;
        > div:nth-child(1) {
            display: flex;
            align-items: center;
            span {
                color: rgba(80, 80, 80, 1);
                font-size: 14px;
                margin: 0px 0px 0px 10px;
            }
            .modify {
                color: #2a82e4;
            }
        }
    }
    .zhifubao {
        color: rgba(28, 170, 234, 1);
        font-size: 25px;
    }
    .weixin {
        color: rgba(60, 172, 60, 1);
        font-size: 25px;
    }
}

#Account .addzhifbao {
    position: fixed;
    width: 100%;
    height: 1000%;
    top: 0px;
    left: 0px;
    z-index: 10;
    background: #000000;
    img {
        width: 100%;
    }
}

#Account .Popup {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .Mask {
        position: absolute;
        background: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
    }
    form {
        display: block;
        position: relative;
        width: 2.9rem;
        background: #ffffff;
        padding: 0.15rem;
        > .close_1 {
            position: absolute;
            right: 10px;
            top: 10px;
            color: #999999;
        }
        .header_1 {
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
            text-align: center;
            margin: 0px 0px 0.15rem 0px;
        }
        li {
            display: flex;
            height: 0.35rem;
            margin: 0px 0px 0.18rem 0px;
            input {
                height: 100%;
                margin: 0px;
                padding: 0px 5px 0px;
                flex-grow: 1;
                border: none;
                background-color: rgba(229, 229, 229, 1);
                font-size: 0.14rem;
            }
            .Verification {
                color: rgba(255, 255, 255, 1);
                background-color: rgba(56, 56, 56, 1);
                font-size: 0.14rem;
                white-space: nowrap;
                line-height: 0.35rem;
                padding: 0px 10px;
                font-size: 0.11rem;
            }
        }
        button {
            width: 1.35rem;
            height: 0.32rem;
            border-radius: 0.32rem;
            font-size: 0.14rem;
            background: $header_background;
            color: #ffffff;
            border: none;
            display: block;
            margin: 0px auto;
        }
    }
}

#Account .box_2 {
    padding: 6px;
    color: #d43030;
    font-size: 0.14rem;
}

// 单选
#Account .radio_1 {
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 16px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    overflow: hidden;
    i{
        font-size: 8px;
        display: none;
    }
}
#Account .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i{
        display: inline-block;
    }
}
</style>
