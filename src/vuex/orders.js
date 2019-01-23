// import axios from "axios";
// axios.defaults.baseURL = baseURL;
// axios.defaults.timeout =  60000;
// axios.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         if (error.response) {
//             return error.response;
//         }
//         return Promise.reject(error.response); // 返回接口返回的错误信息
//     }
// );
import order from "@/vuex/orders/order.js"; //支付订单界面用
import orderList from "@/vuex/orders/orderList.js"; //我的订单 列表
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    order: order,
    orderList: orderList
  }
};
