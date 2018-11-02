import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
axios.defaults.baseURL = "http://192.168.1.11:8080";
// import $ from "jquery"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN AUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKEN';

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            return error.response;
        }
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
    // (response) => {
    //     return response;
    // },
    // (error) => {
    //     if (error.response) {
    //     }
    //     return Promise.reject(error); // 返回接口返回的错误信息
    // }
);
import qs from "qs";
import router from "./router";
Vue.use(Vuex);

var vuex = new Vuex.Store({
    state: {
        clientX: 300, //远点导航X
        clientY: 450, //远点导航Y
        isweixin: true,
        loginDate: {}, //login信息
        weixinobj: {}, //微信授权信息
        userInfo: {}, //用户信息
        agentUser: false, //用户代理人信息   是否是代理人这里判断
        area: [], //地区

        todos: [
            { id: 1, text: "测试1", done: true },
            { id: 2, text: "测试2", done: false }
        ]
    },
    getters: {
        doneTodos(state, getters) {
            //this.$store.getters.doneTodos(...)
            return state.todos.filter(todo => todo.done);
        },
        filter_area: state => (id, list) => {
            var arr = list ? list : [];
            // return state.area.filter(x => x.id==id)
            var obj = state.area.find(x => x.id == id);
            if (obj) {
                arr.unshift(obj);
                if (obj.parentid) {
                    vuex.getters.filter_area(obj.parentid, arr);
                }
            }
            // return state.area.find(x => x.id === id)
            return arr;
        }
    },
    mutations: {
        setIsWeixin(state, msg) {
            console.log("判断是否是微信");
        },
        setloginDate(state, obj) {
            try {
                state.loginDate = JSON.parse(obj);
                console.log("登录信息", state.loginDate);
            } catch (err) {
                console.log("登录信息获取失败", state.loginDate);
                state.loginDate = {};
            }
        },
        setweixinobj(state, obj) {
            try {
                state.weixinobj = JSON.parse(obj);
            } catch (err) {
                state.weixinobj = {};
            }
        },
        //获取代理人信息
        setagentUser(state) {
            // console.log(this.state.userInfo)
            axios({
                method: "get",
                url: "/api-u/agentUser/me?userid=" + this.state.userInfo.phone
            })
                .then(x => {
                    console.log("获取用户代理人信息", x);
                    if (x.data.code != 200) {
                        state.agentUser = false;
                    } else {
                        state.agentUser = x.data.data;
                    }
                })
                .catch(error => {
                    state.agentUser = false;
                    console.log("获取用户代理人信息失败", error);
                });
        },
        //获取个人信息
        setCurrent(state) {
            // console.log(this.state.loginDate)
            if (!this.state.loginDate.access_token) {
                return;
            }
            axios({
                method: "get",
                url:
                    "/api-u/users/current?access_token=" +
                    this.state.loginDate.access_token,
                data: qs.stringify({})
            })
                .then(x => {
                   
                    if (x.data.error) return;
                    console.log("获取个人信息", x);
                    state.userInfo = x.data;
                    localStorage.userInfo = JSON.stringify(x.data);
                    // {"access_token":"3ca33ff6-3192-40c6-bea6-aff30ea8af14","token_type":"bearer","refresh_token":"df4b6595-39f6-4cc7-8467-369975091bf7","expires_in":28799,"scope":"app"}
                })
                .catch(error => {
                    console.log("获取个人信息失败", error);
                    // router.push("/login");
                });
        }
    },
    actions: {
        // incrementAsync ({ commit }) {
        //     //   commit('increment') // mutations中的方法
        // }
        // 调用 store.dispatch('increment')
    },
    modules: {}
});
// store.commit( 'setIsWeixin', 1);
export default vuex;
// 判断是不是微信
var agent = navigator.userAgent.toLowerCase();
if (agent.match(/MicroMessenger/i) == "micromessenger") {
    //console.log("微信浏览器内访问");
    vuex.state.isweixin = true;
} else {
    // console.log("不是微信");
    vuex.state.isweixin = false;
}
//登录信息
var loginDate = localStorage.loginDate;
vuex.commit("setloginDate", loginDate);
//微信登录的信息
var weixinobj = localStorage.weixin;
vuex.commit("setweixinobj", weixinobj);
//获取个人信息
vuex.commit("setCurrent");

//获取地区
if (
    localStorage.area &&
    localStorage.area != "" &&
    localStorage.area != undefined &&
    localStorage.area != "undefined"
) {
    vuex.state.area = JSON.parse(localStorage.area);
}
axios({
    method: "get",
    url: "/api-u/area/findAll",
    params: {
        start: 0,
        length: 30000
    }
}).then(x => {
    console.log("获取地区", x);
    vuex.state.area = x.data.data;
    localStorage.area = JSON.stringify(x.data.data);
});
