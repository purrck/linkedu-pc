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
  name: 'bulletinTotal',
  props: {},
  components: {Chart},
  computed: {},
  data () {
    return {
      // bulletinTypeSum
      allCode: [
        {key: 'bulletinStatus', isHalf: true, typeCode: 'bulletinStatus' , isNotDictionary : false},
        {key: 'bulletinTypeSum', isHalf: true, typeCode: 'bulletinType', isNotDictionary : false},
        {key: 'bulletinTypeEntityInfoSum', isHalf: false, typeCode: 'bulletinType', isNotDictionary : false},
        {key: 'bulletinReadNumSum', isHalf: false, typeCode: 'bulletinType', isNotDictionary : false,type:"somePie"}
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
      console.log(`bulletinTotal is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .bulletinTotal-wrap {
  
  }
</style>
