<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">评价详情</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1" v-for="(item, index) in 评论.list" :key="index">
                <ul class="商品信息">
                    <li class="商品图片">
                        <img v-if="item.商品.img && item.商品.img.split(',').length>0" :src="item.商品.img.split(',')[0]" alt="" srcset="">
                    </li>
                    <li class="商品名称">{{item.商品.name}}</li>
                    <li class="购买数量">x{{item.商品数量.length}}</li>
                </ul>
                <ul class="header">
                    <!-- <li class="Head_portrait">
                        <img v-if="item.用户.headImgUrl" :src="item.用户.headImgUrl" alt="" srcset="">
                    </li> -->
                    <li class="text">
                        <div>
                            <!-- <div class="name">
                                {{item.用户.nickname | 名字转码}}
                            </div> -->
                            <div class="xingxing">
                                <xingxing :number="item.score" />
                            </div>
                            <div class="time">
                                <span>{{item.createtime | 时间格式化('yyyy.MM.dd hh:mm')}}</span>
                            </div>
                        </div>
                        <!-- <div class="time">
                            <span>{{item.createtime | 时间格式化('yyyy.MM.dd')}}</span>
                        </div> -->
                    </li>
                </ul>
                <ul class="content_1">
                    <li>
                        <div class="text_1">
                            <div v-html="item.remark"></div>
                        </div>
                        <div class="img_box">
                            <div>
                                <ul class="img_list" v-if="item.remarkimg && item.remarkimg.split(',').length>0">
                                    <li v-for="(img_item, img_index) in item.remarkimg.split(',')" :key="img_index">
                                        <img :src="img_item" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="dianzan">
                                <i class="icon iconfont icon-dianzan1"></i>
                                {{item.somegreattimes ? item.somegreattimes : 0}}
                            </div>
                        </div>
                        <!-- <ul class="huifu mui-clearfix">
                            <div class="mui-pull-right" @tap="回复(item,index)">回复</div>
                            <div class="mui-pull-right" @click="不回复(item,index)">不回复</div>
                        </ul> -->
                    </li>

                    <li v-for="(回复item, index1) in item.shopCommodityCommentList" :key="index1">
                        <ul class="header_1">
                            <li class="name" v-if="!回复item.clerksid && 回复item.commenttype!=1">
                                {{回复item.用户.nickname | 名字转码}}回复：
                            </li>
                            <li class="name" v-if="回复item.clerksid && 回复item.commenttype!=1">
                                {{回复item.店员.clerksname | 名字转码}}回复：
                            </li>
                            <li class="time_1">
                                <span v-show="回复item.commenttype==1">{{回复item.createtime | 计算时间差(item.createtime)}}</span>
                            </li>
                            <li class="time_2">{{回复item.createtime | 时间格式化('yyyy.MM.dd hh:mm')}}</li>
                        </ul>
                        <div class="text_1">
                            <div v-if="回复item.remark" v-html="回复item.remark"></div>
                            <div v-if="!回复item.remark">你没有填写评论~</div>
                        </div>
                        <div class="img_box">
                            <div>
                                <ul class="img_list" v-if="回复item.remarkimg && 回复item.remarkimg.split(',').length>0">
                                    <li v-for="(img_item, img_index) in 回复item.remarkimg.split(',')" :key="img_index">
                                        <img :src="img_item" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="dianzan">
                                <i class="icon iconfont icon-dianzan1"></i>
                                {{回复item.somegreattimes ? 回复item.somegreattimes : 0}}
                            </div>
                        </div>
                        <!-- <ul class="huifu mui-clearfix">
                            <div class="mui-pull-right" @tap="回复(item)">追评</div>
                        </ul> -->
                    </li>
                    <li v-if="item.追评次数<2">
                        <ul class="huifu mui-clearfix">
                            <div class="mui-pull-right" @tap="回复(item,index)">追评</div>
                        </ul>
                    </li>
                </ul>
            </div>

            <loading :loadingtype="评论.loading" :nodata="!评论.loading && 评论.total==0" :end="!评论.loading && 评论.total!=0 && 评论.total==评论.list.length"/>


            <div class="box_2" v-show="huifu_box">
                <div class="mask" @tap="huifu(false)"></div>
                <ul class="content_1">
                    <li class="name">回复：{{回复对象.userid}}</li>
                    <li class="text_box" ref="回复内容" contenteditable="true"></li>
                    <li>
                        <ul class="img_box">
                            <li v-for="(item, index) in 评论图片" :key="index">
                                <img :src="item" alt="" srcset="">
                                <span @click="删除图片(index)">
                                    <i class="icon iconfont icon-shanchu1"></i>
                                </span>
                            </li>
                            <li class="add" @click="选择图片()">
                                <i class="icon iconfont icon-plus-add"></i>
                            </li>
                        </ul>
                    </li>
                    <li class="btn_1" @click="回复评论()">提交</li>
                </ul>
            </div>

        </div>

        <div class="Cropper_box" v-show="显示裁剪框">
            <div class="cont_1">
                <VueCropper ref="cropper" :mode="option.mode" :outputSize="option.outputSize" :centerBox="option.centerBox" :viewMode="1" :img="option.img" :outputType="option.outputType" :info="true" :canMove="option.canMove" :fixedBox="option.fixedBox" :canMoveBox="option.canMoveBox" :autoCrop="true" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"></VueCropper>
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

        <div class="mui-hidden">
            <input type="file" ref="input_1" @change="input_change($event)" accept="image/*" name="" id="">
        </div>
        
        <canvas ref="myCanvas" class="myCanvas"></canvas>
        </div>
    </div>
</template>

<script>
import { openloading , dateFtt } from "@/assets/js/currency.js";
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";
import { getDaysByDateString } from "@/assets/js/time.js";
import xingxing from "@/components/xingxing.vue";
import loading from "@/components/loading.vue";
import { VueCropper } from "vue-cropper";

import { mapGetters , mapActions } from "vuex";
export default {
    name:"",
    components: {
        xingxing,
        loading,
        VueCropper
    },
    data () {
        return {
            商品id:'',
            店铺id:'',
            订单自增Id:'',
            query:{
                start:0,
                length:10,
                ordersid:''
            },
            评论:{
                list:[]
            },
            订单:{},

            huifu_box: false,

            评论图片:[],
            画布base64: "",
            画布img: "",
            degree: 0, //旋转角度
            显示裁剪框:false,
            option: {
                img: "",
                outputSize: 1, //outputSize
                outputType: "png", //png,jpeg,webp
                canMove: true, //上传图片是否可以移动
                fixedBox: true, //裁剪框固定大小不动 true 固定
                canMoveBox: false, //截图框能否拖动
                autoCrop: true, //是否默认生成截图框
                fixedNumber: [1, 1], //截图框的宽高比例
                autoCropWidth: 350,
                autoCropHeight: 350,
                fixed: true, //是否开启截图框宽高固定比例 默认true
                centerBox: true, //截图框是否被限制在图片里面
                canScale: true, //图片是否允许滚轮缩放
                mode: "350px 350px" //contain , cover, 100px, 100% auto
            },
            userInfo:'',

            回复对象:{},
            回复Index:0,
        }
    },
    filters:{
        计算时间差(time1,time2){
            var 时间差=getDaysByDateString(time2,time1);
            if(时间差>30){
                return Math.floor(时间差/30)+'月后追评'
            }else if(时间差>1){
                return Math.floor(时间差)+'天后追评'
            }else if(时间差>0.04){
                return Math.floor(时间差*24)+'小时后追评'
            }else{
                return '1小时内追评'
            }
        },
        名字转码(name){
            try {
                return b64DecodeUnicode(name)
            } catch (error) {
                return name
            }
        },
        时间格式化(time,type){
            //yyyy.MM.dd hh:mm 
            try {
                return dateFtt(time,type)
            } catch (error) {
                return time
            }
        }
    },
    methods: {
        ...mapActions({
            查询评价:'评论/查询评价',
            通过username查询用户:'user/通过username查询用户',
            根据clerksid查询店员:'myshops/店员/根据clerksid查询店员',
            根据id查询商品:'shangPing/get_shangping_2',
            根据订单id查询:'orders/order/根据订单id查询',
            修改评价:'评论/修改评价',
            添加评价:'评论/添加评价',
            根据id查询评论:'评论/根据id查询评论',
        }),
        查询用户(obj){
            this.通过username查询用户(obj.userid).then(x=>{
                if(x.data.code==200){
                    obj.用户=x.data.data || {}
                }
            })
        },
        查询店员(obj){
            this.根据clerksid查询店员(obj.clerksid).then(x=>{
                if(x.data.code==200){
                    obj.店员 = x.data.data;
                }
            })
        },
        查询商品(obj){
            this.根据id查询商品(obj.commodityid).then(x=>{
                obj.商品=x.data.data
            })
        },
        回复(item,index){
            this.huifu_box = true;
            this.回复对象=item;
            this.回复Index=index
        },
        async 回复评论(){
            var feikong = /^[\s\S]*.*[^\s][\s\S]*$/;            
            var remark_text=this.$refs.回复内容.innerText
            var remark=this.$refs.回复内容.innerHTML;
            if(!feikong.test(remark_text)){
                mui.toast("请输入评论内容", { duration: "long", type: "div" });
            }
            var 评价对象={
                    id:"",          //自增id
                    ordersid:'',    //订单id
                    commodityid: '', //商品id
                    shopid: '',      //商家id
                    userid: this.userInfo.username,      //用户id
                    remarkid: this.回复对象.id,    //回复评价id
                    remark: remark ,      //评价内容
                    remarkimg:"",   //评价图片
                    remarkimgList:this.评论图片,
                    somegreattimes:'',  //点赞次数
                    // score:5,       //打分
                    commenttype:1, //类型  0 评价 1 追评 2 商家回复
                    anonymous:1,   //匿名()默认1不匿
                    hidden:1,      //隐藏 默认1不隐藏
                    shopreplytype:0,   //商家回复状态默认0未回复 1已回复 2不回复
                    checktype:0,   //查阅状态 默认为查阅0 已1 隐藏2
                    clerksid: '',    //店员id
                    lastcomment:"", //最后评论时间
                    isfollowcomment:"", //是否有新的追评
                    lastcommenta:"",    //最后追评/回复时间
                    isfollowcommenta:'',    //是否有新的追评/回复
                };
            openloading(true);
            var 修改对象=Object.assign({},this.回复对象)
                修改对象.shopreplytype=0;
                try {
                    var 修改评价= await this.修改评价(修改对象);
                    if(修改评价.data.code==200){
                    }else{
                        mui.alert(修改评价.data.msg ? 修改评价.data.msg : 修改评价.data.message, "提示", "我知道了", function () { }, "div");
                        return
                    }
                } catch (error) {
                    mui.toast("网络错误，稍后再试。", { duration: "long", type: "div" });
                    return
                }
            this.添加评价([评价对象]).then(x=>{
                if(x.data.code==200){
                    mui.toast("回复成功", { duration: "long", type: "div" });
                    this.huifu_box = false;
                    this.更新回复();
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                }
                openloading(false);
            }).catch(err=>{
                openloading(false);
                mui.toast("网络错误，稍后再试。", { duration: "long", type: "div" });
            })
        },
        更新回复(){
            var this_1=this;
            this.根据id查询评论(this.回复对象.id).then(x=>{
                if(x.data.code==200){
                    var 新回复=x.data.data;
                    新回复.shopCommodityCommentList.forEach(item => {
                        item.用户={};
                        item.店员={};
                        this.查询用户(item)
                        this.查询店员(item);
                    });
                    this.评论.list[this.回复Index].追评次数++;
                    this.评论.list[this.回复Index].shopCommodityCommentList=新回复.shopCommodityCommentList
                }
            })
        },
        huifu(x) {
            this.huifu_box = x;
        },
        删除图片(index){
            this.评论图片.splice(index,1)
        },
        选择图片(){
            this.$refs.input_1.value = "";
            this.$refs.input_1.click();
        },
        close_1() {
            this.显示裁剪框 = false;
        },
        rotateLeft() {
            // this.$refs.cropper.rotateLeft();
            this.旋转画布(false);
        },
        rotateRight() {
            // this.$refs.cropper.rotateRight()
            this.旋转画布(true);
        },
        //确认裁剪
        confirm() {
            this.显示裁剪框 = false;
            this.$refs.cropper.getCropData(data => {
                this.评论图片.push(data);
            });
        },
        input_change(e){
            console.log(123)
            var that = this;
            var file = e.target.files[0];
            console.log(file);
            var size = file.size / 1024;
            if (size > 1024) {
                this.option.outputSize = size / 1024;
            } else {
                this.option.outputSize = 1;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);     // 读出 base64
            reader.onloadend = () => {
                that.画布base64 = reader.result;
                that.设置画布();
            };
        },
        设置画布() {
            var this_1 = this;
            var ww = document.body.clientWidth;
            var c = this.$refs.myCanvas;
            var cxt = c.getContext("2d");
            cxt.clearRect(0, 0, c.width, c.height); //清除画布
            this.画布img = new Image();
            this.画布img.src = this.画布base64;
            this.画布img.onload = () => {
                this_1.degree = 0;
                c.height = (this_1.画布img.height * c.width) / this_1.画布img.width;
                cxt.drawImage(this_1.画布img, 0, 0, c.width, c.height);
                var imgData = c.toDataURL();
                
                if (1/1 > c.width / c.height) {
                    this_1.option.mode = "350px auto";
                } else {
                    this_1.option.mode = "auto 350px";
                }
                this_1.显示裁剪框 = true;
                this_1.option.img = imgData;
            };
        },
        旋转画布(type) {
            openloading(true);
            var this_1 = this;
            //旋转角度 和 旋转方向
            this.degree += type ? 90 : -90;
            var degree = (this.degree %= 360);
            var c = this.$refs.myCanvas;
            var cxt = c.getContext("2d");
            var 新高度 = (this.画布img.height * c.width) / this.画布img.width;
            if ((degree / 90) % 2 == 0 || (degree / 90) % 2 == -0) {
                //旋转了180度
                c.height = (this.画布img.height * c.width) / this.画布img.width;
            } else {
                c.height = (c.width / this.画布img.height) * this.画布img.width;
            }
            cxt.save();
            cxt.clearRect(0, 0, c.width, c.height);
            cxt.translate(c.width / 2, c.height / 2);
            cxt.rotate((degree / 180) * Math.PI);
            if ((degree / 90) % 2 == 0 || (degree / 90) % 2 == -0) {
                cxt.translate(-c.width / 2, -c.height / 2);
                cxt.drawImage(this.画布img, 0, 0, c.width, c.height);
            } else {
                cxt.translate(-c.height / 2, -c.width / 2);
                cxt.drawImage(this.画布img, 0, 0, c.height, c.width);
            }
            cxt.restore();
            var imgData = c.toDataURL();
            this_1.option.img = imgData;
            if (1 / 1 > c.width / c.height) {
                this_1.option.mode = "350px auto";
            } else {
                this_1.option.mode = "auto 350px";
            }
            setTimeout(() => {
                openloading(false);
            }, 500);
        },
        async 初始化(){
            
            Promise.all([this.根据订单id查询(this.订单自增Id),this.查询评价(this.query)]).then(x=>{
                var 订单返回值=x[0];
                   this.订单=订单返回值.data.data;                    
                var 购买的商品=this.订单.shopOrderCommoditys

                var 评论返回值=x[1];
                var list=评论返回值.data.data.data;
                    list.forEach(item => {
                        item.用户={};
                        item.商品={}
                        item.商品数量=购买的商品.filter(x=>x.commodityid==item.commodityid);
                        var 追评=item.shopCommodityCommentList.filter(x=>x.commenttype==1)
                        item.追评次数=追评.length
                        this.查询商品(item);
                        item.shopCommodityCommentList.forEach(item_1=>{
                            item_1.用户={};
                            item_1.店员={};
                            this.查询用户(item_1)
                            this.查询店员(item_1);
                        })
                    });
                    this.评论.list=list;
            }).catch(err=>{

            })
        }
    },
    mounted() {
        this.userInfo=JSON.parse(localStorage.userInfo);
        this.订单自增Id=this.$route.query.id;
        this.query.ordersid=this.$route.query.ordersid
        this.初始化();
        
        console.log(getDaysByDateString('2019-01-28T07:49:03.000+0000','2019-01-28T09:33:31.000+0000'));
        
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1 {
    background: #ffffff;
    margin: 0px 0px 5px 0px;
    .商品信息{
        display: flex;
        align-items: center;
        padding: 0px 15px;
        height: 43px;
        border-bottom: 1px solid #efeff4;
        .商品图片{
            width: 40px;
        	height: 30px;
            margin: 0px 10px 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .商品名称{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .购买数量{
            flex-grow: 1;
            text-align: right;
            color: rgba(166, 166, 166, 1);
        	font-size: 14px;
        }
    }
    
    .header {
        padding: 0px 15px 0px 20px;  
        height: 48px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        .Head_portrait {
            width: 38px;
            height: 38px;
            margin: 0px 12px 0px 0px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .text {
            flex-grow: 1;
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .name {
                color: rgba(80, 80, 80, 1);
                font-size: 14px;
            }
            .time {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
            }
        }
    }
    .content_1 {
        padding: 0px 15px 0px 20px;
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
        > li {
            border-bottom: 1px solid rgba(246, 246, 246, 1);
            padding: 0px 0px 8px 0px;
            margin: 0px 0px 6px 0px;
        }
        > li:last-child {
            margin: 0px;
            border: none;
        }
        .header_1 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 34px;
            .time_1 {
                color: #fc6621;
            }
            .time_2 {
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
            }
        }
        .text_1 {
            margin: 0px 0px 8px 0px;
        }
        .img_box {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            .img_list {
                display: flex;
                flex-wrap: wrap;
                > li {
                    width: 60px;
                    height: 60px;
                    margin: 0px 8px 0px 0px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .dianzan {
                color: rgba(166, 166, 166, 1);
                font-size: 14px;
                i {
                    color: #f86c0c;
                    font-size: 24px;
                }
            }
        }
        .huifu {
            padding: 11px 0px 0px 0px;
            div {
                width: 52px;
                height: 22px;
                border-radius: 22px;
                line-height: 20px;
                font-size: 12px;
                margin: 0px 0px 0px 12px;
                text-align: center;
            }
            > div:nth-child(1) {
                color: #007aff;
                border: 1px solid #007aff;
            }
            > div:nth-child(2) {
                color: #808080;
                border: 1px solid #808080;
            }
        }
    }
}

.box_2 {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
    .mask {
        width: 100%;
        height: 100%;
        background: #999999;
        opacity: 0.5;
    }
    .content_1 {
        padding: 0px 10px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        background: #ffffff;
        .name {
            padding: 8px 0px;
            text-align: center;
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
        }
        .text_box {
            min-height: 86px;
            background-color: rgba(246, 246, 246, 1);
            font-size: 14px;
            padding: 8px;
            position: relative;            
            // user-select: text;
        }
        .text_box:empty::after {
            position: absolute;
            top: 6px;
            left: 8px;
            content: "请输入回复内容";
            color: rgba(166, 166, 166, 1);
            font-size: 14px;
        }
        .img_box {
            padding: 7px 0px 0px;
            display: flex;
            flex-wrap: wrap;
            > li {
                width: 66px;
                height: 66px;
                position: relative;
                margin: 0px 8px 0px 0px;
                background-color: rgba(229, 229, 229, 1);
                img {
                    width: 100%;
                    height: 100%;
                }
                span{
                    position: absolute;
                    background: rgba(255, 255, 255, 0.4);
                    width: 24px;
                    height: 24px;
                    color: #ffffff;
                    font-size: 16px;
                    top: 0px;
                    right: 0px;
                    text-align: center;
                    line-height: 24px;
                }
            }
            .add {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 33px;
                color: rgba(80, 80, 80, 1);
            }
        }
        .btn_1 {
            background: $header_background;
            width: 175px;
            height: 34px;
            margin: 28px auto 35px;
            border-radius: 34px;
            text-align: center;
            color: #ffffff;
            line-height: 34px;
            font-size: 14px;
        }
    }
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
</style>
