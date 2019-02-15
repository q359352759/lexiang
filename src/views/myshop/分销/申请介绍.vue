<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <!-- <a @tap="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">开通分销功能</h1>
            <span @click="market()" class="yewushichang mui-pull-right">业务市场</span>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <div class="box_1">
                <li>分销说明：</li>
                <li>全民分销时代以来临！红包乐购平台致力于实体店铺的网络化经营为初衷。特此为每个实体店铺商家免费提供分销系统！</li>
            </div>
            <div class="box_2">
                <table>
                    <thead>
                        <tr>
                            <td>传统业务模式</td>
                            <td>红购分销系统</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>收益有限</span>
                                <span class="text_red">(管理难)</span>
                            </td>
                            <td>
                                <span>利益最大化</span>
                                <span class="text_red">(自我管理)</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>有底薪</span>
                                <span class="text_red">(有压力)</span>
                            </td>
                            <td>
                                <span>无底薪</span>
                                <span class="text_red">(无压力)</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>推广人员少</span>
                                <span class="text_red">(业务拓展缓慢)</span>
                            </td>
                            <td>
                                <span>更多推广人员</span>
                                <span class="text_red">(快速拓展业务)</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>手工统计业绩</span>
                                <span class="text_red">(麻烦)</span>
                            </td>
                            <td>
                                <span>系统自动处理</span>
                                <span class="text_red">(佣金立即到账)</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="box_3">
                您还未发布分销员招募信息，开通分销功能后，让更多销售员来免费替你推广。
            </div>

            <!-- <div class="btn_1">申请开通</div> -->
            <btn @click.native="$router.push('/myshop/fenxiao/fabuzhaomu')" class="btn_1" value="申请分销" />
        </div>
    </div>
</template>

<script>
import btn from "@/components/button.vue";

export default {
    name: "",
    components: {
        btn
    },
    data() {
        return {};
    },
    methods: {
        market() {
            this.$router.push("/yewushichang");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-bar .yewushichang {
    line-height: 44px;
    color: #ffffff;
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 14px;
}
.mui-content {
    background: #ffffff;
}
.box_1 {
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    padding: 27px 15px 8px;
    li:nth-child(2) {
        text-indent: 20px;
    }
}

.box_2 {
    padding: 0px 15px;
    font-size: 12px;
    text-align: center;
    table {
        width: 100%;
        border-top: 1px solid #d8d8d8;
        border-right: 1px solid #d8d8d8;
    }
    thead {
        background: $header_background;
        color: #ffffff;
    }
    td {
        width: 50%;
        height: 30px;
        line-height: 30px;
        border-left: 1px solid #d8d8d8;
        border-bottom: 1px solid #d8d8d8;
        span {
            color: rgba(80, 80, 80, 1);
        }
        .text_red {
            color: #d43030;
        }
    }
}

.box_3 {
    text-indent: 20px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    padding: 18px 11px 0px;
}

.btn_1 {
    margin: 17px auto 20px;
}
</style>
