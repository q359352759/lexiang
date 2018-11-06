<template>
    <div id="my">
        <header class="mui-bar mui-bar-nav" v-if="!this.$store.state.isweixin">
            <h1 class="mui-title">我的</h1>
        </header>
        <div class="mui-content">

            <ul class="box_1">
                <li class="img_box">
                    <img v-if="userInfo.headImgUrl!='' && userInfo.headImgUrl!=null" :src="userInfo.headImgUrl" alt="">
                    <img v-if="userInfo.headImgUrl=='' || userInfo.headImgUrl==null" src="@/assets/image/lxlogo_180.png" alt="">
                </li>
                <li class="type_box">
                    <div>{{(userInfo.nickname!='' && userInfo.nickname!=null) ? userInfo.nickname : userInfo.phone}}</div>
                    <span><i class="icon iconfont icon-31erweima"></i></span>
                </li>
                <li class="explain_box">
                    <!-- <div>说明：点击头像选择图片上传</div>
                    <div>点击用户名更正昵称</div> -->
                </li>
            </ul>

            <div class="box_2">
                <ul>
                    <li>LB：0个</li>
                    <li>红包：0元</li>
                    <li>余额：0元</li>
                </ul>
                <div @click="AssetDetails()">>></div>
            </div>

            <div class="box_3">
                <ul class="title_1">
                    <li>我的订单</li>
                    <li>查看更多订单</li>
                    <li><i class="mui-icon mui-icon-arrowright"></i></li>
                </ul>
                <ul class="list">
                    <li>
                        <div><i class="icon iconfont icon-daifukuan"></i></div>
                        <span>待付款</span>
                    </li>
                    <li>
                        <div><i class="icon iconfont icon-daifahuo"></i></div>
                        <span>待发货</span>
                    </li>
                    <li>
                        <div><i class="icon iconfont icon-daishouhuo"></i></div>
                        <span>待收货</span>
                    </li>
                    <li>
                        <div><i class="icon iconfont icon-pingjia"></i></div>
                        <span>待评价</span>
                    </li>
                    <li>
                        <div><i class="icon iconfont icon-shouhouwuyou"></i></div>
                        <span>售后</span>
                    </li>
                </ul>
            </div>

            <ul class="mui-table-view box_4">
                <li class="mui-table-view-cell " @click="ApplicationShop()">
                    <a class="mui-navigate-right">
                        <span style="color:rgba(212, 48, 48, 1)">我要开店</span>
                    </a>
                </li>
                <li class="mui-table-view-cell " @click="Advertising()">
                    <a class="mui-navigate-right">
                        <span style="color:rgba(212, 48, 48, 1)">广告机</span>
                    </a>
                </li>
            </ul>

            <ul class="mui-table-view box_4">
                <li class="mui-table-view-cell" @click="LoginPassword()">
                    <a class="mui-navigate-right">
                        <span>登录密码</span>
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="PaymentPassword()">
                    <a class="mui-navigate-right">
                        <span>支付密码</span>
                    </a>
                </li>
            </ul>

            <ul class="mui-table-view box_5">
                <li class="mui-table-view-cell" @click="RealName()">
                    <a class="mui-navigate-right">
                        <span>实名认证</span>
                        <span>{{userInfo.iaiState!=1 ? '未认证' : '已认证'}}</span>
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right">
                        <span>收货地址</span>
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right">
                        <span>关于我们</span>
                    </a>
                </li>
            </ul>

            <div @click="go_out()" class="go_out">退出登录</div>

        </div>

        <circularNav />
    </div>
</template>
<script>
import circularNav from "@/components/circularNav.vue";
export default {
    name: "my",
    components: { circularNav },
    data() {
        return {
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
        //申请店铺
        ApplicationShop(){
            this.$router.push('/ApplicationShop');
        },
        //退出
        go_out() {
            this.$store.commit("setloginDate", "");
            localStorage.removeItem("loginDate");
            localStorage.removeItem("userInfo");
            this.$router.push("/login");
        },
        //修改登录密码
        LoginPassword() {
            this.$router.push("/LoginPassword");
        },
        //修改支付密码
        PaymentPassword() {
            this.$router.push("/PaymentPassword");
        },
        //资产详情
        AssetDetails() {
            this.$router.push("/AssetDetails");
        },
        //实名认证
        RealName() {
            if (this.userInfo.iaiState == 0) {
                this.$router.push("/RealName");
            } else {
                this.$router.push("/AlreadyRealName");
            }
        },
        //前往广告机
        Advertising() {
            this.$router.push("/Advertising");
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
            document.getElementsByTagName("title")[0].innerText = "我的";
        }
        this.$store.commit("setCurrent");
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
        userInfo(x) {
            console.log("监听userInfo数据变化", x);
            this.$store.commit("setagentUser");
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#my {
    height: 100%;
    overflow: auto;
}
#my .mui-bar {
    background: $header_background;
    box-shadow: none;
}

#my .mui-title {
    color: #ffffff;
}

#my .swiper-pagination-bullet-active {
    background: $header_background;
}

#my .box_1 {
    background: $header_background;
    padding: 0.3rem;
    display: flex;
}

#my .box_1 .img_box {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    background: #cccccc;
}

#my .box_1 .img_box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
}

#my .box_1 .type_box {
    color: #ffffff;
    margin: 0px 0.1rem;
    white-space: nowrap;
    font-size: 14px;
}

#my .box_1 .type_box div {
    margin: 0px 0px 0.1rem 0px;
}

#my .box_1 .explain_box {
    color: rgba(255, 195, 0, 1);
    font-size: 12px;
}

#my .box_2 {
    display: flex;
    background: $header_background;
    padding: 0.15rem;
    color: #ffffff;
}

#my .box_2 ul {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    padding: 0px 0.1rem 0px 0px;
}

#my .box_3 {
    background: #ffffff;
    margin: 4px 0px 0px 0px;
}

#my .box_3 .title_1 {
    display: flex;
    align-items: center;
    padding: 0.1rem 0.15rem;
    font-size: 15px;
    border-bottom: 1px solid #cccccc;
}

#my .box_3 .title_1 i {
    font-size: 20px;
}

#my .box_3 .title_1 > li:nth-child(1) {
    flex-grow: 1;
    font-weight: bold;
}

#my .box_3 .title_1 > li:nth-child(2),
#my .box_3 .title_1 > li:nth-child(3) {
    color: #8c8c8c;
}

#my .box_3 {
    .list {
        display: flex;
        padding: 0.15rem 0px;
        text-align: center;
        > li {
            width: 20%;
        }
        div {
            font-size: 0.3rem;
            color: rgba(90, 199, 244, 1);
            margin: 0px 0px 0.05rem 0px;
        }

        span {
            font-size: 0.13rem;
        }
    }
}

#my .box_4 {
    // font-size: 12px;
    color: rgba(80, 80, 80, 1);
    margin: 5px 0px 0px 0px;

    .mui-table-view-cell:after {
        left: 0px;
    }

    span {
        font-size: 12px;
    }
}

#my .box_5 {
    color: rgba(80, 80, 80, 1);
    margin: 5px 0px 0px 0px;

    .mui-table-view-cell:after {
        left: 0px;
    }

    a {
        padding-right: 40px;
        display: flex;
        justify-content: space-between;
    }

    span {
        font-size: 12px;
    }
}

.go_out {
    width: 158px;
    height: 30px;
    line-height: 30px;
    color: rgba(255, 255, 255, 1);
    background-color: $header_background;
    border-radius: 30px;
    font-size: 14px;
    text-align: center;
    margin: 0.2rem auto 30px;
}
</style>
