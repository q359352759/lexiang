<template>
    <div>        
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">订单详情</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="content_1">
                <ul class="box_1">
                    <li ref="fuzhi_box" id="biao1">订单编号：{{obj.ordersid}}</li>
                    <li ref="fuzhi" class="btn1">复制</li>
                </ul>
                <ul class="box_2">
                    <li>
                        <div>顾客：{{guge.phone | filter_phone}}</div>
                        <div>{{obj.createTime | filter_time}}</div>
                    </li>
                    <li>
                        <div>店员：<span class="name">无</span></div>
                        <div>分销员：<span class="name">无</span></div>
                    </li>
                    <li>
                        <div>金额：￥{{obj.paymentAmount}}</div>
                        <div>分佣：￥0</div>
                    </li>
                    <li>
                        <div>红包抵扣：￥{{obj.deduction}}</div>
                        <div></div>
                    </li>
                    <li>
                        <div>平台费：￥0</div>
                        <div>实际到账：<span class="money">￥{{obj.paymentAmount}}</span></div>
                    </li>
                </ul>
                <ul class="box_3" v-if="obj.orderType==0">
                    <li v-for="(item, index) in shangping_list" :key="index">
                        <div class="img_box"><img v-if="item.img && item.img.split(',').length>0" :src="item.img.split(',')[0]" alt="" srcset=""></div>
                        <div class="text_1">
                            <div class="header_1">
                                <div class="mui-pull-right">x{{item.number}}</div>
                                <div></div>
                            </div>
                            <div class="money">￥{{item.sellingPrice}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import { openloading,dateFtt } from "@/assets/js/currency.js";
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";
import $ from "jquery";
export default {
    name:'',
    data () {
        return {
            id:'',
            obj:{},
            guge:{}
        }
    },
    filters: {
        filter_phone(phone){
            if(!phone) return phone;
            return phone.substring(0, 3) +"***" +phone.substring(phone.length - 3);
        },
        filter_time(time){
            if(!time) return time;
            return dateFtt(time,'yyyy.MM.dd hh:mm:ss');
        }
    },
    computed: {
        shangping_list(){
            var list=[];
            if(this.obj.orderType==1){
                return list;
            }
            this.obj.shopOrderCommoditys.forEach(item => {
                var obj=list.find(x=>x.commodityid==item.commodityid);
                if(obj){
                    obj.number++;
                }else{
                    var newobj=Object.assign({}, item);
                    newobj.number=1
                    list.push(newobj);
                }
            });
            return list
        }
    },
    methods: {
        //查询订单详情
        findShopOrdersById(){
            openloading(true);
            return new Promise((resolve, reject) => {
                this.$axios.get('/api-s/shops/findShopOrdersById/'+this.id).then(x=>{
                    console.log(x)
                    if(x.data.code==200){
                        this.obj=x.data.data;
                    }
                    openloading(false);
                    resolve(x)
                }).catch(err=>{
                    openloading(false);
                    reject()
                })
            });
        },
        //获取消费者用户信息
        get_user(item){
            this.$axios("/api-u/users/findByUserid/"+this.obj.userid).then(x=>{
                // userInfo.nickname=b64DecodeUnicode(userInfo.nickname)
                console.log(x);
                if(x.data.code==200){
                    // item.user=x.data.data;
                    var user=x.data.data
                    try {
                        user.nickname=b64DecodeUnicode(user.nickname)                    
                    } catch (error) {}
                    this.guge=user;
                }
            }).catch(err=>{});
        },
        async init(){
            await this.findShopOrdersById();
            this.get_user();
        }
    },
    mounted () {
        this.id=this.$route.query.id;
        this.init();
        var this_1=this;
        var clipboard = new ClipboardJS(this.$refs.fuzhi, {
            text: function() {
                return this_1.obj.ordersid;
            }
        });
        clipboard.on('success', function(e) {
            mui.toast('复制成功。', {duration: "long", type: "div" });
        });
        clipboard.on('error', function(e) {
            mui.toast('复制失败，请手动复制。', {duration: "long", type: "div" });
        });

    }
}
</script>

<style lang="scss" scoped>
.content_1{
    margin: 10px;
    background: #ffffff;
}
.box_1{
    margin: 0px 5px;
    font-size: 12px;
    height: 32px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EDEDED;
    color: #505050;
    li:nth-child(1){
        flex-grow: 1;
    }
    li:nth-child(2){
        width: 67px;
    	height: 22px;
        line-height: 22px;
        text-align: center;
        background: #2a82e4;
        color: #ffffff;
        border-radius: 5px;
    }
}
.box_2{
    padding: 5px 0px;
    margin: 0px 5px;
    font-size: 12px;
    line-height: 25px;
    color: #505050;
    border-bottom: 1px solid #EDEDED;
    li{
        display: flex;
    }
    div:nth-child(1){
        flex-grow: 1;
    }
    .name{
        color: #2a82e4;
    }
    .money{
        color: #d43030;
    }
}

.box_3{
    li{
        border-bottom: 1px solid #EDEDED;
        display: flex;
        padding: 7px 5px;
        .img_box{
            flex-shrink: 0;
            width: 91px;
            height: 68px;
            margin: 0px 10px 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text_1{
            flex-grow: 1;
            width: 0;
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .money{
                color: #d43030;
            }
        }
    }
}

</style>

