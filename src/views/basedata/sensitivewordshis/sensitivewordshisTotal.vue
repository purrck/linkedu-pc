<template>
  <div class="studentGrantTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
  import Chart from '@/components/echart/ehartBox'

  /**
   * userName: '王原思'
   * createTime: '2019/1/21 11:39'
   */
  export default {
    name: 'sensitivewordshisTotal',
    props: {},
    components: {Chart},
    computed: {},
    data () {
      return {
        codes: [
          {key: 'sensitiveHisNew12MothsSum', isHalf: true, typeCode: null},
          {key: 'sensitiveHisNew4WeekSum', isHalf: true, typeCode: 'gtDelegateType'},
          {key: 'sensitiveHisSum', isHalf: true, typeCode: null},
          {key: 'sensitiveHisUserTop10Sum', isHalf: true, typeCode: 'gtStatus'},
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
        console.log(`studentGrantTotal is running...`)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .studentGrantTotal-wrap {

  }
</style>
