
const guanli= resolve => { require.ensure([], () => {resolve( require('@/views/myshop/dianyuan/guanli.vue') )}) }  //我的店铺 店员管理
const banci= resolve => { require.ensure([], () => {resolve( require('@/views/myshop/dianyuan/banci.vue') )}) }  //我的店铺 设置班次
const addDianyuan= resolve => { require.ensure([], () => {resolve( require('@/views/myshop/dianyuan/addDianyuan.vue') )}) }  //我的店铺 添加店员
const dianyuanXiangqing= resolve => { require.ensure([], () => {resolve( require('@/views/myshop/dianyuan/dianyuanXiangqing.vue') )}) }  //我的店铺 添加店员


//店员
const dianyuan=[
    {
        path:'/myshop/dianyuan/guanli',
        name:"",
        component:guanli
    },
    {
        path:'/myshop/dianyuan/banci',
        name:"",
        component:banci
    },{
        path:'/myshop/dianyuan/addDianyuan',
        name:'',
        component:addDianyuan
    },{
        path:'/myshop/dianyuan/dianyuanXiangqing',
        name:'',
        component:dianyuanXiangqing
    }
]
export default dianyuan;