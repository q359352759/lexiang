<template>
    <div id="RegionalAgent">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{this.$store.state.isweixin ? '' : '区域代理商'}}</h1>
        </header>

        <div class="mui-content">
            <ul class="box_1">
                <li class="img_box">
                    <img src="@/assets/image/lxlogo_180.png" alt="" srcset="">
                </li>
                <li class="text">
                    <h1>{{areaManager_obj.name}}</h1>
                    <h2> {{areaList[0] ? areaList[0].name : ''}}{{areaList[1] ? '/'+areaList[1].name : ''}}{{areaList[2] ? '/'+areaList[2].name : ''}}</h2>
                </li>
            </ul>
            <ul class="box_2">
                <li @click="change_type(1)" :class="{'active':type_1==1}">
                    <h1>自推</h1>
                    <h2>{{zitui_obj.total}}人</h2>
                </li>
                <li @click="change_type(2)" :class="{'active':type_1==2}">
                    <h1>他推</h1>
                    <h2>{{tatui_obj.total}}人</h2>
                </li>
                <li @click="change_type(3)" :class="{'active':type_1==3}">
                    <h1>提现</h1>
                    <h2>{{areaManager_obj.sutotal}}元</h2>
                </li>
            </ul>
            <!-- 自推 -->
            <div class="content_1" v-show="type_1==1">
                <ul class="box_3">
                    <li>
                        <div>被推荐人</div>
                        <div>直推</div>
                        <div>间推</div>
                        <div>收益</div>
                    </li>
                </ul>
                <ul class="box_3 list" @scroll="scroll($event,zitui_obj)">
                    <li></li>
                    <li v-for="(item, index) in zitui_obj.list" :key="index">
                        <div>{{item.name}}</div>
                        <div>{{item.dtname ? item.dtname : '无'}}{{item.dtSubsidies ? '('+item.dtSubsidies+')' : ''}}</div>
                        <div>{{item.itname ? item.itname : '无'}}{{item.itSubsidies ? '('+item.itSubsidies+')' : ''}}</div>
                        <div>{{item.subsidies}}</div>
                    </li>
                    <loading :loadingtype="zitui_obj.loading" :nodata="!zitui_obj.loading && zitui_obj.list.length==0" :end="!zitui_obj.loading && zitui_obj.list.length==zitui_obj.total && zitui_obj.list.length!=0"/>                    
                </ul>
                <ul class="footer_1">
                    <li>总人数：{{zitui_obj.total}}</li>
                    <li>总收益：{{areaManager_obj.sutotal}}元</li>
                </ul>
            </div>
            <!-- 他推 -->
            <div class="content_1" v-show="type_1==2">
                <ul class="box_3">
                    <li>
                        <div>被推荐人</div>
                        <div>直推</div>
                        <div>间推</div>
                        <div>收益</div>
                    </li>
                </ul>
                <ul class="box_3 list"  @scroll="scroll($event,tatui_obj)">
                    <li></li>
                    <li v-for="(item, index) in tatui_obj.list" :key="index">
                        <div>{{item.name}}</div>
                        <div>{{item.dtname}}{{item.dtSubsidies ? '('+item.dtSubsidies+')' : ''}}</div>
                        <div>{{item.itname ? item.itname : '无'}}{{item.itSubsidies ? '('+item.itSubsidies+')' : ''}}</div>
                        <div>{{item.subsidies}}</div>
                    </li>
                    <loading :loadingtype="tatui_obj.loading" :nodata="!tatui_obj.loading && tatui_obj.list.length==0" :end="!tatui_obj.loading && tatui_obj.list.length==tatui_obj.total && tatui_obj.list.length!=0"/>
                </ul>
                <ul class="footer_1">
                    <li>总人数：{{zitui_obj.total}}</li>
                    <li>总收益：{{areaManager_obj.sutotal}}元</li>
                </ul>
            </div>

            <div class="content_2" v-show="type_1==3">
                <div class="box_4">
                    <ul class="Collect_Money" @click="Account()">
                        <li>收款账户：{{Account_obj.account}}</li>
                        <li><i class="mui-icon mui-icon-arrowright"></i></li>
                    </ul>
                    <ul class="money">
                        <li>提现金额： </li>
                        <li>
                            <span>￥
                                <!-- {{areaManager_obj.sutotal}} -->
                                 <input type="text" v-model="amount" @input="amount_change()"/>
                            </span>
                            <span>费率：4%</span>
                        </li>
                    </ul>
                    <div class="Agreement">
                        <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <span @click="change_radio_2()">我也阅读并同意</span>
                        <span @click="BusinessAgreement()">《业务代理合作协议》</span>
                        <span>
                            <span @click="go('EmbodyRecord')">
                                提现记录
                            </span>
                        </span>
                    </div>
                    <button class="btn_1" @click="change_payment(true)">提交</button>
                </div>
            </div>

        </div>

        <div class="payment" v-show="payment">
            <div class="mask"></div>
            <div class="payment_1">
                <div class="forget" @click="PaymentPassword()">忘记密码？</div>
                <div class="close_1" @click="change_payment(false)"><i class="mui-icon mui-icon-closeempty"></i></div>
                <div class="title">支付密码</div>
                <div class="input_box">
                    <input type="tel" id="accout_password"  maxlength="6" v-model="accout_password" @input="passwad_change()" pattern="\d*">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <button @click="Put_forward()" class="btn_2">确定</button>
            </div>
        </div>

        <form class="input_name" @submit.prevent="Submission()" :class="{'active':input_name_box}">
            <div class="mask" @click="clese_1()"></div>
            <ul class="">
                <li>该手机号对应多个账号，请输入真实姓名。</li>
                <li>
                    <input type="text" v-model="name" required placeholder="请输入真实姓名">
                </li>
                <li>
                    <button type="submit">确定</button>
                </li>
            </ul>
        </form>


    </div>
</template>

<script>
import {openloading} from "@/assets/js/currency"
import loading from "@/components/loading.vue";
export default {
    name: "",
    components: {
        loading
    },
    data() {
        return {
            list: [
                1,
                2,
                3,
                4,
                5,
                1,
                2,
                3,
                4,
                51,
                2,
                3,
                4,
                51,
                2,
                3,
                4,
                51,
                2,
                3,
                4,
                51,
                2,
                3,
                4,
                5
            ],
            type_1: 1, //类型 1自推 2他推 3体现
            radio_type_2: true,
            payment: false,
            Account_obj: {}, //支付账号
            areaManager_obj:{},     //代理商信息
            userInfo:{},        //用户信息
            areaList: [],       //代理的地区,
            amount:0,           //提现金额
            accout_password:'', //支付密码
            zitui_obj:{
                page_index:0,
                page_size:20,
                list:[],
                loading:true,
                type:0,         //自推
                total:0         //人数
            },
            tatui_obj:{
                page_index:0,
                page_size:20,
                list:[],
                loading:true,
                type:1,      //他推
                total:0      //人数
            },
            CanBePresented:true,     //可以提现
            input_name_box:false,
            name:'',        //收钱放名字
            
        };
    },
    computed: {},
    methods: {
        amount_change(){
            if(!this.areaManager_obj.sutotal){
                this.amount=0
            }else if(this.amount>this.areaManager_obj.sutotal){
                this.amount=this.areaManager_obj.sutotal
            }
        },
        BusinessAgreement(){
            this.$router.push('/BusinessAgreement?name='+this.areaManager_obj.name);
        },
        //滚动条
        scroll(e,obj){
            // console.log(obj)
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(e)
            if (h + t >= sh - 10 && !obj.loading &&  obj.list.length < obj.total) {
                console.log("到底底部");
                // this.butie.page_index++;
                obj.page_index++;
                this.subformanager(obj);
                //查看下级带来的收益
            }
        },
        //选择类型
        change_type(x) {
            this.type_1 = x;
        },
        //合作协议
        change_radio_2(x) {
            this.radio_type_2 = !this.radio_type_2;
        },
        go(x) {
            this.$router.push(x);
        },
        Account() {
            this.$router.push("/Account");
        },
        //忘记密码
        PaymentPassword(){
            this.$router.push("/PaymentPassword");
        },
         //支付密码
        passwad_change() {
            if (this.accout_password.length > 6) {
                this.accout_password = this.accout_password.substring(1);
            }
        },
        //关闭输入名字
        clese_1(){
            this.input_name_box=false;
        },
        //再次提交
        Submission(){
            this.Put_forward();
        },
        //提现
        Put_forward(){
            var password_test = /^\d{6}$/; //6位数字验证
            if (!password_test.test(this.accout_password)) {
                mui.toast("支付密码为6位数字。", { duration: 2000,type: "div"});
                return;
            }
            this.payment=false;
            this.CanBePresented=false;
            this.input_name_box=false;            
            openloading(true)
            var obj = {
                account: this.Account_obj.account, //到账账号
                amount: this.amount, //金额
                userid: this.userInfo.username,
                payPassword:this.accout_password,
                id:this.userInfo.id,
                name:this.name,
            };
            this.$axios({
                method: "get",
                url: "/api-u/users/alipay/agentmanager",
                // data: this.$qs.stringify(obj),
                // data:obj,
                params:obj
            }).then(x => {
                console.log(x);
                if(x.data.code==200){
                    this.areaManager();
                    if(!x.data.data){
                        mui.alert('提现已提交，请注意查收。','提示','好的',function(){},'div')
                    }else{
                        mui.alert('已提交至审核，请注意查收。','提示','好的',function(){},'div')
                    }
                }else if(x.data.code=="PAYEE_USER_INFO_ERROR"){
                    mui.toast('名字输入有误。',{duration: 2000,type: "div"});
                    this.input_name_box=true;
                }else if(x.data.code=="PAYEE_ACC_OCUPIED"){
                    this.input_name_box=true;
                }else if(x.data.code){
                    mui.toast(x.data.message , { duration: 2000,type: "div"});
                }else{
                    mui.toast('系统错误，请稍后再试。' , { duration: 2000,type: "div"});
                }
                this.CanBePresented=true;
                openloading(false)
            }).catch(error => {
                console.log(error);
                mui.toast("系统错误，请稍后再试。", { duration: 2000,type: "div"});
                openloading(false)
                this.CanBePresented=true;
                this.input_name_box=false;
            });
        },
        //打开关闭支付密码输入窗口
        change_payment(x) {
            if(x){
                if(!this.radio_type_2){
                     mui.toast("请同意业务代理合作协议", {duration: 2000,type: "div"});
                    return;
                }else if(!this.Account_obj.account){
                    mui.toast("请设置收款账号", {duration: 2000,type: "div"});
                    return;
                }else if(this.amount==0 && x){
                    mui.toast("无提现金额", {duration: 2000,type: "div"});
                    return;
                }else if(this.amount%1!=0 && x){
                    mui.toast("请输入整数！", {duration: 2000,type: "div"});
                    return;
                }else if(!this.CanBePresented){
                     mui.toast("提现正在处理中，请稍等。", {duration: 2000,type: "div"});
                    return;
                }
                this.payment = x;
                this.accout_password='';
                setTimeout(function(){
                    document.getElementById('accout_password').focus();
                },500)
            }else{
                this.payment = x;
            }
        },
        //获取代理商信息
        areaManager(){
            this.$axios({
                method:'get',
                url:'/api-u/areaManager/findme?userid='+this.userInfo.username
            }).then(x=>{
                console.log('获取代理商信息',x)
                if(x.data.data!='' && x.data.data!=null && x.data.data!='null'){
                    this.areaManager_obj=x.data.data;
                    this.amount=this.areaManager_obj.sutotal;
                    this.areaList = this.$store.getters.filter_area(x.data.data.areaCode);
                }else{
                    // this.isareaManager=true;

                }
            }).catch(error=>{
                console.log('获取代理商信息错误',error);
            })
        },
        // 获取自推
        // /users/subformanager
        subformanager(x){
            x.loading=true;
            this.$axios({
                method:'get',
                url:'/api-u/users/subformanager?userid='+this.userInfo.username+'&type='+x.type+'&start='+x.page_index*x.page_size+'&length='+x.page_size
            }).then(res=>{
                console.log(x.type,res)
                if(res.data.code==200){
                    x.total=res.data.data.total;
                    x.list=x.list.concat(res.data.data.data);
                    x.loading=false;
                }else{
                    x.loading=false
                }
            }).catch(error=>{
                x.loading=false
            })
        },
        //获取支付宝账号
        findAccount() {
            this.$axios({
                method: "get",
                url: "/api-u/users/findAccount?userid=" + this.userInfo.username
            }).then(x => {
                console.log("获取支付宝账号", x);
                if (x.data.data != null) {
                    this.Account_obj = x.data.data;
                }
            }).catch(error=>{
                console.log(error)
            })
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
        document.getElementsByTagName("title")[0].innerText = "区域代理商";
        if(localStorage.userInfo && localStorage.userInfo!=''){
            this.userInfo=JSON.parse(localStorage.userInfo)
        }

        //获取代理商信息
        this.areaManager();
        //获取自推
        this.subformanager(this.zitui_obj)
        //获取他推
        this.subformanager(this.tatui_obj)
        //获取支付账号
        this.findAccount();
        // zitui_list:{
        //         page_index:0,
        //         page_size:50,
        //         list:[],
        //         loading:false,

        //     },
        //     tatui_list:{
        //         page_index:0,
        //         page_size:50,
        //         list:[],
        //         loading:false,
        //     }
        // console.log(this.$store.getters.doneTodos)
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
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#RegionalAgent {
    height: 100%;
    overflow: auto;
}
#RegionalAgent .mui-bar {
    background: $header_background;
    box-shadow: none;
    a {
        color: #ffffff;
    }
}

#RegionalAgent .mui-title {
    color: #ffffff;
}
#RegionalAgent .mui-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #e5e5e5;
}
#RegionalAgent .box_1 {
    display: flex;
    padding: 0px 0.18rem;
    align-items: center;
    min-height: 0.8rem;
    flex-shrink: 0;
    background: #ffffff;
    .img_box {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0px 0.1rem 0px 0px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .text {
        line-height: initial;
        h1 {
            font-size: 0.14rem;
            color: #505050;
        }
        h2 {
            font-size: 0.12rem;
            color: #808080;
            font-weight: 100;
        }
    }
}

#RegionalAgent .box_2 {
    flex-shrink: 0;
    margin: 5px 0px 5px;
    min-height: 0.53rem;
    background: #ffffff;
    display: flex;
    text-align: center;
    line-height: initial;
    > li {
        width: calc(100% / 3);
        padding: 0.14rem 0px 7px;
        h1 {
            color: #505050;
            font-size: 0.11rem;
            font-weight: 100;
        }
        h2 {
            color: #e33c64;
            font-size: 0.11rem;
            font-weight: 100;
        }
    }
    > li.active {
        background: #e5e5e5;
    }
}

#RegionalAgent .content_1 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .list {
        flex-grow: 1;
        overflow: auto;
    }
    .footer_1 {
        background: $header_background;
        height: 0.32rem;
        color: #ffffff;
        font-size: 0.11rem;
        line-height: 0.32rem;
        display: flex;
        justify-content: space-around;
        flex-shrink: 0;
    }
}
#RegionalAgent .box_3 {
    text-align: center;
    font-size: 0.13rem;
    > li:nth-child(2n-1) {
        background: #f0f0f0;
    }
    > li:nth-child(2n) {
        background: #ffffff;
    }
    > li {
        display: flex;
        border-bottom: 1px solid #d8d8d8;
        > div {
            padding: 0.1rem 0px;
            width: 25%;
            border-left: 1px solid #d8d8d8;
        }
        > div:nth-child(1) {
            border: none;
        }
    }
}
#RegionalAgent .box_4 {
    .Collect_Money {
        margin: 0px 0px 0px 0px;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        line-height: 35px;
        padding: 0px 10px 0px 20px;
        color: rgba(56, 56, 56, 1);
        font-size: 12px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        i {
            line-height: 35px;
        }
    }
    .money {
        padding: 0px 10px 0px 20px;
        background: #ffffff;
        color: rgba(80, 80, 80, 1);
        > li:nth-child(1) {
            font-size: 12px;
            padding: 6px 0px;
        }
        > li:nth-child(2) {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 5px 0px 15px 0px;
            > span:nth-child(1) {
                font-size: 27px;
                line-height: initial;
                display: flex;
                input{
                    padding: 0px;
                    margin: 0px;
                    border: none;
                    font-size: 27px;
                    border-bottom: 1px solid #cccccc;
                }
            }
            > span:nth-child(2) {
                font-size: 12px;
                padding: 0px 0px 0px 10px;
                border-left: 1px solid rgba(80, 80, 80, 1);
                height: 14px;
                line-height: 14px;
                white-space: nowrap;
                margin: 0px 0px 0px 15px;
            }
        }
    }
    .Agreement {
        display: flex;
        padding: 0px 20px;
        font-size: 12px;
        align-items: center;
        margin: 20px 0px;
        > span:nth-child(2) {
            margin: 0px 0px 0px 5px;
        }
        > span:nth-child(3) {
            /* color: rgba(58, 182, 237, 1) */
            color: rgba(42, 130, 228, 1);
        }
        > span:nth-child(4) {
            flex-grow: 1;
            text-align: right;
            color: rgba(42, 130, 228, 1);
        }
    }
    .btn_1 {
        width: 170px;
        height: 32px;
        display: block;
        margin: 0px auto;
        color: rgba(255, 255, 255, 1);
        background-color: $header_background;
        border: none;
        border-radius: 32px;
    }
}


#RegionalAgent .input_name.active{
    display: flex;
}   
#RegionalAgent .input_name{
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    ul{
        background: #ffffff;
        position: relative;
        z-index: 1;
        width: 2.98rem;
        >li:nth-child(1){
            padding: 0.13rem;
            color: rgba(80, 80, 80, 1);
        	font-size: 0.12rem;
            text-align: center;
        }
        >li:nth-child(2){
            padding: 0px 0.3rem;
            height: 0.36rem;
            input{
                text-align: center;
                background: rgba(166, 166, 166, 1);
                margin: 0px;
                padding: 0px;
                height: 100%;
                font-size: 0.14rem;
            }
        }
        >li:nth-child(3){
            padding: 0.15rem;
            text-align: center;
            button{
                width: 1.23rem;
            	height: 0.26rem;
                color: rgba(255, 255, 255, 1);
            	background-color: rgba(54, 140, 89, 1);
                border-radius: 0.26rem;
                padding: 0px;
                border: none;
            }
        }
    }
}


#RegionalAgent .payment {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.5);
    }
    .payment_1 {
        background: #ffffff;
        width: 298px;
        position: relative;
        z-index: 1;
        max-width: 100%;
        .forget {
            position: absolute;
            color: rgba(80, 80, 80, 1);
            font-size: 10px;
            top: 10px;
            left: 24px;
            z-index: 1;
        }
        .close_1 {
            position: absolute;
            top: 0px;
            right: 0px;
            color: rgba(153, 153, 153, 1);
            z-index: 1;
            i {
                font-size: 30px;
            }
        }
        .title {
            height: 42px;
            line-height: 42px;
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
            text-align: center;
            position: relative;
            z-index: 0;
        }
        .input_box {
            width: 243px;
            height: 39px;
            margin: 0px auto;
            position: relative;
            input {
                padding: 0px;
                margin: 0px;
                height: 100%;
                letter-spacing: 31px;
                padding: 0px 0px 0px 15px;
                position: relative;
                z-index: 1;
                border: none;
                background: none;
                width: 130%;
            }
            > ul {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                display: flex;
                border-right: 1px solid #cccccc;
                li {
                    border-left: 1px solid #cccccc;
                    border-top: 1px solid #cccccc;
                    border-bottom: 1px solid #cccccc;
                    width: calc(100% / 6);
                }
            }
            .subsidy {
                position: absolute;
                background: #ffffff;
                width: 26px;
                height: 100%;
                top: 0px;
                right: -26px;
                z-index: 2;
            }
        }
        .btn_2 {
            width: 123px;
            height: 26px;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(54, 140, 89, 1);
            font-size: 14px;
            border-radius: 26px;
            border: none;
            margin: 16px auto;
            display: block;
            padding: 0px;
        }
    }
}

// 单选
#RegionalAgent .radio_1 {
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 15px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    font-size: 12px;
    i {
        font-size: 10px;
        display: none;
    }
}
#RegionalAgent .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
    }
}
</style>
