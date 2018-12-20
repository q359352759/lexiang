
const AboutUs = resolve => { require.ensure([], () => { resolve(require("@/views/my/AboutUs.vue")); }); }; //关于我们

//my       开头
const mys=[
    {
        path:'/my/AboutUs',
        name:'',
        component:AboutUs
    }
]

export default mys;

