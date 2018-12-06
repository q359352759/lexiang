<template>
    <div>
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">市场管理</h1>
		</header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li :class="{'active':type==0}" @click="select_type(0)">
                    <div>商家</div>
                    <div>0</div>
                </li>
                <li :class="{'active':type==1}" @click="select_type(1)">
                    <div>会员</div>
                    <div>0</div>
                </li>
            </ul>

            <ul class="box_3">
                <li>
                    <div>
                        <span>时间</span>
                        <!-- <img src="image/paixun.png" alt="">
                        <img src="image/paixushang.png" alt=""> -->
                        <img src="image/paixuxia.png" alt="">
                    </div>
                    <div>
                        <span>分佣</span>
                        <img src="image/paixun.png" alt="">
                        <!-- <img src="image/paixushang.png" alt="">
                        <img src="image/paixuxia.png" alt=""> -->
                    </div>
                </li>
                <li v-if="type==0">
                    <input type="text" v-model="shop.query.name" placeholder="店铺名">
                    <i @click="chaxun()" class="icon iconfont icon-chazhao"></i>
                </li>
                <li v-if="type==1">
                    <input type="text" placeholder="会员名">
                    <i class="icon iconfont icon-chazhao"></i>
                </li>
            </ul>

            <div class="content_1" @scroll="scroll()">

                <ul class="box_2" v-if="type==0">
                    <li v-for="(item, index) in shop.list" :key="index">
                        <div class="img_box">
                            <img :src="item.signboard" alt="" srcset="">
                        </div>
                        <div>
                            <!-- <div class="mui-pull-right tuiguang">
                                <i class="icon iconfont icon-fenxiang2"></i>
                                <div>推广</div>
                            </div> -->
                            <h1>{{item.name}}</h1>
                            <h2>
                                <div v-if="item.state==1" class="mui-pull-right state_1">正常</div>
                                <div>
                                    {{item.address}}
                                </div>
                            </h2>
                            <h3>业务：</h3>
                            <div class="footer">
                                <span class="xingxing">
                                    <i class="icon iconfont icon-shoucangdianjihou"></i>
                                    5.0
                                </span>
                                <span class="yongjin">
                                    <i class="icon iconfont icon-yongjin1"></i>
                                    0%
                                </span>
                                <span class="juli">
                                    <i class="icon iconfont icon-location"></i>
                                    0km
                                </span>
                                <span class="shuliang mui-pull-right">
                                    <i class="icon iconfont icon-geren"></i>
                                    0人
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <loading v-if="type==0" :loadingtype="shop.loading" :nodata="!shop.loading && shop.total==0" :end="!shop.loading && shop.total!=0 && shop.list.length==shop.total" />

                <ul class="box_4 title" v-if="type==1">
                    <li>
                        <div>
                            <div>日期</div>
                        </div>
                        <div>
                            <div>会员名</div>
                        </div>
                        <div>
                            <div>商家</div>
                        </div>
                        <div>
                            <div>累计消费</div>
                        </div>
                        <div>
                            <div>累计分佣</div>
                        </div>
                    </li>
                </ul>
                <ul class="box_4 list" v-if="type==1">
                    <li v-for="(item, index) in 0" :key="index">
                        <div>
                            <div>2018.11.11</div>
                        </div>
                        <div>
                            <div>张三张三张三张三</div>
                        </div>
                        <div>
                            <div>2个</div>
                        </div>
                        <div>
                            <div>2000</div>
                        </div>
                        <div>
                            <div>182</div>
                        </div>
                    </li>
                </ul>
                <loading v-if="type==1" :nodata="true" />

            </div>
        </div>
    </div>
</template>

<script>
import loading from '@/components/loading.vue'
export default {
    nameL: "",
    components:{
        loading
    },
    data() {
        return {
            type: 0,
            areaManager:'',
            userInfo:'',
            name:'',
            shop:{
                loading:true,
                list:[],
                page_index:0,
                total:0,
                query:{
                    start:0,
                    length:10,
                    state:1,
                    areaCode:'',
                    name:'',
                }
            }
        };
    },
    methods: {
        //查询
        chaxun(){
            this.shop.list=[];
            this.shop.page_index=0;
            this.get_shop();
        },
        select_type(x) {
            this.type = x;
        },
        //滚动条
        scroll(){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10) { 
                if(this.type==0){
                    if(!this.shop.loading && this.shop.list.length<this.shop.total){
                        this.shop.page_index++;
                        this.get_shop()
                    }
                }else if(this.type==1){
                }else if(this.type==2){
                }
                console.log("到底底部");
            }
        },
        //获取代理商信息
        get_areaManager() {
            this.$axios({
                method: "get",
                url:"/api-u/areaManager/findme?userid=" + this.userInfo.username
            }).then(x => {
                console.log("获取代理商信息", x);
                this.areaManager=x.data.data;
                this.get_shop();
            }).catch(error => {
                console.log("获取代理商信息错误", error);
            });
        },
        //根据区域查询店铺
        get_shop(){
            this.shop.loading=true;
            this.shop.query.start=this.shop.page_index*this.shop.query.length;
            this.shop.query.areaCode=this.areaManager.areaCode;
            this.$axios({
                method:'get',
                url:'/api-s/shops/findAll',
                params:this.shop.query
            }).then(x=>{
                console.log('查询店铺',x)
                var list=x.data.data.data;
                this.shop.list=this.shop.list.concat(list);
                this.shop.total=x.data.data.total;
                this.shop.loading=false;
            }).catch(err=>{
                console.log('查询店铺失败',err);
            })
        }
    },
    mounted() {
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}
        
        //查询代理商信息
        this.get_areaManager()
        
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-content {
  display: flex;
  flex-direction: column;
}
.content_1{
    flex-grow: 1;
    overflow: auto;
}
.box_1 {
  flex-shrink: 0;
  display: flex;
  color: #505050;
  font-size: 0.14rem;
  text-align: center;
  background: #ffffff;
  > li {
    width: 50%;
    position: relative;
    padding: 8px 0px;
  }
  > li:nth-child(1)::after {
    position: absolute;
    top: 20%;
    right: 0px;
    content: "";
    width: 1px;
    height: 60%;
    background: #efeff4;
  }
  .active::before {
    position: absolute;
    width: 50%;
    height: 3px;
    left: 25%;
    bottom: 0px;
    content: "";
    background: $header_background;
  }
}

.box_2 {
  overflow: auto;
  background: #ffffff;
  li {
    padding: 0.08rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    > div:nth-child(1) {
      width: 0.75rem;
      height: 0.75rem;
      flex-shrink: 0;
      margin: 0px 0.09rem 0px 0px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > div:nth-child(2) {
      flex-grow: 1;
      width: 0;
      * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .state_1{
          color: rgba(0, 122, 255, 1);
      }
    }
    .tuiguang {
      text-align: center;
      font-size: 0.1rem;
      color: #a6a6a6;
      i {
        font-size: 0.22rem;
        color: #1894dc;
      }
    }
    h1 {
      font-weight: 400;
      color: rgba(80, 80, 80, 1);
      font-size: 0.14rem;
    }
    h2 {
      font-weight: 400;
      color: rgba(166, 166, 166, 1);
      font-size: 0.1rem;
    }
    h3 {
      font-weight: 400;
      color: rgba(80, 80, 80, 1);
      font-size: 0.1rem;
    }
    .footer {
      font-size: 0.1rem;
    }
    .xingxing {
      display: inline-block;
      width: 0.5rem;
      color: #d43030;
      i {
        color: #f4d40c;
      }
    }
    .yongjin {
      display: inline-block;
      width: 0.5rem;
      color: #d43030;
    }
    .juli {
      display: inline-block;
      color: #a6a6a6;
    }
    .shuliang {
      display: inline-block;
      color: #a6a6a6;
      i {
        color: #1894dc;
      }
    }
  }
}

.box_3 {
  flex-shrink: 0;
  display: flex;
  padding: 6px 10px;
  background: #ffffff;
  margin: 5px 0px;
  > li:nth-child(1) {
    display: flex;
    font-size: 0.12rem;
    flex-grow: 1;
    > div {
      // display: flex;
      background: #f1f2f3;
      margin: 0px 0.1rem 0px 0px;
      color: #505050;
      height: 0.26rem;
      line-height: 0.26rem;
      padding: 0px 15px 0px 15px;
    }
    img {
      vertical-align: middle;
      height: 16px;
      margin: 0px 0px 0px 3px;
    }
  }
  li:nth-child(2) {
    width: 1.25rem;
    display: flex;
    align-items: center;
    border: 1px solid #a6a6a6;
    border-radius: 3px;
    input {
      border: none;
      height: 0.24rem;
      margin: 0px;
      padding: 0px 3px;
      font-size: 0.12rem;
    }
  }
}

.box_4 {
  overflow: auto;

  li {
    display: flex;
    border-bottom: 1px solid #d8d8d8;
    font-size: 0.12rem;
    > div {
      min-height: 30px;
      width: 20%;
      text-align: center;
      display: flex;
      align-items: center;
      border-left: 1px solid #d8d8d8;
      padding: 0px 3px;
      > div {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    > div:nth-child(1) {
      border: none;
    }
  }
}
.box_4.title {
  flex-shrink: 0;
  background: $header_background;
  color: #ffffff;
}
.box_4.list {
  > li:nth-child(2n-1) {
    background: #ffffff;
  }
}
</style>
