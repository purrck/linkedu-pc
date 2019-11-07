
                                                
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="评教 :" prop="planId">
                      <el-input class="input-v2-rao" v-model="formData.planId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 评教 colName:plan_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评教主题 :" prop="planTitle">
                      <el-input class="input-v2-rao" v-model="formData.planTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 评教主题 colName:plan_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="教师id :" prop="teacherId">
                      <el-input class="input-v2-rao" v-model="formData.teacherId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师id colName:teacher_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="教师用户id :" prop="teacherUserId">
                      <el-input class="input-v2-rao" v-model="formData.teacherUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师用户id colName:teacher_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="教师 :" prop="teacherName">
                      <el-input class="input-v2-rao" v-model="formData.teacherName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师 colName:teacher_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生id :" prop="studentId">
                      <el-input class="input-v2-rao" v-model="formData.studentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生id colName:student_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生用户id :" prop="studentUserId">
                      <el-input class="input-v2-rao" v-model="formData.studentUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生用户id colName:student_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生 :" prop="studentName">
                      <el-input class="input-v2-rao" v-model="formData.studentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生 colName:student_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评教状态 :" prop="evaluationTeacherItemStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.evaluationTeacherItemStatusCode" placeholder="请您选择">
                        <el-option v-for="evaluationTeacherItemStatusCodeItem in evaluationTeacherItemStatusCodeOptions"
                                   :key="evaluationTeacherItemStatusCodeItem.name"
                                   :label="evaluationTeacherItemStatusCodeItem.label" :value="evaluationTeacherItemStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 评教状态 colName:evaluation_teacher_item_status_code sqlType:VARCHAR notnull:false -->
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
                    <el-form-item label="评分 :" prop="evaluateScore">
                      <el-input class="input-v2-rao" v-model="formData.evaluateScore"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评语 :" prop="evaluateContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.evaluateContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="评教时间 :" prop="evaluateDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.evaluateDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="问卷答案 :" prop="answerId">
                      <el-input class="input-v2-rao" v-model="formData.answerId"
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
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="评教状态 :" prop="evaluationTeacherItemStatusCode">
                            <span v-if="formData.evaluationTeacherItemStatusCodeStr"
                                  :style="{'color':formData.evaluationTeacherItemStatusCodeStr.split(';')[1]}">{{formData.evaluationTeacherItemStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.evaluateScore">
                          <el-form-item label="评分 :" prop="evaluateScore">
                            <span v-if="formData.evaluateScore">{{formData.evaluateScore}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.evaluateContent">
                          <el-form-item label="评语 :" prop="evaluateContent">
                            <span v-if="formData.evaluateContent" v-html="formData.evaluateContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="评教时间 :" prop="evaluateDt">
                            <span v-if="formData.evaluateDt"> {{formData.evaluateDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.surveyId">
                          <el-form-item label="问卷 :" prop="surveyId">
                            <span v-if="formData.surveyId">{{formData.surveyId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.answerId">
                          <el-form-item label="问卷答案 :" prop="answerId">
                            <span v-if="formData.answerId">{{formData.answerId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.gradeName">
                          <el-form-item label="年级 :" prop="gradeName">
                            <span v-if="formData.gradeName">{{formData.gradeName}}</span>
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
  import api from "./schoolevaluationteacheritemUrl";
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

        evaluationTeacherItemStatusCodeOptions: [{"label": "全部", "name": ""}],
        evaluationTeacherItemStatusCode : null,
        formData:{
              evaluationTeacherItemId:'',
              evaluateScore :"",
              evaluateContent :"",
              evaluateDt :"",
              answerId :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              planId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              planTitle :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              teacherId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              evaluationTeacherItemStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

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
          commonApi.getCodeIntType("evaluationTeacherItemStatus").then(res => {
            let viewList = res.data.data || [];
            for (let evaluationTeacherItemStatusItem of viewList) {
              this.evaluationTeacherItemStatusCodeOptions.push({
                "label": evaluationTeacherItemStatusItem.codeDesc,
                "name": evaluationTeacherItemStatusItem.codeId
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
