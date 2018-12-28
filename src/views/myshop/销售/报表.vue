<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">报表</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="box_1">
                <li @click="select_type(0)" :class="{'active':type_1==0}">日报</li>
                <li @click="select_type(1)" :class="{'active':type_1==1}">月报</li>
                <li @click="select_type(2)" :class="{'active':type_1==2}">年报</li>
            </ul>
            <ve-line :xAxis="option.xAxis" :yAxis="option.yAxis" :dataZoom="option.dataZoom" :series="option.series"/>
            <!-- <ve-chart /> -->
        </div>
    </div>
</template>

<script>

export default {
    name:'',
    components: {
    },
    data () {
        return {
            //========================
            type_1:0,

            canvasId: 'myCanvas',
            type: 'bar',
            data: [
                {name: '2014', value: 1342},
                {name: '2015', value: 2123},
                {name: '2016', value: 1654},
                {name: '2017', value: 1795},
            ],
            option: {},
        }
    },
    methods: {
        select_type(x){
            this.type_1=x;
            //====================
                var date = [];
                var data=[];
                for (var i = 1; i < 30; i++) {
                    date.push(i+'日');
                    // data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
                    data.push(Math.floor(Math.random()*(1 - 10000) + 10000))
                }
                var option = {
                    xAxis: {
                        data: date  //轴的数据
                    },
                    yAxis: {
                        type: 'value',      //也可以写 data::[......]
                        boundaryGap: [0, '10%']
                    },
                    dataZoom: [{
                            type: 'inside',
                            start: 0,
                            end: 100/6
                        }
                    ],
                    series: [
                        {
                            coordinateSystem:'cartesian2d',
                            symbolSize:10,   //标记的大小
                            name:'模拟数据',
                            type:'line',
                            symbol: 'circle', //默认 emptyCircle  'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                            itemStyle: {
                                color: '#2a82e4'
                            },
                            data: data,
                             smooth:false
                        } 
                    ]
                };
                console.log(option)
            this.option=option
        }
    },
    mounted() {
        this.select_type(0);
    },
}
</script>

<style lang="scss" scoped>
.wrapper{
	height: 5rem;
}
.mui-content{
    background: #ffffff;
}
.box_1{
    margin: 12px;
    border: 1px solid #007aff;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    display: flex;
    text-align: center;
    overflow: hidden;
    li{
        width: calc(100% / 3);
        color: rgba(0, 122, 255, 1);
    	font-size: 12px;
        border-left: 1px solid #007aff;
    }
    li:nth-child(1){
        border: none;
    }
    .active{
        color: #ffffff;
        background: #007aff;
    }
}
</style>


