<template>
    <div id="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <!-- <header class="mui-bar mui-bar-nav">
            <div class=""></div>
            <h1 class="mui-title">乐享生活</h1>
        </header> -->
        <ul class="box_header">
                <li>
                    <div>
                        <div>
                            <i class="icon iconfont icon-iconfontscan"></i>
                        </div>
                    </div>
                </li>
                <li>
                    <div @tap="SearchShop()">
                        <div>
                            <i class="icon iconfont icon-chazhao"></i>
                        </div>
                        <input type="text" readonly>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <i class="icon iconfont icon-31erweima"></i>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <i class="icon iconfont icon-31xiaoxi"></i>
                        </div>
                    </div>
                </li>
            </ul>
        <!-- <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">测试</h1>
            <span @tap="SearchShop()" class="sousuo mui-pull-right"><i class="icon iconfont icon-chazhao"></i></span>
        </header> -->

        <div class="mui-content mui-fullscreen" @scroll="content_scroll($event)" > 
            
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
                <li v-if="index<9" v-for="(x,index) in type_list" :key="index" @click="ShopClassification(x)">
                    <div class="img_box">
                        <img :src="x.logo" alt="">
                    </div>
                    <span>{{x.name}}</span>
                </li>
                <li @click="classification()" v-if="type_list.length>9">
                    <div class="img_box">
                        <img src="image/fenlei/10.png" alt="">
                    </div>
                    <span>更多</span>
                </li>
            </ul>
            
            <div ref="box_4"></div>
            <ul class="box_3" :class="{'active':box_3_actvie}">
                <li @click="change_type_1(1)" :class="{'active':type_1==1}">红包</li>
                <li @click="change_type_1(2)" :class="{'active':type_1==2}">优购</li>
                <li @click="change_type_1(3)" :class="{'active':type_1==3}">商家</li>
            </ul>
            <ul class="box_3" v-show="box_3_actvie">
                <li @click="change_type_1(1)" :class="{'active':type_1==1}">红包</li>
                <li @click="change_type_1(2)" :class="{'active':type_1==2}">优购</li>
                <li @click="change_type_1(3)" :class="{'active':type_1==3}">商家</li>
            </ul>
            
            <div class="box_4"  v-if="type_1==1">
                <!-- <ul v-for="(x, index) in list_2" :key="index" @click="BusinessDetails()">
                    <li>
                        <div class="title_1">
                            一米阳光(富顺店)
                        </div>
                        <div class="dizhi">
                            <span>保利国际</span>
                            <span class="mui-pull-right">
                                <i class="icon iconfont icon-location"></i>0.5km</span>
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
                </ul> -->
            </div>
            
            <!-- 商品 -->
            <ul class="box_5" v-if="type_1==2">
                <li v-for="(item, index) in commodity.list" :key="index" @click="CommodityDetails(item)">
                    <div>
                        <div class="img_box">
                            <img v-if="item.img" :src="item.img.split(',')[0]" alt="" srcset="">
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
            <loading v-if="type_1==2" :loadingtype="commodity.loading" :nodata="!commodity.loading && commodity.total==0" :end="!commodity.loading && commodity.total!=0 && commodity.list.length==commodity.total"/>

            <!-- 商家 -->
            <ul class="box_6" v-if="type_1==3">
                <li v-for="(item, index) in shop.list" :key="index">
                    <div  @click="BusinessDetails(item)">
                        <img :src="item.signboard" alt="" srcset="">
                    </div>
                    <div>
                        <h1  @click="BusinessDetails(item)">{{item.name}}</h1>
                        <h2>
                            <span @click="weixinmaptest(item)" class="mui-pull-right"><i class="icon iconfont icon-location"></i>{{item.juli | filter_juli}}</span>
                            <div @click="BusinessDetails(item)">{{item.address}}</div>
                        </h2>
                        <h3 @click="BusinessDetails(item)">
                            <span class="mui-pull-right"><i class="icon iconfont icon-hongbao1"></i></span>
                            <span>好评：5分</span>
                        </h3>
                    </div>
                </li>
            </ul>
            <loading v-if="type_1==3" :loadingtype="shop.loading" :nodata="!shop.loading && shop.total==0" :end="!shop.loading && shop.total!=0 && shop.list.length==shop.total"/>


        </div>
        
    </div>
</template>

<script>
// import Swiper from 'swiper';
import { openloading, bd_decrypt,GetDistance } from "@/assets/js/currency";
import loading from "@/components/loading.vue";
export default {
    name: "home",
    components: {
        loading
    },
    data() {
        return {
            box_3_actvie:false,
            img_list: [], //轮播图
            // type_list: [
            //     { url: "image/fenlei/1.jpg", name: "直购", path: "" },
            // ],
            type_1: 1,
            list_2: [1],
            commodity:{     //商品
                start:0,
                length:10,
                state:1,    //已上架
                total:0,
                list:[],
                loading:true,
                page_index:0,
            },
            shop:{      //商家
                start:0,
                length:10,
                state:1,        //通过了的
                list:[],
                total:0,
                loading:true,
                page_index:0,
            },
            my_position:{           //我的位置模拟数据
                x:"",         
                y:""
            }
        };
    },
    computed:{
        //店铺类型
        type_list(){
            return this.$store.state.shops_tree_list
        },
        shop_list(){
            var this_1=this
            var list=this.shop.list;
            for(var i=0;i<list.length;i++){
                var position=bd_decrypt(list[i].x,list[i].y);
                list[i].juli=GetDistance(position.lat,position.lng,this.my_position.x,this.my_position.y)
            }
            return list
        },
        
    },
    filters:{
        //
        filter_juli(data){
            return data.replace('米','m').replace('公里','km')
        }
    },
    methods: {
        //跳转搜索
        SearchShop(){
            this.$router.push('/SearchShop');
        },
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
            if(this.$refs.box_4.offsetTop-44<=e.target.scrollTop){
                this.box_3_actvie=true;
            }else{
                this.box_3_actvie=false;
            }
            if (h + t >= sh - 10) { 
                if(this.type_1==2){
                    if(!this.commodity.loading && this.commodity.list.length<this.commodity.total){
                        this.commodity.page_index++;
                        this.get_commodity()
                    }
                }else if(this.type_1==3){
                    if(!this.shop.loading && this.shop.list.length<this.shop.total){
                        this.shop.page_index++;
                        this.get_shop();
                    }
                }
                console.log("到底底部");
            }
        },
        //跳转微信内置地图
        weixinmaptest(item) {
            var ditu = bd_decrypt(item.y,item.x);
            console.log(ditu);
            wx.openLocation({
                latitude: ditu.lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: ditu.lng, // 经度，浮点数，范围为180 ~ -180。
                name: item.name, // 位置名
                address: item.address, // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        //跳转更多
        classification(){
            this.$router.push('/classification')
        },
        //跳转商家详情
        BusinessDetails(x) {
            this.$router.push("/BusinessDetails?id="+x.id);
        },
        //点击了分类
        ShopClassification(x) {
            this.$router.push('/ShopClassification?id='+x.id+'&name='+x.name);
        },
        //选择类型
        change_type_1(x) {
            this.type_1 = x;
        },
        test() {
            console.log(1231);
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
        },
        //获取商品列表
        get_commodity(){
            var obj={
                start:this.commodity.page_index*this.commodity.length,
                length:this.commodity.length,
                state:this.commodity.state,
            }
            this.commodity.loading=true;
            this.$axios({
                method:'get',
                url:'/api-s/shops/commodity/findAll',
                params:obj
            }).then(x=>{
                console.log('获取商品列表',x);
                this.commodity.list=this.commodity.list.concat(x.data.data.data);
                this.commodity.total=x.data.data.total;
                this.commodity.loading=false;
            }).catch(err=>{
                console.log(err);
                this.commodity.loading=false;
            })
        },
        //查询店铺
        get_shop(){
            var this_1=this;
            var obj={
                    start:this.shop.page_index*this.shop.length,
                    length:this.shop.length,
                    state:this.shop.state
                };
            this.shop.loading=true;
            this.$axios({
                method:'get',
                url:'/api-s/shops/findAll',
                params:obj
            }).then(x=>{
                console.log('查询店铺',x);
                var list=x.data.data.data;
                for(var i=0;i<list.length;i++){
                    list[i].juli='';
                    this_1.juli(list[i])
                }
                this.shop.list=this.shop.list.concat(list);
                this.shop.total=x.data.data.total;
                this.shop.loading=false
            }).catch(err=>{
                console.log(err);
                this.shop.loading=false;
            })
        },
        //获取位置
        juli(item){
            // setTimeout(()=>{
                // x.juli=10
            // },3000)
            if(!this.$store.state.my_position.y){
                return;
            }
            var obj={
                destinations:this.$store.state.my_position.y+','+this.$store.state.my_position.x,         //起点
                origins:item.y+','+item.x
            }
            this.$axios({
                method:'get',
                url:'/api-u/baidu/routematrix',
                params:obj
            }).then(x=>{
                // console.log(x);
                if(x.data.status==0 && x.data.result.length>0){
                    item.juli=x.data.result[0].distance.text    //text 分为单位有米、公里两种
                }
            }).catch(err=>{
                console.log(err)
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
        var this_1=this;
        this.img_list = ["home_1.jpg", "home_2.jpg", "home_3.jpg","home_4.jpg"];
        
        
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
                //获取商家
                this_1.get_shop();
            },{ enableHighAccuracy: true })
        }else{
             this_1.get_shop();
        }
        
        //获取商品
        this.get_commodity();

        // if(this.$store.state.shops_tree_list==0){
        //     this.$store.commit('setShopTree');
        // }



        // console.log(bd_decrypt(104.106786,30.551658))
        // console.log('距离',GetDistance('30.54597190965101','104.10019997537563','30.673811094216354','104.06147620271696'))
        // this.$axios({
        //     method:'get',
        //     url:'http://api.map.baidu.com/routematrix/v2/driving?output=json&destinations={参数1}&origins={参数2}&ak=hGVFfKSy2aTqvO4iR3B2ogiu'
        // }).then(x=>{
        //     console.log('百度查询结果',x)
        // }).catch(err=>{
        //     console.log('百度查询结果',err)
        // })


        //获取当前位置的坐标
        // wx.getLocation({
        //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //     success: function (res) {
        //         // var latitude = res.latitude;    // 纬度，浮点数，范围为90 ~ -90
        //         // var longitude = res.longitude;  // 经度，浮点数，范围为180 ~ -180。
        //         // var speed = res.speed;          // 速度，以米/每秒计
        //         // var accuracy = res.accuracy;    // 位置精度
        //     }
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
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        img_list() {
            this.$nextTick(function() {
                // console.log("数据渲染完成");
                this.getswiper();
            });
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/css/config.scss";
#home {
    // height: 100%;
    // overflow: auto;
    .mui-content {
        padding: 44px 0px 0px 0px;
        // height: 100%;
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
    z-index: 11;
    line-height: initial;
    height: 44px;
    background: $header_background;
    backface-visibility: hidden;
    display: flex;
    > li:nth-child(1) {
        margin: 0px 12px;
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
        flex-grow: 1;
        > div {
            width: 100%;
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
        color: #ffffff;
        margin: 0px 12px;
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
        margin: 0px 12px 0px 0px;
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
        height: 10px;
        background: #ffffff;
        position: absolute;
        bottom: -5px;
        left: 0px;
        // border-top-left-radius: 100%;
        // border-top-right-radius: 100%;
        border-radius: 50%;
    }
}

#home .swiper-slide {
    // height: 1.2rem;
    font-size: 0px;
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
    padding: 0px 0px 10px;
    > li {
        width: calc(100% / 5);
        margin: 0.08rem 0px 0px;
    }
    .img_box {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0px auto 5px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }
}

#home .box_3 {
    margin: 0px 0px 10px;
    display: flex;
    background: #ffffff;
    text-align: center;
    padding: 0px 0.44rem 5px 0.44rem;
    color: #696969;
    > li {
        width: calc(100% / 3);
        height: 35px;
        line-height: 35px;
    }
    .active {
        color: rgba(231, 106, 73, 1);
        border-bottom: 3px solid rgba(231, 106, 73, 1);
    }
}
#home .box_3.active{
    position: fixed;
    top: 44px;
    left: 0px;
    width: 100%;
    z-index: 2;
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
            font-size: 0.14rem;
        }
        .dizhi {
            width: 100%;
            color: #a6a6a6;
            font-size: 0.12rem;
            .Fraction {
                color: red;
                margin: 0px 0px 0px 5px;
            }
            i{
                font-size: 0.1rem;
            }
        }
        .text_1 {
            width: 100%;
            color: #00baad;
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
            border: 2px #FF5733 solid;
            color: #FF5733;
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
            width: 0.4rem;
        	height: 0.14rem;
            font-size: 0.12rem;
            line-height: 0.12rem;
            color: #ffffff;
            background:#FF5733;
            border-radius: 0.2rem;
            text-align: center;
            margin: 5px 0px 0px;
        }
    }
}

#home .box_5{
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

#home .box_6{
    margin: 5px 0px 0px;
    >li{
        display: flex;
        background: #ffffff;
        padding: 0.08rem 0.1rem;
        border-bottom: 1px solid #E5E5E5;
        >div:nth-child(1){
            flex-shrink: 0;
            width: 0.77rem;
            height: 0.58rem;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        >div:nth-child(2){
            margin: 0px 0px 0px 8px;
            width: 0;
            flex-grow: 1;
            h1{
                margin: 0px;
                font-weight: 400;
                color: rgba(80, 80, 80, 1);
                font-size: 0.14rem;
                 white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h2{
                margin: 8px 0px 8px;
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
            	font-size: 0.12rem;
                div{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            h3{
                font-weight: 400;
                color: rgba(212, 48, 48, 1);
            	font-size: 0.12rem;
                margin: 0px;
            }
        }
        
    }
}



#home .QRCode_box{
    position: absolute;
    left: -100%;
    .content_1{
        position: relative;
        z-index: 1;
        background: #ffffff;
        width: 270px;
        padding: 17px 25px 15px 25px;
        .title_1{
            display:flex;
            .img_box{
                width: 40px;
                height: 40px;
                margin: 0px 14px 0px 0px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .userName{
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
            }
            .text{
                color: rgba(80, 80, 80, 1);
            	font-size: 10px;
            }
        }
        .erweima_box{
            width: 200px;
            height: 200px;
            margin: 28px auto 0px;
            position: relative;
            div{
                width: 100%;
                height: 100%;
            }
            img{
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 0;
            }
            .head_img{
                position: absolute;
                width: 50px;
                height: 50px;
                border-radius: 5px;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                margin: auto;
                z-index: 1;
            }
        }
        .tishi{
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
            text-align: center;
            margin: 14px 0px 0px;
        }
    }
}

#home .QRCode{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    .mask{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
    }
    .content_1{
        >img{
            width: 100%;
        }
        position: relative;
        z-index: 1;
        background: #ffffff;
        width: 270px;
        // padding: 17px 25px 15px 25px;
        .close_1{
            width: 36px;
            height: 50px;
            position: absolute;
            top: -50px;
            right: 0px;
            >div:nth-child(1){
                height: 36px;
                text-align: center;
                line-height: 36px;
                background: #ffffff;
                border-radius: 100%;
                position: relative;
                z-index: 1;
            }
            >div:nth-child(2){
                position: absolute;
                width: 1px;
                height: 100%;
                background: #ffffff;
                top: 0px;
                right: 0px;
                left: 0px;
                margin: 0px auto;
            }
        }
        .title_1{
            display:flex;
            .img_box{
                width: 40px;
                height: 40px;
                margin: 0px 14px 0px 0px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .userName{
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
            }
            .text{
                color: rgba(80, 80, 80, 1);
            	font-size: 10px;
            }
        }
        .erweima_box{
            width: 200px;
            height: 200px;
            margin: 28px auto 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .tishi{
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
            text-align: center;
            margin: 14px 0px 0px;
        }
    }
}
</style>
