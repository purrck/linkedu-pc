<template>
  <div class="studentLeaveTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/21 14:28'
 */
export default {
  name: 'studentLeaveTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'stuleaveTypeDayNumSum', isHalf: true, typeCode: 'studentLeaveType'},
        {key: 'yearMonthStuleaveDayNumSum', isHalf: true, typeCode: null},
        {key: 'stuleaveStatusSum', isHalf: true, typeCode: 'studentLeaveStatus'},
        {key: 'stuleaveTypeSum', isHalf: true, typeCode: 'studentLeaveType'}
      ]
    }
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
    })
  },
  methods: {
    init () {
      console.log(`studentLeaveTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .studentLeaveTotal-wrap {
  
  }
</style>
