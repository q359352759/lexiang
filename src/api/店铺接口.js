import axios from "./axios.js";
import qs from "qs";

const api_根据shopid查询店铺=(shopid)=>{
    return new Promise((resolve, reject) => {
        axios.get("/api-s/shops/findByShopid/" + shopid).then(x => {
            resolve(x);
        }).catch(err => {
            reject(err);
        });
    });
}


const api_查询店铺=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/findAll',{params:query}).then(x=>{
            resolve(x);
        }).catch(err=>{
            reject(err);
        })
    });
}
const api_店铺修改列表=(query)=>{
    return new Promise((resolve, reject) => {
        axios.get('/api-s/shops/update/findAll',{params:query}).then(x=>{
            resolve(x);
        }).catch(err=>{
            reject(err);
        })
    });
}

export {
    api_根据shopid查询店铺,
    api_查询店铺,
    api_店铺修改列表
}