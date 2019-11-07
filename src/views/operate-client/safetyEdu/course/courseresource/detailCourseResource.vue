<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="课程 *  :" prop="courseId">
              <el-input class="input-v2-rao" v-model="formData.courseId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="资源名称 :" prop="name">
              <el-input class="input-v2-rao" v-model="formData.name"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述 :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址 :" prop="url">
              <el-input class="input-v2-rao" v-model="formData.url"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文件附件 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学习要求 :" prop="studyRequest"
                          class="orgIntroduction">
              <editor v-model="formData.studyRequest" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学习目标 :" prop="studyTarget"
                          class="orgIntroduction">
              <editor v-model="formData.studyTarget" :true-height="350"/>
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
            <el-form-item label="资源名称 :" prop="name">
              <el-input class="input-v2-rao" v-model="formData.name"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述 :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="地址 :" prop="url">
              <el-input class="input-v2-rao" v-model="formData.url"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文件附件 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学习要求 :" prop="studyRequest"
                          class="orgIntroduction">
              <editor v-model="formData.studyRequest" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学习目标 :" prop="studyTarget"
                          class="orgIntroduction">
              <editor v-model="formData.studyTarget" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="状态 :" prop="status">
              <el-input class="input-v2-rao" v-model="formData.status"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学习人数 :" prop="participateNum">
              <el-input class="input-v2-rao" v-model="formData.participateNum"
                        maxlength="11"></el-input>
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
                  {{formData.name}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.name">
                    <el-form-item label="资源名称 :" prop="name">
                      <span v-if="formData.name">{{formData.name}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.url">
                    <el-form-item label="地址 :" prop="url">
                      <span v-if="formData.url">{{formData.url}}</span>
                    </el-form-item>
                  </div>
                  <div class="p100" v-if="formData.filePath">
                    <el-form-item label="文件附件 :" prop="filePath">
                      <i class="iconfont icon-xls"
                         v-if="filePathFileType=='xls'||filePathFileType=='xlsx'"></i>
                      <i class="iconfont icon-doc"
                         v-if="filePathFileType=='doc'||filePathFileType=='docx'"></i>
                      <i class="iconfont icon-ppt"
                         v-if="filePathFileType=='ppt'||filePathFileType=='pptx'"></i>
                      <i class="iconfont icon-txt"
                         v-if="filePathFileType=='pdf'||filePathFileType=='png'||filePathFileType=='jpg'||filePathFileType=='gif'||filePathFileType=='jpeg'"></i>
                      <i class="iconfont icon-avi"
                         v-if="filePathFileType=='mp4'||filePathFileType=='avi'||filePathFileType=='rmvb'||filePathFileType=='rm'||filePathFileType=='mov'"></i>
                      <i class="iconfont icon-mp3" v-if="filePathFileType=='mp3'"></i>
                      {{formData.filePath}}
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.studyRequest">
                    <el-form-item label="学习要求 :" prop="studyRequest">
                      <span v-if="formData.studyRequest" v-html="formData.studyRequest"></span>
                    </el-form-item>
                  </div>


                  <div class="p100" v-if="formData.studyTarget">
                    <el-form-item label="学习目标 :" prop="studyTarget">
                      <span v-if="formData.studyTarget" v-html="formData.studyTarget"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.participateNum">
                    <el-form-item label="学习人数 :" prop="participateNum">
                      <span v-if="formData.participateNum">{{formData.participateNum}}</span>
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
import api from './courseresourceUrl'
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

      filePathFileList: [],
      filePathFileType: '',
      formData: {
        resourceId: '',
        name: '',
        description: '',
        url: '',
        filePath: '',
        studyRequest: '',
        studyTarget: '',
        status: '',
        participateNum: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        courseId:
          [
            {required: true, message: '请您输入课程', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        name:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        description:
          [
            {max: 2550, message: '最多能输入2550个字', trigger: 'blur'},

          ],
        url:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        filePath:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        studyRequest:
          [
            {max: 2550, message: '最多能输入2550个字', trigger: 'blur'},

          ],
        studyTarget:
          [
            {max: 2550, message: '最多能输入2550个字', trigger: 'blur'},

          ],
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
    getFileMessage (res) {
      let obj = res
      //// console.log('File基本信息');
      //// console.log(obj);
      this.formData.filePath = res.urlurl
      this.formData.url = res.urlurl
      this.formData.sizes = res.size
      this.formData.folderId = this.$route.params.id
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
