<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                推荐有奖
            </h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <div class="box_1">
                <img src="image/tuijian.png" alt="">
                <h1>推荐好友双方各得到20元购物红包！</h1>
                <h2 @tap="yanqing()">邀请好友</h2>
                <!-- <h2 @tap="yanqing1()">邀请好友2</h2> -->
            </div>



            <div ref="box_2"></div>
            <div class="box_2 flex"  v-if="box_2_actvie">
                <ul class="title">
                    <li>已邀{{invitedrecord.total}}请人</li>
                    <li>获得{{(user_invited_sutotal && user_invited_sutotal.amount) ? user_invited_sutotal.amount : 0}}元红包</li>
                </ul>
                <ul class="list">
                    <li>
                        <div>好友</div>
                        <div>时间</div>
                        <div>红包</div>
                    </li>
                </ul>
            </div>

            <div class="box_2">
                <ul class="title">
                    <li>已邀请{{invitedrecord.total}}人</li>
                    <li>获得{{(user_invited_sutotal && user_invited_sutotal.amount) ? user_invited_sutotal.amount : 0}}元红包</li>
                </ul>
                <ul class="list">
                    <li>
                        <div>好友</div>
                        <div>时间</div>
                        <div>红包</div>
                    </li>
                    <li v-for="(item, index) in invitedrecord.list" :key="index">
                        <div>{{item.phone | fliter_phone}}</div>
                        <div>
                            {{item.createtime | time_filter}}
                        </div>
                        <div>
                            {{item.amount}}
                        </div>
                    </li>
                </ul>
            </div>

            <loading :loadingtype="invitedrecord.loading"/>
            <!-- <button @click="BeInvited()">被邀请界面</button> -->

        </div>
    </div>
</template>

<script>
import {dateFtt} from '@/assets/js/currency.js';
import loading from '@/components/loading.vue';
export default {
    name:'',
    components:{
        loading
    },
    data(){
        return{
            userInfo:'',
            index:0,
            box_2_actvie:false, 
            user_invited_sutotal:{},
            invitedrecord:{         //记录列表
                loading:false,
                page_index:0,
                list:[],
                total:0,
                query:{
                    start:0,
                    length:10,
                    inviterId:''
                }
            }
        }
    },
    computed:{
        
    },
    filters:{
        fliter_phone(phone) {
            if (!phone) return "";
            return (
                phone.substring(0, 3) +
                "***" +
                phone.substring(phone.length - 3)
            );
        },
        time_filter(time){
            return dateFtt(time,'yyyy.MM.dd hh:mm')
        }
    },
    methods:{
        //被邀请界面
        BeInvited(){
            this.$router.push('/BeInvited');
        },
        scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if(this.$refs.box_2.offsetTop-20<=e.target.scrollTop){
                this.box_2_actvie=true;
            }else{
                this.box_2_actvie=false;
            }
            if (h + t >= sh - 10) {
                if(!this.invitedrecord.loading && this.invitedrecord.total!=this.invitedrecord.list.length){
                    this.invitedrecord.page_index++;
                    this.get_invitedrecord();
                }
                // console.log("到底底部");
            }
        },
        //邀请好友
        yanqing(){
            // var this_1=this;
            // console.log(window.location)
            // var href=window.location.href;
            // var str=href.substring(0,href.indexOf("#"));
            // var new_url=str+'#/BeInvited?pid='+this.userInfo.username+'&type=1';
            // console.log(new_url,this.userInfo);
            mui.toast("请点击右上角分享给好友。", { duration: 2000, type: "div" });
        },
        // yanqing1(){
        //     var href=window.location.href;
        //     var str=href.substring(0,href.indexOf("#"));
        //     var new_url=str+'#/BeInvited?pid='+this.userInfo.username+'&type=1';
        //     console.log(new_url,this.userInfo);
        // }
        //用户邀请注册资产
        get_user_invited_sutotal(){
            this.$axios({
                method:'get',
                url:'/api-u/users/invitedsutotal/findByUserid/'+this.userInfo.username
            }).then(x=>{
                console.log('获取',x);
                if(x.data.code==200){
                    this.user_invited_sutotal=x.data.data
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //用户平台(邀请注册)记录
        get_invitedrecord(){
            this.invitedrecord.query.start=this.invitedrecord.page_index*this.invitedrecord.query.length;
            this.invitedrecord.query.inviterId=this.userInfo.username;
            this.$axios({
                method:'get',
                url:'/api-u/users/invitedrecord/findAll',
                params:this.invitedrecord.query
            }).then(x=>{
                console.log('用户平台(邀请注册)记录',x);
                if(x.data.code==200){
                    this.invitedrecord.list=this.invitedrecord.list.concat(x.data.data.data);
                    this.invitedrecord.total=x.data.data.total;
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    beforeCreate(){
        
    },
    created: function() {
        try {
            this.userInfo=JSON.parse(localStorage.userInfo)
        } catch (error) {}
        
        console.log(this.$route.query)
        if(!this.userInfo){
            var query=this.$route.query;
            if(query.pid && query.invitationtype){
                this.$router.push('/BeInvited?pid='+query.pid+'&invitationtype='+query.invitationtype);
            }else{
                this.$router.push('/BeInvited');
            }
        }
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted(){
        if(this.userInfo){
            //用户邀请注册资产
            this.get_user_invited_sutotal();
            //用户平台(邀请注册)记录
            this.get_invitedrecord();
        }   
        
    }
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #cc1a3f;
}
.mui-bar{
    background: #cc1a3f
}
.box_1{
    text-align: center;
    color: #ffffff;
    img{
        width: 100%;
    }
    h1{
        font-weight: 400;
        font-size: 0.14rem;
    }
    h2{
        font-weight: 400;
        width: 140px;
        height: 30px;
        border: 1px solid #ffffff;
        border-radius: 30px;
        font-size: 0.14rem;
        line-height: 28px;
        margin: 0.2rem auto 0.16rem;
        letter-spacing: 6px;
    }
}
.box_2.flex{
    position: fixed;
    width: 100%;
    left: 0px;
    top: 20px;
    background: #cc1a3f;
}
.box_2 {
    color: #ffffff;
    .title{
        padding: 0px 0.28rem;
        font-size: 0.14rem;
        display: flex;
        justify-content: space-between;
    }
    .list{
        margin: 5px 0px 0px;
        text-align: center;
        font-size: 0.12rem;
        border-top: 1px solid #ffffff;
        >li{
            display: flex;
            border-bottom: 1px solid #ffffff;
            >div{
                width: calc(100% / 3);
                height: 0.3rem;
                line-height: 0.3rem;
            }
            >div:nth-child(2),
            >div:nth-child(3){
                border-left: 1px solid #ffffff;
            }
        }
    }
}
</style>

