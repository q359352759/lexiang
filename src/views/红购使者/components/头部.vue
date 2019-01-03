<template>
    <div class="容器">
        <ul class="头部">
            <li class="头像"><img src="image/WechatIMG311.png" alt=""></li>
            <li class="内容">
                <div class="name">
                    <span>张忠祥</span>
                    <i class="icon iconfont icon-31erweima"></i>
                </div>
                <div class="地区">四川省/成都市/武侯区四川省地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'',
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.容器{
    margin: 0px 0px 4px 0px;
}
.头部{
    display: flex;
    background: #ffffff;
    padding: 10px 12px;
    .头像{
        width: 44px;
        height: 44px;
        margin: 0px 7px 0px 0px;
        flex-shrink: 0;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .内容{
        width: 0;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name{
            display: flex;
            align-items: center;
            span{
                color: rgba(80, 80, 80, 1);
                font-size: 14px;
                font-weight: bold;
                margin:0px 13px 0px 0px;
            }
            i{
                color: #747870;
                font-size: 18px;
                height: 18px;
            }
        }
        .地区{
            color: rgba(128, 128, 128, 1);
        	font-size: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>

