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
                            <div class="文本1">{{招募信息.regionalscope ? 招募信息.regionalscope : '本市'}}</div>
                            <!-- <div class="文本2">（申请通过后可扩大范围）</div> -->
                        </a>
                    </li>
                    <li class="mui-table-view-cell" v-show="招募信息.regionalscope!='本市'">
                        <a class="mui-navigate-right item" @click="选择天数()">
                            <div class="标题">
                                展示天数：
                            </div>
                            <input type="text" :value="展示天数_1" placeholder="请选择天数" readonly>
                        </a>
                    </li>
                </ul>
            </div>

            <ul class="费用说明">
                <li>费用说明：</li>
                <li>本市：免费。</li>
                <li>本省：20元/天。</li>
                <li>全国：100元/天</li>
            </ul>

            <ul class="mui-table-view box_2" v-show="招募信息.regionalscope!='本市'">
                <li class="mui-table-view-cell item">
                    <!-- <a class="mui-navigate-right item"> -->
                        <div class="标题">
                            本次支付金额：
                        </div>
                        <div class="金额">￥{{支付金额}}</div>
                    <!-- </a> -->
                </li>
            </ul>

            <ul class="支付方式" v-show="招募信息.regionalscope!='本市'">
                <li class="选择"><i class="icon iconfont icon-xuanze2"></i></li>
                <li class="微信"><i class="icon iconfont icon-weixin"></i></li>
                <li class="文本">微信支付</li>
            </ul>
            <div class="按钮">
                <btn value="确定" @click.native="确定()"/>
            </div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/button.vue'
import { getDateStr } from "@/assets/js/currency.js";
import { mapGetters , mapMutations, mapActions } from "vuex";
export default {
    name:"",
    components:{
        btn
    },
    data () {
        return {
            Picker1:'',
            展示天数:''
        }
    },
    computed:{
        ...mapGetters({
            招募信息:'myshops/分销/招募信息',
            zhaomuxinxi:'myshops/分销/招募信息',
        }),
        展示天数_1(){
            if(this.展示天数){
                return this.展示天数+'天';
            }else{
                return '';
            }
        },
        按钮文字(){
            return (this.招募信息.regionalscope=='本市' || this.招募信息.regionalscope=='') ? '确定' : "确定支付"
        },
        支付金额(){
            var 金额=0
            var number_test = /^[0-9]+.?[0-9]*$/; //可带小数
            var zhengshu_test = /^[1-9]+[0-9]*]*$/; //整数
            if(this.招募信息.regionalscope=='本市' || this.招募信息.regionalscope==''){
                金额=0
            }else if(zhengshu_test.test(this.展示天数)){
                if(this.招募信息.regionalscope=='本省'){
                    金额=this.展示天数*20
                }else{
                    金额=this.展示天数*100
                }
            }
            return 金额
        }
    },
    methods: {
        ...mapMutations({
            修改招募信息:'myshops/分销/修改招募信息',
        }),
        ...mapActions({
            设置天数:"myshops/分销/设置天数",
        }),
        选择区域(){
            var list=[
                {value:"本市",text:"本市"},
                {value:"本省",text:"本省"},
                {value:"全国",text:"全国"},
            ]
            this.Picker1 = new mui.PopPicker({layer: 1});            
            this.Picker1.setData(list);
            this.Picker1.show(x=>{
                console.log(x);
                this.招募信息.regionalscope=x[0].value;
                this.Picker1.dispose();
                this.Picker1 = null;
            })
        },
        选择天数(){
            var list=[
                {value:7,text:7},
                {value:15,text:15},
                {value:30,text:30},
            ]
            this.Picker1 = new mui.PopPicker({layer: 1});            
            this.Picker1.setData(list);
            this.Picker1.show(x=>{
                console.log(x);
                this.展示天数=x[0].value;
                this.Picker1.dispose();
                this.Picker1 = null;
            })
        },
        确定(){
            var number_test = /^[0-9]+.?[0-9]*$/; //可带小数
            if(this.招募信息.regionalscope=='本市'){
                this.设置天数('');
                history.back();
            }else{
                if(!number_test.test(this.展示天数)){
                    mui.toast("请输入天数", { duration: "long", type: "div" });
                    return
                }
                this.设置天数(this.展示天数);
                history.back()
                // console.log(getDateStr(this.展示天数))
            }
            
            // this.招募信息.overtime=getDateStr(this.展示天数);
            
        }
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
    }
    .标题{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
    .金额{
        color: rgba(212, 48, 48, 1);
    	font-size: 14px;
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
