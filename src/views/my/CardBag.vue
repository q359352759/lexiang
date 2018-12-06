<template>
    <div id="Collection">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">卡券包</h1>
            <span class="lingdang">
                <span>2</span>
                <i class="icon iconfont icon-lingdang"></i>
            </span>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li :class="{'active':type==0}" @tap="select_type(0)">
                    <div>签到红包</div>
                    <div>￥0</div>
                </li>
                <li  :class="{'active':type==1}" @tap="select_type(1)">
                    <div>平台红包</div>
                    <div>￥0</div>
                </li>
                <li  :class="{'active':type==2}" @tap="select_type(2)">
                    <div>店铺红包</div>
                    <div>￥0</div>
                </li>
                <li  :class="{'active':type==3}" @tap="select_type(3)">
                    <div>商品红包</div>
                    <div>￥0</div>
                </li>
            </ul>

            <ul class="box_2">
                <li :class="{'active':type_1==0}" @tap="select_type_1(0)">签到红包</li>
                <li :class="{'active':type_1==1}" @tap="select_type_1(1)">签到记录</li>
            </ul>

            <ul class="Red_envelopes">
                <li v-for="(item, index) in 2" :key="index">
                    <div class="header_1">
                        <span class="time_1 mui-pull-right">2018.11.8 09:23:30</span>
                        <span class="title_1">韩国欧巴料理</span>
                    </div>
                    <ul class="item">
                        <li class="img_box">
                            <img src="image/hongbao_1.png" alt="" srcset="">
                        </li>
                        <li>
                            <div class="title_1">
                                <span class="money">￥10</span>
                                <span class="type">签到红包</span>
                            </div>
                            <div class="title_2">
                                可连续签到7天
                            </div>
                            <div class="time_2">
                                2019.1.1失效
                            </div>
                        </li>
                        <li>
                            <div></div>
                            <div></div>
                        </li>
                        <li>
                            <div v-show="index%2!=0" class="type_1">红色</div>
                            <div v-show="index%2==0" class="type_2">灰色</div>
                            <span  v-show="index%2!=0" class="time_1">2018.12.01</span>
                        </li>
                    </ul>
                </li>
            </ul>



                <!-- 商品红包 -->
                <ul class="Red_envelopes" v-if="type==3">
                    <li v-for="(item, index) in CardPackge_1.list" :key="index">
                        <div class="header_1">
                            <span class="time_1 mui-pull-right">{{item.createTime | filter_time("yyyy.MM.dd hh:mm")}}</span>
                            <span class="title_1" @tap="go_shop(item)">{{item.shopName}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            type:0,
            type_1:0,       //0签到红包 1 签到记录
        };
    },
    computed: {

    },
    methods: {
        //选择 签到红包 平台红包  店铺红包 商品红包
        select_type(x){ 
            this.type=x
        },
        //签到红包 签到记录
        select_type_1(x){
            this.type_1=x
        }
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
.mui-bar-nav{
    box-shadow: none;
    .lingdang{
        position: absolute;
        font-size: 20px;
        color: #ffffff;
        right: 15px;
        top: 12px;
        span{
            position: absolute;
            top: -3px;
            right: -3px;
            background: #d43030;
            min-width: 12px;
            height: 12px;
            font-size: 10px;
            line-height: 12px;
            text-align: center;
            border-radius: 12px;
        }
    }
}
.box_1{
    display: flex;
    background: $header_background;
    color: #ffffff;
    font-size: 14px;
    justify-content: space-between;
    text-align: center;
    padding: 0px 0.35rem;
    li{
        >div:nth-child(1){}
        >div:nth-child(2){
            font-weight: bold;
        }
    }
    li.active{
        color: #ffc300;
        border-bottom: 2px solid #ffc300;
    }
}

.box_2{
    display: flex;
    justify-content: space-evenly;
    background: #ffffff;
    color: rgba(56, 56, 56, 1);
    font-size: 14px;
    line-height: 34px;
    li{
        padding: 0px 5px;
    }
    .active{
        border-bottom: 2px solid $header_background;
    }
}

// 红包用
.Red_envelopes{
    padding: 0.07rem 0.13rem;
    >li{
        background: #ffffff;
        padding: 1px 0px;
        border-radius: 5px;
        margin: 0px 0px 8px 0px;
    }
    .header_1{
        padding: 7px 10px 5px 18px;
        line-height: 14px;
        .title_1{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .time_1{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
    }
    .item{
        margin: 0px 11px 7px;
        background-color: rgba(255, 243, 243, 1);
        border-radius: 5px;
        display: flex;
        padding: 9px 0px;
        >li:nth-child(1){
            flex-shrink: 0;
            margin: 0px 11px 0px 7px;
            width: 50px;
            height: 50px;
            font-size: 0;
            img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
        }
        >li:nth-child(2){
            flex-grow: 1;
            .title_1{
                .money{
                    color: rgba(212, 48, 48, 1);
                	font-size: 14px;
                }
                .type{
                    margin: 0px 0px 0px 6px;
                    color: rgba(212, 48, 48, 1);
                	font-size: 10px;
                }
            }
            .title_2{
                color: rgba(166, 166, 166, 1);
            	font-size: 10px;
            }
            .time_2{
                color: rgba(166, 166, 166, 1);
	            font-size: 10px;
            }
        }
        >li:nth-child(3){
            flex-shrink: 0;
            width: 1px;
            border-left:1px dashed  #ff5733;
            position: relative;
            div{
                width: 15px;
                height: 15px;
                background: #ffffff;
                border-radius: 100%;
                position: absolute;
                left: -8px;
            }
            >div:nth-child(1){
                top: -15px;
            }
            >div:nth-child(2){
                bottom: -15px;
            }
        }
        >li:nth-child(4){
            width: 74px;
            text-align: center;
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            .type_1{
                width: 100%;
                color: rgba(212, 48, 48, 1);
            	font-size: 14px;
            }
            .type_2{
                width: 100%;
                color: rgba(166, 166, 166, 1);
            	font-size: 14px;
            }
            .time_1{
                width: 100%;
                color: rgba(166, 166, 166, 1);
                font-size: 10px;
                line-height: 10px;
            }
        }
    }
}
</style>
