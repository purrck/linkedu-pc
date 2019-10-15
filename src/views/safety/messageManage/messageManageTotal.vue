<template>
  <div class="messageManageTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/23 15:35'
 */
export default {
  name: 'messageManageTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'collectByDate', isHalf: true, typeCode: null},
        {key: 'collectByType', isHalf: true, typeCode: null},
        {key: 'collectByType', isHalf: false, typeCode: null},
        {key: 'collectByType', isHalf: false, typeCode: null}
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
      console.log(`messageManageTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .messageManageTotal-wrap {

  }
</style>
