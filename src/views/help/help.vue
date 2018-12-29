<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                帮助中心
            </h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll_1($event)">
            <ul class="box_1" v-if="userInfo.referrerid">
                <li class="title_1">我的客服专员：</li>
                <li class="name">
                    <span v-if="referrer.nickname">{{referrer.nickname | fliter_name}}</span>
                    <span v-if="!referrer.nickname">{{referrer.phone | fliter_phone}}</span>
                </li>
                <li class="icon_box xiaoxi">
                    <i class="icon iconfont icon-31xiaoxi"></i>
                    <!-- <span>2</span> -->
                </li>
                <li class="icon_box weixin">
                    <i class="icon iconfont icon-weixin"></i>
                </li>
                <li class="icon_box phone">
                    <a :href="'tel:'+referrer.phone">
                        <i class="icon iconfont icon-dianhua1"></i> 
                    </a>
                </li>
            </ul>

            <ul class="box_2">
                <li>搜索问题：</li>
                <li>
                    <input type="text">
                    <i class="icon iconfont icon-chazhao"></i>
                </li>
                <li @tap="RaiseQuestions()">提问</li>
                <li>
                    <!-- <span>1</span> -->
                    <i class="icon iconfont icon-iconcopy"></i>
                </li>
            </ul>

            <ul class="box_3">
                <li v-if="(item.name!='分销员' && item.name!='商家') || (item.name=='商家' && myshop)" :class="{'active':type==item.id}" v-for="(item, index) in type_list" :key="index" @tap="selset_type(item)">{{item.name}}</li>
                <!-- <li :class="{'active':type==1}" @tap="selset_type(1)">会员</li>
                <li :class="{'active':type==2}" @tap="selset_type(2)">商家</li>
                <li :class="{'active':type==3}" @tap="selset_type(3)">分销员</li> -->
            </ul>

            <ul class="mui-table-view box_4">
				<li class="mui-table-view-cell" v-for="(item, index) in qusetion.list" :key="index">
					<a class="mui-navigate-right" @tap="HelpDetails(item)">
						<span >{{item.headline}}</span>
					</a>
				</li>
			</ul>

        </div>
    </div>
</template>

<script>
import { b64DecodeUnicode } from "@/assets/js/base64jiema.js";
export default {
    name:'',
    data(){
        return{
            type:'',
            type_list:[
                {'name':'常见问题','id':''}
            ],
            qusetion:{
                list:[],
                loading:true,
                total:0,
                page_index:0,
                query:{
                    start:0,
                    length:10,
                    type:null,        //类型
                    state:'1',      //显示隐藏
                    common:"1",       //常见或不常见
                }
            },
            userInfo:'',
            referrer:{},    //推荐人
        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop;
        }
    },
    filters:{
        fliter_phone(phone) {
            if (!phone) return "";
            return (
                phone.substring(0, 3) +
                "***" +
                phone.substring(phone.length - 3)
            );
        },
        fliter_name(name){
            try {
                name= b64DecodeUnicode(name)
            } catch (error) {}
            return name;
        }
    },
    methods:{
        // by_car(){
        // 		console.log(validateForm)
        // 		if(this.citys==this.options){
        // 			this.citys=null
        			
        // 		}
        // 	},
        //跳转问题详情
        HelpDetails(x){
            this.$router.push('/HelpDetails?id='+x.id)
        },
        //滚动条
        scroll_1(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(e)
            if (h + t >= sh - 10 && this.qusetion.list.length<this.qusetion.total && !this.qusetion.loading){
                this.qusetion.page_index++
                this.get_qusetion();
            }
        },
        //选择类型
        selset_type(x){
            this.type=x.id;
            if(x.id){
                this.qusetion.query.common=null;
            }else{
                this.qusetion.query.common=1;
            }
            this.qusetion.list=[];
            this.qusetion.page_index=0;
            this.qusetion.total=0;
            this.qusetion.query.type=x.id ? x.id : null;
            this.get_qusetion();
        },
        //提问
        RaiseQuestions(){
            this.$router.push('/RaiseQuestions')
        },
        //获取问题分来
        get_questiontype(){
            this.$axios({
                method:'get',
                url:'/api-u/users/questiontype/findAll?start=0&length=4'
            }).then(x=>{
                console.log('获取问题分类',x);
                this.type_list=this.type_list.concat(x.data.data.data)
            }).catch(err=>{
                console.log(err)
            })
        },
        //查询问题
        get_qusetion(){
            this.qusetion.loading=true;
            this.qusetion.query.start=this.qusetion.page_index*this.qusetion.query.length;
            this.$axios({
                method:'get',
                url:'/api-u/users/qusetion/findAll',
                params:this.qusetion.query
            }).then(x=>{
                console.log('获取问题列表',x);
                if(x.data.code==200){
                    this.qusetion.list=this.qusetion.list.concat(x.data.data.data);
                    this.qusetion.total=x.data.data.total
                }
                this.loading=false;
            }).catch(err=>{
                this.qusetion.loading=false;
                console.log(err);
            })
        },
        //获取推荐人信息
        get_Recommender(){
            this.$axios({
                method:'get',
                url:'/api-u/users/findByUserid/'+this.userInfo.referrerid,
                // params:{}
            }).then(x=>{
                console.log('查询推荐人',x);
                this.referrer=x.data.data;
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    beforeCreate: function() {
        
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        //获取问题分类
        this.get_questiontype();
        //获取问题列表
        this.get_qusetion();
        // /api-u/users/questiontype/findAll?start=0&length=1000
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}
        //查询推荐人信息
        if(this.userInfo.referrerid){
            this.get_Recommender();
        }

        //查询和你自己申请的店铺
        this.$store.commit('setMyshop');

        
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
    }
}
</script>

<style lang="scss" scoped>
.box_1{
    display: flex;
    height: 44px;
    padding: 0px 17px;
    background: #ffffff;
    align-items: center;
    .title_1{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
    .name{
        color: rgba(56, 56, 56, 1);
    	font-size: 14px;
        width: 90px;
        text-align: center;
    }
    .icon_box{
        width: 20px ;
        height: 20px;
        border-radius: 100%;
        text-align: center;
        line-height: 20px;
        margin: 0px 25px 0px 0px;
    }
    .xiaoxi{
        background: #00BAAD;
        color: #ffffff;
        font-size: 13px;
        position: relative;
        span{
            position: absolute;
            top: -4px;
            right: -4px;
            width: 12px;
            height: 12px;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(212, 48, 48, 1);
            font-size: 10px;
            border-radius: 100%;
            line-height: 12px;
            text-align: center;
        }
    }
    .weixin{
        // background: rgba(32, 188, 44, 1);
        i{
            color: #1FBC28;
            font-size: 20px;

        }
    }
    .phone{
        i{
            color: #68c424;
            font-size: 20px;
        }
    }
}
.box_2{
    margin: 3px 0px 0px;
    background: #ffffff;
    height: 44px;
    display: flex;
    color: rgba(56, 56, 56, 1);
    font-size: 12px;
    align-items: center;
    padding: 0px 17px;
    >li:nth-child(1){
        white-space: nowrap;
    }
    >li:nth-child(2){
        height: 26px;
        display: flex;
        flex-grow: 1;
        align-items: center;
        background-color: rgba(246, 246, 246, 1);
        border-radius: 26px;
        padding: 0px 10px;
        input{
            font-size: 14px;
            flex-grow: 1;
            height:100%;
            padding: 0px;
            margin: 0px;
            border: none;
            background: none;
        }
        i{
            font-size: 18px;
            color: rgba(229, 229, 229, 1);
        }
    }
    >li:nth-child(3){
        white-space: nowrap;
        margin: 0px 0px 0px 20px;
    }
    >li:nth-child(4){
        position: relative;
        margin: 0px 0px 0px 3px;
        span{
            position: absolute;
            min-width: 12px;
            height: 12px;
            font-size: 10px;
            line-height: 12px;
            text-align: center;
            background-color: rgba(212, 48, 48, 1);
            color: #ffffff;
            border-radius: 12px;
            top: -4px;
            right: -4px;
        }
        i{
            font-size: 20px;
            color: #1894dc;
        }
    }
}

.box_3{
    background: #ffffff;
    border-bottom: 1px solid #efeff4;
    padding: 0px 17px;
    margin: 3px 0px 0px;
    height: 44px;
    display: flex;
    line-height: 44px;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    li{
        margin: 0px 24px 0px 0px;
        position: relative;
    }
    li.active::after{
        position: absolute;
        bottom: 0px;
        left: 0px;
        background: #007aff;
        width: 100%;
        height: 2px;
        content: '';    
    }
}

.box_4{
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
}

</style>



