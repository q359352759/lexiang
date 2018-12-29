import axios from '@/api/axios.js'
import qs from "qs";


export default {
    namespaced:true,
    state:{
        店铺:{
            //============
            userid:'',      //用户Id
            name:'店铺名称123',        //店铺名
            shopType:'',    //店铺类型
            phone:'',       //联系电话
            areaCode:'',    //区域code
            address:'',     //地址
            x:'',           //经度
            y:'',           //纬度
            businessNature:1,  //1个体 2实体 
            businessLicense:'', //营业执照 base64 
            blnumber:'',        //营业执照号
            signboard:'',       //商家店招 
            // environmentalImg:[],    //环境图片
            arrEnvironmentalImg:[], //环境图片
            // serviceType:[],         //服务种类，环境   
            arrServiceType:[],      //服务种类，环境
            referrerPhone:'',       //推荐人（代理人手机号码） 可不传
            openTime:'',            //开门时间
            closeTime:'',           //关门时间
            //认证信息
            sex:'',     //性别
            nation:'',   //民族
            birthday:'',    //出生日期
            iaiAddress:'',  //住址
            idNumber:'',    //证件号码
            issueArea:'',      //签证机关
            frontImg:'',        //正面
            reverseImg:'',      //背面
            validity:'',        //有效期
            iaiName:'',         //认证名
        },
        新人红包:{
            id:'',
            shopid:'',
            type:'0',        //0新人店铺红包 1商品红包 2节日红包 3签到红包 4庆典红包 5生日红包
            name:'新人红包',        //名称
            headline:'店铺新人红包',    //标题
            amount:'',      //金额
            quantity:'',     //数量
            startTime:'',   //开始时间
            endTime:'',     //截止时间
            // ================
            signInStartTime:'',  //签到开始时间
            signInEndTime:'',   //签到结束时间
            commodityId:'',     //商品Id
            commodityName:'',   //商品名称
            startAmount:'',     //起始金额
            progressivelyAmount:'', //递增金额
            state:1,            //是否开启
            increaseDays:'',    //递增天数
            cycleDays:'',       //循环天数
            // ===================
            createTime:'',
            deductionType:0,   //抵扣方式   0表示百分百 1表示满多少减多少
            percentage:'',      //抵扣百分比
            expire:'',          //满多少
            deduction:'',       //减多少
        },
        红包ok:true,
    },
    getters:{
        店铺(state){
            return state.店铺
        },
        新人红包(state){
            return state.新人红包
        },
        红包ok(state){
            return state.红包ok
        }
    },
    mutations:{
        更新店铺key(state,[key,val]){
            state.店铺[key]=val;
            console.log(key,val);
        },
        删除环境图片(state,index){
            state.店铺.arrEnvironmentalImg.splice(index,1)
        },
        添加环境图片(state,base64){
            state.店铺.arrEnvironmentalImg.push(base64)
        },
        设置店铺服务(state,id){
            state.店铺.arrServiceType.push(id)
        },

        更新红包key(state,[key,val]){
            state.新人红包[key]=val;
        },
        红包是否能提交(state,type){
            state.红包ok=type
        }
    },
    actions: {
        
    },
    modules: {
        
    }
}