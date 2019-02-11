<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">店铺推广</h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <ul class="店铺信息">
                <li class="店铺logo">
                    <img v-if="店铺.signboard" :src="店铺.signboard" alt="">
                </li>
                <li class="内容区">
                    <div class="店铺名">{{店铺.name}}</div>
                    <div class="地址">{{店铺.address}}</div>
                    <div class="业务">业务:--</div>
                    <ul class="综合">
                        <li class="星星">
                            <i class="icon iconfont icon-shoucangdianjihou"></i>
                            5.0
                        </li>
                        <li class="佣金">
                            <i class="icon iconfont icon-yongjin1"></i>
                            0%
                        </li>
                        <li class="距离">
                            <i class="icon iconfont icon-location"></i>
                            {{距离 | filter_juli}}
                        </li>
                        <!-- <li class="人数">
                            <i class="icon iconfont icon-geren"></i>
                            {{店铺.popularity}}人
                        </li> -->
                    </ul>
                </li>
            </ul>

            <div class="红包列表">
                <ul v-for="(item, index) in 红包.list" :key="index">
                    <li class="img_box">
                        <hongbao v-if="item.type!=3" :money="item.amount" />
                        <div class="qianDaoHongBao" v-if="item.type==3">
                            <img src="image/redpackage.png" alt="">
                            <div>
                                <div>{{item.startAmount}}</div>
                                <div>+</div>
                                <div>{{item.progressivelyAmount}}</div>
                            </div>
                        </div>
                    </li>
                    <li class="text_box">
                        <div class="红包名">
                            <!-- /0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                            <span v-if="item.type==0">店铺新人红包</span>
                            <span v-if="item.type==1">{{item.commodityName}} 红包</span>
                            <span v-if="item.type==2">节日红包</span>
                            <span v-if="item.type==3">签到红包</span>
                            <span v-if="item.type==4">庆典红包</span>
                            <span v-if="item.type==5">生日红包</span>
                        </div>
                        <div>
                            <div class="mui-pull-right 有效期" v-if="item.type!=0 && item.type!=5">有效期：{{item.startTime | filter_time}}-{{item.endTime | filter_time}}</div>
                            <div class="剩余" v-if="item.type==1 || item.type==2 || item.type==4">剩余：{{item.quantityMax-item.quantity}}</div>
                        </div>
                        <div class="fenxiang" v-if="item.type!=3" @click="fenxiang(item)">
                            <i class="icon iconfont icon-fenxiang2"></i>
                        </div>
                    </li>
                </ul>
            </div>

            <loading :loadingtype="红包.loading" :end="!红包.loading && 红包.list.length==红包.total && 红包.total!=0" :nodata="!红包.loading && 红包.total==0" />

        </div>

        <hongbaoerwima :RongqiShow="RongqiShow" :new="isnew" :hongbao="this.fenxiang_obj" />

    </div>
</template>

<script>
import loading from "@/components/loading.vue";
import { openloading, dateFtt } from "@/assets/js/currency";
import hongbao from "@/components/hongbao.vue";
import hongbaoerwima from "@/components/myshop/hongbao/hongbaoerwima.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "",
    components: {
        hongbao,
        loading,
        hongbaoerwima
    },
    data() {
        return {
            fenxiang_obj: {},
            isnew: false,
            RongqiShow: false,

            shopid: "",
            店铺: {},
            红包: {
                page_index: 0,
                list: [],
                loading: false,
                total: 0,
                query: {
                    start: 0,
                    length: 10,
                    shopid: "",
                    ccc: 1
                }
            },
            距离: ""
        };
    },
    computed: {
        ...mapGetters({
            当前位置: '当前位置'
        })
    },
    filters: {
        filter_time(time) {
            if (!time) return "";
            return dateFtt(time, "yyyy.MM.dd");
        },
        filter_juli(data) {
            return data.replace("米", "m").replace("公里", "km");
        }
    },
    methods: {
        ...mapActions({
            获取位置:'获取位置/获取位置'
        }),
        async 获取店铺() {
            return new Promise((resolve, reject) => {
                this.$axios.get("/api-s/shops/findByShopid/" + this.shopid).then(x => {
                    if (x.data.code == 200) {
                        this.店铺 = x.data.data;
                    } else {
                        mui.alert(x.data.error_description ? x.data.error_description : x.data.message, "提示", "我知道了", function () { }, "div");
                    }
                    resolve();
                }).catch(err => {
                    mui.toast("网络错误稍后再试", { duration: "long", type: "div" });
                    reject();
                });
            });
        },
        async 初始化() {
            await this.获取店铺();
            if(!this.当前位置 || this.当前位置.x=='' || this.当前位置.y==''){
                await this.获取位置()
            } 
            this.获取距离();
        },
        获取有效红包() {
            // api-s/shops/redenvelope/findAll?start=0&length=10&shopid=D5995964EE8D9AA3B630CAE96679253F&ccc=1;
            this.红包.query.shopid = this.shopid;
            this.红包.query.start = this.红包.page_index * this.红包.query.length;
            this.红包.loading = true;
            this.$axios.get("/api-s/shops/redenvelope/findAll", { params: this.红包.query }).then(x => {
                console.log(x);
                if (x.data.code == 200) {
                    this.红包.list = this.红包.list.concat(x.data.data.data);
                    this.红包.total = x.data.data.total;
                }
                this.红包.loading = false;
            }).catch(err => {
                this.红包.loading = false;
                console.log(err);
            });
        },
        获取距离() {
            if (!this.$store.state.my_position.y || !this.店铺.x) {
                return;
            }
            var obj = {
                destinations: this.$store.state.my_position.y + "," + this.$store.state.my_position.x, //起点
                origins: this.店铺.y + "," + this.店铺.x
            };
            this.$axios({
                method: "get",
                url: "/api-u/baidu/routematrix",
                params: obj
            }).then(x => {
                if (x.data.status == 0 && x.data.result.length > 0) {
                    this.距离 = x.data.result[0].distance.text;
                }
            }).catch(err => {
                console.log(err);
            });
        },
        //分享
        fenxiang(x) {
            this.isnew = this.fenxiang_obj != x;
            this.fenxiang_obj = x;
            this.RongqiShow = !this.RongqiShow;
        },
        scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10 && !this.红包.loading && this.红包.list.length < this.红包.total) {
                this.红包.page_index++;
                this.获取有效红包();
            }
        }
    },
    mounted() {
        var this_1 = this;
        this.shopid = this.$route.query.shopid;
        // this.shopid='D5995964EE8D9AA3B630CAE96679253F';
        this.获取有效红包();
        this.初始化()
    }
};
</script>

<style lang="scss" scoped>
.店铺信息 {
    padding: 8px;
    background: #ffffff;
    display: flex;
    .店铺logo {
        width: 100px;
        height: 75px;
        margin: 0px 8px 0px 0px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .内容区 {
        width: 0px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .店铺名 {
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .地址 {
            color: rgba(166, 166, 166, 1);
            font-size: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .业务 {
            color: rgba(80, 80, 80, 1);
            font-size: 10px;
        }
        .综合 {
            font-size: 10px;
            display: flex;
            li {
                margin: 0px 26px 0px 0px;
            }
            .星星 {
                color: #d43030;
                i {
                    color: #fcd40c;
                }
            }
            .佣金 {
                color: #d43030;
                i {
                    color: #e01c04;
                }
            }
            .距离 {
                color: #a6a6a6;
            }
            .人数 {
                text-align: right;
                margin: 0px;
                flex-grow: 1;
                color: #a6a6a6;
                i {
                    color: #1894dc;
                }
            }
        }
    }
}

.红包列表 {
    margin: 3px 0px 0px;
    > ul {
        display: flex;
        padding: 6px 8px;
        background: #ffffff;
        border-bottom: 1px solid #f6f6f6;
        .img_box {
            flex-shrink: 0;
            width: 53px;
            height: 63px;
            position: relative;
            margin: 0px 3px 0px 0px;
            img {
                width: 100%;
            }
            .qianDaoHongBao {
                height: 100%;
                position: relative;
                > div {
                    width: 100%;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    color: #ffffff;
                    font-size: 12px;
                    line-height: 12px;
                    padding: 22px 0px 0px;
                    text-align: center;
                }
            }
        }
        .text_box {
            position: relative;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .xiangqing {
                color: rgba(0, 122, 255, 1);
                font-size: 12px;
            }
            .红包名 {
                color: rgba(80, 80, 80, 1);
                font-size: 14px;
            }
            .有效期 {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
            }
            .剩余 {
                color: rgba(80, 80, 80, 1);
                font-size: 12px;
            }
            .fenxiang {
                position: absolute;
                top: 0px;
                right: 0px;
                font-size: 16px;
                color: #000000;
            }
        }
    }
}
</style>
