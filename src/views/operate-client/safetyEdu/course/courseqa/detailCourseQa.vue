<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="提问 :" prop="question"
                          class="orgIntroduction">
              <editor v-model="formData.question" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提问者 :" prop="userId">
              <el-input class="input-v2-rao" v-model="formData.userId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提问者 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提问时间 :" prop="askDt">
              <el-date-picker class="date-v2-rao" v-model="formData.askDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复 :" prop="answer">
              <el-input class="input-v2-rao" v-model="formData.answer"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复者 :" prop="answerId">
              <el-input class="input-v2-rao" v-model="formData.answerId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复者 :" prop="answerName">
              <el-input class="input-v2-rao" v-model="formData.answerName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复时间 :" prop="answerDt">
              <el-date-picker class="date-v2-rao" v-model="formData.answerDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复状态 :" prop="answerStatusCode">
              <el-select class="select-v2-rao" v-model="formData.answerStatusCode" placeholder="请您选择">
                <el-option v-for="answerStatusCodeItem in answerStatusCodeOptions"
                           :key="answerStatusCodeItem.name"
                           :label="answerStatusCodeItem.label" :value="answerStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="提问 :" prop="question"
                          class="orgIntroduction">
              <editor v-model="formData.question" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="提问者 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提问时间 :" prop="askDt">
              <el-date-picker class="date-v2-rao" v-model="formData.askDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复 :" prop="answer">
              <el-input class="input-v2-rao" v-model="formData.answer"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复者 :" prop="answerId">
              <el-input class="input-v2-rao" v-model="formData.answerId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复者 :" prop="answerName">
              <el-input class="input-v2-rao" v-model="formData.answerName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复时间 :" prop="answerDt">
              <el-date-picker class="date-v2-rao" v-model="formData.answerDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="答复状态 :" prop="answerStatusCode">
              <el-select class="select-v2-rao" v-model="formData.answerStatusCode" placeholder="请您选择">
                <el-option v-for="answerStatusCodeItem in answerStatusCodeOptions"
                           :key="answerStatusCodeItem.name"
                           :label="answerStatusCodeItem.label" :value="answerStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  {{formData.question}}
                </div>
                <div class="detail-item-v2">

                  <div class="p100" v-if="formData.question">
                    <el-form-item label="提问 :" prop="question">
                      <span v-if="formData.question" v-html="formData.question"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.userName">
                    <el-form-item label="提问者 :" prop="userName">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="提问时间 :" prop="askDt">
                      <span v-if="formData.askDt"> {{formData.askDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.answer">
                    <el-form-item label="答复 :" prop="answer">
                      <span v-if="formData.answer">{{formData.answer}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.answerId">
                    <el-form-item label="答复者 :" prop="answerId">
                      <span v-if="formData.answerId">{{formData.answerId}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.answerName">
                    <el-form-item label="答复者 :" prop="answerName">
                      <span v-if="formData.answerName">{{formData.answerName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="答复时间 :" prop="answerDt">
                      <span v-if="formData.answerDt"> {{formData.answerDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="答复状态 :" prop="answerStatusCode">
                            <span v-if="formData.answerStatusCodeStr"
                                  :style="{'color':formData.answerStatusCodeStr.split(';')[1]}">{{formData.answerStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </el-col>

        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './courseqaUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'

export default {
  components: {editor, upload, uploads},
  data () {
    return {
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      answerStatusCodeOptions: [{'label': '全部', 'name': ''}], answerStatusCode: null,
      formData: {
        qaId: '',
        question: '',
        userName: '',
        askDt: '',
        answer: '',
        answerId: '',
        answerName: '',
        answerDt: '',
        answerStatusCode: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        question:
          [
            {max: 3000, message: '最多能输入3000个字', trigger: 'blur'},

          ],
        userId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        userName:
          [
            {max: 64, message: '最多能输入64个字', trigger: 'blur'},

          ],
        askDt:
          [],
        answer:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        answerId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        answerName:
          [
            {max: 64, message: '最多能输入64个字', trigger: 'blur'},

          ],
        answerDt:
          [],
        answerStatusCode:
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
    this.getDetail(this.$route.params.id)
    commonApi.getCodeIntType('answerStatus').then(res => {
      let viewList = res.data.data || []
      for (let answerStatusItem of viewList) {
        this.answerStatusCodeOptions.push({
          'label': answerStatusItem.codeDesc,
          'name': answerStatusItem.codeId
        })
      }
    })
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
    }
  }
}
</script>
<style lang="scss" scoped>
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
