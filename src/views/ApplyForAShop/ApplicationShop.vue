<template>
    <div id="ApplicationShop">
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">申请开店</h1>
		</header>

        <div class="mui-content mui-fullscreen">
            
            <ul class="mui-table-view box_1">
				<li class="mui-table-view-cell" @click="select_shop_type()">
					<a class="mui-navigate-right">
					    <span>   
                            店铺分类：
                        </span>
                        店铺分类店铺分类店铺分类店铺分类店铺分类店铺分类店铺分类店铺分类店铺分类店铺分类店铺分类店铺分类
					</a>
				</li>
			</ul>
            <ul class="mui-table-view box_1">
				<li class="mui-table-view-cell input_box">
                        <span>店铺名称：</span>
                        <input type="text" v-model="shopname">
				</li>
                <li class="mui-table-view-cell input_box">
                        <span>联系电话：</span>
                        <input type="text">
				</li>
                <li class="mui-table-view-cell" @click="select_region()">
					<a class="mui-navigate-right">
                        <span>店铺区域：</span>
                        {{city[0] ? city[0].name : ''}}
                        {{city[1] ? '/'+city[1].name : ''}}
                        {{city[1] ? '/'+city[2].name : ''}}
					</a>
				</li>
                <li class="mui-table-view-cell" @click="baiduMap('/baiduMap')">
					<a class="mui-navigate-right">
                        <span>店铺地址：</span>
                        {{address}}
					</a>
				</li>
                <li class="mui-table-view-cell" @click="select_time()">
					<a class="mui-navigate-right">
                        <span>营业时间：</span>
                        {{this.$store.state.apply_for_a_shop.creationTime}}{{this.$store.state.apply_for_a_shop.endTime ? '-'+this.$store.state.apply_for_a_shop.endTime : ''}}
					</a>
				</li>
                <li class="mui-table-view-cell" @click="LegalPersonCertification()">
					<a class="mui-navigate-right">
                        <span>法人认证：</span>
                        张三
					</a>
				</li>
                <li class="mui-table-view-cell" @click="BusinessLicense()">
					<a class="mui-navigate-right">
                        <span>营业执照：</span>
                        {{this.$store.state.apply_for_a_shop.shopType==1 ? '个体经营' : '公司经营'}}
					</a>
				</li>
			</ul>
            
            <ul class="box_2">
                <li>
                    <div>商家店招：</div>
                    <div>(400*225)</div>
                </li>
                <li>
                    <div @click="Choice_img(1)" v-if="!logo_url" class="tishi">点击选择图片</div>
                    <span v-if="logo_url"><i class="icon iconfont icon-del"></i></span>
                    <img @click="Choice_img(1)" v-if="logo_url" :src="logo_url" alt="">
                </li>
            </ul>

            <ul class="box_3">
                <li class="title_1">
                    <span>环境图片：(400*225)</span>
                    <span class="mui-pull-right">最多12张，已有{{img_list.length}}张</span>
                </li>
                <li class="lunbo">
                    <div class="left_1" @click="slideNext()">
                        <i  v-show="left" class="mui-icon mui-icon-back"></i>
                    </div>
                    <div class="img_list">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <!-- <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div> -->
                                <!-- <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                                    <img :src="'image/'+x" alt="">
                                </div> -->
                            </div>
                            <!-- Add Pagination -->
                            <!-- <div class="swiper-pagination"></div> -->
                        </div>
                    </div>
                    <div class="right_1" @click="Choice_img(2)">
                        <span>
                            <i class="mui-icon mui-icon-plusempty"></i>
                        </span>
                    </div>
                </li>
            </ul>

            <ul class="box_4">
                <li class="title_1">
                    <span>店铺服务：</span>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    WIFI： 
                                    <div @click="radio(radio_obj.WIFI=!radio_obj.WIFI)" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    停车：
                                    <div @click="radio(radio_obj.parking=!radio_obj.parking)" class="radio_1" :class="{'active':radio_obj.parking}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    休息室：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    游乐区： 
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    沙发位：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    包间：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    洗手间： 
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    存放处：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    宝宝椅：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    可送货： 
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    红包抵扣：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    手机支付：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <ul class="box_4">
                <li class="title_1">
                    <span>店铺红包：</span>
                    <span class="tishi">(顾客首次扫码赠送红包，每客赠送一次)</span>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    WIFI： 
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    停车：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                                <td>
                                    休息室：
                                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_obj.WIFI}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <div class="Agreement">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_Agreement}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <span @click="change_radio_2()"> 我也阅读并同意</span>
                <span @click="RegistrationAgreement()">《用户注册协议》</span>
            </div>

            <button class="btn_1">保存</button>
            <button @click="weixinmaptest()">跳转微信地图测试</button>

        </div>
        

        <div class="Cropper_box" v-show="Cropper_show">
            <div class="cont_1">
                <VueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :fixedBox="option.fixedBox" :canMoveBox="option.canMoveBox" :autoCrop="true" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"></VueCropper>
            </div>
            <ul class="footer_1">
                <li @click="close_1()">
                    <i class="icon iconfont icon-quxiao"></i>
                </li>
                <li @click="rotateLeft()">
                    <i class="icon iconfont icon-xuanzhuan1"></i>
                </li>
                <li @click="rotateRight()">
                    <i class="icon iconfont icon-xuanzhuan"></i>
                </li>
                <li @click="confirm()">
                    <i class="icon iconfont icon-xuanze"></i>
                </li>
            </ul>
        </div>

        <div id="zhengmianInput" class="mui-hidden">
            <input type="file" @change="input_change($event)" accept="image/*" name="" id="">
        </div>

       

    </div>
</template>

<script>
import {openloading , bd_decrypt} from '@/assets/js/currency';
import { VueCropper } from "vue-cropper";
import $ from "jquery"
export default {
    name:'',
    components:{
        VueCropper
    },
    data(){
        return{
            //裁剪框配置
            Cropper_show:false,  //显示裁剪框
            option: {
                img: "",
                size: 1,
                full: false,
                outputType: "png",
                canMove: true,
                fixedBox: true, //裁剪框固定大小不动 true 固定
                original: false,
                canMoveBox: false,
                autoCrop: true, //一开始就裁剪
                outputType: "png", //png,jpeg,webp
                autoCropWidth:300,
                autoCropHeight:168
            },
            // ========================
            cropper_type:1,     //裁剪类型 1，表示LOGO 2,环境图片
            logo_url:'',        //logo
            img_list:[],        //轮播图片
            swiper:'',          //轮播组件
            left:false,        //向左箭头
            radio_obj:{
                WIFI:true,
                parking:false
            },
            radio_Agreement:true,
            type_list:[],
            shop_type:[],   //段铺类型
            Picker3:'',     //3级联动

            picker_time:'',
            shopname:'',
            apply_for_a_shop:{
                creationTime:this.$store.state.apply_for_a_shop.creationTime
            },

            addtestvalue:'',

            cityList:[],        //城市列表
            city:[],            //所选择的的城市
            
            latitude:'',
            longitude:''
        }
    },
    computed:{
        // apply_for_a_shop(){
        //     return "";
        // },
        address(){
            return this.$store.state.geographical_position.address;
        }
    },
    methods:{
        weixinmaptest(){
            var ditu=bd_decrypt(this.$store.state.geographical_position.longitude,this.$store.state.geographical_position.latitude);
            console.log(ditu);
            wx.openLocation({
                latitude: ditu.lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: ditu.lng, // 经度，浮点数，范围为180 ~ -180。
                name: '测试',   // 位置名
                address: '地址测试说明', // 地址详情说明
                scale: 28,       // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: ''     // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        //跳转到百度地图页面
        baiduMap(){
            this.$router.push('/baiduMap?latitude='+this.latitude+'&longitude='+this.longitude)
        },
        //跳转法人认证
        LegalPersonCertification(){
            this.$router.push('/LegalPersonCertification');
        },
        //跳转营业执照添加界面
        BusinessLicense(){
            this.$router.push('/BusinessLicense')
        },
        //选择时间
        select_time(){
            this.$router.push('/TimeSlot');
        },
        //选择地区
        select_region(){
            this.Picker3.setData(this.cityList)
            this.Picker3.show(x=>{
                console.log(x)
                this.city=x
            })
        },
        //选择店铺类型
        select_shop_type(){
            this.Picker3.setData(this.type_list)
            this.Picker3.show(x=>{
                console.log(x)
            })
        },
        //图片轮播商一些
        slideNext(){
            this.swiper.slideNext();
        },
        //选择LOGO
        Choice_img(x){
            if(x==2 && this.img_list.length==12) return;
            this.cropper_type=x;
            document.getElementById("zhengmianInput").getElementsByTagName("input")[0].click();
        },
        input_change(e) {
            openloading(true)
            console.log(e);
            var that = this;
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读出 base64
            reader.onloadend = function() {
                that.Cropper_show = true;
                that.option.img = reader.result;
                openloading(false)
            };
        },
        //关闭裁剪弹出框
        close_1() {
            this.Cropper_show = false;
        },
        //左转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        //右转
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        //确定裁剪
        confirm() {
            this.Cropper_show = false;
            this.$refs.cropper.getCropData(data => {
                if(this.cropper_type==1){
                    this.logo_url=data;
                }else{
                    this.img_list.push(data)
                    this.swiper.virtual.cache = []; 
                    this.swiper.virtual.slides = this.img_list;
                    this.swiper.virtual.update();
                    if(this.img_list.length>2){
                        this.left=true;
                    }
                }
            });
        },

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
        
        //  mySwiper.removeSlide(1); //移除第二个slide
        //类型3级联动
        this.type_list=[{
                    value: '1',
                    text: '类型1',
                    children:[ {
                                value:'1-1',
                                text:'类型1-1',
                                children:[ { 
                                        value:'1-1-1',
                                        text:'类型1-1-2'
                                    }]
                            }, {
                                value:'1-2',
                                text:'类型1-2'
                            }
                        ]
                    },{
                        value: '2',
                        text: '类型2'
                    }]
        
        this.Picker3 = new mui.PopPicker({
            layer:3
        });
        this.Picker3.setData(this.type_list)

        //地区
        var area=[];
        try {
            area=JSON.parse(localStorage.area);
        } catch (error) {}
        //递归
        function convert(arr, id) {
            var res = [];
            for (var i = 0; i < arr.length; i++) {
                arr[i].value = arr[i].id;
                arr[i].text = arr[i].name;
                if (arr[i].parentid == id) {
                    res.push(arr[i]);
                    arr[i].children = convert(arr, arr[i].id);
                }
            }
            return res;
        }
        this.cityList = convert(area,null);
        // this.cityPicker3 = new mui.PopPicker({
        //     layer: 3
        // });
        // this.cityPicker3.setData(cityData3);
        // wx.getLocation({
        //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //     success: function (res) {
        //         var latitude = res.latitude;    // 纬度，浮点数，范围为90 ~ -90
        //         var longitude = res.longitude;  // 经度，浮点数，范围为180 ~ -180。
        //         var speed = res.speed;          // 速度，以米/每秒计
        //         var accuracy = res.accuracy;    // 位置精度
        //         console.log('获取地理位置',res)
        //     }
        // });


        //图片轮播
        this.swiper = new Swiper("#ApplicationShop .swiper-container", {
                // loop: true,
                // autoplay: true,
                slidesPerView : 2,
                spaceBetween : 10,
                // pagination: {
                //     el: ".swiper-pagination"
                // },
                virtual: {
                    // slides: [],
                    cache: false, //关闭缓存
                    renderSlide:function(slide, index){
                        // return '<div class="swiper-slide">索引是'+index+'+内容是'+slide+'</div>';
                        return '<div class="swiper-slide"><img src="'+slide+'" alt=""><span class="delete_1" inde="'+index+'"><i class="icon iconfont icon-del"></i></span></div>';
                    }
                },
                on: {
                    transitionEnd(){
                        // console.log('过渡结束transitionEnd',this.activeIndex);
                        if(this_1.img_list.length-this.activeIndex>2){
                            this_1.left=true;
                        }else{
                             this_1.left=false;
                        }
                    },
                },
            });
        //删除图片
        $('#ApplicationShop .box_3 .img_list').on('click','.delete_1',function(){
            var index=$(this).attr('inde')
            this_1.img_list.splice(index,1);

            this_1.swiper.virtual.cache = []; 
            this_1.swiper.virtual.slides = [];
            for(var i=0;i<this_1.img_list.length;i++){
                this_1.swiper.virtual.appendSlide(this_1.img_list[i]);
            }
            this_1.swiper.virtual.update();
            if(this_1.img_list.length==index && this_1.img_list.length>2){
                this_1.swiper.slideTo(index-1);
            }else if(this_1.img_list.length==2){
                this_1.swiper.slideTo(0);
                this_1.left=false;
            }
        })
        

        // console.group('------mounted 挂载结束状态------');
    },
    activated(){
        console.log(11111111)
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
        // img_list() {
        //     this.$nextTick(function() {
        //         console.log("数据渲染完成");
        //         this.getswiper();
        //     });
        // }
    }
}
</script>


<style lang="scss">
@import "@/assets/css/config.scss";
#ApplicationShop {
    height: 100%;
    // .mui-content{
    //     background: #ffffff;
    // }
}
#ApplicationShop .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#ApplicationShop .mui-title {
    color: #ffffff;
}

#ApplicationShop .box_1{
    margin: 0px 0px 5px;
    font-size: 0.14rem;
    color: rgba(80, 80, 80, 1);
    span{
        width: 0.9rem;
        display: inline-block;
        flex-shrink: 0;
    }
    .input_box{
        display: flex;
        padding: 0px 0px 0px 15px;
        height: 0.4rem;
        align-items: center;
        input{
            padding: 0px;
            margin: 0px;
            border:none;
            font-size: 0.14rem;
        }
    }
}

#ApplicationShop .box_2{
    padding: 0.1rem 0px 0.1rem 15px;
    margin:0px 0px 5px;
    background: #ffffff;
    font-size: 0.14rem;
    display: flex;
    >li:nth-child(1){
        width: 0.9rem;
        flex-shrink: 0;
    }
    >li:nth-child(2){
        width: 2rem;
    	height: 1.125rem;
        position: relative;
        .tishi{
            width: 100%;
            height: 100%;
            background: #cccccc;
            text-align: center;
            line-height: 1.1rem;
            color: #ffffff;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        span{
            position: absolute;
            right: 0px;
            top: 0px;
            width: 0.32rem;
        	height: 0.32rem;
            background-color: rgba(153, 153, 153, 0.5);
            color: #ffffff;
            text-align: center;
            line-height: 0.32rem;
            font-size: 0.22rem;
        }
    }
}

#ApplicationShop .box_3{
    background: #ffffff;
    margin: 0px 0px 5px 0px;
    .title_1{
        padding: 11px 15px;
        font-size: 0.14rem;
        color: rgba(80, 80, 80, 1)
    }
    .lunbo{
        display: flex;
        padding: 0px 0px 11px 0px;
        .left_1{
            width: 15px;
            height: 0.9rem;
            line-height: 0.9rem;
            flex-shrink: 0;
            position: relative;
            i{
                font-size: 16px;
            }
        }
        .img_list{
            border: 1px solid #e4e4e4;
            flex-grow: 1;
            width: 0;
            .swiper-container{
                width: 100%;
            }
            .swiper-slide{
                height: 0.9rem;
                span{
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    width: 0.32rem;
                    height: 0.32rem;
                    background-color: rgba(153, 153, 153, 0.5);
                    color: #ffffff;
                    text-align: center;
                    line-height: 0.32rem;
                    font-size: 0.22rem;
                }
            }
            img{
                height: 100%;
                width: 100%;
                object-fit: cover
            }
        }
        .right_1{
            width: 0.4rem;
        	height: 0.9rem;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(229, 229, 229, 1);
            span{
                width: 0.26rem;
            	height: 0.26rem;
                border-radius: 100%;
                border:1px solid rgba(40, 148, 220, 1);
                text-align: center;
                color: rgba(40, 148, 220, 1);
            }
        }   
    }
}

#ApplicationShop .box_4{
    background: #ffffff;
    padding: 0px 15px;
    margin: 0px 0px 5px 0px;
    .title_1{
        padding: 11px 0px;
        font-size: 0.14rem;
        color: rgba(80, 80, 80, 1);
        .tishi{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
    }
    .radio_1{
        display: inline-block;
    }
    .table_box{
        // padding: 0px 15px;
        text-align: right;
        white-space: nowrap;
        color: #505050;
        font-size: 0.14rem;
    }
    table{
        width: 100%;
    }
    tr{
        border-bottom: 1px solid #EDEDED;
        >td:nth-child(1){
            width: 1px;
        }
    }
    td{
        padding: 10px 0px;
    }
    
}

#ApplicationShop .Agreement {
    display: flex;
    padding: 0px 20px;
    font-size: 12px;
    align-items: center;
    margin: 20px 0px;
    > span:nth-child(2) {
        margin: 0px 0px 0px 5px;
    }
    > span:nth-child(3) {
        /* color: rgba(58, 182, 237, 1) */
        color: rgba(42, 130, 228, 1);
    }
    > span:nth-child(4) {
        flex-grow: 1;
        text-align: right;
        color: rgba(42, 130, 228, 1);
    }
}

#ApplicationShop .btn_1 {
    width: 2.5rem;
    display: block;
    margin: 0px auto;
    height: 35px;
    background: $header_background;
    border: none;
    border-radius: 35px;
    color: #ffffff;
}

#ApplicationShop .Cropper_box {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #e5e5e5;
    z-index: 10;
    .cont_1 {
        height: 100%;
    }
    .footer_1 {
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        display: flex;
        font-size: 20px;
        color: #ffffff;
        padding: 25px 0px;
        justify-content: space-around;
    }

    .vue-cropper {
        background: #e5e5e5;
    }
    .cropper-modal {
        background: rgba(181, 181, 181, 0.5);
    }
    .cropper-face {
        background-size: cover;
        background-color: rgba(0, 0, 0, 0);
        opacity: 1;
    }
    .cropper-view-box {
        outline: none;
    }
}

// 单选
#ApplicationShop .radio_1 {
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 15px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    font-size: 12px;
    i {
        font-size: 10px;
        // display: none;
        opacity: 0;
    }
}
#ApplicationShop .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
        opacity: 1;
    }
}
</style>

