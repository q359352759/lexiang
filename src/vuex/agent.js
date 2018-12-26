import axios from '@/api/axios.js'

import ShopBonus from '@/vuex/agent/ShopBonus.js'
//代理商
import RegionalAgent from '@/vuex/agent/RegionalAgent.js'   
export default {
    namespaced:true,
    state:{
        
    },
    getters:{

    },
    mutations:{
        
    },
    actions: {
        //通过电话号码获取代理人信息
        get_agentUser_phone({},phone){
            console.log(phone)
            return new Promise((resolve, reject) => {
                axios.get('/api-u/agentUser/selectOne?phone='+phone).then(x=>{
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })    
            });
        }
    },
    modules: {
        ShopBonus:ShopBonus,
        RegionalAgent:RegionalAgent
    }
}