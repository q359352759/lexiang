<template>
    <div class="Btn">
        <button :style="styles" :type="type">{{value}}</button>
    </div>
</template>

<script>
// @click.native
// 如果想在外面使用点击事件
export default {
    name:'',
    props: {
        value:{
            default:"确定"
        },
        type:{
            default:'button'         // submit 或者 button 之类的
        },
        styles:{
            default:''
        }
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.Btn{
    text-align: center;
    button{
        width: 175px;
        height: 34px;
        color: rgba(255, 255, 255, 1);
        background-color: $header_background;
        border-radius: 34px;
        font-size: 14px;
        padding: 0px 0px 0px 2px;
        box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
        border: none;
        letter-spacing: 2px;
    }
}
</style>


