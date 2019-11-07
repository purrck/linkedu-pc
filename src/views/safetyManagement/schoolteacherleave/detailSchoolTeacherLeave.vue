
                              
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="请假 :" prop="leaveTitle">
                      <el-input class="input-v2-rao" v-model="formData.leaveTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 请假 colName:leave_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="请假事由 :" prop="leaveContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.leaveContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 请假事由 colName:leave_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="请假类型 :" prop="teacherLeaveTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherLeaveTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherLeaveTypeCodeItem in teacherLeaveTypeCodeOptions"
                                   :key="teacherLeaveTypeCodeItem.name"
                                   :label="teacherLeaveTypeCodeItem.label" :value="teacherLeaveTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 请假类型 colName:teacher_leave_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="开始时间 :" prop="leaveBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.leaveBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 开始时间 colName:leave_begin_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="截止时间 :" prop="leaveEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.leaveEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 截止时间 colName:leave_end_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="请假时长 :" prop="leaveDays">
                      <el-input class="input-v2-rao" v-model="formData.leaveDays"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 请假时长 colName:leave_days sqlType:FLOAT notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="请假 :" prop="leaveTitle">
                      <el-input class="input-v2-rao" v-model="formData.leaveTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="请假事由 :" prop="leaveContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.leaveContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="请假类型 :" prop="teacherLeaveTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherLeaveTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherLeaveTypeCodeItem in teacherLeaveTypeCodeOptions"
                                   :key="teacherLeaveTypeCodeItem.name"
                                   :label="teacherLeaveTypeCodeItem.label" :value="teacherLeaveTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="开始时间 :" prop="leaveBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.leaveBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="截止时间 :" prop="leaveEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.leaveEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="请假时长 :" prop="leaveDays">
                      <el-input class="input-v2-rao" v-model="formData.leaveDays"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="请假状态 :" prop="teacherLeaveStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherLeaveStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherLeaveStatusCodeItem in teacherLeaveStatusCodeOptions"
                                   :key="teacherLeaveStatusCodeItem.name"
                                   :label="teacherLeaveStatusCodeItem.label" :value="teacherLeaveStatusCodeItem.name">
                        </el-option>
                      </el-select>
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
                      {{formData.teacherName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.leaveTitle">
                          <el-form-item label="请假 :" prop="leaveTitle">
                            <span v-if="formData.leaveTitle">{{formData.leaveTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.leaveContent">
                          <el-form-item label="请假事由 :" prop="leaveContent">
                            <span v-if="formData.leaveContent" v-html="formData.leaveContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="请假类型 :" prop="teacherLeaveTypeCode">
                            <span v-if="formData.teacherLeaveTypeCodeStr"
                                  :style="{'color':formData.teacherLeaveTypeCodeStr.split(';')[1]}">{{formData.teacherLeaveTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="开始时间 :" prop="leaveBeginDt">
                            <span v-if="formData.leaveBeginDt"> {{formData.leaveBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止时间 :" prop="leaveEndDt">
                            <span v-if="formData.leaveEndDt"> {{formData.leaveEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.leaveDays">
                          <el-form-item label="请假时长 :" prop="leaveDays">
                            <span v-if="formData.leaveDays">{{formData.leaveDays}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="请假状态 :" prop="teacherLeaveStatusCode">
                            <span v-if="formData.teacherLeaveStatusCodeStr"
                                  :style="{'color':formData.teacherLeaveStatusCodeStr.split(';')[1]}">{{formData.teacherLeaveStatusCodeStr.split(';')[0]}}</span>
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
  import api from "./schoolteacherleaveUrl";
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

        teacherLeaveTypeCodeOptions: [{"label": "全部", "name": ""}],
        teacherLeaveTypeCode : null,
        imagePathFileList :[],
        imagePathFileType:'',
        teacherLeaveStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherLeaveStatusCode : null,
        formData:{
              teacherLeaveId:'',
              leaveTitle :"",
              leaveContent :"",
              teacherLeaveTypeCode :"",
              imagePath :"",
              leaveBeginDt :"",
              leaveEndDt :"",
              leaveDays :"",
              teacherLeaveStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              leaveTitle :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              leaveContent :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              teacherLeaveTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              leaveBeginDt :
              [

              ],
              leaveEndDt :
              [

              ],
              leaveDays :
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
          commonApi.getCodeIntType("teacherLeaveType").then(res => {
            let viewList = res.data.data || [];
            for (let teacherLeaveTypeItem of viewList) {
              this.teacherLeaveTypeCodeOptions.push({
                "label": teacherLeaveTypeItem.codeDesc,
                "name": teacherLeaveTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherLeaveStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherLeaveStatusItem of viewList) {
              this.teacherLeaveStatusCodeOptions.push({
                "label": teacherLeaveStatusItem.codeDesc,
                "name": teacherLeaveStatusItem.codeId
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
      //获取图片上传信息
      uploadData(res) {
        this.formData.imagePath = res;
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
