import axios from "@/api/axios.js";
import qs from "qs";

import 红购使者 from "./红购使者/红购使者.js";
import 提现 from "./红购使者/提现.js";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    红购使者: 红购使者,
    提现: 提现
  }
};
