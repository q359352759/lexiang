<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <span v-if="detail.query.type==1 && detail.list.length>0">{{detail.list[0].shopName}}</span>
                <span v-if="detail.query.type==2 && detail.list.length>0">{{detail.list[0].nickname | filteer_name}}</span>
            </h1>
        </header>
        <div class="mui-content mui-row mui-fullscreen">
            <div class="header_1">
                <ul class="box_1">
                    <li class="title">
                        <div>时间</div>
                        <div>分润</div>
                    </li>
                </ul>
            </div>
            <div class="content_1" @scroll="content_scroll($event)">
                <ul class="box_1">
                    <li v-for="(item, index) in detail.list" :key="index">
                        <div>{{item.createTime | filter_time}}</div>
                        <div>{{item.shareProfitAmount}}</div>
                    </li>
                </ul>
                <loading :loadingtype="detail.loading" :end="!detail.loading && detail.list.length==detail.total && detail.total!=0" :nodata="!detail.loading && detail.total==0"/>
            </div>
            <div class="footer">
                总分润：-0元
            </div>
        </div>
    </div>
</template>

<script>
import { dateFtt } from "@/assets/js/currency.js";
import { b64DecodeUnicode } from "@/assets/js/base64jiema";

import { mapActions } from 'vuex';
import loading from '@/components/loading.vue';
export default {
    name:'',
    components: {
        loading  
    },
    data () {
        return {
            userInfo:'',
            id:'',
            detail:{
                loading:true,
                total:0,
                list:[],
                page_index:0,
                query:{
                    type:2,     //1店铺 2 用户的推荐人 3区域代理商
                    start:0,
                    length:20,
                    getShareProfitUser:'',  //获得分润者的ID（店铺推荐人ID，用户的推荐人ID，区域代理商ID）
                    userid:'',
                    shopid:''
                }
            }
        }
    },
    filters: {
        filter_time(time){
            if(!time) return time;
            return dateFtt(time,'yyyy.MM')
        },
        // 名字转Base64
        filteer_name(name){
            try {
                name=b64DecodeUnicode(name)
            } catch (error) {}
            return name
        }
    },
    methods: {
        ...mapActions({
            get_list:'agent/ShopBonus/get_list'
        }),
        get_init(){
            this.detail.query.start=this.detail.page_index*this.detail.query.length;
            this.detail.query.getShareProfitUser=this.userInfo.username;

            if(this.detail.query.type==1){
                this.detail.query.shopid=this.id
            }else{
                this.detail.query.userid=this.id
            }
            this.get_list(this.detail);
        },
        content_scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10 && !this.detail.loading && this.detail.list.length < this.detail.total){
                this.detail.page_index++
                this.get_list(this.detail)
            }
        }
    },
    mounted () {
        try {
            this.userInfo=JSON.parse(localStorage.userInfo)
        } catch (error) {}

        this.detail.query.type=this.$route.query.type;
        this.id=this.$route.query.id;
        this.get_init()

        // this.findShareProfitTableById();
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-content{
    display: flex;
    flex-direction: column;
    .header_1{
        flex-shrink: 0;
    }
    .content_1{
        flex-grow: 1;
        overflow: auto;
    }
    .footer{
        flex-shrink: 0;
    }
}


.box_1{
    li{
        display: flex;
        text-align: center;
        font-size: 12px;
        line-height: 32px;
        div{
            width: 50%;
        }
        div:nth-child(2){
            border-left: 1px solid #F9F9F9;
        }
    }
    >li:nth-child(2n-1):not(.title){
        background: #ffffff;
    }
    .title{
        background: $header_background;
        color: #ffffff;
    }
}
.footer{
    line-height: 36px;
	height: 36px;
    text-align: center;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
}
</style>


