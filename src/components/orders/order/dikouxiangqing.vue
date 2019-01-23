<template>
    <!-- 选择的商品详情 -->
    <div class="box_3" v-show="dikouxiangqing_show">
        <div class="content_1">
            <div @click="get_dikouxiangqing_show(false)" class="close_1"><i class="icon iconfont icon-quxiao"></i></div>
            <div class="cont_1">
                <div class="list">
                    <ul v-for="(item, index) in shangpin_dikou_list.shangpin_dikou_list" :key="index">
                        <li>
                            <div>{{item.name}}</div>
                            <div class="mui-text-center"></div>
                            <div class="mui-text-right">商品红包x{{item.number}}</div>
                        </li>
                        <li>
                            <div>
                                <span class="money_1">￥{{item.sellingPrice}}</span>
                                <span>x{{item.number}}</span>
                            </div>
                            <div class="mui-text-center dikou">可抵扣￥{{item.deduction*item.number}}</div>
                            <div class="mui-text-right money_1">-{{item.dikou}}元</div>
                        </li>
                    </ul>
                </div>
                <div class="list" v-if="shangpin_dikou_list.qita_dikou_list.length!=0">
                    <ul v-for="(item, index) in shangpin_dikou_list.qita_dikou_list" :key="index">
                        <li>
                            <div>{{item.name}}</div>
                            <!-- <div class="mui-text-center">新人专享</div> -->
                            <!-- <div class="mui-text-right">商品红包x1</div> -->
                        </li>
                        <li>
                            <div>
                                <span class="money_1">￥{{item.sellingPrice}}</span>
                                <span>x{{item.number}}</span>
                            </div>
                            <div class="mui-text-center dikou">可抵扣￥{{item.deduction*item.number}}</div>
                            <div class="mui-text-right money_1">-{{item.dikou}}元</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer_1">

                <div class="select_1">
                    <div>
                        <span v-if="qita_hongbao.length==0">未使用红包抵扣</span>
                        <span v-for="(item, index) in qita_hongbao" :key="index">{{index==0 ? item.name : '+'+item.name}}</span>
                    </div>                    
                </div>
                <div class="money">
                    总优惠：{{dingdanxiangqing.deduction}}元
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      dikouxiangqing_show: "orders/order/dikouxiangqing_show", //详情框是否显示
      shangpin_dikou_list: "orders/order/shangpin_dikou_list", //抵扣的详情
      dingdanxiangqing: "orders/order/dingdanxiangqing" //订单详情
    }),
    qita_hongbao() {
      return this.shangpin_dikou_list.dikou_hongbao.filter(x => x.type != 1);
    }
  },
  methods: {
    ...mapActions({
      get_dikouxiangqing_show: "orders/order/get_dikouxiangqing_show" //显示框是否显示
    })
  }
};
</script>

<style lang="scss" scoped>
.box_3 {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 50px 0.4rem 20px;
  // padding: 1.88rem 0.4rem 0.85rem;
  .content_1 {
    background: #ffffff;
    width: 100%;
    // background: rgba(246, 246, 246, 1);
    height: 396px;
    max-height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .close_1 {
      position: absolute;
      right: 0px;
      top: -50px;
      width: 36px;
      height: 36px;
      background: #ffffff;
      border-radius: 100%;
      font-size: 15px;
      color: rgba(153, 153, 153, 1);
      line-height: 36px;
      text-align: center;
    }
    .close_1::after {
      position: absolute;
      bottom: -14px;
      left: 0px;
      right: 0px;
      height: 15px;
      width: 1px;
      content: "";
      background: #ffffff;
      margin: auto;
    }
  }
  .cont_1 {
    flex-grow: 1;
    overflow: auto;
    .list {
      // margin: 0px 0px 7px 0px;
      background: #ffffff;
      border-bottom: 7px solid rgba(246, 246, 246, 1);
    }
    .list:last-child {
      border: none;
    }
    ul {
      border-bottom: 1px solid rgba(246, 246, 246, 1);
      padding: 4px 9px;
      color: rgba(80, 80, 80, 1);
      font-size: 10px;
      li {
        display: flex;
        > div {
          width: calc(100% / 3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .money_1 {
        color: #d43030;
      }
      .dikou {
        color: #a6a6a6;
      }
    }
  }
  .footer_1 {
    flex-shrink: 0;
    height: 40px;
    background-color: rgba(246, 246, 246, 1);
    display: flex;
    justify-content: space-between;
    padding: 0px 15px 0px 0px;
    .select_1 {
      position: relative;
      color: rgba(80, 80, 80, 1);
      font-size: 12px;
      > div {
        padding: 0px 15px;
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
        i {
          font-size: 14px;
        }
      }
      ul {
        position: absolute;
        bottom: 100%;
        left: 0px;
        min-width: 100%;
        white-space: nowrap;
        background-color: rgba(246, 246, 246, 1);
        text-align: center;
        border: 1px solid rgba(229, 229, 229, 1);
        border-bottom: none;
        li {
          padding: 3px;
          border-bottom: 1px solid rgba(229, 229, 229, 1);
        }
      }
    }
    .money {
      color: rgba(212, 48, 48, 1);
      font-size: 12px;
      line-height: 40px;
    }
  }
}
</style>
