<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">发布记录</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <li>
                    <div class="text">公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容</div>
                    <div class="mui-text-right">
                        <span class="time">2018.11.26 17:26:34</span>
                        <!-- <span class="type_1">审核中</span> -->
                    </div>
                </li>
                <li>
                    <div class="text">公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容</div>
                    <div class="mui-text-right">
                        <span class="time">2018.11.26 17:26:34</span>
                        <!-- <span class="type_2">已发布</span> -->
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters ,mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {};
    },
    computed: {
        myshop() {
            return this.$store.state.myshop;
        },
        ...mapGetters({
            myshop:'get_myshop'
        })
    },
    methods: {
        ...mapActions({
            获取店铺:'getMyshop'
        })
    },
    beforeCreate: function () {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function () {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function () {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function () {
        if (!this.myshop || !this.myshop.id) {
            this.获取店铺()
        }
    },
    activated() { },
    beforeUpdate: function () {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-content {
    background: #ffffff;
}
.box_1 {
    > li {
        padding: 11px 11px 4px 11px;
        // background: #ffffff;
        border-bottom: 1px solid #e5e5e5;
    }
    .text {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        margin: 0px 0px 5px;
    }
    .time {
        color: rgba(166, 166, 166, 1);
        font-size: 12px;
    }
    .type_1 {
        color: rgba(255, 141, 26, 1);
        font-size: 14px;
    }
    .type_2 {
        color: rgba(0, 122, 255, 1);
        font-size: 14px;
    }
}
</style>
