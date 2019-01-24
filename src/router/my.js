const AboutUs = resolve => { require.ensure([], () => { resolve(require("@/views/my/AboutUs.vue")); }); }; //关于我们
const 评价 = resolve => { require.ensure([], () => { resolve(require("@/views/my/评价/评价.vue")); }); }; //关于我们

//my       开头
const mys = [
    {
        path: "/my/AboutUs",
        name: "",
        component: AboutUs
    },
    {
        path: "/my/pingjia/pingjia",
        name: "",
        component: 评价
    }
];

export default mys;
