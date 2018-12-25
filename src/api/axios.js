import axios from "axios";

axios.defaults.baseURL = baseURL;
axios.defaults.timeout =  60000;

//拦截器
axios.interceptors.response.use(response =>{
    return response;
    },error=>{
        if(error){
            if (error.response) {
                return error.response;
            }
        }
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
);


// 输出方法
export default axios;