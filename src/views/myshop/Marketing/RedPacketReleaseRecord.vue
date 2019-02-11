<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{type_list[type]}}</h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll()">
            <ul class="box_1">
                <li v-for="(item, index) in list" :key="index">
                    <div class="img_box">
                        <img src="image/redpackage.png" alt="">
                        <span>{{item.amount}}</span>
                    </div>
                    <div class="text">
                        <div>
                            数量：
                            <span v-if="item.type==2 || item.type==4 || item.type==1">{{item.quantity}}个</span>
                            <span v-if="item.type!=1 && item.type!=2 && item.type!=4">无限制</span>
                        </div>
                        <div>已领取：0个</div>
                        <div>已使用：0个</div>
                        <div>
                            <!-- 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                            <span v-if="item.type==0 || item.type==5">有效期：长期有效</span>
                            <span v-if="item.type!=0 && item.type!=5">有效期：{{item.startTime | time_fliter}}-{{item.endTime | time_fliter}}</span>

                            <span @tap="more(item)" class="mui-pull-right xiangqing">查看详情</span>
                        </div>
                    </div>
                    <i class="icon iconfont icon-fenxiang2 fenxiang2"></i>
                </li>
            </ul>

            <loading v-if="type==1" :loadingtype="loading" :nodata="!loading && total==0" :end="!loading && total!=0 && total==list.length" />

        </div>

        <div class="btn_1" v-if="type==1 || (type!=1 && total==0)" @tap="RedEnvelopeIssue()">发红包</div>
    </div>
</template>

<script>
import { dateFtt } from "@/assets/js/currency";
import loading from "@/components/loading.vue";
import { mapGetters,mapActions } from "vuex";
export default {
    name: "",
    components: {
        loading
    },
    data() {
        return {
            get_index: 0,
            type: 0, //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包
            type_list: [
                "新人店铺红包",
                "商品红包",
                "节日红包",
                "签到红包",
                "庆典红包",
                "生日红包"
            ],
            query: {
                start: 0,
                length: 10,
                shopid: "",
                type: 0,
                ccc: 1
            },
            loading: true,
            page_index: 0,
            list: [],
            total: 0
        };
    },
    filters: {
        time_fliter(time) {
            return dateFtt(time, "yyyy.MM.dd");
        }
    },
    computed: {
        ...mapGetters({
            myshop:'get_myshop'
        }),
    },
    methods: {
        ...mapActions({
            获取店铺:'getMyshop'
        }),
        //滚动条事件
        scroll() {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(e)
            if (
                h + t >= sh - 10 &&
                !this.type == 5 &&
                this.list.length < this.total
            ) {
                console.log("到底底部");
                this.page_index++;
                this.get_redenvelope();
            }
        },
        //查看详情
        more(x) {
            console.log(x);
            // this.$router.push('/RedEnvelopeIssue?type='+this.type+'&id='+x.id);
            this.$router.push("/redPacketsDetails?type=" + this.type + "&id=" + x.id);
            // redPacketsDetails
        },
        //跳转发布红包
        RedEnvelopeIssue() {
            this.$router.push("/RedEnvelopeIssue?type=" + this.type);
        },
        //查询红包
        get_redenvelope() {
            this.loading = true;
            this.get_index = 1;
            this.query.shopid = this.myshop.shopid;
            this.query.type = this.type;
            this.query.start = this.page_index * this.query.length;
            this.$axios({
                method: "get",
                url: "/api-s/shops/redenvelope/findAll",
                params: this.query
            })
                .then(x => {
                    console.log("查询红包", x);
                    this.list = x.data.data.data;
                    this.total = x.data.data.total;
                    this.loading = false;
                })
                .catch(err => {
                    console.log("查询红包错误", err);
                    this.loading = false;
                });
        },
        async 初始化(){
            if(!this.myshop || !this.myshop.shopid){
                await this.获取店铺()
            }
            this.get_redenvelope();
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
        var query = this.$route.query;
        this.type = query.type;
        this.初始化();

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
    },
    watch: {
       
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1 {
    > li {
        background: #ffffff;
        border-bottom: 1px solid #f6f6f6;
        display: flex;
        position: relative;
        padding: 6px;
        .fenxiang2 {
            position: absolute;
            right: 11px;
            top: 8px;
        }
        .img_box {
            width: 53px;
            flex-shrink: 0;
            margin: 0px 5px 0px 0px;
            position: relative;
            img {
                width: 100%;
            }
            span {
                position: absolute;
                width: 100%;
                left: 0px;
                top: 30px;
                text-align: center;
                color: #ffffff;
            }
        }
        .text {
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
            flex-grow: 1;
            .xiangqing {
                color: rgba(0, 122, 255, 1);
                font-size: 12px;
            }
        }
    }
}

.btn_1 {
    width: 100%;
    height: 40px;
    background: $header_background;
    position: fixed;
    left: 0px;
    bottom: 0px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #ffffff;
}
</style>
