<template>
    <div id="CommodityDetails">
        <div class="mui-content mui-fullscreen">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <!-- <a @tap="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a> -->
                <h1 class="mui-title"></h1>
                
                <span class="fenxiang mui-pull-right">
                    <i class="icon iconfont icon-fenxiang2"></i>
                </span>
                <span @click="erweima_show()" class="erweima mui-pull-right">
                    <i class="icon iconfont icon-31erweima"></i>
                </span>
            </header>
            <div class="swiper-container box_1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                        <img :src="x" alt="">
                        <!-- <div></div> -->
                    </div>
                    <!-- <div class="swiper-slide"><img src="@/assets/image/6.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="@/assets/image/7.jpg" alt=""></div> -->
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>

            <ul class="box_2">
                <li class="title">{{commodity.name}}</li>
                <li class="Price">
                    <div>
                        <span class="sellingPrice">￥{{commodity.sellingPrice}}</span>
                    </div>                
                    <div>
                        <span class="marketPrice"><s>{{commodity.marketPrice}}</s></span>
                        <span class="sales mui-pull-right">已售:{{commodity.sales}}</span>
                    </div>
                </li>
                <li class="Red_envelopes">
                    <div>
                        <i class="icon_1 icon iconfont icon-hongbao1"></i>
                        <span class="qian">可抵扣：{{commodity.deduction}}元</span>
                    </div>
                    <span class="btn_1">领红包</span>
                </li>
            </ul>
            
            <ul class="mui-table-view box_3">
                <li class="mui-table-view-cell" >
					<a class="mui-navigate-right item">
						<span>商品评价</span>
                        <span>0条</span>
					</a>
				</li>
			</ul>

            <ul class="box_4">
                <li v-for="(item, index) in 2" :key="index">
                    <div class="img_box">
                        <img src="image/43.png" alt="" srcset="">
                    </div>
                    <div class="cont_1">
                        <div class="header_1">
                            <div>
                                <div class="title">嘣得儿你</div>
                                <div class="time_1">2018.11.13 19:26:23</div>
                            </div>
                            <div class="xingxing">
                                <i class="icon iconfont icon-shoucangdianjihou active"></i>
                                <i class="icon iconfont icon-shoucangdianjihou"></i>
                                <i class="icon iconfont icon-shoucangdianjihou"></i>
                                <i class="icon iconfont icon-shoucangdianjihou"></i>
                                <i class="icon iconfont icon-shoucangdianjihou"></i>
                            </div>
                        </div>
                        <div class="text_1">
                            拿到照片的时候，既开心又惊喜
                        </div>
                        <div class="img_list">
                            <img src="image/43.png" alt="" srcset="">
                            <img src="image/43.png" alt="" srcset="">
                        </div>
                    </div>
                </li>
            </ul>
            
            <div class="box_5" v-html="commodity.remark">
            </div>

            <ul class="box_6">
                <li>
                    <i class="icon iconfont icon-collect"></i>
                    收藏
                </li>
                <li>
                    立即购买
                </li>
            </ul>

            <div class="QRCode" v-show="QRCode_box">
                <div class="mask"></div>
                <div class="content_1">
                    <div class="close_1">
                        <div @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                        <div></div>
                    </div>
                    <div class="img_box">
                        <img v-if="img_list.length>0" :src="img_list[0]" alt="">
                    </div>
                    <div class="title_1">{{commodity.name}}</div>
                    <ul class="cont_1">
                        <li class="erweima_box" ref="qrcode">
                            <!-- <img v-if="img_list.length>0" :src="img_list[0]" alt=""> -->
                        </li>
                        <li>
                            <div>
                                <span class="sellingPrice">￥{{commodity.sellingPrice}}</span>
                                <span class="marketPrice"><s>{{commodity.marketPrice}}</s></span>
                            </div>
                            <div class="hongbao">
                                <i class="icon_1 icon iconfont icon-hongbao1"></i>
                                <span class="qian">可抵扣：{{commodity.deduction}}元</span>
                            </div>
                        </li>
                    </ul>
                    <div class="tishi">长按识别二维码，购买此商品</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
export default {
    name:'',
    data(){
        return{
            QRCode_box:false,
            id:'',
            commodity:{},
            img_list:[]
        }
    },
    methods: {
        //轮播图片
        getswiper() {
            var swiper = new Swiper("#CommodityDetails .swiper-container", {
                loop: true,
                autoplay: true,
                observer:true,
                autoplay : {
                    delay:3000
                },
                pagination: {
                    el: ".swiper-pagination"
                }
            });
        },
        //查询单个商品
        get_commodity(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/commodity/findById/'+this.id
            }).then(x=>{
                console.log(x);
                this.commodity=x.data.data;
                this.img_list = x.data.data.img ? x.data.data.img.split(',') : [];
            }).catch(err=>{
                console.log(err);
            })
        },
        //显示二维码
        erweima_show(){
            console.log('生成二维码');
            if(this.qrcode){
                // this.qrcode_show=true;
                this.QRCode_box=true;
            }else{
                var el=this.$refs.qrcode
                    el.innerHTML='';
                let qrcode = new QRCode(el, {  
                    width: 50,  
                    height: 50, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                    text: location.href, // 二维码内容  
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                    background: '#fff',
                    foreground: '#fff',
                })
                // console.log(qrcode)
                this.QRCode_box=true;
                // setTimeout(()=>{
                //     this.print();
                // },500)
            }
            
        },
        //关闭二维码
        close_1(){
            this.QRCode_box=false
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
        // var swiper = new Swiper("#CommodityDetails .swiper-container", {
        //         loop: true,
        //         autoplay: true,
        //         observer:true,
        //         pagination: {
        //             el: ".swiper-pagination"
        //         }
        //     });

        
        this.id=this.$route.query.id;
        //查询单个商品
        this.get_commodity();
        
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
}
</script>

<style lang="scss" scoped>
.mui-bar{
    background-color: rgba(255,255,255,0.3);
    .fenxiang,
    .erweima{
        color: #ffffff;
        line-height: 44px;
        position: relative;
    }
    .fenxiang{
        margin: 0px 5px 0px 15px;
        font-size: 18px;
    }
    .erweima{
        font-size: 20px
    }
}
.mui-content{
    padding-bottom: 50px;
}
.box_1 .swiper-slide {
    height: 2.82rem;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.box_2{
    padding: 9px 12px 15px;
    background: #ffffff;
    .title{
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        font-weight: bold;
    }
    .Price{
        display: flex;
        align-items: flex-end;
        margin: 5px 0px 4px;
        >div:nth-child(1){
            margin: 0px 5px 0px 0px;
        }
        >div:nth-child(2){
            flex-grow: 1;
        }
    }
    .sellingPrice{
        color: rgba(212, 48, 48, 1);
    	font-size: 19px;
    }
    .marketPrice{
        color: rgba(166, 166, 166, 1);
    	font-size: 12px;
    }
    .sales{
        color: rgba(166, 166, 166, 1);
    	font-size: 12px;
    }
    .Red_envelopes{
        display: flex;
        align-items: center;
        >div:nth-child(1){
            flex-grow: 1;
            display: flex;
            align-items: center;
        }
        .icon_1{
            color: rgba(256, 76, 76, 1);
            font-size: 22px;
            margin: 0px 5px 0px 0px;
        }
        .qian{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
        .btn_1{
            width: 60px;
        	height: 20px;
            font-size: 10px;
            border-radius: 4px;
            line-height: 18px;
            border:1px solid #d43030;
            text-align: center;
            color: #d43030;
        }
        
    }
}

.box_3{
    margin: 3px 0px 0px;
    .item{
        padding-right: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >span:nth-child(1){
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        >span:nth-child(2){
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
    }
}

.box_4{
    background: #ffffff;
    >li{
        display: flex;
        padding: 6px 12px;
        border-top: 1px solid #efeff4;
        .img_box{
            width: 38px;
            height: 38px;
            flex-shrink: 0;
            margin: 0px 10px 0px 0px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        .cont_1{
            flex-grow: 1;
            .header_1{
                display: flex;
                justify-content: space-between;
            }
            .title{
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
            }
            .time_1{
                color: rgba(166, 166, 166, 1);
            	font-size: 10px;
            }
            .xingxing{
                color: #f8d40c;
                i{
                    margin: 0px 2px;
                }
            }
            .text_1{
                color: rgba(80, 80, 80, 1);
                font-size: 12px;
                margin: 3px 0px 4px;
            }
            .img_list{
                img{
                    width: 60px;
                    height: 60px;
                    margin: 0px 7px 0px 0px;
                }
            }
        }
    }
}

.box_5{
    background: #ffffff;
    padding: 8px 12px;
    margin: 3px 0px 0px 0px;
}

.box_6{
    position: fixed;
    width: 100%;
    height: 44px;
    left: 0px;
    bottom: 0px;
    display: flex;
    >li:nth-child(1){
        min-width: 94px;
        text-align: center;
        background-color: rgba(24, 169, 104, 1);
        color: #ffffff;
        line-height: 44px;
        font-size: 14px;
    }
    >li:nth-child(2){
        color: rgba(255, 255, 255, 1);
	    background-color: rgba(252, 102, 33, 1);
    	font-size: 14px;
        line-height: 44px;
        text-align: center;
        flex-grow: 1;
    }
}


.QRCode{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    .mask{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
    }
    .content_1{
        position: relative;
        z-index: 1;
        background: #ffffff;
        width: 266px;
        padding: 17px 17px 15px 17px;
        .close_1{
            width: 36px;
            height: 50px;
            position: absolute;
            top: -50px;
            right: 0px;
            >div:nth-child(1){
                height: 36px;
                text-align: center;
                line-height: 36px;
                background: #ffffff;
                border-radius: 100%;
                position: relative;
                z-index: 1;
            }
            >div:nth-child(2){
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

        .img_box{
            height: 174px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title_1{
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
            text-align: center;
            font-weight: bold;
            margin: 7px 0px 10px;
        }
        .cont_1{
            display: flex;
            .erweima_box{
                flex-shrink: 0;
                width: 50px;
                height: 50px;
                margin: 0px 8px 0px 0px;
                img{
                    width: 100%;
                }
            }
            >li:nth-child(2){
                flex-grow: 1;
            }
            .sellingPrice{
                color: rgba(212, 48, 48, 1);
                font-size: 19px;
                margin: 0px 5px 0px 0px;
            }
            .marketPrice{
                color: rgba(166, 166, 166, 1);
            	font-size: 12px;
            }
            .hongbao{
                display: flex;
                align-items: center;
                .icon_1{
                    font-size: 22px;
                    color: #d43030;
                    margin: 0px 5px 0px 0px;
                }
                .qian{
                    color: rgba(166, 166, 166, 1);
                	font-size: 12px;
                }
            }
        }
        .tishi{
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
            text-align: center;
            margin: 14px 0px 0px;
        }
    }
}
</style>


