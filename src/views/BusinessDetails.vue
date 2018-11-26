<template>
    <div id="BusinessDetails">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">商家展示厅</h1>
            <span class="header_1">
                <i :class="{'active':isCollection}" @click="Collection()" class="icon iconfont icon-shoucang1"></i>
                <i class="icon iconfont icon-fenxiang2"></i>
            </span>
        </header>
        <div class="mui-content mui-fullscreen"  @scroll="content_scroll($event)">
            <ul class="box_1">
                <li>
                    <h1>{{shop.name}}</h1>
                    <h2>营业时间：{{shop.openTime}}-{{shop.closeTime}}</h2>
                    <h2>{{shop.address}}</h2>
                </li>
                <li>
                    <h1>5分</h1>
                    <h2>
                        <a :href="'tel:'+shop.phone"><i class="icon iconfont icon-dianhua"></i></a></h2>
                </li>
                <li>
                    <button>买单</button>
                    <h1 @click="weixinmap()">
                        <i class="icon iconfont icon-daohang"></i>
                        {{juli | filter_juli}}
                    </h1>
                </li>
            </ul>

            <div class="box_2">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <!-- <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div> -->
                        <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                            <img :src="x" alt="">
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>

            <div ref="box_3"></div>
            <ul class="box_3" :class="{'active':box_3_actvie}">
                <li><span @click="change_type(0)" :class="{'active':type_1==0}">红包</span></li>
                <li><span @click="change_type(1)" :class="{'active':type_1==1}">优购</span></li>
                <li><span @click="change_type(2)" :class="{'active':type_1==2}">评价</span></li>
                <li><span @click="change_type(3)" :class="{'active':type_1==3}">服务/环境</span></li>
            </ul>
            <ul class="box_3" v-show="box_3_actvie">
                <li><span @click="change_type(0)" :class="{'active':type_1==0}">红包</span></li>
                <li><span @click="change_type(1)" :class="{'active':type_1==1}">优购</span></li>
                <li><span @click="change_type(2)" :class="{'active':type_1==2}">评价</span></li>
                <li><span @click="change_type(3)" :class="{'active':type_1==3}">服务/环境</span></li>
            </ul>


            <ul class="box_4" v-if="type_1==0">
                <li style="windth:100%" class="mui-text-center">开发中</li>
                
                <!-- <li v-for="(item, index) in 1" :key="index">
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
                </li> -->
            </ul>

            <ul class="box_5"  v-if="type_1==1">
                <li v-for="(item, index) in commodity.list" :key="index" @click="CommodityDetails(item)">
                    <div>
                        <div class="img_box">
                            <img v-if="item.img" :src="item.img.split(',')[0]" >
                        </div>
                        <h1>{{item.name}}</h1>
                        <div class="text_1">
                            <div class="xiaoshou">
                                <span>销</span>
                                <span>{{item.sales}}笔</span>
                            </div>
                            <div class="dikou">
                                <i class="icon iconfont icon-hongbao1"></i>
                                <span>抵扣:{{item.deduction}}元</span>
                            </div>
                        </div>
                        <div class="text_2">
                            <span class="xianjia">￥{{item.sellingPrice}}</span>
                            <s class="yuanjia">{{item.marketPrice}}</s>
                        </div>
                    </div>
                </li>
            </ul>
            <loading v-if="type_1==1" :loadingtype="commodity.loading" :nodata="!commodity.loading && commodity.total==0" :end="!commodity.loading && commodity.list.length==commodity.total && commodity.total!=0"/>


            <div v-if="type_1==2">
                <li class="mui-text-center">开发中</li>
            </div>
            <ul v-if="type_1==3">
                <li class="mui-text-center">开发中</li>
            </ul>

            <!-- <div class="mui-slider mui-slider_1">
                <div class="mui-slider-group">
                    <div class="mui-slider-item">
                        <ul class="box_4">
                            <li v-for="(item, index) in 1" :key="index">
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
                        <ul class="box_5">
                            <li v-for="(item, index) in 7" :key="index">
                                <div>
                                    <div class="img_box">
                                        <img v-if="index%3==0" src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                                        <img v-if="index%3==1" src="image/7.jpg" alt="" srcset="">
                                        <img v-if="index%3==2" src="image/6.jpg" alt="" srcset="">
                                    </div>
                                    <h1>英国三谷氨基酸控油去屑止英国三谷氨基酸控油去屑止</h1>
                                    <div class="text_1" v-if="index%2==0">
                                        <div class="xiaoshou">
                                            <span>销</span>
                                            <span>3246笔</span>
                                        </div>
                                        <div class="dikou">
                                            <i class="icon iconfont icon-hongbao1"></i>
                                            <span>抵扣:6元</span>
                                        </div>
                                    </div>
                                    <div class="text_2">
                                        <span class="xianjia">￥35</span>
                                        <s class="yuanjia">60</s>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mui-slider-item">
                        具体内容2
                    </div>
                    <div class="mui-slider-item">
                        具体内容3
                    </div>
                </div>
            </div> -->

        </div>

    </div>
</template>

<script>
import loading from "@/components/loading.vue"
export default {
    name: "",
    components: {
        loading
    },
    data() {
        return {
            box_3_actvie:false,
            isCollection: false, //收藏
            img_list: [], //轮播图
            type_1: 0,
            slider: "",
            id:'',
            shop:{},
            juli:'',
            commodity:{     //商品
                start:0,
                length:10,
                state:1,    //已上架
                total:0,
                list:[],
                loading:true,
                page_index:0,
            },
        };
    },
    filters:{
        //
        filter_juli(data){
            return data.replace('米','m').replace('千米','km')
        }
    },
    methods: {
        //跳转商品详情
        CommodityDetails(x){
            this.$router.push('/CommodityDetails?id='+x.id);
        },
        //滚动条
        content_scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // event.currentTarget.offsetTop
            // console.log('box_4',this.$refs.box_4.offsetTop,e.target.scrollTop)
            // console.log(e)
            if(this.$refs.box_3.offsetTop-44<=e.target.scrollTop){
                this.box_3_actvie=true;
            }else{
                this.box_3_actvie=false;
            }
            if (h + t >= sh - 10) { 
                if(this.type_1==1){
                    if(!this.commodity.loading && this.commodity.list.length<this.commodity.total){
                        this.commodity.page_index++;
                        this.get_commodity()
                    }
                }
                console.log("到底底部");
            }
        },
        //跳转微信内置地图
        weixinmap() {
            var ditu = bd_decrypt(this.shop.y,this.shop.x);
            console.log(ditu);
            wx.openLocation({
                latitude: ditu.lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: ditu.lng, // 经度，浮点数，范围为180 ~ -180。
                name: this.shop.name, // 位置名
                address: this.shop.address, // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        //点击收藏
        Collection() {
            this.isCollection = !this.isCollection;
        },
        //图片轮播
        getswiper() {
            var swiper = new Swiper("#BusinessDetails .swiper-container", {
                // loop: true,
                // autoplay: true,
                slidesPerView: 'auto',
                spaceBetween: 5
                // pagination: {
                //     el: ".swiper-pagination"
                // }
            });
        },
        //选择类型
        change_type(x) {
            this.type_1 = x;
            // this.slider.gotoItem(x);
        },
        //根据Id查询店铺
        get_shop(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/'+this.id
            }).then(x=>{
                console.log('根据Id查询店铺信息',x);
                if(x.data.code==200){
                    this.shop=x.data.data;
                    this.img_list=x.data.data.environmentalImg ? x.data.data.environmentalImg.split(',') : [];
                    this.get_juli();
                    //根据id查询商品
                    this.get_commodity();
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //查询距离
        get_juli(){
            if(!this.$store.state.my_position.y){
                return;
            }
            var obj={
                destinations:this.$store.state.my_position.y+','+this.$store.state.my_position.x,         //起点
                origins:this.shop.y+','+this.shop.x
            }
            this.$axios({
                method:'get',
                url:'/api-u/baidu/routematrix',
                params:obj
            }).then(x=>{
                // console.log(x);
                if(x.data.status==0 && x.data.result.length>0){
                    this.juli=x.data.result[0].distance.text
                }
            }).catch(err=>{
                console.log(err)
            }) 
        },
        //根据店铺查询商品
        get_commodity(){
            // /api-s/shops/commodity/findAll?start=length=shopid=
            var obj={
                    start:this.commodity.page_index*this.commodity.length,
                    length:this.commodity.length,
                    state:this.commodity.state,
                    shopid:this.shop.shopid
                }
            this.commodity.loading=true;
            this.$axios({
                method:'get',
                url:'/api-s/shops/commodity/findAll',
                params:obj
            }).then(x=>{
                console.log('根据店铺查询商品',x);
                this.commodity.list=this.commodity.list.concat(x.data.data.data);
                this.commodity.total=x.data.data.total;
                this.commodity.loading=false;
            }).catch(err=>{
                this.commodity.loading=false;
                console.log(err);
            })
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
        this.id=this.$route.query.id;
        //获取当前位置
        if(!this.$store.state.my_position.x || this_1.$store.state.my_position.x==''){
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                // console.log(r);
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    // this_1.my_position.x=r.point.lng;   
                    // this_1.my_position.y=r.point.lat;
                    this_1.$store.state.my_position.x=r.point.lng;
                    this_1.$store.state.my_position.y=r.point.lat;
                }
            //根据id查询店铺
            this_1.get_shop();
            },{ enableHighAccuracy: true })
        }else{
            //根据id查询店铺
            this.get_shop();
        }
        


        



        // this.img_list = ["5.jpg", "6.jpg", "7.jpg"];
        // this.slider = mui(".mui-slider_1").slider({
        //     // scrollY: true, //是否竖向滚动
        //     // scrollX: true, //是否横向滚动
        //     startX: 0, //初始化时滚动至x
        //     startY: 0, //初始化时滚动至y
        //     indicators: false //是否显示滚动条
        //     // deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        //     // bounce: true //是否启用回弹
        // });
        // document.querySelector(".mui-slider_1").addEventListener("slide", function(event) {
        //     console.log(event.detail.slideNumber);
        //     this_1.type_1 = event.detail.slideNumber;
        // });

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
        // document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
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
#BusinessDetails {
    height: 100%;
    .mui-content {
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

#BusinessDetails .header_1 {
    font-size: 17px;
    font-weight: 400;
    line-height: 44px;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    padding: 0px 10px;
    color: #ffffff;
    i {
        margin: 0px 5px;
    }
    i.active {
        color: #e0fd00;
    }
}

#BusinessDetails .box_1 {
    display: flex;
    padding: 0.15rem;
    border-bottom: 1px solid #f1f1f1;
    > li:nth-child(1) {
        flex: 1;
        width: 0;
        overflow: hidden;
        h1 {
            font-weight: 400;
            font-size: 0.15rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
            margin: 0px;
        }
        h2,
        h3 {
            color: #9f9f9f;
            font-weight: 400;
            font-size: 0.12rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 8px 0px 0px;
        }
    }
    > li:nth-child(2) {
        flex-shrink: 0;
        // width: 100px;
        margin: 25px 0.15rem 0px;

        h1 {
            font-weight: 400;
            font-size: 0.12rem;
            color: red;
            margin: 0px;
        }
        h2 {
            margin: 3px 0px 0px;
            font-weight: 400;
            font-size: 0.14rem;
        }
    }
    > li:nth-child(3) {
        text-align: center;
        flex-shrink: 0;
        button {
            background: #eb6e38;
            width: 0.5rem;
            height: 0.25rem;
            padding: 0px;
            color: #ffffff;
            border: none;
            border-radius: 0.25rem;
            font-size: 0.12rem;
        }
        h1 {
            font-size: 0.12rem;
            color: #363636;
            margin: 17px 0px 0px;
            color: #007aff;
        }
    }
}

#BusinessDetails .box_2 {
    padding: 10px 0.15rem;
    border-bottom: 1px solid #f0f0f0;
    .swiper-slide {
        width: 106px;
        height: 80px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

#BusinessDetails .box_3 {
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    li {
        width: 25%;
        text-align: center;
        span {
            display: inline-block;
            line-height: 44px;
            position: relative;
            font-size: 0.14rem;
            color: #848484;
            padding: 0px 5px;
        }
        span.active {
            color: #f26633;
            border-bottom: 2px solid #f26633;
        }
    }
}
#BusinessDetails .box_3.active {
    position: fixed;
    top: 44px;
    left: 0px;
    width: 100%;
    z-index: 2;
}

#BusinessDetails .box_4 {
    display: flex;
    flex-wrap: wrap;
    padding: 1px 8px;
    > li {
        width: 50%;
        padding: 15px 8px;
        > div {
            color: #ffffff;
            background: #e06d68;
            border-radius: 5px;
            text-align: center;
            padding: 1px 0px;
            position: relative;
            .bg {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 55px;
                background: #e05c57;
                border-bottom-left-radius: 100%;
                border-bottom-right-radius: 100%;
            }
            h1 {
                position: relative;
                z-index: 1;
                font-size: 0.12rem;
                font-weight: 400;
                margin: 10px;
            }
            h2 {
                position: relative;
                z-index: 1;
                width: 0.4rem;
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.12rem;
                text-align: center;
                background: #eb6f39;
                border-radius: 100%;
                box-shadow: 0px 0px 2px 2px #d26535;
                margin: 5px auto;
            }
            h3 {
                font-size: 0.14rem;
                margin: 0.1rem 0px;
            }
            h4 {
                margin: 0px auto;
                max-width: 1rem;
                height: 0.5rem;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            h5 {
                color: #ffffff;
                font-size: 0.12rem;
                margin: 0.1rem 0px;
            }
        }
    }
}

#BusinessDetails .box_5{
    display:flex;
    flex-wrap: wrap;
    padding: 0px 5px;
    >li{
        width: 50%;
        padding: 5px;
        >div{
            background: #ffffff;
        }
    }
    .img_box{
        width: 1.72rem;
        height: 1.29rem;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    h1{
        padding: 0px 0.06rem;
        color: rgba(80, 80, 80, 1);
        font-size: 0.12rem;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .text_1{
        display: flex;
        justify-content: space-between;
        padding: 0px 0.06rem;
        .xiaoshou{
            >span:nth-child(1){
                display: inline-block;
                width: 0.12rem;
                height: 0.12rem;
                font-size: 0.08rem;
                line-height: 0.12rem;
                text-align: center;
                border-radius: 100%;
                background: #ff5733;
                color: #ffffff;
            }
            >span:nth-child(2){
                color: rgba(166, 166, 166, 1);
                font-size: 0.1rem;
            }
        }
        .dikou{
            i{
                color: #fc4c4c;
                font-size: 0.1rem;
            }
            span{
                font-size: 0.1rem;
                color: #fc4c4c;
            }
        }
    }
    .text_2{
        padding: 0px 0.06rem;    
        .xianjia{
            color: #d43030;
            font-size: 0.12rem;
            font-weight: bold;
        }
        .yuanjia{
            font-size: 0.1rem;
            color: #a6a6a6;
            margin: 0px 0px 0px 0.05rem;
        }
    }
}
</style>
