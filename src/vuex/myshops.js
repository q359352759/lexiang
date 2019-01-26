import axios from "@/api/axios.js";

import qs from "qs";

import zichan from "@/vuex/myshop/zichan.js";
import 销售 from "@/vuex/myshop/销售.js";
import 班次 from "@/vuex/myshop/班次.js";
import 店员 from "@/vuex/myshop/店员.js";
import 打卡 from "@/vuex/myshop/打卡.js";
import 评论 from "@/vuex/myshop/评论.js";
export default {
    namespaced: true,
    state: {
        referrer_show: false, //推荐人显示框
        referrer: {}, //获取推荐人
        身份: 0, // -1 查询失败 0 没有店铺 1 老板 2 员工
        显示打卡框: false
    },
    getters: {
        referrer_show(state) {
            return state.referrer_show;
        },
        referrer(state) {
            return state.referrer;
        },
        身份(state) {
            return state.身份;
        },
        显示打卡框(state) {
            return state.显示打卡框;
        }
    },
    mutations: {},
    actions: {
        设置打卡框({ state }, type) {
            state.显示打卡框 = type;
        },
        设置身份({ state }, type) {
            state.身份 = type;
        },
        设置推荐人({ state }, obj) {
            state.referrer = obj;
        },
        set_referrer_show({ state }, type) {
            state.referrer_show = type;
        },
        员工查询自己的信息({ dispatch }) {
            dispatch("设置身份", 0);
            return new Promise((resolve, reject) => {
                try {
                    var userInfo = JSON.parse(localStorage.userInfo);
                } catch (error) {
                    resolve(false);
                }
                axios.get("/api-s/shops/findShopClerksByClerksId?clerksId=" + userInfo.username).then(x => {
                    if (x.data.code == 200) {
                        if (x.data.data) {
                            dispatch("设置身份", 2);
                        }
                    } else {
                        dispatch("设置身份", -1);
                    }
                    resolve(x);
                }).catch(err => {
                    dispatch("设置身份", -1);
                    reject(reject);
                });
            });
        },
        根据店铺Id查询店铺({ state }, shopid) {
            return new Promise((resolve, reject) => {
                axios.get("/api-s/shops/findByShopid/" + shopid).then(x => {
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        查询自己的店铺() {
            return new Promise((resolve, reject) => {
                try {
                    var userInfo = JSON.parse(localStorage.userInfo);
                } catch (error) {
                    resolve(false);
                    return;
                }
                axios.get("/api-s/shops/finByUserid/" + userInfo.username).then(x => {
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    },
    modules: {
        zichan: zichan,
        销售: 销售,
        班次: 班次,
        店员: 店员,
        打卡: 打卡,
        评论: 评论
    }
};
