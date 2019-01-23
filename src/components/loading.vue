<template>
    <ul>
        <li v-if="loadingtype && !nodata" class="config_loading mui-text-center">拼命加载中···</li>
        <li v-if="!loadingtype && end" class="config_load mui-text-center">——没有更多了——</li>
        <li v-if="nodata" class="config_No_data mui-text-center">
            <div class="img_box">
                <img src="image/nolist.png" alt="" srcset="">
            </div>
            <div>{{text ? text : '暂无相关数据~'}}</div>
        </li>
    </ul>
</template>

<script>
export default {
  name: "",
  props: {
    loadingtype: Boolean, //加载中
    nodata: Boolean, //没有一条数据
    end: Boolean, //全部加载完成
    text: "" //提示语
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.config_loading {
  padding: 10px;
  font-size: 0.14rem;
  color: rgba(80, 80, 80, 1);
}
.config_load {
  padding: 10px;
  font-size: 0.14rem;
  color: rgba(80, 80, 80, 1);
}
.config_No_data {
  padding: 50px 0px 0px;
  font-size: 0.14rem;
  color: rgba(80, 80, 80, 1);
}
.config_No_data div {
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
}
.img_box {
  margin: 0px 0px 5px 0px;
}
.img_box > img {
  width: 80px;
}
</style>
