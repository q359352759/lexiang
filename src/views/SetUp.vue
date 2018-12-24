<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                设置
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell ">
                        <a class="mui-navigate-right item_box" @click="xiugaitouxiang()">
                            <span>头像</span>
                            <div class="img_box">                               
			            		<img v-if="userInfo.headImgUrl!='' && userInfo.headImgUrl!=null" :src="userInfo.headImgUrl" alt="">
            					<img v-if="userInfo.headImgUrl=='' || userInfo.headImgUrl==null" src="@/assets/image/lxlogo_180.png">
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell " >
                        <a class="mui-navigate-right item_box">
                            <span>昵称</span>
                            <span>
                                {{userInfo.nickname}}
                            </span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell ">
                        <a class="mui-navigate-right item_box">
                            <span>手机号码</span>
                            <span>{{userInfo.phone | fliter_phone}}</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell ">
                        <a class="mui-navigate-right item_box" @tap="LoginPassword()">
                            <span>登录密码</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item_box" @tap="PaymentPassword()">
                            <span>支付密码</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item_box" @click="RealName()">
                            <span>实名认证</span>
                            <span class="iaiState">
                                {{userInfo.iaiState!=1 ? '未认证' : '已认证'}}
                            </span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell " >
                        <a class="mui-navigate-right item_box">
                            <span>收货地址</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell ">
                        <a class="mui-navigate-right item_box" @tap="RegistrationAgreement()">
                            <span>注册协议</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell ">
                        <a class="mui-navigate-right item_box">
                            <span>隐私协议</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell ">
                        <a class="mui-navigate-right item_box" @click="$router.push('/my/AboutUs')">
                            <span>关于我们</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="box_2">当前版本1.0.2</div>

        </div>

        <HeadPortrait ref="HeadPortrait" v-show="HeadPortrait_show" :isnew="isnew" @setShow="get_show"/>
        
    </div>
</template>

<script>
import HeadPortrait from '@/components/setUp/HeadPortrait.vue';
export default {
    name:'',
    components: {
        HeadPortrait
    },
    data(){
        return{
            userInfo:'',
            HeadPortrait_show:false,
            isnew:false
        }
    },
    filters:{
        fliter_phone(phone) {
            if (!phone) return "";
            return (
                phone.substring(0, 3) +
                "***" +
                phone.substring(phone.length - 3)
            );
        }
    },
    methods:{
        //修改头像
        xiugaitouxiang(){
            this.HeadPortrait_show=true;
            // this.isnew=!this.isnew
            this.$refs.HeadPortrait.xuanzhetupian();
        },
        //
        get_show(x,setUserInfo){
            this.HeadPortrait_show=x;
            if(setUserInfo){
                console.log(123)
                this.userInfo=JSON.parse(localStorage.userInfo);
            }
        },
        //注册协议
        RegistrationAgreement(){
            this.$router.push('/RegistrationAgreement')
        },
        //实名认证
        RealName() {
            if (this.userInfo.iaiState == 0) {
                this.$router.push("/RealName");
            } else {
                this.$router.push("/AlreadyRealName");
            }
        },
        //修改登录密码
        LoginPassword() {
            this.$router.push("/LoginPassword");
        },
        //修改支付密码
        PaymentPassword() {
            this.$router.push("/PaymentPassword");
        },
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
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}
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

    }
}
</script>

<style lang="scss" scoped>
.box_1 {
    margin: 0px 0px 5px 0px;
    .item_box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0.45rem;
        .img_box{
            width: 44px;
            height: 44px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        span{
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
        }
        .iaiState{
            color: #007aff;
        }        
    }
    .mui-table-view-cell:after{
        left: 0px;
    }
}
.box_2{
    color: rgba(166, 166, 166, 1);
    font-size: 12px;
    margin: 0.1rem auto;
    text-align: center;
}
</style>


