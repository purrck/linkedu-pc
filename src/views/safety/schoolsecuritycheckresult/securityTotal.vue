<template>
  <div class="bulletinTotal-wrap">
    <Chart :codes="allCode"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echart/ehartBox'

/**
 * userName: 'DengShen'
 * createTime: '2019/1/21 11:27'
 */
export default {
  name: 'securityTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      // bulletinTypeSum
      allCode: [
        {key: 'checkExceptionSum', isHalf: true, typeCode: '' , isNotDictionary : true},
        {key: 'checkExceptionByPlaceSum', isHalf: true, typeCode: '', isNotDictionary : true},
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
      // console.log(`bulletinTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .bulletinTotal-wrap {
  
  }
</style>
