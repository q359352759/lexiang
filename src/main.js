import Vue from "vue";
import App from "./App.vue";

import VCharts from 'v-charts'
Vue.use(VCharts)

import router from "./router";

// import VueHtml5Editor from 'vue-html5-editor'
// Vue.use(VueHtml5Editor,{});

import axios from "axios";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout =  60000;
// axios.defaults.baseURL = "http://192.168.1.11:8080";
// axios.defaults.baseURL = 'http://172.20.10.2:8080';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN AUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKEN';
// axios.defaults.baseURL = 'http://local.register.com:8761/';

Vue.prototype.$axios = axios;
//拦截器
// axios.interceptors.request.use(
//     config => {
//         try {
//             var loginDate=JSON.parse(localStorage.loginDate);
//             config.headers.Authorization = 'Bearer '+loginDate.access_token;
//             console.log(loginDate.access_token)
//         } catch (error) {}
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
// });
axios.interceptors.response.use(
    function (response) {
        // console.log(response);
        if(response.data.error && response.data.error=='invalid_token'){
            mui.confirm('此操作需要登录权限，你的登录已过期，是否重新登录？','提示',['取消','是的'],(value)=>{
                if(value.index==1){
                    router.push('/login');
                }
            })
        }else{
            return response;
        }
    },
    function (error) {
        if(error){
            if (error.response) {
                return error.response;
            }
        }
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
);
import qs from "qs";
Vue.prototype.$qs = qs;

import store from "./store";
Vue.config.productionTip = false;

//封装后的请求接口
import request from '@/api/request.js'
Vue.prototype.$request = request;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
    var toPath = to.path;
    var loginDate = localStorage.loginDate;
    var baimingdan = [
            "/login", "/register","/home", 
            "/commodity/CommodityDetails",    //首页商品详情
            "/BusinessDetails",     //首页商家
            '/RedEnvelopesList',    //商家领取红包页面
            "/RegistrationAgreement",
            '/ForgetPassword',
            '/Recommend',       //分享页面
            '/BeInvited',        //分享注册页面
            '/shizhe/tuiguang'
        ]; //未登录可以访问的白名单
    if (!loginDate || loginDate == null || loginDate == undefined) {
        
        if (baimingdan.indexOf(toPath) == -1) {
            console.log("没有登录准备跳转至登录");
            next({ path: "/login" });
            //next();
        } else {
            console.log("白名单");
            next();
        }
    } else {
        next();
    }
    document.getElementById("loading").style.opacity = "0";
    document.getElementById("loading").style.display = "none";
});
