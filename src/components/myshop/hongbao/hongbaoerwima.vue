<template>
    <div>
        <div class="Shenchengerweima">
            <div class="header_1">
                <div class="img_box">
                    <img src="image/WechatIMG311.png" alt="" srcset="">
                </div>
                <div class="text_1">红包乐购</div>
                <div class="text_2">（红包促销购物平台）</div>
            </div>
            <div class="hong_box">
                <div class="title_1">店铺新人红包</div>
                <div class="money">
                    <span>99999</span>
                    <span>元</span>
                </div>
                <div class="img_box">
                    <img src="image/WechatIMG311.png" alt="" srcset="">
                </div>
            </div>
            <div class="footer_1">
                <div class="text_1">蓝戒指婚庆婚礼公司</div>
                <div class="erweima_box">
                    <img src="image/WechatIMG311.png" alt="" srcset="">
                </div>
                <div class="text_2">长按识别二维码，领取红包</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.Shenchengerweima{
    width: 250px;
    padding: 7px 8px;
    background: #ffffff;
    .header_1{
        display: flex;
        align-items: center;
        .img_box{
            font-size: 0px;
            width: 27px;
            height: 27px;
            margin: 0px 5px 0px 0px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
        }
        .text_1{
            color: rgba(212, 48, 48, 1);
        	font-size: 12px;
        }
        .text_2{
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
        }
    }
    .hong_box{
        width: 148px;
        background: #f18a8a;
        border-radius: 5px;
        margin: 22px auto 16px;
        color: #ffffff;
        text-align: center;
        font-size: 12px;
        .title_1{
            padding: 10px 0px 0px;
        }
        .money{
            margin: 20px 0px 0px;
            >span:nth-child(1){
                font-size: 22px;
            }
            >span:nth-child(2){
                font-size: 12px;
            }
        }
        .img_box{
            font-size: 0px;
            width: 82px;
            height: 62px;
            margin: 0px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .footer_1{
        text-align: center;
        .text_1{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .erweima_box{
            width: 50px;
            height: 50px;
            margin: 0px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_2{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
    }
}
</style>




