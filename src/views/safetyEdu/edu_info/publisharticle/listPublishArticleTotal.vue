<template>
  <div class="listPublishArticleTotalV2-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'
/**
  * userName: 'DengShen'
  * createTime: '2019/2/25 15:01'
  */
export default {
  name: 'listPublishArticleTotal',
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
    this.$nextTick(() => {})
  },
  methods: {
    init () {
      console.log(`listPublishArticleTotalV2 is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .listPublishArticleTotalV2-wrap {

  }
</style>
