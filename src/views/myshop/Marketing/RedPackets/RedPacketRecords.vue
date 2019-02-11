<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红包发放记录</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li @tap="select_type(0)">
                    <div :class="{'active':type==0}">已生效</div>
                </li>
                <li @tap="select_type(1)">
                    <div :class="{'active':type==1}">已失效</div>
                </li>
            </ul>
            <div class="content_1" @scroll="scroll($event)">
                <!-- 生效 -->
                <div class="box_2" v-if="type==0">
                    <ul v-for="(item, index) in shengxiao.list" :key="index">
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
                            <div>
                                <!-- /0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                                <span v-if="item.type==0">店铺新人红包</span>
                                <span v-if="item.type==1">商品红包：{{item.quantityMax}}个</span>
                                <span v-if="item.type==2">节日红包：{{item.quantityMax}}个</span>
                                <span v-if="item.type==3">签到红包</span>
                                <span v-if="item.type==4">庆典红包：{{item.quantityMax}}</span>
                                <span v-if="item.type==5">生日红包</span>
                            </div>
                            <div>
                                <span v-if="item.type!=3">已领取：{{item.quantity}}人</span>
                                <span v-if="item.type==3">已签到：{{item.quantity}}人</span>
                            </div>
                            <div>促销额：0元</div>
                            <div>
                                <span @click="xiangqing(item,true)" class="mui-pull-right xiangqing">查看详情</span>
                                <div v-if="item.type!=0 && item.type!=5">有效期：{{item.startTime | filter_time}}-{{item.endTime | filter_time}}</div>
                                <div v-if="item.type==0">有效期：长期有效</div>
                                <div v-if="item.type==5">有效期：一年</div>
                            </div>
                            <div class="fenxiang" @click="fenxiang(item)" v-if="item.type!=3">
                                <i class="icon iconfont icon-fenxiang2"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <loading v-if="type==0" :loadingtype="shengxiao.loading" :end="!shengxiao.loading && shengxiao.list.length==shengxiao.total && shengxiao.total!=0" :nodata="!shengxiao.loading && shengxiao.total==0" />

                <!-- 失效 -->
                <div class="box_2" v-if="type==1">
                    <ul v-for="(item, index) in shixiao.list" :key="index">
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
                            <div>
                                <!-- /0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                                <span v-if="item.type==0">店铺新人红包</span>
                                <span v-if="item.type==1">商品红包：{{item.quantityMax}}个</span>
                                <span v-if="item.type==2">节日红包：{{item.quantityMax}}个</span>
                                <span v-if="item.type==3">签到红包</span>
                                <span v-if="item.type==4">庆典红包：{{item.quantityMax}}</span>
                                <span v-if="item.type==5">生日红包</span>
                            </div>
                            <div>
                                <span v-if="item.type!=3">已领取：{{item.quantity}}人</span>
                                <span v-if="item.type==3">已签到：{{item.quantity}}人</span>
                            </div>
                            <div>促销额：0元</div>
                            <div>
                                <span @click="xiangqing(item,false)" class="mui-pull-right xiangqing">查看详情</span>
                                <div v-if="item.type!=0 && item.type!=5">有效期：{{item.startTime | filter_time}}-{{item.endTime | filter_time}}</div>
                                <div v-if="item.type==0">有效期：长期有效</div>
                                <div v-if="item.type==5">有效期：一年</div>
                            </div>
                            <!-- <div class="fenxiang">
                                <i class="icon iconfont icon-fenxiang2"></i>
                            </div> -->
                        </li>
                    </ul>
                </div>
                <loading v-if="type==1" :loadingtype="shixiao.loading" :end="!shixiao.loading && shixiao.list.length==shixiao.total && shixiao.total!=0" :nodata="!shixiao.loading && shixiao.total==0" />

            </div>
        </div>

        <hongbaoerwima :RongqiShow="RongqiShow" :new="isnew" :hongbao="this.fenxiang_obj" />
    </div>
</template>

<script>
import { openloading, dateFtt } from "@/assets/js/currency";
import hongbaoerwima from "@/components/myshop/hongbao/hongbaoerwima.vue";

import hongbao from "@/components/hongbao.vue";
import loading from "@/components/loading.vue";
import { mapGetters , mapActions } from "vuex";
export default {
    name: "",
    components: {
        hongbao,
        loading,
        hongbaoerwima
    },
    data() {
        return {
            //生成二维码
            fenxiang_obj: {},
            isnew: false,
            RongqiShow: false,

            get_index: 0,
            type: 0,
            shengxiao: {
                loading: true,
                page_idnex: 0,
                total: 0,
                list: [],
                query: {
                    start: 0,
                    length: 10,
                    ccc: 1,
                    shopid: ""
                }
            },
            shixiao: {
                loading: true,
                page_idnex: 0,
                total: 0,
                list: [],
                query: {
                    start: 0,
                    length: 10,
                    bbb: 1,
                    shopid: ""
                }
            }
        };
    },
    filters: {
        filter_time(time) {
            if (!time) return "";
            return dateFtt(time, "yyyy.MM.dd");
        }
    },
    computed: {
        ...mapGetters({
            myshop:'get_myshop'
        })
    },
    methods: {
        ...mapActions({
            获取店铺:'getMyshop'
        }),
        //分享
        fenxiang(x) {
            this.isnew = this.fenxiang_obj != x;
            this.fenxiang_obj = x;
            this.RongqiShow = !this.RongqiShow;
        },
        //查看详情
        xiangqing(item, type) {
            // redPacketsDetails?type=0&id=22
            if (type) {
                this.$router.push(
                    "/redPacketsDetails?type=" + item.type + "&id=" + item.id
                );
            } else {
                this.$router.push(
                    "/redPacketsDetails?type=" +
                    item.type +
                    "&id=" +
                    item.id +
                    "&shixiao=1"
                );
            }
        },
        //选择类型
        select_type(x) {
            this.type = x;
        },
        // 补贴下拉
        scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(e)
            if (h + t >= sh - 10) {
                console.log("到底底部");
                if (
                    this.type == 0 &&
                    !this.shengxiao.loading &&
                    this.shengxiao.list.length != this.shengxiao.total
                ) {
                    this.shengxiao.page_idnex++;
                    this.get_redenvelope(this.shengxiao);
                } else if (
                    this.type == 1 &&
                    !this.shixiao.loading &&
                    this.shixiao.list.length != this.shixiao.total
                ) {
                    this.shixiao.page_idnex++;
                    this.get_redenvelope(this.shixiao);
                }
            }
        },
        //获取红包
        get_redenvelope(obj) {
            obj.loading = true;
            obj.query.shopid = this.myshop.shopid;
            obj.query.start = obj.page_idnex * obj.query.length;
            this.$axios({
                method: "get",
                url: "/api-s/shops/redenvelope/findAll",
                params: obj.query
            })
                .then(x => {
                    console.log("查询红包", x);
                    if (x.data.code == 200) {
                        obj.total = x.data.data.total;
                        obj.list = obj.list.concat(x.data.data.data);
                    }
                    obj.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    obj.loading = false;
                });
        },
        async 初始化(){
            if(!this.myshop || !this.myshop.shopid){
                await this.获取店铺();
            }
            //查询生效红包
            this.get_redenvelope(this.shengxiao);
            this.get_redenvelope(this.shixiao);
        }
    },
    mounted() {
        this.初始化()
    },
    watch: {
        
    }
};
</script>

<style lang="scss" scoped>
.mui-content {
    display: flex;
    flex-direction: column;
}

.box_1 {
    flex-shrink: 0;
    display: flex;
    background: #ffffff;
    > li {
        position: relative;
        width: 50%;
        line-height: 42px;
        display: flex;
        justify-content: center;
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        > div {
            padding: 0px 4px;
        }
        .active {
            color: #007aff;
            border-bottom: 2px solid #007aff;
        }
    }
    > li:nth-child(1):after {
        position: absolute;
        width: 1px;
        height: 30px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        content: "";
        background-color: rgba(229, 229, 229, 1);
    }
}

.content_1 {
    flex-grow: 1;
    overflow: auto;
}
.box_2 {
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
            color: rgba(80, 80, 80, 1);
            font-size: 10px;
            .xiangqing {
                color: rgba(0, 122, 255, 1);
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
