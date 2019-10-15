<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class=""
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
          <el-col :span="12">
            <el-form-item label="栏目 :" prop="columnName">
              <el-select v-model="formData.columnId">
                <el-option v-for="(item, index) of columnNames" :key="index" :label="item.columnName" :value="item.columnId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板名称 :" prop="tempName">
              <el-input v-model="formData.tempName" placeholder="模板名称"></el-input>
            </el-form-item>
          </el-col>


          <!--<el-col :span="24">-->
            <!--<el-form-item label="预览图片 :" prop="imagePath">-->
              <!--&lt;!&ndash;<template v-for="(item,index) of formData.imagePathList">&ndash;&gt;-->
              <!--&lt;!&ndash;<upload :key="index" @uploadData="uploadData" :imagelist="[item]"/>&ndash;&gt;-->
              <!--&lt;!&ndash;</template>&ndash;&gt;-->
              <!--<upload @uploadData="uploadData" :imagelist="formData.imagePath"/>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="版本 *  :" prop="tempVersion">
              <el-input v-model="formData.tempVersion"  placeholder="版本" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="当前应用 *  :" prop="isCurrent">
              <el-select v-model="formData.isCurrent" placeholder="请您选择">
                <el-option v-for="isCurrentItem in ynOptions" :key="isCurrentItem.name"
                           :label="isCurrentItem.label" :value="isCurrentItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="应用时间 :" prop="appliedDt">
              <el-date-picker v-model="formData.appliedDt"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm"
                              placeholder="选择日期"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="模板内容 :" prop="content">
              <editor v-model="formData.content" :true-height="350"></editor>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class=""
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="12">
            <el-form-item label="栏目 :" prop="columnName">
              <el-select v-model="formData.columnId">
                <el-option v-for="(item, index) of columnNames" :key="index" :label="item.columnName" :value="item.columnId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="模板名称 :" prop="tempName">
              <el-input v-model="formData.tempName" placeholder="模板名称"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
            <!--<el-form-item label="预览图片 :" prop="imagePathList">-->
              <!--<upload v-on:uploadData="uploadData" :imagelist="formData.imagePathList"/>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="当前应用 *  :" prop="isCurrent">
              <el-select v-model="formData.isCurrent" placeholder="请您选择">
                <el-option v-for="isCurrentItem in ynOptions" :key="isCurrentItem.name"
                           :label="isCurrentItem.label" :value="isCurrentItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="模板内容 :" prop="content">
              <editor v-model="formData.content" :true-height="350"></editor>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'" class='mh500'>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="" label-width="165px"
                     :inline="true" :model="formData" size="small">

              <el-col :span="12" v-if="formData.columnName">
                <el-form-item label="栏目 :" prop="columnName">
                  {{formData.columnName}}
                </el-form-item>
              </el-col>


              <!--<el-col :span="24" v-if="formData.imagePathList.length">-->
                <!--<el-form-item label="预览图片 :" prop="imagePathList">-->
                  <!--<img :src="formData.imagePathList[0]" alt="" width="100px">-->
                <!--</el-form-item>-->
              <!--</el-col>-->


              <el-col :span="12" v-if="formData.tempVersion">
                <el-form-item label="版本 :" prop="tempVersion">
                  {{formData.tempVersion}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.isCurrent">
                <el-form-item label="当前应用 :" prop="isCurrent">
                  <el-switch v-model="formData.isCurrent == 'Y'" disabled></el-switch>
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.usedTimes">
                <el-form-item label="使用次数 :" prop="usedTimes">
                  {{formData.usedTimes}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.appliedDt">
                <el-form-item label="应用时间 :" prop="appliedDt">
                  {{formData.appliedDt}}
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="formData.content">
                <el-form-item label="模板内容 :" prop="content">
                  <div v-html="formData.content"></div>
                </el-form-item>
              </el-col>


            </el-form>
          </el-col>

        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
import api from './publishtemplateUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'

export default {
  data () {
    return {
      columnNames: [],
      xuantian: false, //选填信息
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),
      imagePathFileList: [],
      imagePathFileType: '',
      ynOptions: [{'label': '全部', 'name': ''}], isCurrent: null,
      formData: {
        columnId: '',
        tempId: '',
        imagePath: '',
        isCurrent: '',
        content: '',
        imagePathList: []
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        columnId: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        columnName: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        imagePath: [],
        tempVersion: [
          {required: true, message: '请您输入版本', trigger: 'blur'},
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        isCurrent: [
          {required: true, message: '请您输入当前应用', trigger: 'blur'},
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        appliedDt: [],
        content: [],
      }
    }
  },
  computed: {

    pageState () {
      return this.$route.params.type
    }
  },
  components: {editor, upload},
  created () {
    api.getColumnSelect().then(res => {
      this.columnNames = res.data.data
    })
    this.getDetail(this.$route.params.id)
    commonApi.getCodeIntType('boolean_yn').then(res => {
      let viewList = res.data.data || [] || []
      for (let ynItem of viewList) {
        this.ynOptions.push({
          'label': ynItem.codeDesc,
          'name': ynItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
  },
  methods: {
    //图片上传
    uploadData (res) {
      console.log(res)
      this.formData.imagePath = res
    },
    //编辑器
    getEditorValue (val) {
      this.formData.content = val
    },
    //选填信息
    xuantianHandler () {
      this.xuantian = this.xuantian ? false : true
    },
    submit (formName) {
      const set = this.$refs
      this.isLoaded = true
      set[formName].validate(valid => {
        if (this.pageState === 'edit' && valid) {
            this.formLoading = true
            this.formLoading = true
          // this.formData.imagePathList = [this.formData.imagePath]
          delete this.formData.imagePath
          api.putObj(this.formData).then(res => {

            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              ()
            } else {
              //this.$message.error(res.data.message);
              this.formLoading = false
            }
          }, res => {
            this.$message.error('加载失败')
            this.formLoading = false
          })
        } else if (this.pageState === 'add' && valid) {
        this.formLoading = true
          delete this.formData.tempId
          // this.formData.imagePathList.push(this.formData.imagePath)
          // this.formData.imagePathList = []
          delete this.formData.imagePath
          this.columnNames.forEach(item => {
            if (item.columnId === this.formData.columnId) {
              this.formData.columnName = item.columnName
            }
          })
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
                this.$router.go(-1)
              ()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
          }, res => {
            this.$message.error('加载失败')
            this.formLoading = false
          })
        }
      })
      this.isLoaded = false

    },


    imagePathRemove (file, fileList) {
    },

    imagePathSucc (response, file) {
      this.formData.imagePath = response.data.data
    },


    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.formData = res.data.data

            if (this.data.imagePath != '' && this.data.imagePath != null) {
              var imagePathFileInfo = {
                'name': this.data.imagePath,
                'url': this.data.imagePath
              }
              this.imagePathFileList.push(imagePathFileInfo)
            }


            this.formData.appliedDt = this.data.appliedDt


          }
          this.isLoaded = false
        }, res => {
          this.$message.error(res.message)
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






  .ml80 {
    margin-left: 80px;
  }


</style>
