
import axios from '@/api/axios.js'
import qs from "qs";

export default {
    namespaced:true,
    state:{
        type:0,
        //商家
        list_1:{
            loading:true,
            list:[],
            total:0,
            page_index:0,
            query:{
                type:1,     //1店铺 2 用户的推荐人 3区域代理商
                start:0,
                length:20,
                getShareProfitUser:'',  //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
            }
        },
        //会员
        list_2:{
            loading:true,
            list:[],
            total:0,
            page_index:0,
            query:{
                type:2,     //1店铺 2 用户的推荐人 3区域代理商
                start:0,
                length:20,
                getShareProfitUser:'',  //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
            }
        },
        商家:{
            loading:true,
            list:[],
            total:0,
            page_index:0,
            query:{
                start:0,
                length:20,
                getShareProfitUser:'',
                state:1,
                phone:''  
            }
        },
        会员:{
            loading:true,
            list:[],
            total:0,
            page_indexA:0,
            query:{
                start:0,
                length:20,
                agentId:'',
                state:1            
            }
        },
        dailiren_fenrun_zichan:{}
    },
    getters:{
        get_list1(state){
            return state.list_1
        },
        get_list2(state){
            return state.list_2
        },
        get_type(state){
            return state.type
        },
        dailiren_fenrun_zichan(state){
            return state.dailiren_fenrun_zichan;
        },
        商家(state){
            return state.商家;
        },
        会员(state){
            return state.会员;
        }
    },
    mutations:{
        
    },
    actions: {
        //设置类型
        set_type({state},type){
            state.type=type;
        },
        //数据初始化
        ShopBonus_init({state}){
            var userInfo=JSON.parse(localStorage.userInfo);
            state.list_1={
                loading:true,
                list:[],
                total:0,
                page_index:0,
                query:{
                    type:1,     //1店铺 2 用户的推荐人 3区域代理商
                    start:0,
                    length:20,
                    getShareProfitUser:userInfo.username,  //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
                }
            }
            state.list_2={
                loading:true,
                list:[],
                total:0,
                page_index:0,
                query:{
                    type:2,     //1店铺 2 用户的推荐人 3区域代理商
                    start:0,
                    length:20,
                    getShareProfitUser:userInfo.username,  //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
                }
            }
            state.商家={
                loading:true,
                list:[],
                total:0,
                page_index:0,
                query:{
                    start:0,
                    length:20,
                    getShareProfitUser:userInfo.username,
                    state:1,
                    phone:userInfo.phone
                }
            }
            state.会员={
                loading:true,
                list:[],
                total:0,
                page_index:0,
                query:{
                    start:0,
                    length:20,
                    agentId:userInfo.username,
                    state:1      
                }
            }
        },
        //获取类表
        get_list({state},obj){
            obj.loading=true;
            obj.query.start=obj.page_index*obj.query.length;
            return new Promise((resolve, reject) => {
                // /shops/findAllShareProfitTable
                axios.get('/api-s/shops/findAllShareProfitTable',{params:obj.query}).then(x=>{
                    console.log('获取分润信息',x);
                    if(x.data.code==200){
                        obj.list=obj.list.concat(x.data.data.data);
                        obj.total=x.data.data.total;
                    }
                    obj.loading=false;
                    resolve(x);
                }).catch(err=>{
                    reject(err)
                    obj.loading=false;
                })
            });
        },
        //下一页
        xiayiye({dispatch},obj){
            if(obj.list.length<obj.total && !obj.loading){
                obj.page_index++;
                dispatch('get_list',obj);
            }
        },
        获取商家分润列表({state}){
            state.商家.loading=true;
            state.商家.query.start=state.商家.page_index*state.商家.query.length
            axios.get('/api-s/shops/sumForAgentProfit',{params:state.商家.query}).then(x=>{
                if(x.data.code==200){
                    state.商家.list=state.商家.list.concat(x.data.data.data);
                    state.商家.total=x.data.data.total;
                }
                state.商家.loading=false;
            }).catch(err=>{
                state.商家.loading=false;
            })
        },
        获取会员分润列表({state}){
            state.会员.loading=true;
            state.会员.query.start=state.会员.page_index*state.会员.query.length
            axios.get('/api-s/shops/userSumForAgentProfit',{params:state.会员.query}).then(x=>{
                if(x.data.code==200){
                    state.会员.list=state.会员.list.concat(x.data.data.data);
                    state.会员.total=x.data.data.total;
                }
                state.会员.loading=false;
            }).catch(err=>{
                state.会员.loading=false;
            })
        },
        商家下一页({dispatch,state}){
            state.商家.page_index++;
            dispatch('获取商家分润列表')
        },
        会员下一页({dispatch,state}){
            state.会员.page_index++;
            dispatch('获取会员分润列表')
        },
        //查询代理人分润
        dailiren_fenrun({state}){
            var userInfo=JSON.parse(localStorage.userInfo);
            var obj={
                    userid:userInfo.username,
                    userType:1 //代理人
                }
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/findAgentsShareProfitByUseridAndUserType',{params:obj}).then(x=>{
                    console.log('获取代理商分润资产',x)
                    if(x.data.code==200){
                        state.dailiren_fenrun_zichan=x.data.data;
                    }
                }).catch(err=>{
                    console.log('获取代理商分润资产',err);
                })
            });
        },

    },
    modules: {
        
    }
}