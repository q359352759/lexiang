<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">添加专享商品</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li @tap="change_radio_2(0)">
                    <div class="radio_1" :class="{'active':obj.type==0}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span>新人专享</span>
                </li>
                <li @tap="change_radio_2(1)">
                    <div class="radio_1" :class="{'active':obj.type==1}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span>生日专享</span>
                </li>
            </ul>

            <div class="box_2" @tap="select_1()">
                <div class="right_1 mui-pull-right">
                    <i class="mui-icon mui-icon-forward"></i>
                </div>
                <div class="tishi" v-if="!commodity.id">
                    <span>请选择已有商品</span>
                </div>
                <div class="commodity_box" v-if="commodity.id">
                    <div class="img_box">
                        <img v-if="commodity.img && commodity.img.split(',').length>0" :src="commodity.img.split(',')[0]" alt="" srcset="">
                    </div>
                    <div class="text_1">
                        <div class="name">{{commodity.name}}</div>
                        <div class="money">售价：{{commodity.sellingPrice}}元</div>
                        <div class="text_2">可抵扣{{commodity.deduction}}元，佣金{{commodity.commission}}元</div>
                    </div>
                </div>
            </div>
            
            <ul class="box_3">
                <li>
                    <span v-if="obj.type==0">新人可抵扣：</span>
                    <span v-if="obj.type==1">生日可抵扣：</span>
                </li>
                <li class="input_box">
                    <input type="text" v-model.number="obj.deduction" @input="input_change('deduction')">
                </li>
                <li class="text_1">元，即</li>
                <li class="input_box">
                    <input type="text" v-model.number="obj.percentage" @input="input_change('percentage')">
                </li>
                <li class="text_1">%</li>
            </ul>

            <ul class="box_4" v-if="obj.type==0">
                <li>说明：</li>
                <li class="indent_1">
                新人专享商品，可以给店铺拓展客源，是一种促销略！在稳定老顾客的同时增加新客源，让你的店铺生意越来越红火，客源越来越多！
                </li>
                <li class="indent_1">
                请选择利润高的商品，把原有商品可抵扣金额调得更大一些。让新顾客能够感受到与众不同的专享特权，从而实现拓展新顾客的目标！
                </li>
            </ul>
            <ul class="box_4" v-if="obj.type==1">
                <li>说明：</li>
                <li class="indent_1">
                生日专享商品，让顾客感受到你的温暖和体贴，从一个普通顾客转变为一个忠实顾客，通过一次生日专享消费，能够实现顾客在店铺增加多次的消费！
                </li>
                <li class="indent_1">
                通过生日专享商品，提高顾客忠诚度，不仅能实现顾客多次消费，还能实现顾客的转介绍！
                </li>
                <li class="indent_1">
                把已添加的商品，提高红包抵扣金额，让每一个过生日的顾客能够感受到专享购物得特权和优越感。    
                </li>
            </ul>

            <div @click="queding()" class="btn_1">确定</div>
        </div>

        <selectCommodity v-show="ShopClassification_show" v-on:setShow="setShow"/>
    </div>
</template>

<script>
import {openloading} from '@/assets/js/currency.js';
import selectCommodity from '@/components/selectCommodity.vue';
export default {
    name:'',
    components:{
        selectCommodity
    },
    data(){
        return{
            ShopClassification_show:false,
            obj:{
                shopid:'',      //店铺id
                commodityId:'',     //商品id
                type:0,         //0新人 1生日
                typeName:'',    //   
                deduction:'',   //抵扣金额
                percentage:'',
            },
            commodity:{     //商品

            }
        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop
        }
    },
    methods:{
        input_change(x){
            var number_test= /^[0-9]+.?[0-9]*$/;    //可带小数
            if(!this.commodity.sellingPrice || !this.obj[x] || !number_test.test(this.obj[x])){
                if(x=='deduction'){
                    this.obj.percentage='';
                }else{
                    this.obj.deduction='';
                }
                return;
            }
            if(x=='deduction'){     //金额
                this.obj.deduction=Math.floor(this.obj.deduction*100)/100;
                var percentage=this.obj.deduction/this.commodity.sellingPrice*100
                this.obj.percentage=Math.floor(percentage*10)/10;
            }
            if(x=='percentage'){    //百分比
                this.obj.percentage= Math.floor(this.obj.percentage*10)/10;
                var deduction=this.obj.percentage/100*this.commodity.sellingPrice
                this.obj.deduction=Math.floor(deduction*100)/100;
            }
        },
        //点击确定
        queding(){
            var number_test= /^[0-9]+.?[0-9]*$/;    //可带小数
            if(!this.commodity || !this.commodity.id){
                mui.toast('请选择商品。', { duration: "long",type: "div" });
                return
            }else if(!number_test.test(this.obj.deduction)){
                mui.toast('请输入抵扣金额。', { duration: "long",type: "div" });
                return;                
            }else if(this.obj.deduction<=this.commodity.deduction){
                mui.toast('抵扣金额需大于商品抵扣金额。', { duration: "long",type: "div" });
                return;
            }else if(this.obj.deduction>this.commodity.sellingPrice*0.9){
                mui.toast('抵扣金额不能大于商品金额的90%。', { duration: "long",type: "div" });
                return;
            }
            this.obj.shopid=this.myshop.shopid;
            this.obj.commodityId=this.commodity.id;
            this.obj.typeName=this.obj.type==0 ? '新人专享': '生日专享';
            console.log(this.obj);
            this.$axios({
                method:'post',
                url:'/api-s/shops/addShopExclusive',
                data:this.obj
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    mui.toast('添加成功。', { duration: "long",type: "div" });
                    history.back();            
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err);
                mui.toast('系统错误，稍后再试。', { duration: "long",type: "div" });
            })
        },
        //选择商品
        select_1(){
            this.ShopClassification_show=true;
            this.$router.push('?ShopClassification_show=1')
        },
        //选择类型
        change_radio_2(x){
            this.obj.type=x;
        },
        //接受商品
        setShow(x){
            console.log('收到参数',x);
            history.back()
            if(x){
                this.commodity=x;
                // this.obj.deduction=x.deduction
                // this.input_change('deduction')
            }
        }
    },
    mounted(){
        if(!this.myshop || !this.myshop.shopid){
            //获取我的店铺
            this.$store.commit('setMyshop');
        }
    },
    watch:{
        $route(to,from){
            var query=this.$route.query;
            if(!query.ShopClassification_show){
                this.ShopClassification_show=false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';
.box_1{
    background: #ffffff;
    height: 44px;
    position: relative;
    display: flex;
    >li{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        >span{
            margin: 0px 0px 0px 5px;
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
    }
    >li:nth-child(1){
        border-right: 1px solid #efeff4;
    }
}

.box_2{
    position: relative;
    background: #ffffff;
    margin: 3px 0px 0px;
    height: 75px;
    padding: 7px 9px;
    .tishi{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(0, 122, 255, 1);
    	font-size: 14px;
    }
    .commodity_box{
        height: 100%;
        display: flex;
        .img_box{
            margin: 0px 8px 0px 0px;
            width: 83px;
        	height: 62px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_1{
            display: flex;
            flex-direction: column;
            justify-content:space-between;
            .name{
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
            }
            .money{
                color: rgba(128, 128, 128, 1);
            	font-size: 12px;
            }
            .text_2{
                color: rgba(166, 166, 166, 1);
            	font-size: 12px;
            }
        }
    }
    .right_1{
        position: absolute;
        top: 0px;
        right: 0px;
        display: flex;
        height: 100%;
        align-items: center;
        color: #c0bcbc;
    }
}

.box_3{
    padding: 0px 17px;
    height: 44px;
    background: #ffffff;
    margin: 3px 0px 0px;
    display: flex;
    align-items: center;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    white-space: nowrap;
    .text_1{
        padding: 0px 8px;
    }
    .input_box{
        flex-shrink: 1;
        flex-grow: 1;
        width: 87px;
    	height: 30px;
        background-color: rgba(229, 229, 229, 1);
        input{
            font-size: 14px;
            text-align: center;
            margin: 0px;
            padding: 0px;
            height: 100%;
            background: none;
            border: none;
        }
    }
}
.box_4{
    padding: 12px 16px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    .indent_1{
        text-indent: 20px;
    }
}

.btn_1{
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: $header_background;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    position: fixed;
    left: 0px;
    bottom: 0px;
}
</style>


