<template>
    <div id="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <!-- <header class="mui-bar mui-bar-nav">
            <div class=""></div>
            <h1 class="mui-title">乐享生活</h1>
        </header> -->

        <div class="mui-content">
            <ul class="box_header">
                <li>
                    <div>
                        <div><i class="icon iconfont icon-iconfontscan"></i></div>
                        <span>扫一扫</span>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <i class="icon iconfont icon-chazhao"></i> 
                        </div>    
                        <input type="text">
                    </div>
                </li>
                <li>
                    <div>   
                        <div><i class="icon iconfont icon-31erweima"></i></div>
                        <span>会员码</span>
                    </div>
                </li>
                <li>
                    <div>
                        <div><i class="icon iconfont icon-31xiaoxi"></i></div>
                        <span>消息</span>
                    </div>
                </li>
            </ul>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <!-- <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div> -->
                    <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                        <img :src="'image/'+x" alt="">
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>

            <div class="banyuan">
                <div></div>
            </div>

            <ul class="box_2">
                <li v-for="(x,index) in type_list" :key="index">
                    <div class="img_box">
                        <img :src="x.url" alt="">
                    </div>
                    <span>{{x.name}}</span>
                </li>
            </ul>

            <ul class="box_3">
                <li @click="change_type_1(1)" :class="{'active':type_1==1}">红包</li>
                <li @click="change_type_1(2)" :class="{'active':type_1==2}">优购</li>
                <li @click="change_type_1(3)" :class="{'active':type_1==3}">商家</li>
            </ul>

            <div class="box_4">
                <ul v-for="(x, index) in list_2" :key="index">
                    <li>
                        <div class="title_1">
                        一米阳光(富顺店)
                        </div>
                        <div class="dizhi">
                            <span>保利国际</span>
                            <span class="Fraction mui-pull-right">4.5分</span>
                            <span class="mui-pull-right">0.5km</span>
                        </div>
                        <div class="text_1">满10.1可用</div>
                    </li>
                    <li>
                        <div></div>
                        <div></div>
                    </li>
                    <li>
                        <div>
                            <img src="image/redpackage.png" alt="">
                            <span>10</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div>
                                <div>已领取</div>
                                <div>96%</div>
                            </div>
                            <div></div>
                        </div>
                        <div>领取</div>
                    </li>
                </ul>
            </div>
            

            <button @click="ApplicationAgent()">申请成为代理人</button>
        </div>
        <circularNav />
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import circularNav from "@/components/circularNav.vue";

// import Swiper from 'swiper';
export default {
  name: "home",
  components: {
    // HelloWorld
    circularNav
  },
  data() {
    return {
      img_list: [], //轮播图
      type_list: [
        { url: "image/fenlei/1.jpg", name: "直购" },
        { url: "image/fenlei/2.jpg", name: "美食" },
        { url: "image/fenlei/3.jpg", name: "休闲" },
        { url: "image/fenlei/4.jpg", name: "丽人" },
        { url: "image/fenlei/5.jpg", name: "教育" },
        { url: "image/fenlei/6.jpg", name: "酒店" },
        { url: "image/fenlei/7.jpg", name: "家装" },
        { url: "image/fenlei/8.jpg", name: "汽车" },
        { url: "image/fenlei/9.jpg", name: "购物" },
        { url: "image/fenlei/10.jpg", name: "更多" }
      ],
      type_1: 1,
      list_2: [1, 2, 3]
    };
  },
  methods: {
    //选择类型
    change_type_1(x) {
      this.type_1 = x;
    },
    test() {
      console.log(1231);
    },
    //申请代理人
    ApplicationAgent() {
      this.$router.push("/ApplicationAgent");
    },
    //图片轮播
    getswiper() {
      var swiper = new Swiper("#home .swiper-container", {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
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
    document.getElementsByTagName("title")[0].innerText = "主页";

    this.img_list = ["5.jpg", "6.jpg", "7.jpg"];
    // var loginDate=localStorage.loginDate;
    //     if(!loginDate || loginDate==null || loginDate==undefined){
    //         this.$router.push('/login')
    //     }
    // if(!this.$store.state.loginDate || this.$store.state.loginDate=='' || this.$store.state.loginDate==null || this.$store.state.loginDate==undefined){
    //     this.$router.push('/login')
    // }
    console.log(this.$store.state.loginDate);
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
#home {
  height: 100%;
  overflow: auto;
  .mui-content {
    padding: 44px 0px 0px 0px;
  }
}
#home .mui-bar {
  background: $header_background;
}

#home .mui-title {
  color: #ffffff;
}

#home .box_header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 2;
  line-height: initial;
  height: 44px;
  background: $header_background;
  display: flex;
  > li:nth-child(1) {
    width: 0.45rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #ffffff;
    span {
      font-size: 12px;
      line-height: 12px;
      display: block;
    }
    i {
      font-size: 0.2rem;
    }
  }
  > li:nth-child(2) {
    display: flex;
    align-items: center;
    > div {
      align-items: center;
      display: flex;
      background: #ffffff;
      height: 30px;
      border-radius: 30px;
      opacity: 0.6;
      > div:nth-child(1) {
        margin: 0px 10px;
      }
    }
    input {
      margin: 0px;
      padding: 0px;
      border: none;
      height: 100%;
      background: none;
    }
  }
  > li:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 44px;
    color: #ffffff;
    span {
      font-size: 0.12rem;
      line-height: 12px;
      display: block;
    }
    i {
      font-size: 0.2rem;
    }
  }
  > li:nth-child(4) {
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffffff;
    span {
      font-size: 0.12rem;
      line-height: 12px;
      display: block;
    }
    i {
      font-size: 0.2rem;
    }
  }
}

#home .banyuan {
  position: relative;
  z-index: 1;

  div {
    position: absolute;
    width: 100%;
    height: 20px;
    background: #ffffff;
    position: absolute;
    bottom: -10px;
    left: 0px;
    // border-top-left-radius: 100%;
    // border-top-right-radius: 100%;
    border-radius: 50%;
  }
}

#home .swiper-slide {
  height: 1.2rem;
}

#home .swiper-slide img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

#home .swiper-pagination-bullet-active {
  background: $header_background;
}

#home .box_2 {
  display: flex;
  flex-wrap: wrap;
  background: #ffffff;
  text-align: center;
  font-size: 0.14rem;
  > li {
    width: calc(100% / 5);
    margin: 0.2rem 0px 0px;
  }
  .img_box {
    width: 0.4rem;
    height: 0.4rem;
    margin: 0px auto 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

#home .box_3 {
  margin: 0px 0px 10px;
  display: flex;
  background: #ffffff;
  text-align: center;
  padding: 0px 0px 5px 0px;
  color: #696969;
  > li {
    width: calc(100% / 3);
    height: 35px;
    line-height: 35px;
    margin: 0px 10px;
  }
  .active {
    color: rgba(231, 106, 73, 1);
    border-bottom: 3px solid rgba(231, 106, 73, 1);
  }
}

#home .box_4 ul {
  margin: 0.15rem 0px;
  background: #ffffff;
  display: flex;
  > li:nth-child(1) {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    padding: 10px 20px 0px 20px;
    .title_1 {
      width: 100%;
      font-size: 0.16rem;
    }
    .dizhi {
      width: 100%;
      color: #696969;
      font-size: 0.14rem;
      .Fraction {
        color: red;
        margin: 0px 0px 0px 5px;
      }
    }
    .text_1 {
      width: 100%;
      color: rgba(92, 137, 203, 1);
      font-size: 0.14rem;
    }
  }
  > li:nth-child(2) {
    width: 1px;
    flex-shrink: 0;
    background: #efeff4;
    position: relative;
    > div:nth-child(1) {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      background: #efeff4;
      top: -0.1rem;
      left: -0.1rem;
      border-radius: 50%;
    }
    > div:nth-child(2) {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      background: #efeff4;
      bottom: -0.1rem;
      left: -0.1rem;
      border-radius: 50%;
    }
  }
  > li:nth-child(3) {
    display: flex;
    align-items: center;
    padding: 0px 0rem 0px 0.13rem;
    > div {
      width: 0.4rem;
      position: relative;
      img {
        width: 100%;
      }
      span {
        position: absolute;
        top: 0.2rem;
        bottom: 0px;
        left: 0px;
        right: 0px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
  > li:nth-child(4) {
    padding: 0.1rem;
    > div:nth-child(1) {
      width: 0.45rem;
      height: 0.45rem;
      border: 2px red solid;
      border-radius: 50%;
      font-size: 0.1rem;
      text-align: center;
      line-height: initial;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 0px auto;
      > div:nth-child(2) {
        position: absolute;
        width: 0.2rem;
        height: 5px;
        background: #ffffff;
        bottom: -2px;
        left: 0px;
        right: 0px;
        margin: auto;
      }
    }
    > div:nth-child(2) {
      width: 0.5rem;
      height: 0.2rem;
      font-size: 0.12rem;
      line-height: 0.2rem;
      color: #ffffff;
      background: red;
      border-radius: 0.2rem;
      text-align: center;
      margin: 5px 0px 0px;
    }
  }
}
</style>
