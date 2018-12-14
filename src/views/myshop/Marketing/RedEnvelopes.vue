<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红包</h1>
            <span class="title_1" @tap="jilu()">
                发放记录
            </span>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <!-- 新人 -->
            <ul class="box_1">
                <li class="header_1" @tap="RedPacketReleaseRecord(0)">
                    <div>
                        <span class="title_1">店铺新人红包</span>
                        <div class="load_1" v-if="hongbao_0.loading">
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                        <span class="text_1">
                            <span v-if="!hongbao_0.obj">去发布</span>
                            <span v-if="hongbao_0.obj">{{hongbao_0.obj.amount}}元</span>
                        </span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box" v-if="hongbao_0.obj">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：{{hongbao_0.obj.quantity ? hongbao_0.obj.quantity : 0}}个</td>
                                <td style="width:10px"><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <!-- 商品红包 -->
            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(1)">
                    <div>
                        <span class="title_1">商品红包</span>
                        <div class="load_1"  v-if="hongbao_1.loading">
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                        <span class="text_1">
                            {{hongbao_1.obj ? hongbao_1.obj.amount+'元/'+hongbao_1.obj.quantityMax+'个' : '去发布'}}
                        </span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box" v-if="hongbao_1.obj">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：{{hongbao_1.obj.quantity ? hongbao_1.obj.quantity : 0}}个</td>
                                <td style="width:10px"><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <!-- 节日红包 -->
            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(2)">
                    <div>
                        <span class="title_1">节日红包</span>
                        <div class="load_1"  v-if="hongbao_2.loading">
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                        <span class="text_1">
                            {{hongbao_2.obj ? hongbao_2.obj.amount+'元/'+hongbao_2.obj.quantityMax+'个' : '去发布'}}
                        </span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box" v-if="hongbao_2.obj">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：{{hongbao_2.obj.quantity ? hongbao_2.obj.quantity : 0}}个</td>
                                <td style="width:10px"><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <!-- 庆典红包 -->
            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(4)">
                    <div>
                        <span class="title_1">庆典红包</span>
                        <div class="load_1"  v-if="hongbao_4.loading">
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                        <span class="text_1">
                            {{hongbao_4.obj ? hongbao_4.obj.amount+'元/'+hongbao_4.obj.quantityMax+'个' : '去发布'}}
                        </span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box" v-if="hongbao_4.obj">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：{{hongbao_4.obj.quantity ? hongbao_4.obj.quantity : 0}}个</td>
                                <td style="width:10px"><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <!-- 生日红包 -->
            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(5)">
                    <div>
                        <span class="title_1">生日红包</span>
                        <div class="load_1" v-if="hongbao_5.loading">
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                        <span class="text_1">
                            <span v-if="!hongbao_5.obj">去发布</span>
                            <span v-if="hongbao_5.obj">{{hongbao_5.obj.amount}}元</span>
                        </span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box" v-if="hongbao_5.obj">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：{{hongbao_5.obj.quantity ? hongbao_5.obj.quantity : 0}}个</td>
                                <td style="width:10px"><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <!-- 签到红包 -->
            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(3)">
                    <div>
                        <span class="title_1">签到红包</span>
                        <div class="load_1" v-if="hongbao_3.loading">
                            <i class="mui-icon mui-icon-spinner mui-spin"></i>
                        </div>
                        <span class="text_1">
                            {{hongbao_3.obj ? '详情' : '去发布'}}
                        </span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box" v-if="hongbao_3.obj">
                    <table>
                        <tbody>
                            <tr>
                                <td>已签到：{{hongbao_3.obj.quantity ? hongbao_3.obj.quantity : 0}}人</td>
                                <td style="width:10px"><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            
        </div>
        <!-- <div class="btn_1" @tap="RedEnvelopeIssue()">发红包</div> -->
    </div>
</template>

<script>
export default {
    name:'',
    computed:{
        myshop(){
            return this.$store.state.myshop
        },
    },
    data(){
        return{
            //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
            get_index:0,
            hongbao_0:{
                loading:true,
                obj:''
            },
            hongbao_1:{
                loading:true,
                obj:''
            },
            hongbao_2:{
                loading:true,
                obj:''
            },
            hongbao_3:{
                loading:true,
                obj:''
            },
            hongbao_4:{
                loading:true,
                obj:''
            },
            hongbao_5:{
                loading:true,
                obj:''
            }
        }
    },
    methods:{
        //跳转发放记录
        jilu(){
            this.$router.push('/myshop/Marketing/RedPackets/RedPacketRecords');
        },
        RedPacketReleaseRecord(x){
            // this.$router.push('/RedPacketReleaseRecord?type='+x);
            console.log(x)
            if(this['hongbao_'+x].loading){
                mui.toast('正在查询红包信息，请稍等。', { duration: 2000, type: "div" });
                return
            }
            if(x==0){
                if(this.hongbao_0.obj){
                    this.$router.push('/redPacketsDetails?type=0&id='+this.hongbao_0.obj.id)
                }else{
                    this.$router.push('/RedEnvelopeIssue?type=0')
                }
            }else if(x==1){
                if(this.hongbao_1.obj){
                    this.$router.push('/redPacketsDetails?type=1&id='+this.hongbao_1.obj.id)
                }else{
                    this.$router.push('/RedEnvelopeIssue?type=1')
                }
            }else if(x==2){
                if(this.hongbao_2.obj){
                    this.$router.push('/redPacketsDetails?type=2&id='+this.hongbao_2.obj.id)
                }else{
                    this.$router.push('/RedEnvelopeIssue?type=2')
                }
            }else if(x==3){
                if(this.hongbao_3.obj){
                    this.$router.push('/redPacketsDetails?type=3&id='+this.hongbao_3.obj.id)
                }else{
                    this.$router.push('/RedEnvelopeIssue?type=3')
                }
            }else if(x==4){
                if(this.hongbao_4.obj){
                    this.$router.push('/redPacketsDetails?type=4&id='+this.hongbao_4.obj.id)
                }else{
                    this.$router.push('/RedEnvelopeIssue?type=4')
                }
            }else if(x==5){
                if(this.hongbao_5.obj){
                    this.$router.push('/redPacketsDetails?type=5&id='+this.hongbao_5.obj.id)
                }else{
                    this.$router.push('/RedEnvelopeIssue?type=5')
                }
            }
        },
        RedEnvelopeIssue(){
            this.$router.push('/RedEnvelopeIssue')
        },
        //查询店铺
        // /shops/redenvelope/findall
        get_redenvelope(type){
            this['hongbao_'+type].loading=true
            this.$axios({
                method:'get',
                url:'/api-s/shops/redenvelope/findAll?start=0&length=10&shopid='+this.myshop.shopid+'&type='+type+'&ccc=1'
            }).then(x=>{
                console.log('查询红包',x)
                if(x.data.code==200){
                    this['hongbao_'+type].loading=false;
                    if(x.data.data.data.length){
                        this['hongbao_'+type].obj=x.data.data.data[0]
                    }
                }
            }).catch(err=>{
                console.log(err)
                this['hongbao_'+type].loading=false;
            })
        }
    },
    mounted() {
        if(this.myshop && this.myshop.shopid){
            this.get_index=1
            this.get_redenvelope(0);
            this.get_redenvelope(1);
            this.get_redenvelope(2);
            this.get_redenvelope(3);
            this.get_redenvelope(4);
            this.get_redenvelope(5);
        }else{
            //获取自己的店铺
            this.$store.commit('setMyshop');
        }
    },
    watch:{
        myshop(){
            if(this.myshop && this.myshop.shopid && this.get_index==0){
                this.get_redenvelope(0);
                this.get_redenvelope(1);
                this.get_redenvelope(2);
                this.get_redenvelope(3);
                this.get_redenvelope(4);
                this.get_redenvelope(5);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar{
    .title_1{
        position: absolute;
        font-size: 14px;
        color: #ffffff;
        line-height: 44px;
        top: 0px;
        right: 10px;
    }
}

.mui-content{
    padding-bottom:44px; 
}
.box_1{
    margin: 3px 0px 0px;
    padding: 0px 12px;
    background: #ffffff;
    .header_1{
        position: relative;
        border-bottom: 1px solid #efeff4;
        padding: 7px 0px;
        display: flex;
        align-items: center;
        >div:nth-child(1){
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .title_1{
            color: rgba(56, 56, 56, 1);
            font-size: 12px;
            font-weight: bold;
        }
        .text_1{
            color: rgba(0, 122, 255, 1);
        	font-size: 12px;
        }
        i{
            color: #c0bcbc;
            font-size: 16px;
        }
        .load_1{
            width: 20px;
            height: 20px;
            position: absolute;
            margin: auto;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            i{
                display: inline-block;
                animation: index_loading 1s linear infinite;
            }
        }
    }
    .table_box{
        padding: 0px 20px 13px;
        color: rgba(56, 56, 56, 1);
        font-size: 12px;
        .text_1{
            color: #d43030;
        }
    }
    table{
        width: 100%;
        white-space: nowrap;
        td{
            padding: 13px 0px 0px;
        }
    }
}

.btn_1{
    width: 100%;
    height: 40px;
    background: $header_background;
    position: fixed;
    left: 0px;
    bottom: 0px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #ffffff;
}
</style>


