<template>
    <div id="EmbodyRecord">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">提现记录</h1>
        </header>

        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <!-- <li @click="change(1)">
                    <div>类型</div>
                    <i class="icon iconfont icon-xia"></i>
                </li> -->
                <li @click="change(2)">
                    <div>{{title.type_name}}</div>
                    <i class="mui-icon mui-icon-arrowdown"></i>
                </li>
                <li @click="change(3)">
                    <div>{{title.sort_name}}</div>
                    <i class="mui-icon mui-icon-arrowdown"></i>
                </li>
                <li @click="change_data()">
                    <div>
                        <!-- <input type="text" v-model="data_time" name="" id=""> -->
                        {{title.time}}
                    </div>
                    <i class="icon iconfont icon-calendar"></i>
                </li>
            </ul>

            <div class="box_2 mui-text-center">
                <table>
                    <tbody>
                        <tr>
                            <td>金额</td>
                            <td>时间</td>
                            <td>类型</td>
                            <td>账号</td>
                            <td>状态</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="box_3 mui-text-center" @scroll="scroll($event)">
                <table>
                    <tbody>
                        <tr v-for="(x, index) in sort_list" :key="index">
                            <td>{{x.amount}}</td>
                            <td>
                                <div>{{x.createTime | fleter_time('yyyy.MM.dd')}}</div>
                                <div>{{x.createTime | fleter_time('hh:mm:ss')}}</div>
                            </td>
                            <td>商家提现</td>
                            <td>
                                <span v-if="x.recordType==1">支</span>
                                ({{x.cardid | fleter_account}})
                            </td>
                            <td>
                                <span v-if="x.recordState==0">审核中</span>
                                <span v-if="x.recordState==1">成功</span>
                                <span v-if="x.recordState==2">拒绝</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <loading :loadingtype="loading" :nodata="!loading && list_total==0" :end="!loading && list_total==list.length &&  list_total!=0" />
            </div>

        </div>

    </div>
</template>

<script>
import { dateFtt, openloading } from "@/assets/js/currency.js";
import loading from "@/components/loading";
export default {
  name: "",
  components: {
    loading
  },
  data() {
    return {
      list: [], //提现记录
      userPicker: "", //类型选择
      dataPicker: "", //时间选择
      query: {
        //查询条件
        start: 0,
        length: 15,
        recordState: "", //全部为空 0 待审核 1通过 2拒绝
        startTime: "", //开始时间
        endTime: "", //
        shopid: ""
      },
      loading: true,
      title: {
        type_name: "类型",
        sort_name: "排序",
        sort_type: "",
        time: "请选择日期"
      },
      page_index: 1,
      list_total: 0, //总页数
      get_type: 0,
      userInfo: ""
    };
  },
  computed: {
    //排序
    sort_list() {
      if (this.title.sort_type == 1) {
        return this.list.sort((a, b) => {
          var x = a["createTime"];
          var y = b["createTime"];
          return x < y ? -1 : x > y ? 1 : 0;
        });
      } else if (this.title.sort_type == 2) {
        return this.list.sort((a, b) => {
          var x = a["createTime"];
          var y = b["createTime"];
          return x > y ? -1 : x < y ? 1 : 0;
        });
      } else if (this.title.sort_type == 3) {
        return this.list.sort((a, b) => {
          var x = a["amount"];
          var y = b["amount"];
          return x < y ? -1 : x > y ? 1 : 0;
        });
      } else if (this.title.sort_type == 4) {
        return this.list.sort((a, b) => {
          var x = a["amount"];
          var y = b["amount"];
          return x > y ? -1 : x < y ? 1 : 0;
        });
      } else {
        return this.list;
      }
      // return this.sortKey(this.list,'amount')
    }
  },
  filters: {
    fleter_time(time, type) {
      return dateFtt(time, type);
    },
    fleter_account(str) {
      if (str) {
        return "**" + str.substring(str.length - 3);
      } else {
        return "未知";
      }
    }
  },
  methods: {
    change(x) {
      // console.log(11);
      if (x == 1) {
        this.userPicker.setData([
          { value: "1", text: "代理人" },
          { value: "2", text: "代理商" }
        ]);
      } else if (x == 2) {
        this.userPicker.setData([
          { value: null, text: "全部" },
          { value: "0", text: "待审核" },
          { value: "1", text: "通过" },
          { value: "2", text: "拒绝" }
        ]);
      } else if (x == 3) {
        this.userPicker.setData([
          { value: "", text: "默认排序" },
          { value: "1", text: "时间升序" },
          { value: "2", text: "时间降序" },
          { value: "3", text: "金额升序" },
          { value: "4", text: "金额降序" }
        ]);
      }
      this.userPicker.show(items => {
        if (x == 2) {
          this.title.type_name = items[0].text;
          this.query.recordState = items[0].value;
          this.page_index = 1;
          this.list_total = 0; //总页数
          this.list = [];
          this.get_waitpay();
        } else if (x == 3) {
          this.title.sort_name = items[0].text;
          this.title.sort_type = items[0].value;
        }
        console.log(items);
        //return false;
      });
    },
    //滚动条
    scroll(e) {
      var h = e.target.offsetHeight; //容器高度
      var sh = e.target.scrollHeight; //滚动条总高
      var t = e.target.scrollTop; //滚动条到顶部距离
      if (
        h + t >= sh - 10 &&
        !this.loading &&
        this.list.length < this.list_total
      ) {
        this.page_index++;
        this.get_waitpay();
      }
    },
    //选择时间
    change_data() {
      this.dataPicker.show(time => {
        console.log(time.value);
        this.title.time = time.value;
        this.query.startTime = time.value;
        this.page_index = 1;
        this.list_total = 0; //总页数
        this.list = [];
        this.get_waitpay();
      });
    },
    //查询提现记录
    get_waitpay() {
      this.query.start = (this.page_index - 1) * this.query.length;
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/api-s/shops/findMerchantWithdrawalRecordAll",
        // data:this.query
        params: this.query
      })
        .then(x => {
          if (x.data.code == 200) {
            this.list = this.list.concat(x.data.data.data);
            this.list_total = x.data.data.total;
          } else {
            mui.alert(
              x.data.msg ? x.data.msg : x.data.messag,
              "提示",
              "我知道了",
              function() {},
              "div"
            );
          }
          console.log("获取提现记录", x);
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          mui.toast("获取提现记录失败。", { duration: 2000, type: "div" });
        });
    }
  },
  beforeCreate: function() {
    // console.group('------beforeCreate创建前状态------');
  },
  created: function() {
    // console.group('------created创建完毕状态------');
  },
  beforeMount: function() {
    // console.group('------beforeMount挂载前状态------');
  },
  mounted: function() {
    // 类型选择
    this.userPicker = new mui.PopPicker();
    //时间选择
    var options = { type: "date" };
    this.dataPicker = new mui.DtPicker(options);

    this.query.shopid = this.$route.query.shopid;

    //查询记录
    this.get_waitpay();

    // console.group('------mounted 挂载结束状态------');
  },
  beforeUpdate: function() {
    // console.group('beforeUpdate 更新前状态===============》');
  },
  updated: function() {
    // console.group('updated 更新完成状态===============》');
  },
  beforeDestroy: function() {
    // console.group('beforeDestroy 销毁前状态===============》');
  },
  destroyed: function() {
    // console.group('destroyed 销毁完成状态===============》');
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-content {
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}

.mui-title {
  color: #ffffff;
}

.box_1 {
  padding: 0.1rem;
  display: flex;
  font-size: 14px;
  flex-shrink: 0;

  li {
    flex: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > li:nth-child(4) {
    // width: 1.2rem;
    flex: 1.2rem;
    // display: flex;
    border: 1px solid #cccccc;
    padding: 2px 5px;
    justify-content: space-between;
  }

  i {
    font-size: 14px;
    margin: 0px 0px 0px 5px;
  }

  input {
    margin: 0px;
    padding: 0px;
    height: auto;
    border: none;
    background: none;
    font-size: 14px;
  }
}

.box_2 {
  flex-shrink: 0;
  font-size: 0.13rem;

  table {
    width: 100%;
  }

  tr {
    background: #e6e6e6;
    border-bottom: 1px solid #cccccc;
  }

  td {
    border-left: 1px solid #cccccc;
    width: 20%;
    padding: 5px 0px;
  }

  td:nth-child(1) {
    border: none;
  }
}

.box_3 {
  flex-grow: 1;
  overflow: auto;
  font-size: 0.13rem;

  table {
    width: 100%;
  }

  tr {
    border-bottom: 1px solid #cccccc;
  }

  tr:nth-child(2n) {
    background: #e6e6e6;
  }

  td {
    border-left: 1px solid #cccccc;
    padding: 5px 0px;
    width: 20%;
  }

  td:nth-child(1) {
    border: none;
  }
}
</style>
