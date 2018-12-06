<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">买单</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">请选择任意一种付款方式</div>
            
            <ul class="box_2 type_1">
                <li class="icon_box">
                    <i :class="{'active':payment_type==0}" @tap="select_type(0)" class="icon iconfont icon-xuanze1"></i>
                </li>
                <li class="title_1">金额：</li>
                <li class="money">￥</li>
                <li class="input_box money_input">
                    <input type="text">
                    <span class="tishi_1"><span>请输入金额</span></span>
                </li>
                <li @tap="dikou_show(true)" class="title_2">抵扣方式</li>
                <li @tap="dikou_show(true)" class="icon_2"><i class="mui-icon mui-icon-forward"></i></li>
            </ul>

            <ul class="box_2 type_1">
                <li class="icon_box">
                    <i :class="{'active':payment_type==1}" @tap="select_type(1)" class="icon iconfont icon-xuanze1"></i>
                </li>
                <li class="title_1">商品：</li>
                <li @tap="select_shangping()" class="input_box shangPing_box">
                    <!-- <input type="text" placeholder="请输入金额" readonly> -->
                    <span v-if="shuliang==0" class="tishi_2">请选择商品</span>
                    <span v-if="shuliang!=0">已选择：{{shuliang}}件</span>
                </li>
                <li @tap="select_shangping()" class="icon_2"><i class="mui-icon mui-icon-forward"></i></li>
            </ul>

            <ul class="box_2 type_2">
                <li class="title_1">实付金额：</li>
                <li class="money">￥0</li>
                <li class="youhui">已优惠：0</li>
            </ul>
            
            <div class="box_3">
                支&nbsp;&nbsp;付
            </div>
            
            <!-- {{this.$store.state.clientX}}
            {{this.$store.state.shangPing.clientX}} -->

        </div>

        <!-- 输入金额选择抵扣方式 -->
        <div class="dikou" v-show="dikou_box">
            <div class="mask" @tap="dikou_show(false)"></div>
            <ul>
                <li>
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':true}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div class="name">庆典红包</div>
                    <div class="money">-50元</div>
                </li>
                <li>
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':false}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div class="name">庆典红包</div>
                    <div class="money">-50元</div>
                </li>
            </ul>
        </div>

        <PurchaseChoice v-show="PurchaseChoice_show" v-on:ChoiceChange="ChoiceChange" :shopid="shopid"/>

    </div>
</template>

<script>
import PurchaseChoice from '@/components/PurchaseChoice.vue'
// import { mapState, mapGetters } from "vuex";
export default {
    name:"",
    components:{
        PurchaseChoice
    },
    data(){
        return{
            payment_type:0,     //选择金额 选择产品
            dikou_box:false,   //金额选择抵扣
            shopid:'123',
            PurchaseChoice_show:false,  //选择商品
            SelectedCommodities:[],
        }
    },
    computed:{
        shuliang(){
            var n=0;
            this.SelectedCommodities.forEach(item => {
                n+=item.number
            });
            return n;
        }
    },
    methods:{
        ChoiceChange(x){
            console.log(x);
            this.SelectedCommodities=x;
        },
        //选择类型
        select_type(x){
            this.payment_type=x
        },
        //金额选择抵扣
        dikou_show(x){
            this.dikou_box=x
        },
        //选商品
        select_shangping(){
            this.PurchaseChoice_show=true;
            this.$router.push('?shopid='+this.shopid+'&PurchaseChoice_show=1')
            
        },
        test1(x){
            console.log('获取商品测试',x)
        }
    },
    beforeCreate: function() {    
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        var query=this.$route.query;
            this.shopid=query.shopid;
        if(query.PurchaseChoice_show){
            this.PurchaseChoice_show=true;
        }
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted(){
        // this.$store.commit('shangPing/get_shangping',150)
    },
    watch:{
        $route(to,from){
            var query=this.$route.query;
            if(!query.PurchaseChoice_show){
                this.PurchaseChoice_show=false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1{
    height: 38px;
    line-height: 38px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    padding: 0px 10px;
}
.box_2.type_1{
    height: 75px;
}
.box_2.type_2{
    height: 54px;
}
.box_2{
    background: #ffffff;
    padding: 0px 18px 0px 12px;
    display: flex;
    align-items: center;
    margin: 0px 0px 12px 0px;
    .icon_box{
        font-size: 20px;
        margin: 0px 12px 0px 0px;
        height: 20px;
        color: #d0cccc;
        .active{
            color: #1894dc;
        }
    }
    .title_1{
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        white-space: nowrap;
    }
    .input_box{
        position: relative;
        flex-grow: 1;
        input{
            padding: 0px;
            margin: 0px;
            border: none;
            position: relative;
            z-index: 1;
            background: none;
        }
        .tishi_1{
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100%;
            margin: auto;
            color: rgba(166, 166, 166, 1);
            font-size: 14px;
            display: flex;
            align-items: center;
        }
    }
    .money_input{
        input{
            font-size: 18px;
            color:rgba(212, 48, 48, 1);
        }
    }
    .shangPing_box{
        color: rgba(56, 56, 56, 1);
        font-size: 14px;
        .tishi_2{
            color:#a6a6a6;
        }
        input{
            color: rgba(56, 56, 56, 1);
        	font-size: 14px;
        }
    }
    .money{
        color: rgba(212, 48, 48, 1);
        font-size: 26px;
        font-weight: bold;
    }
    .title_2{
        color: rgba(166, 166, 166, 1);
        font-size: 12px;
        white-space: nowrap;
    }
    .icon_2{
        color: rgba(166, 166, 166, 1);
        i{
            font-size: 16px;
        }
    }
    .youhui{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
        text-align: right;
        flex-grow: 1;
    }
}

.box_3{
    width: 175px;
    height: 34px;
    line-height: 34px;
    background: $header_background;
    border-radius: 34px;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    margin: 30px auto;
    text-align: center;
}

.dikou{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 11;
    .mask{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
    }
    >ul{
        position: absolute;
        width: 100%;
        padding: 0px 0px 40px;
        background: #ffffff;
        left: 0px;
        bottom: 0px;
        >li{
            display: flex;
            align-items: center;
            height: 46px;
            padding: 0px 21px;
            border-bottom: rgba(246, 246, 246, 1);
            .radio_1{
                margin: 0px 8px 0px 0px;
            }
            .name{
                flex-grow: 1;
                overflow: auto;
                color: rgba(80, 80, 80, 1);
                font-size: 14px;
            }
            .money{
                color: rgba(212, 48, 48, 1);
            	font-size: 14px;
            }
        }
    }
}

</style>

