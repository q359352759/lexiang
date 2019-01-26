import axios from "@/api/axios.js";

import { openloading } from "@/assets/js/currency.js";
// import qs from "qs";
const list_all={
    //全部
    loading: true,
    page_index: 0,
    list: [],
    total: 0,
    query: {
        start: 0,
        length: 10,
        // state:0,
        userid: ""
    }
}
const list_0={
    //带支付
    loading: true,
    page_index: 0,
    list: [],
    total: 0,
    query: {
        start: 0,
        length: 10,
        state: 0,
        userid: ""
    }
}
const 待评价={
    //带评价
    loading: true,
    page_index: 0,
    list: [],
    total: 0,
    query: {
        start: 0,
        length: 10,
        state: 1,
        userid: ''
    }
}
export default {
    namespaced: true,
    state: {
        查看类型:0,     //0 全部 1 待付款 2 待发货 3 待收货 4 待评价 5 售后
        list_all: {
            //全部
            loading: true,
            page_index: 0,
            list: [],
            total: 0,
            query: {
                start: 0,
                length: 10,
                // state:0,
                userid: ""
            }
        },
        list_0: {
            //带支付
            loading: true,
            page_index: 0,
            list: [],
            total: 0,
            query: {
                start: 0,
                length: 10,
                state: 0,
                userid: ""
            }
        },
        待评价: {
            //带评价
            loading: true,
            page_index: 0,
            list: [],
            total: 0,
            query: {
                start: 0,
                length: 10,
                state: 2,
                userid: ""
            }
        }
    },
    getters: {
        查看类型(state){
            return state.查看类型
        },
        list_all(state) {
            return state.list_all;
        },
        list_0(state) {
            return state.list_0;
        },
        待评价(state) {
            return state.待评价;
        }
    },
    mutations: {},
    actions: {
        设置类型({state},type){
            state.查看类型=type
        },
        //数据初始化
        async init_state({ state }) {
            return new Promise((resolve, reject) => {
                var userInfo = JSON.parse(localStorage.userInfo);
                state.list_all=JSON.parse(JSON.stringify(list_all));
                state.list_all.query.userid=userInfo.username
                
                state.list_0=JSON.parse(JSON.stringify(list_0));
                state.list_0.query.userid=userInfo.username
                
                state.待评价=JSON.parse(JSON.stringify(待评价));
                state.待评价.query.userid=userInfo.username
                // state.待评价 = {
                //     //带评价
                //     loading: true,
                //     page_index: 0,
                //     list: [],
                //     total: 0,
                //     query: {
                //         start: 0,
                //         length: 10,
                //         state: 1,
                //         userid: userInfo.username
                //     }
                // };
                resolve();
            });
        },
        //获取数据
        async get_orderList({ dispatch, commit, state }, [obj, nextPage]) {
            if (nextPage) {
                obj.page_index++;
            }
            obj.query.start = obj.page_index * obj.query.length;
            obj.loading = true;
            return new Promise((resolve, reject) => {
                var params = obj.query;
                axios.get("/api-s/shops/findAllShopOrders", { params }).then(x => {
                    console.log(x);
                    obj.list = obj.list.concat(x.data.data.data);
                    obj.total = x.data.data.total;
                    obj.loading = false;
                }).catch(err => {
                    console.log(err);
                });
            });
        },
        取消订单({ state }, obj) {
            openloading(true);
            return new Promise((resolve, reject) => {
                var newobj = Object.assign({}, obj);
                newobj.state = 2;
                // axios.get('/api-s/shops/deleteShopOrders/'+id).then(x=>{
                axios.post("/api-s/shops/updateShopOrders", newobj).then(x => {
                    console.log(x);
                    openloading(false);
                    if (x.data.code == 200) {
                        mui.toast("取消成功。", { duration: "long", type: "div" });
                        state.list_all.list = state.list_all.list.filter(x => x.id != obj.id);
                        state.list_0.list = state.list_0.list.filter(x => x.id != obj.id);
                    } else {
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                    }
                    resolve();
                }).catch(err => {
                    console.log(err);
                    mui.toast("系统错误稍后再说。", { duration: "long", type: "div" });
                    openloading(false);
                    reject();
                });
            });
        },
        查询待评价订单({state}) {
            state.待评价.loading=true;
            state.待评价.query.start=state.待评价.page_index*state.待评价.query.length
            axios.get('/api-s/shops/orders/findNoRemarkOrder',{params:state.待评价.query}).then(x=>{
                console.log('查询待评价',x);
                if(x.data.code==200){
                    state.待评价.list=state.待评价.list.concat(x.data.data.data);
                    state.待评价.total = x.data.data.total;
                }
                state.待评价.loading=false;
            }).catch(err=>{
                state.待评价.loading=false;
            })
        },
        待评价下一页({state,dispatch}){
            state.待评价.page_index++;
            dispatch('查询待评价订单')
        }
    },
    modules: {}
};
