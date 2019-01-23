import axios from "@/api/axios.js";

import qs from "qs";

export default {
  namespaced: true,
  state: {
    shopid: "",
    zichan: {}
  },
  getters: {
    g_zichan(state) {
      return state.zichan;
    }
  },
  mutations: {},
  actions: {
    set_shopid({ dispatch, state }, shopid) {
      state.shopid = shopid;
    },
    //获取资产
    findshopTurnoverByShopid({ dispatch, state }) {
      return new Promise(function(resolve, reject) {
        axios
          .get("/api-s/shops/findshopTurnoverByShopid/" + state.shopid)
          .then(x => {
            console.log("资产信息", x);
            if (x.data.code == 200) {
              state.zichan = x.data.data;
            }
            resolve();
          })
          .catch(err => {
            console.log("获取资产失败", err);
            resolve();
          });
      });
    }
  },
  modules: {}
};
