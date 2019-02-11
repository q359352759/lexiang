<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">发布招募信息</h1>
            <span @click="$router.push('/myshop/fenxiao/yulan')">预览</span>
        </header>
        <div class="mui-content mui-fullscreen" >

            <div class="列表1">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="$router.push('/myshop?back=1')">
                            <div class="标题">
                                店铺信息：
                            </div>
                            <input type="text" placeholder="管理店铺信息" readonly />
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="$router.push('/commodity?back=1')">
                            <div class="标题">
                                商品列表：
                            </div>
                            <input type="text" placeholder="管理商品" readonly />
                        </a>
                    </li>
                </ul>
            </div>

            <ul class="列表2">
                <li>
                    <div class="标题">业务选项：(选择你的业务类型，最多5个）</div>
                    <ul class="类型显示">
                        <li class="类型列表">
                            <div v-for="(item, index) in 新cbonum" :key="index">
                                <div class="名称">{{item.信息.cbotype}}</div>
                                <span @click="删除选择的分类(item)" class="删除"><i class="icon iconfont icon-quxiao"></i></span>
                            </div>
                            <div v-for="(item, index) in 自定义业务" :key="'a'+index">
                                <div class="名称">{{item.name}}</div>
                                <span @click="删除自定义业务_1(item.id)" class="删除"><i class="icon iconfont icon-quxiao"></i></span>
                            </div>
                        </li>
                        <li class="添加类型" @click="选择类型()"><i class="cion iconfont icon-plus-add"></i></li>
                    </ul>
                </li>
                <li>
                    <div class="标题">招募宣传语：(一句话说明你的优势)</div>
                    <input class="input_1" v-model="招募信息.tagline" type="text" placeholder="请输入"/> 
                </li>
                <li>
                    <div class="标题">分销员职责：</div>
                    <input class="input_1" v-model="招募信息.position" type="text" placeholder="请输入">
                </li>
                <li>
                    <div class="标题">分销员申请要求：</div>
                    <ul class="要求列表">
                        <li>
                            <div class="item" @click="选择要求('hasexperience',0)">
                                <i class="icon iconfont" :class="{'icon-xuanze2':招募信息.hasexperience==0,'icon-choose':招募信息.hasexperience==1}"></i>
                                <span>无需从业经验</span>
                            </div>
                            <div class="item" @click="选择要求('hasexperience',1)">
                                <i class="icon iconfont" :class="{'icon-xuanze2':招募信息.hasexperience==1,'icon-choose':招募信息.hasexperience==0}"></i>
                                <span>有从业经验</span>
                            </div>
                        </li>
                        <li>
                            <div class="item" @click="选择要求('sex',0)">
                                <i class="icon iconfont" :class="{'icon-xuanze2':招募信息.sex==0,'icon-choose':招募信息.sex!=0}"></i>
                                <span>性别不限</span>
                            </div>
                            <div class="item" @click="选择要求('sex',1)">
                                <i class="icon iconfont" :class="{'icon-xuanze2':招募信息.sex==1,'icon-choose':招募信息.sex!=1}"></i>
                                <span>男</span>
                            </div>
                            <div class="item" @click="选择要求('sex',2)">
                                <i class="icon iconfont" :class="{'icon-xuanze2':招募信息.sex==2,'icon-choose':招募信息.sex!=2}"></i>
                                <span>女</span>
                            </div>
                        </li>
                        <li>
                            <div class="标题_1">年龄：</div>
                            <input type="text" v-model="招募信息.minage" placeholder="最小年龄" />
                            <div class="横线"></div>
                            <input type="text" v-model="招募信息.maxage" placeholder="最大年龄">
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="列表1 列表3">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell item">
                        <!-- <a class="mui-navigate-right item" @click="$router.push('/myshop/fenxiao/xuanzeQuyu')"> -->
                            <div class="标题">
                                招募区域：
                            </div>
                            <div class="文本1">{{招募信息.regionalscope}}</div>
                            <div class="提示1">(申请通过后可扩大范围)</div>
                            <!-- <input type="text" placeholder="本市" readonly /> -->
                        <!-- </a> -->
                    </li>
                    <li class="mui-table-view-cell item">
                        <div class="标题">
                            招募人数：
                        </div>
                        <input type="text" v-model="招募信息.allrecruitment" placeholder="请输入人数" />
                        <div class="单位">人</div>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item">
                            <div class="标题">
                                联系电话：
                            </div>
                            <input type="text" v-model="招募信息.phone" placeholder="请输入手机号码" />
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item">
                            <div class="标题">
                                招募微信：
                            </div>
                            <input type="text" v-model="招募信息.wechat" placeholder="请输入微信号" />
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item">
                            <div class="标题">
                                背景音乐：
                            </div>
                            <input type="text" v-model="招募信息.bgm" placeholder="请选择" readonly />
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item">
                            <div class="标题">
                                语音介绍：
                            </div>
                            <input type="text" placeholder="上传录制好的语音" readonly />
                        </a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right item" @click="$router.push('/myshop/fenxiao/bianjiye')">
                            <div class="标题">
                                宣传页编辑：
                            </div>
                            <input v-show="!招募信息.leaflets" type="text" placeholder="请编辑" readonly />
                            <input v-show="招募信息.leaflets" type="text" value="已编辑" readonly />
                        </a>
                    </li>
                    <li class="mui-table-view-cell item" style="padding-top:0px;padding-bottom:0px;height:44px;">
                        <div class="标题">
                            佣金：
                        </div>
                        <div class="佣金">
                            <input type="text" v-model="招募信息.mincommissionscale" />
                            <span>%</span>
                        </div>
                        <div class="问号"><i class="icon iconfont icon-help"></i></div>
                    </li>
                    
                </ul>
            </div>
            <div class="按钮">
                <btn @click.native="提交()" value="提交审核"/>
            </div>
        </div>

        <div @click="自定义业务添加按钮()" v-show="显示自定义按钮" class="按钮2">+自定义业务</div>
        <div class="自定义业务" v-show="显示自定义添加">
            <div class="mask" @click="显示自定义添加=false"></div>
            <div class="内容">
                <div class="标题">自定义业务</div>
                <div class="input_1">
                    <input type="text" v-model="自定义内容" placeholder="请输入自定义名称">
                </div>
                <div class="确定按钮"><span @click="添加自定义()">添加</span></div>
            </div>
        </div>

        <div class="获取信息失败" v-show="获取招募信息==2">
            <span>网络异常</span>
        </div>
        <div class="申请审核中" v-show="获取招募信息==1">
            <i class="icon iconfont icon-tupian1"></i>
            <div>您已提交资料，正在审核中，请耐心等待</div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/button.vue';
import { get_url , openloading} from "@/assets/js/currency.js";
import { mapGetters , mapActions, mapMutations } from "vuex";
export default {
    name:'',
    components:{
        btn
    },
    data () {
        return {
            Picker3:null,
            显示自定义按钮:false,
            显示自定义添加:false,
            自定义内容:'',
        }
    },
    computed: {
        ...mapGetters({
            店铺:'get_myshop',
            获取招募信息:"myshops/分销/获取招募信息",
            招募信息:'myshops/分销/招募信息',
            zhaomuxinxi:'myshops/分销/招募信息',
            分销类型:'myshops/分销/分销类型',
            自定义业务:'myshops/分销/自定义业务'
        }),
        新cbonum(){
            var list=this.招募信息.cbonum ? this.招募信息.cbonum.split(',') : [];
            var newlist=[]
            list.forEach(x=>{
                var r=get_url(this.分销类型,x)
                var obj={
                        id:x,
                        信息:r[r.length-1]
                    }
                newlist.push(obj);
            })
            return newlist
        },
        新分销类型(){
            var list=JSON.parse(JSON.stringify(this.分销类型));
            list.forEach(item => {
                item.text=item.cbotype;
                if(item.children.length>0){
                    item.children=[{'cbotype':'全部','id':item.id,children:[]},...item.children]
                }
                item.children.forEach(item_1=>{
                    item_1.text=item_1.cbotype;
                    if(item_1.children.length>0){
                        item_1.children=[{'cbotype':'全部','id':item_1.id,children:[]},...item_1.children];
                    }
                    item_1.children.forEach(item_2=>{
                        item_2.text=item_2.cbotype
                    })
                })
            });
            return list
        }
    },
    methods: {
        ...mapMutations({
            修改招募信息:'myshops/分销/修改招募信息'
        }),
        ...mapActions({
            查询分销类型:'myshops/分销/查询分销类型',
            查询店铺:'getMyshop',
            查询店铺招募信息:'myshops/分销/查询店铺招募信息',
            添加自定义业务:'myshops/分销/添加自定义业务',
            删除自定义业务:'myshops/分销/删除自定义业务',
            查询自定义业务:'myshops/分销/查询自定义业务',
            添加招募信息:'myshops/分销/添加招募信息'
        }),
        提交(){
            var this_1=this;
            var zhengshu_test = /^[1-9]+[0-9]*]*$/; //整数
            var phone_test = /^1(3|4|5|7|8)\d{9}$/;
            var zuoji_test = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
            if(this.新cbonum.length==0 && this.自定义业务.length==0){
                mui.toast("请设置业务选项", { duration: "long", type: "div" });                
                return;
            }else if(!this.招募信息.tagline){
                mui.toast('请填写招募宣传语',{ duration: "long", type: "div" })
                return;
            }else if(!this.招募信息.position){
                mui.toast('请填写职责',{ duration: "long", type: "div" })
                return;
            }else if(!this.招募信息.minage || this.招募信息.minage<18 || !zhengshu_test.test(this.招募信息.minage)){
                mui.toast('招募最小年龄为18岁。',{ duration: "long", type: "div" })
                return
            }else  if(!this.招募信息.maxage || this.招募信息.maxage>65 || !zhengshu_test.test(this.招募信息.minage)){
                mui.toast('招募最大年龄为65岁。',{ duration: "long", type: "div" })
                return
            }else if(this.招募信息.minage>this.招募信息.maxage){
                mui.toast('招募年龄填写有误',{ duration: "long", type: "div" })
                return
            }else if(!this.招募信息.allrecruitment || this.招募信息.allrecruitment<1 || !zhengshu_test.test(this.招募信息.allrecruitment)){
                mui.toast('招募人数有误',{ duration: "long", type: "div" })
                return
            }else if(!phone_test.test(this.招募信息.phone) && !zuoji_test.test(this.招募信息.phone)){
                mui.toast('电话号码有误',{ duration: "long", type: "div" })
                return
            }else if(!this.招募信息.wechat){
                mui.toast('请填写微信号',{ duration: "long", type: "div" })
                return
            }else if(!this.招募信息.leaflets){
                mui.toast('请编辑宣传页',{ duration: "long", type: "div" })
                return
            }else if(!this.招募信息.mincommissionscale || !zhengshu_test.test(this.招募信息.mincommissionscale) || this.招募信息.mincommissionscale<1 || this.招募信息.mincommissionscale>100){
                mui.toast('分佣比例须为1-100整数',{ duration: "long", type: "div" })
                return                
            }
            console.log('可以提交');
            this.招募信息.recruitment=this.招募信息.allrecruitment;
            this.招募信息.needrecruitment=this.招募信息.needrecruitment ? this.招募信息.needrecruitment : this.招募信息.allrecruitment;
            this.招募信息.nowrecruitment=this.招募信息.nowrecruitment ? this.招募信息.nowrecruitment : 0;
            if(this.招募信息.regionalscope=='本市'){
                this.招募信息.createtime="";      //招募开始时间
                this.招募信息.overtime="";       //招募结束时间
            }
            openloading(true)
            this.添加招募信息().then(x=>{
                if(x.data.code==200){
                    mui.alert("提交成功，等待审核。","提示",function () {
                        this_1.$router.push('/myshop')
                    },"div");
                }else{
                    mui.toast(x.data.msg ? x.data.msg : x.data.message,{ duration: "long", type: "div" })
                }
                openloading(false)
            }).catch(err=>{
                mui.toast('系统错误，稍后再试。',{ duration: "long", type: "div" })
                openloading(false)
            })
        },
        选择要求(key,type){
            this.招募信息[key]=type;
        },
        选择类型(){
            var length=this.新cbonum.length+this.自定义业务.length
            if(length>=5){
                mui.toast("最多添加5个", { duration: "long", type: "div" });                
                return
            }
            this.显示自定义按钮=true
            this.Picker3 = new mui.PopPicker({layer: 3});            
            this.Picker3.setData(this.新分销类型);
            this.Picker3.show(x=>{
                var 最后id=''
                if(x[2] && x[2].id){
                    最后id=x[2].id
                }else if(x[1] && x[1].id){
                    最后id=x[1].id
                }else{
                    最后id=x[0].id
                }
                var 选择的类型=this.招募信息.cbonum ? this.招募信息.cbonum.split(',') : [];
                var 是否选择=选择的类型.find(id=>id==最后id);
                if(!是否选择){
                    选择的类型.push(最后id)
                }
                this.招募信息.cbonum=选择的类型.join(',');
                this.Picker3.dispose();
                this.Picker3 = null;
                this.显示自定义按钮=false;
            })
        },
        自定义业务添加按钮(){
            this.显示自定义按钮=false;
            this.Picker3.dispose();
            this.显示自定义添加=true
        },
        添加自定义(){
            if(this.自定义内容){
                var obj={
                        id:"",
                        shopid:this.店铺.shopid,
                        name:this.自定义内容,
                    }
                openloading(true)
                this.添加自定义业务(obj).then(x=>{
                    if(x.data.code==200){
                        this.查询自定义业务();
                    }else if(x.data.msg || x.data.message){
                        mui.alert(x.data.msg ? x.data.msg : x.data.message, "提示", "我知道了", function () { }, "div");
                    }else{
                        mui.alert(x.data.error_description ? x.data.error_description : '未知错误', "提示", "我知道了", function () { }, "div");
                    }
                    openloading(false)
                }).catch(err=>{
                    openloading(false)
                    mui.toast("系统错误，稍后再试。", { duration: "long", type: "div" });
                })
            }
            this.显示自定义添加=false
        },
        删除选择的分类(item){
            console.log(item);
            var id=item.id;
            var cbonum=this.招募信息.cbonum.split(',');
            var list=cbonum.filter(x=>x!=id);
            console.log(list);
            this.招募信息.cbonum=list.join(',')
        },
        删除自定义业务_1(id){
            openloading(true)
            this.删除自定义业务(id).then(x=>{
                this.查询自定义业务();
                openloading(false)
            }).catch(err=>{
                openloading(false)
            })
        },
        async 初始化(){
            openloading(true)
            if(!this.店铺 || !this.店铺.shopid){
                await this.查询店铺()
            }
            this.招募信息.shopid=this.店铺.shopid;
            Promise.all([this.查询分销类型(),this.查询自定义业务(),this.查询店铺招募信息()]).then(x=>{
                openloading(false)
            }).catch(err=>{
                openloading(false)
            });
        }
    },
    mounted() {
        this.初始化()
        
    },
    watch: {
        zhaomuxinxi:{
            deep:true,
            handler(newName, oldName) {
                // console.log(this.招募信息)
                this.修改招募信息()   
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-bar{
    span{
        color: rgba(255, 255, 255, 1);
    	font-size: 14px;
        position: absolute;
        top: 0px;
        right: 10px;
        line-height: 44px;
    }
}
.列表1{
    .item{
        display: flex;
        align-items: center;
        .标题{
            font-size: 14px;
            color: rgba(80, 80, 80, 1);
            width: 90px;
            flex-shrink: 0;
        }
        .文本1{
            font-size: 14px;
            color: rgba(80, 80, 80, 1);
        }
        .提示1{
            color: rgba(166, 166, 166, 1);
            font-size: 12px;
            margin: 0px 0px 0px 5px;
        }
        .佣金{
            flex-grow: 1;
            input{
                width: 94px;
                height: 30px;
                background-color: rgba(229, 229, 229, 1);
                text-align: center;
                border-radius: 0px;
                margin: 0px 4px 0px 0px;
            }
        }
        .问号{
            font-size: 24px;
            color: #1894dc;
        }
        .单位{
            font-size: 14px;
            color: rgba(80, 80, 80, 1);
            flex-shrink: 0;
        }
        input{
            margin: 0px ;
            padding: 0px;
            height: auto;
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
            border: none;
        }
        input::-webkit-input-placeholder{
            color: rgba(166, 166, 166, 1);
        }
    }
}

.列表2{
    margin: 3px 0px 0px;
    background: #ffffff;
    padding: 0px 15px;
    .标题{
        color: rgba(56, 56, 56, 1);
        font-size: 12px;
        padding: 7px 0px 2px;
    }
    .类型显示{
        min-height: 31px;
        position: relative;
        background: #f6f6f6;
        padding: 0px 31px 0px 0px;
        .类型列表{
            flex-grow: 1;
            display: flex;
            flex-wrap: wrap;
            >div{
                background: #ffffff;
                border: 1px solid #cccccc;
                margin: 4px 0px 4px 5px;
                height: 23px;
                min-width: 65px;
                display: flex;
                font-size: 12px;
                color: rgba(80, 80, 80, 1);
                align-items: center;
                padding: 0px 2px;
                .名称{
                    flex-grow: 1;
                }
            }
        }
        .添加类型{
            position: absolute;
            top: 0px;
            right: 0px;
            flex-shrink: 0;
            height: 100%;
            color: #007aff;
            display: flex;
            width: 33px;
            background: #ffffff;
            border:1px solid #f6f6f6;
            justify-content: center;
            align-items: center;
        }
    }
    .input_1{
    	background-color: rgba(246, 246, 246, 1);
	    font-size: 12px;
        height: 31px;
        padding: 0px 10px;
        margin: 0px;
        border: none;
    }
    .要求列表{
        padding: 1px 42px 1px 52px;
        >li{
            display: flex;
            justify-content: space-between;
            color: rgba(80, 80, 80, 1);
            font-size: 14px;
            align-items: center;
            margin:13px 0px 10px;
        }
        .item{
            display: flex;
            align-items: center;
        }
        input{
        	height: 21px;
            background-color: rgba(229, 229, 229, 1);
        	font-size: 11px;
            text-align: center;
            margin: 0px;
            border: none;
            border-radius: 0px;
        }
        .标题_1{
            white-space: nowrap;
        }
        .横线{
            width: 27px;
            height: 1px;
            background: #999999;
            margin: 0px 12px;
            flex-shrink: 0;
        }
        .icon-xuanze2{
            margin: 0px 6px 0px 0px;
            color: #2cacec;
            font-size: 16px;
        }
        .icon-choose{
            font-size: 16px;
            margin: 0px 6px 0px 0px;
        }

    }
}

.列表3{
    margin: 3px 0px 0px;
}
.按钮{
    margin: 40px 0px 50px;
}
.按钮2{
    width: 100%;
    height: 38px;
    text-align: center;
    line-height: 38px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(246, 246, 246, 1);
    font-size: 14px;
    position: fixed;
    left: 0px;
    bottom: 0px;   
    z-index: 1001;
}

.自定义业务{
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0px;
    left:0px;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
    }
    .内容{
        position: relative;
        z-index: 1;
        width: 270px;
        background: #ffffff;
        border-radius: 15px;
        text-align: center;
        .标题{
            padding: 10px;
            font-weight: bold;
            font-size: 14px;
        }
        .input_1{
            padding: 0px 15px;
            input{
                height: 31px;
                // background-color: rgba(246, 246, 246, 1);
                background: #F6F6F6 ;
                padding: 0px 10px;
                margin: 0px;
                font-size: 14px;
                border: none;
            }
        }
        .确定按钮{
            padding: 10px 0px;
            font-size: 14px;
            color: rgba(44, 172, 236, 1);
        }
    }
}

.获取信息失败{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.申请审核中{
    position: fixed;
    background: #ffffff;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    padding: 123px 0px 0px;
    text-align: center;
    i{
        font-size: 128px;
        color: rgba(248, 204, 132, 1);
    }
    div{
        color: rgba(80, 80, 80, 1);
    	font-size: 14px;
    }
}
</style>
