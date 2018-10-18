<template>
    <div id="login">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">
            <div class="logo_img">
                <img src="@/assets/image/1.png" alt="" srcset="">
            </div>

            <form>
                <ul class="box_1">
                    <li>
                        <i class="mui-icon mui-icon-person"></i>
                        <input type="text" required>
                    </li>
                    <li>
                        <i class="mui-icon mui-icon-locked"></i>
                        <input type="password" required name="" id="">
                    </li>
                </ul>
                <button class="Sign_in" type="submit">登录</button>
            </form>

            <div class="weixing"><i class="mui-icon mui-icon-weixin"></i></div>

            <ul class="box_2">
                <li>忘记密码？</li>
                <li @click="register()">立即注册></li>
            </ul>

        </div>
        
        <circularNav/>
    </div>
</template>

<script>
    import circularNav from "@/components/circularNav.vue";
    export default{
        name:"login",
        components:{
            circularNav
        },
        data(){
            return{}
        },
        methods:{
            register(){
                this.$router.push('/register')
            }
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
    #login{
        height: 100%;
    }
    #login .mui-content{
        height: 100%;
        background: #ffffff;
    }
    #login .mui-bar{
        background: rgba(39, 172, 110, 1);
        box-shadow:none;
        a{
            color: #ffffff;
        }
    }
    #login .mui-title{
        color: #ffffff;
    }
    #login .swiper-pagination-bullet-active{
        background: rgba(39, 172, 110, 1)
    }

    #login .logo_img{
        width: 0.8rem;
        height: 0.8rem;
        margin: 0.3rem auto;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }

    #login .box_1{
        width: 2.5rem;
        margin: 0px auto;
        li{
            margin: 0px 0px 0.3rem 0px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #cccccc;
            input{
                margin: 0px;
                border: none;
                padding: 0px;
                height: 0.3rem;
                background: none;
            }
        }
    }
    #login .Sign_in{
        width: 2.5rem;
        margin: 0px auto;
        display: block;
        height: 0.35rem;
        border-radius: 0.35rem;
        background: rgba(39, 172, 110, 1);
        color: #ffffff;
        border: none;
    }

    #login .weixing{
        width: 30px;
        height: 30px;
        margin: 30px auto;
        border: 1px solid #cccccc;
        text-align: center;
        line-height: 28px;
        border-radius: 30px;
        color: #cccccc;
        i{
            font-size: 20px;
        }
    }

    #login .box_2{
        width: 2.5rem;
        margin: 0px auto;
        display: flex;
        color: rgba(148, 148, 148, 1);
        li{
            width: 50%;
            text-align: center;
        }
        li:nth-child(1){
            border-right: 2px solid rgba(148, 148, 148, 1);
        }
    }

</style>
