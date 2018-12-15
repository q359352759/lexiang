<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @tap="back()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{Submission_type ? '商品详情' : '添加商品'}}</h1>
        </header>
        <div class="mui-content">

            <div class="box_1">
                <ul class="mui-table-view ">
                    <li class="mui-table-view-cell item_box">
                        <span>商品名：</span>
                        <input type="text" value="" v-model="add_obj.name">
                    </li>
                    <li class="mui-table-view-cell item_box" @tap="selset_unit()">
                        <!-- <a class="mui-navigate-right item_box"> -->
                            <span>单位：</span>
                            <!-- <div>份</div> -->
                            <input class="mui-text-center" type="text" v-model="add_obj.unit" readonly> 
                            <div></div>
                        <!-- </a> -->
                    </li>
                    <li class="mui-table-view-cell item_box">
                        <span>市场价：</span>
                        <input type="text" class="mui-text-center"  v-model="add_obj.marketPrice">
                        <div>元</div>
                    </li>
                    <li class="mui-table-view-cell item_box">
                        <span>售价：</span>
                        <input type="text" class="mui-text-center" v-model.number="add_obj.sellingPrice" @input="input_change('sellingPrice')">
                        <div>元</div>
                    </li>
                    <!-- <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item_box">
                            <span>可抵扣：</span>
                            <input type="text" class="mui-text-center" v-model="deduction">
                            <span class="money" v-if="add_obj.twtreid==1">{{deduction_money}}元</span>
                            <div class="twtreid" @click="set_twtreid()">{{add_obj.twtreid==1 ? '%' : '元'}}</div>
                        </a>
                    </li> -->
                    <!-- <li class="mui-table-view-cell" v-if="myshop.distribution!=0">
                        <a class="mui-navigate-right item_box">
                            <span>佣金：</span>
                            <input type="text" class="mui-text-center" v-model="commission">
                            <span class="money" v-if="add_obj.commissionType==1">{{commission_money}}元</span>
                            <div @click="set_commissionType()" class="commissionType">{{add_obj.commissionType==1 ? '%' : '元'}}</div>
                        </a>
                    </li> -->
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

            <!-- <div class="editor_box">
                <div class="header">
                    商品介绍 <span></span>
                </div>
            </div> -->
            <!-- <div contenteditable="true" class="editor">123</div> -->
            <div id="editor" class="editor"></div>

        </div>
         <div @click="add()" class="box_4">保存</div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency";

export default {
    name:'',
    data(){
        return{
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
            config_1:{
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下七个
                toolbar:['fullscreen source undo redo bold italic underline'],
                //focus时自动清空初始化时的内容
                autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                //默认的编辑区域高度
                initialFrameHeight:300,
                initialFrameWidth:'100%'
                //更多其他参数，请参考umeditor.config.js中的配置项
            },
            config:{					//编译器配置
		          	initialFrameWidth: null,
                    initialFrameHeight: 300,
                    elementPathEnabled:false,       //是否显示路径
                    wordCount:false,                 //是否开启字数统计  
                    imageScaleEnabled:false,        //启用图片拉伸缩放
                    imagePopup:false,                 //图片操作的浮层开关，默认打开
		          	toolbars:[
					    	[
					        'undo', //撤销
					        'bold', //加粗
					        'italic', //斜体
					        'underline', //下划线
					        'strikethrough', //删除线
					        'subscript', //下标
					        'fontborder', //字符边框
					        'superscript', //上标
					        // 'formatmatch', //格式刷
					        // 'source', //源代码
					        // 'pasteplain', //纯文本粘贴模式
					        'selectall', //全选
					        // 'preview', //预览
					        'horizontal', //分隔线
					        // 'removeformat', //清除格式
					        // 'time', //时间
					        // 'date', //日期
					        'inserttitle', //插入标题
					        'cleardoc', //清空文档
					        // 'fontfamily', //字体
					        'fontsize', //字号
					        // 'paragraph', //段落格式
					        // 'simpleupload', //单图上传
					        // 'insertimage', //多图上传
					        // 'emotion', //表情
					        'spechars', //特殊字符
					        // 'searchreplace', //查询替换
					        // 'insertvideo', //视频
					        // 'help', //帮助
					        'justifyleft', //居左对齐
					        'justifyright', //居右对齐
					        'justifycenter', //居中对齐
					        'justifyjustify', //两端对齐
					        'forecolor', //字体颜色
					        'backcolor', //背景色
					        // 'insertcode',	//语言
					        'insertorderedlist', //有序列表
					        'insertunorderedlist', //无序列表
					        'fullscreen', //全屏
					        // 'directionalityltr', //从左向右输入
					        // 'directionalityrtl', //从右向左输入
					        // 'rowspacingtop', //段前距
					        // 'rowspacingbottom', //段后距
					        // 'pagebreak', //分页
					        // 'imagenone', //默认
					        // 'imageleft', //左浮动
					        // 'imageright', //右浮动
					        // 'imagecenter', //居中
					        // 'wordimage', //图片转存
					        // 'lineheight', //行间距
					        // 'edittip ', //编辑提示
					        // 'customstyle', //自定义标题
					        // 'autotypeset', //自动排版
					        // 'background', //背景
					        // 'template', //模板
					        // 'scrawl', //涂鸦
					        // 'charts', // 图表
					    ]
					]
            },
            img_list:[],
            editor:'',
            Submission_type:'',
            um:''
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
                    // this.add_obj.percentage=parseFloat(this.add_obj.percentage).toFixed(1);
                    this.add_obj.percentage=Math.floor(parseFloat(this.add_obj.percentage)*10) /10;
                    this.add_obj.deduction=(this.add_obj.percentage*this.add_obj.sellingPrice/100).toFixed(2)
                }else if(this.add_obj.deduction && number_test.test(this.add_obj.deduction)){
                    // this.add_obj.deduction=parseFloat(this.add_obj.deduction).toFixed(2);
                    this.add_obj.deduction=Math.floor(parseFloat(this.add_obj.deduction)*100)/100;
                    this.add_obj.percentage=(this.add_obj.deduction/this.add_obj.sellingPrice*100).toFixed(1);
                }

                if(this.add_obj.commissionPercentage && number_test.test(this.add_obj.commissionPercentage)){
                    // this.add_obj.commissionPercentage=parseFloat(this.add_obj.commissionPercentage).toFixed(1);
                    this.add_obj.commissionPercentage=Math.floor(parseFloat(this.add_obj.commissionPercentage)*10)/10;
                    this.add_obj.commission=(this.add_obj.commissionPercentage*this.add_obj.sellingPrice/100).toFixed(1);
                }else if(this.add_obj.commission && number_test.test(this.add_obj.commission)){
                    // this.add_obj.commission=parseFloat(this.add_obj.commission).toFixed(2);
                    this.add_obj.commission=Math.floor(parseFloat(this.add_obj.commission)*100)/100;
                    this.add_obj.commissionPercentage=(this.add_obj.commission/this.add_obj.sellingPrice*100).toFixed(1)
                }
            }

            if(x=='percentage'){    //百分比
                // this.add_obj.percentage=this.add_obj.percentage.toFixed(1);
                this.add_obj.percentage= Math.floor(this.add_obj.percentage * 10)/10 // this.add_obj.percentage.toFixed(1);
                var deduction=this.add_obj.percentage/100*this.add_obj.sellingPrice
                // this.add_obj.deduction=deduction.toFixed(2);
                this.add_obj.deduction=Math.floor(deduction*100)/100;
            }
            if(x=='deduction'){     //金额
                // this.add_obj.deduction=this.add_obj.deduction.toFixed(2);
                this.add_obj.deduction=Math.floor(this.add_obj.deduction * 100) /100;
                var percentage=this.add_obj.deduction/this.add_obj.sellingPrice*100
                // this.add_obj.percentage=percentage.toFixed(1)
                this.add_obj.percentage=Math.floor(percentage*10)/10;
            }

            if(x=='commissionPercentage'){  //百分比
                // this.add_obj.commissionPercentage=this.add_obj.commissionPercentage.toFixed(1);
                this.add_obj.commissionPercentage=Math.floor(this.add_obj.commissionPercentage*10)/10;
                var commission=this.add_obj.commissionPercentage/100*this.add_obj.sellingPrice
                // this.add_obj.commission=commission.toFixed(2)
                this.add_obj.commission=Math.floor(commission*100)/100;
            }
            if(x=='commission'){    //金额
                // this.add_obj.commission=this.add_obj.commission.toFixed(2);
                this.add_obj.commission=Math.floor(this.add_obj.commission*100)/100;
                var commissionPercentage=this.add_obj.commission/this.add_obj.sellingPrice*100;
                // this.add_obj.commissionPercentage=commissionPercentage.toFixed(1)
                this.add_obj.commissionPercentage=Math.floor(commissionPercentage*10)/10;
            }
        },
        //返回上一页
        back(){
            this.$router.push('/commodity')
        },
        //点击确定
        add(){
            var this_1=this;
            try {
                var text = this.editor.getContentTxt();
            } catch (error) {
                 var text ='';
            }
            
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
            }
            // this.add_obj.img=[];
            var img_list=[];
            for(var i=0;i<this_1.img_list.length;i++){
                img_list.push(this_1.img_list[i])
            }
            this.add_obj.shopid=this.myshop.shopid
            this.add_obj.arrImg=img_list;
            try {
                this.add_obj.remark=this.editor.getContent();
            } catch (error) {
                this.add_obj.remark=''        
            }

            console.log(this.add_obj);

            // return

            if(this.Submission_type==''){
                openloading(true)
                this.$axios({
                    method:'post',
                    url:'/api-s/shops/commodity/add',
                    data:this.add_obj
                }).then(x=>{
                    openloading(false)
                    if(x.data.code==200){
                        mui.toast('添加成功。', { duration: 2000, type: "div" });
                        this.$router.push('/commodity');
                    }else{
                        mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                    }
                    console.log(x)
                }).catch(err=>{
                    openloading(false)
                    mui.toast('系统错误，请稍后再试。', { duration: 2000, type: "div" });
                    console.log(err);
                })
            }else{
                // console.log('修改',this.add_obj)
                openloading(true)
                this.$axios({
                    method:'post',
                    url:'/api-s/shops/commodity/update',
                    data:[this.add_obj]
                }).then(x=>{
                    openloading(false)
                    if(x.data.code==200){
                        mui.toast('修改成功。', { duration: 2000, type: "div" });
                        this.$router.push('/commodity');
                    }else{
                        mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                    }
                    console.log(x)
                }).catch(err=>{
                    openloading(false)
                    mui.toast('系统错误，请稍后再试。', { duration: 2000, type: "div" });
                    console.log(err);
                })
            }
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
        //跳转相册
        Album(){
            this.$store.state.Select_picture.list=this.img_list;
            this.$store.state.Select_picture.type='huanjing';
            this.$router.push('/Album?seetype=3&size=4');
        },
        //删除图片
        delete_img(index){
            console.log(index);
            this.img_list.splice(index,1);
            if(this.$store.state.Select_picture.type=='huanjing'){
                this.$store.state.Select_picture.list.splice(index,1)
            }
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
        
        //获取店铺信息
        this.$store.commit('setMyshop');

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

        
        // setTimeout(()=>{
            //ue 文件编辑器 
            // this.editor = UM.getEditor('editor', this.config_1); // 初始化UM
            // setTimeout(()=>{
            //     this.editor.setContent('欢迎使用umeditor', false);
            //     this.editor.setEnabled();
            // },500)
            
            // this.um = UM.getEditor('myEditor',{
            //     //这里可以选择自己需要的工具按钮名称,此处仅选择如下七个
            //     toolbar:['fullscreen source undo redo bold italic underline'],
            //     //focus时自动清空初始化时的内容
            //     autoClearinitialContent:true,
            //     //关闭字数统计
            //     wordCount:false,
            //     //关闭elementPath
            //     elementPathEnabled:false,
            //     //默认的编辑区域高度
            //     initialFrameHeight:200
            //     //更多其他参数，请参考umeditor.config.js中的配置项
            // });
        // },2000)

        
        this.editor = UE.getEditor('editor', this.config); // 初始化UM
        // this.editor.addListener("ready", function () {
        //     alert('初始化完成')
        //     // console.log(123)
        //     // this_1.editor.setContent('请输入商品描述'); // 确保UM加载完成后，放入内容。
        // });

        UE.registerUI('上传图片',function(editor,uiName){
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName,{
                execCommand:function(){
                    // alert('execCommand:' + uiName)
                    this_1.$store.state.Select_picture.type='ue';
                    this_1.$store.state.Select_picture.list=[];
                    this_1.$router.push('/Album?seetype=4');
                    // 1店招  2环境 3商品 4描述 5其他
                }
            });

            //创建一个button
            var btn = new UE.ui.Button({
                //按钮的名字
                name:uiName,
                //提示
                title:uiName,
                //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
                cssRules :'background-position: -380px 0px;',
                //点击时执行的命令
                onclick:function () {
                    //这里可以不用执行命令,做你自己的操作也可
                    editor.execCommand(uiName);
                }
            });
            //当点到编辑内容上时，按钮要做的状态反射
            editor.addListener('selectionchange', function () {
                var state = editor.queryCommandState(uiName);
                if (state == -1) {
                    btn.setDisabled(true);
                    btn.setChecked(false);
                } else {
                    btn.setDisabled(false);
                    btn.setChecked(state);
                }
            });

            //因为你是添加button,所以需要返回这个button
            return btn;
        })
        /*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/
        // console.group('------mounted 挂载结束状态------');
        // ==============================

    },
    activated() {
        console.log('再次进入页面');

        var query=this.$route.query;
        if( this.$store.state.in_index==0){
            this.$store.state.in_index=1
            if(query.type){
                this.Submission_type=query.type;
                var commodity=JSON.parse(sessionStorage.commodity)
            }else{
                this.Submission_type='';
                var commodity={}
            }
            this.add_obj=commodity;
            this.img_list=commodity.img ? commodity.img.split(',') : [];
            if(!this.add_obj.percentage){
                this.input_change('deduction')
            }
            if(this.editor){
                setTimeout(()=>{
                    this.editor.setContent(this.add_obj.remark);
                },1000)
            }else{
                setTimeout(()=>{
                    this.editor.setContent(this.add_obj.remark);
                },3000)
            }
            console.log('缓存数据',this.add_obj)
        }

            // return this.$store.state.Select_picture;
        if(this.$store.state.Select_picture.type=='huanjing'){
            var list=this.$store.state.Select_picture.list;
            console.log(list)
            var img_list=[];
                for(var i=0;i<list.length;i++){
                    if(list[i].url){
                        img_list.push(list[i].url);
                    }else{
                        img_list.push(list[i]);
                    }
                }
            this.img_list=img_list;
            this.$store.state.Select_picture.type='';

            console.log('获取内容',this.editor.getContent());
            var html=this.editor.getContent();
            setTimeout(x=>{
                    // this.editor.execCommand('insertHtml', html)
                    // this.editor.setContent(html, true);
                    this.editor.setContent(html);
                    // setContent
            },1000)
        }
        console.log(this.$store.state.Select_picture.type)
        if(this.$store.state.Select_picture.type=='ue'){
            
            this.$store.state.Select_picture.type='';
            var img_list=this.$store.state.Select_picture.list;
            // if(img_list.length==0) return;

            console.log('获取内容',this.editor.getContent());
            var html=this.editor.getContent();
            for(var i=0;i<img_list.length;i++){
                html+='<p style="margin:0px;font-size:0px;"><img style="max-width: 100%;" width="100%" src="'+img_list[i].url+'" alt=""></p>';
            }
                html+='<p></p>';
            // console.log('添加到编译器中',html)
            if(this.editor){
                setTimeout(x=>{
                    // this.editor.execCommand('insertHtml', html)
                    // this.editor.setContent(html, true);
                    this.editor.setContent(html);
                    // setContent
                },1000)
            }
        }
        
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
        this.editor.destroy();	//销毁
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        
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


.box_1 .mui-table-view-cell:after{
    right: 15px;
}
.box_1{
    margin: 3px 0px 3px 0px;
    color: rgba(80, 80, 80, 1);
    font-size: 14px;
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
        >span:nth-child(1){
            flex-shrink: 0;
            width: 90px;
        }
        >span.title_2:nth-child(1){
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
        >div{
            width: 90px;
            flex-shrink: 0;
            text-align: right;
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
    z-index: 1000;
}




</style>


