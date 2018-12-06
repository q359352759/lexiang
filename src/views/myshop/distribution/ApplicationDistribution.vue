<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <!-- <a @tap="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">开通分销功能</h1>
            <span @tap="AddGoods()" class="add mui-pull-right">业务市场</span>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">

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

</style>

