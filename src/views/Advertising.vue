<template>
    <div id="Advertising">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{this.$store.state.isweixin ? "":"广告机"}}</h1>
        </header>
        <div class="mui-content">
            <div class="box_1">
                <img src="image/7.jpg" alt="">
            </div>

            <ul class="mui-table-view box_2">
                <li class="mui-table-view-cell">
                    <div>一键拨号：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>一键微信：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>一键跳转：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>悬浮广告：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>语音广告：</div>
                    <div>支持！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>全屏广告：</div>
                    <div>支持！</div>
                </li>
            </ul>

            <ul class="mui-table-view box_2">
                <li class="mui-table-view-cell">
                    <div>广告数量：</div>
                    <div>3600条！</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>有效时长：</div>
                    <div>365天！</div>
                </li>
            </ul>

            <ul class="mui-table-view box_2">
                <li class="mui-table-view-cell">
                    <div>套餐价格：</div>
                    <div>498元</div>
                </li>
                <li class="mui-table-view-cell">
                    <div>平均价格:</div>
                    <div>0.14元/条</div>
                </li>
            </ul>

            <ul class="box_3">
                <li>视频介绍</li>
                <li>效果展示</li>
            </ul>
            <div class="Agreement">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <span @click="change_radio_2()"> 我也阅读并同意</span>
                <span @click="RegistrationAgreement()">《用户注册协议》</span>
            </div>

            <button @click="goumai()" class="btn_1">购买</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            radio_type_2: true
        };
    },
    methods: {
        goumai(){
            mui.toast("功能开发中！", { duration: 2000, type: "div" });
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
        if (this.$store.state.isweixin) {
            document.getElementsByTagName("title")[0].innerText = "广告机";
        }
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
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#Advertising {
    height: 100%;
    .mui-content {
        height: 100%;
        // background: #ffffff;
    }
}
#Advertising .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#Advertising .mui-title {
    color: #ffffff;
}

#Advertising .box_1 {
    img {
        width: 100%;
    }
}

#Advertising .box_2 {
    margin: 5px 0px 0px 0px;
    font-size: 0.14rem;
    .mui-table-view-cell {
        display: flex;
        padding: 0.1rem 0px;
        > div:nth-child(1) {
            width: 1.1rem;
            text-align: right;
            color: rgba(80, 80, 80, 1);
        }
        > div:nth-child(2) {
            flex-grow: 1;
            text-align: center;
            color: rgba(212, 48, 48, 1);
            font-weight: bold;
        }
    }
    .mui-table-view-cell::after {
        left: 0px;
    }
}
#Advertising .box_3 {
    padding: 0.1rem;
    display: flex;
    justify-content: space-around;
    li {
        font-size: 0.11rem;
        background: #ffffff;
        color: $header_background;
        height: 0.2rem;
        line-height: 0.2rem;
        padding: 0px 10px;
        border-radius: 0.2rem;
    }
}

#Advertising .Agreement {
    display: flex;
    padding: 0px 20px;
    font-size: 12px;
    align-items: center;
    margin: 0px 0px;
    height: 0.38rem;
    background: #ffffff;
    > span:nth-child(2) {
        margin: 0px 0px 0px 5px;
    }
    > span:nth-child(3) {
        /* color: rgba(58, 182, 237, 1) */
        color: rgba(42, 130, 228, 1);
    }
    > span:nth-child(4) {
        flex-grow: 1;
        text-align: right;
        color: rgba(42, 130, 228, 1);
    }
}

#Advertising .btn_1 {
    width: 1.7rem;
    height: 0.28rem;
    margin: 0.18rem auto 0.5rem;
    display: block;
    font-size: 0.14rem;
    background: $header_background;
    color: #ffffff;
    border-radius: 0.28rem;
    border: none;
}

// 单选
#Advertising .radio_1 {
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 15px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    font-size: 12px;
    i {
        font-size: 10px;
        display: none;
    }
}
#Advertising .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
    }
}
</style>
