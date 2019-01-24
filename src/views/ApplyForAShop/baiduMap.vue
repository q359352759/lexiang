<template>
    <div id="baiduMap">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">百度地图</h1>
            <span class="quding" @click="quding()">确定</span>
        </header>
        <div class="mui-content mui-fullscreen">
            <div id="container" ref="container">

            </div>
            <ul class="xiangqing">
                <li>
                    <span>
                        经度：{{longitude}}
                    </span>
                </li>
                <li>
                    <span>
                        纬度：{{latitude}}
                    </span>
                </li>
                <li>
                    <span>
                        地址：{{address}}
                    </span>
                </li>
            </ul>
            <div class=""></div>
            <!-- <button @click="openLocation()">打开微信内置地图导航</button> -->
        </div>
    </div>
</template>

<script>
import { openloading } from "@/assets/js/currency.js";
import { mapGetters , mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            longitude: "", //经度
            latitude: "",
            address: ""
        };
    },
    computed: {
        ...mapGetters({
            当前位置:'当前位置'
        })
    },
    methods: {
        ...mapActions({
            获取位置:'获取位置/获取位置',
        }),
        quding() {
            this.$store.state.geographical_position.latitude = this.latitude;
            this.$store.state.geographical_position.longitude = this.longitude;
            this.$store.state.geographical_position.address = this.address;
            history.back();
        },
        async 初始化(){
            var this_1=this;
            if(!this.当前位置 || this.当前位置.x=='' || this.当前位置.y==''){
                await this.获取位置()
            }
                    this.longitude =this.当前位置.x     //104.06792346
                    this.latitude = this.当前位置.y;

                    var map = new BMap.Map(this.$refs.container);
                    map.centerAndZoom(new BMap.Point(this.当前位置.x, this.当前位置.y), 20);
                    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

                    openloading(false);
                    //逆地址解析
                    var geoc = new BMap.Geocoder();
                    var point = new BMap.Point(this.当前位置.x, this.当前位置.y);
                    geoc.getLocation(point, function (rs) {
                        var addComp = rs.addressComponents;
                        // this_1.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                        this_1.address = addComp.district + addComp.street + addComp.streetNumber;
                        console.log(addComp);
                    });

                    var m_height = (map.getSize().height - 24) / 2;
                    var m_width = (map.getSize().width - 19) / 2;
                    function ZoomControl() {
                        // 默认停靠位置和偏移量
                        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                        this.defaultOffset = new BMap.Size(m_width, m_height);
                    }
                    ZoomControl.prototype = new BMap.Control();
                    ZoomControl.prototype.initialize = function (map) {
                        // 创建一个DOM元素
                        var div = document.createElement("div");
                        //div.innerHTML='aaaa';
                        // 添加文字说明
                        // 设置样式
                        div.style.width = "20px";
                        div.style.height = "30px";
                        div.style.cursor = "pointer";
                        div.style.backgroundImage = "url('image/dingwei.png')";
                        div.style.backgroundPosition = "center";
                        div.style.backgroundSize = "cover";
                        // div.style.backgroundColor="red"
                        // 添加DOM元素到地图中
                        map.getContainer().appendChild(div);
                        return div;
                    };
                    // 创建控件
                    var myZoomCtrl = new ZoomControl();
                    // 添加到地图当中
                    map.addControl(myZoomCtrl);

                    map.addEventListener("touchend", function () {
                        var p = map.getCenter();
                        console.log(p);
                        this_1.longitude = p.lng;
                        this_1.latitude = p.lat;
                        geoc.getLocation(p, function (rs) {
                            var addComp = rs.addressComponents;
                            this_1.address = addComp.district + addComp.street + addComp.streetNumber;
                        });
                    });
        }
    },
    beforeCreate: function () {
        // console.group('------beforeCreate创建前状态------');
    },
    created: function () {
        // console.group('------created创建完毕状态------');
    },
    beforeMount: function () {
        // console.group('------beforeMount挂载前状态------');
    },
    mounted: function () {
        var this_1 = this;
        this.初始化()
       
    },
    activated() {
        console.log(11111111);
    },
    beforeUpdate: function () {
        // console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
        // console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
        // console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
        // document.querySelector(".mui-slider_1").removeEventListener("slide", function() {});
        // console.group('destroyed 销毁完成状态===============》');
    },
    watch: {
        // img_list() {
        //     this.$nextTick(function() {
        //         console.log("数据渲染完成");
        //         this.getswiper();
        //     });
        // }
    }
};
</script>

<style lang="scss" scoped>
.quding {
    position: absolute;
    top: 0px;
    right: 10px;
    line-height: 44px;
    color: #ffffff;
    font-size: 16px;
}
#container {
    height: 100%;
}
.xiangqing {
    position: absolute;
    top: 55px;
    left: 10px;
    font-size: 0.12rem;
    li {
        margin: 3px 0px;
        span {
            display: inline-block;
            background: rgba(0, 0, 0, 0.3);
            padding: 2px;
        }
    }
}
</style>
