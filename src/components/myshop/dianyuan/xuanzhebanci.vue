<template>
    <div class="Banci">
        <div class="mask" @click="close()"></div>
        <ul>
            <li>
                <div @click="change_radio_2()" class="radio_1" :class="{'active':false}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <div>早班（9:00-18:00）</div>
            </li>
            <li>
                <div @click="change_radio_2()" class="radio_1" :class="{'active':false}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <div>晚班（9:00-18:00）</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'',
    data () {
        return {
            
        }
    },
    methods: {
        close(){
            this.$emit('setbancishow',false,123);
        }
    },
}
</script>

<style lang="scss" scoped>

.Banci{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    .mask{
        background: rgba(0,0,0,0.3);
        height: 100%;
        width: 100%;
    }
    ul{
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        background: #ffffff;
        padding: 0px 0px 40px 0px;
        >li{
            display: flex;
            align-items: center;
            padding: 15px 20px 12px;
            .radio_1{
                margin: 0px 8px 0px 0px;
            }
        }
    }
}
</style>

