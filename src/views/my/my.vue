<template>
	<div id="my">
		<header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">个人中心</h1>
		</header>
		<div class="mui-content mui-fullscreen">

			<ul class="box_1">
				<li class="img_box" @click="SetUp()">
					<img v-if="userInfo.headImgUrl!='' && userInfo.headImgUrl!=null" :src="userInfo.headImgUrl" alt="">
					<img v-if="userInfo.headImgUrl=='' || userInfo.headImgUrl==null" src="@/assets/image/lxlogo_180.png">
				</li>
				<li class="type_box">
					<div>
						<span v-if="userInfo.nickname">{{userInfo.nickname}}</span>
						<span v-if="!userInfo.nickname">{{userInfo.phone | fliter_phone}}</span>
					</div>
					<span>
						<i @tap="erweima()" class="icon iconfont icon-31erweima"></i>
					</span>
				</li>
                <li class="help" @click="help_1()">
                    <i class="icon iconfont icon-kefu"></i>
                    <div>帮助</div>
                </li>
				<li class="explain_box">
					<!-- <div>说明：点击头像选择图片上传</div>
					<div>点击用户名更正昵称</div> -->
				</li>
			</ul>

			<div class="box_2">
				<!-- <ul>
					<li>LB：0个</li>
					<li>红包：0元</li>
					<li>余额：0元</li>
				</ul>
				<div @click="AssetDetails()">>></div> -->
			</div>

			<div class="box_6">
				<ul>
					<li>
						<div @tap="go('/Collection')">
							<i class="icon iconfont icon-shoucangdianjihou"></i>
						</div>
						<span @tap="go('/Collection')">收藏</span>
					</li>
					<li>
						<div @click="Recommend()">
							<i class="icon iconfont icon-jiangpinpeizhi"></i>
						</div>
						<span @click="Recommend()">分享有奖</span>
					</li>
					<li>
						<div @click="go('CardBag')">
							<i class="icon iconfont icon-qiaquan1"></i>
						</div>
						<span @click="go('CardBag')">红包卡券</span>
					</li>
					<li>
						<div @click="go('/AssetCenter')">
							<i class="icon iconfont icon-icon-wallet"></i>
						</div>
						<span @click="go('/AssetCenter')">资产中心</span>
					</li>
					<li>
						<div @click="go('news')">
							<i class="icon iconfont icon-xiaoxi"></i>
						</div>
						<span @click="go('news')">消息</span>
					</li>
				</ul>
			</div>

			<div class="box_3">
				<ul class="title_1" @click="order()">
					<li>我的订单</li>
					<li>全部订单</li>
					<li>
						<i class="mui-icon mui-icon-arrowright"></i>
					</li>
				</ul>
				<ul class="list">
					<li>
						<div @click="$router.push('/orders/orderList?type=1')">
							<i class="icon iconfont icon-daifukuan"></i>
						</div>
						<span @click="$router.push('/orders/orderList?type=1')">待付款</span>
					</li>
					<li>
						<div @click="$router.push('/orders/orderList?type=2')">
							<i class="icon iconfont icon-daifahuo"></i>
						</div>
						<span @click="$router.push('/orders/orderList?type=2')">待发货</span>
					</li>
					<li>
						<div @click="$router.push('/orders/orderList?type=3')">
							<i class="icon iconfont icon-daishouhuo"></i>
						</div>
						<span @click="$router.push('/orders/orderList?type=3')">待收货</span>
					</li>
					<li>
						<div @click="$router.push('/orders/orderList?type=4')">
							<i class="icon iconfont icon-pingjia"></i>
						</div>
						<span @click="$router.push('/orders/orderList?type=4')">待评价</span>
					</li>
					<li>
						<div @click="$router.push('/orders/orderList?type=5')">
							<i class="icon iconfont icon-shouhouwuyou"></i>
						</div>
						<span @click="$router.push('/orders/orderList?type=5')">售后</span>
					</li>
				</ul>
			</div>

			<ul class="mui-table-view box_4">
				<li class="mui-table-view-cell " @click="ApplicationShop()">
					<a class="mui-navigate-right">
						<span v-if="!myshop">我要开店</span>
						<span v-if="myshop && myshop.state==0">店铺审核中</span>
						<span v-if="myshop && myshop.state==1">我的店铺</span>
						<span v-if="myshop && myshop.state==2">我要开店</span>
					</a>
				</li>
                <li class="mui-table-view-cell " @click="ApplicationAgent()">
					<a class="mui-navigate-right">
						<span >业务代理</span>
					</a>
				</li>
                <li class="mui-table-view-cell">
					<a class="mui-navigate-right" @click="跳转红购使者()">
						<span >红购使者</span>
					</a>
				</li>
				<li class="mui-table-view-cell " @click="Advertising()">
					<a class="mui-navigate-right">
						<span >广告套餐</span>
					</a>
				</li>
			</ul>

			<div @click="go_out()" class="go_out">
                <btn value="退出登录" />
            </div>

            <!-- <button @click="$router.push('/shenqingkaidian')">申请开店</button> -->
            <!-- <button @click="更换主题色()">更换主题色</button> -->

            <!-- <button @click="test()">测试</button>
            {{weixin}} -->
            
        </div>

        <div class="QRCode" v-show="qrcode_show">
            <div class="mask"></div>
            <div class="content_1">
                
                <div class="close_1">
                    <div @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                    <div></div>
                </div>
                <img :src="qrcode" alt="" srcset="">
            </div>
        </div>

        <!-- 生产二维码的容器 -->
        <div class="QRCode_box">
            <div class="content_1" ref="printMe">
                <div class="title_1">
                    <div class="img_box">
                        <img v-show="erweima_base64" class="head_img" :src="erweima_base64" alt="">
                        <img v-show="!erweima_base64" class="head_img" src="image/lxlogo_180.png" alt="">
                    </div>
                    <div class="text_box">
                        <div v-show="userInfo.nickname" class="userName">{{userInfo.nickname}}</div>
                        <div v-show="!userInfo.nickname" class="userName">{{userInfo.phone | fliter_phone}}</div>
                        <!-- <div class="text">对酒当歌，人生几何。</div> -->
                    </div>
                </div>
                <div class="erweima_box">
                    <div class="head_img">
                        <img v-show="erweima_base64" class="" :src="erweima_base64" alt="">
                        <img style="border-radius:100%;" v-show="!erweima_base64" class="" src="image/lxlogo_180.png" alt="">
                    </div>
                    <div ref="qrcode">
                        <!-- <img src="image/7a1f5483e159cad31c9f3712accc6c9b.jpg" alt=""> -->
                    </div>
                </div>
                <div class="tishi">识别二维码领取20元新人红包！</div>
            </div>
        </div>

	</div>
</template>
<script>

import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import {openloading} from '@/assets/js/currency.js';
import {b64DecodeUnicode} from '@/assets/js/base64jiema.js';
import { mapActions } from 'vuex';
import btn from '@/components/button.vue'
export default {
    name: "my",
    components: {
        btn
    },
    data() {
        return {
            qrcode_show:false,
            qrcode:null,
            erweima_base64:'',
            weixin:{},
            userInfo:''
        };
    },
    filters: {
        fliter_phone(phone) {
            if (!phone) return "";
            return (
                phone.substring(0, 3) +
                "***" +
                phone.substring(phone.length - 3)
            );
        },
        filter_name(name){
            try {
                return b64DecodeUnicode(name);
            } catch (error) {
                return name;
            }
        }
    },
    computed: {
        myshop(){
            return this.$store.state.myshop
        }
    },
    methods:{
        ...mapActions({
            updated_user:'user/updated_user',
            get_user:'user/get_user'
        }),
        更换主题色(){
            console.log('跟换主题色')
        },
        //订单
        order(){
            this.$router.push('/orders/orderList')
        },
        跳转红购使者(){
            this.$router.push('/shizhe/shenqingshuoming')
        },
        //跳转分享
        Recommend(){
            this.$router.push('/Recommend?pid='+this.userInfo.username+'&invitationtype=1')
        },
        //生成二维码
        shengchengerweima(){
            var url=window.location.origin+window.location.pathname+'#/BeInvited?pid='+this.userInfo.username+'&invitationtype=1';
            console.log(url)
            var el=this.$refs.qrcode
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
                this.print();
            },500)
        },
        //开始生成二维码
        erweima(){
            // console.log()
            console.log('生产二维码。');
            if(this.qrcode){
                this.qrcode_show=true;
            }else{
                openloading(true);
                if(!this.userInfo.headImgUrl){
                    this.shengchengerweima();
                }else{
                    this.$axios.post('/api-u/users/imgtobase64',this.$qs.stringify({url:this.userInfo.headImgUrl})).then(x=>{
                        console.log(x);
                        if(x.data.code==200){
                            this.erweima_base64='data:image/jpeg;base64,'+x.data.data;
                            this.shengchengerweima();
                        }else{
                            openloading(false);
                            mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });                    
                        }
                    }).catch(err=>{
                        openloading(false);
                        mui.toast('生成二维码失败，稍后再试。', { duration: "long",type: "div" });
                    })
                }                
            }
        },
        print(){
            const el = this.$refs.printMe;
            const options = {
                useCORS: true,
                logging: false
            }
            html2canvas(el,options).then(canvas => {
                this.qrcode=canvas.toDataURL();
                this.qrcode_show=true;
                openloading(false);
            });
        },
        close_1(){
            this.qrcode_show=false;
        },
        help_1(){
            this.$router.push('/help');
        },
        //跳转设置
        SetUp(){
            this.$router.push('/SetUp');
        },
        //业务代理
        ApplicationAgent(){
            if (!this.$store.state.agentUser || this.$store.state.agentUser == null || this.$store.state.agentUser == "") {
                this.$router.push("/ApplicationAgent"); //跳转注册代理人页面
            } else {
                this.$router.push("/Agent"); //跳转代理人
            }
        },
        go(x) {
            // alert('开发中。')
            // return;
            this.$router.push(x);
        },
        //申请店铺
        ApplicationShop() {
            if(!this.myshop){
                this.$router.push("/ShopInstructions");
            }else if(this.myshop.state==0 || this.myshop.state==2){
                this.$router.push("/shenqingkaidian");
            }else{
                this.$router.push('/myshop')
            }
        },
        //退出
        go_out() {
            this.$store.commit("setloginDate", "");
            localStorage.removeItem("loginDate");
            localStorage.removeItem("userInfo");
            localStorage.removeItem('id');
            localStorage.removeItem('homeDialog');
            localStorage.removeItem('vuex');
            sessionStorage.removeItem('backUrl');
            this.$router.push("/login");
            location.reload()
        },
        //修改登录密码
        LoginPassword() {
            this.$router.push("/LoginPassword");
        },
        //修改支付密码
        PaymentPassword() {
            this.$router.push("/PaymentPassword");
        },
        //资产详情
        AssetDetails() {
            this.$router.push("/AssetDetails");
        },
        //实名认证
        RealName() {
            if (this.userInfo.iaiState == 0) {
                this.$router.push("/RealName");
            } else {
                this.$router.push("/AlreadyRealName");
            }
        },
        //前往广告机
        Advertising() {
            this.$router.push("/Advertising");
        }
    },
    beforeCreate: function() {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        this.userInfo=JSON.parse(localStorage.userInfo);
        if(!this.userInfo.headImgUrl){
            this.updated_user().then(x=>{
                console.log('需改用户信息',x)
                // this.$store.commit('setCurrent');
                this.get_user().then(res=>{
                    console.log('获取用户头像',res);
                    this.userInfo=JSON.parse(localStorage.userInfo);
                }).catch(err=>{
                    console.log('获取头像失败',err)
                })
            })
        }

        // /www/mystack/sites/b.hzjifen.com/www
        //查询和你自己申请的店铺
        this.$store.commit('setMyshop');
        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function() {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function() {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function() {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function() {
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        userInfo(x) {
            // console.log("监听userInfo数据变化", x);
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#my {
    height: 100%;
    // overflow: auto;
}
#my .mui-bar {
    background: $header_background;
    box-shadow: none;
}

#my .mui-title {
    color: #ffffff;
}

#my .swiper-pagination-bullet-active {
    background: $header_background;
}

#my .box_1 {
    background: $header_background;
    padding: 0.3rem;
    display: flex;
}

#my .box_1 .img_box {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    background: #cccccc;
}

#my .box_1 .img_box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
}

#my .box_1 .type_box {
    color: #ffffff;
    margin: 0px 0.1rem;
    white-space: nowrap;
    font-size: 14px;
    flex-grow: 1;
    span i{
        font-size: 20px;
    }
}
#my .box_1 .help {
    color: #ffffff;
    text-align: center;
    div{
        font-size: 10px;
    }
}


#my .box_1 .type_box div {
    margin: 0px 0px 0.1rem 0px;
}

#my .box_1 .explain_box {
    color: rgba(255, 195, 0, 1);
    font-size: 12px;
}

#my .box_2 {
    display: flex;
    background: $header_background;
    padding: 0.15rem;
    color: #ffffff;
}

#my .box_2 ul {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    padding: 0px 0.1rem 0px 0px;
}

#my .box_3 {
    background: #ffffff;
    margin: 4px 0px 0px 0px;
}

#my .box_3 .title_1 {
    display: flex;
    align-items: center;
    padding: 0.1rem 0.15rem;
    font-size: 12px;
    border-bottom: 1px solid #ececec;
}

#my .box_3 .title_1 i {
    font-size: 20px;
}

#my .box_3 .title_1 > li:nth-child(1) {
    flex-grow: 1;
    font-weight: bold;
    color: #505050;
}

#my .box_3 .title_1 > li:nth-child(2),
#my .box_3 .title_1 > li:nth-child(3) {
    color: #8c8c8c;
}

#my .box_3 {
    .list {
        display: flex;
        padding: 0.12rem 0px;
        text-align: center;
        // border-bottom: 1px solid #c8c7cc;
        > li {
            width: 20%;
        }
        div {
            font-size: 0.3rem;
            color: rgba(90, 199, 244, 1);
            margin: 0px 0px 0px 0px;
        }
        span {
            color: #808080;
            font-size: 0.12rem;
        }
    }
}

#my .box_4 {
    // font-size: 12px;
    color: #383838;
    margin: 3px 0px 0px 0px;
    .mui-table-view-cell:after {
        left: 0px;
    }
    span {
        font-size: 12px;
    }
}

#my .box_5 {
    color: rgba(80, 80, 80, 1);
    margin: 3px 0px 0px 0px;

    .mui-table-view-cell:after {
        left: 0px;
    }

    a {
        padding-right: 40px;
        display: flex;
        justify-content: space-between;
    }

    span {
        font-size: 12px;
    }
}
#my .box_6 {
    position: relative;
    margin: 0px 13px;
    height: 0.32rem;
    > ul {
        display: flex;
        background: #ffffff;
        padding: 8px 0px 8px;
        border-radius: 10px;
        min-height: 0.56rem;
        position: absolute;
        width: 100%;
        top: -0.28rem;
        left: 0px;
    }
    li {
        width: 20%;
        text-align: center;
        i {
            color: #f4942c;
        }
        span {
            color: #505050;
            font-size: 0.1rem;
        }
    }
}

.go_out {
    width: 158px;
    height: 30px;
    line-height: 30px;
    color: rgba(255, 255, 255, 1);
    border-radius: 30px;
    font-size: 14px;
    text-align: center;
    margin: 0.2rem auto 30px;
}

.QRCode_box{
    position: absolute;
    bottom: 0px;
    left: -100%;
    .content_1{
        position: relative;
        z-index: 1;
        background: #ffffff;
        width: 270px;
        padding: 17px 25px 15px 25px;
        .title_1{
            display:flex;
            align-items: center;
            .img_box{
                width: 40px;
                height: 40px;
                margin: 0px 14px 0px 0px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 100%;
                }
            }
            .userName{
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
            }
            .text{
                color: rgba(80, 80, 80, 1);
            	font-size: 10px;
            }
        }
        .erweima_box{
            width: 200px;
            height: 200px;
            margin: 15px auto 0px;
            position: relative;
            div{
                width: 100%;
                height: 100%;
            }
            img{
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 0;
            }
            .head_img{
                position: absolute;
                width: 44px;
                height: 44px;
                border-radius: 10px;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                margin: auto;
                z-index: 1;
                background: #ffffff;
                padding: 2px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    border: 1px solid #cccccc;
                }
            }
        }
        .tishi{
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
            text-align: center;
            margin: 14px 0px 0px;
        }
    }
}

.QRCode{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    .mask{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
    }
    .content_1{
        >img{
            width: 100%;
        }
        position: relative;
        z-index: 1;
        background: #ffffff;
        width: 270px;
        // padding: 17px 25px 15px 25px;
        .close_1{
            width: 36px;
            height: 50px;
            position: absolute;
            top: -50px;
            right: 0px;
            >div:nth-child(1){
                height: 36px;
                text-align: center;
                line-height: 36px;
                background: #ffffff;
                border-radius: 100%;
                position: relative;
                z-index: 1;
            }
            >div:nth-child(2){
                position: absolute;
                width: 1px;
                height: 100%;
                background: #ffffff;
                top: 0px;
                right: 0px;
                left: 0px;
                margin: 0px auto;
            }
        }
       
    }
}
</style>
