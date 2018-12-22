<template>
    <div class="HeadPortrait">
        <div class="content_1">
            <div class="Cropper_box">
                <VueCropper ref="cropper" :centerBox="option.centerBox" :mode="option.mode" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :fixedBox="option.fixedBox" :canMoveBox="option.canMoveBox" :autoCrop="true" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"></VueCropper>
            </div>
            <ul class="footer_1">
                <li @click="rotateLeft()"><i class="icon iconfont icon-xuanzhuan1"></i></li>
                <li class="text_1" @click="xuanzhetupian()">重新选择图片</li>
                <li @click="rotateRight()"><i class="icon iconfont icon-xuanzhuan"></i></li>
            </ul>
            <ul class="footer">
                <li @click="quxiao()">取消</li>
                <li>保存</li>
            </ul>
        </div>
        <div class="mui-hidden HeadPortrait_input">
            <input type="file" accept="image/*" name="" id="">
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency.js";

import { VueCropper } from "vue-cropper";
import $ from 'jquery'
export default {
    name:'',
    props: {
        isnew:{
            default:true,       //true 和 false 互相切换
        }
    },
    components:{
        VueCropper
    },
    data () {
        return {
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
                autoCropWidth: 100,
                autoCropHeight: 100,
                mode:'auto',       //contain , cover, 100px, 100% auto
                centerBox:true,     //截图框是否被限制在图片里面
            },
        }
    },
    methods: {
        xuanzhetupian(){
            console.log(123)
            $('.HeadPortrait_input').html('<input type="file" accept="image/*" name="" id="">');
            $('.HeadPortrait_input').children().click();
        },
        //左转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        //右转
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        //取消
        quxiao(){
            this.$emit('setShow',false);
        }
    },
    mounted () {
        var this_1=this;
        $('.HeadPortrait_input').on('change','input',function(){
            var file = $(this)[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读出 base64
            reader.onloadend = function() {
                this_1.Cropper_show = true;
                // this_1.option.img = reader.result;
                var img=new Image();
                    img.src=reader.result;
                    img.onload=function(){
                        console.log(img.width)
                        console.log(img.height)
                        if(img.width<img.height){
                            //宽高
                            this_1.option.mode="100px auto"
                        }else{
                            this_1.option.mode="auto 100px"
                        }
                        this_1.option.img = reader.result;
                        this_1.$emit('setShow',true);
                    }
                openloading(false);
            };
        })

        console.log(this.isnew);
    },
    watch: {
        isnew(){
            console.log('数据花生变化')
        }
    }
}
</script>

<style lang="scss" scoped>
.HeadPortrait{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 12;
    display: flex;
    align-items: center;
    justify-content: center;
    .content_1{
        background: #ffffff;
        padding: 5px 5px 0px;;
    }
    .Cropper_box{
        width: 200px;
        height: 200px;
    }
    .img_box{
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #cccccc;
        img{
            width: 100px;
            height: 100px;
            border-radius: 100%;
        }
    }
    .footer_1{
        height: 30px;
        display: flex;
        align-items: center;
        li{
            flex-grow: 1;
            text-align: center;
            white-space: nowrap;
            i{
                height: 17px;
                display: inline-block;
            }
        }
        .text_1{
            font-size: 12px;
        }
        border-bottom: 1px solid #cccccc;
    }
    .footer{
        display: flex;
        >li{
            width: 50%;
            text-align: center;
            font-size: 14px;
            line-height: 30px;
        }
    }
    
}


</style>

<style lang="scss">
.HeadPortrait {
    .cropper-crop-box{
        border-radius:100%;
        overflow: hidden;
    }
    .cropper-view-box{
        border-radius: 100%;
        outline:none;
        border:1px solid #39f;
    }
}

</style>

