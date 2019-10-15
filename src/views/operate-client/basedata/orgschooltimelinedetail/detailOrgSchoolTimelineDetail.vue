<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="作息详细名称">
              <el-input class="input-v2-rao"  v-model="formData.timelineDetailName" placeholder="作息详细名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开始时间 :" prop="">
              <el-time-picker class="date-v2-rao" v-model="formData.beginTime" value-format="HH:mm" placeholder="开始时间"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="结束时间 :" prop="">
              <el-time-picker   class="date-v2-rao" v-model="formData.endTime" value-format="HH:mm" placeholder="结束时间"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作息类型 :" prop="">
              <el-select class="select-v2-rao" v-model="formData.timelineTypeCode" placeholder="请您选择">
                <el-option v-for="timelineTypeCodeItem in timelineTypeCodeOptions"
                           :key="timelineTypeCodeItem.name"
                           :label="timelineTypeCodeItem.label" :value="timelineTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
            <!--<el-form-item label="描述 :" prop="">-->
              <!--<editor style="width: 520px;" :true-height="350" v-model="formData.description"></editor>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="作息详细名称">
              <el-input class="input-v2-rao"   v-model="formData.timelineDetailName" placeholder="作息详细名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开始时间 :" prop="">
              <el-time-picker  class="date-v2-rao"  v-model="formData.beginTime" value-format="HH:mm" placeholder="开始时间"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="结束时间 :" prop="">
              <el-time-picker class="date-v2-rao" v-model="formData.endTime" value-format="HH:mm" placeholder="结束时间"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作息类型 :" prop="">
              <el-select class="select-v2-rao" v-model="formData.timelineTypeCode" placeholder="请您选择">
                <el-option v-for="timelineTypeCodeItem in timelineTypeCodeOptions"
                           :key="timelineTypeCodeItem.name"
                           :label="timelineTypeCodeItem.label" :value="timelineTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
          <!--<el-form-item label="描述 :" prop="">-->
          <!--<editor style="width: 520px;" :true-height="350" v-model="formData.description"></editor>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

        </el-form>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  {{formData.timelineName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.timelineName">
                    <el-form-item label="学校日常作息 :" prop="timelineName">
                      <span v-if="formData.timelineName">{{formData.timelineName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.beginTime">
                    <el-form-item label="开始时间 :" prop="beginTime">
                      <span v-if="formData.beginTime">{{formData.beginTime}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.endTime">
                    <el-form-item label="结束时间 :" prop="endTime">
                      <span v-if="formData.endTime">{{formData.endTime}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="作息类型 :" prop="timelineTypeCode">
                            <span v-if="formData.timelineTypeCodeStr"
                                  :style="{'color':formData.timelineTypeCodeStr.split(';')[1]}">{{formData.timelineTypeCodeStr.split(';')[0]}}</span>
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
import api from './orgschooltimelinedetailUrl'
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

      timelineTypeCodeOptions: [], timelineTypeCode: null,
      formData: {
        timelineDetailName: '',
        timelineDetailId: '',
        timelineName: '',
        beginTime: '',
        endTime: '',
        timelineTypeCode: '',
        timelineId: ''
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        timelineDetailName:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        timelineId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        timelineName:
          [
            {required: true, message: '请您输入学校日常作息', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        beginTime:
          [
            {required: true, message: '请您输入开始时间', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        endTime:
          [
            {required: true, message: '请您输入结束时间', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        timelineTypeCode:
          [
            {required: true, message: '请您输入作息类型', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        sequnceNum:
          [
            {required: true, message: '请您输入序号', trigger: 'blur'},
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
    let timelineId = this.$route.query.timelineId;
    if(timelineId) {
      this.formData.timelineId = timelineId;
      this.formData.timelineName = this.$route.query.timelineName;
    }else{
      this.getDetail(this.$route.params.id)
    }
    commonApi.getCodeIntType('timelineType').then(res => {
      let viewList = res.data.data || []
      for (let timelineTypeItem of viewList) {
        this.timelineTypeCodeOptions.push({
          'label': timelineTypeItem.codeDesc,
          'name': timelineTypeItem.codeId
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

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
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
