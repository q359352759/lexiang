<template>
    <div class="单个排序">
        <div>{{name}}</div>
        <div class="img_box">
            <!-- 未选择 -->
            <img src="image/paixun.png" v-show="type==0" alt="" srcset="">
            <!-- 降序 -->
            <img src="image/paixuxia.png" v-show="type==1" alt="" srcset="">
            <!-- 升序 -->
            <img src="image/paixushang.png" v-show="type==2" alt="" srcset="">
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    props: {
        name:{
            default:"未设置",
        },
        type:{
            default:0,      //0表示未选中 1 箭头向下 2 箭头向上
        }
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.单个排序{
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(128, 128, 128, 1);
	font-size: 12px;
    .img_box{
        font-size: 0px;
        display: flex;
        align-items: center;
    }
    img{
        width: 12px;
        height: 12px;
    }
}
</style>
