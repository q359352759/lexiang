<template>
    <ul>
        <li><i class="icon iconfont icon-shoucangdianjihou" :class="{'active':number>0}"></i></li>
        <li><i class="icon iconfont icon-shoucangdianjihou" :class="{'active':number>1}"></i></li>
        <li><i class="icon iconfont icon-shoucangdianjihou" :class="{'active':number>2}"></i></li>
        <li><i class="icon iconfont icon-shoucangdianjihou" :class="{'active':number>3}"></i></li>
        <li><i class="icon iconfont icon-shoucangdianjihou" :class="{'active':number>4}"></i></li>
    </ul>
</template>

<script>
export default {
    props: {
        number: {
            default: 5
        }
    },
    name: "",
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
ul {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    li {
        color: #888888;
        margin: 0px 3px;
    }
    .active {
        color: #f8d40c;
    }
}
</style>
