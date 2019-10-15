<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="事故标题 :" prop="">
              <div>{{$route.query.accidentTitle}}</div>
            </el-form-item>
          </el-col>
          <!---->
          <!--<el-col :span="24">-->
            <!--<el-form-item label=" 处理人:" prop="">-->
              <!--<el-input class="input-v2-rao" v-model="formData.userName"-->
                        <!--maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="24">-->
            <!--<el-form-item label="处理时间 *  :" prop="">-->
              <!--<el-date-picker class="date-v2-rao" v-model="formData.processDt" type="datetime"-->
                              <!--placeholder="选择日期"-->
                              <!--value-format="yyyy-MM-dd HH:mm"-->
                              <!--:picker-options="pickTime">-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="24">
            <el-form-item label="处理内容 *  :" prop="">
              <editor v-model="formData.processContent" :true-height="350"></editor>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="事故标题 :" prop="processTitle">
              <div>{{$route.query.accidentTitle}}</div>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
            <!--<el-form-item label=" 处理人:" prop="processContent">-->
              <!--<el-input class="input-v2-rao" v-model="formData.processContent"-->
                        <!--maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="24">-->
            <!--<el-form-item label="处理时间 *  :" prop="processDt">-->
              <!--<el-date-picker class="date-v2-rao" v-model="formData.processDt" type="datetime"-->
                              <!--placeholder="选择日期"-->
                              <!--value-format="yyyy-MM-dd HH:mm"-->
                              <!--:picker-options="pickTime">-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="24">
            <el-form-item label="处理内容 *  :" prop="processContent">
              <editor v-model="formData.processContent" :true-height="350"></editor>
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
                    <el-form-item label="事故标题 :" prop="processTitle">
                      <span v-if="formData.processTitle">{{formData.processTitle}}</span>
                    </el-form-item>
                  </div>
                  <div class="p33">
                    <el-form-item label="处理人 :" prop="processContent">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p33">
                    <el-form-item label="处理时间 :" prop="processDt">
                      <span v-if="formData.processDt"> {{formData.processDt}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div class="p100">
                <div class="detail-title-v2 ">
                  处理内容
                </div>
                <div class="detail-item-v2">
                  <div v-html="formData.processContent"></div>
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
import api from './schoolsecurityaccidentprocessUrl'
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
        accidentId: this.$route.query.accidentId,
        processTitle: '',
        processContent: '',
        processDt: '',
        sequnceNum: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        processTitle:
          [
            {required: true, message: '请您输入处理', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        processContent:
          [
            {required: true, message: '请您输入处理内容', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        processDt:
          [
            {required: true, message: '请您输入处理时间', trigger: 'blur'},

          ],
        sequnceNum:
          [
            {validator: validation.number, trigger: 'blur'},

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
      margin-right: 0px;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 25px;
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
