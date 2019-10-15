<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="消息标题 :" prop="messageTitle">
              <el-input v-model="formData.messageTitle" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="消息内容 :" prop="messageContent">
              <el-input v-model="formData.messageContent" maxlength="4000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="发送时间 :" prop="sendDt">
              <el-date-picker v-model="formData.sendDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="接收时间 :" prop="readDt">
              <el-date-picker v-model="formData.readDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="已读 :" prop="isRead">
              <el-select v-model="formData.isRead" placeholder="请您选择">
                <el-option v-for="isReadItem in ynOptions" :key="isReadItem.name"
                           :label="isReadItem.label" :value="isReadItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">-->
            <!--<el-form-item label="用户 :" prop="userId">-->
              <!--<el-input v-model="formData.userId" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="用户 :" prop="userName">-->
              <!--<el-input v-model="formData.userName" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="消息类型 :" prop="messageTypeCode">
              <el-select v-model="formData.messageTypeCode" placeholder="请您选择">
                <el-option v-for="messageTypeCodeItem in messageTypeCodeOptions"
                           :key="messageTypeCodeItem.name"
                           :label="messageTypeCodeItem.label" :value="messageTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>
      <div v-if="pageState === 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="消息 :" prop="messageTitle">
              <el-input v-model="formData.messageTitle" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="接收时间 :" prop="readDt">
              <el-date-picker v-model="formData.readDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="已读 :" prop="isRead">
              <el-select v-model="formData.isRead" placeholder="请您选择">
                <el-option v-for="isReadItem in ynOptions" :key="isReadItem.name"
                           :label="isReadItem.label" :value="isReadItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     ref="formData" :inline="true" :model="formData" :rules="rules" size="small">

              <el-col :span="12" v-if="data.messageTitle">
                <el-form-item label="消息 :" prop="messageTitle">
                  {{data.messageTitle}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.messageContent">
                <el-form-item label="消息内容 :" prop="messageContent">
                  {{data.messageContent}}
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="发送时间 :" prop="sendDt">
                  {{data.sendDt }}
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="接收时间 :" prop="readDt">
                  {{data.readDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="已读 :" prop="isRead">
                  <div>
                    <el-switch v-model="data.isRead == 'Y'" disabled></el-switch>
                  </div>

                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="data.userName">
                <el-form-item label="用户 :" prop="userName">
                  {{data.userName}}
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="消息类型 :" prop="messageTypeCode">
                  {{data.messageTypeCode}}
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">

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
import api from './systemmessageUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'

export default {
  data () {
    return {
      offSwitchStatus: false,
      onSwitchStatus: true,
      xuantian: false, //选填信息
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      ynOptions: [{'label': '全部', 'name': ''}], isRead: null,
      messageTypeCodeOptions: [{'label': '全部', 'name': ''}], messageTypeCode: null,
      data: '',
      formData: {
        messageId: '',
        messageTitle: '',
        readDt: '',
        isRead: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        messageTitle: [
          {max: 128, message: '只能输入128个字', trigger: 'blur'},
        ],
        messageContent: [
          {max: 4000, message: '只能输入4000个字', trigger: 'blur'},
        ],
        sendDt: [],
        readDt: [],
        isRead: [
          {max: 2, message: '只能输入2个字', trigger: 'blur'},
        ],
        userId: [
          {max: 32, message: '只能输入32个字', trigger: 'blur'},
        ],
        userName: [
          {max: 32, message: '只能输入32个字', trigger: 'blur'},
        ],
        messageTypeCode: [
          {max: 32, message: '只能输入32个字', trigger: 'blur'},
        ],
      }
    }
  },
  computed: {

    pageState () {
      return this.$route.params.type
    }
  },
  components: {editor},
  created () {
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
     commonApi.getCodeIntType('messageType').then(res => {
      let viewList = res.data.data || [] || []
      for (let messageTypeItem of viewList) {
        this.messageTypeCodeOptions.push({
          'label': messageTypeItem.codeDesc,
          'name': messageTypeItem.codeId
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
        if (this.pageState === 'edit') {
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
        } else if (this.pageState === 'add') {
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
            console.info(res)
            this.data = res.data.data
            this.formData.messageTitle = this.data.messageTitle
            this.formData.readDt = this.data.readDt
            this.formData.sendDt = this.data.sendDt
            this.formData.isRead = this.data.isRead
            this.formData.version = this.data.version
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
