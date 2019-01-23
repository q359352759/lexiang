import axios from "axios";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 60000;
// axios.defaults.baseURL = "http://192.168.1.11:8080";
// axios.defaults.baseURL = 'http://172.20.10.2:8080';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN AUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKENAUTH_TOKEN';
// axios.defaults.baseURL = 'http://local.register.com:8761/';

import qs from "qs";
//拦截器
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error) {
      if (error.response) {
        return error.response;
      }
    }
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);

// 输出方法
export default function request(url, data = {}, method = "post", type) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method
    };
    if (method.toLowerCase() === "get") {
      options.params = data;
    } else if (type) {
      options.data = qs.stringify(data);
    } else {
      options.data = data;
    }
    axios(options)
      .then(res => {
        // console.log('返回数据', res)
        resolve(res);
      })
      .catch(error => {
        reject();
        console.error(error);
      });
  });
}
