<template>
  <div class="phoneModel-wrap">
    <el-scrollbar class="phone-component__scroll">
      <div class="phone-main">
        <div class="image">
          <img :src="data.imagePath" alt="">
        </div>
        <div class="title">{{data.topic}}</div>
        <!--<div class="author-bar">-->
          <!--<p class="author">作者 <span style="color: #5ABCBB;">{{data.author}}</span></p>-->
          <!--<p class="time">发布时间 : {{data.time}}</p>-->
          <!--<p class="iconfont icon-icon_liulanshu flex1">{{data.viewNum}}</p>-->
        <!--</div>-->
        <div class="phone-content" v-html="data.intro">

        </div>

      </div>


    </el-scrollbar>
  </div>
</template>

<script>
/**
 * userName: 'DengShen'
 * createTime: '2019/2/21 16:54'
 */
export default {
  name: 'phoneModelActivity',
  props: {
    data: {
      type: Object
    }
  },
  components: {},
  computed: {},
  data () {
    return {}
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
    })
  },
  methods: {
    init () {
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .phoneModel-wrap {
    min-width: 350px;
    max-width: 350px;
    height: 552px;
    padding: 24px 20px;
    box-sizing: border-box;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 30px;
    background-color: #ccc;

    .phone-main {
      background-color: #fff;
      padding: 15px;
      overflow: hidden;

      .title {
        color: #474747;
        font-size: 21px;
      }

      .image {
        display: block;
        img{
          display: flex;
          width: 100%;
        }
      }
      .author-bar {
        margin: 10px 0;
        display: flex;
        font-size: 12px;
        color: #999;
        .author {
          margin-right: 5px;
        }

        .flex1 {
          flex: 1;
          justify-content: flex-end;
        }
      }

      .phone-content {
        border-radius: 8px;
        img {
          width: 100%;
        }
      }
    }
  }
</style>

<style lang="scss">
  .phone-component__scroll {
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
    .el-scrollbar-wrap {
      overflow-x: hidden;
      overflow-y: auto;

      .is-horizontal {
        display: none;
      }
    }
  }

</style>
