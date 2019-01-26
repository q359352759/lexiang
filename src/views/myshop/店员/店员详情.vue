<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{店员信息.clerksname}}</h1>
        </header>

        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <i @click="select_time()" class="icon iconfont icon-calendar"></i>
                <span @click="select_time()">{{时间}}</span>
            </div>
            <div class="内容区" @scroll="scroll($event)">
                <ul class="box_2" v-for="(item, index) in 店员打卡记录.list" :key="index">
                    <li>
                        <b>{{item.officehours | filter_time('dd')}}</b>
                        <span>号</span>
                        <div>{{item.shiftid | filter_班次(固定班次,两班,三班)}}</div>
                    </li>
                    <li>
                        <div>回复：<span class="huifu" @click="$router.push('/myshop/dianyuan/huifuList')">-0</span>条</div>
                        <div>收银：-0笔</div>
                        <div>营业额：{{item.营业额 ? item.营业额 : 0}}元</div>
                    </li>
                    <li>
                        <div>
                            <span>上班：</span>
                            <span v-if="item.officehours">{{item.officehours | filter_time('yyyy.MM.dd hh:mm')}}</span>
                            <span v-else>未打卡</span>
                        </div>
                        <div>
                            <span>下班：</span>
                            <span v-if="item.quittingtime">{{item.quittingtime | filter_time('yyyy.MM.dd hh:mm')}}</span>
                            <span v-else>未打卡</span>
                        </div>
                        <div>
                            <span v-if="!item.replaceid" class="zhengchang">正常</span>
                            <span v-if="item.replaceid && item.replaceid!=店员信息.clerksid" class="tiban">替班：{{item.被替班人员.clerksname}}</span>
                            <span v-if="item.replaceid!=店员信息.clerksid" class="xiangqing mui-pull-right" @click="$router.push('/myshop/dianyuan/dianYuanShouYing?id='+item.id)">详情</span>
                            <span v-if="item.replaceid && item.replaceid==店员信息.clerksid" class="queban">缺班</span>
                        </div>
                    </li>
                </ul>
                <loading v-if="店员打卡记录 && 店员打卡记录.list" :loadingtype="店员打卡记录.loading" :nodata="!店员打卡记录.loading && 店员打卡记录.total==0" :end="!店员打卡记录.loading && 店员打卡记录.total!=0 && 店员打卡记录.list.length>=店员打卡记录.total" />
            </div>

        </div>
        <div class="box_3">
            <div ref="fontSzie">
                0月共计：上班{{店员打卡记录.total}}天，收单：-0单，共计{{总营业额 ? 总营业额 : 0}}元，回复：-0条
            </div>
        </div>
    </div>
</template>
<script>
import {getCurrentMonthFirst,getCurrentMonthLast,getDaysByDateString} from "@/assets/js/time.js";
import { 当前时间格式化 } from "@/assets/js/currency.js";
import { mapGetters, mapActions } from "vuex";
import loading from "@/components/loading.vue";
export default {
    name: "",
    data() {
        return {
            店员信息: {},
            id: "",
            时间: 当前时间格式化("yyyy年MM月"),
            总营业额:0
        };
    },
    components: {
        loading
    },
    filters: {
        filter_time(time, type) {
            try {
                return 当前时间格式化(type, time);
            } catch (error) {
                return time;
            }
        },
        filter_班次(id, list1, list2, list3) {
            var 固定班次_index = list1.findIndex(x => x.id == id);
            if (固定班次_index != -1) {
                return "固定班次";
            }
            var 两班_index = list2.findIndex(x => x.id == id);
            if (两班_index != -1) {
                var type = ["早班", "晚班"];
                return type[两班_index];
            }
            var 三班_index = list3.findIndex(x => x.id == id);
            if (三班_index != -1) {
                var type = ["早班", "中班", "晚班"];
                return type[三班_index];
            }
            return "未知班次";
        }
    },
    computed: {
        ...mapGetters({
            店铺: "get_myshop",
            店员打卡记录: "myshops/打卡/店员打卡记录",
            固定班次: "myshops/班次/固定班次",
            两班: "myshops/班次/两班",
            三班: "myshops/班次/三班",
        })
    },
    methods: {
        ...mapActions({
            查询店铺: "getMyshop",
            根据Id查询店员: "myshops/店员/根据Id查询店员",
            店员打卡记录初始化: "myshops/打卡/店员打卡记录初始化",
            查询打卡记录: "myshops/打卡/查询打卡记录",
            查询记录下一页: "myshops/打卡/查询记录下一页",
            查询考勤时间: "myshops/班次/查询考勤时间",
            查询统计:'myshops/销售/查询统计'
        }),
        scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10 && !this.店员打卡记录.loading && this.店员打卡记录.list.length < this.店员打卡记录.total) {
                this.查询记录下一页();
            }
        },
        //设置zoom 设置字体大小
        set_zoom() {
            var div = this.$refs.fontSzie;
            div.style.zoom = div.clientWidth > div.parentElement.clientWidth ? div.parentElement.clientWidth / div.clientWidth : 1;
        },
        //选择时间
        select_time() {
            var picker = new mui.DtPicker({
                type: "month",
                CustomFormat: "yyyy/MM/dd HH:mm:ss"
            });
            picker.show(rs => {
                console.log(rs);
                this.时间 = 当前时间格式化("yyyy年MM月", rs.value);
                this.店员打卡记录初始化([
                    this.店员信息.clerksid,
                    rs.value + "-01",
                    rs.value + "-31"
                ]);
                this.查询打卡记录();
                picker.dispose();
                picker = null;
            });
        },
        //回复详情
        huifuxiangqing() { },
        async 初始化() {
            await this.根据Id查询店员(this.id).then(x => {
                if (x.data.code == 200) {
                    console.log("店员详情", x);
                    this.店员信息 = x.data.data;
                }
            });
            if (!this.店铺 || !this.店铺.shopid) {
                await this.查询店铺();
            }
            // this.店员打卡记录初始化([this.店员信息.clerksid,getCurrentMonthFirst() /*当月第一天*/,getCurrentMonthLast()/*当月最后一天*/]);
            this.店员打卡记录初始化([this.店员信息.clerksid]);
            this.查询打卡记录();
            this.查询考勤时间();
            var 查询统计={
                    staffid:this.店员信息.clerksid,
                    shopid:this.店铺.shopid,
                    state:1
                }
            this.查询统计(查询统计).then(x=>{
                console.log('查询统计',x)
                if(x.data.code==200){
                    this.总营业额=x.data.data;
                }
            })
        }
    },
    mounted() {
        this.set_zoom();
        this.id = this.$route.query.id;
        this.初始化();
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
    .内容区 {
        overflow: auto;
        padding: 0px 0px 40px;
    }
}
.box_1 {
    height: 32px;
    line-height: 32px;
    padding: 0px 20px;
    color: rgba(166, 166, 166, 1);
    i {
        height: 17px;
        margin: 0px 3px 0px 0px;
    }
    span {
        font-size: 14px;
    }
}

.box_2 {
    margin: 0px 0px 3px 0px;
    background: #ffffff;
    align-items: flex-end;
    display: flex;
    padding: 8px 10px 8px 0px;
    > li:nth-child(1) {
        width: 80px;
        flex-shrink: 0;
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
        text-align: center;
        b {
            color: rgba(80, 80, 80, 1);
            font-size: 28px;
        }
    }
    > li:nth-child(2) {
        flex-grow: 1;
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
        .huifu {
            color: #007aff;
        }
    }
    > li:nth-child(3) {
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
        .zhengchang {
            color: #00baad;
        }
        .tiban {
            color: #ff8d1a;
        }
        .xiangqing {
            color: #007aff;
        }
        .queban {
            color: #d43030;
        }
    }
}

.box_3 {
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    background: #ffffff;
    color: rgba(80, 80, 80, 1);
    font-size: 12px;
    white-space: nowrap;
    > div {
        padding: 10px 14px;
        width: fit-content;
    }
}
</style>
