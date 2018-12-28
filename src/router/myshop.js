

const ApplicationDistribution = () => import ("@/views/myshop/distribution/ApplicationDistribution.vue"); //申请 开通分销功能

// 营销
// 红包发放记录
const RedPacketRecords = () => import ("@/views/myshop/Marketing/RedPackets/RedPacketRecords.vue"); //申请 开通分销功能

// 评论
const 评论列表 = () => import ("@/views/myshop/评论/评论列表.vue"); //我的店铺 评论列表

//会员
const MemberList=()=>import('@/views/myshop/Member/MemberList')     //店铺会员 

//提现
const 提现= resolve => { require.ensure([], () => {resolve( require('@/views/myshop/提现.vue') )}) }
const 提现记录= resolve => { require.ensure([], () => {resolve( require('@/views/myshop/提现记录.vue') )}) }

//销售
const 销售=resolve=>{ require.ensure([], () => {resolve( require('@/views/myshop/销售/销售.vue') )}) }  
const 订单详情=resolve=>{ require.ensure([], () => {resolve( require('@/views/myshop/销售/订单详情.vue') )}) }  //订单详情
const 报表=resolve=>{ require.ensure([], () => {resolve( require('@/views/myshop/销售/报表.vue') )}) }  //报表

import dianyuan from '@/router/dianyuan.js'
//myshop       开头
const myshops=[
    ...dianyuan,
    {
        path:'/myshop/WithdrawMoney',
        name:'',
        component:提现
    },{
        path:'/myshop/tixianjilu',
        name:'',
        component:提现记录
    },
    // /myshop/distribution     分销
    {
        path: '/myshop/distribution/ApplicationDistribution',
        name:'',
        component: ApplicationDistribution,
    },
    // /myshop/Marketing/RedPackets 红包
    {
        path: "/myshop/Marketing/RedPackets/RedPacketRecords", 
        name: "",
        component: RedPacketRecords
    },{
        path:'/myshop/comment/commentList',
        name:'',
        component:评论列表
    },{
        path:'/myshop/Member/MemberList',
        name:'',
        component:MemberList
    },
    // /myshop/xiaoshou/    销售
    {
        path:'/myshop/xiaoshou/xiaoshou',
        name:'',
        component:销售
    },
    {
        path:'/myshop/xiaoshou/orderDetails',
        name:'',
        component:订单详情
    },{
        path:'/myshop/xiaoshou/baobiao',
        name:'',
        component:报表
    }

]

export default myshops;