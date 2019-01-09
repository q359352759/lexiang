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
    actions: {
        是否享受新人专享({},[obj,query]){
            //query userid 用户Id commodityid 商品Id 
            axios.get('/api-s/shops/counForNewUserExlusive',{params:query}).then(x=>{
                if(x.data.code==200){
                    obj.可享受新人专享=true
                }
            })
        },
        是否享受生日专享({},[obj,query]){
            //query userid 用户Id commodityid 商品Id 
            axios.get('/api-s/shops/countForBrithdayExlusive',{params:query}).then(x=>{
                if(x.data.code==200){
                    obj.可享受生日专享=true
                }
            })
        }
    },
    modules: {
        
    }
}