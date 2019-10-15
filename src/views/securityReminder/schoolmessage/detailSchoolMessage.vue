
                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="消息标题 :" prop="messageTitle">
                      <el-input class="input-v2-rao" v-model="formData.messageTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 消息标题 colName:message_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="消息内容 :" prop="messageContent">
                      <el-input class="input-v2-rao" v-model="formData.messageContent"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 消息内容 colName:message_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="需要回执 :" prop="isNeedReply">
                      <el-select class="select-v2-rao" v-model="formData.isNeedReply" placeholder="请您选择">
                        <el-option v-for="isNeedReplyItem in ynOptions" :key="isNeedReplyItem.name"
                                   :label="isNeedReplyItem.label" :value="isNeedReplyItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 需要回执 colName:is_need_reply sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="消息状态 :" prop="schoolMessageStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolMessageStatusCode" placeholder="请您选择">
                        <el-option v-for="schoolMessageStatusCodeItem in schoolMessageStatusCodeOptions"
                                   :key="schoolMessageStatusCodeItem.name"
                                   :label="schoolMessageStatusCodeItem.label" :value="schoolMessageStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 消息状态 colName:school_message_status_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="接收人数 :" prop="toUserNum">
                      <el-input class="input-v2-rao" v-model="formData.toUserNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 接收人数 colName:to_user_num sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="已读人数 :" prop="readUserNum">
                      <el-input class="input-v2-rao" v-model="formData.readUserNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 已读人数 colName:read_user_num sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="发送时间 :" prop="messageSendDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.messageSendDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 发送时间 colName:message_send_dt sqlType:TIMESTAMP notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="消息标题 :" prop="messageTitle">
                      <el-input class="input-v2-rao" v-model="formData.messageTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="消息内容 :" prop="messageContent">
                      <el-input class="input-v2-rao" v-model="formData.messageContent"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="需要回执 :" prop="isNeedReply">
                      <el-select class="select-v2-rao" v-model="formData.isNeedReply" placeholder="请您选择">
                        <el-option v-for="isNeedReplyItem in ynOptions" :key="isNeedReplyItem.name"
                                   :label="isNeedReplyItem.label" :value="isNeedReplyItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="消息状态 :" prop="schoolMessageStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolMessageStatusCode" placeholder="请您选择">
                        <el-option v-for="schoolMessageStatusCodeItem in schoolMessageStatusCodeOptions"
                                   :key="schoolMessageStatusCodeItem.name"
                                   :label="schoolMessageStatusCodeItem.label" :value="schoolMessageStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="接收人数 :" prop="toUserNum">
                      <el-input class="input-v2-rao" v-model="formData.toUserNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="已读人数 :" prop="readUserNum">
                      <el-input class="input-v2-rao" v-model="formData.readUserNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发送时间 :" prop="messageSendDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.messageSendDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
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
                      {{formData.messageTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.messageTitle">
                          <el-form-item label="消息标题 :" prop="messageTitle">
                            <span v-if="formData.messageTitle">{{formData.messageTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.messageContent">
                          <el-form-item label="消息内容 :" prop="messageContent">
                            <span v-if="formData.messageContent">{{formData.messageContent}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="需要回执 :" prop="isNeedReply">
                            <el-switch v-model="formData.isNeedReply == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="消息状态 :" prop="schoolMessageStatusCode">
                            <span v-if="formData.schoolMessageStatusCodeStr"
                                  :style="{'color':formData.schoolMessageStatusCodeStr.split(';')[1]}">{{formData.schoolMessageStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.toUserNum">
                          <el-form-item label="接收人数 :" prop="toUserNum">
                            <span v-if="formData.toUserNum">{{formData.toUserNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.readUserNum">
                          <el-form-item label="已读人数 :" prop="readUserNum">
                            <span v-if="formData.readUserNum">{{formData.readUserNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="发送时间 :" prop="messageSendDt">
                            <span v-if="formData.messageSendDt"> {{formData.messageSendDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.schoolName">
                          <el-form-item label="学校 :" prop="schoolName">
                            <span v-if="formData.schoolName">{{formData.schoolName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
                          </el-form-item>
                        </div>
                </div>
              </div>
            </el-form>
          </el-col>

            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="menu-quickly">
                <ul>
                  <li>
                    <router-link :to="`/basedata/listSchoolMessageUser?messageId=`+
                                  formData.messageId">
                      <i class="iconfont icon-icon_liebiao"></i>消息接收者
                    </router-link>
                  </li>
                </ul>
              </div>
            </el-col>
        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="medium"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./schoolmessageUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  //import preview from '@/util/preview';
  export default {
      components: {editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        ynOptions :[{"label": "全部", "name": ""}],
        isNeedReply : null,
        schoolMessageStatusCodeOptions: [{"label": "全部", "name": ""}],
        schoolMessageStatusCode : null,
        formData:{
              messageId:'',
              messageTitle :"",
              messageContent :"",
              isNeedReply :"",
              schoolMessageStatusCode :"",
              toUserNum :"",
              readUserNum :"",
              messageSendDt :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              messageTitle :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              messageContent :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              isNeedReply :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              schoolMessageStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              toUserNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              readUserNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              messageSendDt :
              [

              ],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
   // directives: {preview},
    created() {
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("schoolMessageStatus").then(res => {
            let viewList = res.data.data || [];
            for (let schoolMessageStatusItem of viewList) {
              this.schoolMessageStatusCodeOptions.push({
                "label": schoolMessageStatusItem.codeDesc,
                "name": schoolMessageStatusItem.codeId
              });
            }
          });
    },
    methods: {
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            this.formLoading = true;
            api.putObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          } else if (this.pageState === 'add' && valid) {
            this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          }
        })
        this.isLoaded = false;
      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
            }
            this.isLoaded = false;
          })
        }
      },
      goBack() {
        this.$router.go(-1);
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
