<template>
    <div id="Hongbaoerwima">
        <div class="Shenchengerweima" ref="printMe">
            <div class="header_1">
                <div class="img_box">
                    <img src="image/WechatIMG311.png" alt="" srcset="">
                </div>
                <div class="text_1">红包乐购</div>
                <div class="text_2">（红包促销购物平台）</div>
            </div>
            <div class="hong_box">
                <div class="banyuan"></div>
                <!-- 可以装下12个字 -->
                <div class="title_1">
                    <span v-if="hongbao.type==0">店铺新人红包</span>
                    <span v-if="hongbao.type==1">{{shangping.name}}</span>
                    <span v-if="hongbao.type==2">节日红包</span>
                    <span v-if="hongbao.type==3">签到红包</span>
                    <span v-if="hongbao.type==4">庆典红包</span>
                    <span v-if="hongbao.type==5">生日红包</span>
                     <!-- 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                </div>
                <div class="money">
                    <span>{{hongbao.amount}}</span>
                    <span>元</span>
                </div>
                <div class="img_box">
                    <img :src="base64" alt="" srcset="">
                </div>
                <div class="text_1">
                    <div v-if="hongbao.type!=1">
                        <span v-if="hongbao.deductionType==1">每满{{hongbao.expire}}减{{hongbao.deduction}}元</span>
                        <span v-if="hongbao.deductionType==0">可抵扣{{hongbao.percentage}}</span>
                    </div>
                    <div v-if="hongbao.type==1">
                        <span>{{hongbao.startTime | filter_time}}-{{hongbao.endTime | filter_time}}</span>
                    </div>
                </div>
            </div>
            <div class="footer_1">
                <div class="text_1">{{shop.name}}</div>
                <div class="erweima_box" ref="erweima">
                    <!-- <img :src="erweima_url" alt="" srcset=""> -->
                </div>
                <div class="text_2">长按识别二维码，领取红包</div>
            </div>
        </div>
        <!-- 展示的容器 -->
        <div class="Rongqi" v-show="Rongqi">
            <div class="cont_1">
                <div class="close_1" @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                <img :src="jietu_url" alt="">
            </div>
        </div>
    </div>
</template>

<script>

import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'

import { dateFtt ,openloading} from "@/assets/js/currency.js";
import { mapGetters, mapActions } from 'vuex';
export default {
    props:{
        //显示隐藏
        RongqiShow:{
            default:false
        },
        //红包
        hongbao:{
            default:{}
        },
        new:{
            default:false,
        }
    },
    name:'',
    data () {
        return {
            Rongqi:false,   //显示框
            jietu_url:'',   //截图地址
            shangping:{},
            erweima_url:'', 
            base64:'',      //服务器返回的base64
        }
    },
    computed: {
        ...mapGetters({
            shop:'shop/shop'
        })
    },
    filters:{
        filter_time(time){
            if(!time){
                return time;
            }
            return dateFtt(time,"yyyy.MM.dd")
        }
    },
    methods: {
        ...mapActions({
            get_shop:'shop/get_shop',       //获取店铺
            get_shangping_2:'shangPing/get_shangping_2'     //获取商品
        }),
        close_1(){
            this.Rongqi=false
        },
        init(){
            //生成新的二维码
            if(this.new || !this.base64){
                this.start();
            }else if(!this.new && !this.base64){
                this.start();
            }else{
                this.Rongqi=true;
            }
        },
        start(){
            openloading(true);
            if(this.hongbao && this.hongbao.type!=1){
                //不是商品红包
                this.get_shop(this.hongbao.shopid).then(x=>{
                    console.log('获取店铺')
                    this.imgtobase64(this.shop.signboard).then(x=>{
                        this.shengcheng_erweima();
                    }).catch(err=>{})
                }).catch(err=>{})
            }else if(this.hongbao && this.hongbao.type==1){
                Promise.all([this.get_shop(this.hongbao.shopid),this.get_shangping_2(this.hongbao.commodityId)]).then(x=>{
                    console.log(x);
                    this.shangping=x[1].data.data;
                    this.imgtobase64(this.shangping.img.split(',')[0]).then(x=>{
                        this.shengcheng_erweima();
                    }).catch(err=>{})
                })
            }
        },
        //获取图片base64
        imgtobase64(imgurl){
            return new Promise((resolve, reject) => {
                this.$axios({
                    method:'post',
                    url:'/api-u/users/imgtobase64',
                    data: this.$qs.stringify({url:imgurl})
                }).then(x=>{
                    if(x.data.code==200){
                        this.base64='data:image/jpeg;base64,'+x.data.data;
                        resolve()
                    }else{
                        openloading(false);
                        mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });
                        reject()                 
                    }
                }).catch(err=>{
                    openloading(false);
                    mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });
                    reject()
                })
            });
        },
        //生成二维码
        shengcheng_erweima(){
            // console.log('生成二维码');
            var url=window.location.origin+window.location.pathname+'#/BusinessDetails?shopid='+this.shop.shopid+'&fenxiang=1&hongbaoid='+this.hongbao.id;
            console.log(url);
            var el=this.$refs.erweima
                el.innerHTML='';
                let erweima = new QRCode(el, {  
                        width: 100,  
                        height: 100, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                        text: url, // 二维码内容  
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                        background: '#fff',
                        foreground: '#fff',
                    })
                setTimeout(()=>{
                    this.print();
                },500)
        },
        //开始截图
        print(){
            const el = this.$refs.printMe;
            const options = {
                useCORS: true,
                logging: false
            }
            html2canvas(el,options).then(canvas => {
                this.jietu_url=canvas.toDataURL();
                this.Rongqi=true;
                openloading(false);
            });
        },
    },
    mounted () {
        // console.log('红包',this.hongbao);
    },
    watch: {
        RongqiShow(){
            this.init();
        }
    }
}
</script>

<style lang="scss" scoped>
.Shenchengerweima{
    width: 250px;
    padding: 7px 8px;
    background: #ffffff;
    position: fixed;
    left: -100%;
    .header_1{
        display: flex;
        align-items: center;
        .img_box{
            font-size: 0px;
            width: 27px;
            height: 27px;
            margin: 0px 5px 0px 0px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
        }
        .text_1{
            color: rgba(212, 48, 48, 1);
        	font-size: 12px;
        }
        .text_2{
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
        }
    }
    .hong_box{
        width: 148px;
        background: #f18a8a;
        border-radius: 5px;
        margin: 22px auto 16px;
        color: #ffffff;
        text-align: center;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        .banyuan{
            position: absolute;
            left: -50%;
            top: -160px;
            width: 200%;
            height: 200px;
            border-radius: 100%;
            background: #f55e5e;
        }
        .title_1{
            position: relative;
            z-index: 1;
            padding: 10px 0px 0px;
        }
        .money{
            margin: 20px 0px 0px;
            >span:nth-child(1){
                font-size: 22px;
            }
            >span:nth-child(2){
                font-size: 12px;
            }
        }
        .img_box{
            font-size: 0px;
            width: 82px;
            height: 62px;
            margin: 0px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_1{
            font-size: 10px;
            padding: 10px 0px;
        }
    }
    .footer_1{
        text-align: center;
        .text_1{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .erweima_box{
            width: 50px;
            height: 50px;
            margin: 3px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_2{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
    }
}

.Rongqi{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    .cont_1{
        width: 250px;
        background: #ffffff;
        position: relative;
        .close_1{
            position: absolute;
            width: 36px;
            height: 36px;
            font-size: 17px;
        	color: rgba(153, 153, 153, 1);
            background-color: rgba(255, 255, 255, 1);
            border-radius: 100%;
            right: 0px;
            top: -56px;
            text-align: center;
            line-height: 36px;
        }
        .close_1::after{
            position: absolute;
            top: 36px;
            left: 50%;
            width: 1px;
            height: 20px;
            content: "";
            background: #ffffff;
        }
        img{
            width: 100%;
        }
    }
}

</style>

<style lang="scss">
#Hongbaoerwima .erweima_box{
    img{
        width: 100%;
        height: 100%;
    }
}
</style>






