<template>
    <div class="box">
        <div class="header">订单信息</div>
        <ul>
            <li>订单编号：{{dingdanxiangqing.ordersid}}</li>
            <li>下单时间：{{dingdanxiangqing.createTime | fitler_time}}</li>
            <li>支付方式：{{dingdanxiangqing.payName}}</li>
            <li>订单金额：{{dingdanxiangqing.paymentAmount+dingdanxiangqing.deduction}}元</li>
            <li v-if="dingdanxiangqing.state==1">
                红包抵扣：{{dingdanxiangqing.deduction}}元<span class="实际支付 mui-pull-right">实际支付：{{dingdanxiangqing.paymentAmount}}元</span>
            </li>
        </ul>
        <!-- <div class="img"></div> -->
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { dateFtt } from "@/assets/js/currency.js";
export default {
    name: "",
    data() {
        return {};
    },
    filters: {
        fitler_time(time) {
            if (!time) {
                return time;
            }
            return dateFtt(time, " yyyy.MM.dd hh:mm:ss");
        }
    },
    computed: {
        ...mapGetters({
            dingdanxiangqing: "orders/order/dingdanxiangqing"
        })
    }
};
</script>

<style lang="scss" scoped>
.box {
    background: #ffffff;
    font-size: 12px;
    margin: 5px 0px 0px;
    .header {
        padding: 0px 11px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #f6f6f6;
    }
    ul {
        padding: 5px 11px;
        color: #808080;
    }
    .实际支付 {
        color: #505050;
        font-weight: bold;
    }
}
// .img{
//     width: 50px;
//     height: 50px;
//     background: url('~@/assets/image/2.png');
// }
</style>
