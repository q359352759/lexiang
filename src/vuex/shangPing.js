
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
    state: {
        
    },
    getters: {
        // doneTodos(state, getters) {
        //     return state.todos.filter(todo => todo.done);
        // },
    },
    mutations: {
        //获取商品
        get_shangping(state,obj){
            /**
             * obj.list 返回的数据
             * obj.query 查询条件
             * 
             *  */
            obj.loading=true
            axios({
                method: "get",
                url: "/api-s/shops/commodity/findAll",
                // data:obj.query
                params:obj.query
            }).then(x => {
                console.log('获取商品',x)
                if(x.data.code == 200){
                    obj.list=obj.list.concat(x.data.data.data);
                    obj.total=x.data.data.total;
                }else{
                    mui.toast(x.data.msg ? x.data.msg : x.data.message , { duration: 2000, type: "div" });
                }
                obj.loading=false
            }).catch(error => {
                console.log('获取商品失败',error);
                obj.loading=false;
                // mui.toast('获取商品失败', { duration: 2000, type: "div" });
            });
        }
    },
    actions: {
        
    },
    modules: {
        
    }
}
// store.commit( 'setIsWeixin', 1);



