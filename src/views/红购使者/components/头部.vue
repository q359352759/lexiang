<template>
    <div class="容器">
        <ul class="头部">
            <li class="头像">
                <img v-show="!userInfo.headImgUrl" src="image/WechatIMG311.png" alt="">
                <img v-show="userInfo.headImgUrl" :src="userInfo.headImgUrl" alt="">
            </li>
            <li class="内容">
                <div class="name">
                    <span v-if="userInfo && !实名信息">{{userInfo.nickname}}</span>
                    <span v-if="实名信息">{{实名信息.name}}</span>
                    <i  @click="erweima()" class="icon iconfont icon-31erweima"></i>
                </div>
                <div class="地区">{{代理区域}}</div>
            </li>
            <div class="赚外快" @click="$router.push('/shizhe/tuiguangzhuanqian')">
                <div>
                    <i class="icon iconfont icon-zhuanqian"></i>
                </div>
                <div>赚外快</div>
            </div>
        </ul>

        <div class="生成容器" ref="生成容器">
            <div class="标题">
                <div class="标题1">
                    <span v-if="userInfo && !实名信息">{{userInfo.nickname}}</span>
                    <span v-if="实名信息">{{实名信息.name}}</span>
                    <span>邀你领取</span>
                    <span class="钱">50</span>
                    <span>元红包</span>
                </div>
                <div class="半圆"></div>
            </div>
            <div class="提示">长按图片，点击“识别图中二维码”</div>
            <div class="图片容器">
                <div class="二维码容器" ref="二维码容器">
                    <!-- <img src="image/43.png" alt="" srcset=""> -->
                </div>
                <div class="头像">
                    <img v-if="头像base64" :src="头像base64" alt="" srcset="">
                    <img v-if="!头像base64" src="image/WechatIMG311.png" alt="" srcset="">
                </div>
            </div>
            <div class="文本1">红包乐购，全城促销信息发布平台</div>
        </div>

        <div class="分享显示框" v-show="是否分享">
            <div class="内容">
                <div class="关闭" @click="是否分享=false">
                    <i class="icon iconfont icon-quxiao"></i>
                </div>
                <div class="图片容器">
                    <img :src="截图地址" alt="" srcset="">
                </div>
                <div class="文本">长按二维码，点击“发送给朋友”</div>
            </div>
        </div>

    </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
import loading from "@/components/loading.vue";
import { mapGetters, mapActions } from "vuex";
import { dateFtt, openloading } from "@/assets/js/currency";

export default {
  name: "",
  data() {
    return {
      userInfo: "",

      是否分享: false,
      头像base64: "",
      截图地址: ""
    };
  },
  computed: {
    ...mapGetters({
      代理人信息: "agent/代理人信息",
      实名信息: "实名认证/实名信息"
    }),
    代理区域() {
      var list = [];
      if (this.代理人信息.areaCode) {
        list = this.$store.getters.filter_area(this.代理人信息.areaCode);
      }
      var str = "";
      list.forEach(item => {
        str += item.name + "/";
      });
      return str.substring(0, str.length - 1);
    }
  },
  methods: {
    ...mapActions({
      获取认证: "实名认证/获取认证"
    }),
    //生成二维码
    shengchengerweima() {
      var url =
        window.location.origin +
        window.location.pathname +
        "#/BeInvited?pid=" +
        this.userInfo.username +
        "&invitationtype=1";
      var el = this.$refs.qrcode;
      el.innerHTML = "";
      let qrcode = new QRCode(el, {
        width: 200,
        height: 200, // 高度
        text: url, // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: "#fff",
        foreground: "#fff"
      });
    },
    //生产二维码
    erweima() {
      console.log("生成二维码");
      if (this.截图地址) {
        this.是否分享 = true;
      } else {
        openloading(true);
        Promise.all([this.生成二维码(), this.生成头像()])
          .then(x => {
            this.截图();
          })
          .catch(err => {
            openloading(false);
            console.log(err);
            mui.toast("生成二维码失败，稍后再试。", {
              duration: "long",
              type: "div"
            });
          });
      }
    },
    生成二维码() {
      return new Promise((resolve, reject) => {
        var url =
          window.location.origin +
          window.location.pathname +
          "#/BeInvited?pid=" +
          this.userInfo.username +
          "&invitationtype=1";
        console.log(url);
        var el = this.$refs.二维码容器;
        el.innerHTML = "";
        let qrcode = new QRCode(el, {
          width: 200,
          height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
          text: url, // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          background: "#fff",
          foreground: "#fff"
        });
        setTimeout(() => {
          el.querySelector("img").style.width = "100%";
          resolve();
        }, 300);
      });
    },
    生成头像() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            "/api-u/users/imgtobase64",
            this.$qs.stringify({ url: this.userInfo.headImgUrl })
          )
          .then(x => {
            if (x.data.code == 200) {
              this.头像base64 = "data:image/jpeg;base64," + x.data.data;
              resolve();
            } else {
              reject();
            }
          })
          .catch(err => {
            reject();
          });
      });
    },
    截图() {
      const el = this.$refs.生成容器;
      const options = {
        useCORS: true,
        logging: false
      };
      html2canvas(el, options).then(canvas => {
        this.截图地址 = canvas.toDataURL();
        this.是否分享 = true;
        openloading(false);
      });
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.userInfo);
    this.获取认证(this.userInfo.username);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.容器 {
  margin: 0px 0px 4px 0px;
}
.头部 {
  display: flex;
  background: #ffffff;
  padding: 10px 12px;
  .头像 {
    width: 44px;
    height: 44px;
    margin: 0px 7px 0px 0px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
  }
  .内容 {
    width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      display: flex;
      align-items: center;
      span {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        font-weight: bold;
        margin: 0px 13px 0px 0px;
      }
      i {
        color: #747870;
        font-size: 18px;
        height: 18px;
      }
    }
    .地区 {
      color: rgba(128, 128, 128, 1);
      font-size: 10px;
      padding: 0px 10px 0px 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .赚外快 {
    flex-shrink: 0;
    text-align: center;
    > div:nth-child(1) {
      font-size: 26px;
      color: $header_background;
      height: 26px;
    }
    > div:nth-child(2) {
      color: rgba(42, 130, 228, 1);
      font-size: 10px;
    }
  }
}

.生成容器 {
  width: 245px;
  background-color: #e96969;
  position: fixed;
  bottom: 0px;
  left: -100%;
  text-align: center;
  overflow: hidden;
  .半圆 {
    background: #db4141;
    position: absolute;
    width: 200%;
    height: 500px;
    bottom: 0px;
    left: -50%;
    border-radius: 100%;
  }
  .提示 {
    color: rgba(255, 255, 255, 1);
    font-size: 10px;
    margin: 4px 0px 8px;
  }
  .标题 {
    .标题1 {
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 1;
    }
    padding: 10px 0px 26px;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    position: relative;
    z-index: 1;
    .钱 {
      font-weight: bold;
      font-size: 36px;
    }
  }
  .图片容器 {
    margin: 0px auto 0px;
    width: 178px;
    height: 178px;
    position: relative;
    .二维码容器 {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .头像 {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
      width: 44px;
      height: 44px;
      border: 2px solid #ffffff;
      background: #ffffff;
      border-radius: 8px;
      img {
        border: 1px solid #cccccc;
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
  }
  .文本1 {
    color: rgba(229, 229, 229, 1);
    font-size: 12px;
    padding: 9px 0px;
  }
}

.分享显示框 {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  .内容 {
    width: 245px;
    position: relative;
    .关闭 {
      width: 36px;
      height: 36px;
      background: #ffffff;
      color: #999999;
      text-align: center;
      line-height: 36px;
      position: absolute;
      right: 0px;
      top: -50px;
      border-radius: 100%;
      ::after {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: -14px;
        margin: auto;
        height: 14px;
        width: 1px;
        content: "";
        background: #ffffff;
      }
    }
    .图片容器 {
      img {
        width: 100%;
      }
    }
    .文本 {
      height: 35px;
      line-height: 35px;
      color: rgba(56, 56, 56, 1);
      background-color: rgba(255, 255, 255, 1);
      font-size: 14px;
      border-radius: 35px;
      margin: 11px 0px;
      text-align: center;
    }
  }
}
</style>
