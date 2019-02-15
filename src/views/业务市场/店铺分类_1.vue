<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">业务市场</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li class="input_box" @click="select_Catalog()">
                    <div>文教文教文教文教</div>
                    <i class="mui-icon mui-icon-arrowdown"></i>
                </li>
                <li>
                    <span @click="select_screen('renqi')">
                        人气
                    </span>
                    <img v-if="screen_type!=0 && screen_type!=1" src="image/paixun.png" alt="">
                    <img v-if="screen_type==0" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==1" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('juli')">
                        距离
                    </span>
                    <img v-if="screen_type!=2 && screen_type!=3" src="image/paixun.png" alt="">
                    <img v-if="screen_type==2" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==3" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('yongjin')">
                        佣金
                    </span>
                    <img v-if="screen_type!=4 && screen_type!=5" src="image/paixun.png" alt="">
                    <img v-if="screen_type==4" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==5" src="image/paixushang.png" alt="">
                </li>
                <li>
                    <span @click="select_screen('pingjia')">
                        评价
                    </span>
                    <img v-if="screen_type!=6 && screen_type!=7" src="image/paixun.png" alt="">
                    <img v-if="screen_type==6" src="image/paixuxia.png" alt="">
                    <img v-if="screen_type==7" src="image/paixushang.png" alt="">
                </li>
            </ul>

            <ul class="box_4">
                <li v-for="(item, index) in 0" :key="index">
                    <div>
                        <img src="image/acb82200c21cf541e9cb20d916d835ba.jpg" alt="" srcset="">
                    </div>
                    <div>
                        <h1>婚纱摄影韩国苏荷SOHO PHOTO婚纱摄影韩国苏荷SOHO</h1>
                        <h2>
                            <div class="mui-pull-right">
                                <i class="icon iconfont icon-location"></i>
                                320m
                            </div>
                            <div class="text">地址：人民北路二段万达广场SOHOA座场SOHOA座场SOHOA座场SOHOA座</div>
                        </h2>
                        <h3>
                            <div class="mui-pull-right">
                                <i class="icon iconfont icon-renqi"></i>
                                20000
                            </div>
                            <div class="text">业务：婚纱摄影、个人写真</div>
                        </h3>
                        <h4>
                            <div class="mui-pull-right qiandai">
                                <i class="icon iconfont icon-yongjin1"></i>
                                50%
                            </div>
                            <div>
                                <span>招募：</span>
                                <div class="progress_1">
                                    <span>60人</span>
                                    <span class="mui-pull-right">40人</span>
                                    <div :style="{'width':'50%'}"></div>
                                </div>
                                <span class="xingxing">
                                    <i class="icon iconfont icon-shoucangdianjihou"></i>
                                    5.0
                                </span>
                            </div>
                        </h4>
                    </div>
                </li>
            </ul>
            <loading :nodata="true" />

        </div>
    </div>
</template>

<script>
import loading from "@/components/loading";
export default {
    name: "",
    components: {
        loading
    },
    data() {
        return {
            Picker_2: "",
            screen_type: 0
        };
    },
    ilters: {},
    computed: {},
    methods: {
        select_Catalog() {
            this.Picker_2.show(x => {
                console.log(x);
            });
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
        var obj = [
            {
                value: "1",
                text: "类型1",
                children: [
                    {
                        value: "1-1",
                        text: "类型1-1"
                    },
                    {
                        value: "1-2",
                        text: "类型1-2"
                    }
                ]
            },
            {
                value: "2",
                text: "类型2",
                children: [
                    {
                        value: "2-1",
                        text: "类型2-1"
                    },
                    {
                        value: "2-2",
                        text: "类型2-2"
                    }
                ]
            }
        ];
        this.Picker_2 = new mui.PopPicker({
            layer: 2
        });
        this.Picker_2.setData(obj);

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
    },
    watch: {}
};
</script>

<style lang="scss" scoped>
.mui-content {
    display: flex;
    flex-direction: column;
}
.box_1 {
    flex-shrink: 0;
    padding: 0px 8px;
    margin: 5px 0px 0px;
    background: #ffffff;
    text-align: center;
    display: flex;
    color: rgba(128, 128, 128, 1);
    font-size: 0.12rem;
    line-height: 0.37rem;
    height: 0.37rem;
    align-items: center;
    > li {
        width: 25%;
    }
    img {
        vertical-align: middle;
        width: 0.12rem;
    }
    .input_box {
        width: 0.84rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 0.26rem;
        border: 1px solid #cccccc;
        border-radius: 3px;
        font-size: 0.12rem;
        line-height: 0.26rem;
        div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        i {
            font-size: 0.16rem;
            color: #c0bcbc;
        }
    }
}

.box_4 {
    overflow: auto;
    background: #ffffff;
    > li {
        padding: 8px;
        border-bottom: 1px solid #efefef;
        display: flex;
        > div:nth-child(1) {
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
            margin: 0px 0.09rem 0px 0px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        > div:nth-child(2) {
            flex-grow: 1;
            width: 0;
        }
        h1 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.14rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 0.5rem;
        }
        h2 {
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
            }
        }
        h3 {
            font-weight: 400;
            color: rgba(80, 80, 80, 1);
            font-size: 0.1rem;
            margin: 0.08rem 0px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .mui-pull-right {
                margin-left: 0.2rem;
                color: #d43030;
            }
        }
        h4 {
            font-weight: 400;
            font-size: 0.1rem;
            .progress_1 {
                display: inline-block;
                width: 1rem;
                height: 0.13rem;
                line-height: 0.13rem;
                position: relative;
                background: #e9cdcd;
                border-radius: 0.13rem;
                color: #ffffff;
                padding: 0px 3px;
                margin: 0px 0.1rem 0px 0px;
                span {
                    position: relative;
                    z-index: 1;
                }
                div {
                    position: absolute;
                    height: 100%;
                    border-radius: 0.13rem;
                    background: #e33c64;
                    top: 0px;
                    left: 0px;
                }
            }
            .xingxing {
                color: #d43030;
                i {
                    color: #f8d40c;
                }
            }
            .qiandai {
                color: #d43030;
            }
        }
    }
}
</style>
