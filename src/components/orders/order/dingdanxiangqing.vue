<template>
    <div class="box">
        <div class="header">订单信息</div>
        <ul>
            <li>订单编号：sdfhw213213897s</li>
            <li>下单时间：2018.12.08 09:58:32</li>
            <li>支付方式：微信支付（孟哥）</li>
            <li>订单金额：200元</li>
            <li>
                红包抵扣<span class="实际支付 mui-pull-right">实际支付：76元</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"",
    data(){
        return{}
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


