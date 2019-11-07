

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="任务 :" prop="taskTitle">
                      <el-input class="input-v2-rao" v-model="formData.taskTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 任务 colName:task_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="任务类型 :" prop="taskTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.taskTypeCode" placeholder="请您选择">
                        <el-option v-for="taskTypeCodeItem in taskTypeCodeOptions"
                                   :key="taskTypeCodeItem.name"
                                   :label="taskTypeCodeItem.label" :value="taskTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 任务类型 colName:task_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="任务内容 :" prop="taskContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.taskContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 任务内容 colName:task_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="需要上传文件 :" prop="isNeedFile">
                      <el-select class="select-v2-rao" v-model="formData.isNeedFile" placeholder="请您选择">
                        <el-option v-for="isNeedFileItem in ynOptions" :key="isNeedFileItem.name"
                                   :label="isNeedFileItem.label" :value="isNeedFileItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 需要上传文件 colName:is_need_file sqlType:VARCHAR notnull:false -->
            <el-col :span="24" >
              <el-form-item label="上传文件要求 :" prop="taskFileTypeCode" v-if="isNeedFile">
                <el-select class="select-v2-rao" v-model="formData.taskFileTypeCode" placeholder="请您选择">
                  <el-option v-for="taskFileTypeCodeItem in taskFileTypeCodeOptions"
                             :key="taskFileTypeCodeItem.name"
                             :label="taskFileTypeCodeItem.label" :value="taskFileTypeCodeItem.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 上传文件要求 colName:task_file_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="开始时间 :" prop="effectiveDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 开始时间 colName:Effective_Dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="结束时间 :" prop="expiryDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 结束时间 colName:Expiry_Dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="任务频率 :" prop="taskFrequencyCode">
                      <el-select class="select-v2-rao" v-model="formData.taskFrequencyCode" placeholder="请您选择">
                        <el-option v-for="taskFrequencyCodeItem in taskFrequencyCodeOptions"
                                   :key="taskFrequencyCodeItem.name"
                                   :label="taskFrequencyCodeItem.label" :value="taskFrequencyCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 任务频率 colName:task_frequency_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="任务频率值 :" prop="taskFrequencyNum">
                      <el-input class="input-v2-rao" v-model="formData.taskFrequencyNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 任务频率值 colName:task_frequency_num sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="任务次数 :" prop="taskNeedTimes">
                      <el-input class="input-v2-rao" v-model="formData.taskNeedTimes"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 任务次数 colName:task_need_times sqlType:INTEGER notnull:false -->
<!--                  <el-col :span="24">-->
<!--                    <el-form-item label="任务状态 :" prop="schoolTaskStatusCode">-->
<!--                      <el-select class="select-v2-rao" v-model="formData.schoolTaskStatusCode" placeholder="请您选择">-->
<!--                        <el-option v-for="schoolTaskStatusCodeItem in schoolTaskStatusCodeOptions"-->
<!--                                   :key="schoolTaskStatusCodeItem.name"-->
<!--                                   :label="schoolTaskStatusCodeItem.label" :value="schoolTaskStatusCodeItem.name">-->
<!--                        </el-option>-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
<!-- 任务状态 colName:school_task_status_code sqlType:VARCHAR notnull:false -->
<!--                  <el-col :span="24">-->
<!--                    <el-form-item label="任务人数 :" prop="toUserNum">-->
<!--                      <el-input class="input-v2-rao" v-model="formData.toUserNum"-->
<!--                                maxlength="11"></el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
<!-- 任务人数 colName:to_user_num sqlType:INTEGER notnull:false -->
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
                      {{formData.taskTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.taskTitle">
                          <el-form-item label="任务 :" prop="taskTitle">
                            <span v-if="formData.taskTitle">{{formData.taskTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="任务类型 :" prop="taskTypeCode">
                            <span v-if="formData.taskTypeCodeStr"
                                  :style="{'color':formData.taskTypeCodeStr.split(';')[1]}">{{formData.taskTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.taskContent">
                          <el-form-item label="任务内容 :" prop="taskContent">
                            <span v-if="formData.taskContent" v-html="formData.taskContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="上传文件要求 :" prop="taskFileTypeCode">
                            <span v-if="formData.taskFileTypeCodeStr"
                                  :style="{'color':formData.taskFileTypeCodeStr.split(';')[1]}">{{formData.taskFileTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="需要上传文件 :" prop="isNeedFile">
                            <el-switch v-model="formData.isNeedFile == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="开始时间 :" prop="effectiveDt">
                            <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止时间 :" prop="expiryDt">
                            <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="任务频率 :" prop="taskFrequencyCode">
                            <span v-if="formData.taskFrequencyCodeStr"
                                  :style="{'color':formData.taskFrequencyCodeStr.split(';')[1]}">{{formData.taskFrequencyCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.taskFrequencyNum">
                          <el-form-item label="任务频率值 :" prop="taskFrequencyNum">
                            <span v-if="formData.taskFrequencyNum">{{formData.taskFrequencyNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.taskNeedTimes">
                          <el-form-item label="任务次数 :" prop="taskNeedTimes">
                            <span v-if="formData.taskNeedTimes">{{formData.taskNeedTimes}}</span>
                          </el-form-item>
                        </div>
<!--                        <div class="p50">-->
<!--                          <el-form-item label="任务状态 :" prop="schoolTaskStatusCode">-->
<!--                            <span v-if="formData.schoolTaskStatusCodeStr"-->
<!--                                  :style="{'color':formData.schoolTaskStatusCodeStr.split(';')[1]}">{{formData.schoolTaskStatusCodeStr.split(';')[0]}}</span>-->
<!--                          </el-form-item>-->
<!--                        </div>-->
<!--                        <div class="p50" v-if="formData.toUserNum">-->
<!--                          <el-form-item label="任务人数 :" prop="toUserNum">-->
<!--                            <span v-if="formData.toUserNum">{{formData.toUserNum}}</span>-->
<!--                          </el-form-item>-->
<!--                        </div>-->
                        <div class="p50" v-if="formData.beiginUserNum">
                          <el-form-item label="开始任务人数 :" prop="beiginUserNum">
                            <span v-if="formData.beiginUserNum">{{formData.beiginUserNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.doneUserNum">
                          <el-form-item label="完成任务人数 :" prop="doneUserNum">
                            <span v-if="formData.doneUserNum">{{formData.doneUserNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="发起时间 :" prop="taskSendDt">
                            <span v-if="formData.taskSendDt"> {{formData.taskSendDt}}</span>
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
                    <router-link :to="`/basedata/listSchoolTaskUser?taskId=`+
                                  formData.taskId">
                      <i class="iconfont icon-icon_liebiao"></i>校内任务学生
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
  import api from "./schooltaskUrl";
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

        taskTypeCodeOptions: [{"label": "全部", "name": ""}],
        taskTypeCode : null,
        taskFileTypeCodeOptions: [{"label": "全部", "name": ""}],
        taskFileTypeCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isNeedFile : null,
        taskFrequencyCodeOptions: [{"label": "全部", "name": ""}],
        taskFrequencyCode : null,
        schoolTaskStatusCodeOptions: [{"label": "全部", "name": ""}],
        schoolTaskStatusCode : null,
        formData:{
              taskId:'',
              taskTitle :"",
              taskTypeCode :"",
              taskContent :"",
              isNeedFile :"",
              schoolTaskStatusCode :"",
              toUserNum :"",
              beiginUserNum :"",
              doneUserNum :"",
              taskSendDt :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              taskTitle :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              taskTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              taskContent :
              [
                  {max: 2048, message: "最多能输入2048个字", trigger: "blur"},

              ],
              taskFileTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              isNeedFile :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              effectiveDt :
              [

              ],
              expiryDt :
              [

              ],
              taskFrequencyCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              taskFrequencyNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              taskNeedTimes :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              schoolTaskStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              toUserNum :
              [
                  {validator: validation.number, trigger: "blur"},

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
          commonApi.getCodeIntType("taskType").then(res => {
            let viewList = res.data.data || [];
            for (let taskTypeItem of viewList) {
              this.taskTypeCodeOptions.push({
                "label": taskTypeItem.codeDesc,
                "name": taskTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("taskFileType").then(res => {
            let viewList = res.data.data || [];
            for (let taskFileTypeItem of viewList) {
              this.taskFileTypeCodeOptions.push({
                "label": taskFileTypeItem.codeDesc,
                "name": taskFileTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("taskFrequency").then(res => {
            let viewList = res.data.data || [];
            for (let taskFrequencyItem of viewList) {
              this.taskFrequencyCodeOptions.push({
                "label": taskFrequencyItem.codeDesc,
                "name": taskFrequencyItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("schoolTaskStatus").then(res => {
            let viewList = res.data.data || [];
            for (let schoolTaskStatusItem of viewList) {
              this.schoolTaskStatusCodeOptions.push({
                "label": schoolTaskStatusItem.codeDesc,
                "name": schoolTaskStatusItem.codeId
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
