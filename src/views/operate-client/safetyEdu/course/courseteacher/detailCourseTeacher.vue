<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="课程 :" prop="courseId">
              <el-input class="input-v2-rao" v-model="formData.courseId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="课程名称 :" prop="courseName">
              <el-input class="input-v2-rao" v-model="formData.courseName"
                        maxlength="128"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教师 :" prop="userId">
              <el-input class="input-v2-rao" v-model="formData.userId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教师 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="职责 :" prop="ctdutyCode">
              <el-select class="select-v2-rao" v-model="formData.ctdutyCode" placeholder="请您选择">
                <el-option v-for="ctdutyCodeItem in ctdutyCodeOptions"
                           :key="ctdutyCodeItem.name"
                           :label="ctdutyCodeItem.label" :value="ctdutyCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="加入时间 :" prop="joinedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.joinedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注 :" prop="remark"
                          class="orgIntroduction">
              <editor v-model="formData.remark" :true-height="350"/>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="教师 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="职责 :" prop="ctdutyCode">
              <el-select class="select-v2-rao" v-model="formData.ctdutyCode" placeholder="请您选择">
                <el-option v-for="ctdutyCodeItem in ctdutyCodeOptions"
                           :key="ctdutyCodeItem.name"
                           :label="ctdutyCodeItem.label" :value="ctdutyCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注 :" prop="remark"
                          class="orgIntroduction">
              <editor v-model="formData.remark" :true-height="350"/>
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
                  {{formData.userName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.userName">
                    <el-form-item label="教师 :" prop="userName">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="职责 :" prop="ctdutyCode">
                            <span v-if="formData.ctdutyCodeStr"
                                  :style="{'color':formData.ctdutyCodeStr.split(';')[1]}">{{formData.ctdutyCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="加入时间 :" prop="joinedDt">
                      <span v-if="formData.joinedDt"> {{formData.joinedDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.remark">
                    <el-form-item label="备注 :" prop="remark">
                      <span v-if="formData.remark" v-html="formData.remark"></span>
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
import api from './courseteacherUrl'
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

      ctdutyCodeOptions: [{'label': '全部', 'name': ''}], ctdutyCode: null,
      formData: {
        courseTeacherId: '',
        userName: '',
        ctdutyCode: '',
        remark: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        courseId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        courseName:
          [
            {max: 128, message: '最多能输入128个字', trigger: 'blur'},

          ],
        userId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        userName:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        ctdutyCode:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        joinedDt:
          [],
        remark:
          [
            {max: 1000, message: '最多能输入1000个字', trigger: 'blur'},

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
    commonApi.getCodeIntType('ctduty').then(res => {
      let viewList = res.data.data || []
      for (let ctdutyItem of viewList) {
        this.ctdutyCodeOptions.push({
          'label': ctdutyItem.codeDesc,
          'name': ctdutyItem.codeId
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
