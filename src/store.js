import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

// 判断环境 vuex提示生产环境中不使用
const debug = process.env.NODE_ENV !== "production";

import axios from "axios";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 60000;

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
);

import shangPing from "./vuex/shangPing"; //商品相关接口
import hongbao from "./vuex/hongbao"; //红包相关接口
import shop from "@/vuex/shop.js";
import orders from "@/vuex/orders.js"; //订单
import user from "@/vuex/user.js";
import myshops from "@/vuex/myshops.js";
import 实名认证 from "@/vuex/实名认证.js";
import 申请开店 from "@/vuex/申请开店.js";

import request from "@/api/request";
import agent from "@/vuex/agent.js";
import 红购使者 from "@/vuex/红购使者.js";
import 买单 from "@/vuex/买单.js";
import home from "@/vuex/home.js";
import 获取位置 from "@/vuex/获取位置.js";
import 评论 from "@/vuex/评论.js";
import 商家展示厅 from "@/vuex/商家展示厅.js";
import app from "@/vuex/app.js";

Vue.use(Vuex);
// 对名字进行解码
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";

// export default ()=>{
export default new Vuex.Store({
    // plugins: [createPersistedState()],
    plugins: [
        //储存部分
        createPersistedState({
            reducer(val) {
                return {
                    // 红购使者:val.红购使者,
                    申请开店: val.申请开店,
                    myshops: {
                        分销: val.myshops.分销
                    }
                };
            }
        })
    ],
    state: {
        weixin_ready: false, //微信准备就绪
        clientX: "", //远点导航X
        clientY: 350, //远点导航Y
        isweixin: true,
        loginDate: {}, //login信息
        weixinobj: {}, //微信授权信息
        userInfo: {}, //用户信息
        agentUser: false, //用户代理人信息   是否是代理人这里判断
        area: [], //地区

        todos: [
            { id: 1, text: "测试1", done: true },
            { id: 2, text: "测试2", done: false }
        ],
        //申请店铺
        apply_for_a_shop: {
            creationTime: "", //开始时间
            endTime: "", //结束时间
            shopType: "", //1个人经营 2公司经营
            address: "",
            businessLicense: "", //营业执照 base64
            blnumber: "", //营业执照号
            //--------------开店认证
            sex: "", //性别
            iaiName: "", //名字
            nation: "", //民族
            birthday: "", //出生日期
            iaiAddress: "", //住址
            idNumber: "", //证件号码
            issueArea: "", //签证机关
            frontImg: "", //正面
            reverseImg: "", //背面
            validity: "" //有效期
        },
        geographical_position: {
            latitude: "", // 纬度，浮点数，范围为90 ~ -90
            longitude: "", // 经度，浮点数，范围为180 ~ -180。
            address: ""
        },
        general_time: {
            //通用时间
            year: "",
            month: "",
            day: "",
            end_year: "",
            end_month: "",
            end_day: "",
            type: 0 //0按月 1表示按日
        },
        findByUserid: "", //用户实名信息
        shops_tree_list: [], //店铺分类
        myshop: {}, //我的店铺信息

        Select_picture: {
            //从相册中选择的图片
            type: "", //ue 编译器选择 commodity 商品  根据环境不同内容不同
            list: []
        },
        in_index: 0, //是否是第一次进入缓存页面
        my_position: {
            //我的位置
            x: "",
            y: ""
        },
        //红包
        redid: "" //红包id
    },
    getters: {
        当前位置(state) {
            return state.my_position
        },
        geographical_position(state) {
            return state.geographical_position;
        },
        apply_for_a_shop(state) {
            return state.apply_for_a_shop;
        },
        test1(state) {
            // this.$store.getters.doneTodos  这种写法和下面的写法不一样
            return state.todos.find(todo => todo.done);
            // return 'store测试1';
        },
        test: state => () => {
            return "store测试";
        },
        doneTodos: state => () => {
            console.log(1);
            //this.$store.getters.doneTodos(...)
            return state.todos.find(todo => todo.done);
        },
        filter_area: (state, getters) => (id, list) => {
            console.log("过滤地址");
            var arr = list ? list : [];
            var obj = state.area.find(x => x.id == id);
            if (obj) {
                arr.unshift(obj);
                if (obj.parentid) {
                    getters.filter_area(obj.parentid, arr);
                }
            }
            return arr;
        },
        get_myshop(state) {
            return state.myshop;
        },
        g_agentUser(state) {
            return state.agentUser;
        },
        shops_tree_list(state) {
            return state.shops_tree_list
        },
    },
    mutations: {
        filter_area() { },
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
            try {
                var userInfo = JSON.parse(localStorage.userInfo);
            } catch (error) {
                state.agentUser = false;
                return;
            }
            axios({
                method: "get",
                url: "/api-u/agentUser/me?userid=" + userInfo.username
            }).then(x => {
                console.log("获取用户代理人信息", x);
                if (x.data.code == 200) {
                    state.agentUser = x.data.data;
                } else {
                    state.agentUser = false;
                }
            }).catch(error => {
                state.agentUser = false;
                console.log("获取用户代理人信息失败", error);
            });
        },
        //获取个人信息
        setCurrent(state) {
            // console.log(this.state.loginDate)
            if (!localStorage.id || localStorage.id == "" || localStorage.id == null || localStorage.id == undefined || localStorage.id == "undefined") {
                alert("获取用户信息失败，请重新登录");
                location.href = "index.html#/login";
                return;
            }
            var id = localStorage.id;
            axios.get("api-u/users/" + id).then(x => {
                if (x.data.error) return;
                if (x.data.code != 200) {
                    alert("获取用户信息失败，请重新登录");
                    location.href = "index.html#/login";
                    return;
                } else {
                    console.log("获取个人信息", x);
                    let userInfo = x.data.data;
                    try {
                        userInfo.nickname = b64DecodeUnicode(userInfo.nickname);
                    } catch (error) { }

                    state.userInfo = userInfo;
                    localStorage.userInfo = JSON.stringify(userInfo);
                }
            }).catch(error => {
                alert("获取用户信息失败，请重新登录");
                location.href = "index.html#/login";
            });
        },
        //获取用户实名信息
        setfindByUserid() {
            var userInfo = JSON.parse(localStorage.userInfo);
            axios.get("/api-u/certification/findByUserid?userid=" + userInfo.username).then(x => {
                this.state.findByUserid = x.data;
            }).catch(error => {
            });
        },
        //获取店铺类型
        setShopTree() {
            axios({
                method: "get",
                // url:'http://122.114.169.178:10002/api-s/shops/tree/findAll',
                url: "/api-s/shops/tree/findAll"
            }).then(x => {
                console.log("获取店铺类型", x);
                //增加一个key
                function addKey(list) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].value = list[i].id;
                        list[i].text = list[i].name;
                        if (list[i].children) {
                            list[i].children = addKey(list[i].children);
                        }
                    }
                    return list;
                }
                if (x.data.code == 200) {
                    var list = addKey(x.data.data);
                    localStorage.shops_tree_list = JSON.stringify(list);
                    this.state.shops_tree_list = list;
                } else {
                    console.log("获取店铺类型失败", x);
                }
            }).catch(error => {
                console.log("获取店铺类型失败", error);
            });
        },
    },
    actions: {
        获取店铺类型() {
            axios({
                method: "get",
                // url:'http://122.114.169.178:10002/api-s/shops/tree/findAll',
                url: "/api-s/shops/tree/findAll"
            }).then(x => {
                console.log("获取店铺类型", x);
                //增加一个key
                function addKey(list) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].value = list[i].id;
                        list[i].text = list[i].name;
                        if (list[i].children) {
                            list[i].children = addKey(list[i].children);
                        }
                    }
                    return list;
                }
                if (x.data.code == 200) {
                    var list = addKey(x.data.data);
                    localStorage.shops_tree_list = JSON.stringify(list);
                    this.state.shops_tree_list = list;
                } else {
                    console.log("获取店铺类型失败", x);
                }
            }).catch(error => {
                console.log("获取店铺类型失败", error);
            });
        },
        actions_agentUser({ dispatch, state }) {
            //获取代理人信息
            return new Promise((resolve, reject) => {
                try {
                    var userInfo = JSON.parse(localStorage.userInfo);
                } catch (error) {
                    state.agentUser = false;
                    resolve(false);
                    return;
                }
                axios.get("/api-u/agentUser/me?userid=" + userInfo.username).then(x => {
                    if (x.data.code == 200) {
                        state.agentUser = x.data.data;
                    } else {
                        state.agentUser = false;
                    }
                    resolve(x);
                }).catch(err => {
                    state.agentUser = false;
                    resolve(err);
                });
            });
        },
        async getMyshop({ state, dispatch, commit, rootGetters }) {
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
            // commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations

            var 员工信息 = await dispatch("myshops/员工查询自己的信息");
            var 身份 = rootGetters["myshops/身份"];
            // 身份:0,  // -1 查询失败 0 没有店铺 1 老板 2 员工
            return new Promise((resolve, reject) => {
                if (身份 == -1) {
                    resolve();
                    return;
                } else if (身份 == 2) {
                    dispatch("myshops/根据店铺Id查询店铺", 员工信息.data.data.shopid, { root: true }).then(x => {
                        if (x.data.code == 200 && x.data.data) {
                            state.myshop = x.data.data;
                            dispatch("myshops/设置身份", 2);
                        }
                        resolve(x);
                    });
                } else {
                    //老板
                    dispatch("myshops/查询自己的店铺").then(x => {
                        if (x && x.data.code == 200) {
                            if (x.data.data) {
                                dispatch("myshops/设置身份", 1);
                                state.myshop = x.data.data;
                            } else {
                                dispatch("myshops/设置身份", 0);
                                state.myshop = x.data.data;
                            }
                        }
                        resolve(x);
                    });
                }
            });
        },
        //获取地区
        get_area({ state }) {
            axios({
                method: "get",
                url: "/api-u/area/findAll",
                params: {
                    start: 0,
                    length: 30000
                }
            }).then(x => {
                console.log("获取地区", x);
                if (x.data.total) {
                    state.area = x.data.data;
                    localStorage.area = JSON.stringify(x.data.data);
                }
            });
        }
        // 调用 store.dispatch('get_area')
    },
    modules: {
        shangPing: shangPing,
        shop: shop,
        hongbao: hongbao,
        orders: orders,
        user: user,
        agent: agent,
        myshops: myshops,
        实名认证: 实名认证,
        申请开店: 申请开店,
        红购使者: 红购使者,
        买单: 买单,
        home: home,
        获取位置: 获取位置,
        评论: 评论,
        商家展示厅: 商家展示厅,
        app: app
    }
});
// })
