import axios from "@/api/axios.js";

import qs from "qs";

export default {
    namespaced: true,
    state: {
        分销类型:[],
        自定义业务:[],
        获取招募信息:2,     //0没有申请 1已经申请过了 2 失败
        是否再次提交:false,
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
        }
    },
    getters: {
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
        查询分销类型({state}){
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/businessOptionsTypeGetFindAll').then(x=>{
                    if(x.data.code==200){
                        state.分销类型=x.data.data;
                    }
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
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
                axios.get('/api-s/shops/findShopBusinessOptionsAll',{params:query}).then(x=>{
                    if(x.data.code==200){
                        state.自定义业务=x.data.data.data;
                    }
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })
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
        查询店铺招募信息({state , rootGetters}){
            return new Promise((resolve, reject) => {
                var 店铺=rootGetters['get_myshop'];
                var query={
                    start:0,
                    length:10,
                    shopid:店铺.shopid
                }
                axios.get('/api-s/shops/findShopRecruitmentAll',{params:query}).then(x=>{
                    console.log('查询店铺招募信息',x);
                    if(x.data.code==200){
                        var data=x.data.data.data;
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
        }
    },
    modules: {}
};
