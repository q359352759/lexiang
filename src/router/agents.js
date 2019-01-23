const BonusDetail = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/Agent/BonusDetail.vue"));
  });
}; //分润详情
const ApplicationNotes = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/Agent/ApplicationNotes.vue"));
  });
}; //申请代理人说明
const 推广店铺 = resolve => {
  require.ensure([], () => {
    resolve(require("@/views/Agent/推广店铺.vue"));
  });
};

const agents = [
  {
    path: "/agent/BonusDetail",
    name: "",
    component: BonusDetail
  },
  {
    path: "/agent/ApplicationNotes",
    name: "",
    component: ApplicationNotes
  },
  {
    path: "/agent/dianPuTuiGuang",
    name: "",
    component: 推广店铺
  }
];

export default agents;
