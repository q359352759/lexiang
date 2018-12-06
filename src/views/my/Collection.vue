<template>
    <div id="Collection">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <ul>
                    <li :class="{'active':type==0}" @click="select_type(0)">商品</li>
                    <li :class="{'active':type==1}" @click="select_type(1)">店铺</li>
                </ul>
            </h1>
            <span class="right" @tap="bianji()">
                编辑
            </span>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">

            <ul class="box_2" v-if="type==0">
                <li v-for="(x, index) in commodity_list.list" :key="index" :class="{'pos_left':x.pos_left,'pos_right':x.pos_right,'active':x.active}">
                    <div class="left_1">
                        <div class="radio_1" :class="{'active':x.delete_1}" @tap="delete_1(x)">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                    </div>
                    <div v-on:touchend="touchend($event,x)" v-on:touchstart="huoqu($event,x)" v-on:touchmove="touchmove($event)" @tap="go_CommodityDetails(x)">
                        <ul class="cont_1">
                            <li>
                                <img v-if="x.img && x.img.split(',').length>0" :src="x.img.split(',')[0]" alt="" srcset="">
                            </li>
                            <li>
                                <h1>
                                    <div @click="Recommend()" class="mui-pull-right"><i class="icon iconfont icon-fenxiang2"></i></div>
                                    {{x.commodityName}}
                                </h1>
                                <h2>
                                    <span class="mui-pull-right">人气：0</span>
                                    价格：{{x.sellingPrice}}元
                                </h2>
                                <h3>红包抵扣：{{x.deduction}}元</h3>
                            </li>
                            <!--<li>
                                <div @click="Recommend()"><i class="icon iconfont icon-fenxiang2"></i></div>
                                <span>人气：666</span>
                            </li>-->
                        </ul>
                    </div>
                    <div class="right_1" @tap="delete_2(x,index,commodity_list.list)">
                        <div>删除</div>
                    </div>
                </li>
            </ul>

            <loading v-if="type==0" :loadingtype="commodity_list.loading" :nodata="!commodity_list.loading && commodity_list.total==0" :end="!commodity_list.loading && commodity_list.list.length==commodity_list.total && commodity_list.total!=0"/>

            <ul class="box_3" v-if="type==1">
                <li v-for="(x, index) in shop_list.list" :key="index" :class="{'pos_left':x.pos_left,'pos_right':x.pos_right,'active':x.active}">
                    <div class="left_1">
                        <div class="radio_1" :class="{'active':x.delete_1}" @tap="delete_1(x)">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                    </div>
                    <div v-on:touchend="touchend($event,x)" v-on:touchstart="huoqu($event,x)" v-on:touchmove="touchmove($event)" @tap="go_shop(x)">
                        <ul class="cont_1">
                            <li>
                                <img  :src="x.signboard" alt="" srcset="">
                            </li>
                            <li>
                                <h1>
                                    <div @click="Recommend()" class="mui-pull-right"><i class="icon iconfont icon-fenxiang2"></i></div>
                                    {{x.shopName}}
                                </h1>
                                <h2>
                                    <span class="mui-pull-right">人气：0</span>
                                    <div> 地址：{{x.address}}</div>
                                </h2>
                                <h3>5.0分</h3>
                            </li>
                            <!-- <li>
                                <div @click="Recommend()"><i class="icon iconfont icon-fenxiang2"></i></div>
                                <span>人气：666</span>
                            </li> -->
                        </ul>
                    </div>
                    <div class="right_1" @tap="delete_2(x,index,shop_list.list)">
                        <div>删除</div>
                    </div>
                </li>
            </ul>

            <loading v-if="type==1" :loadingtype="shop_list.loading" :nodata="!shop_list.loading && shop_list.total==0" :end="!shop_list.loading && shop_list.list.length==shop_list.total && shop_list.total!=0"/>

           
            <ul class="bianji" v-show="isbianji">
                <li @tap="quxiao()">取消</li>
                <li @tap="remove_1()">删除</li>
            </ul>
        </div>
    </div>
</template>

<script>

import {openloading} from "@/assets/js/currency.js";
import loading from "@/components/loading.vue";
export default {
    name: "",
    components:{
        loading
    },
    data() {
        return {
            type:0,         //0表示商家 1表示店铺
            touchstart_x:0,      //按下去这一秒
            userInfo:'',
            commodity_list:{    //商品
                list:[],
                loading:true,
                page_index:0,
                total:0,
                query:{
                    start:0,
                    length:10,
                    userid:'',
                    type:1,        //收藏类型(0:店铺,1:商品)
                    // shopid:'',      //商店id
                    // commodityid:'',   //商品id
                }    
            },
            shop_list:{        //店铺
                list:[],
                loading:true,
                page_index:0,
                total:0,
                query:{
                    start:0,
                    length:10,
                    userid:'',
                    type:0,
                }
            },
            isbianji:false,
        };
    },
    computed: {
        
    },
    methods: {
        go_CommodityDetails(x){
            console.log(x);
            // http://192.168.1.13:8080/#/CommodityDetails?id=30&isshop=1
            this.$router.push('/CommodityDetails?id='+x.commodityId+'&isshop=1')
        },
        go_shop(x){
            // http://192.168.1.13:8080/#/BusinessDetails?shopid=D7004090906D139CD1492008D376E457
            this.$router.push('/BusinessDetails?shopid='+x.shopid)
        },
        //下拉加载
        scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(e)
            if (h + t >= sh - 10 && !this.butie.loading && this.butie.list.length < this.butie.total ) {
                // console.log("到底底部");
            }
        },
        //删除单个
        delete_2(x,index,list){
            mui.confirm('确定删除？','删除',['取消','确定'],(value)=>{
                console.log(value);
                if(value.index==1){
                    this.$axios({
                        method:'post',
                        url:'/api-s/shops/deleteUserFavorite',
                        data:[x.id]
                    }).then(x=>{
                        if(x.data.code==200){
                            mui.toast('删除成功',{ duration: 1000,type: "div" });
                            // this.get_findDataUserFavorite()
                            list.splice(index,1)
                        }else{
                            mui.toast(x.data.msg ? x.data.msg : x.data.message,{ duration: 1000,type: "div" });
                        }
                        openloading(false)
                    }).catch(err=>{
                        console.log(err);
                        openloading(false);
                        mui.toast('系统错误，稍后再试。',{ duration: 1000,type: "div" });
                    })
                }
            })
        },
        remove_list(x){
            var list=x.filter(x => x.delete_1);
            var newlist=[];
                for(var i=0;i<list.length;i++){
                    newlist.push(list[i].id);
                }
            return newlist;
        },
        //删除多个
        remove_1(){
            if(this.type==0){
                var remove_list=this.remove_list(this.commodity_list.list);
                if(remove_list.length==0){
                    mui.toast('请选择需要删除的内容。', { duration: "long",type: "div" });
                    return
                }
            }else{
                var remove_list=this.remove_list(this.shop_list.list);
                if(remove_list.length==0){
                    mui.toast('请选择需要删除的内容。', { duration: "long",type: "div" });
                    return
                }
            }

            mui.confirm('确定删除？','删除',['取消','确定'],(value)=>{
                console.log(value);
                if(value.index==1){
                    this.deleteUserFavorite(remove_list)
                }
            })
        },
        //删除多个收藏
        deleteUserFavorite(list){
            openloading(true);
            this.$axios({
                method:'post',
                url:'/api-s/shops/deleteUserFavorite',
                data:list
            }).then(x=>{
                if(x.data.code==200){
                    mui.toast('删除成功',{ duration: 1000,type: "div" });
                    // this.get_findDataUserFavorite()
                    if(this.type==0){
                        var list=this.commodity_list.list;
                    }else{
                        var list=this.shop_list.list;                        
                    }
                    for (var  i = list.length - 1; i >= 0; i--) {
                        if(list[i].delete_1){
                            list.splice(i, 1);
                        }
                    }
                }else{
                    mui.toast(x.data.msg ? x.data.msg : x.data.message,{ duration: 1000,type: "div" });
                }
                openloading(false)
            }).catch(err=>{
                console.log(err);
                openloading(false);
                mui.toast('系统错误，稍后再试。',{ duration: 1000,type: "div" });
            })
        },
        //取消
        quxiao(){
            var this_1=this;
            this.isbianji=false;
            if(this.type==0){
                var list=this.commodity_list.list
            }else{
                var list=this.shop_list.list
            }
            for(var i=0;i<list.length;i++){
                this_1.$set(list[i],'pos_right',this_1.isbianji);
                this_1.$set(list[i],'pos_left',false);
            }
        },
        //编辑
        bianji(){
            var this_1=this;
            this.isbianji=!this.isbianji;
            if(this.type==0){
                var list=this.commodity_list.list
            }else{
                var list=this.shop_list.list
            }
            for(var i=0;i<list.length;i++){
                this_1.$set(list[i],'pos_right',this_1.isbianji);
                this_1.$set(list[i],'pos_left',false);
            }
        },
        //删除选择
        delete_1(x){
            this.$set(x,'delete_1',!x.delete_1);
        },
        //跳转推荐页面
        Recommend(){
            this.$router.push('/Recommend')
        },
        //选择类型
        select_type(x){
            var this_1=this
            this.type=x;
            this.isbianji=false;
            if(this.type==0){
                var list=this.commodity_list.list
            }else{
                 var list=this.shop_list.list
            }
            for(var i=0;i<list.length;i++){
                this_1.$set(list[i],'pos_right',false);
                this_1.$set(list[i],'pos_left',false);
            }
        },
        //手指头刚按下
        huoqu(e,x){
             //手指头刚刚按下
            //这里不能用 target 
            this.$set(x,'active',false);
            var targetTouches = e.targetTouches[0];
            this.touchstart_x=targetTouches.clientX-e.currentTarget.parentElement.offsetLeft;
            e.currentTarget.className=""
        },
        //开始拖动
        touchmove(e){
            var targetTouches = e.targetTouches[0];
            e.currentTarget.parentElement.style.left=targetTouches.clientX-this.touchstart_x+'px';
        },
        //拖动结束
        touchend(e,x){
            console.log(e.currentTarget.offsetLeft)
            //  e.currentTarget.className="active"
            this.$set(x,'active',true);
            var parentElement=e.currentTarget.parentElement;
            if(parentElement.offsetLeft>60){
                // e.currentTarget.parentElement.style.left='60px'
                this.$set(x,'pos_right',true)
                this.$set(x,'pos_left',false)
            }else if(parentElement.offsetLeft<-60){
                // e.currentTarget.parentElement.style.left='-60px'
                this.$set(x,'pos_right',false)
                this.$set(x,'pos_left',true)
            }else{
                this.$set(x,'pos_right',false)
                this.$set(x,'pos_left',false)
                // e.currentTarget.parentElement.style.left='0px'
            }
            setTimeout(()=>{
                parentElement.removeAttribute('style');
            },100)
        },
        //查询
        get_findDataUserFavorite(obj){
            obj.query.start=obj.page_index*obj.query.length;
            obj.loading=true;
            obj.query.userid=this.userInfo.username
            this.$axios({
                method:'get',
                url:'/api-s/shops/findDataUserFavorite',
                params:obj.query
            }).then(x=>{
                console.log('查询收藏信息',x);
                if(x.data.code==200){
                    obj.list=obj.list.concat(x.data.data.data);
                    obj.total=x.data.data.total;
                }
                obj.loading=false;
            }).catch(err=>{
                console.log('查询收藏信息错误',err)
                obj.loading=false;
            })
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
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}

        //查询收的商品
        this.get_findDataUserFavorite(this.commodity_list);
        //查询店铺
        this.get_findDataUserFavorite(this.shop_list);

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
    watch: {
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar {
    background: $header_background;
    box-shadow: none;
    a {
        color: #ffffff;
    }
    .right {
        float: right;
        line-height: 44px;
        color: #ffffff;
        font-size: 14px;
    }
}

.mui-title {
    color: #ffffff;
    ul {
        display: flex;
        background: #ffffff;
        color: #007aff;
        width: 200px;
        margin: 8px auto 0px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-size: 12px;
        border-radius: 3px;
        overflow: hidden;
    }
    li {
        width: 50%;
    }
    li.active {
        background: #007aff;
        color: #ffffff;
    }
}

.box_2{
    overflow: hidden;
    >li.active{
        transition: all 0.3s;
    }
    >li{
        position: relative;
        display: flex;
        background: #ffffff;
        border-bottom: 1px solid #E5E5E5;
        >div:nth-child(2){
            flex-grow: 1;
        }
    }
    >li.pos_left{
        left: -60px;
    }
    >li.pos_right{
        left: 60px;
    }
    .left_1{
        padding: 0px 0.16rem 0px 0px;
        position: absolute;
        width: 100%;
        left: -100%;
        height: 100%;
        top: 0px;
        display:flex;
        align-items: center;
        justify-content: flex-end;
    }
    .cont_1{
        display: flex;
        padding: 0.1rem ;
        >li:nth-child(1){
            flex-shrink: 0;
            width: 0.93rem;
        	height: 0.7rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        >li:nth-child(2){
            padding: 0px 0.1rem;
            width:0;
            flex-grow: 1;
            h1{
                font-weight: 400;
                color: rgba(80, 80, 80, 1);
            	font-size: 0.14rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h2{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
                font-size: 0.12rem;
                margin: 0.1rem 0px 0.1rem;
            }
            h3{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
            	font-size: 0.12rem;
            }
        }
        >li:nth-child(3){
            text-align: right;
            flex-shrink: 0;
            color: rgba(166, 166, 166, 1);
        	font-size: 0.12rem;
            i{
                font-size: 0.2rem;
            }
        }
    }
    .right_1{
        position: absolute;
        width: 100%;
        left: 100%;
        top: 0px;
        height: 100%;
        background: #d43030;
        font-size: 0.14rem;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 0px 0.16rem 0px;
    }
}


.box_3{
    overflow: hidden;
    >li.active{
        transition: all 0.3s;
    }
    >li{
        position: relative;
        display: flex;
        background: #ffffff;
        border-bottom: 1px solid #E5E5E5;
        >div:nth-child(2){
            flex-grow: 1;
        }
    }
    >li.pos_left{
        left: -60px;
    }
    >li.pos_right{
        left: 60px;
    }
    .left_1{
        padding: 0px 0.16rem 0px 0px;
        position: absolute;
        width: 100%;
        left: -100%;
        height: 100%;
        top: 0px;
        display:flex;
        align-items: center;
        justify-content: flex-end;
    }
    .cont_1{
        display: flex;
        padding: 0.1rem ;
        >li:nth-child(1){
            flex-shrink: 0;
            width: 0.93rem;
        	height: 0.7rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        >li:nth-child(2){
            padding: 0px 0.1rem;
            width:0;
            flex-grow: 1;
            h1{
                font-weight: 400;
                color: rgba(80, 80, 80, 1);
            	font-size: 0.14rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h2{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
                font-size: 0.12rem;
                margin: 0.1rem 0px 0.1rem;
                >div{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            h3{
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
            	font-size: 0.12rem;
            }
        }
        >li:nth-child(3){
            text-align: right;
            flex-shrink: 0;
            color: rgba(166, 166, 166, 1);
        	font-size: 0.12rem;
            i{
                font-size: 0.2rem;
            }
        }
    }
    .right_1{
        position: absolute;
        width: 100%;
        left: 100%;
        top: 0px;
        height: 100%;
        background: #d43030;
        font-size: 0.14rem;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 0px 0.16rem 0px;
    }
}


.bianji{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 42px;
    display: flex;
    background: #ffffff;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-around;
    >li{
        width: 118px;
    	height: 30px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 30px;
        line-height: 30px;
        text-align: center;
    }
    >li:nth-child(1){
        background-color: rgba(153, 153, 153, 1);
    }
    >li:nth-child(2){
        background-color: rgba(212, 48, 48, 1);
    }
}

</style>
