<template>
    <div class="支付成功">
        <ul>
            <li class="标题">
                <i class="icon iconfont icon-zhifuchenggong"></i>
                <span>支付成功</span>
            </li>
            <li>
                <span>商家：</span>
                <b>{{shop.name}}</b>
            </li>
            <li>
                <span>金额：{{dingdanxiangqing.paymentAmount+dingdanxiangqing.deduction}}元，抵扣：{{dingdanxiangqing.deduction}}元</span>
            </li>
            <li>
                <span>实付：</span>
                <b class="money">{{dingdanxiangqing.paymentAmount}}</b>
                <span>元</span>
            </li>
            <li class="按钮框">
                <btn @click.native="设置支付成功弹出框(false)" value="我知道了"/>
            </li>
        </ul>
    </div>
</template>

<script>
import btn from "@/components/button.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "",
  components: {
    btn
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      dingdanxiangqing: "orders/order/dingdanxiangqing",
      shop: "shop/shop"
    })
  },
  methods: {
    ...mapActions({
      设置支付成功弹出框: "orders/order/设置支付成功弹出框"
    })
  }
};
</script>

<style lang="scss" scoped>
.支付成功 {
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  > ul {
    width: 246px;
    background: #ffffff;
    border-radius: 16px;
    padding: 0px 25px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    li {
      margin: 0px 0px 17px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .标题 {
    padding: 20px 0px 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      color: rgba(32, 220, 4, 1);
      font-size: 22px;
      height: 22px;
    }
    span {
      margin: 0px 0px 0px 7px;
      color: #18a968;
      font-size: 14px;
    }
  }
  .money {
    font-size: 22px;
    color: #d9393b;
  }
  .按钮框 {
    margin: 0px;
    padding: 6px 0px 33px;
  }
}
</style>
