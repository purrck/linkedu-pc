<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
    <el-main>
      <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑学校信息</el-button>
      <div class="bfff">
        <div class="edit-box" v-if="pageState == 'edit' || pageState == 'add'">

          <el-row>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <!-- 编辑状态或者新增 -->
              <div class="clearfix p100 mb20">
                <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                  基本信息<span class="ca9a9a9">（注：*为必填信息）</span>
                </div>
              </div>

              <el-form :label-position="'right'" label-width="200px" ref="formData" :inline="false"
                       :model="formData" :rules="rules" size="small">
                <el-col :span="12">
                  <el-form-item label="学校名称 :" prop="schoolOrgName">
                    <el-input v-model="formData.schoolOrgName" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地区名称 :" prop="areaNum" class="school-areaNum">
                    <chinaCity v-on:getCity="getCity" :areaProv="areaProv" :areaCity="areaCity"></chinaCity>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学校（机构）代码  :" prop="schoolOrgNum">
                    <el-input v-model="formData.schoolOrgNum" class="input-v2-rao" maxlength="64"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮政编码 :" prop="postNum">
                    <el-input v-model="formData.postNum" class="input-v2-rao" maxlength="16"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学校（机构）简称  :" prop="schoolShortName">
                    <el-input v-model="formData.schoolShortName" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系人 :" prop="contactName">
                    <el-input v-model="formData.contactName" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学校（机构）英文 名称 :" prop="schoolOrgNameEn">
                    <el-input v-model="formData.schoolOrgNameEn" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话 :" prop="contactPhoneNum">
                    <el-input v-model="formData.contactPhoneNum" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机构类型 :" prop="orgTypeCode">
                    <el-select v-model="formData.orgTypeCode" placeholder="请您选择" popper-class="select-popper-v2-rao"
                               class="block select-v2-rao">
                      <el-option v-for="orgTypeCodeItem in orgTypeCodeOptions" :key="orgTypeCodeItem.name"
                                 :label="orgTypeCodeItem.label" :value="orgTypeCodeItem.name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="传真电话 :" prop="contactFaxNum">
                    <el-input v-model="formData.contactFaxNum" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="12">
                  <el-form-item label="学校主管部门 :" prop="schoolAdminOrgName">
                    <el-input v-model="formData.schoolAdminOrgName" class="input-v2-rao" maxlength="128"></el-input>
                  </el-form-item>
                </el-col>-->
                <el-col :span="12">
                  <el-form-item label="电子邮箱 :" prop="contactEmail">
                    <el-input v-model="formData.contactEmail" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学校办学类型 :" prop="schoolRunTypeCode">
                    <el-select v-model="formData.schoolRunTypeCode" placeholder="请您选择"
                               popper-class="select-popper-v2-rao" class="select-v2-rao block">
                      <el-option v-for="schoolRunTypeCodeItem in schoolRunTypeCodeOptions"
                                 :key="schoolRunTypeCodeItem.name"
                                 :label="schoolRunTypeCodeItem.label" :value="schoolRunTypeCodeItem.name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主页地址 :" prop="webUrl">
                    <el-input v-model="formData.webUrl" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学校（机构）地址  :" prop="orgAddress">
                    <el-input v-model="formData.orgAddress" class="input-v2-rao" maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="12">
                  <el-form-item label="学段 :" prop="segmentId">
                    <el-select v-model="formData.segmentId" class="select-v2-rao block"
                               popper-class="select-popper-v2-rao" @change="xueduanChange" placeholder="请您选择">
                      <el-option v-for="schoolRunTypeCodeItem in basicSegmentAdOptions"
                                 :key="schoolRunTypeCodeItem.name"
                                 :label="schoolRunTypeCodeItem.label" :value="schoolRunTypeCodeItem.name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>-->
                <el-col :span="24">
                  <el-form-item label="图片详情 :" prop="imagePath">
                    <upload v-on:uploadData="uploadData" :many="1" :imagelist="formData.imagePath"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学校介绍 :" prop="orgIntroduction">
                    <editor v-model="formData.orgIntroduction" :true-height="350"/>
                  </el-form-item>
                </el-col>
                <div class="clearfix"></div>
                <div class="clearfix p100 mb20">
                  <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                    选填信息 <i class="iconfont icon-icon_xiala f12"></i>
                  </div>
                </div>
                <div>
                  <el-col :span="12">
                    <el-form-item label="组织机构码 :" prop="organizationNum">
                      <el-input v-model="formData.organizationNum" class="input-v2-rao" maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="党委负责人号 :" prop="partyCommitteeLeader">
                      <el-input v-model="formData.partyCommitteeLeader" class="input-v2-rao" maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="行政区划码 :" prop="adminAreaNum">
                      <el-input v-model="formData.adminAreaNum" class="input-v2-rao" maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="法定代表人号 :" prop="legalRepresentativeNum">
                      <el-input v-model="formData.legalRepresentativeNum" class="input-v2-rao"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="学校主管部门码 :" prop="schoolAdminOrgNum">
                      <el-input v-model="formData.schoolAdminOrgNum" class="input-v2-rao" maxlength="63"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="法人证书号  :" prop="legalPersonCertificateNum">
                      <el-input v-model="formData.legalPersonCertificateNum" class="input-v2-rao"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="建校年月 :" prop="schoolSinceYear">
                      <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao"
                                      v-model="formData.schoolSinceYear" type="date"
                                      placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="12">
                    <el-form-item label="校长工号 :" prop="principalTeacherNum">
                      <el-input v-model="formData.principalTeacherNum" class="input-v2-rao" maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>-->
                  <el-col :span="12">
                    <el-form-item label="校庆日 :" prop="schoolCelebrateDay">
                      <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao"
                                      v-model="formData.schoolCelebrateDay" type="date"
                                      placeholder="选择日期" value-format="yyyy-MM-dd" format="MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="12">
                    <el-form-item label="校长姓名 :" prop="principalTeacherName">
                      <el-input v-model="formData.principalTeacherName" class="input-v2-rao" maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>-->
                </div>
              </el-form>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="menu-quickly"></div>
            </el-col>
          </el-row>
        </div>

        <div class="edit-box" v-if="pageState == 'detail'">
          <el-row>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <div class="relative">
                <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
                <div class="absolute top-0 right10">
                  <el-button type="primary" size="small" class="button-v2-rao b93BF88 "
                             @click="toEdit(formData.schoolOrgId)">
                    编辑
                  </el-button>
                </div>

              </div>
              <!-- 详细查看 -->
              <el-form :label-position="'right'" label-width="170px"
                       ref="formData" :inline="true" :model="formData" :rules="rules" size="small"
                       class="flex wrap row">
                <div class="clearfix p100 mb20">
                  <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                    基本信息
                  </div>
                </div>

                <el-col :span="8">
                  <el-form-item label="地区名称 :" prop="areaNum">
                    <span v-if="formData.areaNum"> {{formData.areaNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学校（机构）代码 :" prop="schoolOrgNum">
                    <span v-if="formData.schoolOrgNum"> {{formData.schoolOrgNum}}</span>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label="邮政编码 :" prop="postNum">
                    <span v-if="formData.postNum"> {{formData.postNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学校（机构）简称 :" prop="schoolShortName">
                    <span v-if="formData.schoolShortName"> {{formData.schoolShortName}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系人 :" prop="contactName">
                    <span v-if="formData.contactName"> {{formData.contactName}}</span>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label="学校（机构）英文 名称 :" prop="schoolOrgNameEn">
                    <span v-if="formData.schoolOrgNameEn"> {{formData.schoolOrgNameEn}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系电话 :" prop="contactPhoneNum">
                    <span v-if="formData.contactPhoneNum"> {{formData.contactPhoneNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="机构类型 :" prop="orgTypeCode">
                    <span v-if="formData.orgTypeCode"> {{formData.orgTypeCode}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="传真电话 :" prop="contactFaxNum">
                    <span v-if="formData.contactFaxNum"> {{formData.contactFaxNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学校主管部门 :" prop="schoolAdminOrgName">
                    <span v-if="formData.schoolAdminOrgName"> {{formData.schoolAdminOrgName}}</span>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label="电子邮箱 :" prop="contactEmail">
                    <span v-if="formData.contactEmail"> {{formData.contactEmail}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学校办学类型 :" prop="schoolRunTypeCode">
                    <span v-if="formData.schoolRunTypeCode"> {{formData.schoolRunTypeCode}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="主页地址 :" prop="webUrl">
                    <span v-if="formData.webUrl"> {{formData.webUrl}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学校（机构）地址 :" prop="orgAddress">
                    <span v-if="formData.orgAddress"> {{formData.orgAddress}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学段 :" prop="segmentName">
                    <span v-if="formData.segmentName"> {{formData.segmentName}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="图片详情 :" prop="imagePath">
                    <img :src="formData.imagePath" style="max-width:700px"/>
                  </el-form-item>
                </el-col>


                <div class="clearfix p100 mb20">
                  <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                    学校介绍
                  </div>
                </div>


                <div class="mb20" v-html="formData.orgIntroduction"></div>


                <div class="clearfix"></div>


                <div class="clearfix p100 mb20">
                  <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                    选填信息 <i class="iconfont icon-icon_xiala f12"></i>
                  </div>
                </div>

                <el-col :span="8">
                  <el-form-item label="组织机构码 :" prop="organizationNum">
                    <span v-if="formData.organizationNum"> {{formData.organizationNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="党委负责人号 :" prop="partyCommitteeLeader">
                    <span v-if="formData.partyCommitteeLeader"> {{formData.partyCommitteeLeader}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="行政区划码 :" prop="adminAreaNum">
                    <span v-if="formData.adminAreaNum"> {{formData.adminAreaNum}}</span>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label="法定代表人号 :" prop="legalRepresentativeNum">
                    <span v-if="formData.legalRepresentativeNum"> {{formData.legalRepresentativeNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学校主管部门码 :" prop="schoolAdminOrgNum">
                    <span v-if="formData.schoolAdminOrgNum"> {{formData.schoolAdminOrgNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="法人证书号 :" prop="legalPersonCertificateNum">
                    <span v-if="formData.legalPersonCertificateNum"> {{formData.legalPersonCertificateNum}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="建校年月 :" prop="schoolSinceYear">
                    <span v-if="formData.schoolSinceYear"> {{formData.schoolSinceYear}}</span>
                  </el-form-item>
                </el-col>



                <el-col :span="8">
                  <el-form-item label="校庆日 :" prop="schoolCelebrateDay">
                    <span v-if="formData.schoolCelebrateDay"> {{formData.schoolCelebrateDay}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="校长姓名 :" prop="principalTeacherName">
                    <span v-if="formData.principalTeacherName"> {{formData.principalTeacherName}}</span>
                  </el-form-item>
                </el-col>

                <div class="text-right p100 c999999 clearfix">数据截止时间：{{formData.updatedDt}}</div>


              </el-form>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="menu-quickly">
                <ul>
                  <li>
                    <router-link :to="`/basedata/listTeacher/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_teacher.png"/>直属老师
                    </router-link>

                  </li>
                  <li>
                    <router-link :to="`/basedata/listClassInfo/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_classinfo.png"/>班级信息
                    </router-link>

                  </li>
                  <li>
                    <router-link :to="`/basedata/listStudent/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_studentinfo.png" width="20"/>学生信息
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listParent/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_parent.png"/>家长
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listStudentParent/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_parentAndstudent.png"/>家长与学生关系
                    </router-link>

                  </li>
                  <li>
                    <router-link :to="`/basedata/listOrgDepart/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_deptAndperson.png"/>部门与人员
                    </router-link>

                  </li>


                  <li>
                    <router-link :to="`/basedata/listOrgschoolcalendarXs/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_clendar.png"/>校历
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listOrgschooltimelineXs/?schoolOrgId=${formData.schoolOrgId}`"><img
                      src="~@/assets/img/menu_quickly/icon_rest.png"/>作息
                    </router-link>
                  </li>
                </ul>

              </div>
            </el-col>
          </el-row>
        </div>
        <div class="clearfix"></div>
        <div class="text-center pb20">
          <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                     @click="goBack">返回
          </el-button>
          <el-button v-if="pageState == 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                     @click="submit('formData')">更新
          </el-button>
          <el-button v-if="pageState == 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                     @click="submit('formData')">发布
          </el-button>
        </div>

      </div>
    </el-main>
  </el-container>
</template>

<script>
  import commonApi from "@/api/common/common";
  import validation from "@/util/validate2";
  import api from "./basicschoolorgUrl";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import chinaCity from './chinaCity'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      let checkSchoolNum = (rule, value, callback) => {
        if (value.length < 18) {
          callback(new Error("请输入18位的机构代码"));
          return;
        }
        callback();
      }
      let checkPostNum = (rule, value, callback) => {
        if (/^[0-9]{6}$/.test(value)) {
          callback();
        } else {
          callback(new Error("邮政编码格式错误"));
        }
      }
      let checkSchoolShortName = (rule, value, callback) => {
        if (/^.{6,20}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入6-20个字符"));
        }
      }
      let checkContactName = (rule, value, callback) => {
        if (/^.{2,20}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入2-20个字符"));
        }
      }

      let checkContactFaxNum = (rule, value, callback) => {
        if (/^(\d{3,4}-)?\d{7,8}$/.test(value)) {
          callback();
        } else {
          callback(new Error("格式错误：例020-3656417"));
        }
      }

      let checkContactEmail = (rule, value, callback) => {
        if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)) {
          callback();
        } else {
          callback(new Error("邮箱格式错误"));
        }
      }

      let checkWebUrl = (rule, value, callback) => {
        if (value == null) {
          callback(new Error("请输入有效地址"));
          return;
        }
        callback();
      }

      return {
        defaultMsg: "",
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        areaProv: "",
        areaCity: "",
        xuantian: false, //选填信息
        formLoading: false,
        fullHeight:
        document.documentElement.clientHeight,
        isLoaded: true,
        orgTypeCodeOptions: [{
          "label": "请您选择",
          "name": ""
        }],
        orgTypeCode: null,
        imagePathFileList: [],
        schoolRunTypeCodeOptions: [{
          "label": "请您选择",
          "name": ""
        }],
        basicSegmentAdOptions: [{
          "label": "请您选择",
          "name": ""
        }],
        schoolRunTypeCode: null,
        imagePath: [], //单独使用一个图片变量
        formData: {
          schoolOrgNum: "",
          schoolOrgName: "",
          schoolShortName: "",
          schoolOrgNameEn: "",
          orgTypeCode: "",
          orgIntroduction: "",
          imagePath: '',
          orgAddress: "",
          postNum: "",
          schoolSinceYear: "",
          schoolCelebrateDay: "",
          schoolRunTypeCode: "",
          schoolAdminOrgNum: "",
          schoolAdminOrgName: "",
          legalRepresentativeNum: "",
          legalPersonCertificateNum: "",
          principalTeacherNum: "",
          principalTeacherName: "",
          partyCommitteeLeader: "",
          organizationNum: "",
          adminAreaNum: "",
          areaNum: "",
          contactName: "",
          contactPhoneNum: "",
          contactFaxNum: "",
          contactEmail: "",
          webUrl: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          schoolOrgNum: [
            {
              validator: checkSchoolNum,
              trigger: "blur"
            }
          ],
          postNum: [
            {
              validator: checkPostNum,
              trigger: "blur"
            }
          ],
          schoolShortName: [
            {
              validator: checkSchoolShortName,
              trigger: "blur"
            }
          ],
          contactName: [
            {
              validator: checkContactName,
              trigger: "blur"
            }
          ],
          contactPhoneNum: [
            {
              validator: validation.mobileNum,
              trigger: "blur"
            }
          ],
          contactFaxNum: [
            {
              validator: validation.mobileNum,
              trigger: "blur"
            }
          ],
          contactEmail: [
            {
              validator: checkContactEmail,
              trigger: "blur"
            }
          ],
          webUrl: [
            {
              validator: checkWebUrl,
              trigger: "blur"
            }
          ],
          schoolOrgName: [{
            required: true,
            message: `请您输入学校（机构）名称`,
            trigger: "blur"
          },
            {
              required: true,
              max: 255,
              message: "只能输入255个字",
              trigger: "blur"
            }
          ],
          imagePath: [{
            required: true,
            message: "请您输入学校（机构）图片 ",
            trigger: "blur"
          },
            {
              required: true,
              max: 255,
              message: "只能输入255个字",
              trigger: "blur"
            }
          ],
          segmentId: [{
            required: true,
            message: "请选择学段",
            trigger: "blur"
          },
            {
              required: true,
              max: 255,
              message: "只能输入255个字",
              trigger: "blur"
            }
          ],
          orgAddress: [{
            required: true,
            message: "请填写 学校（机构）地址",
            trigger: "blur"
          },
            {
              required: true,
              max: 255,
              message: "只能输入255个字",
              trigger: "blur"
            }
          ]
        }
      }
    },
    components: {
      upload,
      chinaCity,
      editor
    },
    computed: {
      ...mapGetters(['isLoading']),
      isEdit() {
        if (this.$route.query.id && this.$route.query.id != 0) {
          return true;
        } else {
          return false;
        }
      },
      pageState() {
        return this.$route.query.type;
      }
    },
    created() {
      //学段
      this.basicSegmentAd();
      //加载机构类型
      this.orgType()
      //学校办学类型
      this.schoolRunType()
      if (this.pageState == 'edit' || this.pageState == 'detail') {
        this.getData();
      }
      if (this.pageState == 'add') {
        this.SET_IS_LOADING(false)
      }
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      toEdit(id) {
        this.$router.push({path: `/basedata/basicschoolorg/p`, query: {type: "edit", id: id}})
      },
      goBack() {
        this.$router.go(-1);
      },
      //学段事件
      xueduanChange(event) {
        // console.log(event)
      },
      //地区名称
      getCity(data) {
        this.formData.areaNum = data;
      },
      //图片上传
      uploadData(res) {
        // console.log(res)
        this.formData.imagePath = res;
      },
      //编辑器
      getEditorValue(val) {
        this.formData.orgIntroduction = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      basicSegmentAd() {
        //学段
        commonApi.basicSegmentAd().then(res => {
          let viewList = res.data.data || [];
          for (let orgTypeItem of viewList) {
            this.basicSegmentAdOptions.push({
              "label": orgTypeItem.segmentName,
              "name": orgTypeItem.segmentId
            });
          }
        })
      },
      orgType() {
        //加载机构类型
        commonApi.getCodeIntType("orgType").then(res => {
          let viewList = res.data.data || [];
          for (let orgTypeItem of viewList) {
            this.orgTypeCodeOptions.push({
              "label": orgTypeItem.codeDesc,
              "name": orgTypeItem.codeId
            });
          }
        })
      },
      schoolRunType() {
        //学校办学类型
        commonApi.getCodeIntType("schoolRunType").then(res => {
          let viewList = res.data.data || [];
          for (let orgTypeItem of viewList) {
            this.schoolRunTypeCodeOptions.push({
              "label": orgTypeItem.codeDesc,
              "name": orgTypeItem.codeId
            });
          }
        })
      },
      getData() {
        api.getById({
          id: this.$route.query.id
        }).then((res) => {
          if (res.data.data.areaNum) {
            this.areaProv = res.data.data.areaNum.split("-")[0];
            this.areaCity = res.data.data.areaNum.split("-")[1];
          }
          if (res.data.data.imagePath) {
            this.imagePath = res.data.data.imagePath.split(",");
          }
          this.SET_IS_LOADING(false);
          if(this.pageState == "detail"){
            res.data.data.schoolCelebrateDay = `${new Date(res.data.data.schoolCelebrateDay).getMonth()+1}-${new Date(res.data.data.schoolCelebrateDay).getDate()}`
          }
          this.defaultMsg = this.formData.orgIntroduction;
          this.formData = res.data.data;
        })
      },
      imagePathRemove(file, fileList) {
      },
      imagePathPreview(file) {
      },
      imagePathSucc(response, file) {
        this.formData.imagePath = response.data.records;
      },
      imagePathBeforeUpload(file) {
        var fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
        const jpg = fileType === 'jpg';
        const jpeg = fileType === 'jpeg';
        const png = fileType === 'png';
        const bmp = fileType === 'bmp';
        const gif = fileType === 'gif';
        if (!jpg && !jpeg && !png && !bmp && !gif) {
          this.$message({
            message: '请上传视频格式的文件!',
            type: 'warning'
          });
        }
        return jpg || jpeg || png || bmp || gif;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        this.formData.schoolCelebrateDay = this.formData.schoolCelebrateDay ? new Date(this.formData.schoolCelebrateDay).toLocaleDateString() : "";
        this.formData.schoolSinceYear = this.formData.schoolSinceYear ? new Date(this.formData.schoolSinceYear).toLocaleDateString() : "";
        set[formName].validate((valid) => {
          valid = true;

          if (valid) {
            //this.formData.orgIntroduction = this.$refs.ue.getUEContent();
            this.formLoading = true;
            //this.formData.imagePath = this.imagePath.join(",");
            if (this.pageState == "edit") {
              api.edit(this.formData).then(res => {
                if (res.data.resultCode == "000000") {
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
            } else if (this.pageState == "add") {
              api.add(this.formData).then((res) => {
                if (res.data.resultCode == "000000") {
                  this.formLoading = false;
                  this.$message.success("创建成功");
                } else {
                  this.$message.error(res.data.message);
                  this.formLoading = false;
                }
              })
            }

          }
        })
        this.isLoaded = false;
      }
    }
  }
</script>

<style lang="scss" scoped>




  .schoolForm-detail-rao {
    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }


</style>
