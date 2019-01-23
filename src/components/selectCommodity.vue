<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">选择商品</h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <ul class="box_1">
                <li v-for="(x, index) in commodity_list" :key="index">
                    <div class="img_box">
                        <img v-if="x.img.split(',').length>0" :src="x.img.split(',')[0]" alt="" srcset="">
                    </div>
                    <div class="text">
                        <div class="title_1">{{x.name}}</div>
                        <div class="money">售价：{{x.sellingPrice}}元</div>
                        <div class="footer_1">
                            <span class="mui-pull-right">累计销售：0份</span>
                            <span>可抵扣{{x.deduction}}元，佣金{{x.commission ? x.commission : 0}}元</span>
                        </div>
                    </div>
                    <div @tap="select(x)" class="xuanze">
                        <span v-if="leixing==''">选择</span>
                        <span v-if="leixing=='发布商品红包' && !x.EXID">选择</span>
                        <span v-if="leixing=='发布商品红包' && x.EXID">专享商品</span>
                        <span v-if="leixing=='发布专享商品' && !x.EXID">选择</span>
                        <span v-if="leixing=='发布专享商品' && x.EXID">专享商品</span>
                    </div>
                </li>
            </ul>
            <loading :loadingtype="loading" :nodata="!loading && total==0" :end="!loading && total!=0 && total==commodity_list.length" />
        </div>
    </div>
</template>

<script>
import loading from "@/components/loading.vue";
import { openloading } from "@/assets/js/currency";
import { mapGetters ,mapActions } from "vuex";
export default {
    name: "",
    props: {
        leixing: {
            default: "" //发布商品红包 发布专享商品
        }
    },
    components: {
        loading
    },
    data() {
        return {
            get_index: 0,
            query: {
                start: 0,
                length: 10,
                shopid: "",
                state: 1
            },
            page_index: 0,
            commodity_list: [],
            total: 0,
            loading: true,
            商品红包: []
        };
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
        //选择商品
        select(x) {
            if (this.leixing == "") {
                this.$emit("setShow", x);
            } else if (this.leixing == "发布商品红包") {
                if (!x.EXID) {
                    this.$emit("setShow", x);
                } else {
                    mui.toast("专享商品无法设置红包。", {
                        duration: "long",
                        type: "div"
                    });
                }
            } else if (this.leixing == "发布专享商品") {
                if (x.EXID) {
                    mui.toast("该商品已是专享。", { duration: "long", type: "div" });
                } else {
                    if (!this.商品红包) {
                        mui.toast("商品红包查询失败，无法操作，稍后再试。", {
                            duration: "long",
                            type: "div"
                        });
                    } else {
                        var obj = this.商品红包.find(x => x.commodityId == x.id);
                        if (obj) {
                            mui.toast("该商品已发布商品红包，无法设置专享。", {
                                duration: "long",
                                type: "div"
                            });
                        } else {
                            this.$emit("setShow", x);
                        }
                    }
                }
            }
        },
        //滚动条
        scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (
                h + t >= sh - 10 &&
                !this.loading &&
                this.commodity_list.length < this.total
            ) {
                this.page_index++;
                this.get_commodity();
                console.log("到底底部");
            }
        },
        // 根据店铺查询商品
        get_commodity() {
            this.get_index = 1;
            this.query.start = this.page_index * this.query.length;
            this.query.shopid = this.myshop.shopid;
            this.loading = true;
            // openloading(true)
            this.$axios({
                method: "get",
                url: "/api-s/shops/commodity/findAll",
                params: this.query
            })
                .then(x => {
                    console.log("获取商品列表", x);
                    this.loading = false;
                    // openloading(false);
                    if (x.data.code == 200) {
                        this.commodity_list = this.commodity_list.concat(x.data.data.data);
                        this.total = x.data.data.total;
                    }
                })
                .catch(err => {
                    this.loading = false;
                    console.log("获取商品列表失败", err);
                    // openloading(false);
                });
        },
        查询商品红包() {
            openloading(true);
            var obj = {
                shopid: this.myshop.shopid,
                start: 0,
                length: 1000,
                ccc: 1,
                type: 1
            };
            this.$axios
                .get("/api-s/shops/redenvelope/findAll", { params: obj })
                .then(x => {
                    console.log("根据商品查询红包", x);
                    if (x.data.code == 200) {
                        this.商品红包 = x.data.data.data;
                    } else {
                        this.商品红包 = "";
                    }
                    openloading(false);
                })
                .catch(err => {
                    this.商品红包 = "";
                    openloading(false);
                });
        },
        async 初始化(){
            if(!this.myshop || this.myshop.shopid){
                await this.获取店铺()
            }
            this.get_commodity();
            this.查询商品红包();
        }
    },
    mounted: function () {
        this.初始化()

        // console.group('------mounted 挂载结束状态------');
    },
    watch: {
        
    }
};
</script>

<style lang="scss" scoped>
.box_1 {
    > li {
        background: #ffffff;
        display: flex;
        padding: 7px 9px;
        position: relative;
        .img_box {
            flex-shrink: 0;
            width: 83px;
            height: 62px;
            margin: 0px 8px 0px 0px;
            img {
                width: 100%;
            }
        }
        .text {
            flex-grow: 1;
        }
        .title_1 {
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
        }
        .money {
            color: rgba(128, 128, 128, 1);
            font-size: 12px;
            margin: 5px 0px;
        }
        .footer_1 {
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
        }
        .xuanze {
            position: absolute;
            color: rgba(0, 122, 255, 1);
            font-size: 14px;
            top: 7px;
            right: 14px;
        }
    }
}
</style>
