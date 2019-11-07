<template>
  <div class="entityapproveTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/23 10:44'
 */
export default {
  name: 'entityapproveTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'bulletinStatus', isHalf: true, typeCode: 'bulletinStatus'},
        {key: 'bulletinTypeSum', isHalf: true, typeCode: 'bulletinType'},
        {key: 'bulletinTypeEntityInfoSum', isHalf: false, typeCode: 'bulletinType'},
        {key: 'bulletinReadNumSum', isHalf: false, typeCode: 'bulletinType'}
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
      // console.log(`entityapproveTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .entityapproveTotal-wrap {
  
  }
</style>
