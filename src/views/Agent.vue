<template>
    <div id="Agent">
        <header class="mui-bar mui-bar-nav">
            <a @tap="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">代理人</h1>
            <span v-if="isareaManager" @tap="RegionalAgent()" class="quyu">区域管理</span>
            <span v-if="!isareaManager" @tap="RegionalAgencyAgreement()" class="quyu">区域代理</span>
        </header>

        <div class="mui-content" @scroll="content_scroll($event)">
            <div class="box_1">
                <div class="img_box">
                    <img v-if="!userInfo.headImgUrl" src="@/assets/image/lxlogo_180.png" alt="" srcset="">
                    <img v-if="userInfo.headImgUrl" :src="userInfo.headImgUrl" alt="" srcset="">
                </div>
                <div class="text">
                    <div>
                        <span>{{agentUser.realName}}</span>
                        <span @tap="erweima()"><i class="icon iconfont icon-31erweima"></i></span>                        
                    </div>
                    <div>
                        {{areaList[0] ? areaList[0].name : ''}}{{areaList[1] ? '/'+areaList[1].name : ''}}{{areaList[2] ? '/'+areaList[2].name : ''}}
                    </div>
                </div>
                <div class="market" @click="go('/AgentDistribution')">
                    <div>
                        <i class="icon iconfont icon-fenxiaoguanli1"></i>
                    </div>
                    <span>分销管理</span>
                </div>
                <div @click="go('/market')" class="market">
                    <div>
                        <i class="icon iconfont icon-fod-business"></i>
                    </div>
                    <span>业务市场</span>
                </div>
            </div>

            <ul class="box_2">
                <li :class="{'active':type_1==1}" @click="change_type(1)">
                    <div class="img_box">
                        <i class="icon iconfont icon-tuandui"></i>
                    </div>
                    <div class="title">团队补贴</div>
                    <div class="money">{{agentUser.subsidiesall ? agentUser.subsidiesall : 0}}</div>
                </li>
                <li :class="{'active':type_1==2}" @click="change_type(2)">
                    <div class="img_box">
                        <i class="icon iconfont icon-kejiziyuanshujufuwupingtai"></i>
                    </div>
                    <div class="title">平台分佣</div>
                    <div class="money">0</div>
                </li>
                <li :class="{'active':type_1==3}" @click="change_type(3)">
                    <div class="img_box">
                        <i class="icon iconfont icon-jinrudianpu"></i>
                    </div>
                    <div class="title">店铺分佣</div>
                    <div class="money">0</div>
                </li>
                <li :class="{'active':type_1==4}" @click="change_type(4)">
                    <div class="img_box">
                        <i class="icon iconfont icon-fenrun"></i>
                    </div>
                    <div class="title">店铺分润</div>
                    <div class="money">0</div>
                </li>
                <li :class="{'active':type_1==5}" @click="change_type(5)">
                    <div class="img_box">
                        <i class="icon iconfont icon-ketixianjine"></i>
                    </div>
                    <div class="title">可提现</div>
                    <div class="money">{{agentUser.sutotal ? agentUser.sutotal : 0}}</div>
                </li>
            </ul>

            <div class="content" ref="content">
                <!-- 补贴 -->
                <div class="box_3" v-show="type_1==1">
                    <ul class="title" :class="{'active':fixed}">
                        <li>姓名</li>
                        <li>日期</li>
                        <li>直补</li>
                        <li>+直补</li>
                        <li>间补</li>
                        <li>+间补</li>
                    </ul>
                    <ul class="list">
                        <li v-for="(x, index) in butie.list" :key="index">
                            <div>{{x.realName}}</div>
                            <div>{{x.updateTime | datatime('yyyy-MM-dd')}}</div>
                            <div>{{x.dtSubsidies}}</div>
                            <div>{{x.dtSubsidiesPlus}}</div>
                            <div>{{x.itSubsidies}}</div>
                            <div>{{x.itSubsidiesPlus}}</div>
                        </li>
                        <loading :loadingtype="butie.loading" :nodata="!butie.loading && butie.total==0" :end="!butie.loading && butie.list.length==butie.total && butie.total!=0"/>
                    </ul>

                    <ul class="footer">
                        <li>直推：{{agentUser.directly}}人</li>
                        <li>间推：{{agentUser.indirect}}人</li>
                        <li>直补：{{agentUser.result1 ? agentUser.result1 : 0}}元</li>
                        <li>间补：{{agentUser.result2 ? agentUser.result2 : 0}}元</li>
                    </ul>
                </div>

                <div class="box_4" v-show="type_1==2">
                    <!-- <ul class="title">
                        <li>客户</li>
                        <li>订单</li>
                        <li>时间</li>
                        <li>佣金/元</li>
                    </ul>
                    <ul class="list">
                        <li v-for="x in list_1">
                            <div>
                                <div>李四</div>
                            </div>
                            <div>
                                <div>订单名</div>
                            </div>
                            <div>
                                <div>2018.11.28</div>
                                <div>18:.23.25</div>
                            </div>
                            <div>
                                <div>199</div> 
                            </div>
                        </li>
                    </ul>
                    <ul class="footer">
                        <li>客户：50人</li>
                        <li>订单数：50个</li>
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
                        <li>客户</li>
                        <li>店铺</li>
                        <li>订单</li>
                        <li>时间</li>
                        <li>佣金/元</li>
                    </ul>
                    <ul class="list">
                        <li v-for="x in  list_1">
                            <div>
                                <div>
                                王五
                                </div>
                            </div>
                            <div>
                                <div>....</div>
                            </div>
                            <div>
                                <div>乐享广告机</div>
                            </div>
                            <div>
                                <div>2018.11.28</div>
                                <div>18.20.20</div>
                            </div>
                            <div>
                                <div>50</div>
                            </div>
                        </li>
                    </ul>
                    <ul class="footer">
                        <li>会员：50人</li>
                        <li>总LB：50个</li>
                        <li>总分润：4900元</li>
                    </ul> -->
                    <div class="kaifazhong">
                        <div class="imb_box">
                            <img src="image/kaifazhong.png" alt="">
                        </div>
                        <div class="text">该功能正在研发中</div>
                    </div>
                </div>

                <div class="店铺分润" v-show="type_1==4">
                    <ShopBonus :fixed="fixed"/>
                </div>

                <!-- 支付 -->
                <div class="box_6" v-show="type_1==5">
                    <ul class="list">
                        <li>
                            <div>团队补贴</div>
                            <div>{{agentUser.sutotal}}</div>
                        </li>
                        <li>
                            <div>平台分佣</div>
                            <div>0</div>
                        </li>
                        <li>
                            <div>店铺分佣</div>
                            <div>0</div>
                        </li>
                        <li>
                            <div>店铺分润</div>
                            <div>0</div>
                        </li>
                        <!-- <li>
                            <div>补贴：{{agentUser.sutotal}}</div>
                            <div>累计：{{agentUser.subsidiesall}}</div>
                        </li>-->
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
                                <input readonly type="text" v-model="amount" @input="amount_change()" />
                            </span>
                            <span>费率：4%</span>
                        </li>
                    </ul>
                    <div class="Agreement">
                        <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <span @click="change_radio_2()">我也阅读并同意</span>
                        <span @click="WithdrawalAgreement()">《提现服务协议》</span>
                        
                        <span>
                            <span @click="go('/EmbodyRecord?type=0')">
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

            <div class="QRCode" v-show="qrcode_show" @tap="qrcode_show=false">
                <div class="mask"></div>
                <div class="content_1">
                    
                    <div class="close_1">
                        <div @click="close_1()"><i class="icon iconfont icon-quxiao"></i></div>
                        <div></div>
                    </div>
                    <img :src="qrcode" alt="" srcset="">
                </div>
            </div>

        </div>

        <!-- 生成带图片的容器 -->
        <div ref="printMe" class="qrcode_box">
            <div class="header_1">
                <div class="img_box">
                    <img v-if="erweima_base64" :src="erweima_base64" alt="" srcset="">
                    <img v-if="!erweima_base64" src="image/WechatIMG311.png" alt="">
                </div>
                <div class="text_1">
                    <div>{{agentUser.realName}}</div>
                    <div> <i class="icon iconfont icon-shouji"></i>{{agentUser.phone}}</div>
                </div>
            </div>
            <div class="erweima">
                <!-- <img :src="myshop.signboard" alt="" srcset=""> -->
                <img v-if="erweima_base64" :src="erweima_base64" alt="">
                <img v-if="!erweima_base64" src="image/WechatIMG311.png" alt="">
                <div ref="qrcode">
                    <!-- <img src="" alt="" srcset=""> -->
                </div>
            </div>
            <ul class="footer_1">
                <li>识别二维码领取20元新人红包！</li>
                <li></li>
            </ul>
        </div>

    </div>
</template>

<script>

import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import loading from "@/components/loading.vue";
import { dateFtt, openloading } from "@/assets/js/currency";
import { mapActions, mapGetters } from 'vuex';

// 店铺分润
// import ShopBonus from '@/components/agent/ShopBonus.vue'
const ShopBonus = resolve => { require.ensure([], () => { resolve(require("@/components/agent/ShopBonus.vue")); }); }; //关于我们


export default {
    name: "Agent",
    components: {
        loading,
        ShopBonus
    },
    data() {
        return {
            fixed:false,    //判断是否定位到顶部
            type_1: 5,
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
            amount: 0, //提现金额
            isareaManager: false,
            CanBePresented: true, //可以提现
            input_name_box: false,
            name: "",
            //====================
            qrcode:null,
            qrcode_show:false,
            erweima_base64:'',
        };
    },
    filters: {
        datatime(time, type) {
            return dateFtt(time, type);
        }
    },
    computed: {
        ...mapGetters({
            fenrun_shangjia:'agent/ShopBonus/get_list1',
            fenrun_huiyuan: 'agent/ShopBonus/get_list2',
            fenrun_type:'agent/ShopBonus/get_type',
        })
        
    },
    methods: {
        ...mapActions({
            ShopBonus_init:'agent/ShopBonus/ShopBonus_init',
            get_fenrui:'agent/ShopBonus/get_list',
            fenrun_fenye:'agent/ShopBonus/xiayiye'
        }),
        //提现服务协议
        WithdrawalAgreement(){
            this.$router.push('/WithdrawalAgreement');
        },
        //生成二维码
        shengchengerweima(){
            var url=window.location.origin+window.location.pathname+'#/BeInvited?pid='+this.userInfo.username+'&invitationtype=1';
            var el=this.$refs.qrcode
                el.innerHTML='';
            let qrcode = new QRCode(el, {  
                width: 200,  
                height: 200,    // 高度
                text: url,      // 二维码内容  
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                background: '#fff',
                foreground: '#fff',
            })
            setTimeout(()=>{
                this.print();
            },500)
        },
        //生产二维码
        erweima(){
            console.log('生成二维码');
            if(this.qrcode){
                this.qrcode_show=true;
            }else{
                openloading(true);
                //图片地址转图片
                if(!this.userInfo.headImgUrl){
                    console.log(1)
                    this.shengchengerweima()
                }else{
                    this.$axios.post('/api-u/users/imgtobase64',this.$qs.stringify({url:this.userInfo.headImgUrl})).then(x=>{
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
        //申请区域代理
        RegionalAgencyAgreement(){
            this.$router.push('/RegionalAgencyAgreement');
        },
        //返回我的页面
        back() {
            this.$router.push("/my");
        },
        //输入金额
        amount_change() {
            if (!this.agentUser.sutotal) {
                this.amount = 0;
            } else if (this.amount > this.agentUser.sutotal) {
                this.amount = this.agentUser.sutotal;
            }
        },
        //忘记密码
        PaymentPassword() {
            this.$router.push("/PaymentPassword");
        },
        //关闭输入名字
        clese_1() {
            this.input_name_box = false;
        },
        //再次提交
        Submission() {
            this.Put_forward();
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
                payPassword: this.accout_password,
                id: this.userInfo.id,
                name: this.name
            };
            this.payment = false;
            this.CanBePresented = false;
            this.input_name_box = false;
            openloading(true);
            this.$axios({
                method: "get",
                url: "/api-u/users/alipay",
                // data: this.$qs.stringify(obj),
                // data:obj,
                params: obj
            })
                .then(x => {
                    console.log(x);
                    if (x.data.code == 200) {
                        this.getagentUser();
                        mui.alert(x.data.msg, "提示", "好的", function() {}, "div");
                    } else if ( x.data.code == "PAYEE_USER_INFO_ERROR" || x.data.code == "PAYEE_ACC_OCUPIED" ) {
                        // mui.toast(x.data.msg, { duration: 2000, type: "div" });
                        mui.alert(x.data.msg, "提示",'我知道了', function() {},"div");
                        this.input_name_box = true;
                    } else if (x.data.code) {
                        // mui.toast(x.data.message, {duration: 2000,type: "div"});
                        mui.alert(x.data.message, "提示",'我知道了', function() {},"div");
                    } else {
                        // mui.toast("系统错误，请稍后再试。", {duration: 2000,type: "div"});
                        mui.alert(x.data.msg, "提示",'我知道了', function() {},"div");
                    }
                    openloading(false);
                    this.CanBePresented = true;
                })
                .catch(error => {
                    console.log(error);
                    mui.toast("系统错误，请稍后再试。", {
                        duration: 2000,
                        type: "div"
                    });
                    openloading(false);
                    this.CanBePresented = true;
                    this.input_name_box = false;
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
            this.$router.push(
                "/BusinessAgreement?name=" + this.agentUser.realName
            );
        },
        content_scroll(e){
            // console.log(e.target.scrollTop,this.$refs.content.offsetTop);
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if(this.type_1==1){
                this.fixed=(e.target.scrollTop+44)>=this.$refs.content.offsetTop
                if (h + t >= sh - 10 && !this.butie.loading && this.butie.list.length < this.butie.total ) {
                    console.log("到底底部");
                    this.butie.page_index++;
                    //查看下级带来的收益
                    this.subsidies();
                }
            }else if(this.type_1==2){
                this.fixed=e.target.scrollTop>=this.$refs.content.offsetTop
            }else if(this.type_1==3){
                this.fixed=e.target.scrollTop>=this.$refs.content.offsetTop
            }else if(this.type_1==4){
                this.fixed=e.target.scrollTop>=this.$refs.content.offsetTop;
                this.fenrun_fenye(this.fenrun_type)
            }else if(this.type_1==5){
                this.fixed=e.target.scrollTop>=this.$refs.content.offsetTop
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
            if (x) {
                if(!this.radio_type_2){
                    mui.toast("请先同意协议。", { duration: 2000, type: "div" });
                    return;
                }else if (!this.Account_obj.account) {
                    mui.toast("请设置收款账号", {duration: 2000,type: "div"});
                    return;
                } else if (this.amount == 0 && x) {
                    mui.toast("无提现金额", { duration: 2000, type: "div" });
                    return;
                } else if (this.amount % 1 != 0 && x) {
                    mui.toast("请输入整数！", { duration: 2000, type: "div" });
                    return;
                } else if (!this.CanBePresented) {
                    mui.toast("提现处理中，请稍等。", { duration: 2000, type: "div"});
                    return;
                }
                this.payment = x;
                this.accout_password = "";
                this.name = "";
                setTimeout(function() {
                    document.getElementById("accout_password").focus();
                }, 500);
            } else {
                this.payment = x;
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
                url: "/api-u/agentUser/me?userid=" + this.userInfo.username
            }).then(x => {
                if (x.data.code != 200) {
                    // this.agentUser = false;
                    this.$router.push("/ApplicationAgent");
                } else {
                    this.agentUser = x.data.data;
                    this.amount = x.data.data.sutotal ? x.data.data.sutotal : 0;
                    this.areaList = this.$store.getters.filter_area(x.data.data.areaCode);
                }
            }).catch(error => {
                this.agentUser = false;
                this.$router.push("/ApplicationAgent");
            });
        },
        //查看下级带来的收益
        subsidies() {
            this.butie.loading = true;
            this.$axios({
                method: "get",
                url:"/api-u/agentUser/subsidies/forme?referrerPhone=" + this.userInfo.phone + "&start=" + this.butie.page_index * this.butie.page_size + "&length=" + this.butie.page_size
            }).then(x => {
                if (x.data.code == 200) {
                    this.butie.list = this.butie.list.concat(x.data.data.data);
                    this.butie.total = x.data.data.total;
                    this.butie.loading = false;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        //获取支付宝账号
        findAccount() {
            this.$axios.get("/api-u/users/findAccount?userid="+this.userInfo.username).then(x=>{
                if (x.data.data != null) {
                    this.Account_obj = x.data.data;
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //获取代理人信息
        areaManager() {
            this.$axios.get("/api-u/areaManager/findme?userid=" + this.userInfo.username).then(x=>{
                if (x.data.data != "" && x.data.data != null && x.data.data != "null") {
                    this.isareaManager = true;
                } else {
                    this.isareaManager = false;
                }
            }).catch(err=>{
                console.log("获取代理商信息错误", err);
            })
        }
    },
    mounted: function() {
        try {
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (error) {}
        
        //获取代理人信息
        this.getagentUser();
        //查看下级带来的收益
        this.subsidies();
        //查询支付宝账号
        this.findAccount();
        //获取代理商信息
        this.areaManager();
        // console.group('------mounted 挂载结束状态------');

        this.ShopBonus_init();
        //获取店铺分润 商家
        this.get_fenrui(this.fenrun_shangjia)
        //获取店铺分润 会员
        this.get_fenrui(this.fenrun_huiyuan)
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
    position: relative;
    z-index: 1;
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
        flex-grow: 1;
        > div:nth-child(1) {
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
            font-weight: bold;
            margin: 3px 0px;
            span{
                margin: 0px 5px 0px 0px;
            }
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
        flex-shrink: 0;
        text-align: center;
        // color: rgba(42, 130, 228, 1);
        // font-size: 14px;
        white-space: nowrap;
        flex-shrink: 0;
        margin: 0px 3px;
        span {
            font-size: 0.1rem;
            color: #808080;
        }
        i {
            color: #1894dc;
            font-size: 0.24rem;
        }
    }
}
#Agent .box_2 {
    flex-shrink: 0;
    display: flex;
    margin: 0.05rem 0px 0px;
    > li:nth-child(1) {
        border: none;
    }
    li.active::after {
        // background: #efeff4;
        position: absolute;
        width: 60%;
        height: 2px;
        left: 20%;
        bottom: 0px;
        content: "";
        background: $header_background;
    }
    li {
        width: 25%;
        padding: 0.1rem 0px 0.08rem;
        background: #ffffff;
        text-align: center;
        border-left: 1px solid #efeff4;
        position: relative;
        .img_box {
            width: 0.37rem;
            height: 0.37rem;
            margin: 0px auto 3px;
            background: $header_background;
            border-radius: 100%;
            color: #ffffff;
            line-height: 0.35rem;
            font-size: 20px;
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
    // flex-grow: 1;
    // display: flex;
    // flex-direction: column;
}

#Agent .box_3 {
    flex-grow: 1;
    // display: flex;
    // flex-direction: column;
    margin: 5px 0px 0px;
    padding: 0px 0px 44px;
    .title.active{
        position: fixed;
        width: 100%;
        left: 0px;
        top: 44px;
    }
    .title {
        display: flex;
        flex-shrink: 0;
        height: 30px;
        background: $header_background;
        align-items: center;
        font-weight: bold;
        color: #ffffff;
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
        position: fixed;
        width: 100%;
        left: 0px;
        bottom: 0px;
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
            background: $header_background;
            color: #ffffff;
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
                min-height: 30px;
                // line-height: 30px;
                border-left: 1px solid rgba(198, 198, 198, 1);
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                padding: 3px 0px;
                > div {
                    width: 100%;
                }
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
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    font-size: 12px;
    margin: 5px 0px 0px 0px;
    .title {
        flex-shrink: 0;
        display: flex;
        background: $header_background;
        color: #ffffff;
        > li:nth-child(1) {
            border: none;
        }
        li {
            width: 20%;
            height: 30px;
            line-height: 30px;
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
            > div:nth-child(2) {
                color: #1894dc;
            }
            > div:nth-child(3) {
                color: #1894dc;
            }
            > div {
                width: 20%;
                min-height: 30px;
                border-left: 1px solid rgba(198, 198, 198, 1);
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                padding: 3px 0px;
                > div {
                    width: 100%;
                }
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
    .list{
        background: #ffffff;
        padding: 8px 0px;
        display: flex;
        color: rgba(56, 56, 56, 1);
    	font-size: 12px;
        text-align: center;
        li{
            position: relative;
            width: 25%;
            div:nth-child(1){
                margin: 0px 0px 10px;
            }
        }
        li::after{
            position: absolute;
            width: 1px;
        	height: 33px;
            background-color: rgba(229, 229, 229, 1);
            content: "";
            top: 0px;
            left: 0px;
            bottom: 0px;
            margin: auto;
        }
        li:nth-child(1)::after{
            display: none;
        }
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
        padding: 5px 10px 5px 20px;
        background: #ffffff;
        color: rgba(80, 80, 80, 1);
        display: flex;
        align-items: center;
        > li:nth-child(1) {
            font-size: 12px;
            white-space: nowrap;
            flex-shrink: 0;
        }
        > li:nth-child(2) {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > span:nth-child(1) {
                font-size: 27px;
                line-height: initial;
                display: flex;
                input {
                    padding: 0px;
                    margin: 0px;
                    border: none;
                    font-size: 27px;
                    // border-bottom: 1px solid #cccccc;
                }
            }
            > span:nth-child(2) {
                font-size: 12px;
                padding: 0px 0px 0px 10px;
                border-left: 1px solid #505050;
                height: 14px;
                line-height: 14px;
                white-space: nowrap;
                color: #505050;
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

#Agent .input_name.active {
    display: flex;
}
#Agent .input_name {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    ul {
        background: #ffffff;
        position: relative;
        z-index: 1;
        width: 2.98rem;
        > li:nth-child(1) {
            padding: 0.13rem;
            color: rgba(80, 80, 80, 1);
            font-size: 0.12rem;
            text-align: center;
        }
        > li:nth-child(2) {
            padding: 0px 0.3rem;
            height: 0.36rem;
            input {
                text-align: center;
                background: rgba(166, 166, 166, 1);
                margin: 0px;
                padding: 0px;
                height: 100%;
                font-size: 0.14rem;
            }
        }
        > li:nth-child(3) {
            padding: 0.15rem;
            text-align: center;
            button {
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

#Agent .kaifazhong {
    margin: 0.8rem auto 0px;
    .imb_box {
        width: 0.8rem;
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


// 单选
#Agent .radio_1 {
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
#Agent .radio_1.active {
    background: rgba(58, 182, 237, 1);
    border: 2px solid rgba(58, 182, 237, 1);
    color: #ffffff;
    i {
        display: inline-block;
        
    }
}
</style>

<style lang="scss">
#Agent .qrcode_box{
    width: 273px;
    background:#ffffff;
    position: fixed;
    padding: 20px 25px;
    left: -100%;
    // top:50px;
    .header_1{
        display: flex;
        .img_box{
            width: 42px;
            height: 42px;
            margin:0px 10px 0px 0px;
            flex-shrink: 0;
            img{
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .text_1{
            width: 0;
            flex-grow: 1;
            color: rgba(80, 80, 80, 1);
            line-height: 20px;
            >div:nth-child(1){
                font-size: 14px;
            }
            >div:nth-child(2){
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .erweima{
        margin: 20px auto 8px;
        width: 200px;
        height: 200px;
        position: relative;
        >img{
            position: absolute;
            width: 50px;
            height: 50px;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            margin: auto;
            border-radius: 10px;
        }
        >div{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .footer_1{
        color: rgba(80, 80, 80, 1);
    	font-size: 12px;
        text-align: center;
    }
}


</style>

