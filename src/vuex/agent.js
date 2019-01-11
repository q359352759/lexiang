import axios from '@/api/axios.js'

import ShopBonus from '@/vuex/agent/ShopBonus.js'
//代理商
import RegionalAgent from '@/vuex/agent/RegionalAgent.js';
import 分润 from '@/vuex/agent/分润.js'
export default {
    namespaced:true,
    state:{
        代理人信息:''
    },
    getters:{
        代理人信息(state){
            return state.代理人信息
        },
    },
    mutations:{
        
    },
    actions: {
        //通过电话号码获取代理人信息
        get_agentUser_phone({state},phone){
            console.log(phone)
            return new Promise((resolve, reject) => {
                axios.get('/api-u/agentUser/selectOne?phone='+phone).then(x=>{
                    state.代理人信息=x
                    resolve(x)
                }).catch(err=>{
                    reject(err)
                })    
            });
        },
        获取代人信息({state}){
            return new Promise((resolve, reject) => {
                var userInfo=JSON.parse(localStorage.userInfo);
                axios.get('/api-u/agentUser/me?userid='+userInfo.username).then(x=>{
                    // console.log('获取代理人信息',x);
                    if(x.data.code==200){
                        state.代理人信息=x.data.data;
                    }
                    resolve(x);
                }).catch(err=>{
                    reject(err);
                })
            });
        }
    },
    modules: {
        ShopBonus:ShopBonus,
        RegionalAgent:RegionalAgent,
        分润:分润
    }
}