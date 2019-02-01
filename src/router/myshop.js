
// 营销
// 红包发放记录
const RedPacketRecords = () =>import("@/views/myshop/Marketing/RedPackets/RedPacketRecords.vue"); //申请 开通分销功能

// 评论
const 评论列表 = () => import("@/views/myshop/评论/评论列表.vue"); //我的店铺 评论列表

//会员
const MemberList = () => import("@/views/myshop/Member/MemberList.vue"); //店铺会员
const 会员消费记录 = resolve => {require.ensure([], () => {resolve(require("@/views/myshop/Member/会员消费记录.vue"));});}; //会员消费记录

//提现
const 提现 = resolve => {require.ensure([], () => {resolve(require("@/views/myshop/提现.vue"));});};
const 提现记录 = resolve => {require.ensure([], () => {resolve(require("@/views/myshop/提现记录.vue"));});};

//销售
const 销售 = resolve => {require.ensure([], () => {resolve(require("@/views/myshop/销售/销售.vue"));});};
const 订单详情 = resolve => { require.ensure([], () => { resolve(require("@/views/myshop/销售/订单详情.vue"));});}; //订单详情
const 报表 = resolve => {require.ensure([], () => {resolve(require("@/views/myshop/销售/报表.vue"));});}; //报表

//申请开店专用
const 申请开店 = resolve => {require.ensure([], () => { resolve(require("@/views/申请开店/申请开店.vue"));});};
const 百度地图 = resolve => {require.ensure([], () => { resolve(require("@/views/申请开店/百度地图.vue"));});};
const 营业时间 = resolve => {require.ensure([], () => {resolve(require("@/views/申请开店/营业时间.vue"));});};
const 法人认证 = resolve => {require.ensure([], () => { resolve(require("@/views/申请开店/法人认证.vue"));});};
const 营业执照 = resolve => {require.ensure([], () => {  resolve(require("@/views/申请开店/营业执照.vue"));});};
const 新人红包 = resolve => { require.ensure([], () => {resolve(require("@/views/申请开店/新人红包.vue"));});};
const 店铺预览 = resolve => {require.ensure([], () => {resolve(require("@/views/申请开店/店铺预览.vue"));});};

import dianyuan from "@/router/dianyuan.js";
import 分销 from '@/router/分销.js'
//myshop       开头
const myshops = [
    ...dianyuan,
    ...分销,
    {
        path: "/shenqingkaidian",
        name: "",
        component: 申请开店
    },
    {
        path: "/shenqingkaidian/baiduditu",
        name: "",
        component: 百度地图
    },
    {
        path: "/shenqingkaidian/yingyeshijian",
        name: "",
        component: 营业时间
    },
    {
        path: "/shenqingkaidian/farenrenzheng",
        name: "",
        component: 法人认证
    },
    {
        path: "/shenqingkaidian/yingyezhizhao",
        name: "",
        component: 营业执照
    },
    {
        path: "/shenqingkaidian/xinrendianpu",
        name: "",
        component: 新人红包
    },
    {
        path: "/shenqingkaidian/dianpuyulan",
        name: "",
        component: 店铺预览
    },

    {
        path: "/myshop/WithdrawMoney",
        name: "",
        component: 提现
    },
    {
        path: "/myshop/tixianjilu",
        name: "",
        component: 提现记录
    },
    
    // /myshop/Marketing/RedPackets 红包
    {
        path: "/myshop/Marketing/RedPackets/RedPacketRecords",
        name: "",
        component: RedPacketRecords
    },
    {
        path: "/myshop/comment/commentList",
        name: "",
        component: 评论列表
    },
    {
        path: "/myshop/Member/MemberList",
        name: "",
        component: MemberList
    },
    {
        path: "/myshop/Member/xiaofeijilu",
        name: "",
        component: 会员消费记录
    },
    // /myshop/xiaoshou/    销售
    {
        path: "/myshop/xiaoshou/xiaoshou",
        name: "",
        component: 销售
    },
    {
        path: "/myshop/xiaoshou/orderDetails",
        name: "",
        component: 订单详情
    },
    {
        path: "/myshop/xiaoshou/baobiao",
        name: "",
        component: 报表
    }
];

export default myshops;
