import axios from "@/api/axios.js";

import qs from "qs";

export default {
  namespaced: true,
  state: {
    shop: {}, //店铺
    isfenxiang: true
  },
  getters: {
    shop(state) {
      return state.shop;
    },
    isfenxiang(state) {
      return state.isfenxiang;
    }
  },
  mutations: {
    set_shop(state, obj) {
      state.shop = obj;
    }
  },
  actions: {
    //设置分享
    async set_isfenxiang({ state }, type) {
      return new Promise((resolve, reject) => {
        console.log("设置分享");
        state.isfenxiang = type ? true : false;
      });
    },
    //根据店铺Id查询店铺
    async get_shop({ commit }, shopid) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api-s/shops/findByShopid/" + shopid)
          .then(x => {
            if (x.data.code == 200) {
              commit("set_shop", x.data.data);
            } else {
              reject(x);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    添加店铺人气({}, shopid) {
      try {
        var userInfo = JSON.parse(localStorage.userInfo);
      } catch (error) {
        return;
      }
      var obj = {
        shopid: shopid,
        userid: userInfo.username
      };
      axios
        .post("/api-s/shops/addShopBasicsPopularity", qs.stringify(obj))
        .then(x => {
          console.log("添加店铺人气", x);
        });
    }
  },
  modules: {}
};
