<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                红购
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <img src="image/hongbao.png" alt="">
            </div>
            
            <form class="box_2">
                <ul>
                    <li>
                        <i class="icon iconfont icon-shouji1"></i>
                        <input type="text" placeholder="手机号码">
                    </li>
                    <li>
                        <i class="icon iconfont icon-yanzhengma"></i>
                        <input type="text" placeholder="验证码">
                        <span>发送验证码</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-mima"></i>
                        <input type="text" placeholder="登录密码">
                    </li>
                </ul>
                <button type="submit">领取</button>
            </form>
            
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data(){
        return{}
    },
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-content{
    background: #fdba2c;
}
.box_1{
    img{
        width: 100%;
    }
}
.box_2{
    position: relative;
    margin: -10px 0px 0px;
    display: block;
    padding: 0.3rem 0.3rem;
    background: #fdba2c;
    li{
        display: flex;
        border-bottom: 1px solid #ffffff;
        align-items: center;
        color: #ffffff;
        margin: 0px 0px 0.2rem 0px;
        input{
            height: 0.3rem;
            padding: 0px 10px ;
            margin: 0px;
            border: none;
            background: none;
            font-size: 0.14rem;
            flex-grow: 1;
        }
        span{
            font-size: 0.14rem;
            white-space: nowrap;
        }
    }
    button{
        display: block;
        width: 1.53rem;
    	height: 0.32rem;
        padding: 0px;
        margin: 0.22rem auto 0.2rem;
        background:$header_background;
        color: #ffffff;
        border-radius: 0.32rem;
        border: none;
    }
    
}
</style>

