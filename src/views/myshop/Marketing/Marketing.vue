<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">营销</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li @tap="RedEnvelopes()">
                    <div class="img_box">
                        <img src="image/hongbao_1.png" alt="">
                    </div>
                    <div class="text">红包促销</div>
                    <div class="text">共发放：-0元</div>
                    <div class="text">促销额：-0元</div>
                </li>
                <li @tap="MarketingVip()">
                    <div class="img_box">
                        <img src="image/huangguan.png" alt="">
                    </div>
                    <div class="text">专享营销</div>
                    <div  class="text">共{{专享列表.total ? 专享列表.total : 0}}款商品</div>
                    <div  class="text">已拓客：0人</div>
                </li>
                <li>
                    <div class="img_box">
                        <img src="image/qunfa.png" alt="">
                    </div>
                    <div  class="text">群发消息</div>
                    <div  class="text">共发送：-0条</div>
                    <div  class="text">已查阅：-0条</div>
                </li>
            </ul>

            <ul class="box_2">
                <!-- <li>
                    <div class="img_box">
                        <img src="image/hongbao_1.png" alt="">
                    </div>
                    <div class="cont_1">
                        <div class="title_1">3周年庆典，50元大红包免费领取，人人有份。</div>
                        <div class="text_1">
                            <span class="mui-pull-right">2018.11.14</span>
                            <span>发放：0个</span>
                            <span>领取：0个</span>
                        </div>
                    </div>
                    <div class="right_1"><i class="mui-icon mui-icon-forward"></i></div>
                </li>
                <li>
                    <div class="img_box">
                        <img src="image/qunfa.png" alt="">
                    </div>
                    <div class="cont_1">
                        <div class="title_1">3周年庆典，50元大红包免费领取，人人有份。</div>
                        <div class="text_1">
                            <span class="mui-pull-right">2018.11.14</span>
                            <span>发放：0个</span>
                            <span>领取：0个</span>
                        </div>
                    </div>
                    <div class="right_1"><i class="mui-icon mui-icon-forward"></i></div>
                </li> -->
                <loading :nodata="true"/>
            </ul>
        </div>
    </div>
</template>

<script>
import loading from "@/components/loading.vue";
import { openloading } from "@/assets/js/currency.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "",
  components: {
    loading
  },
  data() {
    return {
      专享列表: {}
    };
  },
  computed: {
    ...mapGetters({
      我的店铺: "get_myshop"
    })
  },
  methods: {
    ...mapActions({
      查询我的店铺: "getMyshop",
      查询店铺专享: "shangPing/查询店铺专享"
    }),
    //跳转红包界面
    RedEnvelopes() {
      this.$router.push("/RedEnvelopes");
    },
    //跳转专享营销
    MarketingVip() {
      this.$router.push("/MarketingVip");
    },
    async 店铺初始化() {
      await this.查询我的店铺();
      this.查询店铺专享(this.我的店铺.shopid).then(x => {
        if (x.data.code == 200) {
          this.专享列表 = x.data.data;
        }
      });
    }
  },
  mounted() {
    if (this.我的店铺 && this.我的店铺.shopid) {
      console.log(this.我的店铺);
      this.查询店铺专享(this.我的店铺.shopid)
        .then(x => {
          if (x.data.code == 200) {
            this.专享列表 = x.data.data;
          }
        })
        .catch(err => {});
    } else {
      this.店铺初始化();
    }
  }
};
</script>

<style lang="scss" scoped>
.box_1 {
  padding: 12px 0px 12px 0px;
  display: flex;
  background: #ffffff;
  display: flex;
  color: rgba(80, 80, 80, 1);
  font-size: 12px;
  > li {
    width: calc(100% / 3);
    text-align: center;
    position: relative;
  }
  > li::after {
    position: absolute;
    width: 1px;
    height: 60px;
    top: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(229, 229, 229, 1);
    content: "";
    margin: auto;
  }
  > li:nth-child(1)::after {
    display: none;
  }
  .img_box {
    height: 32px;
    img {
      height: 32px;
      width: 32px;
    }
  }
  .text {
    margin: 3px 0px 0px 0px;
  }
}
.box_2 {
  margin: 3px 0px 0px;
  > li {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #f6f6f6;
    padding: 11px;
    .img_box {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      margin: 0px 12px 0px 0px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .cont_1 {
      flex-grow: 1;
      width: 0;
      .title_1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
      }
      .text_1 {
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
      }
    }
    .right_1 {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      color: #c0bcbc;
    }
  }
}
</style>
