
import axios from '@/api/axios.js'

import qs from "qs";
// import Vuex from "vuex" ;
export default {
    namespaced:true,
    state:{
        test:"order_state测试",
        list:[],
        ordreId:'',
        openid:'',
        dingdanxiangqing:{},        //订单详情
        xiangqing_2:{},
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
        dingdanxiangqing(state){
            return state.dingdanxiangqing
        },
        xiangqing_2(state){
            return state.xiangqing_2;
        },
        //商品
        new_shangping_list(state){
            var new_list=[];
            var list=state.xiangqing_2.shopOrderCommoditys ? state.xiangqing_2.shopOrderCommoditys : [];
                list.forEach(item=>{
                    var obj=new_list.find(x=>x.commodityid==item.commodityid);
                    if(obj){
                        obj.number++;
                        // obj.dikou=obj.dikou+(item.dikou ? item.dikou : 0);
                        obj.kedikou=obj.kedikou+item.deduction
                    }else{
                        item.kedikou=item.deduction
                        item.number=1;
                        var obj=Object.assign({}, item)
                        new_list.push(obj)
                    }
                });
            return new_list;
        }
    },
    mutations:{
        set_orderid_openid(state,obj){
            console.log('数据初始化',obj)
            state.ordreId=obj.ordreId;
            state.openid=obj.openid
        },
    },
    actions: {
        async get_list({dispatch, commit},obj){
            return new Promise((resolve, reject)=>{
                axios({
                    method: "get",
                    url: "/api-u/area/findAll",
                    params: {start: 0, length: 30000 }
                }).then(x => {
                    console.log("获取地区"+obj, x);
                    resolve(x.data)
                }).catch(error=>{
                    reject(error);
                })
            })
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
        //查询订单详情
        async findShopOrderByIda({dispatch,commit,state}){
            return new Promise((res,err)=>{
                axios.get('/api-s/shops/findShopOrderByIda/'+state.ordreId).then(x=>{
                    console.log('查询订单详情',x);
                    if(x.data.code==200){
                        state.dingdanxiangqing=x.data.data;
                    }
                    res(x);
                }).catch(error=>{
                    console.log(err);
                    err();
                })
            })
        },
        //查询订单下面面的信息
        async findShopOrdersById({state}){
            return new Promise((resolve,reject)=>{
                axios.get('/api-s/shops/findShopOrdersById/'+state.ordreId).then(x=>{
                    if(x.data.code==200){
                        state.xiangqing_2=x.data.data;
                    }
                    resolve()
                }).catch(err=>{
                    reject()
                })
            })
        },
        //调用支付接口
        async shoppingCopy({dispatch,commit,state}){
            console.log('调用支付接口id');
            return new Promise((resolve, reject)=>{
                var query={
                        ordreId:state.ordreId,
                        openid:state.openid
                    }
                    alert(JSON.stringify(query))
                axios({
                    method:'post',
                    url:'/api-s/shops/shoppingCopy',
                    data:qs.stringify(query)
                }).then(x=>{
                    console.log(x);
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
                        }
                    });
                    resolve(x)
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