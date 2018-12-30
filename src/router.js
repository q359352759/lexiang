import Vue from "vue";
import Router from "vue-router";

function load(x){
    if (x) {
        document.getElementById("loading").style.opacity = "1";
        document.getElementById("loading").style.display = "block";
    } else {
        document.getElementById("loading").style.opacity = "0";
        document.getElementById("loading").style.display = "none";
    }
}



const editortest = resolve => { require.ensure([], () => { resolve(require("./views/editortest.vue")); }); }; //测试


const Home = resolve => { require.ensure([], () => { resolve(require("./views/home/Home.vue")); }); }; //首页
const RedEnvelopesList = resolve => { require.ensure([], () => {
        load(true);
        resolve(require("./views/home/RedEnvelopesList.vue")); 
        load(false);
    }); 
}; //店铺内红包
const ShopClassification = resolve => { require.ensure([], () => {
        load(true)
        resolve(require("./views/home/ShopClassification.vue")); 
        load(false);
    }); 
}; //店铺分类

const SearchShop = resolve => { require.ensure([], () => { resolve(require("./views/home/SearchShop.vue")); }); }; //搜索
const Check = resolve => { require.ensure([], () => { resolve(require("./views/home/Check.vue")); }); }; //搜索



const my = resolve => { require.ensure([], () => { resolve(require("@/views/my/my.vue")); }); }; //我的
const Collection = resolve => { require.ensure([], () => { resolve(require("./views/my/Collection.vue")); }); }; //我的收藏
const Recommend = resolve => { require.ensure([], () => { resolve(require("./views/my/Recommend.vue")); }); }; //收藏中 的 推荐
const BeInvited = resolve => { require.ensure([], () => { resolve(require("./views/my/BeInvited.vue")); }); }; //收藏中的推荐注册
const CardBag = resolve => { require.ensure([], () => { resolve(require("./views/my/CardBag.vue")); }); }; //红包卡券
const AssetCenter = resolve => { require.ensure([], () => { resolve(require("./views/AssetCenter/AssetCenter.vue")); }); }; //资产中心
const news = resolve => { require.ensure([], () => { resolve(require("./views/my/news.vue")); }); }; //消息


const SetUp = resolve => { require.ensure([], () => { resolve(require("./views/SetUp.vue")); }); }; //设置
const help = resolve => { require.ensure([], () => { resolve(require("./views/help/help.vue")); }); }; //帮助中心
const HelpDetails = resolve => { require.ensure([], () => { resolve(require("./views/help/HelpDetails.vue")); }); }; //问题详情
const RaiseQuestions = resolve => { require.ensure([], () => { resolve(require("./views/help/RaiseQuestions.vue")); }); }; //提问
const QuestionRecord = resolve => { require.ensure([], () => { resolve(require("./views/help/QuestionRecord.vue")); }); }; //提问记录


const login = resolve => { require.ensure([], () => { resolve(require("./views/login.vue")); }); }; //登录
const register = resolve => { require.ensure([], () => { resolve(require("./views/register.vue")); }); }; //注册
const LoginPassword = resolve => { require.ensure([], () => { resolve(require("./views/LoginPassword.vue")); }); }; //修改登录密码
const ForgetPassword = resolve => { require.ensure([], () => { resolve(require("./views/ForgetPassword.vue")); }); }; //忘记登录密码
const PaymentPassword = resolve => { require.ensure([], () => { resolve(require("./views/PaymentPassword.vue")); }); }; //修改支付密码
const AssetDetails = resolve => { require.ensure([], () => { resolve(require("./views/AssetDetails.vue")); }); }; //资产详情
const RealName = resolve => { require.ensure([], () => { resolve(require("./views/RealName.vue")); }); }; //实名认证
const AlreadyRealName = resolve => { require.ensure([], () => { resolve(require("./views/AlreadyRealName.vue")); }); }; //已经实名认证
const ApplicationAgent = resolve => { require.ensure([], () => { resolve(require("./views/ApplicationAgent.vue")); }); }; //申请成为代理人
const Agent = resolve => { require.ensure([], () => { resolve(require("./views/Agent.vue")); }); }; //代理人
const AgentDistribution = resolve => { require.ensure([], () => { resolve(require("./views/Agent/AgentDistribution.vue")); }); }; //代理人分销管理
const MarketManagement = resolve => { require.ensure([], () => { resolve(require("./views/Agent/MarketManagement.vue")); }); }; //代理商市场管理
const Account = resolve => { require.ensure([], () => { resolve(require("./views/Account.vue")); }); }; //收款账号
const EmbodyRecord = resolve => { require.ensure([], () => { resolve(require("./views/EmbodyRecord.vue")); }); }; //提现记录
const market = resolve => { require.ensure([], () => { resolve(require("./views/market.vue")); }); }; //业务市场
const MarketDetails = resolve => { require.ensure([], () => { resolve(require("./views/MarketDetails.vue")); }); }; //业务市场类型详情


const Advertising = resolve => { require.ensure([], () => { resolve(require("./views/Advertising.vue")); }); }; //广告机
const croppertest = resolve => { require.ensure([], () => { resolve(require("./views/croppertest.vue")); }); }; //裁剪测试
const classification = resolve => { require.ensure([], () => { resolve(require("./views/classification.vue")); }); }; //更多分类
const BusinessDetails = resolve => { require.ensure([], () => { 
    load(true)
    resolve(require("./views/BusinessDetails.vue")); 
    load(false);
}); }; //商家详情
//申请店铺
const ShopInstructions = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/ShopInstructions.vue")); }); }; //开店说明
const ApplicationShop = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/ApplicationShop.vue")); }); }; //申请店铺详情
const myshop = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/myshop.vue")); }); }; //申请通过过的店铺
const ShopDetails = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/ShopDetails.vue")); }); }; //我的店铺详情
const shopAuthentication = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/shopAuthentication.vue")); }); }; //我的店铺法人认证
const shopBusinessDetails = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/shopBusinessDetails.vue")); }); }; //我的店铺营业执照

//我的店铺中的页面 营销

const Notice = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Notice.vue")); }); };        //我的店铺公告
const noticeList = resolve => { require.ensure([], () => { resolve(require("./views/myshop/noticeList.vue")); }); };        //我的店铺公告记录
const introduction = resolve => { require.ensure([], () => { resolve(require("./views/myshop/introduction.vue")); }); };        //我的店铺简介

const Marketing = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/Marketing.vue")); }); }; //我的店铺营销
const RedEnvelopes = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/RedEnvelopes.vue")); }); }; //营销中心的红包
const RedPacketReleaseRecord = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/RedPacketReleaseRecord.vue")); }); }; //营销中心的红包发放记录
const RedEnvelopeIssue = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/RedEnvelopeIssue.vue")); }); }; //营销中心发布红包
const RedPacketsDetails = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/RedPacketsDetails.vue")); }); }; //营销中心发布红包

const ShopRedEnvelopes = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/ShopRedEnvelopes.vue")); }); }; //营销中心发布 申请店铺用
const MarketingVip = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/MarketingVip.vue")); }); }; //营销 专享营销
const addMarketingVip = resolve => { require.ensure([], () => { resolve(require("./views/myshop/Marketing/addMarketingVip.vue")); }); }; //营销 添加专享营销


const TimeSlot = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/TimeSlot.vue")); }); }; //营业时间
const BusinessLicense = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/BusinessLicense.vue")); }); }; //营业执照
const LegalPersonCertification = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/LegalPersonCertification.vue")); }); }; //法人认证页面
const baiduMap = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/baiduMap.vue")); }); }; //百度地图


const bill = resolve => { require.ensure([], () => { resolve(require("./views/AssetCenter/bill.vue")); }); }; //收支账单
const GeneralTime = resolve => { require.ensure([], () => { resolve(require("./views/GeneralTime.vue")); }); }; //通用时间选择器


const Album = resolve => { require.ensure([], () => { resolve(require("./views/Album/Album.vue")); }); }; //相册
const albumManagement = resolve => { require.ensure([], () => { resolve(require("./views/Album/albumManagement.vue")); }); }; //相册管理

//我的店铺
const mycommodity = resolve => { require.ensure([], () => { resolve(require("./views/myshop/commodity.vue")); }); }; //商品管理
const AddGoods = resolve => { require.ensure([], () => { resolve(require("./views/myshop/AddGoods.vue")); }); }; //添加商品


//区域代理
const RegionalAgencyAgreement = resolve => { require.ensure([], () => { resolve(require("./views/RegionalAgent/RegionalAgencyAgreement.vue")); }); }; //区域代理申请说明
const ApplicationRegionalAgents = resolve => { require.ensure([], () => { resolve(require("./views/RegionalAgent/ApplicationRegionalAgents.vue")); }); }; //申请代理商
const RegionalAgent = resolve => { require.ensure([], () => { resolve(require("./views/RegionalAgent/RegionalAgent.vue")); }); }; //区域代理
const ExampleOfRevenue = resolve => { require.ensure([], () => { resolve(require("./views/RegionalAgent/ExampleOfRevenue.vue")); }); }; //区域代理商收益示例


// 协议
const AgencyCost = resolve => { require.ensure([], () => { resolve(require("./views/xieyi/AgencyCost.vue")); }); }; //代理人费用说明
const RegistrationAgreement = () => import ("@/views/xieyi/RegistrationAgreement.vue"); //用户注册协议
const BusinessAgreement = () => import ("@/views/xieyi/BusinessAgreement.vue"); //业务代理合作协议
const AgentAdvantage = () => import ("@/views/xieyi/AgentAdvantage.vue"); //代理人的好处
const shopAgreement = () => import ("@/views/xieyi/shopAgreement.vue"); //商家服务协议
const xuyuan = () => import ("@/views/xieyi/xuyuan.vue"); //预选区域代理说明
const dailijiaofei = () => import ("@/views/xieyi/dailijiaofei.vue"); //预选区域代理说明
const WithdrawalAgreement = () => import ("@/views/xieyi/WithdrawalAgreement.vue"); //提现协议
const renzhengxieyi = () => import ("@/views/xieyi/renzhengxieyi.vue"); //实名认证协议
const 隐私政策 = resolve => { require.ensure([], () => { resolve(require("@/views/xieyi/隐私政策.vue")); }); }; //隐私政策


// require.ensure(dependencies: String[], callback: function(require), chunkName: String)
// 依赖 dependencies
//   这是一个字符串数组，通过这个参数，在所有的回调函数的代码被执行前，我们可以将所有需要用到的模块进行声明。
// 回调 callback
//   当所有的依赖都加载完成后，webpack会执行这个回调函数。require 对象的一个实现会作为一个参数传递给这个回调函数。因此，我们可以进一步 require() 依赖和其它模块提供下一步的执行。
// chunk名称 chunkName
//   chunkName 是提供给这个特定的 require.ensure() 的 chunk 的名称。通过提供 require.ensure() 不同执行点相同的名称，我们可以保证所有的依赖都会一起放进相同的 文件束(bundle)。
// ---------------------
// 作者：A_山水子农
// 来源：CSDN
// 原文：https://blog.csdn.net/qq_27626333/article/details/76228578
// 版权声明：本文为博主原创文章，转载请附上博文链接！

// mui-content mui-fullscreen
import circularNav from "@/components/circularNav.vue";
import err404 from "@/views/404.vue"

import myshops from "@/router/myshop.js";
import commodity from "@/router/commodity.js";
import orders from '@/router/orders.js';
import mys from '@/router/my.js';

import agents from '@/router/agents.js'

// console.log(myshops)
// require('@/router/myshop.js'),

Vue.use(Router);

export default new Router({
    routes: [
        ...myshops, 
        ...commodity,   //商品
        ...orders,
        ...mys,
        ...agents,
        { path: "/", name: "", component: login },
        { path: "/editortest", name: "", component: editortest },
        {
            path: "/home",
            name: "",
            components: {
                default: Home,
                circularNav: circularNav
            }
        },{
            path:'/xieyi/yinsizhengce',
            name:"",
            component:隐私政策
        },
        {
            path:'/Check',
            name:'',
            component:Check
        },
        {
            path:'/RedEnvelopesList',
            name:'',
            component:RedEnvelopesList
        },
        {
            path:'/SearchShop',
            name:'',
            component:SearchShop
        },
        {
            path:'/ShopClassification',
            name:'',
            component:ShopClassification
        },
        {
            path: "/my",
            name: "my",
            // component: my
            components: {
                default: my,
                circularNav: circularNav
            }
        },{
            path:'/CardBag',
            name:'',
            component:CardBag
        },{
            path:'/news',
            name:"",
            component:news
        },
        {
            path:'/SetUp',
            name:'',
            // component:SetUp,
            components:{
                default:SetUp,
                circularNav: circularNav
            }
        },
        {
            path:'/help',
            name:'',
            components:{
                default:help,
                circularNav: circularNav
            }
        },{
            path:'/HelpDetails',
            name:'',
            component:HelpDetails
        },
        {
            path:'/RaiseQuestions',
            name:'',
            component:RaiseQuestions
        },{
            path:'/QuestionRecord',
            name:'',
            component:QuestionRecord
        },
        {
            path: "/login",
            name: "",
            components: {
                default: login,
                circularNav: circularNav
            }
        },
        {
            path: "/register",
            name: "",
            components: {
                default: register,
                // circularNav: circularNav
            }
        },
        {
            path: "/LoginPassword",
            name: "",
            components: {
                default: LoginPassword,
                circularNav: circularNav
            }
        },
        {
            path:'/ForgetPassword',
            name:'',
            component:ForgetPassword
        },
        {
            path: "/PaymentPassword",
            name: "",
            components: {
                default: PaymentPassword,
                circularNav: circularNav
            }
        },
        {
            path: "/AssetDetails",
            name: "AssetDetails",
            component: AssetDetails
        },
        {
            path: "/RealName",
            name: "RealName",
            component: RealName
        },
        {
            path: "/ApplicationAgent",
            name: "",
            components: {
                default: ApplicationAgent,
                circularNav: circularNav
            }
        },
        {
            path: "/Agent",
            name: "",
            components: {
                default: Agent,
                circularNav: circularNav
            }
        },
        {
            path: "/AgentDistribution",
            name: "",
            component: AgentDistribution
        },
        {
            path: "/Account",
            name: "",
            components: {
                default: Account,
                circularNav: circularNav
            }
        },
        {
            path: "/EmbodyRecord",
            name: "",
            component: EmbodyRecord
        },
        {
            path: "/market",
            name: "",
            component: market
        },
        {
            path:'/MarketDetails',
            name:'',
            component:MarketDetails
        },
        {
            path: "/RegistrationAgreement",
            name: "",
            component: RegistrationAgreement
        },
        {
            path: "/Advertising",
            name: "",
            component: Advertising
        },
        {
            path: "/croppertest",
            name: "",
            component: croppertest
        },
        //代理商
        {
            path: "/RegionalAgent",
            name: "",
            component: RegionalAgent
        },{
            path:'/RegionalAgencyAgreement',
            name:'',
            component:RegionalAgencyAgreement
        },{
            path:'/ApplicationRegionalAgents',
            name:'',
            component:ApplicationRegionalAgents
        },{
            path:'/ExampleOfRevenue',
            name:'',
            component:ExampleOfRevenue
        },

        {
            path: "/AlreadyRealName",
            name: "",
            component: AlreadyRealName
        },
        {
            path: "/BusinessAgreement",
            name: "",
            component: BusinessAgreement
        },
        {
            path: "/AgentAdvantage",
            name: "",
            component: AgentAdvantage
        },{
            path:'/shopAgreement',
            name:'',
            component:shopAgreement
        },{
            path:'/xuyuan',
            name:'',
            component:xuyuan
        },{
            path:'/dailijiaofei',
            name:'',
            component:dailijiaofei
        },{
            path:'/WithdrawalAgreement',
            name:'',
            component:WithdrawalAgreement
        },{
            path:'/renzhengxieyi',
            name:'',
            component:renzhengxieyi
        },
        {
            path: "/classification",
            name: "",
            component: classification
        },
        {
            path: "/BusinessDetails",
            name: "",
            component: BusinessDetails
        },
        //申请店铺
        {
            path:'/ShopInstructions',
            name:'',
            component:ShopInstructions
        },
        {
            path: "/ApplicationShop",
            name: "",
            component: ApplicationShop,
            meta: {
                keepAlive: true //缓存当前页面
            }
        },
        {
            path:'/myshop',
            name:'',
            component:myshop
        },{
            path:'/ShopDetails',
            name:'',
            component:ShopDetails,
            meta:{
                keepAlive: true //缓存当前页面
            }
        },{
            path:'/shopAuthentication',
            name:'',
            component:shopAuthentication
        },{
            path:'/shopBusinessDetails',
            name:'',
            component:shopBusinessDetails
        },{
            path:'/Notice',
            name:'',
            component:Notice
        },{
            path:'/introduction',
            name:'',
            component:introduction
        },
        {
            path:'/noticeList',
            name:'',
            component:noticeList
        },
        {
            path:'/Marketing',
            name:'',
            component:Marketing
        },{
            path:'/RedEnvelopes',
            name:'',
            component:RedEnvelopes
        },{
            path:'/RedPacketReleaseRecord',
            name:'',
            component:RedPacketReleaseRecord
        },
        {
            path:'/RedEnvelopeIssue',
            name:'',
            component:RedEnvelopeIssue
        },{
            path:'/RedPacketsDetails',
            name:'',
            component:RedPacketsDetails
        },
        {
            path:'/ShopRedEnvelopes',
            name:'',
            component:ShopRedEnvelopes
        },{
            path:'/MarketingVip',
            name:'',
            component:MarketingVip
        },{
            path:'/addMarketingVip',
            name:'',
            component:addMarketingVip
        },
        {
            path: "/TimeSlot",
            name: "",
            component: TimeSlot
        },
        {
            path: "/BusinessLicense",
            name: "",
            component: BusinessLicense
        },
        {
            path: "/LegalPersonCertification",
            name: "",
            component: LegalPersonCertification
        },
        {
            path: "/Collection",
            name: "",
            component: Collection
        },
        {
            path: "/AssetCenter",
            name: "",
            component: AssetCenter
        },
        {
            path: "/bill",
            name: "",
            component: bill,
            meta: {
                keepAlive: true //缓存当前页面
            }
        },
        {
            path: "/baiduMap",
            name: "",
            component: baiduMap
        },
        {
            path: "/GeneralTime",
            name: "",
            component: GeneralTime
        },
        {
            path: "/MarketManagement",
            name: "",
            component: MarketManagement
        },
        {
            path:'/Recommend',
            name:'',
            component:Recommend
        },{
            path:'/BeInvited',
            name:'',
            component:BeInvited
        },{
            path:'/AgencyCost',
            name:'',
            component:AgencyCost
        },{
            path:'/Album',
            name:'',
            component:Album
        },{
            path:'/albumManagement',
            name:'',
            component:albumManagement
        },
        {
            path:'/commodity',
            name:'',
            component:mycommodity
        },{
            path:'/AddGoods',
            name:'',
            component:AddGoods,
            meta: {
                // keepAlive: true //缓存当前页面
            }
        },



        {
            path:'*',
            name:'',
            component:err404
        },
    ]
});