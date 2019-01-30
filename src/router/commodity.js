// 商品详情
const CommodityDetails = resolve => { require.ensure([], () => { resolve(require("@/views/Commodity/CommodityDetails.vue")); }); };
//购买单个商品
const PurchaseSingle = resolve => { require.ensure([], () => { resolve(require("@/views/Commodity/PurchaseSingle.vue")); }); };
const 评论列表 = resolve => { require.ensure([], () => { resolve(require("@/views/Commodity/评论列表.vue")); }); }; 

//commodity       开头
const commodity = [
    {
        path: "/commodity/CommodityDetails",
        name: "",
        component: CommodityDetails,
        meta: {
            无需登录:true
        }
    },
    {
        path: "/commodity/PurchaseSingle",
        name: "",
        component: PurchaseSingle
    },
    {
        path:"/commodity/pinglunliebiao",
        name:"",
        component:评论列表
    }
];

export default commodity;
