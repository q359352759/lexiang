import axios from "@/api/axios.js";

import qs from "qs";

import { getDateStr } from "@/assets/js/currency.js";
import { getCurrentMonthFirst, getCurrentMonthLast } from "@/assets/js/time.js";

export default {
    namespaced: true,
    state: {
        今日销售: {
            query: {
                startTime: getDateStr(0) + " 00:00",
                endTime: getDateStr(0) + " 24:00",
                state: 1,
                shopid: ""
            },
            data: 0
        },
        本月销售: {
            query: {
                startTime: getCurrentMonthFirst() + " 00:00",
                endTime: getCurrentMonthLast() + " 24:00",
                state: 1,
                shopid: ""
            },
            data: 0
        },
        累计销售: {
            query: {
                state: 1,
                shopid: ""
            },
            data: 0
        }
    },
    getters: {
        今日销售(state) {
            return state.今日销售;
        },
        本月销售(state) {
            return state.本月销售;
        },
        累计销售(state) {
            return state.累计销售;
        }
    },
    mutations: {},
    actions: {
        //可用于个别单独调用
        查询统计({ state }, query) {
            return new Promise((resolve, reject) => {
                // qs.stringify(query)
                axios.get("/api-s/shops/findAmountSum", { params: query }).then(x => {
                    resolve(x);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        查询销售统计({ state, dispatch }, shopid) {
            console.log(getDateStr(0));
            state.今日销售.query.startTime = getDateStr(0) + " 00:00"
            state.今日销售.query.endTime = getDateStr(0) + " 24:00"
            state.今日销售.query.shopid = shopid

            state.本月销售.query.startTime = getCurrentMonthFirst() + " 00:00";
            state.本月销售.query.endTime = getCurrentMonthLast() + " 24:00";
            state.本月销售.query.shopid = shopid;
            state.累计销售.query.shopid = shopid;
            Promise.all([
                dispatch("查询统计", state.今日销售.query),
                dispatch("查询统计", state.本月销售.query),
                dispatch("查询统计", state.累计销售.query)
            ]).then(x => {
                if (x[0].data.code == 200) {
                    state.今日销售.data = x[0].data.data;
                }
                if (x[1].data.code == 200) {
                    state.本月销售.data = x[1].data.data;
                }
                if (x[2].data.code == 200) {
                    state.累计销售.data = x[2].data.data;
                }
            });
        }
    },
    modules: {}
};
