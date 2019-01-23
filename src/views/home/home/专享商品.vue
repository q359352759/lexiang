<template>
    <div>
        <ul class="专享">
            <li v-for="(item, index) in 专享.list" :key="index" @tap="$router.push('/commodity/CommodityDetails?id='+item.comId+'&isshop=1')">
                <div class="img_box">
                    <img v-if="item.comImg.split(',').length>0" :src="item.comImg.split(',')[0]" alt="" srcset="">
                </div>
                <div class="text_box">
                    <div>
                        <div class="title_1">{{item.comName}}</div>
                        <div class="money">
                            <span>￥{{item.comSellingPrice}}</span>
                            <s>{{item.comMarketPrice}}</s>
                        </div>
                    </div>
                    <div class="dikou">
                        <i class="icon iconfont icon-hongbao1"></i>
                        <span>抵扣：{{item.comDeduction}}元</span>
                    </div>
                </div>
                <div class="fengexian"></div>
                <div class="zhuanxiang">
                    <img v-if="item.type==0" src="image/xingren.png" alt="">
                    <img v-if="item.type==1" src="image/shengri1.png" alt="">
                    <div>
                        <i class="icon iconfont icon-shengji"></i>
                        <span>
                            {{item.deduction}}元
                        </span>
                    </div>
                </div>
                <!-- <div class="红包抵扣" v-if="index==2">
                    <div class="红包">
                        <hongbao money="99999"/>
                    </div>
                    <div class="文字">老顾客专享</div>
                </div> -->
            </li>
        </ul>
        <loading :loadingtype="专享.loading" :nodata="!专享.loading && 专享.total==0" :end="!专享.loading && 专享.total!=0 && 专享.total==专享.list.length"/>
    </div>
</template>

<script>
import hongbao from "@/components/hongbao.vue";
import loading from "@/components/loading.vue";
import { mapGetters } from "vuex";
export default {
  name: "",
  components: {
    hongbao,
    loading
  },
  computed: {
    ...mapGetters({
      专享: "home/专享"
    })
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.专享 {
  padding: 5px 5px;
  > li {
    overflow: hidden;
    background: #ffffff;
    padding: 5px 0px 5px 5px;
    margin: 0px 0px 5px 0px;
    display: flex;
    .img_box {
      width: 96px;
      height: 72px;
      flex-shrink: 0;
      margin: 0px 5px 0px 0px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text_box {
      flex-grow: 1;
      width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title_1 {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        padding: 0px 5px 0px 0px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .money {
        span {
          color: rgba(212, 48, 48, 1);
          font-size: 14px;
        }
        s {
          color: rgba(166, 166, 166, 1);
          font-size: 10px;
        }
      }
      .dikou {
        display: flex;
        align-items: center;
        i {
          color: rgba(224, 28, 4, 1);
          height: 17px;
          margin: 0px 3px 0px 0px;
        }
        span {
          color: rgba(128, 128, 128, 1);
          font-size: 12px;
        }
      }
    }
    .fengexian {
      width: 1px;
      flex-shrink: 0;
      position: relative;
      border-left: 1px dashed #ff5733;
    }
    .fengexian::after,
    .fengexian::before {
      position: absolute;
      width: 17px;
      height: 17px;
      background: #efeff4;
      border-radius: 100%;
      left: -9px;
      content: "";
    }
    .fengexian::after {
      top: -13px;
    }
    .fengexian::before {
      bottom: -13px;
    }
    .zhuanxiang {
      width: 104px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 40px;
        height: 40px;
        margin: 0px 0px 4px 0px;
      }
      > div {
        display: flex;
        justify-content: center;
        color: rgba(212, 48, 48, 1);
        i {
          font-size: 16px;
        }
        span {
          font-size: 14px;
        }
      }
    }
    .红包抵扣 {
      width: 104px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .红包 {
        width: 45px;
        height: 53px;
        margin: 0px auto;
      }
      > .文字 {
        color: rgba(212, 48, 48, 1);
        font-size: 10px;
        text-align: center;
      }
    }
  }
}
</style>
