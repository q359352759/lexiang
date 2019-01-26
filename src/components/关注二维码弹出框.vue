<template>
    <div class="关注二维码">
        <div class="大框">
            <div class="内容">
                <div class="关闭" @click="设置手动关闭(true)">
                    <i class="icon iconfont icon-quxiao"></i>
                </div>
                <div class="图片">
                    <img src="image/guanzhu.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name:"",
    data () {
        return {
            
        }
    },
    methods: {
        ...mapActions({
            设置手动关闭:'user/设置手动关闭'
        })
    },
}
</script>

<style lang="scss" scoped>
.关注二维码{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    .大框{
        width: 205px;
    }
    .内容{
        background: #ffffff;
        position: relative;
        .关闭 {
            width: 36px;
            height: 36px;
            background: #ffffff;
            color: #999999;
            text-align: center;
            line-height: 36px;
            position: absolute;
            right: 0px;
            top: -50px;
            border-radius: 100%;
            ::after {
                position: absolute;
                left: 0px;
                right: 0px;
                bottom: -14px;
                margin: auto;
                height: 14px;
                width: 1px;
                content: "";
                background: #ffffff;
            }
        }
        .提示语_1{
            text-align: center;
            padding: 14px 0px;
            font-size: 14px;
        }
        .图片{
            font-size: 0px;
            min-height: 285px;
            img{
                width: 100%;
            }
        }
    }
}
</style>
