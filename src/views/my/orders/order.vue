<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">订单详情</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="content_1">
                头部
                <orderHeader />
                订单详情
                <dingdanxiangqing />
                商品
                <shangping />

            </div>
            <div class="footer_1">
                输入金额底部
                <dangmianzhifu />
                商品支付底部
                <shangpingzhifu/>

            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
// 输入金额底部
import dangmianzhifu from '@/components/orders/order/dangmianzhifu.vue';
//订单详情
import dingdanxiangqing from '@/components/orders/order/dingdanxiangqing.vue';
//头部
import orderHeader from '@/components/orders/order/orderHeader.vue';
// 商品
import shangping from '@/components/orders/order/shangping.vue';
//
import shangpingzhifu from '@/components/orders/order/shangpingzhifu.vue';


export default {
    name:"",
    components:{
        orderHeader,
        dangmianzhifu,
        dingdanxiangqing,
        shangping,
        shangpingzhifu
    },
    data(){
        return{}
    },
    computed:{

    },
    methods:{

    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
}
.content_1{
    flex-grow: 1;
    overflow: auto;
}
.footer_1{
    flex-shrink: 0;
}
</style>


