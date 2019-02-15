<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">业务市场</h1>
            <!-- <span @tap="SearchShop()" class="sousuo mui-pull-right"><i class="icon iconfont icon-chazhao"></i></span> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li class="类型框" @click="select_Catalog()">
                    <div>{{title_name}}</div>
                    <i class="mui-icon mui-icon-arrowdown"></i>
                </li>
                <li class="排序">
                    <dangepaixu @click.native="选择类型(item)" v-for="(item, index) in 排序列表" :key="index" :name="item.name" :type="item.type"/>
                </li>
            </ul>

            <!-- 类型 -->
            <div class="box_2" :class="{'active':box_2_show}">
                <div class="mask" @click="box_2_close()"></div>
                <div class="content_1" :class="{'active':!box_2_show}">
                    <ul v-for="(obj, index) in type_list" :key="index">
                        <li :class="{'active':item.id==obj.active}" v-for="(item, index_1) in obj.list" :key="index_1" @click="select_type(obj,item,index)">
                            <span>{{item.name}}</span>
                            <i v-if="item.children && item.children.length>0" class="mui-pull-right mui-icon mui-icon-forward"></i>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="内容区">
                <ul class="box_4">
                    <li v-for="(item, index) in 招募信息.list" :key="index">
                        <div>
                            <img :src="item.店铺信息.signboard">
                        </div>
                        <div>
                            <h1>{{item.店铺信息.name}}</h1>
                            <h2>
                                <div class="mui-pull-right">
                                    <i class="icon iconfont icon-location"></i>
                                     {{item.distance | 过滤位置}}
                                </div>
                                <div class="text">{{item.店铺信息.address}}</div>
                            </h2>
                            <h3>
                                <div class="mui-pull-right">
                                    <i class="icon iconfont icon-renqi"></i>
                                    {{item.popularity ? item.popularity : 0}}
                                </div>
                                <div class="text">业务：{{item.新cbonum | 过滤类型}}</div>
                            </h3>
                            <h4>
                                <div class="mui-pull-right qiandai">
                                    <i class="icon iconfont icon-yongjin1"></i>
                                    {{item.mincommissionscale}}%
                                </div>
                                <div>
                                    <span>招募：</span>
                                    <div class="progress_1">
                                        <span>{{item.nowrecruitment}}人</span>
                                        <span class="mui-pull-right">{{item.allrecruitment}}人</span>
                                        <div :style="{'width':item.nowrecruitment/item.allrecruitment+'%'}"></div>
                                    </div>
                                    <span class="xingxing">
                                        <i class="icon iconfont icon-shoucangdianjihou"></i>
                                        5.0
                                    </span>
                                </div>
                            </h4>
                        </div>
                    </li>
                </ul>
                <loading :loadingtype="招募信息.loading" :nodata="!招募信息.loading && 招募信息.total==0" :end="!招募信息.loading && 招募信息.total!=0 && 招募信息.list.length>=招募信息.total"/>
            </div>           

        </div>
    </div>
</template>

<script>
import { get_url, openloading } from "@/assets/js/currency";

import { api_查询招募列表 , api_获取自定义业务 } from "@/api/招募接口.js";
import { api_根据shopid查询店铺 } from "@/api/店铺接口.js";

import loading from "@/components/loading.vue";
import dangepaixu from "@/components/单个排序.vue";

import { mapGetters , mapActions } from "vuex";
export default {
    name: "",
    components: {
        loading,
        dangepaixu
    },
    data() {
        return {
            排序列表:[
                {name:'人气',type:1,order:"popularity"},
                {name:'距离',type:0,order:"distance"},
                {name:'佣金',type:0,order:"mincommissionscale"},
                {name:"评价",type:0,order:"scoreAvg"}
            ],
            店铺类型:[],
            招募信息:{
                loading:true,
                page_index:0,
                list:[],
                total:0,
                query:{
                    start:0,
                    length:10,
                    areaCode:'',
                    state: 1,
                    shopType:'',
                    upx: "",
                    upy: "",
                    order:'popularity', //人气 popularity 距离 distance 佣金 mincommissionscale 评价 scoreAvg 
                    orderType: "DESC"    //DESC ASC
                },
            },
            title_name: "",
            id:'',
            box_2_show: false, //选择类型框
            shop_type: {
                //选择的类型
                name: "全部",
                id: "",
                pid: ""
            },
            type_list: [
                // {
                //     active:'',
                //     list:[]
                // }
            ]
        };
    },
    filters: {
        过滤位置(距离){
            if (!距离) return "";
            return 距离>0.5 ? 距离.toFixed(1)+'km' : 距离.toFixed(1)*1000+'m'
            // return data.replace("米", "m").replace("公里", "km");
        },
        过滤类型(arr){
            var list=[];
            arr.forEach(x=>{
                if(x.cbotype){
                    list.push(x.cbotype)
                }else if(x.name){
                    list.push(x.name)
                }
            })
            return list.join('、');
        }  
    },
    computed: {
        ...mapGetters({
            代理人信息:'agent/代理人信息',
            当前位置:'当前位置',
            店铺三级分类:'shops_tree_list',
            分销类型:'myshops/分销/分销类型'
        })
    },
    methods: {
        ...mapActions({
            获取店铺类型:"获取店铺类型",
            获取位置:'获取位置/获取位置',
            获取代人信息:"agent/获取代人信息",
            查询分销类型:'myshops/分销/查询分销类型'
        }),
        选择类型(item){
            if(this.招募信息.query.order==item.order){
                item.type=item.type==1 ? 2 : 1;
                this.招募信息.query.orderType=item.type==1 ? 'DESC' : 'ASC';
            }else{
                this.排序列表.forEach(x => {
                    if(x==item){
                        x.type=1;
                    }else{
                        x.type=0;
                    }
                });
                this.招募信息.query.orderType='DESC';
                this.招募信息.query.order=item.order;
            }
            this.招募信息.total=0;
            this.招募信息.list=[];
            this.招募信息.page_index=0;
            this.查询招募列表();
        },
        //商家处跳转商家详情
        BusinessDetails(x) {
            this.$router.push("/BusinessDetails?shopid=" + x.shopid);
        },
        //关闭类型选项
        box_2_close() {
            this.box_2_show = false;
        },
        //点击展开类型
        select_Catalog() {
            this.box_2_show = true;
        },
        //点击选择类型
        select_type(parent, item, index) {
            parent.active = item.id;
            this.type_list.splice(index + 1);
            if (!item.children || item.children.length == 0) {
                this.box_2_show = false;
                this.shop_type = item;
                this.title_name = item.id ? item.name : item.pname;
                this.id = item.id ? item.id : item.pid;
                // this.shop.list = [];
                // this.shop.page_index = 0;
                // this.get_shops();
                // this.招募信息.query.shopType=item.id ? item.id : item.pid;
                this.招募信息.list=[];
                this.招募信息.page_index = 0;
                this.查询招募列表()
            } else {
                var list = [];
                // if(index>0){
                list.push({ id: "", name: "全部", pid: item.id, pname: item.name });
                // }
                list = list.concat(item.children);
                var obj = {
                    active: "",
                    list: list
                };
                this.type_list.push(obj);
            }
        },
        //初始化三级分类
        tree_list_init() {
            var this_1 = this;
            var 店铺三级分类 = this.店铺三级分类;
            var list = get_url(this.店铺三级分类, this.shop_type.pid);
            for (var i = 0; i < list.length; i++) {
                if (i == 0) {
                    var obj = {
                        active: list[i].id,
                        list: 店铺三级分类
                    };
                    this_1.type_list.push(obj);
                    if (list.length == 1) {
                        var new_list2 = [];
                        new_list2.push({
                            name: "全部",
                            id: "",
                            pid: list[i].id,
                            pname: list[i].name
                        });
                        new_list2 = new_list2.concat(list[i].children);
                        var obj = {
                            active: "",
                            list: new_list2
                        };
                        this_1.type_list.push(obj);
                    }
                    console.log(123);
                } else {
                    var new_list1 = [];
                    if (i > 0) {
                        new_list1.push({
                            name: "全部",
                            id: "",
                            pid: list[i].id,
                            pname: list[i].name
                        });
                    }
                    new_list1 = new_list1.concat(list[i - 1].children);
                    var obj = {
                        active: list[i].id,
                        // list:list[i-1].children
                        list: new_list1
                    };
                    this_1.type_list.push(obj);
                    if (list.length - 1 == i) {
                        var new_list = [];
                        if (i > 0) {
                            new_list.push({
                                name: "全部",
                                id: "",
                                pid: list[i].id,
                                pname: list[i].name
                            });
                        }
                        if (list[i].children.length > 0) {
                            new_list = new_list.concat(list[i].children);
                            var obj = {
                                active: "",
                                list: new_list
                            };
                            this_1.type_list.push(obj);
                        }
                    }
                }
            }
        },
        新cbonum(cbonum){
            var list=cbonum ? cbonum.split(',') : [];
            var newlist=[]
            list.forEach(x=>{
                var r=get_url(this.分销类型,x)
                var obj=r[r.length-1]
                newlist.push(obj);
            })
            return newlist;
        },
        查询招募列表() {
            this.招募信息.loading=true;
            this.招募信息.query.areaCode=this.代理人信息.areaCode;
            this.招募信息.query.start=this.招募信息.page_index*this.招募信息.query.length;
            this.招募信息.query.upx = this.当前位置.x;
            this.招募信息.query.upy = this.当前位置.y;
            this.招募信息.query.shopType=this.id;
            // this.招募信息.query.upy = 30.67794285;
            var obj=this.排序列表.find(x=>x.type!=0);
            this.招募信息.query.order=obj.order;
            this.招募信息.query.orderType=obj.type==1 ? 'DESC' :'ADC'
            console.log(obj);

            
            api_查询招募列表(this.招募信息.query).then(x=>{
                if(x.data.code==200){
                    var list=x.data.data.data
                        list.forEach(item=>{
                            item.店铺信息={}
                            item.新cbonum=this.新cbonum(item.cbonum);
                            api_根据shopid查询店铺(item.shopid).then(r=>{
                                item.店铺信息=r.data.code==200 ? r.data.data : {};
                            })
                            var query={
                                start:0,
                                length:10,
                                shopid:item.shopid
                            }
                            api_获取自定义业务(query).then(r=>{
                                if(r.data.code==200){
                                    item.新cbonum=item.新cbonum.concat(r.data.data.data)
                                }
                            })
                        })
                    this.招募信息.list=this.招募信息.list.concat(list);
                    this.招募信息.total=x.data.data.total;
                }
                this.招募信息.loading=false
            }).catch(err=>{
                this.招募信息.loading=false
            })
        },
        async 初始化(){
            openloading(true)
            if(!this.当前位置 || this.当前位置.x=='' || this.当前位置.y==''){
                await this.获取位置();
            }
            if(!this.代理人信息){
                await this.获取代人信息();
            }
            if(!this.分销类型 || this.分销类型.length==0){
                await this.查询分销类型();
            }

            this.查询招募列表();

            if(!this.店铺三级分类 || this.店铺三级分类.length==0){
                await this.获取店铺类型();
            }
            this.tree_list_init();

            openloading(false);
        }
    },
    beforeCreate: function () {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function () {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function () {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function () {
        this.id=this.$route.query.id;
        this.title_name = this.$route.query.name;
        this.shop_type.pid = this.$route.query.id;
        // this.招募信息.query.shopType=this.$route.query.id
        this.初始化()
        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function () {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        
    }
};
</script>

<style lang="scss" scoped>
.mui-content {
    display: flex;
    flex-direction: column;
}
.sousuo {
    position: relative;
    line-height: 44px;
    color: #ffffff;
}
.box_1 {
    flex-shrink: 0;
    padding: 0px 8px;
    background: #ffffff;
    text-align: center;
    display: flex;
    color: rgba(128, 128, 128, 1);
    font-size: 0.12rem;
    line-height: 0.37rem;
    height: 0.37rem;
    align-items: center;
    position: relative;
    z-index: 2;
    border-bottom: 1px solid #f6f6f6;
    .类型框 {
        border: 1px solid rgba(246, 246, 246, 1);
        width: 84px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 0.26rem;
        // border: 1px solid #cccccc;
        border-radius: 3px;
        font-size: 0.12rem;
        line-height: 0.26rem;
        div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        i {
            font-size: 0.16rem;
            color: #c0bcbc;
        }
    }
    .排序{
        display: flex;
        flex-grow: 1;
        >div{
            width: 25%;
        }
    }
}

.box_2.active {
    height: 100%;
    padding: 0px 0px 90px 0px;
}
.box_2 {
    transition: all 0.3s;
    height: 0%;
    width: 100%;
    top: 0px;
    position: absolute;
    padding: 0px 0px 0px 0px;
    .mask {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .content_1 {
        position: relative;
        z-index: 1;
        padding: 80px 0px 0px;
        background: #ffffff;
        display: flex;
        overflow: auto;
        height: 100%;
        border-top: 1px solid #cccccc;
        > ul:nth-child(1) {
            background: #f0f0f0;
        }
        > ul:nth-child(2) {
            background: #ececec;
        }
        > ul:nth-child(3) {
            background: #ececec;
        }
        ul {
            border-right: 1px solid #ffffff;
            flex-shrink: 0;
            width: calc(100% / 3);
            font-size: 14px;
            overflow: auto;
            i {
                font-size: 14px;
                line-height: 40px;
            }
            li {
                padding: 0px 10px;
                height: 40px;
                line-height: 40px;
            }
            li.active {
                background: #ffffff;
            }
        }
    }
}
.内容区{
    overflow: auto;
}
.box_4 {
   
    background: #ffffff;
    > li {
        padding: 8px;
        border-bottom: 1px solid #efefef;
        display: flex;
        > div:nth-child(1) {
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
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
        }
        h1 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 0.5rem;
        }
        h2 {
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
            }
        }
        h3 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
                color: #d43030;
            }
        }
        h4 {
            font-weight: 400;
            font-size: 0.1rem;
            .progress_1 {
                display: inline-block;
                width: 1rem;
                height: 0.13rem;
                line-height: 0.13rem;
                position: relative;
                background: #e9cdcd;
                border-radius: 0.13rem;
                color: #ffffff;
                padding: 0px 3px;
                margin: 0px 0.1rem 0px 0px;
                span {
                    position: relative;
                    z-index: 1;
                }
                div {
                    position: absolute;
                    height: 100%;
                    border-radius: 0.13rem;
                    background: #e33c64;
                    top: 0px;
                    left: 0px;
                }
            }
            .xingxing {
                color: #d43030;
                i {
                    color: #f8d40c;
                }
            }
            .qiandai {
                color: #d43030;
            }
        }
    }
}

</style>
