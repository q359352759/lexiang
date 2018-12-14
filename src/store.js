import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout =  60000;
// axios.defaults.baseURL = "http://192.168.1.11:8080";
// import $ from "jquery"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN AUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKEN';

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            return error.response;
        }
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
);
import qs from "qs";
import router from "./router";
import shangPing from "./vuex/shangPing";       //商品相关接口
import hongbao from "./vuex/hongbao";           //红包相关接口

// import orders from '@/vuex/orders.js'


import request from '@/api/request'

Vue.use(Vuex);


var vuex = new Vuex.Store({
    state: {
        clientX: 100, //远点导航X
        clientY: 450, //远点导航Y
        isweixin: true,
        loginDate: {}, //login信息
        weixinobj: {}, //微信授权信息
        userInfo: {}, //用户信息
        agentUser: false, //用户代理人信息   是否是代理人这里判断
        area: [], //地区

        todos: [
            { id: 1, text: "测试1", done: true },
            { id: 2, text: "测试2", done: false }
        ],
        //申请店铺
        apply_for_a_shop: {
            creationTime: "", //开始时间
            endTime: "", //结束时间
            shopType: "", //1个人经营 2公司经营
            address: "",
            businessLicense:'',     //营业执照 base64
            blnumber:'',        //营业执照号
            //--------------开店认证
            sex:'',     //性别
            iaiName:'',  //名字
            nation:'',   //民族
            birthday:'',    //出生日期
            iaiAddress:'',  //住址
            idNumber:'',    //证件号码
            issueArea:'',      //签证机关
            frontImg:'',        //正面
            reverseImg:'',      //背面
            validity:'',        //有效期
        },
        geographical_position: {
            latitude: "", // 纬度，浮点数，范围为90 ~ -90
            longitude: "", // 经度，浮点数，范围为180 ~ -180。
            address:'',
        },  
        general_time: {
            //通用时间
            year: "",
            month: "",
            day: "",
            end_year: "",
            end_month: "",
            end_day: "",
            type: 0 //0按月 1表示按日
        },
        findByUserid:'',            //用户实名信息
        shops_tree_list:[],         //店铺分类
        myshop:{},                  //我的店铺信息
        
        Select_picture:{            //从相册中选择的图片
            type:'',                //ue 编译器选择 commodity 商品  根据环境不同内容不同
            list:[]
        },
        in_index:0,         //是否是第一次进入缓存页面
        my_position:{       //我的位置
            x:'',
            y:''
        },
        //红包
        redid:'',       //红包id
    },
    getters: {
        test1(state){
            // this.$store.getters.doneTodos  这种写法和下面的写法不一样
            return state.todos.find(todo => todo.done)
            return 'store测试1';
        },
        test:state=>()=>{
            return 'store测试';
        },
        doneTodos:state=>()=>{
            console.log(1)
            //this.$store.getters.doneTodos(...)
            return state.todos.find(todo => todo.done)
        },
        filter_area: state => (id, list) => {
            console.log('过滤地址');
            var arr = list ? list : [];
            // return state.area.filter(x => x.id==id)
            var obj = state.area.find(x => x.id == id);
            if (obj) {
                arr.unshift(obj);
                if (obj.parentid) {
                    vuex.getters.filter_area(obj.parentid, arr);
                }
            }
            // return state.area.find(x => x.id === id)
            return arr;
        }
    },
    mutations: {
        setIsWeixin(state, msg) {
            console.log("判断是否是微信");
        },
        setloginDate(state, obj) {
            try {
                state.loginDate = JSON.parse(obj);
                console.log("登录信息", state.loginDate);
            } catch (err) {
                console.log("登录信息获取失败", state.loginDate);
                state.loginDate = {};
            }
        },
        setweixinobj(state, obj) {
            try {
                state.weixinobj = JSON.parse(obj);
            } catch (err) {
                state.weixinobj = {};
            }
        },
        //获取代理人信息
        setagentUser(state) {
            // console.log(this.state.userInfo)
            var userInfo = JSON.parse(localStorage.userInfo);

            axios({
                method: "get",
                url: "/api-u/agentUser/me?userid=" + userInfo.username
            })
                .then(x => {
                    console.log("获取用户代理人信息", x);
                    if (x.data.code == 200) {
                        state.agentUser = x.data.data;
                    } else {
                        state.agentUser = false;
                    }
                })
                .catch(error => {
                    state.agentUser = false;
                    console.log("获取用户代理人信息失败", error);
                });
        },
        //获取个人信息
        setCurrent(state) {
            // console.log(this.state.loginDate)
            if (!localStorage.id || localStorage.id == "" || localStorage.id == null || localStorage.id == undefined || localStorage.id == "undefined") {
                alert("获取用户信息失败，请重新登录");
                location.href = "index.html#/login";
                return;
            }
            var id = localStorage.id;
            axios({
                method: "get",
                url: "api-u/users/" + id
            }).then(x => {
                if (x.data.error) return;
                if (x.data.code != 200) {
                    alert("获取用户信息失败，请重新登录");
                    location.href = "index.html#/login";
                    return;
                } else {
                    console.log("获取个人信息", x);
                    state.userInfo = x.data.data;
                    localStorage.userInfo = JSON.stringify(x.data.data);
                }
            }).catch(error => {
                alert("获取用户信息失败，请重新登录");
                location.href = "index.html#/login";
                    // router.push("/login");
            });
        },
        //获取用户实名信息
        setfindByUserid(){
            var userInfo = JSON.parse(localStorage.userInfo);
            axios({
                method:'get',
                url:'/api-u/certification/findByUserid?userid='+userInfo.username,
            }).then(x=>{
                console.log('获取用户实名信息',x);                
                this.state.findByUserid=x.data;
            }).catch(error=>{
                console.log('获取用户实名信息',error)
            })
        },
        //获取店铺类型
        setShopTree(){
            axios({
                method:'get',
                url:'http://122.114.169.178:10002/api-s/shops/tree/findAll',
            }).then(x=>{
                console.log('获取店铺类型',x);
                //增加一个key
                function addKey(list){  
                    for(var i=0;i<list.length;i++){
                        list[i].value=list[i].id;
                        list[i].text=list[i].name;
                        if(list[i].children){
                            list[i].children=addKey(list[i].children)
                        }
                    }
                    return list;
                }
                if(x.data.code==200){
                    var list=addKey(x.data.data);
                    localStorage.shops_tree_list=JSON.stringify(list)
                    this.state.shops_tree_list=list;
                }else{
                    console.log('获取店铺类型失败',error)
                }
            }).catch(error=>{
                console.log('获取店铺类型失败',error)
            })
        },
        //查询自己申请的店铺
        setMyshop(){
            try {
                var userInfo = JSON.parse(localStorage.userInfo);
            } catch (error) {
                return;       
            }
            axios({
                method:'get',
                url:'/api-s/shops/finByUserid/'+userInfo.username
            }).then(x=>{
                console.log('获取自己的店铺',x);
                this.state.myshop=x.data.data
            }).catch(err=>{
                console.log('获取自己的店铺错误',err)
            })
        },
        
    },
    actions: {
        actions_agentUser({ dispatch, commit }) {
            //获取代理人信息
            commit("setagentUser"); // 等待 actionA 完成
        },
        getMyshop({dispatch,commit}){
            return new Promise((resolve, reject)=>{
                // await dispatch('actionA') // 等待 actionA 完成
                try {
                    var userInfo = JSON.parse(localStorage.userInfo);                
                } catch (error) {
                    resolve();
                    return
                }
                request('/api-s/shops/finByUserid/'+userInfo.username,'','get').then(x=>{
                    this.state.myshop=x.data.data
                    resolve()
                }).catch(error=>{
                    console.log(error);
                    reject()
                })
                // resolve(1)
            })
        }
        // 调用 store.dispatch('actions_agentUser')
    },
    modules: {
        shangPing:shangPing,
        hongbao:hongbao,
        // orders:orders
    },
});
// store.commit( 'setIsWeixin', 1);
export default vuex;
// 判断是不是微信
var agent = navigator.userAgent.toLowerCase();
if (agent.match(/MicroMessenger/i) == "micromessenger") {
    //console.log("微信浏览器内访问");
    vuex.state.isweixin = true;
} else {
    // console.log("不是微信");
    vuex.state.isweixin = false;
}
//登录信息
var loginDate = localStorage.loginDate;
vuex.commit("setloginDate", loginDate);
//微信登录的信息
var weixinobj = localStorage.weixin;
vuex.commit("setweixinobj", weixinobj);
//获取个人信息
// vuex.commit("setCurrent");

//查询店铺类型
vuex.commit('setShopTree')


//获取地区
if (localStorage.area && localStorage.area != "" && localStorage.area != undefined && localStorage.area != "undefined") {
    vuex.state.area = JSON.parse(localStorage.area);
}
//初始化分类
try {
    var list=JSON.parse(localStorage.shops_tree_list)
    vuex.state.shops_tree_list=list;
} catch (error) {}

axios({
    method: "get",
    url: "/api-u/area/findAll",
    params: {
        start: 0,
        length: 30000
    }
}).then(x => {
    console.log("获取地区", x);
    vuex.state.area = x.data.data;
    localStorage.area = JSON.stringify(x.data.data);
});
