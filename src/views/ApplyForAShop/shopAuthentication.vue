<template>
    <div id="AlreadyRealName">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">实名认证</h1>
        </header>
        <div class="mui-content">
            <div class="box_1">已认证</div>
            <ul class="box_2">
                <li>
                    <div>姓名</div>
                    <div>{{Authentication.name}}</div>
                </li>
                <li>
                    <div>性别</div>
                    <div>{{Authentication.sex==0 ? '男' :'女'}}</div>
                </li>
                <li>
                    <div>名族</div>
                    <div>{{Authentication.nation}}</div>
                </li>
                <li>
                    <div>出生</div>
                    <div>{{Authentication.birthday}}</div>
                </li>
                <li>
                    <div>住址</div>
                    <div>{{Authentication.address}}</div>
                </li>
                <li>
                    <div>身份证号</div>
                    <div>{{Authentication.idNumber}}</div>
                </li>
                <li>
                    <div>签发机关</div>
                    <div>{{Authentication.issueArea}}</div>
                </li>
                <li>
                    <div>有效期</div>
                    <div>
                        {{Authentication.validity}}
                    </div>
                </li>
            </ul>

            <ul class="box_3">
                <li>
                    <div>身份证正面：</div>
                    <div class="img_box">
                        <img :src="Authentication.frontImg" alt="" srcset="">
                    </div>
                </li>
                <li>
                    <div>身份证反面：</div>
                    <div class="img_box">
                        <img :src="Authentication.reverseImg" alt="" srcset="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters , mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            Positive_obj: {},
            The_other_side: {},
            userInfo: JSON.parse(localStorage.userInfo),
            Authentication: {
                address: "", //四川省大竹县永胜乡麻柳村8组
                birthday: "", //19870905
                createTime: "", //2018-10-27T12:14:15.000+0000
                frontImg: "", //64618f66fd453163e55451cb2db89f14
                id: "",
                idNumber: "", //513029198709055132
                issueArea: "", //大竹县公安局
                name: "", //孟春成
                nation: "", //汉
                reverseImg: "", //7a1201141e8de5337692459ee0e718c1  反面
                userid: "" //18583034205
            }
        };
    },
    computed: {
        ...mapGetters({
            myshop:'get_myshop'
        }),
    },
    methods: {
        ...mapActions({
            获取店铺:'getMyshop'
        }),
        async 初始化(){
            if(!this.myshop || !this.myshop.shopid){
                await this.获取店铺()
            }
            this.Authentication.address = this.myshop.iaiAddress;
            this.Authentication.birthday = this.myshop.birthday;
            this.Authentication.frontImg = this.myshop.frontImg;
            this.Authentication.idNumber = this.myshop.idNumber;
            this.Authentication.issueArea = this.myshop.issueArea;
            this.Authentication.name = this.myshop.iaiName;
            this.Authentication.nation = this.myshop.nation;
            this.Authentication.reverseImg = this.myshop.reverseImg;
        }
    },
    mounted() {
        this.初始化()
    },
    watch: {
        myshop() {
            var myshop = this.$store.state.myshop;
            this.Authentication.address = myshop.iaiAddress;
            this.Authentication.birthday = myshop.birthday;
            this.Authentication.frontImg = myshop.frontImg;
            this.Authentication.idNumber = myshop.idNumber;
            this.Authentication.issueArea = myshop.issueArea;
            this.Authentication.name = myshop.iaiName;
            this.Authentication.nation = myshop.nation;
            this.Authentication.reverseImg = myshop.reverseImg;
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/config.scss";

#AlreadyRealName {
    height: 100%;
    .mui-content {
        height: 100%;
        // background:#ffffff;
    }
}
#AlreadyRealName .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#AlreadyRealName .mui-title {
    color: #ffffff;
}

#AlreadyRealName .box_1 {
    text-align: center;
    padding: 0.2rem 0px;
}
#AlreadyRealName .box_2 {
    padding: 10px;
    li {
        display: flex;
        align-items: center;
        margin: 0px 0px 0.1rem 0px;
        font-size: 0.14rem;
        min-height: 0.3rem;
        line-height: 0.3rem;
        color: #484848;
        > div:nth-child(1) {
            width: 0.75rem;
            flex-shrink: 0;
        }
        > div:nth-child(2) {
            flex-grow: 1;
            background: #ffffff;
            padding: 0px 0px 0px 5px;
        }
    }
}
#AlreadyRealName .box_3 {
    > li {
        margin: 0px 0px 0.23rem 0px;
        display: flex;
        align-items: center;
        > div:nth-child(1) {
            width: 1.35rem;
            text-align: right;
            padding: 0px 0.36rem 0px 0px;
            font-size: 0.14rem;
            color: #505050;
        }
        > div:nth-child(2) {
            width: 1.9rem;
            height: 1.17rem;
            background: #ffffff;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>
