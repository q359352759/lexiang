<template>
    <ul>
        <li v-if="loadingtype && !nodata" class="config_loading mui-text-center">拼命加载中···</li>
        <li v-if="!loadingtype && end" class="config_load mui-text-center">———没有更多了———</li>
        <li v-if="nodata" class="config_No_data mui-text-center">暂无数据</li>
    </ul>
</template>

<script>
export default {
  name: "",
  props: {
    loadingtype: Boolean, //加载中
    nodata: Boolean, //没有一条数据
    end: Boolean //全部加载完成
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
}
.config_load {
  padding: 10px;
  font-size: 0.14rem;
}
.config_No_data {
  padding: 10px;
  font-size: 0.14rem;
}
</style>
