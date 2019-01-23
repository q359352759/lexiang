<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">营业执照</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <!-- <a class="mui-navigate-right"> -->
                            <span>
                                经营性质：
                            </span>
                            {{shopType==1 ? '个体经营' : '公司经营'}}
                        <!-- </a> -->
                    </li>
                </ul>
            </div>

            <div class="box_2">
                <div class="title">
                    营业执照：
                </div>
                <div class="img_box">
                    <!-- <div class="case" @click="SelectionImage()">
                        <img src="image/zhizhao.jpg">
                    </div> -->
                    <div class="LicenseImge">
                        <img :src="LicenseImge" alt="" srcset="">
                        <!-- <span @click="delete_1()">
                            <i class="icon iconfont icon-del"></i>
                        </span> -->
                    </div>
                </div>
            </div>

            <div class="box_3">
                <span>营业执照号：</span>
                <input type="text" readonly v-model="blnumber" placeholder="请输入营业执照号">
            </div>
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
      // shopType: "1", //1个人经营 2公司经营
      // blnumber:'',            //证件号
      // LicenseImge:''
    };
  },
  computed: {
    myshop() {
      return this.$store.state.myshop;
    },
    shopType() {
      return this.$store.state.myshop.businessNature;
    },
    LicenseImge() {
      return this.$store.state.myshop.businessLicense;
    },
    blnumber() {
      return this.$store.state.myshop.blnumber;
    }
  },
  methods: {},
  mounted() {
    console.log(this.myshop);
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
    height: 210px;
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
