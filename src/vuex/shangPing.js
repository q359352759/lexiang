import axios from "axios";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 60000;
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response) {
      return error.response;
    }
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);
export default {
  namespaced: true,
  state: {},
  getters: {
    // doneTodos(state, getters) {
    //     return state.todos.filter(todo => todo.done);
    // },
  },
  mutations: {
    //获取商品
    get_shangping(state, obj) {
      /**
       * obj.list 返回的数据
       * obj.query 查询条件
       *
       **/
      obj.loading = true;
      axios({
        method: "get",
        url: "/api-s/shops/commodity/findAll",
        params: obj.query
      })
        .then(x => {
          console.log("获取商品", x);
          if (x.data.code == 200) {
            obj.list = obj.list.concat(x.data.data.data);
            obj.total = x.data.data.total;
          } else {
            mui.alert(
              x.data.msg ? x.data.msg : x.data.messag,
              "提示",
              "我知道了",
              function() {},
              "div"
            );
          }
          obj.loading = false;
        })
        .catch(error => {
          console.log("获取商品失败", error);
          obj.loading = false;
          mui.toast("获取商品失败", { duration: 2000, type: "div" });
        });
    },
    //根据id查询商品
    get_shangping_1(state, obj) {
      /**
       * id 商品id
       */
      axios({
        method: "get",
        url: "/api-s/shops/commodity/findById/" + obj.id
      })
        .then(x => {
          // console.log('获取单个商品',x)
          if (x.data.code == 200) {
            obj.fc(x.data.data);
          }
        })
        .catch(err => {
          console.log(err);
          console.log("获取商品失败", err);
        });
    },
    get_shangping_2(state, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "/api-s/shops/commodity/findById/" + id
        })
          .then(x => {
            // console.log('获取单个商品',x)
            if (x.data.code == 200) {
              resolve(x);
            } else {
              reject(x);
            }
          })
          .catch(err => {
            reject(err);
            console.log("获取商品失败", err);
          });
      });
    },
    test(state) {
      console.log(123123);
      return 1111111;
    }
  },
  actions: {
    获取商品(state, obj) {
      /**
       * obj.list 返回的数据
       * obj.query 查询条件
       *
       **/
      obj.loading = true;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "/api-s/shops/commodity/findAll",
          params: obj.query
        })
          .then(x => {
            if (x.data.code == 200) {
              obj.list = obj.list.concat(x.data.data.data);
              obj.total = x.data.data.total;
            } else {
              mui.alert(
                x.data.msg ? x.data.msg : x.data.messag,
                "提示",
                "我知道了",
                function() {},
                "div"
              );
            }
            obj.loading = false;
            resolve();
          })
          .catch(error => {
            obj.loading = false;
            mui.toast("获取商品失败", { duration: 2000, type: "div" });
            reject();
          });
      });
    },
    // get_shangping_3 ({ dispatch, commit }) {
    get_shangping_3({ dispatch, commit }, context) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("根据商品Id获取店铺" + context);
        }, 3000);
      });
    },
    //根据id查询商品
    get_shangping_2(state, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "/api-s/shops/commodity/findById/" + id
        })
          .then(x => {
            // console.log('获取单个商品',x)
            if (x.data.code == 200) {
              resolve(x);
            } else {
              reject(x);
            }
          })
          .catch(err => {
            reject(err);
            console.log("获取商品失败", err);
          });
      });
    },
    添加商品({}, 商品) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api-s/shops/commodity/add", 商品)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    修改商品({}, 商品列表) {
      return new Promise((resolve, reject) => {
        console.log(123);
        var loginDate = JSON.parse(localStorage.loginDate);
        axios({
          url: "/api-s/shops/commodity/update",
          method: "post",
          headers: {
            Authorization: "Bearer " + loginDate.access_token
          },
          data: 商品列表
        })
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
        // axios.post('/api-s/shops/commodity/update',商品列表).then(x=>{
        //     resolve(x);
        // }).catch(err=>{
        //     reject(err);
        // })
      });
    },
    删除商品({}, 商品) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api-s/shops/commodity/" + 商品.id)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    查询店铺专享({}, shopid) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "/api-s/shops/findAllExclusive?start=0&length=1000&shopid=" + shopid
          )
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    添加专享({}, 专享) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api-s/shops/addShopExclusive", 专享)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    修改专享({}, 专享) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api-s/shops/updateShopExclusive", 专享)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    删除专享({}, id) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api-s/shops/deleteShopExclusive/" + id)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    商品查询专享({}, 商品id) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api-s/shops/findExclusiveByCommodityId/" + 商品id)
          .then(x => {
            resolve(x);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {}
};
// store.commit( 'shangPing/...');
