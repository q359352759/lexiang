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


export default {
    namespaced:true,
    state:{
        
    },
    getters:{

    },
    mutations:{
        
    },
    actions: {

    },
    modules: {
        
    }
}