import axios from "@/api/axios.js";

import { api_获取业务类型列表,api_获取自定义业务 } from "@/api/招募接口.js";

import qs from "qs";
import { dateFtt } from "@/assets/js/currency.js";
export default {
    namespaced: true,
    state: {
        分销类型:[],
        自定义业务:[],
        获取招募信息:2,     //0没有申请 1已经申请过了 2 失败
        是否再次提交:false,     //false 表示需要更新数据;
        招募修改信息:'',
        招募信息:{
            id:"",
            shopid:"",
            cbonum:"",      //业务编码
            cbonumB:"",     //自定义业务编号
            tagline:"",     //宣传语
            position:"",    //职责
            hasexperience:0,   //从业经验
            sex:"",         //性别
            maxage:"",      //最大年龄
            minage:"",      //最小年龄
            phone:"",       //电话
            wechat:"",      //微信号
            bgm:"",         //背景音乐(url)
            leaflets:"",    //宣传页(html)
            recruitment:"", //招募人数
            needrecruitment:"", //供需招募人数
            allrecruitment:"",  //总招募人数
            nowrecruitment:"0",  //当前招募人数
            regionalscope:"本市",   //招募地区
            createtime:"",      //招募开始时间
            overtime:"",        //招募结束时间
            mincommissionscale:"",  //最低分佣比例
            popularity:"",          //招募人气
            state:0,       //状态
            cause:"",       //原因
            applytime:"",   //申请时间
            audittime:"",   //审核时间
            isconsulted:0,  //查阅
            assessorid:"",  // 查阅员
            hidecause:"",   //隐藏原因
            days:0
        },
        招募天数:'',
    },
    getters: {
        招募天数(state){
            return state.招募天数
        },
        招募修改信息(state){
            return state.招募修改信息
        },
        招募信息(state){
            return state.招募信息
        },
        分销类型(state){
            return state.分销类型
        },
        自定义业务(state){
            return state.自定义业务
        },
        获取招募信息(state){
            return state.获取招募信息
        },
        是否再次提交(state){
            return state.是否再次提交
        }
    },
    mutations: {
        修改招募信息(state){
            // console.log(state.招募信息);
            // state.招募信息.tagline;
        }
    },
    actions: {
        设置天数({state},number){
            state.招募天数=number
        },
        设置重新提交({state},type){
            state.是否再次提交=type
        },
        查询分销类型({state}){
            return new Promise((resolve, reject) => {
                api_获取业务类型列表().then(x=>{
                    if(x.data.code==200){
                        state.分销类型=x.data.data;
                    }
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
                // axios.get('/api-s/shops/businessOptionsTypeGetFindAll').then(x=>{
                //     if(x.data.code==200){
                //         state.分销类型=x.data.data;
                //     }
                //     resolve(x);
                // }).catch(err=>{
                //     reject(err);
                // })
            });
        },
        添加自定义业务({},obj){
            return new Promise((resolve, reject) => {
                var loginDate=JSON.parse(localStorage.loginDate);
                var access_token=loginDate.access_token;
                // axios.post('/api-s/shops/addShopBusinessOptions',obj).then(x=>{
                axios.post('/api-s/shops/addShopBusinessOptions',obj,{ headers: { Authorization: "Bearer " + access_token } }).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err);
                })
            });
        },
        查询自定义业务({ state , rootGetters}){
            return new Promise((resolve, reject) => {
                // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
                var 店铺=rootGetters['get_myshop'];
                var query={
                        start:0,
                        length:10,
                        shopid:店铺.shopid
                    }
                api_获取自定义业务(query).then(x=>{
                    if(x.data.code==200){
                        state.自定义业务=x.data.data.data;
                    }
                    resolve(x)
                }).catch(errr=>{
                    reject(err)
                })
                // axios.get('/api-s/shops/findShopBusinessOptionsAll',{params:query}).then(x=>{
                    
                // }).catch(err=>{
                // })
            });
        },
        删除自定义业务({},id){
            return new Promise((resolve, reject) => {
                var loginDate=JSON.parse(localStorage.loginDate);
                var access_token=loginDate.access_token;
                axios.get('/api-s/shops/deleteShopBusinessOptions/'+id,{ headers: { Authorization: "Bearer " + access_token } }).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        添加招募信息({state}){
            return new Promise((resolve, reject) => {
                axios.post('/api-s/shops/addShopRecruitment',state.招募信息).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        修改招募资料({state},obj){
            return new Promise((resolve, reject) => {
                axios.post('/api-s/shops/updateShopRecruitment',obj).then(x=>{
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
            });
        },
        已通过添加修改({},obj){
            return new Promise((resolve, reject) => {
                axios.post('/api-s/shops/addShopRecruitmentCopy',obj).then(x=>{
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
            });
        },
        已通过修改({},obj){
            return new Promise((resolve, reject) => {
                axios.post('/api-s/shops/updateShopRecruitmentCopy',obj).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        查询店铺招募信息_2({},query){
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/findShopRecruitmentAll',{params:query}).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        //商家专用接口 和 上面的接口差不多 但这个是专用的哦
        查询店铺招募信息({state , rootGetters , dispatch}){
            return new Promise((resolve, reject) => {
                var 店铺=rootGetters['get_myshop'];
                var query={
                    start:0,
                    length:10,
                    shopid:店铺.shopid
                }
                axios.get('/api-s/shops/findShopRecruitmentAll',{params:query}).then(x=>{
                    if(x.data.code==200){
                        var data=x.data.data.data;
                        if(data.length>0){
                            console.log(state.是否再次提交)
                            state.招募信息.days=data[0].days;
                            state.招募信息.regionalscope=data[0].regionalscope;
                            if(data[0].state!=state.招募信息.state || !state.是否再次提交){                                
                                state.招募信息=data[0];
                                if(state.招募信息.state==1){
                                    state.是否再次提交=true;
                                }
                            }
                        }else{
                            state.招募信息.id='';
                            state.招募信息.state=0;
                        }
                        if(data.length==0){
                            state.获取招募信息=0;
                        }else{
                            state.获取招募信息=1;
                        }
                    }else{
                        state.获取招募信息=2
                    }
                    resolve()
                }).catch(err=>{
                    state.获取招募信息=2
                    reject()
                })
            });
        },
        查询店铺修改信息({state , rootGetters , dispatch}){
            return new Promise((resolve, reject) => {
                var 店铺=rootGetters['get_myshop'];
                var query={
                    start:0,
                    length:10,
                    shopid:店铺.shopid
                }
                axios.get('/api-s/shops/findShopRecruitmentCopyAll',{params:query}).then(x=>{
                    console.log('店铺修改信息',x)
                    if(x.data.code==200){
                        var data=x.data.data.data;
                        if(data.length>0){
                            if(state.招募修改信息!=data[0].state){
                                //修改状态发生改变
                                state.是否再次提交=false;
                            }
                            state.招募修改信息=data[0]
                        }else{
                            state.招募修改信息='';
                        }
                        resolve()
                    }else{
                        reject()
                    }
                }).catch(err=>{
                    reject()
                })
            });
        },
        调用支付接口({state}){
            return new Promise((resolve, reject) => {
                try {
                    var weixin = JSON.parse(localStorage.weixin);
                } catch (error) {}
                var obj = Object.assign({},state.招募信息);
                    obj.openid = weixin.openid;
                    obj.day = state.招募天数;
                axios.post('/api-s/shops/shopRecruitment/pay',qs.stringify(obj)).then(x=>{
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
            });
        }
    },
    modules: {}
};
