<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">回复列表</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <div class="box_1" v-for="(item, index) in 3" :key="index">
                <ul class="header">
                    <li class="Head_portrait">
                        <img src="image/43.png" alt="" srcset="">
                    </li>
                    <li class="text">
                        <div>
                            <div class="name">嘣得儿你</div>
                            <div class="xingxing">
                                <xingxing :number="4"/>
                            </div>
                        </div>
                        <div class="time">
                            <span>2018.11.13</span>
                        </div>
                    </li>
                </ul>
                <ul class="content_1">
                    <li v-for="(item, index1) in 3" :key="index1">
                        <ul class="header" v-if="index1!=0">
                            <li class="name">孟哥回复：</li>
                            <li class="time_1">7天后追评</li>  
                            <li class="time_2">2018.11.13</li>                          
                        </ul>
                        <div class="text_1">
                            <div>感谢亲长期以来的信任与支持，我们会努力越做越好，以后常来！</div>
                        </div>
                        <div class="img_box">
                            <div>
                                <ul class="img_list" v-if="index1==0">
                                    <li>
                                        <img src="image/43.png" alt="">
                                    </li>
                                    <li>
                                        <img src="image/43.png" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="dianzan" v-if="index1!=0">
                                <i class="icon iconfont icon-dianzan1"></i>
                                98
                            </div>
                        </div>
                        <ul class="huifu mui-clearfix">
                            <div class="mui-pull-right" @tap="huifu(true)">回复</div>
                            <div class="mui-pull-right">不回复</div>
                        </ul>
                    </li>
                </ul>
            </div>


            <div class="box_2" v-show="huifu_box">
                <div class="mask" @tap="huifu(false)"></div>
                <ul class="content_1">
                    <li class="name">回复：客户名</li>
                    <li class="text_box" contenteditable="true"></li>
                    <li>
                        <ul class="img_box">
                            <li>
                                <img src="image/43.png" alt="" srcset="">
                                <span>
                                    <i class="删除 icon iocnfont iocn-shanchu1"></i>
                                </span>
                            </li>
                            <li class="add">
                                <i class="icon iconfont icon-plus-add"></i>
                            </li>
                        </ul>
                    </li>
                    <li class="btn_1">提交</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import xingxing from "@/components/xingxing.vue";
import loading from "@/components/loading.vue";

export default {
  name: "",
  components: {
    xingxing,
    loading
  },
  data() {
    return {
      huifu_box: false
    };
  },
  methods: {
    huifu(x) {
      console.log("回复");
      this.huifu_box = x;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1 {
  padding: 0px 10px;
  background: #ffffff;
  margin: 0px 0px 5px 0px;
  .header {
    display: flex;
    padding: 6px 0px;
    flex-shrink: 0;
    .Head_portrait {
      width: 38px;
      height: 38px;
      margin: 0px 12px 0px 0px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .text {
      flex-grow: 1;
      div {
        display: flex;
        justify-content: space-between;
      }
      .name {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
      }
      .time {
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
      }
    }
  }
  .content_1 {
    > li {
      border-bottom: 1px solid rgba(246, 246, 246, 1);
      padding: 0px 0px 8px 0px;
      margin: 0px 0px 6px 0px;
    }
    > li:last-child {
      margin: 0px;
      border: none;
    }
    padding: 0px 0px 0px 50px;
    color: rgba(80, 80, 80, 1);
    font-size: 12px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time_1 {
        color: #fc6621;
      }
      .time_2 {
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
      }
    }
    .text_1 {
      margin: 0px 0px 8px 0px;
    }
    .img_box {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      .img_list {
        display: flex;
        flex-wrap: wrap;
        > li {
          width: 60px;
          height: 60px;
          margin: 0px 8px 0px 0px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .dianzan {
        color: rgba(166, 166, 166, 1);
        font-size: 14px;
        i {
          color: #f86c0c;
          font-size: 24px;
        }
      }
    }
    .huifu {
      padding: 11px 0px 0px 0px;
      div {
        width: 52px;
        height: 22px;
        border-radius: 22px;
        line-height: 20px;
        font-size: 12px;
        margin: 0px 0px 0px 12px;
        text-align: center;
      }
      > div:nth-child(1) {
        color: #007aff;
        border: 1px solid #007aff;
      }
      > div:nth-child(2) {
        color: #808080;
        border: 1px solid #808080;
      }
    }
  }
}

.box_2 {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  .mask {
    width: 100%;
    height: 100%;
    background: #999999;
    opacity: 0.5;
  }
  .content_1 {
    padding: 0px 10px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background: #ffffff;
    .name {
      padding: 8px 0px;
      text-align: center;
      color: rgba(80, 80, 80, 1);
      font-size: 14px;
    }
    .text_box {
      min-height: 86px;
      background-color: rgba(246, 246, 246, 1);
      font-size: 14px;
      padding: 8px;
      position: relative;
    }
    .text_box:empty::after {
      position: absolute;
      top: 6px;
      left: 8px;
      content: "请输入回复内容";
      color: rgba(166, 166, 166, 1);
      font-size: 14px;
    }
    .img_box {
      padding: 7px 0px 0px;
      display: flex;
      flex-wrap: wrap;
      > li {
        width: 66px;
        height: 66px;
        position: relative;
        margin: 0px 8px 0px 0px;
        background-color: rgba(229, 229, 229, 1);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .add {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 33px;
        color: rgba(80, 80, 80, 1);
      }
    }
    .btn_1 {
      background: $header_background;
      width: 175px;
      height: 34px;
      margin: 28px auto 35px;
      border-radius: 34px;
      text-align: center;
      color: #ffffff;
      line-height: 34px;
      font-size: 14px;
    }
  }
}
</style>
