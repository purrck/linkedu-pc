
                                                    
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

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
                    <el-form-item label="学生教师关系 :" prop="teacherStudentRelationCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherStudentRelationCode" placeholder="请您选择">
                        <el-option v-for="teacherStudentRelationCodeItem in teacherStudentRelationCodeOptions"
                                   :key="teacherStudentRelationCodeItem.name"
                                   :label="teacherStudentRelationCodeItem.label" :value="teacherStudentRelationCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 学生教师关系 colName:teacher_student_relation_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评语 *  :" prop="commentContent">
                      <el-input class="input-v2-rao" v-model="formData.commentContent"
                                maxlength="512"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 评语 colName:comment_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评级时间 :" prop="commentDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.commentDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 评级时间 colName:comment_dt sqlType:TIMESTAMP notnull:false -->
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
                    <el-form-item label="评级级别 :" prop="commentLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.commentLevelCode" placeholder="请您选择">
                        <el-option v-for="commentLevelCodeItem in commentLevelCodeOptions"
                                   :key="commentLevelCodeItem.name"
                                   :label="commentLevelCodeItem.label" :value="commentLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 评级级别 colName:comment_level_code sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="评语 *  :" prop="commentContent">
                      <el-input class="input-v2-rao" v-model="formData.commentContent"
                                maxlength="512"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评级时间 :" prop="commentDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.commentDt" type="datetime"
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
                      {{formData.teacherName}}
                </div>
                <div class="detail-item-v2">
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
                          <el-form-item label="学生教师关系 :" prop="teacherStudentRelationCode">
                            <span v-if="formData.teacherStudentRelationCodeStr"
                                  :style="{'color':formData.teacherStudentRelationCodeStr.split(';')[1]}">{{formData.teacherStudentRelationCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.commentContent">
                          <el-form-item label="评语 :" prop="commentContent">
                            <span v-if="formData.commentContent">{{formData.commentContent}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="评级时间 :" prop="commentDt">
                            <span v-if="formData.commentDt"> {{formData.commentDt}}</span>
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
                        <div class="p50">
                          <el-form-item label="评级级别 :" prop="commentLevelCode">
                            <span v-if="formData.commentLevelCodeStr"
                                  :style="{'color':formData.commentLevelCodeStr.split(';')[1]}">{{formData.commentLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.subjectName">
                          <el-form-item label="学科 :" prop="subjectName">
                            <span v-if="formData.subjectName">{{formData.subjectName}}</span>
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
  import api from "./schoolteacherstudentcommentUrl";
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

        teacherStudentRelationCodeOptions: [{"label": "全部", "name": ""}],
        teacherStudentRelationCode : null,
        commentLevelCodeOptions: [{"label": "全部", "name": ""}],
        commentLevelCode : null,
        formData:{
              commentId:'',
              commentContent :"",
              commentDt :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
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
              teacherStudentRelationCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              commentContent :
              [
                  {required: true, message: "请您输入评语", trigger: "blur"},
                  {max: 512, message: "最多能输入512个字", trigger: "blur"},

              ],
              commentDt :
              [

              ],
              schoolYear :
              [
                  {max: 16, message: "最多能输入16个字", trigger: "blur"},

              ],
              schoolTerm :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              commentLevelCode :
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
          commonApi.getCodeIntType("teacherStudentRelation").then(res => {
            let viewList = res.data.data || [];
            for (let teacherStudentRelationItem of viewList) {
              this.teacherStudentRelationCodeOptions.push({
                "label": teacherStudentRelationItem.codeDesc,
                "name": teacherStudentRelationItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("commentLevel").then(res => {
            let viewList = res.data.data || [];
            for (let commentLevelItem of viewList) {
              this.commentLevelCodeOptions.push({
                "label": commentLevelItem.codeDesc,
                "name": commentLevelItem.codeId
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
