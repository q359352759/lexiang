<template>
    <div id="market">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">业务市场</h1>
        </header>
        <div class="mui-content">

            <div class="swiper-container box_1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                        <img :src="'image/'+x" alt="">
                        <!-- <div></div> -->
                    </div>
                    <!-- <div class="swiper-slide"><img src="@/assets/image/6.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="@/assets/image/7.jpg" alt=""></div> -->
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>

            <!-- <div class="banyuan">
                <div></div>
            </div> -->

            <ul class="box_2">
                <li @click="MarketDetails(item)" v-for="(item, index) in img_list2" :key="index">
                    <div :style="{'background':item.bg}">
                        <!-- <img :src="item.imgUrl" alt="" /> -->
                        <i class="icon iconfont" :class="item.className"></i>
                    </div>
                    <span>{{item.name}}</span>
                </li>
            </ul>

            <ul class="box_3">
                <li>
                    <span @click="select_screen('renqi')">
                        人气
                    </span>
                    <img v-if="screen_type!=0 && screen_type!=1" src="image/paixun.png" alt="">
                    <img v-if="screen_type==0" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==1" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('juli')">
                        距离
                    </span>
                    <img v-if="screen_type!=2 && screen_type!=3" src="image/paixun.png" alt="">
                    <img v-if="screen_type==2" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==3" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('yongjin')">
                        佣金
                    </span>
                    <img v-if="screen_type!=4 && screen_type!=5" src="image/paixun.png" alt="">
                    <img v-if="screen_type==4" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==5" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('pingjia')">
                        评价
                    </span>
                    <img v-if="screen_type!=6 && screen_type!=7" src="image/paixun.png" alt="">
                    <img v-if="screen_type==6" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==7" src="image/paixushang.png" alt="">
                </li>
            </ul>

            <ul class="box_4">
                <li v-for="(item, index) in 0" :key="index">
                    <div>
                        <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                    </div>
                    <div>
                        <h1>婚纱摄影韩国苏荷SOHO PHOTO婚纱摄影韩国苏荷SOHO</h1>
                        <h2>
                            <div class="mui-pull-right">
                                <i class="icon iconfont icon-location"></i>
                                320m
                            </div>
                            <div class="text">地址：人民北路二段万达广场SOHOA座场SOHOA座场SOHOA座场SOHOA座</div>
                        </h2>
                        <h3>
                            <div class="mui-pull-right">
                                <i class="icon iconfont icon-renqi"></i>
                                20000
                            </div>
                            <div class="text">业务：婚纱摄影、个人写真</div>
                        </h3>
                        <h4>
                            <div class="mui-pull-right qiandai">
                                <i class="icon iconfont icon-yongjin1"></i>
                                50%
                            </div>
                            <div>
                                <span>招募：</span>
                                <div class="progress_1">
                                    <span>60人</span>
                                    <span class="mui-pull-right">40人</span>
                                    <div :style="{'width':'50%'}"></div>
                                </div>
                                <span class="xingxing">
                                    <i class="icon iconfont icon-shoucangdianjihou"></i>
                                    5.0
                                </span>
                            </div>
                        </h4>
                    </div>
                </li>
            </ul>
            <loading :nodata="true"/>

        </div>
    </div>
</template>

<script>
import loading from '@/components/loading.vue';

export default {
    name: "",
    components:{
        loading
    },
    data() {
        return {
            screen_type: 0,
            img_list: [],
            img_list2: [
                {
                    name: "酒水",
                    imgUrl: "image/fenlei/1.jpg",
                    className: "icon-jiushui1",
                    bg: "rgba(24, 169, 104, 1)"
                },
                {
                    name: "养生",
                    imgUrl: "image/fenlei/2.jpg",
                    className: "icon-liren",
                    bg: "#C571D4"
                },
                {
                    name: "婚嫁",
                    imgUrl: "image/fenlei/3.jpg",
                    className: "icon-hunjia",
                    bg: "#f60606"
                },
                {
                    name: "养生",
                    imgUrl: "image/fenlei/4.jpg",
                    className: "icon-weibiaoti-",
                    bg: "#7948ea"
                },
                {
                    name: "医疗",
                    imgUrl: "image/fenlei/5.jpg",
                    className: "icon-yiliao2",
                    bg: "#f65634"
                },
                {
                    name: "建材",
                    imgUrl: "image/fenlei/6.jpg",
                    className: "icon-jiancai1",
                    bg: "#1da78f"
                },
                {
                    name: "家具",
                    imgUrl: "image/fenlei/7.jpg",
                    className: "icon-jiaju",
                    bg: "#ff8d1a"
                },
                {
                    name: "家电",
                    imgUrl: "image/fenlei/8.jpg",
                    className: "icon-jiadian2",
                    bg: "#8dba00"
                },
                {
                    name: "文教",
                    imgUrl: "image/fenlei/9.jpg",
                    className: "icon-5109",
                    bg: "#007aff"
                },
                {
                    name: "更多",
                    imgUrl: "image/fenlei/10.jpg",
                    className: "icon-quanbu",
                    bg: "#18a968"
                }
            ]
        };
    },
    methods: {
        //点击分类跳转详情
        MarketDetails(x){
            console.log(x)
            if(x.name=="更多"){
                this.$router.push('/classification');
            }else{
                this.$router.push('/MarketDetails');            
            }
        },
        //点击排序
        select_screen(x) {
            if (x == "renqi") {
                this.screen_type = this.screen_type == 0 ? 1 : 0;
            } else if (x == "juli") {
                this.screen_type = this.screen_type == 2 ? 3 : 2;
            } else if (x == "yongjin") {
                this.screen_type = this.screen_type == 4 ? 5 : 4;
            } else {
                this.screen_type = this.screen_type == 6 ? 7 : 6;
            }
        },
        getswiper() {
            var swiper = new Swiper("#market .swiper-container", {
                loop: true,
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination"
                }
                // virtual: {
                //     slides: ['5.jpg', '6.jpg', '7.jpg'],
                //     renderSlide:function(slide, index){
                //         // return '<div class="swiper-slide">索引是'+index+'+内容是'+slide+'</div>';
                //         return '<div class="swiper-slide"><img src="./image/'+slide+'" alt=""></div>';
                //     },
                // },
            });
        }
    },
    beforeCreate() {
        // console.group('------beforeCreate创建前状态------');
    },
    created() {
        // console.group('------created创建完毕状态------');
    },
    beforeCreate() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted() {
        // this.img_list = ["5.jpg", "6.jpg", "7.jpg"];
        this.img_list = ["home_1.jpg", "home_2.jpg", "home_3.jpg"];

        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function() {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function() {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function() {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function() {
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        img_list() {
            this.$nextTick(function() {
                console.log("数据渲染完成");
                this.getswiper();
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
#market {
    height: 100%;
    .mui-content {
        height: 100%;
    }
}
#market .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#market .mui-title {
    color: #ffffff;
}

#market .box_1 .swiper-slide {
    height: 1.1rem;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

#market .banyuan {
    position: relative;
    z-index: 1;
    div {
        position: absolute;
        width: 100%;
        height: 20px;
        background: #cccccc;
        position: absolute;
        bottom: -10px;
        left: 0px;
        border-radius: 50%;
    }
}

#market .box_2 {
    background: #ffffff;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 12px;
    padding: 0px 0px 0.1rem;
    li {
        width: 20%;
        div {
            color: #ffffff;
            font-size: 0.22rem;
            margin: 0.15rem auto 0.1rem;
            width: 0.35rem;
            height: 0.35rem;
            text-align: center;
            background: #9e9e9e;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
    }
}

.box_3 {
    margin: 5px 0px 0px;
    background: #ffffff;
    text-align: center;
    display: flex;
    color: rgba(128, 128, 128, 1);
    font-size: 0.12rem;
    line-height: 0.37rem;
    height: 0.37rem;
    > li {
        width: 25%;
    }
    img {
        vertical-align: middle;
        width: 0.12rem;
    }
}

.box_4 {
    background: #ffffff;
    > li {
        padding: 8px;
        border-bottom: 1px solid #efefef;
        display: flex;
        > div:nth-child(1) {
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
            margin: 0px 0.09rem 0px 0px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        > div:nth-child(2) {
            flex-grow: 1;
            width: 0;
        }
        h1 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 0.5rem;
        }
        h2 {
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
            }
        }
        h3 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
                color: #d43030;
            }
        }
        h4 {
            font-weight: 400;
            font-size: 0.1rem;
            .progress_1 {
                display: inline-block;
                width: 1rem;
                height: 0.13rem;
                line-height: 0.13rem;
                position: relative;
                background: #e9cdcd;
                border-radius: 0.13rem;
                color: #ffffff;
                padding: 0px 3px;
                margin: 0px 0.1rem 0px 0px;
                span {
                    position: relative;
                    z-index: 1;
                }
                div {
                    position: absolute;
                    height: 100%;
                    border-radius: 0.13rem;
                    background: #e33c64;
                    top: 0px;
                    left: 0px;
                }
            }
            .xingxing {
                color: #d43030;
                i {
                    color: #f8d40c;
                }
            }
            .qiandai {
                color: #d43030;
            }
        }
    }
}
</style>
