<template>
  <div class="entitycollectionTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/23 10:31'
 */
export default {
  name: 'entitycollectionTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'collectByDate', isHalf: true, typeCode: null},
        {key: 'collectByType', isHalf: true, typeCode: null, isNotDictionary: true}
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
      // console.log(`entitycollectionTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .entitycollectionTotal-wrap {
  
  }
</style>
