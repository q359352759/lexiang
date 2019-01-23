// 商品详情
const CommodityDetails = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/Commodity/CommodityDetails.vue"));
  });
}; //商品详情
const PurchaseSingle = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/Commodity/PurchaseSingle.vue"));
  });
}; //购买单个商品

//commodity       开头
const commodity = [
  {
    path: "/commodity/CommodityDetails",
    name: "",
    component: CommodityDetails
  },
  {
    path: "/commodity/PurchaseSingle",
    name: "",
    component: PurchaseSingle
  }
];

export default commodity;
