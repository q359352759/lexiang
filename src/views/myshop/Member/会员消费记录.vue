<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">会员消费记录</h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <ul class="box_1">
                <li class="mui-pull-right">日期：{{会员信息.createTime | filter_time}}</li>
                <li>会员：{{会员信息.USERNAME | filter_name}}</li>
            </ul>

            <ul class="mui-table-view 列表">
                <li class="mui-table-view-cell" v-for="(item, index) in list_all.list" :key="index" @click="$router.push('/myshop/xiaoshou/orderDetails?id='+item.id)">
                    <a class="mui-navigate-right item">
                        <div class="钱">￥{{item.turnover}}</div>
                        <div class="灰色字体" v-if="item.orderType==0 && item.shopOrderCommoditys.length==1">{{item.shopOrderCommoditys[0].name}}</div>
                        <div class="灰色字体" v-if="item.orderType==0 && item.shopOrderCommoditys.length>1">多个商品</div>
                        <div class="灰色字体" v-if="item.orderType==1">输入金额购买</div>
                        <!-- <span class="灰色字体">多个商品</span> -->
                        <div class="时间">{{item.createTime | filter_time}}</div>
                    </a>
                </li>
            </ul>
            <loading :loadingtype="list_all.loading" :nodata="!list_all.loading && list_all.total==0" :end="!list_all.loading && list_all.list.length>=list_all.total && list_all.total!=0" />

            <ul class="底部">
                <li>{{天数}}</li>
                <li>消费：{{list_all.total}}笔</li>
                <li>均单：{{(会员信息.PAYMENTAMOUNT/list_all.total).toFixed(2)}}</li>
                <li>总消费：{{会员信息.PAYMENTAMOUNT}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import loading from "@/components/loading.vue";

import { openloading, dateFtt } from "@/assets/js/currency.js";
import { getDaysByDateString } from "@/assets/js/time.js";

import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";
export default {
    name: "",
    components: {
        loading
    },
    data() {
        return {
            userInfo: "",
            list_all: {
                //全部
                loading: true,
                page_index: 0,
                list: [],
                total: 0,
                query: {
                    start: 0,
                    length: 20,
                    state: 1,
                    userid: "",
                    shopid: ""
                }
            },
            会员信息: {}
        };
    },
    filters: {
        filter_time(time) {
            if (!time) return time;
            return dateFtt(time, "yyyy.MM.dd");
        },
        filter_name(name) {
            try {
                return b64DecodeUnicode(name);
            } catch (error) {
                return name;
            }
        }
    },
    computed: {
        ...mapGetters({
            myshop: "get_myshop"
        }),
        天数() {
            if (!this.会员信息.createTime) return "计算中";
            var days = getDaysByDateString(this.会员信息.createTime, new Date());
            if (days < 30) {
                return Math.round(days) + "天";
            } else {
                return (days / 30).toFixed(1);
            }
        }
    },
    methods: {
        ...mapActions({
            get_orderList: "orders/orderList/get_orderList",
            获取店铺: "getMyshop"
        }),
        scroll(e) {
            // console.log(e.target.scrollTop,this.$refs.content.offsetTop);
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10 && !this.list_all.loading && this.list_all.list.length < this.list_all.total) {
                console.log("到底底部");
                // this.butie.page_index++;
                //查看下级带来的收益
                // this.subsidies();
                this.get_orderList([this.list_all, true]);
            }
        },
        async init() {
            if (!this.myshop || !this.myshop.shopid) {
                await this.获取店铺();
            }
            this.list_all.query.shopid = this.myshop.shopid;
            this.get_orderList([this.list_all]);
            setTimeout(x => {
                console.log(this.list_all);
            }, 3000);
            //获取会员信息
            this.$axios.get("/api-s/shops/findShopCustomerAll?start=0&length=10&shopid=" + this.myshop.shopid + "&userid=" + this.list_all.query.userid).then(x => {
                console.log("获取会员信息", x);
                if (x.data.code == 200 && x.data.data.data.length > 0) {
                    this.会员信息 = x.data.data.data[0];
                }
            }).catch(err => { });
        }
    },
    mounted() {
        this.list_all.query.userid = this.$route.query.userid;
        this.init();
        console.log(getDaysByDateString("2019-01-05T01:56:09.000+0000", new Date()));
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-content {
    padding-bottom: 50px;
}
.box_1 {
    height: 37px;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    line-height: 37px;
    padding: 0px 11px;
    margin: 4px 0px 0px;
}
.列表 {
    margin: 3px 0px 0px;
    .mui-table-view-cell:after {
        right: 15px;
    }
    .item {
        display: flex;
        align-items: center;
        div {
            width: calc(100% / 3);
        }
        .钱 {
            color: rgba(212, 48, 48, 1);
            font-size: 14px;
        }
        .蓝色字体 {
            color: rgba(0, 122, 255, 1);
            font-size: 14px;
            text-align: center;
        }
        .灰色字体 {
            color: rgba(128, 128, 128, 1);
            font-size: 14px;
            text-align: center;
        }
        .时间 {
            color: rgba(217, 217, 217, 1);
            font-size: 12px;
            text-align: right;
            padding: 0px 15px 0px 0px;
        }
    }
}

.底部 {
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    height: 38px;
    line-height: 38px;
    background: $header_background;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    padding: 0px 14px;
    display: flex;
    justify-content: space-between;
}
</style>
