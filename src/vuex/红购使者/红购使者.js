import axios from '@/api/axios.js'
import qs from "qs";


export default {
    namespaced:true,
    state:{
        查看类型:0
    },
    getters:{
        查看类型(state){
            return state.查看类型
        }
    },
    mutations:{
    },
    actions: {
        设置查看类型({state},type){
            state.查看类型=type
        }
    },
    modules: {
        
    }
}