import request from "@/api/request.js";
export default {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {
    test1: state => () => {
      // this.$store.getters["hongbao/test1"]()  使用方法
      return "store测试2";
    },
    filter_hongbao: state => (list, CommodityId, type) => {
      //type  0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
      // console.log(list,CommodityId)
      // console.log('获取红包过滤')  返回数组
      var newlist = [];
      if (CommodityId) {
        newlist = list.filter(x => x.redCommodityId == CommodityId);
      } else if (type || type == 0) {
        newlist = list.filter(x => x.type == type);
      }
      return newlist;
    }
  },
  mutations: {
    //获取有效卡包信息
    findDataUserCardPackge(state, obj) {
      /*
             * obj.query 查询条件
             * obj.fc 返回值接收对象
             *
             */
      request("/api-s/shops/findEffective", obj.query, "get")
        .then(x => {
          obj.fc(x.data);
        })
        .catch(err => {
          obj.fc(err);
        });
    }
  },
  actions: {
    // store.dispatch({
    //     type: 'incrementAsync',
    //     amount: 10
    // })
    // store.dispatch('increment')
  },
  modules: {}
};

// store.commit( 'hongbao/...');
