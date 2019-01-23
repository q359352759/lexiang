<template>
    <div id="Collection">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">卡券包</h1>
            <span class="lingdang" @tap="news()">
                <!-- <span>2</span> -->
                <i class="icon iconfont icon-lingdang"></i>
            </span>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li :class="{'active':type==0}" @tap="select_type(0)">
                    <div>签到红包</div>
                    <div>￥0</div>
                </li>
                <li  :class="{'active':type==1}" @tap="select_type(1)">
                    <div>平台红包</div>
                    <div>￥{{user_invited_sutotal.amount ? user_invited_sutotal.amount : 0}}</div>
                </li>
                <li  :class="{'active':type==2}" @tap="select_type(2)">
                    <div>店铺红包</div>
                    <div>￥{{findStotal_2}}</div>
                </li>
                <li  :class="{'active':type==3}" @tap="select_type(3)">
                    <div>商品红包</div>
                    <div>￥{{findStotal_3}}</div>
                </li>
            </ul>
            
            <div class="conent_1" @scroll="scroll($event)">

                <!-- 签到红包 -->
                <!-- <div v-if="type==0">
                    <qiandao :obj="{'name':'红包乐购官方'}"/>
                </div>
                <div class="box_2" v-if="type==0">
                    <ul>
                        <li>推荐</li>
                        <li v-for="(item, index) in shops_tree_list" :key="index">{{item.name}}</li>
                    </ul>
                    <div>去使用</div>
                </div>
                <div v-if="type==0" v-for="(item, index) in 0" :key="index">
                    <qiandao :obj="{'name':'邹氏菜川馆'}"/>
                </div> -->
                
                <loading v-show="type==0" :nodata="true"/>


                <!-- 平台红包 -->
                <ul class="Red_envelopes" v-if="type==1">
                    <li v-for="(item, index) in invitedrecord.list" :key="index">
                        <div class="header_1">
                            <span class="time_1 mui-pull-right">{{item.createtime | filter_time}}</span>
                            <span class="title_1">红包乐购官方</span>
                        </div>
                        <ul class="item">
                            <li class="img_box">
                                <img src="image/hongbao_1.png" alt="" srcset="">
                            </li>
                            <li>
                                <div class="title_1">
                                    <span class="money">{{item.amount}}元</span>
                                    <span class="type"></span>
                                </div>
                                <div class="title_2">
                                    {{item.name}}
                                </div>
                                <div class="time_2">
                                    长期有效
                                </div>
                            </li>
                            <li>
                                <div></div>
                                <div></div>
                            </li>
                            <li>
                                <div class="type_2">已到账</div>
                                <!-- <div v-show="index%2!=0" class="type_1">红色</div>
                                <div v-show="index%2==0" class="type_2">灰色</div>
                                <span  v-show="index%2!=0" class="time_1">2018.12.01</span> -->
                            </li>
                        </ul>
                    </li>
                </ul>
                
                <loading v-show="type==1" :loadtype="invitedrecord.loading"  :end="!invitedrecord.loading && invitedrecord.total==invitedrecord.list.length && invitedrecord.total!=0" :nodata="!invitedrecord.loading && invitedrecord.total==0"/>
               

                <!-- 店铺红包 -->
                <ul class="Red_envelopes" v-show="type==2">
                    <li v-for="(item, index) in CardPackge_0.list" :key="index">
                        <div class="header_1">
                            <span class="time_1 mui-pull-right">{{item.pgCreateTime | filter_time}}</span>
                            <span class="title_1" @tap="go_shop_1(item)">{{item.sName}}</span>
                        </div>
                        <ul class="item">
                            <li class="img_box">
                                <img :src="item.sSignboard" alt="" srcset="">
                            </li>
                            <li>
                                <div class="title_1">
                                    <span class="money">{{item.redType==0 ? item.amount : item.redAmount}}元</span>
                                    <span class="type">{{item.redHeadline}}</span>
                                </div>
                                <div class="title_2">
                                    <span v-if="item.redDeductionType==1">每满{{item.redExpire}}元，可抵扣{{item.redDeduction}}元</span>
                                    <span v-if="item.redDeductionType==0">抵扣{{item.redPercentage}}%</span>                                    
                                </div>
                                <div class="time_2">
                                    <span v-if="item.redType==0">长期有效</span>
                                    <span v-if="item.redType==2 || item.redType==3 || item.redType==4">
                                        {{item.redStratTime | filter_time("yyyy.MM.dd")}}-{{item.redEndTime | filter_time("yyyy.MM.dd")}}
                                    </span>
                                    <!-- 生日红包 -->
                                    <span v-if="item.redType==5">{{item.startTime | filter_time("yyyy.MM.dd")}}-{{item.endTime | filter_time('yyyy.MM.dd')}}</span>
                                </div>
                            </li>
                            <li>
                                <div></div>
                                <div></div>
                            </li>
                            <li>
                                <!-- 生日红包 -->
                                <div v-if="item.redType==5">
                                    <div v-if="item.state==1" class="type_2">已使用</div>
                                    <span v-if="item.state==1" class="time_1">{{item.pgUpdateTime | filter_time}}</span>
                                    <div v-if="item.state==0 && item.endTime>date" class="type_1">有效</div>
                                    <div v-if="item.state==0 && item.endTime<date" class="type_2">失效</div>
                                </div>

                                <!-- 长期有效 新人红包 -->
                                <div v-if="item.redType==0">
                                    <div v-if="item.state==0 && item.amount!=0" class="type_1">有效</div>
                                    <div v-if="item.state==0 && item.amount==0" class="type_2">已用完</div>
                                    <div v-if="item.state==1" class="type_2">已使用</div>
                                    <span v-if="item.state==1" class="time_1">{{item.updateTime | filter_time}}</span>
                                </div>
                                <!-- 有时间限制类型的 -->
                                <div v-if="item.redType==2 || item.redType==3  || item.redType==4">
                                    <div v-if="item.state==1" class="type_2">已使用</div>
                                    <span v-if="item.state==1" class="time_1">{{item.pgUpdateTime | filter_time}}</span>
                                    <div v-if="item.state==0 && item.redEndTime>date" class="type_1">有效</div>
                                    <div v-if="item.state==0 && item.redEndTime<date" class="type_2">失效</div>
                                </div>
                                
                            </li>
                        </ul>
                    </li>
                </ul>
                <loading v-show="type==2" :loadingtype="CardPackge_0.loading" :nodata="!CardPackge_0.loading && CardPackge_0.total==0" :end="!CardPackge_0.loading && CardPackge_0.total!=0 && CardPackge_0.list.length==CardPackge_0.total"/>

                <!-- 商品红包 -->
                <ul class="Red_envelopes" v-show="type==3">
                    <li v-for="(item, index) in CardPackge_1.list" :key="index">
                        <div class="header_1">
                            <span class="time_1 mui-pull-right">{{item.createTime | filter_time("yyyy.MM.dd hh:mm")}}</span>
                            <span class="title_1" @tap="go_shop(item)">{{item.shopName}}</span>
                        </div>
                        <ul class="item">
                            <li class="img_box">
                                <img v-if="item.img && item.img.split(',').length>0" :src="item.img.split(',')[0]" alt="" srcset="">
                            </li>
                            <li>
                                <div class="title_1">
                                    <span class="money">{{item.redAmount}}元</span>
                                    <span class="type">指定商品</span>
                                </div>
                                <div class="title_2" @tap="CommodityDetails(item)">
                                    {{item.commodityName}}
                                    <!-- 每满{{item.expire}}元，可抵扣{{item.deduction}}元 -->
                                </div>
                                <div class="time_2">
                                    {{item.redStratTime | filter_time("yyyy.MM.dd")}}-{{item.redEndTime | filter_time("yyyy.MM.dd")}}
                                </div>
                            </li>
                            <li>
                                <div></div>
                                <div></div>
                            </li>
                            <li>
                                <!-- <div class="type_2">已到账</div> -->
                                <div v-if="item.state==1" class="type_2">已使用</div>
                                <span v-if="item.state==1" class="time_1">{{item.updateTime | filter_time}}</span>

                                <div v-if="item.state==0 && item.redEndTime>date" class="type_1">有效</div>
                                <div v-if="item.state==0 && item.redEndTime<date" class="type_2">失效</div>
                                
                            </li>
                        </ul>
                    </li>
                </ul>

                <loading v-show="type==3" :loadingtype="CardPackge_1.loading" :nodata="!CardPackge_1.loading && CardPackge_1.total==0" :end="!CardPackge_1.loading && CardPackge_1.total!=0 && CardPackge_1.list.length==CardPackge_1.total"/>

            </div>

        </div>
    </div>
</template>

<script>
//签到红包样式
import qiandao from "@/components/qiandao.vue";

import { openloading, dateFtt } from "@/assets/js/currency.js";
import loading from "@/components/loading.vue";
export default {
  name: "",
  components: {
    qiandao,
    loading
  },
  data() {
    return {
      type: 0,
      type_1: 0, //0签到红包 1 签到记录
      userInfo: "",
      date: dateFtt(new Date(), "yyyy-MM-dd"),
      // 0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
      findStotal_2: 0,
      findStotal_3: 0,
      CardPackge_0: {
        //店铺红包      // 0新人店铺红包 2节日红包 4庆典红包 5生日红包
        loading: true,
        total: 0,
        list: [],
        page_index: 0,
        query: {
          start: 0,
          length: 10,
          type: 0,
          userid: ""
        }
      },
      CardPackge_1: {
        //商品红包
        loading: true,
        total: 0,
        list: [],
        page_index: 0,
        query: {
          start: 0,
          length: 10,
          type: 1,
          userid: ""
        }
      },
      user_invited_sutotal: {}, //平台红啊金额
      invitedrecord: {
        //平台红包记录
        loading: true,
        total: 0,
        list: [],
        page_index: 0,
        query: {
          start: 0,
          length: 10,
          // type:1,
          userid: "" //邀请人
        }
      }
    };
  },
  filters: {
    filter_time(time, type) {
      if (!time) return "";
      return dateFtt(time, type);
    }
  },
  computed: {
    shops_tree_list() {
      return this.$store.state.shops_tree_list;
    }
  },
  methods: {
    //跳转消息
    news() {
      this.$router.push("/news");
    },
    //店铺红包  跳转店铺
    go_shop_1(item) {
      this.$router.push("/BusinessDetails?shopid=" + item.sShopid);
    },
    //商品红包  跳转商店
    go_shop(item) {
      this.$router.push("/BusinessDetails?shopid=" + item.redShopid);
    },
    //商品红包 跳转到商品
    CommodityDetails(item) {
      this.$router.push(
        "/commodity/CommodityDetails?id=" + item.redCommodityId + "&isshop=1"
      );
    },
    //选择 签到红包 平台红包  店铺红包 商品红包
    select_type(x) {
      this.type = x;
    },
    //滚动条
    scroll(e) {
      var h = e.target.offsetHeight; //容器高度
      var sh = e.target.scrollHeight; //滚动条总高
      var t = e.target.scrollTop; //滚动条到顶部距离
      if (h + t >= sh - 10) {
        if (this.type == 0) {
        } else if (this.type == 1) {
        } else if (this.type == 2) {
          //店铺红包
          if (
            !this.CardPackge_0.loading &&
            this.CardPackge_0.list.length < this.CardPackge_0.total
          ) {
            this.CardPackge_0.page_index++;
            this.get_findDataAUserCardPackge();
          }
        } else if (this.type == 3) {
          //商品红包
          if (
            !this.CardPackge_1.loading &&
            this.CardPackge_1.list.length < this.CardPackge_1.total
          ) {
            this.CardPackge_1.page_index++;
            this.get_CardPackge();
          }
        }
        console.log("到底底部");
      }
    },
    //签到红包 签到记录
    select_type_1(x) {
      this.type_1 = x;
    },
    // 查询以领取的商品红包
    get_CardPackge(obj) {
      obj.loading = true;
      obj.query.start = obj.query.length * obj.page_index;
      obj.query.userid = this.userInfo.username;
      this.$axios({
        method: "get",
        url: "/api-s/shops/findDataUserCardPackge",
        params: obj.query
      })
        .then(x => {
          console.log("商品红包", x);
          if (x.data.code == 200) {
            obj.list = x.data.data.data;
            obj.total = x.data.data.total;
          }
          obj.loading = false;
        })
        .catch(err => {
          console.log(err);
          obj.loading = false;
        });
    },
    //查询店铺红包 卡券包专用
    get_findDataAUserCardPackge() {
      this.CardPackge_0.loading = true;
      this.CardPackge_0.query.start =
        this.CardPackge_0.query.length * this.CardPackge_0.page_index;
      this.CardPackge_0.query.userid = this.userInfo.username;
      this.$axios({
        method: "get",
        url: "/api-s/shops/findDataAUserCardPackge",
        params: this.CardPackge_0.query
      })
        .then(x => {
          console.log("店铺红包", x);
          if (x.data.code == 200) {
            this.CardPackge_0.list = this.CardPackge_0.list.concat(
              x.data.data.data
            );
            this.CardPackge_0.total = x.data.data.total;
          }
          this.CardPackge_0.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.CardPackge_0.loading = false;
        });
    },
    // 获取金额
    get_findStotal(type) {
      var url = "";
      if (type == 0) {
        url = "/api-s/shops/findStotal?aaa=1&userid=" + this.userInfo.username;
      } else if (type == 1) {
        url = "/api-s/shops/findStotal?bbb=1&userid=" + this.userInfo.username;
      }
      this.$axios({
        method: "get",
        // url:'/api-s/shops/findStotal?type='+type+'&userid='+this.userInfo.username
        url: url
      })
        .then(x => {
          console.log("获取金额", x);
          if (x.data.code == 200) {
            if (type == 0) {
              this.findStotal_2 = x.data.data;
            } else {
              this.findStotal_3 = x.data.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取平台红包金额
    get_invitedsutotal() {
      this.$request(
        "/api-u/users/invitedsutotal/findByUserid/" + this.userInfo.username,
        "",
        "get"
      )
        .then(x => {
          console.log("获取平台红包金额", x);
          if (x.data.code == 200 && x.data.data) {
            this.user_invited_sutotal = x.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取平台红包记录
    get_invitedrecord() {
      this.invitedrecord.loading = true;
      this.invitedrecord.query.start =
        this.invitedrecord.page_index * this.invitedrecord.query.length;
      this.invitedrecord.query.userid = this.userInfo.username;
      this.$request(
        "/api-u/users/invitedrecord/findAll",
        this.invitedrecord.query,
        "get"
      )
        .then(x => {
          console.log("平台红包记录", x);
          if (x.data.code == 200) {
            this.invitedrecord.total = x.data.data.total;
            this.invitedrecord.list = x.data.data.data;
          }
          this.invitedrecord.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.invitedrecord.loading = false;
        });
    }
  },
  beforeCreate: function() {
    // console.group('------beforeCreate创建前状态------');
  },
  created: function() {
    // console.group('------created创建完毕状态------');
  },
  beforeMount: function() {
    // console.group('------beforeMount挂载前状态------');
  },
  mounted: function() {
    //获取服务列表
    this.$store.commit("setShopTree");
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    } catch (error) {}
    //店铺红包
    // this.get_CardPackge(this.CardPackge_0);
    this.get_findDataAUserCardPackge();
    //商品红包
    this.get_CardPackge(this.CardPackge_1);

    //获取金额
    this.get_findStotal(0); //店铺红包统计
    this.get_findStotal(1); //商品红包统计
    //获取平台红包金额
    this.get_invitedsutotal();
    //获取平台红包记录
    this.get_invitedrecord();

    // console.group('------mounted 挂载结束状态------');
  },
  beforeUpdate: function() {
    // console.group('beforeUpdate 更新前状态===============》');
  },
  updated: function() {
    // console.group('updated 更新完成状态===============》');
  },
  beforeDestroy: function() {
    // console.group('beforeDestroy 销毁前状态===============》');
  },
  destroyed: function() {
    // console.group('destroyed 销毁完成状态===============》');
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar-nav {
  box-shadow: none;
  .lingdang {
    position: absolute;
    font-size: 20px;
    color: #ffffff;
    right: 15px;
    top: 12px;
    span {
      position: absolute;
      top: -3px;
      right: -3px;
      background: #d43030;
      min-width: 12px;
      height: 12px;
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      border-radius: 12px;
    }
  }
}

.mui-content {
  display: flex;
  flex-direction: column;
}

.conent_1 {
  overflow: auto;
}

.box_1 {
  flex-shrink: 0;
  display: flex;
  background: $header_background;
  color: #ffffff;
  font-size: 14px;
  justify-content: space-between;
  text-align: center;
  padding: 0px 0.35rem;
  li {
    > div:nth-child(1) {
    }
    > div:nth-child(2) {
      font-weight: bold;
    }
  }
  li.active {
    color: #ffc300;
    border-bottom: 2px solid #ffc300;
  }
}

.box_2 {
  display: flex;
  height: 40px;
  background: #ffffff;
  align-items: center;
  margin: 3px 0px 0px;
  ul {
    margin: 0px 5px 0px 17px;
    flex-grow: 1;
    white-space: nowrap;
    > li {
      display: inline-block;
      margin: 0px 14px 0px 0px;
      color: rgba(80, 80, 80, 1);
      font-size: 12px;
    }
    overflow: auto;
  }
  > div {
    flex-shrink: 0;
    height: 26px;
    line-height: 26px;
    width: 50px;
    text-align: center;
    color: rgba(0, 122, 255, 1);
    font-size: 10px;
    border-left: 1px solid rgba(229, 229, 229, 1);
  }
}

// 红包用
.Red_envelopes {
  padding: 0.07rem 0.13rem;
  > li {
    background: #ffffff;
    padding: 1px 0px;
    border-radius: 5px;
    margin: 0px 0px 8px 0px;
  }
  .header_1 {
    padding: 7px 10px 5px 18px;
    line-height: 14px;
    .title_1 {
      color: rgba(80, 80, 80, 1);
      font-size: 14px;
    }
    .time_1 {
      color: rgba(166, 166, 166, 1);
      font-size: 12px;
    }
  }
  .item {
    margin: 0px 11px 7px;
    background-color: rgba(255, 243, 243, 1);
    border-radius: 5px;
    display: flex;
    padding: 9px 0px;
    > li:nth-child(1) {
      flex-shrink: 0;
      margin: 0px 11px 0px 7px;
      width: 50px;
      height: 50px;
      font-size: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    > li:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
      .title_1 {
        .money {
          color: rgba(212, 48, 48, 1);
          font-size: 14px;
        }
        .type {
          margin: 0px 0px 0px 6px;
          color: rgba(212, 48, 48, 1);
          font-size: 10px;
        }
      }
      .title_2 {
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
      }
      .time_2 {
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
      }
    }
    > li:nth-child(3) {
      flex-shrink: 0;
      width: 1px;
      border-left: 1px dashed #ff5733;
      position: relative;
      div {
        width: 15px;
        height: 15px;
        background: #ffffff;
        border-radius: 100%;
        position: absolute;
        left: -8px;
      }
      > div:nth-child(1) {
        top: -15px;
      }
      > div:nth-child(2) {
        bottom: -15px;
      }
    }
    > li:nth-child(4) {
      width: 74px;
      text-align: center;
      // align-items: center;
      display: flex;
      // flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      .type_1 {
        width: 100%;
        color: rgba(212, 48, 48, 1);
        font-size: 14px;
      }
      .type_2 {
        width: 100%;
        color: rgba(166, 166, 166, 1);
        font-size: 14px;
      }
      .time_1 {
        width: 100%;
        color: rgba(166, 166, 166, 1);
        font-size: 10px;
        line-height: 10px;
      }
    }
  }
}
</style>
