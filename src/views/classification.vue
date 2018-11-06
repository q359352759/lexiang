<template>
    <div id="classification">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">全部类型</h1>
        </header>
        <div class="mui-content mui-row mui-fullscreen">
            <div class="mui-col-xs-3 left">
                <ul class="box_1">
                    <li @click="selection_type(index)" :class="{'active':type_1==index}" v-for="(item, index) in list" :key="index">{{item}}</li>
                </ul>
                <!-- <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
                    <a class="mui-control-item" v-for="(item, index) in list" :key="index" :data-index="index" href="#content1">{{item}}</a>
                </div> -->
            </div>
            <div class="mui-col-xs-9 right" @scroll="scroll($event)">
                <ul class="mui-row box_2">
                   <li class="mui-col-xs-4" v-for="(item, index) in 6" :key="index">
                       <div class="img_box">
                           <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                           <div class="text_1">商圈</div>
                       </div>
                   </li>
                </ul>

                <div v-if="index!=0" class="box_3" v-for="(item, index) in list" :key="index">
                    <div class="title">
                        <img align="absmiddle" src="image/kaifazhong.png" alt="">
                        {{item}}
                        <span class="mui-pull-right">去频道 <i class="mui-icon mui-icon-forward"></i></span>
                    </div>
                    <ul class="list mui-row">
                        <li class="mui-col-xs-4">
                            <span>名字</span>
                        </li>
                        <li class="mui-col-xs-4">
                            <span>名字</span>
                        </li>
                        <li class="mui-col-xs-4">
                            <span>名字</span>
                        </li>
                        <li class="mui-col-xs-4">
                            <span>名字</span>
                        </li>
                        <li class="mui-col-xs-4">
                            <span>名字</span>
                        </li>
                        <li class="mui-col-xs-4">
                            <span>名字</span>
                        </li>
                        <li class="mui-col-xs-4">
                            <span>名字</span>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import {limit} from '@/assets/js/currency'
export default {
    name: "",
    data() {
        return {
            type_1:0,
            list:[],
            scroll_list:[]
        };
    },
    methods: {
        selection_type(x){
            this.type_1=x;
            document.getElementsByClassName('right')[0].scrollTop=this.scroll_list[x]
        },
        scroll(e){
            var h = e.target.offsetHeight; //容器高度
            var sh = e.target.scrollHeight; //滚动条总高
            var t = e.target.scrollTop; //滚动条到顶部距离
            // console.log(this.scroll_list,h,sh,t);
            // console.log(this.scroll_list.indexOf(t))
            // console.log(limit(this.scroll_list,t))
            var index=limit(this.scroll_list,t);
             this.type_1=index;
        }
    },
    beforeCreate: function() {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        this.list=['全部','超市','美食','休闲娱乐','丽人','K歌','运动健身','亲子','摄影','结婚','宠物','教育技能培训','洗衣','电影','第三方服务'];


        
        // var controlsElem = document.getElementById("segmentedControls");
        // var contentsElem = document.getElementById("segmentedControlContents");
        // var controlListElem = controlsElem.querySelectorAll(
        //     ".mui-control-item"
        // );
        // var contentListElem = contentsElem.querySelectorAll(
        //     ".mui-control-content"
        // );
        // var controlWrapperElem = controlsElem.parentNode;
        // var controlWrapperHeight = controlWrapperElem.offsetHeight;
        // var controlMaxScroll =
        //     controlWrapperElem.scrollHeight - controlWrapperHeight; //左侧类别最大可滚动高度
        // var maxScroll = contentsElem.scrollHeight - contentsElem.offsetHeight; //右侧内容最大可滚动高度
        // var controlHeight = controlListElem[0].offsetHeight; //左侧类别每一项的高度
        // var controlTops = []; //存储control的scrollTop值
        // var contentTops = [0]; //存储content的scrollTop值
        // var length = contentListElem.length;
        // for (var i = 0; i < length; i++) {
        //     controlTops.push(controlListElem[i].offsetTop + controlHeight);
        // }
        // for (var i = 1; i < length; i++) {
        //     var offsetTop = contentListElem[i].offsetTop;
        //     if (offsetTop + 100 >= maxScroll) {
        //         var height = Math.max(offsetTop + 100 - maxScroll, 100);
        //         var totalHeight = 0;
        //         var heights = [];
        //         for (var j = i; j < length; j++) {
        //             var offsetHeight = contentListElem[j].offsetHeight;
        //             totalHeight += offsetHeight;
        //             heights.push(totalHeight);
        //         }
        //         for (var m = 0, len = heights.length; m < len; m++) {
        //             contentTops.push(
        //                 parseInt(
        //                     maxScroll -
        //                         (height - (heights[m] / totalHeight) * height)
        //                 )
        //             );
        //         }
        //         break;
        //     } else {
        //         contentTops.push(parseInt(offsetTop));
        //     }
        // }
        // contentsElem.addEventListener("scroll", function() {
        //     var scrollTop = contentsElem.scrollTop;
        //     for (var i = 0; i < length; i++) {
        //         var offsetTop = contentTops[i];
        //         var offset = Math.abs(offsetTop - scrollTop);
        //         //						console.log("i:"+i+",scrollTop:"+scrollTop+",offsetTop:"+offsetTop+",offset:"+offset);
        //         if (scrollTop < offsetTop) {
        //             if (scrollTop >= maxScroll) {
        //                 onScroll(length - 1);
        //             } else {
        //                 onScroll(i - 1);
        //             }
        //             break;
        //         } else if (offset < 20) {
        //             onScroll(i);
        //             break;
        //         } else if (scrollTop >= maxScroll) {
        //             onScroll(length - 1);
        //             break;
        //         }
        //     }
        // });
        // var lastIndex = 0;
        // //监听content滚动
        // var onScroll = function(index) {
        //     if (lastIndex !== index) {
        //         lastIndex = index;
        //         var lastActiveElem = controlsElem.querySelector(".mui-active");
        //         lastActiveElem && lastActiveElem.classList.remove("mui-active");
        //         var currentElem = controlsElem.querySelector(
        //             ".mui-control-item:nth-child(" + (index + 1) + ")"
        //         );
        //         currentElem.classList.add("mui-active");
        //         //简单处理左侧分类滚动，要么滚动到底，要么滚动到顶
        //         var controlScrollTop = controlWrapperElem.scrollTop;
        //         if (
        //             controlScrollTop + controlWrapperHeight <
        //             controlTops[index]
        //         ) {
        //             controlWrapperElem.scrollTop = controlMaxScroll;
        //         } else if (
        //             controlScrollTop >
        //             controlTops[index] - controlHeight
        //         ) {
        //             controlWrapperElem.scrollTop = 0;
        //         }
        //     }
        // };
        // //滚动到指定content
        // var scrollTo = function(index) {
        //     contentsElem.scrollTop = contentTops[index];
        // };
        // mui(controlsElem).on("tap", ".mui-control-item", function(e) {
        //     scrollTo(this.getAttribute("data-index"));
        //     return false;
        // });
        // console.group('------mounted 挂载结束状态------');
    },
    beforeUpdate: function() {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function() {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function() {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function() {
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        list() {
            this.$nextTick(function() {
                console.log("数据渲染完成");
                var this_1=this;
                var dom=document.getElementsByClassName('right')[0].childNodes;
                
                dom.forEach(x => {
                    if(x.offsetTop)
                    // console.log(x.offsetTop)
                    this.scroll_list.push(x.offsetTop)
                });
            });
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";
#classification {
    height: 100%;
}
#classification .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#classification .mui-title {
    color: #ffffff;
}
#classification .mui-bar .mui-title {
    text-align: left;
}

#classification .left{
    height: 100%;
    overflow: auto;
}
#classification .right{
    background: #ffffff;
    height: 100%;
    overflow: auto;
    padding: 10px;
}
#classification .box_1{
    // background: #ffffff;
    height: 100%;
    overflow: auto;
    font-size: 0.14rem;
    >li{
        height: 44px;
        line-height: 44px;
        padding: 0px 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
    }
    >li.active{
        background: #ffffff;
        color: #FF7100;
    }
    >li.active:after{
        width: 4px;
        height: 50%;
        position: absolute;
        top: 25%;
        left: 0px;
        content: '';
        background: #FF7100;

    }

}
#classification .box_2{
    >li{
        padding: 3px;
        .img_box{
            height: 0.7rem;
            position: relative;
            border-radius: 3px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .text_1{
                position: absolute;
                width: 100%;
                left: 0px;
                bottom: 0px;
                text-align: center;
                color: #ffffff;
                padding: 5px 0px;
            }
        }
    }
}

#classification .box_3{
    margin: 0.3rem 0px 0px; 
    .title{
        font-size: 0.14rem;
        img{
            width: 15px;
            align:absmiddle
        }
        span{
            color: #FF7100;
        }
        i{
            font-size: 0.18rem;
        }
    }
    .list{
        text-align: center;
        margin: 0px -5px;
        >li{
            padding: 5px;
            span{
                font-size: 0.12rem;
                padding: 5px 0px;
                display: block;
                background: #F7F7F7;
            }
        }
    }
}




</style>

