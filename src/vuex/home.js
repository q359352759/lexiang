
import axios from '@/api/axios.js'
import qs from "qs";

import 优购 from './home/优购.js'
import 搜索 from './home/搜索.js'
import 推广小图标 from './home/推广小图标.js'
export default {
    namespaced:true,
    state: {
        专享:{
            page_index:0,
            total:0,
            loading:true,
            list:[],
            query:{
                start:0,
                length:10,
                order:'popularity', //sales 销量 popularity 人气，
                orderType:'DESC' //DESC
            }
        }
    },
    getters: {
        专享(state){
            return state.专享
        }
    },
    mutations: {
    },
    actions: {
        查询专享({state}){
            return new Promise((resolve, reject) => {
                state.专享.loading=true;
                state.专享.query.start=state.专享.page_index*state.专享.query.length;
                axios.get('/api-s/shops/findAllExclusive',{params:state.专享.query}).then(x=>{
                    if(x.data.code==200){
                        state.专享.list=state.专享.list.concat(x.data.data.data);
                        state.专享.total=x.data.data.total;
                    }
                    state.专享.loading=false;
                    resolve()
                }).catch(err=>{
                    state.专享.loading=false;
                    reject()
                })
            });
        },
        专享下一页({state,dispatch}){
            if(!state.专享.loading && state.专享.list.length<state.专享.total){
                state.专享.page_index++;
                dispatch('查询专享');
            }
        }
    },
    modules: {
        优购:优购,
        搜索:搜索,
        推广小图标:推广小图标
    }
}

// store.commit( 'hongbao/...');



