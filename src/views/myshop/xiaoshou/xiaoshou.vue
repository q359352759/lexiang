<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">销售</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li class="title">
                    <div>今日销售额</div>
                    <div class="money">￥-0</div>
                </li>
                <li class="flex">
                    <div>
                        <div>本月销售额</div>
                        <div class="money">￥-0元</div>
                    </div>
                    <div>
                        <div>累计销售额</div>
                        <div class="money">￥-0元</div>
                    </div>
                </li>
                <li class="baobiao">报表</li>
            </ul>

            <div class="box_2">
                <div><sort :type="sort.type" :sortType="sort.sortType" :list="sort.list" @setSort="get_sort"/></div>
                <div><timeBox @setTime="get_time"/></div>
            </div>

            

        </div>
    </div>
</template>

<script>
// 排序
import sort from "@/components/sort.vue";
//时间
import timeBox from "@/components/time/timeBox.vue";
export default {
    name:'',
    components: {
        sort,
        timeBox
    },
    data () {
        return {
            //传递的参数
            sort:{
                type:1,         //时间类型
                sortType:1,
                list:[
                    {'name':'时间',type:1},
                    {'name':'业绩',type:2},
                    {'name':'其他',type:3},
                ]
            },
        }
    },
    methods: {
        //接收排序参数
        get_sort(x){
            console.log(x)
        },
        //改变时间
        get_time(x){
            console.log(x)
        }
    }
}
</script>

<style lang="scss" scoped>
.box_1{
    margin: 10px 10px 5px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
    color: #505050;
	font-size: 12px;
    line-height: 18px;
    padding: 15px 0px 7px;
    position: relative;
    .title{
        margin: 0px 0px 12px 0px;
    }
    .money{
        color: #d43030;
    }
    .flex{
        display: flex;
        position: relative;
        >div{
            width: 50%;
        }
    }
    .flex::after{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 50%;
        content: "";
        background: #8a8a8a;
        width: 1px ;
        height: 26px;
        margin: auto;
    }
    .baobiao{
        position: absolute;
        top: 12px ;
        right: 15px;
        color: #808080;
    }
}

.box_2{
    height: 38px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    >div:nth-child(1){
        flex-grow: 1;
    }
}
</style>

