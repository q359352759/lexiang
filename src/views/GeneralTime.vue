<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <span class="quxiao mui-pull-left" @click="back()">取消</span>
            <h1 class="mui-title">日期选择</h1>
            <span class="quding mui-pull-right" @click="Sure()">确定</span>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <button :class="{'active':type==0}" @click="select_type(0)">按月</button>
                <button :class="{'active':type==1}" @click="select_type(1)">按日</button>
            </div>

            <ul class="box_2">
                <li :class="{'active':input_type==0}" @click="select_input(0)">
                    <span>{{year}}</span>
                    <span>-{{month}}</span>
                    <span v-if="type==1">-{{day}}</span>
                </li>
                <li v-if="type==1">至</li>
                <li v-if="type==1" :class="{'active':input_type==1}" @click="select_input(1)">
                    <span v-show="!end_year">结束时间</span>
                    <span v-show="end_year">{{end_year}}</span>
                    <span v-show="end_month">-{{end_month}}</span>
                    <span v-show="end_day">-{{end_day}}</span>
                </li>
            </ul>
            
            <div class="box_3">
                <div class="swiper-container swiper_year">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in year_list" :key="index"><div>{{item}}</div></div>
                    </div>
                </div>
                <div class="swiper-container swiper_month">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in month_list" :key="index"><div>{{item}}</div></div>
                    </div>
                </div>
                <div class="swiper-container swiper_day" v-show="type==1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-if="index<max_day" v-for="(item, index) in day_list" :key="index"><div>{{item}}</div></div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      type: 0, //0表示按月 1表示按日期
      input_type: 0, //0表示开始时间  1表示结束时间
      year_list: [],
      month_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day_list: [
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
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      year: "",
      month: "",
      day: "",
      end_year: "",
      end_month: "",
      end_day: "",
      swiper_year: "",
      swiper_month: "",
      swiper_day: ""
    };
  },
  comments: {},
  computed: {
    //最后一天
    max_day() {
      const d = new Date(this.year, this.month, 0);
      return d.getDate();
    }
  },
  methods: {
    //按月或者按日
    select_type(x) {
      this.type = x;
    },
    //开始时间和结束时间
    select_input(x) {
      this.input_type = x;
      if (x == 1 && this.end_year == "") {
        this.end_year = this.year;
        this.end_month = this.month;
        this.end_day = this.day;
      }
    },
    //返回
    back() {
      history.back();
    },
    //确定
    Sure() {
      var obj = {
        year: this.year,
        month: this.month,
        day: this.day,
        end_year: this.end_year,
        end_month: this.end_month,
        end_day: this.end_day,
        type: this.type
      };
      this.$store.state.general_time = obj;
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
    //年
    var year = new Date().getFullYear();
    for (var i = year - 10; i <= year + 5; i++) {
      this_1.year_list.push(i);
    }
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();

    var this_1 = this;
    //年
    this.swiper_year = new Swiper(".swiper_year", {
      observer: true,
      observeParents: true,
      // speed: 300,
      slidesPerView: "auto",
      spaceBetween: 30,
      // freeMode: true,
      direction: "vertical",
      effect: "coverflow",
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 10,
        depth: 100,
        modifier: 1,
        slideShadows: false,
        opacity: 0.1
      },
      on: {
        slideChange() {
          // console.log(this.activeIndex)
          if (this_1.input_type == 0) {
            this_1.year = this_1.year_list[this.activeIndex];
          } else {
            this_1.end_year = this_1.year_list[this.activeIndex];
          }
          if (this_1.swiper_month) {
            this_1.swiper_month.slideTo(0);
          }
        },
        init() {
          var idnex = this_1.year_list.indexOf(this_1.year);
          this.slideTo(idnex);
        }
      }
    });

    //月
    this.swiper_month = new Swiper(".swiper_month", {
      observer: true,
      observeParents: true,
      // speed: 300,
      slidesPerView: "auto",
      spaceBetween: 30,
      // freeMode: true,
      direction: "vertical",
      effect: "coverflow",
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 10,
        depth: 100,
        modifier: 1,
        slideShadows: false,
        opacity: 0.1
      },
      on: {
        slideChange() {
          if (this_1.input_type == 0) {
            this_1.month = this_1.month_list[this.activeIndex];
          } else {
            this_1.end_month = this_1.month_list[this.activeIndex];
          }
          if (this_1.swiper_day) {
            setTimeout(function() {
              this_1.swiper_day.slideTo(0);
            }, 500);
          }
        },
        init() {
          // console.log('swiper_month初始化完成');
          var idnex = this_1.month_list.indexOf(this_1.month);
          this.slideTo(idnex);
        }
      }
    });
    //日
    this.swiper_day = new Swiper(".swiper_day", {
      observer: true,
      observeParents: true,
      // speed: 300,
      slidesPerView: "auto",
      spaceBetween: 30,
      // freeMode: true,
      direction: "vertical",
      effect: "coverflow",
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 10,
        depth: 100,
        modifier: 1,
        slideShadows: false,
        opacity: 0.1
      },
      on: {
        slideChange() {
          if (this_1.input_type == 0) {
            this_1.day = this_1.day_list[this.activeIndex];
          } else {
            this_1.end_day = this_1.day_list[this.activeIndex];
          }
        },
        init() {
          console.log("swiper_day初始化完成");
          console.log(this_1.day);
          var idnex = this_1.day_list.indexOf(this_1.day);
          this.slideTo(idnex);
        }
      }
    });
  },
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
.mui-content {
  background: #ffffff;
}
.quxiao,
.quding {
  color: #ffffff;
  line-height: 44px;
  margin: 0px 5px 0px;
  position: relative;
  z-index: 1;
}
.box_1 {
  font-size: 0.12rem;
  width: 3.4rem;
  height: 0.28rem;
  border: 1px solid #007aff;
  color: #007aff;
  border-radius: 5px;
  margin: 0.17rem auto 0.17rem;
  background: #ffffff;
  button {
    width: 50%;
    height: 100%;
    border: none;
    padding: 0px;
    border-radius: 0px;
    background: none;
    transition: all 0.5s;
    color: #007aff;
  }
  .active {
    background: #007aff;
    color: #ffffff;
  }
}

.box_2 {
  margin: 0.25rem 0.2rem;
  display: flex;
  height: 0.24rem;
  li {
    height: 0.24rem;
  }
  > li:nth-child(1),
  > li:nth-child(3) {
    width: 150px;
    border-bottom: 1px solid #a6a6a6;
    text-align: center;
    color: #a6a6a6;
    flex-grow: 1;
  }
  > li.active {
    border-bottom: 1px solid #2a82e4;
    color: #2a82e4;
  }
}

.box_3 {
  position: relative;
  height: 150px;
  display: flex;
  padding: 0px 0.5rem;
}

.swiper-container {
  height: 100%;
}
.swiper-slide {
  background: #ffffff;
  height: 30px;
  line-height: 30px;
  text-align: center;
  opacity: 0.3;
  font-size: 20px;
}
.swiper-slide-active {
  opacity: 1;
}
// .swiper-slide-active+div{
//     opacity: 0.6;
// }
// .swiper-slide-active+div+div+div{
//     opacity: 0.6;
// }
// .swiper-slide-active+div+div+div+div{
//     opacity: 0.3;
// }
// .swiper-slide{
//     height: 25px;
// }
</style>
