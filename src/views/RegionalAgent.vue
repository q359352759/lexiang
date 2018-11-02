<template>
    <div id="RegionalAgent">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{this.$store.state.isweixin ? '' : '区域代理商'}}</h1>
        </header>

        <div class="mui-content">
            <ul class="box_1">
                <li class="img_box">
                    <img src="@/assets/image/lxlogo_180.png" alt="" srcset="">
                </li>
                <li class="text">
                    <h1>马云</h1>
                    <h2>四川省成都市武侯区</h2>
                </li>
            </ul>
            <ul class="box_2">
                <li @click="change_type(1)" :class="{'active':type_1==1}">
                    <h1>自推</h1>
                    <h2>1324人</h2>
                </li>
                <li @click="change_type(2)" :class="{'active':type_1==2}">
                    <h1>他推</h1>
                    <h2>#e33c64</h2>
                </li>
                <li @click="change_type(3)" :class="{'active':type_1==3}">
                    <h1>提现</h1>
                    <h2>12800元</h2>
                </li>
            </ul>

            <div class="content_1" v-show="type_1==1">
                <ul class="box_3">
                    <li>
                        <div>被推荐人</div>
                        <div>直推</div>
                        <div>间推</div>
                        <div>收益</div>
                    </li>
                </ul>
                <ul class="box_3 list">
                    <li v-for="(item, index) in list" :key="index">
                        <div>张三</div>
                        <div>李四（20）</div>
                        <div>王五（25）</div>
                        <div>200</div>
                    </li>
                </ul>
                <ul class="footer_1">
                    <li>总人数：1982</li>
                    <li>总收益：25800元</li>
                </ul>
            </div>

            <div class="content_1" v-show="type_1==2">
                <ul class="box_3">
                    <li>
                        <div>被推荐人</div>
                        <div>直推</div>
                        <div>间推</div>
                        <div>收益</div>
                    </li>
                </ul>
                <ul class="box_3 list">
                    <li v-for="(item, index) in list" :key="index">
                        <div>张三</div>
                        <div>李四（20）</div>
                        <div>王五（25）</div>
                        <div>200</div>
                    </li>
                </ul>
                <ul class="footer_1">
                    <li>总人数：1982</li>
                    <li>总收益：25800元</li>
                </ul>
            </div>

            <div class="content_2" v-show="type_1==3">
                <div class="box_4">
                    <ul class="Collect_Money" @click="Account()">
                        <li>收款账户：支付宝(*奇东)</li>
                        <li><i class="mui-icon mui-icon-arrowright"></i></li>
                    </ul>
                    <ul class="money">
                        <li>提现金额： </li>
                        <li>
                            <span>￥6210.86</span>
                            <span>费率：5%</span>
                        </li>
                    </ul>
                    <div class="Agreement">
                        <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <span @click="change_radio_2()">我也阅读并同意</span>
                        <span>《业务代理合作协议》</span>
                        <span>
                            <span @click="go('EmbodyRecord')">
                                提现记录
                            </span>
                        </span>
                    </div>
                    <button class="btn_1" @click="change_payment(true)">提交</button>
                </div>
            </div>

        </div>


            <div class="payment" v-show="payment">
                <div class="mask"></div>
                <div class="payment_1">
                    <div class="forget">忘记密码？</div>
                    <div class="close_1" @click="change_payment(false)"><i class="mui-icon mui-icon-closeempty"></i></div>
                    <div class="title">支付密码</div>
                    <div class="input_box">
                        <input type="number" pattern="\d*">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <button class="btn_2">确定</button>
                </div>
            </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      list: [
        1,
        2,
        3,
        4,
        5,
        1,
        2,
        3,
        4,
        51,
        2,
        3,
        4,
        51,
        2,
        3,
        4,
        51,
        2,
        3,
        4,
        51,
        2,
        3,
        4,
        5
      ],
      type_1: 3, //类型 1自推 2他推 3体现
      radio_type_2: true,
      payment: false
    };
  },
  computed: {},
  methods: {
    //选择类型
    change_type(x) {
      this.type_1 = x;
    },
    //合作协议
    change_radio_2(x) {
      this.radio_type_2 = !this.radio_type_2;
    },
    go(x) {
      this.$router.push(x);
    },
    Account() {
      this.$router.push("/Account");
    },
    //打开关闭支付密码输入窗口
    change_payment(x) {
      this.payment = x;
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
      document.getElementsByTagName("title")[0].innerText = "区域代理商";
    }
    // console.log(this.$store.getters.doneTodos)
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
#RegionalAgent {
  height: 100%;
  overflow: auto;
}
#RegionalAgent .mui-bar {
  background: $header_background;
  box-shadow: none;
  a {
    color: #ffffff;
  }
}

#RegionalAgent .mui-title {
  color: #ffffff;
}
#RegionalAgent .mui-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e5e5e5;
}
#RegionalAgent .box_1 {
  display: flex;
  padding: 0px 0.18rem;
  align-items: center;
  min-height: 0.8rem;
  flex-shrink: 0;
  background: #ffffff;
  .img_box {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0px 0.1rem 0px 0px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
  }
  .text {
    line-height: initial;
    h1 {
      font-size: 0.14rem;
      color: #505050;
    }
    h2 {
      font-size: 0.12rem;
      color: #808080;
      font-weight: 100;
    }
  }
}

#RegionalAgent .box_2 {
  flex-shrink: 0;
  margin: 5px 0px 5px;
  min-height: 0.53rem;
  background: #ffffff;
  display: flex;
  text-align: center;
  line-height: initial;
  > li {
    width: calc(100% / 3);
    padding: 0.14rem 0px 7px;
    h1 {
      color: #505050;
      font-size: 0.11rem;
      font-weight: 100;
    }
    h2 {
      color: #e33c64;
      font-size: 0.11rem;
      font-weight: 100;
    }
  }
  > li.active {
    background: #e5e5e5;
  }
}

#RegionalAgent .content_1 {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .list {
    flex-grow: 1;
    overflow: auto;
  }
  .footer_1 {
    background: $header_background;
    height: 0.32rem;
    color: #ffffff;
    font-size: 0.11rem;
    line-height: 0.32rem;
    display: flex;
    justify-content: space-around;
    flex-shrink: 0;
  }
}
#RegionalAgent .box_3 {
  text-align: center;
  font-size: 0.13rem;
  > li:nth-child(2n-1) {
    background: #f0f0f0;
  }
  > li:nth-child(2n) {
    background: #ffffff;
  }
  > li {
    display: flex;
    border-bottom: 1px solid #d8d8d8;
    > div {
      padding: 0.1rem 0px;
      width: 25%;
      border-left: 1px solid #d8d8d8;
    }
    > div:nth-child(1) {
      border: none;
    }
  }
}
#RegionalAgent .box_4 {
  .Collect_Money {
    margin: 5px 0px 0px 0px;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    line-height: 35px;
    padding: 0px 10px 0px 20px;
    color: rgba(56, 56, 56, 1);
    font-size: 12px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    i {
      line-height: 35px;
    }
  }
  .money {
    padding: 0px 10px 0px 20px;
    background: #ffffff;
    color: rgba(80, 80, 80, 1);
    > li:nth-child(1) {
      font-size: 12px;
      padding: 6px 0px;
    }
    > li:nth-child(2) {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 5px 0px 15px 0px;
      > span:nth-child(1) {
        font-size: 27px;
        line-height: initial;
      }
      > span:nth-child(2) {
        font-size: 12px;
        padding: 0px 0px 0px 10px;
        border-left: 1px solid rgba(80, 80, 80, 1);
        height: 14px;
        line-height: 14px;
      }
    }
  }
  .Agreement {
    display: flex;
    padding: 0px 20px;
    font-size: 12px;
    align-items: center;
    margin: 20px 0px;
    > span:nth-child(2) {
      margin: 0px 0px 0px 5px;
    }
    > span:nth-child(3) {
      /* color: rgba(58, 182, 237, 1) */
      color: rgba(42, 130, 228, 1);
    }
    > span:nth-child(4) {
      flex-grow: 1;
      text-align: right;
      color: rgba(42, 130, 228, 1);
    }
  }
  .btn_1 {
    width: 170px;
    height: 32px;
    display: block;
    margin: 0px auto;
    color: rgba(255, 255, 255, 1);
    background-color: $header_background;
    border: none;
    border-radius: 32px;
  }
}

#RegionalAgent .payment {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
  }
  .payment_1 {
    background: #ffffff;
    width: 298px;
    position: relative;
    z-index: 1;
    max-width: 100%;
    .forget {
      position: absolute;
      color: rgba(80, 80, 80, 1);
      font-size: 10px;
      top: 10px;
      left: 24px;
    }
    .close_1 {
      position: absolute;
      top: 0px;
      right: 0px;
      color: rgba(153, 153, 153, 1);
      z-index: 1;
      i {
        font-size: 30px;
      }
    }
    .title {
      height: 42px;
      line-height: 42px;
      color: rgba(80, 80, 80, 1);
      font-size: 14px;
      text-align: center;
      position: relative;
      z-index: 0;
    }
    .input_box {
      width: 243px;
      height: 39px;
      margin: 0px auto;
      position: relative;
      input {
        padding: 0px;
        margin: 0px;
        height: 100%;
        letter-spacing: 30px;
        padding: 0px 0px 0px 15px;
      }
      > ul {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        li {
          border-left: 1px solid #cccccc;
          width: calc(100% / 6);
        }
      }
    }
    .btn_2 {
      width: 123px;
      height: 26px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(54, 140, 89, 1);
      font-size: 14px;
      border-radius: 26px;
      border: none;
      margin: 16px auto;
      display: block;
      padding: 0px;
    }
  }
}

// 单选
#RegionalAgent .radio_1 {
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 15px;
  border-radius: 100%;
  border: 2px solid #cccccc;
  font-size: 12px;
  i {
    font-size: 10px;
    display: none;
  }
}
#RegionalAgent .radio_1.active {
  background: rgba(58, 182, 237, 1);
  border: 2px solid rgba(58, 182, 237, 1);
  color: #ffffff;
  i {
    display: inline-block;
  }
}
</style>
