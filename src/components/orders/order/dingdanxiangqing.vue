<template>
    <div class="box">
        <div class="header">订单信息</div>
        <ul>
            <li>订单编号：sdfhw213213897s</li>
            <li>下单时间：{{dingdanxiangqing.createTime | fitler_time}}</li>
            <li>支付方式：{{dingdanxiangqing.payName}}</li>
            <li>订单金额：{{dingdanxiangqing.paymentAmount}}</li>
            <li v-if="dingdanxiangqing.state==1">
                红包抵扣<span class="实际支付 mui-pull-right">实际支付：0元</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFtt } from "@/assets/js/currency.js";
export default {
    name:"",
    data(){
        return{}
    },
    filters:{
        fitler_time(time){
            if(!time){
                return time;
            }
            return dateFtt(time,' yyyy.MM.dd hh:mm:ss')
        }
    },
    computed:{
        ...mapGetters({
            dingdanxiangqing:'orders/order/dingdanxiangqing',   
        })
    }
}
</script>

<style lang="scss" scoped>
.box{
    background: #ffffff;
    font-size: 12px;
    .header{
        padding: 0px 11px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #f6f6f6;
    }
    ul{
        padding: 5px 11px;
        color: #808080;
    }
    .实际支付{
        color: #505050;
        font-weight: bold;
    }
}
</style>


