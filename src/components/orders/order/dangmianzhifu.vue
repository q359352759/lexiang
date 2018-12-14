<template>
    <ul>
        <li>
            <div>输入金额：
                <span class="money">200元</span>
            </div>
            <div class="mui-text-right">实付：
                <span class="money">150</span>
            </div>
        </li>
        <li>
            <div>
                店铺红包+平台红包
                <i class="icon_font mui-icon mui-icon-arrowright"></i>
                <span class="money">-40元</span>
            </div>
            <div class="mui-text-right">
                <div class="zhifu">支付</div>
            </div>
        </li>
    </ul>
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
ul{
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    background: #ffffff;
    li{
        height: 42px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        >div{
            width: calc(100% / 2);
        }
    }
    .money{
        color: #d43030;
    }
    .icon_font{
        font-size: 14px;
    }
    .zhifu{
        display: inline-block;
        width: 68px;
    	height: 25px;
        line-height: 23px;
        border:1px solid #007aff;
        color: #007aff;
        border-radius: 25px;
        text-align: center;
    }
}
</style>


