<template>
    <div id="EmbodyRecord">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{this.$store.state.isweixin ? '' : '体现记录'}}</h1>
        </header>

        <div class="mui-content">
            <ul class="box_1">
                <li @click="change(1)">
                    <div>类型</div>
                    <i class="icon iconfont icon-xia"></i>
                </li>
                <li @click="change(2)">
                    <div>状态</div>
                    <i class="icon iconfont icon-xia"></i>
                </li>
                <li @click="change(3)">
                    <div>排序</div>
                    <i class="icon iconfont icon-xia"></i>
                </li>
                <li @click="change_data()">
                    <div>
                        <!-- <input type="text" v-model="data_time" name="" id=""> -->
                        {{data_time}}
                    </div>
                    <i class="icon iconfont icon-riqi"></i>
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

            <div class="box_3 mui-text-center">
                <table>
                    <tbody>
                        <tr v-for="x in list">
                            <td>66.00</td>
                            <td>
                                <div>2018.10.18</div>
                                <div>14:55:55</div>
                            </td>
                            <td>团队补贴</td>
                            <td>支(*某某)</td>
                            <td>成功</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      data_time: "请选择日期",
      list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      userPicker: "", //类型选择
      dataPicker: "" //时间选择
    };
  },
  methods: {
    change(x) {
      // console.log(11);
      if (x == 1) {
        this.userPicker.setData([
          {
            value: "ywj",
            text: "类型1"
          },
          {
            value: "aaa",
            text: "类型2"
          }
        ]);
      } else {
        this.userPicker.setData([
          {
            value: "ywj3",
            text: "类型3"
          },
          {
            value: "aaa4",
            text: "类型4"
          }
        ]);
      }

      this.userPicker.show(function(items) {
        console.log(items);
        // userResult.innerText = JSON.stringify(items[0]);
        //返回 false 可以阻止选择框的关闭
        //return false;
      });
    },
    //选择时间
    change_data() {
      this.dataPicker.show(function(rs) {
        console.log(rs);
        // result.innerText = '选择结果: ' + rs.text;
        // _self.picker.dispose();
        // _self.picker = null;
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
    if (this.$store.state.isweixin) {
      document.getElementsByTagName("title")[0].innerText = "体现记录";
    }
    // 类型选择
    this.userPicker = new mui.PopPicker();
    //时间选择
    var options = { type: "date" };
    this.dataPicker = new mui.DtPicker(options);

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

<style lang="scss">
@import "@/assets/css/config.scss";
#EmbodyRecord {
  height: 100%;
  .mui-content {
    height: 100%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }
}
#EmbodyRecord .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#EmbodyRecord .mui-title {
  color: #ffffff;
}

#EmbodyRecord .box_1 {
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
#EmbodyRecord .box_2 {
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

#EmbodyRecord .box_3 {
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
