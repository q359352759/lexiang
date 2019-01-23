import axios from "@/api/axios.js";
import qs from "qs";

export default {
  namespaced: true,
  state: {
    查看类型: 0,
    显示密码输入框: false,
    密码输入焦点: false,
    显示姓名输入框: false,
    收款账号: {}
  },
  getters: {
    查看类型(state) {
      return state.查看类型;
    },
    显示密码输入框(state) {
      return state.显示密码输入框;
    },
    密码输入焦点(state) {
      return state.密码输入焦点;
    },
    显示姓名输入框(state) {
      return state.显示姓名输入框;
    },
    收款账号(state) {
      return state.收款账号;
    }
  },
  mutations: {
    设置查看类型(state, type) {
      state.查看类型 = type;
    }
  },
  actions: {
    设置查看类型({ state, commit }, type) {
      // state.查看类型=type
      commit("设置查看类型", type);
    },
    设置密码输入框({ state, dispatch }, type) {
      state.显示密码输入框 = type;
      dispatch("设置密码输入焦点", type);
    },
    设置密码输入焦点({ state }, type) {
      state.密码输入焦点 = type;
    },
    设置姓名输入框({ state, dispatch }, type) {
      state.显示姓名输入框 = type;
    },
    //========
    获取账号({ state, rootState }) {
      // console.log('其他地方的state',rootState);
      // console.log(rootGetters['vip/get']) // 打印其他模块的 getters
      // dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
      // commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
      var userInfo = JSON.parse(localStorage.userInfo);
      axios
        .get("/api-u/users/findAccount?userid=" + userInfo.username)
        .then(x => {
          if (x.data.data != null) {
            state.收款账号 = x.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
};
