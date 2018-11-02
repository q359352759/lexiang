<template>
    <div id="AgentAdvantage">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">代理人的好处</h1>
        </header>
        <div class="mui-content">
            <ul class="box_1">
                <li class="title_1">1、什么是业务代理人？</li>
                <li class="text_1">
                自愿与本公司开展业务合作的关联人员，属于合作关系（类似保险代理人和保险公司之间的关系）。
                </li>
                <li class="title_1">
                2、88元的费用是用于什么地方？
                </li>
                <li class="text_1">
                88元为课时培训费，外加专人辅导的费用。
                </li>
                <li class="title_1">
                3、成为业务代理人的好处！
                </li>
                <li class="text_1">
                （1）、自购省钱，推广赚钱。拥有优购商城上万种商品的分销权，所有商品低于市场价5%-60%。  
                </li>
                <li class="text_1">
            （2）、拥有推广权限，会员分享购物得红包，实现自动裂变。打造属于自己的顾客消费群体，他人消费你赚佣金。
                </li>
                <li class="text_1">
            （3）、公司给你团队建设补贴金最高56元/人，专人指导快速建设自己的团队。
                </li>
                <li class="text_1">
            （4）、拥有广告机的代理资格，销售一个广告机赚取199元佣金。
                </li>
                <li class="text_1">
            （5）、今后公司推出的各种业务，都拥有免费代理的资格。
                </li>
                <li class="img">
                    <img src="image/haochu.png" alt="">
                </li>
            </ul>
            
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
#AgentAdvantage {
  height: 100%;
  .mui-content {
    height: 100%;
    // background:#ffffff;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 30px;
    padding-top: 60px;
    overflow: auto;
  }
}
#AgentAdvantage .mui-bar {
  background: rgba(39, 172, 110, 1);
  a {
    color: #ffffff;
  }
}
#AgentAdvantage .mui-title {
  color: #ffffff;
}

#AgentAdvantage .title_1 {
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0px;
}
#AgentAdvantage .text_1 {
  font-size: 12px;
  text-indent: 20px;
}
#AgentAdvantage .img {
  margin: 10px 0px 0px;
}
#AgentAdvantage .img > img {
  width: 100%;
}
</style>
