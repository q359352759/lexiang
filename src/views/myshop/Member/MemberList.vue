<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">会员详情</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1 mui-clearfix">
                <li class="mui-pull-left">今日新增：{{今日新增}}人</li>
                <li class="mui-pull-left mui-text-center">本月：{{本月新增}}人</li>
                <li class="mui-pull-left mui-text-right">累计：{{顾客.total}}人</li>
            </ul>
            <div class="过滤">
                <div class="排序">
                    <sort :list="排序" type="1" sortType="1" @setSort="getSort"/>
                </div>
                <div class="输入框">
                    <input type="text" placeholder="会员电话" >
                    <i class="icon iconfont icon-chazhao"></i>
                </div>
            </div>
            
            <ul class="列表">
                <li class="头部">
                    <div>日期</div>
                    <div>会员名</div>
                    <div>推荐人</div>
                    <div>累计消费</div>
                    <div>评价</div>
                </li>
            </ul>
            <div class="内容区" @scroll="滚动($event)">
                <ul class="列表" >
                    <li v-for="(item, index) in 顾客.list" :key="index" @click="$router.push('/myshop/Member/xiaofeijilu?userid='+item.userid)">
                        <div>{{item.createTime | filter_time}}</div>
                        <div>{{item.USERNAME | filter_name}}</div>
                        <div class="蓝色">{{item.REALNAME | filter_name}}</div>
                        <div class="蓝色">{{item.PAYMENTAMOUNT}}</div>
                        <div class="蓝色">0条</div>
                    </li>
                </ul>
                <loading :loadingtype="顾客.loading" :end="!顾客.loading && 顾客.list.length>=顾客.total && 顾客.total!=0" :nodata="!顾客.loading && 顾客.total==0"/>
            </div>

        </div>
    </div>
</template>

<script>
import loading from "@/components/loading.vue";
import sort from "@/components/sort.vue";
import { mapGetters, mapActions } from "vuex";
import { openloading, dateFtt } from "@/assets/js/currency.js";
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";

export default {
  name: "",
  components: {
    sort,
    loading
  },
  data() {
    return {
      排序: [{ name: "时间", type: 1 }, { name: "消费", type: 2 }],
      顾客: {
        query: {
          start: 0,
          length: 10,
          shopid: "",
          order: "createTime", //PAYMENTAMOUNT 消费 createTime 时间
          orderType: "DESC" //ASC DESC
        },
        list: [],
        total: 0,
        loading: false,
        paget_index: 0
      },
      今日新增: 0,
      本月新增: 0
    };
  },
  computed: {
    ...mapGetters({
      myshop: "get_myshop"
    })
  },
  filters: {
    filter_time(time) {
      if (!time) return time;
      return dateFtt(time, "yyyy.MM.dd");
    },
    filter_name(name) {
      try {
        return b64DecodeUnicode(name);
      } catch (error) {
        return name;
      }
    }
  },
  methods: {
    ...mapActions({
      getMyshop: "getMyshop"
    }),
    getSort(x) {
      console.log(x);
      this.顾客.list = [];
      this.顾客.paget_index = 0;
      this.顾客.query.order = x.type == 1 ? "createTime" : "PAYMENTAMOUNT";
      this.顾客.query.orderType = x.sort_type == 1 ? "DESC" : "ASC";
      this.获取顾客();
    },
    获取顾客() {
      this.顾客.query.start = this.顾客.query.length * this.顾客.paget_index;
      this.顾客.query.shopid = this.myshop.shopid;
      this.顾客.loading = true;
      this.$axios
        .get("/api-s/shops/findShopCustomerAll", { params: this.顾客.query })
        .then(x => {
          console.log("获取店铺顾客", x);
          if (x.data.code == 200) {
            this.顾客.loading = false;
            this.顾客.list = this.顾客.list.concat(x.data.data.data);
            this.顾客.total = x.data.data.total;
          }
        })
        .catch(err => {
          this.顾客.loading = false;
        });
    },
    滚动(e) {
      var h = e.target.offsetHeight; //容器高度
      var sh = e.target.scrollHeight; //滚动条总高
      var t = e.target.scrollTop; //滚动条到顶部距离
      if (
        h + t >= sh - 10 &&
        !this.顾客.loading &&
        this.顾客.list.length < this.顾客.total
      ) {
        console.log("滚动到动力部");
        this.顾客.paget_index++;
        this.获取顾客();
      }
    },
    获取今日新增() {
      this.$axios
        .get("/api-s/shops/countTodayshopCustomer/" + this.myshop.shopid)
        .then(x => {
          console.log("获取今日新增", x);
          if (x.data.code == 200) {
            this.今日新增 = x.data.data;
          }
        })
        .catch(err => {});
    },
    获取本月新增() {
      this.$axios
        .get("/api-s/shops/countMounthCustomer/" + this.myshop.shopid)
        .then(x => {
          if (x.data.code == 200) {
            this.本月新增 = x.data.data;
          }
        })
        .catch(err => {});
    },
    async shopinit() {
      openloading(true);
      await this.getMyshop();
      openloading(false);
      this.获取顾客();
      this.获取今日新增();
      this.获取本月新增();
    }
  },
  mounted() {
    if (this.myshop && this.myshop.shopid) {
      this.获取顾客();
      this.获取今日新增();
      this.获取本月新增();
    } else {
      this.shopinit();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-content {
  display: flex;
  flex-direction: column;
}
.内容区 {
  flex-grow: 1;
  overflow: auto;
}

.box_1 {
  flex-shrink: 0;
  height: 38px;
  line-height: 38px;
  margin: 5px 0px;
  background: #ffffff;
  font-size: 14px;
  color: rgba(80, 80, 80, 1);
  padding: 0px 15px;
  li {
    width: calc(100% / 3);
  }
}
.过滤 {
  flex-shrink: 0;
  background: #ffffff;
  height: 38px;
  padding: 0px 10px;
  margin: 0px 0px 3px;
  display: flex;
  align-items: center;
  .排序 {
    flex-grow: 1;
  }
  .输入框 {
    width: 125px;
    height: 24px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(246, 246, 246, 1);
    border-radius: 2px;
    input {
      padding: 0px;
      margin: 0px;
      height: 100%;
      border: none;
      font-size: 14px;
      padding: 0px 0px 0px 10px;
    }
  }
}

.列表 {
  flex-shrink: 0;
  overflow: auto;
  li {
    display: flex;
    div {
      height: 34px;
      width: 20%;
      line-height: 34px;
      font-size: 12px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-left: 1px solid #fbfbfb;
    }
    div:nth-child(1) {
      border-left: none;
    }
  }
  li:nth-child(2n-1) {
    background: #ffffff;
  }
  li.头部 {
    background: $header_background;
    color: #ffffff;
  }
  .蓝色 {
    color: #1584fe;
  }
}
</style>
