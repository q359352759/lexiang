<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请成为红购使者</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell item">
                        <span class="标题">申请人：</span>
                        <input type="text" placeholder="您的真实姓名" v-model="name" />
                    </li>
                    <li class="mui-table-view-cell" >
                        <a class="mui-navigate-right item" @click="$router.push('/AlreadyRealName')">
                            <span class="标题">实名认证：</span>
                            <span class="蓝色字体" v-if="userInfo.iaiState==1">已认证</span>
                            <span v-if="userInfo.iaiState!=1">未认证</span>
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="选择区域()">
                            <span class="标题">申请区域：</span>
                            <span class="区域提示" v-if="!filter_city">请选择</span>
                            <span class="区域" v-if="filter_city">{{filter_city}}</span>
                            <!-- <input type="text" placeholder="请选择" :value="filter_city" readonly/> -->
                        </a>
                    </li>
                </ul>
            </div>
            <div class="按钮框">
                <btn value="提交申请"/>
            </div>
        </div>
    </div>
</template>

<script>
function convert(arr, id) {
    // return 'sdfsad';
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i].value = arr[i].id;
        arr[i].text = arr[i].name;
        if (arr[i].parentid == id) {
            res.push(arr[i]);
            // var func = eval(arguments.callee.name);
            arr[i].children = convert(arr, arr[i].id);
        }
    }
    return res;
}
import btn from '@/components/button.vue';
export default {
    name:'',
    components: {
        btn
    },
    data () {
        return {
            userInfo:'',
            name:'',
            cityPicker3:'',
            cityData3:[]
        }
    },
    computed: {
        filter_city(){
            var str='';
            this.cityData3.forEach(item => {
                str+='/'+item.name;
            });
            str=str.substring(1)
            return str;
        }
    },
    methods: {
        选择区域(){
            var cityPicker3 = new mui.PopPicker({
                layer: 3
            });
            cityPicker3.setData(this.cityPicker3);
            cityPicker3.show(items=>{
                this.cityData3=items;
                cityPicker3.dispose();
                cityPicker3 = null;
            });
        }
    },
    mounted () {
        try {
            this.userInfo=JSON.parse(localStorage.userInfo);
        } catch (error) {}
        try {
            var area=JSON.parse(localStorage.area);
        } catch (error) {
            var area=[];            
        }
        this.cityPicker3 = convert(area, null);

        //获取实名信息
        this.$axios.get("/api-u/certification/findByUserid?userid=" +this.userInfo.username).then(x=>{
            console.log(x);
            if(x.data){
                this.name=x.data.name
            }
        }).catch(err=>{})

    }
}
</script>

<style lang="scss" scoped>
.box_1{
    margin: 5px 0px 0px;
    font-size: 14px;
    .item{
        display: flex;
        align-items: center;
        .标题{
            color: rgba(80, 80, 80, 1);
            width: 90px;
            flex-shrink: 0;
        }
        input{
            margin: 0px;
            padding: 0px;
            border: none;
            font-size: 14px;
            height: 100%;
        }
        input::-webkit-input-placeholder{
            color: #d9d9d9;
        }
        .蓝色字体{
            color: #007aff;
        }
        .区域提示{
            color: #d9d9d9;
        }
        .区域{
            width: 0;
            flex-grow: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .mui-table-view-cell:after{
        right: 20px;
    }
}
.按钮框{
    margin: 92px 0px 20px;
}
</style>
