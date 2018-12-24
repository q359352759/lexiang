

const ApplicationDistribution = () => import ("@/views/myshop/distribution/ApplicationDistribution.vue"); //申请 开通分销功能

// 营销
// 红包发放记录
const RedPacketRecords = () => import ("@/views/myshop/Marketing/RedPackets/RedPacketRecords.vue"); //申请 开通分销功能

// 评论
const commentList = () => import ("@/views/myshop/comment/commentList.vue"); //我的店铺 评论列表

//会员
const MemberList=()=>import('@/views/myshop/Member/MemberList')     //店铺会员 

//提现
const WithdrawMoney= resolve => { require.ensure([], () => {resolve( require('@/views/myshop/WithdrawMoney.vue') )}) }

//销售
const xiaoshou=resolve=>{ require.ensure([], () => {resolve( require('@/views/myshop/xiaoshou/xiaoshou.vue') )}) }  
const orderDetails=resolve=>{ require.ensure([], () => {resolve( require('@/views/myshop/xiaoshou/orderDetails.vue') )}) }  //订单详情
//myshop       开头
const myshops=[
    {
        path:'/myshop/WithdrawMoney',
        name:'',
        component:WithdrawMoney
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
        component:commentList
    },{
        path:'/myshop/Member/MemberList',
        name:'',
        component:MemberList
    },
    // /myshop/xiaoshou/    销售
    {
        path:'/myshop/xiaoshou/xiaoshou',
        name:'',
        component:xiaoshou
    },
    {
        path:'/myshop/xiaoshou/orderDetails',
        name:'',
        component:orderDetails
    }

]

export default myshops;