const AboutUs = resolve => { require.ensure([], () => { resolve(require("@/views/my/AboutUs.vue")); }); };
const 评价 = resolve => { require.ensure([], () => { resolve(require("@/views/my/评价/评价.vue")); }); }; 
const 现金评价 = resolve => { require.ensure([], () => { resolve(require("@/views/my/评价/现金评价.vue")); }); };
const 评价详情 = resolve => { require.ensure([], () => { resolve(require("@/views/my/评价/评价详情.vue")); }); };

//my       开头
const mys = [
    {
        path: "/my/AboutUs",
        name: "",
        component: AboutUs
    },
    {
        path: "/my/pingjia/pingjia",
        name: "",
        component: 评价
    },
    {
        path:'/my/pingjia/xianjinPingjia',
        name:"",
        component:现金评价
    },{
        path:"/my/pingjia/xiangqing",
        name:"",
        component:评价详情
    }
];

export default mys;
