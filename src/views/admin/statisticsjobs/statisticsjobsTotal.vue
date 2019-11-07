<template>
  <div class="statisticsjobsTotal-wrap">
    <Chart :codes="codes"></Chart>
    <div class="custom-chart-box">
      <echarIndex :code="code.key" :type-code="code.typeCode" :date="code.date" id="costomEchar" ref="child" :isDir="true">
        <div slot="header" class="custom-header">
          <div class="days">
            <el-radio-group v-model="day" @change="changeDay()">
              <el-radio :label="7">近7天</el-radio>
              <el-radio :label="15">近15天</el-radio>
              <el-radio :label="30">近30天</el-radio>
            </el-radio-group>
          </div>
          <div class="dateRange">
            <el-date-picker
              @change="changeDateRange"
              value-format="yyyy-MM-dd HH:mm"
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </echarIndex>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'
import EcharIndex from '@/components/echart/index'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/23 11:54'
 */
export default {
  name: 'statisticsjobsTotal',
  props: {},
  components: {EcharIndex, Chart},
  computed: {},
  data () {
    return {
      day: 7,
      dateRange: '',
      codes: [
        {key: 'bulletinStatus', isHalf: true, typeCode: 'bulletinStatus'},
        {key: 'bulletinTypeSum', isHalf: true, typeCode: 'bulletinType'},
        {key: 'bulletinTypeEntityInfoSum', isHalf: false, typeCode: 'bulletinType'},
        {key: 'bulletinReadNumSum', isHalf: false, typeCode: 'bulletinType', isHeader: true}
      ],
      code: {key: 'bulletinReadNumSum', isHalf: false, typeCode: 'bulletinType', isHeader: true}
    }
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
    })
  },
  methods: {
    init () {
      // console.log(`statisticsjobsTotal is running...`)
    },
    changeDay (e) {
      this.dateRange = ''
      this.code.date = this.day
      this.distribution()
    },
    changeDateRange (e) {
      this.day = ''
      this.code.date = this.dateRange
      this.distribution()
    },
    distribution () {
      this.$refs.child.init()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .statisticsjobsTotal-wrap {
    .custom-chart-box {
      padding: 0 60px;
      box-sizing: border-box;

      .custom-header {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
