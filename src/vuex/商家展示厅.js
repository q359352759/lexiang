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
        shopid:''
    }
}
const 分数={
    "one":0,
    "two":0,
    "three":0,
    "four":0,
    "five":0,
    "scoreAvg":5.0
}
export default {
    namespaced: true,
    state: {
        shopid:'',
        评论:{
            page_index:0,
            list:[],
            total:0,
            loading:true,
            query:{
                start:0,
                length:10,
                shopid:''
            }
        },
        分数:{
            "one":0,
            "two":0,
            "three":0,
            "four":0,
            "five":0,
            "scoreAvg":5.0
        }
    },
    getters: {
        评论(state){
            return state.评论
        },
        分数(state){
            return state.分数
        }
    },
    mutations: {
        
    },
    actions: {
        初始化({state},shopid){
            state.shopid=shopid
            state.评论=JSON.parse(JSON.stringify(评论));
            state.分数=JSON.parse(JSON.stringify(分数));
        },
        查询评价({state , dispatch },query){
            state.评论.query.shopid=state.shopid;
            state.评论.query.start=state.评论.page_index*state.评论.query.length;
            state.评论.loading=true;
            dispatch('评论/查询评价',state.评论.query , {root: true}).then(x=>{
                if(x.data.code==200){
                    var list=x.data.data.data;
                    list.forEach(item => {
                        item.用户={};
                        //0表示没有登录或者查询错误 1 表示没有点赞 2表示已经点赞
                        item.是否点赞=0;
                        dispatch('通过username查询用户',item)
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
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
            // commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
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
        },
        查询店铺评分({state},店铺Id){
            var query={
                shopid:店铺Id
            }
            return new Promise((resolve, reject) => {
                axios.get('/api-s/shops/commodityScoreAvg',{params:query}).then(x=>{
                    console.log('店铺评分',x);
                    if(x.data.code==200){
                        if(x.data.data.length>0){
                            state.分数=x.data.data[0]
                        }
                    }
                }).catch(err=>{
    
                })
            });
        }
    },
    modules: {}
};
