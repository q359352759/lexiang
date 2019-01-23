<template>
    <div id="LoginPassword">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">修改登录密码</h1>
        </header>
        <div class="mui-content">
            <form class="box_1" @submit.prevent="submit()">
                <ul>
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input type="text" v-model="code" required placeholder="验证码">
                        <span @tap='get_codes()' class="Verification">{{time==0 ? '获取验证码' : time+'s'}}</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input v-model="password" type="password" required placeholder="新密码">
                        <span v-if="password==''" class="tishi">（6-16位数字字母组成）</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-san"></i>
                        <input v-model="password1" type="password" required placeholder="确认密码">
                    </li>
                </ul>
                <button class="btn_1" type="submit">确定</button>
            </form>
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";
export default {
  name: "LoginPassword",
  components: {},
  data() {
    return {
      time: 0,
      code: "", //验证码
      key: "", //获取手机验证码的返回值
      password: "",
      password1: "",
      userInfo: ""
    };
  },
  methods: {
    //获取手机验证码
    get_codes() {
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
          localStorage.keys = x.data.key;
          // this.key = x.data.key;
        })
        .catch(err => {
          console.log(err);
          mui.toast("获取验证码失败。", { duration: 2000, type: "div" });
        });
    },
    //提交修改
    submit() {
      if (this.password != this.password1) {
        //alert('两次密码不一致');
        mui.alert("两次密码不一致", "提示");
        return;
      }
      openloading(true);
      //注册
      this.$axios({
        method: "put",
        url: "/api-u/users/" + this.userInfo.id + "/password",
        data: {
          password: this.password,
          phone: this.userInfo.phone,
          key: localStorage.keys,
          code: this.code
        },
        params: {
          password: this.password,
          phone: this.userInfo.phone,
          key: localStorage.keys,
          code: this.code
        }
      })
        .then(x => {
          console.log(x);
          openloading(false);
          if (x.data.code == 200) {
            mui.toast("修改成功", { duration: 2000, type: "div" });
          } else {
            mui.alert(
              x.data.msg ? x.data.msg : x.data.messag,
              "提示",
              "我知道了",
              function() {},
              "div"
            );
          }
        })
        .catch(err => {
          console.log(err);
          mui.toast("系统错误，请稍后再试。", { duration: 2000, type: "div" });
          openloading(false);
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
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    } catch (error) {}
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
#LoginPassword {
  height: 100%;
  .mui-content {
    height: 100%;
    background: #ffffff;
  }
}
#LoginPassword .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#LoginPassword .mui-title {
  color: #ffffff;
}
#LoginPassword .swiper-pagination-bullet-active {
  background: $header_background;
}

#LoginPassword .box_1 {
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
