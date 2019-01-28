<template>
    <div class="评论列表">
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
                    <div class="dianzan" @click="点赞(item)">
                        <i class="icon iconfont icon-dianzan1"></i>
                        {{item.somegreattimes ? item.somegreattimes : 0}}
                    </div>
                </div>
            </li>

            <li v-for="(回复item, index1) in item.shopCommodityCommentList" :key="index1">
                <ul class="header">
                    <li class="name" v-if="!回复item.clerksid">
                        {{回复item.用户.nickname | 名字转码}}回复：
                    </li>
                    <li class="name" v-if="回复item.clerksid">
                        {{回复item.店员.clerksname | 名字转码}}回复：
                    </li>
                    <li class="time_1">
                        <!-- 7天后追评 -->
                    </li>
                    <li class="time_2">{{回复item.createtime | 时间格式化('yyyy.MM.dd hh:mm')}}</li>
                </ul>
                <div class="text_1">
                    <div v-html="回复item.remark"></div>
                </div>
                <div class="img_box">
                    <div>
                        <ul class="img_list" v-if="回复item.remarkimg && 回复item.remarkimg.split(',').length>0">
                            <li v-for="(img_item, img_index) in 回复item.remarkimg.split(',')" :key="img_index">
                                <img :src="img_item" alt="">
                            </li>
                        </ul>
                    </div>
                    <div class="dianzan" @click="点赞(回复item)">
                        <i class="icon iconfont icon-dianzan1"></i>
                        {{回复item.somegreattimes ? 回复item.somegreattimes : 0}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

import { openloading , dateFtt } from "@/assets/js/currency.js";
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";

import xingxing from '@/components/xingxing.vue'
import loading from '@/components/loading.vue';
export default {
    name:"",
    props: {
        item:{
            default:{}
        }
    },
    components:{
        xingxing,
        loading
    },
    data () {
        return {
            userInfo:''
        }
    },
    computed: {
        
    },
    filters:{
        名字转码(name){
            try {
                return b64DecodeUnicode(name)
            } catch (error) {
                return name
            }
        },
        时间格式化(time,type){
            //yyyy.MM.dd hh:mm 
            try {
                return dateFtt(time,type)
            } catch (error) {
                return time
            }
        }
    },
    methods: {
        回复item(item){
            if(!this.userInfo){
                mui.confirm("需要登录才能领取，是否现在去登录。", "提示", ["取消", "是的"], value => {
                    if (value.index == 1) {
                        this.$router.push("/login");
                    }
                });
                return
            }
        }
    },
    mounted () {
        
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.评论列表 {
    padding: 0px 10px;
    background: #ffffff;
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
                    color: #f86c0c;
                    font-size: 24px;
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
