<template>
    <div id="register">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">注册</h1>
        </header>
        <div class="mui-content">
            <form class="box_1">
                <ul>
                    <li>
                        <i class="icon iconfont icon-tel"></i>
                        <input type="text" required placeholder="手机号码">
                    </li>
                    <li>
                        <i class="icon iconfont icon-icon-mima"></i>
                        <input type="text" required placeholder="验证码">
                        <span class="Verification">获取验证码</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-icon-mima"></i>
                        <input type="text" required placeholder="登录密码">
                        <span class="tishi">（6-16位数字字母组成）</span>
                    </li>
                    <li>
                        <i class="icon iconfont icon-icon-mima"></i>
                        <input type="text" required placeholder="确认密码">
                    </li>
                </ul>
                <button class="btn_1" type="submit">立即注册</button>
            </form>
        </div>
        <circularNav/>
    </div>
</template>

<script>
    import circularNav from '@/components/circularNav.vue';
    export default{
        name:"register",
        components:{
            circularNav
        },
        data(){
            return{}
        },
        methods:{

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
            // console.group('------mounted 挂载结束状态------');
        },
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
        }
    }
</script>

<style lang="scss">
    #register{
        height: 100%;
        .mui-content{
            height: 100%;
            background:#ffffff;
        }
    }
    #register .mui-bar{
        background: rgba(39, 172, 110, 1);
        a{
            color: #ffffff;
        }
    }
    #register .mui-title{
        color: #ffffff;
    }
    #register .swiper-pagination-bullet-active{
        background: rgba(39, 172, 110, 1)
    }

    #register .box_1{
        width: 2.9rem;
        display: block;
        margin: 0.6rem auto 0px;
        white-space: nowrap;
        >ul{
            >li{
                display: flex;
                align-items: flex-end;
                margin: 0px 0px 0.35rem 0px;
                border-bottom:1px solid rgba(164, 164, 164, 1);
                position: relative;
                .tishi{
                    position: absolute;
                    left: 1rem;
                    bottom: 0px;
                    font-size: 12px;
                     color: #ababab;
                }
                input{
                    margin: 0px;
                    padding: 0px 0.1rem 0px;
                    height: auto;
                    background: none;
                    border:none;
                    opacity: 0.7;
                    position: relative;
                    z-index: 1;
                }
                i{
                    color: #ababab;
                    // opacity: 0.7;
                }
            }
        }
        .Verification{
            color: rgba(36, 172, 108, 1);
        }
        .btn_1{
            width: 2.5rem;
            display: block;
            margin: 0px auto;
            height: 35px;
            background: rgba(36, 172, 108, 1);
            border: none;
            border-radius: 35px;
            color: #ffffff;
        }
    }


</style>


