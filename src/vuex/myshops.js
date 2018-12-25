import axios from '@/api/axios.js'

import qs from "qs";

import zichan from '@/vuex/myshop/zichan.js'
export default {
    namespaced:true,
    state:{
        referrer_show:false,    //推荐人显示框
        referrer:{},            //获取推荐人
    },
    getters:{
        referrer_show(state){
            return state.referrer_show;
        },
        referrer(state){
            return state.referrer;
        }
    },
    mutations:{
    },
    actions: {
        set_referrer_show({state},type){
            state.referrer_show=type
        }
    },
    modules: {
        zichan:zichan
    }
}