<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">营销</h1>
            <span @tap="addMarketingVip()" class="tite_1">添加商品</span>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li v-for="(item, index) in 0" :key="index">
                    <div class="img_box">
                        <img src="image/home_2.jpg" alt="" srcset="">
                    </div>
                    <div class="text_box">
                        <div class="name">冰川鹅肠</div>
                        <div class="money">售价：66元</div>
                        <div class="footer">
                            <div class="mui-pull-right text_2">
                                新人可抵扣20元
                            </div>
                            <div class="text_1">可抵扣10元，佣金3元</div>
                        </div>
                    </div>
                </li>
            </ul>

                <loading :nodata="true"/>

        </div>
    </div>
</template>

<script>
import loading from '@/components/loading.vue';
export default {
    name:'',
    components:{
        loading
    },
    data(){
        return{}
    },
    methods:{
        addMarketingVip(){
            this.$router.push('/addMarketingVip');
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-bar .tite_1{
    position: absolute;
    line-height: 44px;
    color: #ffffff;
    top: 0px;
    right: 10px;
    font-size: 14px;
}
.box_1{
    background: #ffffff;
    >li{
        padding: 7px 10px;
        border-top: 1px solid #efeff4;
        display: flex;
    }
    .img_box{
        flex-shrink: 0;
        width: 83px;
    	height: 62px;
        margin: 0px 8px 0px 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .text_box{
        width: 0;
        flex-grow: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .name{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .money{
            color: rgba(128, 128, 128, 1);
        	font-size: 12px;
        }
        .text_1{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
        .text_2{
            color: rgba(212, 48, 48, 1);
        	font-size: 12px;
        }
    }
}
</style>


