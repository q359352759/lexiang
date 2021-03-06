import Vue from "vue";
import App from "./App.vue";

import VCharts from "v-charts";
Vue.use(VCharts);

import router from "./router";

// import VueHtml5Editor from 'vue-html5-editor'
// Vue.use(VueHtml5Editor,{});

import axios from "axios";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 60000;
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
//             var loginDate = JSON.parse(localStorage.loginDate);
//             config.headers.Authorization = "Bearer " + loginDate.access_token;
//         } catch (error) {}
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );
axios.interceptors.response.use(
    function (response) {
        // console.log(response);
        if (response.data.error && response.data.error == "invalid_token") {
            var path=router.history.current.path;
            var 弹框长度=document.querySelectorAll('.mui-popup').length;
            if(path!='/login' && 弹框长度==0){
                mui.confirm("此操作需要登录,你的登录已过期，是否重新登录？","提示",["取消", "是的"],value => {
                        if (value.index == 1) {
                            router.push("/login");
                        }
                    }
                );
            }
        } else {
            return response;
        }
    },
    function (error) {
        if (error) {
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
import request from "@/api/request.js";
Vue.prototype.$request = request;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");


router.beforeEach((to, from, next) => {
    console.log(to)
    var meta=to.meta;
        if(!meta.无需登录){
            var userInfo=localStorage.userInfo;
            if (!userInfo || userInfo == null || userInfo == undefined) {
                next({ path: "/login" });
            }else{
                next();
            }
        }else{
            next();
        }
    document.getElementById("loading").style.opacity = "0";
    document.getElementById("loading").style.display = "none";
});
