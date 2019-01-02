import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from 'vuex-persistedstate'

import axios from "axios";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout =  60000;

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

import shangPing from "./vuex/shangPing";       //商品相关接口
import hongbao from "./vuex/hongbao";           //红包相关接口
import shop from "@/vuex/shop.js";
import orders from '@/vuex/orders.js';          //订单
import user from "@/vuex/user.js";
import myshops from '@/vuex/myshops.js'
import 实名认证 from '@/vuex/实名认证.js';
import 申请开店 from '@/vuex/申请开店.js'

import request from '@/api/request';
import agent from '@/vuex/agent.js'
Vue.use(Vuex);
// 对名字进行解码
import {b64DecodeUnicode} from '@/assets/js/base64jiema.js';

// export default ()=>{
export default new Vuex.Store({
        plugins: [createPersistedState()],
    // return new Vuex.Store({
        
        // plugins: [
            // createPersistedState({
            //   storage: {
            //     getItem: key => Cookies.get(key),
            //     // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            //     setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
            //     removeItem: key => Cookies.remove(key)
            //   }
            // })
        // ],
        state: {
            weixin_ready:false,     //微信准备就绪
            clientX: 100, //远点导航X
            clientY: 350, //远点导航Y
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
            geographical_position(state){
                return state.geographical_position
            },
            apply_for_a_shop(state){
                return state.apply_for_a_shop
            },
            test1(state){
                // this.$store.getters.doneTodos  这种写法和下面的写法不一样
                return state.todos.find(todo => todo.done)
                // return 'store测试1';
            },
            test:state=>()=>{
                return 'store测试';
            },
            doneTodos:state=>()=>{
                console.log(1)
                //this.$store.getters.doneTodos(...)
                return state.todos.find(todo => todo.done)
            },
            filter_area: (state,getters) => (id, list) => {
                console.log('过滤地址');
                var arr = list ? list : [];
                var obj = state.area.find(x => x.id == id);
                if (obj) {
                    arr.unshift(obj);
                    if (obj.parentid) {
                        getters.filter_area(obj.parentid, arr);
                    }
                }
                return arr;
            },
            get_myshop(state){
                return state.myshop;
            },
            g_agentUser(state){
                return state.agentUser;
            }
        },
        mutations: {
            filter_area(){

            },
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
                }).then(x => {
                    console.log("获取用户代理人信息", x);
                    if (x.data.code == 200) {
                        state.agentUser = x.data.data;
                    } else {
                        state.agentUser = false;
                    }
                }).catch(error => {
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
                        let userInfo=x.data.data;
                        try {
                            userInfo.nickname=b64DecodeUnicode(userInfo.nickname)
                        } catch (error) {}
                        
                        state.userInfo = userInfo;
                        localStorage.userInfo = JSON.stringify(userInfo);
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
                    // url:'http://122.114.169.178:10002/api-s/shops/tree/findAll',
                    url:'/api-s/shops/tree/findAll',
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
                        console.log('获取店铺类型失败',x);
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
            //获取自己的店铺
            async setMyshop(){
                var userInfo = JSON.parse(localStorage.userInfo);
                return new Promise((resolve, reject) => {
                    axios({
                        method:'get',
                        url:'/api-s/shops/finByUserid/'+userInfo.username
                    }).then(x=>{
                        console.log('获取自己的店铺',x);
                        this.state.myshop=x.data.data;
                        resolve()
                    }).catch(err=>{
                        reject()
                    })
                });
            },
            actions_agentUser({ dispatch,state}) {
                //获取代理人信息
                var userInfo = JSON.parse(localStorage.userInfo);
                return new Promise((resolve, reject) => {
                    axios.get("/api-u/agentUser/me?userid="+userInfo.username).then(x=>{
                        if(x.data.code==200){
                            state.agentUser = x.data.data;
                        }else{
                            state.agentUser = false;
                        }
                        resolve(x)
                    }).catch(err=>{
                        state.agentUser = false;
                        resolve(err)
                    })
                });
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
                        resolve(x)
                    }).catch(error=>{
                        reject(error)
                    })
                    // resolve(1)
                })
            },
            //获取地区
            get_area({state}){
                axios({
                    method: "get",
                    url: "http://api.redmall.vip:10002/api-u/area/findAll",
                    params: {
                        start: 0,
                        length: 30000
                    }
                }).then(x => {
                    console.log("获取地区", x);
                    if(x.data.total){
                        state.area = x.data.data;
                        localStorage.area = JSON.stringify(x.data.data);
                    }
                });
            }
            // 调用 store.dispatch('get_area')
        },
        modules: {
            shangPing:shangPing,
            shop:shop,
            hongbao:hongbao,
            orders:orders,
            user:user,
            agent:agent,
            myshops:myshops,
            实名认证:实名认证,
            申请开店:申请开店
        },
        
    })
// })



