import axios from "@/api/axios.js";
import qs from "qs";

export default {
  namespaced: true,
  state: {
    店铺: {
      //============
      userid: "", //用户Id
      name: "", //店铺名
      shopType: "", //店铺类型
      phone: "", //联系电话
      areaCode: "", //区域code
      address: "", //地址
      x: "", //经度
      y: "", //纬度
      businessNature: 1, //1个体 2实体
      businessLicense: "", //营业执照 base64
      blnumber: "", //营业执照号
      signboard: "", //商家店招
      // environmentalImg:[],    //环境图片
      arrEnvironmentalImg: [], //环境图片
      // serviceType:[],         //服务种类，环境
      arrServiceType: [], //服务种类，环境
      referrerPhone: "", //推荐人（代理人手机号码） 可不传
      openTime: "", //开门时间
      closeTime: "", //关门时间
      //认证信息
      sex: "", //性别
      nation: "", //民族
      birthday: "", //出生日期
      iaiAddress: "", //住址
      idNumber: "", //证件号码
      issueArea: "", //签证机关
      frontImg: "", //正面
      reverseImg: "", //背面
      validity: "", //有效期
      iaiName: "" //认证名
    },
    新人红包: {
      id: "",
      shopid: "",
      type: "0", //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
      name: "新人红包", //名称
      headline: "店铺新人红包", //标题
      amount: "", //金额
      quantity: "", //数量
      startTime: "", //开始时间
      endTime: "", //截止时间
      // ================
      signInStartTime: "", //签到开始时间
      signInEndTime: "", //签到结束时间
      commodityId: "", //商品Id
      commodityName: "", //商品名称
      startAmount: "", //起始金额
      progressivelyAmount: "", //递增金额
      state: 1, //是否开启
      increaseDays: "", //递增天数
      cycleDays: "", //循环天数
      // ===================
      createTime: "",
      deductionType: 0, //抵扣方式   0表示百分百 1表示满多少减多少
      percentage: "", //抵扣百分比
      expire: "", //满多少
      deduction: "" //减多少
    },
    红包ok: false,
    推荐人: "",
    用户推荐人: "",
    区域代理商: "",
    重新提交: false
  },
  getters: {
    店铺(state) {
      return state.店铺;
    },
    新人红包(state) {
      return state.新人红包;
    },
    红包ok(state) {
      return state.红包ok;
    },
    推荐人(state) {
      return state.推荐人;
    },
    用户推荐人(state) {
      return state.用户推荐人;
    },
    区域代理商(state) {
      return state.区域代理商;
    },
    重新提交(state) {
      return state.重新提交;
    }
  },
  mutations: {
    设置重新提交(state, type) {
      state.重新提交 = type;
    },
    更新店铺key(state, [key, val]) {
      state.店铺[key] = val;
    },
    删除环境图片(state, index) {
      state.店铺.arrEnvironmentalImg.splice(index, 1);
    },
    添加环境图片(state, base64) {
      state.店铺.arrEnvironmentalImg.push(base64);
    },
    设置店铺服务(state, id) {
      var obj = state.店铺.arrServiceType.find(x => x == id);
      if (!obj) {
        state.店铺.arrServiceType.push(id);
      } else {
        var newlist = state.店铺.arrServiceType.filter(x => x != id);
        console.log(newlist);
        state.店铺.arrServiceType = newlist;
      }
    },
    更新红包key(state, [key, val]) {
      state.新人红包[key] = val;
    },
    红包是否能提交(state, type) {
      state.红包ok = type;
    },
    保存推荐人信息(state, obj) {
      state.推荐人 = obj;
    },
    保存用户推荐人(state, obj) {
      state.用户推荐人 = obj;
    },
    保存代理商信息(state, obj) {
      console.log(obj);
      state.区域代理商 = obj;
      if (!state.推荐人 && !state.用户推荐人 && obj) {
        var newobj = Object.assign({}, obj);
        newobj.realName = obj.name;
        state.保存推荐人信息 = obj;
      }
    },
    重新绑定店铺信息(state, obj) {
      state.店铺 = obj;
      state.重新提交 = true;
    },
    重新绑定红包(state, obj) {
      state.新人红包 = obj;
      state.红包ok = true;
    }
  },
  actions: {
    重新绑定店铺信息({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit("重新绑定店铺信息", obj);
        resolve();
      });
    },
    重新绑定红包({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit("重新绑定红包", obj);
        resolve();
      });
    },
    更新店铺key({ commit }, list) {
      commit("更新店铺key", list);
    },
    保存推荐人信息({ commit }, obj) {
      commit("保存推荐人信息", obj);
    },
    保存用户推荐人({ commit }, obj) {
      commit("保存用户推荐人", obj);
    },
    查询代理人({}, username) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api-u/agentUser/me?userid=" + username)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    根据区域查询代理商({ commit }, code) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api-u/areaManager/findByAreaCode?areaCode=" + code)
          .then(x => {
            commit("保存代理商信息", x.data.data);
            resolve(x);
          })
          .catch(err => {
            reject(reject);
          });
      });
    }
  },
  modules: {}
};
