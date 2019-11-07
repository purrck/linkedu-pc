
                                  
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="评教主题 :" prop="planTitle">
                      <el-input class="input-v2-rao" v-model="formData.planTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 评教主题 colName:plan_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评教开始时间 :" prop="planBeginDt">
                      <el-input class="input-v2-rao" v-model="formData.planBeginDt"
                                maxlength="0"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 评教开始时间 colName:plan_begin_dt sqlType:TIME notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评教截止时间 :" prop="planBeginEnd">
                      <el-date-picker class="date-v2-rao" v-model="formData.planBeginEnd" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 评教截止时间 colName:plan_begin_end sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评教内容 :" prop="planContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.planContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 评教内容 colName:plan_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评教状态 :" prop="evaluationTeacherPlanStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.evaluationTeacherPlanStatusCode" placeholder="请您选择">
                        <el-option v-for="evaluationTeacherPlanStatusCodeItem in evaluationTeacherPlanStatusCodeOptions"
                                   :key="evaluationTeacherPlanStatusCodeItem.name"
                                   :label="evaluationTeacherPlanStatusCodeItem.label" :value="evaluationTeacherPlanStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 评教状态 colName:evaluation_teacher_plan_status_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学年 :" prop="schoolYear">
                      <el-input class="input-v2-rao" v-model="formData.schoolYear"
                                maxlength="16"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学年 colName:school_year sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学期 :" prop="schoolTerm">
                      <el-input class="input-v2-rao" v-model="formData.schoolTerm"
                                maxlength="2"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学期 colName:school_term sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="包括科目教师 :" prop="isIncludeSubjectTeacher">
                      <el-select class="select-v2-rao" v-model="formData.isIncludeSubjectTeacher" placeholder="请您选择">
                        <el-option v-for="isIncludeSubjectTeacherItem in ynOptions" :key="isIncludeSubjectTeacherItem.name"
                                   :label="isIncludeSubjectTeacherItem.label" :value="isIncludeSubjectTeacherItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 包括科目教师 colName:is_include_subject_teacher sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="包括班主任 :" prop="isIncludeClassTeacher">
                      <el-select class="select-v2-rao" v-model="formData.isIncludeClassTeacher" placeholder="请您选择">
                        <el-option v-for="isIncludeClassTeacherItem in ynOptions" :key="isIncludeClassTeacherItem.name"
                                   :label="isIncludeClassTeacherItem.label" :value="isIncludeClassTeacherItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 包括班主任 colName:is_include_class_teacher sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="问卷 :" prop="surveyId">
                      <el-input class="input-v2-rao" v-model="formData.surveyId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 问卷 colName:survey_id sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="评教主题 :" prop="planTitle">
                      <el-input class="input-v2-rao" v-model="formData.planTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评教开始时间 :" prop="planBeginDt">
                      <el-input class="input-v2-rao" v-model="formData.planBeginDt"
                                maxlength="0"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评教截止时间 :" prop="planBeginEnd">
                      <el-date-picker class="date-v2-rao" v-model="formData.planBeginEnd" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评教内容 :" prop="planContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.planContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="评教状态 :" prop="evaluationTeacherPlanStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.evaluationTeacherPlanStatusCode" placeholder="请您选择">
                        <el-option v-for="evaluationTeacherPlanStatusCodeItem in evaluationTeacherPlanStatusCodeOptions"
                                   :key="evaluationTeacherPlanStatusCodeItem.name"
                                   :label="evaluationTeacherPlanStatusCodeItem.label" :value="evaluationTeacherPlanStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学年 :" prop="schoolYear">
                      <el-input class="input-v2-rao" v-model="formData.schoolYear"
                                maxlength="16"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学期 :" prop="schoolTerm">
                      <el-input class="input-v2-rao" v-model="formData.schoolTerm"
                                maxlength="2"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评教教师数量 :" prop="teacherNum">
                      <el-input class="input-v2-rao" v-model="formData.teacherNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="参评学生数量 :" prop="studentNum">
                      <el-input class="input-v2-rao" v-model="formData.studentNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评教总人次 :" prop="itemNum">
                      <el-input class="input-v2-rao" v-model="formData.itemNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="包括科目教师 :" prop="isIncludeSubjectTeacher">
                      <el-select class="select-v2-rao" v-model="formData.isIncludeSubjectTeacher" placeholder="请您选择">
                        <el-option v-for="isIncludeSubjectTeacherItem in ynOptions" :key="isIncludeSubjectTeacherItem.name"
                                   :label="isIncludeSubjectTeacherItem.label" :value="isIncludeSubjectTeacherItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="包括班主任 :" prop="isIncludeClassTeacher">
                      <el-select class="select-v2-rao" v-model="formData.isIncludeClassTeacher" placeholder="请您选择">
                        <el-option v-for="isIncludeClassTeacherItem in ynOptions" :key="isIncludeClassTeacherItem.name"
                                   :label="isIncludeClassTeacherItem.label" :value="isIncludeClassTeacherItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="问卷 :" prop="surveyId">
                      <el-input class="input-v2-rao" v-model="formData.surveyId"
                                maxlength="32"></el-input>
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
                      {{formData.planTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.planTitle">
                          <el-form-item label="评教主题 :" prop="planTitle">
                            <span v-if="formData.planTitle">{{formData.planTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.planBeginDt">
                          <el-form-item label="评教开始时间 :" prop="planBeginDt">
                            <span v-if="formData.planBeginDt">{{formData.planBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="评教截止时间 :" prop="planBeginEnd">
                            <span v-if="formData.planBeginEnd"> {{formData.planBeginEnd}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.planContent">
                          <el-form-item label="评教内容 :" prop="planContent">
                            <span v-if="formData.planContent" v-html="formData.planContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="评教状态 :" prop="evaluationTeacherPlanStatusCode">
                            <span v-if="formData.evaluationTeacherPlanStatusCodeStr"
                                  :style="{'color':formData.evaluationTeacherPlanStatusCodeStr.split(';')[1]}">{{formData.evaluationTeacherPlanStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.schoolYear">
                          <el-form-item label="学年 :" prop="schoolYear">
                            <span v-if="formData.schoolYear">{{formData.schoolYear}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.schoolTerm">
                          <el-form-item label="学期 :" prop="schoolTerm">
                            <span v-if="formData.schoolTerm">{{formData.schoolTerm}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherNum">
                          <el-form-item label="评教教师数量 :" prop="teacherNum">
                            <span v-if="formData.teacherNum">{{formData.teacherNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentNum">
                          <el-form-item label="参评学生数量 :" prop="studentNum">
                            <span v-if="formData.studentNum">{{formData.studentNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.itemNum">
                          <el-form-item label="评教总人次 :" prop="itemNum">
                            <span v-if="formData.itemNum">{{formData.itemNum}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="包括科目教师 :" prop="isIncludeSubjectTeacher">
                            <el-switch v-model="formData.isIncludeSubjectTeacher == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>


                        <div class="p50">
                          <el-form-item label="包括班主任 :" prop="isIncludeClassTeacher">
                            <el-switch v-model="formData.isIncludeClassTeacher == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.surveyId">
                          <el-form-item label="问卷 :" prop="surveyId">
                            <span v-if="formData.surveyId">{{formData.surveyId}}</span>
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
                    <router-link :to="`/basedata/listSchoolEvaluationTeacherClass?planId=`+
                                  formData.planId">
                      <i class="iconfont icon-icon_liebiao"></i>评教班级
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listSchoolEvaluationTeacherItem?planId=`+
                                  formData.planId">
                      <i class="iconfont icon-icon_liebiao"></i>评教明细
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
  import api from "./schoolevaluationteacherplanUrl";
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

        evaluationTeacherPlanStatusCodeOptions: [{"label": "全部", "name": ""}],
        evaluationTeacherPlanStatusCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isIncludeSubjectTeacher : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isIncludeClassTeacher : null,
        formData:{
              planId:'',
              planTitle :"",
              planBeginDt :"",
              planBeginEnd :"",
              planContent :"",
              evaluationTeacherPlanStatusCode :"",
              schoolYear :"",
              schoolTerm :"",
              teacherNum :"",
              studentNum :"",
              itemNum :"",
              isIncludeSubjectTeacher :"",
              isIncludeClassTeacher :"",
              surveyId :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              planTitle :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              planBeginDt :
              [

              ],
              planBeginEnd :
              [

              ],
              planContent :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              evaluationTeacherPlanStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              schoolYear :
              [
                  {max: 16, message: "最多能输入16个字", trigger: "blur"},

              ],
              schoolTerm :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              isIncludeSubjectTeacher :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              isIncludeClassTeacher :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              surveyId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

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
          commonApi.getCodeIntType("evaluationTeacherPlanStatus").then(res => {
            let viewList = res.data.data || [];
            for (let evaluationTeacherPlanStatusItem of viewList) {
              this.evaluationTeacherPlanStatusCodeOptions.push({
                "label": evaluationTeacherPlanStatusItem.codeDesc,
                "name": evaluationTeacherPlanStatusItem.codeId
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
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
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
