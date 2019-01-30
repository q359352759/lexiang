<template>
    <div class="box_2">
        <ul class="header">
            <li class="daipingjia mui-pull-right">
                <span v-show="shangping.state==0">待支付</span>
                <span v-show="shangping.state==1">
                    <span v-if="已评价" >已评价</span>
                    <span v-if="!已评价">待评价</span>
                </span>
            </li>
            <li class="shop">
                <i class="icon_shop icon iconfont icon-jinrudianpu"></i>
                <span @click="$router.push('/BusinessDetails?shopid='+shangping.shopid)">{{shangping.shopName}}</span>
                <i class="icon_right mui-icon mui-icon-arrowright"></i>
            </li>
        </ul>
        <ul class="shangpng" @click="xiangqing()">
            <li v-for="(item, index) in nuew_list" :key="index">
                <div class="img_box">
                    <img v-if="item.img.split(',').length>0" :src="item.img.split(',')[0]" alt="" srcset="">
                </div>
                <div class="text_box">
                    <div class="name">
                        {{item.name}}
                        <span class="shuliang mui-pull-right">x{{item.number}}</span>
                    </div>
                    <div>￥{{item.sellingPrice}}</div>
                    <div v-show="item.state==0">可抵扣：-{{item.deduction}}元</div>
                    <div v-show="item.state!=0">红包抵扣：-{{item.dikou}}元</div>
                </div>
                <div class="zhuanxiang">
                    <img v-if="item.exclusive==1" src="image/xingren.png" alt="" srcset="">
                    <img v-if="item.exclusive==2" src="image/shengri1.png" alt="" srcset="">
                </div>
            </li>
        </ul>
        <ul class="footer">
            <li class="text_1" v-show="shangping.state==0">共计{{shangping.shopOrderCommoditys.length}}个商品，合计{{shangping.paymentAmount+shangping.deduction}}元，优惠{{shangping.deduction}}元。</li>
            <li class="text_1" v-show="shangping.state==1">共计{{shangping.shopOrderCommoditys.length}}个商品，合计{{shangping.paymentAmount+shangping.deduction}}元，优惠{{shangping.deduction}}元。</li>
            <li class="btn_1 quxiao" @click="取消()" v-if="shangping.state==0">取消</li>
            <li @click="zhifu()" class="btn_1 zhifu" v-show="shangping.state==0">支付</li>
            <!-- <li class="btn_1 zhifu" @click="$router.push('/my/pingjia/pingjia?orderid='+shangping.id)" v-if="shangping.state==1">已支付</li> -->
            <li class="btn_1 zhifu" v-if="shangping.state==1">
                <span v-if="已评价" @click="$router.push('/my/pingjia/xiangqing?ordersid='+shangping.ordersid+'&id='+shangping.id)">评价</span>
                <span v-if="!已评价" @click="$router.push('/my/pingjia/pingjia?orderid='+shangping.id)">评价</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: {
        shangping: {
            default: {}
        }
    },
    name: "",
    data() {
        return {};
    },
    computed: {
        已评价(){
            var list = this.shangping.shopOrderCommoditys ? this.shangping.shopOrderCommoditys : [];
            var 未评价=list.find(x=>x.state==0);
            if(未评价){
                return false
            }else{
                return true
            }
        },
        nuew_list() {
            var list = this.shangping.shopOrderCommoditys ? this.shangping.shopOrderCommoditys : [];
            var new_list = [];
            list.forEach(item => {
                let obj = new_list.find(x => x.commodityid == item.commodityid);
                if (obj) {
                    obj.number = obj.number + 1;
                    obj.dikou = obj.dikou + item.realDeduction;
                    if (item.exclusive) {
                        obj.exclusive = item.exclusive;
                    }
                } else {
                    item.number = 1;
                    item.dikou = item.realDeduction;
                    new_list.push(item);
                }
            });
            return new_list;
        }
    },
    methods: {
        ...mapActions({
            取消订单: "orders/orderList/取消订单"
        }),
        取消() {
            mui.confirm("确定要取消订单？", "提示", ["再想想", "是的"], val => {
                if (val.index == 1) {
                    this.取消订单(this.shangping);
                }
            }, "div");
        },
        //订单详情
        xiangqing() {
            this.$router.push("/orders/order?ordreId=" + this.shangping.id);
        },
        //支付
        zhifu() {
            console.log(123);
            this.$router.push({
                name: "ordersOrder",
                query: { ordreId: this.shangping.id },
                params: { zhifu: 1 }
            });
        }
    },
    mounted() {
        console.log(this.shangping);
    }
};
</script>

<style lang="scss" scoped>
.box_2 {
    background: #ffffff;
    margin: 3px 0px 0px;
    .header {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        padding: 0px 10px;
        border-bottom: 1px solid rgba(246, 246, 246, 1);
        // display: flex;
        height: 30px;
        line-height: 30px;
        .shop {
            display: flex;
            align-items: center;
        }
        .icon_shop {
            color: #e86434;
            font-size: 20px;
            margin: 0px 5px 0px 0px;
        }
        .icon_right {
            font-size: 12px;
        }
        .daipingjia {
            color: #505050;
        }
    }
    .shangpng {
        padding: 0px 10px;
        border-bottom: 1px solid rgba(246, 246, 246, 1);
        > li {
            border-bottom: 1px solid rgba(246, 246, 246, 1);
            padding: 7px 0px;
            display: flex;
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
            position: relative;
        }
        > li:last-child {
            border: none;
        }
        .img_box {
            flex-shrink: 0;
            width: 72px;
            height: 54px;
            margin: 0px 5px 0px 0px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .text_box {
            flex-grow: 1;
            .shuliang {
                color: #a6a6a6;
            }
        }
        .zhuanxiang {
            position: absolute;
            width: 20px;
            height: 20px;
            right: 10px;
            bottom: 7px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .footer {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0px 11px;
        .text_1 {
            width: 0;
            flex-grow: 1;
            white-space: nowrap;
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
        }
        .btn_1 {
            width: 55px;
            height: 20px;
            line-height: 18px;
            text-align: center;
            border-radius: 20px;
            font-size: 12px;
            margin: 0px 0px 0px 10px;
        }
        .quxiao {
            color: rgba(166, 166, 166, 1);
            border: 1px solid rgba(166, 166, 166, 1);
        }
        .zhifu {
            color: #007aff;
            border: 1px solid #007aff;
        }
    }
}
</style>
