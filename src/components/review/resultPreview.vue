<template xmlns="">
  <div class="resultPreview-wrap">
    <div class="resultPreview-wrap--head">
      <div class="resultPreview-wrap--head--type" v-if="data.qnType === 'S'">单选题</div>
      <div class="resultPreview-wrap--head--type" v-if="data.qnType === 'M'">多选题</div>
      <div class="resultPreview-wrap--head--type" v-if="data.qnType === 'L'">问答题</div>
      <div class="resultPreview-wrap--head--schedule">{{index}} / {{total}}</div>
    </div>
    <div class="resultPreview-wrap--content">
      <div class="resultPreview-wrap--content--title" v-html="data.qnContent"></div>
      <div class="resultPreview-wrap--content--options">
        <el-radio-group v-model="radio2" v-if="data.qnType === 'S'">
          <div v-for="(item, index) of data.qnChoiceContent" :key="index" class="option">
            <el-radio :label="item" disabled></el-radio>
          </div>
        </el-radio-group>
        
        <el-checkbox-group v-model="radio2" v-if="data.qnType === 'M'">
          <div v-for="(item, index) of data.qnChoiceContent" :key="index" class="option">
            <el-checkbox :label="item" disabled></el-checkbox>
          </div>
        </el-checkbox-group>
      
      </div>
    
    </div>
  </div>
</template>

<script>
/**
 * userName: 'DengShen'
 * createTime: '2019/2/20 13:48'
 */
export default {
  name: 'resultPreview',
  props: {
    data: Object,
    index: Number,
    total: Number
  },
  components: {},
  computed: {},
  data () {
    return {
      radio2: '',
      options: [
        {
          name: '父亲',
          isDisabled: false
        },
        {
          name: '母亲',
          isDisabled: false
        },
        {
          name: '爷爷',
          isDisabled: false
        },
        {
          name: '奶奶',
          isDisabled: false
        },
        {
          name: '其他',
          isDisabled: false
        }
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
      console.log(`resultPreview is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .resultPreview-wrap {
    padding: 30px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background-color: #F5F5F5;
    
    &--head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      &--type {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 9px;
        box-sizing: border-box;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        background-color: #428675;
        color: #fff;
      }
    }
    
    &--content {
      &--title {
        margin-top: 20px;
      }
      
      &--options {
        margin-top: 10px;
        .option {
          display: flex;
          align-items: center;
          height: 40px;
        }
      }
    }
  }
</style>
