<template>
  <div class="studentRouteTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/21 11:43'
 */
export default {
  name: 'studentRouteTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'checkExceptionSum', isHalf: false, typeCode: 'checkIsException'},
        {key: 'yearMonthCheckCountSum', isHalf: false, typeCode: 'checkIsException'}
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
      // console.log(`studentRouteTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .studentRouteTotal-wrap {
  
  }
</style>
