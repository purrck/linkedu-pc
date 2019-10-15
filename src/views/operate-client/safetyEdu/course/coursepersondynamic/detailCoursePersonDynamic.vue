<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="活动类型 :" prop="entityTypeCode">
              <el-select class="select-v2-rao" v-model="formData.entityTypeCode" placeholder="请您选择">
                <el-option v-for="entityTypeCodeItem in entityTypeCodeOptions"
                           :key="entityTypeCodeItem.name"
                           :label="entityTypeCodeItem.label" :value="entityTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="浏览时间 :" prop="readDt">
              <el-date-picker class="date-v2-rao" v-model="formData.readDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="浏览次数 :" prop="readTimes">
              <el-input class="input-v2-rao" v-model="formData.readTimes"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提交时间 :" prop="commitDt">
              <el-date-picker class="date-v2-rao" v-model="formData.commitDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="批改时间 :" prop="correctDt">
              <el-date-picker class="date-v2-rao" v-model="formData.correctDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="pdstatusCode">
              <el-select class="select-v2-rao" v-model="formData.pdstatusCode" placeholder="请您选择">
                <el-option v-for="pdstatusCodeItem in pdstatusCodeOptions"
                           :key="pdstatusCodeItem.name"
                           :label="pdstatusCodeItem.label" :value="pdstatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="总分数 :" prop="score">
              <el-input class="input-v2-rao" v-model="formData.score"
                        maxlength="22"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="活动类型 :" prop="entityTypeCode">
              <el-select class="select-v2-rao" v-model="formData.entityTypeCode" placeholder="请您选择">
                <el-option v-for="entityTypeCodeItem in entityTypeCodeOptions"
                           :key="entityTypeCodeItem.name"
                           :label="entityTypeCodeItem.label" :value="entityTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="浏览时间 :" prop="readDt">
              <el-date-picker class="date-v2-rao" v-model="formData.readDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="浏览次数 :" prop="readTimes">
              <el-input class="input-v2-rao" v-model="formData.readTimes"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提交时间 :" prop="commitDt">
              <el-date-picker class="date-v2-rao" v-model="formData.commitDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="批改时间 :" prop="correctDt">
              <el-date-picker class="date-v2-rao" v-model="formData.correctDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="pdstatusCode">
              <el-select class="select-v2-rao" v-model="formData.pdstatusCode" placeholder="请您选择">
                <el-option v-for="pdstatusCodeItem in pdstatusCodeOptions"
                           :key="pdstatusCodeItem.name"
                           :label="pdstatusCodeItem.label" :value="pdstatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="总分数 :" prop="score">
              <el-input class="input-v2-rao" v-model="formData.score"
                        maxlength="22"></el-input>
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
                  {{formData.entityTypeCode}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50">
                    <el-form-item label="活动类型 :" prop="entityTypeCode">
                            <span v-if="formData.entityTypeCodeStr"
                                  :style="{'color':formData.entityTypeCodeStr.split(';')[1]}">{{formData.entityTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.userName">
                    <el-form-item label="用户 :" prop="userName">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="浏览时间 :" prop="readDt">
                      <span v-if="formData.readDt"> {{formData.readDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.readTimes">
                    <el-form-item label="浏览次数 :" prop="readTimes">
                      <span v-if="formData.readTimes">{{formData.readTimes}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="提交时间 :" prop="commitDt">
                      <span v-if="formData.commitDt"> {{formData.commitDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="批改时间 :" prop="correctDt">
                      <span v-if="formData.correctDt"> {{formData.correctDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="状态 :" prop="pdstatusCode">
                            <span v-if="formData.pdstatusCodeStr"
                                  :style="{'color':formData.pdstatusCodeStr.split(';')[1]}">{{formData.pdstatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.score">
                    <el-form-item label="总分数 :" prop="score">
                      <span v-if="formData.score">{{formData.score}}</span>
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
import api from './coursepersondynamicUrl'
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

      entityTypeCodeOptions: [{'label': '全部', 'name': ''}], entityTypeCode: null,
      pdstatusCodeOptions: [{'label': '全部', 'name': ''}], pdstatusCode: null,
      formData: {
        dynamicId: '',
        entityTypeCode: '',
        userName: '',
        readDt: '',
        readTimes: '',
        commitDt: '',
        correctDt: '',
        pdstatusCode: '',
        score: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        entityTypeCode:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        userName:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        readDt:
          [],
        readTimes:
          [],
        commitDt:
          [],
        correctDt:
          [],
        pdstatusCode:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        score:
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
    commonApi.getCodeIntType('entityType').then(res => {
      let viewList = res.data.data || []
      for (let entityTypeItem of viewList) {
        this.entityTypeCodeOptions.push({
          'label': entityTypeItem.codeDesc,
          'name': entityTypeItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('pdstatus').then(res => {
      let viewList = res.data.data || []
      for (let pdstatusItem of viewList) {
        this.pdstatusCodeOptions.push({
          'label': pdstatusItem.codeDesc,
          'name': pdstatusItem.codeId
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
