import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue"; //首页
function loading_show() {
    // document.getElementById('loading').setAttribute('class','active')
}
function loading_hide() {
    // setTimeout(function(){
    //     document.getElementById('loading').setAttribute('class','')
    // },1000)
}
const my = resolve => { require.ensure([], () => { resolve(require("./views/my.vue")); }); }; //我的
const login = resolve => { require.ensure([], () => { resolve(require("./views/login.vue")); }); }; //登录
const register = resolve => { require.ensure([], () => { resolve(require("./views/register.vue")); }); }; //注册
const LoginPassword = resolve => { require.ensure([], () => { resolve(require("./views/LoginPassword.vue")); }); }; //修改登录密码
const PaymentPassword = resolve => { require.ensure([], () => { resolve(require("./views/PaymentPassword.vue")); }); }; //修改支付密码
const AssetDetails = resolve => { require.ensure([], () => { resolve(require("./views/AssetDetails.vue")); }); }; //资产详情
const RealName = resolve => { require.ensure([], () => { resolve(require("./views/RealName.vue")); }); }; //实名认证
const AlreadyRealName = resolve => { require.ensure([], () => { resolve(require("./views/AlreadyRealName.vue")); }); }; //已经实名认证
const ApplicationAgent = resolve => { require.ensure([], () => { resolve(require("./views/ApplicationAgent.vue")); }); }; //申请成为代理人
const Agent = resolve => { require.ensure([], () => { resolve(require("./views/Agent.vue")); }); }; //代理人
const AgentDistribution = resolve => { require.ensure([], () => { resolve(require("./views/Agent/AgentDistribution.vue")); }); }; //代理人分销


const Account = resolve => { require.ensure([], () => { resolve(require("./views/Account.vue")); }); }; //收款账号
const EmbodyRecord = resolve => { require.ensure([], () => { resolve(require("./views/EmbodyRecord.vue")); }); }; //提现记录
const market = resolve => { require.ensure([], () => { resolve(require("./views/market.vue")); }); }; //业务市场
const Advertising = resolve => { require.ensure([], () => { resolve(require("./views/Advertising.vue")); }); }; //广告机
const croppertest = resolve => { require.ensure([], () => { resolve(require("./views/croppertest.vue")); }); }; //裁剪测试
const RegionalAgent = resolve => { require.ensure([], () => { resolve(require("./views/RegionalAgent.vue")); }); }; //区域代理
const classification = resolve => { require.ensure([], () => { resolve(require("./views/classification.vue")); }); }; //更多分类
const BusinessDetails = resolve => { require.ensure([], () => { resolve(require("./views/BusinessDetails.vue")); }); }; //商家详情
//申请店铺
const ApplicationShop = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/ApplicationShop.vue")); }); }; //申请店铺详情
const TimeSlot = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/TimeSlot.vue")); }); }; //营业时间
const BusinessLicense = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/BusinessLicense.vue")); }); }; //营业执照
const LegalPersonCertification = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/LegalPersonCertification.vue")); }); }; //法人认证页面
const baiduMap = resolve => { require.ensure([], () => { resolve(require("./views/ApplyForAShop/baiduMap.vue")); }); }; //百度地图



const Collection = resolve => {require.ensure([], () => { resolve(require("./views/Collection.vue")); }); }; //我的收藏

const AssetCenter = resolve => { require.ensure([], () => { resolve(require("./views/AssetCenter/AssetCenter.vue")); }); }; //资产中心
const bill = resolve => { require.ensure([], () => { resolve(require("./views/AssetCenter/bill.vue")); }); }; //收支账单
const GeneralTime = resolve => { require.ensure([], () => { resolve(require("./views/GeneralTime.vue")); }); }; //通用时间选择器



const RegistrationAgreement = () => import("@/views/xieyi/RegistrationAgreement.vue"); //用户注册协议
const BusinessAgreement = () => import("@/views/xieyi/BusinessAgreement.vue"); //业务代理合作协议
const AgentAdvantage = () => import("@/views/xieyi/AgentAdvantage.vue"); //代理人的好处

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
Vue.use(Router);

export default new Router({
    routes: [
        { path: "/", name: "", component: login },
        { 
            path: "/home", 
            name: "", 
            components:{
                default:Home,
                circularNav:circularNav
            } 
        },{
            path: "/my",
            name: "my",
            // component: my
            components:{
                default:my,
                circularNav:circularNav
            }
        },
        {
            path: "/login",
            name: "",
            components:{
                default:login,
                circularNav:circularNav
            }
        },
        {
            path: "/register",
            name: "",
            components:{
                default:register,
                circularNav:circularNav
            }
        },
        {
            path: "/LoginPassword",
            name: "",
            components:{
                default:LoginPassword,
                circularNav:circularNav
            }
        },
        {
            path: "/PaymentPassword",
            name: "",
            components:{
                default:PaymentPassword,
                circularNav:circularNav
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
            components:{
                default:ApplicationAgent,
                circularNav:circularNav
            } 
        },
        {
            path: "/Agent",
            name: "",
            components:{
                default:Agent,
                circularNav:circularNav
            }
        },
        {
            path:'/AgentDistribution',
            name:'',
            component:AgentDistribution
        },
        {
            path: "/Account",
            name: "",
            components:{
                default:Account,
                circularNav:circularNav
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
        {
            path: "/RegionalAgent",
            name: "",
            component: RegionalAgent
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
            path:'/classification',
            name:'',
            component:classification
        },{
            path:'/BusinessDetails',
            name:'',
            component:BusinessDetails
        },
        //申请店铺
        {
            path:'/ApplicationShop',
            name:'',
            component:ApplicationShop,
            meta:{
                keepAlive:true      //缓存当前页面
            }
        },{
            path:'/TimeSlot',
            name:'',
            component:TimeSlot,
        },{
            path:'/BusinessLicense',
            name:'',
            component:BusinessLicense,
        },{
            path:'/LegalPersonCertification',
            name:'',
            component:LegalPersonCertification
        },{
            path:'/Collection',
            name:'',
            component:Collection
        },{
            path:'/AssetCenter',
            name:'',
            component:AssetCenter
        },{
            path:'/bill',
            name:'',
            component:bill,
            meta:{
                keepAlive:true      //缓存当前页面
            }
        },{
            path:'/baiduMap',
            name:'',
            component:baiduMap
        },{
            path:'/GeneralTime',
            name:'',
            component:GeneralTime
        }
    ]
});
