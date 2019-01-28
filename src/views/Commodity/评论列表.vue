<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                全部{{评论.total}}个评价
            </h1>
        </header>
        <div class="mui-content mui-fullscreen" @scroll="scroll($event)">
            <pinglun style="margin:5px 0px 0px;" :item="item" v-for="(item, index) in 评论.list" :key="index"/>
            <loading :loadingtype="评论.loading" :nodata="!评论.loading && 评论.total==0" :end="!评论.loading && 评论.total!=0 && 评论.total==评论.list.length"/>
        </div>
    </div>
</template>

<script>
import pinglun from './components/评论.vue'
import loading from '@/components/loading.vue';

import { mapGetters ,mapActions } from "vuex";
export default {
    name:"",
    components: {
        pinglun,
        loading
    },
    data () {
        return {
            userInfo:'',
            id:'',
        }
    },
    computed: {
        ...mapGetters({
            评论:'shangPing/评论/评论'
        })  
    },
    methods: {
        ...mapActions({
            评论初始化:'shangPing/评论/初始化',
            查询评价:'shangPing/评论/查询评价',
            评价下一页:'shangPing/评论/评价下一页'
        }),
        //滚动条
        scroll(e) {
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            if (h + t >= sh - 10) {
                this.评价下一页();
            }
        },
    },
    mounted() {
        this.id = this.$route.query.id;
        try {
            this.userInfo=JSON.parse(localStorage.userInfo)
        } catch (error) {}

        this.评论初始化(this.id);
        this.查询评价();
    },
}
</script>

<style lang="scss" scoped>

</style>
