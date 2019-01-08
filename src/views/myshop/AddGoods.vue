<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @tap="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{Submission_type ? '编辑商品' : '发布商品'}}</h1>
        </header>
        <div class="mui-content mui-fullscreen">

            <div class="box_1">
                <ul class="mui-table-view ">
                    <li class="mui-table-view-cell item_box">
                        <span class="text_1">商品名：</span>
                        <input type="text" value="" v-model="add_obj.name">
                    </li>
                    <li class="mui-table-view-cell item_box" @click="selset_unit()">
                        <span class="text_1">单位：</span>
                        <input class="mui-text-center"  type="text" v-model="add_obj.unit" readonly> 
                        <div class="text_3"></div>
                    </li>
                    <li class="mui-table-view-cell item_box">
                        <span class="text_1">市场价：</span>
                        <input type="text" class="mui-text-center"  v-model="add_obj.marketPrice">
                        <div class="text_3">元</div>
                    </li>
                    <li class="mui-table-view-cell item_box">
                        <span class="text_1">售价：</span>
                        <input type="text" class="mui-text-center" v-model.number="add_obj.sellingPrice" @input="input_change('sellingPrice')">
                        <div class="text_3">元</div>
                    </li>
                    <li class="mui-table-view-cell item_box">
                        <span class="title_2">可抵扣：</span>
                        <input type="text" class="mui-text-center input_1" @input="input_change('deduction')" v-model.number="add_obj.deduction">
                        <span>元，即</span>
                        <input type="text" class="mui-text-center input_1" @input="input_change('percentage')" v-model.number="add_obj.percentage">
                        <span>%</span>
                    </li>
                    <li class="mui-table-view-cell item_box" v-if="myshop.distribution!=0">
                        <span class="title_2">佣金：</span>
                        <input type="text" class="mui-text-center input_1" @input="input_change('commission')" v-model.number="add_obj.commission">
                        <span>元，即</span>
                        <input type="text" class="mui-text-center input_1" @input="input_change('commissionPercentage')" v-model.number="add_obj.commissionPercentage">
                        <span>%</span>
                    </li>
                </ul>
            </div>

            <div class="box_1">
                <ul class="mui-table-view ">
                    <li class="mui-table-view-cell item_box item_1">
                        <div @click="是否专享=!是否专享" class="radio_1" :class="{'active':是否专享}">
                            <i class="icon iconfont icon-xuanze"></i>
                        </div>
                        <span @click="选择专享=true">{{专享商品.type==0 ? '新人专享' : '生日专享'}}</span>
                        <span class="icon_1" @click="选择专享=true">
                            <i class="mui-icon mui-icon-arrowdown"></i>
                        </span>
                        <span class="zhanwei"></span>
                        <span>专享抵扣：</span>
                        <input type="text" @blur="专享抵扣改变()" class="mui-text-center input_1" v-model.number="专享商品.deduction">
                        <span>元</span>
                    </li>
                </ul>
            </div>

            <ul class="box_3">
                <li class="title_1">
                    <span>商品图片：(640*480)</span>
                    <span class="mui-pull-right">最多4张，已有{{img_list.length}}张</span>
                </li>
                <li class="lunbo">
                    <div class="left_1" @click="slideNext()">
                        <i v-show="left" class="mui-icon mui-icon-back"></i>
                    </div>
                    <div class="img_list">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <!-- <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                                    <img :src="x" alt="" >
                                </div> -->
                                <div class="swiper-slide" v-for="(x, index) in img_list" :key="index">
                                    <img :src="x" alt="">
                                    <span @click="delete_img(index)" class="delete_1" :inde="index"><i class="icon iconfont icon-del"></i></span>
                                </div>
                            </div>
                            <!-- Add Pagination -->
                            <!-- <div class="swiper-pagination"></div> -->
                        </div>
                    </div>
                    <div class="right_1" @click="Album()">
                        <span>
                            <i class="mui-icon mui-icon-plusempty"></i>
                        </span>
                    </div>
                </li>
            </ul>

            <!-- <div id="editor" class="editor"></div> -->

            <ul class="contenteditable_box">
               <li class="header">
                    <div>
                        <select name="16px" v-model="font_size">
                            <option value="24px">24px</option>
                            <option value="20px">20px</option>
                            <option value="16px">16px</option>
                            <option value="14px">14px</option>
                            <option value="12px">12px</option>
                        </select>
                    </div>
                    <div class="zitiyanse bg" v-show="isAndroid" @click="chnage_font_color()"></div>
                    <div @click="add_shiping()" class="shiping bg"></div> 
                    <div @click="set_Album_show()" class="tupian bg"></div>
                    <input  type="color" class="font_color mui-hidden" v-model="font_color" ref="font_color">
                </li>
                <li class="content_box" ref="content_box">
                    <div class="content_1" ref="content_1" :style="{'font-size':font_size,'color':font_color}" v-html="html" contenteditable="true"></div>
                </li>
            </ul>

            <!-- 视频选择框 -->
            <div class="video_box" v-show="video_show">
                <div class="mask"></div>
                <div class="cont_1">
                    <div @tap="close_1()" class="close_1"><i class="icon iconfont icon-quxiao"></i> </div>
                    <div class="title" >请输入视频链接</div>
                    <div class="input_box">
                        <input type="text" v-model="video_url">
                    </div>
                    <button @tap="queding()" class="btn_2">确定</button>
                </div>
            </div>
        </div>

        <div @click="add()" class="box_4">
            <div v-if="Submission_type">
                {{add_obj.state==1 ? "保存" : "保存并上架"}}
            </div>
            <div v-if="!Submission_type">确认发布</div>
        </div>

        <!-- <Album v-show="Album_show" v-on:setShow="setShow"/> -->
        <Album v-show="Album_show" :seetype="seetype" :type="seetype" v-on:setlist="reslist"/>
        
        <div class="选择专享类型" v-show="选择专享">
            <div class="msk" @click="选择专享=false"></div>
            <ul>
                <li @click="选择专享类型(0)">新人专享</li>
                <li @click="选择专享类型(1)">生日专享</li>
            </ul>
        </div>

    </div>
</template>

<script>
import { openloading,isAndroid } from "@/assets/js/currency";
import Album from '@/components/Album.vue';
import $ from 'jquery'
import { mapActions } from 'vuex';
export default {
    name:'',
    components: {
        Album  
    },
    data(){
        return{
            
            sol:'-',
            font_size:'16px',
            font_color:'#000000',
            isAndroid:true,
            html:'',
            //视频选择器
            video_show:false,
            video_url:'',
            //图片选择器
            img_type:1,             //图片类型用于放在哪里 1表示选择的商品图片 2表示编译器的图片
            Album_show:false,
            seetype:3,              //1店招  2环境 3商品 4描述 5其他
            select_img:[],          //已经选择的图片
            // img_list:[],

            left:false,
            deduction:'',           //抵扣输入框中的内容
            commission:'',          //佣金输入框中的内容
            add_obj:{
                id:'',
                shopid:"",          //店铺Id
                name:"",            //商品名
                unit:"份",          //单位
                marketPrice:"",     //市场价
                sellingPrice:"",    //售价
                //===========
                twtreid:2,          //红包抵扣方式 1 % 2具体金额
                deduction:"",       //抵扣金额
                percentage:'',      //抵扣比例
                //===========
                commissionType:2,   //分佣类型	1 % 2具体金额 用于显示
                commission:"",      //分佣金额
                commissionPercentage:"",        //分佣比例 填写百分比
                //===========
                img:'',             //照片
                arrImg:[],          //添加时候使用
                remark:"",          //描述
                sequence:"",        //序号
                createTime:"",
                updataTime:"",
                state:1,            //0未下架 1位上架     
                // sales:0,        //销量      
            },
            Picker1:'',
            img_list:[],
            editor:'',
            Submission_type:'',
            um:'',
            选择专享:false,
            是否专享:false,
            专享商品:{
                shopid:'',      //店铺id
                commodityId:'',     //商品id
                type:0,         //0新人 1生日
                typeName:'',    //
                deduction:'',   //抵扣金额
                percentage:'',  //计算出来的百分比
            },
        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop
        },
        deduction_money(){
            if(isNaN(this.deduction*this.add_obj.sellingPrice/100)){
                return 0;
            }else{
                return (this.deduction*this.add_obj.sellingPrice/100).toFixed(2)
            }
        },
        commission_money(){
            if(isNaN(this.commission*this.add_obj.sellingPrice/100)){
                return 0
            }else{
                return (this.commission*this.add_obj.sellingPrice/100).toFixed(2)
            }
        }
    },
    methods:{
        ...mapActions({
            获取店铺:"setMyshop",
            添加商品:'shangPing/添加商品',
            修改商品:"shangPing/修改商品",
            添加专享:'shangPing/添加专享',
            修改专享:'shangPing/修改专享',
            删除专享:'shangPing/删除专享'
        }),
        //点击添加视频
        add_shiping(){
            window.scroll(0,0);
            this.video_show=true;
        },
        //关闭视频输入框
        close_1(){
            this.video_show=false;
        },
        //确定视频
        queding(){
            //http://www.runoob.com/try/demo_source/movie.mp4
            if(!this.video_url){
                mui.toast('请输入视频链接。', {duration: "long",type: "div"});
            }else{
                var html='<video width="100%" controls src="'+this.video_url+'">'+
                            '<source src="'+this.video_url+'" type="video/mp4">'+
                            '<source src="'+this.video_url+'" type="video/ogg">'+
                        '</video><div style="min-height:20px;"></div>'
                // this.editor.execCommand('insertHtml', html);
                $('.content_1').append(html);
                this.video_url='';
                this.video_show=false;
                // history.back();  //这个是用于百度输入框的时候用
            }
        },
        //选择颜色
        chnage_font_color(){
            if(!isAndroid()){
                mui.toast('您的手机无此功能', {duration: "long",type: "div"});
            }else{
                this.$refs.font_color.click()
            }
        },
        //编辑器选择图片
        set_Album_show(){
            this.img_type=2;
            this.$store.state.Select_picture.list=[];
            window.scroll(0,0);
            this.Album_show=true;
            this.$router.push('/AddGoods?Album_show=true');
        },
        //图片返回值
        reslist(list){
            console.log('收到图片',list);
            if(this.img_type==1){
                var newlist=[];
                list.forEach(item => {
                    newlist.push(item.url)
                });
                this.img_list=newlist;
            }else{
                var html='';
                for(var i=0;i<list.length;i++){
                    if(list[i].url){
                        html+='<div style="margin:0px;"><img style="max-width: 100%;" width="100%" src="'+list[i].url+'" alt=""></div><div style="min-height:20px;"></div>';
                    }else{
                        html+='<div style="margin:0px;"><img style="max-width: 100%;" width="100%" src="'+list[i]+'" alt=""></div><div style="min-height:20px;"></div>';
                    }
                }
                console.log(html)
                $('.content_1').append(html);
            }
        },
        //
        input_change(x){
            var number_test= /^[0-9]+.?[0-9]*$/;    //可带小数
            if(!this.add_obj.sellingPrice || !this.add_obj[x] || !number_test.test(this.add_obj[x])){
                if(x=='sellingPrice'){
                    this.add_obj.percentage='';
                    this.add_obj.commissionPercentage='';
                }else if(x=='percentage'){
                    this.add_obj.deduction='';
                }else if(x=='deduction'){
                    this.add_obj.percentage='';
                }else if(x=='commissionPercentage'){
                    this.add_obj.commission='';
                }else{
                    this.add_obj.commissionPercentage='';
                }
                return;
            }
            if(x=='sellingPrice'){      //售价
                if(this.add_obj.percentage && number_test.test(this.add_obj.percentage)){ //比例
                    this.add_obj.percentage=Math.floor(parseFloat(this.add_obj.percentage)*10) /10;
                    this.add_obj.deduction=(this.add_obj.percentage*this.add_obj.sellingPrice/100).toFixed(2)
                }else if(this.add_obj.deduction && number_test.test(this.add_obj.deduction)){
                    this.add_obj.deduction=Math.floor(parseFloat(this.add_obj.deduction)*100)/100;
                    this.add_obj.percentage=(this.add_obj.deduction/this.add_obj.sellingPrice*100).toFixed(1);
                }

                if(this.add_obj.commissionPercentage && number_test.test(this.add_obj.commissionPercentage)){
                    this.add_obj.commissionPercentage=Math.floor(parseFloat(this.add_obj.commissionPercentage)*10)/10;
                    this.add_obj.commission=(this.add_obj.commissionPercentage*this.add_obj.sellingPrice/100).toFixed(1);
                }else if(this.add_obj.commission && number_test.test(this.add_obj.commission)){
                    this.add_obj.commission=Math.floor(parseFloat(this.add_obj.commission)*100)/100;
                    this.add_obj.commissionPercentage=(this.add_obj.commission/this.add_obj.sellingPrice*100).toFixed(1)
                }
            }

            if(x=='percentage'){    //百分比
                this.add_obj.percentage= Math.floor(this.add_obj.percentage * 10)/10 // this.add_obj.percentage.toFixed(1);
                var deduction=this.add_obj.percentage/100*this.add_obj.sellingPrice
                this.add_obj.deduction=Math.floor(deduction*100)/100;
            }
            if(x=='deduction'){     //金额
                this.add_obj.deduction=Math.floor(this.add_obj.deduction * 100) /100;
                var percentage=this.add_obj.deduction/this.add_obj.sellingPrice*100
                this.add_obj.percentage=Math.floor(percentage*10)/10;
            }

            if(x=='commissionPercentage'){  //百分比
                this.add_obj.commissionPercentage=Math.floor(this.add_obj.commissionPercentage*10)/10;
                var commission=this.add_obj.commissionPercentage/100*this.add_obj.sellingPrice
                this.add_obj.commission=Math.floor(commission*100)/100;
            }
            if(x=='commission'){    //金额
                this.add_obj.commission=Math.floor(this.add_obj.commission*100)/100;
                var commissionPercentage=this.add_obj.commission/this.add_obj.sellingPrice*100;
                this.add_obj.commissionPercentage=Math.floor(commissionPercentage*10)/10;
            }
        },
        //返回上一页
        back(){
            this.$router.push('/commodity')
        },
        专享抵扣改变(){
            this.专享商品.deduction=Math.round((this.专享商品.deduction)*100)/100
        },
        //点击确定
        add(){
            var this_1=this;
            
            // alert(text)
            var test_number=/^[0-9]*$/;
            if(!this.add_obj.name){
                mui.toast('请输入商品名称。', { duration: 2000, type: "div" });
                return
            }else if(!this.add_obj.unit){
                 mui.toast('请输入单位。', { duration: 2000, type: "div" });
                 return
            }else if(!this.add_obj.marketPrice || isNaN(this.add_obj.marketPrice)){
                mui.toast('请输入市场价。', { duration: 2000, type: "div" });
                return
            }else if(!this.add_obj.sellingPrice || isNaN(this.add_obj.sellingPrice)){
                mui.toast('请输入售价。', { duration: 2000, type: "div" });
                return
            }else if(this.add_obj.sellingPrice>this.add_obj.marketPrice){
                mui.toast('售价不能高于市场价', { duration: 2000, type: "div" });
                return
            }else if(!this.add_obj.deduction || isNaN(this.add_obj.deduction)){
                mui.toast('请输入抵扣金额。', { duration: 2000, type: "div" });
                return
            }else if(this.add_obj.deduction>this.add_obj.sellingPrice*0.8){
                mui.toast('可抵扣不能大于售价的80%', { duration: 2000, type: "div" });
                return
            }else if(this.img_list.length==0){
                mui.toast('请设置商品图片。', { duration: 2000, type: "div" });
                return
            }else if(this.是否专享 && !this.专享商品.deduction){
                mui.toast('请输入专享抵扣。', { duration: 2000, type: "div" });
                return
            }else if(this.是否专享 && this.专享商品.deduction<=this.add_obj.deduction){
                mui.toast('专享抵扣需大于商品抵扣。', { duration: 2000, type: "div" });
                return
            }else if(this.是否专享 && this.专享商品.deduction>this.add_obj.sellingPrice*0.9){
                mui.toast('抵扣金额不能大于商品金额的90%即'+this.add_obj.sellingPrice*0.9+'元。', { duration: "long",type: "div" });
                return
            }
            // this.add_obj.img=[];
            var img_list=[];
            for(var i=0;i<this_1.img_list.length;i++){
                img_list.push(this_1.img_list[i])
            }
            this.add_obj.shopid=this.myshop.shopid
            this.add_obj.arrImg=img_list;
            this.add_obj.remark=this.$refs.content_box.innerHTML;
            this.add_obj.state=1;

            if(this.是否专享){
                this.专享商品.commodityId=this.add_obj.id;
                this.专享商品.typeName=this.专享商品.type==0 ? '新人专享' : '生日专享';
                this.专享商品.shopid=this.myshop.shopid;
                this.专享商品.percentage=Math.fround(this.专享商品.deduction/this.add_obj.sellingPrice*100);
            }
            // return
            if(this.Submission_type==''){
                //添加商品
                if(!this.是否专享){
                    openloading(true)
                    this.添加商品(this.add_obj).then(x=>{
                        openloading(false)
                        if(x.data.code==200){
                            mui.toast('设置成功', { duration: "long",type: "div" });
                            history.back();
                        }else{
                            mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                        }
                    }).catch(err=>{
                        mui.toast('系统错误稍后再试。', { duration: "long",type: "div" });
                        openloading(false)
                    })
                }else{
                    this.添加商品返回值();
                }
            }else{
                // console.log('修改',this.add_obj)
                if(this.是否专享){
                    if(this.专享商品.id){
                        this.修改商品和修改专享();
                    }else{
                        this.修改商品和添加专享();
                    }
                }else if(!this.是否专享 && this.专享商品.id){
                    this.修改商品和删除专享();
                }else{
                    openloading(true)
                    this.修改商品([this.add_obj]).then(x=>{
                        openloading(false)
                        if(x.data.code==200){
                            mui.toast('设置成功', { duration: "long",type: "div" });
                            history.back();
                        }else{
                            mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                        }
                    }).catch(err=>{
                        mui.toast('系统错误稍后再试。', { duration: "long",type: "div" });
                        openloading(false)
                    })
                }
            }
        },
        async 添加商品返回值(){
            openloading(true);
            var res= await this.添加商品(this.add_obj)
            if(res.data.code==200){
                this.专享商品.commodityId=res.data.data;
                this.添加专享(this.专享商品).then(x=>{
                    if(x.data.code==200){
                        mui.toast('添加成功', { duration: "long",type: "div" });
                        history.back();
                    }else{
                        var str="<div>商品添加成功，设置专享失败</div>";
                            str+=x.data.msg ? x.data.msg : x.data.message;
                        mui.alert(str, "提示",'我知道了', function() {},"div");
                    }
                    openloading(false);
                }).catch(err=>{
                    mui.toast('系统错误，稍后再试。', { duration: "long",type: "div" });
                    openloading(false);
                })
            }else if(res.data.msg || res.data.message){
                openloading(false);
                mui.alert(res.data.msg ? res.data.msg : res.data.message, "提示",'我知道了', function() {},"div");
            }else{
                openloading(false);
                mui.toast('系统错误，稍后再试。', { duration: "long",type: "div" });
            }
        },
        修改商品和修改专享(){
            openloading(true);
            Promise.all([this.修改商品([this.add_obj]),this.修改专享(this.专享商品)]).then(x=>{
                openloading(false);
                if(x[0].data.code==200 && x[1].data.code==200){
                    mui.toast('设置成功', { duration: "long",type: "div" });
                    history.back();
                }else{
                    var str="";
                        str+=x[0].data.msg ? x[0].data.msg : x[0].data.message;
                        str+=x[1].data.msg ? x[1].data.msg : x[1].data.message;
                    mui.alert(str, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                openloading(false);
                mui.toast('系统错误，稍后再试。', { duration: "long",type: "div" });
            })
        },
        async 修改商品和添加专享(){
            openloading(true);
            await this.修改商品([this.add_obj]);
            this.添加专享(this.专享商品).then(x=>{
                if(x.data.code==200){
                    mui.toast('设置成功', { duration: "long",type: "div" });
                    history.back();
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
                openloading(false);
            }).catch(err=>{
                openloading(false);
                mui.toast('系统错误，稍后再试。', { duration: "long",type: "div" });
            })
        },
        修改商品和删除专享(){
            openloading(true);
            Promise.all([this.修改商品([this.add_obj]),this.删除专享(this.专享商品)]).then(x=>{
                if(x[0].data.code==200 && x[1].data.code==200){
                    mui.toast('设置成功', { duration: "long",type: "div" });
                    history.back();
                }else{
                    var str="";
                        str+=x[0].data.msg ? x[0].data.msg : x[0].data.message;
                        str+=x[1].data.msg ? x[1].data.msg : x[1].data.message;
                    mui.alert(str, "提示",'我知道了', function() {},"div");
                }
                openloading(false);
            }).catch(err=>{
                openloading(false);
                mui.toast('系统错误，稍后再试。', { duration: "long",type: "div" });
            })
        },
        //选择单位
        selset_unit(){
            var this_1=this;
            var obj=[
                    {'value':'个','text':'个'},
                    {'value':'件','text':'件'},
                    {'value':'套','text':'套'},
                    {'value':'份','text':'份'},
                    {'value':'盒','text':'盒'},
                    {'value':'包','text':'包'},
                    {'value':'瓶','text':'瓶'},
                    {'value':'次','text':'次'},
                    {'value':'间','text':'间'},
                    {'value':'双','text':'双'},
                    {'value':'只','text':'只'},
                    {'value':'付','text':'付'},
                    {'value':'尊','text':'尊'},
                    {'value':'把','text':'把'},
                    {'value':'块','text':'块'},
                    {'value':'罐','text':'罐'},
                    {'value':'辆','text':'辆'},
                    {'value':'升','text':'升'},
                    {'value':'方','text':'方'},
                    {'value':'斤','text':'斤'},
                    {'value':'吨','text':'吨'},
                    {'value':'包月','text':'包月'},
                    {'value':'包季','text':'包季'},
                    {'value':'包年','text':'包年'},
                    {'value':'小时','text':'小时'},
                    {'value':'天','text':'天'},
                    {'value':'人','text':'人'}
                ];
            this.Picker1.setData(obj);
            this.Picker1.show(x => {
                console.log(x);
                // this_1.add_obj.unit=x[0].value;
                this.$set(this.add_obj,'unit',x[0].value)
            });
        },
        //选择可抵扣类型
        set_twtreid(){
            console.log(123)
            var obj=[
                {'value':1,text:'%'},
                {'value':2,text:'元'},
            ]
            this.Picker1.setData(obj);
            this.Picker1.show(x => {
                console.log(x);
                this.add_obj.twtreid=x[0].value;
            });
        },
        //选择分佣类型
        set_commissionType(){
            var obj=[
                {'value':1,text:'%'},
                {'value':2,text:'元'},
            ]
            this.Picker1.setData(obj);
            this.Picker1.show(x => {
                console.log(x);
                this.add_obj.commissionType=x[0].value;
            });
        },
        //选择商品图片
        Album(){
            console.log(this.img_list);
            window.scroll(0,0);
            this.img_type=1
            this.Album_show=true;
            this.$store.state.Select_picture.list=this.img_list;
            this.$router.push('/AddGoods?Album_show=true');
        },
        //删除图片
        delete_img(index){
            console.log(index);
            this.img_list.splice(index,1);
            if(this.$store.state.Select_picture.type=='huanjing'){
                this.$store.state.Select_picture.list.splice(index,1)
            }
        },
        选择专享类型(type){
            this.专享商品.type=type;
            this.选择专享=false;
            this.是否专享=true;
        },
        获取专享商品(){
            this.loading=true;
            this.$axios('/api-s/shops/findExclusiveByCommodityId/'+this.add_obj.id).then(x=>{
                console.log('获取专享商品',x);
                // 0 ? '新人专享': '生日专享';
                if(x.data.code==200){
                    if(x.data.data.length>0){
                        this.专享商品=x.data.data[0];
                        this.是否专享=true;
                    }
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log('获取专享失败');
                mui.toast('系统错误，稍后再试。', { duration: "long",type: "div" });
            })
        }
    },
    beforeCreate: function() {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function() {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function() {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function() {
        var this_1 = this;
                
        //店铺类型
        this.Picker1 = new mui.PopPicker({
            layer: 1
        });

        //图片轮播
        this.swiper = new Swiper(".swiper-container",{
            // loop: true,
            // autoplay: true,
            slidesPerView: 'auto',
            observer:true,
            spaceBetween: 10,
            on: {
                transitionEnd() {
                    console.log('过渡结束transitionEnd',this.activeIndex);
                    if (this_1.img_list.length - this.activeIndex > 2) {
                        this_1.left = true;
                    } else {
                        this_1.left = false;
                    }
                }
            }
        });

            var query=this.$route.query;
            if(query.type){
                this.Submission_type=query.type;
                var commodity=JSON.parse(sessionStorage.commodity);
                this.add_obj=commodity;
                this.获取专享商品();
            }else{
                this.Submission_type='';
                var commodity={}
                this.add_obj=commodity;
            }
            this.img_list=commodity.img ? commodity.img.split(',') : [];
            //计算比例
            if(!this.add_obj.percentage){
                this.input_change('deduction')
            }
            
            if(this.add_obj.remark && this.add_obj.remark!=''){
                var str=this.add_obj.remark;
                // var str='<div data-v-845c3686="" contenteditable="true" class="content_1" style="font-size: 24px; color: rgb(0, 0, 255);">sdfsdfsdf</div>';
                var div=$(str)
                this.font_size=div.css('font-size') ? div.css('font-size') : '16px';
                this.font_size= parseInt(this.font_size)>10 ? this.font_size : '10px';
                this.font_color=div.css('color') ? div.css('color') : '#000000';
                this.html=div.html();
            }
                
    },
    activated() {
        console.log('再次进入页面');
    },
    deactivated(){

    },
    beforeUpdate: function() {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function() {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function() {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function() {
        // this.editor.destroy();	//销毁
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        $route(){
            var query=this.$route.query;
            // console.log(query)
            //选择图片
            if(!query.Album_show){
                this.Album_show=false;
            }else{
                this.Album_show=true;
            }
        }
    }
}
</script>

<style>
/* vue-html5-editor */
.editor{
    -webkit-user-select: text;
    -moz-user-select: text;
}
</style>
<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-content{
    padding-bottom: 50px;
}
.box_1 .mui-table-view-cell:after{
    right: 15px;
}
.box_1{
    margin: 3px 0px 3px 0px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
    .item_1{
        padding-right: 37PX;
    }
    .item_box{
        position: relative;
        display: flex;
        align-items: center;
        padding-top: 0px;
        padding-bottom:0px;
        min-height: 44px; 
        white-space: nowrap;
        .money{
            position: absolute;
            right: 50px;
            top: 0px;
            bottom: 0px;
            margin: auto;
            width: 80px;
            height: 30px;
            line-height: 30px;
            background: #eeeeee;
            font-size: 10px;
            text-align: center;
        }
        .text_1{
            flex-shrink: 0;
            width: 90px;
        }
        .title_2{
            width: 60px;
        }
        input{
            margin: 0px;
            padding: 0px;
            height: auto;
            border: none;
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
            background: none;
        }
        .input_1{
            background-color: rgba(229, 229, 229, 1);
            max-width: 96px;
        	height: 30px;
            margin: 0px 4px;
            flex-shrink: 1;
        }
        .text_3{
            width: 90px;
            flex-shrink: 0;
            text-align: right;
        }
        .icon_1 i{
            font-size: 16px;
        }
        .zhanwei{
            flex-grow: 1;
        }
        .radio_1{
            margin: 0px 16px 0px 0px;
        }
        .twtreid,
        .commissionType{
            padding: 0px 16px 0px 0px;
        }
    }
}

.box_3 {
    background: #ffffff;
    margin: 0px 0px 3px 0px;
    .title_1 {
        padding: 11px 15px;
        font-size: 0.14rem;
        color: rgba(80, 80, 80, 1);
    }
    .lunbo {
        display: flex;
        padding: 0px 0px 11px 0px;
        .left_1 {
            width: 15px;
            height: 0.9rem;
            line-height: 0.9rem;
            flex-shrink: 0;
            position: relative;
            i {
                font-size: 16px;
            }
        }
        .img_list {
            border: 1px solid #e4e4e4;
            flex-grow: 1;
            width: 0;
            .swiper-container {
                width: 100%;
            }
            .swiper-slide {
                width: 120px;
                height: 0.9rem;
                span {
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    width: 0.32rem;
                    height: 0.32rem;
                    background-color: rgba(153, 153, 153, 0.5);
                    color: #ffffff;
                    text-align: center;
                    line-height: 0.32rem;
                    font-size: 0.22rem;
                }
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        .right_1 {
            width: 0.4rem;
            height: 0.9rem;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(229, 229, 229, 1);
            span {
                width: 0.26rem;
                height: 0.26rem;
                border-radius: 100%;
                border: 1px solid rgba(40, 148, 220, 1);
                text-align: center;
                color: rgba(40, 148, 220, 1);
            }
        }
    }
}

.editor{
    margin-bottom: 50px;
}

.box_4{
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    // header_background
    background: $header_background;
	height: 0.44rem;
    line-height: 0.44rem;
    color: #ffffff;
    text-align: center;
}

.contenteditable_box{
    height: 400px;
    // flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid #c8c8ca;
    border-radius: 3px;
    .header{
        flex-shrink: 0;
        display: flex;
        background: #f4f4f4;
        padding: 3px;
        flex-wrap: wrap;
        div{
            height: 22px;
            font-size: 12px;
            padding: 0px 3px;
            line-height: 22px;
            color: #565656;
            margin: 0px 3px;
        }
        select{
            height: 100%;
            padding: 0px 5px;
            margin: 0px;
            border:1px solid #c8c8ca;
            appearance: menulist;
        }
        .bg{
            width: 22px;
            background-image: url('~@/assets/image/icons.png');
            // background-image: url('/image/icons.png');
        }
        .zitiyanse{
            background-position: -760px 0;
        }
        .shiping{
            background-position: -320px -20px;
        }
        .tupian{
            background-position: -380px 0px;
        }
        .font_color{
        }
    }
    .content_box{
        flex-grow: 1;
        overflow: auto;
        position: relative;
    }
    .content_1{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #ffffff;
        padding: 5px;
        // -webkit-user-select:text;
        user-select: text;
        -webkit-user-select:text
    }
    .content_1:empty:before{
        content: '请填写商品介绍，支持文字、图片、视屏链接。'; 
        color: gray; 
        position: absolute;
        top: 3px;
        left: 5px;
    }
}


.video_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    .close_1{
        position: absolute;
        top: 5px;
        right: 5px;
        color: #5a5a5a;
    }
    .mask{
        background: rgba(0,0,0,0.3);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    }
    .cont_1{
        width: 250px;
        background: #ffffff;
        position: relative;
        z-index: 1;
        padding: 10px;
        .title{
            font-size: 14px;
            margin: 0px 0px 5px;
            color: #565656;
        }
        input{
            padding: 0px 15px;
            height: 30px;
            font-size: 14px;
        }
    }
    .btn_2{
        background: $header_background;
        width: 100%;
        color: #ffffff;
    }
}
.选择专享类型{
    position:fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10;
    .msk{
        background: rgba(0,0,0,0.3);
        height: 100%;
    }
    ul{
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        background: #ffffff;
        text-align: center;
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        padding: 0px 0px 55px 0px;
        li{
            padding: 15px 0px 0px;
        }
    }
}

</style>
<style lang="scss">
.contenteditable_box{
    .content_1 *{
        user-select: text;
        -webkit-user-select:text
    }
}
</style>


