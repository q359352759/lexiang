
// 商品详情
const 申请成为使者说明 = resolve => { require.ensure([], () => { resolve(require("@/views/红购使者/申请成为使者说明.vue")); }); }; //商品详情
const 申请成为使者 = resolve => { require.ensure([], () => { resolve(require("@/views/红购使者/申请成为使者.vue")); }); }; //商品详情
const 红购使者 = resolve => { require.ensure([], () => { resolve(require("@/views/红购使者/红购使者.vue")); }); }; //商品详情

//commodity       开头
const list=[
    {
        path: '/shizhe/shenqingshuoming',
        name:'',
        component: 申请成为使者说明,
    },{
        path:'/shizhe/shenqing',
        name:"",
        component:申请成为使者
    },{
        path:'/shizhe/honggoushizhe',
        name:"",
        component:红购使者
    }
]

export default list;