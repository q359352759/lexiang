<template>
    <div id="Collection">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <ul>
                    <li :class="{'active':type==0}" @click="select_type(0)">商品</li>
                    <li :class="{'active':type==1}" @click="select_type(1)">店铺</li>
                </ul>
            </h1>
            <span class="right">
                编辑
            </span>
        </header>
        <div class="mui-content">

            <ul class="box_2" v-if="type==0">
                <li v-for="(x, index) in 1" :key="index" v-on:touchend="touchend($event)" v-on:touchstart="huoqu($event)" v-on:touchmove="touchmove($event)">
                    <div class="left_1">
                        <div class="radio_1" :class="{'active':x.active}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                    </div>
                    <div>
                        <ul class="cont_1">
                            <li>
                                <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                            </li>
                            <li>
                                <h1>
                                    <div @click="Recommend()" class="mui-pull-right"><i class="icon iconfont icon-fenxiang2"></i></div>
                                    商品名称商品名称商品名称商品名称商品名称商品名称
                                </h1>
                                <h2>
                                    <span class="mui-pull-right">人气：666</span>
                                    价格：60.00元
                                </h2>
                                <h3>红包抵扣：10.00元</h3>
                            </li>
                            <!-- <li>
                                <div @click="Recommend()"><i class="icon iconfont icon-fenxiang2"></i></div>
                                <span>人气：666</span>
                            </li> -->
                        </ul>
                    </div>
                    <div class="right_1">
                        <div>删除</div>
                    </div>
                </li>
            </ul>

            <ul class="box_3" v-if="type==1">
                <li v-for="(x, index) in 1" :key="index" v-on:touchend="touchend($event)" v-on:touchstart="huoqu($event)" v-on:touchmove="touchmove($event)">
                    <div class="left_1">
                        <div class="radio_1" :class="{'active':x.active}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                    </div>
                    <div>
                        <ul class="cont_1">
                            <li>
                                <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                            </li>
                            <li>
                                <h1>
                                    <div @click="Recommend()" class="mui-pull-right"><i class="icon iconfont icon-fenxiang2"></i></div>
                                    商品名称商品名称商品名称商品名称商品名称商品名称
                                </h1>
                                <h2>
                                    <span class="mui-pull-right">人气：666</span>
                                    价格：60.00元
                                </h2>
                                <h3>红包抵扣：10.00元</h3>
                            </li>
                            <!-- <li>
                                <div @click="Recommend()"><i class="icon iconfont icon-fenxiang2"></i></div>
                                <span>人气：666</span>
                            </li> -->
                        </ul>
                    </div>
                    <div class="right_1">
                        <div>删除</div>
                    </div>
                </li>
            </ul>

           

        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            type:0,         //0表示商家 1表示店铺
            touchstart_x:0,      //按下去这一秒
        };
    },
    computed: {

    },
    methods: {
        //跳转推荐页面
        Recommend(){
            this.$router.push('/Recommend')
        },
        //选择类型
        select_type(x){
            this.type=x;
        },
        //手指头刚按下
        huoqu(e){
             //手指头刚刚按下
            //这里不能用 target 
            var targetTouches = e.targetTouches[0];
            // this.touchstart_x= targetTouches.clientX-e.target.offsetLeft;
            this.touchstart_x=targetTouches.clientX-e.currentTarget.offsetLeft;
            e.currentTarget.className=""
            // document.getElementById('n')
        },
        //开始拖动
        touchmove(e){
            // console.log(e)
            var targetTouches = e.targetTouches[0];
            // e.currentTarget.style.left=targetTouches.clientX-this.touchstart_x+'px';
            e.currentTarget.style.left=targetTouches.clientX-this.touchstart_x+'px';
        },
        //拖动结束
        touchend(e){
            // console.log(e);
            console.log(e.currentTarget.offsetLeft)
             e.currentTarget.className="active"
            if(e.currentTarget.offsetLeft>60){
                e.currentTarget.style.left='60px'
            }else if(e.currentTarget.offsetLeft<-60){
                e.currentTarget.style.left='-60px'
            }else{
                e.currentTarget.style.left='0px'
            }
        },
    },
    beforeCreate: function() {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        
       
        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function() {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function() {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function() {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function() {
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar {
    background: $header_background;
    box-shadow: none;
    a {
        color: #ffffff;
    }
    .right {
        float: right;
        line-height: 44px;
        color: #ffffff;
        font-size: 14px;
    }
}

.mui-title {
    color: #ffffff;
    ul {
        display: flex;
        background: #ffffff;
        color: #007aff;
        width: 200px;
        margin: 8px auto 0px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-size: 12px;
        border-radius: 3px;
        overflow: hidden;
    }
    li {
        width: 50%;
    }
    li.active {
        background: #007aff;
        color: #ffffff;
    }
}

.box_2{
    overflow: hidden;
    >li.active{
        transition: all 0.3s;
    }
    >li{
        position: relative;
        display: flex;
        background: #ffffff;
        border-bottom: 1px solid #E5E5E5;
        >div:nth-child(2){
            flex-grow: 1;
        }
    }
    .left_1{
        padding: 0px 0.16rem 0px 0px;
        position: absolute;
        width: 100%;
        left: -100%;
        height: 100%;
        top: 0px;
        display:flex;
        align-items: center;
        justify-content: flex-end;
    }
    .cont_1{
        display: flex;
        padding: 0.1rem ;
        >li:nth-child(1){
            flex-shrink: 0;
            width: 0.93rem;
        	height: 0.7rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        >li:nth-child(2){
            padding: 0px 0.1rem;
            width:0;
            flex-grow: 1;
            h1{
                font-weight: 400;
                color: rgba(80, 80, 80, 1);
            	font-size: 0.14rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h2{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
                font-size: 0.12rem;
                margin: 0.1rem 0px 0.1rem;
            }
            h3{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
            	font-size: 0.12rem;
            }
        }
        >li:nth-child(3){
            text-align: right;
            flex-shrink: 0;
            color: rgba(166, 166, 166, 1);
        	font-size: 0.12rem;
            i{
                font-size: 0.2rem;
            }
        }
    }
    .right_1{
        position: absolute;
        width: 100%;
        left: 100%;
        top: 0px;
        height: 100%;
        background: #d43030;
        font-size: 0.14rem;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 0px 0.16rem 0px;
    }
}


.box_3{
    overflow: hidden;
    >li.active{
        transition: all 0.3s;
    }
    >li{
        position: relative;
        display: flex;
        background: #ffffff;
        border-bottom: 1px solid #E5E5E5;
        >div:nth-child(2){
            flex-grow: 1;
        }
    }
    .left_1{
        padding: 0px 0.16rem 0px 0px;
        position: absolute;
        width: 100%;
        left: -100%;
        height: 100%;
        top: 0px;
        display:flex;
        align-items: center;
        justify-content: flex-end;
    }
    .cont_1{
        display: flex;
        padding: 0.1rem ;
        >li:nth-child(1){
            flex-shrink: 0;
            width: 0.93rem;
        	height: 0.7rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        >li:nth-child(2){
            padding: 0px 0.1rem;
            width:0;
            flex-grow: 1;
            h1{
                font-weight: 400;
                color: rgba(80, 80, 80, 1);
            	font-size: 0.14rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h2{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
                font-size: 0.12rem;
                 margin: 0.1rem 0px 0.1rem;
            }
            h3{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
            	font-size: 0.12rem;
            }
        }
        >li:nth-child(3){
            text-align: right;
            flex-shrink: 0;
            color: rgba(166, 166, 166, 1);
        	font-size: 0.12rem;
            i{
                font-size: 0.2rem;
            }
        }
    }
    .right_1{
        position: absolute;
        width: 100%;
        left: 100%;
        top: 0px;
        height: 100%;
        background: #d43030;
        font-size: 0.14rem;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 0px 0.16rem 0px;
    }
}




.radio_1 {
    display:inline-block;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 16px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    overflow: hidden;
    i {
        font-size: 8px;
        display: none;
    }
}

.radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
    }
}
</style>
