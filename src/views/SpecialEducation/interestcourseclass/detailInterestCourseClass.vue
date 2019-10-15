

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
            <el-col v-show="false" :span="12">
              <el-form-item label="学校id :" prop="interestCourseClassName">
                <el-input disabled class="input-v2-rao" v-model="formData.schoolId"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>


            <el-col :span="12">
              <el-form-item label="学段 :" prop="segmentName">
                <el-select style="width: 298px;"  v-model="formData.segmentId" placeholder="请选择学段" @change="segmentChange">
                  <el-option
                    v-for="item in optionsList3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="年级 :" prop="gradeName">
                <el-select style="width: 298px;" @change="getSubjects"  v-model="formData.gradeName" placeholder="请选择年级" >
                  <el-option
                    v-for="item in optionsList4"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学期 :" prop="schoolTerm">
                <el-select style="width: 298px;" v-model="formData.schoolTerm" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item label="学年 :" prop="">
                <el-date-picker @change="getSchoolYear" style="width: 120px; "  class="date-v2-rao"
                                value-format="yyyy"
                                popper-class="date-popper-v2-rao" v-model="firstSchoolTerm" type="year"
                                placeholder="选择年"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="9" >
              <el-form-item prop="" >
                <el-date-picker disabled style="width: 120px;margin-left: -15px; " class="date-v2-rao"  value-format="yyyy"
                                popper-class="date-popper-v2-rao" v-model="secondSchoolTerm" type="year"
                                placeholder="选择年"></el-date-picker>
              </el-form-item>
            </el-col>

            <!--<el-col :span="3">-->
              <!--<el-form-item label="学年 :" :rules="{-->
          <!--required: true, message: '请您选择年', trigger: 'change'}">-->
                <!--<el-date-picker style="width: 120px; "  class="date-v2-rao"-->
                                 <!--value-format="yyyy"-->
                                <!--popper-class="date-popper-v2-rao" v-model="firstSchoolTerm" type="year"-->
                                <!--placeholder="选择年"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="3" >-->
              <!--<el-form-item label="" >-->
                <!--<el-date-picker style="width: 120px;margin-left: -15px; " class="date-v2-rao"  value-format="yyyy"-->
                                <!--popper-class="date-popper-v2-rao" v-model="secondSchoolTerm" type="year"-->
                                <!--placeholder="选择年"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="9" style="width: 170px;">-->
              <!--<el-form-item  label="学年 :" prop="schoolTerm" >-->
                <!--<el-date-picker  style="width: 120px; "-->
                                <!--value-format="yyyy"-->
                                <!--popper-class="date-popper-v2-rao" v-model="firstSchoolTerm" type="year"-->
                                <!--placeholder="选择年"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="9" >-->
              <!--<el-form-item label=" :" >-->
                <!--<el-date-picker style="width: 120px;"-->
                                <!--value-format="yyyy"-->
                                <!--popper-class="date-popper-v2-rao" v-model="secondSchoolTerm" type="year"-->
                                <!--placeholder="选择年"></el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-form-item label="兴趣班 :" prop="interestCourseClassName">
                <el-input class="input-v2-rao" v-model="formData.interestCourseClassName"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>


<!--                  <el-col :span="24">-->
<!--                    <el-form-item label="科目 :" prop="subjectId">-->
<!--                      <el-input class="input-v2-rao" v-model="formData.subjectId"-->
<!--                                maxlength="32"></el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
            <el-col :span="12">
              <el-form-item label="线上课程：" prop="entityId">
                <el-select size="mini" class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                           v-model="formData.onlineCourseName" @change="sendSntityName" placeholder="请选择" maxlength="32">
                  <el-option
                    label="无"
                    value=""
                  ></el-option>
                  <el-option
                    v-for="item in datas"
                    :key="item.entityName"
                    :label="item.entityName"
                    :value="item.entityName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="科目 :" prop="subjectName">
                <el-select style="width: 298px;" @change="sendSubjectName" v-model="formData.subjectName" placeholder="请选择">
                  <el-option
                    v-for="item in Subjects"
                    :key="item.subjectId"
                    :label="item.subjectName"
                    :value="item.subjectName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <!--<el-col :span="12">-->
                    <!--<el-form-item label="科目 :" prop="subjectName">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.subjectName"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->

            <!--<el-col :span="8">-->
              <!--<el-form-item label="学年 :" prop="schoolYear">-->
                <!--<el-input class="input-v2-rao" v-model="formData.schoolYear"-->
                          <!--maxlength="32"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-form-item label="总课时数 :" prop="classHourTotal">
                <el-input class="input-v2-rao" v-model="formData.classHourTotal"
                          maxlength="11"></el-input>
              </el-form-item>
            </el-col>

            <!--                  <el-col :span="24">-->
            <!--                    <el-form-item label="学段 :" prop="segmentId">-->
            <!--                      <el-input class="input-v2-rao" v-model="formData.segmentId"-->
            <!--                                maxlength="32"></el-input>-->
            <!--                    </el-form-item>-->
            <!--                  </el-col>-->
            <!--<el-col :span="8">-->
              <!--<el-form-item label="学段 :" prop="segmentName">-->
                <!--<el-input class="input-v2-rao" v-model="formData.segmentName"-->
                          <!--maxlength="32"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--                  <el-col :span="24">-->
            <!--                    <el-form-item label="年级 :" prop="gradeId">-->
            <!--                      <el-input class="input-v2-rao" v-model="formData.gradeId"-->
            <!--                                maxlength="32"></el-input>-->
            <!--                    </el-form-item>-->
            <!--                  </el-col>-->
            <!--<el-col :span="8">-->
              <!--<el-form-item label="年级 :" prop="gradeName">-->
                <!--<el-input class="input-v2-rao" v-model="formData.gradeName"-->
                          <!--maxlength="32"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->


            <!--<el-col :span="24">-->
            <!--<el-form-item label="开始时间 :" prop="effectiveDt">-->
            <!--<el-input class="input-v2-rao" v-model="formData.effectiveDt"-->
            <!--maxlength="32"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
            <!--<el-form-item label="截止时间 :" prop="expiryDt">-->
            <!--<el-input class="input-v2-rao" v-model="formData.expiryDt"-->
            <!--maxlength="32"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <el-col :span="12">
              <el-form-item label="开始时间 :" prop="effectiveDt">
                <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm"
                                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="截止时间 :" prop="expiryDt">
                <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm"
                                >
                </el-date-picker>
              </el-form-item>
            </el-col>



            <el-col :span="12">
              <el-form-item label="费用 :" prop="feeAmount">
                <el-input class="input-v2-rao" v-model="formData.feeAmount"
                          maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生人数限制 :" prop="studyStudentLimit">
                <el-input class="input-v2-rao" v-model="formData.studyStudentLimit"
                          maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="12">-->
              <!--<el-form-item label="报读人数 :" prop="studyStudentReal">-->
                <!--<el-input class="input-v2-rao" v-model="formData.studyStudentReal"-->
                          <!--maxlength="11"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
            <!--<el-form-item label="线上课程id :" prop="onlineCourseId">-->
            <!--<el-input class="input-v2-rao" v-model="formData.onlineCourseId"-->
            <!--maxlength="32"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="24">-->
            <!--<el-form-item label="线上课程 :" prop="onlineCourseName">-->
            <!--<el-input class="input-v2-rao" v-model="formData.onlineCourseName"-->
            <!--maxlength="32"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->



            <!--<el-col :span="8">-->
              <!--<el-form-item label="任课教师id :" prop="teacherId">-->
                <!--<el-input class="input-v2-rao" v-model="formData.teacherId"-->
                          <!--maxlength="32"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<el-form-item label="任课教师 :" prop="teacherName">-->
                <!--<el-input class="input-v2-rao" v-model="formData.teacherName"-->
                          <!--maxlength="32"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-form-item label="兴趣班状态 :" prop="interestCourseClassStatusCode">
                <el-select class="select-v2-rao" v-model="formData.interestCourseClassStatusCode" placeholder="请您选择">
                  <el-option v-for="interestCourseClassStatusCodeItem in interestCourseClassStatusCodeOptions"
                             :key="interestCourseClassStatusCodeItem.name"
                             :label="interestCourseClassStatusCodeItem.label" :value="interestCourseClassStatusCodeItem.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>


            <el-col :span="8">
            <el-form-item label="任课教师 :" prop="classMasterTeacherName" class="w280">
              <role-dialog :url="'/user/teacherAd/page'" ref="teacher" :type="'teacher'" :params="{page:1,limit:10}"
                           @callback="jsCallback">选择
              </role-dialog>
            </el-form-item>
              </el-col>



            <!--<el-col :span="12">-->
              <!--<el-form-item label="序号 :" prop="sequnceNum">-->
                <!--<el-input class="input-v2-rao" v-model="formData.sequnceNum"-->
                          <!--maxlength="11"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="8">-->
              <!--<el-form-item label="任课教师用户id :" prop="teacherUserId">-->
                <!--<el-input class="input-v2-rao" v-model="formData.teacherUserId"-->
                          <!--maxlength="32"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->





                  <el-col :span="24">
                    <el-form-item label="描述 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>
            <el-col :span="8">
              <el-form-item label="图片 :" prop="imagePath">
                <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
              </el-form-item>
            </el-col>

          </el-form>
        </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
          <el-col v-show="false" :span="12">
            <el-form-item label="学校id :" prop="interestCourseClassName">
              <el-input disabled class="input-v2-rao" v-model="formData.schoolId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="学段 :" prop="segmentName">
              <el-select style="width: 298px;"  v-model="formData.segmentId" placeholder="请选择学段" @change="segmentChange">
                <el-option
                  v-for="item in optionsList3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="年级 :" prop="gradeName">
              <el-select style="width: 298px;" @change="getSubjects"  v-model="formData.gradeName" placeholder="请选择年级" >
                <el-option
                  v-for="item in optionsList4"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学期 :" prop="schoolTerm">
              <el-select style="width: 298px;" v-model="formData.schoolTerm" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item label="学年 :" prop="">
              <el-date-picker @change="getSchoolYear" style="width: 120px; "  class="date-v2-rao"
                              value-format="yyyy"
                              popper-class="date-popper-v2-rao" v-model="firstSchoolTerm" type="year"
                              placeholder="选择年"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="9" >
            <el-form-item prop="" >
              <el-date-picker disabled style="width: 120px;margin-left: -15px; " class="date-v2-rao"  value-format="yyyy"
                              popper-class="date-popper-v2-rao" v-model="secondSchoolTerm" type="year"
                              placeholder="选择年"></el-date-picker>
            </el-form-item>
          </el-col>

          <!--<el-col :span="3">-->
          <!--<el-form-item label="学年 :" :rules="{-->
          <!--required: true, message: '请您选择年', trigger: 'change'}">-->
          <!--<el-date-picker style="width: 120px; "  class="date-v2-rao"-->
          <!--value-format="yyyy"-->
          <!--popper-class="date-popper-v2-rao" v-model="firstSchoolTerm" type="year"-->
          <!--placeholder="选择年"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="3" >-->
          <!--<el-form-item label="" >-->
          <!--<el-date-picker style="width: 120px;margin-left: -15px; " class="date-v2-rao"  value-format="yyyy"-->
          <!--popper-class="date-popper-v2-rao" v-model="secondSchoolTerm" type="year"-->
          <!--placeholder="选择年"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="9" style="width: 170px;">-->
          <!--<el-form-item  label="学年 :" prop="schoolTerm" >-->
          <!--<el-date-picker  style="width: 120px; "-->
          <!--value-format="yyyy"-->
          <!--popper-class="date-popper-v2-rao" v-model="firstSchoolTerm" type="year"-->
          <!--placeholder="选择年"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="9" >-->
          <!--<el-form-item label=" :" >-->
          <!--<el-date-picker style="width: 120px;"-->
          <!--value-format="yyyy"-->
          <!--popper-class="date-popper-v2-rao" v-model="secondSchoolTerm" type="year"-->
          <!--placeholder="选择年"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="12">
            <el-form-item label="兴趣班 :" prop="interestCourseClassName">
              <el-input class="input-v2-rao" v-model="formData.interestCourseClassName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <!--                  <el-col :span="24">-->
          <!--                    <el-form-item label="科目 :" prop="subjectId">-->
          <!--                      <el-input class="input-v2-rao" v-model="formData.subjectId"-->
          <!--                                maxlength="32"></el-input>-->
          <!--                    </el-form-item>-->
          <!--                  </el-col>-->
          <el-col :span="12">
            <el-form-item label="线上课程：" prop="entityId">
              <el-select size="mini" class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                         v-model="formData.onlineCourseName" @change="sendSntityName" placeholder="请选择" maxlength="32">
                <el-option
                  label="无"
                  value=""
                ></el-option>
                <el-option
                  v-for="item in datas"
                  :key="item.entityName"
                  :label="item.entityName"
                  :value="item.entityName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="科目 :" prop="subjectName">
              <el-select style="width: 298px;" @change="sendSubjectName" v-model="formData.subjectName" placeholder="请选择">
                <el-option
                  v-for="item in Subjects"
                  :key="item.subjectId"
                  :label="item.subjectName"
                  :value="item.subjectName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!--<el-col :span="12">-->
          <!--<el-form-item label="科目 :" prop="subjectName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.subjectName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="8">-->
          <!--<el-form-item label="学年 :" prop="schoolYear">-->
          <!--<el-input class="input-v2-rao" v-model="formData.schoolYear"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="12">
            <el-form-item label="总课时数 :" prop="classHourTotal">
              <el-input class="input-v2-rao" v-model="formData.classHourTotal"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>

          <!--                  <el-col :span="24">-->
          <!--                    <el-form-item label="学段 :" prop="segmentId">-->
          <!--                      <el-input class="input-v2-rao" v-model="formData.segmentId"-->
          <!--                                maxlength="32"></el-input>-->
          <!--                    </el-form-item>-->
          <!--                  </el-col>-->
          <!--<el-col :span="8">-->
          <!--<el-form-item label="学段 :" prop="segmentName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.segmentName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--                  <el-col :span="24">-->
          <!--                    <el-form-item label="年级 :" prop="gradeId">-->
          <!--                      <el-input class="input-v2-rao" v-model="formData.gradeId"-->
          <!--                                maxlength="32"></el-input>-->
          <!--                    </el-form-item>-->
          <!--                  </el-col>-->
          <!--<el-col :span="8">-->
          <!--<el-form-item label="年级 :" prop="gradeName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.gradeName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="24">-->
          <!--<el-form-item label="开始时间 :" prop="effectiveDt">-->
          <!--<el-input class="input-v2-rao" v-model="formData.effectiveDt"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="截止时间 :" prop="expiryDt">-->
          <!--<el-input class="input-v2-rao" v-model="formData.expiryDt"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="12">
            <el-form-item label="开始时间 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="截止时间 :" prop="expiryDt">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>



          <el-col :span="12">
            <el-form-item label="费用 :" prop="feeAmount">
              <el-input class="input-v2-rao" v-model="formData.feeAmount"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生人数限制 :" prop="studyStudentLimit">
              <el-input class="input-v2-rao" v-model="formData.studyStudentLimit"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">-->
          <!--<el-form-item label="报读人数 :" prop="studyStudentReal">-->
          <!--<el-input class="input-v2-rao" v-model="formData.studyStudentReal"-->
          <!--maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="线上课程id :" prop="onlineCourseId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.onlineCourseId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="线上课程 :" prop="onlineCourseName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.onlineCourseName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->



          <!--<el-col :span="8">-->
          <!--<el-form-item label="任课教师id :" prop="teacherId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.teacherId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
          <!--<el-form-item label="任课教师 :" prop="teacherName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.teacherName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="12">
            <el-form-item label="兴趣班状态 :" prop="interestCourseClassStatusCode">
              <el-select class="select-v2-rao" v-model="formData.interestCourseClassStatusCode" placeholder="请您选择">
                <el-option v-for="interestCourseClassStatusCodeItem in interestCourseClassStatusCodeOptions"
                           :key="interestCourseClassStatusCodeItem.name"
                           :label="interestCourseClassStatusCodeItem.label" :value="interestCourseClassStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="任课教师 :" prop="classMasterTeacherName" class="w280">
              <role-dialog :url="'/user/teacherAd/page'" ref="teacher" :type="'teacher'" :params="{page:1,limit:10}"
                           @callback="jsCallback">选择
              </role-dialog>
            </el-form-item>
          </el-col>



          <!--<el-col :span="12">-->
          <!--<el-form-item label="序号 :" prop="sequnceNum">-->
          <!--<el-input class="input-v2-rao" v-model="formData.sequnceNum"-->
          <!--maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="8">-->
          <!--<el-form-item label="任课教师用户id :" prop="teacherUserId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.teacherUserId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->





          <el-col :span="24">
            <el-form-item label="描述 :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
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
                      {{formData.interestCourseClassName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.interestCourseClassName">
                          <el-form-item label="兴趣班 :" prop="interestCourseClassName">
                            <span v-if="formData.interestCourseClassName">{{formData.interestCourseClassName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.subjectName">
                          <el-form-item label="科目 :" prop="subjectName">
                            <span v-if="formData.subjectName">{{formData.subjectName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.description">
                          <el-form-item label="描述 :" prop="description">
                            <span v-if="formData.description" v-html="formData.description"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="兴趣班状态 :" prop="interestCourseClassStatusCode">
                            <span v-if="formData.interestCourseClassStatusCodeStr"
                                  :style="{'color':formData.interestCourseClassStatusCodeStr.split(';')[1]}">{{formData.interestCourseClassStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <!--<div class="p50" v-if="formData.schoolYear">-->
                          <!--<el-form-item label="学年 :" prop="schoolYear">-->
                            <!--<span v-if="formData.schoolYear">{{formData.schoolYear}}</span>-->
                          <!--</el-form-item>-->
                        <!--</div>-->
                        <div class="p50" v-if="formData.schoolTerm">
                          <el-form-item label="学期 :" prop="schoolTerm">
                            <span v-if="formData.schoolTerm">{{formData.schoolTerm}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.segmentName">
                          <el-form-item label="学段 :" prop="segmentName">
                            <span v-if="formData.segmentName">{{formData.segmentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.gradeName">
                          <el-form-item label="年级 :" prop="gradeName">
                            <span v-if="formData.gradeName">{{formData.gradeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.effectiveDt">
                          <el-form-item label="开始时间 :" prop="effectiveDt">
                            <span v-if="formData.effectiveDt">{{formData.effectiveDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.expiryDt">
                          <el-form-item label="截止时间 :" prop="expiryDt">
                            <span v-if="formData.expiryDt">{{formData.expiryDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.classHourTotal">
                          <el-form-item label="总课时数 :" prop="classHourTotal">
                            <span v-if="formData.classHourTotal">{{formData.classHourTotal}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.feeAmount">
                          <el-form-item label="费用 :" prop="feeAmount">
                            <span v-if="formData.feeAmount">{{formData.feeAmount}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studyStudentLimit">
                          <el-form-item label="学生人数限制 :" prop="studyStudentLimit">
                            <span v-if="formData.studyStudentLimit">{{formData.studyStudentLimit}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studyStudentReal">
                          <el-form-item label="报读人数 :" prop="studyStudentReal">
                            <span v-if="formData.studyStudentReal">{{formData.studyStudentReal}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.entityName">
                          <el-form-item label="线上课程 :" prop="onlineCourseName">
                            <span v-if="formData.entityName">{{formData.entityName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="任课教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
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
                    <router-link :to="`/SpecialEducation/listInterestCourseClassStudent?interestCourseClassId=`+
                                  formData.interestCourseClassId">
                      <i class="iconfont icon-icon_liebiao"></i>兴趣班学生
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/SpecialEducation/listInterestCourseClassPlan?interestCourseClassId=`+
                                  formData.interestCourseClassId">
                      <i class="iconfont icon-icon_liebiao"></i>兴趣班安排
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/SpecialEducation/listInterestCourseClassStudentCheck?interestCourseClassId=`+
                                  formData.interestCourseClassId">
                      <i class="iconfont icon-icon_liebiao"></i>兴趣班学生考勤
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
  import api from "./interestcourseclassUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {coverData} from '@/util/util'

  import {mapGetters, mapMutations} from 'vuex';

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
        interestCourseClassStatusCodeOptions: [{"label": "全部", "name": ""}],
        interestCourseClassStatusCode : null,
        formData:{
          schoolId:'',
              interestCourseClassId:'',
              interestCourseClassName :"",
              subjectId :"",
              subjectName :"",
              imagePath :"",
              description :"",
              interestCourseClassStatusCode :"",
              schoolYear :"",
              schoolTerm :"",
              segmentId :"",
              gradeId :"",
              gradeName :"",
              effectiveDt :"",
              expiryDt :"",
              classHourTotal :"",
              feeAmount :"",
              studyStudentLimit :"",
              studyStudentReal :"",
              onlineCourseId :"",
              onlineCourseName :"",
              teacherId :"",
              sequnceNum :"",
          teacherName:'',
        },
        grades:{
          schoolId:null,
        },
        optionsList3: [],
        optionsList4: [],
        optionsSelectData: [],
        Subjects:[],
        options: [{
          value: '1',
          label: '上学期'
        }, {
          value: '2',
          label: '下学期'
        }],
        StatusList: {   //接口参数
          page: 1,
          limit: 999999,
          segmentName:null,
          gradeName: null,
        },
        datas:null,
        firstSchoolTerm:null,
        secondSchoolTerm:null,
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
          interestCourseClassStatusCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},
              {required: true, message: "请选择兴趣班状态", trigger: "blur"},
            ],
          segmentName:
            [
              {required: true, message: "请选择学段", trigger: "blur"},
            ],
          gradeName:
            [
              {required: true, message: "请选择年级", trigger: "blur"},
            ],
              interestCourseClassName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectName :
              [
                {required: true, message: "请选择学段", trigger: "blur"},
              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              description :
              [
                  {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

              ],
              schoolYear :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              schoolTerm :
              [
                {required: true, message: "请选择学期", trigger: "blur"},
                {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              segmentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],

              gradeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],

              effectiveDt :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              expiryDt :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              classHourTotal :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              feeAmount :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              studyStudentLimit :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              studyStudentReal :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              onlineCourseId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              onlineCourseName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              sequnceNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
        }

      }

    },
    watch:{
      firstSchoolTerm(){
        this.formData.schoolYear=this.firstSchoolTerm+'-'+this.secondSchoolTerm
        console.log(this.formData.schoolTerm)
      },
      secondSchoolTerm(){
        this.formData.schoolYear=this.firstSchoolTerm+'-'+this.secondSchoolTerm
        console.log(this.formData.schoolTerm)

      },
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
   // directives: {preview},
    created() {



      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("interestCourseClassStatus").then(res => {
            let viewList = res.data.data || [];
            for (let interestCourseClassStatusItem of viewList) {
              this.interestCourseClassStatusCodeOptions.push({
                "label": interestCourseClassStatusItem.codeDesc,
                "name": interestCourseClassStatusItem.codeId
              });
            }
            console.log(this.interestCourseClassStatusCodeOptions)
          });
          this.getList();
          this.getInformation()
    },
    methods: {
      getSubjects(){
        this.formData.subjectName=''
        this.StatusList.segmentName=this.formData.segmentName
        this.StatusList.gradeName=this.formData.gradeName
        if (this.StatusList.segmentName!==null && this.StatusList.gradeName!==null){
          this.getStatusList();
        }
        this.optionsList4.map(item=>{
          if (item.label===this.formData.gradeName){
            this.formData.gradeId = item.value

          }
        })
      },
      getSchoolYear(){
        this.secondSchoolTerm = (parseInt(this.firstSchoolTerm)+1).toString()
        this.formData.schoolYear = this.firstSchoolTerm+'-'+this.secondSchoolTerm
      },
        getInformation(){
          let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
          this.formData.schoolId=this.grades.schoolId=userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
          api.getGradeList(this.grades).then(res => {
            this.optionsSelectData = res.data.data
            // console.log(this.optionsSelectData);
            this.optionsList3 = coverData(res.data.data.children, 'name', 'id')
          })
        },

      getStatusList() {
        console.log(this.StatusList)
        api.getStatusList(this.StatusList).then(res => {
          this.Subjects = res.data.data.records;
          console.log(res.data.data)
          if (res.data.data.records.length===0){
            this.formData.subjectName='';
          }
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      sendSubjectName(){
        this.Subjects.map(item=>{
          if (item.subjectName === this.formData.subjectName){
            this.formData.subjectId=item.subjectId
            console.log(item.subjectId)
            console.log(item)
          }
        })
      },
      sendSntityName(){
        this.datas.map(item=>{
          if (item.entityName===this.formData.onlineCourseName){
            this.formData.onlineCourseId=item.entityId
          }
        })
      },

      jsCallback(event) {
        // console.log(event)
        this.formData.teacherId = event.teacherId
        this.formData.teacherName = event.userName;
      },


      segmentChange (type) {
        this.formData.subjectName=''
        this.optionsList3.map(item=>{
          if (item.value===this.formData.segmentId){
            this.formData.segmentName=item.label
            this.StatusList.segmentName=item.label
          }
        })
        if (this.StatusList.segmentName!==null && this.StatusList.gradeName!==null){
          this.getStatusList();
        }
        this.formData.gradeId = type ? this.formData.gradeId : ''
        this.optionsSelectData.children.forEach(item => {
          if (item.id === this.formData.segmentId) {
            this.optionsList4 = coverData(item.children, 'name', 'id')
          }
        })
      },
      ...mapMutations(['SET_IS_LOADING']),
      getList() {
        this.SET_IS_LOADING(true);
        api.getSystemList({
          entityType : "courseinfo",
          courseType : "courseType4XQB",
          limit : "9999",
          page : "1"
        }).then(res => {
          this.datas = res.data.data.records;
          console.log(res.data.data.records)
          this.SET_IS_LOADING(false);
        }, res => {
          this.$message.error(res.message);
          this.SET_IS_LOADING(false);
        });

      },


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
            // console.log(res.data.data)
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              // console.log(this.formData)
              if (this.$route.params.type==="edit"){
                console.log(this.formData.schoolYear)
                this.formData.schoolYear.split('-')
                this.firstSchoolTerm = this.formData.schoolYear.split('-')[0]
                this.secondSchoolTerm = this.formData.schoolYear.split('-')[1]
              }
            }
            this.isLoaded = false;
          })

        }
        // let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        // this.grades.schoolId=userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        // api.getGradeList(this.grades).then(res => {
        //   this.optionsSelectData = res.data.data
        //   // console.log(this.optionsSelectData);
        //   this.optionsList3 = coverData(res.data.data.children, 'name', 'id')
        // })
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
