<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红包说明</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>1、红包发放后在哪显示</li>
                <li class="indent_1">自己查看：店铺——营销</li>
                <li class="indent_1">客户查看：商家展示厅——红包图标（可查看所有的店铺红包）</li>
                <li class="kong"></li>
                <li class="">2、红包使用规则</li>
                <li class="indent_1">1）商品红包：一个商品对应一个商品红包，若商品未发布商品红包，客户可选择其他红包进行购买。</li>
                <li class="indent_1">2）庆典红包/节日红包：在指定时间内使用，过期则失效。可选择商品购买或直接输入金额购买。</li>
                <li class="indent_1">3）生日红包：生日红包对应相应的生日专享商品，客户可在生日前7天内使用。</li>
                <li class="indent_1">4）签到红包：在签到活动后按照商家所设定的时间进行购买。</li>
                <li class="indent_1">5）平台红包：为通用红包，可在所有店铺使用。</li>
                <li class="kong"></li>
                <li class="">3、买单方式：</li>
                <li class="indent_1">1）直接输入金额：系统根据用户的红包类型自动选择红包，使用该红包的抵扣百分比或满减规则进行购买。</li>
                <li class="indent_1">2）选择商品购买：有商品红包时，默认商品红包抵扣。若没有商品红包，系统会默认选择其他红包进行购买。</li>
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
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    padding: 10px;
}
.indent_1{
    text-indent: 20px;
}
.kong{
    height: 20px;
}
</style>


