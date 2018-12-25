<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @tap="$router.push('/my')" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">申请成为业务代理人</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li class="text_indent">1、成为业务代理人可享受永续佣金，可以申请所有店铺的分销，赚取更多的收益。</li>
                <li class="text_indent">2、上万种商品、千个店铺，自用省钱，分享赚钱！</li>
                <li class="text_indent">3、你可以享有以下权利：</li>
                <li class="text_indent">（1）推荐会员。</li>
                <li class="text_indent">（2）推荐商家。</li>
                <li class="text_indent">（3）推荐代理人。</li>
                <li class="text_indent">（4）推荐区域代理商。</li>
                <li class="text_indent">（5）免费参与业务培训。</li>
                <li class="text_indent">4、成为业务代理人的利益：</li>
                <li class="text_indent">（1）可获得团队建设补贴，最高147元/人。</li>
                <li class="text_indent">（2）推荐店铺，享有促销额的分润。</li>
                <li class="text_indent">（3）推荐会员，享有会员消费分佣。</li>
                <li class="text_indent">（4）可获得店铺分销佣金。</li>
                <li class="text_indent">（5）可获分红包乐购平台销佣金。</li>
            </ul>
            
            <form @submit.prevent="tijiao()">
                <ul class="box_2">
                    <li>推荐人：</li>
                    <li>
                        <!-- oninvalid="setCustomValidity('手机号码有误。');" -->
                        <input type="text" v-model="phone" placeholder="推荐人手机号" required pattern="^[1][0-9]{10}">
                    </li>
                </ul>
                <div class="box_3">提示：推荐人必须为代理人。</div>
                <div class="box_4">
                    <btn value="确定" type="submit"/>
                </div>
            </form>
    
    
        </div>
    </div>
</template>

<script>
import btn from '@/components/button.vue';
import { mapActions } from 'vuex';
export default {
    name:'',
    components: {
        btn  
    },
    data () {
        return {
            phone:''
        }
    },
    methods: {
        ...mapActions({
            get_agentUser_phone:'agent/get_agentUser_phone'
        }),
        tijiao(){
            var phone_test=/^[1][0-9]{10}/;
            if(!phone_test.test(this.phone)){
                mui.toast('请输入正确电话号码。', {duration: "long", type: "div" });
            }else{
                this.get_agentUser_phone(this.phone).then(x=>{
                    if(x.data.code==200){
                        if(x.data.data){
                            this.$router.push('/ApplicationAgent?phone='+this.phone);
                        }else{
                            mui.toast('此号码不是代理商', {duration: "long", type: "div" });                            
                        }
                    }else{
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                    }
                }).catch(err=>{
                    mui.alert('系统错误稍后再试。', "提示",'我知道了', function() {},"div");
                })
            }
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    padding: 15px;
    color: rgba(80, 80, 80, 1);
	font-size: 14px;
    line-height: 200%;
    margin: 0px 0px 15px;
    .text_indent{
        text-indent: 20px;
    }
}
.box_2{
    background: #ffffff;
    height: 44px;
    display: flex;
    align-items: center;
    li:nth-child(1){
        width: 113px;
        padding: 0px 0px 0px 15px;
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
    li:nth-child(2){
        flex-grow: 1;
        height: 100%;
    }
    input{
        padding: 0px;
        margin: 0px;
        height: 100%;
        border: none;
        font-size: 14px;
    }
}
.box_3{
    padding: 15px;
    color: rgba(166, 166, 166, 1);
	font-size: 12px;
}
.box_4{
    padding: 15px 0px;
}

</style>


