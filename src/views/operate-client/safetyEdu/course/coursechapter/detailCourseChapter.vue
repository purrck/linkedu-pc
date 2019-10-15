<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="课时名称 :" prop="chapterName">
              <el-input class="input-v2-rao" v-model="formData.title"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="课时类型 :" prop="courseId">

              <el-select v-model="formData.securityEducationTypeCode" placeholder="请选择课时类型">
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
            <el-form-item label="添加视频 :" prop="courseName">
              <!--<upload v-model="formData.accessPath"></upload>-->
              <duozhang-upload v-model="formData.accessPath"></duozhang-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="内容描述 :" prop="sectionTypeName">
              <editor v-model="formData.description" :true-height="350"></editor>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="课时名称 :" prop="chapterName">
              <el-input class="input-v2-rao" v-model="formData.title"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="课时类型 :" prop="courseId">

              <el-select v-model="formData.securityEducationTypeCode" placeholder="请选择课时类型">
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
            <el-form-item label="添加视频 :" prop="courseName">
              <!--<upload v-model="formData.accessPath"></upload>-->
              <duozhang-upload v-model="formData.accessPath"></duozhang-upload>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="内容描述 :" prop="sectionTypeName">
              <editor v-model="formData.description" :true-height="350"></editor>
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
                <div class="detail-item-v2">
                  <div class="p100" v-if="formData.title">
                    <el-form-item label="课时名称 :" prop="title">
                      <span v-if="formData.title">{{formData.title}}</span>
                    </el-form-item>
                  </div>
                  <div class="p100" v-if="formData.sequnceNum">
                    <el-form-item label="课时类型 :" prop="sequnceNum">
                      <span v-if="formData.securityEducationTypeCodeStr">{{formData.securityEducationTypeCodeStr&&formData.securityEducationTypeCodeStr.split(";")[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p100">
                    <el-form-item label="课时视频 :" prop="chapterStatusCode">
                      <video style="width: 520px; margin-top: 10px;" controls :src="formData.accessPath"></video>
                    </el-form-item>
                  </div>
                  <div class="p100">
                    <el-form-item label="内容描述 :" prop="sectionTypeCode">
                            <div v-html="formData.description"></div>
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
import api from './coursechapterUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import UploadFile from '@/components/upload/uploadFile'
import Upload from '@/components/upload/upload'
import {coverData} from '@/util/util'
// import upload from '@/components/upload/uploadFile'

export default {
  components: {Upload, UploadFile, editor},
  data () {
    return {
      optionsList: [
        {label: '请选择', value: ''}
      ],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      chapterStatusCodeOptions: [{'label': '全部', 'name': ''}], chapterStatusCode: null,
      sectionTypeCodeOptions: [{'label': '全部', 'name': ''}], sectionTypeCode: null,
      formData: {
        description : "",
        securityEducationTypeCode: '',
        educationResourceStatusCode: 'editing',
        accessPath: [],
        title: ''
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        // chapterName:
        //   [
        //     {required: true, message: '请您输入章名称', trigger: 'blur'},
        //     {max: 64, message: '最多能输入64个字', trigger: 'blur'},
        //
        //   ],
        // courseId:
        //   [
        //     {required: true, message: '请您输入课程id', trigger: 'blur'},
        //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
        //
        //   ],
        // courseName:
        //   [
        //     {required: true, message: '请您输入课程名称', trigger: 'blur'},
        //     {max: 64, message: '最多能输入64个字', trigger: 'blur'},
        //
        //   ],
        // sequnceNum:
        //   [
        //     {required: true, message: '请您输入序号', trigger: 'blur'},
        //     {validator: validation.number, trigger: 'blur'},
        //
        //   ],
        // parentId:
        //   [
        //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
        //
        //   ],
        // chapterStatusCode:
        //   [
        //     {required: true, message: '请您输入状态', trigger: 'blur'},
        //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
        //
        //   ],
        // sectionTypeCode:
        //   [
        //     {required: true, message: '请您输入类型代码', trigger: 'blur'},
        //     {max: 16, message: '最多能输入16个字', trigger: 'blur'},
        //
        //   ],
        // sectionTypeName:
        //   [
        //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
        //
        //   ],
      }
    }
  },
  computed: {
    pageState () {
      return this.$route.query.type
    },
    resourceId(){
      return this.$route.query.resourceId
    }
  },
  created () {
    this.getDetail(this.resourceId)
    // 类型
    let resourceType = this.$route.query.resourceType
    commonApi.getCourseType(resourceType).then(res=>{
      this.optionsList = this.optionsList.concat(coverData(res.data.data, 'name', 'id'))
    })
    // commonApi.getCodeIntType('securityEducationType').then(res => {
    //   this.optionsList = this.optionsList.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
    // })
    // commonApi.getCodeIntType('sectionType').then(res => {
    //   let viewList = res.data.data || []
    //   for (let sectionTypeItem of viewList) {
    //     this.sectionTypeCodeOptions.push({
    //       'label': sectionTypeItem.codeDesc,
    //       'name': sectionTypeItem.codeId
    //     })
    //   }
    // })
  },
  methods: {
    submit (formName) {
      const set = this.$refs
      this.isLoaded = true
      set[formName].validate(valid => {
        if (this.pageState === 'edit' && valid) {
          this.formLoading = true
          api.putObjNew(this.formData).then(res => {
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
          api.addObjNew(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.$message.success('新增成功')
              this.goBack()
            } else {
              this.$message.error(res.data.message)

            }
            this.formLoading = false
          },res => {
            this.formLoading = false
          })
        }
      })
      this.isLoaded = false
    },
    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObjNew(paramsId).then(res => {
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
