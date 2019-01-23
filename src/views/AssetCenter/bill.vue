<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">收支账单</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>
                    <div>
                        <span>
                        类型
                        </span>
                        <i class="mui-icon mui-icon-arrowdown"></i>
                    </div>
                    <div>
                        <span>
                        收支
                        </span>
                        <i class="mui-icon mui-icon-arrowdown"></i>
                    </div>
                    <div class="shangxia">
                        <span>
                        时间 
                        </span>
                        <div class="jiantou">
                            <div class="active">
                                <i class="icon iconfont icon-jiantou_shangxiaqiehuan_o"></i>
                            </div>
                            <div>
                                <i class="right icon iconfont icon-jiantou_shangxiaqiehuan_o"></i>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    {{time.year ? time.year : ''}}
                    {{time.month ? '-'+time.month : ''}}
                    {{(time.day && time.type==1) ? '-'+time.day : ''}}
                    <i @click="GeneralTime()" class="icon iconfont icon-calendar"></i>
                </li>
            </ul>

            <ul class="box_2">
                <!-- <li>
                    <div class="img_box">
                        <img src="image/7.jpg" alt="" srcset="">
                    </div>
                    <div>
                        <div class="title">测试科技</div>
                        <div class="type">[团队补贴]</div>
                        <div class="time">2018.11.08 13:29:23</div>
                    </div>
                    <div class="jia">+26.00</div>
                </li>
                <li>
                    <div class="img_box">
                        <img src="image/7.jpg" alt="" srcset="">
                    </div>
                    <div>
                        <div class="title">测试科技</div>
                        <div class="type">[团队补贴]</div>
                        <div class="time">2018.11.08 13:29:23</div>
                    </div>
                    <div class="jian">-26.00</div>
                </li> -->
            </ul>
            <loading :nodata="true"/>

        </div>
    </div>
</template>

<script>
import loading from "@/components/loading.vue";
export default {
  name: "",
  components: {
    loading
  },
  data() {
    return {};
  },
  comments: {},
  computed: {
    time() {
      return this.$store.state.general_time;
    }
  },
  methods: {
    GeneralTime() {
      this.$router.push("/GeneralTime");
    }
  },
  beforeCreate: function() {
    // console.group('------beforeCreate创建前状态------');
  },
  created: function() {
    // console.group('------created创建完毕状态------');
  },
  beforeMount: function() {
    // console.group('------beforeMount挂载前状态------');
  },
  mounted: function() {},
  activated() {
    console.log("再次进入页面");
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
    // document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
    // console.group('destroyed 销毁完成状态===============》');
  },
  watch: {
    // img_list() {
    //     this.$nextTick(function() {
    //         console.log("数据渲染完成");
    //         this.getswiper();
    //     });
    // }
  }
};
</script>

<style lang="scss" scoped>
.box_1 {
  display: flex;
  justify-content: space-between;
  padding: 0.09rem 0.15rem;
  background: #ffffff;
  color: #505050;
  font-size: 12px;
  i {
    font-size: 0.16rem;
  }
  > li:nth-child(1) {
    display: flex;
    > div {
      margin: 0px 20px 0px 0px;
    }
  }
  .shangxia {
    display: flex;
    align-items: center;
  }
  .jiantou {
    height: 15px;
    display: inline-block;
    margin: 1px 0px 0px;
    > div {
      display: inline-block;
      position: relative;
      height: 100%;
      width: 8px;
      overflow: hidden;
      i {
        position: absolute;
        top: 0px;
        font-weight: bold;
        font-size: 16px;
      }
    }
    > div:nth-child(1) {
      margin: 0px 1px 0px 0px;
    }
    .active {
      color: #1c94e4;
    }
    .right {
      right: 0px;
    }
  }
}
.box_2 {
  > li {
    display: flex;
    background: #ffffff;
    padding: 0.09rem 0.2rem 0.08rem 0.12rem;
    .img_box {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    > div:nth-child(2) {
      width: 0;
      flex-grow: 1;
      margin: 0px 8px;
    }
    > div:nth-child(3) {
      flex-shrink: 0;
      white-space: nowrap;
    }
    .title {
      font-size: 0.12rem;
      color: #505050;
    }
    .type {
      font-size: 0.1rem;
      color: #505050;
      margin: 3px 0px 2px;
    }
    .time {
      color: #a6a6a6;
      font-size: 0.1rem;
    }
    .jia {
      color: #ff8d1a;
      font-size: 0.14rem;
      font-weight: bold;
    }
    .jian {
      font-size: 0.14rem;
      color: #808080;
      font-weight: bold;
    }
  }
}
</style>
