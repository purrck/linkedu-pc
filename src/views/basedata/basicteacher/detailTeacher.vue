<template>
<el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
                <el-main>

                  <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增教师信息</el-button>
                  <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑教师信息</el-button>
                  <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情教师信息</el-button>
  <div class="bfff">
    <div class="edit-box">
      <div v-show="$store.state.common.lizi">
          <el-button @click="example">示例</el-button>
        </div>
      <div v-if="pageState === 'add'" class='mh500'>

        <el-form :label-position="'right'"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="8">
            <el-form-item label="教师工号  :" prop="teacherNum">
              <el-input v-model="formData.teacherNum" class="input-v2-rao" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="教师编号 :" prop="teacherNationalUnityNum">
              <el-input v-model="formData.teacherNationalUnityNum" class="input-v2-rao" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名  :" prop="userName">
              <el-input v-model="formData.userName" class="input-v2-rao" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="英文姓名 :" prop="userNameEn">
              <el-input v-model="formData.userNameEn" class="input-v2-rao" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名拼音  :" prop="userNamePinyin">
              <el-input v-model="formData.userNamePinyin" class="input-v2-rao" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="曾用名 :" prop="userNameBefore">
              <el-input v-model="formData.userNameBefore" class="input-v2-rao" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="性别 :" prop="gender">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.gender" placeholder="请您选择">
                <el-option v-for="item in genderOptions"
                           :key="item.name"
                           :label="item.label" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="出生日期 :" prop="birthDt">
              <el-date-picker class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.birthDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="出生地 :" prop="birthArea">
              <el-input class="input-v2-rao" v-model="formData.birthArea" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="籍贯 :" prop="placeOriginArea">
              <el-input class="input-v2-rao" v-model="formData.placeOriginArea" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="民族 :" prop="personNationCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.personNationCode" placeholder="请您选择">
                <el-option v-for="personNationCodeItem in personNationCodeOptions"
                           :key="personNationCodeItem.name"
                           :label="personNationCodeItem.label" :value="personNationCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="国籍/地区 :" prop="regionArea">
              <el-input class="input-v2-rao" v-model="formData.regionArea" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="证件类型 :" prop="idCardTypeCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.idCardTypeCode" placeholder="请您选择">
                <el-option v-for="idCardTypeCodeItem in idCardTypeCodeOptions"
                           :key="idCardTypeCodeItem.name"
                           :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="身份证件号 :" prop="idCardNum">
              <el-input class="input-v2-rao" v-model="formData.idCardNum" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="身份证件有效期 :" prop="idCardValidDt">
              <el-date-picker class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.idCardValidDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="政治面貌 :" prop="politicalAffiliationCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.politicalAffiliationCode" placeholder="请您选择">
                <el-option v-for="politicalAffiliationCodeItem in politicalAffiliationCodeOptions"
                           :key="politicalAffiliationCodeItem.name"
                           :label="politicalAffiliationCodeItem.label" :value="politicalAffiliationCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="入党日期 :" prop="joinPartisanDt">
              <el-date-picker class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.joinPartisanDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="血型 :" prop="bloodTypeCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.bloodTypeCode" placeholder="请您选择">
                <el-option v-for="bloodTypeCodeItem in bloodTypeCodeOptions"
                           :key="bloodTypeCodeItem.name"
                           :label="bloodTypeCodeItem.label" :value="bloodTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="照片或图像 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>

          <!--<el-col :span="8">
            <el-form-item label="所属学校 :" prop="schoolName">
              <el-input class="input-v2-rao" v-model="formData.schoolName" maxlength="64" disabled></el-input>
            </el-form-item>
          </el-col>-->


          <el-col :span="8">
            <el-form-item label="手机号码 :" prop="telPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.telPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="办公电话 :" prop="contactPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.contactPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="办公地址 :" prop="contactAddress">
              <el-input class="input-v2-rao" v-model="formData.contactAddress" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="电子邮箱 :" prop="contactEmail">
              <el-input class="input-v2-rao" v-model="formData.contactEmail" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="qq 号码 :" prop="qqNum">
              <el-input class="input-v2-rao" v-model="formData.qqNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="教师继续教育号 :" prop="continueEducationNum">
              <el-input class="input-v2-rao" v-model="formData.continueEducationNum" maxlength="64"></el-input>
            </el-form-item>
          </el-col>





          <!--<el-col :span="8">
            <el-form-item label="任教状态 :" prop="teachStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.teachStatusCode" placeholder="请您选择">
                <el-option v-for="teachStatusCodeItem in teachStatusCodeOptions"
                           :key="teachStatusCodeItem.name"
                           :label="teachStatusCodeItem.label" :value="teachStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->


          <el-col :span="8">
            <el-form-item label="人员状态 :" prop="teacherStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.teacherStatusCode" placeholder="请您选择">
                <el-option v-for="teacherStatusCodeItem in teacherStatusCodeOptions"
                           :key="teacherStatusCodeItem.name"
                           :label="teacherStatusCodeItem.label" :value="teacherStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!--<segment-grade-subject :conf="conf" @callback="treeCall"></segment-grade-subject>-->

          <el-col :span="8" style="display:none">
            <el-form-item label="学段">
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.segment" v-if="!isDisabled" placeholder="请您选择"  @change="segmentChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in segmentList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="segmentClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.segment" v-if="isDisabled" disabled placeholder="请您选择" @change="segmentChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in segmentList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="segmentClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="8" v-show="gradeList.length" style="display:none">
            <el-form-item label="年级">
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.grade" placeholder="请您选择" @change="gradeChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in gradeList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="gradeClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="8" v-show="subjectList.length" style="display:none">
            <el-form-item label="学科">
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.subject" placeholder="请您选择" @change="subjectChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in subjectList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="subjectClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="8">
            <el-form-item label="教师工号  :" prop="teacherNum">
              <el-input class="input-v2-rao" v-model="formData.teacherNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="教师编号 :" prop="teacherNationalUnityNum">
              <el-input class="input-v2-rao" v-model="formData.teacherNationalUnityNum" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名  :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="英文姓名 :" prop="userNameEn">
              <el-input class="input-v2-rao" v-model="formData.userNameEn" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名拼音  :" prop="userNamePinyin">
              <el-input class="input-v2-rao" v-model="formData.userNamePinyin" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="曾用名 :" prop="userNameBefore">
              <el-input class="input-v2-rao" v-model="formData.userNameBefore" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="性别 :" prop="gender">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.gender" placeholder="请您选择">
                <el-option v-for="item in genderOptions"
                           :key="item.name"
                           :label="item.label" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="出生日期 :" prop="birthDt">
              <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="formData.birthDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="出生地 :" prop="birthArea">
              <el-input class="input-v2-rao" v-model="formData.birthArea" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="籍贯 :" prop="placeOriginArea">
              <el-input class="input-v2-rao" v-model="formData.placeOriginArea" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="民族 :" prop="personNationCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.personNationCode" placeholder="请您选择">
                <el-option v-for="personNationCodeItem in personNationCodeOptions"
                           :key="personNationCodeItem.name"
                           :label="personNationCodeItem.label" :value="personNationCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="国籍/地区 :" prop="regionArea">
              <el-input class="input-v2-rao" v-model="formData.regionArea" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="证件类型 :" prop="idCardTypeCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.idCardTypeCode" placeholder="请您选择">
                <el-option v-for="idCardTypeCodeItem in idCardTypeCodeOptions"
                           :key="idCardTypeCodeItem.name"
                           :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="身份证件号 :" prop="idCardNum">
              <el-input class="input-v2-rao" v-model="formData.idCardNum" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="身份证件有效期 :" prop="idCardValidDt">
              <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="formData.idCardValidDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="政治面貌 :" prop="politicalAffiliationCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.politicalAffiliationCode" placeholder="请您选择">
                <el-option v-for="politicalAffiliationCodeItem in politicalAffiliationCodeOptions"
                           :key="politicalAffiliationCodeItem.name"
                           :label="politicalAffiliationCodeItem.label" :value="politicalAffiliationCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="入党日期 :" prop="joinPartisanDt">
              <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="formData.joinPartisanDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="血型 :" prop="bloodTypeCode">
              <el-select class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.bloodTypeCode" placeholder="请您选择">
                <el-option v-for="bloodTypeCodeItem in bloodTypeCodeOptions"
                           :key="bloodTypeCodeItem.name"
                           :label="bloodTypeCodeItem.label" :value="bloodTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="照片或图像 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <!--<el-col :span="8">
            <el-form-item label="所属学校 :" prop="schoolName">
              <el-input class="input-v2-rao" v-model="formData.schoolName" maxlength="64" disabled></el-input>
            </el-form-item>
          </el-col>-->


          <el-col :span="8">
            <el-form-item label="手机号码 :" prop="telPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.telPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="办公电话 :" prop="contactPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.contactPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="办公地址 :" prop="contactAddress">
              <el-input class="input-v2-rao" v-model="formData.contactAddress" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="电子邮箱 :" prop="contactEmail">
              <el-input class="input-v2-rao" v-model="formData.contactEmail" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="qq 号码 :" prop="qqNum">
              <el-input class="input-v2-rao" v-model="formData.qqNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="教师继续教育号 :" prop="continueEducationNum">
              <el-input class="input-v2-rao" v-model="formData.continueEducationNum" maxlength="64"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="8">
            <el-form-item label="任教状态 :" prop="teachStatusCode">
              <el-select class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.teachStatusCode" placeholder="请您选择">
                <el-option v-for="teachStatusCodeItem in teachStatusCodeOptions"
                           :key="teachStatusCodeItem.name"
                           :label="teachStatusCodeItem.label" :value="teachStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->


          <el-col :span="8">
            <el-form-item label="人员状态 :" prop="teacherStatusCode">
              <el-select class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.teacherStatusCode" placeholder="请您选择">
                <el-option v-for="teacherStatusCodeItem in teacherStatusCodeOptions"
                           :key="teacherStatusCodeItem.name"
                           :label="teacherStatusCodeItem.label" :value="teacherStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" style="display:none">
            <el-form-item label="学段">
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.segment" v-if="!isDisabled" placeholder="请您选择"  @change="segmentChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in segmentList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="segmentClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.segment" v-if="isDisabled" disabled placeholder="请您选择" @change="segmentChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in segmentList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="segmentClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="8" v-show="gradeList.length" style="display:none">
            <el-form-item label="年级">
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.grade" placeholder="请您选择" @change="gradeChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in gradeList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="gradeClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="8" v-show="subjectList.length" style="display:none">
            <el-form-item label="学科">
                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData1.subject" placeholder="请您选择" @change="subjectChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in subjectList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="subjectClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="8" v-if="formData.teacherNum">
                <el-form-item label="教师工号 :" prop="teacherNum">
                  {{formData.teacherNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.teacherNationalUnityNum">
                <el-form-item label="教师统一编号 :" prop="teacherNationalUnityNum">
                  {{formData.teacherNationalUnityNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.userName">
                <el-form-item label="姓名 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.userNameEn">
                <el-form-item label="英文姓名 :" prop="userNameEn">
                  {{formData.userNameEn}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.userNamePinyin">
                <el-form-item label="姓名拼音 :" prop="userNamePinyin">
                  {{formData.userNamePinyin}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.userNameBefore">
                <el-form-item label="曾用名 :" prop="userNameBefore">
                  {{formData.userNameBefore}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.gender">
                <el-form-item label="性别 :" prop="gender">
                  <span v-show="formData.gender == 'M'">男</span>
                  <span v-show="formData.gender == 'F'">女</span>
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.birthDt">
                <el-form-item label="出生日期 :" prop="birthDt">
                  {{formData.birthDt}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.birthArea">
                <el-form-item label="出生地 :" prop="birthArea">
                  {{formData.birthArea}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.placeOriginArea">
                <el-form-item label="籍贯 :" prop="placeOriginArea">
                  {{formData.placeOriginArea}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.personNationCode">
                <el-form-item label="民族 :" prop="personNationCode"
                              :style="{'color':formData.personNationCodeStr &&formData.personNationCodeStr.split(';')[1]}">
                  {{formData.personNationCodeStr&&formData.personNationCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.regionArea">
                <el-form-item label="国籍/地区 :" prop="regionArea">
                  {{formData.regionArea}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.idCardTypeCode">
                <el-form-item label="身份证件类型 :" prop="idCardTypeCode"
                              :style="{'color':formData.idCardTypeCodeStr&&formData.idCardTypeCodeStr.split(';')[1]}">
                  {{formData.idCardTypeCodeStr&&formData.idCardTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.idCardNum">
                <el-form-item label="身份证件号 :" prop="idCardNum">
                  {{formData.idCardNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.idCardValidDt">
                <el-form-item label="身份证件有效期 :" prop="idCardValidDt">
                  {{formData.idCardValidDt}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.politicalAffiliationCode">
                <el-form-item label="政治面貌 :" prop="politicalAffiliationCode"
                              :style="{'color':formData.politicalAffiliationCodeStr&&formData.politicalAffiliationCodeStr.split(';')[1]}">
                  {{formData.politicalAffiliationCodeStr&&formData.politicalAffiliationCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.joinPartisanDt">
                <el-form-item label="入党日期 :" prop="joinPartisanDt">
                  {{formData.joinPartisanDt}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.healthCode">
                <el-form-item label="健康状况 :" prop="healthCode" :style="{'color':formData.healthCodeStr&&formData.healthCodeStr.split(';')[1]}">
                  {{formData.healthCodeStr&&formData.healthCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.religionCode">
                <el-form-item label="信仰宗教 :" prop="religionCode"
                              :style="{'color':formData.religionCodeStr&&formData.religionCodeStr.split(';')[1]}">
                  {{formData.religionCodeStr&&formData.religionCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.bloodTypeCode">
                <el-form-item label="血型 :" prop="bloodTypeCode"
                              :style="{'color':formData.bloodTypeCodeStr&&formData.bloodTypeCodeStr.split(';')[1]}">
                  {{formData.bloodTypeCodeStr&&formData.bloodTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.imagePath">
                <el-form-item label="照片或图像 :" prop="imagePath">
                  <img :src="formData.imagePath" alt="" width="100px">
                </el-form-item>
              </el-col>

              <el-col :span="8" v-if="formData.workSchoolName">
                <el-form-item label="现工作学校 :" prop="workSchoolName">
                  {{formData.workSchoolName}}
                </el-form-item>
              </el-col>

              <!--<el-col :span="8" v-if="formData.schoolName">
                <el-form-item label="所属学校 :" prop="schoolName">
                  {{formData.schoolName}}
                </el-form-item>
              </el-col>-->


              <el-col :span="8" v-if="formData.telPhoneNum">
                <el-form-item label="手机号码 :" prop="telPhoneNum">
                  {{formData.telPhoneNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.contactPhoneNum">
                <el-form-item label="办公电话 :" prop="contactPhoneNum">
                  {{formData.contactPhoneNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.contactAddress">
                <el-form-item label="办公地址 :" prop="contactAddress">
                  {{formData.contactAddress}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.contactEmail">
                <el-form-item label="电子邮箱 :" prop="contactEmail">
                  {{formData.contactEmail}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.qqNum">
                <el-form-item label="qq 号码 :" prop="qqNum">
                  {{formData.qqNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.continueEducationNum">
                <el-form-item label="教师继续教育号 :" prop="continueEducationNum">
                  {{formData.continueEducationNum}}
                </el-form-item>
              </el-col>

              <!--
              <el-col :span="8">
                <el-form-item label="学段 :" prop="teachSegmentName">
                  {{formData.teachSegmentName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年级 :" prop="teachGradeName">
                  {{formData.teachGradeName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="学科 :" prop="teachSubjectName">
                  {{formData.teachSubjectName}}
                </el-form-item>
              </el-col>

              <el-col :span="8" v-if="formData.teachStatusCode">
                <el-form-item label="任教状态 :" prop="teachStatusCode"
                              :style="{'color':formData.teachStatusCodeStr&&formData.teachStatusCodeStr.split(';')[1]}">
                  {{formData.teachStatusCodeStr&&formData.teachStatusCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>-->


              <el-col :span="8" v-if="formData.teacherStatusCode">
                <el-form-item label="人员状态 :" prop="teacherStatusCode"
                              :style="{'color':formData.teacherStatusCodeStr&&formData.teacherStatusCodeStr.split(';')[1]}">
                  {{formData.teacherStatusCodeStr&&formData.teacherStatusCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


            </el-form>
          </el-col>

        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">提交
        </el-button>
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>


      </div>

    </div>
  </div>
  </el-main>
</el-container>
</template>

<script>
  import api from "./basicteacherUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import { mapGetters,mapMutations } from 'vuex';


  export default {
    data() {
      // 英文校验
      var charEn = (rule, value, callback) => {
        var reg = /^[a-zA-Z]+$/;
        if (value != "" && reg.test(value)==false) {
          callback(new Error('只能输入英文'));
        } else {
          callback();
        }
      }
      // 身份证校验
      var idCardNum = (rule, value, callback) => {
        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (value != "" && reg.test(value)==false) {
          callback(new Error('身份证号码格式错误'));
        } else {
          callback();
        }
      }
      // 手机号码校验
      var mobileNum1 = (rule, value, callback) => {
        var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(16[6-7]{1})|(19[8-9]{1}))+\d{8})$/;
        if (value != "" && reg.test(value)==false) {
          callback(new Error('手机号码格式错误'));
        } else {
          callback();
        }
      }
      // 邮箱校验
      var email = (rule, value, callback) => {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (value != "" && reg.test(value)==false) {
          callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
      }
      return {
        isExample : false,
        conf : {
            segmentId : "",
            gradeId : "",
            subjectId : ""
        },
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
        genderOptions: [{"label": "请选择", "name": ""}],
        personNationCodeOptions: [{"label": "请选择", "name": ""}], personNationCode: null,
        idCardTypeCodeOptions: [{"label": "请选择", "name": ""}], idCardTypeCode: null,
        politicalAffiliationCodeOptions: [{"label": "请选择", "name": ""}], politicalAffiliationCode: null,
        healthCodeOptions: [{"label": "请选择", "name": ""}], healthCode: null,
        religionCodeOptions: [{"label": "请选择", "name": ""}], religionCode: null,
        bloodTypeCodeOptions: [{"label": "请选择", "name": ""}], bloodTypeCode: null,
        imagePathFileList: [],
        imagePathFileType: '',
        teachStatusCodeOptions: [{"label": "请选择", "name": ""}], teachStatusCode: null,
        teacherStatusCodeOptions: [{"label": "请选择", "name": ""}], teacherStatusCode: null,
        formData: {
          teacherId:null,
          teacherNum: "",
          teacherNationalUnityNum: "",
          userName: "",
          userNameEn: "",
          userNamePinyin: "",
          userNameBefore: "",
          gender: "",
          birthDt: "",
          birthArea: "",
          placeOriginArea: "",
          personNationCode: "",
          regionArea: "",
          idCardTypeCode: "",
          idCardNum: "",
          idCardValidDt: "",
          politicalAffiliationCode: "",
          joinPartisanDt: "",
          bloodTypeCode: "",
          imagePath: "",
          workSchoolId: "",
          workSchoolName: "",
          schoolId: "",
          schoolName: "",
          telPhoneNum: "",
          contactPhoneNum: "",
          contactAddress: "",
          contactEmail: "",
          qqNum: "",
          continueEducationNum: "",
          teachSegmentId: "",
          teachSegmentName: "",
          teachSubjectId: "",
          teachSubjectName: "",
          teachGradeId: "",
          teachGradeName: "",
          teachStatusCode: "",
          teacherStatusCode: "",
        },
        formData1 : {
                    grade : "",
                    subject : "",
                    segment : ""
                },
        watcher : null,
        isDisabled : false,
        segmentList : [],
                gradeList : [],
                subjectList : [],
        msg : {
                    schoolData : {},
                    segment : {},
                    subject : {},
                    grade : {}
                },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          teacherNum: [
            { message: "请您输入教师工号", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teacherNationalUnityNum: [
            {required: true, max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          userName: [
            {required: true, message: "请您输入姓名", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userNameEn: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},
            {validator: charEn, trigger: "blur"},

          ],
          userNamePinyin: [
            { message: "请您输入姓名拼音", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: charEn, trigger: "blur"},

          ],
          userNameBefore: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          gender: [
            {required: true, message: "请您选择性别", trigger: "change"}

          ],
          birthDt: [],
          birthArea: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          placeOriginArea: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          personNationCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          regionArea: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          idCardTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          idCardNum: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},
            {validator: idCardNum, trigger: "blur"},

          ],
          idCardValidDt: [],
          politicalAffiliationCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          joinPartisanDt: [],
          bloodTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          imagePath: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          workSchoolId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          workSchoolName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          schoolId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          schoolName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          telPhoneNum: [
            {required: true,validator: validation.mobileNum, trigger: "blur"},

          ],
          contactPhoneNum: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: mobileNum1, trigger: "blur"},

          ],
          contactAddress: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          contactEmail: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: email, trigger: "blur"},

          ],
          qqNum: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          continueEducationNum: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          teachSegmentId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teachSegmentName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teachSubjectId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teachSubjectName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teachGradeId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teachGradeName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teachStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teacherStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
        }
      }
    },
    watch : {
            watcher(){
              this.formData.teachSegmentId = this.msg.segment.id;
              this.formData.teachSegmentName = this.msg.segment.name;
              this.formData.teachGradeId = this.msg.grade.id;
              this.formData.teachGradeName = this.msg.grade.name;
              this.formData.teachSubjectId = this.msg.subject.id;
              this.formData.teachSubjectName = this.msg.subject.name;

            }
        },
    computed: {
      ...mapGetters(['schoolInfo','isLoading']),
      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor, upload},
    created() {
      this.SET_IS_LOADING(false);
      this.getDetail(this.$route.params.id);
      this.formData.schoolId = this.schoolInfo.schoolOrgId;
      this.formData.schoolName = this.schoolInfo.schoolOrgName;

      commonApi.getCodeIntType("gender").then(res => {
        let viewList = res.data.data || [];
        for (let item of viewList) {
          this.genderOptions.push({
            "label": item.codeDesc,
            "name": item.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("personNation").then(res => {
        let viewList = res.data.data || [];
        for (let personNationItem of viewList) {
          this.personNationCodeOptions.push({
            "label": personNationItem.codeDesc,
            "name": personNationItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("idCardType").then(res => {
        let viewList = res.data.data || [];
        for (let idCardTypeItem of viewList) {
          this.idCardTypeCodeOptions.push({
            "label": idCardTypeItem.codeDesc,
            "name": idCardTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("politicalAffiliation").then(res => {
        let viewList = res.data.data || [];
        for (let politicalAffiliationItem of viewList) {
          this.politicalAffiliationCodeOptions.push({
            "label": politicalAffiliationItem.codeDesc,
            "name": politicalAffiliationItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("health").then(res => {
        let viewList = res.data.data || [];
        for (let healthItem of viewList) {
          this.healthCodeOptions.push({
            "label": healthItem.codeDesc,
            "name": healthItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("religion").then(res => {
        let viewList = res.data.data || [];
        for (let religionItem of viewList) {
          this.religionCodeOptions.push({
            "label": religionItem.codeDesc,
            "name": religionItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("bloodType").then(res => {
        let viewList = res.data.data || [];
        for (let bloodTypeItem of viewList) {
          this.bloodTypeCodeOptions.push({
            "label": bloodTypeItem.codeDesc,
            "name": bloodTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("teachStatus").then(res => {
        let viewList = res.data.data || [];
        for (let teachStatusItem of viewList) {
          this.teachStatusCodeOptions.push({
            "label": teachStatusItem.codeDesc,
            "name": teachStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("teacherStatus").then(res => {
        let viewList = res.data.data || [];
        for (let teacherStatusItem of viewList) {
          this.teacherStatusCodeOptions.push({
            "label": teacherStatusItem.codeDesc,
            "name": teacherStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      this.getSchoolTree();
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      example(){
        this.formData = {"teacherId":null,"teacherNum":"54646","teacherNationalUnityNum":"47567","userName":"东方闪电","userNameEn":"sdfsd","userNamePinyin":"sdfsd","userNameBefore":"水电费水电费","gender":"","birthDt":"2019-03-30 00:00","birthArea":"水电费","placeOriginArea":"水电费","personNationCode":"Miao MH","regionArea":"中国","idCardTypeCode":"IDCARD","idCardNum":"441481198512056212","idCardValidDt":"2019-03-29 00:00","politicalAffiliationCode":"01","joinPartisanDt":"2019-03-29 00:00","bloodTypeCode":"","imagePath":"","workSchoolId":"","workSchoolName":"","schoolId":"580df6d6c0a802137a30f614fcb1d90d","schoolName":"硕希望实验小学","telPhoneNum":"15000589556","contactPhoneNum":"15000589556","contactAddress":"胜多负少的","contactEmail":"2342342342@163.com","qqNum":"3453453453","continueEducationNum":"234234234","teachSegmentId":"","teachSegmentName":"","teachSubjectId":"","teachSubjectName":"","teachGradeId":"","teachGradeName":"","teachStatusCode":"","teacherStatusCode":"TEACHBORROW"}
      },
      treeCall(event){
        this.formData.teachSegmentId = event.segment.id;
        this.formData.teachSegmentName = event.segment.name;
        this.formData.teachGradeId = event.grade.id;
        this.formData.teachGradeName = event.grade.name;
        this.formData.teachSubjectId = event.subject.id;
        this.formData.teachSubjectName = event.subject.name;

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
        /*if(!this.formData.teachSegmentId){
          this.$message.error("请选择学段");
          return ;
        }
        if(!this.formData.teachGradeId){
          this.$message.error("请选择年级");
          return ;
        }
        if(!this.formData.teachSubjectId){
          this.$message.error("请选择学科");
          return ;
        }*/
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          //valid = true
          if (this.pageState === "edit" && valid) {
        this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.push({
                  path : "/basedata/listTeacher"
                })
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add" && valid) {
                this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("提交成功");
                this.$router.push({
                  path : "/basedata/listTeacher"
                })
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


      imagePathRemove(file, fileList) {
      },

      imagePathSucc(response, file) {
        this.formData.imagePath = response.data.data;
      },


      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          this.SET_IS_LOADING(true);
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              //res.data.data.imagePath = "http://118.126.94.4:8410/group1/M00/00/15/rBAAAlyB49aAcHRRAAABgNLDrbs571.png,http://118.126.94.4:8410/group1/M00/00/16/rBAAAlyLTXmAHTrxAAAakg9jy-s226.png,http://118.126.94.4:8410/group1/M00/00/15/rBAAAlyB49aAcHRRAAABgNLDrbs571.png"
              this.formData = res.data.data
              this.conf.segmentId = this.formData.teachSegmentId
              this.conf.gradeId = this.formData.teachGradeId
              this.conf.subjectId = this.formData.teachSubjectId


              this.formData.schoolId = this.schoolInfo.schoolOrgId;
              this.formData.schoolName = this.schoolInfo.schoolOrgName;
              // console.log(this.formData)
            }
            this.isLoaded = false;
            this.SET_IS_LOADING(false);
          }, res => {
            this.$message.error(res.message);
            this.SET_IS_LOADING(false);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      segmentChange(event){
                this.formData1.grade = "";
                this.formData1.subject = "";
                this.subjectList = [];
                this.watcher = this.msg.grade = {} = this.msg.subject = {}
                if(event == ""){
                    this.gradeList = [];
                    this.watcher = this.msg.segment = {} = this.msg.grade = {} = this.msg.subject = {}
                }
            },
            segmentClick(index){
                if(this.segmentList.length){
                    this.watcher = this.msg.segment = this.segmentList[index];
                   this.gradeList = this.segmentList[index].children;
                }else{
                    this.gradeList = "";
                }
            },
            gradeChange(event){
                this.formData1.subject = "";
                if(event == ""){
                    this.subjectList = [];
                    this.watcher = this.msg.grade = {} = this.msg.subject = {}
                }
            },
            gradeClick(index){
                if(this.gradeList.length){
                    this.watcher = this.msg.grade = this.gradeList[index];
                    this.subjectList = this.gradeList[index].children ? this.gradeList[index].children : [];
                }else{
                    this.subjectList = "";
                }
            },
            subjectChange(event){
                if(event == ""){
                    this.watcher = this.msg.subject = {}
                }
            },
            subjectClick(index){
                this.watcher = this.msg.subject = this.subjectList[index];
            },
            getSchoolTree(){
                commonApi.getSegmentGradeSubject().then((res) => {
                    if(res.data.resultCode == "000000" ){
                        res.data.data.children.map((item,index) => {
                            item['pid'] = `${index}`;
                            item.children.map((item1,index1) => {
                                item1['pid'] = `${index1}`;
                                item1.children.map((item2,index2) => {
                                    item2['pid'] = `${index2}`;
                                })
                            })
                        })
                        this.msg.schoolData = res.data.data;
                        this.segmentList = res.data.data.children;
                        if(this.segmentList.length == 1){
                            this.isDisabled = true;
                            this.watcher = this.msg.segment = this.segmentList[0];
                            this.formData1.segment = this.msg.segment.id;
                            this.gradeList = this.segmentList[this.segmentList[0].pid].children;
                        }

                        for(let i=0; i<this.segmentList.length; i++){
                            if(this.segmentList[i].id == this.conf.segmentId){
                                this.watcher = this.msg.segment = this.segmentList[i];
                                this.formData1.segment = this.conf.segmentId;
                                this.gradeList = this.segmentList[this.segmentList[i].pid].children;
                            }
                            for(let j=0; j<this.segmentList[i].children.length; j++){
                                if(this.segmentList[i].children[j].id == this.conf.gradeId){
                                    this.watcher = this.msg.grade = this.segmentList[i].children[j];
                                    this.gradeList = this.segmentList[i].children;
                                    this.formData1.grade = this.conf.gradeId;
                                    this.subjectList = this.gradeList[this.segmentList[i].children[j].pid].children
                                }
                                if(this.segmentList[i].children[j].children){
                                    for(let s=0; s<this.segmentList[i].children[j].children.length; s++){
                                        if(this.segmentList[i].children[j].children[s].id == this.conf.subjectId){
                                            this.watcher = this.msg.subject = this.segmentList[i].children[j].children[s];
                                            this.subjectList = this.segmentList[i].children[j].children;
                                            this.formData1.subject = this.conf.subjectId;
                                        }
                                    }
                                }
                            }
                        }
                    }else{
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
