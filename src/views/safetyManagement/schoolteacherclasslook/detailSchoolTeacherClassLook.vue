
                                                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师听课 :" prop="classLookTitle">
                      <el-input class="input-v2-rao" v-model="formData.classLookTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师听课 colName:class_look_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="听课安排 :" prop="classLookContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.classLookContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 听课安排 colName:class_look_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="讲课老师 :" prop="teacherId">
                      <el-input class="input-v2-rao" v-model="formData.teacherId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 讲课老师 colName:teacher_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="讲课老师 :" prop="teacherUserId">
                      <el-input class="input-v2-rao" v-model="formData.teacherUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 讲课老师 colName:teacher_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="讲课老师 :" prop="teacherName">
                      <el-input class="input-v2-rao" v-model="formData.teacherName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 讲课老师 colName:teacher_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="听课老师 :" prop="lookTeacherId">
                      <el-input class="input-v2-rao" v-model="formData.lookTeacherId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 听课老师 colName:look_teacher_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="听课老师 :" prop="lookTeacherUserId">
                      <el-input class="input-v2-rao" v-model="formData.lookTeacherUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 听课老师 colName:look_teacher_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="听课老师 :" prop="lookTeacherName">
                      <el-input class="input-v2-rao" v-model="formData.lookTeacherName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 听课老师 colName:look_teacher_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="校历日期 :" prop="calendarDt">
                      <el-input class="input-v2-rao" v-model="formData.calendarDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 校历日期 colName:Calendar_DT sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="听课开始时间 :" prop="classBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.classBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 听课开始时间 colName:class_begin_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="听课结束时间 :" prop="classEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.classEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 听课结束时间 colName:class_end_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学科id :" prop="subjectId">
                      <el-input class="input-v2-rao" v-model="formData.subjectId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学科id colName:subject_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学科 :" prop="subjectName">
                      <el-input class="input-v2-rao" v-model="formData.subjectName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学科 colName:subject_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评价问卷 :" prop="surveyId">
                      <el-input class="input-v2-rao" v-model="formData.surveyId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 评价问卷 colName:survey_id sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师听课 :" prop="classLookTitle">
                      <el-input class="input-v2-rao" v-model="formData.classLookTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="听课安排 :" prop="classLookContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.classLookContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="听课状态 :" prop="classLookStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.classLookStatusCode" placeholder="请您选择">
                        <el-option v-for="classLookStatusCodeItem in classLookStatusCodeOptions"
                                   :key="classLookStatusCodeItem.name"
                                   :label="classLookStatusCodeItem.label" :value="classLookStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="讲课视频 :" prop="classLookVideo">
                      <uploads :data="formData.classLookVideo" @fileMessage="getVideoMessage"/>
                    </el-form-item>
                  </el-col>
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
                    <el-form-item label="评价问卷 :" prop="surveyId">
                      <el-input class="input-v2-rao" v-model="formData.surveyId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评价问卷答案 :" prop="answerId">
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
                      {{formData.classLookTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.classLookTitle">
                          <el-form-item label="教师听课 :" prop="classLookTitle">
                            <span v-if="formData.classLookTitle">{{formData.classLookTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.classLookContent">
                          <el-form-item label="听课安排 :" prop="classLookContent">
                            <span v-if="formData.classLookContent" v-html="formData.classLookContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="讲课老师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.lookTeacherName">
                          <el-form-item label="听课老师 :" prop="lookTeacherName">
                            <span v-if="formData.lookTeacherName">{{formData.lookTeacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="听课开始时间 :" prop="classBeginDt">
                            <span v-if="formData.classBeginDt"> {{formData.classBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="听课结束时间 :" prop="classEndDt">
                            <span v-if="formData.classEndDt"> {{formData.classEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.subjectName">
                          <el-form-item label="学科 :" prop="subjectName">
                            <span v-if="formData.subjectName">{{formData.subjectName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="听课状态 :" prop="classLookStatusCode">
                            <span v-if="formData.classLookStatusCodeStr"
                                  :style="{'color':formData.classLookStatusCodeStr.split(';')[1]}">{{formData.classLookStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p100">
                          <el-form-item label="讲课视频 :" prop="classLookVideo">
                            <video width="500" controls ref="classLookVideoVideo">
                              <source :src="formData.classLookVideo" type="video/mp4" v-if="formData.classLookVideo">
                            </video>
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

                        <div class="p50" v-if="formData.surveyId">
                          <el-form-item label="评价问卷 :" prop="surveyId">
                            <span v-if="formData.surveyId">{{formData.surveyId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.answerId">
                          <el-form-item label="评价问卷答案 :" prop="answerId">
                            <span v-if="formData.answerId">{{formData.answerId}}</span>
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
  import api from "./schoolteacherclasslookUrl";
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

        classLookStatusCodeOptions: [{"label": "全部", "name": ""}],
        classLookStatusCode : null,
        classLookVideoFileList :[],
        classLookVideoFileType:'',
        formData:{
              classLookId:'',
              classLookTitle :"",
              classLookContent :"",
              classLookStatusCode :"",
              classLookVideo :"",
              evaluateScore :"",
              evaluateContent :"",
              surveyId :"",
              answerId :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              classLookTitle :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              classLookContent :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

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
              lookTeacherId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              lookTeacherUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              lookTeacherName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              calendarDt :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              classBeginDt :
              [

              ],
              classEndDt :
              [

              ],
              subjectId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectName :
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
          commonApi.getCodeIntType("classLookStatus").then(res => {
            let viewList = res.data.data || [];
            for (let classLookStatusItem of viewList) {
              this.classLookStatusCodeOptions.push({
                "label": classLookStatusItem.codeDesc,
                "name": classLookStatusItem.codeId
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
