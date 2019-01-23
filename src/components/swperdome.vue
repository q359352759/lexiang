<template>
    <div>
         <div class="swiper-container gallery-top">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in imglist" :key="index">
                    <div class="img_box">
                        <img :src="item" alt="">
                    </div>                    
                </div>
            </div>
            <!-- Add Arrows -->
        </div>
        <!-- <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in img_list" :key="index">
                    <img :src="item" alt="">
                </div>
            </div>
        </div> -->

    </div>
</template>

<script>
export default {
  props: {
    imglist: {
      // type:String,
      // required:true,
      default: []
    },
    index: {
      default: 0
    }
  },
  data() {
    return {
      // img_list:['']
      galleryTop: ""
    };
  },
  methods: {},
  mounted() {
    // var galleryThumbs = new Swiper('.gallery-thumbs', {
    //     spaceBetween: 10,
    //     slidesPerView: 4,
    //     loop: true,
    //     freeMode: true,
    //     loopedSlides: 5, //looped slides should be the same
    //     watchSlidesVisibility: true,
    //     watchSlidesProgress: true,
    // });
    this.galleryTop = new Swiper(".gallery-top", {
      observer: true,
      observeParents: true,
      // spaceBetween: 10,
      // loop:true,
      slidesPerView: "auto",
      initialSlide: 1
      // thumbs: {
      //     swiper: galleryThumbs,
      // },
    });
    console.log(this.index);
    this.galleryTop.slideTo(this.index, 0, false); //切换到第一个slide，速度为1秒
  },
  watch: {
    index() {
      console.log(this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
.img_box {
  img {
    width: 100%;
  }
}
</style>
