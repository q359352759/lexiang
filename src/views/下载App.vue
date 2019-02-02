<template>
    <div class="mui-content mui-fullscreen" >
        <div class="容器" style="background-image: url(image/appdownload.jpg)">
            <div class="logo">
                <img src="image/WechatIMG311.png" alt="" srcset="">
            </div>
            <ul class="文本">
                <li>全城促销信息一手掌握</li>
                <li>自用省钱、分享赚钱</li>
                <li>开心、快乐用红购</li>
            </ul>
            <ul class="按钮">
                <a href="http://m.lxad.vip/test/honggou.apk">
                <!-- <a @click="下载()"> -->
                    安卓app
                </a>
                <!-- <a href="http://m.lxad.vip/test/dist.zip"> -->
                <a  @click="下载()">
                    苹果app
                </a>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"",
    data () {
        return {

        }
    },
    methods: {
        下载(){
            mui.toast("等待上架中", { duration: "long", type: "div" });
        }
    },
}
</script>

<style lang="scss" scoped>
.容器{
    min-height: 100%;
    background-position: center;
    background-size: cover;
    padding: 1px 0px;
    .logo{
        text-align: center;
        margin: 1.48rem 0px 0px;
        img{
            width: 80px;
        	height: 80px;
            border-radius: 12px;
        }
    }
    .文本{
        margin: 0.36rem;
        text-align: center;
        color: rgba(255, 255, 255, 1);
    	font-size: 14px;
    }
    .按钮{
        margin: 0.52rem 0px;
        padding: 0px 0.49rem;
        display: flex;
        justify-content: space-between;
        a{
            width: 111px;
        	height: 44px;
            border-radius: 8px;
            font-size: 14px;
            color: rgba(217, 57, 59, 1);
            background: #ffffff;
            text-align: center;
            line-height: 44px;
            font-weight: bold;
        }
    }
}
</style>