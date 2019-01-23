<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">店员管理</h1>
            <span @click="tianjiadianyuan()">添加店员</span>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="$router.push('/myshop/dianyuan/banci')">
                            <div class="title">班次</div>
                            <div class="tishi" v-if="!班次 || 班次.length==0 || 班次[0].id==''">请设定班次</div>
                            <div v-if="班次 && 班次.length>0 && 班次[0].id!=''">
                                <span v-show="班次[0].schedulingtype==1">固定班次</span>
                                <span v-show="班次[0].schedulingtype==2">两班</span>
                                <span v-show="班次[0].schedulingtype==3">三班</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            
            <ul class="mui-table-view box_2" v-for="(item, index) in 店员列表.list" :key="index">
				<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled" @click="移除员工(item,index)">
						<a class="mui-btn mui-btn-red">移除</a>
					</div>
					<div class="mui-slider-handle item">
                        <div class="img_box" @click="$router.push('/myshop/dianyuan/dianyuanXiangqing?id='+item.id)">
                            <div class="img_1">
                                <img v-if="!item.user || !item.user.headImgUrl" src="image/kaifazhong.png" alt="">
                                <img v-if="item.user && item.user.headImgUrl" :src="item.user.headImgUrl" alt="">
                                <span :class="{'active':item.workstate==1}"></span>
                            </div>
                            <div>{{item.clerksname}}</div>
                        </div>
                        <div class="text_box"  @click="$router.push('/myshop/dianyuan/dianyuanXiangqing?id='+item.id)">
                            <div class="mui-pull-right banci">
                                班次：
                                <span>{{item.shiftid | 过滤考勤段(当前考勤时间)}}</span>
                            </div>
                            <div>回复：-0条</div>
                            <div>收银：-0笔</div>
                            <div>营业额：-0元</div>
                        </div>
                        <div class="icon_box"  @click="选择店员(item)">
                            <i class="mui-icon mui-icon-arrowright"></i>
                        </div>
					</div>
				</li>
			</ul>
            <loading v-if="店员列表 && 店员列表.list" :loadingtype="店员列表.loading" :nodata="!店员列表.loading && 店员列表.total==0" :end="!店员列表.loading && 店员列表.total!=0 && 店员列表.total==店员列表.list.length"/>
            <!-- <button @click="test()">测试</button>
            <button @click="test1()">测试1</button> -->

        </div>

        <xuanzhebanci v-show="xiugaibanci_show" @setbancishow="get_banci"/>
    </div>
</template>

<script>
import xuanzhebanci from "@/components/myshop/dianyuan/xuanzhebanci.vue";
import { mapGetters, mapActions } from "vuex";
import { openloading } from "@/assets/js/currency.js";
import loading from "@/components/loading.vue";
export default {
  name: "",
  components: {
    xuanzhebanci,
    loading
  },
  data() {
    return {
      list: [1, 2],
      xiugaibanci_show: false,
      选择的店员: ""
    };
  },
  filters: {
    过滤考勤段(id, list) {
      var 考勤 = list.find(x => x.id == id);
      var index = list.findIndex(x => x.id == id);

      if (考勤.shift == "固定班次") {
        return 固定班次;
      } else if (考勤.shift == "两班") {
        return index == 0 ? "早班" : "晚班";
      } else if (考勤.shift == "三班") {
        var 名字 = ["早班", "中班", "晚班"];
        return 名字[index];
      }
    }
  },
  computed: {
    ...mapGetters({
      店铺: "get_myshop",
      班次: "myshops/班次/班次",
      当前考勤时间: "myshops/班次/当前考勤时间",
      店员列表: "myshops/店员/店员列表"
    })
  },
  methods: {
    ...mapActions({
      setMyshop: "setMyshop",
      查询班次: "myshops/班次/查询班次",
      查询考勤时间: "myshops/班次/查询考勤时间",
      店员初始化: "myshops/店员/店员初始化",
      查询店员列表: "myshops/店员/查询店员列表",
      移除员工_1: "myshops/店员/移除员工",
      店员下一页: "myshops/店员/店员下一页",
      修改员工: "myshops/店员/修改员工"
    }),
    scroll(e) {
      var h = e.target.offsetHeight; //容器高度
      var sh = e.target.scrollHeight; //滚动条总高
      var t = e.target.scrollTop; //滚动条到顶部距离
      if (
        h + t >= sh - 10 &&
        !this.店员列表.loading &&
        this.店员列表.list.length < this.店员列表.total
      ) {
        this.店员下一页();
      }
    },
    async get_banci(type, item, index) {
      console.log(type, item, index);
      this.xiugaibanci_show = type;
      if (item && item.id != this.选择的店员.shiftid) {
        console.log("选择了班次", item);
        var obj = Object.assign({}, this.选择的店员);
        obj.shiftid = item.id;
        openloading(true);
        try {
          var 修改店员 = await this.修改员工(obj);
          if (修改店员.data.code == 200) {
            mui.toast("修改成功", { duration: "long", type: "div" });
            this.选择的店员.shiftid = item.id;
          } else {
            mui.alert(
              修改店员.data.msg ? 修改店员.data.msg : x.data.message,
              "提示",
              "我知道了",
              function() {},
              "div"
            );
          }
        } catch (error) {
          mui.toast("网络错误稍后再试", { duration: "long", type: "div" });
        }
        openloading(false);
      }
      // openloading(true);
    },
    选择店员(item) {
      this.选择的店员 = item;
      this.xiugaibanci_show = true;
    },
    test() {
      this.list.push(1);
      var box_2 = document.getElementsByClassName("box_2");
      for (let i = 0; i < box_2.length; i++) {
        mui.swipeoutClose(box_2[i].querySelector("li"));
      }
    },
    test1() {
      var box_2 = document.getElementsByClassName("box_2");
      for (let i = 0; i < box_2.length; i++) {
        mui.swipeoutOpen(box_2[i].querySelector("li"));
      }
    },
    tianjiadianyuan() {
      if (this.班次.length == 0 || this.班次[0].id == "") {
        mui.confirm("请先设置班次", "提示", ["取消", "设置"], value => {
          console.log(value);
          if (value.index == 1) {
            this.$router.push("/myshop/dianyuan/banci");
          }
        });
      } else {
        this.$router.push("/myshop/dianyuan/addDianyuan");
      }
    },
    移除员工(item, index) {
      openloading(true);
      this.移除员工_1([item, index])
        .then(x => {
          if (x.data.code == 200) {
            mui.toast("移除成功", { duration: "long", type: "div" });
          } else {
            mui.alert(
              x.data.msg ? x.data.msg : x.data.message,
              "提示",
              "我知道了",
              function() {},
              "div"
            );
          }
          openloading(false);
        })
        .catch(err => {
          openloading(false);
        });
    },
    async 获取数据() {
      openloading(true);
      this.店员初始化();
      if (!this.店铺 || !this.店铺.shopid) {
        await this.setMyshop();
      }
      // await this.查询班次();
      Promise.all([this.查询班次(), this.查询考勤时间(), this.查询店员列表()])
        .then(x => {
          openloading(false);
        })
        .catch(err => {
          openloading(false);
        });
      // await this.查询考勤时间();
    }
  },
  mounted() {
    this.获取数据();
  }
};
</script>

<style lang="scss" scoped>
.mui-bar span {
  color: #ffffff;
  font-size: 14px;
  position: absolute;
  line-height: 44px;
  top: 0px;
  right: 12px;
}
.box_1 {
  margin: 5px 0px 0px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  .item {
    display: flex;
    .title {
      width: calc(42px + 45px);
    }
    .tishi {
      color: #d9d9d9;
    }
  }
}
.box_2 {
  margin: 4px 0px 0px;
  .item {
    font-size: 12px;
    color: #505050;
    display: flex;
    align-items: center;
    .img_box {
      width: 40px;
      margin: 0px 15px 0px 0px;
      flex-shrink: 0;
      > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
      .img_1 {
        height: 40px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
        span {
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: rgba(166, 166, 166, 1);
          border-radius: 100%;
          bottom: 0px;
          right: 0px;
        }
        span.active {
          background: #43cf7c;
        }
      }
    }
    .text_box {
      flex-grow: 1;
      line-height: 150%;
      padding: 0px 14px 0px 0px;
      .banci span {
        color: #007aff;
      }
    }
    .icon_box {
      color: #c0bcbc;
    }
  }
}
</style>
