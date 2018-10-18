<template>
    <div id="Account">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">收款账号</h1>
        </header>
        <div class="mui-content">
            <ul class="box_1">
                <li>
                    <div>
                        <i class="icon iconfont icon-zhifubao zhifubao"></i>
                        <span>支付宝账户：(*奇东)</span>
                    </div>
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_1==1}">
                        <i class="icon iconfont icon-dui"></i>
                    </div>
                </li>
                <li>
                    <div>
                        <i class="icon iconfont icon-weixin weixin"></i>
                        <span>微信账号：</span>
                    </div>
                    <div @click="add(true)">
                        <i class="mui-icon mui-icon-plusempty"></i>
                    </div>
                    <!-- <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_1==1}">
                        <i class="icon iconfont icon-dui"></i>
                    </div> -->
                </li>
            </ul>
            <!-- <div class="Explain">
                说明：没有收款账户时点击+添加账户，添加账号时
                提示在浏览器中打开
                在浏览器中打开后提示用户登录
                用户在浏览器中点击添加账户时打开支付宝或微信的H5登录进行绑定
            </div> -->
            <div class="addzhifbao" v-show="addzhifbao" @click="add(false)">
                <img src="@/assets/image/2.png" alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'',
        components:{},
        data(){
            return{
                radio_type_1:1,
                addzhifbao:false,
            }
        },
        methods:{
            add(x){
                this.addzhifbao=x;
            }
        }
    }
</script>

<style lang="scss">
     #Account{
        height: 100%;
        .mui-content{
            height: 100%;
            // background:#ffffff;
            // display: flex;
            // flex-direction:column;
        }
    }
    #Account .mui-bar{
        background: rgba(39, 172, 110, 1);
        a{
            color: #ffffff;
        }
    }
    #Account .mui-title{
        color: #ffffff;
    }

    #Account .box_1{
        padding: 6px;
        li{
            background-color: rgba(229, 229, 229, 1);
            display: flex;
            height: 45px;
            justify-content: space-between;
            align-items: center;
            padding: 0px 20px;
            margin: 0px 0px 5px 0px;
            >div:nth-child(1){
                display: flex;
                align-items: center;
                span{
                    color: rgba(80, 80, 80, 1);
                	font-size: 14px;
                    margin: 0px 0px 0px 10px;
                }
            }
        }
        .zhifubao{
            color: rgba(28, 170, 234, 1);
            font-size: 25px;
        }
        .weixin{
            color: rgba(60, 172, 60, 1);
            font-size: 25px;
        }
    }

    #Account .addzhifbao{
        position: fixed;
        width: 100%;
        height: 1000%;
        top: 0px;
        left: 0px;
        z-index: 10;
        background: #000000;
        img{
            width: 100%;
        }
    }


    // 单选
    #Account .radio_1{
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 15px;
        border-radius: 100%;
        border: 2px solid #cccccc;
        font-size: 12px;
        i{
            font-size: 12px;
            display: none;
        }
    }
    #Account .radio_1.active{
        background: rgba(58, 182, 237, 1);
         border: 2px solid rgba(58, 182, 237, 1);
        color: #ffffff;
        i{
            display: inline-block;
        }
    }
</style>
