<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红包领取</h1>
            <span class="header_1" v-if="!isshop" @tap="jindian()">
                进店
            </span>
        </header>
        <div class="mui-content mui-fullscreen"  @scroll="content_scroll($event)">
            <ul class="box_1">
                <!-- 店铺新人红包 -->
                <li  @tap="lingqu(redenvelope_0.list.length>0 ? redenvelope_0.list[0] : '')">
                    <div>
                        <div class="cont_1">
                            <div class="banyuan"></div>
                            <div class="title">店铺新人红包</div>
                            <div class="lingqu">领取</div>
                            <div class="money" v-if="redenvelope_0.list.length>0">
                                <span>{{redenvelope_0.list[0].amount}}</span>
                                <span>元</span>
                            </div>
                            <div class="tishi_1" v-if="redenvelope_0.list.length==0">尚未发布</div>
                            <div class="xinren_img">
                                <img v-if="shop.signboard" :src="shop.signboard" alt="" srcset="">
                            </div>
                            <div class="footer_1" v-if="redenvelope_0.list.length>0">
                                <span v-if="redenvelope_0.list[0].deductionType==1">满{{redenvelope_0.list[0].expire}},减{{redenvelope_0.list[0].deduction}}</span>
                                <span v-if="redenvelope_0.list[0].deductionType!=1">可抵扣{{redenvelope_0.list[0].percentage}}%</span>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- 生日红包 -->
                <li @tap="lingqu(redenvelope_5.list.length>0 ? redenvelope_5.list[0] : '')">
                    <div>
                        <div class="cont_1">
                            <div class="banyuan"></div>
                            <div class="title">生日红包</div>
                            <div class="lingqu">领取</div>
                            <div class="money" v-if="redenvelope_5.list.length>0">
                                <span>{{redenvelope_5.list[0].amount}}</span>
                                <span>元</span>
                            </div>
                            <div class="tishi_1" v-if="redenvelope_5.list.length==0">尚未发布</div>
                            <div class="shengri_img">
                                <img src="image/shengri.png" alt="" srcset="">
                            </div>
                            <!-- <div class="footer_1">
                                <span>店内通用</span>
                            </div> -->
                        </div>
                    </div>
                </li>
                <!-- 庆典红包 -->
                <li @tap="lingqu(redenvelope_4.list.length>0 ? redenvelope_4.list[0] : '')">
                    <div>
                        <div class="cont_1">
                            <div class="banyuan"></div>
                            <div class="title">庆典红包</div>
                            <div class="lingqu">领取</div>
                            <div class="money" v-if="redenvelope_4.list.length>0">
                                <span>{{redenvelope_4.list[0].amount}}</span>
                                <span>元</span>
                            </div>
                            <div class="tishi_1" v-if="redenvelope_4.list.length==0">尚未发布</div>
                            <div class="qingdian_img">
                                <img src="image/qingdian.png" alt="" srcset="">
                            </div>
                            <div class="footer_1" v-if="redenvelope_4.list.length>0">
                                <span>{{redenvelope_4.list[0].startTime | filter_time}}-{{redenvelope_4.list[0].endTime | filter_time}}</span>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- 节日红包 -->
                <li @tap="lingqu(redenvelope_2.list.length>0 ? redenvelope_2.list[0] : '')">
                    <div>
                        <div class="cont_1">
                            <div class="banyuan"></div>
                            <div class="title">节日红包</div>
                            <div class="lingqu">领取</div>
                            <div class="money" v-if="redenvelope_2.list.length>0">
                                <span>{{redenvelope_2.list[0].amount}}</span>
                                <span>元</span>
                            </div>
                            <div class="tishi_1" v-if="redenvelope_2.list.length==0">尚未发布</div>
                            <div class="jieri_img">
                                <img src="image/jieri.png" alt="" srcset="">
                            </div>
                            <div class="footer_1" v-if="redenvelope_2.list.length>0">
                                <span>{{redenvelope_2.list[0].headline}}</span>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- 商品 -->
                <li v-for="(item, index) in redenvelope_1.list" :key="index" @tap="lingqu(item)">
                    <div>
                        <div class="cont_1">
                            <div class="banyuan"></div>
                            <div class="title">{{item.commodityName}}</div>
                            <div class="lingqu">领取</div>
                            <div class="money">
                                <span>{{item.amount}}</span>
                                <span>元</span>
                            </div>
                            <div class="shangping_img">
                                <img v-if="item.img.split(',').length>0" :src="item.img.split(',')[0]" alt="" srcset="">
                            </div>
                            <div class="footer_1">
                                <!-- <span>指定商品</span> -->
                                <span>{{item.startTime | filter_time}}-{{item.endTime | filter_time}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <loading :loadingtype="redenvelope_1.loading" :nodata="false" :end="!redenvelope_1.loading && redenvelope_1.total==redenvelope_1.list.length"/>

        </div>
    </div>
</template>

<script>
import {dateFtt,openloading ,getDateStr} from '@/assets/js/currency.js';
import loading from '@/components/loading.vue'
export default {
    name:'',
    components:{
        loading
    },
    data(){
        return{
            redid:'',   //红包id
            isshop:true,  //是否是店铺点击来的
            shopid:'',
            shop:{},
            userInfo:'',
            //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
            redenvelope_0:{         //新人店铺红包
                list:[],
                page_index:0,
                query:{
                    start:0,
                    length:10,
                    type:0,
                    shopid:'',
                    ccc:1
                }
            },
            redenvelope_1:{         //1商品红包
                loading:true,
                list:[],
                page_index:0,
                total:0,
                query:{
                    start:0,
                    length:10,
                    type:1,
                    shopid:'',
                    ccc:1
                }
            },
            redenvelope_2:{         //2节日红包
                list:[],
                page_index:0,
                query:{
                    start:0,
                    length:10,
                    type:2,
                    shopid:'',
                    ccc:1
                }
            },
            // redenvelope_3:{      //3签到红包
            //     lsit:[],
            //     page_index:0,
            //     query:{
            //         start:0,
            //         length:10,
            //         type:3
            //     }
            // },
            redenvelope_4:{     //4庆典红包
                list:[],
                page_index:0,
                query:{
                    start:0,
                    length:10,
                    type:4,
                    shopid:'',
                    ccc:1
                }
            },
            redenvelope_5:{     //5生日红包
                list:[],
                page_index:0,
                query:{
                    start:0,
                    length:10,
                    type:5,
                    state:1,
                    shopid:'',
                    ccc:1
                }
            },
            startTime:'',       //卡券上面的有效期
            endTime:'',
        }
    },
    computed:{
        //实名认证信息
        findByUserid(){    
            return this.$store.state.findByUserid;
        }
    },
    filters:{
        filter_time(time){
            return dateFtt(time,'yyyy.MM.dd')
        }
    },
    methods:{
        //领取红包
        lingqu(x){

            if(!this.userInfo){
                // mui.toast('请先登录。',{ duration: "long",type: "div" });
                mui.confirm('需要登录才能领取，是否现在去登录。','提示',['取消','是的'],(value)=>{
                    if(value.index==1){
                        this.$router.push('/login');
                    }
                })
                return;
            }else if(!x || x==''){
                mui.toast('尚未发布此红包。',{ duration: "long",type: "div" });
                return;
            }else if(x.type==5){
                console.log('点击了生日红包');
                if(this.userInfo.iaiState==1){
                    mui.confirm('确认将自己的生日信息（不包含年龄）授权给此商铺吗？','提示',['取消','好的'],(value)=>{
                        if(value.index==1){
                            // console.log(this.userInfo.iaiState)
                            // console.log(this.findByUserid);
                            // if(this.userInfo.iaiState==1){
                                if(!this.findByUserid){
                                    mui.toast('获取实名信息失败，稍后再试。',{ duration: 2000,type: "div" });
                                    return;
                                }
                                var birthday=this.findByUserid.birthday;
                                var myDate = new Date();
                                var newdate=myDate.getFullYear()+'-'+birthday.substring(4,6)+'-'+birthday.substring(6);
                                if(newdate>=getDateStr(0)){     //领取今年的
                                    this.startTime=getDateStr(-7,newdate);
                                    this.endTime=getDateStr(7,newdate);
                                    this.add_red(x);
                                }else{      //领取明年的
                                    var newdate=(myDate.getFullYear()+1)+'-'+birthday.substring(4,6)+'-'+birthday.substring(6);
                                    this.startTime=getDateStr(-7,newdate);
                                    this.endTime=getDateStr(7,newdate);
                                    this.add_red(x);
                                }
                            // }
                            // else{
                            //     this.$router.push('/RealName');
                            // }
                        }
                    },'div')
                }else{
                    mui.confirm('领取生日红包需要实名认证，您还未认证，请先认证。','提示',['取消','去认证'],(value)=>{
                        if(value.index==1){
                            this.$router.push('/RealName');
                        }
                    })
                }
                return
            }
            this.add_red(x)            
        },
        //调用添加红包接口
        add_red(x){
            var obj={
                    id:'',  
                    userid:this.userInfo.username,      //红包id
                    envelopeId:x.id,  
                    state:'0',              //状态(使用等等)  0 刚领取
                    type:x.type,
                    startTime:x.type==5 ? this.startTime : '',           //生日使用有效期
                    endTime:x.type==5 ? this.endTime : '',
                }
            console.log(obj);
            openloading(true);
            this.$axios({
                method:'post',
                url:'/api-s/shops/addUserCardPackge',
                data:obj
            }).then(x=>{
                console.log(x);
                if(x.data.code==200){
                    console.log(1)
                    mui.toast('恭喜您，领取成功。',{ duration: 2000,type: "div" });
                }else{
                    console.log(2)
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
                openloading(false)
            }).catch(err=>{
                console.log(err)
                mui.toast('系统错误，稍后再试。',{ duration: 2000,type: "div" });
                openloading(false);
            })
        },
        //进店
        jindian(){
            this.$router.push('/BusinessDetails?shopid='+this.shopid)
        },
        //查询各种红包
        get_redenvelope(obj){
            obj.query.start=obj.page_index*obj.query.length;
            obj.query.shopid=this.shopid;
            obj.loading=true
            this.$axios({
                method:'get',
                url:'/api-s/shops/redenvelope/findAll',
                params:obj.query
            }).then(x=>{
                console.log('获取红包',x);
                if(x.data.code==200){
                    obj.list=obj.list.concat(x.data.data.data)
                    obj.total=x.data.data.total;
                }
                obj.loading=false
            }).catch(err=>{
                obj.loading=false
                console.log(err);
            })
        },
        //根据Id查询店铺
        get_shop(){
            this.$axios({
                method:'get',
                url:'/api-s/shops/findByShopid/'+this.shopid
            }).then(x=>{
                console.log('根据Id查询店铺信息',x);
                if(x.data.code==200){
                    this.shop=x.data.data;
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //滚动条
        content_scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if(h + t >= sh - 10 && !this.redenvelope_1.loading && this.redenvelope_1.list.length<this.redenvelope_1.total){
                this.redenvelope_1.page_index++;
                this.get_redenvelope(this.redenvelope_1);
            }
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

        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}

        if(this.userInfo){
            this.$store.commit('setfindByUserid');
        }

        

        this.shopid=this.$route.query.shopid;
        if(this.$route.query.isshop){
            this.isshop=false;
        }

        //根据id查询店铺
        this.get_shop();
        //获取红包
        this.get_redenvelope(this.redenvelope_0)
        this.get_redenvelope(this.redenvelope_1)
        this.get_redenvelope(this.redenvelope_2)
        // this.get_redenvelope(redenvelope_3)
        this.get_redenvelope(this.redenvelope_4)
        this.get_redenvelope(this.redenvelope_5)


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
    watch:{
        $route(to,from){
            var query=this.$route.query;
            if(!query.ShopClassification_show){
                this.ShopClassification_show=false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-bar .header_1{
    position: absolute;
    line-height: 44px;
    right: 10px;
    top: 0px;
    font-size: 14px;
    color: #ffffff;
}
.box_1{
    padding: 8px ;
    display: flex;
    flex-wrap: wrap;
    >li{
        width: 50%;
        padding: 0px 5px 0px;
        margin: 0px 0px 10px;
        >div{
            background: #ffffff;
            border-radius: 10px;
            padding: 10px;
            height: 100%;
        }
    }
    .cont_1{
        height: 100%;
        min-height: 185px;
        background: #f18a8a;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
    }
    .banyuan{
        width: 200%;
        height: 200px;
        background: #f55e5e;
        position: absolute;
        left: -50%;
        top: -160px;
        border-radius: 100%;
    }
    .title{
        text-align: center;
        color: rgba(255, 255, 255, 1);
    	font-size: 12px;
        padding: 8px 0px 0px;
        position: relative;
        z-index: 1;
    }
    .lingqu{
        width: 40px;
    	height: 40px;
        background-color: rgba(250, 111, 38, 1);
        font-size: 12px;
        color: #ffffff;
        margin: 0px auto;
        border-radius: 100%;
        position: relative;
        z-index: 1;
        line-height: 40px;
        text-align: center;
        box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.1357142857142857);
    }
    .money{
        text-align: center;
        color: #ffffff;
        padding: 0px 5px 0px 0px;
        margin: 5px 0px 0px 0px;
        >span:nth-child(1){
            font-size: 22px;
            margin: 0px 3px;
        }
        >span:nth-child(2){
            font-size: 12px;
        }
    }
    .tishi_1{
        text-align: center;
        color: #ffffff;
        // padding: 0px 5px 0px 0px;
        margin: 5px 0px 0px 0px;
        min-height: 29px;
        font-size: 14px;    
        line-height: 29px;
    }
    .xinren_img{
        width: 82px;
    	height: 62px;
        margin: 0px auto 0px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
    .shengri_img{
        text-align: center;
        padding: 3px 0px 0px;
        img{
            width: 60px;
        }
    }
    .qingdian_img{
        height: 62px;
        text-align: center;
        img{
            height: 100%;
            width: 66px;
        }
    }
    .jieri_img{
        height: 62px;
        text-align: center;
        img{
            height: 100%;
            width: 56px;
        }
    }
    .shangping_img{
        width: 82px;
    	height: 62px;
        margin: 0px auto 0px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
    .footer_1{
        color: rgba(255, 255, 255, 1);
    	font-size: 10px;
        margin: 4px 0px 8px;
        text-align: center;
    }

}

</style>


