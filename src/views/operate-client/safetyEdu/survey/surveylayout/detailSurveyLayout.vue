<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="问卷头部内容 :" prop="headerTextId">
              <el-input class="input-v2-rao" v-model="formData.headerTextId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问卷底部内容 :" prop="footerTextId">
              <el-input class="input-v2-rao" v-model="formData.footerTextId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问卷提交显示内容 :" prop="exitMessageTextId">
              <el-input class="input-v2-rao" v-model="formData.exitMessageTextId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="背景色 :" prop="bgRgb">
              <el-input class="input-v2-rao" v-model="formData.bgRgb"
                        maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="字体颜色 :" prop="fgRgb">
              <el-input class="input-v2-rao" v-model="formData.fgRgb"
                        maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文字风格 :" prop="fontStyle">
              <el-input class="input-v2-rao" v-model="formData.fontStyle"
                        maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="问卷头部内容 :" prop="headerTextId">
              <el-input class="input-v2-rao" v-model="formData.headerTextId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问卷底部内容 :" prop="footerTextId">
              <el-input class="input-v2-rao" v-model="formData.footerTextId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问卷提交显示内容 :" prop="exitMessageTextId">
              <el-input class="input-v2-rao" v-model="formData.exitMessageTextId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="背景色 :" prop="bgRgb">
              <el-input class="input-v2-rao" v-model="formData.bgRgb"
                        maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="字体颜色 :" prop="fgRgb">
              <el-input class="input-v2-rao" v-model="formData.fgRgb"
                        maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文字风格 :" prop="fontStyle">
              <el-input class="input-v2-rao" v-model="formData.fontStyle"
                        maxlength="30"></el-input>
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
                  <div class="p50" v-if="formData.headerTextId">
                    <el-form-item label="问卷头部内容 :" prop="headerTextId">
                      <span v-if="formData.headerTextId">{{formData.headerTextId}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.footerTextId">
                    <el-form-item label="问卷底部内容 :" prop="footerTextId">
                      <span v-if="formData.footerTextId">{{formData.footerTextId}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.exitMessageTextId">
                    <el-form-item label="问卷提交显示内容 :" prop="exitMessageTextId">
                      <span v-if="formData.exitMessageTextId">{{formData.exitMessageTextId}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.bgRgb">
                    <el-form-item label="背景色 :" prop="bgRgb">
                      <span v-if="formData.bgRgb">{{formData.bgRgb}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.fgRgb">
                    <el-form-item label="字体颜色 :" prop="fgRgb">
                      <span v-if="formData.fgRgb">{{formData.fgRgb}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.fontStyle">
                    <el-form-item label="文字风格 :" prop="fontStyle">
                      <span v-if="formData.fontStyle">{{formData.fontStyle}}</span>
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
import api from './surveylayoutUrl'
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
        headerTextId: '',
        footerTextId: '',
        exitMessageTextId: '',
        bgRgb: '',
        fgRgb: '',
        fontStyle: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        headerTextId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        footerTextId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        exitMessageTextId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        bgRgb:
          [
            {max: 6, message: '最多能输入6个字', trigger: 'blur'},

          ],
        fgRgb:
          [
            {max: 6, message: '最多能输入6个字', trigger: 'blur'},

          ],
        fontStyle:
          [
            {max: 30, message: '最多能输入30个字', trigger: 'blur'},

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
