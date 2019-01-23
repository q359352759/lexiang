<template>
    <div>
        <ul class="box_1">
            <li class="header_1">
                <span class="name">{{obj.name}}</span>
                <span class="time">签到日期：2018.08.10-2018.11.30</span>
            </li>
            <li class="content_1">
                <div class="logo_box">
                    <img src="image/WechatIMG311.png" alt="" srcset="">
                </div>
                <ul class="cont_2">
                    <li class="jilu">
                        <div class="tianshu">
                            <div>连续签到</div>
                            <span>2天</span>
                        </div>
                        <ul class="item">
                            <li>
                                <div>
                                    <div class="time">11.11</div>
                                    <div class="number active">
                                        <div>1</div>
                                    </div>
                                    <div class="money">10</div>
                                </div>                            
                            </li>
                            <li>
                                <div>
                                    <div class="time">11.11</div>
                                    <div class="number active">
                                        <div>2</div>
                                    </div>
                                    <div class="money">20</div>
                                </div>                            
                            </li>
                            <li>
                                <div>
                                    <div class="time">11.11</div>
                                    <div class="number active">
                                        <div>3</div>
                                    </div>
                                    <div class="money">30</div>
                                </div>                            
                            </li>
                            <li>
                                <div>
                                    <div class="time">11.11</div>
                                    <div class="number">
                                        <div>4</div>
                                    </div>
                                    <div class="money">40</div>
                                </div>                            
                            </li>
                            <li>
                                <div>
                                    <div class="time">11.11</div>
                                    <div class="number">
                                        <div>5</div>
                                    </div>
                                    <div class="money">50</div>
                                </div>                            
                            </li>
                            <li>
                                <div>
                                    <div class="time">11.11</div>
                                    <div class="number">
                                        <div>6</div>
                                    </div>
                                    <div class="money">60</div>
                                </div>                            
                            </li>   
                            <li>
                                <div>
                                    <div class="time">11.11</div>
                                    <div class="number">
                                        <div>6</div>
                                    </div>
                                    <div class="money">60</div>
                                </div>                            
                            </li>                            
                        </ul>
                        <div class="daqia active">
                            <i class="icon iconfont icon-daqia"></i>
                        </div>
                    </li>
                    <li class="tongji">
                        <div class="time">使用时间：2018.12.01-2018.12.07</div>
                         <i class="renqi icon iconfont icon-renqi"></i>
                        <div class="renshu">
                            120800人
                        </div>
                        <div>累计：20元</div>
                    </li>
                </ul>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
  name: "",
  props: {
    obj: {}
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.box_1 {
  background: #ffffff;
  margin: 3px 0px 0px;
  padding: 0px 13px 0px;
  .header_1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0px 4px;
    .name {
      color: rgba(80, 80, 80, 1);
      font-size: 10px;
    }
    .time {
      color: rgba(80, 80, 80, 1);
      font-size: 8px;
    }
  }
  .content_1 {
    display: flex;
    .logo_box {
      width: 0.47rem;
      height: 0.47rem;
      margin: 0px 0.15rem 0px 0px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .cont_2 {
      width: 0;
      flex-grow: 1;
      .jilu {
        display: flex;
        .tianshu {
          color: rgba(80, 80, 80, 1);
          font-size: 8px;
          flex-shrink: 0;
          white-space: nowrap;
          text-align: center;
          > div {
            margin: 0px 0px 3px 0px;
          }
        }
        .item {
          flex-grow: 1;
          display: flex;
          position: relative;
          text-align: center;
          width: 0;
          text-align: center;
          > li {
            width: calc(100% / 7);
            position: relative;
          }
          > li:nth-child(1) .number::after {
            display: none;
          }
          // >li:last-child .number::before{
          //     display: none;
          // }
          .time {
            color: rgba(80, 80, 80, 1);
            font-size: 7px;
          }
          .number {
            > div {
              width: 0.13rem;
              height: 0.13rem;
              background: #2a82e4;
              font-size: 8px;
              color: #ffffff;
              text-align: center;
              line-height: 0.13rem;
              border-radius: 100%;
              margin: 3px auto 3px;
              position: relative;
              z-index: 1;
            }
          }
          .number.active {
            > div {
              background: #ff5733;
            }
          }
          .number::after {
            position: absolute;
            width: 100%;
            height: 2px;
            content: "";
            top: 0px;
            left: -50%;
            bottom: 0px;
            margin: auto;
            background: #2a82e4;
          }
          // .number::before{
          //     position: absolute;
          //     width: 100%;
          //     height: 2px;
          //     content: '';
          //     top: 0px;
          //     right: -50%;
          //     bottom: 0px;
          //     margin: auto;
          //     background: #2a82e4;
          //     z-index: 1;
          // }
          // .number.active::before{
          //     display: none;
          // }
          .number.active::after {
            background: #ff5733;
          }
          .money {
            color: rgba(80, 80, 80, 1);
            font-size: 8px;
          }
        }
        .daqia {
          flex-shrink: 0;
          font-size: 0.28rem;
          width: 0.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #bcc4c0;
        }
        .daqia.active {
          color: #f0641c;
        }
      }
    }
    .tongji {
      margin: 3px 0px 5px;
      display: flex;
      align-items: center;
      color: rgba(80, 80, 80, 1);
      font-size: 8px;
      .time {
        flex-grow: 1;
      }
      .renqi {
        color: #e01c04;
      }
      .renshu {
        margin: 0px 0.2rem 0px 0px;
      }
    }
  }
}
</style>
