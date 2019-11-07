
                                        
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="课堂教学分组 *  :" prop="studyGroupName">
                      <el-input class="input-v2-rao" v-model="formData.studyGroupName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 课堂教学分组 colName:study_group_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学科 :" prop="subjectName">
                      <el-input class="input-v2-rao" v-model="formData.subjectName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学科 colName:subject_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学年 *  :" prop="schoolYear">
                      <el-input class="input-v2-rao" v-model="formData.schoolYear"
                                maxlength="16"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学年 colName:school_year sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学期 *  :" prop="schoolTerm">
                      <el-input class="input-v2-rao" v-model="formData.schoolTerm"
                                maxlength="2"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学期 colName:school_term sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="班级 *  :" prop="className">
                      <el-input class="input-v2-rao" v-model="formData.className"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 班级 colName:class_name sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="课堂教学分组 *  :" prop="studyGroupName">
                      <el-input class="input-v2-rao" v-model="formData.studyGroupName"
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
                      {{formData.studyGroupName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.studyGroupName">
                          <el-form-item label="课堂教学分组 :" prop="studyGroupName">
                            <span v-if="formData.studyGroupName">{{formData.studyGroupName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.subjectName">
                          <el-form-item label="学科 :" prop="subjectName">
                            <span v-if="formData.subjectName">{{formData.subjectName}}</span>
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
                        <div class="p50" v-if="formData.segementName">
                          <el-form-item label="学段 :" prop="segementName">
                            <span v-if="formData.segementName">{{formData.segementName}}</span>
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
  import api from "./classstudygroupUrl";
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

        formData:{
              studyGroupId:'',
              studyGroupName :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              studyGroupName :
              [
                  {required: true, message: "请您输入课堂教学分组", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              schoolYear :
              [
                  {required: true, message: "请您输入学年", trigger: "blur"},
                  {max: 16, message: "最多能输入16个字", trigger: "blur"},

              ],
              schoolTerm :
              [
                  {required: true, message: "请您输入学期", trigger: "blur"},
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              className :
              [
                  {required: true, message: "请您输入班级", trigger: "blur"},
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
