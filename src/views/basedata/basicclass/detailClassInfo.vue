<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
    <el-main>
      <div class="bF5F5F5">
        <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增班级信息</el-button>
        <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑班级信息</el-button>
        <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情班级信息</el-button>
        <div class="edit-box bfff">
          <div v-if="pageState === 'add'">
            <el-form :label-position="'right'"
                     ref="formData" :inline="true" :model="skyData" :rules="rules" size="small">
              <div class="clearfix" v-for="(item,index) in skyData.lotClassList" :key="index">
                <el-col :span="3">
                  <el-form-item label="学段">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.segmentId"
                                placeholder="请您选择" @change="segmentChange">
                      <el-option value="">
                        请您选择
                      </el-option>

                      <el-option v-for="(data,index) in segmentList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="segmentClick(index,item)">{{data.name}}</div>
                      </el-option>

                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="3" v-show="item.gradeList.length">
                  <el-form-item label="年级" :prop="'lotClassList.' + index + '.gradeId'" :rules="{required: true, message: '请您选择年级', trigger: 'change'}">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.gradeId"
                               placeholder="请您选择" @change="gradeChange($event,item)">
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(data,index) in item.gradeList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="gradeClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="班级类型  :" :prop="'lotClassList.' + index + '.classTypeCode'" :rules="{ required: true, message: '请您选择班级类型', trigger: 'change'}">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                               v-model="item.classTypeCode"
                               placeholder="请您选择">
                      <el-option v-for="classTypeCodeItem in classTypeCodeOptions"
                                 :key="classTypeCodeItem.name"
                                 :label="classTypeCodeItem.label" :value="classTypeCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="学制类型  :" :prop="'lotClassList.' + index + '.lengthSchoolingCode'" :rules="{ required: true, message: '请您选择学制类型', trigger: 'change'}">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                               v-model="item.lengthSchoolingCode" placeholder="请您选择">
                      <el-option v-for="lengthSchoolingCodeItem in lengthSchoolingCodeOptions"
                                 :key="lengthSchoolingCodeItem.name"
                                 :label="lengthSchoolingCodeItem.label" :value="lengthSchoolingCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="班号 :" :prop="'lotClassList.' + index + '.classNum'" :rules="{
          required: true, message: '请您选择学制类型', trigger: 'blur'}">
                    <el-input v-model="item.classNum" class="input-v2-rao" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-form-item label="班级名称 :" :prop="'lotClassList.' + index + '.className'" :rules="{
          required: true, message: '请您选择学制类型', trigger: 'blur'}">
                    <el-input v-model="item.className" class="input-v2-rao" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="入学年份 :" :prop="'lotClassList.' + index + '.entranceSchoolYear'" :rules="{
          required: true, message: '请您选择年', trigger: 'change'}">
                    <el-date-picker class="date-v2-rao" @change="yearChange($event,item)"
                                    :picker-options="item.pickTimeStart" value-format="yyyy"
                                    popper-class="date-popper-v2-rao" v-model="item.entranceSchoolYear" type="year"
                                    placeholder="选择年"></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-form-item label="毕业年份 :">
                    <el-date-picker class="date-v2-rao" :picker-options="item.pickTimeEnd" value-format="yyyy"
                                    popper-class="date-popper-v2-rao" v-model="item.graduatedSchoolYear" type="year"
                                    placeholder="选择年"></el-date-picker>
                  </el-form-item>
                </el-col>




                <el-col :span="3">
                  <el-form-item label="场所 :"  :prop="'lotClassList.' + index + '.placeId'" >
                    <el-select class="select-v2-rao " @change="getClassName()" popper-class="select-popper-v2-rao"  v-model="item.placeId"
                               placeholder="请您选择" >
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(item,index) in palceTableDataList" :key="item.placeId"
                                 :label="item.placeName"  :value="item.placeId" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>





                <el-col :span="3">
                  <el-form-item label="班主任 :" :prop="'lotClassList.' + index + '.classMasterTeacherName'" :rules="{
          required: true, message: '请您选择年', trigger: 'change'}">
                    <el-col :span="16">
                      <el-input v-model="item.classMasterTeacherName" readonly="readonly" class="input-v2-rao"
                                maxlength="11"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="selectTeacher(item)" type="primary" size="small"
                                 class="button-v2-rao border-color-cccccc c000000 bfff">选择
                      </el-button>
                    </el-col>
                  </el-form-item>
                </el-col>

              </div>
            </el-form>

            <div class="clearfix">
              <el-button type="primary" class="mt10" size="small"
                         @click="addItem"><i class="iconfont icon-icon_xinjian f12 cfff"></i>新增
              </el-button>
            </div>


          </div>

          <div v-if="pageState === 'edit'">


            <el-form :label-position="'right'"
                     ref="formData" :inline="true" :model="skyData" :rules="rules" size="small">
              <div class="clearfix" v-for="(item,index) in skyData.lotClassList" :key="index">
                <el-col :span="3">
                  <el-form-item label="学段">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.segmentId"
                               v-if="!isDisabled" placeholder="请您选择" @change="segmentChange">
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(data,index) in segmentList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="segmentClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                    <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="item.segmentId"
                               v-if="isDisabled" disabled placeholder="请您选择" @change="segmentChange">
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(data,index) in segmentList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="segmentClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="3" v-show="item.gradeList.length">
                  <el-form-item label="年级" :prop="'lotClassList.' + index + '.gradeId'" :rules="{
          required: true, message: '请您选择年级', trigger: 'change'}">
                    <el-select class="select-v2-rao p100" disabled="disabled" popper-class="select-popper-v2-rao"
                               v-model="item.gradeId"
                               placeholder="请您选择" @change="gradeChange($event,item)">
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(data,index) in item.gradeList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="gradeClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="班级类型  :" :prop="'lotClassList.' + index + '.classTypeCode'" :rules="{
          required: true, message: '请您选择班级类型', trigger: 'change'}">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                               v-model="item.classTypeCode"
                               placeholder="请您选择">
                      <el-option v-for="classTypeCodeItem in classTypeCodeOptions"
                                 :key="classTypeCodeItem.name"
                                 :label="classTypeCodeItem.label" :value="classTypeCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="学制类型  :" :prop="'lotClassList.' + index + '.lengthSchoolingCode'" :rules="{
          required: true, message: '请您选择学制类型', trigger: 'change'}">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                               v-model="item.lengthSchoolingCode" placeholder="请您选择">
                      <el-option v-for="lengthSchoolingCodeItem in lengthSchoolingCodeOptions"
                                 :key="lengthSchoolingCodeItem.name"
                                 :label="lengthSchoolingCodeItem.label" :value="lengthSchoolingCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="班号 :" :prop="'lotClassList.' + index + '.classNum'" :rules="{
          required: true, message: '请您选择学制类型', trigger: 'blur'}">
                    <el-input v-model="item.classNum" disabled="disabled" class="input-v2-rao"
                              maxlength="11"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-form-item label="班级名称 :" :prop="'lotClassList.' + index + '.className'" :rules="{
          required: true, message: '请您选择学制类型', trigger: 'blur'}">
                    <el-input v-model="item.className" disabled="disabled" class="input-v2-rao"
                              maxlength="11"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="入学年份 :" :prop="'lotClassList.' + index + '.entranceSchoolYear'" :rules="{
          required: true, message: '请您选择年', trigger: 'change'}">
                    <el-date-picker disabled="disabled" class="date-v2-rao" @change="yearChange($event,item)"
                                    :picker-options="item.pickTimeStart" value-format="yyyy"
                                    popper-class="date-popper-v2-rao" v-model="item.entranceSchoolYear" type="year"
                                    placeholder="选择年"></el-date-picker>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="毕业年份 :">
                    <el-date-picker class="date-v2-rao" :picker-options="item.pickTimeEnd" value-format="yyyy"
                                    popper-class="date-popper-v2-rao" v-model="item.graduatedSchoolYear" type="year"
                                    placeholder="选择年"></el-date-picker>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="场所 :"  :prop="'lotClassList.' + index + '.placeId'" >
                    <el-select class="select-v2-rao " @change="getClassName()" popper-class="select-popper-v2-rao"  v-model="item.placeId"
                               placeholder="请您选择" >
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(item,index) in palceTableDataList" :key="item.placeId"
                                 :label="item.placeName"  :value="item.placeId" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="班主任 :" :prop="'lotClassList.' + index + '.classMasterTeacherName'" :rules="{
          required: true, message: '请您选择年', trigger: 'change'}">
                    <el-col :span="16">
                      <el-input v-model="item.classMasterTeacherName" readonly="readonly" class="input-v2-rao"
                                maxlength="11"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="selectTeacher(item)" type="primary" size="small"
                                 class="button-v2-rao border-color-cccccc c000000 bfff">选择
                      </el-button>
                    </el-col>
                  </el-form-item>
                </el-col>
              </div>
            </el-form>


          </div>

          <!--<div v-if="pageState === 'edit'">
            <div class="clearfix" v-for="(item,index) in lotClassList" :key="index">
              <el-form :label-position="'right'"
                       ref="formData" :inline="true" :model="item" :rules="rules" size="small">

                <el-col :span="3">
                  <el-form-item label="学段">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.segmentId"
                               v-if="!isDisabled" placeholder="请您选择" @change="segmentChange">
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(data,index) in segmentList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="segmentClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                    <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="item.segmentId"
                               v-if="isDisabled" disabled placeholder="请您选择" @change="segmentChange">
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(data,index) in segmentList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="segmentClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="3" v-show="item.gradeList.length">
                  <el-form-item label="年级">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.gradeId"
                               placeholder="请您选择" @change="gradeChange">
                      <el-option value="">
                        请您选择
                      </el-option>
                      <el-option v-for="(data,index) in item.gradeList" :key="index"
                                 :label="data.name" :value="data.id">
                        <div @click="gradeClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="班级类型 *  :" prop="classTypeCode">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.classTypeCode"
                               placeholder="请您选择">
                      <el-option v-for="classTypeCodeItem in classTypeCodeOptions"
                                 :key="classTypeCodeItem.name"
                                 :label="classTypeCodeItem.label" :value="classTypeCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="学制类型 *  :" prop="lengthSchoolingCode">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                               v-model="item.lengthSchoolingCode" placeholder="请您选择">
                      <el-option v-for="lengthSchoolingCodeItem in lengthSchoolingCodeOptions"
                                 :key="lengthSchoolingCodeItem.name"
                                 :label="lengthSchoolingCodeItem.label" :value="lengthSchoolingCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="班号 :" prop="classNum">
                    <el-input v-model="item.classNum" class="input-v2-rao" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-form-item label="班级名称 :" prop="className">
                    <el-input v-model="item.className" class="input-v2-rao" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="入学年份 :">
                    <el-date-picker class="date-v2-rao" @change="yearChange($event,item,index)" value-format="yyyy" popper-class="date-popper-v2-rao"
                                    v-model="item.entranceSchoolYear" type="year" placeholder="选择年"></el-date-picker>
                  </el-form-item>
                </el-col>


                <el-col :span="3">
                  <el-form-item label="毕业年份 :">
                    <el-date-picker class="date-v2-rao" value-format="yyyy" popper-class="date-popper-v2-rao"
                                    v-model="item.graduatedSchoolYear" type="year" placeholder="选择年"></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-form-item label="班主任 :" prop="teacherName">
                    <el-col :span="16">
                      <el-input v-model="item.classMasterTeacherName" readonly="readonly" class="input-v2-rao"
                                maxlength="11"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="selectTeacher(item)" type="primary" size="small"
                                 class="button-v2-rao border-color-cccccc c000000 bfff">选择
                      </el-button>
                    </el-col>
                  </el-form-item>
                </el-col>

              </el-form>
            </div>

          </div>-->


          <div v-if="pageState === 'detail'">
            <el-row>
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                <!-- 详细查看 -->
                <el-form :label-position="'right'" class="" label-width="165px"
                         :inline="true" :model="formData" size="small">


                  <el-col :span="8" v-if="formData.schoolName">
                    <el-form-item label="学校 :" prop="schoolName">
                      {{formData.schoolName}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="班号 :" prop="classNum">
                      {{formData.classNum}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.className">
                    <el-form-item label="班级名称 :" prop="className">
                      {{formData.className}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.classTypeCode">
                    <el-form-item label="班级类型 :" prop="classTypeCode"
                                  :style="{'color':formData.classTypeCodeStr.split(';')[1]}">
                      {{formData.classTypeCodeStr.split(';')[0]}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.lengthSchoolingCode">
                    <el-form-item label="学制类型 :" prop="lengthSchoolingCode"
                                  :style="{'color':formData.lengthSchoolingCodeStr.split(';')[1]}">
                      {{formData.lengthSchoolingCodeStr.split(';')[0]}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.gradeName">
                    <el-form-item label="所属年级 :" prop="gradeName">
                      {{formData.gradeName}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.segmentName">
                    <el-form-item label="所属学段 :" prop="segmentName">
                      {{formData.segmentName}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.entranceSchoolYear">
                    <el-form-item label="入学年份 :" prop="entranceSchoolYear">
                      {{formData.entranceSchoolYear}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.graduatedSchoolYear">
                    <el-form-item label="毕业年份 :" prop="graduatedSchoolYear">
                      {{formData.graduatedSchoolYear}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.classMasterTeacherName">
                    <el-form-item label="班主任 :" prop="classMasterTeacherName">
                      {{formData.classMasterTeacherName}}
                    </el-form-item>
                  </el-col>


                </el-form>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="menu-quickly">
                  <ul>
                    <li>
                      <router-link :to="`/basedata/listStudent?classId=${formData.classId}`"><img
                        src="~@/assets/img/menu_quickly/icon_studentinfo.png" width="20"/>班级学生
                      </router-link>
                    </li>
                    <li>
                      <router-link
                        :to="`/basedata/listClassTeacher?classId=${formData.classId}&gradeId=${formData.gradeId}`"><img
                        src="~@/assets/img/menu_quickly/icon_teacher.png"/>班级老师
                      </router-link>
                    </li>
                    <!--<li><router-link :to="`/basedata/detailTeacher/detail/${formData.classMasterTeacherId}`"><img src="~@/assets/img/menu_quickly/icon_parentAndstudent.png"/>班主任</router-link></li>-->
                    <li><a href="javascript:void(0)" @click="titleClick(formData.classMasterTeacherId)"><img
                      src="~@/assets/img/menu_quickly/icon_parentAndstudent.png"/>班主任</a></li>
                    <li>
                      <router-link :to="`/basedata/listParent?classId=${formData.classId}`"><img
                        src="~@/assets/img/menu_quickly/icon_parent.png"/>家长
                      </router-link>
                    </li>
                    <li @click="toFileClient">
                      <router-link to="">
                        <i class="iconfont icon-icon_yingyongguanlianwenan"></i>班级文件
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listClassCommitteeMember?classId=${formData.classId}`"><i class="iconfont icon-icon_gerenziliao"></i>班委会
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listClassParentCommitteeMember?classId=${formData.classId}`"><i class="iconfont icon-icon_mingdan"></i>家委会
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listStudentFamilyVisit?classId=${formData.classId}`"><i class="iconfont icon-icon_liebiao"></i>家访
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listClassMeetingInfo?classId=${formData.classId}`"><i class="iconfont icon-icon_liebiao"></i>家长会
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listClassHonor?classId=${formData.classId}`"><i class="iconfont icon-icon_liebiao"></i>班级荣誉
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listClassPacesetter?classId=${formData.classId}`"><i class="iconfont icon-icon_liebiao"></i>班级标兵
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listClassBestWork?classId=${formData.classId}`"><i class="iconfont icon-icon_liebiao"></i>优秀作品
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="`/homeSchLink/listClassStudentComment?classId=${formData.classId}`"><i class="iconfont icon-icon_liebiao"></i>学生评语
                      </router-link>
                    </li>



                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="clearfix"></div>

          <div class="text-center">

            <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                       @click="submit('formData')">更新
            </el-button>
            <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                       @click="submit('formData')">发布
            </el-button>
            <el-button type="primary" class="mr80" size="small"
                       @click="goBack">返回
            </el-button>

          </div>

        </div>
      </div>
    </el-main>
  </el-container>

</template>

<script>
  import api from "./basicclassUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import {mapMutations, mapGetters} from 'vuex';
  import {str2Time} from "@/util/util"
  import {getStore, setStore} from '@/util/store'
  import {
    getToken
  } from '@/util/auth'
  export default {
    data() {
      return {
        palceTableDataList:[],

        skyData: {
          lotClassList: [
            {
              "classNum": "",
              "className": "",
              "classTypeCode": "",
              "lengthSchoolingCode": "",
              "gradeId": "",
              "gradeName": "",
              "segmentId": "",
              "segmentName": "",
              "entranceSchoolYear": "",
              "graduatedSchoolYear": "",
              "classMasterTeacherId": "",
              "classMasterTeacherName": "",
              "schoolId": "",
              "schoolName": "",
              "gradeList": []
            }

          ],
        },
        /*lotClassList: [
          {
            "classNum": "",
            "className": "",
            "classTypeCode": "",
            "lengthSchoolingCode": "",
            "gradeId": "",
            "gradeName": "",
            "segmentId": "",
            "segmentName": "",
            "entranceSchoolYear": "",
            "graduatedSchoolYear": "",
            "classMasterTeacherId": "",
            "classMasterTeacherName": "",
            "schoolId": "",
            "schoolName": "",
            "gradeList": []
          }

        ],*/
        isDisabled: false,
        formData1: {
          grade: "",
          segment: ""
        },
        place:{
          schoolId:null
        },
        segmentList: [],
        gradeList: [],
        msg: {
          schoolData: {},
          segment: {},
          grade: {}
        },
        watcher: null,
        conf: {
          segmentId: "",
          gradeId: ""
        },
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        classTypeCodeOptions: [{"label": "全部", "name": ""}], classTypeCode: null,
        lengthSchoolingCodeOptions: [{"label": "全部", "name": ""}], lengthSchoolingCode: null,
        formData: {
          classNum: null,
          className: "",
          classTypeCode: "",
          lengthSchoolingCode: "",
          gradeId: "",
          gradeName: "",
          segmentId: "",
          segmentName: "",
          entranceSchoolYear: "",
          graduatedSchoolYear: "",
          classMasterTeacherId: "",
          classMasterTeacherName: "",
          schoolId: "",
          schoolName: ""
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          schoolId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          schoolName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          className: [
            {required: true, message: "请您输入班级名称", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          classTypeCode: [
            {required: true, message: "请您输入班级类型", trigger: "change"},
            {max: 32, message: "最多能输入32个字", trigger: "change"},

          ],
          lengthSchoolingCode: [
            {required: true, message: "请您输入学制类型", trigger: "change"},
            {max: 255, message: "最多能输入255个字", trigger: "change"},

          ],
          gradeId: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          gradeName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          segmentId: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          segmentName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          entranceSchoolYear: [
            {validator: validation.number, trigger: "blur"},

          ],
          graduatedSchoolYear: [
            {validator: validation.number, trigger: "blur"},

          ],
          classMasterTeacherId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          classMasterTeacherName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
        }
      }
    },
    computed: {
      ...mapGetters(['schoolInfo', 'isLoading']),
      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor, upload},
    created() {
      this.getList()
      this.SET_IS_LOADING(false)
      this.pickTime1()

      this.getDetail(this.$route.params.id);
      this.formData.schoolId = this.schoolInfo.schoolOrgId
      this.formData.schoolName = this.schoolInfo.schoolOrgName
      commonApi.getCodeIntType("classType").then(res => {
        let viewList = res.data.data || [];
        for (let classTypeItem of viewList) {
          this.classTypeCodeOptions.push({
            "label": classTypeItem.codeDesc,
            "name": classTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("lengthSchooling").then(res => {
        let viewList = res.data.data || [];
        for (let lengthSchoolingItem of viewList) {
          this.lengthSchoolingCodeOptions.push({
            "label": lengthSchoolingItem.codeDesc,
            "name": lengthSchoolingItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      this.getSchoolTree();
    },
    watch: {
      lotClassList(val) {
        this.pickTime1()
      },
      watcher() {

        this.formData.segmentId = this.msg.segment.id;
        this.formData.segmentName = this.msg.segment.name;
        this.formData.gradeId = this.msg.grade.id;
        this.formData.gradeName = this.msg.grade.name;
      }
    },
    methods: {
      getList(){
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.place.schoolId=userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.getPlaceList(this.place).then(res => {
          this.palceTableData=res.data.data
          for (let i=0;i<this.palceTableData.length;i++){
            this.palceTableDataList.push({placeName:this.palceTableData[i].placeName,placeId:this.palceTableData[i].placeId}  );
          }
          // console.log(this.palceTableData)
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          }
        })
      },

      getClassName(){
        for (let i=0;i<this.skyData.lotClassList.length;i++){
          for (let j=0;j<this.palceTableDataList.length;j++)
            if (this.skyData.lotClassList[i].placeId === this.palceTableDataList[j].placeId) {
              this.skyData.lotClassList[i].placeName=this.palceTableDataList[j].placeName
          }
        }
      },
      ...mapMutations(['SET_IS_LOADING']),
      toFlieCilent(id, path) {
        let userId =  getStore({name:'userInfo'}).id
        let b = 'http://192.168.2.60:3088';

        if(window.location.host == "47.106.35.119"){
          b = "http://47.106.35.119:5388"
        }
        let opath = b+'/#/'+ path + '?classId=' + id+'&token=Bearer '+ getToken() + '&userId=' + userId;
        // console.log(opath);
        window.open(opath,'_blank');
      },
      pickTime1() {
        this.skyData.lotClassList.map(item => {
          item.pickTimeEnd = {
            disabledDate(time) {
              let start = item.entranceSchoolYear;
              return time.getTime() < str2Time(start);
            }
          }
          item.pickTimeStart = {
            disabledDate(time) {
              let start = item.graduatedSchoolYear;
              return time.getTime() > str2Time(start);
            }
          }
        })
      },
      selectTeacher(data) {
        this.$callTeacherDialog({
          callback: (msg) => {

            data.classMasterTeacherName = msg.userName
            data.classMasterTeacherId = msg.teacherId
          }
        })
      },
      addItem() {
        this.skyData.lotClassList.push({
          "classNum": "",
          "className": "",
          "classTypeCode": "",
          "lengthSchoolingCode": "",
          "gradeId": "",
          "gradeName": "",
          "segmentId": "",
          "segmentName": "",
          "entranceSchoolYear": "",
          "graduatedSchoolYear": "",
          "classMasterTeacherId": "",
          "classMasterTeacherName": "",
          "schoolId": "",
          "schoolName": "",
          "gradeList": ""
        })
        this.getSchoolTree()
      },
      titleClick(classMasterTeacherId) {
        this.$detailDialog({
          title: "教师",
          url: `/user/teacherAd/${classMasterTeacherId}`,
          items: [
            {
              key: "schoolName",
              name: "学校名"
            },
            {
              key: "userName",
              name: "教师"
            },
            {
              key: "telPhoneNum",
              name: "电话号码"
            },
            {
              key: "joinPartisanDt",
              name: "加入时间"
            },
            {
              key: "gender",
              name: "性别"
            },
            {
              key: "teachGradeName",
              name: "年级"
            },
            {
              key: "teachSegmentName",
              name: "学段"
            },
            {
              key: "teachSubjectName",
              name: "学科"
            }
          ]
        })
      },
      yearChange(event, item) {
        // console.log(event)
        if (!item.gradeId) {
          this.$message.error("请您先选择年级!");
          return;
        }
        this.SET_IS_LOADING(true)
        api.fetchList({   //接口参数
          page: 1,
          limit: 9999,
        }).then(res => {
          let count = 1;
          res.data.data.records = res.data.data.records.filter(item2 => {
            return item2.segmentId == item.segmentId
          })
          res.data.data.records.forEach(item => {
            // console.log(item.classNum)
          })
          let _b = () => {
            let _a = res.data.data.records.some(item1 => {
              return item1.classNum == `${item.segmentId}0${event}0${count}`
            })
            if (_a) {
              count++;
              _b();
            } else {
              if (count < 10) {
                item.classNum = `${item.segmentId}0${event}0${count}`
                item.className = `${item.gradeName}${count}班`
              }
              if (count >= 10) {
                item.classNum = `${item.segmentId}0${event}${count}`
                item.className = `${item.gradeName}${count}班`
              }
              this.$refs['formData'].validate()
              return;
            }

          }
          _b();
          this.SET_IS_LOADING(false)
        })

      },
      jsCallback(event) {
        this.formData.classMasterTeacherId = event.teacherId;
        this.formData.classMasterTeacherName = event.userName;
      },
      treeCall(event) {
        this.formData.segmentId = event.segment.id;
        this.formData.segmentName = event.segment.name;
        this.formData.gradeId = event.grade.id;
        this.formData.gradeName = event.grade.name;
      },
      //图片上传
      uploadData(res) {
        this.formData.imagePath = res;
      },
      //编辑器
      getEditorValue(val) {
        this.formData.content = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {

          if (this.pageState === "edit" && valid) {
            this.formLoading = true;
            for (let key in this.skyData.lotClassList[0]) {
              this.formData[key] = this.skyData.lotClassList[0][key]
            }
            api.putObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add" && valid) {

            this.formLoading = true;
            let _a = [];
            this.skyData.lotClassList.map(item => {
              _a.push({
                className: item.className,
                classNum: item.classNum,
                entranceSchoolYear: item.entranceSchoolYear,
                segmentName: item.segmentName,
                segmentId: item.segmentId,
                gradeName: item.gradeName,
                gradeId: item.gradeId,
                classMasterTeacherName: item.classMasterTeacherName,
                classMasterTeacherId: item.classMasterTeacherId,
                classTypeCode: item.classTypeCode,
                lengthSchoolingCode: item.lengthSchoolingCode,
                graduatedSchoolYear: item.graduatedSchoolYear,
                placeId: item.placeId,
                placeName: item.placeName,
              })
            })

            api.addBatchNew(_a).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }
        })

        this.isLoaded = false;

      },


      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {

              res.data.data.entranceSchoolYear = res.data.data.entranceSchoolYear && res.data.data.entranceSchoolYear.toString()
              res.data.data.graduatedSchoolYear = res.data.data.graduatedSchoolYear && res.data.data.graduatedSchoolYear.toString()
              this.formData = res.data.data
              this.conf.segmentId = this.formData.segmentId
              this.conf.gradeId = this.formData.gradeId

              /*this.lotClassList.push({
              "classNum": "",
              "className": "",
              "classTypeCode": "",
              "lengthSchoolingCode": "",
              "gradeId": "",
              "gradeName": "",
              "segmentId": "",
              "segmentName": "",
              "entranceSchoolYear": "",
              "graduatedSchoolYear": "",
              "classMasterTeacherId": "",
              "classMasterTeacherName": "",
              "schoolId": "",
              "schoolName": "",
              "gradeList" : ""
          })*/
              for (let key in res.data.data) {
                this.skyData.lotClassList[0][key] = res.data.data[key]
              }

              // console.log(this.skyData)
              this.formData.schoolId = this.schoolInfo.schoolOrgId
              this.formData.schoolName = this.schoolInfo.schoolOrgName

              //this.pageState == "edit" && this.$refs.teacher.setRoleId(this.formData.classMasterTeacherId,this.formData.classMasterTeacherName)
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      segmentChange(event) {
        this.formData1.grade = "";
        this.watcher = this.msg.grade = {}
        if (event == "") {
          this.gradeList = [];
          this.watcher = this.msg.segment = {} = this.msg.grade = {}
        }
      },
      segmentClick(index, data) {
        if (this.segmentList.length) {
          data.segmentName = this.segmentList[index].name;
          this.watcher = this.msg.segment = this.segmentList[index];
          data.gradeList = this.segmentList[index].children;
        } else {
          data.gradeList = "";
        }
      },
      gradeChange(event, item) {
        if (item.entranceSchoolYear) {
          this.SET_IS_LOADING(true)
          api.fetchList({   //接口参数
            page: 1,
            limit: 9999,
          }).then(res => {
            let count = 1;
            res.data.data.records = res.data.data.records.filter(item2 => {
              return item2.segmentId == item.segmentId
            })
            res.data.data.records.forEach(item => {
              // console.log(item.classNum)
            })
            let _b = () => {
              let _a = res.data.data.records.some(item1 => {
                return item1.classNum == `${item.segmentId}0${item.entranceSchoolYear}0${count}`
              })
              if (_a) {
                count++;
                _b();
              } else {
                if (count < 10) {
                  item.classNum = `${item.segmentId}0${item.entranceSchoolYear}0${count}`
                  item.className = `${item.gradeName}${count}班`
                }
                if (count >= 10) {
                  item.classNum = `${item.segmentId}0${item.entranceSchoolYear}${count}`
                  item.className = `${item.gradeName}${count}班`
                }
                this.$refs['formData'].validate()
                return;
              }

            }
            _b();
            this.SET_IS_LOADING(false)

          })
        }
        if (event == "") {
          this.watcher = this.msg.grade = {}
        }
      },
      gradeClick(index, data) {
        if (data.gradeList.length) {
          data.gradeName = data.gradeList[index].name;
          this.watcher = this.msg.grade = this.gradeList[index];
        }
      },
      toFileClient(){
        let userId =  getStore({name:'userInfo'}).id;
        let username = getStore({name:'userInfo'}).username
        let classId = this.$route.params.id;
        //let opath = 'http://192.168.2.60:3088/#/WebTologin?token='+ getToken() + '&userId=' + userId;
        // let opath = `http://192.168.2.194:9999/#/WebTologin?token=${getToken()}&userId=${userId}&username=${username}&classId=${classId}`
        let b = 'http://192.168.2.60:3088'


        if(window.location.host == "47.106.35.119"){
          b = "http://47.106.35.119:5388"
        }
        let opath = `${b}/#/WebTologin?token=${getToken()}&userId=${userId}&username=${username}&classId=${classId}`
        // console.log(opath);
        window.open(opath,'_blank');
      },
      getSchoolTree() {
        commonApi.getSegmentGrade().then((res) => {
          // console.log(res.data.data.children[0].children)
          if (res.data.resultCode === '000000' ) {
            res.data.data.children.map((item, index) => {
              item['pid'] = `${index}`;
              item.children.map((item1, index1) => {
                item1['pid'] = `${index1}`;
              })
            })
            this.msg.schoolData = res.data.data;
            this.segmentList = res.data.data.children;
            if (this.segmentList.length == 1) {
              this.isDisabled = true;
              this.watcher = this.msg.segment = this.segmentList[0];
              this.formData1.segment = this.msg.segment.id;
              //this.gradeList = this.segmentList[this.segmentList[0].pid].children;
              this.skyData.lotClassList.forEach(item => {
                item.segmentId = this.segmentList[0].id;
                item.segmentName = this.segmentList[0].name;
                item.gradeList = this.segmentList[this.segmentList[0].pid].children;
              })
              //this.lotClassList[0].segmentId = this.segmentList[0].id;
              //this.lotClassList[0].segmentName = this.segmentList[0].name;
              //this.lotClassList[0].gradeList = this.segmentList[this.segmentList[0].pid].children;
            }

            for (let i = 0; i < this.segmentList.length; i++) {
              if (this.segmentList[i].id == this.conf.segmentId) {
                this.watcher = this.msg.segment = this.segmentList[i];
                this.formData1.segment = this.conf.segmentId;
                //this.gradeList = this.segmentList[this.segmentList[i].pid].children;
                //this.lotClassList[0].gradeList = this.segmentList[this.segmentList[i].pid].children;
                this.skyData.lotClassList.forEach(item => {
                  item.gradeList = this.segmentList[this.segmentList[i].pid].children;
                })
              }
              for (let j = 0; j < this.segmentList[i].children.length; j++) {
                if (this.segmentList[i].children[j].id == this.conf.gradeId) {
                  this.watcher = this.msg.grade = this.segmentList[i].children[j];
                  //this.gradeList = this.segmentList[i].children;
                  //this.lotClassList[0].gradeList = this.segmentList[i].children;
                  this.skyData.lotClassList.forEach(item => {
                    item.gradeList = this.segmentList[i].children;
                  })
                  this.formData1.grade = this.conf.gradeId;
                }
              }
            }
          } else {
            this.$message.error(`学段下拉框提示:${res.data.data.message}`);
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 166px;
    border: 1px solid #d8d8d8;

    a.current {
      background: #4A9388;
      color: #fff
    }

    a {
      padding: 10px 0 10px 15px;
      font-size: 14px;
      display: block;

      img {
        padding-right: 8px;
        vertical-align: -4px;
      }

    }

    a:hover {
      text-decoration: none;
    }

  }

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }


</style>
