import axios from "@/api/axios.js";

import ShopBonus from "@/vuex/agent/ShopBonus.js";
//代理商
import RegionalAgent from "@/vuex/agent/RegionalAgent.js";
import 分润 from "@/vuex/agent/分润.js";
import 提现 from "@/vuex/agent/提现.js";
export default {
  namespaced: true,
  state: {
    代理人信息: "",
    提现中: false,
    显示提现框: false
  },
  getters: {
    代理人信息(state) {
      return state.代理人信息;
    },
    提现中(state) {
      return state.提现中;
    },
    显示提现框(state) {
      return state.显示提现框;
    }
  },
  mutations: {},
  actions: {
    设置提现状态({ state }, type) {
      state.提现中 = type;
    },
    设置显示提现框({ state }, type) {
      state.显示提现框 = type;
    },
    //通过电话号码获取代理人信息
    get_agentUser_phone({ state }, phone) {
      console.log(phone);
      return new Promise((resolve, reject) => {
        axios
          .get("/api-u/agentUser/selectOne?phone=" + phone)
          .then(x => {
            state.代理人信息 = x;
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    获取代人信息({ state }) {
      return new Promise((resolve, reject) => {
        var userInfo = JSON.parse(localStorage.userInfo);
        axios
          .get("/api-u/agentUser/me?userid=" + userInfo.username)
          .then(x => {
            // console.log('获取代理人信息',x);
            if (x.data.code == 200) {
              state.代理人信息 = x.data.data;
            }
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {
    ShopBonus: ShopBonus,
    RegionalAgent: RegionalAgent,
    分润: 分润,
    提现: 提现
  }
};
