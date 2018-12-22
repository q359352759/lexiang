<template>
    <div id="AssetCenter">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">资产中心</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li>
                    <div class="img_box">
                        <img v-if="!userInfo.headImgUrl" src="image/touxiang.png" alt="" srcset="">
                        <img v-if="userInfo.headImgUrl" :src="userInfo.headImgUrl" alt="" srcset="">
                    </div>
                    <span v-if="!userInfo.nickname">{{userInfo.phone | fliter_phone}}</span>
                    <span v-if="userInfo.nickname">{{userInfo.nickname}}</span>
                </li>
                <li>
                    <div>
                        本月支出：0.00元
                    </div>
                    <div>本月支出：0.00元</div>
                </li>
                <li>
                    <div>
                        现金余额：<span>0.00元</span>
                    </div>
                    <div>
                        红包余额：<span>0.00元</span>
                    </div>
                </li>
            </ul>

            <ul class="mui-table-view box_2">
				<li class="mui-table-view-cell" @click="bill()">
					<a class="mui-navigate-right">
                        <div class="item">
                            <div>
                                <i class="icon iconfont icon-zhangdan"></i>
                                <span>收支账单：</span>
                            </div>
                            <div class="money">-￥0.00</div>
                        </div>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						<div class="item">
                            <div>
                                <i class="icon iconfont icon-icon-wallet"></i>
                               <span>{{agentUser ? '平台佣金：' : "去赚钱："}}</span>
                            </div>
                            <div v-if="agentUser" class="money">￥0.00</div>
                        </div>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						<div class="item">
                            <div>
                                <i class="icon iconfont icon-yongjin1"></i>
                               <span>{{agentUser ? '店铺佣金：' : '去赚取：'}}</span>
                            </div>
                            <div v-if="agentUser" class="money">￥0.00</div>
                        </div>
					</a>
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
      // actions_agentUser
      // agentUser:this.$st
      // store.dispatch('actions_agentUser');
      userInfo: ""
    };
  },
  filters: {
    fliter_phone(phone) {
      if (!phone) return "";
      return phone.substring(0, 3) + "**" + phone.substring(phone.length - 3);
    }
  },
  computed: {
    agentUser() {
      return this.$store.state.agentUser;
    }
  },
  methods: {
    bill() {
      this.$router.push("/bill");
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
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    } catch (err) {
      console.log("未登录");
    }
    console.log("用户信息", this.userInfo);
    this.$store.dispatch("actions_agentUser");
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
.box_1 {
  display: flex;
  padding: 0.1rem 0.2rem 0.15rem 0.23rem;
  background: #ffffff;
  > li:nth-child(1) {
    width: 0.44rem;
    flex-shrink: 0;
    text-align: center;
    .img_box {
      width: 100%;
      height: 0.44rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
      }
    }
    span {
      font-size: 0.12rem;
      color: #505050;
      margin: 5px 0px 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }
  > li:nth-child(2) {
    width: 0;
    flex-grow: 1;
    font-size: 0.12rem;
    color: #505050;
    margin: 0px 0.1rem 0px 0.15rem;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > div:nth-child(1) {
      margin: 0px 0px 0.2rem 0px;
    }
  }
  > li:nth-child(3) {
    flex-shrink: 0;
    white-space: nowrap;
    font-size: 0.12rem;
    color: #505050;
    > div:nth-child(1) {
      margin: 0px 0px 0.2rem 0px;
    }
    span {
      color: #007aff;
    }
  }
}
.box_2 {
  margin: 6px 0px 0px;
  font-size: 0.14rem;
  .item {
    padding: 0px 1rem 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div:nth-child(1) {
      display: flex;
      align-items: center;
    }
  }
  .money {
    color: #808080;
  }
  span {
    color: #505050;
  }
  i {
    color: #d42420;
    font-size: 0.2rem;
    margin: 0px 5px 0px 0px;
  }
}
</style>
