<template>
    <div>
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">分销管理</h1>
		</header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li :class="{'active':type==0}" @click="select_type(0)">
                    <div>商家</div>
                    <div>3</div>
                </li>
                <li :class="{'active':type==1}" @click="select_type(1)">
                    <div>会员</div>
                    <div>315</div>
                </li>
            </ul>
            <ul class="box_2">
                <li v-for="(item, index) in 3" :key="index">
                    <div class="img_box">
                        <img src="image/5.jpg" alt="" srcset="">
                    </div>
                    <div>
                        <div class="mui-pull-right tuiguang">
                            <i class="icon iconfont icon-fenxiang2"></i>
                            <div>推广</div>
                        </div>
                        <h1>创美居装饰丨定制梦想家</h1>
                        <h2>益州大道555号星宸国际B栋8楼益州大道555号星宸国际B栋8楼</h2>
                        <h3>业务：设计、全包、半包</h3>
                        <div class="footer">
                            <span class="xingxing">
                                <i class="icon iconfont icon-shoucangdianjihou"></i>
                                4.9
                            </span>
                            <span class="yongjin">
                                <i class="icon iconfont icon-yongjin1"></i>
                                10%
                            </span>
                            <span class="juli">
                                <i class="icon iconfont icon-location"></i>
                                1.2km
                            </span>
                            <span class="shuliang mui-pull-right">
                                <i class="icon iconfont icon-geren"></i>
                                152人
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    nameL:'',
    data(){
        return{
            type:0
        }
    },
    methods:{
        select_type(x){
            this.type=x;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.box_1{
    display: flex;
    color: #505050;
    font-size: 0.14rem;
    text-align: center;
    background: #ffffff;
    >li{
        width: 50%;
        position: relative;
        padding: 8px 0px;
    }
    >li:nth-child(1)::after{
        position: absolute;
        top: 20%;
        right: 0px;
        content: "";
        width: 1px;
        height: 60%;
        background: #efeff4;
    }
    .active::before{
        position: absolute;
        width: 50%;
        height: 3px;
        left: 25%;
        bottom: 0px;
        content: "";
        background: $header_background;
    }
}

.box_2{
    margin:5px 0px 0px;
    background: #ffffff;
    li{
        padding: 0.08rem;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        >div:nth-child(1){
            width: 0.75rem;
            height: 0.75rem;
            flex-shrink: 0;
            margin: 0px 0.09rem 0px 0px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        >div:nth-child(2){
            flex-grow: 1;
            width: 0;
            *{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .tuiguang{
            text-align: center;
            font-size: 0.1rem;
            color: #a6a6a6;
            i{
                font-size: 0.22rem;
                color: #1894dc;
            }
        }
        h1{
            font-weight: 100;
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
        }
        h2{
            font-weight: 100;
            color: rgba(166, 166, 166, 1);
        	font-size: 0.1rem;
        }
        h3{
            font-weight: 100;
            color: rgba(80, 80, 80, 1);
        	font-size: 0.1rem;
        }
        .footer{
            font-size: 0.1rem;
        }
        .xingxing{
            display: inline-block;
            width: 0.5rem;
            color: #d43030;
            i{
                color: #f4d40c;
            }
        }
        .yongjin{
            display: inline-block;
            width: 0.5rem;
            color: #d43030;
        }
        .juli{
            display: inline-block;
            color: #a6a6a6;
        }
        .shuliang{
            display: inline-block;
            color: #a6a6a6;
            i{
                color: #1894dc;
            }
        }
    }

}


</style>

