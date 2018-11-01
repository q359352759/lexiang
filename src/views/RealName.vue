<template>
    <div id="RealName">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">实名认证</h1>
        </header>
    </div>
</template>

<script>
    
</script>

<style lang="scss">
@import '@/assets/css/config.scss';
#RealName #zhengmianInput {
    display: none;
}
#RealName {
    height: 100%;
    .mui-content {
        height: 100%;
        // background:#ffffff;
    }
}
#RealName .mui-bar {
    background: $header_background;
    a {
        color: #ffffff;
    }
}
#RealName .mui-title {
    color: #ffffff;
}
#RealName .swiper-pagination-bullet-active {
    background: $header_background;
}

#RealName .box_1 {
    padding: 1px 10px;
    li {
        display: flex;
        height: 2.1rem;
        border-radius: 10px;
        background: #e0e0e0;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        margin: 0.2rem 0px 0px 0px;
        color: #797979;
        position: relative;
    }
    .zhengmian {
        // padding: 0px 0.15rem 0px 0.25rem;
        span {
            margin: 0px 0px 0px 0.25rem;
        }
        > div:nth-child(2) {
            margin: 0px 0.15rem 0px 0px;
            img {
                width: 1.25rem;
            }
        }
        > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .beimian {
        // padding: 0px 0.3rem 0px 0.2rem;
        span {
            margin: 0px 0.3rem 0px 0px;
        }
        > div:nth-child(1) {
            height: 100%;
            padding: 0.25rem 0px 0px 0.2rem;
            img {
                width: 0.63rem;
            }
        }
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

#RealName .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        padding: 0px;
        background: rgba(0, 0, 0, 0.2);
        margin: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        color: #ffffff;
        > div {
            // transform: rotate(90deg);
            animation: rotate 3s linear infinite;
        }
    }
#RealName .loading_1{
    position: fixed;
}

#RealName .box_2 {
    padding: 10px;
    li {
        display: flex;
        align-items: center;
        margin: 0px 0px 0.1rem 0px;
        font-size: 0.14rem;
        color: #484848;
        > div:nth-child(1) {
            width: 0.75rem;
            flex-shrink: 0;
        }
        > div:nth-child(2) {
            flex-grow: 1;
            background: #ffffff;
            padding: 5px;
            min-height: 0.3rem;
        }
    }
}
#RealName .btn_1 {
    width: 1.8rem;
    height: 0.35rem;
    display: block;
    border-radius: 0.35rem;
    background: $header_background;
    margin: 0.2rem auto 0.2rem;
    color: #ffffff;
    border: none;
}
#RealName .Cropper_box {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #e5e5e5;
    z-index: 10;
    .cont_1 {
        height: 100%;
    }
    .footer_1 {
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        display: flex;
        font-size: 20px;
        color: #ffffff;
        padding: 25px 0px;
        justify-content: space-around;
    }

    .vue-cropper {
        background: #e5e5e5;
    }
    .cropper-modal {
        background: rgba(181, 181, 181, 0.5);
    }
    .cropper-face {
        background-size: cover;
        background-color: rgba(0, 0, 0, 0);
        opacity: 1;
    }
    .cropper-view-box {
        outline: none;
    }
}


</style>
