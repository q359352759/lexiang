
const BonusDetail= resolve => { require.ensure([], () => {resolve( require('@/views/Agent/BonusDetail.vue') )}) }       //分润详情

const agents=[
    {
        path:'/agent/BonusDetail',
        name:'',
        component:BonusDetail
    },

]

export default agents;
