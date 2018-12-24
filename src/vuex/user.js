import axios from '@/api/axios.js'
import qs from "qs";
import {b64DecodeUnicode} from '@/assets/js/base64jiema.js';

export default {
    namespaced:true,
    state:{

    },
    getters:{
        
    },
    mutations:{
        
    },
    actions: {
        async updated_user(){
            return new Promise((resolve, reject) => {
                var weixininfo=''
                try {
                    weixininfo=JSON.parse(localStorage.weixininfo);
                } catch (error) {
                }
                if(!weixininfo || weixininfo==''){
                    resolve('没有微信用户信息');
                    return
                }
                var userInfo=JSON.parse(localStorage.userInfo);
                    userInfo.headImgUrl=weixininfo.headimgurl;
                    userInfo.nickname=weixininfo.nickname;
                axios.post('/api-u/users/update/headImgUrl',qs.stringify(userInfo)).then(x=>{
                    if(x.data.code==200){
                        
                    }else{
                        alert(JSON.stringify(x.data));
                    }
                    resolve(x)
                }).catch(err=>{
                    console.log(err);
                    resolve(err)
                })
            });
        },
        async get_user(){
            return new Promise((resolve, reject) => {
                if (!localStorage.id || localStorage.id == "" || localStorage.id == null || localStorage.id == undefined || localStorage.id == "undefined") {
                    alert("获取用户信息失败，请重新登录");
                    location.href = "index.html#/login";
                    return;
                }
                var id = localStorage.id;
                axios({
                    method: "get",
                    url: "/api-u/users/" + id
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
                        localStorage.userInfo = JSON.stringify(userInfo);
                    }
                    resolve(x)
                }).catch(error => {
                    alert("获取用户信息失败，请重新登录");
                    location.href = "index.html#/login";
                    resolve(error)
                });
            });
        },
    },
    modules: {
        
    }
}