<template>
    <div id="Agent">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">代理人</h1>
        </header>

        <div class="mui-content">
            <div class="box_1">
                <div class="img_box">
                    <img src="@/assets/image/1.png" alt="" srcset="">
                </div>
                <div class="text">
                    <div>马云-业务代理人</div>
                    <div>四川省成都市武侯区</div>
                </div>
            </div>

            <ul class="box_2">
                <li :class="{'active':type_1==1}" @click="change_type(1)">
                    <div class="img_box">
                        <img src="@/assets/image/1.png" alt="" srcset="">
                    </div>
                    <div class="title">补贴</div>
                    <div class="money">324.50</div>
                </li>
                <li :class="{'active':type_1==2}" @click="change_type(2)">
                    <div class="img_box">
                        <img src="@/assets/image/1.png" alt="" srcset="">
                    </div>
                    <div class="title">广告机</div>
                    <div class="money">324.50</div>
                </li>
                <li  :class="{'active':type_1==3}" @click="change_type(3)">
                    <div class="img_box">
                        <img src="@/assets/image/1.png" alt="" srcset="">
                    </div>
                    <div class="title">分红</div>
                    <div class="money">324.50</div>
                </li>
                <li :class="{'active':type_1==4}" @click="change_type(4)">
                    <div class="img_box">
                        <img src="@/assets/image/1.png" alt="" srcset="">
                    </div>
                    <div class="title">可提现</div>
                    <div class="money">324.50</div>
                </li>
            </ul>

            <div class="content">
                <div class="box_3" v-show="type_1==1">
                    <ul class="title">
                        <li>姓名</li>
                        <li>日期</li>
                        <li>直补</li>
                        <li>+直补</li>
                        <li>间补</li>
                        <li>+间补</li>
                    </ul>
                    <ul class="list">
                        <li v-for="x in list_1">
                            <div>张文涛</div>
                            <div>2018-09-20</div>
                            <div>26</div>
                            <div>6</div>
                            <div>18</div>
                            <div>0</div>
                        </li>
                    </ul>
                    <ul class="footer">
                        <li>直推：5000人</li>
                        <li>间推：2500人</li>
                        <li>直补：5000元</li>
                        <li>间补：25800元</li>
                    </ul>
                </div>
                
                <div class="box_4" v-show="type_1==2">
                    <ul class="title">
                        <li>客户</li>
                        <li>销售日期</li>
                        <li>套餐</li>
                        <li>佣金</li>
                    </ul>
                    <ul class="list"> 
                        <li v-for="x in list_1">
                            <div>李四</div>
                            <div>2018.01.16</div>
                            <div>至尊套餐</div>
                            <div>199</div>
                        </li>
                    </ul>
                    <ul class="footer">
                        <li>客户：50人</li>
                        <li>套餐数：50个</li>
                        <li>佣金：4900元</li>
                    </ul>
                </div>

                <div class="box_5" v-show="type_1==3">
                    <ul class="title">
                        <li>姓名</li>
                        <li>日期</li>
                        <li>新增LB</li>
                        <li>分红</li>
                    </ul>
                    <ul class="list">
                        <li v-for="x in  list_1">
                            <div>王五</div>
                            <div>2018-05-20</div>
                            <div>100</div>
                            <div>50</div>
                        </li>
                    </ul>
                    <ul class="footer">
                        <li>会员：50人</li>
                        <li>总LB：50个</li>
                        <li>总分红：4900元</li>
                    </ul>
                </div>
            
                <div class="box_6" v-show="type_1==4">
                    <ul class="list">
                        <li>
                            <div>补贴：324.43</div>
                            <div>累计：3214.43</div>
                        </li>
                        <li>
                            <div>广告机：4322.00</div>
                            <div>累计：43222.00</div>
                        </li>
                        <li>
                            <div>补贴：324.43</div>
                            <div>累计：1324.43</div>
                        </li>
                    </ul>
                    <ul class="Collect_Money" @click="Account()">
                        <li>收款账户：支付宝(*奇东)</li>
                        <li><i class="mui-icon mui-icon-arrowright"></i></li>
                    </ul>
                    <ul class="money">
                        <li>提现金额： </li>
                        <li>
                            <span>￥6210.86</span>
                            <span>费率：5%</span>
                        </li>
                    </ul>
                    <div class="Agreement">
                        <div @click="change_radio_2()" class="radio_1" :class="{'active':radio_type_2}">
                            <i class="icon iconfont icon-dui"></i>
                        </div>
                        <span @click="change_radio_2()">我也阅读并同意</span>
                        <span>《业务代理合作协议》</span>
                    </div>
                    <button class="btn_1" @click="change_payment(true)">提交</button>
                </div>
            
            </div>

            <div class="payment" v-show="payment">
                <div class="mask"></div>
                <div class="payment_1">
                    <div class="forget">忘记密码？</div>
                    <div class="close_1" @click="change_payment(false)"><i class="mui-icon mui-icon-closeempty"></i></div>
                    <div class="title">支付密码</div>
                    <div class="input_box">
                        <input type="text">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <button class="btn_2">确定</button>
                </div>
            </div>

        </div>

        <circularNav/>
    </div>
</template>

<script>
    import circularNav from '@/components/circularNav.vue'
    export default{
        name:'Agent',
        components:{
            circularNav
        },
        data(){
            return{
                type_1:1,
                list_1:[1,2,3,4,5,6,1,1,1,1,1,1,1,1,1,1,1,1],
                // list_1:[1]
                radio_type_2:true,
                payment:false,
            }
        },
        methods:{
            change_type(x){
                this.type_1=x
            },
            change_radio_2(){
                this.radio_type_2=!this.radio_type_2
            },
            change_payment(x){
                this.payment=x
            },
            Account(){
                this.$router.push('/Account')
            }
        }
    }
</script>

<style lang="scss">
     #Agent{
        height: 100%;
        .mui-content{
            height: 100%;
            // background:#ffffff;
            display: flex;
            flex-direction:column;
        }
        footer{
            position: fixed;
            width: 100%;
            bottom: 0px;
            left: 0px;
            background: rgba(54, 140, 89, 1);
        }
    }
    #Agent .mui-bar{
        background: rgba(39, 172, 110, 1);
        a{
            color: #ffffff;
        }
    }
    #Agent .mui-title{
        color: #ffffff;
    }

    #Agent .box_1{
        flex-shrink: 0;
        display: flex;
        padding: 0.15rem 0.18rem;
        align-items: center;
        background-color: rgba(255, 255, 255, 1);
        .img_box{
            width: 0.5rem;
            height: 0.5rem;
            margin: 0px 0.1rem 0px 0px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        .text{
            >div:nth-child(1){
                color: rgba(80, 80, 80, 1);
                font-size: 0.14rem;
                font-weight: bold;
            }
            >div:nth-child(2){
                color: rgba(128, 128, 128, 1);
                font-size: 0.12rem;
            }
        }
    }
    #Agent .box_2{
        flex-shrink: 0;
        display: flex;
        margin: 0.05rem 0px 0px;
        >li:nth-child(1){
            border: none;
        }
        li.active{
            background: #efeff4;
        }
        li{
            width: 25%;
            padding: 0.1rem 0px 0.08rem;
            background: #ffffff;
            text-align: center;
            border-left: 1px solid #efeff4;
            .img_box{
                width: 0.37rem;
                height: 0.37rem;
                margin: 0px auto  3px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 100%;
                }
            }
        }
        .title{
            color: rgba(80, 80, 80, 1);
            font-size: 0.11rem;
            line-height: initial;
            line-height: 0.16rem;
        }
        .money{
            color: rgba(227, 60, 100, 1);
            font-size: 0.11rem;
            line-height: 0.16rem;
        }
    }

#Agent .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

    #Agent .box_3{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin: 5px 0px 0px;
        .title{
            display: flex;
            flex-shrink: 0;
            height: 30px;
            background: #ffffff;
            align-items: center;
            font-weight: bold;
            li{
                min-height: 100%;
                flex-grow: 1;
                text-align: center;
                border-left: 1px solid #e2e1e1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 30px;
                font-size: 12px;
                line-height: 30px;
            }
            >li:nth-child(1){
                white-space: nowrap;
                width: 60px;
                border: none;
            }
            >li:nth-child(2){
                white-space: nowrap;
                 width: 50px;
            }
        }
        .list{
            overflow: auto;
            flex-grow: 1;
        }
        .list>li:nth-child(2n){
            background: #ffffff;
        }
        .list>li:nth-child(2n-1){
            background: rgba(242, 242, 242, 1);
        }
        .list>li{
             color: #5a5a5a;
            display: flex;
            height: 30px;
            align-items: center;
            div{
                min-height: 100%;
                flex-grow: 1;
                text-align: center;
                border-left: 1px solid #e2e1e1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 30px;
                font-size: 12px;
                line-height: 30px;
            }
            >div:nth-child(1){
                white-space: nowrap;
                width: 60px;
                border: none;
            }
            >div:nth-child(2){
                white-space: nowrap;
                 width: 50px;
            }
        }
        .footer{
            display: flex;
            height: 32px;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(54, 140, 89, 1);
            font-size: 11px;
            text-align: center;
            line-height: 32px;
            flex-shrink: 0;
            li{
                width: 25%;
            }
        }
    }

    #Agent .box_4{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        margin: 5px 0px 0px 0px;
        .title{
            flex-shrink: 0;
            display: flex;
            >li:nth-child(1){
                border: none;
            }
            li{
                width: 25%;
                height: 30px;
                line-height: 30px;
                background: #e8e8e8;
                border-left:1px solid rgba(198, 198, 198, 1);
            }
        }
        .list{
            overflow: auto;
             color: #5a5a5a;
            flex-grow: 1;
            >li:nth-child(2n-1){
                background: #ffffff;
            }
            >li:nth-child(2n){
                background: #e8e8e8;
            }
            >li{
                display: flex;
                >div:nth-child(1){
                    border: none;
                }
                >div{
                    width: 25%;
                    height: 30px;
                    line-height: 30px;
                    border-left: 1px solid rgba(198, 198, 198, 1);
                }
            }
        }
        .footer{
            flex-shrink: 0;
            height: 32px;
            background: rgba(54, 140, 89, 1);
            display: flex;
            line-height: 32px;
            text-align: center;
            color: #ffffff;
            li{
                width: 33.3%;
            }
        }
    }

    #Agent .box_5{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        margin: 5px 0px 0px 0px;
        .title{
            flex-shrink: 0;
            display: flex;
            >li:nth-child(1){
                border: none;
            }
            li{
                width: 25%;
                height: 30px;
                line-height: 30px;
                background: #ffffff;
                border-left:1px solid rgba(198, 198, 198, 1);
            }
        }
        .list{
            overflow: auto;
            flex-grow: 1;
            color: #5a5a5a;
            >li:nth-child(2n){
                background: #ffffff;
            }
            >li:nth-child(2n-1){
                background: #e8e8e8;
            }
            >li{
                display: flex;
                >div:nth-child(1){
                    border: none;
                }
                >div:nth-child(3){
                    color: #00edef;
                }
                >div{
                    width: 25%;
                    height: 30px;
                    line-height: 30px;
                    border-left: 1px solid rgba(198, 198, 198, 1);
                }
            }
        }
        .footer{
            flex-shrink: 0;
            height: 32px;
            background: rgba(54, 140, 89, 1);
            display: flex;
            line-height: 32px;
            text-align: center;
            color: #ffffff;
            li{
                width: 33.3%;
            }
        }
    }

    #Agent .box_6{
        margin: 5px 0px 0px 0px;
        .list>li{
            position: relative;
            background: #ffffff;
            color: rgba(56, 56, 56, 1);
        	font-size: 12px;
            display: flex;
            height: 37px;
            border-bottom: 1px solid rgba(229, 229, 229, 1);
            line-height: 37px;
            >div{
                width: 50%;
                padding:0px 0px 0px 0.25rem;
            }
        }
        .list>li::after{
            position: absolute;
            content: '';
            width: 1px;
            height: 60%;
            top: 20%;
            left: 50%;
            background: rgba(229, 229, 229, 1);
        }
        .Collect_Money{
            margin: 5px 0px 0px 0px;
            display: flex;
            justify-content: space-between;
            background: #ffffff;
            line-height: 35px;
            padding: 0px 10px 0px 20px;
            color: rgba(56, 56, 56, 1);
            font-size: 12px;
            border-bottom: 1px solid rgba(229, 229, 229, 1);
            i{
                line-height: 35px;
            }
        }
        .money{
            padding: 0px 10px 0px 20px;
            background: #ffffff;
            color: rgba(80, 80, 80, 1);
            >li:nth-child(1){
            	font-size: 12px;
                padding: 6px 0px;
               
            }
            >li:nth-child(2){
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                padding: 5px 0px 15px 0px;
                >span:nth-child(1){
                	font-size: 27px;
                     line-height: initial;
                }
                >span:nth-child(2){
                    font-size: 12px;
                    padding: 0px 0px 0px 10px;
                    border-left: 1px solid rgba(80, 80, 80, 1);
                    height: 14px;
                    line-height: 14px;
                }
            }
        }
        .Agreement{
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
        .btn_1{
            width: 170px;
        	height: 32px;
            display: block;
            margin: 0px auto;
            color: rgba(255, 255, 255, 1);
        	background-color: rgba(54, 140, 89, 1);
            border: none;
            border-radius: 32px;
        }
    }

    #Agent .payment{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        .mask{
            position: absolute;
            width: 100%;
            height:100%;
            top: 0px;
            left: 0px;
            background: rgba(0,0 , 0, 0.5)
        }
        .payment_1{
            background: #ffffff;
            width: 298px;
            position: relative;
            z-index: 1;
            max-width: 100%;
            .forget{
                position: absolute;
                color: rgba(80, 80, 80, 1);
	            font-size: 10px;
                top: 10px;
                left: 24px;
            }
            .close_1{
                position: absolute;
                top: 0px;
                right: 0px;
            	color: rgba(153, 153, 153, 1);
                z-index: 1;
                i{
                    font-size: 30px;
                }
            }
            .title{
                height: 42px;
                line-height: 42px;
                color: rgba(80, 80, 80, 1);
            	font-size: 14px;
                text-align: center;
                position: relative;
                z-index: 0;
            }
            .input_box{
                width: 243px;
                height: 39px;
                margin: 0px auto;
                position: relative;
                input{
                    padding: 0px;
                    margin: 0px;
                    height: 100%;
                    letter-spacing: 30px;
                    padding: 0px 0px 0px 15px;
                }
                >ul{
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    li{
                        border-left: 1px solid #cccccc;
                        width: calc(100% / 6);
                    }
                }
            }
            .btn_2{
                width: 123px;
            	height: 26px;
                color: rgba(255, 255, 255, 1);
            	background-color: rgba(54, 140, 89, 1);
                font-size: 14px;
                border-radius: 26px;
                border: none;
                margin: 16px auto;
                display: block;
                padding: 0px;
            }
        }
    }

    // 单选
    #Agent .radio_1{
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
    #Agent .radio_1.active{
        background: rgba(58, 182, 237, 1);
         border: 2px solid rgba(58, 182, 237, 1);
        color: #ffffff;
        i{
            display: inline-block;
        }
    }
</style>
