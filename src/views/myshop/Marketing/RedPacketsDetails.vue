<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <!-- 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                <span v-if="type==0">店铺新人红包详情</span>
                <span v-if="type==1">商品红包详情</span>
                <span v-if="type==2">节日红包详情</span>
                <span v-if="type==3">签到红包详情</span>
                <span v-if="type==4">庆典红包详情</span>
                <span v-if="type==5">生日红包详情</span>
            </h1>
            <span class="header_1" @tap="fenxiang()" v-if="!shixiao">
                <i class="icon iconfont icon-fenxiang2"></i> 
            </span>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div>
                    <div class="img_box">
                        <img src="image/redpackage.png" alt="">
                        <span v-if="type!=3">{{Red_envelopes.amount}}</span>
                        <!-- <span v-if="type==3">递增</span> -->
                        <div v-if="type==3" class="qianDaoHongBao">
                            <div>{{Red_envelopes.startAmount}}</div>
                            <div>+</div>
                            <div>{{Red_envelopes.progressivelyAmount}}</div>
                        </div>
                    </div>
                    <!-- 店铺新人 和生日 红包详情 -->
                    <ul v-if="type==0 || type==5">
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">发放日期：{{Red_envelopes.createTime | filter_time}}</div>
                                <div>已领取：{{Red_envelopes.quantity ? Red_envelopes.quantity : 0}}个</div>
                            </div>
                            <div>
                                <!-- <div class="text_1 mui-pull-right">有效期：{{Red_envelopes.startTime | filter_time}}-{{Red_envelopes.endTime | filter_time}}</div> -->
                                <div>已使用：0个</div>
                            </div>
                        </li>
                        <li>
                            <span v-if="Red_envelopes.deductionType==0" class="mui-pull-right">可抵扣{{Red_envelopes.percentage}}%</span>
                            <span v-if="Red_envelopes.deductionType==1" class="mui-pull-right">每满{{Red_envelopes.expire}}元，抵扣{{Red_envelopes.deduction}}元</span>
                            <span class="cuxiao">促销额：0元</span>
                        </li>
                    </ul>
                    <!-- 商品红包详情 -->
                    <ul v-if="type==1">
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">发放日期：{{Red_envelopes.createTime | filter_time}}</div>
                                <div>共发放：{{Red_envelopes.quantityMax}}个</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">有效期：{{Red_envelopes.startTime | filter_time}}-{{Red_envelopes.endTime | filter_time}}</div>
                                <div>已领取：{{Red_envelopes.quantity}}个</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <!-- <div class="text_1 mui-pull-right">每满0元，抵扣0元</div> -->
                                <div>已使用：-0个</div>
                            </div>
                        </li>
                        <li>
                            <span class="cuxiao mui-pull-right">促销额：-0元</span>
                            <div>
                                商品：
                                <span class="name_1">{{commodity.name}}</span>
                            </div>
                        </li>
                    </ul>
                    <!-- 庆典 和 节日红包详情 -->
                    <ul v-if="type==4 || type==2">
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">发放日期：{{Red_envelopes.createTime | filter_time}}</div>
                                <div>共发放：{{Red_envelopes.quantityMax}}个</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">有效期：{{Red_envelopes.startTime | filter_time}}-{{Red_envelopes.endTime | filter_time}}</div>
                                <div>已领取：{{Red_envelopes.quantity}}个</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div>已使用：0个</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">
                                    <span v-if="Red_envelopes.deductionType==0">可抵扣{{Red_envelopes.percentage}}%</span>
                                    <span v-if="Red_envelopes.deductionType==1">每满{{Red_envelopes.expire}}元，抵扣{{Red_envelopes.deduction}}元</span>
                                </div>                                
                                <div class="cuxiao">促销额：-0元</div>
                            </div>
                        </li>
                    </ul>
                    <!-- 签到红包详情 -->
                    <ul v-if="type==3">
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">发放日期：{{Red_envelopes.createTime | filter_time}}</div>
                                <div>已签到：{{Red_envelopes.quantity}}人</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div class="text_1 mui-pull-right">签到日期：{{Red_envelopes.signInStartTime | filter_time}}-{{Red_envelopes.signInEndTime | filter_time}}</div>
                                <div>已使用：0人</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div class="text_1 mui-text-right">有效期：{{Red_envelopes.startTime | filter_time}}-{{Red_envelopes.endTime | filter_time}}</div>
                                <div></div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span v-if="Red_envelopes.deductionType==0" class="mui-pull-right">可抵扣{{Red_envelopes.percentage}}%</span>
                                <span v-if="Red_envelopes.deductionType==1" class="mui-pull-right">每满{{Red_envelopes.expire}}元，抵扣{{Red_envelopes.deduction}}元</span>
                                <div class="cuxiao">促销额：0元</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <ul class="box_2">
                <li class="title">
                    <div><span>会员</span></div>
                    <div><span>领取时间</span></div>
                    <div><span>使用时间</span></div>
                    <div><span>消费金额</span></div>
                </li>
                <li v-for="(item, index) in 0" :key="index">
                    <div><span>名字</span></div>
                    <div><span>2018.00.00</span></div>
                    <div><span>2018.11.15</span></div>
                    <div><span>￥0.00</span></div>
                </li>
            </ul>
            <loading :nodata="true"/>        

            <div @click="RedEnvelopeIssue()" v-if="type==0 || type==5" class="btn_1">修改红包内容</div>
            <div @click="RedEnvelopeIssue()" v-if="type==1" class="btn_1">发布红包</div>            
        </div>

        <hongbaoerwima :RongqiShow="RongqiShow" :hongbao="this.Red_envelopes"/>

    </div>
</template>

<script>
import loading from "@/components/loading.vue";

import { openloading, dateFtt } from "@/assets/js/currency";

import hongbaoerwima from "@/components/myshop/hongbao/hongbaoerwima.vue";
export default {
  name: "",
  components: {
    loading,
    hongbaoerwima
  },
  data() {
    return {
      RongqiShow: false,
      shixiao: "", //是否失效
      type: "", //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
      id: "",
      Red_envelopes: {
        //红包详情
      },
      commodity: {} //商品详情 用于查询商品红包
    };
  },
  filters: {
    filter_time(time) {
      if (!time) return "";
      return dateFtt(time, "yyyy.MM.dd");
    }
  },
  methods: {
    //分享
    fenxiang() {
      this.RongqiShow = !this.RongqiShow;
    },
    //跳转修改红包页面
    RedEnvelopeIssue() {
      if (this.type == 1) {
        this.$router.push("/RedEnvelopeIssue?type=" + this.type);
      } else {
        this.$router.push(
          "/RedEnvelopeIssue?id=" + this.id + "&url_type=" + this.type
        );
      }
    },
    //根据Id查询红包
    get_redenvelope_id() {
      this.$axios({
        method: "get",
        url: "/api-s/shops/redenvelope/findById/" + this.id
      })
        .then(x => {
          console.log(x);
          if (x.data.code == 200) {
            var data = x.data.data;
            this.Red_envelopes = data;
            if (data.type == 1) {
              this.get_commodity(data.commodityId);
            }
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
          mui.toast("系统错误，稍后再试。", { duration: 2000, type: "div" });
        });
    },
    //根据Id查询商品
    get_commodity(x) {
      this.$axios({
        method: "get",
        url: "/api-s/shops/commodity/findById/" + x
      })
        .then(x => {
          console.log("查询商品", x);
          if (x.data.code == 200) {
            this.commodity = x.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    //
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    this.id = this.$route.query.id;
    this.shixiao = this.$route.query.shixiao ? this.$route.query.shixiao : "";
    //根据Id查询红包
    this.get_redenvelope_id();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-bar .header_1 {
  position: absolute;
  top: 0px;
  right: 10px;
  color: #ffffff;
  line-height: 44px;
}

.box_1 {
  // padding: 10px 12px;
  padding: 7px 0px;
  > div {
    background: #ffffff;
    display: flex;
    padding: 6px 10px;
    .img_box {
      width: 53px;
      flex-shrink: 0;
      margin: 0px 5px 0px 0px;
      position: relative;
      img {
        width: 100%;
      }
      span {
        position: absolute;
        width: 100%;
        left: 0px;
        top: 30px;
        text-align: center;
        color: #ffffff;
      }
      .qianDaoHongBao {
        position: absolute;
        width: 100%;
        left: 0px;
        top: 22px;
        text-align: center;
        color: #ffffff;
        font-size: 10px;
        > div:nth-child(2) {
          line-height: 10px;
        }
      }
    }
    > ul {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: rgba(80, 80, 80, 1);
      font-size: 10px;
      .text_1 {
        color: rgba(166, 166, 166, 1);
      }
      .cuxiao {
        color: rgba(212, 48, 48, 1);
      }
      .name_1 {
        color: #007aff;
      }
    }
  }
}
.box_2 {
  li {
    display: flex;
    font-size: 14px;
    > div {
      width: 25%;
      min-height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #f6f6f6;
    }
    > div:nth-child(1) {
      border-left: none;
    }
  }
  > li:nth-child(2n-1):not(.title) {
    background: #ffffff;
  }
  .title {
    background: $header_background;
    color: #ffffff;
  }
}

.btn_1 {
  background: $header_background;
  color: #ffffff;
  height: 40px;
  width: 100%;
  line-height: 40px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  font-size: 14px;
  text-align: center;
}
</style>
