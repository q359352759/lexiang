<template>
    <div class="ShopBonus">
        <ul class="Header_1">
            <li :class="{'active':type==0}" @click="set_type(0)"><span>商家</span></li>
            <li :class="{'active':type==1}" @click="set_type(1)"><span>会员</span></li>
        </ul>

        <!-- 商家 -->
        <ul class="List" v-show="type==0">
            <li class="hader_1" :class="{'active':fixed}">
                <div>商家</div>
                <div>时间</div>
                <div>累计分润</div>
            </li>
            <li v-for="(item, index) in 商家.list" :key="index">
                <div class="name" @click="BonusDetail(item)">{{item.shopName}}</div>
                <div>
                    <div>{{item.createTime | filter_time('yyyy.MM.dd')}}</div>
                    <div>{{item.createTime | filter_time('hh:mm:ss')}}</div>
                </div>
                <div>{{item.SUMA}}</div>
            </li>
        </ul>
        <loading v-show="type==0" :loadingtype="商家.loading" :end="!商家.loading && 商家.total!=0 && 商家.total==商家.list.length" :nodata="!商家.loading && 商家.total==0"/>

        <!-- 会员 -->
        <ul class="List" v-show="type==1">
            <li class="hader_1" :class="{'active':fixed}">
                <div>会员</div>
                <div>时间</div>
                <div>累计分润</div>
            </li>
            <li v-for="(item, index) in 会员.list" :key="index">
                <div class="name" @click="BonusDetail(item)">{{item.nickname | filteer_name}}</div>
                <div>
                    <div>{{item.createTime | filter_time('yyyy.MM.dd')}}</div>
                    <div>{{item.createTime | filter_time('hh:mm:ss')}}</div>
                </div>
                <div>{{item.SUMA}}</div>
            </li>
        </ul>
        <loading v-show="type==1" :loadingtype="会员.loading" :end="!会员.loading && 会员.total!=0 && 会员.total==会员.list.length" :nodata="!会员.loading && 会员.total==0"/>

        <ul class="footer_1" v-show="type==0">
            <li>商家：{{商家.total}}家</li>
            <li>总分润：0元</li>
        </ul>
        <ul class="footer_1" v-show="type==1">
            <li>会员：{{会员.total}}家</li>
            <li>总分润：{{dailiren_fenrun_zichan.aggregateAmount ? dailiren_fenrun_zichan.aggregateAmount : 0}}元</li>
        </ul>
    </div>
</template>

<script>
import { dateFtt } from "@/assets/js/currency";
import { b64DecodeUnicode } from "@/assets/js/base64jiema";


import { mapGetters, mapActions } from 'vuex';
import loading from "@/components/loading.vue";
export default {
    name:'',
    components:{
        loading
    },
    props: {
        fixed:{
            define:false
        }
    },
    data () {
        return {
        }
    },
    // yyyy.MM.dd hh:mm
    filters:{
        filter_time(time,type){
            if(!time) return time;
            return dateFtt(time,type)
        },
        // 名字转Base64
        filteer_name(name){
            try {
                name=b64DecodeUnicode(name)
            } catch (error) {}
            return name
        }
    },
    computed: {
        ...mapGetters({
            type:'agent/ShopBonus/get_type',
            fenrun_huiyuan: 'agent/ShopBonus/get_list2',
            dailiren_fenrun_zichan:'agent/ShopBonus/dailiren_fenrun_zichan',    //代理人店铺分润资产
            商家:'agent/ShopBonus/商家',
            会员:'agent/ShopBonus/会员',
        })
    },
    methods: {
        ...mapActions({
            set_type:'agent/ShopBonus/set_type'
        }),
        BonusDetail(item){
            if(item.type==1){
                this.$router.push('/agent/BonusDetail?id='+item.shopid+'&type='+item.type);
            }else{
                this.$router.push('/agent/BonusDetail?id='+item.userid+'&type='+item.type);
            }
        }
        // set_type()
    },
    mounted() {
        // await 
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.ShopBonus{
    padding: 0px 0px 50px;
}
.Header_1{
    margin: 3px 0px 0px;
    line-height: 34px;
    display: flex;
    background: #ffffff;
    li{
        width: 100%;
        text-align: center;
        font-size: 14px;
        span{
            display: inline-block;
            padding: 0px 10px;
        }
    }
    .active{
        span{
            border-bottom: 2px solid $header_background;
        }
    }
}
.List{
    padding: 30px 0px 0px;
    margin: 3px 0px 0px;
    position: relative;
    li{
        display: flex;
        text-align: center;
        min-height: 30px;
        padding: 3px 0px;
        font-size: 12px;
        white-space: nowrap;
        >div{
            width: calc(100% / 3);
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0px 10px;
            border-left:1px solid #F6F6F6;
            display: flex;
            justify-content: center;
            flex-direction: column;
            >div{
                width: 100%;
            }
        }
        >div:nth-child(1){
            border: none;
        }
    }
    .hader_1.active{
        position: fixed;
        top: 44px;
    }
    .hader_1{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        color: #ffffff;
        background: $header_background;
    }
    li:nth-child(2n-1):not(.hader_1){
        background: #F0F0F0;
    }
    li:nth-child(2n){
        background: #ffffff;
    }
    .name{
        color:#2A82E4;
    }
}

.footer_1{
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    display: flex;
    background: $header_background;
    color: rgba(255, 255, 255, 1);
	font-size: 11px;
    line-height: 32px;
    >li{
        width: 50%;
        text-align: center;
    }
}
</style>



