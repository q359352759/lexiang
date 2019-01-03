<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红购使者</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <toubu />

            <xuanxiang />

            <dianpufenrun />
            
        </div>
    </div>
</template>

<script>
import toubu from './components/头部.vue';
import xuanxiang from './components/中间选项.vue';
import dianpufenrun from './components/店铺分润.vue'
export default {
    name:'',
    components: {
        toubu,
        xuanxiang,
        dianpufenrun
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


