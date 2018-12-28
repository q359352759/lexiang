<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">张三</h1>
        </header>

        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <i @click="select_time()" class="icon iconfont icon-calendar"></i>
                <span @click="select_time()">2018年12月</span>
            </div>

            <ul class="box_2" v-for="(item, index) in 3" :key="index">
                <li>
                    <b>10</b>
                    <span>号</span>
                    <div>晚班</div>
                </li>
                <li>
                    <div>回复：<span class="huifu" @click="$router.push('/myshop/dianyuan/huifuList')">0</span>条</div>
                    <div>收银：0笔</div>
                    <div>营业额：0元</div>
                </li>
                <li>
                    <div>上班：2018.12.10 18:00</div>
                    <div>下班：2018.12.11 02:00</div>
                    <div>
                        <span class="zhengchang">正常</span>
                        <span class="tiban">替班：小孟</span>
                        <span class="xiangqing mui-pull-right" @click="店员收银()">详情</span>
                        <span class="queban">缺班</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="box_3">
            <div ref="fontSzie">
                12月共计：上班31天，收单：6820单，共计21870元，回复：2310条
            </div>
        </div>
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
        //设置zoom 设置字体大小
        set_zoom(){
            var div=this.$refs.fontSzie;
            div.style.zoom=div.clientWidth>div.parentElement.clientWidth ? div.parentElement.clientWidth/div.clientWidth : 1
        },
        //选择时间
        select_time(){
            var picker = new mui.DtPicker({
                    "type":"month",
                    CustomFormat:'yyyy/MM/dd HH:mm:ss'
                });
                picker.show(function (rs) {
                    console.log(rs);
                    picker.dispose();
                    picker = null;
                });
        },
        //回复详情
        huifuxiangqing(){

        },
        店员收银(){
            console.log('123');
            this.$router.push('/myshop/dianyuan/dianYuanShouYing')
        }
    },
    mounted () {
        this.set_zoom();
    }
}
</script>

<style lang="scss" scoped>
.box_1{
    height: 32px;
    line-height: 32px;
    padding: 0px 20px;
    color: rgba(166, 166, 166, 1);
    i{
        height: 17px;
        margin: 0px 3px 0px 0px;
    }
    span{
    	font-size: 14px;
    }
}

.box_2{
    margin: 0px 0px 3px 0px;
    background: #ffffff;
    align-items: flex-end;
    display: flex;
    padding: 8px 10px 8px 0px;
    >li:nth-child(1){
        width: 80px;
        flex-shrink: 0;
        color: rgba(166, 166, 166, 1);
    	font-size: 10px;
        text-align: center;
        b{
            color: rgba(80, 80, 80, 1);
        	font-size: 28px; 
        }
    }
    >li:nth-child(2){
        flex-grow: 1;
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        .huifu{
            color: #007aff;
        }
    }
    >li:nth-child(3){
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        .zhengchang{
            color: #00baad;
        }
        .tiban{
            color: #ff8d1a;
        }
        .xiangqing{
            color: #007aff;
        }
        .queban{
            color: #d43030;
        }
    }
}

.box_3{
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    background: #ffffff;
	color: rgba(80, 80, 80, 1);
	font-size: 12px;
    white-space: nowrap;
    >div{
        padding: 10px 14px;
        width: fit-content;
    }
}
</style>

