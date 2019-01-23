<template>
    <div class="dialog">
        <div class="content_1">
            <div class="title">提示</div>
            <ul class="cont">
                <li>尊敬的用户，您好！</li>
                <li>小二在此恭候多时了，很高兴能为你讲解一下“红包乐购”的好处。</li>
                <li>1、这是一个全城促销信息发布平台，也是一个红包促销购物平台。</li>
                <li>2、你可以在此平台查找全城所有的商家促销信息，先领取红包再去抵扣付款，可以立即省钱。</li>
                <li>3、注册领取20元红包。</li>
                <li>4、会员中心->推荐有奖->邀请好友注册得20元红包。</li>
                <li>5、更多相关问题可到会员中心的右上角，点击“帮助”查看了解。</li>
            </ul>
            <div class="tishi">
                <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <div>不再提示</div>
            </div>
            <ul class="btn_1">
                <li>
                    <span @tap="help()">了解更多</span>
                </li>
                <li>
                    <span @click="zhidaole()">我知道了</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      radio_type_2: false,
      userInfo: ""
    };
  },
  methods: {
    change_radio_2() {
      this.radio_type_2 = !this.radio_type_2;
    },
    zhidaole() {
      // console.log(new Date("2018-12-12 11:40").getTime());
      // console.log(new Date('2018-12-12 13:40').getTime());
      // console.log(new Date('2018-12-12 13:40').getTime()-new Date('2018-12-12 11:40').getTime());
      // 2 小时
      // console.log((new Date('2018-12-12 13:40').getTime()-new Date('2018-12-12 11:40').getTime())/1000/60/60)
      var obj = {
        userid: this.userInfo ? this.userInfo.username : "", //用户Id 没有id 表示游客
        time: new Date().getTime(),
        Tips: this.radio_type_2 //false 表示需要再提示 true 表示不再提示;
      };
      localStorage.homeDialog = JSON.stringify(obj);
      this.$emit("setHomeDialog", 1);
    },
    help() {
      this.$router.push("/help");
    }
  },
  mounted() {
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    } catch (error) {}
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.36);
  z-index: 12;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .content_1 {
    background: #ffffff;
    width: 2.87rem;
    border-radius: 12px;
  }
  .title {
    height: 43px;
    line-height: 43px;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
  }
  .cont {
    padding: 0px 15px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    li {
      text-indent: 15px;
    }
  }
  .tishi {
    display: flex;
    align-items: center;
    padding: 14px 0px 0px 38px;
    color: rgba(128, 128, 128, 1);
    font-size: 14px;
    > div {
      margin: 0px 5px 0px 0px;
    }
  }
  .btn_1 {
    display: flex;
    text-align: center;
    color: rgba(0, 122, 255, 1);
    font-size: 14px;
    line-height: 55px;
    li {
      width: 50%;
    }
  }
}
</style>
