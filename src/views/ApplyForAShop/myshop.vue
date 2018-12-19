<template>
    <div id="myshop">
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @tap="back_1()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{myshop.name}}</h1>
            <span class="erweima mui-pull-right " @tap="qrcode_1()"><i class="icon iconfont icon-31erweima"></i></span>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li @tap="ShopDetails()">
                    <img :src="myshop.signboard" alt="" srcset="">
                    <div>编辑店铺</div>
                </li>
                <li>
                    <h1>{{myshop.address}}</h1>
                    <h2>营业时间：{{myshop.openTime}}--{{myshop.closeTime}}</h2>
                    <h3>联系电话：{{myshop.phone}}</h3>
                </li>
                <li>
                    <i class="icon iconfont icon-kefunv"></i>
                </li>
            </ul>

            <ul class="box_2">
                <li>
                    <div @tap="shopVip()"><i class="icon iconfont icon-huiyuan1"></i></div>
                    <div>会员</div>
                </li>
                <li>
                    <div @click="commodity()"><i class="icon iconfont icon-shangping"></i></div>
                    <div @click="commodity()">商品</div>
                </li>
                <li>
                    <div @click="fenxiao()"><i class="icon iconfont icon-distribute"></i></div>
                    <div @click="fenxiao()">分销</div>
                </li>
                <li>
                    <div @click="xiaoshou()"><i class="icon iconfont icon-leijixiaoshoue"></i></div>
                    <div @click="xiaoshou()">销售</div>
                </li>
                <li>
                    <div @tap="Marketing()"><i class="icon iconfont icon-laba2"></i></div>
                    <div @tap="Marketing()">营销</div>
                </li>
            </ul>
            <ul class="box_2">
                <li>
                    <div  @tap="Notice()"><i class="icon iconfont icon-laba"></i></div>
                    <div>公告</div>
                </li>
                <li>
                    <div @tap="introduction()"><i class="icon iconfont icon-jianjie"></i></div>
                    <div>简介</div>
                </li>
                <li>
                    <div @tap="albumManagement()"><i class="icon iconfont icon-xiangce"></i></div>
                    <div>相册</div>
                </li>
                <li>
                    <div @tap="commentList()"><i class="icon iconfont icon-pinglun"></i></div>
                    <div>评论</div>
                </li>
                <li>
                    <div><i class="icon iconfont icon-icon_dianyuanguanli"></i></div>
                    <div>店员</div>
                </li>

            </ul>

            <div class="box_3">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div class="mui-pull-right">
                                    共计：0人
                                </div>
                                <div>今日新增会员：0人</div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div class="mui-pull-right">
                                    共计：0人
                                </div>
                                <div>
                                    待审核分销员：0人
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div class="mui-pull-right">
                                本月：0元
                                </div>
                                <div>
                                    今日营业额：0元
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell" @click="tixian()">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div class="mui-pull-right tixian">
                                提现
                                </div>
                                <div>
                                    可提现金额：0元
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right">
                            <div class="cont_1">
                                <div>
                                    本月群发：0条
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>    
            </div>
            

            <!-- 生成带图片的容器 -->
            <div ref="printMe" class="qrcode_box">
                <div class="header_1">
                    <div class="img_box">
                        <img v-if="erweima_base64" :src="erweima_base64" alt="" srcset="">
                    </div>
                    <div class="text_1" ref="zoom_box">
                        <div ref="fontsize_1">{{myshop.name}}</div>
                        <div ref="fontsize_2">{{myshop.address}}</div>
                    </div>
                </div>
                <div class="erweima">
                    <img v-if="erweima_base64" :src="erweima_base64" alt="">
                    <div ref="qrcode">
                        <!-- <img src="" alt="" srcset=""> -->
                    </div>
                </div>
                <ul class="footer_1">
                    <li>恭候尊驾，这厢有礼！</li>
                    <li>识别二维码领取<span class="hongbao">{{xingren_hongbao.amount}}</span>红包</li>
                </ul>
            </div>
            
            <div class="QRCode" v-show="qrcode_show" @tap="qrcode_show=false">
                <div class="mask"></div>
                <div class="content_1">
                    <div class="close_1">
                        <div @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                        <div></div>
                    </div>
                    <img :src="qrcode" alt="" srcset="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// html2canvas
import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2';
import {openloading} from '@/assets/js/currency.js';
import $ from "jquery"
export default {
    name:'',
    data(){
        return{
            qrcode:null,
            qrcode_show:false,
            erweima_base64:'',
            xingren_hongbao:{}
        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop
        }
    },
    methods: {
        //跳转销售
        xiaoshou(){
            this.$router.push('/myshop/xiaoshou/xiaoshou');
        },
        //提现
        tixian(){
            this.$router.push('/myshop/WithdrawMoney');
        },
        //跳转店铺会员
        shopVip(){
            this.$router.push('/myshop/Member/MemberList');
        },
        //跳转会员评论
        commentList(){
            this.$router.push('/myshop/comment/commentList')
        },
        //跳转分销
        fenxiao(){
            this.$router.push('/myshop/distribution/ApplicationDistribution')
        },
        //跳转店铺简介
        introduction(){
            this.$router.push('/introduction');
        },
        //跳转
        Notice(){
            this.$router.push('/Notice')
        },
        //跳转营销
        Marketing(){
            this.$router.push('/Marketing')
        },
        //
        back_1(){
            this.$router.push('/my')
        },
        close_1(){
            this.qrcode_show=false;
        },
        //动态设置字体大小
        set_font_size(e,size){
            console.log(e.clientWidth);
            console.log(e.offsetWidth)
            console.log(e.scrollWidth)
            if(e.clientWidth<e.scrollWidth){
                e.style['font-size']=parseInt(e.clientWidth/e.scrollWidth*size)+'px';
            }
        },
        set_zoom(e){
            console.log(e.children);
            var w=e.offsetWidth;
            var max_w=0;
            var list=e.children;
            for(var i=0;i<list.length;i++){
                if(list[i].offsetWidth>max_w){
                    max_w=list[i].offsetWidth
                }
            }
            console.log(w,max_w);
            if(w<max_w){
                for(var i=0;i<list.length;i++){
                    list[i].style.zoom=w/max_w;
                }
            }
        },
        //生成二维码
        qrcode_1(){
            console.log('生成二维码');
            if(this.qrcode){
                this.qrcode_show=true;
            }else{
                // this.set_zoom(this.$refs.zoom_box)
                // return
                this.set_font_size(this.$refs.fontsize_1,14)
                this.set_font_size(this.$refs.fontsize_2,12)
                // return;
                openloading(true);
                //图片地址转图片
                this.$axios({
                    method:'post',
                    url:'/api-u/users/imgtobase64',
                    data: this.$qs.stringify({
                        url:this.myshop.signboard
                    })
                }).then(x=>{
                    console.log(x);
                    if(x.data.code==200){
                        this.erweima_base64='data:image/jpeg;base64,'+x.data.data;
                        var url=window.location.origin+window.location.pathname+'#/BusinessDetails?shopid='+this.myshop.shopid+'&index=1';
                        var el=this.$refs.qrcode
                            el.innerHTML='';
                        let qrcode = new QRCode(el, {  
                            width: 200,  
                            height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                            // text: 'http://m.lxad.vip/test/dist/index.html#/BusinessDetails?id='+this.myshop.id, // 二维码内容  
                            text: url, // 二维码内容  
                            // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                            background: '#fff',
                            foreground: '#fff',
                        })
                        setTimeout(()=>{
                            this.print();
                        },500)
                    }else{
                        openloading(false);
                        mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });                    
                    }
                }).catch(err=>{
                    openloading(false);
                    mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });
                    console.log(err);
                })
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
                this.qrcode_show=true;
                openloading(false);
            },{useCORS: true});
        },
        //跳转相册管理
        albumManagement(){
            this.$router.push('/albumManagement');
        },
        //跳转店铺详情
        ShopDetails(){
            this.$store.state.in_index=0
            this.$router.push('/ShopDetails')
        },
        //跳转商品管理
        commodity(){
            this.$router.push('/commodity');
        },
        //查询店铺新人
        get_hongbao(){
            var query={
                    start:0,
                    length:10,
                    ccc:1,
                    type:0,
                    shopid:this.myshop.shopid
                }
            this.$request('/api-s/shops/redenvelope/findAll',query,'get').then(x=>{
                console.log('查询店铺新人红包',x);
                if(x.data.code==200){
                    if(x.data.data.data.length>0){
                        this.xingren_hongbao=x.data.data.data[0]
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    beforeCreate: function() {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        // var a=[];
        //     a[0]='ssssssss';
        //     console.log(typeof a[0])
        //根据店铺查询店铺新人红包
        if(this.myshop && this.myshop.shopid){
            this.get_hongbao()
        }else{
            this.$store.commit('setMyshop');
        }
    },
    activated(){
        console.log(11111111);
        this.getType=0;
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
        // document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        myshop(){
            if(this.myshop && this.myshop.shopid){
                this.get_hongbao()
            }
        }
        // img_list() {
        //     this.$nextTick(function() {
        //         console.log("数据渲染完成");
        //         this.getswiper();
        //     });
        // }
    }
}
</script>

<style lang="scss">
#myshop .qrcode_box{
    width: 273px;
    background:#ffffff;
    position: fixed;
    padding: 20px 25px;
    left: -100%;
    // top: 40px;
    .header_1{
        display: flex;
        .img_box{
            width: 42px;
        	height: 42px;
            flex-shrink: 0;
            margin: 0px 5px 0px 0px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .text_1{
            height: 42px;
            width: 0;
            flex-grow: 1;
            color: rgba(80, 80, 80, 1);
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            >div:nth-child(1){
                font-size: 14px;
                overflow: auto;
                white-space: nowrap;
                width: 100%;
            }
            >div:nth-child(2){
                font-size: 12px;
                white-space: nowrap;
                overflow: auto;
                color: #afafaf;
                width: 100%;
            }
        }
    }
    .erweima{
        margin: 20px auto 8px;
        width: 200px;
        height: 200px;
        position: relative;
        >img{
            position: absolute;
            width: 50px;
            height: 50px;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            margin: auto;
            border-radius: 10px;
        }
        >div{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .footer_1{
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        text-align: center;
        .hongbao{
            color: #d43030;
        }
    }
}
</style>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

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
        >img{
            width: 100%;
        }
        position: relative;
        z-index: 1;
        background: #ffffff;
        width: 270px;
        // padding: 17px 25px 15px 25px;
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
    }
}

.erweima{
    color:#ffffff;
    line-height: 44px;
    font-size: 20px;
}
.box_1{
    display: flex;
    padding: 0.1rem;
    background: #ffffff;
    margin:0px 0px 5px;
    li:nth-child(1){
        width: 0.6rem;
        height: 0.6rem;
        position: relative;
        flex-shrink: 0;
        img{
            width: 100%;
            height: 100%;
        }
        div{
            position:absolute;
            width: 100%;
            background: rgba(153, 153, 153, 0.6);
            color: #ffffff;
            left: 0px;
            bottom: 0px;
            font-size:0.1rem;
            text-align: center;
        }
    }
    li:nth-child(2){
        width: 0;
        flex-grow: 1;
        margin: 0px 0.1rem;
        h1{
            font-weight: 400;
            color: rgba(56, 56, 56, 1);
            font-size: 0.12rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        h2{
            font-weight:400;
            color: rgba(56, 56, 56, 1);
        	font-size: 0.12rem;
        }
        h3{
            font-weight: 400;
            color: rgba(56, 56, 56, 1);
        	font-size: 0.12rem;
        }
    }
    li:nth-child(3){
        flex-shrink: 0;
        font-size:0.3rem;
        color: #1c94d8;
        line-height: 0.6rem;
    }
}
.box_2{
    display: flex;
    text-align: center;
    background: #ffffff;
    padding: 8px 0px 5px;
    >li{
        width: 20%;
        >div:nth-child(1){
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 100%;
            color: #ffffff;
            background: $header_background;
            line-height: 0.35rem;
            margin: 0px auto 5px;
        }
        >div:nth-child(2){
            color: #505050;
            font-size: 0.12rem;
        }
    }
}
.box_3{
    margin: 5px 0px 0px;
    color: #505050;
    font-size: 0.12rem;
    .cont_1{
        padding-right:0.25rem;
    }
    .tixian{
        color: #1c94d8;
    }
}
</style>