<template>
    <div>
        <!-- 商品 -->
            <ul class="优购列表">
                <li v-for="(item, index) in 优购.list" :key="index" @click="$router.push('/commodity/CommodityDetails?id='+item.id+'&isshop=1')">
                    <div>
                        <div class="img_box">
                            <img v-if="item.img" :src="item.img.split(',')[0]" alt="" srcset="">
                        </div>
                        <h1>
                            <div>
                                {{item.name}}
                            </div>
                            <div class="人气">
                                <i class="icon iconfont icon-huo"></i>
                                {{item.popularity}}
                            </div>
                        </h1>
                        <div class="text_1">
                            <div class="xiaoshou">
                                <span>销</span>
                                <span>{{item.sales}}笔</span>
                            </div>
                            <div class="dikou">
                                <i class="icon iconfont icon-hongbao1"></i>
                                <span>抵扣:{{item.deduction}}元</span>
                            </div>
                        </div>
                        <div class="text_2">
                            <div>
                                <span class="xianjia">￥{{item.sellingPrice}}</span>
                                <s class="yuanjia">{{item.marketPrice}}</s>
                            </div>
                            <div>
                                <span class="zhuanxiang mui-pull-right" v-if="item.EXTYPE==0">
                                    新人专享省{{Math.round((item.EXDEDUCTION)*100)/100}}元
                                </span>
                                <span class="zhuanxiang mui-pull-right" v-if="item.EXTYPE==1">
                                    生日专享省{{Math.round((item.EXDEDUCTION)*100)/100}}元
                                </span>
                            </div>                            
                        </div>
                    </div>
                </li>
            </ul>
        <loading :loadingtype="优购.loading" :nodata="!优购.loading && 优购.total==0" :end="!优购.loading && 优购.total!=0 && 优购.list.length==优购.total"/>
    </div>
</template>

<script>
import loading from "@/components/loading.vue";

import { mapGetters } from "vuex";

export default {
  name: "",
  components: {
    loading
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      优购: "home/优购/优购"
    })
  }
};
</script>

<style lang="scss" scoped>
.优购列表 {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 5px;
  > li {
    width: 50%;
    padding: 5px;
    > div {
      background: #ffffff;
    }
  }
  .img_box {
    width: 1.72rem;
    height: 1.29rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h1 {
    padding: 0px 0.06rem;
    color: rgba(80, 80, 80, 1);
    font-size: 0.12rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    > div:nth-child(1) {
      flex-grow: 1;
    }
    > div:nth-child(2) {
      color: rgba(128, 128, 128, 1);
      font-size: 10px;
      i {
        color: rgba(224, 28, 4, 1);
      }
    }
  }
  .text_1 {
    display: flex;
    justify-content: space-between;
    padding: 0px 0.06rem;
    .xiaoshou {
      > span:nth-child(1) {
        margin: 0px 3px 0px 0px;
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        font-size: 0.08rem;
        line-height: 0.12rem;
        text-align: center;
        border-radius: 100%;
        background: #ff5733;
        color: #ffffff;
      }
      > span:nth-child(2) {
        color: rgba(166, 166, 166, 1);
        font-size: 0.1rem;
      }
    }
    .dikou {
      i {
        color: #fc4c4c;
        font-size: 0.1rem;
      }
      span {
        margin: 0px 0px 0px 3px;
        font-size: 0.1rem;
        color: #fc4c4c;
      }
    }
  }
  .text_2 {
    padding: 0px 0.06rem 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:nth-child(1) {
      display: flex;
      align-items: flex-end;
    }
    .xianjia {
      color: #d43030;
      font-size: 0.12rem;
      font-weight: bold;
    }
    .yuanjia {
      font-size: 0.1rem;
      color: #a6a6a6;
      margin: 0px 0px 0px 0.05rem;
    }
    .zhuanxiang {
      border: 1px solid #e33c64;
      font-size: 8px;
      height: 13px;
      color: #e33c64;
      line-height: 11px;
      padding: 0px 2px;
      border-radius: 2px;
    }
  }
}
</style>
