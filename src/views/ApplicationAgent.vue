<template>
    <div id="ApplicationAgent">
        <header class="mui-bar mui-bar-nav">
            <a @click="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请代理人</h1>
        </header>

        <div class="mui-content">
            <form @submit.prevent="selectOne()">
                <table class="table_1">
                    <tbody>
                        <tr>
                            <td>申请人：</td>
                            <td>
                                <input type="text" v-model="realName" maxlength="10" placeholder="您的真实名字" required>
                            </td>
                        </tr>
                        <tr>
                            <td>推荐人：</td>
                            <td>
                                <input type="text" v-model="referrerPhone" pattern="^1\d{10}$" placeholder="推荐人电话号码">
                            </td>
                        </tr>
                        <tr>
                            <td>实名认证：</td>
                            <td @click="renzheng()">
                                <span class="Authentication" :class="{'active':userInfo.iaiState!=1}">{{userInfo.iaiState!=1 ? '未认证' : '已认证'}}</span>
                                <i class="mui-icon mui-icon-arrowright mui-pull-right"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>申请区域：</td>
                            <td @click="change_city()">
                                <div class="Surplus mui-pull-right">
                                    <!-- <span>剩余234个</span> -->
                                    <i class="mui-icon mui-icon-arrowright "></i>
                                </div>
                                <span class="region">
                                    {{city.length==0 ? '选择区域' :''}}
                                    {{city[0] ? city[0].text : ''}}
                                    {{city[1] && city[1].text ? ' '+city[1].text : ''}}
                                    {{city[2] && city[2].text ? ' '+city[2].text : ''}}
                                </span>

                            </td>
                        </tr>
                        <tr>
                            <td>费&nbsp;&nbsp;用：</td>
                            <td class="money">
                                <span>￥88</span>
                                <span>(业务代理费)</span>
                                <span @click="AgencyCost()" class="mui-pull-right"><i class="icon iconfont icon-help"></i></span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="box_2">
                    <img src="image/libao.png" alt="">
                    <span>活动：前1000名代理人免费赠送价值198元的广告机套餐！</span>
                </div>
                <ul class="box_3">
                    <li @click="change_radio_1(1)">
                        <div class="radio_1 " :class="{'active':radio_type_1==1}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <i class="icon iconfont icon-weixin weixin"></i>
                        <span>微信支付</span>
                    </li>
                    <!-- <li @click="change_radio_1(2)">
                        <div class="radio_1" :class="{'active':radio_type_1==2}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <i class="icon iconfont icon-zhifubao zhifubao"></i>
                        <span>支付宝</span>
                    </li> -->
                    <!-- <li class="haochu">
                        <span @click="AgentAdvantage()">
                            成为代理人的好处？
                        </span>
                    </li> -->
                </ul>

                <div class="box_4">
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <span @click="change_radio_2()">我也阅读并同意</span>
                    <span @click="BusinessAgreement()">《业务代理合作协议》</span>
                </div>

                <button class="btn_1" type="submit">确定</button>
            

            </form>
            <!-- <button @click="addguanggaoji()">添加广告测试</button> -->
            <!-- <input type="text" v-model="mo"> -->
            <!-- <button @click="zhifu()">支付测试1</button>
            <button @click="zhifu1()">支付测试2</button>
            <button @click="zhifu2()">支付测试3</button>
            <button @click="fenxiang()">分享测试</button>
            <button @click="fenxiang1()">分享测试1</button> -->
            <!-- <button @click="ceshi()">检测</button> -->
        </div>
        <div class="msg" v-show="loading">
            <span>数据获取中</span>
        </div>
    </div>
</template>

<script>
import {openloading } from "@/assets/js/currency";
export default {
    name: "ApplicationAgent",
    components: {},
    data() {
        return {
            loading: true,
            radio_type_1: 1,
            radio_type_2: true,
            cityPicker3: "", //地区3级联动
            city: [], //所选择的地区
            realName: "", //真实姓名
            referrerPhone: "", //荐人电话号码
            areaCode: "", //区域code
            mo: 0.1,
            userInfo: "",
            // weixinobj:{},   //微信的授权信息
            Authentication: {} //认证的信息    没有数据就是没有认证信息
        };
    },
    computed: {
        weixinobj() {
            return this.$store.state.weixinobj;
        }
        // userInfo(){
        //     return this.$store.state.userInfo;
        // }
    },
    methods: {
        //跳转代理费用
        AgencyCost(){
            this.$router.push('/AgencyCost')
        },
        //添加广告机
        addguanggaoji(){
            var this_1=this;
            var tishi="恭喜您已成为代理人，成功获得价值198元的广告机套餐，点击公众号内的“广告管理”使用，初始账号为您的手机号，密码为手机号后6位，请在广告机内点击“会员服务”修改密码（请勿在乐享生活中修改）。";
            var tishi1="恭喜您已成为代理人，成功获得价值198元的广告机套餐，已经叠加到您的广告机账户。";
            var obj={
                    'username':this.userInfo.nickname ? this.userInfo.nickname : '乐享生活',
                    'pwd':this.userInfo.phone.substring(this.userInfo.phone.length-6),
                    'repwd':this.userInfo.phone.substring(this.userInfo.phone.length-6),
                    'qq':'',
                    'anums':'365',                  //文章条数 增加的
                    'userid':this.userInfo.phone,        //手机号码
                    'beizhu1':'365',           //备注 到期天数  增加
                    'beizhu2':'乐享生活代理人注册',
                    'shuyu':'admin',     //您的上级ID
                    'adnums':20           //广告条数
                }
            this.$axios({
                method:'post',
                // http://www.lxad.vip/index.php
                url:'http://www.lxad.vip/api_register.php',
                data:this.$qs.stringify(obj)
            }).then(x=>{
                openloading(false)
                console.log(x);
                //x.data==1 表示 新增加 x.data==0表示已经有了修改了数据
                if(x.data==0 || x.data==1){
                    mui.alert(x.data==1 ? tishi : tishi1, "提示", function() {
                        this_1.$store.commit("setagentUser"); //更新代理人信息
                        this_1.$router.push("/Agent");
                    },"div");
                }else{
                    mui.alert('注册成功代理人,赠送广告机失败，请联系客服。', "提示", function() {
                        this_1.$store.commit("setagentUser"); //更新代理人信息
                        this_1.$router.push("/Agent");
                    },"div");
                }
                openloading(true)
            }).catch(error=>{
                openloading(false)
                mui.alert('注册成功代理人,赠送广告机失败，请联系客服。', "提示", function() {
                    this_1.$store.commit("setagentUser"); //更新代理人信息
                    this_1.$router.push("/Agent");
                },"div");
                console.log(error);
            })
        },
        //返回首页
        back() {
            this.$router.push("/my");
        },
        //跳转至认证
        renzheng() {
            if (this.userInfo.iaiState != 1) {
                this.$router.push("/RealName");
            } else {
                this.$router.push("/AlreadyRealName");
            }
        },
        //跳转成为合伙人的好处
        AgentAdvantage() {
            this.$router.push("/AgentAdvantage");
        },
        //跳转业务代理协议
        BusinessAgreement() {
            this.$router.push("/BusinessAgreement?name=名字");
        },
        //选择支付类型
        change_radio_1(x) {
            this.radio_type_1 = x;
        },
        change_radio_2() {
            this.radio_type_2 = !this.radio_type_2;
        },
        //选择区域
        change_city() {
            // console.log(this.cityPicker3)
            var this_1 = this;
            this.cityPicker3.show(function(items) {
                console.log(items);
                this_1.city = items;
                //return false;
            });
        },
        //查询有没有这个代理人
        selectOne() {
            if (this.city.length == 0) {
                mui.toast("请选择区域", { duration: 2000, type: "div" });
                return;
            }
            if (!this.radio_type_2) {
                mui.toast("请同意业务代理合作协议!", {duration: 2000, type:"div"});
                return;
            }
            this.$axios({
                method: "get",
                url: "/api-u/agentUser/selectOne?phone=" + this.referrerPhone
            }).then(x => {
                if(x.data.code==200 && x.data.data!= null && x.data.data!= "null"){
                    this.add();
                }else{
                    mui.toast("没有此推荐人。", { duration: 2000, type: "div" });
                }
            }).catch(error => {
                mui.toast("系统错误，请稍后再试。", { duration: 2000, type: "div" });
            });
        },
        //注册
        add() {
            // alert(this.weixinobj.openid)
            var this_1 = this;
            //先支付
            this.$axios({
                method: "post",
                // url: '/api-v/pay/getSandboxSignKey',
                url: "/api-u/users/weixinpay/order",
                data: this.$qs.stringify({
                    openid: this.weixinobj.openid
                })
            })
                .then(x => {
                    // this_1.registered();      //正式环境放在支付成功后面
                    console.log(x);
                    var data = x.data;
                    wx.chooseWXPay({
                        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paysign, // 支付签名
                        success: function(res) {
                            // 支付成功后的回调函数
                            console.log(res);
                            this_1.registered();
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //添加
        registered() {
            var this_1 = this;
            if (!this.referrerPhone) {
                mui.toast("请填写推荐人号码", { duration: 2000, type: "div" });
                return;
            }

            var areaCode = "";
            if (this.city[2].value) {
                areaCode = this.city[2].value;
            } else if (this.city[1].value) {
                areaCode = this.city[1].value;
            } else if (this.city[0].value) {
                areaCode = this.city[0].value;
            }
            var obj = {
                referrerPhone: this.referrerPhone, //推荐人电话号码
                areaCode: areaCode, //区域code
                realName: this.realName, //真实姓名
                userid: this.userInfo.username,
                phone: this.userInfo.phone
            };
            openloading(true)
            this.$axios({
                method: "post",
                url: "/api-u/agentUser/registered",
                // params:obj,
                // data:this.$qs.stringify(obj)
                data: obj
            }).then(x => {
                console.log(x);
                if (x.data.error) {
                    mui.toast(x.data.message, { duration: 2000, type: "div" });
                } else {
                    this_1.addguanggaoji()
                    // mui.alert( "申请成功", "提示", function() {
                    //     this_1.$store.commit("setagentUser"); //更新代理人信息
                    //     this_1.$router.push("/Agent");
                    // },"div");
                }
            }).catch(err => {
                console.log(err);
                mui.toast("系统错误请稍后再试！", {
                    duration: 2000,
                    type: "div"
                });
                 openloading(false)
            });
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
        if (localStorage.userInfo) {
            this.userInfo = JSON.parse(localStorage.userInfo);
        }

        //获取代理人信息
        this.$axios({
            method: "get",
            url: "/api-u/agentUser/me?userid=" + this.userInfo.username
        })
            .then(x => {
                console.log("获取用户代理人信息", x);
                if (x.data.code == 200) {
                    this.$router.push("/Agent");
                } else {
                    this.loading = false;
                }
            })
            .catch(error => {
                console.log("获取代理人信息失败");
                this.loading = false;
            });

        //获取认证信息
        this.$axios({
            method: "get",
            url:
                "/api-u/certification/findByUserid?userid=" +
                this.userInfo.username
        })
            .then(x => {
                console.log("获取认证信息", x);
                if (x.data != "") {
                    this.Authentication = x.data;
                    this.realName = x.data.name;
                }
            })
            .catch(error => {
                console.log("获取认证信息错误", error);
            });

        //获取区域
        this.$axios({
            method: "get",
            url: "/api-u/area/findAll",
            params: {
                start: 0,
                length: 30000
                // 'arealevel':1,
                // 'id':110000
            }
        })
            .then(x => {
                function convert(arr, id) {
                    // return 'sdfsad';
                    var res = [];
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].value = arr[i].id;
                        arr[i].text = arr[i].name;

                        if (arr[i].parentid == id) {
                            res.push(arr[i]);
                            // var func = eval(arguments.callee.name);
                            arr[i].children = convert(arr, arr[i].id);
                        }
                    }
                    return res;
                }
                var cityData3 = convert(x.data.data, null);
                this.cityPicker3 = new mui.PopPicker({
                    layer: 3
                });
                this.cityPicker3.setData(cityData3);

                console.log("递归后的数据", cityData3);
            })
            .catch(err => {
                // console.log(err)
                // mui.toast('登录失败',{duration:2000, type:'div'})
            });
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
            console.log(x);
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#ApplicationAgent {
    height: 100%;
    // .mui-content{
    //     height: 100%;
    // }
}

#ApplicationAgent .mui-bar {
    background: $header_background;

    a {
        color: #ffffff;
    }
}

#ApplicationAgent .mui-title {
    color: #ffffff;
}

#ApplicationAgent .table_1 {
    width: 100%;
    background: #ffffff;
    margin: 0.15rem 0px 0px;

    tr {
        border-bottom: 1px solid #ececec;
        height: 40px;

        > td:nth-child(1) {
            padding: 0px 20px 0px;
            width: 1px;
            white-space: nowrap;
            font-size: 14px;
        }

        > td:nth-child(2) {
            padding: 0px 20px 0px 0px;
        }
    }

    i {
        color: rgba(166, 166, 166, 1);
        font-size: 20px;
    }

    input {
        margin: 0px;
        padding: 0px;
        height: auto;
        border: none;
        font-size: 14px;
        opacity: 0.8;
    }

    .Authentication {
        font-size: 14px;
        color: rgba(58, 182, 237, 1);
    }
    .Authentication.active {
        color: #313131;
    }
    .region {
        max-width: 2.2rem;
        display: block;
        font-size: 14px;
        color: rgba(166, 166, 166, 1);
        white-space: nowrap;
        overflow: hidden;
        // text-orientation:
        text-overflow: ellipsis;
    }

    .Surplus {
        display: flex;
        align-items: center;

        span {
            font-size: 12px;
            color: rgba(166, 166, 166, 1);
        }
    }

    .money {
        line-height: 38px;
        > span:nth-child(1) {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
        > span:nth-child(2) {
            font-size: 14px;
            color: rgba(166, 166, 166, 1);
            margin: 0px 0px 0px 10px;
        }
        > span:nth-child(3) {
            i{
                font-size: 18px;
                color: rgba(24, 148, 220, 1)
            }
        }
        
    }
}

#ApplicationAgent .box_2 {
    height: 44px;
    background: #ffffff;
    color: rgba(80, 80, 80, 1);
	font-size: 12px;
    display: flex;
    align-items: center;
    padding: 0px 0px 0px 0.18rem;
    border-bottom: 1px solid #ececec;
    img{
        width: 22px;
        margin: 0px 5px 0px 0px;
    }
}

#ApplicationAgent .box_3 {
    display: flex;
    background: #ffffff;
    padding: 10px 20px;
    justify-content: space-between;
    span {
        font-size: 14px;
    }

    li {
        width: 50%;
        display: flex;
        align-items: center;
    }
    .haochu {
        text-align: right;
        color: #3ab6ed;
        font-size: 14px;
        width: auto;
    }
    .weixin {
        font-size: 26px;
        margin: 0px 0.1rem;
        color: $header_background;
    }

    .zhifubao {
        font-size: 26px;
        margin: 0px 0.1rem;
        color: rgba(58, 182, 237, 1);
    }
}

#ApplicationAgent .box_4 {
    display: flex;
    padding: 0px 20px;
    font-size: 14px;
    align-items: center;
    margin: 20px 0px;

    > span:nth-child(2) {
        margin: 0px 0px 0px 5px;
    }

    > span:nth-child(3) {
        color: rgba(58, 182, 237, 1);
    }
}

#ApplicationAgent .btn_1 {
    width: 200px;
    height: 30px;
    display: block;
    margin: 0px auto;
    border-radius: 30px;
    border: none;
    background: $header_background;
    color: #ffffff;
}

#ApplicationAgent .msg {
    display: flex;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 11;
    background: #ffffff;
    align-items: center;
    justify-content: center;
}

// 单选
#ApplicationAgent .radio_1 {
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 16px;
    border-radius: 100%;
    border: 2px solid #cccccc;
    overflow: hidden;
    i {
        font-size: 8px;
        display: none;
    }
}

#ApplicationAgent .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;

    i {
        display: inline-block;
    }
}
</style>
