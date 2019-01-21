<template>
    <div class="打卡">
        <div class="打卡弹出框">
            <div class="内容">
                <div class="标题">上班打卡1</div>
                <div class="关闭" @click="设置打卡框(false)"><i class="icon iconfont icon-quxiao"></i></div>
                <ul class="考勤信息">
                    <li>固定班：09:00~18:00</li>
                    <li>当前时间：08:55:23</li>
                </ul>
                <ul class="替人打卡" v-if="所有店员.length>1" @click="选择替班人员()">
                    <li><i class="icon iconfont icon-choose"></i></li>
                    <li><i class="icon iconfont icon-xuanze2 选中"></i></li>
                    <li>替人上班：</li>
                    <li class="右箭头"><i class="mui-icon mui-icon-arrowright"></i></li>
                </ul>
                <div class="按钮">
                    <btn value="打卡" @click.native="选择替班人员()" :styles="{'width':'132px'}"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { 当前时间格式化 } from "@/assets/js/currency.js";
import btn from '@/components/button.vue';
import { mapGetters, mapActions } from "vuex";
export default {
    name:"",
    components:{
        btn
    },
    data () {
        return {
            替人打卡:false,
            userInfo:'',
            当前时间:''
        }
    },
    computed: {
        ...mapGetters({
            所有店员:'myshops/店员/所有店员',
        }),
        除开自己的人员(){
            var list=this.所有店员.filter(x=>x.clerksid!=this.userInfo.username);
            list.forEach(item => {
                item.value=item.clerksname;
                item.text=item.clerksname
            });
            return list
        }
    },
    methods: {
        ...mapActions({
            设置打卡框:'myshops/设置打卡框'
        }),
        选择替班人员(){
            var 选择人员 = new mui.PopPicker({
                layer: 1
            });
            选择人员.setData(this.除开自己的人员);
            选择人员.show(x => {
                console.log(x)
                选择人员.dispose();
                选择人员 = null;
            });
        },

    },
    mounted() {
        this.userInfo=JSON.parse(localStorage.userInfo);
        var data=new Date();
        console.log(data.getHours(),当前时间格式化('yyyy.MM.dd hh:mm','2019-01-21 21:10'))
    },
}
</script>

<style lang="scss" scoped>
.打卡弹出框{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    .内容{
        width: 222px;
        background: #ffffff;
        border-radius: 16px;
        position: relative;
        padding: 0px 20px;
    }
    .标题{
        text-align: center;
        color: rgba(56, 56, 56, 1);
    	font-size: 14px;
        padding: 15px 0px;
        font-weight: bold;
    }
    .关闭{
        position: absolute;
        top: 10px;
        right: 10px;
        color: #999999;
    }
    .考勤信息{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
        li{
            margin: 0px 0px 8px 0px;
        }
    }
    .替人打卡{
        display: flex;
        align-items: center;
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
        li>i{
            font-size: 18px;
            height: 18px;
            margin: 0px 5px 0px 0px;
        }
        .右箭头{
            flex-grow: 1;
            text-align: right;
        }
        .选中{
            color: #2DA8EA
        }
    }
    .按钮{
        margin: 52px 0px 20px;
    }
}
</style>
