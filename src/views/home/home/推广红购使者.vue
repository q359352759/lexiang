<template>
    <div class="推广图标" ref="推广图标" @click="跳转()" :class="{'active':!拖动,'波浪':波浪}" :style="{'top':top+'px','left':left+'px'}" @touchmove="开始拖动($event)" @touchend="touchend($event)">
        <img src="image/waikuan.png" alt="" srcset="">
        <div class="遮罩"></div>
        <div class="遮罩1"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
function touchmove_2(e) {
    e.preventDefault();
}
export default {
    name: "",
    data() {
        return {
            拖动: false,
            波浪: true,
            tp: 0
        };
    },
    computed: {
        ...mapGetters({
            top: "home/推广小图标/top",
            left: "home/推广小图标/left",
            代理人信息: "g_agentUser"
        })
    },
    methods: {
        ...mapActions({
            设置top: "home/推广小图标/设置top",
            设置left: "home/推广小图标/设置left"
        }),
        跳转() {
            console.log(this.代理人信息);
            this.$router.push("/shizhe/tuiguang");
            // if(!this.代理人信息){
            //     this.$router.push('/shizhe/tuiguang')
            // }else{
            //     if(this.代理人信息.type==1){
            //         this.$router.push('/Agent')
            //     }else{
            //         this.$router.push('/shizhe/honggoushizhe')
            //     }
            // }
        },
        开始拖动(x) {
            this.拖动 = true;
            var targetTouches = x.targetTouches[0];
            this.tp = targetTouches.clientY - 25;
            this.设置top(targetTouches.clientY - 25);
            this.设置left(targetTouches.clientX - 25);
        },
        //手指头松开
        touchend(x) {
            if (!this.拖动) {
                return;
            }
            this.拖动 = false;
            var ww = window.innerWidth;
            var wh = window.innerHeight;
            if (this.$store.state.clientX - 25 > ww / 2) {
                this.class_name = "right";
            } else {
                this.class_name = "left";
            }
            if (this.left > ww / 2) {
                var left = ww - 60;
            } else {
                var left = 10;
            }
            this.设置left(left);
            if (this.tp < 10) {
                var top = 10;
                this.设置top(top);
            } else if (this.tp > wh - 60) {
                var top = wh - 60;
                this.设置top(top);
            }
        },
        动画切换() {
            this.波浪 = false;
            setTimeout(x => {
                this.波浪 = true;
            }, 1000);
        }
    },
    mounted() {
        this.$refs.推广图标.addEventListener("touchmove", touchmove_2, {
            passive: false
        });
        setInterval(x => {
            this.动画切换();
        }, 1000 * 5);
    }
};
</script>

<style lang="scss" scoped>
.推广图标.active {
    transition: all 0.3s;
}
.推广图标 {
    width: 50px;
    height: 50px;
    position: fixed;
    top: 50%;
    left: 10px;
    z-index: 11;
    opacity: 0;
    img {
        width: 100%;
        height: 100%;
    }
    .遮罩 {
        width: 100%;
        height: 100%;
        // background: #ffffff;
        position: absolute;
        top: 0px;
        left: 0px;
        // border:2px solid #ffffff;
        box-shadow: 0px 0px 5px 25px #ffffff inset;
        border-radius: 100%;

        z-index: 1;
    }
    .遮罩1 {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        // box-shadow: 0px 0px 5px 25px rgba(255, 255, 255, 0.5) inset;
        border: 10px solid rgba(255, 255, 255, 1);
        transform: scale(0);
        opacity: 0;
        border-radius: 100%;
    }
}
.推广图标.波浪 {
    opacity: 0.9;
    .遮罩 {
        transition: all 1s;
        box-shadow: 0px 0px 0px 0px #ffffff inset;
    }
    .遮罩1 {
        transition: all 5s;
        border: 0px solid rgba(255, 255, 255, 0.5);
        transform: scale(1);
        opacity: 1;
    }
}

// @keyframes test{
//     0%{
//         box-shadow: 0px 0px 5px 25px #ffffff inset;
//     }100%{
//         box-shadow: 0px 0px 0px 0px #ffffff inset;
//     }
// }

.推广图标::after {
    // position: absolute;
    // left: 0px;
    // right: 0px;
    // top: 0px;
    // bottom: 0px;
    // margin: auto;
    // border: 1px solid #e97869;
    // content: '';
    // border-radius: 100%;
    // animation: tuiguangdonghua 3s ease infinite;
}
@keyframes tuiguangdonghua {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(1.3);
        opacity: 0;
    }
}
</style>
