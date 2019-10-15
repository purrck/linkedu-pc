<template>
  <div>
    <div class="edit-box">


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">



              <el-col :span="12">
                <el-form-item label="实体 :" prop="entityName">
                  {{formData.entityName}}
                </el-form-item>
              </el-col>



              <el-col :span="12">
                <el-form-item label="用户 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="浏览时间 :" prop="readDt">
                  {{formData.readDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="浏览次数 :" prop="readTimes">
                  {{formData.readTimes}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="离开时间 :" prop="leaveDt">
                  {{formData.leaveDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" >
                <el-form-item label="浏览终端 :" prop="readByAppCode"
                              v-if="formData.readByAppCodeStr"
                              :style="{'color':formData.readByAppCodeStr.split(';')[1]}">
                  {{formData.readByAppCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="实体类型 :" prop="entityType">
                  {{formData.entityType}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="实体类型 :" prop="entityTypeName">
                  {{formData.entityTypeName}}
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
      </div>

    </div>
  </div>
</template>

<script>
import api from './entityreadinfoUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'

export default {
  data () {
    return {
      xuantian: false, //选填信息
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      readByAppCodeOptions: [{'label': '全部', 'name': ''}], readByAppCode: null,
      data: '',
      formData: {
        readId: '',
        readTimes: '',
        leaveDt: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        entityId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        entityName: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        userId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        userName: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        readDt: [],
        readTimes: [
          {validator: validation.number, trigger: 'blur'},

        ],
        leaveDt: [],
        readByAppCode: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        entityType: [
          {max: 64, message: '最多能输入64个字', trigger: 'blur'},

        ],
        entityTypeName: [
          {max: 128, message: '最多能输入128个字', trigger: 'blur'},

        ],
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
    this.getDetail(this.$route.params.id)
    commonApi.getCodeIntType('readByApp').then(res => {
      let viewList = res.data.data || []
      for (let readByAppItem of viewList) {
        this.readByAppCodeOptions.push({
          'label': readByAppItem.codeDesc,
          'name': readByAppItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
  },
  methods: {
    //图片上传
    uploadData (res) {
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
          api.putObj(this.formData).then(res => {

            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
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
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
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


    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.data = res.data.data

            this.formData = res.data.data
          }
          this.isLoaded = false
        }, res => {
          this.$message.error(res.message)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>






  .ml80 {
    margin-left: 80px;
  }


</style>
