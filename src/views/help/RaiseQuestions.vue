<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                提问
            </h1>
            <div class="text_1" @tap="QuestionRecord()">
                记录
                <!-- <span>1</span> -->
            </div>
        </header>
        <div class="mui-content mui-fullscreen">
            <form @submit.prevent="submit()">
                <div class="box_1">
                    <div>您的问题是什么：</div>
                    <input type="text" placeholder="请输入问题标题" required/>
                </div>

                <div class="box_2" contenteditable="true"></div>
                <!-- <textarea class="box_2" placeholder="请输入问题详细描述" required></textarea> -->

                <div class="box_3">
                    *我们会在工作日内第一时间查看并回复您的内容，并以系统通知方式告知。
                </div>

                <button class="btn_1">
                    提交
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    submit() {
      console.log("132");
    },
    QuestionRecord() {
      this.$router.push("/QuestionRecord");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-bar {
  .text_1 {
    float: right;
    line-height: 44px;
    color: #ffffff;
    position: relative;
    span {
      position: absolute;
      top: 7px;
      right: -4px;
      min-width: 12px;
      height: 12px;
      border-radius: 12px;
      background-color: rgba(212, 48, 48, 1);
      color: #ffffff;
      text-align: center;
      line-height: 12px;
      font-size: 10px;
    }
  }
}

.box_1 {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0px 14px;
  background: #ffffff;
  div {
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    white-space: nowrap;
  }
  input {
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    padding: 0px;
    margin: 0px;
    height: 100%;
    border: none;
  }
}

.box_2 {
  border: none;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  padding: 10px 14px;
  min-height: 170px;
  margin: 3px 0px 0px;
  background: #ffffff;
  user-select: text;
}
.box_2:empty:before {
  content: "请输入问题详细描述";
  color: gray;
}
.box_3 {
  padding: 11px 14px;
  color: rgba(80, 80, 80, 1);
  font-size: 12px;
}

.btn_1 {
  width: 141px;
  height: 36px;
  border-radius: 36px;
  border: none;
  background: $header_background;
  color: #ffffff;
  padding: 0px;
  font-size: 14px;
  display: block;
  margin: 22px auto 0px;
}
</style>
