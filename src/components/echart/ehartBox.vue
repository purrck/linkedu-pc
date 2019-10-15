<template>
  <div class="chart-wrap">
    <!--<div class="title">{{activeThree||activeTwo}}</div>-->
    <div class="content">
      <div class="content-item"  v-for="(item, index) in codes" :class="[item.isHalf?'half':'']" :key="index">
        <!--<div class="chart-box">假装有个饼</div>-->
        <echarts  :code="item.key"  :id="`echarts${index}`" :type="item.type"  :typeCode="item.typeCode"  :isNotDictionary="item.isNotDictionary"/>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * userName: 'DengShen'
 * createTime: '2019/1/19 15:35'
 */


import {toEcharsOther, toEcharsCircle} from "@/util/util";
import echarts from "./index";
import {mapGetters} from  'vuex'
export default {
  name: 'chart',
  props: ['codes'],
  components: {echarts},
  computed: {
    ...mapGetters(['activeThree','activeTwo'])
  },
  data () {
    return {

    }
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .chart-wrap {
    padding: 0 30px;

    .title {
      font-size: 24px;
      color: #353535;
    }

    .content {
      margin-top: 30px;
      background-color: #fff;
      padding: 30px;
      display: flex;
      justify-content:space-between;
      flex-direction: row;
      flex-wrap: wrap;

      .sub-title {
        padding: 0 16px;
        height: 40px;
        display: flex;
        align-items: center;
        background-color: #F5F5F5;
        color: #707070;
        font-size: 14px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
      }

      .content-item {
        width: 100%;
        position: relative;
      }

      .chart-box {
        margin: 50px auto;
        width: 100px;
        height: 100px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: red;
        display: flex;
        align-items: center;
        text-align: center;
      }

      .half {
        width: 48%;
      }
    }
  }
</style>
