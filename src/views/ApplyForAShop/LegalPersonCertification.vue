<template>
    <div id="LegalPersonCertification">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">法人认证</h1>
        </header>

        <div class="mui-content">
            <div v-if="userinfo.iaiState" class="box_3">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell item">
                        <div @click="select_shengfen(true)" class="radio_1" :class="{'active':false}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <span>{{findByUserid ? findByUserid.name : ''}}</span>
                        <div>是法人？可直接使用他的认证。</div>
                    </li>
                </ul>
            </div>
            <div v-if="userinfo.iaiState" class="box_3">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell item">
                        <div class="radio_1" :class="{'active':true}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <div>使用营业执照法人认证</div>
                    </li>
                </ul>
            </div>
            <div class="box_4">
                请用手机竖着拍照
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
            
            <div class="box_5">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':xieyi}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <div @click="change_radio_2()">我已阅读并同意</div>
                <div class="xieyi" @click="$router.push('/renzhengxieyi')">《实名认证协议》</div>
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
                <VueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :fixedBox="option.fixedBox" :canMoveBox="option.canMoveBox" :autoCrop="true" :autoCropWidth="350" :autoCropHeight="220"></VueCropper>
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
            <input type="file" @change="input_change($event)" accept="image/*" name="" id="">
        </div>
        <circularNav/>
    </div>
</template>

<script>
import circularNav from "@/components/circularNav";
import { openloading } from "@/assets/js/currency";
import { VueCropper } from "vue-cropper";
export default {
  name: "LegalPersonCertification",
  components: {
    VueCropper,
    circularNav
  },
  data() {
    return {
      xieyi: true,
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
        outputType: "jpeg" //png,jpeg,webp
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
    findByUserid() {
      return this.$store.state.findByUserid;
    }
  },

  methods: {
    //协议
    change_radio_2() {
      this.xieyi = !this.xieyi;
    },
    //选择以实名的省份证
    select_shengfen() {
      console.log(this.findByUserid);
      (this.$store.state.apply_for_a_shop.sex = this.findByUserid.sex), //性别
        (this.$store.state.apply_for_a_shop.iaiName = this.findByUserid.name), //真实姓名
        (this.$store.state.apply_for_a_shop.nation = this.findByUserid.nation), //民族
        (this.$store.state.apply_for_a_shop.birthday = this.findByUserid.birthday), //出生日期
        (this.$store.state.apply_for_a_shop.iaiAddress = this.findByUserid.address), //地址
        (this.$store.state.apply_for_a_shop.idNumber = this.findByUserid.idNumber), //身份证号
        (this.$store.state.apply_for_a_shop.issueArea = this.findByUserid.issueArea), //签证地
        (this.$store.state.apply_for_a_shop.frontImg = this.findByUserid.frontImg), //正面照
        (this.$store.state.apply_for_a_shop.reverseImg = this.findByUserid.reverseImg); //背面照
      this.$store.state.apply_for_a_shop.validity = this.findByUserid.validity; //有效期
      history.back();
    },
    //左转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //右转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //确认裁剪
    confirm() {
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
      this.add_loading = true;
      this.$axios({
        method: "get",
        url: "/api-u/baidu/identify"
      })
        .then(x => {
          console.log(x);
          this.access_token = x.data;
          this.add_loading = false;
        })
        .catch(err => {
          console.log(err);
          this.add_loading = false;
        });
    },
    //点击正面
    zhengmian(x) {
      this.Positive = x;
      document
        .getElementById("zhengmianInput")
        .getElementsByTagName("input")[0]
        .click();
    },
    input_change(e) {
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
      reader.onloadend = function() {
        that.Cropper_show = true;
        that.option.img = reader.result;
        // console.log(reader.result)
      };
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
      if (!this.zhengmian_ok || !this.fanmian_ok) {
        mui.toast("请先上传完整的证件照。", { duration: 2000, type: "div" });
        return;
      } else if (!this.xieyi) {
        mui.toast("请同意实名认证协议。", { duration: 2000, type: "div" });
        return;
      }
      // this.add_loading = true;

      (this.$store.state.apply_for_a_shop.sex =
        this.Positive_obj.sex == "男" ? 0 : 1), //性别
        (this.$store.state.apply_for_a_shop.iaiName = this.Positive_obj.name), //真实姓名
        (this.$store.state.apply_for_a_shop.nation = this.Positive_obj.nation), //民族
        (this.$store.state.apply_for_a_shop.birthday = this.Positive_obj.birthday), //出生日期
        (this.$store.state.apply_for_a_shop.iaiAddress = this.Positive_obj.address), //地址
        (this.$store.state.apply_for_a_shop.idNumber = this.Positive_obj.idNumber), //身份证号
        (this.$store.state.apply_for_a_shop.issueArea = this.The_other_side.issueArea), //签证地
        (this.$store.state.apply_for_a_shop.frontImg = this.zhengmian_img), //正面照
        (this.$store.state.apply_for_a_shop.reverseImg = this.fanmian_img); //背面照
      this.$store.state.apply_for_a_shop.validity = this.The_other_side.Invalid; //有效期
      history.back();
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
    try {
      this.userinfo = JSON.parse(localStorage.userInfo);
    } catch (error) {}

    //获取用户实名信息
    // this.findByUserid();
    this.$store.commit("setfindByUserid");
    //获取百度  token
    this.get_token();
    console.log(this.userinfo);
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
  watch: {}
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#LegalPersonCertification .box_5 {
  display: flex;
  padding: 10px 10px;
  align-items: center;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  .radio_1 {
    margin: 0px 5px 0px 0px;
  }
  .xieyi {
    color: #2a82e4;
  }
}
#LegalPersonCertification .box_3 {
  color: #505050;
  font-size: 0.14rem;
  .item {
    display: flex;
    align-items: center;
    .radio_1 {
      margin: 0px 10px 0px 0px;
    }
  }
  span {
    color: #2a82e4;
  }
}
#LegalPersonCertification #zhengmianInput {
  display: none;
}
#LegalPersonCertification {
  height: 100%;
  .mui-content {
    height: 100%;
    background: #ffffff;
  }
}
#LegalPersonCertification .mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
#LegalPersonCertification .mui-title {
  color: #ffffff;
}
#LegalPersonCertification .swiper-pagination-bullet-active {
  background: $header_background;
}

#LegalPersonCertification .box_4 {
  font-size: 0.12rem;
  text-align: center;
  padding: 10px 0px 0px;
  color: red;
}
#LegalPersonCertification .box_1 {
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

#LegalPersonCertification .loading {
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
#LegalPersonCertification .loading_1 {
  position: fixed;
}

#LegalPersonCertification .box_2 {
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
#LegalPersonCertification .btn_1 {
  width: 1.8rem;
  height: 0.35rem;
  display: block;
  border-radius: 0.35rem;
  background: $header_background;
  margin: 0.2rem auto 0.2rem;
  color: #ffffff;
  border: none;
}
#LegalPersonCertification .Cropper_box {
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

#LegalPersonCertification .Cropper_box.zhengmian .cropper-face {
  background-image: url(../../assets/image/zhengmian.png);
}
#LegalPersonCertification .Cropper_box.fanmian .cropper-face {
  background-image: url(../../assets/image/fanmian.png);
}
</style>
