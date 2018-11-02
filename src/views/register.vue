<template>
    <div id="register">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{this.$store.state.isweixin ? '' : '注册'}}</h1>
        </header>
        <div class="mui-content">
            <form class="box_1" @submit.prevent="submit()">
                <ul>
                    <li>
                        <i class="icon iconfont icon-shouji"></i>
                        <input type="text" v-model="phone" required placeholder="手机号码" required pattern="^1\d{10}$">
                    </li>
                    <li>
                        <i class="icon iconfont icon-suo"></i>
                        <input type="text" v-model="code" required placeholder="验证码" required />
                        <span @click="get_codes()" class="Verification">{{time==0 ? '获取验证码' : time+'s'}}</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-suo"></i>
                        <input type="password" v-model="password" required placeholder="登录密码" required>
                        <span v-if="password==''" class="tishi">（6-16位数字字母组成）</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-suo"></i>
                        <input type="password" v-model="password1" required placeholder="确认密码" required>
                    </li>
                </ul>
                <div class="Agreement">
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span @click="change_radio_2()"> 我也阅读并同意</span>
                    <span @click="RegistrationAgreement()">《用户注册协议》</span>
                </div>
                <button class="btn_1" type="submit">立即注册</button>
            </form>
        </div>
        <circularNav />
    </div>
</template>

<script>
import circularNav from "@/components/circularNav.vue";
export default {
  name: "register",
  components: {
    circularNav
  },
  data() {
    return {
      time: 0,
      phone: "", //手机号码  //18583034205   18227754002
      code: "", //验证码
      key: "", //获取手机验证码的返回值
      password: "",
      password1: "",
      radio_type_2: true //协议
    };
  },
  methods: {
    //获取手机验证码
    get_codes() {
      var phone_test = /^1\d{10}$/;
      if (this.time != 0) {
        return;
      } else if (this.phone == "" || !phone_test.test(this.phone)) {
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
        url: "/api-n/notification-anon/codes?phone=" + this.phone
      })
        .then(x => {
          console.log(x);
          this.key = x.data.key;
        })
        .catch(err => {
          console.log(err);
          mui.toast(data.message, { duration: 2000, type: "div" });
        });
    },
    //用户注册协议
    RegistrationAgreement() {
      this.$router.push("/RegistrationAgreement");
    },
    //同意协议
    change_radio_2(x) {
      this.radio_type_2 = !this.radio_type_2;
    },

    submit() {
      console.log("注册开始");
      if (!this.radio_type_2) {
        mui.alert("请同意用户注册协议。", "提示");
        return;
      }
      if (this.password != this.password1) {
        //alert('两次密码不一致');
        mui.alert("两次密码不一致", "提示");
        return;
      }
      this.register();
      return;
      //验证验证码
      // this.$axios({
      //     method:'post',
      //     // url:"/api-u/users/binding-phone?phone="+this.phone+"&code="+this.code+'&key='+this.key,
      //     url:"/api-u/users/binding-phone",
      //     data:this.$qs.stringify({
      //         phone:this.phone,
      //         code:this.code,
      //         key:this.key
      //     })
      // }).then(x=>{
      //     console.log(x)
      //     if(!x.data.code || x.data.code!=200){
      //         mui.toast(x.data.message, { duration: 2000, type: "div" });
      //     }else{
      //         this.register()
      //     }
      // }).catch(err=>{
      //     console.log(err);
      //     mui.toast("验证码错误", { duration: 2000, type: "div" });
      // })
    },
    register() {
      //注册
      this.$axios({
        method: "post",
        url:
          "/api-u/users-anon/register?phone=" +
          this.phone +
          "&key=" +
          this.key +
          "&code=" +
          this.code,
        // url:"/api-u/users-anon/register",
        data: {
          username: this.phone,
          password: this.password,
          phone: this.phone
        }
      })
        .then(x => {
          console.log(x);
          if (x.data.code == 200) {
            mui.toast("注册成功", { duration: 2000, type: "div" });
            this.$router.push("/login");
          } else if (x.data.code == 400) {
            mui.toast("验证码错误", { duration: 2000, type: "div" });
          } else {
            mui.toast(x.data.message, { duration: 2000, type: "div" });
          }
        })
        .catch(err => {
          console.log(err);
          mui.toast("系统错误，请稍后再试。", { duration: 2000, type: "div" });
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
      document.getElementsByTagName("title")[0].innerText = "注册";
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
#register {
  height: 100%;
  .mui-content {
    height: 100%;
    background: #ffffff;
  }
}
#register .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#register .mui-title {
  color: #ffffff;
}
#register .swiper-pagination-bullet-active {
  background: $header_background;
}

#register .box_1 {
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
}

// 单选
#register .radio_1 {
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
#register .radio_1.active {
  background: rgba(58, 182, 237, 1);
  border: 2px solid rgba(58, 182, 237, 1);
  color: #ffffff;
  i {
    display: inline-block;
  }
}
</style>
