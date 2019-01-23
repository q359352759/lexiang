<template>
    <div id="TimeSlot">
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">营业时间</h1>
		</header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>
                    <div class="title">开门时间</div>
                    <button :class="{'active':active==1}" @click="SelectionTime(1)" class="time">{{startTime ? startTime:'点击选择时间'}}</button>
                </li>
                <li>
                    <div></div>
                </li>
                <li>
                    <div class="title">打烊时间</div>
                    <button :class="{'active':active==2}" @click="SelectionTime(2)" class="time">{{entTime ? entTime : '点击选择时间'}}</button>
                </li>
            </ul>

            <div class="box_2" @click="queding()">确定</div>

            <div class="box_3" @click="SelectionTime(0)"></div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "",
  data() {
    return {
      active: 0,
      startTime: "",
      entTime: ""
    };
  },
  methods: {
    ...mapMutations({
      更新店铺key: "申请开店/更新店铺key"
    }),
    SelectionTime(x) {
      this.active = x;
      if (x == 0) return;
      this.timePicker.show(res => {
        console.log(res.value);
        if (x == 1) {
          this.startTime = res.value;
        } else {
          this.entTime = res.value;
        }
      });
    },
    queding() {
      this.更新店铺key(["openTime", this.startTime]);
      this.更新店铺key(["closeTime", this.entTime]);
      // this.$store.state.apply_for_a_shop.creationTime = this.startTime;
      // this.$store.state.apply_for_a_shop.endTime = this.entTime;
      // this.$store.push()
      history.back();
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
  mounted: function() {
    var this_1 = this;
    this.timePicker = new mui.DtPicker({ type: "time" });
    this.startTime = this.$store.state.apply_for_a_shop.creationTime;
    this.entTime = this.$store.state.apply_for_a_shop.endTime;
    // console.group('------mounted 挂载结束状态------');
  },
  activated() {
    console.log(11111111);
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
@import "@/assets/css/config.scss";

.mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
.mui-title {
  color: #ffffff;
}
#TimeSlot .box_1 {
  display: flex;
  justify-content: center;
  margin: 99px 0px 0px;
  text-align: center;
  position: relative;
  z-index: 1;
  .title {
    font-size: 0.14rem;
  }
  .time {
    width: 100%;
    border: none;
    height: 38px;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(166, 166, 166, 1);
    font-size: 0.14rem;
    padding: 0px;
  }
  .time.active {
    background: $header_background;
  }
  > li {
    width: 98px;
  }
  > li:nth-chiild(1) {
  }
}
.box_2 {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 44px;
  bottom: 0px;
  left: 0px;
  line-height: 44px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(24, 169, 104, 1);
  text-align: center;
  font-size: 0.14rem;
}
.box_3 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>

<style lang="scss">
</style>
