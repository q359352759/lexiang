<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{title_name}}</h1>
            <span @tap="SearchShop()" class="sousuo mui-pull-right"><i class="icon iconfont icon-chazhao"></i></span>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li class="input_box" @click="select_Catalog()">
                    <div>全部类型</div>
                    <i class="mui-icon mui-icon-arrowdown"></i>
                </li>
                <li>
                    <span @click="select_screen('juli')">
                        距离
                    </span>
                    <img v-if="screen_type!=2 && screen_type!=3" src="image/paixun.png" alt="">
                    <img v-if="screen_type==2" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==3" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('renqi')">
                        人气
                    </span>
                    <img v-if="screen_type!=0 && screen_type!=1" src="image/paixun.png" alt="">
                    <img v-if="screen_type==0" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==1" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('pingjia')">
                        评价
                    </span>
                    <img v-if="screen_type!=6 && screen_type!=7" src="image/paixun.png" alt="">
                    <img v-if="screen_type==6" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==7" src="image/paixushang.png" alt="">
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
            
            <!-- 商家 -->
            <ul class="box_6"  @scroll="content_scroll($event)">
                <li v-for="(item, index) in shop.list" :key="index">
                    <div  @click="BusinessDetails(item)">
                        <img :src="item.signboard" alt="" srcset="">
                    </div>
                    <div>
                        <h1  @click="BusinessDetails(item)">{{item.name}}</h1>
                        <h2>
                            <span @click="weixinmaptest(item)" class="mui-pull-right"><i class="icon iconfont icon-location"></i>{{item.juli | filter_juli}}</span>
                            <div @click="BusinessDetails(item)">{{item.address}}</div>
                        </h2>
                        <h3 @click="BusinessDetails(item)">
                            <span class="mui-pull-right"><i class="icon iconfont icon-hongbao1"></i></span>
                            <span>好评：5分</span>
                        </h3>
                    </div>
                </li>
                <loading :loadingtype="shop.loading" :nodata="!shop.loading && shop.total==0" :end="!shop.loading && shop.total!=0 && shop.list.length==shop.total"/>
            </ul>


            

        </div>
    </div>
</template>

<script>
import { get_url } from "@/assets/js/currency";
import loading from "@/components/loading.vue";
export default {
    name:'',
    components: {
        loading
    },
    data(){
        return{
            Picker_2:'',
            screen_type:0,
            box_2_show:false,   //选择类型框
            shop_type:{         //选择的类型
                name:'全部',
                id:'', 
                pid:''
            },       
            title_name:'',
            id:'',      //类型id
            shop:{                
                page_index:0,
                loading:true,
                list:[],
                total:0,
                jquery:{
                    shopType:'',
                    start:0,
                    length:10,
                    state:1,
                    coordinateX:'', //位置
                    coordinateY:'',
                    screen_type:'',  //1 距离 2 人气 3 评价 
                    sort_order:'',   //1 倒叙 2顺序
                }
            },
            
            type_list:[
                // {
                //     active:'',
                //     list:[]
                // }
            ],

        }
    },
    filters: {
        
    },
    computed: {
        shops_tree_list(){
            return this.$store.state.shops_tree_list;
        }
    },
    methods: {
        //选择排序
        select_screen(x){
            if(x=='juli'){
                this.screen_type=this.screen_type==2 ? 3 : 2;
            }else if(x=='renqi'){
                this.screen_type=this.screen_type==0 ? 1 : 0
            }else{
                this.screen_type=this.screen_type==6 ? 7 : 6
            }
        },
        //点击查找
        SearchShop(){
            this.$router.push('/SearchShop')
        },
        //关闭类型选项
        box_2_close(){
             this.box_2_show=false;
        },
        //点击展开类型
        select_Catalog(){
            this.box_2_show=true;
            // this.Picker_2.show(x=>{
            //     console.log(x);
            // })
        },
        //点击选择类型
        select_type(parent,item,index){
            console.log(item,index)
            parent.active=item.id;
            this.type_list.splice(index+1);
            if(!item.children || item.children.length==0){
                this.box_2_show=false;
                this.shop_type=item;
                this.title_name=item.id ? item.name : item.pname;
                this.id=item.id ? item.id : item.pid;
                // console.log(this.shop_type);
            }else{
                var list=[];
                if(index>0){
                    list.push({id:'','name':'全部',pid:item.id,pname:item.name});
                }
                    list=list.concat(item.children)
                var obj={
                        active:'',
                        list:list
                    }
                this.type_list.push(obj)
            }
        },
        //根据类型查询店铺
        get_shops(){
            var obj={
                    start:this.shops.length*this.shops.page_index,
                    shopType:this.id,
                    state:1
                }
            this.$axios({
                method:'get',
                url:'/api-s/api-s/shops/findAll',
                params:obj
            }).then(x=>{

            }).catch(err=>{

            })
        },
        //初始化三级分类
        tree_list_init(){
            var this_1=this;
            var shops_tree_list=this.$store.state.shops_tree_list;
            console.log(get_url(this.$store.state.shops_tree_list,this.shop_type.pid));
            var list=get_url(this.$store.state.shops_tree_list,this.shop_type.pid)
            for(var i=0;i<list.length;i++){
                if(i==0){
                    var obj={
                        active:list[i].id,
                        list:shops_tree_list
                    }
                    this_1.type_list.push(obj);
                    if(list.length==1){
                        var obj={
                                active:'',
                                list:list[i].children
                            }
                        this_1.type_list.push(obj);
                    }
                }else{
                    var obj={
                        active:list[i].id,
                        list:list[i-1].children
                    }
                    this_1.type_list.push(obj);
                    if(list.length-1==i){
                        var new_list=[];
                        if(i>0){
                            new_list[0]={'name':'全部','id':'','pid':list[i].id,'pname':list[i].name}
                        }
                        if(list[i].children.length>0){
                            new_list=new_list.concat(list[i].children);
                            var obj={
                                    active:'',
                                    list:new_list
                                }
                            this_1.type_list.push(obj);
                        }
                    }
                }
            }
        },
        //查询商家
        get_shops(){
            var this_1=this;
            this.shop.jquery.shopType=this.id;
            // this.shop.jquery.name=this.search_text;
            this.shop.jquery.coordinateX=this.$store.state.my_position.x;
            this.shop.jquery.coordinateY=this.$store.state.my_position.y;
            this.shop.jquery.start=this.shop.page_index*this.shop.jquery.length;
            if(this.screen_type==2 || this.select_type==3){
                this.shop.jquery.screen_type=1;
                this.shop.jquery.sort_order=this.screen_type==2 ? 1 : 2;
            }else if(this.screen_type==0 || this.screen_type==1){
                this.shop.jquery.screen_type=2;
                this.shop.jquery.sort_order=this.screen_type==0 ? 1 : 2;
            }else if(this.screen_type==6 || this.screen_type==7){
                this.shop.jquery.screen_type=3;
                this.shop.jquery.sort_order=this.screen_type==6 ? 1 : 2;
            }
            this.shop.loading=true;
            // this.shop.jquery.
            this.$axios({
                method:'get',
                url:'/api-s/shops/findAll',
                params:this.shop.jquery
            }).then(x=>{
                console.log('查询店铺',x);
                var list=x.data.data.data;
                for(var i=0;i<list.length;i++){
                    list[i].juli='';
                    this_1.juli(list[i])
                }
                this.shop.list=this.shop.list.concat(list);
                this.shop.total=x.data.data.total;
                this.shop.loading=false
            }).catch(err=>{
                console.log(err);
                this.shop.loading=false;
            })
        },
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
        var this_1=this;

        this.id=this.$route.query.id;
        this.title_name=this.$route.query.name;
        this.shop_type.pid=this.$route.query.id;
        //根据id查询店铺类型
        this.tree_list_init();
        //根据类型Id查询商铺
        this.get_shops()

        
        //根据类型查询商店
        // /api-s/api-s/shops/findAll


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
        shops_tree_list(){
            console.log('123')
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
}
.sousuo{
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
    border-bottom: 1px solid #efeff4;
    > li {
        width: 25%;
    }
    img {
        vertical-align: middle;
        width: 0.12rem;
    }
    .input_box{
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 0.26rem;
        // border: 1px solid #cccccc;
        border-radius: 3px;
        font-size: 0.12rem;
        line-height: 0.26rem;
        div{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        i{
            font-size: 0.16rem;
            color: #c0bcbc;
        }
    }
}

.box_2.active{
    height: 100%;
    padding: 0px 0px 90px 0px;
}
.box_2{
    transition: all 0.3s;
    height: 0%;
    width: 100%;
    top: 0px;
    position: absolute;
    padding: 0px 0px 0px 0px;
    .mask{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .content_1{
        position: relative;
        z-index: 1;
        padding: 80px 0px 0px;
        background: #ffffff;
        display: flex;
        overflow: auto;
        height: 100%;
        border-top: 1px solid #cccccc;
        >ul:nth-child(1){
            background: #F0F0F0;
        }
        >ul:nth-child(2){
            background: #ececec;
        }
        >ul:nth-child(3){
            background: #ececec;
        }
        ul{
            border-right: 1px solid #ffffff;
            flex-shrink: 0;
            width: calc(100% / 3);
            font-size: 14px;
            overflow: auto;
            i{
                font-size: 14px;
                line-height: 40px;
            }
            li{
                padding: 0px 10px;
                height: 40px;
                line-height: 40px;
            }
            li.active{
                background: #ffffff;
            }
        }
    }
}


.box_6{
    margin: 5px 0px 0px;
    >li{
        display: flex;
        background: #ffffff;
        padding: 0.08rem 0.1rem;
        border-bottom: 1px solid #E5E5E5;
        >div:nth-child(1){
            flex-shrink: 0;
            width: 0.77rem;
            height: 0.58rem;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        >div:nth-child(2){
            margin: 0px 0px 0px 8px;
            width: 0;
            flex-grow: 1;
            h1{
                margin: 0px;
                font-weight: 400;
                color: rgba(80, 80, 80, 1);
                font-size: 0.14rem;
                 white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h2{
                margin: 8px 0px 8px;
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
            	font-size: 0.12rem;
                div{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            h3{
                font-weight: 400;
                color: rgba(212, 48, 48, 1);
            	font-size: 0.12rem;
                margin: 0px;
            }
        }
        
    }
}

</style>

