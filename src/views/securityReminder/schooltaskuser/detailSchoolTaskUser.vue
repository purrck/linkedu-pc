
                                        
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="任务id :" prop="taskId">
                      <el-input class="input-v2-rao" v-model="formData.taskId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 任务id colName:task_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学校id :" prop="schoolId">
                      <el-input class="input-v2-rao" v-model="formData.schoolId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学校id colName:school_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学校 :" prop="schoolName">
                      <el-input class="input-v2-rao" v-model="formData.schoolName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学校 colName:school_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学段id :" prop="segmentId">
                      <el-input class="input-v2-rao" v-model="formData.segmentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学段id colName:segment_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学段 :" prop="segmentName">
                      <el-input class="input-v2-rao" v-model="formData.segmentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学段 colName:segment_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="年级id :" prop="gradeId">
                      <el-input class="input-v2-rao" v-model="formData.gradeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 年级id colName:grade_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="年级 :" prop="gradeName">
                      <el-input class="input-v2-rao" v-model="formData.gradeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 年级 colName:grade_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="班级id :" prop="classId">
                      <el-input class="input-v2-rao" v-model="formData.classId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 班级id colName:class_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="班级 :" prop="className">
                      <el-input class="input-v2-rao" v-model="formData.className"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 班级 colName:class_name sqlType:VARCHAR notnull:false -->
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
                    <el-form-item label="状态 :" prop="schoolTaskUserStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolTaskUserStatusCode" placeholder="请您选择">
                        <el-option v-for="schoolTaskUserStatusCodeItem in schoolTaskUserStatusCodeOptions"
                                   :key="schoolTaskUserStatusCodeItem.name"
                                   :label="schoolTaskUserStatusCodeItem.label" :value="schoolTaskUserStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 状态 colName:school_task_user_status_code sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="任务开始时间 :" prop="beginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.beginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="任务完成时间 :" prop="endDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.endDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="家长id :" prop="parentId">
                      <el-input class="input-v2-rao" v-model="formData.parentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="家长用户id :" prop="parentUserId">
                      <el-input class="input-v2-rao" v-model="formData.parentUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="家长 :" prop="parentName">
                      <el-input class="input-v2-rao" v-model="formData.parentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="状态 :" prop="schoolTaskUserStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.schoolTaskUserStatusCode" placeholder="请您选择">
                        <el-option v-for="schoolTaskUserStatusCodeItem in schoolTaskUserStatusCodeOptions"
                                   :key="schoolTaskUserStatusCodeItem.name"
                                   :label="schoolTaskUserStatusCodeItem.label" :value="schoolTaskUserStatusCodeItem.name">
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
                      {{formData.className}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="任务开始时间 :" prop="beginDt">
                            <span v-if="formData.beginDt"> {{formData.beginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="任务完成时间 :" prop="endDt">
                            <span v-if="formData.endDt"> {{formData.endDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.parentName">
                          <el-form-item label="家长 :" prop="parentName">
                            <span v-if="formData.parentName">{{formData.parentName}}</span>
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
                    <router-link :to="`/basedata/listSchoolTaskUserHis?taskUserId=`+
                                  formData.taskUserId">
                      <i class="iconfont icon-icon_liebiao"></i>校内任务打卡
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
  import api from "./schooltaskuserUrl";
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

        schoolTaskUserStatusCodeOptions: [{"label": "全部", "name": ""}],
        schoolTaskUserStatusCode : null,
        formData:{
              taskUserId:'',
              beginDt :"",
              endDt :"",
              parentId :"",
              parentUserId :"",
              parentName :"",
              schoolTaskUserStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              taskId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              schoolId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              schoolName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              segmentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              segmentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              gradeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              gradeName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              classId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              className :
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
              schoolTaskUserStatusCode :
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
          commonApi.getCodeIntType("schoolTaskUserStatus").then(res => {
            let viewList = res.data.data || [];
            for (let schoolTaskUserStatusItem of viewList) {
              this.schoolTaskUserStatusCodeOptions.push({
                "label": schoolTaskUserStatusItem.codeDesc,
                "name": schoolTaskUserStatusItem.codeId
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
