<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">代理费缴纳说明</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div>
                成为预选代理商后默认代理费为200000元，系统根据不同的区域设定不同的代理费用，最后以系统设定的代理费为准。
                </div>
                <div class="text_1">
                代理费设定规则如下表：
                </div>
                <table class="table_1">
                    <tbody>
                        <tr>
                            <td></td>
                            <td>区</td>
                            <td>县</td>
                        </tr>
                        <tr>
                            <td>1线城市</td>
                            <td>400000元</td>
                            <td>400000元</td>
                        </tr>
                        <tr>
                            <td>2线城市</td>
                            <td>300000元</td>
                            <td>300000元</td>
                        </tr>
                        <tr>
                            <td>3-5线城市</td>
                            <td>200000元</td>
                            <td>250000元</td>
                        </tr>
                    </tbody>
                </table>
                <div class="text_1">
                代理费无需一次性缴纳完成，代理商提现时平台自动扣除30%作为代理费，直到代理费缴纳完成。
                </div>
                <div>
                代理费缴纳完成之后，提现扣除4%的平台费用。
                </div>

            </div>
            
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

<style lang="scss" scoped>
.box_1 {
  padding: 10px;
  font-size: 14px;
  line-height: 24px;
}
.text_1 {
  margin: 15px 0px 0px;
}
.table_1 {
  width: 100%;
  border: 1px solid #a2a2a2;
  text-align: center;
  tr {
    border-top: 1px solid #a2a2a2;
  }
  td {
    border-left: 1px solid #a2a2a2;
  }
}
</style>
