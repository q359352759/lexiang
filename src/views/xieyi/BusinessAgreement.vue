<template>
    <div id="BusinessAgreement">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">业务代理合作协议</h1>
        </header>
        <div class="mui-content">
            <div class="title">
            甲方:在易起科技成都有限公司
            </div>
            <div class="title">
            乙方:{{name}}
            </div>
            <div class="text_1">
            为响应大众创业万众创新的号召，在易起科技成都有限公司特面向社会搭建一个“合伙创业孵化平台”，为全国各地的代理人提供一个 良好的创业机会。本着资源共享、互惠互利的原则，秉持公平、公正、公开、合情、合理、合法的原则，经双方友好协商，特签署如下协议:
            </div>
            <div class="title_1">
            一、合作简述
            </div>
            <div class="text_1">
                1.甲乙双方属于代理合作性质，代理费用及缴纳方式在业务管理界面显示。
            </div>
            <div class="text_1">  
                2.甲方有偿向乙方提供创业机会和专业培训，并提供专人的辅助指导。
            </div>
            <div class="text_1">  
                3.乙方开拓市场发展业务，享有佣金及相关收益。
            </div>
            <div class="text_1">  
                4.乙方在不违反协议的条件下，可享有永久性的佣金收益。
            </div>
            <div class="title_1">
            二、甲方的权益与义务
            </div>
            <div class="text_1">
                1.甲方拥有乙方业绩考核的审核权限。
            </div>
            <div class="text_1">
                2.甲方拥有乙方代理业务范围调整及冻结权限。
            </div>
            <div class="text_1">    
                3.甲方拥有乙方代理费用及缴纳方式的调整权限。
            </div>
            <div class="text_1">   
                4.甲方拥有乙方佣金、差额、补助、奖励的具体调整权限。
            </div>
            <div class="text_1">    
                5.甲方需承担乙方佣金、差额、补助、奖励的提现金额的支付义务。
            </div>
            <div class="text_1">  
                6.甲方需承担平台系统正常运营及管理维护的义务。
            </div>
            <div class="text_1">  
                7.甲方需向乙方提供(有偿)宣传资料和讲解培训的义务。
            </div>
            <div class="title_1">
            三、乙方的权益与义务
            </div>
            <div class="title_2">
            (一)权益
            </div>
            <div class="text_1">
                1.乙方享有对商家、业务代理人、会员的推荐权益。
            </div>
            <div class="text_1">  
                2.乙方享有终身的佣金收入权益。
            </div>
            <div class="text_1">  
                3.乙方享有甲方的培训机会和辅导权益。
            </div>
            <div class="text_1">  
                4.乙方享有推荐商家和城市合伙人的基本保障权益。
            </div>
            <div class="title_2">
            (二)义务
            </div>
            <div class="text_1">
                1.乙方有主动向被推广的会员及商家提供讲解及辅导的义务。
            </div>
            <div class="text_1">  
                2.在开展业务过程中， 乙方应忠实于甲方提供的各种资料，保证各种宣传准确无误，不得任意夸大和捏造，不得损害甲方的利益和市场形象，否则应承担由此引起的一切后果。 
            </div>
            <div class="text_1">  
                3.乙方有义务向所推广人员及商家提供讲解、咨询、售后处理工作，并对当地的业务发展进行市场维护。
            </div>
            <div class="text_1">  
                4.代理过程中遇有顾客对甲方产品质量提出异议和申诉时， 乙方应先行积极处理，并立即通知甲方，将对甲方造成的不良影响及损失降到最低，应维护甲方品牌在当地的形象和声誉。 
            </div>
            <div class="text_1">  
                5.乙方有义务向甲方提供个人的真实身份信息。
            </div>
            <div class="text_1">  
                6.乙方有义务接受甲方的业绩考核。
            </div>
            <div class="text_1">  
                7.乙方有义务缴纳个人所得税。
            </div>
            <div class="title_1">
            四、合作约定及处理
            </div>
            <div class="text_1">
                1.乙方的佣金收入达到国家个人所得税征收点时，由甲方按照国家的个人所得税征收标准来统一结算扣除。
            </div>
            <div class="text_1">  
                2.乙方在合作期间不能配合公司的发展和市场维护，经公司调差取证后，有权取消乙方的合作资格!
            </div>
            <div class="title_1">
                五、法律纠纷及处理
            </div>
            <div class="text_1">
                1.甲乙双方如有异议和法律纠纷问题，可以进行协商处理或采用法律诉讼。
            </div>
            <div class="title_1">
                六、协议生效及失效
            </div>
            <div class="text_1">
                1.本协议自乙方申请成为业务代理人之日起生效。
            </div>


        </div>
    </div>
</template>
    
<script>
export default {
  name: "",
  data() {
    return {
      name: "测试"
    };
  },
  methods: {},
  mounted() {
    console.log(this.$route);
    var query = this.$route.query;
    this.name = query.name;
  }
};
</script>

<style lang="scss">
#BusinessAgreement {
  height: 100%;
  .mui-content {
    height: 100%;
    // background:#ffffff;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 30px;
    overflow: auto;
  }
}
#BusinessAgreement .mui-bar {
  background: rgba(39, 172, 110, 1);
  a {
    color: #ffffff;
  }
}
#BusinessAgreement .mui-title {
  color: #ffffff;
}

#BusinessAgreement .title {
  margin: 10px 0px;
  font-weight: bold;
}
#BusinessAgreement .title_1 {
  margin: 5px 0px;
  font-size: 12px;
  font-weight: bold;
}

#BusinessAgreement .text_1 {
  font-size: 12px;
  text-indent: 20px;
}
</style>
