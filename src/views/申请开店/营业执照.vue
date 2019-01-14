<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">营业执照</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" @click="SelectionLicense()">
                        <a class="mui-navigate-right">
                            <span>
                                经营性质：
                            </span>
                            {{店铺.businessNature==1 ? '个体经营' : '公司经营'}}
                        </a>
                    </li>
                </ul>
            </div>

            <div class="box_2">
                <div class="title">
                    营业执照：
                </div>
                <div class="img_box">
                    <div class="case" @click="SelectionImage()">
                        <img src="image/zhizhao.jpg">
                    </div>
                    <div v-if="店铺.businessLicense" class="LicenseImge">
                        <img :src="店铺.businessLicense" @click="SelectionImage()" alt="" srcset="">
                        <span @click="delete_1()">
                            <i class="icon iconfont icon-del"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="box_3">
                <span>营业执照号：</span>
                <input type="text" :value="店铺.blnumber" @input="updateVuex($event,'blnumber')" placeholder="请输入营业执照号">
            </div>
        </div>

        

        <div class="btn_1" @click="Sure()">确定</div>

        <div class="Cropper_box" v-show="Cropper_show">
            <div class="cont_1">
                <VueCropper ref="cropper" :mode="option.mode" :outputSize="option.outputSize" :centerBox="option.centerBox" :viewMode="1" :img="option.img"  :outputType="option.outputType" :info="true" :canMove="option.canMove" :fixedBox="option.fixedBox" :canMoveBox="option.canMoveBox" :autoCrop="true" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"></VueCropper>
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

        <div>
            <input type="file" @change="input_change($event)" ref="zhengmianInput" accept="image/*" name="" id="">
        </div>

        <canvas ref="myCanvas" class="myCanvas" ></canvas>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";
import { VueCropper } from "vue-cropper";
import { mapMutations, mapGetters } from 'vuex';
export default {
    name: "",
    components: {
        VueCropper
    },
    data() {
        return {
            shopTypePicker: "",
            Cropper_show: false, //显示裁剪框
            option: {
                // autoCropWidth: 300,
                // autoCropHeight: 412
                img: "",
                outputSize: 1,                //outputSize
                outputType: "png",      //png,jpeg,webp
                canMove: true,          //上传图片是否可以移动
                fixedBox: true,         //裁剪框固定大小不动 true 固定
                canMoveBox: false,      //截图框能否拖动
                autoCrop: true,         //是否默认生成截图框
                fixedNumber:[300,412],    //截图框的宽高比例
                autoCropWidth:300,
                autoCropHeight:412,
                fixed:true,	            //是否开启截图框宽高固定比例 默认true
                centerBox:true,         //截图框是否被限制在图片里面
                canScale:true,          //图片是否允许滚轮缩放
                mode:'auto 412px',           //contain , cover, 100px, 100% auto
            },
        };
    },
    computed: {
        ...mapGetters({
            店铺:'申请开店/店铺',
        })
    },
    methods: {
        ...mapMutations({
            更新店铺key:'申请开店/更新店铺key'
        }),
        updateVuex(e,key){
            this.更新店铺key([key,e.target.value])
        },
        //确定
        Sure() {
            //执照号码
            var test_zhizhao = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
            if (!this.店铺.businessLicense) {
                mui.toast("请选择营业执照！", { duration: 2000, type: "div" });
                return;
            }else if(!this.店铺.blnumber || !test_zhizhao.test(this.店铺.blnumber)){
                mui.toast("请填写执照号码！", { duration: 2000, type: "div" });
                return;
            }
            history.back();
        },
        //选择经营类型
        SelectionLicense() {
            this.shopTypePicker.show(x => {
                this.更新店铺key(['businessNature',x[0].value])
            });
        },
        //选择图片
        SelectionImage() {
            console.log(123);
            this.$refs.zhengmianInput.value =''
            this.$refs.zhengmianInput.click()
            // document.getElementById("zhengmianInput").getElementsByTagName("input")[0].click();
        },
        input_change(e) {
            openloading(true);
            console.log(e);
            var that = this;
            // var file = e.target.files[0];
            var file = this.$refs.zhengmianInput.files[0];
            var size=file.size/1024;
            if(size>1024){
                this.option.size=size/1024
            }else{
                this.option.size=1
            }
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读出 base64
            reader.onloadend = function() {
                // that.Cropper_show = true;
                // that.option.img = reader.result;
                // openloading(false);
                that.画布base64=reader.result;
                that.set_myCanvas()
            };
        },
        //设置画布
        set_myCanvas(){
            console.log('设置画布');
            // alert('设置画布')
            var this_1=this;
            var ww=document.body.clientWidth;
            var c=this.$refs.myCanvas;
            var cxt=c.getContext("2d");
                // this.cxt=c.getContext("2d");
                cxt.clearRect(0,0,c.width,c.height)     //清除画布
            this.画布img=new Image();
            this.画布img.src=this.画布base64;
            this.画布img.onload=()=>{
                // alert('图片加载完成',this_1.画布img.height,this_1.画布img.width)
                console.log( 0 , 0 , c.width , this_1.画布img.height*c.width/this_1.画布img.width)
                this_1.degree=0;
                c.height=this_1.画布img.height*c.width/this_1.画布img.width;
                cxt.drawImage( this_1.画布img , 0 , 0 , c.width , c.height);
                var imgData=c.toDataURL();
                this_1.Cropper_show = true;
                if(300/412>c.width/c.height){
                    this_1.option.mode='300px auto'
                }else{
                    this_1.option.mode='auto 412px'
                }
                this_1.option.img = imgData;
                 openloading(false);
            }
        },
        旋转画布(type){
            openloading(true);
            var this_1=this;
            //旋转角度 和 旋转方向
            this.degree += type ? 90 : -90;
            var degree= this.degree %= 360;
            var c=this.$refs.myCanvas
            var cxt=c.getContext("2d");
            var 新高度=this.画布img.height*c.width/this.画布img.width;
                if(degree/90%2==0 || degree/90%2==-0){
                    //旋转了180度
                    c.height=this.画布img.height*c.width/this.画布img.width;
                }else{
                    c.height=c.width/this.画布img.height*this.画布img.width;
                }
            cxt.save();
            cxt.clearRect(0, 0, c.width, c.height);
            cxt.translate(c.width / 2, c.height / 2);
            cxt.rotate(degree / 180 * Math.PI);
            if(degree/90%2==0 || degree/90%2==-0){
                cxt.translate(-c.width / 2, -c.height / 2);
                cxt.drawImage( this.画布img , 0 , 0 , c.width , c.height);
            }else{
                cxt.translate( -c.height / 2,-c.width / 2);
                cxt.drawImage( this.画布img , 0 , 0 , c.height , c.width);
            }
            cxt.restore();
            var imgData=c.toDataURL();
                this_1.option.img = imgData;
                if(300/412>c.width/c.height){
                    this_1.option.mode='300px auto'
                }else{
                    this_1.option.mode='auto 412px'
                }
            setTimeout(()=>{
                openloading(false);
            },500)
        },
        //关闭裁剪弹出框
        close_1() {
            this.Cropper_show = false;
        },
        //左转
        rotateLeft() {
            // this.$refs.cropper.rotateLeft();
            this.旋转画布(false)
        },
        //右转
        rotateRight() {
            // this.$refs.cropper.rotateRight();
            this.旋转画布(true)
        },
        //确定裁剪
        confirm() {
            this.Cropper_show = false;
            this.$refs.cropper.getCropData(data => {
                this.更新店铺key(['businessLicense',data])
            });
        },
        //删除图片
        delete_1() {
            this.更新店铺key(['businessLicense',''])
        }
    },
    mounted() {
        this.shopTypePicker = new mui.PopPicker();
        var shopType = [
            {
                value: "1",
                text: "个体经营"
            },
            {
                value: "2",
                text: "公司经营"
            }
        ];
        this.shopTypePicker.setData(shopType);
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
.mui-content{
    margin-bottom: 60px;
}
.mui-title {
    color: #ffffff;
}

#zhengmianInput {
    display: none;
}

.box_1 {
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    span {
        width: 90px;
        display: inline-block;
    }
}
.box_2 {
    background: #ffffff;
    margin: 3px 0px 0px;
    color: rgba(80, 80, 80, 1);
    font-size: 0.14rem;
    padding: 1px 0px;
    .title {
        padding: 11px 15px;
    }
    .img_box {
        position: relative;
        width: 150px;
        margin: 0px auto 35px;
        img {
            width: 100%;
        }
        .LicenseImge {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            span {
                position: absolute;
                right: 0px;
                top: 0px;
                width: 0.32rem;
                height: 0.32rem;
                color: #ffffff;
                background-color: rgba(153, 153, 153, 0.5);
                line-height: 0.32rem;
                text-align: center;
                font-size: 0.22rem;
            }
        }
    }
}
.box_3{
    margin: 3px 0px 0px 0px;
    background: #ffffff;
    display: flex;
    height: 44px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    align-items: center;
    span{
        width: 105px;
        flex-shrink: 0;
        padding: 0px 0px 0px 15px;
    }
    input{
        padding: 0px;
        margin: 0px;
        font-size: 14px;
        border: none;
    }
}
.btn_1 {
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 0.14rem;
    color: rgba(255, 255, 255, 1);
    background: $header_background;
    text-align: center;
    bottom: 0px;
    left: 0px;
    z-index: 1;
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

<style lang="scss">
</style>
