
                                                      
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="任务学生 :" prop="taskUserId">
                      <el-input class="input-v2-rao" v-model="formData.taskUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 任务学生 colName:task_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="任务 :" prop="taskId">
                      <el-input class="input-v2-rao" v-model="formData.taskId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 任务 colName:task_id sqlType:VARCHAR notnull:false -->
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
                    <el-form-item label="完成任务时间 :" prop="doneTaskDt">
                      <el-input class="input-v2-rao" v-model="formData.doneTaskDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 完成任务时间 colName:done_task_dt sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="文件 :" prop="filePath">
                      <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
                    </el-form-item>
                  </el-col>
<!-- 文件 colName:file_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="家长评语 :" prop="parentComment">
                      <el-input class="input-v2-rao" v-model="formData.parentComment"
                                maxlength="0"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 家长评语 colName:parent_comment sqlType:BIT notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="家长id :" prop="parentId">
                      <el-input class="input-v2-rao" v-model="formData.parentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 家长id colName:parent_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="家长用户id :" prop="parentUserId">
                      <el-input class="input-v2-rao" v-model="formData.parentUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 家长用户id colName:parent_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="家长 :" prop="parentName">
                      <el-input class="input-v2-rao" v-model="formData.parentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 家长 colName:parent_name sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师确认 :" prop="isTeacherConfirm">
                      <el-select class="select-v2-rao" v-model="formData.isTeacherConfirm" placeholder="请您选择">
                        <el-option v-for="isTeacherConfirmItem in ynOptions" :key="isTeacherConfirmItem.name"
                                   :label="isTeacherConfirmItem.label" :value="isTeacherConfirmItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="教师评语 :" prop="teacherComment">
                      <el-input class="input-v2-rao" v-model="formData.teacherComment"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="教师id :" prop="teacherId">
                      <el-input class="input-v2-rao" v-model="formData.teacherId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="⁮教师用户id :" prop="teacherUserId">
                      <el-input class="input-v2-rao" v-model="formData.teacherUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="教师 :" prop="teacherName">
                      <el-input class="input-v2-rao" v-model="formData.teacherName"
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
                      {{formData.className}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.schoolId">
                          <el-form-item label="学校 :" prop="schoolId">
                            <span v-if="formData.schoolId">{{formData.schoolId}}</span>
                          </el-form-item>
                        </div>
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
                        <div class="p50" v-if="formData.doneTaskDt">
                          <el-form-item label="完成任务时间 :" prop="doneTaskDt">
                            <span v-if="formData.doneTaskDt">{{formData.doneTaskDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.filePath">
                          <el-form-item label="文件 :" prop="filePath">
                            <i class="iconfont icon-xls"
                               v-if="filePathFileType=='xls'||filePathFileType=='xlsx'"></i>
                            <i class="iconfont icon-doc"
                               v-if="filePathFileType=='doc'||filePathFileType=='docx'"></i>
                            <i class="iconfont icon-ppt"
                               v-if="filePathFileType=='ppt'||filePathFileType=='pptx'"></i>
                            <i class="iconfont icon-txt"
                               v-if="filePathFileType=='pdf'||filePathFileType=='png'||filePathFileType=='jpg'||filePathFileType=='gif'||filePathFileType=='jpeg'"></i>
                            <i class="iconfont icon-avi"
                               v-if="filePathFileType=='mp4'||filePathFileType=='avi'||filePathFileType=='rmvb'||filePathFileType=='rm'||filePathFileType=='mov'"></i>
                            <i class="iconfont icon-mp3" v-if="filePathFileType=='mp3'"></i>
                            {{formData.filePath}}
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.parentComment">
                          <el-form-item label="家长评语 :" prop="parentComment">
                            <span v-if="formData.parentComment">{{formData.parentComment}}</span>
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
  import api from "./schooltaskuserhisUrl";
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

        imagePathFileList :[],
        imagePathFileType:'',
        filePathFileList :[],
        filePathFileType:'',
        ynOptions :[{"label": "全部", "name": ""}],
        isTeacherConfirm : null,
        formData:{
              taskUserHisId:'',
              isTeacherConfirm :"",
              teacherComment :"",
              teacherId :"",
              teacherUserId :"",
              teacherName :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              taskUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              taskId :
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
              doneTaskDt :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              filePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              parentComment :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              parentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              parentUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              parentName :
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
      //获取图片上传信息
      uploadData(res) {
        this.formData.imagePath = res;
      },
      getFileMessage(res) {
        let obj = res;
        // console.log('File基本信息');
        //// console.log(obj);
        this.formData.filePath = res.urlurl;
        this.formData.url = res.urlurl;
        this.formData.sizes = res.size;
        this.formData.folderId = this.$route.params.id;
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
