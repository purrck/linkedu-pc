<template>
  <div class="entityevaluateTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/23 10:39'
 */
export default {
  name: 'entityevaluateTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'evaluateByDate', isHalf: true, typeCode: null, isNotDictionary: false},
        {key: 'evaluateByType', isHalf: true, typeCode: null, isNotDictionary: true}
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
      console.log(`entityevaluateTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .entityevaluateTotal-wrap {
  
  }
</style>
