<template>
    <div id="ApplicationAgent">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请代理人</h1>
        </header>

        <div class="mui-content">
            <form>
                <table class="table_1">
                    <tbody>
                        <tr>
                            <td>申请人：</td>
                            <td>
                                <input type="text" placeholder="您的真实名字">
                            </td>
                        </tr>
                        <tr>
                            <td>推荐人：</td>
                            <td>
                                <input type="text" placeholder="推荐人电话号码">
                            </td>
                        </tr>
                        <tr>
                            <td>实名认证：</td>
                            <td>
                                <span class="Authentication">已认证</span>
                                <i class="mui-icon mui-icon-arrowright mui-pull-right"></i>
                            </td>
                        </tr>
                        <tr>
                            <td>申请区域：</td>
                            <td>
                                <span class="region">选择区域</span>
                                <div class="Surplus mui-pull-right">
                                    <span>剩余234个</span>
                                    <i class="mui-icon mui-icon-arrowright "></i>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>费&nbsp;&nbsp;用：</td>
                            <td class="money">
                                <span>￥88</span>
                                <span>(3课时培训费用)</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="box_2">支付方式</div>
                <ul class="box_3">
                    <li @click="change_radio_1(1)">
                        <div class="radio_1 "  :class="{'active':radio_type_1==1}">
                            <i class="icon iconfont icon-dui"></i>
                            <!-- <i class="mui-icon mui-icon-checkmarkempty"></i> -->
                        </div>
                        <i class="icon iconfont icon-weixin weixin"></i>
                        <span>微信支付</span>
                    </li>
                    <li @click="change_radio_1(2)">
                        <div class="radio_1" :class="{'active':radio_type_1==2}">
                            <i class="icon iconfont icon-dui"></i>
                        </div>
                        <i class="icon iconfont icon-zhifubao zhifubao"></i>
                        <span>支付宝</span>
                    </li>
                </ul>
                <div class="box_4">
                    <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                        <i class="icon iconfont icon-dui"></i>
                    </div>
                    <span @click="change_radio_2()">我也阅读并同意</span>
                    <span>《业务代理合作协议》</span>
                </div>
                
                <button class="btn_1" type="submit">确定</button>

            </form>

        </div>

        <circularNav/>
    </div>
</template>

<script>
    import circularNav from '@/components/circularNav.vue'
    export default{
        name:'ApplicationAgent',
        components:{
            circularNav
        },
        data(){
            return{
                'radio_type_1':1,
                'radio_type_2':1,
            }
        },
        methods:{
            change_radio_1(x){
                this.radio_type_1=x
            },
            change_radio_2(){
                this.radio_type_2=!this.radio_type_2
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
    #ApplicationAgent{
        height: 100%;
        // .mui-content{
        //     height: 100%;
        //     background:#ffffff;
        // }
    }
    #ApplicationAgent .mui-bar{
        background: rgba(39, 172, 110, 1);
        a{
            color: #ffffff;
        }
    }
    #ApplicationAgent .mui-title{
        color: #ffffff;
    }

    #ApplicationAgent .table_1{
        width: 100%;
        background: #ffffff;
        margin: 0.15rem 0px 0px;
        tr{
            border-bottom: 1px solid #cccccc;
            height: 40px;
            >td:nth-child(1){
                padding: 0px 20px 0px;
                width: 1px;
                white-space: nowrap;
                font-size: 14px;
            }
            >td:nth-child(2){
                padding: 0px 20px 0px 0px;
            }
        }
        i{
            color:  rgba(166, 166, 166, 1);
        }
        input{
            margin: 0px;
            padding: 0px;
            height: auto;
            border: none;
            font-size: 14px;
            opacity: 0.8;
        }
        .Authentication{
            font-size: 14px;
            color: rgba(58, 182, 237, 1);
        }
        .region{
            font-size: 14px;
            color:  rgba(166, 166, 166, 1);
        }
        .Surplus{
            display: flex;
            align-items: center;
            span{
                font-size: 12px;
                 color:  rgba(166, 166, 166, 1);
            }
        }
        .money{
            >span:nth-child(1){
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
            >span:nth-child(2){
                font-size: 14px;
                color: rgba(166, 166, 166, 1);
                margin: 0px 0px 0px 10px;
            }
        }
    }

    #ApplicationAgent .box_2{
        padding: 0px 20px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    #ApplicationAgent .box_3{
        display: flex;
        background: #ffffff;
        padding: 10px 20px;
        span{
            font-size: 14px;
        }
        li{
            width: 50%;
            display: flex;
            align-items: center;
        }
        .weixin{
            font-size: 26px;
            margin: 0px 0.1rem;
            color: rgba(38, 172, 108, 1);
        }
        .zhifubao{
            font-size: 26px;
            margin: 0px 0.1rem;
            color: rgba(58, 182, 237, 1);
        }
    }
    #ApplicationAgent .box_4{
        display: flex;
        padding: 0px 20px;
        font-size: 14px;
        align-items: center;
        margin:20px 0px;
        >span:nth-child(2){
            margin: 0px 0px 0px 5px;
        }
        >span:nth-child(3){
            color: rgba(58, 182, 237, 1)
        }
    }
    #ApplicationAgent .btn_1{
        width: 200px;
        height: 30px;
        display: block;
        margin: 0px auto;
        border-radius: 30px;
        border: none;
        background: rgba(38, 172, 108, 1);
        color: #ffffff;
    }


    // 单选
    #ApplicationAgent .radio_1{
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 15px;
        border-radius: 100%;
        border: 2px solid #cccccc;
        font-size: 12px;
        i{
            font-size: 12px;
            display: none;
        }
    }
    #ApplicationAgent .radio_1.active{
        background: rgba(58, 182, 237, 1);
         border: 2px solid rgba(58, 182, 237, 1);
        color: #ffffff;
        i{
            display: inline-block;
        }
    }
</style>
