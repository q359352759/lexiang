<template>
    <ul class="header">
        <li class="daipingjia mui-pull-right">
            待评价
        </li>
        <li class="shop">
            <i class="icon_shop icon iconfont icon-jinrudianpu"></i>
            <span>mc火锅店</span>
            <i class="icon_right mui-icon mui-icon-arrowright"></i>
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
.header{
    background: #ffffff;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    padding: 0px 10px;
    border-bottom: 1px solid rgba(246, 246, 246, 1);
    // display: flex;
    height: 30px;
    line-height: 30px;
    .shop{
        display: flex;
        align-items: center;
    }
    .icon_shop{
        color: #e86434;
        font-size: 20px;
        margin: 0px 5px 0px 0px;
    }
    .icon_right{
        font-size: 12px;
    }
    .daipingjia{
        color: #505050;
    }
}
</style>




