<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">购买商品</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li class="img_box">
                    <img v-if="shangPing.img && shangPing.img.split(',').length>0" :src="shangPing.img.split(',')[0]" alt="" srcset="">
                </li>
                <li class="text_box">
                    <div class="name">{{shangPing.name}}</div>
                    <div class="text_1">
                        <span class="money">￥{{shangPing.sellingPrice}}</span>
                        <!-- <span>x1</span> -->
                        <div>
                            <jiajian :zongshu="number" @getNumber="setNumber"/>
                        </div>
                    </div>
                </li>
            </ul>

            <ul class="box_2" @click="set_dikou_shouw()">
                <li>需支付：</li>
                <li class="money">￥{{shiji}}</li>
                <li>已优惠：{{shiji_dikou}}元</li>
                <li><i class="mui-icon mui-icon-forward"></i></li>
            </ul>
            
            <ul class="mui-table-view box_3" v-if="shangPing_hongbao.length>0" v-show="dikou_shouw">
                <li class="mui-table-view-cell ">
					<!-- <a class="mui-navigate-right"> -->
                        <span>商品红包*{{shangPing_hongbao_dikou.number}}</span>
                        <span class="mui-pull-right money">-{{shangPing_hongbao_dikou.money}}元</span>
					<!-- </a> -->
				</li>
			</ul>

            <!-- 1、店铺生日红包
            2、店铺庆典红包
            3、店铺签到红包
            4、店铺节日红包
            5、平台节日红包
            6、店铺+平台红包 -->
            <ul class="mui-table-view box_4" v-show="dikou_shouw">
                <!-- 1、店铺生日红包 -->
                <li v-if="shengri_dikou!=0" class="mui-table-view-cell item" @click="change_radio_2(1)">
                    <div class="radio_1" :class="{'active':dikou==1}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span class="text">生日红包</span>
                    <span class="money">-{{shengri_dikou}}元</span>
				</li>
                <!-- 店铺庆典红包 -->
                <li v-if="qingdian_dikou!=0" class="mui-table-view-cell item" @click="change_radio_2(2)">
                    <div class="radio_1" :class="{'active':dikou==2}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span class="text">庆典红包</span>
                    <span class="money">-{{qingdian_dikou}}元</span>
				</li>
                <!-- 店铺节日红包 -->
                <li v-if="jieri_dikou!=0" class="mui-table-view-cell item" @click="change_radio_2(4)">
                    <div class="radio_1" :class="{'active':dikou==4}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span class="text">节日红包</span>
                    <span class="money">-{{jieri_dikou}}元</span>
				</li>
                <!-- 店铺+平台红包 -->
                <li  v-if="xingren_pingtai_dikou.xingren_dikou!=0 || xingren_pingtai_dikou.pingtai_dikou!=0" class="mui-table-view-cell item" @click="change_radio_2(6)">
                    <div class="radio_1" :class="{'active':dikou==6}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span class="text" v-if="xingren_pingtai_dikou.xingren_dikou!=0 && xingren_pingtai_dikou.pingtai_dikou!=0">店铺红包+平台红包</span>
                    <span class="text" v-if="xingren_pingtai_dikou.xingren_dikou!=0 && xingren_pingtai_dikou.pingtai_dikou==0">店铺红包</span>
                    <span class="text" v-if="xingren_pingtai_dikou.xingren_dikou==0 && xingren_pingtai_dikou.pingtai_dikou!=0">平台红包</span>
                    <span class="money">-{{xingren_pingtai_dikou.zongshu}}元</span>
				</li>
			</ul>
            
            <!-- {{number}} -->
            <div @click="zhifu()" class="zhifu">支付</div>
            

        </div>
    </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from "vuex";
import jiajian from '@/components/jiajian';
import request from '@/api/request';
import { openloading ,getDateStr} from "@/assets/js/currency.js";
export default {
    name:'',
    components:{
        jiajian
    },
    data(){
        return{
            userInfo:'',
            dikou_shouw:false,
            get_index:0,
            id:'',
            number:1,   //数量
            dikou:1,
            shangPing:{},     //商品信息
            hongbao:{
                loading:true,
                total:0,
                list:[],
            },
            shangPing_hongbao:[],   //该商品的商品红包
            shengri_hongbao:[],     //生日红包
            jieri_hongbao:[],       //节日红包
            qingdian_hongbao:[],    //庆典红包
            dianpu_hongbao:[],      //店铺红包
            invitedsutotal:{}       //平台红包信息

            // 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
            // 店铺订单，红包抵扣顺序
            // 1、店铺生日红包
            // 2、店铺庆典红包
            // 3、店铺签到红包
            // 4、店铺节日红包
            // 5、平台节日红包
            // 6、店铺+平台红包
        }
    },
    computed:{
        ...mapGetters({
            shop:'shop/shop'
        }),
        //判断是否有红包可用
        youwu_hongbao(){
            if(this.shangPing_hongbao.length==0 && this.shengri_hongbao.length==0 && this.jieri_hongbao.length==0 && this.qingdian_hongbao.length==0 && this.dianpu_hongbao.length==0 && !this.invitedsutotal.sutotal){
                return false
            }else{
                return true
            }
        },
        //商品列表
        shangPing_list(){
            var this_1=this;
            var number=this.number;
            var list=[];
            var shangPing_hongbao=this.shangPing_hongbao;
            var shangPing_hongbao_number=this.shangPing_hongbao.length
            console.log('商品红包长度',shangPing_hongbao_number)
            var honghao_kedikou=0   //红包可抵扣总额
            if(this.dikou==1){
                honghao_kedikou=this.shengri_hongbao.length>0 ? this.shengri_hongbao[0].redAmount : 0;
            }else if(this.dikou==2){
                honghao_kedikou=this.qingdian_hongbao.length>0 ? this.qingdian_hongbao[0].redAmount : 0;
            }else if(this.dikou==4){
                honghao_kedikou=this.jieri_hongbao.length>0 ? this.jieri_hongbao[0].redAmount : 0;
            }else if(this.dikou==6){
                if(this.dianpu_hongbao.length>0){
                    honghao_kedikou=honghao_kedikou+this.dianpu_hongbao[0].redAmount
                }
                if(this.invitedsutotal && this.invitedsutotal.sutotal){
                    honghao_kedikou=honghao_kedikou+this.invitedsutotal.sutotal;
                }
            }
            //店铺新人可抵扣
            var dianpu_hongbao=this.dianpu_hongbao.length>0 ?  this.dianpu_hongbao[0].redAmount : 0;
            //平台可抵扣
            var pingtai_kedikou=(this.invitedsutotal && this.invitedsutotal.sutotal) ? this.invitedsutotal.sutotal : 0;
            for(let i=0;i<number;i++){
                var obj=Object.assign({}, this_1.shangPing)
                    obj.kedikou=this_1.shangPing.deduction      //商品可抵扣
                    obj.hongbao=[]
                if(shangPing_hongbao_number>0){
                    //如果商品红包存在并且没有抵扣完
                    shangPing_hongbao_number=shangPing_hongbao_number-1;
                    obj.hongbao=[shangPing_hongbao[shangPing_hongbao_number]];
                        var money=shangPing_hongbao[shangPing_hongbao_number]['redAmount']<obj.kedikou ? shangPing_hongbao[shangPing_hongbao_number]['redAmount'] : obj.kedikou;
                        obj.shiji_dikou=money;
                }else{
                    if(honghao_kedikou>=0){
                        //其他红包抵扣
                        obj.hongbao=[];
                        var kedikou=obj.deduction;  //每个商品可抵扣
                        if(this_1.dikou==1){
                             obj.shiji_dikou=honghao_kedikou<kedikou ? honghao_kedikou : kedikou;
                            var hongbao=this_1.shengri_hongbao[0];
                                hongbao.paymentAmount=obj.shiji_dikou
                            obj.hongbao.push(hongbao);
                        }else if(this_1.dikou==2){
                            obj.shiji_dikou=honghao_kedikou<kedikou ? honghao_kedikou : kedikou
                            var hongbao=this_1.qingdian_hongbao[0]
                                hongbao.paymentAmount=obj.shiji_dikou;
                            obj.hongbao.push(hongbao);
                        }else if(this_1.dikou==3){
                        }else if(this_1.dikou==4){
                            obj.shiji_dikou=honghao_kedikou<kedikou ? honghao_kedikou : kedikou
                            var hongbao=this_1.jieri_hongbao[0];
                                hongbao.paymentAmount=obj.shiji_dikou
                            obj.hongbao.push(hongbao)
                        }else if(this_1.dikou==5){
                        }else if(this_1.dikou==6){
                            if(dianpu_hongbao>obj.kedikou){
                                obj.shiji_dikou=obj.kedikou;
                                obj.dianpu=obj.kedikou;
                                var hongbao=this_1.dianpu_hongbao[0]
                                    hongbao.paymentAmount=obj.shiji_dikou;
                                obj.hongbao.push(hongbao);
                                dianpu_hongbao=dianpu_hongbao-obj.kedikou;  //减去已经用掉的金额
                            }else if(dianpu_hongbao<obj.kedikou){
                                obj.shiji_dikou=obj.kedikou<(dianpu_hongbao+pingtai_kedikou) ? obj.kedikou : (dianpu_hongbao+pingtai_kedikou);
                                if(dianpu_hongbao>0){
                                    obj.dianpu=dianpu_hongbao
                                    var hongbao=this_1.dianpu_hongbao[0];
                                        hongbao.paymentAmount=obj.dianpu
                                    obj.hongbao.push(hongbao);
                                }
                                if(this_1.invitedsutotal && this_1.invitedsutotal.sutotal && this_1.invitedsutotal.sutotal>0 && pingtai_kedikou>0){
                                    
                                    var money=0
                                    if(pingtai_kedikou<obj.kedikou){
                                        money=pingtai_kedikou
                                    }else{
                                        money=obj.kedikou-(obj.dianpu && obj.dianpu>0 ? obj.dianpu : 0);
                                    }
                                    obj.pingtai=money
                                    var hongbao=this_1.invitedsutotal;
                                        hongbao.paymentAmount=money;
                                    obj.hongbao.push(hongbao);
                                    pingtai_kedikou=pingtai_kedikou-(obj.kedikou-dianpu_hongbao);
                                }
                                dianpu_hongbao=0;   //新人红包已经用完
                            }
                        }
                        honghao_kedikou=honghao_kedikou-kedikou;
                    }
                }
                obj.shiji_dikou=obj.shiji_dikou ? Math.ceil(obj.shiji_dikou*100)/100 : 0;
                list.push(obj)
            }
            return list;
        },
        //计算 实际金额
        shiji(){
            // var money=Math.floor(this.number*this.shangPing.sellingPrice*100)/100;
            if(!this.number || !this.shangPing.sellingPrice){
                return 0;
            }
            var money=this.number*this.shangPing.sellingPrice
                money=money-this.shiji_dikou
                money=Math.ceil((money.toFixed(2))*100)/100
            return money;
        },
        //计算实际抵扣金额
        shiji_dikou(){
            // var money=Math.floor(this.number*this.shangPing.sellingPrice*100)/100;
            var dikou=0;
            var money=this.shangPing_hongbao_dikou.money
            if(this.dikou==1){
                dikou=money+this.shengri_dikou
            }else if(this.dikou==2){
                dikou=money+this.qingdian_dikou
            }else if(this.dikou==3){
            }else if(this.dikou==4){
                dikou=money+this.jieri_dikou
            }else if(this.dikou==5){
            }else if(this.dikou==6){
                dikou=money+this.xingren_pingtai_dikou.zongshu
            }
            dikou=Math.floor(dikou*100)/100;
            return dikou;
        },
        //计算 商品红包可抵扣金额
        shangPing_hongbao_dikou(){
            //实际可抵扣数量
            var shiji_shuliang=this.number<this.shangPing_hongbao.length ? this.number : this.shangPing_hongbao.length;
            //实际单个可抵扣金额
            if(this.shangPing_hongbao.length>0){
                var money=this.shangPing.deduction<this.shangPing_hongbao[0].redAmount ? this.shangPing.deduction : this.shangPing_hongbao[0].redAmount;
            }else{
                var money=0
            }
            var shiji_dikou=0;
            var obj={
                    number:shiji_shuliang,
                    money:money*shiji_shuliang
                }
            return obj
        },
        //生日红包抵扣
        shengri_dikou(){
            //不需要抵扣 或者没有红包
            if(this.number-this.shangPing_hongbao_dikou.number==0 || this.shengri_hongbao.length==0){
                return 0
            }
            var number_1=this.number-this.shangPing_hongbao_dikou.number;
            // 计算剩余可抵扣金额
            var shengyu = number_1*this.shangPing.deduction
            var dikou = shengyu<this.shengri_hongbao[0].redAmount ? shengyu : this.shengri_hongbao[0].redAmount;
                dikou=Math.floor(dikou*100)/100
            return dikou;
        },
        //庆典抵扣金额
        qingdian_dikou(){
            //不需要抵扣
            if(this.number-this.shangPing_hongbao_dikou.number==0 || this.qingdian_hongbao.length==0){
                return 0
            }
            var number_1=this.number-this.shangPing_hongbao_dikou.number;
            // 计算剩余可抵扣金额
            var shengyu = number_1*this.shangPing.deduction
            var dikou = shengyu<this.qingdian_hongbao[0].redAmount ? shengyu : this.qingdian_hongbao[0].redAmount
                dikou=Math.floor(dikou*100)/100
            return dikou;
        },
        //店铺节日红包
        jieri_dikou(){
            //不需要抵扣或没有红包
            if(this.number-this.shangPing_hongbao_dikou.number==0 || this.jieri_hongbao.length==0){
                return 0
            }
            var number_1=this.number-this.shangPing_hongbao_dikou.number;
            // 计算剩余可抵扣金额
            var shengyu = number_1*this.shangPing.deduction
            var dikou = shengyu<this.jieri_hongbao[0].redAmount ? shengyu : this.jieri_hongbao[0].redAmount
                dikou=Math.floor(dikou*100)/100
            return dikou;
        },
        //店铺新人红包金额
        xingren_dikou(){
            //新人红包和平台   只管金额 不管百分比和满减
            //不需要抵扣
            if(this.number-this.shangPing_hongbao_dikou.number==0 || this.dianpu_hongbao.length==0){
                return 0
            }
            var number_1=this.number-this.shangPing_hongbao_dikou.number;
            //计算剩余可抵扣金额
            var shengyu = number_1*this.shangPing.deduction
            var dikou = shengyu<this.dianpu_hongbao[0].redAmount ? shengyu : this.dianpu_hongbao[0].redAmount
                dikou=Math.floor(dikou*100)/100
            return dikou;
        },
        //平台红包
        pingtai_dikou(){
            //不需要抵扣
            if(this.number-this.shangPing_hongbao_dikou.number==0 || !this.invitedsutotal.sutotal){
                return 0
            }
            var number_1=this.number-this.shangPing_hongbao_dikou.number;
            //计算剩余可抵扣金额
            var shengyu = number_1*this.shangPing.deduction
            var dikou = shengyu<this.invitedsutotal.sutotal ? shengyu : this.invitedsutotal.sutotal
                dikou=Math.floor(dikou*100)/100
            return dikou;
        },
        //计算新人红包+平台红包
        xingren_pingtai_dikou(){
            var obj={
                    xingren_dikou:0,
                    pingtai_dikou:0,
                    zongshu:0,
                }
            var number_1=this.number-this.shangPing_hongbao_dikou.number;
            //计算剩余可抵扣金额
            var shengyu = number_1*this.shangPing.deduction
            obj.xingren_dikou=this.xingren_dikou;          //新人红包抵扣金额
            //是否还有剩余金额需要抵扣
            if(shengyu!=obj.xingren_dikou){
                obj.pingtai_dikou=this.pingtai_dikou>(shengyu-obj.xingren_dikou) ? (shengyu-obj.xingren_dikou) : this.pingtai_dikou;
                console.log(obj.pingtai_dikou);
            }
            obj.zongshu=obj.xingren_dikou+obj.pingtai_dikou;
            obj.zongshu=Math.floor(obj.zongshu*100)/100;
            return obj;
        },
    },
    methods:{
        ...mapActions({
            get_shop:'shop/get_shop',   //根据店铺Id查询店铺
        }),
        //点开优惠详情
        set_dikou_shouw(){
            if(this.youwu_hongbao){
                this.dikou_shouw=true
            }else{
                mui.toast('没有红包可抵扣。', {duration: "long", type: "div" });                
            }
        },
        //支付
        zhifu(){
            if(!this.number || this.number<=0){
                mui.toast('请选择商品购买数量', {duration: "long", type: "div" });                
                return;
            }
            var this_1=this;
            var submitCommodityList=[];
            this.shangPing_list.forEach(item => {
                item.shopRedEnvelope=(item.shiji_dikou && item.shiji_dikou!=0) ?  item.hongbao : []
                // shopRedEnvelope[0].paymentAmount=item.dikou
                if(item.shiji_dikou){

                }
                var obj={
                        shopCommodity:item,
                        // shopRedEnvelope:item.hongbao,
                        deduction:item.shiji_dikou ? item.shiji_dikou : 0,
                        actualPayment:item.shiji_dikou ? Math.ceil((item.sellingPrice-item.shiji_dikou)*100)/100 : item.sellingPrice
                    }
                submitCommodityList.push(obj);
            });

            let sumit_obj={
                    orderType:0,        //0表示购买商品 1表示输入金额
                    appUser:this.userInfo,              //用户
                    shopBasics:this.shop,               //店铺信息
                    amount:this.shiji,                  //金额
                    submitCommodityList:submitCommodityList        ////商品实体类
                }
            console.log(sumit_obj);
            openloading(true)
            this.$request('/api-s/shops/createOrders',sumit_obj,'post').then(x=>{
                console.log('添加订单',x);
                if(x.data.code==200){
                    // this.$router.push({path:'/orders/order?ordreId='+x.data.data.id,push:{zhifu:2}});
                    this.$router.push({name:'ordersOrder',query:{ordreId:x.data.data.id},params:{zhifu:1}});
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
                openloading(false);
            }).catch(err=>{
                console.log('添加订单错误',err);
                mui.toast('系统错误稍后再试。', {duration: "long", type: "div" });
                openloading(false)
            })
        },
        setNumber(value){
            console.log('收到参数',value);
            this.number=value;
        },
        //选择抵扣方式
        change_radio_2(x){
            this.dikou=x==this.dikou ? 0 : x;
        },
        //获取商品返回值
        get_shangPing(x){
            console.log('获取商品',x);
            this.shangPing=x;
            //根据商品店铺Id查询店铺
            this.get_shop(this.shangPing.shopid);
        },

        //获取用户商品卡包信息
        get_CardPackge(){
            if(this.shangPing.shopid){
                this.hongbao.loading=true
                var findDataUserCardPackge_query={
                        query:{         //
                            start:0,
                            length:1000,
                            userid:this.userInfo.username,
                            shopid:this.shangPing.shopid
                            // type:1,
                            // commodityId:this.id,
                            // ccc:1,
                            // state:0
                        },
                        fc:this.CardPackge_return
                    }
                this.$store.commit('hongbao/findDataUserCardPackge',findDataUserCardPackge_query);
            }else{
                setTimeout(()=>{
                    this.get_CardPackge()
                },500)
            }
        },
        CardPackge_return(x){
            console.log('红包返回值',x);
            this.hongbao.loading=false;
            if(x.code && x.code==200){
                this.hongbao.list=x.data.data;
                // console.log(this.$store.getters["hongbao/filter_hongbao"](this.hongbao.list,this.id));
                this.shangPing_hongbao=this.$store.getters["hongbao/filter_hongbao"](this.hongbao.list,this.id,1);
                // this.shengri_hongbao=this.$store.getters["hongbao/filter_hongbao"](this.hongbao.list,'',5);
                //生日红包
                this.shengri_hongbao=this.hongbao.list.filter(x=>(x.type==5 && x.startTime<=getDateStr(0) && x.endTime>=getDateStr(0)));
                this.qingdian_hongbao=this.$store.getters["hongbao/filter_hongbao"](this.hongbao.list,'',4);
                this.jieri_hongbao=this.$store.getters["hongbao/filter_hongbao"](this.hongbao.list,'',2);
                this.dianpu_hongbao=this.$store.getters["hongbao/filter_hongbao"](this.hongbao.list,'',0);
                if(this.shengri_hongbao.length!=0){
                    console.log(1)
                    this.dikou=1
                }else if(this.qingdian_hongbao.length!=0){
                    this.dikou=2
                    console.log(2)
                }else if(this.jieri_hongbao.length!=0){
                    this.dikou=4
                    console.log(4)
                }else{
                    this.dikou=6
                    console.log(6)
                }
            }else{
                mui.alert(x.msg ? x.msg : x.messag, "提示",'我知道了', function() {},"div");
            }
        },
        //获取用户平台红包信息
        get_invitedsutotal(){
            this.$request('/api-u/users/invitedsutotal/findByUserid/'+this.userInfo.username,'','get').then(x=>{
                console.log('平台红包信息',x);
                if(x.data.code==200 && x.data.data){
                    this.invitedsutotal=x.data.data;
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        var query=this.$route.query;
            this.id=query.id;
        var obj={
                id:query.id,
                fc:this.get_shangPing
            }
        
        this.userInfo=JSON.parse(localStorage.userInfo);
        this.$store.commit('shangPing/get_shangping_1',obj);
            this.get_index=1
            //获取用户卡包信息
            this.get_CardPackge();
            //获取用户平台红包金额
            this.get_invitedsutotal()
    },
    watch:{
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';
.box_1{
    display: flex;
    padding: 8px 10px;
    background: #ffffff;
    .img_box{
        width: 72px;
    	height: 54px;
        margin: 0px 5px 0px 0px;
        flex-shrink: 0;
        img{
            width:  100%;
            height: 100%;
        }
    }
    .text_box{
        display: flex;
        width: 0;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
            font-weight: bold;
        }
        .text_1{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money{
                color: rgba(212, 48, 48, 1);
            	font-size: 19px;
                font-weight: bold;
            }
        }
    }
}

.box_2{
    height: 44px;
    margin: 5px 0px 0px;
    padding: 0px 10px 0px 15px;
    background: #ffffff;
    display: flex;
    align-items: center;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    .money{
        color: #d43030;
        font-size: 19px;
        flex-grow: 1;
        font-weight: bold;
    }
    i{
        color: rgba(80, 80, 80, 1);
        font-size: 21px;
    }
}

.box_3{
    margin: 5px 0px 0px;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    .money{
        color: #d43030;
    }
}

.box_4{
    margin: 5px 0px 0px;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    .item{
        display: flex;
        align-items: center;
        .text{
            margin: 0px 0px 0px 5px;
            flex-grow: 1;
        }
        .money{
            color: #d43030;
        }
    }
    .mui-table-view-cell:after{
        left: 0px;
    }
}
.zhifu{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: $header_background;
    color: #ffffff;
    letter-spacing: 10px;
    padding-left: 10px;
}
</style>

