<template>
    <div>
        <ul class="账户" @click="$router.push('/Account')">
            <li>收款账户：{{收款账号.account}}</li>
            <li><i class="mui-icon mui-icon-arrowright"></i></li>
        </ul>
        <ul class="可提现">
            <li>提现金额： </li>
            <li>
                <span>
                    <span>￥</span>
                    <input readonly type="text" v-model="amount" @input="amount_change()" />
                </span>
                <span>费率：4%</span>
            </li>
        </ul>
        <div class="协议">
            <div @click="同意协议=!同意协议" class="radio_1" :class="{'active':同意协议}">
                <i class="icon iconfont icon-xuanze"></i>
            </div>
            <span @click="同意协议=!同意协议">我也阅读并同意</span>
            <span @click="$router.push('/WithdrawalAgreement')">《提现服务协议》</span>
            
            <span>
                <span @click="go('/EmbodyRecord?type=0')">
                    提现记录
                </span>
            </span>
        </div>
        
        <div class="按钮">
            <!-- <btn value="提现" @click.native="设置密码输入框(true)"/> -->
            <btn value="提现" @click.native="提现()"/>
        </div>

    </div>
</template>

<script>
import btn from '@/components/button.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    name:"",
    components:{
        btn
    },
    data () {
        return {
            同意协议:true,
            amount:0
        }
    },
    computed: {
        ...mapGetters({
            收款账号:'红购使者/红购使者/收款账号',
        })
    },
    methods: {
        ...mapActions({
            设置密码输入框:'红购使者/红购使者/设置密码输入框',
        }),
        提现(){
            if(!this.同意协议){
                mui.toast("请先同意协议。", { duration: 2000, type: "div" });
                return;
            }else if (!this.收款账号.account) {
                mui.toast("请设置收款账号", {duration: 2000,type: "div"});
                return;
            } else if (this.amount == 0) {
                mui.toast("无提现金额", { duration: 2000, type: "div" });
                return;
            }
            设置密码输入框(true)
        }
    },
}
</script>

<style lang="scss" scoped>
.账户 {
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
.可提现 {
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
            font-weight: bold;
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
.协议 {
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

</style>
