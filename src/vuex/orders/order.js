
import axios from '@/api/axios.js'

// import Vuex from "vuex" ;
export default {
    namespaced:true,
    state:{
        test:"order_state测试",
        list:[]
    },
    getters:{
        test(state){
            // this.$store.getters.doneTodos  这种写法和下面的写法不一样
            return 'order_getters测试';
        },
    },
    mutations:{
        
    },
    actions: {
        async get_list({dispatch, commit}){
            return new Promise((resolve, reject)=>{
                axios({
                    method: "get",
                    url: "/api-u/area/findAll",
                    params: {start: 0, length: 30000 }
                }).then(x => {
                    console.log("获取地区", x);
                    resolve(x.data)
                }).catch(error=>{
                    reject(error);
                })
            })
        },
        async set_list({dispatch , commit}){
            await dispatch('get_list');
            console.log('获取地区')
        }
    },
    modules: {
        
    }
}