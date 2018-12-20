import axios from '@/api/axios.js'
// import qs from "qs";
export default {
    namespaced:true,
    state:{
        list_all:{                //全部
            loading:true,
            page_index:0,
            list:[],
            total:0,
            query:{
                start:0,
                length:10,
                // state:0,
                userid:'',
            }
        },
        list_0:{                //带支付
            loading:true,
            page_index:0,
            list:[],
            total:0,
            query:{
                start:0,
                length:10,
                state:0,
                userid:'',
            }
        },
        list_2:{                //带评价
            loading:true,
            page_index:0,
            list:[],
            total:0,
            query:{
                start:0,
                length:10,
                state:2,
                userid:'',
            }
        }
    },
    getters:{
        list_all(state){
            return state.list_all
        },
        list_0(state){
            return state.list_0
        },
        list_2(state){
            return state.list_2
        }
    },
    mutations:{

    },
    actions:{
        //数据初始化
        async init_state({state}){
            return new Promise((resolve, reject) => {
                var userInfo=JSON.parse(localStorage.userInfo);
                state.list_all={                //全部
                    loading:true,
                    page_index:0,
                    list:[],
                    total:0,
                    query:{
                        start:0,
                        length:10,
                        // state:0,
                        userid:userInfo.username,
                    }
                }
                state.list_0={                //带支付
                    loading:true,
                    page_index:0,
                    list:[],
                    total:0,
                    query:{
                        start:0,
                        length:10,
                        state:0,
                        userid:userInfo.username,
                    }
                }
                state.list_2={                //带评价
                    loading:true,
                    page_index:0,
                    list:[],
                    total:0,
                    query:{
                        start:0,
                        length:10,
                        state:2,
                        userid:userInfo.username,
                    }
                }
                resolve();
            });
        },
        //获取数据
        async get_orderList({dispatch,commit,state},[obj,nextPage]){
            if(nextPage){
                obj.page_index++
            }
            obj.query.start=obj.page_index*obj.query.length
            obj.loading=true
            return new Promise((resolve, reject) => {
                var params=obj.query;
                axios.get('/api-s/shops/findAllShopOrders',{params}).then(x=>{
                    console.log(x);
                    obj.list=obj.list.concat(x.data.data.data);
                    obj.total=x.data.data.total;
                    obj.loading=false;
                }).catch(err=>{
                    console.log(err);
                })
            });
        }
    },
    modules:{

    }
}