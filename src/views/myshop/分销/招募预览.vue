<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{店铺.name}}</h1>
            <div class="分享" @click="分享()">
                <i class="icon iconfont icon-fenxiang2"></i>
            </div>
        </header>
        <div class="mui-content mui-fullscreen" >
            
            <div class="店铺信息">
                <div class="店铺logo">
                    <img :src="店铺.signboard" alt="" srcset="">
                </div> 
                <ul class="左侧内容">
                    <li class="文本1">
                        <span class="类型">{{店铺类型_1}}</span>
                        <span class="距离"><i class="icon iconfont icon-location"></i>{{距离 | 过滤距离}}</span>
                    </li>
                    <li class="地址">{{店铺.address}}</li>
                    <li class="人气">人气：{{店铺.popularity ? 店铺.popularity : 0}}</li>
                    <li class="招募">
                        <div class="招募进度">
                            <span class="文本2">招募：</span>
                            <div class="进度">
                                <p ref="超赞" class="mui-progressbar 超赞" data-progress="20">
                                    <span :style="{'transform':'translate3d('+(招募信息.nowrecruitment/招募信息.allrecruitment-100)+'%, 0px, 0px)'}"></span>
                                </p>
                            </div>
                            <span class="人数">{{招募信息.nowrecruitment}}/{{招募信息.allrecruitment}}人</span>
                        </div>
                        <div class="申请按钮">申请</div>
                    </li>
                </ul>
            </div>

            <ul class="列表">
                <li class="标题">业务类型</li>
                <li class="文本">{{业务类型_1}}</li>
            </ul>

            <ul class="列表">
                <li class="标题">招募理由：</li>
                <li class="文本">未设置</li>
            </ul>

            <ul class="列表">
                <li class="标题">
                    <span>店铺展示：</span>
                    <span class="数量">{{img_1.length}}张图</span>
                </li>
                <div class="swiper-container 店铺图片" ref="店铺图片">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide item" v-for="(x, index) in img_1" :key="index">
                            <img :src="x" alt="" srcset="">
                        </div>
                    </div>
                </div>
            </ul>

            <ul class="列表">
                <li class="标题">
                    <span>分销商品：</span>
                    <!-- <span class="数量">9张图</span> -->
                </li>
                <div class="swiper-container 分销商品" ref="分销商品">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide item" v-for="(x, index) in img_2" :key="index">
                            <div class="图片容器">
                                <img v-if="x.img && x.img.split(',').length>0" :src="x.img.split(',')[0]" alt="" srcset="">
                            </div>
                            <div class="商品名">{{x.name}}</div>
                            <div class="金额">
                                <span>￥{{x.sellingPrice}}</span>
                                <span>佣金：{{x.commission ? x.commission : (x.sellingPrice*招募信息.mincommissionscale/100).toFixed(2)}}元</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>

            <ul class="列表">
                <li class="标题">分销员职责：</li>
                <li class="文本">{{招募信息.position}}</li>
            </ul>
            <ul class="列表">
                <li class="标题_1">
                    <span>分销员要求：</span>
                    <span v-show="招募信息.hasexperience==0">无需从业经验、</span>
                    <span v-show="招募信息.hasexperience==1">有从业经验、</span>
                    <span v-show="招募信息.sex==0">性别不限、</span>
                    <span v-show="招募信息.sex==1">男、</span>
                    <span v-show="招募信息.sex==2">女、</span>
                    <span>年龄{{招募信息.minage}}-{{招募信息.maxage}}岁</span>
                </li>
            </ul>
            <div class="编辑页" v-html="招募信息.leaflets"></div>
        </div>
    </div>
</template>

<script>
import { get_url ,openloading} from "@/assets/js/currency.js";
import { mapGetters , mapActions ,mapMutations } from "vuex";
export default {
    name:"",
    data () {
        return {
            swiper_1:'',
            swiper_2:'',
            img_2:[],
            shopid:'',
            商品列表:[],
            距离:""
        }
    },
    computed: {
        ...mapGetters({
            店铺:'get_myshop',
            店铺类型:'shops_tree_list',      //三级分类
            招募信息:'myshops/分销/招募信息',
            分销类型:'myshops/分销/分销类型',
            自定义业务:'myshops/分销/自定义业务',
            当前位置: '当前位置'
        }),
        店铺类型_1(){
            try {
                var 类型=get_url(this.店铺类型, this.店铺.shopType);    
                var list=[];
                    类型.forEach(item => {
                        list.push(item.name);
                    });
            } catch (error) {
                var list=[];
            }
            return list.join('/');
        },
        新cbonum(){
            var list=this.招募信息.cbonum ? this.招募信息.cbonum.split(',') : [];
            var newlist=[]
            list.forEach(x=>{
                var r=get_url(this.分销类型,x)
                var obj=r[r.length-1]
                newlist.push(obj);
            })
            return newlist
        },
        业务类型_1(){
            var list=[]
            this.新cbonum.forEach(item=>{
                if(item && item.cbotype){
                    list.push(item.cbotype)
                }
            })
            this.自定义业务.forEach(item=>{
                list.push(item.name)
            })
            return list.join('、')
        },
        img_1(){
            var list=this.店铺.environmentalImg ? this.店铺.environmentalImg.split(',') : [];
            return list;
        }
    },
    filters: {
        过滤距离(data) {
            return data.replace("米", "m").replace("公里", "km");
        }  
    },
    methods: {
        ...mapMutations({
            获取店铺分类:'setShopTree'
        }),
        ...mapActions({
            查询店铺:'getMyshop',
            查询分销类型:'myshops/分销/查询分销类型',
            查询自定义业务:'myshops/分销/查询自定义业务',
            获取位置: '获取位置/获取位置',
        }),
        分享(){
            mui.toast("预览页面不能分享", { duration: "long", type: "div" });
        },
        获取商品(){
            var query={
                    start:0,
                    length:100,
                    shopid:this.店铺.shopid,
                    state:1
                }
            this.$axios.get('/api-s/shops/commodity/findAll',{params:query}).then(x=>{
                if(x.data.code==200){
                    this.img_2=x.data.data.data;
                }
            }).catch(err=>{})
        },
        查询距离() {
            if (!this.$store.state.my_position.y) {
                return;
            }
            var obj = {
                destinations:this.当前位置.y +"," +this.当前位置.x, //起点
                origins: this.店铺.y + "," + this.店铺.x
            };
            this.$axios({ method: "get", url: "/api-u/baidu/routematrix", params: obj }).then(x => {
                if (x.data.status == 0 && x.data.result.length > 0) {
                    this.距离 = x.data.result[0].distance.text;
                }
            }).catch(err => {});
        },
        async 初始化(){
            openloading(true)
            if(!this.店铺类型){
                this.获取店铺分类()
            }
            if(!this.自定义业务 || this.自定义业务.length==0){
                this.查询自定义业务()
            }
            if (!this.当前位置 || this.当前位置.x == '' || this.当前位置.y == '') {
                await this.获取位置();
            }
            if(!this.店铺 || !this.店铺.shopid){
                await this.查询店铺()
            }
            this.查询距离()
            this.获取商品();
            openloading(false);
        }
    },
    mounted () {
        this.shopid=this.$route.query.shopid;
        this.初始化()
        var this_1=this;
        this.swiper_1= new Swiper(this.$refs.店铺图片, {
            // loop: true,
            // autoplay: true,
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 6,
            initialSlide: 1,
            on: {
                init() {},
                slideChange: function(){}
            }
        });
        this.swiper_2= new Swiper(this.$refs.分销商品, {
            // loop: true,
            // autoplay: true,
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 6,
            initialSlide: 1,
            on: {
                init() {},
                slideChange: function(){
                    
                }
            }
        });
    },
    watch: {
        img_2(){
            this.$nextTick(function(){
                setTimeout(x=>{
                    this.swiper_1.slideTo(0, 0, false); //切换到第一个slide，速度为1秒
                    this.swiper_2.slideTo(0, 0, false); //切换到第一个slide，速度为1秒
                },300)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-bar{
    .mui-title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .分享{
        line-height: 44px;
        position: absolute;
        top:0px;
        right: 10px;
        color: #ffffff;
    }
}
.店铺信息{
    padding: 8px 10px;
    margin: 5px 0px 0px;
    background: #ffffff;
    display: flex;
    .店铺logo{
        width: 106px;
    	height: 80px;
        margin: 0px 8px 0px 0px;
        flex-shrink: 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .左侧内容{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        width: 0;
        justify-content: space-between;
    }
    .文本1{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .类型{
            width: 0;
            flex-grow: 1;
            color: rgba(56, 56, 56, 1);
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .距离{
            flex-shrink: 0;
            white-space: nowrap;
            color: rgba(166, 166, 166, 1);
        	font-size: 10px;
        }
    }
    .地址{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(56, 56, 56, 1);
    	font-size: 10px;
        padding: 0px 40px 0px 0px;
    }
    .人气{
        color: rgba(80, 80, 80, 1);
    	font-size: 10px;
    }
    .招募{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .招募进度{
            display: flex;
            align-items: center;
            flex-grow: 1;
            margin: 0px 30px 0px 0px;
            .文本2{
                color: rgba(80, 80, 80, 1);
            	font-size: 10px;
                white-space: nowrap;
            }
            .进度{
                flex-shrink: 1;
                flex-grow: 1;
            	height: 9px;
                margin: 0px 3px;
                p {
                    border-radius: 10px;
                    margin: 0px 0px 0px;
                    height: 100%;
                    background: rgba(229, 229, 229, 1);
                    span {
                        background: #fc7154;
                    }
                }
            }
            .人数{
                white-space: nowrap;
                color: rgba(80, 80, 80, 1);
            	font-size: 8px;
            }
        }
        .申请按钮{
            flex-shrink: 0;
            width: 50px;
        	height: 22px;
            border:1px solid rgba(0, 122, 255, 1);
            font-size: 12px;
            color: rgba(0, 122, 255, 1);
            line-height: 20px;
            text-align: center;
            border-radius: 22px;
        }
    }
}

.列表{
    background: #ffffff;
    margin: 3px 0px 0px;
    padding: 1px 0px;
    .标题{
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px;
        height: 28px;
        border-bottom: 1px solid rgba(246, 246, 246, 1);
        .数量{
            color: rgba(166, 166, 166, 1);
        	font-size: 10px;
        }
    }
    .标题_1{
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        height: 28px;
        border-bottom: 1px solid rgba(246, 246, 246, 1);
    }
    .文本{
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        padding: 10px 10px 15px;
    }
    .店铺图片{
        margin: 7px 10px 10px;
        height: 90px;
        .item{
            width: 120px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .分销商品{
        margin: 7px 10px 10px;
        .item{
            background: rgba(246, 246, 246, 1);
            width:154px;
            .图片容器{
            	height: 115px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .商品名{
                color: rgba(80, 80, 80, 1);
            	font-size: 12px;
                padding: 0px 8px;
            }
            .金额{
                display: flex;
                justify-content: space-between;
                color: rgba(212, 48, 48, 1);
            	font-size: 10px;
                padding: 0px 8px 5px;
            }
        }
    }

}

</style>
