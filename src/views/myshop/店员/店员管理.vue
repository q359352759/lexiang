<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">店员管理</h1>
            <span @click="tianjiadianyuan()">添加店员</span>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="$router.push('/myshop/dianyuan/banci')">
                            <div class="title">班次</div>
                            <div class="tishi">请设定班次</div>
                            <!-- <div>两班次</div> -->
                        </a>
                    </li>
                </ul>
            </div>
            
            <ul class="mui-table-view box_2" v-for="(item, index) in list" :key="index">
				<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-red">移除</a>
					</div>
					<div class="mui-slider-handle item">
                        <div class="img_box" @click="xiangqing()">
                            <div class="img_1">
                                <img src="image/kaifazhong.png" alt="">
                                <span class="active"></span>
                            </div>
                            <div>张三</div>
                        </div>
                        <div class="text_box"  @click="xiangqing()">
                            <div class="mui-pull-right banci">
                                班次：
                                <span>早班</span>
                            </div>
                            <div>回复：0条</div>
                            <div>收银：0笔</div>
                            <div>营业额：0元</div>
                        </div>
                        <div class="icon_box"  @click="xiugai()">
                            <i class="mui-icon mui-icon-arrowright"></i>
                        </div>
					</div>
				</li>
			</ul>

            <!-- <button @click="test()">测试</button>
            <button @click="test1()">测试1</button> -->

        </div>

        <xuanzhebanci v-show="xiugaibanci_show" @setbancishow="get_banci"/>
    </div>
</template>

<script>
import xuanzhebanci from '@/components/myshop/dianyuan/xuanzhebanci.vue';
export default {
    name:'',
    components: {
        xuanzhebanci  
    },
    data () {
        return {
            list:[1,2],
            xiugaibanci_show:false
        }
    },
    methods: {
        get_banci(x,y){
            console.log(x,y);
            this.xiugaibanci_show=x;
        },
        xiugai(){
            this.xiugaibanci_show=true
        },
        test(){
            this.list.push(1);
            var box_2=document.getElementsByClassName('box_2');
            for(let i=0;i<box_2.length;i++){
                mui.swipeoutClose(box_2[i].querySelector('li'))
            }
        },
        test1(){
            var box_2=document.getElementsByClassName('box_2');
            for(let i=0;i<box_2.length;i++){
                mui.swipeoutOpen(box_2[i].querySelector('li'))
            }
        },
        tianjiadianyuan(){
            this.$router.push('/myshop/dianyuan/addDianyuan')
            // mui.confirm('请先设置班次','提示',['取消','设置'],(value)=>{
            //     console.log(value);
            //     if(value.index==1){
            //         this.$router.push('/myshop/dianyuan/banci')
            //     }
            // })
        },
        xiangqing(){
            this.$router.push('/myshop/dianyuan/dianyuanXiangqing')
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-bar span{
    color: #ffffff;
    font-size: 14px;
    position: absolute;
    line-height: 44px;
    top: 0px;
    right: 12px;
}
.box_1{
    margin: 5px 0px 0px;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    .item{
        display: flex;
        .title{
            width: calc(42px + 45px);
        }
        .tishi{
            color: #d9d9d9;
        }
    }
}
.box_2{
    margin: 4px 0px 0px;
    .item{
        font-size: 12px;
        color: #505050;
        display: flex;
        align-items: center;
        .img_box{
            width: 40px;
            margin: 0px 15px 0px 0px;
            flex-shrink: 0;
            >div{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
            }
            .img_1{
                height: 40px;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
                span{
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background-color: rgba(166, 166, 166, 1);
                    border-radius: 100%;
                    bottom: 0px;
                    right: 0px;
                }
                span.active{
                    background: #43cf7c;
                }
            }
        }
        .text_box{
            flex-grow: 1;
            line-height: 150%;
            padding: 0px 14px 0px 0px;
            .banci span{
                color: #007aff;
            }
        }
        .icon_box{
            color: #c0bcbc;
        }
    }
}


</style>


