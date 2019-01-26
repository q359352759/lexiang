<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">我的订单</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>
                    <span @click="设置类型(0)" :class="{'active':查看类型==0}">全部</span>
                </li>
                <li>
                    <span @click="设置类型(1)" :class="{'active':查看类型==1}">待付款</span>
                </li>
                <li>
                    <span @click="设置类型(2)" :class="{'active':查看类型==2}">待发货</span>
                </li>
                <li>
                    <span @click="设置类型(3)" :class="{'active':查看类型==3}">待收货</span>
                </li>
                <li>
                    <span @click="设置类型(4)" :class="{'active':查看类型==4}">待评价</span>
                </li>
                <li>
                    <span @click="设置类型(5)" :class="{'active':查看类型==5}">售后</span>
                </li>
            </ul>
            <div class="content_1" @scroll="scroll($event)">
                <!-- 全部 -->
                <div v-show="查看类型==0">
                    <div v-for="(item, index) in list_all.list" :key="index">
                        <shangping v-if="item.orderType==0" :shangping="item" />
                        <xianjin v-if="item.orderType==1" :dingdan="item" />
                    </div>
                    <loading :loadingtype="list_all.loading" :nodata="!list_all.loading && list_all.total==0" :end="!list_all.loading && list_all.total!=0 && list_all.total==list_all.list.length" />
                </div>
                <!-- 待付款 -->
                <div v-show="查看类型==1">
                    <div v-for="(item, index) in list_0.list" :key="index">
                        <shangping v-if="item.orderType==0" :shangping="item" />
                        <xianjin v-if="item.orderType==1" :dingdan="item" />
                    </div>
                    <loading :loadingtype="list_0.loading" :nodata="!list_0.loading && list_0.total==0" :end="!list_0.loading && list_0.total!=0 && list_0.total==list_0.list.length" />
                </div>

                <!-- 待发货 -->
                <div v-show="查看类型==2">
                    <loading :nodata="true" />
                </div>
                <!-- 待收货 -->
                <div v-show="查看类型==3">
                    <loading :nodata="true" />
                </div>
                <!-- 待评价 -->
                <div v-show="查看类型==4">
                    <div v-for="(item, index) in 待评价.list" :key="index">
                        <daipingjiaShangping v-if="item.orderType==0" :shangping="item" />
                        <daipingjiaXianjing v-if="item.orderType==1" :dingdan="item" />
                    </div>
                    <loading :loadingtype="待评价.loading" :nodata="!待评价.loading && 待评价.total==0" :end="!待评价.loading && 待评价.total!=0 && 待评价.total==待评价.list.length" />
                </div>
                <!-- 售后 -->
                <div v-show="查看类型==5">
                    <loading :nodata="true" />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 商品订单
import shangping from "@/components/orders/orderList/shangping.vue";
// 输入金额订单
import xianjin from "@/components/orders/orderList/xianjin.vue";

import daipingjiaShangping from './components/待评论商品.vue';
import daipingjiaXianjing from './components/待评论现金支付.vue';

import loading from "@/components/loading.vue";
export default {
    name: "",
    components: {
        shangping,
        xianjin,
        loading,
        daipingjiaShangping,
        daipingjiaXianjing
    },
    data() {
        return {
            type: 0 //0 全部 1 待付款 2 待发货 3 待收货 4 待评价 5 售后
        };
    },
    computed: {
        ...mapGetters({
            list_all: "orders/orderList/list_all", //全部
            list_0: "orders/orderList/list_0", //待支付
            待评价: "orders/orderList/待评价",   //带评价
            查看类型:'orders/orderList/查看类型'
        })
    },
    methods: {
        ...mapActions({
            get_orderList: "orders/orderList/get_orderList",
            init_state: "orders/orderList/init_state",
            查询待评价订单:'orders/orderList/查询待评价订单',
            待评价下一页:'orders/orderList/待评价下一页',
            设置类型:'orders/orderList/设置类型'
        }),
        select_type(x) {
            this.type = x;
        },
        order() {
            this.$router.push("/orders/order");
        },
        //下拉加载
        scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(e)
            if (h + t >= sh - 10) {
                // type:0, //0 全部 1 待付款 2 待发货 3 待收货 4 待评价 5 售后
                if (this.type == 0 && !this.list_all.loading && this.list_all.list.length < this.list_all.total) {
                    this.get_orderList([this.list_all, true]);
                } else if ( this.type == 1 && !this.list_0.loading && this.list_0.list.length < this.list_0.total) {
                    this.get_orderList([this.list_0, true]);
                } else if (this.type == 2) {
                } else if (this.type == 3) {
                } else if (this.type == 4 && !this.待评价.loading && this.待评价.list.length < this.待评价.total) {
                    this.待评价下一页()
                } else {
                }
                console.log("到底底部");

                // this.butie.page_index++;
                // //查看下级带来的收益
                // this.subsidies();
            }
        }
    },
    mounted() {
        this.init_state().then(() => {
            this.get_orderList([this.list_all, false]);
            this.get_orderList([this.list_0, false]);
            this.查询待评价订单();
        });
        var query = this.$route.query;
        if (query.type) {
            this.type = query.type;
        }
    }
};
</script>

<style lang="scss" scoped>
.mui-content {
    display: flex;
    flex-direction: column;
    .box_1 {
        flex-shrink: 0;
    }
    .content_1 {
        flex-grow: 1;
        overflow: auto;
    }
}
.box_1 {
    display: flex;
    text-align: center;
    line-height: 38px;
    background: #ffffff;
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    > li {
        width: calc(100% / 6);
    }
    span {
        display: inline-block;
        padding: 0px 3px;
    }
    span.active {
        border-bottom: 2px solid #007aff;
    }
}

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
