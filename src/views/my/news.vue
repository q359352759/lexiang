<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">消息</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1"></div>
            <div class="box_2">
                <ul>
                    <li>
                        <div>
                            <img src="image/news_1.png" alt="">
                            <span>2</span>
                        </div>
                        <div>系统通知</div>
                    </li>
                    <li>
                        <div>
                            <img src="image/news_2.png" alt="">
                            <span>2</span>
                        </div>
                        <div>店铺优惠</div>
                    </li>
                    <li>
                        <div>
                            <img src="image/news_3.png" alt="">
                            <span>2</span>
                        </div>
                        <div>降价通知</div>
                    </li>
                    <li>
                        <div>
                            <img src="image/news_4.png" alt="">                            
                            <span>3</span>
                        </div>
                        <div>好友消息</div>
                    </li>
                </ul>
            </div>

            <ul class="box_3">
                <li class="mui-clearfix" v-for="(item, index) in 3" :key="index">
                    <div class="img_box mui-pull-left">
                        <img src="image/news_1.png" alt="" srcset="">
                        <span>2</span>
                    </div>
                    <div class="time_1 mui-pull-right">2018.11.8 14:53:45</div>
                    <div class="title_1">系统通知</div>
                    <div class="text_1">密码修改成功</div>
                </li>
            </ul>


        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data(){
        return{}
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar-nav{
    box-shadow: none;
}

.box_1{
    background: $header_background;
    height: 52px;
}

.box_2{
    height: 30px;
    margin: 0px 8px;
    position: relative;
    ul{
        position: absolute;
        width: 100%;
        bottom: 5px;
        left: 0px;
        display: flex;
        background: #ffffff;
        border-radius: 10px;
        padding: 11px 0px 5px;
        >li{
            width: 25%;
            text-align: center;
            >div:nth-child(1){
                width: 36px;
                height: 36px;
                position: relative;
                margin: 0px auto;
                img{
                    width: 100%;
                    height: 100%;
                }
                span{
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    min-width: 12px;
                    height: 12px;
                    background-color: rgba(212, 48, 48, 1);
                    border-radius: 12px;
                    text-align: center;
                    color: #ffffff;
                    line-height: 12px;
                    font-size: 10px;
                }
            }
            >div:nth-child(2){
                color: rgba(80, 80, 80, 1);
            	font-size: 10px;
                margin: 3px 0px 0px;
            }
        }
    }
}

.box_3{
    >li{
        background: #ffffff;
        border-bottom: 1px solid #efeff4;
        padding: 9px 13px 14px;
    }
    .img_box{
        width: 36px;
    	height: 36px;
        margin: 0px 8px 0px 0px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        span{
            position: absolute;
            top: 0px;
            right: 0px;
            min-width: 12px;
            height: 12px;
            border-radius: 12px;
            color: #ffffff;
            text-align: center;
            font-size: 10px;
            line-height: 10px;
            background: rgba(212, 48, 48, 1);
        }
    }
    .time_1{
        color: rgba(166, 166, 166, 1);
    	font-size: 10px;
    }
    .title_1{
        color: rgba(80, 80, 80, 1);
        font-size: 12px;
    }
    .text_1{
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
    }
}
</style>


