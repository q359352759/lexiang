
import axios from '@/api/axios.js'

import qs from "qs";
import { openloading } from "@/assets/js/currency.js";

// import Vuex from "vuex" ;
export default {
    namespaced:true,
    state:{
        test:"order_state测试",
        list:[],
        ordreId:'',
        openid:'',
        dingdanxiangqing:{},        //订单详情 基本信息
        dikouxiangqing_show:false,  //抵扣详情显示框
        // ...mapState({
        //     test:state=>state.orders.order.test
        // })
    },
    getters:{
        // ...mapGetters({
        //     test:'orders/order/test',   //过滤后的商品
        // }),
        test(state){
            // this.$store.getters.doneTodos  这种写法和下面的写法不一样
            return 'order_getters测试';
        },
        dikouxiangqing_show(state){
            return state.dikouxiangqing_show;
        },
        dingdanxiangqing(state){
            return state.dingdanxiangqing
        },
        //展示的商品
        new_shangping_list(state){
            var new_list=[];
            var list=state.dingdanxiangqing.shopOrderCommoditys ? state.dingdanxiangqing.shopOrderCommoditys : [];
                list.forEach(item=>{
                    var obj=new_list.find(x=>x.commodityid==item.commodityid);
                    if(obj){
                        obj.number++;
                        obj.dikou=obj.dikou+(item.realDeduction ? item.realDeduction : 0);
                        // obj.kedikou=obj.kedikou+(item.realDeduction ? item.realDeduction : 0)
                    }else{
                        item.dikou=item.realDeduction ? item.realDeduction : 0
                        item.number=1;
                        var obj=Object.assign({}, item)
                        new_list.push(obj);
                    }
                });
            return new_list;
        },
        //显示商品抵扣的数据和其他抵扣的数据
        shangpin_dikou_list(state){
            var new_list=[];    //商品抵扣的数据
            var qita_list=[];   //其他抵扣或者没有抵扣的数据
            var dikou_hongbao=[];
            var list=state.dingdanxiangqing.shopOrderCommoditys ? state.dingdanxiangqing.shopOrderCommoditys : [];
            list.forEach(item => {
                //计算使用了多少红包
                var hongbao_list=item.shopOrderRedEnvelopeList;
                hongbao_list.forEach(x=>{
                    // 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
                    if(x.envelopeType==1){
                        //商品红包不需要计算是否抵扣 一个商品一个红包
                        dikou_hongbao.push({"name":'商品红包',type:x.envelopeType});
                    }else{
                        let obj=dikou_hongbao.find(e=>e.type==x.envelopeType);
                        //判断红包是否有使用过除商品以外其他红包可以抵扣多个商品
                        if(!obj){
                            if(x.envelopeType==0){
                                dikou_hongbao.push({"name":'店铺红包',type:x.envelopeType});
                            }else if(x.envelopeType==2){
                                dikou_hongbao.push({"name":'节日红包',type:x.envelopeType});
                            }else if(x.envelopeType==3){
                                dikou_hongbao.push({"name":'店铺签到红包',type:x.envelopeType});
                            }else if(x.envelopeType==4){
                                dikou_hongbao.push({"name":'庆典红包',type:x.envelopeType});
                            }else if(x.envelopeType==5){
                                dikou_hongbao.push({"name":'生日红包',type:x.envelopeType});
                            }else if(x.envelopeType==8){
                                dikou_hongbao.push({"name":'平台',type:x.envelopeType});
                            }
                        }
                    }
                })

                //判断有没有使用商品红包
                if(item.shopOrderRedEnvelopeList.length>0 && item.shopOrderRedEnvelopeList[0].envelopeType==1){
                    //判断 new_list 中是否有这个商品
                    var obj=new_list.find(x=>x.commodityid==item.commodityid);
                    if(obj){
                        obj.hongbao_number=obj.hongbao_number+1;
                        obj.number=obj.number+1;
                        obj.dikou=obj.dikou+item.realDeduction
                        // obj.hongbao.push();
                    }else{
                        item.number=1;
                        item.hongbao_number=1;
                        item.dikou=item.realDeduction;
                        item.hongbao=[item.shopOrderRedEnvelopeList[0]]
                        new_list.push(item);
                    }
                }else{
                    var obj=qita_list.find(x=>x.commodityid==item.commodityid);
                    // var newobj=Object.assign({}, item.shopOrderCommoditys)
                    if(obj){
                        obj.hongbao_number=obj.hongbao_number+1;
                        obj.number=obj.number+1;
                        obj.dikou=obj.dikou+item.realDeduction
                    }else{
                        item.number=1;
                        item.hongbao_number=1;
                        item.dikou=item.realDeduction;
                        item.hongbao=item.shopOrderRedEnvelopeList;
                        qita_list.push(item);
                    }
                }
            });
            var obj={
                    shangpin_dikou_list:new_list,
                    qita_dikou_list:qita_list,
                    dikou_hongbao:dikou_hongbao
                }
            return obj;
        },
    },
    mutations:{
        set_orderid_openid(state,obj){
            console.log('数据初始化',obj)
            state.ordreId=obj.ordreId;
            state.openid=obj.openid;
        },
    },
    actions: {
        //设置弹出来是否显示
        get_dikouxiangqing_show({state},type){
            state.dikouxiangqing_show=type;
        },
        async set_list({dispatch , commit},data){
            await dispatch('get_list',data);
            console.log('获取地区',data)
        },
        //openid和orderid初始化
        async set_orderid_openid({dispatch,commit,state},obj){
            return new Promise((resolve, reject)=>{
                commit('set_orderid_openid',obj);
                resolve()
            })
        },
        //查询订单下面面的信息
        async findShopOrdersById({state}){
            openloading(true);
            return new Promise((resolve,reject)=>{
                axios.get('/api-s/shops/findShopOrdersById/'+state.ordreId).then(x=>{
                    if(x.data.code==200){
                        state.dingdanxiangqing=x.data.data;
                    }
                    openloading(false);
                    resolve(x)
                }).catch(err=>{
                    openloading(false);
                    reject()
                })
            })
        },
        //调用支付接口
        async shoppingCopy({dispatch,commit,state}){
            console.log('调用支付接口id');
            openloading(true);
            return new Promise((resolve, reject)=>{
                var this_1=this;
                var query={
                        // ordreId:state.ordreId,
                        openid:state.openid,
                        ordreId:state.dingdanxiangqing.ordersid
                    }
                axios({
                    method:'post',
                    url:'/api-s/shops/shoppingCopy',
                    data:qs.stringify(query)
                }).then(x=>{
                    console.log(x);
                    openloading(false)
                    var data=x.data;
                    wx.chooseWXPay({
                        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paysign, // 支付签名
                        success: function(res){
                            // 支付成功后的回调函数
                            console.log(res);
                            this_1.findShopOrdersById()
                        }
                    });
                    resolve(x);
                }).catch(err=>{
                    mui.toast('系统错误', {duration: "long", type: "div" });
                    reject(err);
                })
            })
        }
    },
    modules: {
        
    }
}