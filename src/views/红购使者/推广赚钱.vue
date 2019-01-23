<template>
    <div class="推广赚钱">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">推广赚钱</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="红包">
                <img src="image/honggou4.png" class="背景" alt="" srcset="">
                <img src="image/honggou5.png" @click="邀请好友()" class="按钮" alt="" srcset="">
                <div class="秘籍">
                    <span @click="$router.push('/shizhe/zhuanqianmiji')">《赚钱秘籍》</span>
                </div>
            </div>
            <ul class="介绍">
                <li>
                    <div class="icon_box">
                        <i class="icon iconfont icon-fensi"></i>
                    </div>
                    <div class="text_1">推广会员</div>
                    <div class="text_1">可赚取10000元奖金!!!</div>
                    <div class="text_2 margin_8">每邀请一个会员</div>
                    <div class="text_2">注册奖励10元分润</div>
                </li>
                <li>
                    <div class="icon_box">
                        <i class="icon iconfont icon-jinrudianpu"></i>
                    </div>
                    <div class="text_1">推广商家</div>
                    <div class="text_1">可赚取30000元奖金!!!</div>                    
                    <div class="text_2 margin_8">每邀请一个商家</div>
                    <div class="text_2">入驻奖励1000~5000元分润</div>
                </li>
            </ul>

            
        </div>

        <div class="生成容器" ref="生成容器">
            <div class="标题">
                <div class="标题1">
                    <span v-if="userInfo && !实名信息">{{userInfo.nickname}}</span>
                    <span v-if="实名信息">{{实名信息.name}}</span>
                    <span>邀你来赚取</span>
                    <span class="钱">4万</span>
                    <span>元外快</span>
                </div>
                <div class="半圆"></div>
            </div>
            <div class="提示">免费注册、免费成为“红购使者”</div>
            <div class="提示">零成本，轻松赚外快!!!</div>
            <div class="图片容器">
                <div class="二维码容器" ref="二维码容器">
                    <img src="image/43.png" alt="" srcset="">
                </div>
                <div class="头像">
                    <img v-if="头像base64" :src="头像base64" alt="" srcset="">
                    <img v-if="!头像base64" src="image/WechatIMG311.png" alt="" srcset="">
                </div>
            </div>
            <div class="半圆图片">
                <img src="image/honggou6.png" alt="" srcset="">
            </div>
            <div class="文本1">长按图片，点击“识别图中二维码”</div>
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
import { openloading } from "@/assets/js/currency.js";

import { mapActions, mapGetters } from "vuex";
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
      实名信息: "实名认证/实名信息"
    })
  },
  methods: {
    邀请好友() {
      console.log("邀请好友");
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.推广赚钱 {
  background: $header_background;
  height: 100%;
}
.mui-bar {
  background: none;
  box-shadow: none;
}
.mui-content {
  background: none;
}
.红包 {
  width: 2.66rem;
  height: 3.6rem;
  margin: 0px auto;
  position: relative;
  .背景 {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .按钮 {
    position: absolute;
    top: 2.3rem;
    width: 1rem;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .秘籍 {
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 44px;
    text-align: center;
    color: rgba(255, 235, 59, 1);
    font-size: 12px;
  }
}

.介绍 {
  display: flex;
  text-align: center;
  color: #ffffff;
  margin: 38px 0px 50px 0px;
  > li {
    width: 50%;
  }
  .icon_box {
    margin: 0px 0px 13px;
    i {
      font-size: 40px;
    }
  }
  .text_1 {
    font-size: 12px;
  }
  .text_2 {
    font-size: 10px;
  }
  .margin_8 {
    margin: 8px 0px 0px;
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
  padding: 0px 0px 6px;
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
    margin: 4px 0px 6px;
    text-shadow: rgba(0, 0, 0, 0.5) 0px 2px 2px;
    font-size: 13px;
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
    font-size: 12px;
    position: relative;
    z-index: 1;
    .钱 {
      font-weight: bold;
      color: rgba(255, 195, 0, 1);
      font-size: 28px;
    }
  }
  .图片容器 {
    margin: 0px auto 0px;
    width: 113px;
    height: 113px;
    background: #ffffff;
    border-radius: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 12px 0px rgba(212, 48, 48, 1);
    .二维码容器 {
      width: 76px;
      height: 76px;
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
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff;
      background: #ffffff;
      border-radius: 3px;
      img {
        border: 1px solid #cccccc;
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
  }
  .半圆图片 {
    width: 211px;
    margin: 0px auto;
    height: 35px;
    position: relative;
    img {
      width: 100%;
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
  }
  .文本1 {
    color: rgba(229, 229, 229, 1);
    font-size: 8px;
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
