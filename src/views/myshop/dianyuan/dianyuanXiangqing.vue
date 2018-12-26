<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">张三</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <i class="icon iconfont icon-calendar"></i>
                <span>2018年12月</span>
            </div>

            <ul>
                <li>
                    <div>
                        <div>
                            <b>10</b>
                            <span>号</span>
                        </div>                
                        <div>晚班</div>
                    </div>
                    <ul>
                        <li>
                            
                        </li>
                    </ul>
                </li>
            </ul>
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
.box_1{
    height: 32px;
    line-height: 32px;
    padding: 0px 20px;
    color: rgba(166, 166, 166, 1);
    i{
        height: 17px;
        margin: 0px 3px 0px 0px;
    }
    span{
    	font-size: 14px;
    }
}
</style>

