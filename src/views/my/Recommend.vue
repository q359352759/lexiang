<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                推荐有奖
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <img src="image/tuijian.png" alt="">
                <h1>推荐好友双方各得到20元购物红包！</h1>
                <h2>邀请好友</h2>
            </div>

            <div class="box_2">
                <ul class="title">
                    <li>已邀请4人</li>
                    <li>获得80元红包</li>
                </ul>
                <ul class="list">
                    <li>
                        <div>好友</div>
                        <div>时间</div>
                        <div>红包</div>
                    </li>
                    <li v-for="(item, index) in 4" :key="index">
                        <div>158*****123</div>
                        <div>
                            2018.11.7 17:23:45
                        </div>
                        <div>
                            20
                        </div>
                    </li>
                </ul>
            </div>

             <!-- <button @click="BeInvited()">被邀请界面</button> -->

        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data(){
        return{}
    },
    methods:{
        //被邀请界面
        BeInvited(){
            this.$router.push('/BeInvited');
        },
    }
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #cc1a3f;
}
.mui-bar{
    background: #cc1a3f
}
.box_1{
    text-align: center;
    color: #ffffff;
    img{
        width: 100%;
    }
    h1{
        font-weight: 400;
        font-size: 0.14rem;
    }
    h2{
        font-weight: 400;
        width: 1.91rem;
        height: 0.34rem;
        border: 1px solid #ffffff;
        border-radius: 0.34rem;
        font-size: 0.14rem;
        line-height: 0.32rem;
        margin: 0.2rem auto 0.16rem;
    }
}
.box_2 {
    color: #ffffff;
    .title{
        padding: 0px 0.28rem;
        font-size: 0.14rem;
        display: flex;
        justify-content: space-between;
    }
    .list{
        margin: 5px 0px 0px;
        text-align: center;
        font-size: 0.12rem;
        border-top: 1px solid #ffffff;
        >li{
            display: flex;
            border-bottom: 1px solid #ffffff;
            >div{
                width: calc(100% / 3);
                height: 0.3rem;
                line-height: 0.3rem;
            }
            >div:nth-child(2),
            >div:nth-child(3){
                border-left: 1px solid #ffffff;
            }
        }
    }
}
</style>

