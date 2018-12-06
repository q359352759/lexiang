<template>
    <div>
        
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红包</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <ul class="box_1">
                <li class="header_1" @tap="RedPacketReleaseRecord(0)">
                    <div>
                        <span class="title_1">店铺新人红包</span>
                        <span class="text_1">共发放：0元</span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：0元</td>
                                <td style="width:10px">已使用：0元</td>
                            </tr>
                            <tr>
                                <td>已失效：0元</td>
                                <td><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(1)">
                    <div>
                        <span class="title_1">商品红包</span>
                        <span class="text_1">共发放：0元</span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：0元</td>
                                <td style="width:10px">已使用：0元</td>
                            </tr>
                            <tr>
                                <td>已失效：0元</td>
                                <td><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(2)">
                    <div>
                        <span class="title_1">节日红包</span>
                        <span class="text_1">共发放：0元</span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：1540元</td>
                                <td style="width:10px">已使用：0元</td>
                            </tr>
                            <tr>
                                <td>已失效：0元</td>
                                <td><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(3)">
                    <div>
                        <span class="title_1">签到红包</span>
                        <span class="text_1">共发放：0元</span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：0元</td>
                                <td style="width:10px">已使用：0元</td>
                            </tr>
                            <tr>
                                <td>已失效：0元</td>
                                <td><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(4)">
                    <div>
                        <span class="title_1">庆典红包</span>
                        <span class="text_1">共发放：0元</span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：0元</td>
                                <td style="width:10px">已使用：0元</td>
                            </tr>
                            <tr>
                                <td>已失效：0元</td>
                                <td><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

            <ul class="box_1">
                <li class="header_1"  @tap="RedPacketReleaseRecord(5)">
                    <div>
                        <span class="title_1">生日红包</span>
                        <span class="text_1">共发放：0元</span>
                    </div>
                    <i class="mui-icon mui-icon-forward"></i>
                </li>
                <li class="table_box">
                    <table>
                        <tbody>
                            <tr>
                                <td>已领取：0元</td>
                                <td style="width:10px">已使用：0元</td>
                            </tr>
                            <tr>
                                <td>已失效：0元</td>
                                <td><span class="text_1">促销额：0元</span></td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>

        </div>

        <div class="btn_1" @tap="RedEnvelopeIssue()">发红包</div>
    </div>
</template>

<script>
export default {
    name:'',
    data(){
        return{

        }
    },
    methods:{
        RedPacketReleaseRecord(x){
            this.$router.push('/RedPacketReleaseRecord?type='+x);
        },
        RedEnvelopeIssue(){
            this.$router.push('/RedEnvelopeIssue')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/config.scss";

.mui-content{
    padding-bottom:44px; 
}
.box_1{
    margin: 3px 0px 0px;
    padding: 0px 12px;
    background: #ffffff;
    .header_1{   
        border-bottom: 1px solid #efeff4;
        padding: 7px 0px;
        display: flex;
        align-items: center;
        >div:nth-child(1){
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .title_1{
            color: rgba(56, 56, 56, 1);
            font-size: 12px;
            font-weight: bold;
        }
        .text_1{
            color: rgba(0, 122, 255, 1);
        	font-size: 12px;
        }
        i{
            color: #c0bcbc;
            font-size: 16px;
        }
    }
    .table_box{
        padding: 0px 20px 13px;
        color: rgba(56, 56, 56, 1);
        font-size: 12px;
        .text_1{
            color: #d43030;
        }
    }
    table{
        width: 100%;
        white-space: nowrap;
        td{
            padding: 13px 0px 0px;
        }
    }
}

.btn_1{
    width: 100%;
    height: 40px;
    background: $header_background;
    position: fixed;
    left: 0px;
    bottom: 0px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #ffffff;
}
</style>


