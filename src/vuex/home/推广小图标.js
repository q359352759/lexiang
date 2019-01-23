import axios from "@/api/axios.js";
import qs from "qs";

export default {
  namespaced: true,
  state: {
    top: "",
    left: ""
  },
  getters: {
    top(state) {
      return state.top;
    },
    left(state) {
      return state.left;
    }
  },
  mutations: {},
  actions: {
    设置top({ state }, 数字) {
      state.top = 数字;
    },
    设置left({ state }, 数字) {
      state.left = 数字;
    }
  },
  modules: {}
};

// store.commit( 'hongbao/...');
