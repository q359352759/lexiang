<template>
    <div class="提现提示">
        <div class="内容">
            <div class="标题">提现</div>
            <ul class="提现列表">
                <li v-for="(item, index) in list" :key="index">
                    <div>{{item.名称}}：{{item.金额}}元</div>
                    <div>
                        <span v-if="item.type==0" class="不能提现">{{item.提示}}</span>
                        <img v-if="item.type==1" class="加载中" src="image/jiazaizhong.gif" alt="" srcset="">
                        <span v-if="item.type==2" class="成功">{{item.提示}}</span>
                        <span v-if="item.type==3" class="失败">{{item.提示}}</span>
                        <span v-if="item.type==4" class="待审核">{{item.提示}}</span>
                    </div>
                </li>
            </ul>
            <div class="按钮">
                <btn @click.native="关闭()" :styles="{'background-color':ok ? '' : '#a6a6a6'}" value="我知道了"/>
            </div>
        </div>
    </div>
</template>

<script>
import btn from "@/components/button.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "",
  props: {
    list: {
      default: []
    },
    ok: {
      //是否可以继续
      default: false
    }
  },
  components: {
    btn
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      提现完成: "红购使者/提现/提现完成"
    })
  },
  methods: {
    ...mapActions({
      设置显示提现框: "红购使者/提现/设置显示提现框"
    }),
    关闭() {
      if (this.提现完成) {
        this.设置显示提现框(false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.提现提示 {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  .内容 {
    width: 240px;
    left: 67px;
    top: 197px;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 16px;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
  }
  .标题 {
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    font-weight: bold;
    padding: 10px 0px;
  }
  .提现列表 {
    margin: 0px 0px 30px;
    li {
      padding: 4px 18px;
      display: flex;
      align-items: center;
      color: rgba(80, 80, 80, 1);
      font-size: 12px;
      > div:nth-child(1) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > div:nth-child(2) {
        text-align: right;
        flex-grow: 1;
      }
      .加载中 {
        width: 14px;
        height: 14px;
        vertical-align: center;
      }
      .不能提现 {
        color: #e5e5e5;
      }
      .成功 {
        color: #04a25b;
      }
      .失败 {
        color: #e33c64;
      }
      .待审核 {
        color: #ff8d1a;
      }
    }
  }
  .按钮 {
    margin: 0px 0px 20px;
  }
}
</style>
