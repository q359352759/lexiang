<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红购使者</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <toubu />

            <xuanxiang />

            <dianpufenrun v-show="查看类型==0"/>
            
            <huiyuanfenrun v-show="查看类型==1"/>

            <ketixian v-show="查看类型==2"/>

            <mimashurukuang v-show="显示密码输入框" />

            <xingmingshuru v-show="显示姓名输入框"/>
        </div>
    </div>
</template>

<script>

const toubu = resolve => { require.ensure([], () => { resolve(require("./components/头部.vue")); }); };
const xuanxiang = resolve => { require.ensure([], () => { resolve(require("./components/中间选项.vue")); }); };
const dianpufenrun = resolve => { require.ensure([], () => { resolve(require("./components/店铺分润.vue")); }); };
const huiyuanfenrun = resolve => { require.ensure([], () => { resolve(require("./components/会员分润.vue")); }); };
const ketixian = resolve => { require.ensure([], () => { resolve(require("./components/可提现.vue")); }); };
const mimashurukuang = resolve => { require.ensure([], () => { resolve(require("./components/密码输入框.vue")); }); };
const xingmingshuru = resolve => { require.ensure([], () => { resolve(require("./components/姓名输入框.vue")); }); };

//这样就可以实现组件在异步加载的时候显示loading
import { mapGetters, mapActions } from 'vuex';
export default {
    name:'',
    components: {
        toubu,
        xuanxiang,
        dianpufenrun,
        huiyuanfenrun,
        ketixian,
        mimashurukuang,
        xingmingshuru
    },
    data () {
        return {
            
        }
    },
    computed: {
        ...mapGetters({
            查看类型:'红购使者/红购使者/查看类型',
            显示密码输入框:'红购使者/红购使者/显示密码输入框',
            显示姓名输入框:'红购使者/红购使者/显示姓名输入框',
        }),
    },
    methods: {
        ...mapActions({
            获取账号:'红购使者/红购使者/获取账号',
        })
    },
    mounted () {
        this.获取账号()
    }
}
</script>

<style lang="scss" scoped>

</style>


