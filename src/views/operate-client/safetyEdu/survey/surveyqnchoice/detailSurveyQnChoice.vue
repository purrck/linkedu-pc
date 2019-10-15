<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form "
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col v-for="(item,index) of questionData" :key="index">
            <el-form-item :label="item.type === 'S' ? '单选':'多选'">
              <div v-html="item.title"></div>
              <template v-if="item.type === 'S'">
                <el-radio-group v-model="item.questionList">
                  <div v-for="(child, idx) of item.questionList" :key="idx" style="display: flex;align-items: center;height: 35px;">
                    <el-radio disabled :label="child.value"></el-radio>
                  </div>
                </el-radio-group>

              </template>
              <template v-if="item.type === 'M'">
                <el-checkbox-group v-model="item.questionList">
                  <div v-for="(child, idx) of item.questionList" :key="idx" style="display: flex;align-items: center;height: 35px;">
                    <el-checkbox disabled :label="child.value"></el-checkbox>
                  </div>
                </el-checkbox-group>
              </template>

              <template v-if="item.type === 'L'">
                <el-checkbox-group v-model="item.questionList">
                  <div v-for="(child, idx) of item.questionList" :key="idx" style="display: flex;align-items: center;height: 35px;">
                    <el-input disabled v-model="child.value"></el-input>
                  </div>
                </el-checkbox-group>
              </template>

              <div>
                <el-button type="primary" @click="itemAdd" v-if="index === questionData.length - 1">添加</el-button>
                <el-button type="primary" @click="itemEdit( item, index)">编辑</el-button>
                <el-button type="primary" @click="itemHandle('up', item, index)">上移</el-button>
                <el-button type="primary" @click="itemHandle('down', item, index)">下移</el-button>
                <el-button type="primary" @click="itemHandle('top', item, index)">置顶</el-button>
                <el-button type="primary" @click="itemHandle('bottom', item, index)">置底</el-button>
              </div>
            </el-form-item>
          </el-col>


          <el-col v-show="isShow">
            <el-col :span="24">
              <el-form-item label="题目标题 :" prop="surveyId">
                <editor v-model="formData.title" :true-height="350"></editor>
                <!--<el-input v-model="formData.title" placeholder="题目标题"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="题目选项 :" prop="sequence">
                <el-select class="select-v2-rao" v-model="formData.type" placeholder="题目选项">
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
              <el-form-item :label="`选项${getIndex(index)} :`" prop="othersInd" v-for="(item,index) of formData.questionList" :key="index">
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
        <!--<el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"-->
        <!--:loading="formLoading" size="small"-->
        <!--@click="submit('formData')">更新-->
        <!--</el-button>-->
        <!--<el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"-->
        <!--:loading="formLoading" size="small"-->
        <!--@click="submit('formData')">发布-->
        <!--</el-button>-->
        <!--<el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"-->
        <!--@click="goBack">返回-->
        <!--</el-button>-->
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
  name: 'question',
  components: {editor, upload, uploads},
  data () {
    return {
      isShow: true,
      questionData: [],

      qnChoiceContent: [
        {label: '单选题', value: 'S'},
        {label: '多选题', value: 'M'},
        // {label: '问答题', value: 'L'}
      ],
      optionsList: [
        {label: '单选题', value: 'S'},
        {label: '多选题', value: 'M'},
        // {label: '问答题', value: 'L'}
      ],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      formData: {
        title: '',
        type: '',
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
      console.log(type)
      let item = JSON.parse(JSON.stringify(item1))
      switch (type) {
        case 'plus':
          this.formData.questionList.splice(++index, 0, {})
          break
        case 'less':
          this.formData.questionList.length - 1 !== 0 && this.formData.questionList.splice(index, 1)
          break
        case 'up':
          if (index === 0) {
            return
          }
          let data = this.formData.questionList.splice(index, 1)
          this.formData.questionList.splice(--index, 0, data[0])
          break
        case 'down':
          if (index === this.formData.questionList.length - 1) {
            return
          }
        {
          let data = this.formData.questionList.splice(index, 1)
          this.formData.questionList.splice(++index, 0, data[0])
        }

      }
      console.log(this.formData.questionList)
      this.$forceUpdate()
    },
    enter () {
      this.questionData.push(JSON.parse(JSON.stringify(this.formData)))
      this.isShow = false
      this.$emit('enter', this.questionData)
      this.$forceUpdate()
    },
    itemAdd () {
      this.formData = {
        title: '',
        type: '',
        questionList: [
          {value: ''}
        ]
      }
      this.isShow = true
    },
    itemEdit (item, index) {
      this.questionData.splice(index, 1)
      this.formData = JSON.parse(JSON.stringify(item))
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
          let data = this.questionData.splice(index, 1)
          this.questionData.splice(--index, 0, data[0])
          break
        case 'down': {
          if (index === this.questionData.length - 1) {
            return
          }
          let data = this.questionData.splice(index, 1)
          this.questionData.splice(++index, 0, data[0])
        }
          break
        case 'top': {
          let data = this.questionData.splice(index, 1)
          this.questionData.splice(0, 0, data[0])
        }
          break
        case 'bottom': {
          let data = this.questionData.splice(index, 1)
          this.questionData.splice(this.questionData.length, 0, data[0])
        }
          break
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
