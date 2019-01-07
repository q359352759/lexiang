<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">开店说明</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="indent_1">
                    在易起科技成都有限公司致力于实体店铺的网络化运营和营销管理，倾力打造数字店铺营销管理系统。
                </div>
                <div class="padding_1">
                    <div>公司为实体店铺免费提供以下功能：</div>
                    <div class="indent_1">
                        1、免费开设数字店铺，我们将你的店铺信息植入到消费者的搜索引擎里面，便于客户主动找到你。
                    </div>
                    <div class="indent_1">
                        2、免费开通在线购物功能，可发布商品，用户在线购买。
                    </div>
                    <div class="indent_1">
                        3、免费提供店铺二维码，可实现扫码领红包；扫码锁定粉丝；扫码进入店铺展示；扫码付款。
                    </div>
                    <div class="indent_1">
                        4、免费提供经营数据报表，可清晰的分析出你的店铺经营情况！
                    </div>
                    <div class="indent_1">
                        5、免费提供红包促销系统，你可以发布以下红包类型实现零费用促销：
                    </div>
                    <div class="indent_1">
                        （1）店铺红包，给顾客的见面礼，实现让顾客主动上门，并锁定消费。
                    </div>
                    <div class="indent_1">
                        （2）商品红包，增加你的店铺人气，实现爆款商品促销。
                    </div>
                    <div class="indent_1">
                        （3）节日红包，回馈顾客和店铺促销一并搞定。
                    </div>
                    <div class="indent_1">
                        （4）庆典红包，让顾客与店铺庆典更能感受到促销的火热景象。
                    </div>
                    <div class="indent_1">
                        （5）签到红包，让你的特大型促销实现聚集人气、蓄势待发，更能呈现出一番繁荣红火的景象。
                    </div>
                    <div class="indent_1">
                        6、免费提供互动营销功能，平台为你免费提供客
                        户消息站内群发功能（免去短信群发费用），让你的
                        促销信息第一时间通知到你的顾客。
                    </div>
                    <div class="indent_1">
                        7、免费为你提供店铺分销功能，你可以在本地区
                        免费招募更多的分销员，为你的店铺开展推广工作。
                        你无需向店铺分销员提供工作底薪及工作福利，只需
                        要把你的商品及服务的一部分利润作为佣金即可。
                    </div>
                    <div class="indent_1">
                        8、如果你对我们的平台功能及服务还满意，希望
                        申请开设店铺，你需要提前准备好以下内容：
                    </div>
                    <div class="indent_1">
                        （1）店铺法人身份证正反面高清图片。
                    </div>
                    <div class="indent_1">（2）营业执照高清图片。</div>
                    <div class="indent_1">（3）店招、店铺环境高清图片。</div>
                </div>
            </div>
            <div class="box_2" @click="ApplicationShop()">
                申请开店
            </div>
            
            <div class="mask" v-show="get_myshop">
                <span>
                    {{text}}...
                </span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'',
    data(){
        return{
            get_myshop:true,
            text:'正在获取数据'
        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop
        }
    },
    methods:{
        ApplicationShop(){
            sessionStorage.removeItem('Red_envelopes_0');
            this.$router.push('/shenqingkaidian');
        },
        init(){
            if(!this.myshop || !this.myshop.id){
                console.log('没有店铺');
                this.get_myshop=false
            }else if(this.myshop.shopid && this.myshop.state!=1){
                console.log('有店铺没通过');
                this.get_myshop=false;
                this.$router.push('/shenqingkaidian')
            }else if(this.myshop.shopid && this.myshop.state==1){
                console.log('有店铺');
                // this.get_myshop=false
                this.$router.push('/myshop')
            }
        }
    },
    mounted() {
        //判断是否有店铺
        //查询我的店铺
        if(!this.myshop || !this.myshop.id){
            this.$store.dispatch('getMyshop').then((x)=>{
                console.log(x);
                if(x.data.code){
                    this.init();
                }else{
                    this.text='网络错误，稍后再试'
                }
            }).catch(err=>{
                console.log('获取店铺信息失败');
                this.text='网络错误，稍后再试'
            })
        }else{
            this.init()
        }
        // this.$store.commit('setMyshop');
        // console.log(this.myshop);
        // this.init();
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';
.box_1{
    padding: 0.15rem 0.1rem 0.6rem;
    color: rgba(80, 80, 80, 1);
	font-size: 0.14rem;
}
.padding_1{
    padding: 0px 0px 0px 0.15rem;
}
.indent_1{
    text-indent: 1em;
}
.box_2{
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    background:$header_background;
    text-align: center;
	height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.14rem;
    color: #ffffff;
}
.mask{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
</style>

