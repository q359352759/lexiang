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
                }).catch(err=>{
                    reject(err);
                })
            });
        },
        //根据身份证号查询是否已经用于代理人或者红购使者
        查询认证情况({},idNumber){
            return new Promise((resolve, reject) => {
                axios.get('/api-u/certification/countCertificationAgent?idNumber='+idNumber).then(x=>{
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