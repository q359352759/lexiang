const 店员管理 = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/myshop/店员/店员管理.vue"));
  });
}; //我的店铺
const 设置班次 = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/myshop/店员/设置班次.vue"));
  });
}; //我的店铺
const 添加店员 = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/myshop/店员/添加店员.vue"));
  });
}; //我的店铺
const 店员详情 = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/myshop/店员/店员详情.vue"));
  });
}; //我的店铺
const 店员回复列表 = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/myshop/店员/店员回复列表.vue")), "myshop";
  });
}; //我的店铺
const 店员收银 = r =>
  require.ensure(
    [],
    () => r(require("@/views/myshop/店员/店员收银.vue")),
    "myshop"
  ); //我的店铺

// const huifuList=()=>{
//     return new Promise((resolve, reject) => {
//         console.log('开始加载')
//         setTimeout(()=>{
//             var huifuList =require("@/views/myshop/dianyuan/huifuList.vue");
//             resolve(huifuList)
//             console.log('加载结束')
//         },3000)
//     });
// }

//店员
const dianyuan = [
  {
    path: "/myshop/dianyuan/guanli",
    name: "",
    component: 店员管理
  },
  {
    path: "/myshop/dianyuan/banci",
    name: "",
    component: 设置班次
  },
  {
    path: "/myshop/dianyuan/addDianyuan",
    name: "",
    component: 添加店员
  },
  {
    path: "/myshop/dianyuan/dianyuanXiangqing",
    name: "",
    component: 店员详情
  },
  {
    path: "/myshop/dianyuan/huifuList",
    name: "",
    component: 店员回复列表
  },
  {
    path: "/myshop/dianyuan/dianYuanShouYing",
    name: "",
    component: 店员收银
  }
];
export default dianyuan;
