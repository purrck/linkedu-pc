<template>
  <div class="bottom-container ">
    <div class="container-top flex row">
      <div class=" bottom-title"><span class="bottom-border"></span>友情链接:</div>
      <ul class="flex row">
        <li><span>网易</span></li>
        <li><span>腾讯</span></li>
        <li><span>阿里巴巴</span></li>
        <li><span>当当</span></li>
        <li><span>科大讯飞</span></li>
        <li><span>搜狐</span></li>
        <li><span>新华社</span></li>
        <li><span>人民网</span></li>
        <li><span>芥末堆</span></li>
        <li><span>环球网</span></li>
      </ul>
    </div>
    <div class="container-middle flex row ">
      <div class="bottom-one br">
        <div>
          <div class=" bottom-title"><span class="bottom-border"></span>合作媒体</div>
          <div class="bottom-content">
            <ul>
              <li>清华启迪教育</li>
              <li>威创股份</li>
              <li>缨幼儿园</li>
            </ul>
          </div>
        </div>

      </div>
      <div class="bottom-two br">
        <div class=" bottom-title2"><span class="bottom-border"></span>联系我们</div>
        <div class="bottom-content">
          <div style="padding-bottom: 10px;">
            <!--<img src="../../../assets/img/icon-phone-2.png" style="width: 12px;height: 13px" alt="">-->
           <li><span>020-8888-8888</span></li>
          </div>
          <div>
            <li><span>09:00 - 20:30 (周一到周五)</span></li>
          </div>
          <div class="kefu">
            <img src="../../../assets/img/icon-qq.png" alt="" width="12px" style="padding-right: 10px;">
            <span class="c428675">在线客服</span>
          </div>
        </div>
      </div>
      <div class="bottom-three br fl ">
        <div class=" bottom-title2"><span class="bottom-border"></span>关于我们</div>
        <div class="bottom-content">
          <ul>
            <li>JXW简介</li>
            <li>加入JXW</li>
            <li>使用协议</li>
          </ul>
        </div>
      </div>
      <div class="bottom-four ">
        <div class=" bottom-title2"><span class="bottom-border"></span>关注我们</div>
        <div class="bottom-four-content flex row">
          <div>
            <div class="flex row x-center " style="padding-bottom: 10px;justify-content: start">
              <img src="../../../assets/img/icon-header-message.png"  style="height: 16px" class="dashed" alt="今日头条" />
              <span>今日头条</span>
            </div>
            <div class="flex row x-center " style="padding-bottom: 10px;">
              <img src="../../../assets/img/icon-weixin.png"  style="height: 16px" class="dashed" alt="微信">
              <span>微信</span>
            </div>
            <div class="flex row x-center" style="padding-bottom: 10px;">
              <img src="../../../assets/img/icon-weibo.png"  style="height: 16px"  class="dashed" alt="新浪微博">
              <span >新浪微博</span>
            </div>
          </div>
          <!-- <div style="padding-left: 95px">
            <img src="../../../assets/img/app_erweima.png" alt="" style="width: 100px;height: 100px;border: 1px dashed #909090;">
          </div>
          <div style="padding-left: 65px">
            <img src="../../../assets/img/app_erweima.png" alt="" style="width: 100px;height: 100px;border: 1px dashed #909090">
          </div> -->
        </div>

      </div>
    </div>
    <div class="container-bottom flex row center">
      <img src="../../../assets/img/icon-copyright.png" alt="" style="height: 40px;width: auto">
    </div>
  </div>
</template>

<script>
  export default {
    name: "bottom"
  }
</script>

<style scoped lang="scss">

  .bottom-container {
    width: 100%;
    color: #9B9B9B;
    font-size: 12px;
    height: 250px;
    /*background-color: #2E3736;*/
    .container-top {
      width: 100%;
      padding-top: 20px;
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      ul {
        height: 12px;
        li{
          line-height: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right:1px solid #9B9B9B;
          span{
            padding: 0 15px;
          }
        }
      }

    }
    .container-middle {
      height: 160px;
      align-items: center;
      /*background: #2E3736;*/
      .bottom-one {
        height: 128px;
        width: 21%;
        border-color: #9B9B9B;

        li:before {
          content: '·';
          color: #4A9388;
          font-weight:600;
          padding-right: 5px;
        }
        li {
          float: left;
          white-space:nowrap;
          list-style: none;
          padding-right: 15px;
          padding-bottom: 10px;
        }

      }
      .bottom-two {
        height: 128px;
        width: 21%;
        border-color: #9B9B9B;
        .kefu {
          width:125px;
          height:25px;
          border-radius:14px;
          border: 1px #428675 solid;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 8px
        }
        li {
          list-style: none;
        }
        li:before {
          content: "·";
          list-style: none;
          color: #4A9388;
          font-weight:600;
          margin-right: 5px;
        }
      }
      .bottom-three {
        height: 128px;
        width: 21%;
        border-color: #9B9B9B;
        li:before {
          content: '·';
          color: #4A9388;
          font-weight:600;
          padding-right: 5px;
        }
        li {
          width: 80px;
          list-style: none;
          padding-right: 15px;
          padding-bottom: 10px;
        }
      }
      .bottom-four {
        height: 128px;
        width: 37%;
        border-color: #9B9B9B;
        .bottom-four-content {
          margin-left: 80px;
          padding-top: 15px;
          text-align: left;
          span{
            margin-left: 8px;
            white-space :nowrap ;
          }
        }
      }
    }

    .container-bottom {
      height: 50px;
      width: 100%;
      /*background: #293130;*/
      align-items: center;
    }
  }
  .bottom-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    letter-spacing: 2px;
    padding-left: 3px;
    margin-left: 40px;
  }
  .bottom-title2 {
    display: flex;
    align-items: center;
    font-size: 16px;
    letter-spacing: 2px;
    padding-left: 3px;
    margin-left: 80px;
  }
  .bottom-border {
    width:3px;
    display: inline-block;
    height:9px;
    margin-right: 5px;
    background:rgba(66,134,117,1);
    border-radius:2px;
  }
  .bottom-content {
    margin-left: 20%;
    padding-top: 15px;
    font-size: 12px;
    text-align: left;
  }
  .dashed {
    border: 1px dashed #909090;
  }

</style>
