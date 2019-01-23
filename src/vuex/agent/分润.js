import axios from "@/api/axios.js";

import qs from "qs";

export default {
  namespaced: true,
  state: {
    shopid: "",
    分润: {}
  },
  getters: {
    g_zichan(state) {
      return state.zichan;
    }
  },
  mutations: {},
  actions: {
    获取分润({ state }, [areaCode]) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api-s/shops/findAmountSum?areaCode=" + areaCode)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {}
};
