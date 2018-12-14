<template>
    <div class="introduction">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">店铺简介</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div id="editor_1" ref="editor"></div>
            <!-- <video width="100%" controls>
                <source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">
                <source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/ogg">
            </video> -->
            
            <div class="box_2" v-show="video_show">
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

            <Album v-if="Album_show" :size="size" :seetype="seetype" :type="seetype" v-on:setlist="reslist"/>
        </div>
        <div @tap="submit()" class="btn_1">保&nbsp;存</div>
    </div>
</template>

<script>
import Album from '@/components/Album.vue';
export default {
    name:'',
    components:{
        Album
    },
    data(){
        return{
            get_index:0,
            seetype:5,             //1店招  2环境 3商品 4描述 5其他    
            Album_show:false,
            video_show:false,
            size:10,
            video_url:'',
            synopsis:{           //简介
                id:'',
                shopid:'',
                state:0,
                remark:''
            },               
            config:{					//编译器配置
                initialFrameWidth: null,
                initialFrameHeight: 300,
                minFrameHeight:300,             //编辑器拖动时最小高度，默认220
                autoHeightEnabled:true,         //是否自动长高，默认true
                // scaleEnabled:false,             //是否可以拉伸长高，默认true(当开启时，自动长高失效)
                elementPathEnabled:false,       //是否显示路径
                wordCount:false,                //是否开启字数统计  
                imageScaleEnabled:false,        //启用图片拉伸缩放
                imagePopup:false,               //图片操作的浮层开关，默认打开
                // topOffset:100,
                autoFloatEnabled :false, //是否保持toolbar的位置不动，默认true
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
                        // 'spechars', //特殊字符
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
                        // 'fullscreen', //全屏
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
        }
    },
    computed:{
        myshop(){
            return this.$store.state.myshop
        }
    },
    methods:{
        //选择图片返回值
        reslist(list){
            console.log('取得参数',list);
            if(list.length>0){
               
                var html='';
                for(var i=0;i<list.length;i++){
                    html+='<p style="margin:0px;font-size:0px;"><img style="max-width: 100%;" width="100%" src="'+list[i].url+'" alt=""></p><p></p>';
                }
                 console.log(html)
                // this.editor.setContent(html);
                this.editor.execCommand('insertHtml', html)
            }
        },
        //选择图片
        set_Album_show(){
            this.Album_show=true;
        },
        //确定视频
        queding(){
            if(!this.video_url){
                mui.toast('请输入视频链接。', {duration: "long",type: "div"});
            }else{
                var html='<video width="100%" controls src="'+this.video_url+'">'+
                            '<source src="'+this.video_url+'" type="video/mp4">'+
                            '<source src="'+this.video_url+'" type="video/ogg">'+
                        '</video>'
                this.editor.execCommand('insertHtml', html);
                this.video_url='';
                history.back();
            }
        },
        //关闭视频输入框
        close_1(){
            history.back();
        },
        submit(){
            this.synopsis.remark=this.editor.getContent();
            this.synopsis.shopid=this.myshop.shopid;
            if(this.synopsis.id){
                this.update()
            }else{
                this.add()
            }
        },
        update(){
            this.$axios({
                method:'post',
                url:'/api-s/shops/synopsis/update',
                data:this.synopsis
            }).then(x=>{
                console.log('修改返回值',x);
                if(x.data.code==200){
                    // this.img_list=this.img_list.concat(x.data.data.data);
                    mui.toast('设置成功。', {duration: "long",type: "div"});
                    history.back();
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err);
                mui.toast('系统失败，稍后再试。', {duration: "long",type: "div"});    
            })
        },
        add(){
            this.$axios({
                method:'post',
                url:'/api-s/shops/synopsis/add',
                data:this.synopsis
            }).then(x=>{
                console.log('添加返回值',x);
                if(x.data.code==200){
                    // this.img_list=this.img_list.concat(x.data.data.data);
                    mui.toast('设置成功。', {duration: "long",type: "div"});
                    history.back();
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                console.log(err);
                mui.toast('系统失败，稍后再试。', {duration: "long",type: "div"}); 
            })
        },
        //查询简介接口
        get_synopsis(){
            console.log('获取简介接口')
            this.get_index=1;
            this.$axios({
                method:'get',
                url:'/api-s/shops/synopsis/'+this.myshop.shopid
            }).then(x=>{
                console.log('查询简介',x);
                if(x.data.code==200 && x.data.data){
                    this.synopsis=x.data.data;
                    var this_1=this;
                    function set_editor(){
                        try {
                            this_1.editor.setContent(this_1.synopsis.remark);
                        } catch (error) {
                            setTimeout(()=>{
                                set_editor()
                            },1000)
                        }
                    }
                    set_editor();
                }else{
                    mui.alert(x.data.msg ? x.data.msg : x.data.messag, "提示",'我知道了', function() {},"div");
                }
            }).catch(err=>{
                mui.toast('系统错误，稍后再试。', {duration: "long",type: "div"});
                 console.log('查询简介失败',err);
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
        // console.log(this.myshop);
        var this_1=this;

        this.$store.commit('setMyshop');
        if(this.myshop && this.myshop.id){
            this.get_synopsis()
        }

        var query=this.$route.query;
        if(!query.video_show){
            this.video_show=false;
        }else{
            this.video_show=true;
        }

        //http://www.runoob.com/try/demo_source/movie.mp4
        this.config.initialFrameHeight=this.$refs.editor.offsetHeight;
        // this.config.initialFrameHeight=300;
        
        this.editor = UE.getEditor('editor_1', this.config); // 初始化UM
        UE.registerUI('添加视频',function(editor,uiName){
            //-320px -20px
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName,{
                execCommand:function(){
                    // 1店招  2环境 3商品 4描述 5其他
                    this_1.$router.push('/introduction?video_show=1');
                    // alert('添加视频链接');
                    // var html='<video width="100%" controls src="http://www.runoob.com/try/demo_source/movie.mp4">'+
                    //             '<source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">'+
                    //             '<source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/ogg">'+
                    //         '</video>'
                    // this_1.editor.execCommand('insertHtml', html)
                }
            });
            //创建一个button
            var btn = new UE.ui.Button({
                //按钮的名字
                name:uiName,
                //提示
                title:uiName,
                //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
                cssRules :'background-position: -320px -20px;',
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
        UE.registerUI('上传图片',function(editor,uiName){
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName,{
                execCommand:function(){
                    // alert('添加图片')
                    this_1.$router.push('/introduction?Album_show=1')
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

    },
    activated() {
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
        this.editor.destroy()
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        $route(to,from){
            var query=this.$route.query;
            //选择图片
            if(!query.Album_show){
                this.Album_show=false;
            }else{
                this.Album_show=true;
            }
            //输入视频
            if(!query.video_show){
                this.video_show=false;
            }else{
                this.video_show=true;
            }
        },
        myshop(){
            if(this.myshop && this.myshop.id){               
                if(this.get_index==0){
                    this.get_synopsis();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";
// .introduction{
//     height: 100%;
// }
.mui-content{
    // background: #ffffff;
    // height: 100%;
    padding-bottom: 44px;
}
#editor_1{
    height: 100%;
    overflow: auto;
}
.btn_1{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 44px;
    background: $header_background;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 44px;
    z-index: 1000;
}

.box_2{
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

</style>