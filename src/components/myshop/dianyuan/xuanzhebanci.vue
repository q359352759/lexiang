<template>
    <div class="Banci">
        <div class="mask" @click="close()"></div>
        <ul>
            <li v-for="(item, index) in 当前考勤时间" :key="index">
                <div @click="选择班次(item,index)" class="radio_1" :class="{'active':选中班次==item}">
                    <i class="icon iconfont icon-xuanze"></i>
                </div>
                <div @click="选择班次(item,index)" v-if="班次.length>0 && 班次[0].schedulingtype==1">
                    <span>固定班次（{{item.officehours}}-{{item.quittingtime}}）</span>
                </div>
                <div @click="选择班次(item,index)" v-if="班次.length>0 && 班次[0].schedulingtype==2">
                    <span v-if="index==0">早班（{{item.officehours}}-{{item.quittingtime}}）</span>
                    <span v-if="index==1">晚班（{{item.officehours}}-{{item.quittingtime}}）</span>
                </div>
                <div @click="选择班次(item,index)" v-if="班次.length>0 && 班次[0].schedulingtype==3">
                    <span v-if="index==0">早班（{{item.officehours}}-{{item.quittingtime}}）</span>
                    <span v-if="index==1">中班（{{item.officehours}}-{{item.quittingtime}}）</span>
                    <span v-if="index==2">晚班（{{item.officehours}}-{{item.quittingtime}}）</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      选中班次: ""
    };
  },
  computed: {
    ...mapGetters({
      当前考勤时间: "myshops/班次/当前考勤时间",
      班次: "myshops/班次/班次"
    })
  },
  methods: {
    选择班次(item, index) {
      this.选中班次 = item;
      this.$emit("setbancishow", false, item, index);
    },
    close() {
      this.$emit("setbancishow", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.Banci {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  .mask {
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
  }
  ul {
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 0px;
    background: #ffffff;
    padding: 0px 0px 40px 0px;
    > li {
      display: flex;
      align-items: center;
      padding: 15px 20px 12px;
      .radio_1 {
        margin: 0px 8px 0px 0px;
      }
    }
  }
}
</style>
