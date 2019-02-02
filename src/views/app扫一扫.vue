<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @tap="返回上一页()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">扫一扫</h1>
        </header>
        <div class="mui-content mui-fullscreen" >
            <div id="bcid" ref="bcid"></div>
            <ul class="按钮">
				<!-- <li><span @click="scanPicture()">相册</span></li>
				<li><span @click="开始扫描()">开始扫描</span></li>
				<li><span @click="停止扫描()">停止扫描</span> </li> -->
				<li><span @click="switchFlash">{{开灯 ? '关灯' : '开灯'}}</span></li>
			</ul>
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency.js";
export default {
    name:"",
    data () {
        return {
            开灯:false,
            scan:'',
            wo:'',
        }
    },
    methods: {
        返回上一页(){
            try {
                this.停止扫描();            
            } catch (error) {
                
            }
            history.back()
        },
        开始扫描(){
            this.scan=new plus.barcode.Barcode('bcid');
            // this.scan=new plus.barcode.Barcode('bcid',['QR'],{'width':"100%","height":"100%"});
            // this.scan=new plus.barcode.Barcode(this.$refs.bcid,['QR'],{'background':'#8e8e8e','width':"100%","height":"100%"});
            this.scan.onmarked=this.onmarked;
            this.scan.start();
        },
        onmarked(type, result, file){
            switch(type){
                case plus.barcode.QR:
                type = 'QR';
                break;
                case plus.barcode.EAN13:
                type = 'EAN13';
                break;
                case plus.barcode.EAN8:
                type = 'EAN8';
                break;
                default:
                type = '其它'+type;
                break;
            }
            result = result.replace(/\r\n/g, '');
            console.log("scaned('"+ type +"','"+ result +"','"+ file +"');")
            console.log(result);
            var url1 = result.substring(0,result.indexOf('#'));
            var url2 = result.substring(result.indexOf('#')+1);
            if(url1 == 'http://m.lxad.vip/test/dist/index.html'){
                console.log(url1);
                this.停止扫描();
                this.$router.replace(url2)
            }else{
                this.停止扫描();
                mui.alert('请使用红购二维码','提示','好的',x=>{                
                    this.开始扫描();
                },'div')
            }
        },
        停止扫描(){
            this.scan.close();
        },
        switchFlash() {
            this.开灯 = !this.开灯;
            this.scan.setFlash(this.开灯);
        },
        scanPicture(){
            plus.gallery.pick(function(path){
                plus.barcode.scan(path,onmarked,function(error){
                    plus.nativeUI.alert('无法识别此图片');
                });
            }, function(err){
                console.log('Failed: ' + err.message);
            });
        }
    },
    mounted() {
        // var ws=null;
        // var wo=null;
        // var scan=null;
            openloading(true)
        if (window.plus) {
            setTimeout(x=>{
                openloading(false)
                this.开始扫描();
            },1000)
        } else {
            setTimeout(x=>{
                openloading(false)
                document.addEventListener('plusready', this.开始扫描, false);
            },1000)
        }
        // 13802510758 石小雨
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
    #bcid{
        flex-grow: 1;
    }
    .按钮{
        background: #000000;
        height: 44px;
        line-height: 44px;
        color: #FFF;
        display: flex;
        justify-content:space-around;
        font-size: 14px;
    }
}
</style>
