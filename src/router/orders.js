const orderList = resolve => { require.ensure([], () => { resolve(require("@/views/my/orders/orderList.vue")); }); }; //订单列表
// const order = resolve => { require.ensure([], () => { resolve(require("@/views/my/orders/order.vue")); }); }; //订单列表

const orders=[
    {
        path:'/orders/orderList',
        name:'',
        component:orderList
    },
    // {
    //     path:'/orders/order',
    //     name:'',
    //     component:order
    // }
]

export default orders;
