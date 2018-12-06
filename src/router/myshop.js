

const ApplicationDistribution = () => import ("@/views/myshop/distribution/ApplicationDistribution.vue"); //申请 开通分销功能


const myshops=[
    {
        path: '/myshop/distribution/ApplicationDistribution',
        name:'',
        component: ApplicationDistribution,
        children: [
        ]
    }
]

export default myshops;