<template>
    <div id="ApplicationShop">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请开店</h1>
        </header>

        <div class="mui-content mui-fullscreen">

            <ul class="mui-table-view box_1">
                <li class="mui-table-view-cell" @click="选择店铺类型()">
                    <a class="mui-navigate-right">
                        <span>
                            店铺分类：
                        </span>
                        {{店铺.shopType}}
                    </a>
                </li>
            </ul>
            <ul class="mui-table-view box_1">
                <li class="mui-table-view-cell input_box">
                    <span>店铺名称：</span>
                    <input type="text" :value="店铺.name" @input="updateVuex($event,'name')">
                </li>
                <li class="mui-table-view-cell input_box">
                    <span>联系电话：</span>
                    <input type="text" :value="店铺.phone" @input="updateVuex($event,'phone')">
                </li>
                <li class="mui-table-view-cell" @click="选择区域()">
                    <a class="mui-navigate-right">
                        <span>店铺区域：</span>
                        {{店铺.areaCode}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="$router.push('/shenqingkaidian/baiduditu')">
                    <a class="mui-navigate-right">
                        <span>店铺地址：</span>
                        {{店铺.address}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="$router.push('/shenqingkaidian/yingyeshijian')">
                    <a class="mui-navigate-right">
                        <span>营业时间：</span>
                        {{店铺.openTime}}{{店铺.closeTime ? '-'+店铺.closeTime : ''}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="$router.push('/shenqingkaidian/farenrenzheng')">
                    <a class="mui-navigate-right">
                        <span>法人认证：</span>
                        {{店铺.iaiName}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="$router.push('/shenqingkaidian/yingyezhizhao')">
                    <a class="mui-navigate-right">
                        <span>营业执照：</span>
                        <span v-if="店铺.businessNature==1">个体经营</span>
                        <span v-if="店铺.businessNature==2">公司经营</span>
                    </a>
                </li>
            </ul>

            <ul class="box_2">
                <li>
                    <div>商家店招：</div>
                    <div>(640*480)</div>
                </li>
                <li>
                    <div @click="Choice_img(1)" v-if="!店铺.signboard" class="tishi">点击选择图片</div>
                    <span v-if="店铺.signboard" @click="delete_signboard()">
                        <i class="icon iconfont icon-del"></i>
                    </span>
                    <img @click="Choice_img(1)" v-if="店铺.signboard" :src="店铺.signboard" alt="">
                </li>
            </ul>

            <ul class="box_3">
                <li class="title_1">
                    <span>环境图片：(640*480)</span>
                    <span class="mui-pull-right">最多12张，已有{{this.店铺.arrEnvironmentalImg.length}}张</span>
                </li>
                <li class="lunbo">
                    <div class="left_1" @click="slideNext()">
                        <i v-show="left" class="mui-icon mui-icon-back"></i>
                    </div>
                    <div class="img_list">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(x, index) in this.店铺.arrEnvironmentalImg" :key="index">
                                    <img :src="x" alt="">
                                    <span class="delete_1" @click="删除环境图片(index)" :inde="index"><i class="icon iconfont icon-del"></i></span>
                                </div>
                            </div>
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
                            <tr v-if="get_serviceType_filter.length!=0" v-for="(item, index) in Math.ceil(get_serviceType_filter.length/3)" :key="index">
                                <td v-if="index_1<3*index+3 && index_1>=3*index" v-for="(item_1, index_1) in get_serviceType_filter" :key="index_1">
                                    <span>{{item_1.name}}</span>
                                    <div @click="设置店铺服务(item_1.id)" class="radio_1" :class="{'active':item_1.active}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <ul class="mui-table-view box_6">
                <li class="mui-table-view-cell item" >
					<a class="mui-navigate-right" @click="$router.push('/shenqingkaidian/xinrendianpu')">
                        <span>店铺新人红包:</span>
                        <span style="margin:0px 0px 0px 5px">{{新人红包.headline}}</span>
					</a>
				</li>
            </ul>
            
            <div class="box_5">
                <span>推荐人：</span>
                <input type="text" :value="店铺.referrerPhone" @input="updateVuex($event,'referrerPhone')" placeholder="请输入推荐人电话">
                <span class="mui-text-right">张孝祥</span>
            </div>

            <div class="推荐人错误">推荐人无效：该推荐人不属于本区域，请填写本区域的推荐人！</div>

            <div class="Agreement">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_Agreement}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <span @click="change_radio_2()"> 我已阅读并同意</span>
                <span @click="RegistrationAgreement()">《商家服务协议》</span>
            </div>

            <!-- <button @click="add()" class="btn_1">提 交</button> -->
            <btn @click.native="add()" value="提交"/>
            {{红包ok}}
            <button @click="推荐人检测()">推荐人检测</button>
            <!-- <button @click="weixinmaptest()">跳转微信地图测试</button>
            <button @click="add()">申请通过后的店铺</button> -->
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

        <!-- <div class="shenhezhong" v-if="myshop && myshop.state==0">
            <i class="icon iconfont icon-tupian1"></i>
            <div>您已提交资料，正在审核中，请耐心等待</div>
        </div> -->

        <!-- <div class="jujue" v-if="myshop && myshop.state==2 && getType==0">
            <i class="icon iconfont icon-weitongguo"></i>
            <div class="text_box" v-html="myshop.cause"></div>
            <btn @click.native="chongxingtijiao()" value="重新提交"/>
        </div> -->

    </div>
</template>

<script>
import { openloading, bd_decrypt,get_url } from "@/assets/js/currency";
import { VueCropper } from "vue-cropper";
import btn from '@/components/button.vue';

import $ from "jquery";
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    name: "",
    components: {
        VueCropper,
        btn
    },
    data() {
        return {
            get_myshop:true,
            //裁剪框配置
            userInfo:'',
            Cropper_show: false, //显示裁剪框
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
                autoCropWidth: 300,
                autoCropHeight: 225
            },
            // ========================
            cropper_type: 1, //裁剪类型 1，表示LOGO 2,环境图片
            img_list: [], //轮播图片
            swiper: "", //轮播组件
            left: false, //向左箭头
            radio_obj: {
                WIFI: true,
                parking: false
            },
            radio_Agreement: true,
            type_list: [],
            shop_type: [], //店铺类型
            Picker3: "", //3级联动

            picker_time: "",
            shopname: "",

            cityList: [], //城市列表
            city: [], //所选择的的城市
            serviceType_list:[],    //服务列表

            shop:{          //添加店铺对象
                店铺分类:[],
                店铺区域:[],
                地图信息:{},
                //============
                userid:'',      //用户Id
                name:'',        //店铺名
                shopType:'',    //店铺类型
                phone:'',       //联系电话
                areaCode:'',    //区域code
                address:'',     //地址
                x:'',           //经度
                y:'',           //纬度
                businessNature:'',  //1个体 2实体 
                businessLicense:'', //营业执照 base64 
                blnumber:'',        //营业执照号
                signboard:'',       //商家店招 
                // environmentalImg:[],    //环境图片
                arrEnvironmentalImg:[], //环境图片
                // serviceType:[],         //服务种类，环境   
                arrServiceType:[],      //服务种类，环境
                referrerPhone:'',       //推荐人（代理人手机号码） 可不传
                openTime:'',            //开门时间
                closeTime:'',           //关门时间
                //认证信息
                sex:'',     //性别
                nation:'',   //民族
                birthday:'',    //出生日期
                iaiAddress:'',  //住址
                idNumber:'',    //证件号码
                issueArea:'',      //签证机关
                frontImg:'',        //正面
                reverseImg:'',      //背面
                validity:'',        //有效期
                iaiName:'',         //认证名
            },
            getType:0,      //0表示什么都没做 1表示点击了重新提交
            Red_envelopes:'',       //红包
        };
    },
    computed: {
        ...mapGetters({
            店铺:'申请开店/店铺',
            新人红包:'申请开店/新人红包',
            红包ok:'申请开店/红包ok'
        }),
        shops_tree_list(){  //店铺类型数组
            return this.$store.state.shops_tree_list
        },
        get_serviceType_filter(){
            var 环境类型=this.店铺.arrServiceType;
            var list=this.serviceType_list;
                list.forEach(item => {
                    var obj=环境类型.find(x=>x==item.id);
                    if(obj){
                        item.active=true;
                    }
                });
            return list
        }
    },
    methods: {
        ...mapMutations({
            更新店铺key:'申请开店/更新店铺key',
            添加环境图片:'申请开店/添加环境图片',
            删除环境图片:"申请开店/删除环境图片",
            设置店铺服务:"申请开店/设置店铺服务"
        }),
        updateVuex(e,key){
            this.更新店铺key([key,e.target.value])
        },
        推荐人检测(){
            this.持久化测试()
        },
        缓存店铺(){
            localStorage.shopJson=JSON.stringify(this.shop);
        },
        //选择店铺类型
        选择店铺类型() {
            console.log(this.shops_tree_list)
            this.Picker3.setData(this.shops_tree_list);
            this.Picker3.show(x => {
                console.log(x);
                if(x[2].id){
                    this.更新店铺key(['shopType',x[2].id])
                }else if(x[1].id){
                    this.更新店铺key(['shopType',x[1].id])
                }else if(x[0].id){
                    this.更新店铺key(['shopType',x[0].id])
                }
            });
        },
        选择区域(){
            this.Picker3.setData(this.cityList);
            this.Picker3.show(x => {
                console.log(x);
                // areaCode
                if(x[2].id){
                    this.更新店铺key(['areaCode',x[2].id])
                }else if(x[1].id){
                    this.更新店铺key(['areaCode',x[1].id])
                }else if(x[0].id){
                    this.更新店铺key(['areaCode',x[0].id])
                }
            });
        },
        //跳转发布界面新人红包
        ShopRedEnvelopes(){
            this.$router.push('/ShopRedEnvelopes')
        },
        //点击重新提交
        chongxingtijiao(){

        },  
        //删除店招图片
        delete_signboard(){
            this.更新店铺key(['signboard',''])
        },
        //点击类型
        radio(x){
            this.$set(x,'active',!x.active)
        },
        //添加
        add(){
        },
        //获取服务列表 如wifi等
        get_serviceType(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/type/findAll?start=0&length=10000'
            }).then(x=>{
                console.log('获取服务列表',x);
                if(x.data.code==200){
                    this.serviceType_list=x.data.data.data;
                }
            }).catch(err=>{
                console.log('获取服务列表',err);
            })
        },
        //选择图片
        Choice_img(x){
            if (x == 2 && this.img_list.length == 12) return;
            this.cropper_type = x;
            document.getElementById("zhengmianInput").getElementsByTagName("input")[0].click();
        },
        input_change(e) {
            openloading(true);
            console.log(e);
            var that = this;
            var file = e.target.files[0];
            var size=file.size/1024;
            if(size>1024){
                this.option.size=size/1024
            }else{
                this.option.size=1
            }
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读出 base64
            reader.onloadend = function() {
                that.Cropper_show = true;
                that.option.img = reader.result;
                openloading(false);
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
                if (this.cropper_type == 1) {
                    this.更新店铺key(['signboard',data])
                } else {
                    // this.img_list.push(data);
                    this.添加环境图片(data);
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
        var this_1 = this;
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}
        this.shop.userid=this.userInfo.username;
        

        this.Picker3 = new mui.PopPicker({layer: 3});

        //地区
        var area = [];
        try {
            area = JSON.parse(localStorage.area);
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
        this.cityList = convert(area, null);

        //图片轮播
        this.swiper = new Swiper("#ApplicationShop .swiper-container", {
            // loop: true,
            // autoplay: true,
            slidesPerView: 'auto',
            observer:true,
            spaceBetween: 10,
            on: {
                transitionEnd() {
                    console.log('过渡结束transitionEnd',this.activeIndex);
                    if (this_1.img_list.length - this.activeIndex > 2) {
                        this_1.left = true;
                    } else {
                        this_1.left = false;
                    }
                }
            }
        });
        //获取服务列表 如wifi等
        this.get_serviceType();
        // console.group('------mounted 挂载结束状态------');
    },
    activated() {

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
        shop:{
            // handler(newValue, oldValue) {                
            //     console.log('数据发生变化')
            //     this.缓存店铺()
            // },
            // deep: true
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.推荐人错误{
    padding: 12px 15px  ;
	color: rgba(217, 57, 59, 1);
	font-size: 12px;
}
.get_myshop{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
 .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
 .mui-title {
    color: #ffffff;
}

 .box_1 {
    margin: 0px 0px 5px;
    font-size: 0.14rem;
    color: rgba(80, 80, 80, 1);
    span {
        width: 0.9rem;
        display: inline-block;
        flex-shrink: 0;
    }
    .input_box {
        display: flex;
        padding: 0px 0px 0px 15px;
        height: 0.4rem;
        align-items: center;
        input {
            padding: 0px;
            margin: 0px;
            border: none;
            font-size: 0.14rem;
        }
    }
}

 .box_2 {
    padding: 0.1rem 0px 0.1rem 15px;
    margin: 0px 0px 5px;
    background: #ffffff;
    font-size: 0.14rem;
    display: flex;
    > li:nth-child(1) {
        width: 0.9rem;
        flex-shrink: 0;
    }
    > li:nth-child(2) {
        width: 1.5rem;
        height: 1.12rem;
        position: relative;
        .tishi {
            width: 100%;
            height: 100%;
            background: #cccccc;
            text-align: center;
            line-height: 1.1rem;
            color: #ffffff;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        span {
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

 .box_3 {
    background: #ffffff;
    margin: 0px 0px 5px 0px;
    .title_1 {
        padding: 11px 15px;
        font-size: 0.14rem;
        color: rgba(80, 80, 80, 1);
    }
    .lunbo {
        display: flex;
        padding: 0px 0px 11px 0px;
        .left_1 {
            width: 15px;
            height: 0.9rem;
            line-height: 0.9rem;
            flex-shrink: 0;
            position: relative;
            i {
                font-size: 16px;
            }
        }
        .img_list {
            border: 1px solid #e4e4e4;
            flex-grow: 1;
            width: 0;
            .swiper-container {
                width: 100%;
            }
            .swiper-slide {
                width: 120px;
                height: 0.9rem;
                span {
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
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        .right_1 {
            width: 0.4rem;
            height: 0.9rem;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(229, 229, 229, 1);
            span {
                width: 0.26rem;
                height: 0.26rem;
                border-radius: 100%;
                border: 1px solid rgba(40, 148, 220, 1);
                text-align: center;
                color: rgba(40, 148, 220, 1);
            }
        }
    }
}

 .box_4 {
    background: #ffffff;
    padding: 0px 15px;
    margin: 0px 0px 5px 0px;
    .title_1 {
        padding: 11px 0px;
        font-size: 0.14rem;
        color: rgba(80, 80, 80, 1);
        .tishi {
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
        }
    }
    .table_box {
        // padding: 0px 15px;
        text-align: right;
        white-space: nowrap;
        color: #505050;
        font-size: 0.14rem;
    }
    table {
        width: 100%;
    }
    tr {
        border-bottom: 1px solid #ededed;
        > td:nth-child(1) {
            width: 1px;
        }
    }
    td {
        padding: 10px 0px;
    }
}

 .box_5{
    height: 44px;
    padding: 0px 17px;
    color: rgba(80, 80, 80, 1);
    background: #ffffff;
    font-size: 14px;
    display: flex;
    align-items: center;
    span{
        width: 90px;
        flex-shrink: 0;
    }
    input{
        padding: 0px;
        margin: 0px;
        height: auto;
        border:none;
        background: none;
        font-size: 14px;
    }
}

 .box_6{
    font-size: 0.14rem;
    margin: 0px 0px 5px;
}


 .Agreement {
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

 .btn_1 {
    width: 2.5rem;
    display: block;
    margin: 0px auto 0.2rem;
    height: 35px;
    background: $header_background;
    border: none;
    border-radius: 35px;
    color: #ffffff;
}

 .Cropper_box {
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

 .shenhezhong{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 1.2rem 0px 0px;
    text-align: center;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    z-index: 1;
    i{
        display: inline-block;
        font-size: 1.2rem;
        color: rgba(248, 204, 132, 1);
        margin: 0px 0px 30px 0px;
    }
    
}
 .jujue{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 1.2rem 0px 0px;
    text-align: center;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    z-index: 1;
    i{
        display: inline-block;
        font-size: 1.2rem;
        color: rgba(220, 56, 64, 1);
        margin: 0px 0px 30px 0px;
    }
    .text_box{
        width: 45%;
        margin: 0px auto;
        text-align: left;
    }
    button{
        width: 1.4rem;
        height: 0.3rem;
        display: block;
        margin: 0.5rem auto;
        padding: 0px;
        border-radius: 0.3rem;
        font-size: 14px;
        border:none;
        color: #ffffff;
        background: $header_background;
    }
}


// 单选
 .radio_1 {
    display: inline-block;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 13px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    overflow: hidden;
    margin: 0px 0px -4px 3px;
    i {
        font-size: 8px;
        // display: none;
        opacity: 0;
    }
}
 .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
        opacity: 1;
    }
}
</style>
