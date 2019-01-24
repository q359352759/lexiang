<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">张三</h1>
            <span>2018年12月10号</span>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1 头部">
                <li class="header_1">
                    <div>客户</div>
                    <div>订单</div>
                    <div>金额</div>
                    <div>时间</div>
                </li>
            </ul>
            <ul class="box_1 内容">
                <li v-for="(item, index) in 20" :key="index">
                    <div>张三</div>
                    <div class="order">多个商品</div>
                    <div>0</div>
                    <div>15:30</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            店员Id:''
        };
    },
    computed: {
        
    },
    methods: {
        ...mapActions({
            查询店铺: "getMyshop",
            根据Id查询店员: "myshops/店员/根据Id查询店员",
            店员打卡记录初始化: "myshops/打卡/店员打卡记录初始化",
        }),
        async 初始化(){

        }
    },
    mounted() {
        this.店员Id=this.$route.query.id;
        this.初始化();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-bar {
    span {
        position: absolute;
        top: 0px;
        right: 10px;
        font-size: 12px;
        color: #ffffff;
        line-height: 44px;
    }
}
.mui-content {
    flex-direction: column;
    display: flex;
    .box_1.头部 {
        flex-shrink: 0;
    }
    .box_1.内容 {
        flex-grow: 1;
        overflow: auto;
    }
}
.box_1 {
    li {
        display: flex;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        div {
            width: 25%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-left: 1px solid #fafafa;
        }
        div:nth-child(1) {
            border: none;
        }
        .order {
            color: #2b82e4;
        }
    }
    li:nth-child(2n-1):not(.header_1) {
        background: #ffffff;
    }
    li.header_1 {
        background: $header_background;
        color: #ffffff;
    }
}
</style>
