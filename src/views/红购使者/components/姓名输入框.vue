<template>
    <form class="姓名输入框" @submit.prevent="提交()">
    <!-- <form class="input_name" @submit.prevent="Submission()" :class="{'active':input_name_box}"> -->
        <div class="mask" @click="设置姓名输入框(false)"></div>
        <ul class="">
            <li>该手机号对应多个账号，请输入真实姓名。</li>
            <li>
                <input type="text" v-model="姓名" required placeholder="请输入真实姓名">
            </li>
            <li>
                <button type="submit">确定</button>
            </li>
        </ul>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "",
  data() {
    return {
      姓名: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      设置姓名输入框: "红购使者/红购使者/设置姓名输入框",
      开始提现: "红购使者/提现/开始提现"
    }),
    提交() {
      this.设置姓名输入框(false);
      this.开始提现(["", this.姓名]);
    }
  }
};
</script>

<style lang="scss" scoped>
.姓名输入框 {
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 11;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
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
</style>
