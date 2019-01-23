<template>
    <div class="密码输入框">
        <div class="mask"></div>
        <div class="payment_1">
            <div class="forget" @click="$router.push('/PaymentPassword')">忘记密码？</div>
            <div class="close_1" @click="设置密码输入框(false)"><i class="mui-icon mui-icon-closeempty"></i></div>
            <div class="title">支付密码</div>
            <div class="input_box">
                <input type="password" ref="accoutpassword" maxlength="6" :class="{'active':支付密码.length>=6}" v-model="支付密码" @input="输入支付密码()" pattern="\d*">
                <ul @click="获得焦点()">
                    <li>
                        <span v-show="支付密码.length>0"><i class="icon iconfont icon-xinghao"></i></span>
                    </li>
                    <li>
                        <span v-show="支付密码.length>1"><i class="icon iconfont icon-xinghao"></i></span>
                    </li>
                    <li>
                        <span v-show="支付密码.length>2"><i class="icon iconfont icon-xinghao"></i></span>
                    </li>
                    <li>
                        <span v-show="支付密码.length>3"><i class="icon iconfont icon-xinghao"></i></span>
                    </li>
                    <li>
                        <span v-show="支付密码.length>4"><i class="icon iconfont icon-xinghao"></i></span>
                    </li>
                    <li>
                        <span v-show="支付密码.length>5"><i class="icon iconfont icon-xinghao"></i></span>
                    </li>
                </ul>
                <div class="subsidy"></div>
            </div>
            <button @click="确定()" class="btn_2">确定</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      支付密码: ""
    };
  },
  computed: {
    ...mapGetters({
      mimajiaodian: "红购使者/红购使者/密码输入焦点"
    })
  },
  methods: {
    ...mapActions({
      设置密码输入框: "红购使者/红购使者/设置密码输入框",
      设置密码输入焦点: "红购使者/红购使者/设置密码输入焦点",
      设置姓名输入框: "红购使者/红购使者/设置姓名输入框",
      开始提现: "红购使者/提现/开始提现"
    }),
    输入支付密码() {
      if (this.支付密码.length > 6) {
        this.支付密码 = this.支付密码.substring(1);
      }
    },
    获得焦点() {
      this.$refs.accoutpassword.focus();
    },
    确定() {
      var password_test = /^\d{6}$/; //6位数字验证
      if (!password_test.test(this.支付密码)) {
        mui.toast("支付密码为6位数字。", { duration: 2000, type: "div" });
        return;
      }
      this.开始提现([this.支付密码]);
      // this.设置密码输入框(false);
      // this.设置姓名输入框(true);
    }
    // 开始提现(){

    // }
  },
  watch: {
    mimajiaodian(newobj) {
      if (newobj) {
        this.获得焦点();
      }
      console.log(newobj);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.密码输入框 {
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
      z-index: 1;
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
        position: fixed;
        left: -100%;
        padding: 0px;
        margin: 0px;
        height: 100%;
        letter-spacing: 34.5px;
        padding: 0px 0px 0px 17px;
        z-index: 1;
        border: none;
        background: none;
        width: 130%;
        opacity: 0;
      }
      > ul {
        z-index: 1;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        border-right: 1px solid #cccccc;
        text-align: center;
        line-height: 37px;
        font-size: 12px;
        li {
          border-left: 1px solid #cccccc;
          border-top: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          width: calc(100% / 6);
        }
      }
      .subsidy {
        position: absolute;
        background: #ffffff;
        width: 26px;
        height: 100%;
        top: 0px;
        right: -26px;
        z-index: 2;
      }
    }
    .btn_2 {
      width: 123px;
      height: 26px;
      color: rgba(255, 255, 255, 1);
      background-color: $header_background;
      font-size: 14px;
      border-radius: 26px;
      border: none;
      margin: 16px auto;
      display: block;
      padding: 0px;
    }
  }
}
</style>
