<template>
    <div id="PaymentPassword">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">修改支付密码</h1>
        </header>
        <div class="mui-content">
            <form class="box_1" @submit.prevent="from()">
                <ul>
                    <!-- <li>
                        <i class="icon iconfont icon-tel"></i>
                        <input type="text" required placeholder="手机号码">
                    </li> -->
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input type="text" v-model="code" required placeholder="验证码">
                        <span @click="Verification()" class="Verification">{{time==0 ? '获取验证码' : time+'s'}} </span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input type="password" v-model="payPassword" required placeholder="请输入6位数字">
                        <!-- <span class="tishi">（6-16位数字字母组成）</span> -->
                    </li>
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input type="password" v-model="payPassword1" required placeholder="确认密码">
                    </li>
                </ul>
                <button class="btn_1" type="submit">提交</button>
            </form>
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";
export default {
  name: "PaymentPassword",
  components: {},
  data() {
    return {
      time: 0,
      userInfo: "",
      payPassword: "",
      payPassword1: "",
      key: "", //短信key
      code: ""
    };
  },
  methods: {
    from() {
      var password_test = /^\d{6}$/; //6位数字验证
      if (!password_test.test(this.payPassword)) {
        mui.toast("密码为6位数字组成！", {
          duration: 2000,
          type: "div"
        });
        return;
      } else if (this.payPassword != this.payPassword1) {
        mui.toast("两次密码不一致！", { duration: 2000, type: "div" });
        return;
      } else {
        openloading(true);
        var obj = {
          id: this.userInfo.id,
          payPassword: this.payPassword,
          phone: this.userInfo.phone,
          key: this.key,
          code: this.code
        };
        this.$axios({
          method: "put",
          url: "/api-u/users/" + this.userInfo.id + "/payPassword",
          // data:obj,
          params: obj
        })
          .then(x => {
            console.log(x);
            if (x.data.code == 400) {
              mui.toast("验证码错误", { duration: 2000, type: "div" });
            } else if (x.data.code == 200) {
              mui.toast("密码设置成功！", { duration: 2000, type: "div" });
            } else {
              mui.alert(
                x.data.msg ? x.data.msg : x.data.messag,
                "提示",
                "我知道了",
                function() {},
                "div"
              );
            }
            openloading(false);
          })
          .catch(err => {
            console.log(err);
            openloading(false);
            mui.toast("系统错误。", {
              duration: 2000,
              type: "div"
            });
          });
      }
    },
    //获取验证码
    Verification() {
      if (this.time != 0) {
        return;
      }
      var this_1 = this;
      this.time = 60;
      var time = setInterval(function() {
        this_1.time--;
        if (this_1.time == 0) {
          clearInterval(time);
        }
      }, 1000);
      this.$axios({
        method: "post",
        url: "/api-n/notification-anon/codes?phone=" + this.userInfo.phone
      })
        .then(x => {
          console.log(x);
          if (x.data.key) {
            mui.toast(
              "验证码已发送至" + this.userInfo.phone + ",请注意查收。",
              { duration: 2000, type: "div" }
            );
            this.key = x.data.key;
          }
          // this.key = x.data.key;
        })
        .catch(err => {
          console.log(err);
          mui.toast("系统错误，请稍后再试", {
            duration: 2000,
            type: "div"
          });
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
    if (
      localStorage.userInfo &&
      localStorage.userInfo != "" &&
      localStorage.userInfo != null &&
      localStorage.userInfo != undefined &&
      localStorage.userInfo != "undefined"
    ) {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }
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
#PaymentPassword {
  height: 100%;
  .mui-content {
    height: 100%;
    background: #ffffff;
  }
}
#PaymentPassword .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#PaymentPassword .mui-title {
  color: #ffffff;
}
#PaymentPassword .swiper-pagination-bullet-active {
  background: $header_background;
}

#PaymentPassword .box_1 {
  width: 2.9rem;
  display: block;
  margin: 0.6rem auto 0px;
  white-space: nowrap;
  > ul {
    > li {
      display: flex;
      align-items: flex-end;
      margin: 0px 0px 0.35rem 0px;
      border-bottom: 1px solid rgba(164, 164, 164, 1);
      position: relative;
      .tishi {
        position: absolute;
        left: 1rem;
        bottom: 0px;
        font-size: 12px;
        color: #ababab;
      }
      input {
        margin: 0px;
        padding: 0px 0.1rem 0px;
        height: auto;
        background: none;
        border: none;
        opacity: 0.7;
        position: relative;
        z-index: 1;
      }
      i {
        color: #ababab;
        // opacity: 0.7;
      }
    }
  }
  .Verification {
    color: $header_background;
  }
  .btn_1 {
    width: 2.5rem;
    display: block;
    margin: 0px auto;
    height: 35px;
    background: $header_background;
    border: none;
    border-radius: 35px;
    color: #ffffff;
  }
}
</style>
