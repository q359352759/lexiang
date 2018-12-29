import axios from '@/api/axios.js'
import qs from "qs";


export default {
    namespaced:true,
    state:{
        实名信息:'',
        test:'',
    },
    getters:{
        实名信息(state){
            return state.实名信息
        },
        test(state){
            return state.test;
        }
    },
    mutations:{
        test(state){
            state.test=state.test+'a'
        }
    },
    actions: {
        test({state,commit}){
            console.log(1)
            commit('test')
        },
        获取认证({state},username){
            return new Promise((resolve, reject) => {
                axios.get("/api-u/certification/findByUserid?userid="+username).then(x=>{
                    state.实名信息=x.data
                    resolve(x);
                }).then(err=>{
                    reject(err);
                })
            });
        }
    },
    modules: {
        
    }
}