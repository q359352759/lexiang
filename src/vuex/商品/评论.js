import axios from "@/api/axios.js";
import qs from "qs";
const 评论={
    page_index:0,
    list:[],
    total:0,
    loading:true,
    query:{
        start:0,
        length:10,
        commodityid:''
    }
}
export default {
    namespaced: true,
    state: {
        商品id:'',
        评论:{
            page_index:0,
            list:[],
            total:0,
            loading:true,
            query:{
                start:0,
                length:10,
                commodityid:''
            }
        }
    },
    getters: {
        评论(state){
            return state.评论
        }
    },
    mutations: {
        
    },
    actions: {
        初始化({state},商品id){
            state.商品id=商品id
            state.评论=JSON.parse(JSON.stringify(评论));
        },
        查询评价({state , dispatch },query){
            state.评论.query.commodityid=state.商品id;
            state.评论.query.start=state.评论.page_index*state.评论.query.length;
            state.评论.loading=true;
            dispatch('评论/查询评价',state.评论.query , {root: true}).then(x=>{
                console.log('查询评论');
                if(x.data.code==200){
                    var list=x.data.data.data;
                    list.forEach(item => {
                        item.用户={};
                        dispatch('通过username查询用户',item)
                        item.是否点赞=0;
                        dispatch('查询点赞',item)
                        item.shopCommodityCommentList.forEach(item_1=>{
                            item_1.用户={}
                            item_1.店员={}
                            dispatch('通过username查询用户',item_1)
                            dispatch('员工基本信息',item_1)
                        })
                    });
                    state.评论.list=state.评论.list.concat(list);
                    state.评论.total=x.data.data.total
                }
                state.评论.loading=false;
            }).catch(err=>{
                state.评论.loading=false;
            })
        },
        评价下一页({state,dispatch}){
            if(!state.评论.loading && state.评论.list.length<state.评论.total){
                state.评论.page_index++;
                dispatch('查询评价')
            }
        },
        查询点赞({dispatch},item){
            try {
                var userInfo=JSON.parse(localStorage.userInfo);
            } catch (error) {
                return
            }
            if(userInfo){
                    var query={
                        start:0,
                        length:10,
                        commentid:item.id,
                        userid:userInfo.username
                    }
                dispatch('评论/查询点赞',query,{root:true}).then(x=>{
                    if(x.data.code==200){
                        item.是否点赞=x.data.data.data.length==0 ? 1 : 2
                    }
                })
            }
        },
        //列表专用
        通过username查询用户({ }, item) {
            if(!item.userid) return;
            axios.get("/api-u/users/findByUserid/" + item.userid).then(x => {
                if(x.data.code==200){
                    item.用户=x.data.data;
                }
            }).catch(err => {});
        },
        //列表专用
        员工基本信息({ state }, item) {
            if(!item.clerksid) return;
            axios.get("/api-s/shops/findShopClerksByClerksid?clerksid=" + item.clerksid).then(x => {
                if(x.data.code==200){
                    item.店员 = x.data.data;
                }
            }).catch(err => {});
        }
    },
    modules: {}
};
