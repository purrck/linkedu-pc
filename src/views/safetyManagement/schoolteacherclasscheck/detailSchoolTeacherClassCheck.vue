
                                          
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
                    <el-form-item label="校历日期 :" prop="calendarDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.calendarDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 校历日期 colName:Calendar_DT sqlType:TIMESTAMP notnull:false -->
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
                    <el-form-item label="开始时间 :" prop="classBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.classBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 开始时间 colName:class_begin_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="考勤方式 :" prop="classCheckBy">
                      <el-input class="input-v2-rao" v-model="formData.classCheckBy"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 考勤方式 colName:class_check_by sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="考勤内容 :" prop="classCheckDetail">
                      <el-input class="input-v2-rao" v-model="formData.classCheckDetail"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 考勤内容 colName:class_check_detail sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="正常考勤 :" prop="isNormal">
                      <el-select class="select-v2-rao" v-model="formData.isNormal" placeholder="请您选择">
                        <el-option v-for="isNormalItem in ynOptions" :key="isNormalItem.name"
                                   :label="isNormalItem.label" :value="isNormalItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 正常考勤 colName:is_normal sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="开始时间 :" prop="classBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.classBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="结束时间 :" prop="classEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.classEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="考勤方式 :" prop="classCheckBy">
                      <el-input class="input-v2-rao" v-model="formData.classCheckBy"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="考勤内容 :" prop="classCheckDetail">
                      <el-input class="input-v2-rao" v-model="formData.classCheckDetail"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="正常考勤 :" prop="isNormal">
                      <el-select class="select-v2-rao" v-model="formData.isNormal" placeholder="请您选择">
                        <el-option v-for="isNormalItem in ynOptions" :key="isNormalItem.name"
                                   :label="isNormalItem.label" :value="isNormalItem.name">
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
                        <div class="p50">
                          <el-form-item label="校历日期 :" prop="calendarDt">
                            <span v-if="formData.calendarDt"> {{formData.calendarDt}}</span>
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
                        <div class="p50" v-if="formData.subjectName">
                          <el-form-item label="学科 :" prop="subjectName">
                            <span v-if="formData.subjectName">{{formData.subjectName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="开始时间 :" prop="classBeginDt">
                            <span v-if="formData.classBeginDt"> {{formData.classBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="结束时间 :" prop="classEndDt">
                            <span v-if="formData.classEndDt"> {{formData.classEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.classCheckBy">
                          <el-form-item label="考勤方式 :" prop="classCheckBy">
                            <span v-if="formData.classCheckBy">{{formData.classCheckBy}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.classCheckDetail">
                          <el-form-item label="考勤内容 :" prop="classCheckDetail">
                            <span v-if="formData.classCheckDetail">{{formData.classCheckDetail}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="正常考勤 :" prop="isNormal">
                            <el-switch v-model="formData.isNormal == 'Y'" disabled></el-switch>
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
  import api from "./schoolteacherclasscheckUrl";
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
        isNormal : null,
        formData:{
              classCheckId:'',
              classBeginDt :"",
              classEndDt :"",
              classCheckBy :"",
              classCheckDetail :"",
              isNormal :"",
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
              calendarDt :
              [

              ],
              classId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              className :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              classBeginDt :
              [

              ],
              classCheckBy :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              classCheckDetail :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              isNormal :
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
