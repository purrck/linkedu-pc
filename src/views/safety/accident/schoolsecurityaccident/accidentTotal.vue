<template>
  <div class="accidentTotal-wrap">
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
  name: 'accidentTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      // bulletinTypeSum
      allCode: [
        {key: 'accidentLevelSum', isHalf: true, typeCode: 'accidentLevel' , isNotDictionary : false},
        {key: 'accidentStatusSum', isHalf: true, typeCode: 'accidentStatus', isNotDictionary : false},
        {key: 'accidentInfluenceSum', isHalf: false, typeCode: 'accidentInfluence', isNotDictionary : false},
        {key: 'accidentTypeSum', isHalf: false, typeCode: 'accidentType', isNotDictionary : false}
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
      console.log(`accidentTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .accidentTotal-wrap {
  
  }
</style>
