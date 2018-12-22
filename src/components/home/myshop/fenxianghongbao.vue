<template>
    <div class="Xinrenhongbao">
        <div class="cont_1">
            <div class="close" @click="guanbi()">
                <i class="icon iconfont icon-quxiao"></i>
            </div>
            <div class="cont_2" @click="lignqu()">
                <div class="banyuan"></div>
                <div class="title_1">
                    <!-- 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                    <span v-if="hongbao.type==0">店铺新人红包</span>
                    <span v-if="hongbao.type==1">{{shangping.name}}</span>
                    <span v-if="hongbao.type==2">节日红包</span>
                    <!-- <span v-if="hongbao.type==3">签到红包</span> -->
                    <span v-if="hongbao.type==4">庆典红包</span>
                    <!-- <span v-if="hongbao.type==5">生日红包</span> -->
                </div>
                <div class="lingqu">领取</div>
                <div class="money">
                    <span>{{hongbao.amount}}</span>
                    <span>元</span>
                </div>
                <div class="img_box">
                    <img v-if="hongbao.type!=1" :src="shop.signboard" alt="" srcset="">
                    <img v-if="shangping.img && shangping.img.split(',').length>0" :src="shangping.img.split(',')[0]" alt="">
                </div>
                <div class="text_1">
                    <div v-if="hongbao.type!=1">
                        <span v-if="hongbao.deductionType==1">每满{{hongbao.expire}}减{{hongbao.deduction}}元</span>
                        <span v-if="hongbao.deductionType==0">可抵扣{{hongbao.percentage}}</span>
                    </div>
                    <div v-if="hongbao.type==1">
                        <span>{{hongbao.startTime | filter_time}}-{{hongbao.endTime | filter_time}}</span>
                    </div>
                    <!-- <span v-if="hongbao.deductionType==0">可抵扣{{hongbao.percentage}}%</span> -->
                    <!-- <span v-if="hongbao.deductionType==1">每满{{hongbao.expire}}减{{hongbao.deduction}}元</span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { dateFtt ,openloading} from "@/assets/js/currency.js";

import { mapActions } from "vuex";
export default {
    name:'',
    props: {
        //红包
        hongbao:{
            default:{}
        },
        //店铺
        shop:{
            default:{}
        },
        //红包Id 主要用于判断
        hongbaoid:{
            default:''
        }
    },
    data () {
        return {
            userInfo:'',
            shangping:{}        //商品 用户商品红包
        }
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
            get_shangping_2:'shangPing/get_shangping_2',     //获取商品
            set_isfenxiang:'shop/set_isfenxiang'
        }),
        //关闭
        guanbi(){
            console.log(123);
            this.$emit('setshow',false);
        },
        //获取商品
        get_shangping(){
            this.get_shangping_2(this.hongbao.commodityId).then(x=>{
                this.shangping=x.data.code==200 ? x.data.data : {};
            }).catch(err=>{

            })
        },
        //领取红包
        lignqu(){
            if(!this.userInfo){
                // mui.toast('请先登录。',{ duration: "long",type: "div" });
                mui.confirm('需要登录才能领取，是否现在去登录。','提示',['取消','是的'],(value)=>{
                    if(value.index==1){
                        this.$router.push('/login');
                    }
                })
                return;
            }else{
                var obj={
                        id:'',  
                        userid:this.userInfo.username,      
                        envelopeId:this.hongbao.id,        //红包id
                        state:'0',              //状态(使用等等)  0 刚领取
                        type:this.hongbao.type,
                        startTime:'',           //生日使用有效期
                        endTime:'',
                    }
                openloading(true);
                this.$axios.post('/api-s/shops/addUserCardPackge',obj).then(x=>{
                    if(x.data.code==200){
                        mui.toast('恭喜您，领取成功。',{ duration: 2000,type: "div" });
                        if(this.hongbao.type==1){
                            //跳转到红包
                            this.set_isfenxiang();
                            this.$router.push('/commodity/CommodityDetails?id='+this.hongbao.commodityId);
                        }else if(!this.hongbaoid){
                            //跳转到买单
                            this.set_isfenxiang();
                            this.$router.push('/Check?shopid='+this.shop.shopid)
                        }else{
                            this.$emit('setshow',false);
                        }
                    }else{
                        console.log(2)
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                    }
                    openloading(false)
                }).catch(err=>{
                    mui.toast('系统错误，稍后再试。',{ duration: 2000,type: "div" });
                    openloading(false);
                })
            }
        }
    },
    mounted () {
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}
        console.log('收到的红包',this.hongbao);
        if(this.hongbao && this.hongbao.type==1){
            this.get_shangping()
        }
    },
    watch: {
        shop(){
            console.log('店铺信息发生改变');
            // this.thisShop
        },
        hongbao(){
            if(this.hongbao.type==1){
                this.get_shangping()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.Xinrenhongbao{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    .cont_1{
        padding: 8px;
        background: #ffffff;
        border-radius: 5px;
        position: relative;
        .close{
            position: absolute;
            right: 0px;
            top: -50px;
            width: 36px;
            height: 36px;
            border-radius: 100%;
            background: #ffffff;
            line-height: 36px;
            text-align: center;
        }
        .close::after{
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: -14px;
            width: 1px;
            height: 14px;
            content: '';
            margin: auto;
            background: #ffffff;
        }
    }
    .cont_2{
        color: #ffffff;
        min-width: 140px;
        white-space: nowrap;
        border-radius: 5px;
        text-align: center;
        background: #f18a8a;
        position: relative;
        overflow: hidden;
        .banyuan{
            width: 200%;
            height: 200px;
            background: #f55e5e;
            position: absolute;
            top: -152px;
            left: -50%;
            border-radius: 100%;
        }
        .title_1{
            font-size: 12px;
            position: relative;
            z-index: 1;
            padding: 4px 0px 4px;
        }
        .lingqu{
            position: relative;
            z-index: 1;
            width: 39px;
            height: 39px;
            border-radius: 100%;
            background: #fa6f26;
            margin: 0px auto 3px;
            line-height: 39px;
            font-size: 12px;
            box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.13);
        }
        .money{
            >span:nth-child(1){
                font-size: 22px;
                font-weight: bold;
            }
            >span:nth-child(2){
                font-size: 12px;
            }
        }
        .img_box{
            width: 82px;
            height: 62px;
            font-size: 0px;
            margin: 0px auto;
            img{
                width: 82px;
                height: 62px;
            }
        }
        .text_1{
            font-size: 10px;
            padding: 3px 0px;
        }
    }
}
</style>


