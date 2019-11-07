<template>
  <div>
    <div class="edit-box">
      <div>
        <el-form :label-position="'right'" class="edit-form "
                 label-width="120px" ref="formData" :inline="false" :model="formData1" :rules="rules" size="small">
          <el-col v-for="(item,index) of formData1.SurveyItemAdTOList" :key="index">
            <el-form-item :label="translateQnType(item)">
              <div v-html="item.qnContent"></div>
              <template v-if="item.qnType === 'S'">
                <el-radio-group>
                  <div v-for="(child, idx) of item.qnChoiceContent" :key="idx" style="display: flex;align-items: center;height: 35px;">
                    <span>{{child}}</span>
                    <el-radio disabled :label="child"></el-radio>
                  </div>
                </el-radio-group>

              </template>
              <template v-if="item.qnType === 'M'">
                <el-checkbox-group>
                  <div v-for="(child, idx) of item.qnChoiceContent" :key="idx" style="display: flex;align-items: center;height: 35px;">
                    <el-checkbox disabled :label="child"></el-checkbox>
                  </div>
                </el-checkbox-group>
              </template>
              <!--<template v-if="item.qnType === 'L'">-->
              <!--<el-checkbox-group v-model="item.qnChoiceContent1">-->
              <!--<div v-for="(child, idx) of item.qnChoiceContent" :key="idx" style="display: flex;align-items: center;height: 35px;">-->
              <!--<el-input disabled v-model="child"></el-input>-->
              <!--</div>-->
              <!--</el-checkbox-group>-->
              <!--</template>-->
              <div>
                <el-button type="primary" @click="itemAdd" v-if="index === formData1.SurveyItemAdTOList.length - 1">添加</el-button>
                <el-button type="primary" @click="itemEdit( item, index)">编辑</el-button>
                <el-button type="primary" @click="itemHandle('up', item, index)">上移</el-button>
                <el-button type="primary" @click="itemHandle('down', item, index)">下移</el-button>
                <el-button type="primary" @click="itemHandle('top', item, index)">置顶</el-button>
                <el-button type="primary" @click="itemHandle('bottom', item, index)">置底</el-button>
              </div>
            </el-form-item>
          </el-col>
          <!---->
          <!---->
          <el-col v-show="isShow">
            <el-col :span="24">
              <el-form-item label="题目标题 :" prop="surveyId">
                <editor v-model="currentData.qnContent" :true-height="350"></editor>
                <!--<el-input v-model="formData.title" placeholder="题目标题"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="题目选项 :" prop="sequence">
                <el-select v-model="currentData.qnType" placeholder="placeholder">
                  <el-option
                    v-for="item in optionsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="`选项${getIndex(index)} :`" prop="othersInd" v-for="(item,index) of currentData.options" :key="index">
                <div class="question">
                  <el-input class="input-v2-rao" v-model="item.value"></el-input>
                  <span class="iconfont icon-icon_tianjia fs-26 c999999" @click="handle('plus',item, index)"></span>
                  <span class="iconfont icon-icon_jianshao fs-26 c999999" @click="handle('less',item, index)"></span>
                  <span class="iconfont icon-icon_shagnyi fs-26 c999999" @click="handle('up',item, index)"></span>
                  <span class="iconfont icon-icon_xiayi fs-26 c999999" @click="handle('down',item, index)"></span>
                </div>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </div>

      <div class=" mt-30">
        <el-button v-if="isShow" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="enter('formData')">保存当前题目
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './surveyqnchoiceUrl'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'

export default {
  name: 'questionEdit',
  components: {editor, upload, uploads},
  props: ['isComponent', 'data'],
  data () {
    return {
      isShow: false,
      questionData: [],

      qnChoiceContent: [
        {label: '单选题', value: 'S'},
        {label: '多选题', value: 'M'},
        {label: '问答题', value: 'L'}
      ],
      optionsList: [
        {label: '单选题', value: 'S'},
        {label: '多选题', value: 'M'},
        {label: '问答题', value: 'L'}
      ],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),
      formData1: this.data,
      currentData: {
        title: '',
        type: '',
        options: [],
        qnChoiceContent: [{value: ''}]
      },
      formData: {
        qnContent: '',
        qnType: '',
        questionList: [
          {value: ''}
        ]
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        othersInd:
          [
            {max: 1, message: '最多能输入1个字', trigger: 'blur'},

          ],
        othersLabel:
          [
            {max: 120, message: '最多能输入120个字', trigger: 'blur'},

          ],
        layoutCd:
          [
            {max: 1, message: '最多能输入1个字', trigger: 'blur'},

          ],
      }
    }
  },
  computed: {
    pageState () {
      return this.$route.params.type
    }
  },
  created () {
    // this.getDetail(this.$route.params.id)
    this.formData1 = this.data
  },
  methods: {
    submit (formName) {
      const set = this.$refs
      this.isLoaded = true
      set[formName].validate(valid => {
        if (this.pageState === 'edit' && valid) {
          this.formLoading = true
          api.putObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.goBack()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
          })
        } else if (this.pageState === 'add' && valid) {
          this.formLoading = true
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.goBack()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
          })
        }
      })
      this.isLoaded = false
    },
    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.formData = res.data.data
          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    getIndex (index) {
      let i = index
      return ++i
    },
    handle (type, item1, index) {
      // console.log(type)
      let item = JSON.parse(JSON.stringify(item1))
      switch (type) {
        case 'plus':
          this.currentData.options.splice(++index, 0, {})
          break
        case 'less':
          this.currentData.options.length - 1 !== 0 && this.currentData.options.splice(index, 1)
          break
        case 'up':
          if (index === 0) {
            return
          }
          let data = this.currentData.options.splice(index, 1)
          this.currentData.options.splice(--index, 0, data[0])
          break
        case 'down':
          if (index === this.currentData.options.length - 1) {
            return
          }
        {
          let data = this.currentData.options.splice(index, 1)
          this.currentData.options.splice(++index, 0, data[0])
        }

      }
      // console.log(this.currentData.options)
      this.$forceUpdate()
    },
    enter () {
      this.currentData.qnChoiceContent = this.currentData.options.map(child => child.value)
      this.formData1.SurveyItemAdTOList.push(JSON.parse(JSON.stringify(this.currentData)))
      this.isShow = false
      this.$emit('enter', this.currentData.qnChoiceContent)
      this.$forceUpdate()
    },
    itemAdd () {
      this.currentData = {
        qnContent: '',
        qnType: '',
        qnChoiceContent: [],
        options: [
          {value: ''}
        ]
      }
      this.isShow = true
    },
    itemEdit (item, index) {
      // console.log(item)
      item.options = item.qnChoiceContent.map(item => {
        return {value: item}
      })
      this.currentData = JSON.parse(JSON.stringify(item))
      this.formData1.SurveyItemAdTOList.splice(index, 1)
      // this.formData = item
      this.isShow = true
      this.$forceUpdate()
    },
    itemHandle (type, item, index) {
      switch (type) {
        case 'up':
          if (index === 0) {
            return
          }
          let data = this.formData1.SurveyItemAdTOList.splice(index, 1)
          this.formData1.SurveyItemAdTOList.splice(--index, 0, data[0])
          break
        case 'down': {
          if (index === this.formData1.SurveyItemAdTOList.length - 1) {
            return
          }
          let data = this.formData1.SurveyItemAdTOList.splice(index, 1)
          this.formData1.SurveyItemAdTOList.splice(++index, 0, data[0])
        }
          break
        case 'top': {
          let data = this.formData1.SurveyItemAdTOList.splice(index, 1)
          this.formData1.SurveyItemAdTOList.splice(0, 0, data[0])
        }
          break
        case 'bottom': {
          let data = this.formData1.SurveyItemAdTOList.splice(index, 1)
          this.formData1.SurveyItemAdTOList.splice(this.formData1.SurveyItemAdTOList.length, 0, data[0])
        }
          break
      }
    },
    translateQnType (item) {
      if (item.qnType === 'S') {
        return '单选'
      }
      if (item.qnType === 'M') {
        return '多选'
      }
      if (item.qnType === 'L') {
        return '问答'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .question {
    display: flex;

    > span {
      margin-left: 10px;
    }
  }

  .edit-box {
    padding: 40px;
    width: auto;

    .detail-title-v2 {
      background: #f5f5f5;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      margin-right: 40px;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 25px 25px 0 25px;
    }

  }



  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
