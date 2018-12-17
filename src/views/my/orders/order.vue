<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">订单详情</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="content_1">
                <!-- 头部 -->
                <orderHeader />
                 <!-- 商品 -->
                <shangping />
                <!-- 订单详情 -->
                <dingdanxiangqing />
               

            </div>
            <div class="footer_1">
                <!-- 输入金额底部 -->
                <!-- <dangmianzhifu /> -->
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
//商品支付底部
import shangpingzhifu from '@/components/orders/order/shangpingzhifu.vue';


export default {
    name:"ordersOrder",
    components:{
        orderHeader,
        dangmianzhifu,
        dingdanxiangqing,
        shangping,
        shangpingzhifu
    },
    data(){
        return{
            weixin:''
        }
    },
    computed:{

    },
    methods:{
        ...mapActions({
            order_set_lsit:'orders/order/set_list',
            shoppingCopy:'orders/order/shoppingCopy',   //调用支付接口    
            set_orderid_openid:'orders/order/set_orderid_openid',   //初始化 openid和 ordreId
            findShopOrderByIda:'orders/order/findShopOrderByIda',   //订单详情
            findShopOrdersById:'orders/order/findShopOrdersById'    //订单详情2
        }),
        ...mapActions({
            get_shop:'shop/get_shop',   //查询店铺
        })
    },
    mounted() {
        console.log(this.$route)
        console.log(this.$route.params.zhifu);
        if(this.$route.params.zhifu){
            console.log('调用支付接口')
        }
        this.weixin=JSON.parse(localStorage.weixin)
        //调用支付接口
        var query={
                ordreId:this.$route.query.ordreId,
                openid:this.weixin.openid
            }
        //vuex 初始化 openid和 ordreId
        this.set_orderid_openid(query).then(x=>{
            console.log('数据初始化完成');
            if(this.$route.params.zhifu){
                this.shoppingCopy();    //支付
            }
            //订单详情
            this.findShopOrderByIda().then(x=>{
                console.log('查询店铺',x);
                // this.get_shop(x.data.data.shopid);
            })
            this.findShopOrdersById();
        }).catch(err=>{

        })
        // this.order_set_lsit('传递参数');
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


