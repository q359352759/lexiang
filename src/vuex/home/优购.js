
import axios from '@/api/axios.js'
import qs from "qs";

export default {
    namespaced:true,
    state: {
        优购:{
            page_index:0,
            total:0,
            loading:true,
            list:[],
            query:{
                start:0,
                length:10,
                state:1,
                order:'popularity', //sales 销量 popularity 人气，
                orderType:'DESC' //DESC
            }
        }
    },
    getters: {
        优购(state){
            return state.优购
        }
    },
    mutations: {
    },
    actions: {
        查询优购({state}){
            return new Promise((resolve, reject) => {
                state.优购.loading=true;
                state.优购.query.start=state.优购.page_index*state.优购.query.length;
                axios.get('/api-s/shops/commodity/findAll',{params:state.优购.query}).then(x=>{
                    if(x.data.code==200){
                        state.优购.list=state.优购.list.concat(x.data.data.data);
                        state.优购.total=x.data.data.total;
                    }
                    state.优购.loading=false;
                    resolve()
                }).catch(err=>{
                    state.优购.loading=false;
                    reject()
                })
            });
        },
        优购下一页({state,dispatch}){
            if(!state.优购.loading && state.优购.list.length<state.优购.total){
                state.优购.page_index++;
                dispatch('查询优购');
            }
        }
    },
    modules: {
        
    }
}

// store.commit( 'hongbao/...');



