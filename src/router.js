import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";  //首页
const my=() =>import(/* webpackChunkName: "about" */ "./views/my.vue");   //我的
const login=() =>import(/* webpackChunkName: "about" */ "./views/login.vue");   //登录
const register=() =>import(/* webpackChunkName: "about" */ "./views/register.vue");   //注册
const LoginPassword=() =>import(/* webpackChunkName: "about" */ "./views/LoginPassword.vue");   //修改登录密码
const PaymentPassword=() =>import(/* webpackChunkName: "about" */ "./views/PaymentPassword.vue");   //修改支付密码
const AssetDetails=() =>import(/* webpackChunkName: "about" */ "./views/AssetDetails.vue");   //资产详情
const RealName=() =>import(/* webpackChunkName: "about" */ "./views/RealName.vue");   //实名认证
const ApplicationAgent=() =>import(/* webpackChunkName: "about" */ "./views/ApplicationAgent.vue");   //申请成为代理人
const Agent=() =>import(/* webpackChunkName: "about" */ "./views/Agent.vue");   //申请成为代理人
const Account=() =>import(/* webpackChunkName: "about" */ "./views/Account.vue");   //收款账号


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path:'/my',
      name:'my',
      component:my
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:"/register",
      name:'register',
      component:register
    },
    {
      path:'/LoginPassword',
      name:"LoginPassword",
      component:LoginPassword
    },
    {
      path:'/PaymentPassword',
      name:'PaymentPassword',
      component:PaymentPassword
    },
    {
      path:'/AssetDetails',
      name:'AssetDetails',
      component:AssetDetails
    },
    {
      path:'/RealName',
      name:'RealName',
      component:RealName
    },
    {
      path:'/ApplicationAgent',
      name:'ApplicationAgent',
      component:ApplicationAgent
    },
    {
      path:'/Agent',
      name:'Agent',
      component:Agent
    },
    {
      path:'/Account',
      name:'Account',
      component:Account
    }
  ]
});
