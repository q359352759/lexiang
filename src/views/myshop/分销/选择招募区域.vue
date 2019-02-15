<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">选择招募区域</h1>
        </header>
        <div class="mui-content mui-fullscreen" >

            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="选择区域()">
                            <div class="标题">
                                招募区域：
                            </div>
                            <div class="文本1">{{类型 ? 类型 : '本市'}}</div>
                            <!-- <div class="文本2">（申请通过后可扩大范围）</div> -->
                        </a>
                    </li>
                    <li class="mui-table-view-cell item" v-show="类型!='本市'">
                        <!-- <a class="mui-navigate-right "> -->
                            <div class="标题">
                                展示天数：
                            </div>
                            <ul class="天数">
                                <li>
                                    <i class="icon iconfont" @click="选择天数(7)" :class="{'icon-xuanze2':展示天数==7,'icon-choose':展示天数!=7}"></i>
                                    <span>7天</span>
                                </li>
                                <li>
                                    <i class="icon iconfont" @click="选择天数(30)" :class="{'icon-xuanze2':展示天数==30,'icon-choose':展示天数!=30}"></i>
                                    <span>30天</span>
                                </li>
                                <li>
                                    <i class="icon iconfont" @click="选择天数(90)" :class="{'icon-xuanze2':展示天数==90,'icon-choose':展示天数!=90}"></i>
                                    <span>90天</span>
                                </li>
                            </ul>
                            <!-- <input type="text" :value="展示天数_1" placeholder="请选择天数" readonly> -->
                        <!-- </a> -->
                    </li>
                </ul>
            </div>

            <ul class="费用说明">
                <li>费用说明：</li>
                <li>本市：免费。</li>
                <li>本省：20元/天。</li>
                <li>全国：100元/天</li>
            </ul>

            <ul class="mui-table-view box_2" v-show="类型!='本市'">
                <li class="mui-table-view-cell item">
                    <!-- <a class="mui-navigate-right item"> -->
                        <div class="标题">
                            本次支付金额：
                        </div>
                        <div class="金额">￥{{支付金额.金额}}</div>
                        <div class="金额1" v-if="支付金额.剩余金额 && 支付金额.剩余金额!=0">（剩余天数抵扣￥{{支付金额.剩余金额}}）</div>
                    <!-- </a> -->
                </li>
            </ul>

            <ul class="支付方式" v-show="类型!='本市'">
                <li class="选择"><i class="icon iconfont icon-xuanze2"></i></li>
                <li class="微信"><i class="icon iconfont icon-weixin"></i></li>
                <li class="文本">微信支付</li>
            </ul>
            <div class="按钮">
                <btn value="确定支付" @click.native="确定()"/>
            </div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/button.vue'
import { getDateStr , openloading } from "@/assets/js/currency.js";
import { api_店铺招募订单列表 } from "@/api/招募接口.js";
import { mapGetters , mapMutations, mapActions } from "vuex";
export default {
    name:"",
    components:{
        btn
    },
    data () {
        return {
            Picker1:'',
            展示天数:7,
            类型:"本市",
            最新招募订单:{
                查询成功:false,
                详情:''
            },
        }
    },
    computed:{
        ...mapGetters({
            店铺:'get_myshop',
            招募信息:'myshops/分销/招募信息',
            zhaomuxinxi:'myshops/分销/招募信息',
            招募天数:'myshops/分销/招募天数'
        }),
        展示天数_1(){
            if(this.展示天数){
                return this.展示天数+'天';
            }else{
                return '';
            }
        },
        支付金额(){
            var 金额=0;
            var 剩余金额=0;
            if(this.类型=='本市'){
                金额=0
            }else{
                //30天 0.95 90天 0.9
                if(this.类型==this.招募信息.regionalscope){
                    if(this.类型=='本省'){
                        if(this.展示天数==30){
                            金额=this.展示天数*20*0.95
                        }else if(this.展示天数==90){
                            金额=this.展示天数*20*0.9
                        }else{
                            金额=this.展示天数*20
                        }
                    }else{
                        if(this.展示天数==30){
                            金额=this.展示天数*100*0.95
                        }else if(this.展示天数==90){
                            金额=this.展示天数*100*0.9
                        }else{
                            金额=this.展示天数*100
                        }
                    }
                }else{
                    //需要补差价
                    //不需要判断本市
                    if(this.类型=='本省'){      //之前是全国
                        // var 剩余金额=this.招募信息.days*100*0.9;  //260
                    }else{  //之前为全省，现在为全国
                        if(this.最新招募订单.查询成功){
                            var 最后支付天数 = 0;
                            var 总金额=0;
                            if(this.展示天数==7){
                                总金额=this.展示天数*100
                            }else if(this.展示天数){
                                总金额=this.展示天数*100*0.95
                            }else{
                                总金额=this.展示天数*100*0.9
                            }

                            if(this.最新招募订单.详情){
                                最后支付天数=this.最新招募订单.详情.days
                            }
                            if(最后支付天数==7){
                                剩余金额=this.招募信息.days*20
                            }else if(最后支付天数==30){
                                剩余金额=this.招募信息.days*20*0.95
                            }else{
                                剩余金额=this.招募信息.days*20*0.9
                            }
                            金额=(总金额-剩余金额)>0 ? (总金额-剩余金额) : 0;
                        }
                    }
                }
            }
            var obj={
                    金额:金额,
                    剩余金额:剩余金额
                }
            return obj
        }
    },
    methods: {
        ...mapMutations({
            修改招募信息:'myshops/分销/修改招募信息',
        }),
        ...mapActions({
            查询店铺:'getMyshop',
            设置天数:"myshops/分销/设置天数",
            调用支付接口:'myshops/分销/调用支付接口'
        }),
        选择区域(){
            var list=[
                {value:"本市",text:"本市"},
                {value:"本省",text:"本省"},
                {value:"全国",text:"全国"},
            ]
            if(!this.最新招募订单.查询成功){
                mui.toast("上次记录获取失败，稍后再试。", { duration: "long", type: "div" });
               return
            }
            var 目前类型=this.招募信息.regionalscope;
            this.Picker1 = new mui.PopPicker({layer: 1});            
            this.Picker1.setData(list);
            this.Picker1.show(x=>{
                var 选择的类型 = x[0].value;
                if(this.招募信息.days>0){
                    if(目前类型=='' || 目前类型=='本市'){

                    }else if(目前类型=="本省"){
                        if(选择的类型=='本市'){
                            mui.alert('您当前的套餐为：'+目前类型+'剩余'+this.招募信息.days+"天，使用完毕后才能进行降级。", "提示", "我知道了", function () { }, "div");
                            return
                        }
                    }else{
                        if(选择的类型!='全国'){
                            mui.alert('您当前的套餐为：'+目前类型+'剩余'+this.招募信息.days+"天，使用完毕后才能进行降级。", "提示", "我知道了", function () { }, "div");
                            return
                        }
                    }
                }
                this.类型=x[0].value;
                this.Picker1.dispose();
                this.Picker1 = null;
            })
        },
        选择天数(x){
            this.展示天数=x
        },
        确定(){
            var number_test = /^[0-9]+.?[0-9]*$/; //可带小数
            // if(this.招募信息.regionalscope=='本市'){
            if(this.类型=='本市'){
                this.设置天数(0);
                this.招募信息.regionalscope='本市'
            }else{
                this.招募信息.regionalscope=this.类型
                this.设置天数(this.展示天数);
            }
            openloading(true);
            this.调用支付接口().then(x=>{
                if(x.data.code==200){
                    if(this.支付金额.金额==0){
                        mui.toast('免支付设置成功。',{ duration: "long", type: "div" })
                        history.back();
                    }else{
                        var data=x.data.data;
                        wx.chooseWXPay({
                            timestamp: data.timeStamp,  // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: data.nonceStr,    // 支付签名随机串，不长于 32 位
                            package: data.package,      // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: data.signType,    // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: data.paysign,      // 支付签名
                            success: function (res) {
                                mui.toast('支付成功。',{ duration: "long", type: "div" })
                                history.back()
                            }
                        });
                    }
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                }
                openloading(false);
            }).catch(err=>{
                mui.toast('系统错误，稍后再试。',{ duration: "long", type: "div" })
                openloading(false);
                return
            })
            // this.招募信息.overtime=getDateStr(this.展示天数);
        },
        async 初始化(){
            if(!this.店铺 || !this.店铺.shopid){
                await this.查询店铺()
            }
            var query={
                    start:0,
                    length:10,
                    shopid:this.店铺.shopid
                }
            api_店铺招募订单列表(query).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    this.最新招募订单.查询成功=true;
                    var data=x.data.data.data;
                    this.最新招募订单.详情=data.length>0 ? data[0] : '';
                }
            })
        }
    },
    mounted () {
        
        // this.展示天数=this.招募天数
        this.类型=this.招募信息.regionalscope ? this.招募信息.regionalscope : '本市';
        this.初始化()
    },
    watch: {
        zhaomuxinxi:{
            deep:true,
            handler(newName, oldName) {
                // console.log(this.招募信息)
                this.修改招募信息()
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    .mui-table-view-cell:after{
        right: 15px;
    }
    .item{
        height: 44px;
        padding-top: 0px;
        padding-bottom: 0px;
        display: flex;
        align-items: center;
        .标题{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
            margin: 0px 26px 0px 0px;
        }
        .天数{
            display: flex;
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
            li{
                margin: 0px 10px 0px 0px;
            }
            .icon-xuanze2{
                color: #48ac3c;
            }
        }
        .文本1{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .文本2{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
        input{
            color: rgba(80, 80, 80, 1);
            height: 100%;
            padding: 0px;
            margin: 0px;
        	font-size: 14px;
            border: none;
        }
        input::-webkit-input-placeholder{
            color: rgba(166, 166, 166, 1);
        }
    }
}
.费用说明{
    padding: 5px 15px 10px;
    margin: 3px 0px 0px;
    background: #ffffff;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
}
.box_2{
    margin: 3px 0px;
    .item{
        display: flex;    
        align-items: center;
    }
    .标题{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
    .金额{
        color: rgba(212, 48, 48, 1);
    	font-size: 14px;
    }
    .金额1{
        color: #505050;
    	font-size: 12px;
    }
}
.支付方式{
    height: 47px;
    padding: 0px 15px;
    display: flex;
    align-items: center;
    background: #ffffff;
    margin: 3px 0px 0px;
    .选择{
        font-size: 20px;
        color: rgba(44, 164, 236, 1);
        margin: 0px 12px 0px 0px;
    }
    .微信{
        font-size: 30px;
        color: rgba(72, 172, 60, 1);
        margin: 0px 5px 0px 0px;
    }
    .文本{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
}
.按钮{
    margin: 40px 0px;
}
</style>
