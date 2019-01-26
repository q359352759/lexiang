<template>
    <div>
        <ul class="shangpng" v-for="(item, index) in new_shangping_list" :key="index">
            <li>
                <div class="img_box">
                    <img v-if="item.img && item.img.split(',').length>0" :src="item.img.split(',')[0]" alt="" srcset="">
                </div>
                <div class="text_box">
                    <div class="name">
                        {{item.name}}
                        <span class="shuliang mui-pull-right">x{{item.number}}</span>
                    </div>
                    <div>￥{{item.sellingPrice}}</div>
                    <div>红包抵扣：{{item.deduction}}元</div>
                </div>
                <div class="zhuanxiang">
                    <img v-if="item.exclusive==1" src="image/xingren.png" alt="" srcset="">
                    <img v-if="item.exclusive==2" src="image/shengri1.png" alt="" srcset="">
                </div>
                <div class="dikou"></div>
            </li>
            <li class="dikou" v-if="item.filter_hongbao.length>0">
                红包抵扣：
                <span v-for="(item_1, index) in item.filter_hongbao" :key="index">
                    <!-- 查询该类型的红包 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                    <span v-if="item_1.envelopeType==0">新人红包-{{item_1.money}}元{{index!=item.filter_hongbao.length-1 ? '、' :''}}</span>
                    <span v-if="item_1.envelopeType==1">商品红包-{{item_1.money}}元{{index!=item.filter_hongbao.length-1 ? '、' :''}}</span>
                    <span v-if="item_1.envelopeType==2">节日红包-{{item_1.money}}元{{index!=item.filter_hongbao.length-1 ? '、' :''}}</span>
                    <span v-if="item_1.envelopeType==3">签到红包-{{item_1.money}}元{{index!=item.filter_hongbao.length-1 ? '、' :''}}</span>
                    <span v-if="item_1.envelopeType==4">庆典红包-{{item_1.money}}元{{index!=item.filter_hongbao.length-1 ? '、' :''}}</span>
                    <span v-if="item_1.envelopeType==5">生日红包-{{item_1.money}}元{{index!=item.filter_hongbao.length-1 ? '、' :''}}</span>
                    <span v-if="item_1.envelopeType==8">平台红包-{{item_1.money}}元{{index!=item.filter_hongbao.length-1 ? '、' :''}}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      new_shangping_list: "orders/order/new_shangping_list" //过滤后的商品
    })
  }
};
</script>

<style lang="scss" scoped>
.shangpng {
  background: #ffffff;
  padding: 0px 10px;
  color: rgba(80, 80, 80, 1);
  li {
    border-bottom: 1px solid rgba(246, 246, 246, 1);
    padding: 7px 0px;
    display: flex;
    font-size: 12px;
    position: relative;
  }
  > li:last-child {
    border: none;
  }
  .img_box {
    flex-shrink: 0;
    width: 72px;
    height: 54px;
    margin: 0px 5px 0px 0px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text_box {
    flex-grow: 1;
    .shuliang {
      color: #a6a6a6;
    }
  }
  .zhuanxiang {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    bottom: 7px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.dikou {
  color: #a6a6a6;
}
</style>
