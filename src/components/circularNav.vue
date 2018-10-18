<template>
    <div id="circularNav">
        <div class="mask" v-show="mask_show" @click="change_mask_show(false)"></div>
        <ul >
            <li @click="change_mask_show(true)">
                <img src="@/assets/image/1.png" alt="">
            </li>
            <li class="min_1 min_11" v-show="mask_show">
                <div @click="go('/home')"><i class="icon iconfont icon-zhuye"></i></div>
                <span>主页</span>
            </li>
            <li class="min_1 min_12" v-show="mask_show">
                <div @click="go('/Agent')"><i class="icon iconfont icon-woshou"></i></div>
                <span>代理</span>
            </li>
            <li class="min_1 min_13" v-show="mask_show">
                <div><i class="icon iconfont icon-gouwucheman"></i></div>
                <span>套餐</span>
            </li>
            <li class="min_1 min_14" v-show="mask_show" >
                <div @click="go('/my')"><i class="icon iconfont icon-wode"></i></div>
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from "@/components/HelloWorld.vue";        
    // import Swiper from 'swiper'; 
    export default {
        name: "circularNav",
        components: {
            // HelloWorld
        },
        data() {
            return {
                mask_show:false
            }
        },
        methods:{
            change_mask_show(x){
                this.mask_show=x
            },
            go(x){
                this.$router.push(x)
            }
        },
        beforeCreate: function () {
            // console.group('------beforeCreate创建前状态------');
        },
        created: function () {
            // console.group('------created创建完毕状态------');
        },
        beforeMount: function () {
            // console.group('------beforeMount挂载前状态------');
        },
        mounted: function () {
            // console.group('------mounted 挂载结束状态------');
        },
        beforeUpdate: function () {
            // console.group('beforeUpdate 更新前状态===============》');
        },
        updated: function () {
            // console.group('updated 更新完成状态===============》');
        },
        beforeDestroy: function () {
            // console.group('beforeDestroy 销毁前状态===============》');
        },
        destroyed: function () {
            // console.group('destroyed 销毁完成状态===============》');
        }
    };
</script>
<style>
    #circularNav .mask{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
    #circularNav ul{
        position: absolute;
        right: 10px;
        bottom: 100px;
        z-index: 11;
    }
    #circularNav ul>li:nth-child(1){
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }
    #circularNav ul>li:nth-child(1) img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
        opacity: 0.7;
    }
    #circularNav .min_1{
        text-align: center;
        position: absolute;
    }
    #circularNav .min_1 div,
    #circularNav .min_1 div,
    #circularNav .min_1 div,
    #circularNav .min_1 div{
        width: 35px;
        height: 35px;
        text-align: center;
        background: rgba(39, 172, 110, 1);
        line-height: 35px;
        margin: 0px auto;
        border-radius: 50%;
        color: #ffffff;
    }
    #circularNav .min_1 span{
        font-size: 12px;
        color: #ffffff;
    }
    #circularNav .min_11{
        top: -70px;
        left: 7px;
    }
    #circularNav .min_12{
        top: -40px;
        left: -40px;
    }
    #circularNav .min_13{
        top: 30px;
        left: -40px;
    }
    #circularNav .min_14{
        bottom: -70px;
        left: 7px;
    }



</style>