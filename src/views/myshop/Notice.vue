<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">发布公告</h1>
            <!-- <span class="title mui-pull-right " @tap="noticeList()">发布记录</span> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="tishi">当前公告：{{dangqian}}</div>
                <textarea cols="30" rows="10" placeholder="请填写公告内容" v-model="obj.remark"></textarea>
                <!-- <button @tap="submit()" class="btn_1">发布</button> -->
                <btn value="发布" @click.native="submit()" class="btn_1" />
            </div>
        </div>
    </div>
</template>

<script>
import btn from "@/components/button.vue";
import { mapGetters ,mapActions } from "vuex";
export default {
    name: "",
    components: {
        btn
    },
    data() {
        return {
            get_index: 0,
            dangqian: "",
            obj: {
                shopid: "",
                remark: "",
                state: "0" //审核状态
            }
        };
    },
    computed: {
        ...mapGetters({
            myshop:'get_myshop' 
        })
    },
    methods: {
        ...mapActions({
            获取店铺:'getMyshop'
        }),
        //跳转记录页面
        noticeList() {
            this.$router.push("/noticeList");
        },
        submit() {
            var kong = /^[\s\S]*.*[^\s][\s\S]*$/;
            if (!kong.test(this.obj.remark)) {
                mui.toast("请填写内容", { duration: 2000, type: "div" });
                return;
            } else if (this.obj.remark.length > 50) {
                mui.toast("长度不能大于50", { duration: 2000, type: "div" });
                return;
            }
            this.obj.shopid = this.myshop.shopid;
            this.$axios({
                method: "post",
                url: this.obj.id
                    ? "/api-s/shops/shopAnnouncement/update"
                    : "/api-s/shops/shopAnnouncement/add",
                data: this.obj
            })
                .then(x => {
                    console.log(x);
                    if (x.data.code == 200) {
                        mui.toast("设置成功。", { duration: 2000, type: "div" });
                        this.get_shopAnnouncement();
                    } else {
                        mui.alert(
                            x.data.msg ? x.data.msg : x.data.messag,
                            "提示",
                            "我知道了",
                            function () { },
                            "div"
                        );
                    }
                })
                .catch(err => {
                    mui.toast("设置失败。", { duration: 2000, type: "div" });
                    console.log(err);
                });
            console.log(this.obj.remark);
        },
        //查询店铺公告
        get_shopAnnouncement() {
            this.$axios({
                method: "get",
                url: "/api-s/shops/shopAnnouncement/" + this.myshop.shopid
            })
                .then(x => {
                    if (x.data.code == 200 && x.data.data) {
                        this.obj = x.data.data;
                        this.dangqian = x.data.data.remark;
                    } else {
                        this.obj.remark = "恭喜" + this.myshop.name + "成功开通数字店铺";
                    }
                    console.log("查询公告", x);
                })
                .catch(err => {
                    console.log("查询公告失败", x);
                });
        },
        async 初始化(){
            if(!this.myshop || !this.myshop.shopid){
                await this.获取店铺()
            }
            this.get_shopAnnouncement();
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
        this.初始化()

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
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        myshop() {
            if (this.get_index == 0) {
                if (this.myshop && this.myshop.id) {
                    this.get_shopAnnouncement();
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.mui-content {
    background: #ffffff;
}
.mui-bar {
    .title {
        position: absolute;
        top: 0px;
        right: 10px;
        color: #ffffff;
        line-height: 44px;
    }
}
.box_1 {
    padding: 12px;
    textarea {
        background-color: rgba(229, 229, 229, 1);
        border: none;
        font-size: 14px;
        margin: 0px;
        height: 104px;
    }
    .tishi {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        margin: 0px 0px 17px;
    }
    .btn_1 {
        margin: 40px auto 20px;
    }
}
</style>
