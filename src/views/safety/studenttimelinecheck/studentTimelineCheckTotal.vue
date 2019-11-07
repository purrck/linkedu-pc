<template>
  <div class="studentTimelineCheckTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'yuansi'
 * createTime: '2019/1/21 14:28'
 */
export default {
  name: 'studentTimelineCheckTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'studentTimelineSchoolcheckSums', isHalf: true, typeCode: 'timelineCheckException'},
        {key: 'studentTimelinechecksum', isHalf: true, typeCode: 'timelineCheckException'},
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
      // console.log(`studentTimelineCheckTotal-wrap is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .studentTimelineCheckTotal-wrap {

  }
</style>
