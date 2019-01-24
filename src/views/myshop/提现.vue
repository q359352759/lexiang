<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">提现</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <div class="box_6">
                <ul class="Collect_Money" @click="设置账号()">
                    <li>收款账户：{{Account_obj ? Account_obj.account : ''}}</li>
                    <li><i class="mui-icon mui-icon-arrowright"></i></li>
                </ul>
                <ul class="ketixian">
                    <li class="mui-pull-right quanbu">全部提取</li>
                    <li>可提现金额：￥{{ketixian}}</li>
                </ul>
                <ul class="money">
                    <li>提现金额： </li>
                    <li>
                        <span>
                            <span>￥</span>
                            <!-- {{agentUser.sutotal}} -->
                            <input type="text" :value="ketixian" readonly />
                        </span>
                        <span>无手续费</span>
                    </li>
                </ul>
                <div class="Agreement">
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span @click="change_radio_2()">我也阅读并同意</span>
                    <span @click="$router.push('/WithdrawalAgreement')">《提现服务协议》</span>
                    <span>
                        <span @click="$router.push('/myshop/tixianjilu?shopid='+myshop.shopid)">
                            提现记录
                        </span>
                    </span>
                </div>
                <!-- <button class="btn_1" @click="change_payment(true)">提交</button> -->
                <btn value="提交" @click.native="change_payment(true)" />
            </div>

            <!-- 密码输入框 -->
            <div class="payment" v-show="payment">
                <div class="mask"></div>
                <div class="payment_1">
                    <div class="forget" @click="$router.push('/PaymentPassword')">忘记密码？</div>
                    <div class="close_1" @click="change_payment(false)"><i class="mui-icon mui-icon-closeempty"></i></div>
                    <div class="title">支付密码</div>
                    <div class="input_box">
                        <input type="tel" ref="accoutpassword" id="accout_password" :class="{'active':accout_password.length>=6}" maxlength="6" v-model="accout_password" @input="passwad_change()" pattern="\d*">
                        <ul @click="$refs.accoutpassword.focus()">
                            <li>
                                <span v-show="accout_password.length>0"><i class="icon iconfont icon-xinghao"></i></span>
                            </li>
                            <li>
                                <span v-show="accout_password.length>1"><i class="icon iconfont icon-xinghao"></i></span>
                            </li>
                            <li>
                                <span v-show="accout_password.length>2"><i class="icon iconfont icon-xinghao"></i></span>
                            </li>
                            <li>
                                <span v-show="accout_password.length>3"><i class="icon iconfont icon-xinghao"></i></span>
                            </li>
                            <li>
                                <span v-show="accout_password.length>4"><i class="icon iconfont icon-xinghao"></i></span>
                            </li>
                            <li>
                                <span v-show="accout_password.length>5"><i class="icon iconfont icon-xinghao"></i></span>
                            </li>
                        </ul>
                        <div class="subsidy"></div>
                    </div>
                    <button @click="Put_forward()" class="btn_2">确定</button>

                </div>
            </div>
            <!-- 提现名称 -->
            <form class="input_name" @submit.prevent="Submission()" :class="{'active':input_name_box}">
                <div class="mask" @click="clese_1()"></div>
                <ul class="">
                    <li>该手机号对应多个账号，请输入真实姓名。</li>
                    <li>
                        <input type="text" v-model="name" required placeholder="请输入真实姓名">
                    </li>
                    <li>
                        <button type="submit">确定</button>
                    </li>
                </ul>
            </form>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { openloading } from "@/assets/js/currency.js";
import btn from "@/components/button.vue";
export default {
    name: "",
    components: {
        btn
    },
    data() {
        return {
            Account_obj: {}, //收款账号
            amount: "", //金额
            radio_type_2: true,
            userInfo: "",
            payment: false, //支付弹出框
            accout_password: "", //支付密码
            name: "", //支付名
            tixianzhong: false, //提现中。。。
            input_name_box: false //输入提现名字
        };
    },
    computed: {
        ...mapGetters({
            myshop: "get_myshop",
            zichan: "myshops/zichan/g_zichan",
            身份:"myshops/身份"
        }),
        ketixian() {
            if (this.zichan && this.zichan.balance) {
                return Math.floor(this.zichan.balance * 100) / 100;
            } else {
                return 0;
            }
        }
    },
    methods: {
        ...mapActions({
            getMyshop: "getMyshop",
            set_zichan_shopid: "myshops/zichan/set_shopid", //店铺初始化
            findshopTurnoverByShopid: "myshops/zichan/findshopTurnoverByShopid"
        }),
        设置账号(){
            if(this.身份==1){
                this.$router.push('/Account');
            }else{
                mui.toast("你不能修改收款账号。", { duration: 2000, type: "div" });
            }
        },
        //输入密码弹出框
        change_payment(x) {
            if (x) {
                if (!this.radio_type_2) {
                    mui.toast("请先同意协议。", { duration: 2000, type: "div" });
                    return;
                } else if (!this.Account_obj || !this.Account_obj.account) {
                    mui.toast("请设置收款账号", { duration: 2000, type: "div" });
                    return;
                } else if (!this.ketixian || this.ketixian == 0) {
                    mui.toast("无提现金额", { duration: 2000, type: "div" });
                    return;
                } else if (this.tixianzhong) {
                    mui.toast("提现处理中，请稍等。", { duration: 2000, type: "div" });
                    return;
                }
                this.payment = x;
                this.accout_password = "";
                this.name = "";
                setTimeout(() => {
                    this.$refs.accoutpassword.focus();
                }, 1000);
            } else {
                this.payment = x;
            }
        },
        //支付密码
        passwad_change() {
            if (this.accout_password.length > 6) {
                this.accout_password = this.accout_password.substring(1);
            }
        },
        //再次提交
        Submission() {
            this.Put_forward();
        },
        //调用提现接口
        Put_forward() {
            var password_test = /^\d{6}$/; //6位数字验证
            if (!password_test.test(this.accout_password)) {
                mui.toast("支付密码为6位数字。", { duration: 2000, type: "div" });
                return;
            }
            var obj = {
                shopid: this.myshop.shopid,
                account: this.Account_obj.account, //到账账号
                amount: this.ketixian, //金额
                // userid: this.userInfo.username,
                payPassword: this.accout_password,
                id: this.userInfo.id,
                name: this.name
            };

            this.payment = false;
            this.input_name_box = false;
            openloading(true);
            console.log(obj);
            this.$axios.post("/api-s/shops/basicsPay", obj).then(x => {
                window.scroll(0, 0);
                if (x.data.code == 200) {
                    console.log(1);
                    this.findshopTurnoverByShopid().then(x => {
                        openloading(false);
                    });
                    mui.alert(x.data.msg, "提示", "好的", function () { }, "div");
                    this.tixianzhong = true;
                } else if (x.data.code == "PAYEE_USER_INFO_ERROR" || x.data.code == "PAYEE_ACC_OCUPIED") {
                    mui.alert(x.data.msg, "提示", "我知道了", function () { }, "div");
                    this.input_name_box = true;
                    openloading(false);
                } else {
                    openloading(false);
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                }
            }).catch(err => {
                mui.alert("系统错误稍后再试。", "提示", "我知道了", function () { }, "div");
                this.tixianzhong = true;
            });
        },
        change_radio_2() {
            this.radio_type_2 = !this.radio_type_2;
        },
        //获取支付宝账号
        findAccount() {
            openloading(true);
            this.$axios.get("/api-u/users/findAccount?userid=" + this.myshop.userid).then(x => {
                if (x.data.code == 200) {
                    this.Account_obj = x.data.data;
                }
                openloading(false);
            }).catch(err => {
                openloading(false);
                console.log(error);
            });
        },
        async shopinit() {
            openloading(true);
            if(!this.myshop || !this.myshop.shopid){
                await this.getMyshop();
            }
            this.findAccount()
            this.set_zichan_shopid(this.myshop.shopid);
            this.findshopTurnoverByShopid().then(x => {
                openloading(false);
            });
        }
    },
    mounted() {
        this.userInfo = JSON.parse(localStorage.userInfo);
        this.shopinit();
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.box_6 {
    margin: 5px 0px 0px 0px;
    .Collect_Money {
        margin: 5px 0px 0px 0px;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        line-height: 35px;
        padding: 0px 10px 0px 20px;
        color: rgba(56, 56, 56, 1);
        font-size: 12px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        i {
            line-height: 35px;
        }
    }
    .ketixian {
        height: 40px;
        background: #ffffff;
        color: rgba(56, 56, 56, 1);
        font-size: 12px;
        line-height: 40px;
        padding: 0px 16px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        .quanbu {
            color: rgba(0, 122, 255, 1);
        }
    }
    .money {
        padding: 5px 10px 5px 20px;
        background: #ffffff;
        color: rgba(80, 80, 80, 1);
        display: flex;
        align-items: center;
        > li:nth-child(1) {
            font-size: 12px;
            white-space: nowrap;
            flex-shrink: 0;
        }
        > li:nth-child(2) {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > span:nth-child(1) {
                font-size: 27px;
                line-height: initial;
                display: flex;
                color: rgba(212, 48, 48, 1);
                input {
                    padding: 0px;
                    margin: 0px;
                    border: none;
                    font-size: 27px;
                    // border-bottom: 1px solid #cccccc;
                }
            }
            > span:nth-child(2) {
                font-size: 12px;
                padding: 0px 0px 0px 10px;
                border-left: 1px solid #505050;
                height: 14px;
                line-height: 14px;
                white-space: nowrap;
                color: #505050;
                margin: 0px 0px 0px 20px;
            }
        }
    }
    .Agreement {
        display: flex;
        padding: 0px 20px;
        font-size: 12px;
        align-items: center;
        margin: 20px 0px;
        > span:nth-child(2) {
            margin: 0px 0px 0px 5px;
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
    .btn_1 {
        width: 170px;
        height: 32px;
        display: block;
        margin: 0px auto;
        color: rgba(255, 255, 255, 1);
        background-color: $header_background;
        border: none;
        border-radius: 32px;
    }
}

.payment {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.5);
    }
    .payment_1 {
        background: #ffffff;
        width: 298px;
        position: relative;
        z-index: 1;
        max-width: 100%;
        .forget {
            position: absolute;
            color: rgba(80, 80, 80, 1);
            font-size: 10px;
            top: 10px;
            left: 24px;
            z-index: 1;
        }
        .close_1 {
            position: absolute;
            top: 0px;
            right: 0px;
            color: rgba(153, 153, 153, 1);
            z-index: 1;
            i {
                font-size: 30px;
            }
        }
        .title {
            height: 42px;
            line-height: 42px;
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
            text-align: center;
            position: relative;
            z-index: 0;
        }
        .input_box {
            width: 243px;
            height: 39px;
            margin: 0px auto;
            position: relative;
            input.active {
                caret-color: rgba(255, 255, 255, 0);
            }
            input::first-line {
                color: red;
            }
            input {
                position: fixed;
                left: -100%;
                padding: 0px;
                margin: 0px;
                height: 0px;
                letter-spacing: 34.5px;
                padding: 0px 0px 0px 17px;
                // position: relative;
                z-index: 1;
                border: none;
                background: none;
                width: 130%;
                opacity: 0;
            }
            > ul {
                z-index: 1;
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                display: flex;
                border-right: 1px solid #cccccc;
                text-align: center;
                line-height: 37px;
                font-size: 12px;
                li {
                    border-left: 1px solid #cccccc;
                    border-top: 1px solid #cccccc;
                    border-bottom: 1px solid #cccccc;
                    width: calc(100% / 6);
                }
            }
            .subsidy {
                position: absolute;
                background: #ffffff;
                width: 26px;
                height: 100%;
                top: 0px;
                right: -26px;
                z-index: 2;
            }
        }
        .btn_2 {
            width: 123px;
            height: 26px;
            color: rgba(255, 255, 255, 1);
            background-color: $header_background;
            font-size: 14px;
            border-radius: 26px;
            border: none;
            margin: 16px auto;
            display: block;
            padding: 0px;
        }
    }
}

.input_name.active {
    display: flex;
}
.input_name {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    ul {
        background: #ffffff;
        position: relative;
        z-index: 1;
        width: 2.98rem;
        > li:nth-child(1) {
            padding: 0.13rem;
            color: rgba(80, 80, 80, 1);
            font-size: 0.12rem;
            text-align: center;
        }
        > li:nth-child(2) {
            padding: 0px 0.3rem;
            height: 0.36rem;
            input {
                text-align: center;
                background: rgba(166, 166, 166, 1);
                margin: 0px;
                padding: 0px;
                height: 100%;
                font-size: 0.14rem;
            }
        }
        > li:nth-child(3) {
            padding: 0.15rem;
            text-align: center;
            button {
                width: 1.23rem;
                height: 0.26rem;
                color: rgba(255, 255, 255, 1);
                background-color: rgba(54, 140, 89, 1);
                border-radius: 0.26rem;
                padding: 0px;
                border: none;
            }
        }
    }
}
</style>
