<template>
    <div class="打卡">
        <div class="打卡弹出框">
            <div class="内容">
                <div class="标题">{{(员工自己的信息 && 员工自己的信息.workstate==0) ? '上班打卡' : '下班打卡'}} </div>
                <div class="关闭" @click="设置打卡框(false)"><i class="icon iconfont icon-quxiao"></i></div>
                <ul class="考勤信息">
                    <li>固定班：{{应打卡信息 ? 应打卡信息.officehours : ''}}~{{应打卡信息 ? 应打卡信息.quittingtime : ''}}</li>
                    <li>当前时间：{{当前时间}}</li>
                </ul>
                <ul class="替人打卡" v-if=" 员工自己的信息 && 员工自己的信息.workstate==0 && 所有店员.length>1" @click="选择替班人员()">
                    <li><i class="icon iconfont" :class="{'icon-choose':!替人打卡,'icon-xuanze2 选中':替人打卡}"></i></li>
                    <li>替人上班：{{(替人打卡 && 选择的替班人员) ? 选择的替班人员.clerksname :''}}</li>
                    <li class="右箭头"><i class="mui-icon mui-icon-arrowright"></i></li>
                </ul>
                <ul class="替人打卡" v-if="员工自己的信息 && 员工自己的信息.workstate==1 && 最后替人打卡信息">
                    <li>替{{最后替人打卡信息.clerksname}}上班</li>
                </ul>
                <div class="按钮">
                    <btn value="打卡" @click.native="开始打卡()" :styles="{'width':'132px'}" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { 当前时间格式化, dateFtt } from "@/assets/js/currency.js";
import btn from "@/components/button.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "",
    components: {
        btn
    },
    data() {
        return {
            替人打卡: false,
            userInfo: "",
            当前时间: 当前时间格式化("hh:mm:ss"),
            选择的替班人员: "",
            打卡信息: {
                shopid: "",
                clerksid: "", //店员id
                replaceid: "", //替班id
                shiftid: "", //班次id
                shift: "", //班次
                needofficehours: "", //应上班时间
                needquittingtime: "", //应下班时间
                officehours: "", //上班时间
                quittingtime: "" //下班时间
            }
        };
    },
    computed: {
        ...mapGetters({
            myshop: "get_myshop",
            所有店员: "myshops/店员/所有店员",
            当前考勤时间: "myshops/班次/当前考勤时间",
            员工自己打卡记录: "myshops/打卡/员工自己打卡记录"
        }),
        最后替人打卡信息() {
            var 替人id = "";
            if (this.员工自己打卡记录.data && this.员工自己打卡记录.data.length > 0) {
                替人id = this.员工自己打卡记录.data[0].replaceid;
            }
            if (替人id) {
                return this.所有店员.find(x => x.clerksid == 替人id);
            } else {
                return "";
            }
        },
        员工自己的信息() {
            return this.所有店员.find(x => x.clerksid == this.userInfo.username);
        },
        应打卡信息() {
            if (this.员工自己的信息)
                return this.当前考勤时间.find(x => x.id == this.员工自己的信息.shiftid);
        },
        除开自己的人员() {
            var list = this.所有店员.filter(
                x => x.clerksid != this.userInfo.username
            );
            list.forEach(item => {
                item.value = item.clerksname;
                item.text = item.clerksname;
            });
            return list;
        }
    },
    methods: {
        ...mapActions({
            设置打卡框: "myshops/设置打卡框",
            添加打卡: "myshops/打卡/添加打卡",
            打下班卡: "myshops/打卡/打下班卡",
            修改员工信息: "myshops/店员/修改员工",
            查询所有店员: "myshops/店员/查询所有店员",
            查询自己的打卡记录: "myshops/打卡/查询自己的打卡记录"
        }),
        async 开始打卡() {
            if (this.员工自己的信息.workstate == 0) {
                var obj = {
                    shopid: this.myshop.shopid,
                    clerksid: this.userInfo.username, //店员id
                    replaceid:
                        this.替人打卡 && this.选择的替班人员
                            ? this.选择的替班人员.clerksid
                            : "", //替班id
                    shiftid: this.应打卡信息.id, //班次id
                    shift: this.应打卡信息.shift, //班次
                    needofficehours: this.应打卡信息.officehours, //应上班时间
                    needquittingtime: this.应打卡信息.quittingtime, //应下班时间
                    officehours: "", //上班时间  不需要传
                    quittingtime: "" //下班时间  不需要传
                };
                var 添加打卡 = await this.添加打卡(obj);
                if (!添加打卡.data.code || 添加打卡.data.code != 200) {
                    if (添加打卡.data.msg || 添加打卡.data.message) {
                        mui.alert(
                            添加打卡.data.msg ? 添加打卡.data.msg : 添加打卡.data.message,
                            "提示",
                            "我知道了",
                            function () { },
                            "div"
                        );
                    } else {
                        mui.toast("网络错误，稍后再试。", {
                            duration: "long",
                            type: "div"
                        });
                    }
                    return;
                }
            } else {
                // var obj={
                //         shopid:this.myshop.shopid,
                //         clerksid:this.userInfo.username,    //店员id
                //         replaceid:this.最后替人打卡信息 ? this.最后替人打卡信息.clerksid : '',   //替班id
                //         shiftid:this.应打卡信息.id,     //班次id
                //         shift:this.应打卡信息.shift,                       //班次
                //         needofficehours:this.应打卡信息.officehours,    //应上班时间
                //         needquittingtime:this.应打卡信息.quittingtime,    //应下班时间
                //         officehours:'',         //上班时间  不需要传
                //         quittingtime:'',        //下班时间  不需要传
                // }
                var obj = Object.assign({}, this.员工自己打卡记录.data[0]);
                obj.needofficehours = this.应打卡信息.officehours;
                obj.needquittingtime = this.应打卡信息.quittingtime;
                try {
                    var 打下班卡 = await this.打下班卡(obj);
                    if (打下班卡.data.code != 200) {
                        mui.alert(
                            打下班卡.data.msg ? 打下班卡.data.msg : 打下班卡.data.message,
                            "提示",
                            "我知道了",
                            function () { },
                            "div"
                        );
                        return;
                    }
                } catch (error) {
                    mui.toast("网络错误，稍后再试。", { duration: "long", type: "div" });
                    return;
                }
            }
            var 员工 = Object.assign({}, this.员工自己的信息);
            员工.workstate = 员工.workstate == 0 ? 1 : 0;
            var 修改员工信息 = await this.修改员工信息(员工);
            if (修改员工信息.data.code == 200) {
                mui.toast("打卡成功", { duration: "long", type: "div" });
                this.设置打卡框(false);
            } else {
                if (修改员工信息.data.msg || 修改员工信息.data.message) {
                    mui.alert(
                        修改员工信息.data.msg
                            ? 修改员工信息.data.msg
                            : 修改员工信息.data.message,
                        "提示",
                        "我知道了",
                        function () { },
                        "div"
                    );
                } else {
                    mui.alert(
                        "网络错误，稍后再试。",
                        "提示",
                        "我知道了",
                        function () { },
                        "div"
                    );
                }
            }
            this.查询所有店员();
            this.查询自己的打卡记录();
        },
        选择替班人员() {
            if (this.替人打卡) {
                this.替人打卡 = false;
            } else {
                var 选择人员 = new mui.PopPicker({
                    layer: 1
                });
                选择人员.setData(this.除开自己的人员);
                选择人员.show(x => {
                    this.选择的替班人员 = x[0];
                    this.替人打卡 = true;
                    选择人员.dispose();
                    选择人员 = null;
                });
            }
        }
    },
    mounted() {
        this.userInfo = JSON.parse(localStorage.userInfo);
        // this.查询自己的打卡记录();
        setInterval(x => {
            this.当前时间 = 当前时间格式化("hh:mm:ss");
        }, 1000);
    }
};
</script>

<style lang="scss" scoped>
.打卡弹出框 {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    .内容 {
        width: 222px;
        background: #ffffff;
        border-radius: 16px;
        position: relative;
        padding: 0px 20px;
    }
    .标题 {
        text-align: center;
        color: rgba(56, 56, 56, 1);
        font-size: 14px;
        padding: 15px 0px;
        font-weight: bold;
    }
    .关闭 {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #999999;
    }
    .考勤信息 {
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        li {
            margin: 0px 0px 8px 0px;
        }
    }
    .替人打卡 {
        display: flex;
        align-items: center;
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        li > i {
            font-size: 18px;
            height: 18px;
            margin: 0px 5px 0px 0px;
        }
        .右箭头 {
            flex-grow: 1;
            text-align: right;
        }
        .选中 {
            color: #2da8ea;
        }
    }
    .按钮 {
        margin: 52px 0px 20px;
    }
}
</style>
