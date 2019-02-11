const 申请分销介绍 = () => import("@/views/myshop/分销/申请介绍.vue"); 
const 发布招募 = () => import("@/views/myshop/分销/发布招募.vue");
const 编辑宣传页 = () => import("@/views/myshop/分销/编辑宣传页.vue");
const 招募预览 = () => import("@/views/myshop/分销/招募预览.vue");
const 选择招募区域=()=>import("@/views/myshop/分销/选择招募区域.vue")
const 分销=[
    {
        path: "/myshop/fenxiao/shenqingJieshao",
        name: "",
        component: 申请分销介绍
    },
    {
        path:"/myshop/fenxiao/fabuzhaomu",
        name:"",
        component:发布招募
    },
    {
        path:"/myshop/fenxiao/bianjiye",
        name:"",
        component:编辑宣传页
    },{
        path:"/myshop/fenxiao/yulan",
        name:"",
        component:招募预览
    },{
        path:'/myshop/fenxiao/xuanzeQuyu',
        name:"",
        component:选择招募区域
    }
]

export default 分销;