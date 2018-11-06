<template>
    <div id="BusinessDetails">
       <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">{{this.$store.state.isweixin ? '' : '商家展示厅'}}</h1>
            <span class="header_1">
                <i :class="{'active':isCollection}" @click="Collection()" class="icon iconfont icon-shoucang1"></i>
                <i class="icon iconfont icon-fenxiang"></i>
            </span>
		</header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>
                    <h1>商家名字商家名字商家名字（商家地址商家地址商家地址商家地址）</h1>
                    <h2>营业时间：07:00-20：00</h2>
                    <h2>（商家地址商家地址商家地址商家地址）</h2>
                </li>
                <li>
                    <h1>4.5分</h1>
                    <h2><i class="icon iconfont icon-dianhua"></i></h2>
                </li>
                <li>
                    <button>买单</button>
                    <h1>
                        <i class="icon iconfont icon-daohang"></i>
                        0.5KM
                    </h1>
                </li>
            </ul>

            <div class="box_2">
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
            </div>
            
            <ul class="box_3">
                <li>
                    <span @click="change_type(0)" :class="{'active':type_1==0}">红包</span>
                </li>
                <li>
                    <span @click="change_type(1)" :class="{'active':type_1==1}">优购</span>
                </li>
                <li>
                    <span @click="change_type(2)" :class="{'active':type_1==2}">评价</span>
                </li>
                <li>
                    <span @click="change_type(3)" :class="{'active':type_1==3}">服务/环境</span>
                </li>
            </ul>

            
            <div class="mui-slider mui-slider_1">
                <div class="mui-slider-group">
                    <div class="mui-slider-item">
                        <ul class="box_4">
                            <li>
                                <div>
                                    <div class="bg"></div>
                                    <h1>店铺通用红包</h1>
                                    <h2>领取</h2>
                                    <h3>30元</h3>
                                    <h4>
                                        <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                                    </h4>
                                    <h5>
                                        <div>每满100抵10</div>
                                        <div>每周限领一次</div>
                                    </h5>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div class="bg"></div>
                                    <h1>店铺通用红包</h1>
                                    <h2>领取</h2>
                                    <h3>30元</h3>
                                    <h4>
                                        <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                                    </h4>
                                    <h5>
                                        <div>每满100抵10</div>
                                        <div>每周限领一次</div>
                                    </h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mui-slider-item">
                    具体内容1
                    </div>
                    <div class="mui-slider-item">
                    具体内容2
                    </div>
                    <div class="mui-slider-item">
                    具体内容3
                    </div>
                    <div class="mui-slider-item">
                    具体内容4
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
export default {
    name:'',
    data(){
        return{
            isCollection:false,   //收藏
            img_list: [], //轮播图
            type_1:0,
            slider:''
        }
    },
    methods:{
        Collection(){
            this.isCollection=!this.isCollection
        },
        //图片轮播
        getswiper() {
            var swiper = new Swiper("#BusinessDetails .swiper-container", {
                loop: true,
                // autoplay: true,
                slidesPerView : 3,
                spaceBetween : 5,
                // pagination: {
                //     el: ".swiper-pagination"
                // }
            });
        },
        //选择类型
        change_type(x){
            this.type_1=x;
            this.slider.gotoItem(x);
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
        var this_1=this;
        document.getElementsByTagName("title")[0].innerText = "商家展示厅";

        this.img_list = ["5.jpg", "6.jpg", "7.jpg"];
        this.slider= mui('.mui-slider_1').slider({
            // scrollY: true, //是否竖向滚动
            // scrollX: true, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            // deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
            // bounce: true //是否启用回弹
        })
        document.querySelector('.mui-slider_1').addEventListener('slide', function(event) {
            console.log(event.detail.slideNumber)
            this_1.type_1=event.detail.slideNumber;
        })
        // this.slider.gotoItem(1);
        

    
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
        document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
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
}
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#BusinessDetails {
    height: 100%;
    .mui-content{
        background: #ffffff;
    }
}
#BusinessDetails .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#BusinessDetails .mui-title {
    color: #ffffff;
}

#BusinessDetails .header_1{
    font-size: 17px;
    font-weight: 500;
    line-height: 44px;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    padding: 0px 10px;
    color: #ffffff;
    i{
        margin: 0px 5px;
    }
    i.active{
        color: #e0fd00;
    }
}

#BusinessDetails .box_1{
    display: flex;
    padding: 0.15rem;
    border-bottom: 1px solid #F1F1F1;
    >li:nth-child(1){
        // flex: 1;
        // width: 0;
        overflow: hidden;
        h1{
            font-weight: 100;
            font-size: 0.15rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
            margin: 0px;
        }
        h2,
        h3{
            color: #9F9F9F;
            font-weight: 100;
            font-size: 0.12rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0.15rem 0px 0px;
        }
    }
    >li:nth-child(2){
        flex-shrink: 0;
        // width: 100px;
        margin: 30px 0.15rem 0px;

        h1{
            font-weight: 100;
            font-size: 0.12rem;
            color: red;
            margin: 0px;
        }
        h2{
            margin: 0.15rem 0px 0px;
            font-weight: 100;
            font-size: 0.14rem;
        }
    }
    >li:nth-child(3){
        text-align: center;
        flex-shrink: 0;
        button{
            background: #EB6E38;
            width: 0.5rem;
            height: 0.25rem;
            padding: 0px;
            color: #ffffff;
            border: none;
            border-radius: 0.25rem;
            font-size: 0.12rem;
        }
        h1{
            font-size: 0.12rem;
            color: #363636;
            margin: 0.32rem 0px 0px;
        }
    }
}

#BusinessDetails .box_2{
    padding:10px 30px;
    border-bottom: 1px solid #F0F0F0;
    .swiper-slide{
        height: 80px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

#BusinessDetails .box_3{
    border-bottom:  1px solid #F0F0F0;
    display: flex;
    li{
        width: 25%;
        text-align: center;
        span{
            display: inline-block;
            line-height: 44px;
            position: relative;
            font-size: 0.14rem;
            color: #B0B0B0;
            padding: 0px 5px;
        }
        span.active{
            color: #F26633;
            border-bottom: 2px solid #F26633;
        }
    }
}

#BusinessDetails .box_4{
    display: flex;
    flex-wrap: wrap;
    padding: 1px 8px;
    >li{
        width: 50%;
        padding:15px 8px;
        >div{
            color: #ffffff;
            background: #E06D68;
            border-radius: 5px;
            text-align: center;
            padding: 1px 0px;
            position: relative;
            .bg{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 55px;
                background: #E05C57;
                border-bottom-left-radius: 100%;
                border-bottom-right-radius: 100%;
            }
            h1{
                position: relative;
                z-index: 1;
                font-size: 0.12rem;
                font-weight: 100;
                margin: 10px;
            }
            h2{
                position: relative;
                z-index: 1;
                width: 0.4rem;
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.12rem;
                text-align: center;
                background: #EB6F39;
                border-radius: 100%;
                box-shadow: 0px 0px 2px 2px #d26535;
                margin: 5px auto;
            }
            h3{
                font-size: 0.14rem;
                margin: 0.1rem 0px;
            }
            h4{
                margin: 0px auto;
                max-width: 1rem;
                height: 0.5rem;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            h5{
                color: #ffffff;
                font-size: 0.12rem;
                margin: 0.1rem 0px;
            }
        }
    }
}

</style>
