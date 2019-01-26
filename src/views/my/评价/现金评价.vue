<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">评价</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="店铺头部">
                <i class="icon_shop icon iconfont icon-jinrudianpu"></i>
                <span @click="$router.push('/BusinessDetails?shopid='+店铺.shopid)">{{店铺.name}}</span>
                <div class="星星框">
                    <div>
                        <xingxing ref="星星"/>
                    </div>
                </div>
            </div>
            <ul class="列表" v-for="(item, index) in 新商品列表" :key="index">
                <!-- <li class="头部">
                    <div class="商品图片">
                        <img v-if="item.img && item.img.split(',').length>0" :src="item.img.split(',')[0]" alt="" srcset="">
                    </div>
                    <div class="商品名称">{{item.name}}</div>
                    <div class="星星框">
                        <xingxing ref="星星"/>
                    </div>
                </li> -->
                <li>
                    <div class="内容输入框" ref="评论内容" contenteditable="true" placeholder="请输入您的评价"></div>
                </li>
                <li class="图片列表">
                    <div class="图片" v-for="(item_2, index_2) in item.评论图片" :key="index_2">
                        <img :src="item_2" alt="" srcset="">
                        <span @click="删除图片(item.评论图片,index_2)"><i class="icon iconfont icon-shanchu1"></i></span>
                    </div>
                    <div class="选择图片" @click="选择图片(item)">
                        <i class="icon iconfont icon-plus-add"></i>
                    </div>
                </li>
            </ul>
            <div class="按钮框">
                <btn value="提交" @click.native="提交()"/>
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
</template>

<script>
import xingxing from '@/components/可点击星星.vue'
import btn from '@/components/button.vue'
import { mapActions, mapGetters } from 'vuex';
import { openloading } from "@/assets/js/currency.js";

import { VueCropper } from "vue-cropper";

export default {
    name:"",
    components:{
        xingxing,
        btn,
        VueCropper
    },
    data () {
        return {
            订单Id:'394',
            订单详情:{},
            添加图片_obj:'',

            画布base64: "",
            画布img: "",
            degree: 0, //旋转角度
            显示裁剪框:false,
            userInfo:'',
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
        }
    },
    computed: {
        ...mapGetters({
            店铺:'shop/shop'
        }),
        新商品列表(){
            var 购买的商品=this.订单详情.shopOrderCommoditys || [] ;
            let 暂存 = {};
            const newArr = 购买的商品.reduceRight((item, next) => {
                if(暂存[next.commodityid]){
                    暂存[next.commodityid].包含商品.push(next);
                }else{
                    var obj=Object.assign({},next)
                    obj.包含商品=[next]
                    obj.评论图片=[]
                    暂存[next.commodityid] = obj
                    item.push(obj)
                }
                // hash[next.commodityid] ? '' : hash[next.commodityid] = true && item.push(next);
                return item
            }, []);
            return newArr;
        }
    },
    methods: {
        ...mapActions({
            根据订单id查询:'orders/order/根据订单id查询',
            获取店铺信息:'shop/get_shop',
            添加评价:'评论/添加评价'
        }),
        提交(){
            var 评论列表=[];
            var 新商品列表=this.新商品列表;
            var this_1=this;
            var feikong = /^[\s\S]*.*[^\s][\s\S]*$/;
            for(let i=0;i<新商品列表.length;i++){
                var remark_text=this_1.$refs.评论内容[i].innerText
                var remark=this_1.$refs.评论内容[i].innerHTML
                var remarkimgList=新商品列表[i].评论图片;
                var score = this_1.$refs.星星.number;
                console.log(remark_text);
                var 评价对象={
                    id:"",          //自增id
                    ordersid:this_1.订单详情.ordersid,    //订单id
                    commodityid: '', //商品id
                    shopid: 新商品列表[i].shopid,      //商家id
                    userid: this_1.userInfo.username,      //用户id
                    remarkid: '',    //回复评价id
                    remark: remark ,      //评价内容
                    remarkimg:"",   //评价图片
                    remarkimgList:remarkimgList,
                    somegreattimes:'',  //点赞次数
                    score:score,       //打分
                    commenttype:0, //类型  0 评价 1 追评 2 商家回复
                    anonymous:1,   //匿名()默认1不匿
                    hidden:1,      //隐藏 默认1不隐藏
                    shopreplytype:0,   //商家回复状态默认0未回复 1已回复 2不回复
                    checktype:0,   //查阅状态 默认为查阅0 已1 隐藏2
                    clerksid:"",    //店员id
                    lastcomment:"", //最后评论时间
                    isfollowcomment:"", //是否有新的追评
                    lastcommenta:"",    //最后追评/回复时间
                    isfollowcommenta:'',    //是否有新的追评/回复
                };
                if(feikong.test(remark_text)){
                    评论列表.push(评价对象)
                }
            }
            if(评论列表.length<this.新商品列表.length){
                mui.toast("请输入评论内容", { duration: "long", type: "div" });
                return
            }
            openloading(true)
            this.添加评价(评论列表).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    mui.toast("评论成功", { duration: "long", type: "div" });
                    setTimeout(x=>{
                        history.back()
                    },1000)
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                }
                openloading(false);
            }).catch(err=>{
                openloading(false);
                mui.toast("网络错误，稍后再试。", { duration: "long", type: "div" });
            })
            console.log(评论列表)
            // this.添加评价()
            // this.新商品列表.forEach(item => {
                
            // });
            // var 星星数据=this.$refs.星星;
            // 星星数据.forEach(item => {
            //     console.log(item.number)
            // });
        },
        删除图片(item,index){
            item.splice(index,1)
        },
        选择图片(item){
            this.添加图片_obj=item;
            this.$refs.input_1.value = "";
            this.$refs.input_1.click();
        },
        //关闭裁剪弹出框
        close_1() {
            this.显示裁剪框 = false;
        },
        //左转
        rotateLeft() {
            // this.$refs.cropper.rotateLeft();
            this.旋转画布(false);
        },
        //右转
        rotateRight() {
            // this.$refs.cropper.rotateRight()
            this.旋转画布(true);
        },
        //确认裁剪
        confirm() {
            this.显示裁剪框 = false;
            this.$refs.cropper.getCropData(data => {
                this.添加图片_obj.评论图片.push(data);
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
            if (1 / 1 > c.width / c.height) {
                this_1.option.mode = "auto 350px";
            } else {
                this_1.option.mode = "350px auto";
            }
            var imgData = c.toDataURL();
            this_1.option.img = imgData;
            if (35 / 22 > c.width / c.height) {
                this_1.option.mode = "350px auto";
            } else {
                this_1.option.mode = "auto 350px";
            }
            setTimeout(() => {
                openloading(false);
            }, 500);
        },
        async 初始化(){
            try {
                var 订单详情=await this.根据订单id查询(this.订单Id);           
            } catch (error) {
                mui.toast("网络错误，稍后再试.", { duration: "long", type: "div" });
                return
            }
            if(订单详情.data.code==200){
                this.订单详情=订单详情.data.data;
            }else{
                return
            }
            this.获取店铺信息(this.订单详情.shopid)
            console.log(订单详情)
        }
    },
    mounted () {
        this.订单Id=this.$route.query.orderid;
        this.初始化();
        this.userInfo=JSON.parse(localStorage.userInfo)
       
        
    }
}
</script>

<style lang="scss" scoped>
.myCanvas {
    border: 1px solid red;
    min-height: 10px;
    position: fixed;
    left: -100%;
}
.店铺头部 {
    display: flex;
    align-items: center;
    height: 32px;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    padding: 0px 10px;
    background: #ffffff;
    margin: 5px 0px 1px;
    .icon_shop {
        font-size: 20px;
        margin: 0px 5px 0px 0px;
    }
    .星星框{
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        >div{
            width: 125px;
        }
    }
}
.列表{
    background: #ffffff;
    padding: 10px 10px 0px;
    margin: 0px 0px 5px 0px;
    .头部{
        height: 44px;
        display: flex;
        align-items: center;
        .商品图片{
            width: 40px;
        	height: 30px;
            margin: 0px 9px 0px 0px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .商品名称{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
            flex-grow: 1;
            width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .星星框{
            width: 125px;
            flex-shrink: 0;
        }
    }
    .内容输入框{
    	height: 86px;
        background: #f6f6f6;
        padding: 8px;
        user-select: text;
        -webkit-user-select: text;
        font-size: 12px;
    }
    .内容输入框:empty:before{
        content: attr(placeholder);
        color:#a6a6a6;
    }
    .图片列表{
        display: flex;
        flex-wrap: wrap;
        padding: 7px 0px 10px 0px;
        div{    
            width: 66px;
        	height: 66px;
            margin: 0px 8px 0px 0px;
            background: #e5e5e5;
            position: relative;
        }
        .图片{
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            span{
                background: rgba(255, 255, 255, 0.4);
                width: 24px;
            	height: 24px;
                color: #ffffff;
                font-size: 16px;
                position: absolute;
                top: 0px;
                right: 0px;
                text-align: center;
                line-height: 24px;
            }
        }
        .选择图片{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 40px;
            color: #c8c4c4;
        }
    }
}
.按钮框{
    margin: 50px 0px 30px;
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
