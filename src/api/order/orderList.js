import axios from '@/api/axios.js'


const orderList =async (obj) =>{
    // if(nextPage){
    //     obj.page_index++
    // }
    obj.query.start=obj.page_index*obj.query.length
    obj.loading=true
    return new Promise((resolve, reject) => {
        var params=obj.query;
        axios.get('/api-s/shops/findAllShopOrders',{params}).then(x=>{
            // console.log(x);
            obj.list=obj.list.concat(x.data.data.data);
            obj.total=x.data.data.total;
            obj.loading=false;
        }).catch(err=>{
            console.log(err);
        })
    });
};
export {
    orderList,
}

