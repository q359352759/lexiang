<template>
    <div id="market">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">业务市场</h1>
        </header>
        <div class="mui-content">

            <div class="swiper-container box_1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                        <img :src="'image/'+x" alt="">
                        <!-- <div></div> -->
                    </div>
                    <!-- <div class="swiper-slide"><img src="@/assets/image/6.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="@/assets/image/7.jpg" alt=""></div> -->
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>

            <div class="banyuan">
                <div></div>
            </div>

            <ul class="box_2">
                <li v-for="(item, index) in img_list2" :key="index">
                    <div>
                        <img :src="item.imgUrl" alt="" />
                    </div>
                    <span>{{item.name}}</span>
                </li>
            </ul>

            <ul class="box_3">
                <li>
                    <div class="img_box">
                        <img src="image/5.jpg" alt="">
                    </div>
                    <div class="text_1">
                        <div class="title">
                            <img src="image/5.jpg" alt="">
                            <span>公司名称</span>
                        </div>
                        <ul>
                            <li>业务:进口红酒</li>
                            <li>佣金:25%</li>
                            <li>合作:1280人</li>
                            <li>四川省成都市武侯区</li>
                        </ul>
                    </div>
                    <ul class="text_2">
                        <li>波尔多独家代理</li>
                        <li>市场份额35%</li>
                        <li>全国四家分公司</li>
                        <li>9250家网点</li>
                    </ul>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // img_list:['5.jpg','6.jpg','7.jpg']
      img_list: [],
      img_list2: [
        { name: "酒水", imgUrl: "image/t1.png" },
        { name: "养生", imgUrl: "image/t2.png" },
        { name: "美容", imgUrl: "image/t3.png" },
        { name: "医疗", imgUrl: "image/t4.png" },
        { name: "文教", imgUrl: "image/t5.png" },
        { name: "建材", imgUrl: "image/t6.png" },
        { name: "家具", imgUrl: "image/t7.png" },
        { name: "家电", imgUrl: "image/t8.png" },
        { name: "婚嫁", imgUrl: "image/t9.png" },
        { name: "更多", imgUrl: "image/t10.png" }
      ]
    };
  },
  methods: {
    getswiper() {
      var swiper = new Swiper("#market .swiper-container", {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
        // virtual: {
        //     slides: ['5.jpg', '6.jpg', '7.jpg'],
        //     renderSlide:function(slide, index){
        //         // return '<div class="swiper-slide">索引是'+index+'+内容是'+slide+'</div>';
        //         return '<div class="swiper-slide"><img src="./image/'+slide+'" alt=""></div>';
        //     },
        // },
      });
    }
  },
  beforeCreate() {
    // console.group('------beforeCreate创建前状态------');
  },
  created() {
    // console.group('------created创建完毕状态------');
  },
  beforeCreate() {
    // console.group('------beforeMount挂载前状态------');
  },
  mounted() {
    this.img_list = ["5.jpg", "6.jpg", "7.jpg"];

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
  },
  watch: {
    img_list() {
      this.$nextTick(function() {
        console.log("数据渲染完成");
        this.getswiper();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#market {
  height: 100%;
  .mui-content {
    height: 100%;
    background: #ffffff;
  }
}
#market .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#market .mui-title {
  color: #ffffff;
}

#market .box_1 .swiper-slide {
  height: 1.1rem;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  // div{
  //     width: 100%;
  //     height: 20px;
  //     background: #cccccc;
  //     position: absolute;
  //     bottom: -10px;
  //     left: 0px;
  //     border-top-left-radius: 100%;
  //     border-top-right-radius: 100%;
  // }
}

#market .banyuan {
  position: relative;
  z-index: 1;
  div {
    position: absolute;
    width: 100%;
    height: 20px;
    background: #cccccc;
    position: absolute;
    bottom: -10px;
    left: 0px;
    // border-top-left-radius: 100%;
    // border-top-right-radius: 100%;
    border-radius: 50%;
  }
}

#market .box_2 {
  background: #cccccc;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-size: 12px;
  padding: 0px 0px 0.1rem;
  li {
    width: 20%;
    div {
      margin: 0.15rem auto 0.1rem;
      width: 0.35rem;
      height: 0.35rem;
      text-align: center;
      background: #9e9e9e;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
}

#market .box_3 {
  padding: 0.1rem;
  line-height: initial;
  li {
    display: flex;
    .img_box {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      margin: 0px 5px 0px 0px;
    }
    .text_1 {
      flex-grow: 1;
      .title {
        display: flex;
        align-items: center;
        margin: 0px 0px 5px 0px;
      }
      img {
        width: 0.2rem;
        height: 0.2rem;
        margin: 0px 5px 0px 0px;
      }
      ul {
        font-size: 0.13rem;
      }
    }
    .text_2 {
      flex-shrink: 0;
      width: 0.9rem;
      font-size: 0.12rem;
    }
  }
}
</style>
