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
                    <div>店铺详情</div>
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
                    <div><i class="icon iconfont icon-huiyuan"></i></div>
                    <div>会员</div>
                </li>
                <li>
                    <div @click="commodity()"><i class="icon iconfont icon-shangping"></i></div>
                    <div @click="commodity()">商品</div>
                </li>
                <li>
                    <div><i class="icon iconfont icon-distribute"></i></div>
                    <div>分销</div>
                </li>
                <li>
                    <div><i class="icon iconfont icon-leijixiaoshoue"></i></div>
                    <div>销售</div>
                </li>
                <li>
                    <div @tap="Marketing()"><i class="icon iconfont icon-laba"></i></div>
                    <div @tap="Marketing()">营销</div>
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
                    <li class="mui-table-view-cell">
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
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right" @tap="albumManagement()">
                            <div class="cont_1">
                                <div>
                                    相册管理
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
                        <img src="image/kaifazhong.png" alt="" srcset="">
                    </div>
                    <div class="text_1">
                        <div>
                            七福徕.牛排海鲜自助
                        </div>
                        <div>
                            四川省成都市武侯区武青一路10号
                        </div>
                    </div>
                </div>
                <div class="erweima">
                    <img src="image/bg_2.png" alt="" srcset="">
                    <div ref="qrcode">
                        <!-- <img src="" alt="" srcset=""> -->
                    </div>
                </div>
                <ul class="footer_1">
                    <li>恭候尊驾，这厢有礼！</li>
                    <li>识别二维码领取<span>20</span>红包</li>
                </ul>               
            </div>
            
            <div class="canvas" v-show="qrcode_show" @tap="qrcode_show=false">
                <img :src="qrcode">
            </div>
        </div>
    </div>
</template>

<script>
// html2canvas
import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
export default {
    name:'',
    data(){
        return{
            qrcode:null,
            qrcode_show:false,

        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop
        }
    },
    methods: {
        //跳转营销
        Marketing(){
            this.$router.push('/Marketing')
        },
        //
        back_1(){
            this.$router.push('/my')
        },
        //生成二维码
        qrcode_1(){
            console.log('生成二维码');
            if(this.qrcode){
                this.qrcode_show=true;
            }else{
                var el=this.$refs.qrcode
                    el.innerHTML='';
                let qrcode = new QRCode(el, {  
                    width: 200,  
                    height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                    text: '这里是地址', // 二维码内容  
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                    background: '#fff',
                    foreground: '#fff',
                })
                setTimeout(()=>{
                    this.print();
                },500)
            }
            
            // console.log(qrcode)
        },
        //生成带图片的二维码
        print(){
            const el = this.$refs.printMe;
            const options = {
                type: 'dataURL'
            }
            html2canvas(el).then(canvas => {
                // document.getElementById('canvas').appendChild(canvas)
                this.qrcode=canvas.toDataURL()
                this.qrcode_show=true;
                // console.log('生成的图片',canvas)
                // console.log(canvas.toDataURL())
            });
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
        this.$store.commit('setMyshop');
        var a=[];
            a[0]='ssssssss';
            console.log(typeof a[0])

    },
    activated() {
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
    .header_1{
        display: flex;
        .img_box{
            width: 42px;
        	height: 42px;
            flex-shrink: 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_1{
            width: 0;
            flex-grow: 1;
            text-align: center;
            color: rgba(80, 80, 80, 1);
            >div:nth-child(1){
                font-size: 14px;
            }
            >div:nth-child(2){
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
    }
}
</style>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
///
.canvas{
    position: fixed;
    width:100%;
    height: 100%;
    background:rgba(0,0,0,0.5);
    top:0px;
    left: 0px;
    z-index:10;
    display: flex;
    justify-content: center;
    align-items: center;
    >img{
        max-width: 80%;
        width: 273px;
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
    margin: 5px 0px 0px;
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




