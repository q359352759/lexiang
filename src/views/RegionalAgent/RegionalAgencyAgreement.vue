<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">区域代理说明</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                申请区域代理
            </div>
            <ul class="box_2">
                <li class="text_indent_1">
        很高兴您能看到此申请界面，在此您已经超越了很多人。在易起科技成都有限公司花费巨资和半年的筹划与开发打造了这一套店铺分销系统和红包促销管理系统，以及与拓客系统和互动营销系统。只要你申请成为区域代理商，等同于与公司一起来开拓市场的财富！
                </li>
                <li class="text_indent_1">
        价值上千万的系统，公司已为你备好！申请成为区域代理商后，你便享有公司市场利润50%的分成。
                </li>
                <li class="text_indent_1">
        如果你所在区域依然还可以申请成为代理商，那你已经走在了1000个业务代理人的前面！公司的区域代理制度为：每个区县只有1个区域代理商，下设1000个区域代理人。
                </li>
                <li class="text_indent_1">
        你同公司一起来开拓这1000人的团队，而你不用发工资，这1000人照样为你创造财富。
                </li>
                <li class="kong"></li>
                <li>
        接下来你需要做的是：
                </li>
                <li>
        1、申请成为区域代理商，预付3000元诚意金。这3000元诚意金会在加盟费中进行抵扣。
                </li>
                <li>
        2、联系你所在的区域的所有代理人，进行沟通交流，一起开拓市场。
                </li>
                <li>
        3、组织线下商家活动，你会拥有以下收益：
                </li>
                <li class="text_indent_1">
        （1）享有市场促销金额万分之五的分润。
                </li>
                <li class="text_indent_1">
      （2）享有官方直营商城所有商品分佣5%的分润。
                </li>
                <li class="text_indent_1">
      （3）享有代理区域所有店铺分销分佣金额5%的分润。
                </li>
                <li class="text_indent_1">
      （4）享有市场团队建设10元/人的补贴。
                </li>
                <li>
        4、除此之外你还享有平台以下收益50%的分润：
                </li>
                <li class="text_indent_1">
      （1）平台为店铺开通拓客锁粉功能，每个店铺拓客锁粉1000人内免费，超出部分按每人一元计算。
                </li>
                <li class="text_indent_1">
      （2）平台为商家每月免费提供2000条群发信息，超出部分按每条0.05元计算。
                </li>
                <li class="text_indent_1">
      （3）平台为所有店铺免费提供60人以内的分销员招募，超过60的按100元/10人计算，超出100人的按15元/人继续拿。
                </li>
                <li class="text_indent_1">
      （4）平台为店铺提招募展示：本市免费、本省20元/天计费，全国按100元/天计费。
                </li>
                <li class="kong"></li>
                <li>
        你点击申请过后我们将有工作人员与你进行联系！
                </li>
                <li>
        审核通过后你将成为在易起科技成都有限公司，红购app，所代理区域的“预选区域代理商”，工作人员会把你拉入到红购区域代理商管理群，参与学习和交流！
                </li>
                <li>
        你需要通过60天时间完成以下考核内容，就能与公司签约，并成为永久性的区域代理商。
                </li>
                <li class="text_indent_1">
      （1）完成200人的业务代理人团队。
                </li>
                <li class="text_indent_1">
      （2）开拓400家数字店铺。
                </li>
                <li class="text_indent_1">
      （3）完成200家店铺的分销功能开通。
                </li>
                <li class="text_indent_1">
      （4）所有店铺累计完成1000个订单。
                </li>
                <li class="kong"></li>
                <li>
        我们期待精彩的你来与我们一起拓展市场，分享红利！
                </li>
                <li  class="kong"></li>
                <li>
        现在申请即送价值498的广告机套餐！
                </li>
            </ul>

            <button @click="ApplicationRegionalAgents()" class="btn_1">
                申请
            </button>

        </div>
    </div>
</template>

<script>
import {openloading,convert} from "@/assets/js/currency";

export default {
    name:'',
    data(){
        return{}
    },
    methods:{
        ApplicationRegionalAgents(){
            this.$router.push('/ApplicationRegionalAgents')
        }
    },
    mounted: function() {
        var area=[];
        try {
            area=JSON.parse(localStorage.area)
        } catch (error) {}
        
        var cityData3 = convert(area, null);
        localStorage.cityData3=JSON.stringify(cityData3)
        
        // console.group('------mounted 挂载结束状态------');
    },
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-content{
    background: #ffffff;
}
.box_1{
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    text-align: center;
    margin: 13px 0px 0px;
}
.box_2{
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    padding: 10px;
    .text_indent_1{
        text-indent: 20px;
    }
    .kong{
        height: 20px;
    }
}
.btn_1{
    display: block;
    width: 1.75rem;
	height: 34px;
    padding: 0px;
    margin: 0.4rem auto 0.6rem;
    border-radius: 34px;
    background: $header_background;
    color: #ffffff;
    font-size: 14px;
    border: none;
}
</style>

