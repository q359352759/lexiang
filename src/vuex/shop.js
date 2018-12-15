import axios from '@/api/axios.js'

import qs from "qs";

export default {
    namespaced:true,
    state:{
        shop:{},    //店铺
    },
    getters:{

    },
    mutations:{
        set_shop(state,obj){
            state.shop=obj;
        }
    },
    actions: {
        //根据店铺Id查询店铺
        async get_shop({commit},shopid){
            return new Promise((resolve, reject)=>{
                axios.get('/api-s/shops/findByShopid/'+shopid).then(x=>{
                    if(x.data.code==200){
                        commit('set_shop',x.data.data);
                    }else{
                        reject(x);
                    }
                    resolve();
                }).catch(err=>{
                    reject(err);
                })
            })
        }
    },
    modules: {
        
    }
}