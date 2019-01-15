<template>
    <div>
        <ul class="列表">
            <li class="header">
                <div><div>会员</div></div>
                <div><div>时间</div></div>
                <div><div>累计分润</div></div>
            </li>
        </ul>
        <ul class="列表">
            <li v-for="(item, index) in 会员.list" :key="index" @click="BonusDetail(item,2)">
                <div class="蓝色字体" v-if="item.nickname"><div>{{item.nickname | filteer_name}}</div></div>
                <div class="蓝色字体" v-if="!item.nickname"><div>{{item.userPhone}}</div></div>
                <div>
                    <div>{{item.finalCreateTime | filter_time('yyyy.MM.dd')}}</div>
                    <!-- <div>{{item.finalCreateTime | filter_time('hh:mm:ss')}}</div> -->
                </div>
                <div><div>{{item.SUMA ? item.SUMA : 0}}</div></div>
            </li>
        </ul>
        <loading :loadingtype="会员.loading" :end="!会员.loading && 会员.total!=0 && 会员.total==会员.list.length" :nodata="!会员.loading && 会员.total==0"/>

        <ul class="底部">
            <li>商家：{{会员.total}}人</li>
            <li>总分润：-0元</li>
        </ul>
    </div>
</template>

<script>
import { dateFtt } from "@/assets/js/currency";
import { b64DecodeUnicode } from "@/assets/js/base64jiema";

import { mapGetters } from "vuex";
import loading from "@/components/loading.vue";

export default {
    name:"",
    components:{
        loading
    },
    data () {
        return {
            
        }
    },
    filters:{
        filter_time(time,type){
            if(!time) return time;
            return dateFtt(time,type)
        },
        // 名字转Base64
        filteer_name(name){
            try {
                return name=b64DecodeUnicode(name)
            } catch (error) {
                return name
            }
        }
    },
    computed: {
        ...mapGetters({
            会员:'agent/ShopBonus/会员'
        }),
    },
    methods: {
        BonusDetail(item,type){
           if(type==1){
                this.$router.push('/agent/BonusDetail?id='+item.finalshopid+'&type='+type+'&name='+item.shopName);
            }else{
                this.$router.push('/agent/BonusDetail?id='+item.username+'&type='+type+'&name='+(item.nickname ? item.nickname : item.userPhone) );
            }
        }
    },
    mounted () {
             
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';

.列表{
    li{
        display: flex;
        min-height: 34px;
        text-align: center;
        font-size: 12px;
        >div{
            border-left: 1px solid #F6F6F6;
            width: calc(100% / 3);
            display: flex;
            flex-direction: column;
            justify-content: center;
            >div{
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        >div:nth-child(1){
            border-left: none;
        }
    }
    li:nth-child(2n-1){
        background: #ffffff;
    }
    li.header{
        background: $header_background;
        color: #ffffff;
    }
    .蓝色字体{
        color: #017AFF;
    }
}
.底部{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
	height: 32px;
	background-color: $header_background;
    color: rgba(255, 255, 255, 1);
	font-size: 11px;
    line-height: 32px;
	text-align: center;
    display: flex;
    >li{
        width: 50%;
    }
}
</style>
