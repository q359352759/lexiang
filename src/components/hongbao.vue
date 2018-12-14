<template>
    <div class="hongbao">
        <img src="image/redpackage.png" alt="" srcset="">
        <div @tap="click($event)">
            <span :style="{'font-size':fontsize}" ref="fontsize">{{money ? money : 0}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    props:{
        money:'',       //中间金额
        padding:'',     //pading
        width:'',       //
        height:'',      //
    },
    data(){
        return{
            fontsize:''
        }
    },
    mounted() {
        var span=this.$refs.fontsize
        // console.log(span.clientWidth,span.parentElement.offsetWidth)
        if(span.clientWidth>span.parentElement.offsetWidth){
            this.fontsize=span.parentElement.offsetWidth/span.clientWidth*20+'px';
        }
    },
    watch:{
        money(){
            this.$nextTick(function(){
                console.log('渲染已经完成')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.hongbao{
    position: relative;
    img{
        width: 100%;
    }
    >div{
        padding: 15px 0px 0px;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-size: 25px;
    }
}
</style>


