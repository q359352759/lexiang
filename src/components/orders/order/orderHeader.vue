<template>
    <ul class="header">
        <li class="daipingjia mui-pull-right">
            {{state_list[dingdanxiangqing.state]}}
        </li>
        <li class="shop">
            <i class="icon_shop icon iconfont icon-jinrudianpu"></i>
            <span @click="go_shop()">{{shop.name}}</span>
            <i class="icon_right mui-icon mui-icon-arrowright"></i>
        </li>
        <div class="image"></div>
    </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      state_list: ["待付款", "已付款", ""]
    };
  },
  computed: {
    ...mapGetters({
      shop: "shop/shop",
      dingdanxiangqing: "orders/order/dingdanxiangqing"
    })
  },
  methods: {
    go_shop() {
      this.$router.push("/BusinessDetails?shopid=" + this.shop.shopid);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: #ffffff;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  padding: 0px 10px;
  border-bottom: 1px solid rgba(246, 246, 246, 1);
  // display: flex;
  height: 30px;
  line-height: 30px;
  .shop {
    display: flex;
    align-items: center;
  }
  .icon_shop {
    color: #e86434;
    font-size: 20px;
    margin: 0px 5px 0px 0px;
  }
  .icon_right {
    font-size: 12px;
  }
  .daipingjia {
    color: #505050;
  }
}
.image {
  width: 50px;
  height: 50px;
}
</style>
