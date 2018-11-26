<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">营销</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>
                    <div>
                        <div>
                            <img src="image/hongbao_1.png" alt="">
                        </div>
                        <div>
                            <span>共发放：-0元</span>
                        </div>
                    </div>
                    <div>
                        <div>红包</div>
                        <div>已使用：-0元</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <img src="image/qunfa.png" alt="">
                        </div>
                        <div>
                            <span>共发送：-0条</span>
                        </div>
                    </div>
                    <div>
                        <div>红包</div>
                        <div>已查阅：-0条</div>
                    </div>
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
.box_1{
    padding: 12px 10px 12px 10px;
    display: flex;
    background: #ffffff;
    >li:nth-child(1){
        border-right: 1px solid rgba(229, 229, 229, 1);
    }
    >li{
        padding: 0px 20px 0px 20px;
        width: 50%;
        >div{
            display: flex;
            >div:nth-child(1){
                width: 32px;
                img{
                    width: 100%;
                }
                color: rgba(80, 80, 80, 1);
                font-size: 10px;
                text-align: center;
            }
            >div:nth-child(2){
                padding-left: 16px;
                color: rgba(80, 80, 80, 1);
            	font-size: 10px;
            }
        }
    }
    
}
</style>

