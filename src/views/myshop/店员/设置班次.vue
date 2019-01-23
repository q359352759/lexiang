<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">设置班次</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <ul class="box_1">
                <li class="title_1">
                    <div @click="选择班次类型(1)" class="radio_1" :class="{'active':班次类型==1}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div>固定班次：</div>
                </li>
                <li class="item">
                    <div class="list" :class="{'nomargun':index==0}" v-for="(item, index) in 固定班次" :key="index">
                        <!-- <div class="banci" v-if="早班.length>1">{{item.shift}}：</div> -->
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly v-model="item.officehours" @click="select_time(item,'officehours')" />
                            <input type="text" placeholder="下班时间" readonly v-model="item.quittingtime" @click="select_time(item,'quittingtime')" />
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="box_1">
                <li class="title_1">
                    <div @click="选择班次类型(2)" class="radio_1" :class="{'active':班次类型==2}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div>两班：</div>
                </li>
                <li class="item">
                    <div class="list" :class="{'nomargun':index==0}" v-for="(item, index) in 两班" :key="index">
                        <div class="banci" v-if="index==0">早班：</div>
                        <div class="banci" v-if="index==1">晚班：</div>
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly v-model="item.officehours" @click="select_time(item,'officehours')" />
                            <input type="text" placeholder="下班时间" readonly v-model="item.quittingtime" @click="select_time(item,'quittingtime')" />
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="box_1">
                <li class="title_1">
                    <div @click="选择班次类型(3)" class="radio_1" :class="{'active':班次类型==3}">
                        <i class="icon iconfont icon-xuanze"></i>
                    </div>
                    <div>三班：</div>
                </li>
                <li class="item">
                    <div class="list" :class="{'nomargun':index==0}" v-for="(item, index) in 三班" :key="index">
                        <div class="banci" v-if="index==0">早班：</div>
                        <div class="banci" v-if="index==1">中班：</div>
                        <div class="banci" v-if="index==2">晚班：</div>
                        <div class="input_box">
                            <input type="text" placeholder="上班时间" readonly v-model="item.officehours" @click="select_time(item,'officehours')" />
                            <input type="text" placeholder="下班时间" readonly v-model="item.quittingtime" @click="select_time(item,'quittingtime')" />
                        </div>
                    </div>
                </li>
            </ul>
            <div class="box_2">
                提示：若已添加店员，修改班次后，需要重新设置店员的班次！
            </div>
            <div class="box_3">
                <btn @click.native="保存()" value="保存" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import btn from "@/components/button.vue";
import { openloading } from "@/assets/js/currency.js";
export default {
    name: "",
    components: {
        btn
    },
    data() {
        return {
            radio_type: 1,
            picker_time: ""
            // 早班:[
            //     {
            //         officehours:'',
            //         quittingtime:'',
            //         shift:'早班'
            //     }
            // ],
        };
    },
    computed: {
        ...mapGetters({
            店铺: "get_myshop",
            班次: "myshops/班次/班次",
            固定班次: "myshops/班次/固定班次",
            两班: "myshops/班次/两班",
            三班: "myshops/班次/三班",
            班次类型: "myshops/班次/班次类型",
            当前考勤时间: "myshops/班次/当前考勤时间"
        })
    },
    methods: {
        ...mapActions({
            获取店铺: "getMyshop",
            选择班次类型: "myshops/班次/选择班次类型",
            查询班次: "myshops/班次/查询班次",
            添加班次: "myshops/班次/添加班次",
            添加考勤时间: "myshops/班次/添加考勤时间",
            考勤时间初始化: "myshops/班次/考勤时间初始化",
            查询考勤时间: "myshops/班次/查询考勤时间"
        }),
        select_time(item, key) {
            var picker_time = new mui.DtPicker({ type: "time" });
            picker_time.show(function (rs) {
                console.log(rs);
                // picker_time.dispose();
                // picker_time = null;
                item[key] = rs.value;
                // mui.toast('时间设置有误。', {duration: "long", type: "div" });
                // return false;
            });
        },
        async 保存() {
            if (this.班次类型 == 1) {
                var 不能提交 = this.固定班次.find(
                    x => x.officehours == "" || x.quittingtime == ""
                );
                if (不能提交) {
                    mui.toast("请选择时间", { duration: "long", type: "div" });
                    return;
                }
            } else if (this.班次类型 == 2) {
                var 不能提交 = this.两班.find(
                    x => x.officehours == "" || x.quittingtime == ""
                );
                if (不能提交) {
                    mui.toast("请选择时间", { duration: "long", type: "div" });
                    return;
                }
            } else if (this.班次类型 == 3) {
                var 不能提交 = this.三班.find(
                    x => x.officehours == "" || x.quittingtime == ""
                );
                if (不能提交) {
                    mui.toast("请选择时间", { duration: "long", type: "div" });
                    return;
                }
            }
            openloading(true);
            try {
                await this.添加考勤时间();
                mui.toast("设置成功", { duration: "long", type: "div" });
                this.查询考勤时间();
                openloading(false);
            } catch (error) {
                mui.toast("网路错误稍后再试。", { duration: "long", type: "div" });
                openloading(false);
            }

            // this.添加班次(obj).then(x=>{
            //     console.log(x)
            // }).catch(err=>{
            //     console.log(err);
            // })
        },
        async 获取数据() {
            openloading(true);
            this.考勤时间初始化();
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
        // this.picker_time = new mui.DtPicker({"type":"time"});
    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // this.picker_time.dispose();
    }
};
</script>

<style lang="scss" scoped>
.box_1 {
    margin: 3px 0px 0px 0px;
    padding: 7px 0.4rem 7px 10px;
    background: #ffffff;
    display: flex;
    align-items: center;
    font-size: 12px;
    .title_1 {
        flex-grow: 1;
        display: flex;
        align-items: center;
        white-space: nowrap;
        .radio_1 {
            margin: 0px 14px 0px 0px;
        }
    }
    .item {
        .list.nomargun {
            margin: 0px;
        }
        .list {
            display: flex;
            align-items: center;
            margin: 10px 0px 0px 0px;
        }
        .banci {
            white-space: nowrap;
        }
        .input_box {
            display: flex;
            input:nth-child(1) {
                margin: 0px 0.38rem 0px 0px;
            }
        }
        input {
            width: 0.83rem;
            height: 27px;
            // color: rgba(166, 166, 166, 1);
            background-color: rgba(229, 229, 229, 1);
            font-size: 12px;
            padding: 0px;
            text-align: center;
            margin: 0px;
            border: none;
            border-radius: 0px;
        }
    }
}
.box_2 {
    padding: 20px 17px;
    color: rgba(212, 48, 48, 1);
    font-size: 12px;
}
.box_3 {
    margin: 5px 0px 20px;
}
</style>
