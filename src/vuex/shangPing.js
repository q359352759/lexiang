
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
             **/
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
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
                obj.loading=false
            }).catch(error => {
                console.log('获取商品失败',error);
                obj.loading=false;
                mui.toast('获取商品失败', { duration: 2000, type: "div" });
            });
        },
        //根据id查询商品
        get_shangping_1(state,obj){
            /**
             * id 商品id
             */
            axios({
                method:'get',
                url:'/api-s/shops/commodity/findById/'+obj.id
            }).then(x=>{
                // console.log('获取单个商品',x)
                if(x.data.code==200){
                    obj.fc(x.data.data)
                }
            }).catch(err=>{
                console.log(err);
                console.log('获取商品失败',err)
            })
        },
        get_shangping_2(state,id){
            var p=new Promise((resolve, reject)=>{
                    axios({
                        method:'get',
                        url:'/api-s/shops/commodity/findById/'+id
                    }).then(x=>{
                        // console.log('获取单个商品',x)
                        if(x.data.code==200){
                            resolve(x);
                        }else{
                            reject(x)
                        }
                    }).catch(err=>{
                        reject(err)
                        console.log('获取商品失败',err)
                    })
                })
            return p;
        },
        test(state){
            console.log(123123)
            return 1111111
        }
    },
    actions: {
        // get_shangping_3 ({ dispatch, commit }) {
        get_shangping_3 ({ dispatch, commit },context) {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve('根据商品Id获取店铺'+context);
                },3000)
            })
        }
        // store.dispatch('actionA').then(() => {
        //     // ...
        //   })

    },
    modules: {
        
    }
}
// store.commit( 'shangPing/...');



