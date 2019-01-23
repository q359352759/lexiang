<template>
    <div id="circularNav" ref="circularNav">
        <div class="mask" v-show="mask_show" @click="change_mask_show(false)"></div>
        <!-- <ul class="move" @mousedown="mousedown($event)" @mousemove="mousemove($event)" @mouseup="mouseup($event)"> -->
        <ul :class="class_name" :style="{'top':this.$store.state.clientY+'px','left':this.$store.state.clientX+'px'}">
            <li ref="中心点" @click="change_mask($event)" @touchmove="touchmove($event)" @touchend="touchend($event)">
                <img src="image/12121.png" alt="">
            </li>
            <li class="min_1 min_11" v-show="mask_show">
                <div @click="go('/home')">
                    <i class="icon iconfont icon-shouye"></i>
                </div>
                <span @click="go('/home')">主页</span>
            </li>
            <li class="min_1 min_12" v-show="mask_show">
                <div @click="go_Agent()">
                    <i class="icon iconfont icon-woshou"></i>
                </div>
                <span @click="go_Agent()">代理</span>
            </li>
            <li class="min_1 min_13" v-show="mask_show">
                <div @click="ShopInstructions()">
                    <i class="icon iconfont icon-dianpu1"></i>
                </div>
                <span @click="ShopInstructions()">店铺</span>
            </li>

            <li class="min_1 min_14" v-show="mask_show">
                <div @click="go('/my')">
                    <i class="icon iconfont icon-geren"></i>
                </div>
                <span @click="go('/my')">我的</span>
            </li>
        </ul>
    </div>
</template>

<script>
function touchmove_1(e) {
    e.preventDefault();
}

// import draggable from 'vuedraggable'
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Swiper from 'swiper';
import { mapActions } from "vuex";
export default {
    name: "circularNav",
    components: {
        // HelloWorld
    },
    data() {
        return {
            mask_show: false,
            clientX: "",
            clientY: "",
            is_touchmove: false, //是否拖动
            class_name: "right",
            active: true
        };
    },
    computed: {
        // clientY(){
        //     return this.$store.state.clientY;
        // }
    },
    methods: {
        ...mapActions({
            获取店铺:'getMyshop'
        }),
        //跳转我的店铺
        ShopInstructions() {
            this.mask_show = false;
            if (
                !localStorage.loginDate ||
                localStorage.loginDate == "" ||
                localStorage.loginDate == null ||
                localStorage.loginDate == undefined ||
                localStorage.loginDate == "undefined"
            ) {
                console.log("没有登录");
            }
            if (!this.$store.state.myshop) {
                this.$router.push("/ShopInstructions");
            } else if (
                this.$store.state.myshop.state == 0 ||
                this.$store.state.myshop.state == 2
            ) {
                this.$router.push("/shenqingkaidian");
            } else if (this.$store.state.myshop.state == 1) {
                this.$router.push("/myshop");
            } else {
                this.$router.push("/ShopInstructions");
            }
        },
        //跳转代理
        go_Agent() {
            this.mask_show = false;
            console.log(this.$store.state.agentUser);
            if (
                !this.$store.state.agentUser ||
                this.$store.state.agentUser == null ||
                this.$store.state.agentUser == ""
            ) {
                // this.$router.push("/ApplicationAgent"); //跳转注册代理人页面
                this.$router.push("/agent/ApplicationNotes"); //跳转注册代理人页面
            } else {
                if (this.$store.state.agentUser.type == 1) {
                    this.$router.push("/Agent"); //跳转代理人
                } else {
                    //跳转红购使者
                    this.$router.push("/shizhe/honggoushizhe");
                }
            }
        },
        change_mask(e) {
            this.mask_show = !this.mask_show;
            e.target.style.opacity = this.mask_show ? 1 : 0.7;
        },
        change_mask_show(x) {
            this.mask_show = x;
            this.$refs.中心点.style.opacity = 0.7;
        },
        go(x) {
            this.mask_show = false;
            this.$router.push(x);
            this.$refs.中心点.style.opacity = 0.7;
        },
        //开始拖动
        touchmove(x) {
            this.class_name = "";
            this.mask_show = false;
            this.is_touchmove = true;
            var event = x.target;
            var targetTouches = x.targetTouches[0];
            // targetTouches.style.opacity=0.3
            // targetTouches
            // target
            x.target.style.opacity = 0.5;
            var obj = {
                clientX: targetTouches.clientX - 25,
                clientY: targetTouches.clientY - 25
            };
            this.$store.state.clientX = targetTouches.clientX - 25;
            this.$store.state.clientY = targetTouches.clientY - 25;
        },
        //手指头松开
        touchend(x) {
            // console.log(window.innerHeight);
            // console.log(this.$store.state.clientX);
            x.target.style.opacity = 0.7;
            var ww = window.innerWidth;
            var wh = window.innerHeight;
            if (this.$store.state.clientX - 25 > ww / 2) {
                this.class_name = "right";
            } else {
                this.class_name = "left";
            }

            if (this.$store.state.clientX > ww / 2) {
                this.$store.state.clientX = ww - 55;
            } else {
                this.$store.state.clientX = 5;
            }

            if (this.$store.state.clientY < 90) {
                this.$store.state.clientY = 90;
            } else if (this.$store.state.clientY > wh - 120) {
                this.$store.state.clientY = wh - 120;
            }
        }
    },
    beforeCreate: function () {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function () {
        this.获取店铺()
        var ww = window.innerWidth;
        if (!this.$store.state.clientX || this.$store.state.clientX == "") {
            this.$store.state.clientX = ww - 55;
        }
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function () {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function () {
        //阻止这个页面下拉
        // setTimeout(function() {
        //     document.getElementById("circularNav").addEventListener("touchmove", touchmove_1, { passive: false });
        // }, 500);
        this.$refs.circularNav.addEventListener("touchmove", touchmove_1, {
            passive: false
        });

        //获取代理人信息
        this.$store.dispatch("actions_agentUser");
        //{ passive: false }
        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function () {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
        // try {
        //     document.getElementById("circularNav").removeEventListener("touchmove", touchmove_1, { passive: false });
        // } catch (error) {}
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // console.group('destroyed 销毁完成状态===============》');
    }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/config.scss";

#circularNav .mask {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
}
#circularNav ul {
    position: fixed;
    z-index: 11;
}
#circularNav ul > li:nth-child(1) {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    position: relative;
    opacity: 0.7;
}
#circularNav ul > li:nth-child(1)::after {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    border: 1px solid #e97869;
    content: "";
    border-radius: 100%;
    animation: circularNav_donghua 3s ease infinite;
}
@keyframes circularNav_donghua {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(1.3);
        opacity: 0;
    }
}
#circularNav ul > li:nth-child(1) img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
}
#circularNav .min_1 {
    text-align: center;
    position: absolute;
    transition: all 0.5s;
}
/* #circularNav .min_1 div,
    #circularNav .min_1 div,
    #circularNav .min_1 div, */
#circularNav .min_1 div {
    width: 34px;
    height: 34px;
    text-align: center;
    background: $header_background;
    line-height: 35px;
    margin: 0px auto;
    border-radius: 50%;
    color: #ffffff;
}
#circularNav .min_1 div i {
    font-size: 22px;
}
#circularNav .min_1 div > img {
    width: 100%;
}
#circularNav .min_1 span {
    font-size: 12px;
    color: #ffffff;
}
#circularNav .right,
#circularNav .left {
    transition: all 0.5s;
}
#circularNav .right .min_11 {
    top: -70px;
    left: 7px;
}
#circularNav .right .min_12 {
    top: -40px;
    left: -40px;
}
#circularNav .right .min_13 {
    top: 30px;
    left: -40px;
}
#circularNav .right .min_14 {
    bottom: -70px;
    left: 7px;
}
#circularNav .left .min_11 {
    top: -70px;
    left: 7px;
}
#circularNav .left .min_12 {
    top: -40px;
    left: 60px;
}
#circularNav .left .min_13 {
    top: 30px;
    left: 60px;
}
#circularNav .left .min_14 {
    bottom: -70px;
    left: 7px;
}
</style>
