import axios from "@/api/axios.js";

import qs from "qs";
const 店员列表 = {
    page_index: 0,
    loading: true,
    total: 0,
    query: {
        start: 0,
        length: 10,
        shopid: ""
    },
    list: []
};
export default {
    namespaced: true,
    state: {
        店员列表: {},
        所有店员: []
    },
    getters: {
        店员列表(state) {
            return state.店员列表;
        },
        所有店员(state) {
            return state.所有店员;
        }
    },
    mutations: {},
    actions: {
        店员初始化({ state }) {
            state.店员列表 = Object.assign({}, 店员列表);
        },
        添加店员({ }, obj) {
            var loginDate = JSON.parse(localStorage.loginDate);
            var access_token = loginDate.access_token ? loginDate.access_token : '';
            return new Promise((resolve, reject) => {
                axios.post("/api-s/shops/addShopClerks", obj, { headers: { Authorization: "Bearer " + access_token } }).then(x => {
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        修改员工({ }, obj) {
            return new Promise((resolve, reject) => {
                axios.post("/api-s/shops/updateShopClerks", obj).then(x => {
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        根据Id查询店员({ state }, id) {
            return new Promise((resolve, reject) => {
                axios.get("/api-s/shops/findShopClerksById?id=" + id).then(x => {
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        根据clerksid查询店员({ state }, clerksid) {
            return new Promise((resolve, reject) => {
                axios.get("/api-s/shops/findShopClerksByClerksid?clerksid=" + clerksid).then(x => {
                    resolve(x)
                }).catch(err => {
                    reject(err)
                });
            });
        },
        查询店员列表({ state, rootGetters, dispatch }) {
            // console.log('其他地方的state',rootState);
            // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
            // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
            // commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
            return new Promise((resolve, reject) => {
                var 店铺 = rootGetters["get_myshop"];
                state.店员列表.query.shopid = 店铺.shopid;
                state.店员列表.query.start =
                    state.店员列表.page_index * state.店员列表.query.length;
                axios.get("/api-s/shops/findShopClerksAll", {
                    params: state.店员列表.query
                }).then(x => {
                    // console.log('查询店员',x)
                    state.店员列表.total = x.data.data.total;
                    var list = x.data.data.data;
                    list.forEach(item => {
                        item.user = "";
                        item.营业额 = ""
                        dispatch("设置员工基本信息", item);
                        dispatch('查询统计', item);
                    });
                    state.店员列表.list = state.店员列表.list.concat(list);
                    state.店员列表.loading = false;
                    resolve();
                }).catch(err => {
                    state.店员列表.loading = false;
                    reject();
                });
            });
        },
        //列表专用
        设置员工基本信息({ }, obj) {
            axios.get("/api-u/users/findByUserid/" + obj.clerksid).then(x => {
                obj.user = x.data.data;
            }).catch(err => { });
        },
        //列表专用
        查询统计({ state }, obj) {
            var query = {
                staffid: obj.clerksid,
                shopid: obj.shopid,
                state: 1
            }
            axios.get("/api-s/shops/findAmountSum", { params: query }).then(x => {
                if (x.data.code == 200) {
                    obj.营业额 = x.data.data;
                }
            }).catch(err => { });
        },
        店员下一页({ state, dispatch }) {
            state.店员列表.page_index++;
            dispatch("查询店员列表");
        },
        移除员工({ state }, [item, index]) {

            var loginDate = JSON.parse(localStorage.loginDate);
            var access_token = loginDate.access_token ? loginDate.access_token : '';
            return new Promise((resolve, reject) => {
                axios.get("/api-s/shops/deleteShopClerks?id=" + item.id, { headers: { Authorization: "Bearer " + access_token } }).then(x => {
                    if (x.data.code == 200) {
                        state.店员列表.list.splice(index, 1);
                        state.店员列表.total--;
                    }
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        查询所有店员({ state, rootGetters }) {
            var 店铺 = rootGetters["get_myshop"];
            var query = {
                shopid: 店铺.shopid,
                start: 0,
                length: 1000
            };
            return new Promise((resolve, reject) => {
                axios
                    .get("/api-s/shops/findShopClerksAll", { params: query })
                    .then(x => {
                        // console.log('查询店员',x)
                        var list = x.data.data.data;
                        state.所有店员 = list;
                        resolve();
                    })
                    .catch(err => {
                        reject();
                    });
            });
        }
    },
    modules: {}
};
