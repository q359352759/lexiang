<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">销售</h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <ul class="box_1">
                <li class="title">
                    <div>今日销售额</div>
                    <div class="money">￥-0</div>
                </li>
                <li class="flex">
                    <div>
                        <div>本月销售额</div>
                        <div class="money">￥-0元</div>
                    </div>
                    <div>
                        <div>累计销售额</div>
                        <div class="money">￥-0元</div>
                    </div>
                </li>
                <li class="baobiao" @click="$router.push('/myshop/xiaoshou/baobiao')">报表</li>
            </ul>

            <div class="box_2">
                <div><sort :type="sort.type" :sortType="sort.sortType" :list="sort.list" @setSort="get_sort"/></div>
                <div><timeBox @setTime="get_time"/></div>
            </div>

            <div ref="content"></div>
            <ul class="box_3" :class="{'active':fixed}">
                <li class="header_1" >
                    <div>时间</div>
                    <div>客户</div>
                    <div>订单</div>
                    <div>金额</div>
                    <div>店员</div>
                </li>
            </ul>
            <ul class="box_3" >
                <li v-for="(item, index) in obj.list" :key="index" @click="orderDetails(item)">
                    <div>{{item.createTime | filter_time}}</div>
                    <div>
                        <span v-if="item.user && item.user.nickname">{{item.user.nickname}}</span>
                    </div>
                    <div class="order">
                        <!-- <span v-if="item.orderType==0 && item.shopOrderCommoditys.length==0">未知</span> -->
                        <span v-if="item.orderType==0 && item.shopOrderCommoditys.length==1">{{item.shopOrderCommoditys[0].name}}</span>
                        <span v-if="item.orderType==0 && item.shopOrderCommoditys.length>1">多个商品</span>
                        <span v-if="item.orderType==1">输入金额买单</span>
                    </div>
                    <div>{{item.paymentAmount}}</div>
                    <div></div>
                </li>
            </ul>   

            <loading :loadingtype="obj.loading" :nodata="!obj.loading && obj.total==0" :end="!obj.loading && obj.total==obj.list.length && obj.total!=0" />
            

        </div>
    </div>
</template>

<script>
// import {orderList} from '@/api/order/orderList.js';
// 排序
import sort from "@/components/sort.vue";
//时间
import timeBox from "@/components/time/timeBox.vue";
import { mapActions, mapGetters } from 'vuex';
import { dateFtt } from "@/assets/js/currency.js";
import {b64DecodeUnicode} from '@/assets/js/base64jiema.js';
import loading from '@/components/loading.vue'
export default {
    name:'',
    components: {
        loading,
        sort,
        timeBox
    },
    data () {
        return {
            fixed:false,
            //传递的参数
            sort:{
                type:1,         //时间类型
                sortType:1,
                list:[
                    {'name':'时间',type:1},
                    {'name':'业绩',type:2},
                    // {'name':'其他',type:3},
                ]
            },
            obj:{
                loading:true,
                total:0,
                list:[],
                page_index:0,
                query:{
                    start:0,
                    length:20,
                    shopid:'',
                    state:1
                }
            }
        }
    },
    filters:{
        filter_time(time){
            if(!time) return time;
            return dateFtt(time,'yyyy.MM.dd')
        },
        filter_name(name){
            try {
                name=b64DecodeUnicode(name)     
            } catch (error) {}
            return name;
        }
    },
    computed: {
        ...mapGetters({
            myshop:'get_myshop'
        }),
    },
    methods: {
        ...mapActions({
            setMyshop:'setMyshop'
        }),
        //跳转订单详情
        orderDetails(item){
            this.$router.push('/myshop/xiaoshou/orderDetails?id='+item.id);
        },
        //接收排序参数
        get_sort(x){
            console.log(x)
        },
        //改变时间
        get_time(x){
            console.log(x)
        },
        scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            this.fixed=(e.target.scrollTop+44)>=this.$refs.content.offsetTop
            if (h + t >= sh - 10 && !this.obj.loading && this.obj.total>this.obj.list.length){
                this.obj.page_index++;
                this.findAllShopOrders()
                // this.butie.page_index++;
                //查看下级带来的收益
                // this.subsidies();
            }
        },
        //获取列表
        // fetchData: async function () {
        //     const response = await orderList(this.obj);
        //     const list_1=await fn1();
        //     return new Promise((resolve, reject) => {
        //         var obj={
        //                 list:response,
        //                 list1:list_1
        //             }
        //         resolve(obj)
        //     });
        // },
        findAllShopOrders(){
            this.obj.loading=true;
            this.obj.query.start=this.obj.query.length*this.obj.page_index;
            this.obj.query.shopid=this.myshop.shopid
            this.$axios.get('/api-s/shops/findAllShopOrders',{params:this.obj.query}).then(x=>{
                console.log('获取列表',x);
                if(x.data.code==200){
                    var list=x.data.data.data;
                    list.forEach(item=>{
                        this.get_user(item);
                    })
                    this.obj.list=this.obj.list.concat(x.data.data.data);
                    this.obj.total=x.data.data.total;
                }
                this.obj.loading=false;
            }).catch(err=>{
                this.obj.loading=false
                console.log(err);
            })
        },
        //获取消费者用户信息
        get_user(item){
            this.$axios("/api-u/users/findByUserid/"+item.userid).then(x=>{
                // userInfo.nickname=b64DecodeUnicode(userInfo.nickname)
                console.log(x);
                if(x.data.code==200){
                    // item.user=x.data.data;
                    this.$set(item,'user',x.data.data)
                    try {
                        item.user.nickname=b64DecodeUnicode(item.user.nickname)                    
                    } catch (error) {}
                }
            }).catch(err=>{});
        },
        //我的店铺初始化
        async shop_init(){
            await this.setMyshop();
            this.findAllShopOrders()
        }
    },
    mounted() {
        if(this.myshop && this.myshop.id){
            this.findAllShopOrders();
        }else{
            this.shop_init();   
        }

        
    },
}
</script>

<style lang="scss" scoped>

@import '@/assets/css/config.scss';

.box_1{
    margin: 10px 10px 5px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
    color: #505050;
	font-size: 12px;
    line-height: 18px;
    padding: 15px 0px 7px;
    position: relative;
    .title{
        margin: 0px 0px 12px 0px;
    }
    .money{
        color: #d43030;
    }
    .flex{
        display: flex;
        position: relative;
        >div{
            width: 50%;
        }
    }
    .flex::after{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 50%;
        content: "";
        background: #8a8a8a;
        width: 1px ;
        height: 26px;
        margin: auto;
    }
    .baobiao{
        position: absolute;
        top: 12px ;
        right: 15px;
        color: #808080;
    }
}

.box_2{
    height: 38px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    >div:nth-child(1){
        flex-grow: 1;
    }
}

.box_3.active{
    position: fixed;
    top: 44px;
    left: 0px;
    width: 100%;
}
.box_3{
    li{
        display: flex;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        div{
            width: 20%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-left: 1px solid #FAFAFA;
        }
        div:nth-child(1){
            border:none;
        }
        .order{
            color: #2B82E4;
        }
    }
    li:nth-child(2n-1):not(.header_1){
        background:#ffffff; 
    }
    li.header_1{
        background: $header_background;
        color: #ffffff;
    }
}
</style>

