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
const my = resolve => { require.ensure(["./views/my.vue"], () => { resolve(require("./views/my.vue")); }); }; //我的
const login = resolve => { require.ensure(["./views/login.vue"], () => { resolve(require("./views/login.vue")); }); }; //登录
const register = resolve => { require.ensure(["./views/register.vue"], () => { resolve(require("./views/register.vue")); }); }; //注册
const LoginPassword = resolve => { require.ensure(["./views/LoginPassword.vue"], () => { resolve(require("./views/LoginPassword.vue")); }); }; //修改登录密码
const PaymentPassword = resolve => { require.ensure(["./views/PaymentPassword.vue"], () => { resolve(require("./views/PaymentPassword.vue")); }); }; //修改支付密码
const AssetDetails = resolve => { require.ensure(["./views/AssetDetails.vue"], () => { resolve(require("./views/AssetDetails.vue")); }); }; //资产详情
const RealName = resolve => { require.ensure(["./views/RealName.vue"], () => { resolve(require("./views/RealName.vue")); }); }; //实名认证
const AlreadyRealName = resolve => { require.ensure(["./views/AlreadyRealName.vue"], () => { resolve(require("./views/AlreadyRealName.vue")); }); }; //已经实名认证
const ApplicationAgent = resolve => { require.ensure(["./views/ApplicationAgent.vue"], () => { resolve(require("./views/ApplicationAgent.vue")); }); }; //申请成为代理人
const Agent = resolve => { require.ensure(["./views/Agent.vue"], () => { resolve(require("./views/Agent.vue")); }); }; //代理人
const Account = resolve => { require.ensure(["./views/Account.vue"], () => { resolve(require("./views/Account.vue")); }); }; //收款账号
const EmbodyRecord = resolve => { require.ensure(["./views/EmbodyRecord.vue"], () => { resolve(require("./views/EmbodyRecord.vue")); }); }; //提现记录
const market = resolve => { require.ensure(["./views/market.vue"], () => { resolve(require("./views/market.vue")); }); }; //业务市场
const Advertising = resolve => { require.ensure(["./views/Advertising.vue"], () => { resolve(require("./views/Advertising.vue")); }); }; //广告机
const croppertest = resolve => { require.ensure(["./views/croppertest.vue"], () => { resolve(require("./views/croppertest.vue")); }); }; //裁剪测试
const RegionalAgent = resolve => { require.ensure(["./views/RegionalAgent.vue"], () => { resolve(require("./views/RegionalAgent.vue")); }); }; //区域代理

const RegistrationAgreement = () => import("@/views/xieyi/RegistrationAgreement.vue"); //用户注册协议
const BusinessAgreement = () => import("@/views/xieyi/BusinessAgreement.vue"); //业务代理合作协议
const AgentAdvantage = () => import("@/views/xieyi/AgentAdvantage.vue"); //代理人的好处

Vue.use(Router);

export default new Router({
    routes: [
        { path: "/", name: "", component: login },
        { path: "/home", name: "home", component: Home },
        {
            path: "/my",
            name: "my",
            component: my
        },
        {
            path: "/login",
            name: "login",
            component: login
        },
        {
            path: "/register",
            name: "register",
            component: register
        },
        {
            path: "/LoginPassword",
            name: "LoginPassword",
            component: LoginPassword
        },
        {
            path: "/PaymentPassword",
            name: "PaymentPassword",
            component: PaymentPassword
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
            name: "ApplicationAgent",
            component: ApplicationAgent
        },
        {
            path: "/Agent",
            name: "Agent",
            component: Agent
        },
        {
            path: "/Account",
            name: "Account",
            component: Account
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
        }
    ]
});
