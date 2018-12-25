<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">提现</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            

            <div class="box_6">
                <ul class="Collect_Money" @click="$router.push('/Account')">
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
                            <input type="text" :value="ketixian"  @input="amount_change()" readonly />
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
                        <span @click="$router.push('/EmbodyRecord?type=3')">
                            提现记录
                        </span>
                    </span>
                </div>
                <button class="btn_1" @click="change_payment(true)">提交</button>
            </div>

        </div>
    </div>
</template>

<script>

import { mapGetters,mapActions } from 'vuex';
import {openloading} from '@/assets/js/currency.js';

export default {
    name:'',
    data(){
        return{
            Account_obj:'',
            amount:'',
            radio_type_2:true,
            userInfo:''
        }
    },
    computed: {
        ...mapGetters({
            myshop:'get_myshop',
            zichan:'myshops/zichan/g_zichan'
        }),
        ketixian(){
            if(this.zichan.balance){
                return Math.floor(this.zichan.balance*100)/100
            }else{
                return 0;
            }
        }
    },
    methods:{
        ...mapActions({
            getMyshop:'getMyshop',
            set_zichan_shopid:'myshops/zichan/set_shopid',
            findshopTurnoverByShopid:'myshops/zichan/findshopTurnoverByShopid',
        }),
        //开发中
        change_payment(){
            mui.toast("功能开发中。", { duration: 2000, type: "div" });
        },
        //输入金额
        amount_change() {
            // if (!this.agentUser.sutotal) {
            //     this.amount = 0;
            // } else if (this.amount > this.agentUser.sutotal) {
            //     this.amount = this.agentUser.sutotal;
            // }
        },
        change_radio_2(){
            this.radio_type_2=!this.radio_type_2;
        },
        //获取支付宝账号
        findAccount() {
            this.$axios.get("/api-u/users/findAccount?userid=" + this.userInfo.username).then(x=>{
                if (x.data.code==200) {
                    this.Account_obj = x.data.data;
                }
            }).catch(err=>{
                console.log(error);
            })
        },
        async shopinit(){
            openloading(true)
            await this.getMyshop();
            this.set_zichan_shopid(this.myshop.shopid);
            this.findshopTurnoverByShopid().then(x=>{
                openloading(false);
            });
        }
    },
    mounted() {
        this.userInfo=JSON.parse(localStorage.userInfo);
        //获取支付宝账号
        this.findAccount();
        if(this.myshop && this.myshop.shopid){
            openloading(true)
            this.set_zichan_shopid(this.myshop.shopid);
            this.findshopTurnoverByShopid().then(x=>{
                openloading(false)
            });
        }else{
            this.shopinit();
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';
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
    .ketixian{
        height: 40px;
        background: #ffffff;
        color: rgba(56, 56, 56, 1);
    	font-size: 12px;
        line-height: 40px;
        padding: 0px 16px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        .quanbu{
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
</style>



