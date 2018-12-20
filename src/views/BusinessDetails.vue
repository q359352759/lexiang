<template>
    <div id="BusinessDetails">
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @tap="back_1()" class="back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">商家展示厅</h1>
            <span class="title_header_1">
                <div>
                    <i :class="{'icon-shoucangdianjihou shouchang':UserFavorite,'icon-shoucang1':!UserFavorite}" @click="Collection()" class="icon iconfont"></i>
                </div>
                <div @click="fenxiang()">
                    <i class="icon iconfont icon-fenxiang2"></i>
                </div>
            </span>
        </header>
        <div class="mui-content mui-fullscreen"  @scroll="content_scroll($event)">
            <ul class="box_1">
                <li>
                    <div class="title_1">{{shop.name}}</div>
                    <div class="fenshu">5分</div>
                    <div>
                        <button @tap="Check()" class="maidan">买单</button>
                    </div>
                </li>
                <li>
                    <div class="time_1">营业时间：{{shop.openTime}}-{{shop.closeTime}}</div>
                </li>
                <li>
                    <div class="address">{{shop.address}}</div>
                    <div>
                        <a class="phone" :href="'tel:'+shop.phone"><i class="icon iconfont icon-dianhua"></i></a></h2>
                    </div>
                    <div @tap="weixinmap()" class="juli">
                        <i class="icon iconfont icon-daohang"></i>
                        <span>{{juli | filter_juli}}</span>
                    </div>
                </li>
            </ul>
            
            <div class="box_6">
                <div class="left_1">
                    <div>
                        <div class="swiper-container swiper_type">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(x, index) in swiper_type_list" :key="index">
                                    <div class="img"><img v-if="x.logo" :src="x.logo" alt="" srcset=""></div>
                                    <div class="name_1">{{x.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="swiper_type_list.length>6">
                        <i class="mui-icon mui-icon-forward"></i>
                    </div>
                </div>
                <ul class="right_1">
                    <li class="dangao" @tap="shengri()">
                        <img src="image/dangao.png" alt="" srcset="">
                    </li>
                    <li class="hongbao" @tap="ShopRedEnvelopes()">
                        <img src="image/hongbao_1.png" alt="" srcset="">
                    </li>
                </ul>
            </div>

            <ul class="box_7">
                <li>
                    <i class="icon iconfont icon-laba"></i>
                </li>
                <li>
                    <marquee class="noticeText ng-binding" direction="left" behavior="scroll" scrolldelay="20" truespeed scrollamount="1"  width="100%" style="width: 100%;">{{(shopAnnouncement && shopAnnouncement.remark) ? shopAnnouncement.remark : '恭喜'+(shop.name ? shop.name : '')+'成功开通数字店铺'}}</marquee>
                </li>
            </ul>

            <div class="box_2">
                <div class="swiper-container swiper_img">
                    <div class="swiper-wrapper">
                        <!-- <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div> -->
                        <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                            <img @tap="fangda_img(index)" :src="x" alt="">
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>

            <div ref="box_3"></div>
            <ul class="box_3" :class="{'active':box_3_actvie}">
                <li><span @click="change_type(0)" :class="{'active':type_1==0}">专享</span></li>
                <li><span @click="change_type(1)" :class="{'active':type_1==1}">优购</span></li>
                <li><span @click="change_type(2)" :class="{'active':type_1==2}">评价</span></li>
                <li><span @click="change_type(3)" :class="{'active':type_1==3}">简介</span></li>
            </ul>
            <ul class="box_3" v-show="box_3_actvie">
                <li><span @click="change_type(0)" :class="{'active':type_1==0}">专享</span></li>
                <li><span @click="change_type(1)" :class="{'active':type_1==1}">优购</span></li>
                <li><span @click="change_type(2)" :class="{'active':type_1==2}">评价</span></li>
                <li><span @click="change_type(3)" :class="{'active':type_1==3}">简介</span></li>
            </ul>

            <!--专享-->
            <ul class="box_4" v-if="type_1==0">
                <li v-for="(item, index) in Exclusive.list" :key="index" @tap="CommodityDetails_1(item)">
                    <div class="img_box">
                        <img v-if="item.comImg && item.comImg.split(',').length>0" :src="item.comImg.split(',')[0]" alt="" srcset="">
                    </div>
                    <div class="text_box">
                        <div>
                            <div class="title_1">{{item.comName}}</div>
                            <div class="money">
                                <span>￥{{item.comSellingPrice}}</span>
                                <s>{{item.comMarketPrice}}</s>
                            </div>
                        </div>
                        <div class="dikou">
                            <i class="icon iconfont icon-hongbao1"></i>
                            <span>抵扣：￥{{item.comDeduction}}</span>
                        </div>
                    </div>
                    <div class="fengexian">
                    </div>
                    <div class="zhuanxiang">
                        <img v-if="item.type==0" src="image/xingren.png" alt="">
                        <img v-if="item.type==1" src="image/shengri1.png" alt="">
                        <div>
                            <i class="icon iconfont icon-shengji"></i>
                            <span>
                                <!-- {{item.deduction}}{{item.comDeduction}}——————————  -->
                                {{Math.floor(item.deduction*100-item.comDeduction*100)/100}}元
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <loading v-if="type_1==0" :loadingtype="Exclusive.loading" :end="!Exclusive.loading && Exclusive.list.length!=0" :nodata="!Exclusive.loading && Exclusive.list.length==0" :text="'该店铺未发布专享商品'"/>


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
                <li class="mui-text-center"></li>
            </div>
            <loading v-if="type_1==2" :nodata="true" :text="'暂无评论'"/>


            <ul v-if="type_1==3">
                <li v-if="synopsis && synopsis.remark" v-html="synopsis.remark"></li>
            </ul>

            <div class="swper_box" v-if="swperdome" >
                <div class="mask" @tap="close_swper()"></div>
                <div>
                    <swperdome :imglist="img_list" :index="swper_index"/>
                </div>
            </div>

            <!-- 生成带图片的容器 -->
            <div ref="printMe" class="qrcode_box">
                <div class="header_1">
                    <div class="img_box">
                        <img v-if="erweima_base64" :src="erweima_base64" alt="" srcset="">
                    </div>
                    <div class="text_1" ref="zoom_box">
                        <div ref="fontsize_1">{{shop.name}}</div>
                        <div ref="fontsize_2">{{shop.address}}</div>
                    </div>
                </div>
                <div class="erweima">
                    <img v-if="erweima_base64" :src="erweima_base64" alt="">
                    <div ref="qrcode">
                        <!-- <img src="" alt="" srcset=""> -->
                    </div>
                </div>
                <ul class="footer_1">
                    <li>恭候尊驾，这厢有礼！</li>
                    <li>识别二维码领取<span class="hongbao">{{xingren_hongbao.amount}}</span>红包</li>
                </ul>
            </div>
            
            <div class="QRCode" v-show="qrcode_show" @tap="qrcode_show=false">
                <div class="mask"></div>
                <div class="content_1">
                    <div class="close_1">
                        <div @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                        <div></div>
                    </div>
                    <img :src="qrcode" alt="" srcset="">
                </div>
            </div>
        </div>

        <xinrenhongbao v-if="xinrenhongbao_box && isfenxiang" :shop="shop" :hongbao="xingren_hongbao" @setshow="setxinrenhongbao_show"/>

    </div>
</template>

<script>

import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2';

import swperdome from '@/components/swperdome.vue';
import {openloading, bd_decrypt,getDateStr} from "@/assets/js/currency.js";
import loading from "@/components/loading.vue"

import xinrenhongbao from '@/components/home/myshop/xinrenhongbao.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "",
    components: {
        loading,
        swperdome,
        xinrenhongbao
    },
    data() {
        return {
            //分享进入店铺
            xinrenhongbao_box:false,
            isxinren:false,         //是否领取了信任红包

            swper_index:0,
            swperdome:false,
            box_3_actvie:false,
            isCollection: false, //收藏
            img_list: [], //轮播图
            // swiper_type:[], //服务类型列表
            swiper_type:'', 
            type_list:[],
            type_1: 0,
            slider: "",
            id:'',
            shop:{},
            shopid:'',
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
            synopsis:{},         //店铺简介
            shopAnnouncement:{},    //公告
            redenvelope_5:'',   //生日红包 
            userInfo:'',        //用户信息
            UserFavorite:'',    //用户收藏信息
            add_hongbao_obj:{   //等待添加的红包对象
                userid:'',      //红包id
                envelopeId:'',  
                state:'0',              //状态(使用等等)  0 刚领取
                type:5,
                startTime:'',           //生日使用有效期
                endTime:'',
            },
            Exclusive:{         //专享商品
                loading:true,
                list:[]
            },       

            qrcode:null,
            qrcode_show:false,
            erweima_base64:'',
            xingren_hongbao:{},
            // isfenxiang:false
        };
    },
    computed:{
        ...mapGetters({
            state_isfenxiang:'shop/isfenxiang'
        }),
        //实名认证信息
        findByUserid(){    
            return this.$store.state.findByUserid;
        },
        //过滤后的服务
        swiper_type_list(){
            if(this.type_list && this.shop.serviceType){
                var serviceType=this.shop.serviceType.split(',')
                var type_list=this.type_list;
                var list=[]
                for(var i=0;i<type_list.length;i++){
                    for(var j=0;j<serviceType.length;j++){
                        if(type_list[i].id==serviceType[j]){
                            list.push(type_list[i])
                        }
                    }
                }
                return list;
            }else{
                return []
            }
        }
    },
    filters:{
        //
        filter_juli(data){
            return data.replace('米','m').replace('公里','km')
        }
    },
    methods: {
        //显示新人红包弹出框
        setxinrenhongbao_show(x){
            console.log('收到参数',x)
            this.xinrenhongbao_box=x;
        },
        //
        back_1(){
            //二维码进入
            var backUrl=sessionStorage.backUrl
            if(this.isfenxiang || backUrl){
                this.$router.push('/home')
            }else{
                history.back()
            }
        },
        //动态设置字体大小
        set_font_size(e,size){
            console.log(e.clientWidth);
            console.log(e.offsetWidth)
            console.log(e.scrollWidth)
            if(e.clientWidth<e.scrollWidth){
                e.style['font-size']=parseInt(e.clientWidth/e.scrollWidth*size)+'px';
            }
        },
        //生产二维码
        fenxiang(){
            console.log('生成二维码');
            if(this.qrcode){
                this.qrcode_show=true;
            }else{
                this.set_font_size(this.$refs.fontsize_1,14)
                this.set_font_size(this.$refs.fontsize_2,12)
                // return;
                openloading(true);
                //图片地址转图片
                this.$axios({
                    method:'post',
                    url:'/api-u/users/imgtobase64',
                    data: this.$qs.stringify({
                        url:this.shop.signboard
                    })
                }).then(x=>{
                    console.log(x);
                    if(x.data.code==200){
                        this.erweima_base64='data:image/jpeg;base64,'+x.data.data;
                        var url=window.location.origin+window.location.pathname+'#/BusinessDetails?shopid='+this.shop.shopid+'&fenxiang=1';
                        var el=this.$refs.qrcode
                            el.innerHTML='';
                        let qrcode = new QRCode(el, {  
                            width: 200,  
                            height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                            // text: 'http://m.lxad.vip/test/dist/index.html#/BusinessDetails?id='+this.shop.id, // 二维码内容  
                            text: url, // 二维码内容  
                            // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                            background: '#fff',
                            foreground: '#fff',
                        })
                        setTimeout(()=>{
                            this.print();
                        },500)
                    }else{
                        openloading(false);
                        mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });                    
                    }
                }).catch(err=>{
                    openloading(false);
                    mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });
                    console.log(err);
                })
            }
        },
        //生成带图片的二维码
        print(){
            const el = this.$refs.printMe;
            const options = {
                useCORS: true,
                logging: false
            }
            html2canvas(el,options).then(canvas => {
                this.qrcode=canvas.toDataURL()
                this.qrcode_show=true;
                openloading(false);
            },{useCORS: true});
        },
        CommodityDetails_1(x){
            this.$router.push('/commodity/CommodityDetails?id='+x.comId)
        },
        //获取专享商品
        findAllExclusive(){
            this.Exclusive.loading=true;
            this.$axios({
                method:'get',
                url:'/api-s/shops/findAllExclusive?start=0&length=1000&shopid='+this.shopid
            }).then(x=>{
                console.log('获取专享商品',x);
                if(x.data.code==200){
                    this.Exclusive.list=x.data.data.data;
                }
                this.Exclusive.loading=false;
            }).catch(err=>{
                console.log(err);
                this.Exclusive.loading=false;
            })
        },
        //跳转买单
        Check(){
            if(!this.userInfo){
                mui.confirm('需要登录才能领取，是否现在去登录。','提示',['取消','是的'],(value)=>{
                    if(value.index==1){
                        if(this.isfenxiang){
                            sessionStorage.backUrl='/BusinessDetails?shopid='+this.shopid+'&fenxiang=1'
                        }else{
                            sessionStorage.backUrl='/BusinessDetails?shopid='+this.shopid;
                        }
                        this.$router.push('/login');
                    }
                })
                return
            }
            this.$router.push('/Check?shopid='+this.shop.shopid)
        },
        //放大图片
        fangda_img(index){
            this.swperdome=true;
            this.swper_index=index;
        },
        //关闭图片放大
        close_swper(){
            this.swperdome=false;
        },
        //领取生日红包
        shengri(){
            if(!this.redenvelope_5){
                mui.toast('该店铺没有发布生日红包。', { duration: "long",type: "div" });
                return
            }else if(!this.userInfo){
                // mui.toast('请先登录才能收藏。',{ duration: "long",type: "div" });
                mui.confirm('需要登录才能领取，是否现在去登录。','提示',['取消','是的'],(value)=>{
                    if(value.index==1){
                        this.$router.push('/login');
                    }
                })
                return;
            }else if(this.userInfo.iaiState!=1){
                mui.confirm('领取生日红包需要实名认证，您还未认证，请先认证。','提示',['取消','去认证'],(value)=>{
                    if(value.index==1){
                        this.$router.push('/RealName');
                    }
                })
            }else{
                mui.confirm('确认将自己的生日信息（不包含年龄）授权给此商铺吗？','提示',['取消','好的'],(value)=>{
                    if(value.index!=1) return; 
                    if(!this.findByUserid){
                        mui.toast('获取实名信息失败，稍后再试。',{ duration: 2000,type: "div" });
                        return;
                    }
                    var birthday=this.findByUserid.birthday;
                    var myDate = new Date();
                    var newdate=myDate.getFullYear()+'-'+birthday.substring(4,6)+'-'+birthday.substring(6);
                    if(newdate>=getDateStr(0)){     //领取今年的
                        this.add_hongbao_obj.startTime=getDateStr(-7,newdate);
                        this.add_hongbao_obj.endTime=getDateStr(7,newdate);
                        this.add_red();
                    }else{      //领取明年的
                        var newdate=(myDate.getFullYear()+1)+'-'+birthday.substring(4,6)+'-'+birthday.substring(6);
                        this.add_hongbao_obj.startTime=getDateStr(-7,newdate);
                        this.add_hongbao_obj.endTime=getDateStr(7,newdate);
                        this.add_red();
                    }
                })
            }
        },
        add_red(){
            this.add_hongbao_obj.userid=this.userInfo.username;
            this.add_hongbao_obj.envelopeId=this.redenvelope_5.id;

            console.log(this.add_hongbao_obj);
            openloading(true);
            this.$axios({
                method:'post',
                url:'/api-s/shops/addUserCardPackge',
                data:this.add_hongbao_obj
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    mui.toast('恭喜您，领取成功。',{ duration: 2000,type: "div" });
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");            
                }
                openloading(false)
            }).catch(err=>{
                console.log(err)
                 mui.toast('系统错误，稍后再试。',{ duration: 2000,type: "div" });
                openloading(false);
            })
        },
        //跳转红包页面
        ShopRedEnvelopes(){
            this.$router.push('/RedEnvelopesList?shopid='+this.shopid)
        },
        //跳转商品详情
        CommodityDetails(x){
            this.$router.push('/commodity/CommodityDetails?id='+x.id);
        },
        //滚动条
        content_scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // event.currentTarget.offsetTop
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
            var ditu = bd_decrypt(this.shop.x,this.shop.y);
            console.log(ditu);
            wx.openLocation({
                latitude: ditu.lat,     // 纬度，浮点数，范围为90 ~ -90
                longitude: ditu.lng,    // 经度，浮点数，范围为180 ~ -180。
                name: this.shop.name,   // 位置名
                address: this.shop.address, // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        //点击收藏和取消
        Collection() {
            // this.isCollection = !this.isCollection;
            if(!this.userInfo){
                mui.toast('请先登录才能收藏。',{ duration: "long",type: "div" });
                return
            }
            if(!this.UserFavorite){
                this.addUserFavorite()
            }else{
                this.deleteUserFavorite()
            }
        },
        //删除收藏
        deleteUserFavorite(){
            this.$axios({
                method:'post',
                url:'/api-s/shops/deleteUserFavorite',
                data:[this.UserFavorite.id]
            }).then(x=>{
                if(x.data.code==200){
                    mui.toast('取消收藏成功。',{ duration: 1000,type: "div" });
                    this.get_findDataUserFavorite()
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //添加收藏
        addUserFavorite(){
            var obj={
                    userid:this.userInfo.username,
                    type:'0',        //收藏类型(0:店铺,1:商品)
                    name:'店铺',        //收藏类型(店铺,商品)
                    shopid:this.shop.shopid,      //商店id
                    commodityid:'',   //商品id
                }
            this.$axios({
                method:'post',
                url:'/api-s/shops/addUserFavorite',
                data:obj,
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    mui.toast('收藏成功。',{ duration: 1000,type: "div" });
                    this.get_findDataUserFavorite()
               }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查询收藏
        get_findDataUserFavorite(){
            var obj={
                    start:0,
                    length:10,
                    userid:this.userInfo.username,
                    shopid:this.shopid
                }
            this.$axios({
                method:'get',
                url:'/api-s/shops/findDataUserFavorite',
                params:obj
            }).then(x=>{
                console.log('查询收藏信息',x);
                if(x.data.code==200){
                    this.UserFavorite=x.data.data.data.length>0 ? x.data.data.data[0] : '';
                }
            }).catch(err=>{
                console.log('查询收藏信息错误',err)
            })
        },
        //图片轮播
        getswiper() {
            var swiper = new Swiper("#BusinessDetails .swiper_img", {
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
            var this_1=this;
            this.$axios({
                method:'get',
                url:'/api-s/shops/findByShopid/'+this.shopid
            }).then(x=>{
                console.log('根据Id查询店铺信息',x);
                if(x.data.code==200){
                    this.shop=x.data.data;
                    this.img_list=x.data.data.environmentalImg ? x.data.data.environmentalImg.split(',') : [];
                    this.get_juli();
                    try {
                        setTimeout(()=>{
                            this_1.swiper_type.slideTo(0, 0, false);//切换到第一个slide，速度为1秒
                        },300)
                    } catch (error) {}
                    if(this.isfenxiang){
                        localStorage.yaoqing='#/Recommend?pid='+this.shop.userid+'&invitationtype=2'
                    }
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
                    shopid:this.shopid
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
        },
        //查询服务类型
        get_type(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/type/findAll?start=0&length=100'
            }).then(x=>{
                console.log('查询服务类型',x);
                this.type_list=x.data.data.data;
            }).catch(err=>{
                console.log(err);
            })
        },
        //获取简介
        get_synopsis(){
            // /shops/synopsis/{shopid}
            this.$axios({
                method:'get',
                url:'/api-s/shops/synopsis/'+this.shopid
            }).then(x=>{
                console.log('店铺简介',x);
                this.synopsis=x.data.data;
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取公告
        get_shopAnnouncement(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/shopAnnouncement/'+this.shopid
            }).then(x=>{
                console.log('获取公告',x);  
                this.shopAnnouncement=x.data.data;
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取生日红包
        // 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
        get_redenvelope_5(){
            var obj={
                    start:0,
                    length:10,
                    type:5,
                    shopid:this.shopid,
                    state:1,
                    ccc:1
                }
            this.$axios({
                method:'get',
                url:'/api-s/shops/redenvelope/findAll',
                params:obj
            }).then(x=>{
                console.log('生日红包',x);
                if(x.data.code==200){
                    if(x.data.data.data.length>0){
                        this.redenvelope_5=x.data.data.data[0]
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //查询店铺新人红包
        get_hongbao(){
            var query={
                    start:0,
                    length:10,
                    ccc:1,
                    type:0,
                    shopid:this.shopid
                }
            return new Promise((resolve, reject) => {
                this.$request('/api-s/shops/redenvelope/findAll',query,'get').then(x=>{
                    console.log('查询店铺新人红包',x);
                    if(x.data.code==200){
                        if(x.data.data.data.length>0){
                            this.xingren_hongbao=x.data.data.data[0]
                        }
                    }
                    resolve();
                }).catch(err=>{
                    console.log(err);
                    resolve();
                })
            });
        },
        //查询用户是否领取该店铺的新人红包
        findEffective(){
            var query={
                    start:0,
                    length:1000,
                    userid:this.userInfo.username,
                    shopid:this.shopid,
                }
            return new Promise((resolve, reject) => {
                this.$axios.get('/api-s/shops/findEffective',{params:query}).then(x=>{
                    console.log('获取用户领取的本店红包',x);
                    if(x.data.code==200){
                        var obj=x.data.data.data.find(item=>item.type==0);
                        if(obj){
                            this.isxinren=true;
                        }
                    }
                    resolve();
                }).catch(err=>{
                    console.log('获取用户领取的本店红包',err)
                    resolve();
                })
            });
        }
        // request('/api-s/shops/findEffective',obj.query,'get').then(x=>{
        //         obj.fc(x.data);
        //     }).catch(err=>{
        //         obj.fc(err)
        //     })
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
        this.shopid=this.$route.query.shopid;
        this.isfenxiang=this.$route.query.fenxiang ? true : false;

        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}

        if(this.userInfo){
            //查询是否收藏
            this.get_findDataUserFavorite();
            //获取实名认证信息
            this.$store.commit('setfindByUserid');
            //等待两个接口同时完成
            openloading(true)
            Promise.all([this.get_hongbao(),this.findEffective()]).then(x=>{
                console.log(11111111111111111111111111111111,this.isxinren,this.xingren_hongbao);
                if(this.isfenxiang && this.state_isfenxiang){
                    if(!this.isxinren && this.xingren_hongbao && this.xingren_hongbao.id){
                        this.xinrenhongbao_box=true;
                    }else{
                        console.log('准备跳转页面');
                        this.$router.push('/Check?shopid='+this.shopid)
                    }
                }
                openloading(false)
            })
        }else{
            //查询店铺新人红包
            openloading(true)
            this.get_hongbao().then(x=>{
                if(this.isfenxiang){
                    if(this.state_isfenxiang && this.xingren_hongbao && this.xingren_hongbao.id){
                        this.xinrenhongbao_box=true;
                    }
                }
                openloading(false)
            })
        }


        this.swiper_type = new Swiper(".swiper_type", {
            // loop: true,
            // autoplay: true,
            observer:true,
            observeParents:true,
            slidesPerView: 6,
            spaceBetween: 0,
            initialSlide :1,
            // pagination: {
            //     el: ".swiper-pagination"
            // }
            on:{
                init(){
                    try {
                        setTimeout(()=>{
                            this_1.swiper_type.slideTo(0, 0, false);//切换到第一个slide，速度为1秒
                        },500)
                    } catch (error) {}
                }
            }
        });


        
        
        //获取专享产品
        this.findAllExclusive();
        //根据id查询商品
        this.get_commodity();
        //查询服务类型
        this.get_type()
        //获取简介
        this.get_synopsis()
        //获取公告
        this.get_shopAnnouncement()
        //获取生日红包
        this.get_redenvelope_5();

        //获取当前位置
        if(!this.$store.state.my_position.x || this_1.$store.state.my_position.x==''){
            try {
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
            } catch (error) {
                this_1.get_shop();
            }
        }else{
            //根据id查询店铺
            this.get_shop();
        }
        
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
        img_list(){
            this.$nextTick(function() {
                console.log("数据渲染完成");
                this.getswiper();
            });
        },
        // swiper_type_list(){
        //     this.swiper_type.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
        // }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#BusinessDetails {
    height: 100%;
    .mui-content {
        // background: #F6F6F6;
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

// 二维码
#BusinessDetails .qrcode_box{
    width: 273px;
    background:#ffffff;
    position: fixed;
    padding: 20px 25px;
    left: -100%;
    // top: 40px;
    .header_1{
        display: flex;
        .img_box{
            width: 42px;
        	height: 42px;
            flex-shrink: 0;
            margin: 0px 5px 0px 0px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .text_1{
            height: 42px;
            width: 0;
            flex-grow: 1;
            color: rgba(80, 80, 80, 1);
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            >div:nth-child(1){
                font-size: 14px;
                overflow: auto;
                white-space: nowrap;
                width: 100%;
            }
            >div:nth-child(2){
                font-size: 12px;
                white-space: nowrap;
                overflow: auto;
                color: #afafaf;
                width: 100%;
            }
        }
    }
    .erweima{
        margin: 20px auto 8px;
        width: 200px;
        height: 200px;
        position: relative;
        >img{
            position: absolute;
            width: 50px;
            height: 50px;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            margin: auto;
            border-radius: 10px;
        }
        >div{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .footer_1{
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        text-align: center;
        .hongbao{
            color: #d43030;
        }
    }
}

#BusinessDetails .QRCode{
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
    }
}




#BusinessDetails .swper_box{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    // background: #000000;
    align-items: center;
    z-index: 11;
    .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: #000000;
    }
}


#BusinessDetails .title_header_1 {
    font-size: 17px;
    font-weight: 400;
    line-height: 44px;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    padding: 0px 10px 0px 0px;
    color: #ffffff;
    display: flex;
    >div{
        margin: 0px 0px 0px 5px;
    }
    i {
        margin: 0px 5px;
    }
    .shouchang {
        color: #e0fd00;
    }
}

#BusinessDetails .box_1 {
    background: #ffffff;
    padding: 7px 13px;
    >li{
        display: flex;
        align-items: center;
        >div:nth-child(1){
            flex-grow: 1;
            width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        >div:nth-child(2){
            width: 45px;
            flex-shrink: 0;
        }
        >div:nth-child(3){
            flex-shrink: 0;
            width: 48px;
            text-align: center;
        }
        .title_1{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .fenshu{
            color: rgba(212, 48, 48, 1);
        	font-size: 10px;
        }
        .maidan{
            margin: 0px;
            padding: 0px;
	        width: 48px;
        	height: 24px;
            border-radius: 24px;
            border: none;
            background: #fc6621;
            font-size: 12px;
            color: #ffffff;
        }
        .time_1{
            color: rgba(166, 166, 166, 1);
        	font-size: 10px;
        }
        .address{
            color: rgba(166, 166, 166, 1);
        	font-size: 10px;
        }
        .phone{
            color: #000000;
            font-size: 14px;
        }
        .juli{
            white-space: nowrap;
            text-align: right;
            i{
                font-size: 14px;
            }
            span{
                color: rgba(166, 166, 166, 1);
	            font-size: 8px;
            }
        }
    }
}

#BusinessDetails .box_7{
    background: #ffffff;
    display: flex;
    height: 37px;
    margin: 3px 0px;
    align-items: center;
    >li:nth-child(1){
        width: 47px;
        flex-shrink: 0;
        text-align: center;
        color: rgba(212, 48, 48, 1);
    }
    >li:nth-child(2){
        flex-grow: 1;
        color: rgba(255, 255, 255, 1);
    	font-size: 14px;
    	background-color: rgba(212, 48, 48, 1);
        height: 32px;
        line-height: 32px;
    }
}

#BusinessDetails .box_6{
    background: #ffffff;
    display: flex;
    padding: 0px 13px 8px 10px;
    .left_1{
        width: 0px;
        flex-grow: 1;
        display:flex;
        align-items: center;
        >div:nth-child(1){
            width: 0px;
            flex-grow: 1;
        }
        >div:nth-child(2){
            min-width: 14px;
            flex-shrink: 0;
            i{
                font-size: 14px;
                color: #c0bcbc;
            }
        }
        .swiper-slide{
            text-align: center;
            .img{
                width: 14px;
                height: 16px;
                margin: 0px auto 2px;
                img{
                    width: 100%;
                    max-height: 100%;
                }
            }
            .name_1{
                color: rgba(56, 56, 56, 1);
            	font-size: 8px;
            }
        }
    }
    .right_1{
        flex-shrink: 0;
        display: flex;
        align-items: center;
        .dangao{
            width: 51px;
        	height: 28px;
            margin: 0px 0px 0px 15px;
            img{
                width: 28px;
            }
        }
        .hongbao{
            width: 48px;
        	height: 28px;
            text-align: center;
            img{
                width: 28px;
            }
        }
    }
}

#BusinessDetails .box_2 {
    background: #ffffff;
    padding: 10px 0.15rem;
    margin: 3px 0px;
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
    padding: 3px 5px;
    > li {
        overflow: hidden;
        background: #ffffff;
        padding: 5px 0px 5px 5px;
        margin: 0px 0px 3px 0px;
        display: flex;
        .img_box{
            width: 96px;
            height: 72px;
            flex-shrink: 0;
            margin: 0px 5px 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_box{
            flex-grow: 1;
            width: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title_1{
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
            }
            .money{
                span{
                    color: rgba(212, 48, 48, 1);
                	font-size: 14px;
                }
                s{
                    color: rgba(166, 166, 166, 1);
                	font-size: 10px;
                }
            }
            .dikou{
                display: flex;
                align-items: center;
                i{
                    color: rgba(224, 28, 4, 1);
                    height: 17px;
                    margin: 0px 3px 0px 0px;
                }
                span{
                    color: rgba(128, 128, 128, 1);
                	font-size: 12px;
                }
            }
        }
        .fengexian{
            width: 1px;
            flex-shrink: 0;
            position: relative;
            border-left: 1px dashed #ff5733;
        }
        .fengexian::after,
        .fengexian::before{
            position: absolute;
            width: 17px;
            height: 17px;
            background: #efeff4;
            border-radius: 100%;
            left:-9px;
            content: '';
        }
        .fengexian::after{
            top: -13px;
        }
        .fengexian::before{
            bottom: -13px;
        }
        .zhuanxiang{
            width: 104px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            img{
                width: 40px;
                height: 40px;
                margin: 0px 0px 4px 0px;
            }
            >div{
                display: flex;
                justify-content: center;
                color: rgba(212, 48, 48, 1);
                i{
                    font-size: 16px;
                }
                span{
                	font-size: 14px;
                }
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

