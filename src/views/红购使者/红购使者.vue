<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a @click="$router.push('/my')" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
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
            userInfo:''
        }
    },
    computed: {
        ...mapGetters({
            查看类型:'红购使者/红购使者/查看类型',
            显示密码输入框:'红购使者/红购使者/显示密码输入框',
            显示姓名输入框:'红购使者/红购使者/显示姓名输入框',
            代理人信息:'agent/代理人信息',
        })
    },
    methods: {
        ...mapActions({
            获取账号:'红购使者/红购使者/获取账号',
            获取代人信息:'agent/获取代人信息',

            商家会员初始化:'agent/ShopBonus/ShopBonus_init',
            获取商家分润列表:'agent/ShopBonus/获取商家分润列表',
            获取会员分润列表:'agent/ShopBonus/获取会员分润列表',
            商家下一页:'agent/ShopBonus/商家下一页',
            会员下一页:'agent/ShopBonus/会员下一页',
        }),
    },
    mounted () {
        this.userInfo=JSON.parse(localStorage.userInfo);
        this.获取账号();
        this.获取代人信息();
        this.商家会员初始化();
        this.获取商家分润列表();
        this.获取会员分润列表();
    }
}
</script>

<style lang="scss" scoped>

</style>


