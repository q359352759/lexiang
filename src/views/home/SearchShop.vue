<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <form @submit.prevent="submit()">
                    <div class="suosuo">
                        <input @click="search()" type="text" v-model="search_text">
                        <i @tap="chazhao()" class="icon iconfont icon-chazhao"></i>
                        <button type="submit" class="miu-hidden">查找</button>
                    </div>
                </form>
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1" :class="{'active':search_box}">
                <div class="mask" @click="search_close()"></div>
                <ul class="box_3">
                    <li :class="{'active':type==0}" @click="选择类型(0)">商家</li>
                    <li :class="{'active':type==3}" @click="选择类型(3)">专享</li>
                    <li :class="{'active':type==1}" @click="选择类型(1)">商品</li>
                    <li :class="{'active':type==2}" @click="选择类型(2)">商城</li>
                </ul>
                <div class="title_1">热门</div>
                <ul class="list border_bottom">
                    <li @click="select_text('火锅')">
                        <span>火锅</span>
                    </li>
                    <li @click="select_text('自助餐')">
                        <span>自助餐</span>
                    </li>
                    <li @click="select_text('美发')">
                        <span>美发</span>
                    </li>
                    <li @click="select_text('空调')">
                        <span>空调</span>
                    </li>
                </ul>
                <div class="title_1">历史</div>
                <ul class="list">
                    <li @click="select_text(item)" v-for="(item, index) in search_history" :key="index"><span>{{item}}</span></li>
                </ul>
            </div>

            <ul class="box_3">
                <li :class="{'active':type==0}" @click="选择类型(0)">商家</li>
                <li :class="{'active':type==3}" @click="选择类型(3)">专享</li>
                <li :class="{'active':type==1}" @click="选择类型(1)">商品</li>
                <li :class="{'active':type==2}" @click="选择类型(2)">商城</li>
            </ul>

            <ul class="box_2">
                <li>
                    <span @click="select_screen('juli')">
                        距离
                    </span>
                    <img v-if="screen_type!=2 && screen_type!=3" src="image/paixun.png" alt="">
                    <img v-if="screen_type==2" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==3" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('renqi')">
                        人气
                    </span>
                    <img v-if="screen_type!=0 && screen_type!=1" src="image/paixun.png" alt="">
                    <img v-if="screen_type==0" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==1" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('pingjia')">
                        评价
                    </span>
                    <img v-if="screen_type!=6 && screen_type!=7" src="image/paixun.png" alt="">
                    <img v-if="screen_type==6" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==7" src="image/paixushang.png" alt="">
                </li>
            </ul>

            <!-- 商家 -->
            <ul class="box_6" v-if="type==0" @scroll="content_scroll($event)">
                <li v-for="(item, index) in shop.list" :key="index">
                    <div @click="BusinessDetails(item)">
                        <img :src="item.signboard" alt="" srcset="">
                    </div>
                    <div>
                        <h1 @click="BusinessDetails(item)">{{item.name}}</h1>
                        <h2>
                            <span @click="weixinmaptest(item)" class="mui-pull-right"><i class="icon iconfont icon-location"></i>{{item.distance>0.5 ? item.distance.toFixed(1) : item.distance.toFixed(1)*1000+'m' }}km</span>
                            <div @click="BusinessDetails(item)">{{item.address}}</div>
                        </h2>
                        <h3 @click="BusinessDetails(item)">
                            <span class="mui-pull-right"><i class="icon iconfont icon-hongbao1"></i></span>
                            <span>好评：5分</span>
                        </h3>
                    </div>
                </li>
                <loading v-if="type==0" :loadingtype="shop.loading" :nodata="!shop.loading && shop.total==0" :end="!shop.loading && shop.total!=0 && shop.list.length==shop.total" />
            </ul>
            <div class="专享商品" v-if="type==3">
                <zhuanxiangshangpin />
            </div>
            <!-- 商品 -->
            <ul class="box_5" v-if="type==1" @scroll="content_scroll($event)">
                <li v-for="(item, index) in commodity.list" :key="index" @click="CommodityDetails(item)">
                    <div>
                        <div class="img_box">
                            <img v-if="item.img" :src="item.img.split(',')[0]" alt="" srcset="">
                        </div>
                        <h1>{{item.name}}</h1>
                        <div class="text_1">
                            <div class="xiaoshou">
                                <span>销</span>
                                <span>{{item.sales}}笔</span>
                            </div>
                            <div class="dikou">
                                <i class="icon iconfont icon-hongbao1"></i>
                                <span>抵扣:{{item.deduction}}元</span>
                            </div>
                        </div>
                        <div class="text_2">
                            <span class="xianjia">￥{{item.sellingPrice}}</span>
                            <s class="yuanjia">{{item.marketPrice}}</s>
                        </div>
                    </div>
                </li>
                <loading style="width:100%" v-if="type==1" :loadingtype="commodity.loading" :nodata="!commodity.loading && commodity.total==0" :end="!commodity.loading && commodity.total!=0 && commodity.list.length==commodity.total" />
            </ul>

            <div class="商城" v-if="type==2">
                <loading :nodata="true" />
            </div>

        </div>

    </div>
</template>

<script>
import { openloading, bd_decrypt, GetDistance } from "@/assets/js/currency";
import loading from "@/components/loading.vue";
import zhuanxiangshangpin from "./SearchShop/专享商品.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "",
    components: {
        loading,
        zhuanxiangshangpin
    },
    data() {
        return {
            screen_type: 2, //2 3 距离 0 1 人气 6 7 评价
            search_text: "", //搜索内容
            search_box: true,
            type: 0, // 0商家 1 商品 2商城 3专享
            search_history: [
                //搜索历史
            ],
            shop: {
                page_index: 0,
                loading: true,
                list: [],
                total: 0,
                jquery: {
                    start: 0,
                    length: 10,
                    state: 1,
                    name: "",
                    upx: "", //位置
                    upy: "",
                    orderType: "ASC",
                    order: "distance" //sales 销量 popularity 人气 distance 距离
                }
            },
            commodity: {
                page_index: 0,
                loading: true,
                list: [],
                total: 0,
                jquery: {
                    start: 0,
                    length: 6,
                    state: 1,
                    name: "",
                    upx: "", //位置
                    upy: "",
                    orderType: "DESC", //ASC DESC
                    order: "popularity" //sales 销量 popularity 人气 distance 距离
                }
            }
        };
    },
    computed: {
        ...mapGetters({
            当前位置: '当前位置'
        })
    },
    filters: {
        filter_juli(data) {
            return data.replace("米", "m").replace("公里", "km");
        }
    },
    methods: {
        ...mapActions({
            查询专享: "home/搜索/查询专享",
            专享下一页: "home/搜索/专享下一页",
            专享初始化: "home/搜索/专享初始化",
            获取位置: '获取位置/获取位置'
        }),
        //跳转商家详情
        BusinessDetails(x) {
            this.$router.push("/BusinessDetails?shopid=" + x.shopid);
        },
        //跳转商品详情
        CommodityDetails(x) {
            this.$router.push("/commodity/CommodityDetails?id=" + x.id);
        },
        //跳转微信内置地图
        weixinmaptest(item) {
            var ditu = bd_decrypt(item.y, item.x);
            console.log(ditu);
            wx.openLocation({
                latitude: ditu.lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: ditu.lng, // 经度，浮点数，范围为180 ~ -180。
                name: item.name, // 位置名
                address: item.address, // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        //点击搜索记录之类的
        select_text(x) {
            this.search_text = x;
            this.search_box = false;
            this.submit();
        },
        //滚动条
        content_scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10) {
                if (this.type == 0) {
                    if (!this.shop.loading && this.shop.list.length < this.shop.total) {
                        this.shop.page_index++;
                        this.get_shops();
                    }
                } else if (this.type == 1) {
                    if (
                        !this.commodity.loading &&
                        this.commodity.list.length < this.commodity.total
                    ) {
                        this.commodity.page_index++;
                        this.get_commodity();
                    }
                } else if (this.type == 2) {
                    this.专享下一页();
                }
                console.log("到底底部");
            }
        },
        //点击查找
        chazhao() {
            this.submit();
        },
        submit() {
            if (this.search_text) {
                if (this.search_history.indexOf(this.search_text) == -1) {
                    this.search_history.unshift(this.search_text);
                    if (this.search_history.length > 12) {
                        this.search_history.splice(this.search_history.length - 1);
                    }
                    localStorage.search_history = JSON.stringify(this.search_history);
                }
                this.search_box = false;
                if (this.type == 0) {
                    this.select_type = 2;
                    this.shop.list = [];
                    this.shop.page_index = 0;
                    this.get_shops();
                } else if (this.type == 1) {
                    this.screen_type = 0;
                    this.commodity.list = [];
                    this.commodity.page_index = 0;
                    this.get_commodity();
                } else if (this.type == 3) {
                    this.screen_type = 0; //人气
                    this.专享初始化([this.search_text, "popularity", "DESC"]);
                    this.查询专享();
                }
            }
        },
        // this_1.$store.state.my_position.x=r.point.lng;
        // this_1.$store.state.my_position.y=r.point.lat;
        //查询商家
        get_shops() {
            var this_1 = this;
            this.shop.jquery.name = this.search_text;
            this.shop.jquery.upx = this.$store.state.my_position.x;
            this.shop.jquery.upy = this.$store.state.my_position.y;
            this.shop.jquery.start = this.shop.page_index * this.shop.jquery.length;
            if (this.screen_type == 2 || this.screen_type == 3) {
                this.shop.jquery.orderType = this.screen_type == 2 ? "ASC" : "DESC";
                this.shop.jquery.order = "distance";
            } else if (this.screen_type == 0 || this.screen_type == 1) {
                this.shop.jquery.orderType = this.screen_type == 0 ? "ASC" : "DESC";
                this.shop.jquery.order = "popularity";
            } else if (this.screen_type == 6 || this.screen_type == 7) {
            }
            this.shop.loading = true;
            // this.shop.jquery.
            this.$axios({
                method: "get",
                url: "/api-s/shops/findAll",
                params: this.shop.jquery
            })
                .then(x => {
                    console.log("查询店铺", x);
                    var list = x.data.data.data;
                    for (var i = 0; i < list.length; i++) {
                        list[i].juli = "";
                        // this_1.juli(list[i])
                    }
                    this.shop.list = this.shop.list.concat(list);
                    this.shop.total = x.data.data.total;
                    this.shop.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.shop.loading = false;
                });
        },
        //查询商品
        get_commodity() {
            var this_1 = this;
            this.commodity.jquery.name = this.search_text;
            this.commodity.jquery.upx = this.$store.state.my_position.x;
            this.commodity.jquery.upy = this.$store.state.my_position.y;
            this.commodity.jquery.start =
                this.commodity.page_index * this.commodity.jquery.length;
            if (this.screen_type == 2 || this.select_type == 3) {
            } else if (this.screen_type == 0 || this.screen_type == 1) {
                this.commodity.jquery.order = "popularity";
                this.commodity.jquery.orderType =
                    this.screen_type == 0 ? "DESC" : "ASC";
            } else if (this.screen_type == 6 || this.screen_type == 7) {
            }
            this.commodity.loading = true;
            this.$axios({
                method: "get",
                url: "/api-s/shops/commodity/findAll",
                params: this.commodity.jquery
            })
                .then(x => {
                    console.log("获取商品列表", x);
                    this.commodity.list = this.commodity.list.concat(x.data.data.data);
                    this.commodity.total = x.data.data.total;
                    this.commodity.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.commodity.loading = false;
                });
        },
        //选择排序
        select_screen(x) {
            if (x == "juli") {
                this.screen_type = this.screen_type == 2 ? 3 : 2;
            } else if (x == "renqi") {
                this.screen_type = this.screen_type == 0 ? 1 : 0;
            } else {
                this.screen_type = this.screen_type == 6 ? 7 : 6;
            }

            if (this.type == 0) {
                this.shop.list = [];
                this.page_index = 0;
                this.get_shops();
            } else if (this.type == 1) {
                this.commodity.list = [];
                this.commodity.page_index = 0;
                this.get_commodity();
            } else if (this.type == 3) {
                var 排序类型 = "popularity";
                var 排序方式 = "DESC";
                if (this.screen_type == 0 || this.screen_type == 1) {
                    排序类型 = "popularity";
                    排序方式 = this.screen_type == 0 ? "DESC" : "ASD";
                } else if (this.screen_type == 2 || this.screen_type == 3) {
                    排序类型 = "distance";
                    排序方式 = this.screen_type == 0 ? "DESC" : "ASD";
                }
                this.专享初始化([this.search_text, 排序类型, 排序方式]);
                this.查询专享();
            }
        },
        //点击输入框
        search() {
            this.search_box = true;
            // localStorage.search_history
        },
        // 关闭搜索提示
        search_close() {
            if (this.search_text) {
                this.search_box = false;
                this.submit();
            }
        },
        //点击商品或商家
        选择类型(x) {
            this.type = x;
            if (!this.search_text) {
                return;
            }
            this.search_box = false;
            this.submit();
        },
        //获取位置
        juli(item) {
            if (!this.$store.state.my_position.y) {
                return;
            }
            var obj = {
                destinations: this.$store.state.my_position.y + "," + this.$store.state.my_position.x, //起点
                origins: item.y + "," + item.x
            };
            this.$axios({
                method: "get",
                url: "/api-u/baidu/routematrix",
                params: obj
            }).then(x => {
                // console.log(x);
                if (x.data.status == 0 && x.data.result.length > 0) {
                    item.juli = x.data.result[0].distance.text; //text 分为单位有米、公里两种
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    beforeCreate: function () {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function () {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function () {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function () {
        var this_1 = this;
        // console.log('搜索记录',localStorage.search_history);
        //搜索记录
        try {
            this.search_history = JSON.parse(localStorage.search_history);
        } catch (error) { }

        if (!this.当前位置 || this.当前位置.x == '' || this.当前位置.y == '') {
            this.获取位置()
        }


        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function () {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // console.group('destroyed 销毁完成状态===============》');
    }
};
</script>

<style lang="scss" scoped>
.suosuo {
    width: 264px;
    max-width: 100%;
    height: 28px;
    margin: 8px auto 0px;
    padding: 0px 10px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.3);
    input {
        padding: 0px 5px;
        margin: 0px;
        height: auto;
        background: none;
        border: none;
        font-size: 14px;
    }
    i {
        padding: 0px 0px 0px 10px;
    }
    button {
        display: none;
    }
}

.mui-content {
    display: flex;
    flex-direction: column;
}

.box_1.active {
    display: block;
}
.box_1 {
    flex-shrink: 0;
    position: fixed;
    display: none;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    padding: 44px 0px 10px;
    background: #f6f6f6;
    z-index: 2;
    .mask {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
    }
    .title_1 {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        padding: 12px 0px 6px;
        position: relative;
        z-index: 1;
        margin: 0px 17px 0px;
    }
    .list.border_bottom {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        position: relative;
        z-index: 1;
    }
    .list {
        margin: 0px 17px;
        position: relative;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        padding: 0px 0px 6px;
        li {
            width: calc(100% / 4);
            text-align: center;
            padding: 0px 2px;
            margin: 0px 0px 6px 0px;
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
            line-height: 26px;
            span {
                display: block;
                padding: 0px 3px;
                background: #ffffff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
.box_3 {
    flex-shrink: 0;
    background: #ffffff;
    display: flex;
    height: 45px;
    line-height: 45px;
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    border-bottom: 1px solid #f6f6f6;
    text-align: center;
    li {
        width: 25%;
        position: relative;
    }
    li.active {
        color: rgba(252, 102, 33, 1);
    }
    li.active::after {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        content: "";
        width: 60px;
        height: 1px;
        background: rgba(252, 102, 33, 1);
    }
}

.box_2 {
    flex-shrink: 0;
    background: #ffffff;
    text-align: center;
    display: flex;
    color: rgba(128, 128, 128, 1);
    border-bottom: 1px solid #efefef;
    font-size: 0.12rem;
    line-height: 0.37rem;
    height: 0.37rem;
    align-items: center;

    > li {
        width: 33.3%;
    }
    img {
        vertical-align: middle;
        width: 0.12rem;
    }
    .input_box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 0.26rem;
        // border: 1px solid #cccccc;
        border-radius: 3px;
        font-size: 0.12rem;
        line-height: 0.26rem;
        div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        i {
            font-size: 0.16rem;
            color: #c0bcbc;
        }
    }
}
.box_6 {
    margin: 5px 0px 0px;
    > li {
        display: flex;
        background: #ffffff;
        padding: 0.08rem 0.1rem;
        border-bottom: 1px solid #e5e5e5;
        > div:nth-child(1) {
            flex-shrink: 0;
            width: 0.77rem;
            height: 0.58rem;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        > div:nth-child(2) {
            margin: 0px 0px 0px 8px;
            width: 0;
            flex-grow: 1;
            h1 {
                margin: 0px;
                font-weight: 400;
                color: rgba(80, 80, 80, 1);
                font-size: 0.14rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h2 {
                margin: 8px 0px 8px;
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
                font-size: 0.12rem;
                div {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            h3 {
                font-weight: 400;
                color: rgba(212, 48, 48, 1);
                font-size: 0.12rem;
                margin: 0px;
            }
        }
    }
}

.box_5 {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0px 5px;
    > li {
        width: 50%;
        padding: 5px;
        > div {
            background: #ffffff;
        }
    }
    .img_box {
        width: 1.72rem;
        height: 1.29rem;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    h1 {
        padding: 0px 0.06rem;
        color: rgba(80, 80, 80, 1);
        font-size: 0.12rem;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .text_1 {
        display: flex;
        justify-content: space-between;
        padding: 0px 0.06rem;
        .xiaoshou {
            > span:nth-child(1) {
                display: inline-block;
                width: 0.12rem;
                height: 0.12rem;
                font-size: 0.08rem;
                line-height: 0.12rem;
                text-align: center;
                border-radius: 100%;
                background: #ff5733;
                color: #ffffff;
            }
            > span:nth-child(2) {
                color: rgba(166, 166, 166, 1);
                font-size: 0.1rem;
            }
        }
        .dikou {
            i {
                color: #fc4c4c;
                font-size: 0.1rem;
            }
            span {
                font-size: 0.1rem;
                color: #fc4c4c;
            }
        }
    }
    .text_2 {
        padding: 0px 0.06rem;
        .xianjia {
            color: #d43030;
            font-size: 0.12rem;
            font-weight: bold;
        }
        .yuanjia {
            font-size: 0.1rem;
            color: #a6a6a6;
            margin: 0px 0px 0px 0.05rem;
        }
    }
}
</style>
