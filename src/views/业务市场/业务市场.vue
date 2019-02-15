<template>
    <div id="market">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">业务市场</h1>
        </header>
        <div class="排序 active" v-show="筛选定位">
            <dangepaixu @click.native="选择类型(item)" v-for="(item, index) in 排序列表" :key="index" :name="item.name" :type="item.type"/>
        </div>
        <div class="mui-content mui-fullscreen"  @scroll="content_scroll($event)">
            <div class="swiper-container box_1" ref="横幅">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                        <img :src="x" alt="">
                        <!-- <div></div> -->
                    </div>
                    <!-- <div class="swiper-slide"><img src="@/assets/image/6.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="@/assets/image/7.jpg" alt=""></div> -->
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>

            <!-- <div class="banyuan">
                <div></div>
            </div> -->

            <ul class="box_2">
                <li v-if="index<9" v-for="(x,index) in 店铺类型" :key="index">
                    <div class="img_box" @click="$router.push('/yewushichang/dianpufenlei?id='+x.id+'&name='+x.name)">
                        <img :src="x.logo" alt="">
                    </div>
                    <span>{{x.name}}</span>
                </li>
                <li @click="$router.push('/yewushichang/quanbuleixin')" v-if="店铺类型.length>9">
                    <div class="img_box">
                        <img src="image/fenlei/10.png" alt="">
                    </div>
                    <span>更多</span>
                </li>
            </ul>

            <div ref="box_4定位"></div>

            <div class="排序">
                <dangepaixu @click.native="选择类型(item)" v-for="(item, index) in 排序列表" :key="index" :name="item.name" :type="item.type"/>
            </div>

            <ul class="box_4">
                <li v-for="(item, index) in 招募信息.list" :key="index">
                    <div>
                        <img :src="item.店铺信息.signboard">
                    </div>
                    <div>
                        <h1>{{item.店铺信息.name}}</h1>
                        <h2>
                            <div class="mui-pull-right">
                                <i class="icon iconfont icon-location"></i>
                                {{item.distance | 过滤位置}}
                            </div>
                            <div class="text">{{item.店铺信息.address}}</div>
                        </h2>
                        <h3>
                            <div class="mui-pull-right">
                                <i class="icon iconfont icon-renqi"></i>
                                {{item.popularity ? item.popularity : 0}}
                            </div>
                            <div class="text">业务：{{item.新cbonum | 过滤类型}}</div>
                        </h3>
                        <h4>
                            <div class="mui-pull-right qiandai">
                                <i class="icon iconfont icon-yongjin1"></i>
                                {{item.mincommissionscale}}%
                            </div>
                            <div>
                                <span>招募：</span>
                                <div class="progress_1">
                                    <span>{{item.nowrecruitment}}人</span>
                                    <span class="mui-pull-right">{{item.allrecruitment}}人</span>
                                    <div :style="{'width':item.nowrecruitment/item.allrecruitment+'%'}"></div>
                                </div>
                                <span class="xingxing">
                                    <i class="icon iconfont icon-shoucangdianjihou"></i>
                                    5.0
                                </span>
                            </div>
                        </h4>
                    </div>
                </li>
            </ul>
            <loading :loadingtype="招募信息.loading" :nodata="!招募信息.loading && 招募信息.total==0" :end="!招募信息.loading && 招募信息.total!=0 && 招募信息.list.length>=招募信息.total"/>

        </div>
    </div>
</template>

<script>
import { openloading , get_url } from "@/assets/js/currency.js";

import loading from "@/components/loading.vue";
import { api_查询招募列表 , api_获取自定义业务 } from "@/api/招募接口.js";
import { api_根据shopid查询店铺 } from "@/api/店铺接口.js";

import { mapGetters , mapActions } from "vuex";

import dangepaixu from "@/components/单个排序.vue";
export default {
    name: "",
    components: {
        loading,
        dangepaixu
    },
    data() {
        return {
            滚动条位置:'',
            筛选定位:false,
            排序列表:[
                {name:'人气',type:1,order:"popularity"},
                {name:'距离',type:0,order:"distance"},
                {name:'佣金',type:0,order:"mincommissionscale"},
                {name:"评价",type:0,order:"scoreAvg"}
            ],
            img_list: [],
            店铺类型:[],
            招募信息:{
                loading:true,
                page_index:0,
                list:[],
                total:0,
                query:{
                    start:0,
                    length:10,
                    areaCode:'',
                    state: 1,
                    upx: "",
                    upy: "",
                    order:'popularity', //人气 popularity 距离 distance 佣金 mincommissionscale 评价 scoreAvg 
                    orderType: "DESC"    //DESC ASC
                },
            }
        };
    },
    computed: {
        ...mapGetters({
            代理人信息:'agent/代理人信息',
            当前位置:'当前位置',
            分销类型:'myshops/分销/分销类型'
        })
    },
    filters: {
        过滤位置(距离){
            if (!距离) return "";
            return 距离>0.5 ? 距离.toFixed(1)+'km' : 距离.toFixed(1)*1000+'m'
            // return data.replace("米", "m").replace("公里", "km");
        },
        过滤类型(arr){
            var list=[];
            arr.forEach(x=>{
                if(x.cbotype){
                    list.push(x.cbotype)
                }else if(x.name){
                    list.push(x.name)
                }
            })
            return list.join('、');
        }  
    },
    methods: {
        ...mapActions({
            获取代人信息:"agent/获取代人信息",
            获取位置:'获取位置/获取位置',
            查询分销类型:'myshops/分销/查询分销类型'
        }),
        选择类型(item){
            if(this.招募信息.query.order==item.order){
                item.type=item.type==1 ? 2 : 1;
                this.招募信息.query.orderType=item.type==1 ? 'DESC' : 'ASC';
            }else{
                this.排序列表.forEach(x => {
                    if(x==item){
                        x.type=1;
                    }else{
                        x.type=0;
                    }
                });
                this.招募信息.query.orderType='DESC';
                this.招募信息.query.order=item.order;
            }
            this.招募信息.total=0;
            this.招募信息.list=[];
            this.招募信息.page_index=0;
            this.查询招募列表();
        },
        content_scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            this.滚动条位置 = t;
            if (this.$refs.box_4定位.offsetTop - 44 <= e.target.scrollTop) {
                this.筛选定位 = true;
            } else {
                this.筛选定位 = false;
            }
            if (h + t >= sh - 10 && !this.招募信息.loading && this.招募信息.list.length<this.招募信息.total){
                this.招募信息.page_index++;
                this.查询招募列表()
            }
        },
        //点击分类跳转详情
        MarketDetails(x) {
            console.log(x);
            if (x.name == "更多") {
                this.$router.push("/classification");
            } else {
                this.$router.push("/MarketDetails");
            }
        },
        getswiper() {
            var swiper = new Swiper(this.$refs.横幅, {
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
        },
        新cbonum(cbonum){
            // return new Promise((resolve, reject) => {
                var list=cbonum ? cbonum.split(',') : [];
                var newlist=[]
                list.forEach(x=>{
                    var r=get_url(this.分销类型,x)
                    var obj=r[r.length-1]
                    newlist.push(obj);
                })
                // resolve(newlist)
                return newlist;
            // });
        },
        查询招募列表(){
            this.招募信息.loading=true;
            this.招募信息.query.areaCode=this.代理人信息.areaCode;
            this.招募信息.query.start=this.招募信息.page_index*this.招募信息.query.length;
            this.招募信息.query.upx = this.当前位置.x;
            this.招募信息.query.upy = this.当前位置.y;
            // this.招募信息.query.upy = 30.67794285;
            
            api_查询招募列表(this.招募信息.query).then(x=>{
                if(x.data.code==200){
                    var list=x.data.data.data
                        list.forEach(item=>{
                            item.店铺信息={}
                            item.新cbonum=this.新cbonum(item.cbonum);
                            api_根据shopid查询店铺(item.shopid).then(r=>{
                                item.店铺信息=r.data.code==200 ? r.data.data : {};
                            })
                            var query={
                                start:0,
                                length:10,
                                shopid:item.shopid
                            }
                            api_获取自定义业务(query).then(r=>{
                                if(r.data.code==200){
                                    item.新cbonum=item.新cbonum.concat(r.data.data.data)
                                }
                            })
                        })
                    this.招募信息.list=this.招募信息.list.concat(list);
                    this.招募信息.total=x.data.data.total;
                }
                this.招募信息.loading=false
            }).catch(err=>{
                this.招募信息.loading=false
            })
        },
        async 初始化(){
            openloading(true)
            if(!this.当前位置 || this.当前位置.x=='' || this.当前位置.y==''){
                await this.获取位置();
            }
            if(!this.代理人信息){
                await this.获取代人信息();
            }
            if(!this.分销类型 || this.分销类型.length==0){
                await this.查询分销类型();
            }

            this.查询招募列表();
            openloading(false);
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
        this.初始化()
        this.img_list = ["image/home_11.jpg", "image/home_12.jpg", "image/home_13.jpg", "image/home_14.jpg"];
        try {
            this.店铺类型 = JSON.parse(localStorage.shops_tree_list);
        } catch (error) { }



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
    },
    watch: {
        img_list() {
            this.$nextTick(function () {
                console.log("数据渲染完成");
                this.getswiper();
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.排序{
    height: 37px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >div{
        width: 25%;
    }
}
.排序.active{
    position: fixed;
    width: 100%;
    top: 44px;
    left: 0px;
    z-index: 1;
}


#market .box_1 .swiper-slide {
    height: 1.1rem;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
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
        border-radius: 50%;
    }
}

#market .box_2 {
    background: #ffffff;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 12px;
    padding: 0px 0px 0.1rem;
    margin: 0px 0px 5px;
    li {
        width: 20%;
        div {
            color: #ffffff;
            font-size: 0.22rem;
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
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
    }
}


.box_4 {
    background: #ffffff;
    > li {
        padding: 8px;
        border-bottom: 1px solid #efefef;
        display: flex;
        > div:nth-child(1) {
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
            margin: 0px 0.09rem 0px 0px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        > div:nth-child(2) {
            flex-grow: 1;
            width: 0;
        }
        h1 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 0.5rem;
        }
        h2 {
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
            }
        }
        h3 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
                color: #d43030;
            }
        }
        h4 {
            font-weight: 400;
            font-size: 0.1rem;
            .progress_1 {
                display: inline-block;
                width: 1rem;
                height: 0.13rem;
                line-height: 0.13rem;
                position: relative;
                background: #e9cdcd;
                border-radius: 0.13rem;
                color: #ffffff;
                padding: 0px 3px;
                margin: 0px 0.1rem 0px 0px;
                span {
                    position: relative;
                    z-index: 1;
                }
                div {
                    position: absolute;
                    height: 100%;
                    border-radius: 0.13rem;
                    background: #e33c64;
                    top: 0px;
                    left: 0px;
                }
            }
            .xingxing {
                color: #d43030;
                i {
                    color: #f8d40c;
                }
            }
            .qiandai {
                color: #d43030;
            }
        }
    }
}
</style>
