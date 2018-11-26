<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                帮助中心
            </h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li class="title_1">我的客服专员：</li>
                <li class="name">张三</li>
                <li class="icon_box xiaoxi">
                    <i class="icon iconfont icon-31xiaoxi"></i>
                    <span>2</span>
                </li>
                <li class="icon_box weixin">
                    <i class="icon iconfont icon-weixin"></i>
                </li>
                <li class="icon_box phone">
                    <a href="tel:028-888888">
                    <i class="icon iconfont icon-dianhua1"></i> 
                    </a>
                </li>
            </ul>

            <ul class="box_2">
                <li>搜索问题：</li>
                <li>
                    <input type="text">
                    <i class="icon iconfont icon-chazhao"></i>
                </li>
                <li @tap="RaiseQuestions()">提问</li>
                <li>
                    <span>1</span>
                    <i class="icon iconfont icon-iconcopy"></i>
                </li>
            </ul>

            <ul class="box_3">
                <li :class="{'active':type==0}" @tap="selset_type(0)">常见问题</li>
                <li :class="{'active':type==1}" @tap="selset_type(1)">会员</li>
                <li :class="{'active':type==2}" @tap="selset_type(2)">商家</li>
                <li :class="{'active':type==3}" @tap="selset_type(3)">分销员</li>
            </ul>

            <ul class="mui-table-view box_4">
				<li class="mui-table-view-cell" >
					<a class="mui-navigate-right">
						<span >修改登录密码</span>
					</a>
				</li>
                <li class="mui-table-view-cell ">
					<a class="mui-navigate-right">
						<span >修改支付密码</span>
					</a>
				</li>
				<li class="mui-table-view-cell ">
					<a class="mui-navigate-right">
						<span >实名认证</span>
					</a>
				</li>
				<li class="mui-table-view-cell ">
					<a class="mui-navigate-right">
						<span >提现账户</span>
					</a>
				</li>
				<li class="mui-table-view-cell ">
					<a class="mui-navigate-right">
						<span >申请开店</span>
					</a>
				</li>
			</ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data(){
        return{
            type:0
        }
    },
    methods:{
        //选择类型
        selset_type(x){
            this.type=x;
        },
        //提问
        RaiseQuestions(){
            this.$router.push('/RaiseQuestions')
        }
    }
}
</script>

<style lang="scss" scoped>
.box_1{
    display: flex;
    height: 44px;
    padding: 0px 17px;
    background: #ffffff;
    align-items: center;
    .title_1{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
    .name{
        color: rgba(56, 56, 56, 1);
    	font-size: 14px;
        width: 90px;
        text-align: center;
    }
    .icon_box{
        width: 20px ;
        height: 20px;
        border-radius: 100%;
        text-align: center;
        line-height: 20px;
        margin: 0px 25px 0px 0px;
    }
    .xiaoxi{
        background: #00BAAD;
        color: #ffffff;
        font-size: 13px;
        position: relative;
        span{
            position: absolute;
            top: -4px;
            right: -4px;
            width: 12px;
            height: 12px;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(212, 48, 48, 1);
            font-size: 10px;
            border-radius: 100%;
            line-height: 12px;
            text-align: center;
        }
    }
    .weixin{
        // background: rgba(32, 188, 44, 1);
        i{
            color: #1FBC28;
            font-size: 20px;

        }
    }
    .phone{
        i{
            color: #68c424;
            font-size: 20px;
        }
    }
}
.box_2{
    margin: 3px 0px 0px;
    background: #ffffff;
    height: 44px;
    display: flex;
    color: rgba(56, 56, 56, 1);
    font-size: 12px;
    align-items: center;
    padding: 0px 17px;
    >li:nth-child(1){
        white-space: nowrap;
    }
    >li:nth-child(2){
        height: 26px;
        display: flex;
        flex-grow: 1;
        align-items: center;
        background-color: rgba(246, 246, 246, 1);
        border-radius: 26px;
        padding: 0px 10px;
        input{
            font-size: 14px;
            flex-grow: 1;
            height:100%;
            padding: 0px;
            margin: 0px;
            border: none;
            background: none;
        }
        i{
            font-size: 18px;
            color: rgba(229, 229, 229, 1);
        }
    }
    >li:nth-child(3){
        white-space: nowrap;
        margin: 0px 0px 0px 20px;
    }
    >li:nth-child(4){
        position: relative;
        margin: 0px 0px 0px 3px;
        span{
            position: absolute;
            min-width: 12px;
            height: 12px;
            font-size: 10px;
            line-height: 12px;
            text-align: center;
            background-color: rgba(212, 48, 48, 1);
            color: #ffffff;
            border-radius: 12px;
            top: -4px;
            right: -4px;
        }
        i{
            font-size: 20px;
            color: #1894dc;
        }
    }
}

.box_3{
    background: #ffffff;
    border-bottom: 1px solid #efeff4;
    padding: 0px 17px;
    margin: 3px 0px 0px;
    height: 44px;
    display: flex;
    line-height: 44px;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    li{
        margin: 0px 24px 0px 0px;
        position: relative;
    }
    li.active::after{
        position: absolute;
        bottom: 0px;
        left: 0px;
        background: #007aff;
        width: 100%;
        height: 2px;
        content: '';    
    }
}

.box_4{
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
}

</style>



