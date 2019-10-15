<template>
  <div class="studentGrantTotal-wrap">
    <Chart :codes="codes"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/21 11:39'
 */
export default {
  name: 'studentGrantTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      codes: [
        {key: 'gtAgencySum', isHalf: true, typeCode: null,},
        {key: 'gtDelegateTypeSum', isHalf: true, typeCode: 'gtDelegateType',},
        {key: 'gtPeopleSum', isHalf: true, typeCode: null,},
        {key: 'gtStatusSum', isHalf: true, typeCode: 'gtStatus',},
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
