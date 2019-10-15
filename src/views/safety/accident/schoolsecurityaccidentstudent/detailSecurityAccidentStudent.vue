<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="年级id :" prop="gradeId">
              <el-input class="input-v2-rao" v-model="formData.gradeId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="年级 :" prop="gradeName">
              <el-input class="input-v2-rao" v-model="formData.gradeName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="班级id :" prop="classId">
              <el-input class="input-v2-rao" v-model="formData.classId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="班级 :" prop="className">
              <el-input class="input-v2-rao" v-model="formData.className"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生id *  :" prop="studentId">
              <el-input class="input-v2-rao" v-model="formData.studentId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生 *  :" prop="studentName">
              <el-input class="input-v2-rao" v-model="formData.studentName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生用户id *  :" prop="studentUserId">
              <el-input class="input-v2-rao" v-model="formData.studentUserId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col>

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  事故信息
                </div>
                <div class="detail-item-v2">
                  <div class="p33">
                    <el-form-item label="年级 :" prop="gradeName">
                      <span v-if="formData.gradeName">{{formData.gradeName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p33">
                    <el-form-item label="班级 :" prop="className">
                      <span v-if="formData.className">{{formData.className}}</span>
                    </el-form-item>
                  </div>
                  <div class="p33">
                    <el-form-item label="学生 :" prop="studentName">
                      <span v-if="formData.studentName">{{formData.studentName}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div class="p100">
                <div class="detail-title-v2 ">
                  事故内容
                </div>
                <div class="detail-item-v2">
                  主楼小广场水管爆裂，自来水公司人员已到达现场正在抢修中，放学途经的师生请走侧走
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
import api from './schoolsecurityaccidentstudentUrl'
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
        accidentStudentId: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        gradeId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        gradeName:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        classId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        className:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        studentId:
          [
            {required: true, message: '请您输入学生id', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        studentName:
          [
            {required: true, message: '请您输入学生', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        studentUserId:
          [
            {required: true, message: '请您输入学生用户id', trigger: 'blur'},
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
