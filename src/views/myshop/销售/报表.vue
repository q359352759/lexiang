<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">报表</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <ul class="box_1">
                <li @click="select_type(0)" :class="{'active':type_1==0}">日报</li>
                <li @click="select_type(1)" :class="{'active':type_1==1}">月报</li>
                <li @click="select_type(2)" :class="{'active':type_1==2}">年报</li>
            </ul>
            <ul class="时间 mui-text-center" v-show="type_1!=2">
                <li v-show="type_1==0"><span @click="选择年月()">{{月份.startDay | filter_year}}</span></li>
                <li v-show="type_1==1"><span @click="选择年()">{{年}}年</span></li>
            </ul>
            <ve-line :xAxis="option.xAxis" :yAxis="option.yAxis" :dataZoom="option.dataZoom" :series="option.series" />
            <!-- <ve-chart /> -->
            <div class="单位">单位：元</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
    getCurrentMonthFirst,
    getCurrentMonthLast,
    getCountDays
} from "@/assets/js/time.js";
import { dateFtt, getDateStr, openloading } from "@/assets/js/currency.js";

export default {
    name: "",
    components: {},
    data() {
        return {
            //========================
            type_1: 0,

            canvasId: "myCanvas",
            type: "bar",
            data: [
                { name: "2014", value: 1342 },
                { name: "2015", value: 2123 },
                { name: "2016", value: 1654 },
                { name: "2017", value: 1795 }
            ],
            option: {},
            日报: [],
            月报: [],
            年报: [],
            月份: {
                startDay: "",
                endDay: ""
            },
            年: "",
            最大值: 0,
            当前时间: getDateStr(0)
        };
    },
    filters: {
        filter_year(time) {
            if (!time) return time;
            return time.substring(0, 4) + "年" + time.substring(5, 7) + "月";
        }
    },
    computed: {
        ...mapGetters({
            myshop: "get_myshop"
        })
    },
    methods: {
        ...mapActions({
            获取店铺: "getMyshop"
        }),
        select_type(x) {
            this.type_1 = x;
            // var date = [];
            // var data=[];
            // for (var i = 1; i < 30; i++) {
            //     date.push(i+'日');
            //     data.push(Math.floor(Math.random()*(1 - 10000) + 10000))
            // }
            if (x == 0) {
                var list = Array.from(this.日报);
                list.sort(function (num1, num2) {
                    return num1.final - num2.final;
                });
                this.最大值 =
                    list.length > 0 ? Math.ceil(list[list.length - 1].final) : 0;
                var date = [];
                var data = [];
                this.日报.forEach(item => {
                    date.push(item.day + "日");
                    data.push(item.final);
                });
                // var dataZoom_end=this.日报.length/31*100;
                var dataZoom_end = 100 / (this.日报.length / 6);
            } else if (x == 1) {
                var list = Array.from(this.月报);
                list.sort(function (num1, num2) {
                    return num1.final - num2.final;
                });
                this.最大值 =
                    list.length > 0 ? Math.ceil(list[list.length - 1].final) : 0;
                var date = [];
                var data = [];
                this.月报.forEach(item => {
                    date.push(item.month + "月");
                    data.push(item.final);
                });
                var dataZoom_end = 100 / (this.月报.length / 6);
            } else {
                var list = Array.from(this.年报);
                list.sort(function (num1, num2) {
                    return num1.final - num2.final;
                });
                this.最大值 = Math.ceil(list[list.length - 1].final);
                var date = [];
                var data = [];
                this.年报.forEach(item => {
                    date.push(item.year + "年");
                    data.push(item.final);
                });
                var dataZoom_end = 100 / (this.年报.length / 6);
            }
            //====================

            var option = {
                xAxis: {
                    data: date //轴的数据
                    // minInterval:10,
                    // maxInterval:15
                    // splitNumber:5
                },
                yAxis: {
                    type: "value",
                    // scale: true,
                    max: this.最大值,
                    min: 0
                    // boundaryGap: [0.4, 0.4],
                    // boundaryGap: [0, '10%']
                },
                dataZoom: [
                    {
                        type: "inside",
                        start: 0,
                        end: dataZoom_end
                    }
                ],
                series: [
                    {
                        coordinateSystem: "cartesian2d",
                        symbolSize: 10, //标记的大小
                        name: "元",
                        type: "line",
                        symbol: "circle", //默认 emptyCircle  'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                        itemStyle: {
                            color: "#2a82e4"
                        },
                        data: data,
                        smooth: false,
                        symbolKeepAspect: true
                        // barCateGoryGap:20, //关键第二句：值或为百分比 ‘60%’ ，如果同一类目下的柱间距：barGap:20
                    }
                ]
            };
            console.log(option);
            this.option = option;
        },
        async 初始化() {
            if (!this.myshop || !this.myshop.shopid) {
                await this.获取店铺;
            }
            this.查询某月的每天营业额();
            this.查询某年每月();
            this.查询某年的总营业额();
        },
        查询某月的每天营业额() {
            var this_1 = this;
            this.日报 = [];
            var 本月天数 = getCountDays(this.月份.startDay);
            var date = new Date(this.月份.startDay);
            // var 本月天数=date.getDate();
            console.log("本月天数", 本月天数);
            for (let i = 1; i <= 本月天数; i++) {
                if (i < 10) {
                    var dayTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-0" + i;
                } else {
                    var dayTime = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + i;
                }
                if (dayTime <= this_1.当前时间) {
                    this_1.日报.push({ final: 0, dayTime: dayTime, day: i });
                }
            }
            this.$axios.get("/api-s/shops/orders/sumThisMonthAllDay?shopid=" + this.myshop.shopid + "&startDay=" + this.月份.startDay + "&endDay=" + this.月份.endDay).then(x => {
                console.log("日报", x);
                if (x.data.code == 200) {
                    var data = x.data.data;
                    this.日报.forEach(item => {
                        var obj = data.find(x => x.dayTime == item.dayTime);
                        if (obj) {
                            item.final = obj.final;
                        }
                    });
                } else {
                    mui.alert(x.data.msg ? "获取日报失败。" + x.data.msg : "获取日报失败。" + x.data.message, "提示", "我知道了", function () { }, "div");
                }
                this.select_type(0);
            }).catch(err => {
                console.log(err);
                mui.toast("系统错误，稍后再试。", { duration: "long", type: "div" });
            });
        },
        查询某年每月() {
            var this_1 = this;
            this.月报 = [];
            for (let i = 1; i <= 12; i++) {
                var newdate = this_1.年 + "-" + (i < 10 ? "0" + i : i);
                console.log(newdate, newdate <= this_1.当前时间);
                if (newdate <= this_1.当前时间) {
                    this.月报.push({ month: i, final: 0 });
                }
            }
            return new Promise((resolve, reject) => {
                this.$axios.get("/api-s/shops/orders/sumTurnoverThisYears?shopid=" + this.myshop.shopid + "&years=" + this.年).then(x => {
                    console.log("月报", x);
                    if (x.data.code == 200) {
                        var data = x.data.data;
                        this.月报.forEach(item => {
                            var obj = data.find(x => x.month == item.month);
                            if (obj) {
                                item.final = obj.final;
                            }
                        });
                    } else {
                        mui.alert(x.data.msg ? "获取月报失败。" + x.data.msg : "获取月报失败。" + x.data.message, "提示", "我知道了", function () { }, "div");
                    }
                    resolve();
                }).catch(err => {
                    mui.toast("系统错误，稍后再试。", { duration: "long", type: "div" });
                    console.log(err);
                    resolve();
                });
            });
        },
        查询某年的总营业额() {
            this.年报.forEach(item => {
                this.$axios.get("/api-s/shops/orders/sumSomeYearTurnover?shopid=" + this.myshop.shopid + "&years=" + item.year).then(x => {
                    console.log("年报", x);
                    if (x.data.code == 200) {
                        item.final = x.data.data;
                    }
                }).catch(err => { });
            });
        },
        选择年月() {
            var picker = new mui.DtPicker({ type: "month" });
            picker.show(rs => {
                console.log(rs);
                if (rs.value > this.当前时间) {
                    mui.toast("时间选择有误。", { duration: "long", type: "div" });
                } else {
                    this.月份.startDay = rs.value + "-01";
                    this.月份.endDay = getCurrentMonthLast(rs.value);
                    this.查询某月的每天营业额();
                    picker.dispose();
                    picker = null;
                }
            });
        },
        选择年() {
            var list = [];
            for (var i = 2018; i < 2028; i++) {
                list.push({ value: i, text: i });
            }
            var date = new Date();
            var userPicker = new mui.PopPicker();
            userPicker.setData(list);
            userPicker.pickers[0].setSelectedIndex(1);
            userPicker.show(rs => {
                if (rs[0].value > date.getFullYear()) {
                    mui.toast("时间选择有误。", { duration: "long", type: "div" });
                } else {
                    this.年 = rs[0].value;
                    openloading(true);
                    this.查询某年每月().then(x => {
                        this.select_type(1);
                        openloading(false);
                    });
                    userPicker.dispose();
                    userPicker.picker = null;
                }
            });
        }
    },
    mounted() {
        var this_1 = this;
        var newYear = new Date().getFullYear();
        for (let i = 2018; i <= newYear; i++) {
            this_1.年报.push({ year: i, final: 0 });
        }
        var date = new Date();
        this.月份.startDay = getCurrentMonthFirst();
        this.月份.endDay = getCurrentMonthLast();
        this.年 = date.getFullYear();
        // console.log('2019-01-04'<'2019-01-05','2019-01-04'>'2019-01-05')
        // console.log('2019-01'<'2019-01-05','2019-02'>'2019-01-05')
        console.log("2020" <= this.当前时间);
        this.初始化();
    }
};
</script>

<style lang="scss" scoped>
.单位 {
    color: rgba(166, 166, 166, 1);
    font-size: 12px;
    text-align: center;
    margin: -35px 0px 0px;
}
.wrapper {
    height: 5rem;
}
.mui-content {
    background: #ffffff;
}
.时间 {
    color: rgba(42, 130, 228, 1);
    font-size: 14px;
    padding: 22px 0px 0px;
}
.box_1 {
    margin: 12px;
    border: 1px solid #007aff;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    display: flex;
    text-align: center;
    overflow: hidden;
    li {
        width: calc(100% / 3);
        color: rgba(0, 122, 255, 1);
        font-size: 12px;
        border-left: 1px solid #007aff;
    }
    li:nth-child(1) {
        border: none;
    }
    .active {
        color: #ffffff;
        background: #007aff;
    }
}
</style>
