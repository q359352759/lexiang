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
                <shangping v-if="dingdanxiangqing.orderType==0"/>
                <!-- 订单详情 -->
                <dingdanxiangqing />
               

            </div>
            <div class="footer_1">
                <!-- 输入金额底部 -->
                <dangmianzhifu v-if="dingdanxiangqing.orderType==1"/>
                <!-- 商品支付底部 -->
                <shangpingzhifu v-if="dingdanxiangqing.orderType==0"/>
            </div>
        </div>
        <!-- 抵扣详情 -->
        <dikouxiangqing v-if="dingdanxiangqing.orderType==0"/>
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
//抵扣详情
import dikouxiangqing from "@/components/orders/order/dikouxiangqing.vue";

export default {
    name:"ordersOrder",
    components:{
        orderHeader,
        dangmianzhifu,
        dingdanxiangqing,
        shangping,
        shangpingzhifu,
        dikouxiangqing
    },
    data(){
        return{
            weixin:''
        }
    },
    computed:{
        ...mapGetters({
            dingdanxiangqing:'orders/order/dingdanxiangqing',   //订单基本信息
        })
    },
    methods:{
        ...mapActions({
            order_set_lsit:'orders/order/set_list',
            shoppingCopy:'orders/order/shoppingCopy',   //调用支付接口    
            set_orderid_openid:'orders/order/set_orderid_openid',   //初始化 openid和 ordreId
            findShopOrdersById:'orders/order/findShopOrdersById'    //订单详情
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
        //vuex  初始化 openid和 ordreId
        this.set_orderid_openid(query).then(x=>{
            console.log('数据初始化完成');
            this.findShopOrdersById().then(x=>{
                console.log('订单详情',x);
                //查询店铺信息
                this.get_shop(x.data.data.shopid);
                if(this.$route.params.zhifu){
                    //支付
                    this.shoppingCopy();         
                }
            })
        }).catch(err=>{})
        //订单详情
        
        
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


