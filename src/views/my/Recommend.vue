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
                <h2 @click="邀请好友()">邀请好友</h2>
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

        <div class="生成容器" ref="生成容器">
            <div class="标题">
                <div class="标题1">
                    扫码领取<span>20</span>元红包
                </div>
                <div class="半圆"></div>
            </div>
            <div class="图片容器">
                <div class="二维码容器" ref="二维码容器">
                    <!-- <img src="image/43.png" alt="" srcset=""> -->
                </div>
                <div class="头像">
                    <img v-if="头像base64" :src="头像base64" alt="" srcset="">
                    <img v-if="!头像base64" src="image/WechatIMG311.png" alt="" srcset="">
                </div>
            </div>
            <div class="文本1">红包乐购，全城促销信息发布平台</div>
        </div>

        <div class="分享显示框" v-show="是否分享">
            <div class="内容">
                <div class="关闭" @click="是否分享=false">
                    <i class="icon iconfont icon-quxiao"></i>
                </div>
                <div class="图片容器">
                    <img :src="截图地址" alt="" srcset="">
                </div>
                <div class="文本">长按二维码，点击“发送给朋友”</div>
            </div>
        </div>

    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import {openloading} from '@/assets/js/currency.js';

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
                    inviterId:'',
                    type:1
                }
            },
            是否分享:false,
            头像base64:'',
            截图地址:""
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
            }
        },
        //邀请好友
        邀请好友(){
            console.log('邀请好友');
            if(this.截图地址){
                this.是否分享=true;
            }else{
                openloading(true);
                Promise.all([this.生成二维码(),this.生成头像()]).then(x=>{
                    this.截图();
                }).catch(err=>{
                    openloading(false);
                    console.log(err);
                    mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });                    
                })
            }
            
        },
        //生成二维码
        生成二维码(){
            return new Promise((resolve, reject) => {
                var url=window.location.origin+window.location.pathname+'#/BeInvited?pid='+this.userInfo.username+'&invitationtype=1';
                console.log(url)
                var el=this.$refs.二维码容器
                    el.innerHTML='';
                let qrcode = new QRCode(el, {  
                        width: 200,  
                        height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                        text: url, // 二维码内容  
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                        background: '#fff',
                        foreground: '#fff',
                    })
                setTimeout(()=>{
                    el.querySelector('img').style.width="100%";
                    resolve()
                },300)
            });
        },
        生成头像(){
            return new Promise((resolve, reject) => {
                this.$axios.post('/api-u/users/imgtobase64',this.$qs.stringify({url:this.userInfo.headImgUrl})).then(x=>{
                    if(x.data.code==200){
                        this.头像base64='data:image/jpeg;base64,'+x.data.data;
                        resolve()
                    }else{
                        reject()
                    }
                }).catch(err=>{
                    reject()
                })
            });
        },
        截图(){
            const el = this.$refs.生成容器;
            const options = {
                useCORS: true,
                logging: false
            }
            html2canvas(el,options).then(canvas => {
                this.截图地址=canvas.toDataURL();
                this.是否分享=true;
                openloading(false);
            });
        },
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

.生成容器{
    width: 245px;
	background-color: rgba(241, 138, 138, 1);
    position: fixed;
    bottom: 0px;
    left: -100%;
    text-align: center;
    overflow: hidden;
    .半圆{
        background: #f55e5e;
        position: absolute;
        width: 200%;
        height: 500px;
        bottom: 0px;
        left: -50%;
        border-radius: 100%;
    }
    .标题{
        .标题1{
            position: relative;
            z-index: 1;
        }
        padding: 10px 0px 26px;
        color: rgba(255, 255, 255, 1);
    	font-size: 14px;
        position: relative;
        z-index: 1;
        margin: 0px 0px 15px;
        span{
            font-weight: bold;
            font-size: 36px;
        }
    }
    .图片容器{
        margin: 0px auto 0px;
        width: 178px;
    	height: 178px;
        position: relative;
        .二维码容器{
            width: 100%;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .头像{
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            margin: auto;
            width: 44px;
            height: 44px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }
        }
    }
    .文本1{
        color: rgba(229, 229, 229, 1);
    	font-size: 12px;
        padding: 9px 0px;
    }
}

.分享显示框{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    .内容{
        width: 245px;
        position: relative;
        .关闭{
            width: 36px;
        	height: 36px;
            background: #ffffff;
            color: #999999;
            text-align: center;
            line-height: 36px;
            position: absolute;
            right: 0px;
            top: -50px;
            border-radius: 100%;
            ::after{
                position: absolute;
                left: 0px;
                right: 0px;
                bottom: -14px;
                margin: auto;
                height: 14px;
                width: 1px;
                content: "";
                background: #ffffff;
            }
        }
        .图片容器{
            img{
                width: 100%;
            }
        }
        .文本{
            height: 35px;
            line-height: 35px;
            color: rgba(56, 56, 56, 1);
            background-color: rgba(255, 255, 255, 1);
            font-size: 14px;
            border-radius: 35px;
            margin: 11px 0px;
            text-align: center;
        }
    }
}
</style>

