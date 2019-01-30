<template>
    <ul>
        <li>
            <div @click="get_dikouxiangqing_show(true)">共计：{{(dingdanxiangqing && dingdanxiangqing.shopOrderCommoditys) ? dingdanxiangqing.shopOrderCommoditys.length : 0}}件</div>
            <div class="money mui-text-center">{{dingdan_zongshu}}元</div>
            <div class="mui-text-right">实付：<span class="money">{{dingdanxiangqing.paymentAmount ? dingdanxiangqing.paymentAmount : 0}}元</span></div>
        </li>
        <li>
            <div @click="get_dikouxiangqing_show(true)">
                使用：{{shangpin_dikou_list.dikou_hongbao.length}}个红包
                <i class="icon_font mui-icon mui-icon-arrowright"></i>
            </div>
            <div class="money mui-text-center">{{dingdanxiangqing.deduction ? dingdanxiangqing.deduction : 0}}元</div>
            <div class="mui-text-right">
                <div v-show="dingdanxiangqing.state==0" @click="zhifu()" class="zhifu">支付</div>
                <div v-show="dingdanxiangqing.state==1" class="zhifu">
                    <span v-if="已评价" @click="$router.push('/my/pingjia/xiangqing?ordersid='+dingdanxiangqing.ordersid+'&id='+dingdanxiangqing.id)">评价</span>
                    <span v-if="!已评价"  @click="$router.push('/my/pingjia/pingjia?orderid='+dingdanxiangqing.id)">待评价</span>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {};
    },
    computed: {
        ...mapState({
            test: "orders/order/test"
        }),
        ...mapGetters({
            dingdanxiangqing: "orders/order/dingdanxiangqing", //详情
            shangpin_dikou_list: "orders/order/shangpin_dikou_list", //商品抵扣信息
            已评价:'orders/order/已评价'
        }),
        //总价
        dingdan_zongshu() {
            return (
                this.dingdanxiangqing.paymentAmount +
                (this.dingdanxiangqing.deduction ? this.dingdanxiangqing.deduction : 0)
            );
        }
    },
    methods: {
        ...mapActions({
            shoppingCopy: "orders/order/shoppingCopy", //调用支付接口
            set_orderid_openid: "orders/order/set_orderid_openid", //初始化 openid和 ordreId
            get_dikouxiangqing_show: "orders/order/get_dikouxiangqing_show" //显示框是否显示
        }),
        zhifu() {
            this.shoppingCopy();
        }
    }
};
</script>

<style lang="scss" scoped>
ul {
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    background: #ffffff;
    li {
        height: 42px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        > div {
            width: calc(100% / 3);
        }
    }
    .money {
        color: #d43030;
    }
    .icon_font {
        font-size: 14px;
    }
    .zhifu {
        display: inline-block;
        width: 68px;
        height: 25px;
        line-height: 23px;
        border: 1px solid #007aff;
        color: #007aff;
        border-radius: 25px;
        text-align: center;
    }
}
</style>
