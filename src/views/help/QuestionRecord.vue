<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                提问记录
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <!-- <li class="right_1">
                    <div class="time_1">2018.11.12 20:52:22</div>
                    <div class="cont_1">
                        <div class="text_1">
                            <div>怎么提现到微信</div>
                            <div>为什么只有提现到支付宝，没有微信</div>
                        </div>
                        <div class="Head_portrait">
                            <img src="image/kaifazhong.png" alt="" srcset="">
                        </div>
                    </div>
                </li>
                <li class="left_1">
                    <div class="time_1">2018.11.12 20:52:22</div>
                    <div class="cont_1">
                        <div class="Head_portrait">
                            <img src="image/961.png" alt="" srcset="">
                        </div>
                        <div class="text_1">
                            <div>您好，该功能目前正在开发中，预计12月25日左右上线，给您改带来不便敬请谅解。</div>
                        </div>
                    </div>
                </li> -->
            </ul>
            <loading :nodata="true"/>
        </div>
    </div>
</template>

<script>
import loading from "@/components/loading.vue";
export default {
  name: "",
  components: {
    loading
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1 {
  padding: 11px;
  li {
    margin: 10px 0px 0px;
  }
  .time_1 {
    color: rgba(166, 166, 166, 1);
    font-size: 14px;
    text-align: center;
    padding: 5px 0px;
  }
  .cont_1 {
    display: flex;
    .Head_portrait {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .text_1 {
      background: $header_background;
      color: #ffffff;
      padding: 6px 10px;
      font-size: 14px;
      border-radius: 5px;
      position: relative;
    }
    .text_1::after {
      position: absolute;
      width: 10px;
      height: 10px;
      content: "";
      background: $header_background;
      top: 15px;
      transform: rotate(45deg);
    }
  }

  .right_1 {
    .cont_1 {
      padding: 0px 0px 0px 55px;
    }
    .text_1 {
      margin: 0px 13px 0px 0px;
    }
    .text_1::after {
      right: -5px;
    }
  }
  .left_1 {
    .cont_1 {
      padding: 0px 55px 0px 0px;
    }
    .text_1 {
      margin: 0px 0px 0px 13px;
    }
    .text_1::after {
      left: -5px;
    }
  }
}
</style>
