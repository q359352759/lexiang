<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">我的订单</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>
                    <span @click="select_type(0)" :class="{'active':type==0}">全部</span> 
                </li>
                <li>
                    <span @click="select_type(1)" :class="{'active':type==1}">待付款</span>
                </li>
                <li>
                    <span @click="select_type(2)" :class="{'active':type==2}">待发货</span>
                </li>
                <li>
                    <span @click="select_type(3)" :class="{'active':type==3}">待收货</span>
                </li>
                <li>
                    <span @click="select_type(4)" :class="{'active':type==4}">待评价</span>
                </li>
                <li>
                    <span @click="select_type(5)" :class="{'active':type==5}">售后</span>
                </li>
            </ul>

            <div class="box_2" v-for="(item, index) in 3" :key="index">
                <ul class="header">
                    <li class="daipingjia mui-pull-right">
                        待评价
                    </li>
                    <li class="shop">
                        <i class="icon_shop icon iconfont icon-jinrudianpu"></i>
                        <span>mc火锅店</span>
                        <i class="icon_right mui-icon mui-icon-arrowright"></i>
                    </li>
                </ul>
                <ul class="shangpng">
                    <li v-for="(item, index) in 2" :key="index">
                        <div class="img_box">
                            <img src="image/43.png" alt="" srcset="">
                        </div>
                        <div class="text_box">
                            <div class="name">
                                毛肚
                                <span class="shuliang mui-pull-right">x2</span>
                            </div>
                            <div>￥18</div>
                            <div>红包抵扣：8元</div>
                        </div>
                        <div class="zhuanxiang">
                            <img src="image/xingren.png" alt="" srcset="">
                        </div>
                    </li>
                </ul>
                <ul class="footer">
                    <li class="text_1">共计3个商品，合计94元，优惠18元。</li>
                    <li class="btn_1 quxiao">取消</li>
                    <li @click="order()" class="btn_1 zhifu">支付</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data(){
        return{
            type:0,
        }
    },
    methods:{
        select_type(x){
            this.type=x;
        },
        order(){
            this.$router.push('/orders/order');
        }
    }
}
</script>

<style lang="scss" scoped>
.box_1{
    display: flex;
    text-align: center;
    line-height: 38px;
    background: #ffffff;
    background-color: rgba(255, 255, 255, 1);
	font-size: 14px;
    >li{
        width: calc(100% / 6);
    }
    span{
        display: inline-block;
        padding: 0px 3px;
    }
    span.active{
        border-bottom: 2px solid #007aff;
    }
}

.box_2{
    background: #ffffff;
    margin: 3px 0px 0px;
    .header{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
        padding: 0px 10px;
        border-bottom: 1px solid rgba(246, 246, 246, 1);
        // display: flex;
        height: 30px;
        line-height: 30px;
        .shop{
            display: flex;
            align-items: center;
        }
        .icon_shop{
            color: #e86434;
            font-size: 20px;
            margin: 0px 5px 0px 0px;
        }
        .icon_right{
            font-size: 12px;
        }
        .daipingjia{
            color: #505050;
        }
    }
    .shangpng{
        padding: 0px 10px;
        border-bottom: 1px solid rgba(246, 246, 246, 1);
        >li{
            border-bottom: 1px solid rgba(246, 246, 246, 1);
            padding: 7px 0px;
            display: flex;
            color: rgba(80, 80, 80, 1);
        	font-size: 12px;
            position: relative;
        }
        >li:last-child{
            border: none;
        }
        .img_box{
            flex-shrink: 0;
            width: 72px;
        	height: 54px;
            margin: 0px 5px 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_box{
            flex-grow: 1;
            .shuliang{
                color: #a6a6a6;
            }
        }
        .zhuanxiang{
            position: absolute;
            width: 20px;
            height: 20px;
            right: 10px;
            bottom: 7px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .footer{
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0px 11px;
        .text_1{
            width: 0;
            flex-grow: 1;
            white-space: nowrap;
            color: rgba(80, 80, 80, 1);
        	font-size: 12px;
        }
        .btn_1{
            width: 55px;
        	height: 20px;
            line-height: 18px;
            text-align: center;
            border-radius: 20px;
            font-size: 12px;
            margin: 0px 0px 0px 10px;
        }
        .quxiao{
            color: rgba(166, 166, 166, 1);
            border:1px solid rgba(166, 166, 166, 1);
        }
        .zhifu{
            color: #007aff;
            border: 1px solid #007aff;
        }
    }
}
</style>


