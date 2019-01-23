import axios from "@/api/axios.js";
import qs from "qs";

export default {
  namespaced: true,
  state: {
    type: 0,
    //商家
    list_1: {
      loading: true,
      list: [],
      total: 0,
      page_index: 0,
      query: {
        type: 1, //1店铺 2 用户的推荐人 3区域代理商
        start: 0,
        length: 20,
        getShareProfitUser: "" //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
      }
    },
    //会员
    list_2: {
      loading: true,
      list: [],
      total: 0,
      page_index: 0,
      query: {
        type: 2, //1店铺 2 用户的推荐人 3区域代理商
        start: 0,
        length: 20,
        getShareProfitUser: "" //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
      }
    },
    daiLiShang_fenrun_zichan: {}
  },
  getters: {
    get_list1(state) {
      return state.list_1;
    },
    get_list2(state) {
      return state.list_2;
    },
    get_type(state) {
      return state.type;
    },
    daiLiShang_fenrun_zichan(state) {
      return state.daiLiShang_fenrun_zichan;
    }
  },
  mutations: {},
  actions: {
    //设置类型
    set_type({ state }, type) {
      state.type = type;
    },
    //数据初始化
    ShopBonus_init({ state }) {
      var userInfo = JSON.parse(localStorage.userInfo);
      state.list_1 = {
        loading: true,
        list: [],
        total: 0,
        page_index: 0,
        query: {
          type: 1, //1店铺 2 用户的推荐人 3区域代理商
          start: 0,
          length: 20,
          getShareProfitUser: userInfo.username //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
        }
      };
      state.list_2 = {
        loading: true,
        list: [],
        total: 0,
        page_index: 0,
        query: {
          type: 2, //1店铺 2 用户的推荐人 3区域代理商
          start: 0,
          length: 20,
          getShareProfitUser: userInfo.username //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
        }
      };
    },
    //查询代理商 店铺分润
    daiLiShang_fenrun_zichan({ state }) {
      var userInfo = JSON.parse(localStorage.userInfo);
      var obj = {
        userid: userInfo.username,
        userType: 2 //代理商
      };
      return new Promise((resolve, reject) => {
        axios
          .get("/api-s/shops/findAgentsShareProfitByUseridAndUserType", {
            params: obj
          })
          .then(x => {
            console.log("获取代理商分润资产", x);
            if (x.data.code == 200 && x.data.data.length > 0) {
              state.daiLiShang_fenrun_zichan = x.data.data[0];
            }
          })
          .catch(err => {
            console.log("获取代理商分润资产", err);
          });
      });
    }
  },
  modules: {}
};
