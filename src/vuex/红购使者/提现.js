import axios from "@/api/axios.js";
import qs from "qs";

export default {
  namespaced: true,
  state: {
    显示提现框: false,
    提现完成: false,
    提现提示语: [
      // type 0 不能提现 1 加载中 2 成功 3 失败 4 待审核
      { 名称: "促销分润", 金额: 0, type: 0, 提示: "一元起提" }
    ],
    支付密码: ""
  },
  getters: {
    显示提现框(state) {
      return state.显示提现框;
    },
    提现完成(state) {
      return state.提现完成;
    },
    提现提示语(state) {
      return state.提现提示语;
    }
  },
  mutations: {},
  actions: {
    设置提现完成({ state }, type) {
      state.提现完成 = type;
    },
    设置提现提示语({ state }, list) {
      state.提现提示语 = list;
    },
    设置显示提现框({ state }, type) {
      state.显示提现框 = type;
    },
    开始提现({ state, dispatch, rootGetters }, [密码, 姓名]) {
      state.提现完成 = false;
      if (密码 && 密码 != "") {
        state.支付密码 = 密码;
      }
      dispatch("红购使者/红购使者/设置密码输入框", false, { root: true }); // 调用其他模块的 actions
      var 代理人分润资产 =
        rootGetters["agent/ShopBonus/dailiren_fenrun_zichan"];
      var 显示语 = [
        // type 0 不能提现 1 加载中 2 成功 3 失败 4 待审核
        {
          名称: "促销分润",
          金额: 代理人分润资产.balance ? 代理人分润资产.balance : 0,
          type: 0,
          提示: "一元起提"
        }
      ];
      if (!代理人分润资产.balance || 代理人分润资产.balance < 1) {
        显示语[0].type = 0;
        显示语[0].提示 = "一元起提";
      } else {
        显示语[0].type = 1;
        显示语[0].提示 = "";
      }
      state.提现提示语 = 显示语;
      if (显示语[0].type == 0) {
        state.提现完成 = true;
        return;
      }
      // 代理人分润资产:'agent/ShopBonus/dailiren_fenrun_zichan',    //代理人分润资产
      dispatch("设置显示提现框", true);
      dispatch("店铺分润提现", 姓名).then(x => {
        console.log("提现返回值", x);
        dispatch("agent/ShopBonus/dailiren_fenrun", "", { root: true }); //更新代理人分润
        dispatch("agent/获取代人信息", "", { root: true }); //更新代理人信息

        state.提现完成 = true;
        if (!x) {
          显示语[0].type = 3;
          显示语[0].提示 = "网络错误";
        } else if (x.data.code == 200) {
          var str = x.data.msg;
          if (str.indexOf("审核") == -1) {
            显示语[0].type = 2;
            显示语[0].提示 = "成功";
          } else {
            显示语[0].type = 4;
            显示语[0].提示 = "等待审核";
          }
        } else if (
          x.data.code == "PAYEE_USER_INFO_ERROR" ||
          x.data.code == "PAYEE_ACC_OCUPIED"
        ) {
          //需要输入名字
          state.显示提现框 = false;
          dispatch("红购使者/红购使者/设置姓名输入框", true, { root: true }); // 调用其他模块的 actions
        } else {
          显示语[0].type = 3;
          显示语[0].提示 = "失败";
          mui.alert(
            x.data.msg ? x.data.msg : x.data.message,
            "提示",
            "好的",
            function() {},
            "div"
          );
        }
      });
    },
    店铺分润提现({ state, rootGetters }, 姓名) {
      var userInfo = JSON.parse(localStorage.userInfo);
      var 代理人分润资产 =
        rootGetters["agent/ShopBonus/dailiren_fenrun_zichan"];
      var 收款账号 = rootGetters["红购使者/红购使者/收款账号"];
      var obj = {
        agentid: userInfo.username,
        payPassword: state.支付密码,
        name: 姓名 ? 姓名 : "",
        account: 收款账号.account, //到账账号
        type: 1, //1代理人 2 代理商
        amount: 代理人分润资产.balance,
        identity: userInfo.username + "_" + new Date().getTime()
      };
      return new Promise((resolve, reject) => {
        if (!obj.amount || obj.amount < 1) {
          resolve(true);
          return;
        }
        axios
          .post("/api-s/shops/AgentsShareProfit", obj)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            resolve(false);
          });
      });
    }
  },
  modules: {}
};
