<template>
    <div id="ApplicationShop">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">店铺详情</h1>
        </header>

        <div class="mui-content mui-fullscreen">
            <div class="box_5" v-if="update_obj">
                <span class="mui-pull-right shenhe" v-if="update_obj.state==0">审核中</span>
                <span @tap="see_cause()" class="mui-pull-right weitongguo" v-if="update_obj.state==2">未通过，查看原因</span>
                <span class="mui-pull-right tongguo" v-if="update_obj.state==1">已通过</span>
                <span>上次修改时间：{{update_obj.updateTime | filter_time}}</span>
            </div>

            <ul class="mui-table-view box_1">
                <li class="mui-table-view-cell" @click="select_shop_type()">
                    <a class="mui-navigate-right">
                        <span>
                            店铺分类：
                        </span>
                        {{shop_fenlei[0] ? shop_fenlei[0].name : ''}}
                        {{shop_fenlei[1] ? shop_fenlei[1].name : ''}}
                        {{shop_fenlei[2] ? shop_fenlei[2].name : ''}}
                    </a>
                </li>
            </ul>
            <ul class="mui-table-view box_1">
                <li class="mui-table-view-cell input_box">
                    <span>店铺名称：</span>
                    <input type="text" v-model="shop_obj.name">
                </li>
                <li class="mui-table-view-cell input_box">
                    <span>联系电话：</span>
                    <input type="text" v-model="shop_obj.phone">
                </li>
                <li class="mui-table-view-cell" @click="select_region()">
                    <a class="mui-navigate-right">
                        <span>店铺区域：</span>
                        {{city[0] ? city[0].name : ''}} {{city[1] ? '/'+city[1].name : ''}} {{city[2] ? '/'+city[2].name : ''}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="baiduMap('/baiduMap')">
                    <a class="mui-navigate-right">
                        <span>店铺地址：</span>
                        {{address}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="select_time()">
                    <a class="mui-navigate-right">
                        <span>营业时间：</span>
                        {{creationTime}}{{endTime ? '-'+endTime : ''}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="LegalPersonCertification()">
                    <a class="mui-navigate-right">
                        <span>法人认证：</span>
                        {{this.$store.state.apply_for_a_shop.iaiName}}
                    </a>
                </li>
                <li class="mui-table-view-cell" @click="BusinessLicense()">
                    <a class="mui-navigate-right">
                        <span>营业执照：</span>
                        <span v-if="shopType==1">个体经营</span>
                        <span v-if="shopType==2">公司经营</span>
                    </a>
                </li>
            </ul>

            <ul class="box_2">
                <li>
                    <div>商家店招：</div>
                    <div>(640*480)</div>
                </li>
                <li>
                    <div @click="Choice_img(1)" v-if="!shop_obj.signboard" class="tishi">点击选择图片</div>
                    <span v-if="shop_obj.signboard" @click="delete_signboard()">
                        <i class="icon iconfont icon-del"></i>
                    </span>
                    <img @click="Choice_img(1)" v-if="shop_obj.signboard" :src="shop_obj.signboard" alt="">
                </li>
            </ul>

            <ul class="box_3">
                <li class="title_1">
                    <span>环境图片：(640*480)</span>
                    <span class="mui-pull-right">最多12张，已有{{img_list.length}}张</span>
                </li>
                <li class="lunbo">
                    <div class="left_1" @click="slideNext()">
                        <i v-show="left" class="mui-icon mui-icon-back"></i>
                    </div>
                    <div class="img_list">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <!-- <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                                    <img :src="x" alt="" >
                                </div> -->
                                <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                                    <img :src="x" alt="">
                                    <span class="delete_1" :inde="index"><i class="icon iconfont icon-del"></i></span>
                                </div>

                            </div>
                            <!-- Add Pagination -->
                            <!-- <div class="swiper-pagination"></div> -->
                        </div>
                    </div>
                    <div class="right_1" @click="Choice_img(2)">
                        <span>
                            <i class="mui-icon mui-icon-plusempty"></i>
                        </span>
                    </div>
                </li>
            </ul>

            <ul class="box_4">
                <li class="title_1">
                    <span>店铺服务：</span>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr v-if="serviceType_list.length!=0" v-for="(item, index) in Math.ceil(serviceType_list.length/3)" :key="index">
                                <td v-if="index_1<3*index+3 && index_1>=3*index" v-for="(item_1, index_1) in serviceType_list" :key="index_1">
                                    <span>{{item_1.name}}</span>
                                    <div @click="radio(item_1)" class="radio_1" :class="{'active':item_1.active}">
                                        <i class="icon iconfont icon-xuanze"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <div class="Agreement">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_Agreement}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <span @click="change_radio_2()"> 我已阅读并同意</span>
                <span @click="RegistrationAgreement()">《商家服务协议》</span>
            </div>

            <button @click="add()" class="btn_1">保存</button>
            <!-- <button @click="weixinmaptest()">跳转微信地图测试</button>
            <button @click="add()">申请通过后的店铺</button> -->
        </div>

        <div class="Cropper_box" v-show="Cropper_show">
            <div class="cont_1">
                <VueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :fixedBox="option.fixedBox" :canMoveBox="option.canMoveBox" :autoCrop="true" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"></VueCropper>
            </div>
            <ul class="footer_1">
                <li @click="close_1()">
                    <i class="icon iconfont icon-quxiao"></i>
                </li>
                <li @click="rotateLeft()">
                    <i class="icon iconfont icon-xuanzhuan1"></i>
                </li>
                <li @click="rotateRight()">
                    <i class="icon iconfont icon-xuanzhuan"></i>
                </li>
                <li @click="confirm()">
                    <i class="icon iconfont icon-xuanze"></i>
                </li>
            </ul>
        </div>

        <div id="zhengmianInput" class="mui-hidden">
            <input type="file" @change="input_change($event)" accept="image/*" name="" id="">
        </div>

        <div class="shenhezhong" v-if="myshop && myshop.state==0">
            <i class="icon iconfont icon-tupian1"></i>
            <div>您已提交资料，正在审核中，请耐心等待</div>
        </div>

        <div class="jujue" v-if="myshop && myshop.state==2 && getType==0">
            <i class="icon iconfont icon-weitongguo"></i>
            <div class="text_box" v-html="myshop.cause"></div>
            <button @click="chongxingtijiao()">重新提交</button>
        </div>

    </div>
</template>

<script>
import { openloading, bd_decrypt, get_url, dateFtt } from "@/assets/js/currency";
import { VueCropper } from "vue-cropper";
import $ from "jquery";
import { mapGetters ,mapActions } from "vuex";
export default {
    name: "",
    components: {
        VueCropper
    },
    data() {
        return {
            //裁剪框配置
            userInfo: "",
            Cropper_show: false, //显示裁剪框
            option: {
                img: "",
                size: 1,
                full: false,
                outputType: "png",
                canMove: true,
                fixedBox: true, //裁剪框固定大小不动 true 固定
                original: false,
                canMoveBox: false,
                autoCrop: true, //一开始就裁剪
                outputType: "png", //png,jpeg,webp
                autoCropWidth: 300,
                autoCropHeight: 225
            },
            // ========================
            cropper_type: 1, //裁剪类型 1，表示LOGO 2,环境图片
            img_list: [], //轮播图片
            swiper: "", //轮播组件
            left: false, //向左箭头
            radio_obj: {
                WIFI: true,
                parking: false
            },
            radio_Agreement: true,
            type_list: [],
            shop_type: [], //店铺类型
            Picker3: "", //3级联动

            picker_time: "",
            shopname: "",

            cityList: [], //城市列表
            city: [], //所选择的的城市
            shop_fenlei: [],
            serviceType_list: [], //服务列表

            shop_obj: {
                //添加店铺对象
                userid: "", //用户Id
                name: "", //店铺名
                shopType: "", //店铺类型
                phone: "", //联系电话
                areaCode: "", //区域code
                address: "", //地址
                x: "", //经度
                y: "", //纬度
                businessNature: "", //1个体 2实体
                businessLicense: "", //营业执照 base64
                blnumber: "", //营业执照号
                signboard: "", //商家店招
                // environmentalImg:[],    //环境图片
                arrEnvironmentalImg: [], //环境图片
                // serviceType:[],         //服务种类，环境
                arrServiceType: [], //服务种类，环境
                referrerPhone: "", //推荐人（代理人手机号码） 可不传
                openTime: "", //开门时间
                closeTime: "", //关门时间
                //认证信息
                sex: "", //性别
                nation: "", //民族
                birthday: "", //出生日期
                iaiAddress: "", //住址
                idNumber: "", //证件号码
                issueArea: "", //签证机关
                frontImg: "", //正面
                reverseImg: "", //背面
                validity: "", //有效期
                iaiName: "" //认证名
            },
            getType: 0, //0表示什么都没做 1表示点击了重新提交
            in_index: 0,
            isUpdata: false, //是否可以修改
            update_obj: "" //修改的数据
        };
    },
    filters: {
        filter_time(time) {
            // return yyyy.MM.dd hh:mm;
            return dateFtt(time, "yyyy.MM.dd hh:mm:ss");
        }
    },
    computed: {
        ...mapGetters({
            myshop:'get_myshop'
        }),
        address() {
            //开店地址
            return this.$store.state.geographical_position.address;
        },
        longitude() {
            //经度
            return this.$store.state.geographical_position.longitude;
        },
        latitude() {
            //纬度
            return this.$store.state.geographical_position.latitude;
        },
        shops_tree_list() {
            //店铺类型数组
            return this.$store.state.shops_tree_list;
        },
        creationTime() {
            //开门时间
            return this.$store.state.apply_for_a_shop.creationTime;
        },
        endTime() {
            //关门时间
            return this.$store.state.apply_for_a_shop.endTime;
        },
        shopType() {
            //申请店铺类型 个体实体
            return this.$store.state.apply_for_a_shop.shopType;
        },
        businessLicense() {
            //营业执照图片
            return this.$store.state.apply_for_a_shop.businessLicense;
        },
        
    },
    methods: {
        ...mapActions({
            获取店铺:'getMyshop'
        }),
        //查看未通过原因
        see_cause() {
            mui.alert(this.update_obj.cause, "驳回理由", "我知道了", () => { }, "div");
        },
        //点击重新提交 重新绑定数据
        chongxingtijiao() {
            var this_1 = this;
            var myshop = this.myshop;
            var shop_obj = {};
            for (var key in myshop) {
                shop_obj[key] = myshop[key];
            }
            this.shop_obj = shop_obj;
            if (this.shops_tree_list.length > 0) {
                this.shop_fenlei = get_url(this.shops_tree_list, this.myshop.shopType);
            }

            this.city = get_url(this.cityList, this.myshop.areaCode); ///"652929"
            this.$store.state.geographical_position.address = this.myshop.address;

            this.$store.state.geographical_position.longitude = this.myshop.x;
            this.$store.state.geographical_position.latitude = this.myshop.y;

            this.$store.state.apply_for_a_shop.creationTime = this.myshop.openTime;
            this.$store.state.apply_for_a_shop.endTime = this.myshop.closeTime;

            this.$store.state.apply_for_a_shop.sex = this.myshop.sex;
            this.$store.state.apply_for_a_shop.nation = this.myshop.nation;
            this.$store.state.apply_for_a_shop.birthday = this.myshop.birthday;
            this.$store.state.apply_for_a_shop.iaiAddress = this.myshop.iaiAddress;
            this.$store.state.apply_for_a_shop.idNumber = this.myshop.idNumber;
            //法人认证
            this.$store.state.apply_for_a_shop.idNumber = this.myshop.idNumber;
            this.$store.state.apply_for_a_shop.issueArea = this.myshop.issueArea;
            this.$store.state.apply_for_a_shop.frontImg = this.myshop.frontImg;
            this.$store.state.apply_for_a_shop.reverseImg = this.myshop.reverseImg;
            this.$store.state.apply_for_a_shop.validity = this.myshop.validity;
            this.$store.state.apply_for_a_shop.iaiName = this.myshop.iaiName;
            //执照
            this.$store.state.apply_for_a_shop.businessLicense = this.myshop.businessLicense;
            this.$store.state.apply_for_a_shop.shopType = this.myshop.businessNature;
            this.$store.state.apply_for_a_shop.blnumber = this.myshop.blnumber;
            this.img_list = this.myshop.environmentalImg
                ? this.myshop.environmentalImg.split(",")
                : [];

            if (this.serviceType_list > 0) {
                var serviceType = this.myshop.serviceType
                    ? this.myshop.serviceType.split(",")
                    : [];
                var serviceType_list = this.serviceType_list;
                for (var i = 0; i < serviceType_list.length; i++) {
                    this_1.$set(serviceType_list[i], "active", false);
                    for (var j = 0; j < serviceType.length; j++) {
                        if (serviceType_list[i].id == serviceType[j]) {
                            // serviceType_list[i].
                            this_1.$set(serviceType_list[i], "active", true);
                        }
                    }
                }
            }

            // this.address=this.myshop.address
            // this.shop_fenlei=this.myshop.shopType;
            console.log("我的店铺", this.myshop);

            this.getType = 1;
        },
        //删除店招图片
        delete_signboard() {
            this.shop_obj.signboard = "";
        },
        //点击类型
        radio(x) {
            this.$set(x, "active", !x.active);
        },
        //查询店铺是否可以修改
        get_isUpdata() {
            this.$axios({
                method: "get",
                url: "/api-s/shops/update/finByUserid/" + this.userInfo.username
            }).then(x => {
                console.log("查询店铺是否可以修改", x);
                if (x.data.code == 200) {
                    if (x.data.data) {
                        this.isUpdata = false;
                    } else {
                        this.isUpdata = true;
                    }
                    this.update_obj = x.data.data;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        //添加
        add() {
            // if(!this.isUpdata){
            //     mui.alert('请等待上次修改审核完成。', "提示", function() {
            //     },"div");
            //     return
            // }
            if (this.update_obj && this.update_obj.state == 0) {
                mui.alert("请等待上次修改审核完成。", "提示", function () { }, "div");
                return;
            }
            var this_1 = this;
            // this.$router.push('/myshop');
            if (this.shop_fenlei[2] && this.shop_fenlei[2].id) {
                this.shop_obj.shopType = this.shop_fenlei[2].id; //店铺类型
            } else if (this.shop_fenlei[1] && this.shop_fenlei[1].id) {
                this.shop_obj.shopType = this.shop_fenlei[1].id; //店铺类型
            } else if (this.shop_fenlei[0] && this.shop_fenlei[0].id) {
                this.shop_obj.shopType = this.shop_fenlei[0].id; //店铺类型
            }
            if (this.city[2] && this.city[2].value) {
                this.shop_obj.areaCode = this.city[2].value; //区域
            } else if (this.city[1] && this.city[1].value) {
                this.shop_obj.areaCode = this.city[1].value; //区域
            } else if (this.city[1] && this.city[0].value) {
                this.shop_obj.areaCode = this.city[0].value; //区域
            }
            this.shop_obj.address = this.address;
            this.shop_obj.x = this.$store.state.geographical_position.longitude.toString();
            this.shop_obj.y = this.$store.state.geographical_position.latitude.toString();
            this.shop_obj.businessNature = this.shopType;
            this.shop_obj.businessLicense = this.$store.state.apply_for_a_shop.businessLicense;
            this.shop_obj.blnumber = this.$store.state.apply_for_a_shop.blnumber;

            // this.shop_obj.environmentalImg=this.img_list[0] ? this.img_list[0] : '';

            this.shop_obj.arrEnvironmentalImg = this.img_list;
            var serviceType = [];
            var serviceType_list = this.serviceType_list;
            for (var i = 0; i < serviceType_list.length; i++) {
                if (serviceType_list[i].active) {
                    serviceType.push(serviceType_list[i].id);
                }
            }
            // var serviceType=serviceType_list[0] ? serviceType_list[0].id : '';
            this.shop_obj.arrServiceType = serviceType;
            this.shop_obj.openTime = this.creationTime;
            this.shop_obj.closeTime = this.endTime;

            this.shop_obj.sex = this.$store.state.apply_for_a_shop.sex;
            this.shop_obj.nation = this.$store.state.apply_for_a_shop.nation;
            this.shop_obj.birthday = this.$store.state.apply_for_a_shop.birthday;
            this.shop_obj.iaiAddress = this.$store.state.apply_for_a_shop.iaiAddress;
            this.shop_obj.idNumber = this.$store.state.apply_for_a_shop.idNumber;
            this.shop_obj.issueArea = this.$store.state.apply_for_a_shop.issueArea;
            this.shop_obj.frontImg = this.$store.state.apply_for_a_shop.frontImg;
            this.shop_obj.reverseImg = this.$store.state.apply_for_a_shop.reverseImg;
            this.shop_obj.validity = this.$store.state.apply_for_a_shop.validity;
            this.shop_obj.iaiName = this.$store.state.apply_for_a_shop.iaiName;

            var test_phone = /^1\d{10}$/;
            if (!this.shop_obj.shopType) {
                mui.toast("请选择店铺分类。", { duration: 2000, type: "div" });
                return;
            } else if (!this.shop_obj.name) {
                mui.toast("请填写店铺名称。", { duration: 2000, type: "div" });
                return;
            } else if (
                !this.shop_obj.phone ||
                !test_phone.test(this.shop_obj.phone)
            ) {
                mui.toast("请填写正确电话。", { duration: 2000, type: "div" });
                return;
            } else if (!this.shop_obj.areaCode) {
                mui.toast("请填选择店铺区域。", { duration: 2000, type: "div" });
                return;
            } else if (!this.shop_obj.address) {
                mui.toast("请填设置店铺地址。", { duration: 2000, type: "div" });
                return;
            } else if (!this.shop_obj.openTime || !this.shop_obj.closeTime) {
                mui.toast("请填设置营业时间。", { duration: 2000, type: "div" });
                return;
            } else if (!this.shop_obj.iaiName) {
                mui.toast("请完成法人认证。", { duration: 2000, type: "div" });
                return;
            } else if (!this.shop_obj.businessNature) {
                mui.toast("请设置营业执照。", { duration: 2000, type: "div" });
                return;
            } else if (!this.shop_obj.signboard) {
                mui.toast("请设置店招。", { duration: 2000, type: "div" });
                return;
            } else if (this.shop_obj.arrEnvironmentalImg.length == 0) {
                mui.toast("请设置环境图片。", { duration: 2000, type: "div" });
                return;
            } else if (!this.radio_Agreement) {
                mui.toast("请同意商家合作协议。", { duration: 2000, type: "div" });
                return;
            }

            openloading(true);
            let { ...update_obj } = this.shop_obj;
            update_obj.state = 0;
            this.$axios({
                method: "post",
                url: "/api-s/shops/update/add",
                data: update_obj
            })
                .then(x => {
                    console.log(x);
                    if (x.data.code == 200) {
                        mui.alert(
                            "提交成功，等待审核。",
                            "提示",
                            function () {
                                history.back();
                            },
                            "div"
                        );
                    } else {
                        mui.alert(
                            x.data.msg ? x.data.msg : x.data.message,
                            "提示",
                            "我知道了",
                            function () { },
                            "div"
                        );
                    }
                    openloading(false);
                })
                .catch(err => {
                    console.log(err);
                    mui.toast("系统错误，请稍后再试。", { duration: 2000, type: "div" });
                    openloading(false);
                });
        },
        RegistrationAgreement() {
            this.$router.push("/shopAgreement?name=" + this.myshop.iaiName + " (" + this.myshop.phone + ")");
        },
        //跳转微信地图测试
        weixinmaptest() {
            var ditu = bd_decrypt(
                this.$store.state.geographical_position.longitude,
                this.$store.state.geographical_position.latitude
            );
            console.log(ditu);
            wx.openLocation({
                latitude: ditu.lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: ditu.lng, // 经度，浮点数，范围为180 ~ -180。
                name: "测试", // 位置名
                address: "地址测试说明", // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        //跳转到百度地图页面
        baiduMap() {
            this.$router.push("/baiduMap");
        },
        //跳转法人认证
        LegalPersonCertification() {
            // this.$router.push("/LegalPersonCertification");
            this.$router.push("/shopAuthentication");
        },
        //跳转营业执照添加界面
        BusinessLicense() {
            // this.$router.push("/BusinessLicense");
            this.$router.push("/shopBusinessDetails");
        },
        //选择时间
        select_time() {
            this.$router.push("/TimeSlot");
        },
        //选择地区
        select_region() {
            this.Picker3.setData(this.cityList);
            this.Picker3.show(x => {
                console.log(x);
                this.city = x;
            });
        },
        //选择店铺类型
        select_shop_type() {
            console.log(this.shops_tree_list);
            this.Picker3.setData(this.shops_tree_list);
            this.Picker3.show(x => {
                console.log(x);
                this.shop_fenlei = x;
            });
        },
        //图片轮播商一些
        slideNext() {
            this.swiper.slideNext();
        },
        //选择LOGO
        Choice_img(x) {
            if (x == 1) {
                //1表示店招
                this.$store.state.Select_picture.type = "dianzhao";
                this.$store.state.Select_picture.list = [this.shop_obj.signboard];
                this.$router.push("/Album?seetype=1&size=1");
            } else {
                //2表示环境
                this.$store.state.Select_picture.type = "huanjing";
                this.$store.state.Select_picture.list = this.img_list;
                this.$router.push("/Album?seetype=2&size=12");
            }
            console.log(x);
            // if (x == 2 && this.img_list.length == 12) return;
            // this.cropper_type = x;
            // document.getElementById("zhengmianInput").getElementsByTagName("input")[0].click();
        },
        input_change(e) {
            openloading(true);
            console.log(e);
            var that = this;
            var file = e.target.files[0];
            var size = file.size / 1024;
            if (size > 1024) {
                this.option.size = size / 1024;
            } else {
                this.option.size = 1;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读出 base64
            reader.onloadend = function () {
                that.Cropper_show = true;
                that.option.img = reader.result;
                openloading(false);
            };
        },
        //关闭裁剪弹出框
        close_1() {
            this.Cropper_show = false;
        },
        //左转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        //右转
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        //确定裁剪
        confirm() {
            this.Cropper_show = false;
            this.$refs.cropper.getCropData(data => {
                if (this.cropper_type == 1) {
                    this.shop_obj.signboard = data;
                } else {
                    this.img_list.push(data);
                }
            });
        },
        //获取服务列表 如wifi等
        get_serviceType() {
            return new Promise((resolve, reject) => {
                this.$axios
                    .get("/api-s/shops/type/findAll?start=0&length=10000")
                    .then(x => {
                        if (x.data.code == 200) {
                            this.serviceType_list = x.data.data.data;
                        } else {
                            mui.alert(
                                x.data.msg ? x.data.msg : x.data.message,
                                "提示",
                                "我知道了",
                                function () { },
                                "div"
                            );
                        }
                        resolve();
                    })
                    .catch(err => {
                        resolve();
                    });
            });
        },
        async 初始化(){
            if(!this.myshop || !this.myshop.shopid){
                await this.获取店铺()
            }
            if(this.$store.state.in_index==0){
                this.$store.state.in_index = 1;
                this.get_serviceType().then(x => {
                    this.chongxingtijiao();
                });
                this.get_isUpdata();
            }
        }  
    },
    beforeCreate: function () {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function () {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function () {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function () {
        var this_1 = this;
        try {
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (error) { }
        this.shop_obj.userid = this.userInfo.username;

        //店铺类型
        this.Picker3 = new mui.PopPicker({
            layer: 3
        });
        //查询服务类别
        this.get_serviceType().then(x => {
            this.chongxingtijiao();
        });

        //地区
        var area = [];
        try {
            area = JSON.parse(localStorage.area);
        } catch (error) { }
        //递归
        function convert(arr, id) {
            var res = [];
            for (var i = 0; i < arr.length; i++) {
                arr[i].value = arr[i].id;
                arr[i].text = arr[i].name;
                if (arr[i].parentid == id) {
                    res.push(arr[i]);
                    arr[i].children = convert(arr, arr[i].id);
                }
            }
            return res;
        }
        this.cityList = convert(area, null);
        //图片轮播
        this.swiper = new Swiper("#ApplicationShop .swiper-container", {
            // loop: true,
            // autoplay: true,
            slidesPerView: "auto",
            observer: true,
            spaceBetween: 10,
            on: {
                transitionEnd() {
                    console.log("过渡结束transitionEnd", this.activeIndex);
                    if (this_1.img_list.length - this.activeIndex > 2) {
                        this_1.left = true;
                    } else {
                        this_1.left = false;
                    }
                }
            }
        });
        //删除图片
        $("#ApplicationShop .box_3 .img_list").on("click", ".delete_1", function () {
            var index = $(this).attr("inde");
            this_1.img_list.splice(index, 1);
        });

        // console.group('------mounted 挂载结束状态------');
    },
    activated() {
        console.log("再次进入页面");
        this.初始化();
        

        if (this.$store.state.Select_picture.type == "dianzhao") {
            console.log(this.$store.state.Select_picture.list);
            this.$store.state.Select_picture.type = "";
            this.shop_obj.signboard = this.$store.state.Select_picture.list[0] ? this.$store.state.Select_picture.list[0].url : "";
            // this.$store.state.Select_picture.list=[]
        }
        if (this.$store.state.Select_picture.type == "huanjing") {
            this.$store.state.Select_picture.type = "";
            var img_list = [];
            var list = this.$store.state.Select_picture.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].url) {
                    img_list.push(list[i].url);
                } else {
                    img_list.push(list[i]);
                }
            }
            this.img_list = img_list;
            this.$store.state.Select_picture.list = [];
            // console.log(this.$store.state.Select_picture);
        }
    },
    beforeUpdate: function () {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        //店铺分类
        shops_tree_list() {
            console.log(this.shop_fenlei);
            if (this.shop_fenlei.length == 0) {
                this.shop_fenlei = get_url(this.shops_tree_list, this.myshop.shopType);
            }
        },
        //店铺服务
        serviceType_list() {
            var this_1 = this;
            var serviceType = this.myshop.serviceType
                ? this.myshop.serviceType.split(",")
                : [];
            var serviceType_list = this.serviceType_list;
            for (var i = 0; i < serviceType_list.length; i++) {
                this_1.$set(serviceType_list[i], "active", false);
                for (var j = 0; j < serviceType.length; j++) {
                    if (serviceType_list[i].id == serviceType[j]) {
                        //             // serviceType_list[i].
                        this_1.$set(serviceType_list[i], "active", true);
                    }
                }
            }
        }

        // img_list() {
        //     this.$nextTick(function() {
        //         console.log("数据渲染完成");
        //         this.getswiper();
        //     });
        // }
    }
};
</script>


<style lang="scss">
@import "@/assets/css/config.scss";
#ApplicationShop {
    height: 100%;
    // .mui-content{
    //     background: #ffffff;
    // }
}
#ApplicationShop .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#ApplicationShop .mui-title {
    color: #ffffff;
}

#ApplicationShop .box_5 {
    height: 38px;
    line-height: 38px;
    color: rgba(166, 166, 166, 1);
    font-size: 12px;
    padding: 0px 10px;
    .shenhe {
        color: #ff8d1a;
    }
    .weitongguo {
        color: #d43030;
    }
    .tongguo {
        color: #00baad;
    }
}

#ApplicationShop .box_1 {
    margin: 0px 0px 5px;
    font-size: 0.14rem;
    color: rgba(80, 80, 80, 1);
    span {
        width: 0.9rem;
        display: inline-block;
        flex-shrink: 0;
    }
    .input_box {
        display: flex;
        padding: 0px 0px 0px 15px;
        height: 0.4rem;
        align-items: center;
        input {
            padding: 0px;
            margin: 0px;
            border: none;
            font-size: 0.14rem;
        }
    }
}

#ApplicationShop .box_2 {
    padding: 0.1rem 0px 0.1rem 15px;
    margin: 0px 0px 5px;
    background: #ffffff;
    font-size: 0.14rem;
    display: flex;
    > li:nth-child(1) {
        width: 0.9rem;
        flex-shrink: 0;
    }
    > li:nth-child(2) {
        width: 1.5rem;
        height: 1.12rem;
        position: relative;
        .tishi {
            width: 100%;
            height: 100%;
            background: #cccccc;
            text-align: center;
            line-height: 1.1rem;
            color: #ffffff;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        span {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 0.32rem;
            height: 0.32rem;
            background-color: rgba(153, 153, 153, 0.5);
            color: #ffffff;
            text-align: center;
            line-height: 0.32rem;
            font-size: 0.22rem;
        }
    }
}

#ApplicationShop .box_3 {
    background: #ffffff;
    margin: 0px 0px 5px 0px;
    .title_1 {
        padding: 11px 15px;
        font-size: 0.14rem;
        color: rgba(80, 80, 80, 1);
    }
    .lunbo {
        display: flex;
        padding: 0px 0px 11px 0px;
        .left_1 {
            width: 15px;
            height: 0.9rem;
            line-height: 0.9rem;
            flex-shrink: 0;
            position: relative;
            i {
                font-size: 16px;
            }
        }
        .img_list {
            border: 1px solid #e4e4e4;
            flex-grow: 1;
            width: 0;
            .swiper-container {
                width: 100%;
            }
            .swiper-slide {
                width: 120px;
                height: 0.9rem;
                span {
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    width: 0.32rem;
                    height: 0.32rem;
                    background-color: rgba(153, 153, 153, 0.5);
                    color: #ffffff;
                    text-align: center;
                    line-height: 0.32rem;
                    font-size: 0.22rem;
                }
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        .right_1 {
            width: 0.4rem;
            height: 0.9rem;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(229, 229, 229, 1);
            span {
                width: 0.26rem;
                height: 0.26rem;
                border-radius: 100%;
                border: 1px solid rgba(40, 148, 220, 1);
                text-align: center;
                color: rgba(40, 148, 220, 1);
            }
        }
    }
}

#ApplicationShop .box_4 {
    background: #ffffff;
    padding: 0px 15px;
    margin: 0px 0px 5px 0px;
    .title_1 {
        padding: 11px 0px;
        font-size: 0.14rem;
        color: rgba(80, 80, 80, 1);
        .tishi {
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
        }
    }
    .radio_1 {
        display: inline-block;
        margin: 0px 0px -3px 3px;
    }
    .table_box {
        // padding: 0px 15px;
        text-align: right;
        white-space: nowrap;
        color: #505050;
        font-size: 0.14rem;
    }
    table {
        width: 100%;
    }
    tr {
        border-bottom: 1px solid #ededed;
        > td:nth-child(1) {
            width: 1px;
        }
    }
    td {
        padding: 10px 0px;
    }
}

#ApplicationShop .Agreement {
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

#ApplicationShop .btn_1 {
    width: 2.5rem;
    display: block;
    margin: 0px auto 0.2rem;
    height: 35px;
    background: $header_background;
    border: none;
    border-radius: 35px;
    color: #ffffff;
}

#ApplicationShop .Cropper_box {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #e5e5e5;
    z-index: 10;
    .cont_1 {
        height: 100%;
    }
    .footer_1 {
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        display: flex;
        font-size: 20px;
        color: #ffffff;
        padding: 25px 0px;
        justify-content: space-around;
    }

    .vue-cropper {
        background: #e5e5e5;
    }
    .cropper-modal {
        background: rgba(181, 181, 181, 0.5);
    }
    .cropper-face {
        background-size: cover;
        background-color: rgba(0, 0, 0, 0);
        opacity: 1;
    }
    .cropper-view-box {
        outline: none;
    }
}

#ApplicationShop .shenhezhong {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 1.2rem 0px 0px;
    text-align: center;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    z-index: 1;
    i {
        display: inline-block;
        font-size: 1.2rem;
        color: rgba(248, 204, 132, 1);
        margin: 0px 0px 30px 0px;
    }
}
#ApplicationShop .jujue {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 1.2rem 0px 0px;
    text-align: center;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    z-index: 1;
    i {
        display: inline-block;
        font-size: 1.2rem;
        color: rgba(220, 56, 64, 1);
        margin: 0px 0px 30px 0px;
    }
    .text_box {
        width: 45%;
        margin: 0px auto;
        text-align: left;
    }
    button {
        width: 1.4rem;
        height: 0.3rem;
        display: block;
        margin: 0.5rem auto;
        padding: 0px;
        border-radius: 0.3rem;
        font-size: 14px;
        border: none;
        color: #ffffff;
        background: $header_background;
    }
}
</style>
