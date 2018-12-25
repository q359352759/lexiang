
const BonusDetail= resolve => { require.ensure([], () => {resolve( require('@/views/Agent/BonusDetail.vue') )}) }       //分润详情
const ApplicationNotes= resolve => { require.ensure([], () => {resolve( require('@/views/Agent/ApplicationNotes.vue') )}) }       //申请代理人说明

const agents=[
    {
        path:'/agent/BonusDetail',
        name:'',
        component:BonusDetail
    },{
        path:'/agent/ApplicationNotes',
        name:'',
        component:ApplicationNotes
    }
]

export default agents;
