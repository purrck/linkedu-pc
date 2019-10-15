<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="安全事故 *  :" prop="accidentTitle">
              <el-input class="input-v2-rao" v-model="formData.accidentTitle"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故内容 *  :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发生时间 *  :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故类型 *  :" prop="accidentTypeCode">
              <el-select class="select-v2-rao" v-model="formData.accidentTypeCode" placeholder="请您选择">
                <el-option v-for="accidentTypeCodeItem in accidentTypeCodeOptions"
                           :key="accidentTypeCodeItem.name"
                           :label="accidentTypeCodeItem.label" :value="accidentTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故级别 *  :" prop="accidentLevelCode">
              <el-select class="select-v2-rao" v-model="formData.accidentLevelCode" placeholder="请您选择">
                <el-option v-for="accidentLevelCodeItem in accidentLevelCodeOptions"
                           :key="accidentLevelCodeItem.name"
                           :label="accidentLevelCodeItem.label" :value="accidentLevelCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故状态 *  :" prop="accidentStatusCode">
              <el-select class="select-v2-rao" v-model="formData.accidentStatusCode" placeholder="请您选择">
                <el-option v-for="accidentStatusCodeItem in accidentStatusCodeOptions"
                           :key="accidentStatusCodeItem.name"
                           :label="accidentStatusCodeItem.label" :value="accidentStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发生地点 :" prop="happenedAddress">
              <el-input class="input-v2-rao" v-model="formData.happenedAddress"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接收人 :" prop="acceptedUserId">
              <el-input class="input-v2-rao" v-model="formData.acceptedUserId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接收人 :" prop="acceptedUserName">
              <el-input class="input-v2-rao" v-model="formData.acceptedUserName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="安全事故 *  :" prop="accidentTitle">
              <el-input class="input-v2-rao" v-model="formData.accidentTitle"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故内容 *  :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="发生时间 *  :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理截止时间 :" prop="expiryDt">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故类型 *  :" prop="accidentTypeCode">
              <el-select class="select-v2-rao" v-model="formData.accidentTypeCode" placeholder="请您选择">
                <el-option v-for="accidentTypeCodeItem in accidentTypeCodeOptions"
                           :key="accidentTypeCodeItem.name"
                           :label="accidentTypeCodeItem.label" :value="accidentTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故级别 *  :" prop="accidentLevelCode">
              <el-select class="select-v2-rao" v-model="formData.accidentLevelCode" placeholder="请您选择">
                <el-option v-for="accidentLevelCodeItem in accidentLevelCodeOptions"
                           :key="accidentLevelCodeItem.name"
                           :label="accidentLevelCodeItem.label" :value="accidentLevelCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事故状态 *  :" prop="accidentStatusCode">
              <el-select class="select-v2-rao" v-model="formData.accidentStatusCode" placeholder="请您选择">
                <el-option v-for="accidentStatusCodeItem in accidentStatusCodeOptions"
                           :key="accidentStatusCodeItem.name"
                           :label="accidentStatusCodeItem.label" :value="accidentStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发生地点 :" prop="happenedAddress">
              <el-input class="input-v2-rao" v-model="formData.happenedAddress"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理结果 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col style="display: flex;align-items: center;justify-content: flex-end;margin-bottom: 20px;">
            <el-button size="small" type="primary" @click="$router.push(`/safety/listSecurityAccidentStudentV2?accidentId=${formData.accidentId}&accidentTitle=${formData.accidentTitle}`)">事故学生({{this.formData.studentNum}})</el-button>
            <el-button size="small" type="primary" @click="$router.push(`/safety/listSecurityAccidentProcessV2?accidentId=${formData.accidentId}&accidentTitle=${formData.accidentTitle}`)">事故事故处理({{this.formData.processNum}})</el-button>
          </el-col>
          <el-col>

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  问题名称
                </div>
                <div class="detail-item-v2">
                  <div class="p33">
                    <el-form-item label="事故状态 :" prop="accidentStatusCode">
                            <span v-if="formData.accidentStatusCodeStr"
                                  :style="{'color':formData.accidentStatusCodeStr.split(';')[1]}">{{formData.accidentStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33" v-if="formData.acceptedUserName">
                    <el-form-item label="报告对象 :" prop="content">
                      <span v-if="formData.acceptedUserName" v-html="formData.acceptedUserName"></span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="事故类型 :" prop="accidentTypeCode">
                            <span v-if="formData.accidentTypeCodeStr"
                                  :style="{'color':formData.accidentTypeCodeStr.split(';')[1]}">{{formData.accidentTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>


                  <div class="p33">
                    <el-form-item label="事故级别 :" prop="accidentLevelCode">
                            <span v-if="formData.accidentLevelCodeStr"
                                  :style="{'color':formData.accidentLevelCodeStr.split(';')[1]}">{{formData.accidentLevelCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="上报时间 :" prop="accidentLevelCode">
                            <span v-if="formData.effectiveDt">{{formData.effectiveDt}}</span>
                    </el-form-item>
                  </div>

                  <!--<div class="p50" v-if="formData.happenedAddress">-->
                  <!--<el-form-item label="发生地点 :" prop="happenedAddress">-->
                  <!--<span v-if="formData.happenedAddress">{{formData.happenedAddress}}</span>-->
                  <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="p50" v-if="formData.acceptedUserName">-->
                  <!--<el-form-item label="接收人 :" prop="acceptedUserName">-->
                  <!--<span v-if="formData.acceptedUserName">{{formData.acceptedUserName}}</span>-->
                  <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="p100" v-if="formData.filePath">-->
                  <!--<el-form-item label="处理结果 :" prop="filePath">-->
                  <!--<i class="iconfont icon-xls"-->
                  <!--v-if="filePathFileType=='xls'||filePathFileType=='xlsx'"></i>-->
                  <!--<i class="iconfont icon-doc"-->
                  <!--v-if="filePathFileType=='doc'||filePathFileType=='docx'"></i>-->
                  <!--<i class="iconfont icon-ppt"-->
                  <!--v-if="filePathFileType=='ppt'||filePathFileType=='pptx'"></i>-->
                  <!--<i class="iconfont icon-txt"-->
                  <!--v-if="filePathFileType=='pdf'||filePathFileType=='png'||filePathFileType=='jpg'||filePathFileType=='gif'||filePathFileType=='jpeg'"></i>-->
                  <!--<i class="iconfont icon-avi"-->
                  <!--v-if="filePathFileType=='mp4'||filePathFileType=='avi'||filePathFileType=='rmvb'||filePathFileType=='rm'||filePathFileType=='mov'"></i>-->
                  <!--<i class="iconfont icon-mp3" v-if="filePathFileType=='mp3'"></i>-->
                  <!--{{formData.filePath}}-->
                  <!--</el-form-item>-->
                  <!--</div>-->
                </div>
              </div>

              <div class="p100">
                <div class="detail-title-v2 ">
                  问题描述
                </div>
                <div class="detail-item-v2">
                  <div class="">
                    {{formData.content}}
                  </div>
                </div>
              </div>

              <div class="p100">
                <div class="detail-title-v2 ">
                  现场图片
                </div>
                <div class="detail-item-v2">
                  <img style="width: 200px;height: 200px" :src="item" v-if="formData.imagePathList" :alt="item" v-for="(item,index) of formData.imagePathList" :key="index">
                  <img style="width: 200px;height: 200px" :src="formData.imagePath" v-if="formData.imagePath" :key="index">
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
import api from './schoolsecurityaccidentUrl'
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

      accidentTypeCodeOptions: [{'label': '全部', 'name': ''}], accidentTypeCode: null,
      accidentLevelCodeOptions: [{'label': '全部', 'name': ''}], accidentLevelCode: null,
      accidentStatusCodeOptions: [{'label': '全部', 'name': ''}], accidentStatusCode: null,
      filePathFileList: [],
      filePathFileType: '',
      formData: {
        accidentId: '',
        accidentTitle: '',
        content: '',
        effectiveDt: '',
        expiryDt: '',
        accidentTypeCode: '',
        accidentLevelCode: '',
        accidentStatusCode: '',
        happenedAddress: '',
        filePath: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        accidentTitle:
          [
            {required: true, message: '请您输入安全事故', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        content:
          [
            {required: true, message: '请您输入事故内容', trigger: 'blur'},
            {max: 4000, message: '最多能输入4000个字', trigger: 'blur'},

          ],
        effectiveDt:
          [
            {required: true, message: '请您输入发生时间', trigger: 'blur'},

          ],
        accidentTypeCode:
          [
            {required: true, message: '请您输入事故类型', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        accidentLevelCode:
          [
            {required: true, message: '请您输入事故级别', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        accidentStatusCode:
          [
            {required: true, message: '请您输入事故状态', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        happenedAddress:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        acceptedUserId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        acceptedUserName:
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
    commonApi.getCodeIntType('accidentType').then(res => {
      let viewList = res.data.data || []
      for (let accidentTypeItem of viewList) {
        this.accidentTypeCodeOptions.push({
          'label': accidentTypeItem.codeDesc,
          'name': accidentTypeItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('accidentLevel').then(res => {
      let viewList = res.data.data || []
      for (let accidentLevelItem of viewList) {
        this.accidentLevelCodeOptions.push({
          'label': accidentLevelItem.codeDesc,
          'name': accidentLevelItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('accidentStatus').then(res => {
      let viewList = res.data.data || []
      for (let accidentStatusItem of viewList) {
        this.accidentStatusCodeOptions.push({
          'label': accidentStatusItem.codeDesc,
          'name': accidentStatusItem.codeId
        })
      }
    })
  },
  methods: {
    test(e) {
      console.log(e)
      this.$router.push(e)
    },
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
