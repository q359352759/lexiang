<template>
    <div id="CommodityDetails">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <!-- <a @tap="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title"></h1>
            
            <!-- <span class="fenxiang mui-pull-right">
                <i class="icon iconfont icon-fenxiang2"></i>
            </span> -->
            <span @click="erweima_show()" class="erweima mui-pull-right">
                <i class="icon iconfont icon-31erweima"></i>
            </span>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <div class="swiper-container box_1" ref="swiperContainer">
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
                        <span class="danwei">{{commodity.unit}}</span>
                        <span class="sales mui-pull-right">已售:{{commodity.sales}}</span>
                        
                    </div>
                </li>
                <li class="Red_envelopes">
                    <div>
                        <i class="icon_1 icon iconfont icon-hongbao1"></i>
                        <span class="qian">可抵扣：{{commodity.deduction}}元</span>
                        <span class="专享" v-if="专享 && 专享.type==0">新人专享省{{专享.deduction}}元</span>
                        <span class="专享" v-if="专享 && 专享.type==1">生日专享省{{专享.deduction}}元</span>
                    </div>
                    <span class="btn_1" @tap="linghongbao()">领红包</span>
                    <!--  -->
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

            <ul class="box_7" v-if="!isshop">
                <li>
                    <img :src="shop.signboard">
                    <span class="shopname">{{shop.name}}</span>
                    <span class="pingfen">5.0分</span>
                </li>
                <li @tap="toshop()">
                    进店
                </li>
            </ul>

            <ul class="box_4">
                <li v-for="(item, index) in 0" :key="index">
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

            
            <!-- 二维码容器 -->
            <div class="QRCode rongqi">
                <div class="content_1" ref="printMe">
                    <div class="title_2">
                        <img src="image/WechatIMG311.png" alt="" srcset="">
                        <div class="text_1">红包乐购</div>
                        <div class="text_2">（红包促销购物平台）</div>
                    </div>
                    <div class="img_box">
                        <img :src="img_base64" alt="">
                    </div>                    
                    <ul class="cont_1">
                        <li>
                            <div class="title_1">{{commodity.name}}</div>
                            <div>
                                <span class="sellingPrice">￥{{commodity.sellingPrice}}</span>
                                <span class="marketPrice"><s>{{commodity.marketPrice}}</s></span>
                                <span class="danwei">{{commodity.unit}}</span>
                            </div>
                            <div class="hongbao">
                                <i class="icon_1 icon iconfont icon-hongbao1"></i>
                                <span class="qian">可抵扣：{{commodity.deduction}}元</span>
                            </div>
                        </li>
                        <li class="erweima_box" ref="qrcode">
                            <!-- <img v-if="img_list.length>0" :src="img_list[0]" alt=""> -->
                        </li>
                    </ul>
                    <div class="tishi">长按识别二维码，购买此商品</div>
                </div>
            </div>
            <div class="QRCode content" v-show="QRCode_box">
                <div class="mask"></div>
                <div class="content_1">
                    <div class="close_1">
                        <div @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                        <div></div>
                    </div>
                    <div class="img_box1">
                        <img :src="qrcode" alt="">
                    </div>
                </div>
            </div>



        </div>
        <ul class="box_6">
                <li @tap="shoucang()">
                    <i :class="{'icon-shoucang shoucang':UserFavorite,'icon-collect':!UserFavorite}" class="icon iconfont"></i>
                    <div>{{UserFavorite ? '取消收藏' : '收藏'}}</div>
                </li>
                <li>
                    <i class="icon iconfont icon-kefu1"></i>
                    <div>客服</div></li>
                <li @click="goumai()">
                    立即购买
                </li>
            </ul>
    </div>
</template>

<script>

import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import {openloading} from '@/assets/js/currency.js';
import { mapActions } from 'vuex';
export default {
    name:'',
    data(){
        return{
            isshop:true,
            QRCode_box:false,
            id:'',
            commodity:{},
            img_list:[],
            shop:{},        //店铺信息
            UserFavorite:'',    //收藏信息
            userInfo:'',     //用户信息

            qrcode:null,
            img_base64:'',
            专享:'',
        }
    },
    methods: {
        ...mapActions({
            商品查询专享:'shangPing/商品查询专享',
            修改商品:"shangPing/修改商品",
        }),
        //立即购买
        goumai(){
            this.$router.push('/commodity/PurchaseSingle?id='+this.id);
        },
        linghongbao(){
            // http://192.168.1.13:8080/#/RedEnvelopesList?shopid=D7004090906D139CD1492008D376E457
            this.$router.push('/RedEnvelopesList?shopid='+this.shop.shopid);
        },
        //点击收藏
        shoucang(){
            if(!this.userInfo){
                mui.toast('请先登录才能收藏。',{ duration: "long",type: "div" });
                return
            }
            if(!this.UserFavorite){
                this.addUserFavorite()
            }else{
                this.deleteUserFavorite()
            }
        },
        //添加收藏
        addUserFavorite(){
            var obj={
                    userid:this.userInfo.username,
                    type:'1',        //收藏类型(0:店铺,1:商品)
                    name:'商品',        //收藏类型(店铺,商品)
                    shopid:'',      //商店id
                    commodityid:this.id,   //商品id
                }
            this.$axios({
                method:'post',
                url:'/api-s/shops/addUserFavorite',
                data:obj,
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    mui.toast('收藏成功。',{ duration: 1000,type: "div" });
                    this.get_findDataUserFavorite()
               }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                mui.toast('系统错误,稍后再试。',{ duration: 1000,type: "div" });
            })
        },
        //删除收藏
        deleteUserFavorite(){
            this.$axios({
                method:'post',
                url:'/api-s/shops/deleteUserFavorite',
                data:[this.UserFavorite.id]
            }).then(x=>{
                if(x.data.code==200){
                    console.log('取消收藏成功。',x);
                    mui.toast('取消收藏成功。',{ duration: 1000,type: "div" });
                    this.get_findDataUserFavorite()
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //查询收藏
        get_findDataUserFavorite(){
            var obj={
                    start:0,
                    length:10,
                    userid:this.userInfo.username,
                    // shopid:this.shopid
                    commodityid:this.id,   //商品id
                }
            this.$axios({
                method:'get',
                url:'/api-s/shops/findDataUserFavorite',
                params:obj
            }).then(x=>{
                console.log('查询收藏信息',x);
                if(x.data.code==200){
                    this.UserFavorite=x.data.data.data.length>0 ? x.data.data.data[0] : '';
                }
            }).catch(err=>{
                console.log('查询收藏信息错误',err)
            })
        },
        //轮播图片
        getswiper() {
            var swiper = new Swiper(this.$refs.swiperContainer, {
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
                this.get_shop();
            }).catch(err=>{
                console.log(err);
            })
        },
        //获取图片base64
        imgtobase64(){
            return new Promise((resolve, reject)=>{
                this.$request('/api-u/users/imgtobase64',{url:this.img_list[0]},'post',true).then(x=>{
                    if(x.data.code==200){
                        this.img_base64='data:image/jpeg;base64,'+x.data.data;
                        resolve(x);
                    }else{
                        reject('获取图片base64错误');
                    }
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        //生成二维码
        shengcheng_erweima(){
            console.log(location.href+"&isshop=1")
            return new Promise((resolve,reject)=>{
                var el=this.$refs.qrcode
                    el.innerHTML='';
                    let qrcode = new QRCode(el, {  
                        width: 80, 
                        height: 80, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                        text: location.href+"&isshop=1", // 二维码内容  
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                        background: '#fff',
                        foreground: '#fff',
                    })
                resolve('生成二维码');
            })
        },
        //显示二维码
        erweima_show(){
            // console.log('生成二维码');
            // console.log( location.href+"&isshop=1")
            if(this.qrcode){
                this.QRCode_box=true;
            }else{
                openloading(true);
                Promise.all([this.imgtobase64(), this.shengcheng_erweima()]).then((results)=>{
                    // console.log('1111111',results);
                    
                    setTimeout(()=>{
                        this.print();
                    },500)
                }).catch((reason)=>{
                    // console.log(22222222,reason);
                    openloading(false);
                    mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });
                });
                // console.log(qrcode)
            }
        },
        //生成带图片的二维码
        print(){
            const el = this.$refs.printMe;
            const options = {
                useCORS: true,
                logging: false
            }
            html2canvas(el,options).then(canvas => {
                this.qrcode=canvas.toDataURL()
                // this.qrcode_show=true;
                openloading(false);
                this.QRCode_box=true;
            },{useCORS: true});
        },
        //关闭二维码
        close_1(){
            this.QRCode_box=false
        },
        //进入店铺
        toshop(){
            this.$router.push('/BusinessDetails?shopid='+this.commodity.shopid);
        },
        //根据Id查询店铺
        get_shop(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/findByShopid/'+this.commodity.shopid
            }).then(x=>{
                console.log('根据Id查询店铺信息',x);
                this.shop=x.data.data;
            }).catch(err=>{
                console.log(err);
            })
        },
        添加访问记录(){
            var obj={
                    commodityid:this.id,
                    userid:this.userInfo.username    
                }
            this.$axios.post('/api-s/shops/addCommodityPopularity',obj).then(x=>{
                console.log('添加人气',x)
            }).catch(err=>{})
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
        this.id=this.$route.query.id;
        //查询单个商品
        this.get_commodity();
        this.商品查询专享(this.id).then(x=>{
            console.log('查询专享',x);
            if(x.data.code==200){
                if(x.data.data.length>0){
                    this.专享=x.data.data[0]
                }
            }
        }).catch(err=>{
            console.log('查询专享失败',err)
        })
        this.isshop=this.$route.query.isshop ? false : true;
        
        try {
            this.userInfo=JSON.parse(localStorage.userInfo)
        } catch (error) {}

        //查询收藏
        if(this.userInfo){
            this.get_findDataUserFavorite();
            this.添加访问记录()
        }

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
                if(this.img_list.length>1){
                    this.getswiper();
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-bar-nav{
    box-shadow: none;
}
.mui-bar{
    // background-color: rgba(255,255,255,0.3);
    background-color:rgba(88, 88, 88, 0.5);
    
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
    padding-top: 0px;
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
    .danwei{
        font-size: 12px;
        color: #424242;
        margin: 0px 0px 0px 5px;
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
        .专享{
            margin: 0px 0px 0px 7px;
            padding: 0px 3px;
            border: 1px solid #e33c64;
            border-radius: 2px;
            height: 13px;
            line-height: 11px;
            font-size: 8px;
            color: #e33c64;
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

.box_7{
    background-color: rgba(255, 255, 255, 1);
    height: 44px;
    display: flex;
    padding: 0px 12px;
    align-items: center;
    margin: 3px 0px 0px;
    img{
        width: 32px;
    	height: 24px;
        margin: 0px 5px 0px 0px;
    }
    >li:nth-child(1){
        flex-grow: 1;
        display: flex;
        align-items: center;
    }
    >li:nth-child(2){
        width: 60px;
    	height: 24px;
        text-align: center;
        border-radius: 24px;
        border: 1px solid #589ce9;
        font-size: 10px;
        line-height: 22px;
        color: #589ce9;
    }
    .shopname{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
    .pingfen{
        color: rgba(212, 48, 48, 1);
    	font-size: 10px;
        margin: 0px 0px 0px 3px;
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
    >li:nth-child(1),
    >li:nth-child(2){
        position: relative;
        width: 0.64rem;
        text-align: center;
        background-color: rgba(24, 169, 104, 1);
        color: #ffffff;
        font-size: 14px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        i{
            font-size: 18px;
        }
        .shoucang{
            color: #f56827;
        }
        >div{
        	font-size: 10px;
        }
    }
    >li:nth-child(1)::after{
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        width: 1px;
    	height: 16px;
        background: #ffffff;
        content: "";
    }
    >li:nth-child(3){
        color: rgba(255, 255, 255, 1);
	    background-color: #f56827;
    	font-size: 14px;
        line-height: 44px;
        text-align: center;
        flex-grow: 1;
    }
}



.QRCode.content{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    .content_1{
        padding: 0px
    }
}
.QRCode.rongqi{
    position: fixed;
    // width: 100%;
    left: -100%;
    // bottom: 50px;
}
.QRCode{
    
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
        padding: 7px 9px 17px;
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
        .img_box1{
            img{
                width: 100%;
            }
        }
        .title_2{
            display: flex;
            align-items: center;
            font-size: 12px;
            margin: 0px 0px 7px 0px;
            img{
                width: 27px;
            	height: 27px;
                border-radius: 6px;
                margin: 0px 6px 0px 0px;
            }
            .text_1{
                color: #d43030;
            }
            .text_2{
                color: #a6a6a6;
            }
        }
        .img_box{
            height: 174px;
            margin: 0px 0px 10px 0px;
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
            justify-content: space-between;
            align-items: center;
            .erweima_box{
                flex-shrink: 0;
                width: 80px;
                margin: 0px 8px 0px 0px;
                img{
                    width: 100%;
                }
            }
            .sellingPrice{
                color: rgba(212, 48, 48, 1);
                font-size: 19px;
                margin: 0px 5px 0px 0px;
            }
            .marketPrice{
                color: rgba(166, 166, 166, 1);
            	font-size: 12px;
                margin: 0px 5px 0px 0px;
            }
            .danwei{
                color: #333333;
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


