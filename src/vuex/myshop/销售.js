import axios from '@/api/axios.js'

import qs from "qs";

export default {
    namespaced:true,
    state:{

    },
    getters:{
        
    },
    mutations:{
    },
    actions:{
        查询销售统计({state},query){
            return new Promise((resolve, reject) => {
                // http://192.168.1.16:10002/api-s/shops/findAmountSum?shopid=D5995964EE8D9AA3B630CAE96679253F&state=1&startTime=2019-01-01&endTime=2019-01-30
                axios.get('/api-s/shops/findAmountSum',qs.stringify(query)).then(x=>{
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
            });
        }
    },
    modules: {
        
    }
}