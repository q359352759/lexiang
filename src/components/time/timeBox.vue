<template>
    <div>
        <ul class="Time" @click="GeneralTime_show=true">
            <li class="time">
                <span v-show="!time">请选择时间</span>
                <span v-if="time && time.type==0">{{time.year+'-'+time.month}}</span>
                <span v-if="time && time.type==1">{{time.month+'-'+time.day}}</span>
                <span v-if="time && time.type==1">~{{time.end_month ? time.end_month+'-'+time.end_day : ''}}</span>
            </li>
            <li class="icon_box">
                <i class="icon iconfont icon-calendar"></i>
            </li>
        </ul>
        <GeneralTime v-show="GeneralTime_show" @setTime="get_time"/>
    </div>    
</template>

<script>
import GeneralTime from "@/components/time/GeneralTime.vue";
export default {
  name: "",
  components: {
    GeneralTime
  },
  data() {
    return {
      time: "",
      GeneralTime_show: false
    };
  },
  methods: {
    get_time(x) {
      this.GeneralTime_show = false;
      if (x) {
        this.time = x;
        this.$emit("setTime", x);
      }
    },
    xuanzheshijian() {
      this.GeneralTime_show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.Time {
  border: 1px solid #f6f6f6;
  min-width: 120px;
  height: 26px;
  padding: 0px 5px;
  .time {
    color: rgba(80, 80, 80, 1);
    font-size: 12px;
    flex-grow: 1;
  }
  .icon_box {
    height: 17px;
  }
  display: flex;
  align-items: center;
}
</style>
