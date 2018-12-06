<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <!-- 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包 -->
                <span v-if="type==0">店铺新人红包详情</span>
                <span v-if="type==1">商品红包详情</span>
                <span v-if="type==2">节日红包详情</span>
                <span v-if="type==3">签到红包详情</span>
                <span v-if="type==4">庆典红包详情</span>
                <span v-if="type==5">生日红包详情</span>
            </h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll()">
            <div class="box_1">
                <div>
                    <div class="img_box">
                        <img src="image/redpackage.png" alt="">
                        <span>{{Red_envelopes.amount}}</span>
                    </div>
                    <ul>
                        <li>
                            <div class="time_1 mui-pull-right">发放日期：{{Red_envelopes.createTime | filter_time}}</div>
                            <div>
                                <span v-if="type==0 || type==5">数量：无限制</span>
                                <span v-if="type==1 || type==2 || type==3">数量：{{Red_envelopes.quantity}}</span>
                            </div>
                        </li>
                        <li>
                            已领取：
                            <!-- 0个 -->
                        </li>
                        <li>
                            <span class="mui-pull-right cuxiao">促销额：
                                <!-- 2340.00元 -->
                            </span>
                            <span>已使用：
                                <!-- 34个 -->
                            </span>
                        </li>
                        <li>
                            <span v-if="type==0 || type==5">有效期：长期有效</span>
                            <span v-if="type==1 || type==2 || type==3 || type==4">有效期：{{Red_envelopes.startTime | filter_time}} - {{Red_envelopes.endTime | filter_time}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <ul class="box_2">
                <li class="title">
                    <div><span>会员</span></div>
                    <div><span>领取时间</span></div>
                    <div><span>使用时间</span></div>
                    <div><span>消费金额</span></div>
                </li>
                <li v-for="(item, index) in 0" :key="index">
                    <div><span>名字</span></div>
                    <div><span>2018.11.11</span></div>
                    <div><span>2018.11.15</span></div>
                    <div><span>￥50.00</span></div>
                </li>
            </ul>
            
        </div>
    </div>
</template>

<script>
import {openloading,dateFtt} from '@/assets/js/currency'
export default {
    name:'',
    data(){
        return{
            type:'',        //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
            id:'',
            Red_envelopes:{ //红包详情
                
            }
        }
    },
    filters:{
        filter_time(time){
            if(!time) return '';
            return dateFtt(time,'yyyy.MM.dd')
        },
    },
    methods:{
        //根据Id查询红包
        get_redenvelope_id(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/redenvelope/findById/'+this.id
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    var data=x.data.data;
                    this.Red_envelopes=x.data.data;
                }else if(x.data.code){
                    mui.toast(x.data.msg, { duration: 2000, type: "div" });
                }else{
                    mui.toast(x.data.message, { duration: 2000, type: "div" });
                }
            }).catch(err=>{
                console.log(err);
                mui.toast('系统错误，稍后再试。', { duration: 2000, type: "div" });
            })
        }
    },
    mounted() {
        console.log(this.$route);
        this.type=this.$route.query.type;
        this.id=this.$route.query.id;
        //根据Id查询红包
        this.get_redenvelope_id()
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1{
    padding: 10px 12px;
    >div{
        background: #ffffff;
        display: flex;
        padding: 6px 8px;
        .img_box{
            width: 53px;
            flex-shrink: 0;
            margin: 0px 5px 0px 0px;
            position: relative;
            img{
                width: 100%;
            }
            span{
                position: absolute;
                width: 100%;
                left: 0px;
                top: 30px;
                text-align: center;
                color: #ffffff;
            }
        }
        >ul{
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: rgba(80, 80, 80, 1);
        	font-size: 12px;
            .time_1{
                color: rgba(166, 166, 166, 1);
            }
            .cuxiao{
                color: rgba(212, 48, 48, 1);
            }
        }
    }
}
.box_2{
    li{
        display: flex;
        font-size: 14px;
        >div{
            width: 25%;
            min-height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-left: 1px solid #F6F6F6;
        }
        >div:nth-child(1){
            border-left: none;
        }
    }
    >li:nth-child(2n-1):not(.title){
        background: #ffffff
    }
    .title{
        background: $header_background;
        color: #ffffff;
    }
}
</style>


