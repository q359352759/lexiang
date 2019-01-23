<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请成为红购使者</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="content">
                <p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;红购寓意：红色、喜庆、简单、快乐。</span></p><p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;红购：红包乐购，是一个同城在线购物平台，也是一个全城促销信息发布平台，是实体店商家的促销利器。</span></p><p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;红购把每一个实体店铺信息搬到网络平台上来，便于消费者随时随地的掌握店铺消费的促销动态，同时也是属于每个消费者的生活助手。</span></p><p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;使用红购平台，先领红包再去付款，让每笔消费都实惠。自用省钱、分享赚钱。通过红购平台你可以一目了然的掌握商家的诚信度以及消费环境，不用担心欺客、宰客，和所有不诚信的行为。</span></p><p><br/></p><p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;红购平台倡导：智慧生活，一手掌握、诚信经商，愉快消费。如果你认可红购平台并看好它，愿意成为红购平台的分享使者（简称：红购使者）。你将获得以下奖赏：</span></p><p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;1、将你的二维码分享给身边的人，注册成为会员领取50元平台红包，你将获得该会员消费金额的分润，累计10元现金。</span></p><p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;2、你所分享的会员再分享给他身边的人，你同样可获得他人消费金额的分润，累计10元现金。</span></p><p><span style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;3、将你的二维码分享给商家，开通数字店铺后你将获得1000~5000元现金的促销额分润。</span></p><p><br/></p>
            </div>
            <div class="按钮框">
                <btn  @click.native="$router.push('/shizhe/shenqing')" value="立即申请"/>
            </div>
        </div>
        <div class="加载中" v-show="loading">
            <div>{{提示语}}</div>
        </div>
    </div>
</template>

<script>
import btn from "@/components/button.vue";
import { mapActions } from "vuex";
export default {
  name: "",
  components: {
    btn
  },
  data() {
    return {
      提示语: "获取数据中",
      loading: true
    };
  },
  methods: {
    ...mapActions({
      获取代理人信息: "actions_agentUser"
    })
  },
  mounted() {
    this.获取代理人信息()
      .then(x => {
        console.log(x);
        if (x.data.code == 200) {
          if (x.data.data.type == 1) {
            this.$router.push("/Agent");
          } else {
            this.$router.push("/shizhe/honggoushizhe");
          }
        } else {
          this.loading = false;
        }
      })
      .catch(err => {
        this.提示语 = "网络错误，稍后再试。";
      });
  }
};
</script>

<style lang="scss" scoped>
.mui-content {
  background: #ffffff;
}
.content {
  padding: 10px;
  p {
    margin: 0px;
    color: #505050;
  }
}
.按钮框 {
  margin: 37px 0px 20px;
}
.加载中 {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
