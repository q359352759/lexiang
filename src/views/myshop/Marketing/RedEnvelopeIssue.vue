<template>
    <div>
        
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <span v-if="url_type==0">店铺新人红包</span>
                <span v-if="url_type==1">商品红包</span>
                <span v-if="url_type==2">节日红包</span>
                <span v-if="url_type==3">签到红包</span>
                <span v-if="url_type==4">庆典红包</span>
                <span v-if="url_type==5">生日红包</span>
                <span v-if="!url_type && url_type!=0">红包</span>
            </h1>
            <div class="wenhao" @tap="hongBaoShuoMing()">
                <i class="icon iconfont icon-wenhao"></i>
            </div>
        </header>
        <div class="mui-content mui-fullscreen">
            <div></div>
            <ul class="mui-table-view box_1">
				<li v-if="!id && !url_type" class="mui-table-view-cell " >
					<a class="mui-navigate-right item" @tap="select_type()" >
                        <span class="title_1">红包类型：</span>
                        <span v-if="type==0">店铺新人红包</span>
                        <span v-if="type==1">商品红包</span>
                        <span v-if="type==2">节日红包</span>
                        <span v-if="type==3">签到红包</span>
                        <span v-if="type==4">庆典红包</span>
                        <span v-if="type==5">生日红包</span>
					</a>
				</li>
                <li v-if="id && !url_type" class="mui-table-view-cell item" >
                        <span class="title_1">红包类型：</span>
                        <span v-if="type==0">店铺新人红包</span>
                        <span v-if="type==1">商品红包</span>
                        <span v-if="type==2">节日红包</span>
                        <span v-if="type==3">签到红包</span>
                        <span v-if="type==4">庆典红包</span>
                        <span v-if="type==5">生日红包</span>
				</li>


                <li class="mui-table-view-cell item" >
                    <span class="title_1">红包标题：</span>
                    <div class="input_1">
                        <input type="text" v-model="Red_envelopes.headline" placeholder="请输入红包标题">
                    </div>
				</li>
				<li v-if="type==0" class="mui-table-view-cell item" >
                    <span class="title_1">有效期限：</span>
                    <span>长期有效</span>
				</li>

                <li v-if="type==3" class="mui-table-view-cell item" >
                    <span class="title_1">签到时间：</span>
                    <div class="input_2">
                        <input type="text" placeholder="开始时间" v-model="Red_envelopes.signInStartTime" readonly @tap="select_time('signInStartTime')">
                    </div>
                    <div class="hengxian"></div>
                    <div class="input_2">
                        <input type="text" placeholder="结束时间" v-model="Red_envelopes.signInEndTime" readonly @tap="select_time('signInEndTime')">
                    </div>
				</li>



                <li v-if="type==1 || type==2 || type==3 || type==4" class="mui-table-view-cell item" >
                    <span class="title_1">使用期限：</span>
                    <div class="input_2">
                        <input type="text" placeholder="开始时间" v-model="Red_envelopes.startTime" readonly @tap="select_time('startTime')">
                    </div>
                    <div class="hengxian"></div>
                    <div class="input_2">
                        <input type="text" placeholder="结束时间" v-model="Red_envelopes.endTime" readonly @tap="select_time('endTime')">
                    </div>
				</li>

                <li v-if="type==1" class="mui-table-view-cell" >
					<a class="mui-navigate-right item" @tap="selset_commodity()">
                        <span class="title_1">选择商品：</span>
                        <span class="tishi_1" v-if="!Red_envelopes.commodityName">选择商品</span>
                        <span v-if="Red_envelopes.commodityName">{{Red_envelopes.commodityName}}</span>
                    </a>
				</li>

                <li v-if="type==0 || type==1 || type==2 || type==4" class="mui-table-view-cell item" >
                    <span class="title_1">红包金额：</span>
                    <div class="input_1">
                        <input type="text" v-model="Red_envelopes.amount" placeholder="红包金额" :readonly="type==1">
                    </div>
                    <span @tap="wenhao()" class="wenhao"><i class="icon iconfont icon-wenhao"></i></span>
                    <span>元</span>
				</li>

                <li v-if="type==5" class="mui-table-view-cell item" >
                    <span class="title_1">红包金额：</span>
                    <div class="input_2">
                        <input type="text" v-model="Red_envelopes.amount" placeholder="红包金额">
                    </div>
                    <span style="flex-grow: 1;">元</span>
                    <span @tap="wenhao()" class="wenhao"><i class="icon iconfont icon-wenhao"></i></span>
                    <!-- <div class="mui-switch mui-switch-mini" @tap="select_state()" :class="{'mui-active':Red_envelopes.state==1}">
						<div class="mui-switch-handle"></div>
					</div> -->
				</li>

                <li v-if="type==3" class="mui-table-view-cell item" >
                    <span class="title_1">起始金额：</span>
                    <div class="input_1">
                        <input type="text" v-model="Red_envelopes.startAmount" placeholder="请输入金额">
                    </div>
                    <span>元</span>
				</li>
                <li v-if="type==3" class="mui-table-view-cell item" >
                    <span class="title_1">递增金额：</span>
                    <div class="input_1">
                        <input type="text" v-model="Red_envelopes.progressivelyAmount" placeholder="请输入金额">
                    </div>
                    <span>元</span>
				</li>
                <li v-if="type==3" class="mui-table-view-cell item" >
                    <span class="title_1">递增天数：</span>
                    <div class="input_1">
                        <input type="text" v-model="Red_envelopes.increaseDays" placeholder="请输入递增天数">
                    </div>
                    <span>天</span>
				</li>
                <li v-if="type==3" class="mui-table-view-cell item" >
                    <span class="title_1">循环天数：</span>
                    <div class="input_1">
                        <input type="text" v-model="Red_envelopes.cycleDays" placeholder="请输入递增天数">
                    </div>
                    <span>天</span>
				</li>


                <li v-if="type==1 || type==2 || type==4" class="mui-table-view-cell item" >
                    <span class="title_1">红包个数：</span>
                    <div class="input_1">
                        <input type="text" v-model="Red_envelopes.quantityMax_1" placeholder="请输入红包个数">
                    </div>
                    <span>个</span>
				</li>

			</ul>
            <ul v-if="type==0 || type==2 || type==3 || type==4 || type==5" class="mui-table-view box_1">
                <li class="mui-table-view-cell item" >
                    <div @click="change_radio_2(0)" class="radio_1" :class="{'active':Red_envelopes.deductionType==0}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span>可抵扣支付金额的</span>
                    <div class="input_2">
                        <input type="text" v-model="Red_envelopes.percentage">
                    </div>
                    <span>%</span>
				</li>
            </ul>

            <ul v-if="type==0 || type==2 || type==3 || type==4 || type==5" class="mui-table-view box_1">
                <li class="mui-table-view-cell item" >
                    <div @click="change_radio_2(1)" class="radio_1" :class="{'active':Red_envelopes.deductionType==1}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span>每满</span>
                    <div class="input_2">
                        <input type="text" v-model="Red_envelopes.expire">
                    </div>
                    <span>元，可抵扣</span>
                    <div class="input_2">
                        <input type="text" v-model="Red_envelopes.deduction">
                    </div>
                    <div>元</div>
				</li>
            </ul>

            <ul class="box_2" v-show="type==0">
                <li>发布规则：</li>
                <li class="indent_1 margin_1">
                    每个店铺都需要发布新人红包，金额最低10元，时间为长期有效，可多次使用。可更改，但不可删除红包。
                </li>
                <li>领取规则：</li>
                <li class="indent_1 margin_1">每个客户只能领取一次，使用完后不可再次领取。</li>
                <li>作用和好处：</li>
                <li class="indent_1 margin_1">店铺新人红包能够为店铺拓展更多的客源，实现线上引流，线下消费。通过新人红包和新人专享商品，能够实现客户主动上门。客户领取红包后自动关注店铺，通过店铺营销可把最新的促销信息免费群发给客户，实现互动营销。</li>
            </ul>
            
            <ul class="box_2" v-show="type==1">
                <li>发布规则：</li>
                <li class="indent_1 margin_1">有效期最大为30天，一个商品只能发布一个红包，使用期限最大为一个月。活动结束后可再次发放。</li>
                <li>领取规则：</li>
                <li class="indent_1 margin_1">每个客户单次只能领取两个，使用后可再次领取。</li>
                <li>作用和好处：</li>
                <li class="indent_1 margin_1">商品红包可针对老顾客开展顾客回馈计划，增加店铺的客户留存率，同时也能通过商品红包打造爆款商品。</li>
            </ul>
            
            <ul class="box_2" v-show="type==2">
                <li>发布规则：</li>
                <li class="indent_1 margin_1">有效期最大为30天，红包标题可更具自己的店庆内容来定。红包个数可根据自己预估的客流量来计算。</li>
                <li>领取规则：</li>
                <li class="indent_1 margin_1">每个客户单次只能领取两个，使用后可再次领取。</li>
                <li>作用和好处：</li>
                <li class="indent_1 margin_1">可以提高店铺的营业额，增加人气的同时实现老顾客回购。</li>
            </ul>

            <div class="box_3" v-if="type==3">
                <img src="image/shili1.png" alt="" srcset="">
            </div>
            <ul class="box_2" v-show="type==3">
                <li>发布规则：</li>
                <li class="indent_1 margin_1">签到和使用期限都不得大于15天，起始金额和递增金额最多为3位数，递增天数不得大于循环天数。</li>
                <li>领取规则：</li>
                <li class="indent_1 margin_1">连续签到终端后，签到金额从起始金额开始，重新叠加。</li>
                <li>作用和好处：</li>
                <li class="indent_1 margin_1">店铺若需要开展大型的促销活动，可通过签到红包来实现活动前的预热和促销氛围。</li>
            </ul>

            <ul class="box_2" v-show="type==4">
                <li>发布规则：</li>
                <li class="indent_1 margin_1">有效期最大为30天，红包标题可更具自己的店庆内容来定。红包个数可根据自己预估的客流量来计算。</li>
                <li>领取规则：</li>
                <li class="indent_1 margin_1">每个客户单次只能领取两个，使用后可再次领取。</li>
                <li>作用和好处：</li>
                <li class="indent_1 margin_1">可以提高店铺的营业额，增加人气的同时实现老顾客回购。</li>
            </ul>

            <ul class="box_2" v-show="type==5">
                <li>发布规则：</li>
                <li class="indent_1 margin_1">生日红包有效期为一年，只可更改，不可删除。</li>
                <li>领取规则：</li>
                <li class="indent_1 margin_1">每个客户每年只能领取一次，可在生日前7天内使用。</li>
                <li>作用和好处：</li>
                <li class="indent_1 margin_1">通过生日红包和生日专享商品，可提升客户的忠诚度。有机会增加客户的购买频率和实现转介绍。</li>            
            </ul>


            <div @tap="sub()" class="btn_1">确定</div>
            
            <!-- 商品 -->
            <ShopClassification  v-on:setShow="setShow" v-show="ShopClassification_show"/>
            <!-- 红包通用说明 -->
            <hongBaoShuoMing  v-show="hongBaoShuoMing_show"/>
            

        </div>
    </div>
</template>

<script>
// 商品
import ShopClassification from '@/components/selectCommodity.vue'
// 红包通用说明
import hongBaoShuoMing from '@/components/hongBaoShuoMing.vue'
import {openloading,dateFtt} from '@/assets/js/currency'

export default {
    name:'',
    components:{
        ShopClassification,
        hongBaoShuoMing
    },
    data(){
        return{
            url_type:'',
            hongBaoShuoMing_show:false,
            id:'',      //如果有id表示详情
            type:0,             //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
            Picker_type:'',     //红包类型
            picker_time:'',     //时间选择器
            ShopClassification_show:false,
            Red_envelopes:{
                id:'',              
                shopid:'',
                type:'0',           //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
                name:'',            //名称 对应上面的类型
                headline:'店铺新人红包',   //标题
                amount:'',          //金额  
                quantity:'',        //数量            
                quantityMax:'',     //总数量    100
                quantityMax_1:'',   
                startTime:'',       //开始时间  使用的时间
                endTime:'',         //截止时间  
                // ================
                signInStartTime:'', //签到开始时间
                signInEndTime:'',   //签到结束时间
                commodityId:'',     //商品Id
                commodityName:'',   //商品名称
                startAmount:'',     //起始金额
                progressivelyAmount:'', //递增金额
                state:1,            //是否开启
                increaseDays:'',    //递增天数
                cycleDays:'',       //循环天数

                // ===================
                createTime:'',
                deductionType:0,    //抵扣方式   0表示百分百 1表示满多少减多少
                percentage:'',      //抵扣百分比
                expire:'',          //满多少
                deduction:'',       //减多少
            },
        }
    },
    computed:{
        //
        filter_time(time){
            return dateFtt(time,'yyyy-MM-dd')
        },
        myshop(){
            return this.$store.state.myshop
        },
    },
    methods:{
        //点击金额说明
        wenhao(){
            // wenhao
            var html='';
            if(this.type==0){
                html='<ul style="text-align:left;color:#777777">'+
                        '<li style="text-indent: 20px;">红包金额不管设置多大，都按照红包使用规则进行抵扣。</li>'+
                        '<li>如：发放800元的红包，抵扣方式为“可抵扣支付金额的10%”。</li>'+
                        '<li style="text-indent: 20px;margin:0px 0px 10px;">1、顾客输入金额，支付100元，可用红包抵扣10元。顾客还剩余790元的红包，可以下次购买时使用。</li>'+
                        '<li style="text-indent: 20px;margin:0px 0px 10px;">2、顾客购买商品，该商品设置的可抵扣金额为20元，那么顾客购买时可以用红包抵扣20元。顾客还剩余780元的红包，可以下次购买时使用。</li>'+
                        '<li style="text-indent: 20px;margin:0px 0px 10px;">红包具体金额可根据自己店铺情况设置，不宜太大，若太大，您以后再次发放节日红包或庆典红包时会失去关注度，客户还有大量的红包就不再次领取。建议红包金额为“新人专享商品”的可抵扣价。</li>'+
                    '</ul>'
            }else if(this.type==1){
                html='<div style="color:#777777">红包金额为商品的可抵扣金额，不可修改</div>';
            }else if(this.type==2){
                html='<div style="color:#777777">根据促销商品的可抵扣金额来计算，建议红包金额大一些，对消费者更有吸引力！红包再大依然遵循可抵扣金额，带来的营业额也更多。</div>'
            }else if(this.type==4){
                html="<div style='color:#777777'>根据促销商品的可抵扣金额来计算，建议红包金额大一些，对消费者更有吸引力！红包再大依然遵循可抵扣金额，带来的营业额也更多。</div>"
            }else if(this.type==5){
                html="<div style='color:#777777'>如果有发布生日专享商品，根据生日专享商品可抵扣金额计算，否则根据几款普通商品的可抵扣金额计算，建议红包大一些。红包再打大然遵循可抵扣金额，但能购给消费者留下较好印象。</div>";
            }
    
            mui.alert(html,"如何设置红包金额？",'我知道了',()=>{},'div')
        },
        //跳转红包说明
        hongBaoShuoMing(){
            this.hongBaoShuoMing_show=true;
            this.$router.push('?hongBaoShuoMing_show=1')
        },
        //开关
        select_state(){
            console.log(123)
            this.Red_envelopes.state=this.Red_envelopes.state==0 ? 1: 0;
        },
        //接收选择的商品
        setShow(data){
            console.log('接受参数',data);
            if(data){
                this.Red_envelopes.commodityId=data.id;
                this.Red_envelopes.commodityName=data.name;
                this.Red_envelopes.amount=data.deduction;
            }
            this.ShopClassification_show=false;
            history.back();
        },
        //选择商品
        selset_commodity(){
            this.$router.push('/RedEnvelopeIssue?ShopClassification_show=1');
            this.ShopClassification_show=true;
        },
        //选择类型
        select_type(){
            var obj=[{
                    value:'0',
                    text:'店铺新人红包'
                },{
                    value:'1',
                    text:'商品红包'
                },{
                    value:'2',
                    text:'节日红包'
                },{
                    value:'3',
                    text:'签到红包'
                },{
                    value:'4',
                    text:'庆典红包'
                },{
                    value:'5',
                    text:'生日红包'
                }]
            this.Picker_type.setData(obj);
            this.Picker_type.show(x => {
                console.log(x);
                this.type=x[0].value;
                this.readonly=x[0].value==1 ? true : false;
                this.Red_envelopes.type=x[0].value;
                this.Red_envelopes.id='';
                this.Red_envelopes.headline=x[0].text;
            });
        },
        //选择时间
        select_time(x){
            if(x=='startTime' && this.type==3){
                return
            }            
            this.picker_time.show(res=>{
                console.log(res)
                this.Red_envelopes[x]=res.value;
                if(this.type==3){
                    if(x=='signInEndTime'){
                        this.Red_envelopes.startTime=res.value;
                    }
                }
            })
        },
        //开始提交
        sub(){
            var number_test= /^[0-9]+.?[0-9]*$/;    //可带小数
            var zhengshu_test=/^[1-9]+[0-9]*]*$/;   //整数
            this.Red_envelopes.type=this.type
            this.Red_envelopes.shopid=this.myshop.shopid
            if(this.type==0){              
                 this.Red_envelopes.state=1
                if(!this.Red_envelopes.headline){
                    mui.toast("请填写红包标题。", { duration: 2000, type: "div" });
                    return
                }else if(!number_test.test(this.Red_envelopes.amount) || this.Red_envelopes.amount<0){
                    mui.toast("红包金额有误。", { duration: 2000, type: "div" });
                    return
                }else if(!zhengshu_test.test(this.Red_envelopes.amount)){
                    mui.toast("红包金额不能有小数点。", { duration: 2000, type: "div" });
                    return
                }
                if(this.Red_envelopes.deductionType==0){
                    if(!this.Red_envelopes.percentage || !number_test.test(this.Red_envelopes.percentage)){
                        mui.toast("可抵扣比例填写有误。", { duration: 2000, type: "div" });
                        return
                    }
                }else if(this.Red_envelopes.deductionType==1){
                    if(!this.Red_envelopes.expire || !number_test.test(this.Red_envelopes.expire) || !this.Red_envelopes.deduction || !number_test.test(this.Red_envelopes.deduction)){
                        mui.toast("满减金额填写有误。", { duration: 2000, type: "div" });
                        return;
                    }
                }
                console.log('可以提交',this.Red_envelopes);
                this.Submission();
                // this.get_redenvelope()
            }else if(this.type==1){
                //商品红包
                 this.Red_envelopes.state=1
                if(!this.Red_envelopes.headline){
                    mui.toast("请填写红包标题。", { duration: 2000, type: "div" });
                    return
                }else if(!this.Red_envelopes.startTime || !this.Red_envelopes.endTime || this.Red_envelopes.startTime>=this.Red_envelopes.endTime){
                    mui.toast("使用期限有误。", { duration: 2000, type: "div" });
                    return;
                }else if(!this.Red_envelopes.commodityId){
                    mui.toast("请选择商品", { duration: 2000, type: "div" });
                    return;
                }else if(!number_test.test(this.Red_envelopes.amount) || this.Red_envelopes.amount<0){
                    mui.toast("红包金额有误。", { duration: 2000, type: "div" });
                    return
                }else if(!zhengshu_test.test(this.Red_envelopes.quantityMax_1) || this.Red_envelopes.quantityMax_1<1){
                    mui.toast("红包数量有误。", { duration: 2000, type: "div" });
                    return
                }
                console.log('可以提交',this.Red_envelopes);
                this.Submission();
            }else if(this.type==2){
                // 节日红包
                 this.Red_envelopes.state=1
                if(!this.Red_envelopes.headline){
                    mui.toast('请填写红包标题。',{ duration: 2000, type: "div" });
                    return
                }else if(!this.Red_envelopes.startTime || !this.Red_envelopes.endTime || this.Red_envelopes.startTime>=this.Red_envelopes.endTime){
                    mui.toast("使用期限有误。", { duration: 2000, type: "div" });
                    return;                    
                }else if(!number_test.test(this.Red_envelopes.amount) || this.Red_envelopes.amount<0){
                    mui.toast("红包金额有误。", { duration: 2000, type: "div" });
                    return
                }else if(!zhengshu_test.test(this.Red_envelopes.quantityMax_1) || this.Red_envelopes.quantityMax_1<1){
                    mui.toast("红包数量有误。", { duration: 2000, type: "div" });
                    return
                }else if(this.Red_envelopes.deductionType==0){
                    if(!this.Red_envelopes.percentage || !number_test.test(this.Red_envelopes.percentage)){
                        mui.toast("可抵扣比例填写有误。", { duration: 2000, type: "div" });
                        return
                    }
                }else if(this.Red_envelopes.deductionType==1){
                    if(!this.Red_envelopes.expire || !number_test.test(this.Red_envelopes.expire) || !this.Red_envelopes.deduction || !number_test.test(this.Red_envelopes.deduction)){
                        mui.toast("满减金额填写有误。", { duration: 2000, type: "div" });
                        return;
                    }
                }
                console.log('可以提交',this.Red_envelopes);
                this.Submission();
                // this.get_redenvelope()
            }else if(this.type==3){
                 this.Red_envelopes.state=1
                if(!this.Red_envelopes.headline){
                    mui.toast('请填写红包标题。',{ duration: 2000, type: "div" });
                    return
                }else if(!this.Red_envelopes.signInStartTime || !this.Red_envelopes.signInEndTime || this.Red_envelopes.signInStartTim>=this.Red_envelopes.signInEndTime){
                    mui.toast('签到时间有误。',{ duration: 2000, type: "div" });
                    return
                }else if(!this.Red_envelopes.startTime || !this.Red_envelopes.endTime || this.Red_envelopes.startTime>=this.Red_envelopes.endTime){
                    mui.toast("使用期限有误。", { duration: 2000, type: "div" });
                    return;
                }else if(!number_test.test(this.Red_envelopes.startAmount) || this.Red_envelopes.startAmount<0){
                    mui.toast("起始金额有误。", { duration: 2000, type: "div" });
                    return
                }else if(!number_test.test(this.Red_envelopes.progressivelyAmount) || this.Red_envelopes.progressivelyAmount<0){
                    mui.toast("递增金额有误。", { duration: 2000, type: "div" });
                    return
                }else if(!zhengshu_test.test(this.Red_envelopes.increaseDays) || this.Red_envelopes.increaseDays<0){
                    mui.toast("递增天数有误。", { duration: 2000, type: "div" });
                    return
                }else if(!zhengshu_test.test(this.Red_envelopes.cycleDays) || this.Red_envelopes.cycleDays<0){
                    mui.toast("循环天数有误。", { duration: 2000, type: "div" });
                    return
                }else if(this.Red_envelopes.increaseDays>15 || this.Red_envelopes.cycleDays>15){
                    mui.toast("递增天数和循环天数不能大于15天。", { duration: 2000, type: "div" });
                    return
                }else if(this.Red_envelopes.increaseDays>this.Red_envelopes.cycleDays){
                    mui.toast("递增天数不能大于循环天数。", { duration: 2000, type: "div" });
                    return
                }else if(this.Red_envelopes.deductionType==0){
                    if(!this.Red_envelopes.percentage || !number_test.test(this.Red_envelopes.percentage)){
                        mui.toast("可抵扣比例填写有误。", { duration: 2000, type: "div" });
                        return
                    }
                }else if(this.Red_envelopes.deductionType==1){
                    if(!this.Red_envelopes.expire || !number_test.test(this.Red_envelopes.expire) || !this.Red_envelopes.deduction || !number_test.test(this.Red_envelopes.deduction)){
                        mui.toast("满减金额填写有误。", { duration: 2000, type: "div" });
                        return;
                    }
                }
                console.log('可以提交',this.Red_envelopes);
                this.Submission()
                // this.get_redenvelope();
            }else if(this.type==4){
                 this.Red_envelopes.state=1
                if(!this.Red_envelopes.headline){
                    mui.toast('请填写红包标题。',{ duration: 2000, type: "div" });
                    return
                }else if(!this.Red_envelopes.startTime || !this.Red_envelopes.endTime || this.Red_envelopes.startTime>=this.Red_envelopes.endTime){
                    mui.toast("使用期限有误。", { duration: 2000, type: "div" });
                    return;
                }else if(!zhengshu_test.test(this.Red_envelopes.quantityMax_1) || this.Red_envelopes.quantityMax_1<1){
                    mui.toast("红包数量有误。", { duration: 2000, type: "div" });
                    return
                }else if(this.Red_envelopes.deductionType==0){
                    if(!this.Red_envelopes.percentage || !number_test.test(this.Red_envelopes.percentage)){
                        mui.toast("可抵扣比例填写有误。", { duration: 2000, type: "div" });
                        return
                    }
                }else if(this.Red_envelopes.deductionType==1){
                    if(!this.Red_envelopes.expire || !number_test.test(this.Red_envelopes.expire) || !this.Red_envelopes.deduction || !number_test.test(this.Red_envelopes.deduction)){
                        mui.toast("满减金额填写有误。", { duration: 2000, type: "div" });
                        return;
                    }
                }
                console.log('可以提交',this.Red_envelopes);
                this.Submission();
                // this.get_redenvelope();
            }else if(this.type==5){
                if(!this.Red_envelopes.headline){
                    mui.toast("请填写红包标题。", { duration: 2000, type: "div" });
                    return
                }else if(!number_test.test(this.Red_envelopes.amount) || this.Red_envelopes.amount<0){
                    mui.toast("红包金额有误。", { duration: 2000, type: "div" });
                    return
                }else if(this.Red_envelopes.deductionType==0){
                    if(!this.Red_envelopes.percentage || !number_test.test(this.Red_envelopes.percentage)){
                        mui.toast("可抵扣比例填写有误。", { duration: 2000, type: "div" });
                        return
                    }
                }else if(this.Red_envelopes.deductionType==1){
                    if(!this.Red_envelopes.expire || !number_test.test(this.Red_envelopes.expire) || !this.Red_envelopes.deduction || !number_test.test(this.Red_envelopes.deduction)){
                        mui.toast("满减金额填写有误。", { duration: 2000, type: "div" });
                        return;
                    }
                }
                console.log('可以提交',this.Red_envelopes);
                this.Submission();
                // this.get_redenvelope();
            }
        },
        //查询该类型的红包 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
        get_redenvelope(){
            var obj={
                    start:0,
                    length:10,
                    shopid:this.myshop.shopid,
                    type:this.type,
                    ccc:1
                }
            this.$axios({
                method:'get',
                url:'/api-s/shops/redenvelope/findAll',
                params:obj
            }).then(x=>{
                console.log(this.type+'类型红包数据',x);
                if(x.data.code==200){
                    if(x.data.data.total==0){
                        this.Submission()
                    }else{
                        var query=this.$route.query;
                        if(query.type){
                            this.Red_envelopes.id=x.data.data.data[0].id;
                            this.Submission();
                        }else{
                            mui.confirm('已有此类红包，是否直接覆盖。','提示',['取消','是的'],(value)=>{
                                if(value.index==1){
                                    this.Red_envelopes.id=x.data.data.data[0].id;
                                    if(x.data.data.data[0].quantityMax){
                                        this.Red_envelopes.quantityMax=this.Red_envelopes.quantityMax_1+x.data.data.data[0].quantityMax
                                    }
                                    this.Submission();
                                }
                            },'div')
                        }
                    }
                }else{
                    mui.toast('查询现有红包失败，请稍后再试。', { duration: 2000, type: "div" });
                }
            }).catch(err=>{
                console.log(err);
                mui.toast('查询现有红包失败，请稍后再试。', { duration: 2000, type: "div" });
            })
        },
        Submission(){
            if(this.Red_envelopes.id){
                this.update();
            }else{
                this.add();
            }
        },
        //添加
        add(){
            this.Red_envelopes.quantityMax=this.Red_envelopes.quantityMax_1;
            openloading(true);
            this.$axios({
                method:'post',
                url:'/api-s/shops/redenvelope/add',
                data:this.Red_envelopes,
            }).then(x=>{
                console.log(x)
                if(x.data.code==200){
                    mui.toast('设置成功。', { duration: 2000, type: "div" });
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
                openloading(false);
            }).catch(err=>{
                mui.toast("系统错误，稍后再试。", { duration: 2000, type: "div" });
                console.log(err)
                openloading(false);
            })
        },
        //修改
        update(){
            openloading(true);
            this.$axios({
                method:'post',
                url:'/api-s/shops/redenvelope/update',
                data:this.Red_envelopes,
            }).then(x=>{
                console.log(x)
                if(x.data.code==200){
                    mui.toast('设置成功。', { duration: 2000, type: "div" });
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
                openloading(false);
            }).catch(err=>{
                mui.toast("系统错误，稍后再试。", { duration: 2000, type: "div" });
                console.log(err)
                openloading(false);
            })
        },  
        //选择抵扣方式
        change_radio_2(x){
            this.Red_envelopes.deductionType=x;
        },
        //根据Id查询红包
        get_redenvelope_id(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/redenvelope/findById/'+this.id
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    var data=x.data.data;
                        if(data.signInStartTime){
                            data.signInStartTime=dateFtt(data.signInStartTime,'yyyy-MM-dd')
                        }
                        if(data.signInEndTime){
                            data.signInEndTime=dateFtt(data.signInEndTime,'yyyy-MM-dd');
                        }
                        if(data.startTime){
                            data.startTime=dateFtt(data.startTime,"yyyy-MM-dd");
                        }
                        if(data.endTime){
                            data.endTime=dateFtt(data.endTime,'yyyy-MM-dd')
                        }
                    this.Red_envelopes=x.data.data;
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err);
                mui.toast('系统错误，稍后再试。', { duration: 2000, type: "div" });
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
        //店铺类型
        this.Picker_type = new mui.PopPicker({
            layer: 1
        });
        //时间选择器
        this.picker_time=new mui.DtPicker({"type":"date"});

        var query=this.$route.query;

        if(query.type){
            this.type=query.type;
            this.url_type=query.type;
            var list=['新人店铺红包','商品红包','节日红包','签到红包','庆典红包','生日红包']
            this.Red_envelopes.headline=list[this.type];
        }else if(query.url_type){
            this.type=query.url_type;
            this.url_type=query.url_type;
            var list=['新人店铺红包','商品红包','节日红包','签到红包','庆典红包','生日红包']
            this.Red_envelopes.headline=list[this.url_type];
        }
        //如果有id就是详情
        if(query.id){
            this.id=query.id;
            this.get_redenvelope_id();
        }

        if(query.hongBaoShuoMing_show){
            this.hongBaoShuoMing_show=true;
        }

        // console.group('------mounted 挂载结束状态------');
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
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch:{
        $route(to,from){
            var query=this.$route.query;
            if(!query.ShopClassification_show){
                this.ShopClassification_show=false;
            }
            if(!query.hongBaoShuoMing_show){
                this.hongBaoShuoMing_show=false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar{
    .wenhao{
        position: absolute;
        height: 44px;
        line-height: 44px;
        font-size: 22px;
        top: 0px;
        right: 15px;
        color: #ffffff;
    }
}

.mui-content{
    padding-bottom: 50px;
}
.mui-switch{
    height: 25px;
    width: 40px;
    .mui-switch-handle{
        width: 22px;
        height: 22px;
    }
}
.box_1{
    margin: 0px 0px 7px 0px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    white-space: nowrap;
    .mui-table-view-cell:after{
        right: 15px;
    }
    .item{
        display: flex;
        align-items: center;
        input{
            height: auto;
            padding: 0px 3px;
            margin: 0px;
            font-size: 14px;
            border: none;
        }
        .title_1{
            width: 90px;
            flex-shrink: 0;
        }
        .input_1{
            flex-grow: 1;
        }
        .radio_1{
            margin: 0px 9px 0px 0px;
            flex-shrink: 0;
        }
        .input_2{
            flex-shrink: 0;
            margin: 0px 7px;
            width: 88px;
            height: 25px;
            background-color: rgba(229, 229, 229, 1);
            input{
                height: 100%;
                background: none;
                text-align: center;
            }
        }
        .hengxian{
            background-color: rgba(229, 229, 229, 1);
            height: 1px;
            width: 27px;
            margin: 0px 8px;
        }
        .tishi_1{
            color: #a6a6a6;
        }
        .wenhao{
            color: #1894dc;
            margin: 0px 7px;
            flex-shrink: 0;
            font-size: 22px;
            width: 22px;
            height: 22px;
        }
    }
}

.box_2{
    padding: 10px 14px 14px;
    color: rgba(128, 128, 128, 1);
	font-size: 12px;
    .indent_1{
        text-indent: 20px;
    }
    .margin_1{
        margin: 0px 0px 15px;
    } 
}
.box_3{
    img{
        width: 100%;
    }
}

.btn_1{
    background: $header_background;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    color: #ffffff;
}

</style>


