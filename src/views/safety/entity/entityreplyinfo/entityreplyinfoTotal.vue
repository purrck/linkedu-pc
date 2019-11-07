<template>
  <div class="entityreplyinfoTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/23 10:41'
 */
export default {
  name: 'entityreplyinfoTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'replyByDate', isHalf: true, typeCode: null, isNotDictionary: false},
        {key: 'replyByType', isHalf: true, typeCode: null, isNotDictionary: true}
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
      // console.log(`entityreplyinfoTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .entityreplyinfoTotal-wrap {
  
  }
</style>
