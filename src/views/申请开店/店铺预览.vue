<template>
    <div >
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">店铺预览</h1>
            <span class="title_header_1">
                <div>
                    <i :class="{'icon-shoucangdianjihou shouchang':UserFavorite,'icon-shoucang1':!UserFavorite}" @click="无法点击('预览界面不能关注')" class="icon iconfont"></i>
                </div>
                <div @click="无法点击('预览界面不能分享')">
                    <i class="icon iconfont icon-fenxiang2"></i>
                </div>
            </span>
        </header>
        <div class="mui-content mui-fullscreen" >
            <ul class="box_1">
                <li>
                    <div class="title_1">{{店铺.name}}</div>
                    <div class="fenshu">5分</div>
                    <div>
                        <button @click="无法点击('预览界面不能关注')" class="maidan">买单</button>
                    </div>
                </li>
                <li>
                    <div class="time_1">营业时间：{{店铺.openTime}}-{{店铺.closeTime}}</div>
                </li>
                <li>
                    <div class="address">{{店铺.address}}</div>
                    <div>
                        <a class="phone" :href="'tel:'+店铺.phone"><i class="icon iconfont icon-dianhua"></i></a>
                    </div>
                    <div @tap="weixinmap()" class="juli">
                        <i class="icon iconfont icon-daohang"></i>
                        <span>{{juli | filter_juli}}</span>
                    </div>
                </li>
            </ul>
            
            <div class="box_6">
                <div class="left_1">
                    <div>
                        <div class="swiper-container swiper_type" ref="swiper_type">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(x, index) in swiper_type_list" :key="index">
                                    <div class="img"><img v-if="x.logo" :src="x.logo" alt="" srcset=""></div>
                                    <div class="name_1">{{x.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="swiper_type_list.length>6">
                        <i class="mui-icon mui-icon-forward"></i>
                    </div>
                </div>
                <ul class="right_1">
                    <li class="dangao" @click="无法点击('预览界面无此功能。')">
                        <img src="image/dangao.png" alt="" srcset="">
                    </li>
                    <li class="hongbao" @click="无法点击('预览界面无此功能。')">
                        <img src="image/hongbao_1.png" alt="" srcset="">
                    </li>
                </ul>
            </div>

            <ul class="box_7">
                <li>
                    <i class="icon iconfont icon-laba"></i>
                </li>
                <li>
                    <marquee class="noticeText ng-binding" direction="left" behavior="scroll" scrolldelay="20" truespeed scrollamount="1"  width="100%" style="width: 100%;">{{'恭喜'+店铺.name +'成功开通数字店铺'}}</marquee>
                </li>
            </ul>

            <div class="box_2">
                <div class="swiper-container swiper_img" ref="swiper_img">
                    <div class="swiper-wrapper">
                        <!-- <div class="swiper-slide"><img src="@/assets/image/1.png" alt=""></div> -->
                        <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                            <img @tap="fangda_img(index)" :src="x" alt="">
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>

            <div ref="box_3"></div>
            <ul class="box_3" :class="{'active':box_3_actvie}">
                <li><span @click="change_type(0)" :class="{'active':type_1==0}">专享</span></li>
                <li><span @click="change_type(1)" :class="{'active':type_1==1}">优购</span></li>
                <li><span @click="change_type(2)" :class="{'active':type_1==2}">评价</span></li>
                <li><span @click="change_type(3)" :class="{'active':type_1==3}">简介</span></li>
            </ul>
            <ul class="box_3" v-show="box_3_actvie">
                <li><span @click="change_type(0)" :class="{'active':type_1==0}">专享</span></li>
                <li><span @click="change_type(1)" :class="{'active':type_1==1}">优购</span></li>
                <li><span @click="change_type(2)" :class="{'active':type_1==2}">评价</span></li>
                <li><span @click="change_type(3)" :class="{'active':type_1==3}">简介</span></li>
            </ul>

            <!--专享-->
            <ul class="box_4" v-if="type_1==0">
                <div v-show="!是否有新人专享" class="没有新人专享">
                    <img src="image/15461558573731.png" alt="" srcset="">
                </div>
                <div v-show="!是否有生日专享" class="没有生日专享">
                    <img src="image/20181230154528.png" alt="" srcset="">
                </div>
            </ul>


            <ul class="box_5"  v-if="type_1==1">
                <li v-for="(item, index) in commodity.list" :key="index" @click="CommodityDetails(item)">
                    <div>
                        <div class="img_box">
                            <img v-if="item.img" :src="item.img.split(',')[0]" >
                        </div>
                        <h1>{{item.name}}</h1>
                        <div class="text_1">
                            <div class="xiaoshou">
                                <span>销</span>
                                <span>{{item.sales}}笔</span>
                            </div>
                            <div class="dikou">
                                <i class="icon iconfont icon-hongbao1"></i>
                                <span>抵扣:{{item.deduction}}元</span>
                            </div>
                        </div>
                        <div class="text_2">
                            <span class="xianjia">￥{{item.sellingPrice}}</span>
                            <s class="yuanjia">{{item.marketPrice}}</s>
                        </div>
                    </div>
                </li>
            </ul>
            <loading v-if="type_1==1" :nodata="true" text="该商家暂未发布优购商品"/>

            <div v-if="type_1==2">
                <li class="mui-text-center"></li>
            </div>
            <loading v-if="type_1==2" :nodata="true" :text="'暂无评论'"/>


            <ul v-if="type_1==3">
                <li v-if="synopsis && synopsis.remark" v-html="synopsis.remark"></li>
            </ul>

            <div class="swper_box" v-if="swperdome"  @tap="close_swper()">
                <div class="mask"></div>
                <div>
                    <swperdome :imglist="img_list" :index="swper_index"/>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";

import swperdome from "@/components/swperdome.vue";
import { openloading, bd_decrypt, getDateStr } from "@/assets/js/currency.js";
import loading from "@/components/loading.vue";

import fenxianghongbao from "@/components/home/myshop/fenxianghongbao.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "",
  components: {
    loading,
    swperdome,
    fenxianghongbao
  },
  data() {
    return {
      //分享进入店铺
      xinrenhongbao_box: false,
      isxinren: false, //是否领取了信任红包
      hongbaoid: "", //红包分享过来的
      fenxiang_hongbao: {},
      lingqu: false, //是否
      isfenxiang: false,

      swper_index: 0,
      swperdome: false,
      box_3_actvie: false,
      isCollection: false, //收藏
      // swiper_type:[], //服务类型列表
      swiper_type: "",
      type_list: [],
      type_1: 0,
      slider: "",
      id: "",
      shop: {},
      shopid: "",
      juli: "",
      commodity: {
        //商品
        start: 0,
        length: 10,
        state: 1, //已上架
        total: 0,
        list: [],
        loading: true,
        page_index: 0
      },
      synopsis: {}, //店铺简介
      shopAnnouncement: {}, //公告
      redenvelope_5: "", //生日红包
      userInfo: "", //用户信息
      UserFavorite: "", //用户收藏信息
      add_hongbao_obj: {
        //等待添加的红包对象
        userid: "", //红包id
        envelopeId: "",
        state: "0", //状态(使用等等)  0 刚领取
        type: 5,
        startTime: "", //生日使用有效期
        endTime: "",
        amount: 0 //红包金额 type=0 的时候需要
      },
      Exclusive: {
        //专享商品
        loading: true,
        list: []
      },

      qrcode: null,
      qrcode_show: false,
      erweima_base64: "",
      xingren_hongbao: {},
      // isfenxiang:false
      是否有新人专享: false,
      是否有生日专享: false
    };
  },
  computed: {
    ...mapGetters({
      state_isfenxiang: "shop/isfenxiang",
      店铺: "申请开店/店铺"
    }),
    img_list() {
      var img_list = this.店铺.environmentalImg
        ? this.店铺.environmentalImg.split(",")
        : [];
      return img_list;
    },
    //实名认证信息
    findByUserid() {
      return this.$store.state.findByUserid;
    },
    //过滤后的服务
    swiper_type_list() {
      if (this.type_list && this.店铺.serviceType) {
        var serviceType = this.店铺.serviceType.split(",");
        var type_list = this.type_list;
        var list = [];
        for (var i = 0; i < type_list.length; i++) {
          for (var j = 0; j < serviceType.length; j++) {
            if (type_list[i].id == serviceType[j]) {
              list.push(type_list[i]);
            }
          }
        }
        return list;
      } else {
        return [];
      }
    }
  },
  filters: {
    filter_juli(data) {
      return data.replace("米", "m").replace("公里", "km");
    }
  },
  methods: {
    ...mapActions({
      set_isfenxiang: "shop/set_isfenxiang"
    }),
    无法点击(x) {
      mui.toast(x ? x : "预览页面无此功能", { duration: "long", type: "div" });
    },
    //放大图片
    fangda_img(index) {
      this.swperdome = true;
      this.swper_index = index;
    },
    //关闭图片放大
    close_swper() {
      this.swperdome = false;
    },
    //跳转红包页面
    ShopRedEnvelopes() {
      this.$router.push("/RedEnvelopesList?shopid=" + this.shopid);
    },
    //跳转商品详情
    CommodityDetails(x) {
      this.$router.push("/commodity/CommodityDetails?id=" + x.id);
    },
    //滚动条
    content_scroll(e) {
      var h = e.target.offsetHeight; //容器高度
      var sh = e.target.scrollHeight; //滚动条总高
      var t = e.target.scrollTop; //滚动条到顶部距离
      // event.currentTarget.offsetTop
      // console.log(e)
      if (this.$refs.box_3.offsetTop - 44 <= e.target.scrollTop) {
        this.box_3_actvie = true;
      } else {
        this.box_3_actvie = false;
      }
      if (h + t >= sh - 10) {
        if (this.type_1 == 1) {
          if (
            !this.commodity.loading &&
            this.commodity.list.length < this.commodity.total
          ) {
            this.commodity.page_index++;
            this.get_commodity();
          }
        }
        console.log("到底底部");
      }
    },
    //跳转微信内置地图
    weixinmap() {
      var ditu = bd_decrypt(this.店铺.x, this.店铺.y);
      console.log(ditu);
      wx.openLocation({
        latitude: ditu.lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: ditu.lng, // 经度，浮点数，范围为180 ~ -180。
        name: this.shop.name, // 位置名
        address: this.shop.address, // 地址详情说明
        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    //点击收藏和取消
    Collection() {
      // this.isCollection = !this.isCollection;
      if (!this.userInfo) {
        mui.toast("请先登录才能收藏。", { duration: "long", type: "div" });
        return;
      }
      if (!this.UserFavorite) {
        this.addUserFavorite();
      } else {
        this.deleteUserFavorite();
      }
    },
    //删除收藏
    deleteUserFavorite() {
      this.$axios({
        method: "post",
        url: "/api-s/shops/deleteUserFavorite",
        data: [this.UserFavorite.id]
      })
        .then(x => {
          if (x.data.code == 200) {
            mui.toast("取消收藏成功。", { duration: 1000, type: "div" });
            this.get_findDataUserFavorite();
          } else {
            mui.alert(
              x.data.msg ? x.data.msg : x.data.message,
              "提示",
              "我知道了",
              function() {},
              "div"
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加收藏
    addUserFavorite() {
      var obj = {
        userid: this.userInfo.username,
        type: "0", //收藏类型(0:店铺,1:商品)
        name: "店铺", //收藏类型(店铺,商品)
        shopid: this.shop.shopid, //商店id
        commodityid: "" //商品id
      };
      this.$axios({
        method: "post",
        url: "/api-s/shops/addUserFavorite",
        data: obj
      })
        .then(x => {
          console.log(x);
          if (x.data.code == 200) {
            mui.toast("收藏成功。", { duration: 1000, type: "div" });
            this.get_findDataUserFavorite();
          } else {
            mui.alert(
              x.data.msg ? x.data.msg : x.data.message,
              "提示",
              "我知道了",
              function() {},
              "div"
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //选择类型
    change_type(x) {
      this.type_1 = x;
      // this.slider.gotoItem(x);
    },
    //查询距离
    get_juli() {
      console.log("获取距离");
      if (!this.$store.state.my_position.y || !this.店铺.y || !this.店铺.x) {
        return;
      }
      var obj = {
        destinations:
          this.$store.state.my_position.y +
          "," +
          this.$store.state.my_position.x, //起点
        origins: this.店铺.y + "," + this.店铺.x
      };
      this.$axios({
        method: "get",
        url: "/api-u/baidu/routematrix",
        params: obj
      })
        .then(x => {
          // console.log(x);
          if (x.data.status == 0 && x.data.result.length > 0) {
            this.juli = x.data.result[0].distance.text;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //查询服务类型
    get_type() {
      this.$axios({
        method: "get",
        url: "/api-s/shops/type/findAll?start=0&length=100"
      })
        .then(x => {
          console.log("查询服务类型", x);
          this.type_list = x.data.data.data;
        })
        .catch(err => {
          console.log(err);
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
    var this_1 = this;
    //获取服务类型
    this.get_type();

    this.swiper_type = new Swiper(this.$refs.swiper_type, {
      observer: true,
      observeParents: true,
      slidesPerView: 6,
      spaceBetween: 0,
      initialSlide: 1,
      on: {
        init() {
          try {
            setTimeout(() => {
              this_1.swiper_type.slideTo(0, 0, false); //切换到第一个slide，速度为1秒
            }, 500);
          } catch (error) {}
        }
      }
    });

    var swiper = new Swiper(this.$refs.swiper_img, {
      // loop: true,
      // autoplay: true,
      slidesPerView: "auto",
      spaceBetween: 5
      // pagination: {
      //     el: ".swiper-pagination"
      // }
    });

    //获取当前位置
    if (
      !this.$store.state.my_position.x ||
      this.$store.state.my_position.x == ""
    ) {
      console.log("获取距离");
      try {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
          function(r) {
            // console.log(r);
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              // this_1.my_position.x=r.point.lng;
              // this_1.my_position.y=r.point.lat;
              this_1.$store.state.my_position.x = r.point.lng;
              this_1.$store.state.my_position.y = r.point.lat;
            }
            //根据id查询店铺
            this_1.get_juli();
          },
          { enableHighAccuracy: true }
        );
      } catch (error) {
        console.log("获取距离");
        this.get_juli();
      }
    } else {
      console.log("获取距离");
      this.get_juli();
      //根据id查询店铺
    }

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
    // document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
    // console.group('destroyed 销毁完成状态===============》');
  },
  watch: {
    img_list() {
      this.$nextTick(function() {
        console.log("数据渲染完成");
        this.getswiper();
      });
    }
    // swiper_type_list(){
    //     this.swiper_type.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
    // }
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

// 二维码
.qrcode_box {
  width: 273px;
  background: #ffffff;
  position: fixed;
  padding: 20px 25px;
  left: -100%;
  // top: 40px;
  .header_1 {
    display: flex;
    .img_box {
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      margin: 0px 5px 0px 0px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .text_1 {
      height: 42px;
      width: 0;
      flex-grow: 1;
      color: rgba(80, 80, 80, 1);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      > div:nth-child(1) {
        font-size: 14px;
        overflow: auto;
        white-space: nowrap;
        width: 100%;
      }
      > div:nth-child(2) {
        font-size: 12px;
        white-space: nowrap;
        overflow: auto;
        color: #afafaf;
        width: 100%;
      }
    }
  }
  .erweima {
    margin: 20px auto 8px;
    width: 200px;
    height: 200px;
    position: relative;
    > img {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
      border-radius: 10px;
    }
    > div {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .footer_1 {
    color: rgba(80, 80, 80, 1);
    font-size: 12px;
    text-align: center;
    .hongbao {
      color: #d43030;
    }
  }
}

.QRCode {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  .mask {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .content_1 {
    > img {
      width: 100%;
    }
    position: relative;
    z-index: 1;
    background: #ffffff;
    width: 270px;
    // padding: 17px 25px 15px 25px;
    .close_1 {
      width: 36px;
      height: 50px;
      position: absolute;
      top: -50px;
      right: 0px;
      > div:nth-child(1) {
        height: 36px;
        text-align: center;
        line-height: 36px;
        background: #ffffff;
        border-radius: 100%;
        position: relative;
        z-index: 1;
      }
      > div:nth-child(2) {
        position: absolute;
        width: 1px;
        height: 100%;
        background: #ffffff;
        top: 0px;
        right: 0px;
        left: 0px;
        margin: 0px auto;
      }
    }
  }
}

.swper_box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  // background: #000000;
  align-items: center;
  z-index: 11;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: #000000;
  }
}

.title_header_1 {
  font-size: 17px;
  font-weight: 400;
  line-height: 44px;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
  padding: 0px 10px 0px 0px;
  color: #ffffff;
  display: flex;
  > div {
    margin: 0px 0px 0px 5px;
  }
  i {
    margin: 0px 5px;
  }
  .shouchang {
    color: #e0fd00;
  }
}

.box_1 {
  background: #ffffff;
  padding: 7px 13px;
  > li {
    display: flex;
    align-items: center;
    > div:nth-child(1) {
      flex-grow: 1;
      width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > div:nth-child(2) {
      width: 45px;
      flex-shrink: 0;
    }
    > div:nth-child(3) {
      flex-shrink: 0;
      width: 48px;
      text-align: center;
    }
    .title_1 {
      color: rgba(80, 80, 80, 1);
      font-size: 14px;
    }
    .fenshu {
      color: rgba(212, 48, 48, 1);
      font-size: 10px;
    }
    .maidan {
      margin: 0px;
      padding: 0px;
      width: 48px;
      height: 24px;
      border-radius: 24px;
      border: none;
      background: #fc6621;
      font-size: 12px;
      color: #ffffff;
    }
    .time_1 {
      color: rgba(166, 166, 166, 1);
      font-size: 10px;
    }
    .address {
      color: rgba(166, 166, 166, 1);
      font-size: 10px;
    }
    .phone {
      color: #000000;
      font-size: 14px;
    }
    .juli {
      white-space: nowrap;
      text-align: right;
      i {
        font-size: 14px;
      }
      span {
        color: rgba(166, 166, 166, 1);
        font-size: 8px;
      }
    }
  }
}

.box_7 {
  background: #ffffff;
  display: flex;
  height: 37px;
  margin: 3px 0px;
  align-items: center;
  > li:nth-child(1) {
    width: 47px;
    flex-shrink: 0;
    text-align: center;
    color: rgba(212, 48, 48, 1);
  }
  > li:nth-child(2) {
    flex-grow: 1;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    background-color: rgba(212, 48, 48, 1);
    height: 32px;
    line-height: 32px;
  }
}

.box_6 {
  background: #ffffff;
  display: flex;
  padding: 0px 13px 8px 10px;
  .left_1 {
    width: 0px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    > div:nth-child(1) {
      width: 0px;
      flex-grow: 1;
    }
    > div:nth-child(2) {
      min-width: 14px;
      flex-shrink: 0;
      i {
        font-size: 14px;
        color: #c0bcbc;
      }
    }
    .swiper-slide {
      text-align: center;
      .img {
        width: 14px;
        height: 16px;
        margin: 0px auto 2px;
        img {
          width: 100%;
          max-height: 100%;
        }
      }
      .name_1 {
        color: rgba(56, 56, 56, 1);
        font-size: 8px;
      }
    }
  }
  .right_1 {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .dangao {
      width: 51px;
      height: 28px;
      margin: 0px 0px 0px 15px;
      img {
        width: 28px;
      }
    }
    .hongbao {
      width: 48px;
      height: 28px;
      text-align: center;
      img {
        width: 28px;
      }
    }
  }
}

.box_2 {
  background: #ffffff;
  padding: 10px 0.15rem;
  margin: 3px 0px;
  .swiper-slide {
    width: 106px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.box_3 {
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  li {
    width: 25%;
    text-align: center;
    span {
      display: inline-block;
      line-height: 36px;
      position: relative;
      font-size: 0.14rem;
      color: #848484;
      padding: 0px 5px;
    }
    span.active {
      color: #f26633;
      border-bottom: 2px solid #f26633;
    }
  }
}
.box_3.active {
  position: fixed;
  top: 44px;
  left: 0px;
  width: 100%;
  z-index: 2;
}

.box_4 {
  .没有新人专享,
  .没有生日专享 {
    margin: 5px;
    img {
      width: 100%;
    }
  }
  padding: 3px 5px;
  > li {
    overflow: hidden;
    background: #ffffff;
    padding: 5px 0px 5px 5px;
    margin: 0px 0px 3px 0px;
    display: flex;
    .img_box {
      width: 96px;
      height: 72px;
      flex-shrink: 0;
      margin: 0px 5px 0px 0px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text_box {
      flex-grow: 1;
      width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title_1 {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
      }
      .money {
        span {
          color: rgba(212, 48, 48, 1);
          font-size: 14px;
        }
        s {
          color: rgba(166, 166, 166, 1);
          font-size: 10px;
        }
      }
      .dikou {
        display: flex;
        align-items: center;
        i {
          color: rgba(224, 28, 4, 1);
          height: 17px;
          margin: 0px 3px 0px 0px;
        }
        span {
          color: rgba(128, 128, 128, 1);
          font-size: 12px;
        }
      }
    }
    .fengexian {
      width: 1px;
      flex-shrink: 0;
      position: relative;
      border-left: 1px dashed #ff5733;
    }
    .fengexian::after,
    .fengexian::before {
      position: absolute;
      width: 17px;
      height: 17px;
      background: #efeff4;
      border-radius: 100%;
      left: -9px;
      content: "";
    }
    .fengexian::after {
      top: -13px;
    }
    .fengexian::before {
      bottom: -13px;
    }
    .zhuanxiang {
      width: 104px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 40px;
        height: 40px;
        margin: 0px 0px 4px 0px;
      }
      > div {
        display: flex;
        justify-content: center;
        color: rgba(212, 48, 48, 1);
        i {
          font-size: 16px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
}

.box_5 {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 5px;
  > li {
    width: 50%;
    padding: 5px;
    > div {
      background: #ffffff;
    }
  }
  .img_box {
    width: 1.72rem;
    height: 1.29rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h1 {
    padding: 0px 0.06rem;
    color: rgba(80, 80, 80, 1);
    font-size: 0.12rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text_1 {
    display: flex;
    justify-content: space-between;
    padding: 0px 0.06rem;
    .xiaoshou {
      > span:nth-child(1) {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        font-size: 0.08rem;
        line-height: 0.12rem;
        text-align: center;
        border-radius: 100%;
        background: #ff5733;
        color: #ffffff;
      }
      > span:nth-child(2) {
        color: rgba(166, 166, 166, 1);
        font-size: 0.1rem;
      }
    }
    .dikou {
      i {
        color: #fc4c4c;
        font-size: 0.1rem;
      }
      span {
        font-size: 0.1rem;
        color: #fc4c4c;
      }
    }
  }
  .text_2 {
    padding: 0px 0.06rem;
    .xianjia {
      color: #d43030;
      font-size: 0.12rem;
      font-weight: bold;
    }
    .yuanjia {
      font-size: 0.1rem;
      color: #a6a6a6;
      margin: 0px 0px 0px 0.05rem;
    }
  }
}
</style>
