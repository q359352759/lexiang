<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">乐享生活</h1>
    </header>

    <div class="mui-content">

			<div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div>
          <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div>
          <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>

      <ul class="box_2">
        <li @click="test()" v-for="x in type_list">{{x}}</li>
      </ul>

      <ul class="box_3">
        <li>
          <div class="img_box">
            <img src="@/assets/image/1.png" alt="">
          </div>
          <div class="text_box">
            传奇：该单独给梅西一座金球 其他人去争另一个
          </div>
        </li>
        <li>
            <div class="img_box">
              <img src="@/assets/image/1.png" alt="">
            </div>
            <div class="text_box">
              传奇：该单独给梅西一座金球 其他人去争另一个
            </div>
        </li>
      </ul>


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
  data(){
    return{
      header_img:[
        {'url':'1.png'},
        {'url':'1.png'},
        {'url':'1.png'}
      ],
      type_list:['热门','搞笑','养生','私房','八卦','科技','财经','汽车','生活','时尚','育儿','旅游','职场','美食','历史','教育','星座','体育','军事','游戏','萌宠']
    }
  },
  methods:{
    test(){
      console.log(1231)
    },
    //申请代理人
    ApplicationAgent(){
      this.$router.push('/ApplicationAgent')
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
      var swiper = new Swiper('.swiper-container', {
        loop : true,
        autoplay:true,
        pagination: {
          el: '.swiper-pagination',
        },

        // virtual: {
        //   slides: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'],
        //   renderSlide:function(slide, index){
        //     return '<div class="swiper-slide">索引是'+index+'+内容是'+slide+'</div>';
        //   },
        // },
    });
      // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function () {
      // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
      // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
      // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
      // console.group('destroyed 销毁完成状态===============》');
    }
};
</script>
<style>
  #home .mui-bar{
    background: rgba(39, 172, 110, 1)
  }
  #home .mui-title{
    color: #ffffff;
  }
  #home .swiper-pagination-bullet-active{
    background: rgba(39, 172, 110, 1)
  }

  #home .box_2{
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
  }
  #home .box_2 li{
    width: calc(100% / 7);
    text-align: center;
    color: rgba(39, 172, 110, 1);
    border-bottom: 1px solid #efeff4;
    height: 0.35rem;
    line-height: 0.35rem;
    position: relative;
  }
  #home .box_2 li::after{
    position: absolute;
    content: '';
    width: 1px;
    height: 50%;
    background: #efeff4;
    top: 25%;
    left: 0px;
  }

  #home .box_3{
    margin: 0.04rem 0px 0px;
  }
  #home .box_3 li{
    display: flex;
    padding: 0.1rem;
    background: #ffffff;
    margin: 0px 0px 1px 0px;
  }
  #home .box_3 .img_box{
    width: 1.16rem;
    height: 0.77rem;
    margin: 0px 0.15rem 0px 0px;
  }
  #home .box_3 .img_box img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #home .box_3 .text_box{
    font-size: 0.14rem;
  }


</style>