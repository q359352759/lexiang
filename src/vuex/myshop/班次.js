import axios from "@/api/axios.js";

import qs from "qs";

import { getDateStr, openloading } from "@/assets/js/currency.js";
import { getCurrentMonthFirst, getCurrentMonthLast } from "@/assets/js/time.js";

const 固定班次 = [
    {
        shopid: "",
        shiftid: "",
        officehours: "",
        quittingtime: "",
        shift: "固定班次"
    }
];
const 两班 = [
    {
        shopid: "",
        shiftid: "",
        officehours: "",
        quittingtime: "",
        shift: "两班"
    },
    {
        officehours: "",
        quittingtime: "",
        shift: "两班"
    }
];
const 三班 = [
    {
        shopid: "",
        shiftid: "",
        officehours: "",
        quittingtime: "",
        shift: "三班"
    },
    {
        shopid: "",
        shiftid: "",
        officehours: "",
        quittingtime: "",
        shift: "三班"
    },
    {
        shopid: "",
        shiftid: "",
        officehours: "",
        quittingtime: "",
        shift: "三班"
    }
];

export default {
    namespaced: true,
    state: {
        班次: [
            {
                id: "",
                schedulingtype: 1 //早班
            }
        ],
        固定班次: [
            {
                shopid: "",
                shiftid: "",
                officehours: "",
                quittingtime: "",
                shift: "固定班次"
            }
        ],
        两班: [
            {
                shopid: "",
                shiftid: "",
                officehours: "",
                quittingtime: "",
                shift: "两班"
            },
            {
                officehours: "",
                quittingtime: "",
                shift: "两班"
            }
        ],
        三班: [
            {
                shopid: "",
                shiftid: "",
                officehours: "",
                quittingtime: "",
                shift: "三班"
            },
            {
                shopid: "",
                shiftid: "",
                officehours: "",
                quittingtime: "",
                shift: "三班"
            },
            {
                shopid: "",
                shiftid: "",
                officehours: "",
                quittingtime: "",
                shift: "三班"
            }
        ],
        班次类型: 1
    },
    getters: {
        班次(state) {
            return state.班次;
        },
        固定班次(state) {
            return state.固定班次;
        },
        两班(state) {
            return state.两班;
        },
        三班(state) {
            return state.三班;
        },
        班次类型(state) {
            return state.班次类型;
        },
        当前考勤时间(state) {
            if (state.班次.length == 0 || state.班次[0].id == "") {
                return []; //未设置班次
            } else if (state.班次[0].schedulingtype == 1) {
                return state.固定班次;
            } else if (state.班次[0].schedulingtype == 2) {
                return state.两班;
            } else if (state.班次[0].schedulingtype == 3) {
                return state.三班;
            }
        }
    },
    mutations: {},
    actions: {
        考勤时间初始化({ state }) {
            state.固定班次 = JSON.parse(JSON.stringify(固定班次));
            state.两班 = JSON.parse(JSON.stringify(两班));
            state.三班 = JSON.parse(JSON.stringify(三班));
        },
        选择班次类型({ state }, type) {
            state.班次类型 = type;
        },
        async 添加考勤时间({ state, dispatch, rootGetters }) {
            openloading(true);
            var 店铺 = rootGetters["get_myshop"];
            // console.log(state.班次[0].id);
            // return
            if (state.班次.length == 0) {
                var 添加对象 = {
                    shopid: 店铺.shopid,
                    schedulingtype: state.班次类型
                };
                await dispatch("添加班次", 添加对象);
                await dispatch("查询班次");
            } else if (
                state.班次.length > 0 &&
                state.班次类型 != state.班次[0].schedulingtype
            ) {
                var 修改班次对象 = Object.assign({}, state.班次[0]);
                修改班次对象.schedulingtype = state.班次类型;
                await dispatch("修改班次", 修改班次对象);
            }
            var 固定班次不能提交 = state.固定班次.find(
                x => x.officehours == "" || x.quittingtime == ""
            );
            if (!固定班次不能提交) {
                try {
                    var 添加单个考勤时间 = await dispatch("添加单个考勤时间", state.固定班次[0]);
                } catch (error) { }
            }
            var 两班不能提交 = state.两班.find(x => x.officehours == "" || x.quittingtime == "");
            if (!两班不能提交) {
                await dispatch("添加单个考勤时间", state.两班[0]);
                await dispatch("添加单个考勤时间", state.两班[1]);
            }
            var 三班不能提交 = state.三班.find(
                x => x.officehours == "" || x.quittingtime == ""
            );
            if (!三班不能提交) {
                await dispatch("添加单个考勤时间", state.三班[0]);
                await dispatch("添加单个考勤时间", state.三班[1]);
                await dispatch("添加单个考勤时间", state.三班[2]);
            }
            return new Promise((resolve, reject) => {
                resolve();
            });
        },
        添加单个考勤时间({ state, rootGetters }, obj) {
            var 店铺 = rootGetters["get_myshop"];
            obj.shopid = 店铺.shopid;
            obj.shiftid = state.班次[0].id;
            
			var loginDate = JSON.parse(localStorage.loginDate);
			var access_token=loginDate.access_token ? loginDate.access_token : '';
            return new Promise((resolve, reject) => {
                if (obj.id) {
                    axios.post("/api-s/shops/updateShopShift", obj , {headers:{Authorization:"Bearer "+access_token}} ).then(x => {
                        if (x.data.code != 200) {
                            mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                            reject();
                        }
                        resolve(x);
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    axios.post("/api-s/shops/addShopShift", obj , {headers:{Authorization:"Bearer "+access_token}} ).then(x => {
                        if (x.data.code != 200) {
                            mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                            reject();
                        }
                        resolve(x);
                    }).catch(err => {
                        reject(err);
                    });
                }
            });
        },
        查询考勤时间({ state, rootGetters }) {
            var 商家 = rootGetters["get_myshop"];
            return new Promise((resolve, reject) => {
                axios.get("/api-s/shops/findShopShiftByShopid/" + 商家.shopid).then(x => {
                    if (x.data.code == 200) {
                        var list = x.data.data;
                        // 设置固定班次
                        var 固定班次_1 = list.filter(x => x.shift == "固定班次");
                        var 两班_1 = list.filter(x => x.shift == "两班");
                        var 三班_1 = list.filter(x => x.shift == "三班");
                        if (固定班次_1.length > 0) {
                            state.固定班次 = 固定班次_1;
                        } else {
                            state.固定班次 = JSON.parse(JSON.stringify(固定班次));
                        }
                        if (两班_1.length > 0) {
                            state.两班 = 两班_1;
                        } else {
                            state.两班 = JSON.parse(JSON.stringify(两班));
                        }
                        if (三班_1.length > 0) {
                            state.三班 = 三班_1;
                        } else {
                            state.三班 = JSON.parse(JSON.stringify(三班));
                        }
                    }
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        修改班次({ state }, obj) {
            
			var loginDate = JSON.parse(localStorage.loginDate);
            var access_token=loginDate.access_token ? loginDate.access_token : '';
            
            return new Promise((resolve, reject) => {
                axios.post("/api-s/shops/updateShopScheduling", obj , {headers:{Authorization:"Bearer "+access_token}}).then(x => {
                    if (x.data.code != 200) {
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                        reject();
                    }
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        查询班次({ state, dispatch, rootGetters }) {
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
            // commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
            var 店铺 = rootGetters["get_myshop"];
            return new Promise((resolve, reject) => {
                axios
                    .get("/api-s/shops/findShopSchedulingByShopid", {
                        params: { shopid: 店铺.shopid }
                    })
                    .then(x => {
                        console.log("查询班次", x);
                        var 班次 = x.data.data || [];
                        state.班次 = 班次;
                        if (班次.length > 0) {
                            state.班次类型 = 班次[0].schedulingtype;
                        }
                        resolve(x);
                    })
                    .catch(err => {
                        console.log("查询班次", err);
                        reject(err);
                    });
            });
        },
        添加班次({ }, obj) {
			var loginDate = JSON.parse(localStorage.loginDate);
			var access_token=loginDate.access_token ? loginDate.access_token : '';
            return new Promise((resolve, reject) => {
                axios.post("/api-s/shops/addShopScheduling", obj , {headers:{Authorization:"Bearer "+access_token}} ).then(x => {
                    if (x.data.code != 200) {
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                        reject();
                    }
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    },
    modules: {}
};
