<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">添加店员</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <form @submit.prevent="submit()">
                <div class="box_1">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell item">
                            <div class="title">手机：</div>
                            <input type="text"
                                   placeholder="请输入店员手机号码"
                                   v-model="店员.clerksphone"
                                   pattern="^[1][0-9]{10}"
                                   required />
                        </li>
                        <li class="mui-table-view-cell item">
                            <div class="title">昵称：</div>
                            <input type="text"
                                   placeholder="请输入店员昵称"
                                   v-model="店员.clerksname"
                                   setCustomValidity="132"
                                   pattern="^[\s\S]*.*[^\s][\s\S]*"
                                   required />
                        </li>
                        <li class="mui-table-view-cell "
                            @click="选择班次()">
                            <a class="mui-navigate-right item">
                                <div class="title">班次：</div>
                                <div class="选项">
                                    <span v-show="显示班次名称">{{显示班次名称}}</span>
                                    <span v-show="!显示班次名称" class="提示">请选择班次</span>
                                </div>
                                <!-- <input type="text"
                                       placeholder="请选择班次"
                                       :value="显示班次名称"
                                       readonly /> -->
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="box_2">
                    <btn type="submit"
                         value="添加" />
                </div>
            </form>
        </div>

        <xuanzhebanci v-show="xiugaibanci_show"
                      @setbancishow="get_banci" />
    </div>
</template>

<script>
import xuanzhebanci from "@/components/myshop/dianyuan/xuanzhebanci.vue";
import btn from "@/components/button.vue";
import { mapGetters, mapActions } from "vuex";
import { openloading } from "@/assets/js/currency.js";

export default {
    name: "",
    components: {
        btn,
        xuanzhebanci
    },
    data() {
        return {
            xiugaibanci_show: false,
            选中的班次: "",
            班次_index: 0, // 1 早班  2 晚班  3 晚班
            店员: {
                shopid: "",
                clerksid: "", //店员id
                clerksname: "", //店员名字
                clerksphone: "", //员工电话
                workstate: 0, //状态(1:上班,0:下班)
                shiftid: "" //班次id
            }
        };
    },
    computed: {
        ...mapGetters({
            当前考勤时间: "myshops/班次/当前考勤时间",
            店铺: "get_myshop"
        }),
        显示班次名称() {
            if (!this.选中的班次 || this.选中的班次 == "") {
                return "";
            } else if (this.选中的班次.shift == "固定班次") {
                return "固定班次";
            } else if (this.选中的班次.shift == "两班") {
                return this.班次_index == 0 ? "早班" : "晚班";
            } else if (this.选中的班次.shift == "三班") {
                if (this.班次_index == 0) {
                    return "早班";
                } else if (this.班次_index == 1) {
                    return "中班";
                } else {
                    return "晚班";
                }
            }
        }
    },
    methods: {
        ...mapActions({
            获取店铺: "getMyshop",
            查询班次: "myshops/班次/查询班次",
            查询考勤时间: "myshops/班次/查询考勤时间",
            通过电话号码获取用户: "user/通过电话号码获取用户",
            添加店员: "myshops/店员/添加店员"
        }),
        get_banci(type, item, index) {
            this.xiugaibanci_show = type;
            if(item){
                this.选中的班次 = item;
            }
            if(index){
                this.班次_index = index;
            }
            console.log(item, index);
        },
        async submit() {
            if (!this.选中的班次) {
                mui.toast("请选择班次", { duration: "long", type: "div" });
                return;
            }
            openloading(true);
            var 店员信息 = await this.通过电话号码获取用户(
                this.店员.clerksphone
            );
            if (店员信息.data.code != 200) {
                openloading(false);
                mui.toast(
                    店员信息.data.msg
                        ? 店员信息.data.msg
                        : 店员信息.data.message,
                    { duration: "long", type: "div" }
                );
                return;
            }
            console.log(店员信息);
            this.店员.shopid = this.店铺.shopid;
            this.店员.clerksid = 店员信息.data.data.username;
            this.店员.shiftid = this.选中的班次.id;
            var 添加店员 = await this.添加店员(this.店员);
            openloading(false);
            if (添加店员.data.code == 200) {
                mui.toast("添加成功", { duration: "long", type: "div" });
            } else {
                mui.toast(
                    添加店员.data.msg
                        ? 添加店员.data.msg
                        : 添加店员.data.message,
                    { duration: "long", type: "div" }
                );
            }
        },
        选择班次() {
            this.xiugaibanci_show = true;
        },
        async 获取数据() {
            openloading(true);
            if (!this.店铺 || !this.店铺.shopid) {
                await this.获取店铺();
            }
            await this.查询班次();
            await this.查询考勤时间();
            openloading(false);
        }
    },
    mounted() {
        this.获取数据();
    }
};
</script>

<style lang="scss" scoped>
.box_1 {
    .mui-table-view-cell:after {
        right: 15px;
    }
    .item {
        color: #505050;
        font-size: 14px;
        display: flex;
        align-items: center;
        .title {
            width: 75px;
            flex-shrink: 0;
            flex-grow: 0;
        }
        .选项{
            flex-grow: 1;
            color: #505050;
            font-size: 14px;
            .提示{
                 color: #d9d9d9;
                font-size: 12px;
            }
        }
        input {
            height: 100%;
            padding: 0px;
            margin: 0px;
            border: none;
            color: #505050;
            font-size: 14px;
        }
        input::-webkit-input-placeholder {
            color: #d9d9d9;
            font-size: 12px;
        }
    }
}
.box_2 {
    margin: 23px 0px;
}
</style>
