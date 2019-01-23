<template>
    <div id="classification">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">全部类型</h1>
        </header>
        <div class="mui-content mui-row mui-fullscreen">
            <div class="mui-col-xs-3 left">
                <ul class="box_1">
                    <li @click="selection_type(index)" :class="{'active':type_1==index}" v-for="(item, index) in type_list" :key="index">{{item.name}}</li>
                </ul>
            </div>
            <div class="mui-col-xs-9 right" ref="right" @scroll="scroll($event)">
                <!--<ul class="mui-row box_2">
                    <li class="mui-col-xs-4" v-for="(item, index) in 6" :key="index">
                        <div class="img_box">
                           <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                           <div class="text_1">商圈</div>
                        </div>
                    </li>
                </ul>-->

                <div class="box_3" v-for="(item, index) in type_list" :key="index">
                    <div class="title">
                        <img align="absmiddle" :src="item.logo" alt="">
                        {{item.name}}
                        <span @click="ShopClassification(item)" class="mui-pull-right">去频道 <i class="mui-icon mui-icon-forward"></i></span>
                    </div>
                    <ul class="list mui-row">
                        <li class="mui-col-xs-4" v-for="(x, index) in item.children" :key="index">
                            <span @click="ShopClassification(x)">{{x.name}}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { limit } from "@/assets/js/currency";
export default {
  name: "",
  data() {
    return {
      type_1: 0,
      list: [],
      scroll_list: [],
      isclick: false
    };
  },
  computed: {
    type_list() {
      return this.$store.state.shops_tree_list;
    }
  },
  methods: {
    ShopClassification(x) {
      console.log(x);
      this.$router.push("/ShopClassification?id=" + x.id + "&name=" + x.name);
    },
    selection_type(x) {
      this.type_1 = x;
      document.getElementsByClassName("right")[0].scrollTop = this.scroll_list[
        x
      ];
      // this.$refs.right.scrollTop = this.scroll_list[x];
      this.isclick = true;
      setTimeout(() => {
        this.isclick = false;
      }, 1000);
    },
    scroll(e) {
      var h = e.target.offsetHeight; //容器高度
      var sh = e.target.scrollHeight; //滚动条总高
      var t = e.target.scrollTop; //滚动条到顶部距离
      // console.log(this.scroll_list,h,sh,t);
      // console.log(this.scroll_list.indexOf(t))
      // console.log(limit(this.scroll_list,t))
      var index = limit(this.scroll_list, t);
      if (!this.isclick) {
        this.type_1 = index;
      }
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
    this.list = [
      //   "全部",
      "超市",
      "美食",
      "休闲娱乐",
      "丽人",
      "K歌",
      "运动健身",
      "亲子",
      "摄影",
      "结婚",
      "宠物",
      "教育技能培训",
      "洗衣",
      "电影",
      "第三方服务"
    ];
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
  },
  watch: {
    list() {
      this.$nextTick(function() {
        console.log("数据渲染完成");
        var this_1 = this;
        var dom = document.getElementsByClassName("right")[0].childNodes;

        dom.forEach(x => {
          if (x.offsetTop)
            // console.log(x.offsetTop)
            this.scroll_list.push(x.offsetTop);
        });
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#classification {
  height: 100%;
}
#classification .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#classification .mui-title {
  color: #ffffff;
}
#classification .mui-bar .mui-title {
  text-align: left;
}

#classification .left {
  height: 100%;
  overflow: auto;
}
#classification .right {
  background: #ffffff;
  height: 100%;
  overflow: auto;
  padding: 10px;
}
#classification .box_1 {
  // background: #ffffff;
  height: 100%;
  overflow: auto;
  font-size: 0.14rem;
  > li {
    height: 44px;
    line-height: 44px;
    padding: 0px 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
  }
  > li.active {
    background: #ffffff;
    color: #ff7100;
  }
  > li.active:after {
    width: 4px;
    height: 50%;
    position: absolute;
    top: 25%;
    left: 0px;
    content: "";
    background: #ff7100;
  }
}
#classification .box_2 {
  > li {
    padding: 3px;
    .img_box {
      height: 0.7rem;
      position: relative;
      border-radius: 3px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .text_1 {
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        text-align: center;
        color: #ffffff;
        padding: 5px 0px;
      }
    }
  }
}

#classification .box_3 {
  margin: 0rem 0px 0.3rem;
  .title {
    font-size: 0.14rem;
    img {
      width: 15px;
      align: absmiddle;
      border-radius: 100%;
    }
    span {
      color: #ff7100;
    }
    i {
      font-size: 0.18rem;
    }
  }
  .list {
    text-align: center;
    margin: 0px -5px;
    > li {
      padding: 5px;
      span {
        font-size: 0.12rem;
        line-height: 0.15rem;
        padding: 5px 0px;
        display: block;
        background: #f7f7f7;
      }
    }
  }
}
</style>
