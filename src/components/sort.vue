<template>
    <ul class="sort">
        <li v-for="(item, index) in list_1" :key="index" @click="set_type(item)">
            <div>{{item.name}}</div>
            <div class="img_box">
                <!-- 未选择 -->
                <img src="image/paixun.png" v-show="type_1!=item.type" alt="" srcset="">
                <!-- 降序 -->
                <img src="image/paixuxia.png" v-show="type_1==item.type && sort_type_1==1" alt="" srcset="">
                <!-- 升序 -->
                <img src="image/paixushang.png" v-show="type_1==item.type && sort_type_1==2" alt="" srcset="">
            </div>
        </li>
        <!-- <li>
            <div>业绩</div>
            <div>
                <img src="image/paixun.png" alt="" srcset="">
                <img src="image/paixuxia.png" alt="" srcset="">
                <img src="image/paixushang.png" alt="" srcset="">
            </div>
        </li> -->
    </ul>
</template>

<script>
export default {
    name: "sort",
    props: {
        //下面3个参数最好是都传递
        type: {
            default: ""
        },
        sortType: {
            default: ""
        },
        list: {
            default: []
        }
    },
    data() {
        return {
            type_1: this.type,
            sort_type_1: this.sortType,
            list_1: this.list
        };
    },
    methods: {
        set_type(x) {
            // console.log(x);
            if (this.type_1 == x.type) {
                this.sort_type_1 = this.sort_type_1 == 1 ? 2 : 1;
            } else {
                this.sort_type_1 = 1;
            }
            this.type_1 = x.type;
            let obj = {
                type: this.type_1,
                sort_type: this.sort_type_1
            };
            this.$emit("setSort", obj);
        }
    }
};
</script>

<style lang="scss" scoped>
.sort {
    display: flex;
    flex-wrap: wrap;
    color: rgba(80, 80, 80, 1);
    font-size: 12px;
    > li {
        display: flex;
        align-items: center;
        height: 26px;
        justify-content: center;
        margin: 0px 15px 0px 0px;
        .img_box {
            font-size: 0px;
            margin: 0px 0px 0px 3px;
        }
        img {
            width: 16px;
            height: 16px;
        }
    }
}
</style>
