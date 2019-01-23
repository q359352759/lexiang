<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">营业执照</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" @click="SelectionLicense()">
                        <a class="mui-navigate-right">
                            <span>
                                经营性质：
                            </span>
                            {{shopType==1 ? '个体经营' : '公司经营'}}
                        </a>
                    </li>
                </ul>
            </div>

            <div class="box_2">
                <div class="title">
                    营业执照：
                </div>
                <div class="img_box">
                    <div class="case" @click="SelectionImage()">
                        <img src="image/zhizhao.jpg">
                    </div>
                    <div v-if="LicenseImge" class="LicenseImge">
                        <img :src="LicenseImge" @click="SelectionImage()" alt="" srcset="">
                        <span @click="delete_1()">
                            <i class="icon iconfont icon-del"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="box_3">
                <span>营业执照号：</span>
                <input type="text" v-model="blnumber" placeholder="请输入营业执照号">
            </div>
        </div>

        

        <div class="btn_1" @click="Sure()">确定</div>

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

        <div id="zhengmianInput">
            <input type="file" @change="input_change($event)" accept="image/*" name="" id="">
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";
import { VueCropper } from "vue-cropper";
export default {
  name: "",
  components: {
    VueCropper
  },
  data() {
    return {
      shopType: "1", //1个人经营 2公司经营
      shopTypePicker: "",
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
        outputType: "jpeg", //png,jpeg,webp
        autoCropWidth: 300,
        autoCropHeight: 412
      },
      LicenseImge: "",
      blnumber: "" //证件号
    };
  },
  methods: {
    //确定
    Sure() {
      if (!this.LicenseImge) {
        mui.toast("请选择营业执照！", { duration: 2000, type: "div" });
        return;
      } else if (!this.blnumber) {
        mui.toast("请填写执照号码！", { duration: 2000, type: "div" });
        return;
      }
      this.$store.state.apply_for_a_shop.shopType = this.shopType;
      this.$store.state.apply_for_a_shop.businessLicense = this.LicenseImge;
      this.$store.state.apply_for_a_shop.blnumber = this.blnumber;
      history.back();
    },
    //选择经营类型
    SelectionLicense() {
      this.shopTypePicker.show(x => {
        console.log(x);
        this.shopType = x[0].value;
      });
    },
    //选择图片
    SelectionImage() {
      console.log(123);
      document
        .getElementById("zhengmianInput")
        .getElementsByTagName("input")[0]
        .click();
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
      reader.onloadend = function() {
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
        this.LicenseImge = data;
      });
    },
    //删除图片
    delete_1() {
      this.LicenseImge = "";
    }
  },
  mounted() {
    this.shopTypePicker = new mui.PopPicker();
    var shopType = [
      {
        value: "1",
        text: "个体经营"
      },
      {
        value: "2",
        text: "公司经营"
      }
    ];
    this.shopTypePicker.setData(shopType);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar {
  background: $header_background;
  a {
    color: #ffffff;
  }
}
.mui-content {
  margin-bottom: 60px;
}
.mui-title {
  color: #ffffff;
}

#zhengmianInput {
  display: none;
}

.box_1 {
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  span {
    width: 90px;
    display: inline-block;
  }
}
.box_2 {
  background: #ffffff;
  margin: 3px 0px 0px;
  color: rgba(80, 80, 80, 1);
  font-size: 0.14rem;
  padding: 1px 0px;
  .title {
    padding: 11px 15px;
  }
  .img_box {
    position: relative;
    width: 150px;
    margin: 0px auto 35px;
    img {
      width: 100%;
    }
    .LicenseImge {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      span {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 0.32rem;
        height: 0.32rem;
        color: #ffffff;
        background-color: rgba(153, 153, 153, 0.5);
        line-height: 0.32rem;
        text-align: center;
        font-size: 0.22rem;
      }
    }
  }
}
.box_3 {
  margin: 3px 0px 0px 0px;
  background: #ffffff;
  display: flex;
  height: 44px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  align-items: center;
  span {
    width: 105px;
    flex-shrink: 0;
    padding: 0px 0px 0px 15px;
  }
  input {
    padding: 0px;
    margin: 0px;
    font-size: 14px;
    border: none;
  }
}
.btn_1 {
  position: fixed;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 0.14rem;
  color: rgba(255, 255, 255, 1);
  background: $header_background;
  text-align: center;
  bottom: 0px;
  left: 0px;
  z-index: 1;
}

.Cropper_box {
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
</style>

<style lang="scss">
</style>
