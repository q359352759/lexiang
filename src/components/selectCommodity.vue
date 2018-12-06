<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">选择商品</h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <ul class="box_1" >
                <li v-for="(x, index) in commodity_list" :key="index">
                    <div class="img_box">
                        <img v-if="x.img.split(',').length>0" :src="x.img.split(',')[0]" alt="" srcset="">
                    </div>
                    <div class="text">
                        <div class="title_1">{{x.name}}</div>
                        <div class="money">售价：{{x.sellingPrice}}元</div>
                        <div class="footer_1">
                            <span class="mui-pull-right">累计销售：0份</span>
                            <span>可抵扣{{x.deduction}}元，佣金{{x.commission ? x.commission : 0}}元</span>
                        </div>
                    </div>
                    <div @tap="select(x)" class="xuanze">选择</div>
                </li>
            </ul>
            <loading :loadingtype="loading" :nodata="!loading && total==0" :end="!loading && total!=0 && total==commodity_list.length"/>
        </div>
    </div>
</template>

<script>
import loading from '@/components/loading.vue'

export default {
    name:'',
    // props: ["list"],
    components: {
        loading
    },
    data(){
        return{
            get_index:0,
            query:{
                start:0,
                length:10,
                shopid:'',
                state:1
            },
            page_index:0,
            commodity_list:[],
            total:0,
            loading:true,
        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop
        }
    },
    methods:{
        //选择商品
        select(x){
            
            this.$emit('setShow',x);
        },
        //滚动条
        scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10 && !this.loading && this.commodity_list.length<this.total){
                this.page_index++;
                this.get_commodity();
                console.log("到底底部");
            }
        },
        // 根据店铺查询商品
        get_commodity(){
            this.get_index=1;
            this.query.start=this.page_index*this.query.length;
            this.query.shopid=this.myshop.shopid;
            this.loading=true;
            // openloading(true)
            this.$axios({
                method:'get',
                url:'/api-s/shops/commodity/findAll',
                params:this.query
            }).then(x=>{
                console.log('获取商品列表',x);
                this.loading=false;
                // openloading(false);
                if(x.data.code==200){
                    this.commodity_list=this.commodity_list.concat(x.data.data.data);
                    this.total=x.data.data.total;
                }
            }).catch(err=>{
                this.loading=false;
                console.log('获取商品列表失败',err)
                // openloading(false);
            })
        }
    },
    mounted: function() {
        var this_1 = this;
        //获取我的店铺
        this.$store.commit('setMyshop')
        //获取商品
        if(this.myshop.shopid){
            this.get_commodity();
        }

        // console.group('------mounted 挂载结束状态------');
    },
    watch: {
        myshop(){
            if(this.get_index==0){
                this.get_commodity();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box_1{
    >li{
        background: #ffffff;
        display: flex;
        padding: 7px 9px;
        position: relative;
        .img_box{
            flex-shrink: 0;
            width: 83px;
        	height: 62px;
            margin: 0px 8px 0px 0px;
            img{
                width: 100%;
            }
        }
        .text{
            flex-grow: 1;
        }
        .title_1{
            color: rgba(80, 80, 80, 1);
        	font-size: 14px;
        }
        .money{
            color: rgba(128, 128, 128, 1);
        	font-size: 12px;
            margin: 5px 0px;
        }
        .footer_1{
            color: rgba(166, 166, 166, 1);
        	font-size: 12px;
        }
        .xuanze{
            position: absolute;
            color: rgba(0, 122, 255, 1);
        	font-size: 14px;
            top: 7px;
            right: 14px;
        }

    }
}
</style>


