<template>
    <div id="HelpDetails">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                {{obj.headline}}
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1" v-html="obj.content"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      id: "", //id
      obj: {} //详情
    };
  },
  methods: {
    // /api-u/users/question/
    get_question() {
      this.$axios({
        method: "get",
        url: "/api-u/users/question/" + this.id
      })
        .then(x => {
          console.log("根据Id查询问题", x);
          this.obj = x.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeCreate: function() {
    // console.group('------beforeCreate创建前状态------');
  },
  created: function() {
    this.id = this.$route.query.id;
    //根据Id查询问题
    this.get_question();
    // console.group('------created创建完毕状态------');
  },
  beforeMount: function() {
    // console.group('------beforeMount挂载前状态------');
  },
  mounted: function() {
    // console.group('------mounted 挂载结束状态------');
  },
  beforeUpdate: function() {
    // console.group('beforeUpdate 更新前状态===============》');
  },
  updated: function() {
    // console.group('updated 更新完成状态===============》');
  },
  beforeDestroy: function() {
    // console.group('beforeDestroy 销毁前状态===============》');
  },
  destroyed: function() {
    // console.group('destroyed 销毁完成状态===============》');
  }
};
</script>

<style lang="scss">
#HelpDetails .box_1 {
  padding: 10px;
  li {
    list-style: inherit;
  }
  img {
    max-width: 100%;
  }
}
</style>
