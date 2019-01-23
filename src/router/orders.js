const orderList = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/my/orders/orderList.vue"));
  });
}; //订单列表
const order = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/my/orders/order.vue"));
  });
}; //订单列表

// const order =()=>{
//     return new Promise((res,err)=>{
//         setTimeout(()=>{
//             res( import("@/views/my/orders/order.vue"))
//         },3000)
//     })
// }

const orders = [
  {
    path: "/orders/orderList",
    name: "",
    component: orderList
  },
  {
    path: "/orders/order",
    name: "ordersOrder",
    component: order
  }
];

export default orders;
