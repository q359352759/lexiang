<template>
    <div>
        <ul class="总览">
            <li class="左边">
                <div class="标题">好评率</div>
                <div class="百分比">100%</div>
                <div class="说明">根据用户评价计算</div>
            </li>
            <li class="右边">
                <div>
                    <div class="文本1">超赞：</div>
                    <div class="进度">
                        <p ref="超赞" class="mui-progressbar 超赞" data-progress="20"><span></span></p>
                    </div>
                    <div class="数量">0</div>
                </div>
                <div>
                    <div class="文本1">满意：</div>
                    <div class="进度">
                        <p ref="满意" class="mui-progressbar 满意" data-progress="20"><span></span></p>
                    </div>
                    <div class="数量">0</div>
                </div>
                <div>
                    <div class="文本1">一般：</div>
                    <div class="进度">
                        <p ref="一般" class="mui-progressbar 一般" data-progress="20"><span></span></p>
                    </div>
                    <div class="数量">0</div>
                </div>
                <div>
                    <div class="文本1">失望：</div>
                    <div class="进度">
                        <p ref="失望" class="mui-progressbar 失望" data-progress="20"><span></span></p>
                    </div>
                    <div class="数量">0</div>
                </div>
            </li>            
        </ul>

        <loading :nodata="true" text="暂无评论"/>

        <div class="评论列表" v-for="(item, index) in 0" :key="index">
            <ul class="header">
                <li class="Head_portrait">
                    <img src="image/43.png" alt="" srcset="">
                </li>
                <li class="text">
                    <div>
                        <div class="name">嘣得儿你</div>
                        <div class="xingxing">
                            <xingxing :number="4"/>
                        </div>
                    </div>
                    <div class="time">
                        <span>2018.11.13</span>
                    </div>
                </li>
            </ul>
            <ul class="content_1">
                <li v-for="(item, index1) in 3" :key="index1">
                    <ul class="header" v-if="index1!=0">
                        <li class="name">孟哥回复：</li>
                        <li class="time_1">7天后追评</li>  
                        <li class="time_2">2018.11.13</li>                          
                    </ul>
                    <div class="text_1">
                        <div>感谢亲长期以来的信任与支持，我们会努力越做越好，以后常来！</div>
                    </div>
                    <div class="img_box">
                        <div>
                            <ul class="img_list" v-if="index1==0">
                                <li>
                                    <img src="image/43.png" alt="">
                                </li>
                                <li>
                                    <img src="image/43.png" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="dianzan" v-if="index1!=0">
                            <i class="icon iconfont icon-dianzan1"></i>
                            98
                        </div>
                    </div>
                    <!-- <ul class="huifu mui-clearfix">
                        <div class="mui-pull-right" @tap="huifu(true)">回复</div>
                        <div class="mui-pull-right">不回复</div>
                    </ul> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import xingxing from '@/components/xingxing.vue'
import loading from '@/components/loading.vue'
export default {
    name:"",
    components:{
        xingxing,
        loading
    },
    data () {
        return {
            
        }
    },
    methods: {
        
    },
    mounted () {
        
        mui(this.$refs.超赞).progressbar({progress:100}).show();
        
    }
}
</script>

<style lang="scss" scoped>
.总览{
    margin: 4px 0px 0px;
    background: #ffffff;
    display: flex;
    min-height: 93px;
    align-items: center;
    .左边{
        width: 110px;
        text-align: center;
        flex-shrink: 0;
        .标题{
            color: rgba(80, 80, 80, 1);
        	font-size: 12px;
        }
        .百分比{
            color: rgba(212, 48, 48, 1);
        	font-size: 20px;
            margin: 4px 0px;
        }
        .说明{
            color: rgba(80, 80, 80, 1);
        	font-size: 10px;
        }
    }
    .右边{
        flex-grow: 1;
        >div{
            margin: 5px 0px;
            display: flex;
            align-items: center;
            .文本1{
                color: rgba(80, 80, 80, 1);
            	font-size: 10px;
            }
            .进度{
                padding: 0px 7px 0px 9px;
                flex-grow: 1;
                p{
                    margin: 0px 0px 0px;
                    height: 6px;
                    span{
                        background: #fc7154;
                    }
                }
            }
            .数量{
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
