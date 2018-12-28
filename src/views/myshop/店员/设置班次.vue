<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">设置班次</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            
            
            <ul class="box_1">
                <li class="title_1">
                    <div @click="radio_type=1" class="radio_1" :class="{'active':radio_type==1}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div>固定班次：</div>
                </li>
                <li class="item">
                    <div class="list nomargun">
                        <!-- <div class="banci">早班：</div> -->
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly @click="select_time()"/>
                            <input type="text" placeholder="下班时间" readonly @click="select_time()"/>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="box_1">
                <li class="title_1">
                    <div @click="radio_type=2" class="radio_1" :class="{'active':radio_type==2}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div>两班：</div>
                </li>
                <li class="item">
                    <div class="list nomargun">
                        <div class="banci">早班：</div>
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly @click="select_time()"/>
                            <input type="text" placeholder="下班时间" readonly @click="select_time()"/>
                        </div>
                    </div>
                    <div class="list">
                        <div class="banci">晚班：</div>
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly @click="select_time()"/>
                            <input type="text" placeholder="下班时间" readonly @click="select_time()"/>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="box_1">
                <li class="title_1">
                    <div @click="radio_type=3" class="radio_1" :class="{'active':radio_type==3}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div>三班：</div>
                </li>
                <li class="item">
                    <div class="list nomargun">
                        <div class="banci">早班：</div>
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly @click="select_time()"/>
                            <input type="text" placeholder="下班时间" readonly @click="select_time()"/>
                        </div>
                    </div>
                    <div class="list">
                        <div class="banci">中班：</div>
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly @click="select_time()"/>
                            <input type="text" placeholder="下班时间" readonly @click="select_time()"/>
                        </div>
                    </div>
                    <div class="list">
                        <div class="banci">晚班：</div>
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly @click="select_time()"/>
                            <input type="text" placeholder="下班时间" readonly @click="select_time()"/>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="box_2">
                提示：若已添加店员，修改班次后，需要重新设置店员的班次！
            </div>
            <div class="box_3">
                <btn value="保存"/>
            </div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/button.vue'
export default {
    name:'',
    components:{
        btn
    },
    data () {
        return {
            radio_type:1,
            picker_time:''
        }
    },
    methods: {
        select_time(){
            var picker_time = new mui.DtPicker({"type":"time"});
                picker_time.show(function(rs){
                    console.log(rs);
                    // picker_time.dispose();
                    // picker_time = null;
                    mui.toast('时间设置有误。', {duration: "long", type: "div" });
                    return false;
                });
        }
    },
    mounted() {
        // this.picker_time = new mui.DtPicker({"type":"time"});
    },
    beforeDestroy: function() {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function() {
        // this.picker_time.dispose();
        // this.picker_time=null;
        // console.group('destroyed 销毁完成状态===============》');
    },
    
}
</script>

<style lang="scss" scoped>
.box_1{
    margin: 3px 0px 0px 0px;
    padding: 7px 0.4rem 7px 10px;
    background: #ffffff;
    display: flex;
    align-items: center;
    font-size: 12px;
    .title_1{
        flex-grow: 1;
        display: flex;
        align-items: center;
        white-space: nowrap;
        .radio_1{
            margin: 0px 14px 0px 0px;
        }
    }
    .item{
        .list.nomargun{
            margin: 0px;
        }
        .list{
            display: flex;
            align-items: center;
            margin: 10px 0px 0px 0px;
        }
        .banci{
            white-space: nowrap;
        }
        .input_box{
            display: flex;
            input:nth-child(1){
                margin: 0px 0.38rem 0px 0px;
            }
        }
        input{
            width: 0.83rem;
        	height: 27px;
            color: rgba(166, 166, 166, 1);
            background-color: rgba(229, 229, 229, 1);
            font-size: 12px;
            padding: 0px;
            text-align: center;
            margin: 0px;
            border: none;
            border-radius: 0px;
        }
    }

}
.box_2{
    padding: 20px 17px;
    color: rgba(212, 48, 48, 1);
	font-size: 12px;
}
.box_3{
    margin: 5px 0px 20px;
}
</style>


