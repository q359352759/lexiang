<template>
    <div id="引导页" class="mui-content mui-fullscreen">
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <!-- <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div> -->
                <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                    <div class="图片框">
                        <img :src="x" alt="">
                    </div>
                </div>
            </div>
            <!-- Add Pagination -->
            <div ref="swiperPagination" class="swiper-pagination"></div>
        </div>
        <div class="跳过" @click="跳转主页()" v-show="!最后一张">跳过</div>
        <div class="按钮框" v-show="最后一张">
            <btn value="立即体验" @click.native="跳转主页()"/>
        </div>
    </div>
</template>

<script>
import btn from '@/components/button.vue'
export default {
    name:"",
    components:{
        btn
    },
    data () {
        return {
            最后一张:false,
            img_list:['image/yingdao_1.jpg','image/yingdao_2.jpg','image/yingdao_3.jpg','image/yingdao_4.jpg','image/yingdao_1.jpg']
        }
    },
    methods: {
        跳转主页(){
            localStorage.diyici=true;
            this.$router.push('/home')
        }  
    },
    mounted () {
        var this_1=this;
        var swiper = new Swiper(this.$refs.swiper, {
            pagination: {
                el: this.$refs.swiperPagination
            },
            on: {
                slideChangeTransitionEnd: function(){
                    if(this.activeIndex==this_1.img_list.length-1){
                        this_1.最后一张=true;
                    }else{
                        this_1.最后一张=false;
                    }
                    console.log(this.activeIndex)
                },
            },
        });
        // this.swiper_type = new Swiper(this.$refs.swiper, {
        //     // loop: true,
        //     // autoplay: true,
        //     observer: true,
        //     observeParents: true,
        //     slidesPerView: 1,
        //     spaceBetween: 0,
        //     initialSlide: 1,
        //     on: {
        //         init() {
        //             try {
        //                 setTimeout(() => {
        //                     this_1.swiper_type.slideTo(0, 0, false); //切换到第一个slide，速度为1秒
        //                 }, 500);
        //             } catch (error) { }
        //         }
        //     }
        // });
    }
}
</script>


<style lang="scss" scoped>
.swiper-slide{
    .图片框{
        width: 100%;
        height: 100%;
        font-size: 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
.跳过{
    width: 48px;
	height: 22px;
    color: rgba(255, 255, 255, 1);
	border: rgba(255, 255, 255, 1) solid 1px;
	border-radius: 22px;
    line-height: 20px;
	font-size: 12px;
    text-align: center;
    position: absolute;
    top: 20px;
    right: 16px;
    z-index: 1;
}
.按钮框{
    width: 100%;
    left: 0px;
    bottom: 8px;
    position: fixed;
    z-index: 1;
}

</style>

<style lang="scss">
#引导页 {
    .swiper-pagination-bullet-active{
        background: rgba(252, 102, 33, 1);
    }
}
</style>

