<template>
    <div id="myshop">
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @tap="返回上一页()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{myshop.name}}</h1>
            <span class="erweima mui-pull-right " @tap="qrcode_1()"><i class="icon iconfont icon-31erweima"></i></span>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li @tap="ShopDetails()">
                    <img :src="myshop.signboard" alt="" srcset="">
                    <div>编辑店铺</div>
                </li>
                <li>
                    <h1>{{myshop.address}}</h1>
                    <h2>营业时间：{{myshop.openTime}}--{{myshop.closeTime}}</h2>
                    <h3>联系电话：{{myshop.phone}}</h3>
                </li>
                <li>
                    <i v-if="myshop.referrerPhone" @click="set_referrer_show(true)" class="icon iconfont icon-kefunv"></i>
                </li>
            </ul>

            <ul class="box_2">
                <li>
                    <div @click="$router.push('/myshop/Member/MemberList')"><i class="icon iconfont icon-huiyuan1"></i></div>
                    <div>会员</div>
                </li>
                <li>
                    <div @click="$router.push('/commodity')"><i class="icon iconfont icon-shangping"></i></div>
                    <div>商品</div>
                </li>
                <li>
                    <div @click="跳转分销()"><i class="icon iconfont icon-distribute"></i></div>
                    <div>分销</div>
                </li>
                <li>
                    <div @click="$router.push('/myshop/xiaoshou/xiaoshou')"><i class="icon iconfont icon-leijixiaoshoue"></i></div>
                    <div>销售</div>
                </li>
                <li>
                    <div @click="$router.push('/Marketing')"><i class="icon iconfont icon-laba2"></i></div>
                    <div>营销</div>
                </li>
            </ul>
            <ul class="box_2">
                <li>
                    <div @click="$router.push('/Notice')"><i class="icon iconfont icon-laba"></i></div>
                    <div>公告</div>
                </li>
                <li>
                    <div @click="$router.push('/introduction')"><i class="icon iconfont icon-jianjie"></i></div>
                    <div>简介</div>
                </li>
                <li>
                    <div @tap="$router.push('/albumManagement')"><i class="icon iconfont icon-xiangce"></i></div>
                    <div>相册</div>
                </li>
                <li>
                    <div @click="$router.push('/myshop/comment/commentList')"><i class="icon iconfont icon-pinglun"></i></div>
                    <div>评论</div>
                </li>
                <li v-if="店铺身份==1">
                    <div @click="$router.push('/myshop/dianyuan/guanli')"><i class="icon iconfont icon-icon_dianyuanguanli"></i></div>
                    <div>店员</div>
                </li>
                <li v-if="店铺身份==2">
                    <div @click="设置打卡框(true)"><i class="icon iconfont icon-qiandao-xianxing"></i></div>
                    <div>打卡</div>
                </li>
            </ul>

            <div class="box_3">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right" @click="$router.push('/myshop/Member/MemberList')">
                            <div class="cont_1">
                                <div class="mui-pull-right">
                                    共计：{{顾客.total}}人
                                </div>
                                <div>今日新增会员：{{今日新增}}人</div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div class="mui-pull-right">
                                    共计：0人
                                </div>
                                <div>
                                    待审核分销员：0人
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right" @click="$router.push('/myshop/xiaoshou/xiaoshou')">
                            <div class="cont_1">
                                <div class="mui-pull-right">
                                    本月：{{本月销售.data}}元
                                </div>
                                <div>
                                    今日营业额：{{今日销售.data ? 今日销售.data : 0}}元
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell" @click="跳转提现()">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div class="mui-pull-right tixian">
                                    提现
                                </div>
                                <div>
                                    可提现金额：{{ketixian}}元
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div>
                                    本月群发：0条
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right" @click="进入店铺()">
                            <div class="cont_1">
                                <div>
                                    店铺预览
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- 生成带图片的容器 -->
            <div ref="printMe" class="qrcode_box">
                <div class="header_1">
                    <div class="img_box">
                        <img v-if="erweima_base64" :src="erweima_base64" alt="" srcset="">
                    </div>
                    <div class="text_1" ref="zoom_box">
                        <div ref="fontsize_1">{{myshop.name}}</div>
                        <div ref="fontsize_2">{{myshop.address}}</div>
                    </div>
                </div>
                <div class="erweima">
                    <img v-if="erweima_base64" :src="erweima_base64" alt="">
                    <div ref="qrcode">
                        <!-- <img src="" alt="" srcset=""> -->
                    </div>
                </div>
                <ul class="footer_1">
                    <li>恭候尊驾，这厢有礼！</li>
                    <li>识别二维码领取<span class="hongbao">{{xingren_hongbao.amount}}</span>红包</li>
                </ul>
            </div>

            <div class="QRCode" v-show="qrcode_show">
                <div class="mask"></div>
                <div class="content_1">
                    <div class="close_1">
                        <div @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                        <div></div>
                    </div>
                    <img :src="qrcode" @click="开始按下()" >
                    <div class="二维码提示"  @click="开始按下()">
                        {{ApplicationType=='app' ? '点击分享' :'长按二维码，点击“发送给朋友”'}}
                    </div>
                </div>
            </div>

        </div>

        <tuijianren v-if="myshop.referrerPhone" v-show="referrer_show" />
        <daka v-show="显示打卡框" />
    </div>
</template>

<script>
// html2canvas
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
import { openloading, getDateStr } from "@/assets/js/currency.js";
import { getCurrentMonthFirst, getCurrentMonthLast } from "@/assets/js/time.js";
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";

import tuijianren from "@/components/myshop/tuijianren.vue";
import btn from "@/components/button.vue";
import daka from "./打卡/打卡弹出框.vue";

export default {
    name: "",
    components: {
        tuijianren,
        btn,
        daka
    },
    data() {
        return {
            ApplicationType:ApplicationType,
            qrcode: null,
            qrcode_show: false,
            erweima_base64: "",
            xingren_hongbao: {},
            今日新增: 0,
            顾客: {
                //主要用于统计人数
                query: {
                    start: 0,
                    length: 1,
                    shopid: "",
                    order: "createTime", //PAYMENTAMOUNT 消费 createTime 时间
                    orderType: "DESC" //ASC DESC
                },
                list: [],
                total: 0,
                loading: false,
                paget_index: 0
            },
            定时器:""
        };
    },
    computed: {
        // myshop(){
        //     return this.$store.state.myshop
        // },
        ...mapGetters({
            myshop: "get_myshop",
            zichan: "myshops/zichan/g_zichan",
            referrer_show: "myshops/referrer_show",
            referrer: "myshops/referrer",
            今日销售: "myshops/销售/今日销售",
            本月销售: "myshops/销售/本月销售",
            店铺身份: "myshops/身份",
            显示打卡框: "myshops/显示打卡框",
            获取招募信息:"myshops/分销/获取招募信息",
        }),
        ketixian() {
            if (this.zichan && this.zichan.balance) {
                return Math.floor(this.zichan.balance * 100) / 100;
            } else {
                return 0;
            }
        }
    },
    methods: {
        ...mapActions({
            getMyshop: "getMyshop",
            设置推荐人: "myshops/设置推荐人",
            set_zichan_shopid: "myshops/zichan/set_shopid",
            findshopTurnoverByShopid: "myshops/zichan/findshopTurnoverByShopid",
            set_referrer_show: "myshops/set_referrer_show", //推荐人显示框
            查询销售统计: "myshops/销售/查询销售统计",
            get_agentUser_phone: "agent/get_agentUser_phone",
            查询所有店员: "myshops/店员/查询所有店员",
            设置打卡框: "myshops/设置打卡框",

            查询班次: "myshops/班次/查询班次",
            考勤时间初始化: "myshops/班次/考勤时间初始化",
            查询考勤时间: "myshops/班次/查询考勤时间",
            查询自己的打卡记录: "myshops/打卡/查询自己的打卡记录",
            分享图片: 'app/分享/分享图片',
            查询店铺招募信息:'myshops/分销/查询店铺招募信息',
        }),
        返回上一页(){
            var back=this.$route.query.back;
            if(back){
                history.back();
            }else{
                this.$router.push('/my')
            }
        },
        开始按下() {
            if(ApplicationType=='app'){
                this.分享图片(this.qrcode)
            }
        },

        跳转提现() {
            this.$router.push("/myshop/WithdrawMoney");
        },
        获取今日新增会员() {
            this.$axios.get("/api-s/shops/countTodayshopCustomer/" + this.myshop.shopid).then(x => {
                console.log("获取今日新增", x);
                if (x.data.code == 200) {
                    this.今日新增 = x.data.data;
                }
            }).catch(err => { });
        },
        获取顾客() {
            this.顾客.query.start = this.顾客.query.length * this.顾客.paget_index;
            this.顾客.query.shopid = this.myshop.shopid;
            this.$axios.get("/api-s/shops/findShopCustomerAll", { params: this.顾客.query }).then(x => {
                console.log("获取店铺顾客", x);
                if (x.data.code == 200) {
                    this.顾客.list = this.顾客.list.concat(x.data.data.data);
                    this.顾客.total = x.data.data.total;
                }
            }).catch(err => { });
        },
        进入店铺() {
            sessionStorage.removeItem("backUrl");
            this.$router.push("/BusinessDetails?shopid=" + this.myshop.shopid);
        },
        close_1() {
            this.qrcode_show = false;
        },
        //动态设置字体大小
        set_font_size(e, size) {
            // console.log(e.clientWidth);
            // console.log(e.offsetWidth)
            // console.log(e.scrollWidth)
            if (e.clientWidth < e.scrollWidth) {
                e.style["font-size"] =
                    parseInt((e.clientWidth / e.scrollWidth) * size) + "px";
            }
        },
        set_zoom(e) {
            console.log(e.children);
            var w = e.offsetWidth;
            var max_w = 0;
            var list = e.children;
            for (var i = 0; i < list.length; i++) {
                if (list[i].offsetWidth > max_w) {
                    max_w = list[i].offsetWidth;
                }
            }
            console.log(w, max_w);
            if (w < max_w) {
                for (var i = 0; i < list.length; i++) {
                    list[i].style.zoom = w / max_w;
                }
            }
        },
        //生成二维码
        qrcode_1() {
            console.log("生成二维码");
            if (this.qrcode) {
                this.qrcode_show = true;
            } else {
                // this.set_zoom(this.$refs.zoom_box)
                // return
                this.set_font_size(this.$refs.fontsize_1, 14);
                this.set_font_size(this.$refs.fontsize_2, 12);
                // return;
                openloading(true);
                //图片地址转图片
                this.$axios({
                    method: "post",
                    url: "/api-u/users/imgtobase64",
                    data: this.$qs.stringify({
                        url: this.myshop.signboard
                    })
                }).then(x => {
                    console.log(x);
                    if (x.data.code == 200) {
                        this.erweima_base64 = "data:image/jpeg;base64," + x.data.data;
                        var url = 'http://m.lxad.vip/test/dist/index.html' + "#/BusinessDetails?shopid=" + this.myshop.shopid + "&fenxiang=1";
                        var el = this.$refs.qrcode;
                        el.innerHTML = "";
                        let qrcode = new QRCode(el, {
                            width: 200,
                            height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                            // text: 'http://m.lxad.vip/test/dist/index.html#/BusinessDetails?id='+this.myshop.id, // 二维码内容
                            text: url, // 二维码内容
                            // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                            background: "#fff",
                            foreground: "#fff"
                        });
                        setTimeout(() => {
                            this.print();
                        }, 500);
                    } else {
                        openloading(false);
                        mui.toast("生成二维码失败，稍后再试。", {
                            duration: "long",
                            type: "div"
                        });
                    }
                }).catch(err => {
                    openloading(false);
                    mui.toast("生成二维码失败，稍后再试。", {
                        duration: "long",
                        type: "div"
                    });
                    console.log(err);
                });
            }
        },
        //生成带图片的二维码
        print() {
            const el = this.$refs.printMe;
            const options = {
                useCORS: true,
                logging: false
            };
            html2canvas(el, options).then(
                canvas => {
                    this.qrcode = canvas.toDataURL();
                    this.qrcode_show = true;
                    openloading(false);
                },
                { useCORS: true }
            );
        },
        //跳转店铺详情
        ShopDetails() {
            this.$store.state.in_index = 0;
            this.$router.push("/ShopDetails");
        },
        //查询店铺新人
        get_hongbao() {
            var query = {
                start: 0,
                length: 10,
                ccc: 1,
                type: 0,
                shopid: this.myshop.shopid
            };
            this.$request("/api-s/shops/redenvelope/findAll", query, "get").then(x => {
                console.log("查询店铺新人红包", x);
                if (x.data.code == 200) {
                    if (x.data.data.data.length > 0) {
                        this.xingren_hongbao = x.data.data.data[0];
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        },
        弹出打卡框() {
            alert("点击了打卡");
        },
        跳转分销(){
            if(this.获取招募信息==0){
                this.$router.push('/myshop/fenxiao/shenqingJieshao')
            }else if(this.获取招募信息==1){
                this.$router.push('/myshop/fenxiao/fabuzhaomu')
            }else{
                mui.toast("正在获取招募信息，稍后再试", { duration: "long", type: "div" });
            }
        },
        async shopinit() {
            openloading(true);
            if (!this.myshop || !this.myshop.shopid) {
                await this.getMyshop();
            }

            this.get_hongbao();
            this.set_zichan_shopid(this.myshop.shopid);
            this.findshopTurnoverByShopid().then(x => {
                openloading(false);
            });
            // this.获取营业统计()
            this.查询销售统计(this.myshop.shopid);
            this.获取今日新增会员();
            this.获取顾客();
            this.查询所有店员();
            this.考勤时间初始化();
            this.查询班次();
            this.查询考勤时间();
            this.查询自己的打卡记录();
            this.查询店铺招募信息();
            if (this.myshop.referrerPhone) {
                this.get_agentUser_phone(this.myshop.referrerPhone).then(x => {
                    if (x.data.code == 200) {
                        this.设置推荐人(x.data.data);
                    }
                }).catch(err => { });
            }
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
        // var a=[];
        //     a[0]='ssssssss';
        //     console.log(typeof a[0])
        this.shopinit();
    },
    activated() {
        this.getType = 0;
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
        // document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {}
};
</script>

<style lang="scss">
#myshop .qrcode_box {
    width: 273px;
    background: #ffffff;
    position: fixed;
    padding: 20px 25px;
    left: -100%;
    // top: 40px;
    .header_1 {
        display: flex;
        .img_box {
            width: 42px;
            height: 42px;
            flex-shrink: 0;
            margin: 0px 5px 0px 0px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .text_1 {
            height: 42px;
            width: 0;
            flex-grow: 1;
            color: rgba(80, 80, 80, 1);
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            > div:nth-child(1) {
                font-size: 14px;
                overflow: auto;
                white-space: nowrap;
                width: 100%;
            }
            > div:nth-child(2) {
                font-size: 12px;
                white-space: nowrap;
                overflow: auto;
                color: #afafaf;
                width: 100%;
            }
        }
    }
    .erweima {
        margin: 20px auto 8px;
        width: 200px;
        height: 200px;
        position: relative;
        > img {
            position: absolute;
            width: 50px;
            height: 50px;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            margin: auto;
            border-radius: 10px;
        }
        > div {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .footer_1 {
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
        text-align: center;
        .hongbao {
            color: #d43030;
        }
    }
}
</style>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.QRCode {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    .mask {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
    }
    .content_1 {
        > img {
            width: 100%;
        }
        position: relative;
        z-index: 1;
        width: 270px;
        .二维码提示 {
            height: 35px;
            color: rgba(56, 56, 56, 1);
            background-color: rgba(255, 255, 255, 1);
            border-radius: 35px;
            font-size: 14px;
            text-align: center;
            margin: 14px 0px 0px;
            line-height: 35px;
        }
        // padding: 17px 25px 15px 25px;
        .close_1 {
            width: 36px;
            height: 50px;
            position: absolute;
            top: -50px;
            right: 0px;
            > div:nth-child(1) {
                height: 36px;
                text-align: center;
                line-height: 36px;
                background: #ffffff;
                border-radius: 100%;
                position: relative;
                z-index: 1;
            }
            > div:nth-child(2) {
                position: absolute;
                width: 1px;
                height: 100%;
                background: #ffffff;
                top: 0px;
                right: 0px;
                left: 0px;
                margin: 0px auto;
            }
        }
    }
}

.erweima {
    color: #ffffff;
    line-height: 44px;
    font-size: 20px;
}
.box_1 {
    display: flex;
    padding: 0.1rem;
    background: #ffffff;
    margin: 0px 0px 5px;
    li:nth-child(1) {
        width: 0.6rem;
        height: 0.6rem;
        position: relative;
        flex-shrink: 0;
        img {
            width: 100%;
            height: 100%;
        }
        div {
            position: absolute;
            width: 100%;
            background: rgba(153, 153, 153, 0.6);
            color: #ffffff;
            left: 0px;
            bottom: 0px;
            font-size: 0.1rem;
            text-align: center;
        }
    }
    li:nth-child(2) {
        width: 0;
        flex-grow: 1;
        margin: 0px 0.1rem;
        h1 {
            font-weight: 400;
            color: rgba(56, 56, 56, 1);
            font-size: 0.12rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        h2 {
            font-weight: 400;
            color: rgba(56, 56, 56, 1);
            font-size: 0.12rem;
        }
        h3 {
            font-weight: 400;
            color: rgba(56, 56, 56, 1);
            font-size: 0.12rem;
        }
    }
    li:nth-child(3) {
        flex-shrink: 0;
        font-size: 0.3rem;
        color: #1c94d8;
        line-height: 0.6rem;
    }
}
.box_2 {
    display: flex;
    text-align: center;
    background: #ffffff;
    padding: 8px 0px 5px;
    > li {
        width: 20%;
        > div:nth-child(1) {
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 100%;
            color: #ffffff;
            background: $header_background;
            line-height: 0.35rem;
            margin: 0px auto 5px;
        }
        > div:nth-child(2) {
            color: #505050;
            font-size: 0.12rem;
        }
    }
}
.box_3 {
    margin: 5px 0px 0px;
    color: #505050;
    font-size: 0.12rem;
    .cont_1 {
        padding-right: 0.25rem;
    }
    .tixian {
        color: #1c94d8;
    }
}

.进入店铺 {
    margin: 27px 0px;
}
</style>
