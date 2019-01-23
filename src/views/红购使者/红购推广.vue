<template>
    <div class="推广">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">全民赚外快</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <img src="@/assets/image/honggou2.png" alt="" srcset="">
            </div>
            <div class="按钮框">
                <!-- <btn @click.native="$router.push('/shizhe/shenqingshuoming')" value="立即申请" :styles="{'background':'#f82528'}"/> -->
                <!-- <btn @click.native="跳转()" :value="text" :styles="{'background':'#f82528'}"/> -->
                <div @click="跳转()" class="按钮">{{text}}</div>
            </div>
            <div class="box_3">
                <img src="@/assets/image/honggou3.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import btn from "@/components/button.vue";
import { openloading } from "@/assets/js/currency.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "",
  components: {
    btn
  },
  data() {
    return {
      text: "去赚外快",
      获取成功: false
    };
  },
  computed: {
    ...mapGetters({
      代理人信息: "g_agentUser"
    })
  },
  methods: {
    ...mapActions({
      获取代理人信息: "actions_agentUser"
    }),
    跳转() {
      if (!this.获取成功) {
        mui.toast("网络错误稍后再试。", { duration: 2000, type: "div" });
      } else {
        if (!this.代理人信息) {
          this.$router.push("/shizhe/shenqingshuoming");
        } else {
          if (this.代理人信息.type == 1) {
            this.$router.push("/Agent");
          } else {
            this.$router.push("/shizhe/honggoushizhe");
          }
        }
      }
      console.log(this.代理人信息);
    }
  },
  mounted() {
    openloading(true);
    this.获取代理人信息()
      .then(x => {
        console.log(x);
        if (x.data.code == 200) {
          // this.text='立即赚外快';
          this.获取成功 = true;
        } else if (x.data.code == 400) {
          this.获取成功 = true;
        } else {
          this.获取成功 = false;
        }
        openloading(false);
      })
      .catch(err => {
        openloading(false);
        this.获取成功 = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.推广 {
  background-image: url(~@/assets/image/honggou1.jpg);
  height: 100%;
  background-size: 100% auto;
}
.mui-bar {
  background: none;
  box-shadow: none;
}
.mui-content {
  background: none;
}
.box_1 {
  width: 3.1rem;
  height: 3.8rem;
  overflow: hidden;
  margin: 14px auto 0px;
  img {
    width: 100%;
  }
  position: relative;
  z-index: 1;
}
.按钮框 {
  margin: 27px 0px 27px;
  position: relative;
  z-index: 1;
}
.按钮 {
  margin: 27px auto 27px;
  width: 150px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  border-radius: 34px;
  font-size: 14px;
  color: #ffffff;
  padding: 0px 0px 0px 6px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
  letter-spacing: 6px;
  // background: linear-gradient(to bottom, #E5B47E , #CF6F2E); /* 标准的语法 */
  background: linear-gradient(to bottom, #ff0000, #fb4848, #ff0000);
}
.box_3 {
  position: fixed;
  width: 100%;
  left: 0px;
  bottom: 0px;
  z-index: 0;
  font-size: 0px;
  img {
    width: 100%;
  }
}
</style>
