<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">会员详情</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1 mui-clearfix">
                <li class="mui-pull-left">今日新增：-0人</li>
                <li class="mui-pull-left mui-text-center">本月：-0人</li>
                <li class="mui-pull-left mui-text-right">累计：-0人</li>
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
.box_1{
    height: 38px;
    line-height: 38px;
    margin: 5px 0px;
    background: #ffffff;
    font-size: 14px;
    padding: 0px 15px;
    li{
        width: calc(100% / 3);
    }
}
</style>


