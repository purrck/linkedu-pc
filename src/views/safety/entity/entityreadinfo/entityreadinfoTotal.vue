<template>
  <div class="entityreadinfoTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/23 14:48'
 */
export default {
  name: 'entityreadinfoTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'readByDate', isHalf: true, typeCode: null, isNotDictionary: false},
        {key: 'readByType', isHalf: true, typeCode: null, isNotDictionary: true}
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
      console.log(`entityreadinfoTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .entityreadinfoTotal-wrap {
  
  }
</style>
