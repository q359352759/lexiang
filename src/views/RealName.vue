<template>
    <div id="RealName">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">实名认证</h1>
        </header>

        <div class="mui-content">
            <div class="box_3">
                若照片方向不对，可在裁剪时进行旋转。
            </div>
            <ul class="box_1" v-show="!Uncertified">
                <li class="zhengmian" @click="zhengmian(true)">
                    <span v-show="zhengmian_img==''">请选择身份证正面</span>
                    <div v-show="zhengmian_img==''">
                        <img src="@/assets/image/4.png" alt="">
                    </div>
                    <img v-show="zhengmian_img!=''" :src="zhengmian_img" alt="">
                    <div class="loading" v-show="zhengmian_loading">
                        <div>
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                    </div>
                </li>
                <li class="beimian" @click="zhengmian(false)">
                    <div v-show="fanmian_img==''">
                        <img src="@/assets/image/3.png" alt="">
                    </div>
                    <span v-show="fanmian_img==''">请选择身份证背面</span>
                    <img v-show="fanmian_img!=''" :src="fanmian_img" alt="">
                    <div class="loading" v-show="fanmian_loading">
                        <div>
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                    </div>
                </li>
            </ul>

            <ul class="box_2">
                <li v-show="zhengmian_ok">
                    <div>姓名</div>
                    <div>{{Positive_obj.name}}</div>
                </li>
                <li v-show="zhengmian_ok">
                    <div>性别</div>
                    <div>{{Positive_obj.sex}}</div>
                </li>
                <li v-show="zhengmian_ok">
                    <div>名族</div>
                    <div>{{Positive_obj.nation}}</div>
                </li>
                <li v-show="zhengmian_ok">
                    <div>出生</div>
                    <div>{{Positive_obj.birthday}}</div>
                </li>
                <li v-show="zhengmian_ok">
                    <div>住址</div>
                    <div>{{Positive_obj.address}}</div>
                </li>
                <li v-show="zhengmian_ok">
                    <div>身份证号</div>
                    <div>{{Positive_obj.idNumber}}</div>
                </li>
                <li v-show="fanmian_ok">
                    <div>签发机关</div>
                    <div>{{The_other_side.issueArea}}</div>
                </li>
                <li v-show="fanmian_ok">
                    <div>有效期</div>
                    <div>
                        {{The_other_side.Invalid}}
                    </div>
                </li>
            </ul>

            <div class="box_4">
                <div @click="radio_type_2=!radio_type_2" class="radio_1" :class="{'active':radio_type_2}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <div @click="radio_type_2=!radio_type_2">我已阅读并同意</div>
                <div @click="$router.push('/renzhengxieyi')" class="xieyi">《实名认证协议》</div>
            </div>

            <button @click="add()" class="btn_1">提交审核</button>
            <!-- <button @click="get_token()" class="btn_1">获取access_token</button> -->
        </div>

        <div class="loading loading_1" v-show="add_loading">
            <div>
                <i class="mui-icon mui-icon-spinner mui-spin"></i>
            </div>
        </div>

        <!-- 裁剪框 -->
        <div class="Cropper_box" :class="{'zhengmian':Positive,'fanmian':!Positive}" v-show="Cropper_show">
            <div class="cont_1">
                <!-- :centerBox="true" -->
                <VueCropper ref="cropper" :mode="option.mode" :outputSize="option.outputSize" :centerBox="option.centerBox" :viewMode="1" :img="option.img" :outputType="option.outputType" :info="true" :canMove="option.canMove" :fixedBox="option.fixedBox" :canMoveBox="option.canMoveBox" :autoCrop="true" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"></VueCropper>
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

        <div id="zhengmianInput">
            <input type="file" ref="zhengmianInput" @change="input_change($event)" accept="image/*" name="" id="">
        </div>
        <!-- <button @click="旋转画布()">旋转画布</button> -->
        <canvas ref="myCanvas" class="myCanvas"></canvas>
    </div>
</template>

<script>
import { openloading, getDateStr } from "@/assets/js/currency";
import { VueCropper } from "vue-cropper";
export default {
    name: "RealName",
    components: {
        VueCropper
    },
    data() {
        return {
            画布base64: "",
            画布img: "",
            degree: 0, //旋转角度
            //===============
            radio_type_2: true,
            img_beishu: "",
            userinfo: "", //用户信息
            add_loading: false, //正在添加
            zhengmian_ok: false, //正面已上传百度认证
            fanmian_ok: false, //反正已上传百度认证
            zhengmian_loading: false,
            fanmian_loading: false,
            Cropper_show: false, //裁剪弹出框
            Uncertified: false, //没有认证
            zhengmian_img: "", //正面图片
            fanmian_img: "", //反面
            access_token: "",
            Positive: true, //正面
            //===================
            img_width: "", //保存图片的宽度
            img_height: "", //保存图片的高度
            option: {
                img: "",
                outputSize: 1, //outputSize
                outputType: "png", //png,jpeg,webp
                canMove: true, //上传图片是否可以移动
                fixedBox: true, //裁剪框固定大小不动 true 固定
                canMoveBox: false, //截图框能否拖动
                autoCrop: true, //是否默认生成截图框
                fixedNumber: [35, 22], //截图框的宽高比例
                autoCropWidth: 350,
                autoCropHeight: 220,
                fixed: true, //是否开启截图框宽高固定比例 默认true
                centerBox: true, //截图框是否被限制在图片里面
                canScale: true, //图片是否允许滚轮缩放
                mode: "auto 220px" //contain , cover, 100px, 100% auto
            },
            Positive_obj: {
                //正面信息
                address: "", //地址
                idNumber: "", //身份证号码
                birthday: "", //出生
                name: "", //姓名
                sex: "", //性别
                nation: "" //名族
            },
            The_other_side: {
                Invalid: "", //失效日期
                Date_of_issue: "", //签发日期
                issueArea: "" //签发机关
            },
            image_status: {
                normal: "识别正常",
                reversed_side: "身份证正反面颠倒",
                non_idcard: "上传的图片中不包含身份证",
                blurred: "身份证模糊",
                other_type_card: "其他类型证照",
                over_exposure: "身份证关键字段反光或过曝",
                unknown: "未知状态"
            }
        };
    },
    computed: {
        // userinfo() {
        //     return this.$store.state.userInfo;
        // }
    },

    methods: {
        //左转
        rotateLeft() {
            // this.$refs.cropper.rotateLeft();
            // this.$refs.cropper.changeScale(-1);
            this.旋转画布(false);
        },
        //右转
        rotateRight() {
            // this.$refs.cropper.rotateRight()
            this.旋转画布(true);
        },
        //确认裁剪
        confirm() {
            console.log(this.option.outputSize);
            this.Cropper_show = false;
            this.$refs.cropper.getCropData(data => {
                if (this.Positive) {
                    this.zhengmian_img = data;
                } else {
                    this.fanmian_img = data;
                }
                this.idcard(this.Positive);
            });
        },
        //关闭裁剪弹出框
        close_1() {
            this.Cropper_show = false;
        },
        //实时预览函数
        realTime(data) {
            this.previews = data;
        },
        //获取百度 token
        get_token() {
            this.$axios.get("/api-u/baidu/identify").then(x => {
                this.access_token = x.data;
            });
        },
        //点击正面
        zhengmian(x) {
            this.Positive = x;
            this.$refs.zhengmianInput.value = "";
            this.$refs.zhengmianInput.click();
            // document.getElementById("zhengmianInput").getElementsByTagName("input")[0].click();
        },
        input_change(e) {
            var that = this;
            var file = e.target.files[0];
            // console.log(file);
            var size = file.size / 1024;
            if (size > 1024) {
                this.option.outputSize = size / 1024;
            } else {
                this.option.outputSize = 1;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读出 base64
            reader.onloadend = () => {
                that.画布base64 = reader.result;
                that.set_myCanvas();
            };
        },
        //计算放大比例
        fangda() {
            console.log(this.img_width);
            console.log(this.img_height);
        },
        //获取身份信息
        idcard(type) {
            if (type) {
                this.zhengmian_loading = true;
            } else {
                this.fanmian_loading = true;
            }
            var obj = {
                id_card_side: this.Positive ? "front" : "back",
                image: this.Positive
                    ? this.zhengmian_img.substring(this.zhengmian_img.indexOf("4") + 2)
                    : this.fanmian_img.substring(this.fanmian_img.indexOf("4") + 2),
                detect_direction: true
                // detect_risk:true 风险控制
            };
            this.$axios({
                method: "post",
                url:
                    "https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=" +
                    this.access_token,
                data: this.$qs.stringify(obj)
            })
                .then(x => {
                    console.log(x);
                    if (x.data.image_status == "normal") {
                        var words_result = x.data.words_result;
                        if (type) {
                            //表示正面的
                            this.zhengmian_ok = true;
                            this.zhengmian_loading = false;
                            this.Positive_obj = {
                                address: words_result["住址"].words, //地址
                                idNumber: words_result["公民身份号码"].words, //身份证号码
                                birthday: words_result["出生"].words, //出生
                                name: words_result["姓名"].words, //姓名
                                sex: words_result["性别"].words, //性别
                                nation: words_result["民族"].words //民族
                            };
                        } else {
                            this.fanmian_ok = true;
                            this.fanmian_loading = false;
                            this.The_other_side = {
                                Invalid: words_result["失效日期"].words, //失效日期
                                Date_of_issue: words_result["签发日期"].words, //签发日期
                                issueArea: words_result["签发机关"].words //签发机关
                            };
                        }
                    } else {
                        if (type) {
                            this.zhengmian_loading = false;
                        } else {
                            this.fanmian_loading = false;
                        }
                        mui.toast(this.image_status[x.data.image_status], {
                            duration: 2000,
                            type: "div"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 开始提交
        add() {
            var this_1 = this;
            var 当前时间 = getDateStr(0).replace(/-/g, "");
            if (!this.zhengmian_ok || !this.fanmian_ok) {
                mui.toast("请先上传完整的证件照！", { duration: 2000, type: "div" });
                return;
            } else if (!this.radio_type_2) {
                mui.toast("请同意实名认证协议。", { duration: 2000, type: "div" });
                return;
            } else if (
                !this.The_other_side.Invalid ||
                this.The_other_side.Invalid < 当前时间
            ) {
                mui.toast("证件有效期有误。", { duration: 2000, type: "div" });
                return;
            }
            this.add_loading = true;
            var obj = {
                userid: this.userinfo.username, //登录用的username  可以不传
                phone: this.userinfo.phone,
                name: this.Positive_obj.name, //真实姓名
                nation: this.Positive_obj.nation, //民族
                birthday: this.Positive_obj.birthday, //出生日期
                address: this.Positive_obj.address, //地址
                idNumber: this.Positive_obj.idNumber, //身份证号
                issueArea: this.The_other_side.issueArea, //签证地
                frontImg: this.zhengmian_img, //正面照
                reverseImg: this.fanmian_img, //背面照
                sex: this.Positive_obj.sex == "男" ? 0 : 1, //性别
                validity: this.The_other_side.Invalid //有效期
            };
            this.$axios({
                method: "post",
                data: obj,
                url: "/api-u/certification/add"
            }).then(x => {
                if (x.data.code == 200) {
                    this.$store.commit("setCurrent"); //获取个人信息
                    mui.alert("认证成功", "提示", function () {
                        history.back();
                    }, "div");
                } else {
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                }
                this.add_loading = false;
            }).catch(error => {
                this.add_loading = false;
                console.log("实名认证错误", error);
                mui.toast("系统错误，请稍后再试。", {
                    duration: "long",
                    type: "div"
                });
            });
        },
        //设置画布
        set_myCanvas() {
            console.log("设置画布");
            // alert('设置画布')
            var this_1 = this;
            var ww = document.body.clientWidth;
            var c = this.$refs.myCanvas;
            var cxt = c.getContext("2d");
            // this.cxt=c.getContext("2d");
            cxt.clearRect(0, 0, c.width, c.height); //清除画布
            this.画布img = new Image();
            this.画布img.src = this.画布base64;
            this.画布img.onload = () => {
                // alert('图片加载完成',this_1.画布img.height,this_1.画布img.width)
                console.log(
                    0,
                    0,
                    c.width,
                    (this_1.画布img.height * c.width) / this_1.画布img.width
                );
                this_1.degree = 0;
                c.height = (this_1.画布img.height * c.width) / this_1.画布img.width;
                cxt.drawImage(this_1.画布img, 0, 0, c.width, c.height);
                var imgData = c.toDataURL();
                this_1.Cropper_show = true;
                if (35 / 22 > c.width / c.height) {
                    this_1.option.mode = "350px auto";
                } else {
                    this_1.option.mode = "auto 220px";
                }
                this_1.option.img = imgData;
            };
        },
        旋转画布(type) {
            openloading(true);
            var this_1 = this;
            //旋转角度 和 旋转方向
            this.degree += type ? 90 : -90;
            var degree = (this.degree %= 360);
            var c = this.$refs.myCanvas;
            var cxt = c.getContext("2d");
            var 新高度 = (this.画布img.height * c.width) / this.画布img.width;
            if ((degree / 90) % 2 == 0 || (degree / 90) % 2 == -0) {
                //旋转了180度
                c.height = (this.画布img.height * c.width) / this.画布img.width;
            } else {
                c.height = (c.width / this.画布img.height) * this.画布img.width;
            }
            cxt.save();
            cxt.clearRect(0, 0, c.width, c.height);
            cxt.translate(c.width / 2, c.height / 2);
            cxt.rotate((degree / 180) * Math.PI);
            if ((degree / 90) % 2 == 0 || (degree / 90) % 2 == -0) {
                cxt.translate(-c.width / 2, -c.height / 2);
                cxt.drawImage(this.画布img, 0, 0, c.width, c.height);
            } else {
                cxt.translate(-c.height / 2, -c.width / 2);
                cxt.drawImage(this.画布img, 0, 0, c.height, c.width);
            }
            cxt.restore();
            if (35 / 22 > c.width / c.height) {
                this_1.option.mode = "auto 220px";
            } else {
                this_1.option.mode = "350px auto";
            }
            var imgData = c.toDataURL();
            this_1.option.img = imgData;
            if (35 / 22 > c.width / c.height) {
                this_1.option.mode = "350px auto";
            } else {
                this_1.option.mode = "auto 220px";
            }
            setTimeout(() => {
                openloading(false);
            }, 500);
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
        try {
            this.userinfo = JSON.parse(localStorage.userInfo);
        } catch (error) { }
        this.$store.commit("setagentUser");
        //获取百度  token
        this.get_token();
        var ww = document.body.clientWidth;
        this.$refs.myCanvas.width = ww;

        // console.group('------mounted 挂载结束状态------');
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
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {}
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";

#RealName .box_4 {
    display: flex;
    padding: 20px 10px;
    align-items: center;
    > div:nth-child(1) {
        margin: 0px 5px 0px 0px;
    }
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    .xieyi {
        color: #2a82e4;
    }
}

#RealName .myCanvas {
    border: 1px solid red;
    min-height: 10px;
    position: fixed;
    left: -100%;
}

#RealName #zhengmianInput {
    display: none;
}
#RealName {
    height: 100%;
    .mui-content {
        height: 100%;
        // background:#ffffff;
    }
}
#RealName .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#RealName .mui-title {
    color: #ffffff;
}
#RealName .swiper-pagination-bullet-active {
    background: $header_background;
}

#RealName .box_1 {
    padding: 1px 10px;
    li {
        display: flex;
        height: 2.1rem;
        border-radius: 10px;
        background: #e0e0e0;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        margin: 0.2rem 0px 0px 0px;
        color: #797979;
        position: relative;
    }
    .zhengmian {
        // padding: 0px 0.15rem 0px 0.25rem;
        span {
            margin: 0px 0px 0px 0.25rem;
        }
        > div:nth-child(2) {
            margin: 0px 0.15rem 0px 0px;
            img {
                width: 1.25rem;
            }
        }
        > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .beimian {
        // padding: 0px 0.3rem 0px 0.2rem;
        span {
            margin: 0px 0.3rem 0px 0px;
        }
        > div:nth-child(1) {
            height: 100%;
            padding: 0.25rem 0px 0px 0.2rem;
            img {
                width: 0.63rem;
            }
        }
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

#RealName .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    padding: 0px;
    background: rgba(0, 0, 0, 0.2);
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #ffffff;
    > div {
        // transform: rotate(90deg);
        animation: rotate 3s linear infinite;
    }
}
#RealName .loading_1 {
    position: fixed;
}

#RealName .box_3 {
    font-size: 0.12rem;
    text-align: center;
    padding: 0.2rem 0px 0px;
    color: red;
}
#RealName .box_2 {
    padding: 10px;
    li {
        display: flex;
        align-items: center;
        margin: 0px 0px 0.1rem 0px;
        font-size: 0.14rem;
        color: #484848;
        > div:nth-child(1) {
            width: 0.75rem;
            flex-shrink: 0;
        }
        > div:nth-child(2) {
            flex-grow: 1;
            background: #ffffff;
            padding: 5px;
            min-height: 0.3rem;
        }
    }
}
#RealName .btn_1 {
    width: 1.8rem;
    height: 0.35rem;
    display: block;
    border-radius: 0.35rem;
    background: $header_background;
    margin: 0.2rem auto 0.2rem;
    color: #ffffff;
    border: none;
}
#RealName .Cropper_box {
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

#RealName .Cropper_box.zhengmian .cropper-face {
    background-image: url(../assets/image/zhengmian.png);
}
#RealName .Cropper_box.fanmian .cropper-face {
    background-image: url(../assets/image/fanmian.png);
}
</style>
