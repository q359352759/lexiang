<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">选择商品</h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <ul class="box_1">
                <li v-for="(item, index) in shangping.list" :key="index">
                    <div class="img_box">
                        <img v-if="item.img.split(',').length>0" :src="item.img.split(',')[0]">
                    </div>
                    <div class="text">
                        <div class="title_1">{{item.name}}</div>
                        <div class="money">
                            <span>￥{{item.sellingPrice}}</span>
                            <s>{{item.marketPrice}}</s>
                        </div>
                        <div class="dikou">
                            <i class="icon iconfont icon-hongbao1"></i>
                            <span>抵扣：￥{{item.deduction}}</span>
                        </div>
                    </div>
                    <div class="zhuanshu">
                        <img src="image/xingren.png" alt="" srcset="">
                        <div>
                            <i class="icon iconfont icon-shengji"></i>
                            <span>0元</span>
                        </div>
                    </div>
                    <div class="xuanzhe">
                        <span @click="jian(item)">-</span>
                        <!-- <input type="text" v-model.number="item.number"> -->
                        <input type="number" name="" id="" v-model.number="item.number">
                        <span @click="jia(item)">+</span>   
                    </div>
                </li>
            </ul>

            <ul class="box_2">
                <li>
                    <div>
                        <span @tap="change_commodity_box(true)">已选择：{{shuliang}}件</span>
                    </div>
                    <div class="mui-text-center money_1">￥{{Total_price}}</div>
                    <div class="mui-text-right">
                        <span>实付：</span>
                        <span class="money_2">￥0</span>
                    </div>
                </li>                
                <li>
                    <div>
                        <span>使用：0个红包</span>
                        <i class="mui-icon mui-icon-forward"></i>
                    </div>
                    <div class="mui-text-center money_1">-￥0</div>
                    <div class="mui-text-right">
                        <button @tap="queding()" class="btn_1">确定</button>
                    </div>
                </li>            
            </ul>
            <loading :loadingtype="shangping.loading" :end="!shangping.loading && shangping.list.length==shangping.total && shangping.total!=0" :nodata="!shangping.loading && shangping.total==0"/>
        </div>

        <!-- 选择的商品详情 -->
        <div class="box_3" v-show="commodity_box">
            <div class="content_1">
                <div @click="change_commodity_box(false)" class="close_1"><i class="icon iconfont icon-quxiao"></i></div>
                <div class="cont_1">
                    <div class="list">
                        <ul v-for="(item, index) in new_list" :key="index">
                            <li>
                                <div>雅居乐粉色梦幻</div>
                                <div class="mui-text-center"></div>
                                <div class="mui-text-right">商品红包x1</div>
                            </li>
                            <li>
                                <div>
                                    <span class="money_1">￥{{item.sellingPrice}}</span>
                                    <span>x{{item.number}}</span>
                                </div>
                                <div class="mui-text-center dikou">可抵扣￥0</div>
                                <div class="mui-text-right money_1">-0元</div>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="list">
                        <ul v-for="(item, index) in 0" :key="index">
                            <li>
                                <div>雅居乐粉色梦幻</div>
                                <div class="mui-text-center">新人专享</div>
                                <div class="mui-text-right">商品红包x1</div>
                            </li>
                            <li>
                                <div>
                                    <span class="money_1">￥36000</span>
                                    <span>x2</span>
                                </div>
                                <div class="mui-text-center dikou">可抵扣￥2600</div>
                                <div class="mui-text-right money_1">-2600元</div>
                            </li>
                        </ul>
                    </div> -->
                </div>
                <div class="footer_1">
                    <div class="select_1">
                        <div @click="change_select(true)">
                            <span>平台红包</span>
                            <i class="mui-icon mui-icon-arrowup"></i>
                        </div>
                        <ul v-show="select_show">
                            <li @click="change_select(false)">
                                <div>庆典红包</div>
                                <div>4000元</div>
                            </li>
                            <li @click="change_select(false)">
                                <div>庆典红包</div>
                                <div>4000元</div>
                            </li>
                        </ul>
                    </div>
                    <div class="money">
                        总优惠：0元
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import loading from '@/components/loading.vue';
export default {
    name:'',
    components:{
        loading
    },
    props:{
        shopid:{},
    },
    data(){
        return{
            commodity_box:false,        //选择的商品详情
            select_show:false,          //选择红包
            shangping:{
                loading:true,
                page_index:0,
                total:0,
                list:[],
                query:{
                    start:0,
                    length:10,
                    shopid:'',
                    state:1
                }
            },
            select_height:0
        }
    },
    computed:{
        //选择的商品
        new_list(){
            return this.shangping.list.filter(x => (x.number && x.number>0));
        },
        // 计算数量
        shuliang(){
            var n=0;
            this.new_list.forEach(item=>{
                n+=item.number
            })
            return n;
        },
        //计算价格
        Total_price(){
            var n=0;
            this.new_list.forEach(item=>{
                n+=item.number*item.sellingPrice
            });
            return n;
        }
    },
    methods:{
        //点击红包详情
        change_select(x){
            this.select_show=x;
        },
        //显示商品详情
        change_commodity_box(x){
            this.commodity_box=x;
        },
        //确定
        queding(){
            this.$emit('ChoiceChange',this.new_list);
            history.back();
        },
        //减去
        jia(item){
            if(item.number){
                this.$set(item,'number',item.number+1)
            }else{
                 this.$set(item,'number',1)
            }
        },
        jian(item){
            if(!item.number || item.number<1){
                return;
            }else{
                item.number--
            }
        },
        //查询商品
        get_shangping(){
            this.shangping.query.start=this.shangping.page_index*this.shangping.query.length;
            this.$store.commit('shangPing/get_shangping',this.shangping);
        },
        //滚动条
        scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10 && !this.shangping.loading && this.shangping.list.length<this.shangping.total){
                this.shangping.page_index++;
                this.get_shangping();
            }
        },
    },
    created(){
        // console.log('收到参数1',this.shopid);
    },
    mounted() {
        // console.log('收到参数',this.shopid)
        this.shangping.query.shopid=this.shopid;
        this.get_shangping();

       
    },
    watch:{
        shopid(){
            console.log('数据发生变化',this.shopid)
        },
        shangping:{
            deep:true,
            handler(){
                console.log('商品数据发生改变')
                var this_1=this
                var list=this.shangping.list;
                var zhengshu_test=/^[1-9]+[0-9]*]*$/;   //整数
                for(var i=0;i<list.length;i++){
                    if(!list[i].number){
                        this_1.$set(list[i],'number',0)
                    }else if(!zhengshu_test.test(list[i].number)){
                        list[i].number=Math.floor(list[i].number)
                    }
                }
            },
        }
    }
}




</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-content{
    z-index: 9;
    padding-bottom: 90px;
}
.box_1{
    padding: 5px;
    li{
        background: #ffffff;
        display: flex;
        margin: 0px 0px 5px 0px;
        padding: 5px;
        .img_box{
            flex-shrink: 0;
            width: 96px;
        	height: 72px;
            margin: 0px 5px 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text{
            flex-grow: 1;
            .title_1{
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
            }
            .money{
                span{
                    color: rgba(212, 48, 48, 1);
                	font-size: 14px;
                    margin: 0px 5px 0px 0px;
                }
                s{
                    color: rgba(166, 166, 166, 1);
                	font-size: 10px;
                }
            }
            .dikou{
                display: flex;
                white-space: nowrap;
                margin: 14px 0px 0px;
                i{
                    color: #d43030;
                    font-size: 16px;
                    margin: 0px 3px 0px 0px;
                }
                span{
                    color: rgba(128, 128, 128, 1);
                	font-size: 12px;
                }
            }
        }
        .zhuanshu{
            white-space: nowrap;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            >img{
                width: 21px;
            }
            >div{
                color: #d43030;
                font-size: 10px;
            }
        }
        .xuanzhe{
            width: 83px;
        	height: 25px;
            display: flex;
            background-color: rgba(229, 229, 229, 1);
            border-radius: 3px;
            border: 1px solid rgba(204, 204, 204, 1);
            span{
                width: 24px;
                text-align: center;
                flex-shrink: 0;
                line-height: 23px;
            }
            input{
                padding: 0px ;
                margin: 0px;
                height: 100%;
                text-align: center;
                border-top: none;
                border-bottom: 0px;
                border-radius: 0px;
                background: none;
                font-size: 14px;
            }
        }
    }
}

.box_2{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: #ffffff;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    >li{
        height: 42px;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        >div{
            width: calc(100% / 3);
        }
        >div:nth-child(1){
            display: flex;
            align-items: center;
            i{
                color: #c0bcbc;
                font-size: 16px;
            }
        }
        .money_1{
            color: rgba(212, 48, 48, 1);
        }
        .money_2{
            color: rgba(212, 48, 48, 1);
            font-weight: bold;
        }
        .btn_1{
            background: $header_background;
            width: 88px;
        	height: 33px;
            padding: 0px;
            border: none;
            color: #ffffff;
        }
    }
    >li:nth-child(1){
        border-bottom: 1px solid rgba(229, 229, 229, 1);;
    }
}

.box_3{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    display: flex;
    align-items: center;
    padding: 50px 0.4rem 0px 20px;
    // padding: 1.88rem 0.4rem 0.85rem;
    .content_1{
        background: #ffffff;
        width: 100%;
        // background: rgba(246, 246, 246, 1);
        height: 396px;
        max-height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        .close_1{
            position: absolute;
            right: 0px;
            top: -50px;
            width: 36px;
            height: 36px;
            background: #ffffff;
            border-radius: 100%;
            font-size: 15px;
            color: rgba(153, 153, 153, 1);
            line-height: 36px;
            text-align: center;
        }
        .close_1::after{
            position: absolute;
            bottom: -14px;
            left: 0px;
            right: 0px;
            height: 15px;
            width: 1px;
            content: '';
            background: #ffffff;
            margin: auto;
        }
    }
    .cont_1{
        flex-grow: 1;
        overflow: auto;
        .list{
            // margin: 0px 0px 7px 0px;
            background: #ffffff;
            border-bottom: 7px solid rgba(246, 246, 246, 1);
        }
        .list:last-child{
            border: none;
        }
        ul{
            border-bottom: 1px solid rgba(246, 246, 246, 1);
            padding: 4px 9px;
            color: rgba(80, 80, 80, 1);
        	font-size: 10px;
            li{
                display: flex;
                >div{
                    width: calc(100% / 3);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .money_1{
                color: #d43030;
            }
            .dikou{
                color: #a6a6a6;
            }
        }

    }
    .footer_1{
        flex-shrink: 0;
        height: 40px;
        background-color: rgba(246, 246, 246, 1);
        display: flex;
        justify-content: space-between;
        padding: 0px 15px 0px 0px;
        .select_1{
            position: relative;
            color: rgba(80, 80, 80, 1);
            font-size: 12px;
            >div{
                padding: 0px 15px;
                display: flex;
                align-items: center;
                position: relative;
                height: 100%;
                i{
                    font-size: 14px;
                }
            }
            ul{
                position: absolute;
                bottom:100%;
                left: 0px;
                min-width: 100%;
                white-space: nowrap;
                background-color: rgba(246, 246, 246, 1);
                text-align: center;
                border: 1px solid  rgba(229, 229, 229, 1);
                border-bottom: none;
                li{
                    padding: 3px;
                    border-bottom: 1px solid  rgba(229, 229, 229, 1);
                }
            }
        }
        .money{
            color: rgba(212, 48, 48, 1);
        	font-size: 12px;
            line-height: 40px;
        }
    }
}


</style>


