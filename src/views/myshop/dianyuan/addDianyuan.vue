<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">添加店员</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <form  @submit.prevent="submit()">
                <div class="box_1">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell item">
                            <div class="title">手机：</div>
                            <input type="text" placeholder="请输入店员手机号码" pattern="^[1][0-9]{10}"  required/>
                        </li>
                        <li class="mui-table-view-cell item">
                            <div class="title">昵称：</div>
                            <input type="text" placeholder="请输入店员昵称" setCustomValidity="132" pattern="^[\s\S]*.*[^\s][\s\S]*" required/>
                        </li>
                        <li class="mui-table-view-cell " @click="select_banci()">
                            <a class="mui-navigate-right item">
                                <div class="title">班次：</div>
                                <input type="text" placeholder="请选择班次" readonly/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="box_2">
                    <btn type="submit" value="添加"/>
                </div>
            </form>
        </div>

        <xuanzhebanci v-show="xiugaibanci_show" @setbancishow="get_banci"/>
    </div>
</template>

<script>
import xuanzhebanci from '@/components/myshop/dianyuan/xuanzhebanci.vue';
import  btn from '@/components/button.vue';
export default {
    name:'',
    components: {
        btn,
        xuanzhebanci
    },
    data () {
        return {
            xiugaibanci_show:false            
        }
    },
    methods: {
        get_banci(x,y){
            this.xiugaibanci_show=x;
        },
        submit(){

        },
        select_banci(){
            this.xiugaibanci_show=true;
        }
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    .mui-table-view-cell:after{
        right: 15px;
    }
    .item{
        color: #505050;
    	font-size: 14px;
        display: flex;
        align-items: center;
        .title{
            width: 96px;
        }
        input{
            height: 100%;
            padding: 0px;
            margin: 0px;
            border: none;
            color: #505050;
        	font-size: 14px;
        }        
        input::-webkit-input-placeholder {
            color: #d9d9d9;
            font-size: 12px;
        }
    }
}
.box_2{
    margin: 23px 0px;
}
</style>

