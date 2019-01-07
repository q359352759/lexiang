<template>
    <div>
        <ul class="列表">
            <li class="header">
                <div><div>会员</div></div>
                <div><div>时间</div></div>
                <div><div>消费额</div></div>
            </li>
        </ul>
        <ul class="列表">
            <li v-for="(item, index) in 10" :key="index">
                <div class="蓝色字体"><div>张三</div></div>
                <div>
                    <div>2018.01.01</div>
                    <div>22:22:00</div>
                </div>
                <div><div>￥-0</div></div>
            </li>
        </ul>
        <ul class="底部">
            <li>商家：-0家</li>
            <li>总分润：-0元</li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"",
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';

.列表{
    li{
        display: flex;
        min-height: 34px;
        text-align: center;
        font-size: 12px;
        >div{
            border-left: 1px solid #F6F6F6;
            width: calc(100% / 3);
            display: flex;
            flex-direction: column;
            justify-content: center;
            >div{
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        >div:nth-child(1){
            border-left: none;
        }
    }
    li:nth-child(2n-1){
        background: #ffffff;
    }
    li.header{
        background: $header_background;
        color: #ffffff;
    }
    .蓝色字体{
        color: #017AFF;
    }
}
.底部{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
	height: 32px;
	background-color: $header_background;
    color: rgba(255, 255, 255, 1);
	font-size: 11px;
    line-height: 32px;
	text-align: center;
    display: flex;
    >li{
        width: 50%;
    }
}
</style>
