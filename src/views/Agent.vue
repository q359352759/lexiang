<template>
    <div id="Agent">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{this.$store.state.isweixin ? '' : '代理人'}}</h1>
            <span @click="RegionalAgent()" class="quyu">区域代理</span>
        </header>

        <div class="mui-content">
            <div class="box_1">
                <div class="img_box">
                    <img src="@/assets/image/lxlogo_180.png" alt="" srcset="">
                </div>
                <div class="text">
                    <div>{{agentUser.realName}}-业务代理人</div>
                    <div>
                        {{areaList[0] ? areaList[0].name : ''}}{{areaList[1] ? areaList[1].name : ''}}{{areaList[2] ? areaList[1].name : ''}}
                    </div>
                </div>
                <div @click="go('/market')" class="market">业务市场</div>
            </div>

            <ul class="box_2">
                <li :class="{'active':type_1==1}" @click="change_type(1)">
                    <div class="img_box">
                        <img src="image/d1.png" alt="" srcset="">
                    </div>
                    <div class="title">补贴</div>
                    <div class="money">{{agentUser.subsidiesall}}</div>
                </li>
                <li :class="{'active':type_1==2}" @click="change_type(2)">
                    <div class="img_box">
                        <img src="image/d2.png" alt="" srcset="">
                    </div>
                    <div class="title">广告机</div>
                    <div class="money">0</div>
                </li>
                <li :class="{'active':type_1==3}" @click="change_type(3)">
                    <div class="img_box">
                        <img src="image/d3.png" alt="" srcset="">
                    </div>
                    <div class="title">分红</div>
                    <div class="money">0</div>
                </li>
                <li :class="{'active':type_1==4}" @click="change_type(4)">
                    <div class="img_box">
                        <img src="image/d4.png" alt="" srcset="">
                    </div>
                    <div class="title">可提现</div>
                    <div class="money">{{agentUser.sutotal}}</div>
                </li>
            </ul>

            <div class="content">
                <!-- 补贴 -->
                <div class="box_3" v-show="type_1==1">
                    <ul class="title">
                        <li>姓名</li>
                        <li>日期</li>
                        <li>直补</li>
                        <li>+直补</li>
                        <li>间补</li>
                        <li>+间补</li>
                    </ul>
                    <ul class="list" @scroll="butie_scroll($event)">
                        <li v-for="(x, index) in butie.list" :key="index">
                            <div>{{x.realName}}}</div>
                            <div>{{x.updateTime | datatime('yyyy-MM-dd')}}</div>
                            <div>{{x.dtSubsidies}}</div>
                            <div>{{x.dtSubsidiesPlus}}</div>
                            <div>{{x.itSubsidies}}</div>
                            <div>{{x.itSubsidiesPlus}}</div>
                        </li>
                        <div v-if="butie.loading" class="config_loading mui-text-center">拼命加载中···</div>
                        <div v-if="!butie.loading && butie.list.length==butie.total" class="config_load mui-text-center">———没有更多了———</div>
                        <div v-if="!butie.loading && butie.list.length==0" class="config_No_data mui-text-center">暂无数据</div>
                        <!-- <loading :loadingtype="butie.loading" :nodata="!butie.loading && butie.list.length==0" :end="!butie.loading && butie.list.length==butie.total"/> -->
                    </ul>

                    <ul class="footer">
                        <li>直推：{{agentUser.directly}}人</li>
                        <li>间推：{{agentUser.indirect}}人</li>
                        <li>直补：{{agentUser.result1}}元</li>
                        <li>间补：{{agentUser.result2}}元</li>
                    </ul>
                </div>

                <div class="box_4" v-show="type_1==2">
                    <!-- <ul class="title">
                        <li>客户</li>
                        <li>销售日期</li>
                        <li>套餐</li>
                        <li>佣金</li>
                    </ul>
                    <ul class="list">
                        <li v-for="x in list_1">
                            <div>李四</div>
                            <div>2018.01.16</div>
                            <div>至尊套餐</div>
                            <div>199</div>
                        </li>
                    </ul>
                    <ul class="footer">
                        <li>客户：50人</li>
                        <li>套餐数：50个</li>
                        <li>佣金：4900元</li>
                    </ul> -->
                    <div class="kaifazhong">
                        <div class="imb_box">
                            <img src="image/kaifazhong.png" alt="">
                        </div>
                        <div class="text">该功能正在研发中</div>
                    </div>
                </div>

                <div class="box_5" v-show="type_1==3">
                    <!-- <ul class="title">
                        <li>姓名</li>
                        <li>日期</li>
                        <li>新增LB</li>
                        <li>分红</li>
                    </ul>
                    <ul class="list">
                        <li v-for="x in  list_1">
                            <div>王五</div>
                            <div>2018-05-20</div>
                            <div>100</div>
                            <div>50</div>
                        </li>
                    </ul>
                    <ul class="footer">
                        <li>会员：50人</li>
                        <li>总LB：50个</li>
                        <li>总分红：4900元</li>
                    </ul> -->
                    <div class="kaifazhong">
                        <div class="imb_box">
                            <img src="image/kaifazhong.png" alt="">
                        </div>
                        <div class="text">该功能正在研发中</div>
                    </div>
                </div>

                <div class="box_6" v-show="type_1==4">
                    <ul class="list">
                        <li>
                            <div>补贴：{{agentUser.sutotal}}</div>
                            <div>累计：{{agentUser.subsidiesall}}</div>
                        </li>
                        <li>
                            <div>广告机：0</div>
                            <div>累计：0</div>
                        </li>
                        <li>
                            <div>分红：0</div>
                            <div>累计：0</div>
                        </li>
                    </ul>
                    <ul class="Collect_Money" @click="Account()">
                        <li>收款账户：{{Account_obj.account}}</li>
                        <li><i class="mui-icon mui-icon-arrowright"></i></li>
                    </ul>
                    <ul class="money">
                        <li>提现金额： </li>
                        <li>
                            <span>
                                <span>￥</span>

                                <!-- {{agentUser.sutotal}} -->
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
                    <!-- <button class="btn_1" @click="alipay()">支付宝测试</button> -->
                </div>

            </div>

            <div class="payment" v-show="payment">
                <div class="mask"></div>
                <div class="payment_1">
                    <div class="forget" @click="PaymentPassword()">忘记密码？</div>
                    <div class="close_1" @click="change_payment(false)"><i class="mui-icon mui-icon-closeempty"></i></div>
                    <div class="title">支付密码</div>
                    <div class="input_box">
                        <input type="tel" id="accout_password" maxlength="6" v-model="accout_password" @input="passwad_change()" pattern="\d*">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div class="subsidy"></div>
                    </div>
                    <button @click="Put_forward()" class="btn_2">确定</button>
                </div>
            </div>

        </div>

        <circularNav />
    </div>
</template>

<script>
import circularNav from "@/components/circularNav.vue";
import loading from "@/components/loading.vue";
import { dateFtt } from "@/assets/js/currency";
export default {
    name: "Agent",
    components: {
        circularNav,
        loading
    },
    data() {
        return {
            type_1: 1,
            list_1: [1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            // list_1:[1]
            radio_type_2: true,
            payment: false, //支付弹出框
            userInfo: "",
            agentUser: {}, //代理人信息
            areaList: [], //代理的地区
            butie: {
                //补贴对象
                page_index: 0,
                page_size: 15,
                list: [],
                total: 0,
                loading: false //加载中
            },
            Account_obj: {}, //支付账号
            accout_password: "",
            amount: 0 //提现金额
        };
    },
    filters: {
        datatime(time, type) {
            return dateFtt(time, type);
        }
    },
    computed: {},
    methods: {
        //输入金额
        amount_change(){
            if(this.amount>this.agentUser.sutotal){
                this.amount=this.agentUser.sutotal
            }
        },
        //忘记密码
        PaymentPassword() {
            this.$router.push("/PaymentPassword");
        },
        //提现
        Put_forward() {
            var password_test = /^\d{6}$/; //6位数字验证
            if (!password_test.test(this.accout_password)) {
                mui.toast("支付密码为6位数字。", {
                    duration: 2000,
                    type: "div"
                });
                return;
            }
            var obj = {
                account: this.Account_obj.account, //到账账号
                amount: this.amount, //金额
                userid: this.userInfo.username,
                payPassword:this.accout_password,
                id:this.userInfo.id,
            };
            this.$axios({
                method: "get",
                url: "/api-u/users/alipay",
                // data: this.$qs.stringify(obj),
                // data:obj,
                params:obj
            }).then(x => {
                console.log(x);
                if(x.data.code==200){
                    this.payment=false;
                    this.getagentUser();
                    mui.alert('提现已提交，请注意查收。','提示','好的',function(){},'div')
                }else if(x.data.code){
                    mui.toast(x.data.message , { duration: 2000,type: "div"});
                }else{
                    mui.toast('系统错误，请稍后再试。' , { duration: 2000,type: "div"});
                }
            }).catch(error => {
                console.log(error);
                mui.toast("系统错误，请稍后再试。", { duration: 2000,type: "div"});
            });
        },
        //支付密码
        passwad_change() {
            if (this.accout_password.length > 6) {
                this.accout_password = this.accout_password.substring(1);
            }
        },
        //跳转业务代理合作协议
        BusinessAgreement() {
            this.$router.push("/BusinessAgreement?name=" + this.agentUser.realName);
        },
        // 补贴下拉
        butie_scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(e)
            if (h + t >= sh - 10 && !this.butie.loading &&  this.butie.list.length < this.butie.total) {
                console.log("到底底部");
                this.butie.page_index++;
                //查看下级带来的收益
                this.subsidies();
            }
        },
        //跳转区域代理
        RegionalAgent() {
            this.$router.push("/RegionalAgent");
        },
        change_type(x) {
            this.type_1 = x;
        },
        change_radio_2() {
            this.radio_type_2 = !this.radio_type_2;
        },
        change_payment(x) {
            this.payment = x;
            if(x){
                this.accout_password='';
                setTimeout(function(){
                    document.getElementById('accout_password').focus();
                },500)
            }
        },
        Account() {
            this.$router.push("/Account");
        },
        go(x) {
            this.$router.push(x);
        },
        //获取代理人信息
        getagentUser() {
            this.$axios({
                method: "get",
                url: "/api-u/agentUser/me?userid=" + this.userInfo.phone
            })
                .then(x => {
                    console.log("获取用户代理人信息", x);
                    if (x.data.code != 200) {
                        // this.agentUser = false;
                        this.$router.push("/ApplicationAgent");
                    } else {
                        this.agentUser = x.data.data;
                        this.amount = x.data.data.sutotal;
                        this.areaList = this.$store.getters.filter_area(
                            x.data.data.areaCode
                        );
                    }
                })
                .catch(error => {
                    this.agentUser = false;
                    this.$router.push("/ApplicationAgent");
                    console.log("获取用户代理人信息失败", error);
                });
        },
        //查看下级带来的收益
        subsidies() {
            this.butie.loading = true;
            this.$axios({
                method: "get",
                url:"/api-u/agentUser/subsidies/forme?referrerPhone=" +
                    this.userInfo.phone +
                    "&start=" +
                    this.butie.page_index * this.butie.page_size +
                    "&length=" +
                    this.butie.page_size
            })
            .then(x => {
                if (x.data.code == 200) {
                    this.butie.list = this.butie.list.concat(
                        x.data.data.data
                    );
                    this.butie.total = x.data.data.sutotal;
                    this.butie.loading = false;
                }
                console.log("查看下级带来的收益", x);
            })
            .catch(error => {
                console.log(error);
            });
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
        }
    },
    mounted: function() {
        if (localStorage.userInfo && localStorage.userInfo!="" && localStorage.userInfo!= null && localStorage.userInfo != undefined && localStorage.userInfo != "undefined"){
            this.userInfo = JSON.parse(localStorage.userInfo);
        }

        if (this.$store.state.isweixin) {
            document.getElementsByTagName("title")[0].innerText = "代理人";
        }
        //获取代理人信息
        this.getagentUser();
        //查看下级带来的收益
        this.subsidies();
        //查询支付宝账号
        this.findAccount();

        // console.group('------mounted 挂载结束状态------');
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#Agent {
    height: 100%;
    .mui-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    footer {
        position: fixed;
        width: 100%;
        bottom: 0px;
        left: 0px;
        background: $header_background;
    }
}

#Agent .quyu {
    float: right;
    color: #ffffff;
    line-height: 44px;
    font-size: 0.14rem;
    margin: 0px 5px 0px 0px;
}
#Agent .mui-bar {
    // background: rgba(39, 172, 110, 1);
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#Agent .mui-title {
    color: #ffffff;
}

#Agent .box_1 {
    flex-shrink: 0;
    display: flex;
    padding: 0.15rem 0.18rem;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
    .img_box {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0px 0.1rem 0px 0px;
        flex-shrink: 0;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .text {
        overflow: hidden;
        > div:nth-child(1) {
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
            font-weight: bold;
        }
        > div:nth-child(2) {
            color: rgba(128, 128, 128, 1);
            font-size: 0.12rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .market {
        flex-grow: 1;
        text-align: right;
        color: rgba(42, 130, 228, 1);
        font-size: 14px;
        white-space: nowrap;
        flex-shrink: 0;
    }
}
#Agent .box_2 {
    flex-shrink: 0;
    display: flex;
    margin: 0.05rem 0px 0px;
    > li:nth-child(1) {
        border: none;
    }
    li.active {
        background: #efeff4;
    }
    li {
        width: 25%;
        padding: 0.1rem 0px 0.08rem;
        background: #ffffff;
        text-align: center;
        border-left: 1px solid #efeff4;
        .img_box {
            width: 0.37rem;
            height: 0.37rem;
            margin: 0px auto 3px;
            background: #949494;
            border-radius: 100%;
            padding: 3px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
    }
    .title {
        color: rgba(80, 80, 80, 1);
        font-size: 0.11rem;
        line-height: initial;
        line-height: 0.16rem;
    }
    .money {
        color: rgba(227, 60, 100, 1);
        font-size: 0.11rem;
        line-height: 0.16rem;
    }
}

#Agent .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

#Agent .box_3 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin: 5px 0px 0px;
    .title {
        display: flex;
        flex-shrink: 0;
        height: 30px;
        background: #ffffff;
        align-items: center;
        font-weight: bold;
        li {
            min-height: 100%;
            flex-grow: 1;
            text-align: center;
            border-left: 1px solid #e2e1e1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 30px;
            font-size: 12px;
            line-height: 30px;
        }
        > li:nth-child(1) {
            white-space: nowrap;
            width: 60px;
            border: none;
        }
        > li:nth-child(2) {
            white-space: nowrap;
            width: 50px;
        }
    }
    .list {
        overflow: auto;
        flex-grow: 1;
    }
    .list > li:nth-child(2n) {
        background: #ffffff;
    }
    .list > li:nth-child(2n-1) {
        background: rgba(242, 242, 242, 1);
    }
    .list > li {
        color: #5a5a5a;
        display: flex;
        height: 30px;
        align-items: center;
        div {
            min-height: 100%;
            flex-grow: 1;
            text-align: center;
            border-left: 1px solid #e2e1e1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 30px;
            font-size: 12px;
            line-height: 30px;
        }
        > div:nth-child(1) {
            white-space: nowrap;
            width: 60px;
            border: none;
        }
        > div:nth-child(2) {
            white-space: nowrap;
            width: 50px;
        }
    }
    .footer {
        display: flex;
        height: 32px;
        color: rgba(255, 255, 255, 1);
        background-color: $header_background;
        font-size: 11px;
        text-align: center;
        line-height: 32px;
        flex-shrink: 0;
        li {
            width: 25%;
        }
    }
}

#Agent .box_4 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    margin: 5px 0px 0px 0px;
    .title {
        flex-shrink: 0;
        display: flex;
        > li:nth-child(1) {
            border: none;
        }
        li {
            width: 25%;
            height: 30px;
            line-height: 30px;
            background: #e8e8e8;
            border-left: 1px solid rgba(198, 198, 198, 1);
        }
    }
    .list {
        overflow: auto;
        color: #5a5a5a;
        flex-grow: 1;
        > li:nth-child(2n-1) {
            background: #ffffff;
        }
        > li:nth-child(2n) {
            background: #e8e8e8;
        }
        > li {
            display: flex;
            > div:nth-child(1) {
                border: none;
            }
            > div {
                width: 25%;
                height: 30px;
                line-height: 30px;
                border-left: 1px solid rgba(198, 198, 198, 1);
            }
        }
    }
    .footer {
        flex-shrink: 0;
        height: 32px;
        background: $header_background;
        display: flex;
        line-height: 32px;
        text-align: center;
        color: #ffffff;
        li {
            width: 33.3%;
        }
    }
}

#Agent .box_5 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    margin: 5px 0px 0px 0px;
    .title {
        flex-shrink: 0;
        display: flex;
        > li:nth-child(1) {
            border: none;
        }
        li {
            width: 25%;
            height: 30px;
            line-height: 30px;
            background: #ffffff;
            border-left: 1px solid rgba(198, 198, 198, 1);
        }
    }
    .list {
        overflow: auto;
        flex-grow: 1;
        color: #5a5a5a;
        > li:nth-child(2n) {
            background: #ffffff;
        }
        > li:nth-child(2n-1) {
            background: #e8e8e8;
        }
        > li {
            display: flex;
            > div:nth-child(1) {
                border: none;
            }
            > div:nth-child(3) {
                color: #00edef;
            }
            > div {
                width: 25%;
                height: 30px;
                line-height: 30px;
                border-left: 1px solid rgba(198, 198, 198, 1);
            }
        }
    }
    .footer {
        flex-shrink: 0;
        height: 32px;
        background: $header_background;
        display: flex;
        line-height: 32px;
        text-align: center;
        color: #ffffff;
        li {
            width: 33.3%;
        }
    }
}

#Agent .box_6 {
    margin: 5px 0px 0px 0px;
    .list > li {
        position: relative;
        background: #ffffff;
        color: rgba(56, 56, 56, 1);
        font-size: 12px;
        display: flex;
        height: 37px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        line-height: 37px;
        > div {
            width: 50%;
            padding: 0px 0px 0px 0.25rem;
        }
    }
    .list > li::after {
        position: absolute;
        content: "";
        width: 1px;
        height: 60%;
        top: 20%;
        left: 50%;
        background: rgba(229, 229, 229, 1);
    }
    .Collect_Money {
        margin: 5px 0px 0px 0px;
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
                input {
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
                margin: 0px 0px 0px 20px;
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

#Agent .payment {
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
            background-color: $header_background;
            font-size: 14px;
            border-radius: 26px;
            border: none;
            margin: 16px auto;
            display: block;
            padding: 0px;
        }
    }
}

#Agent .kaifazhong {
    margin: 0.8rem auto 0px;
    .imb_box {
        width: 1.28rem;
        margin: 0px 0px 17px 0px;
        img {
            width: 100%;
        }
    }
    .text {
        color: #505050;
        font-size: 0.14rem;
    }
}

// 单选
#Agent .radio_1 {
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
#Agent .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
    }
}
</style>
