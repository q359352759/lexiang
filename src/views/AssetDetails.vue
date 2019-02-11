<template>
    <div id="AssetDetails">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">资产详情</h1>
        </header>

        <div class="mui-content">
            <ul class="box_1 active">
                <li class="header">
                    <div>类型</div>
                    <div>时间</div>
                    <div>金额</div>
                </li>
            </ul>
            <ul class="box_1">
                <li class="header">
                    <div>类型</div>
                    <div>时间</div>
                    <div>金额</div>
                </li>
                <li class="list">
                    <div>LB</div>
                    <div>2018.10.16 16：49:50</div>
                    <div>+33个</div>
                </li>
                <li class="list">
                    <div>补贴</div>
                    <div>2018.10.16 16：49:50</div>
                    <div>+33元</div>
                </li>
                <li class="list" v-for="x in list">
                    <div>体现</div>
                    <div>2018.10.16 16：49:50</div>
                    <div>-100元</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "AssetDetails",
  components: {},
  data() {
    return {
      list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ]
    };
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#AssetDetails {
  height: 100%;
  .mui-content {
    height: 100%;
    // background:rgba(255, 255, 255, 1);
    overflow: auto;
  }
}
#AssetDetails .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#AssetDetails .mui-title {
  color: #ffffff;
}
#AssetDetails .box_1.active {
  position: fixed;
  top: 44px;
  left: 0px;
  width: 100%;
}
#AssetDetails .box_1 {
  // white-space: nowrap;
  text-align: center;
  > li.header {
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    background: #f6f6f6;
  }
  > li.list {
    background: #ffffff;
    > div:nth-child(1) {
      color: rgba(80, 80, 80, 1);
      font-size: 12px;
    }
    > div:nth-child(2) {
      font-size: 12px;
      color: rgba(80, 80, 80, 1);
    }
    > div:nth-child(3) {
      color: rgba(255, 87, 51, 1);
      font-size: 14px;
    }
  }
  > li {
    height: 32px;
    display: flex;
    line-height: 32px;
    border-bottom: 1px solid #cccccc;
    > div:nth-child(1) {
      width: 30%;
      // color: rgba(80, 80, 80, 1);
      // font-size: 12px;
    }
    > div:nth-child(2) {
      width: 40%;
      // font-size: 12px;
      // color: rgba(80, 80, 80, 1);
    }
    > div:nth-child(3) {
      width: 30%;
      // color: rgba(255, 87, 51, 1);
      // font-size: 14px;
    }
  }
}
</style>
