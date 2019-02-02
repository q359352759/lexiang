<template>
    <div class="introduction">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">宣传页编辑</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <ul class="contenteditable_box">
                <li class="header">
                    <div>
                        <select name="16px" v-model="font_size" @change="change_font_size()">
                            <option value="24px">24px</option>
                            <option value="20px">20px</option>
                            <option value="16px">16px</option>
                            <option value="14px">14px</option>
                            <option value="12px">12px</option>
                        </select>
                    </div>
                    <div class="zitiyanse bg" v-show="isAndroid" @click="chnage_font_color()"></div>
                    <div @click="add_shiping()" class="shiping bg"></div>
                    <div @click="set_Album_show()" class="tupian bg"></div>
                    <input type="color" class="font_color mui-hidden" v-model="font_color" ref="font_color">
                </li>
                <li class="content_box" ref="content_box">
                    <div class="content_1" ref="content_1" :style="{'font-size':font_size,'color':font_color}" v-html="html" contenteditable="true"></div>
                </li>
            </ul>

            <div @tap="submit()" class="btn_1">确&nbsp;定</div>
            <!-- <div id="editor_1" ref="editor"></div> -->

            <div class="box_2" v-show="video_show">
                <div class="mask"></div>
                <div class="cont_1">
                    <div @tap="close_1()" class="close_1"><i class="icon iconfont icon-quxiao"></i> </div>
                    <div class="title">请输入视频链接</div>
                    <div class="input_box">
                        <input type="text" v-model="video_url">
                    </div>
                    <button @tap="queding()" class="btn_2">确定</button>
                </div>
            </div>
        </div>

        <Album v-if="Album_show" :size="size" :seetype="seetype" :type="seetype" v-on:setlist="reslist" />

    </div>
</template>

<script>
import { isAndroid } from "@/assets/js/currency";
import Album from "@/components/Album.vue";
import $ from "jquery";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "",
    components: {
        Album
    },
    data() {
        return {
            sol: "-",
            font_size: "16px",
            font_color: "#000000",
            isAndroid: true,
            get_index: 0,
            seetype: 5, //1店招  2环境 3商品 4描述 5其他
            Album_show: false,
            video_show: false,
            size: 10,
            video_url: "",
            synopsis: {
                //简介
                id: "",
                shopid: "",
                state: 0,
                remark: ""
            },

            html: ""
        };
    },
    computed: {
        ...mapGetters({
            招募信息: 'myshops/分销/招募信息'
        })
    },
    methods: {
        ...mapMutations({
            修改招募信息:'myshops/分销/修改招募信息'
        }),
        //选择字体大小
        change_font_size() {
            console.log(this.font_size);
        },
        //选择颜色
        chnage_font_color() {
            this.$refs.font_color.click();
        },
        //选择图片返回值
        reslist(list) {
            console.log("取得参数", list);
            if (list.length > 0) {
                var html = "";
                for (var i = 0; i < list.length; i++) {
                    html += '<p style="margin:0px;font-size:0px;"><img style="max-width: 100%;" width="100%" src="' + list[i].url + '" alt=""></p><div style="min-height:20px;"></div>';
                }
                console.log(html);
                $(".content_1").append(html);
            }
        },
        //选择图片
        set_Album_show() {
            window.scroll(0, 0);
            // this.Album_show=true;
            this.$router.push("?Album_show=1");
        },
        //点击添加视频
        add_shiping() {
            window.scroll(0, 0);
            this.video_show = true;
        },
        //确定视频
        queding() {
            //http://www.runoob.com/try/demo_source/movie.mp4
            if (!this.video_url) {
                mui.toast("请输入视频链接。", { duration: "long", type: "div" });
            } else {
                var html = '<video width="100%" controls src="' + this.video_url + '">' + '<source src="' + this.video_url + '" type="video/mp4">' +
                    '<source src="' + this.video_url + '" type="video/ogg">' +
                    '</video><div style="min-height:20px;"></div>';
                $(".content_1").append(html);
                this.video_url = "";
                this.video_show = false;
            }
        },
        //关闭视频输入框
        close_1() {
            history.back();
        },
        submit() {
            console.log(this.$refs.content_box.innerHTML);
            var str=this.$refs.content_box.innerHTML;
                str=str.replace('contenteditable="true"','');
                str=str.replace('class="content_1"','');
            this.招募信息.leaflets=str;
            this.修改招募信息();
            history.back();
        },
        初始化() {
            if(!this.招募信息.leaflets){
                return
            }
            var str = this.招募信息.leaflets;
            // var str='<div data-v-845c3686="" contenteditable="true" class="content_1" style="font-size: 24px; color: rgb(0, 0, 255);">sdfsdfsdf</div>';
            var div = $(str);
            this.font_size = div.css("font-size") ? div.css("font-size") : "16px";
            this.font_size = parseInt(this.font_size) > 10 ? this.font_size : "10px";
            this.font_color = div.css("color") ? div.css("color") : "#000000";
            this.html = div.html();
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
        // console.log(this.myshop);
        this.初始化();

        var query = this.$route.query;
        if (!query.video_show) {
            this.video_show = false;
        } else {
            this.video_show = true;
        }


        //判断是不是安卓
        // alert(isAndroid())
    },
    activated() { },
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
        // this.editor.destroy()
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        $route(to, from) {
            var query = this.$route.query;
            //选择图片
            if (!query.Album_show) {
                this.Album_show = false;
            } else {
                this.Album_show = true;
            }
            //输入视频
            if (!query.video_show) {
                this.video_show = false;
            } else {
                this.video_show = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
// .introduction{
//     height: 100%;
// }

.mui-content {
    display: flex;
    flex-direction: column;
    position: fixed;
}
// -webkit-user-select:text
.contenteditable_box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid #c8c8ca;
    border-radius: 3px;
    .header {
        flex-shrink: 0;
        display: flex;
        background: #f4f4f4;
        padding: 3px;
        flex-wrap: wrap;
        div {
            height: 22px;
            font-size: 12px;
            padding: 0px 3px;
            line-height: 22px;
            color: #565656;
            margin: 0px 3px;
        }
        select {
            height: 100%;
            padding: 0px 5px;
            margin: 0px;
            border: 1px solid #c8c8ca;
            appearance: menulist;
        }
        .bg {
            width: 22px;
            background-image: url("~@/assets/image/icons.png");
            // background-image: url('/image/icons.png');
        }
        .zitiyanse {
            background-position: -760px 0;
        }
        .shiping {
            background-position: -320px -20px;
        }
        .tupian {
            background-position: -380px 0px;
        }
        .font_color {
        }
    }
    .content_box {
        flex-grow: 1;
        overflow: auto;
        position: relative;
    }
    .content_1 {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #ffffff;
        min-height: 200px;
        padding: 5px;
        // -webkit-user-select:text;
        user-select: text;
        -webkit-user-select: text;
    }
    .content_1:empty:before {
        content: "说点啥好呢？";
        color: gray;
    }
}
#editor_1 {
    height: 100%;
    overflow: auto;
}
.btn_1 {
    flex-shrink: 0;
    height: 44px;
    background: $header_background;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 44px;
    z-index: 1000;
}

.box_2 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    .close_1 {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #5a5a5a;
    }
    .mask {
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    }
    .cont_1 {
        width: 250px;
        background: #ffffff;
        position: relative;
        z-index: 1;
        padding: 10px;
        .title {
            font-size: 14px;
            margin: 0px 0px 5px;
            color: #565656;
        }
        input {
            padding: 0px 15px;
            height: 30px;
            font-size: 14px;
        }
    }
    .btn_2 {
        background: $header_background;
        width: 100%;
        color: #ffffff;
    }
}
</style>

<style lang="scss">
.contenteditable_box {
    .content_1 * {
        user-select: text;
        -webkit-user-select: text;
    }
}
</style>
