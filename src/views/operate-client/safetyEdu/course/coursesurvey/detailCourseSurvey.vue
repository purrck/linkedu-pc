<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="id *  :" prop="surveyId">
              <el-input class="input-v2-rao" v-model="formData.surveyId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问卷标题 :" prop="surveyName">
              <el-input class="input-v2-rao" v-model="formData.surveyName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布人 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布时间 :" prop="publishedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.publishedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="起始时间 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="截止时间 :" prop="expiryDt">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述 :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="总分 :" prop="score">
              <el-input class="input-v2-rao" v-model="formData.score"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平均分 :" prop="average">
              <el-input class="input-v2-rao" v-model="formData.average"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已提交人数 :" prop="doneNum">
              <el-input class="input-v2-rao" v-model="formData.doneNum"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="status">
              <el-input class="input-v2-rao" v-model="formData.status"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="id *  :" prop="surveyId">
              <el-input class="input-v2-rao" v-model="formData.surveyId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问卷标题 :" prop="surveyName">
              <el-input class="input-v2-rao" v-model="formData.surveyName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布人 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布时间 :" prop="publishedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.publishedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="起始时间 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="截止时间 :" prop="expiryDt">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述 :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="总分 :" prop="score">
              <el-input class="input-v2-rao" v-model="formData.score"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="平均分 :" prop="average">
              <el-input class="input-v2-rao" v-model="formData.average"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已提交人数 :" prop="doneNum">
              <el-input class="input-v2-rao" v-model="formData.doneNum"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="status">
              <el-input class="input-v2-rao" v-model="formData.status"
                        maxlength="32"></el-input>
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
                  {{formData.surveyName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.surveyName">
                    <el-form-item label="问卷标题 :" prop="surveyName">
                      <span v-if="formData.surveyName">{{formData.surveyName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.userName">
                    <el-form-item label="发布人 :" prop="userName">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="发布时间 :" prop="publishedDt">
                      <span v-if="formData.publishedDt"> {{formData.publishedDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="起始时间 :" prop="effectiveDt">
                      <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="截止时间 :" prop="expiryDt">
                      <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.description">
                    <el-form-item label="描述 :" prop="description">
                      <span v-if="formData.description" v-html="formData.description"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.score">
                    <el-form-item label="总分 :" prop="score">
                      <span v-if="formData.score">{{formData.score}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.average">
                    <el-form-item label="平均分 :" prop="average">
                      <span v-if="formData.average">{{formData.average}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.doneNum">
                    <el-form-item label="已提交人数 :" prop="doneNum">
                      <span v-if="formData.doneNum">{{formData.doneNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.status">
                    <el-form-item label="状态 :" prop="status">
                      <span v-if="formData.status">{{formData.status}}</span>
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
import api from './coursesurveyUrl'
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

      formData: {
        surveyId: '',
        surveyId: '',
        surveyName: '',
        userName: '',
        publishedDt: '',
        effectiveDt: '',
        expiryDt: '',
        description: '',
        score: '',
        average: '',
        doneNum: '',
        status: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        surveyName:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        userName:
          [
            {max: 64, message: '最多能输入64个字', trigger: 'blur'},

          ],
        publishedDt:
          [],
        effectiveDt:
          [],
        expiryDt:
          [],
        description:
          [
            {max: 2000, message: '最多能输入2000个字', trigger: 'blur'},

          ],
        score:
          [],
        average:
          [],
        doneNum:
          [],
        status:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

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
