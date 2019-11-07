<template>
  <div class="dangerTotal-wrap">
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
  name: 'dangerTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      // bulletinTypeSum
      allCode: [
        {key: 'dangerLevelSum', isHalf: true, typeCode: 'dangerLevel' , isNotDictionary : false},
        {key: 'dangerStatusSum', isHalf: true, typeCode: 'dangerStatus', isNotDictionary : false},
        {key: 'dangerTypeSum', isHalf: false, typeCode: 'dangerType', isNotDictionary : false}
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
      // console.log(`dangerTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .dangerTotal-wrap {
  
  }
</style>
