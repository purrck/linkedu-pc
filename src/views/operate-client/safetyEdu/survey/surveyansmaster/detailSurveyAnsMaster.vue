<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="问卷 *  :" prop="surveyId">
              <el-input class="input-v2-rao" v-model="formData.surveyId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户提交问卷信息 *  :" prop="answerId">
              <el-input class="input-v2-rao" v-model="formData.answerId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提交状态 *  :" prop="answerStatus">
              <el-input class="input-v2-rao" v-model="formData.answerStatus"
                        maxlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="参与人 :" prop="participantId">
              <el-input class="input-v2-rao" v-model="formData.participantId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="参与人邮箱 :" prop="participantEmail">
              <el-input class="input-v2-rao" v-model="formData.participantEmail"
                        maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="名 :" prop="firstName">
              <el-input class="input-v2-rao" v-model="formData.firstName"
                        maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="姓 :" prop="lastName">
              <el-input class="input-v2-rao" v-model="formData.lastName"
                        maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关联实体 :" prop="entityId">
              <el-input class="input-v2-rao" v-model="formData.entityId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="提交状态 *  :" prop="answerStatus">
              <el-input class="input-v2-rao" v-model="formData.answerStatus"
                        maxlength="1"></el-input>
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
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.answerStatus">
                    <el-form-item label="提交状态 :" prop="answerStatus">
                      <span v-if="formData.answerStatus">{{formData.answerStatus}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.firstName">
                    <el-form-item label="名 :" prop="firstName">
                      <span v-if="formData.firstName">{{formData.firstName}}</span>
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
import api from './surveyansmasterUrl'
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
        answerId: '',
        answerStatus: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        surveyId:
          [
            {required: true, message: '请您输入问卷', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        answerStatus:
          [
            {required: true, message: '请您输入提交状态', trigger: 'blur'},
            {max: 1, message: '最多能输入1个字', trigger: 'blur'},

          ],
        participantId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        participantEmail:
          [
            {max: 200, message: '最多能输入200个字', trigger: 'blur'},
            {validator: validation.email, trigger: 'blur'},

          ],
        firstName:
          [
            {max: 100, message: '最多能输入100个字', trigger: 'blur'},

          ],
        lastName:
          [
            {max: 100, message: '最多能输入100个字', trigger: 'blur'},

          ],
        entityId:
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
