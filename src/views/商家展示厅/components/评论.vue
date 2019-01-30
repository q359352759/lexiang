<template>
    <div>
        <ul class="总览">
            <li class="左边">
                <div class="标题">好评率</div>
                <div class="百分比">{{好评百分比}}%</div>
                <div class="说明">根据用户评价计算</div>
            </li>
            <li class="右边">
                <div>
                    <div class="文本1">超赞：</div>
                    <div class="进度">
                        <p ref="超赞" class="mui-progressbar 超赞" data-progress="20">
                            <span :style="{'transform':'translate3d('+(超赞-100)+'%, 0px, 0px)'}"></span>
                        </p>
                    </div>
                    <div class="数量">{{fenshu.five}}</div>
                </div>
                <div>
                    <div class="文本1">满意：</div>
                    <div class="进度">
                        <p ref="满意" class="mui-progressbar 满意" data-progress="20">
                            <!-- <span></span> -->
                            <span :style="{'transform':'translate3d('+(满意-100)+'%, 0px, 0px)'}"></span>
                        </p>
                    </div>
                    <div class="数量">{{fenshu.four}}</div>
                </div>
                <div>
                    <div class="文本1">一般：</div>
                    <div class="进度">
                        <p ref="一般" class="mui-progressbar 一般" data-progress="20"><span></span></p>
                    </div>
                    <div class="数量">{{fenshu.three}}</div>
                </div>
                <div>
                    <div class="文本1">失望：</div>
                    <div class="进度">
                        <p ref="失望" class="mui-progressbar 失望" data-progress="20"><span></span></p>
                    </div>
                    <div class="数量">{{fenshu.one+fenshu.two}}</div>
                </div>
            </li>
        </ul>

        <div class="评论列表" v-for="(item, index) in 评论.list" :key="index">
            <ul class="header">
                <li class="Head_portrait">
                    <img v-if="item.用户.headImgUrl" :src="item.用户.headImgUrl" alt="" srcset="">
                </li>
                <li class="text">
                    <div>
                        <div class="name">
                            {{item.用户.nickname | 名字转码}}
                        </div>
                        <div class="xingxing">
                            <xingxing :number="item.score" />
                        </div>
                    </div>
                    <div class="time">
                        <span>{{item.createtime | 时间格式化('yyyy.MM.dd')}}</span>
                    </div>
                </li>
            </ul>
            <ul class="content_1">
                <!-- 第一次评价的信息 -->
                <li>
                    <div class="text_1">
                        <div v-html="item.remark"></div>
                    </div>
                    <div class="img_box">
                        <div>
                            <ul class="img_list" v-if="item.remarkimg && item.remarkimg.split(',').length>0">
                                <li v-for="(img_item, img_index) in item.remarkimg.split(',')" :key="img_index">
                                    <img :src="img_item" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="dianzan" :class="{'active':item.是否点赞==2}" @click="点赞(item)">
                            <i class="icon iconfont icon-dianzan1"></i>
                            {{item.somegreattimes ? item.somegreattimes : 0}}
                        </div>
                    </div>
                    <!-- <ul class="huifu mui-clearfix">
                        <div class="mui-pull-right" @tap="回复(item)">回复</div>
                        <div class="mui-pull-right">不回复</div>
                    </ul> -->
                </li>

                <li v-for="(回复item, index1) in item.shopCommodityCommentList" :key="index1">
                    <ul class="header">
                        <li class="name" v-if="!回复item.clerksid && 回复item.commenttype!=1">
                            {{回复item.用户.nickname | 名字转码}}回复：
                        </li>
                        <li class="name" v-if="回复item.clerksid && 回复item.commenttype1!=1">
                            {{回复item.店员.clerksname | 名字转码}}回复：
                        </li>
                        <li class="time_1">
                            <span v-show="回复item.commenttype==1">{{回复item.createtime | 计算时间差(item.createtime)}}</span>
                            <!-- 7天后追评 -->
                        </li>
                        <li class="time_2">{{回复item.createtime | 时间格式化('yyyy.MM.dd hh:mm')}}</li>
                    </ul>
                    <div class="text_1">
                        <div v-if="回复item.remark" v-html="回复item.remark"></div>
                        <div v-if="!回复item.remark">该用户没有填写评论~</div>
                    </div>
                    <div class="img_box">
                        <div>
                            <ul class="img_list" v-if="回复item.remarkimg && 回复item.remarkimg.split(',').length>0">
                                <li v-for="(img_item, img_index) in 回复item.remarkimg.split(',')" :key="img_index">
                                    <img :src="img_item" alt="">
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="dianzan" @click="点赞(回复item)">
                            <i class="icon iconfont icon-dianzan1"></i>
                            {{回复item.somegreattimes ? 回复item.somegreattimes : 0}}
                        </div> -->
                    </div>
                    <!-- <ul class="huifu mui-clearfix">
                        <div class="mui-pull-right" @tap="回复(item)">回复</div>
                        <div class="mui-pull-right">不回复</div>
                    </ul> -->
                </li>

            </ul>
        </div>

        <loading :loadingtype="评论.loading" :nodata="!评论.loading && 评论.total==0" :end="!评论.loading && 评论.total!=0 && 评论.total==评论.list.length" />

    </div>
</template>

<script>

import { openloading, dateFtt } from "@/assets/js/currency.js";
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";
import { getDaysByDateString } from "@/assets/js/time.js";

import xingxing from '@/components/xingxing.vue'
import loading from '@/components/loading.vue';
import { mapGetters, mapActions } from "vuex";
export default {
    name: "",
    components: {
        xingxing,
        loading
    },
    data() {
        return {
            userInfo: ''
        }
    },
    computed: {
        ...mapGetters({
            评论: '商家展示厅/评论',
            fenshu: '商家展示厅/分数',
        }),
        评分总数量() {
            return this.fenshu.one + this.fenshu.two + this.fenshu.three + this.fenshu.four + this.fenshu.five
        },
        好评百分比(){
            if(!this.评分总数量 || this.评分总数量==0){
                return 100
            }else{
                return Math.floor(this.fenshu.five / this.评分总数量 * 100);
            }
        },
        超赞(){
            return Math.floor(this.fenshu.five / this.评分总数量 * 100) || 100;
        },
        满意(){
            return Math.floor(this.fenshu.four / this.评分总数量 * 100) || 0
        },
        一般(){
            return Math.floor(this.fenshu.three / this.评分总数量 * 100) || 0
        },
        失望(){
            return  Math.floor((this.fenshu.one + this.fenshu.two) / this.评分总数量 * 100) || 0
        }
    },
    filters: {
        计算时间差(time1, time2) {
            var 时间差 = getDaysByDateString(time2, time1);
            if (时间差 > 30) {
                return Math.floor(时间差 / 30) + '月后追评'
            } else if (时间差 > 1) {
                return Math.floor(时间差) + '天后追评'
            } else if (时间差 > 0.04) {
                return Math.floor(时间差 * 24) + '小时后追评'
            } else {
                return '1小时内追评'
            }
        },
        名字转码(name) {
            try {
                return b64DecodeUnicode(name)
            } catch (error) {
                return name
            }
        },
        时间格式化(time, type) {
            //yyyy.MM.dd hh:mm 
            try {
                return dateFtt(time, type)
            } catch (error) {
                return time
            }
        }
    },
    methods: {
        ...mapActions({
            查询点赞: "评论/查询点赞",
            添加点赞: '评论/添加点赞',
            取消点赞: '评论/取消点赞'
        }),
        async 点赞(item) {
            if (!this.userInfo) {
                mui.confirm("需要登录才能领取，是否现在去登录。", "提示", ["取消", "是的"], value => {
                    if (value.index == 1) {
                        this.$router.push("/login");
                    }
                });
                return
            }
            openloading(true);
            var 添加 = true;
            var query = {
                start: 0,
                length: 10,
                commentid: item.id,
                userid: this.userInfo.username
            }

            try {
                var 查询点赞 = await this.查询点赞(query)
                if (查询点赞.data.code == 200) {
                    if (查询点赞.data.data.data.length == 0) {
                        添加 = true
                    } else {
                        添加 = false
                    }
                } else {
                    openloading(false)
                    mui.alert(查询点赞.data.msg ? 查询点赞.data.msg : 查询点赞.data.message, "提示", "我知道了", function () { }, "div");
                    return
                }
            } catch (error) {
                openloading(false)
                mui.toast("网络错误稍后再试。", { duration: "long", type: "div" });
                return
            }

            if (添加) {
                this.添加点赞([item.id, this.userInfo.username]).then(x => {
                    if (x.data.code == 200) {
                        item.somegreattimes++;
                        item.是否点赞 = 2
                        openloading(false)
                        mui.toast("点赞成功", { duration: "long", type: "div" });
                    } else {
                        openloading(false)
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                    }
                }).catch(err => {
                    openloading(false)
                    mui.toast("网络错误稍后再试。", { duration: "long", type: "div" });
                })
            } else {
                var 点赞详情 = 查询点赞.data.data.data[0];
                console.log(点赞详情)
                this.取消点赞([item.id, 点赞详情.id]).then(x => {
                    if (x.data.code == 200) {
                        item.somegreattimes--
                        item.是否点赞 = 1
                        openloading(false)
                        mui.toast("取消成功", { duration: "long", type: "div" });
                    } else {
                        openloading(false)
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                    }
                }).catch(err => {
                    openloading(false)
                    mui.toast("网络错误稍后再试。", { duration: "long", type: "div" });
                })
            }
            // item.somegreattimes++
        },
        设置分数比例() {
            // if (!this.评分总数量 || this.评分总数量 == 0) {
            //     mui(this.$refs.超赞).progressbar({ progress: 100 }).show();
            // } else {
            //     var 超赞 = Math.floor(this.fenshu.five / this.评分总数量 * 100)
            //     mui(this.$refs.超赞).progressbar({ progress: 超赞 }).show();
            // }
        }
    },
    mounted() {
       

        try {
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (error) {

        }
    },
    watch: {
    },
}
</script>

<style lang="scss" scoped>
.总览 {
    margin: 4px 0px 0px;
    background: #ffffff;
    display: flex;
    min-height: 93px;
    align-items: center;
    .左边 {
        width: 110px;
        text-align: center;
        flex-shrink: 0;
        .标题 {
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
        }
        .百分比 {
            color: rgba(212, 48, 48, 1);
            font-size: 20px;
            margin: 4px 0px;
        }
        .说明 {
            color: rgba(80, 80, 80, 1);
            font-size: 10px;
        }
    }
    .右边 {
        flex-grow: 1;
        > div {
            margin: 5px 0px;
            display: flex;
            align-items: center;
            .文本1 {
                color: rgba(80, 80, 80, 1);
                font-size: 10px;
            }
            .进度 {
                padding: 0px 7px 0px 9px;
                flex-grow: 1;
                p {
                    margin: 0px 0px 0px;
                    height: 6px;
                    span {
                        background: #fc7154;
                    }
                }
            }
            .数量 {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
                width: 45px;
            }
        }
    }
}

.评论列表 {
    padding: 0px 10px;
    background: #ffffff;
    margin: 5px 0px 5px 0px;
    .header {
        display: flex;
        padding: 6px 0px;
        flex-shrink: 0;
        .Head_portrait {
            width: 38px;
            height: 38px;
            margin: 0px 12px 0px 0px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .text {
            flex-grow: 1;
            div {
                display: flex;
                justify-content: space-between;
            }
            .name {
                color: rgba(80, 80, 80, 1);
                font-size: 14px;
            }
            .time {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
            }
        }
    }
    .content_1 {
        > li {
            border-bottom: 1px solid rgba(246, 246, 246, 1);
            padding: 0px 0px 8px 0px;
            margin: 0px 0px 6px 0px;
        }
        > li:last-child {
            margin: 0px;
            border: none;
        }
        padding: 0px 0px 0px 50px;
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .time_1 {
                color: #fc6621;
            }
            .time_2 {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
            }
        }
        .text_1 {
            margin: 0px 0px 8px 0px;
        }
        .img_box {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            .img_list {
                display: flex;
                flex-wrap: wrap;
                > li {
                    width: 60px;
                    height: 60px;
                    margin: 0px 8px 0px 0px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .dianzan {
                color: rgba(166, 166, 166, 1);
                font-size: 14px;
                i {
                    font-size: 24px;
                }
            }
            .dianzan.active {
                i {
                    color: #f86c0c;
                }
            }
        }
        .huifu {
            padding: 11px 0px 0px 0px;
            div {
                width: 52px;
                height: 22px;
                border-radius: 22px;
                line-height: 20px;
                font-size: 12px;
                margin: 0px 0px 0px 12px;
                text-align: center;
            }
            > div:nth-child(1) {
                color: #007aff;
                border: 1px solid #007aff;
            }
            > div:nth-child(2) {
                color: #808080;
                border: 1px solid #808080;
            }
        }
    }
}
</style>
