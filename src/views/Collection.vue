<template>
    <div id="Collection">
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">
                <ul>
                    <li class="active">商品</li>
                    <li>店铺</li>
                </ul>
            </h1>
            <span class="right">
                编辑
            </span>
		</header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <div class="mui-slider-left mui-disabled">
                            <a class="mui-btn mui-btn-red mui-icon mui-icon-email"></a>
                            <a class="mui-btn mui-btn-yellow mui-icon mui-icon-phone"></a>
                            <a class="mui-btn mui-btn-grey mui-icon mui-icon-person"></a>
                        </div>
                        <div class="mui-slider-right mui-disabled">
                            <a class="mui-btn mui-btn-grey mui-icon mui-icon-person"></a>
                            <!-- <a class="mui-btn mui-btn-yellow mui-icon mui-icon-phone"></a>
                            <a class="mui-btn mui-btn-red mui-icon mui-icon-email"></a> -->
                        </div>
                        <div class="mui-slider-handle">
                            左右滑动均可显示多功能菜单
                        </div>
                    </li>
                </ul>
            </div>
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
.mui-bar {
    background: $header_background;
    box-shadow: none;
    a{
        color: #ffffff;
    }
    .right{
        float: right;
        line-height: 44px;
        color: #ffffff;
        font-size: 14px;
    }
}

.mui-title {
    color: #ffffff;
    ul{
        display: flex;
        background: #ffffff;
        color: #007aff;
        width: 200px;
        margin: 8px auto 0px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-size: 0.12px;
        border-radius: 3px;
        overflow: hidden;
    }
    li{
        width: 50%;
    }
    li.active{
        background: #007aff;
        color: #ffffff;
    }
}
</style>

