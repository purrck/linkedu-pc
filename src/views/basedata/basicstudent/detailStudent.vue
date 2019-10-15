<template>
<el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
                <el-main>
                  <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增学生信息</el-button>
                  <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑学生信息</el-button>
                  <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情学生信息</el-button>
  <div class="bfff">
    <div class="edit-box">
      <div v-show="$store.state.common.lizi">
          <el-button @click="example">示例</el-button>
        </div>
      <div v-if="pageState === 'add'" class='mh500'>

        <el-form :label-position="'right'"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="8">
            <el-form-item label="学号 *  :" prop="studentNum">
              <el-input class="input-v2-rao" v-model="formData.studentNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="国家统一学籍编码 :" prop="studentNationalSetNum">
              <el-input class="input-v2-rao" v-model="formData.studentNationalSetNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名 *  :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="英文姓名 *  :" prop="userNameEn">
              <el-input class="input-v2-rao" v-model="formData.userNameEn" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名拼音 :" prop="userNamePinyin">
              <el-input class="input-v2-rao" v-model="formData.userNamePinyin" maxlength="64"></el-input>
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
              <el-date-picker class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.birthDt" type="date" placeholder="选择日期"
                              value-format="yyyy-MM-dd hh:00" :picker-options="pickTime"></el-date-picker>
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
            <el-form-item label="身份证件类型 :" prop="idCardTypeCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.idCardTypeCode" placeholder="请您选择">
                <el-option v-for="idCardTypeCodeItem in idCardTypeCodeOptions"
                           :key="idCardTypeCodeItem.name"
                           :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="身份证号码 :" prop="idCardNum">
              <el-input class="input-v2-rao" v-model="formData.idCardNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="身份证件有效期 :" prop="idCardValidDt">
              <el-date-picker class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.idCardValidDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd hh:00"></el-date-picker>
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
            <el-form-item label="健康状况 :" prop="healthCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.healthCode" placeholder="请您选择">
                <el-option v-for="healthCodeItem in healthCodeOptions"
                           :key="healthCodeItem.name"
                           :label="healthCodeItem.label" :value="healthCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="信仰宗教 :" prop="religionCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.religionCode" placeholder="请您选择">
                <el-option v-for="religionCodeItem in religionCodeOptions"
                           :key="religionCodeItem.name"
                           :label="religionCodeItem.label" :value="religionCodeItem.name">
                </el-option>
              </el-select>
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
            <el-form-item label="照片 :" prop="headPicture">
              <upload v-on:uploadData="uploadData" :many="1" :imagelist="formData.headPicture"/>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="是否独生 :" prop="isOnlyChild">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.isOnlyChild" placeholder="请您选择">
                <el-option v-for="isOnlyChildItem in ynOptions" :key="isOnlyChildItem.name"
                           :label="isOnlyChildItem.label" :value="isOnlyChildItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="现就读学校名称 :" prop="schoolName">
              <el-input class="input-v2-rao" v-model="formData.schoolName" maxlength="128" disabled></el-input>
            </el-form-item>
          </el-col>





          <el-col :span="8">
            <el-form-item label="联系电话 :" prop="contactPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.contactPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="手机号 :" prop="telPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.telPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="通讯地址 :" prop="contactAddress">
              <el-input class="input-v2-rao" v-model="formData.contactAddress" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="邮政编码 :" prop="postNum">
              <el-input class="input-v2-rao" v-model="formData.postNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="电子信箱 :" prop="contactEmail">
              <el-input class="input-v2-rao" v-model="formData.contactEmail" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="在校状态 :" prop="studentStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.studentStatusCode" placeholder="请您选择">
                <el-option v-for="studentStatusCodeItem in studentStatusCodeOptions"
                           :key="studentStatusCodeItem.name"
                           :label="studentStatusCodeItem.label" :value="studentStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="学生来源 :" prop="studentSourceCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.studentSourceCode" placeholder="请您选择">
                <el-option v-for="studentSourceCodeItem in studentSourceCodeOptions"
                           :key="studentSourceCodeItem.name"
                           :label="studentSourceCodeItem.label" :value="studentSourceCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <grade-class :conf="conf" @callback="treeCall"></grade-class>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'" class='mh500'>

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="8">
            <el-form-item label="学号 *  :" prop="studentNum">
              <el-input class="input-v2-rao" disabled="disabled" v-model="formData.studentNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="国家统一学籍编码 :" prop="studentNationalSetNum">
              <el-input class="input-v2-rao" disabled="disabled" v-model="formData.studentNationalSetNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名 *  :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="英文姓名 *  :" prop="userNameEn">
              <el-input class="input-v2-rao" v-model="formData.userNameEn" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="姓名拼音 :" prop="userNamePinyin">
              <el-input class="input-v2-rao" v-model="formData.userNamePinyin" maxlength="64"></el-input>
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
              <el-date-picker class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.birthDt" type="date" placeholder="选择日期"
                              value-format="yyyy-MM-dd"></el-date-picker>
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
            <el-form-item label="身份证件类型 :" prop="idCardTypeCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.idCardTypeCode" placeholder="请您选择">
                <el-option v-for="idCardTypeCodeItem in idCardTypeCodeOptions"
                           :key="idCardTypeCodeItem.name"
                           :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="身份证号码 :" prop="idCardNum">
              <el-input class="input-v2-rao" v-model="formData.idCardNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="身份证件有效期 :" prop="idCardValidDt">
              <el-date-picker class="date-v2-rao p100" popper-class="date-popper-v2-rao" v-model="formData.idCardValidDt" type="date" placeholder="选择日期"
                              value-format="yyyy-MM-dd"></el-date-picker>
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
            <el-form-item label="健康状况 :" prop="healthCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.healthCode" placeholder="请您选择">
                <el-option v-for="healthCodeItem in healthCodeOptions"
                           :key="healthCodeItem.name"
                           :label="healthCodeItem.label" :value="healthCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="信仰宗教 :" prop="religionCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.religionCode" placeholder="请您选择">
                <el-option v-for="religionCodeItem in religionCodeOptions"
                           :key="religionCodeItem.name"
                           :label="religionCodeItem.label" :value="religionCodeItem.name">
                </el-option>
              </el-select>
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
            <el-form-item label="照片 :" prop="headPicture">
              <upload v-on:uploadData="uploadData" :many="1" :imagelist="formData.headPicture"/>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="是否独生 :" prop="isOnlyChild">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.isOnlyChild" placeholder="请您选择">
                <el-option v-for="isOnlyChildItem in ynOptions" :key="isOnlyChildItem.name"
                           :label="isOnlyChildItem.label" :value="isOnlyChildItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="现就读学校名称 :" prop="schoolName">
              <el-input class="input-v2-rao" v-model="formData.schoolName" maxlength="128"></el-input>
            </el-form-item>
          </el-col>




          <el-col :span="8">
            <el-form-item label="联系电话 :" prop="contactPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.contactPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="手机号 :" prop="telPhoneNum">
              <el-input class="input-v2-rao" v-model="formData.telPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="通讯地址 :" prop="contactAddress">
              <el-input class="input-v2-rao" v-model="formData.contactAddress" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="邮政编码 :" prop="postNum">
              <el-input class="input-v2-rao" v-model="formData.postNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="电子信箱 :" prop="contactEmail">
              <el-input class="input-v2-rao" v-model="formData.contactEmail" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="在校状态 :" prop="studentStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.studentStatusCode" placeholder="请您选择">
                <el-option v-for="studentStatusCodeItem in studentStatusCodeOptions"
                           :key="studentStatusCodeItem.name"
                           :label="studentStatusCodeItem.label" :value="studentStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="学生来源 :" prop="studentSourceCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.studentSourceCode" placeholder="请您选择">
                <el-option v-for="studentSourceCodeItem in studentSourceCodeOptions"
                           :key="studentSourceCodeItem.name"
                           :label="studentSourceCodeItem.label" :value="studentSourceCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <grade-class :conf="conf" ref="gradeClass" @callback="treeCall"></grade-class>

          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="24" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="" label-width="165px"
                     :inline="true" :model="formData" size="small">

              <el-col :span="8" v-if="formData.studentNum">
                <el-form-item label="学号 :" prop="studentNum">
                  {{formData.studentNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.studentNationalSetNum">
                <el-form-item label="国家统一学籍编码 :" prop="studentNationalSetNum">
                  {{formData.studentNationalSetNum}}
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
                  <span v-show="formData.gender == 'F'">女</span>
                  <span v-show="formData.gender == 'M'">男</span>
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
                <el-form-item label="民族 :" prop="personNationCode" v-if="formData.personNationCodeStr"
                              :style="{'color':formData.personNationCodeStr&&formData.personNationCodeStr.split(';')[1]}">
                  {{formData.personNationCodeStr&&formData.personNationCodeStr.split(';')[0]}}
                </el-form-item>
                <el-form-item label="民族 :" prop="personNationCode" v-else>
                  无
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.regionArea">
                <el-form-item label="国籍/地区 :" prop="regionArea">
                  {{formData.regionArea}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.idCardTypeCode">
                <el-form-item label="身份证件类型 :" prop="idCardTypeCode" v-if="formData.idCardTypeCodeStr"
                              :style="{'color':formData.idCardTypeCodeStr&&formData.idCardTypeCodeStr.split(';')[1]}">
                  {{formData.idCardTypeCodeStr&&formData.idCardTypeCodeStr.split(';')[0]}}
                </el-form-item>
                <el-form-item label="民族 :" prop="personNationCode" v-else>
                  无
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
                <el-form-item label="政治面貌 :" prop="politicalAffiliationCode" v-if="formData.politicalAffiliationCodeStr"
                              :style="{'color':formData.politicalAffiliationCodeStr&&formData.politicalAffiliationCodeStr.split(';')[1]}">
                  {{formData.politicalAffiliationCodeStr&&formData.politicalAffiliationCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.healthCode">
                <el-form-item label="健康状况 :" prop="healthCode"  v-if="formData.healthCodeStr"
                              :style="{'color':formData.healthCodeStr&&formData.healthCodeStr.split(';')[1]}" >
                  {{formData.healthCodeStr&&formData.healthCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.religionCode">
                <el-form-item label="信仰宗教 :" prop="religionCode" v-if="formData.religionCodeStr"
                              :style="{'color':formData.religionCodeStr&&formData.religionCodeStr.split(';')[1]}">
                  {{formData.religionCodeStr&&formData.religionCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.bloodTypeCode">
                <el-form-item label="血型 :" prop="bloodTypeCode" v-if="formData.bloodTypeCodeStr"
                              :style="{'color':formData.bloodTypeCodeStr&&formData.bloodTypeCodeStr.split(';')[1]}">
                  {{formData.bloodTypeCodeStr&&formData.bloodTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.headPicture">
                <el-form-item label="照片 :" prop="headPicture">
                  <img :src="formData.headPicture" alt="" width="100px">
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.isOnlyChild">
                <el-form-item label="是否独生 :" prop="isOnlyChild">
                  <span v-if="formData.isOnlyChild == 'Y'">是</span>
                  <span v-if="formData.isOnlyChild == 'N'">否</span>
                  <!--<el-switch v-model="formData.isOnlyChild == 'Y'" disabled></el-switch>-->
                </el-form-item>
              </el-col>



              <el-col :span="8" v-if="formData.schoolName">
                <el-form-item label="现就读学校名称 :" prop="schoolName">
                  {{formData.schoolName}}
                </el-form-item>
              </el-col>





              <el-col :span="8" v-if="formData.contactPhoneNum">
                <el-form-item label="联系电话 :" prop="contactPhoneNum">
                  {{formData.contactPhoneNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.telPhoneNum">
                <el-form-item label="手机号 :" prop="telPhoneNum">
                  {{formData.telPhoneNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.contactAddress">
                <el-form-item label="通讯地址 :" prop="contactAddress">
                  {{formData.contactAddress}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.postNum">
                <el-form-item label="邮政编码 :" prop="postNum">
                  {{formData.postNum}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.contactEmail">
                <el-form-item label="电子信箱 :" prop="contactEmail">
                  {{formData.contactEmail}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.studentStatusCode">
                <el-form-item label="在校状态 :" prop="studentStatusCode"  v-if="formData.studentStatusCodeStr"
                              :style="{'color':formData.studentStatusCodeStr&&formData.studentStatusCodeStr.split(';')[1]}">
                  {{formData.studentStatusCodeStr&&formData.studentStatusCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.studentSourceCode">
                <el-form-item label="学生来源 :" prop="studentSourceCode"  v-if="formData.studentStatusCodeStr"
                              :style="{'color':formData.studentSourceCodeStr && formData.studentSourceCodeStr.split(';')[1]}">
                  {{formData.studentSourceCodeStr && formData.studentSourceCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>

              <el-col :span="8" v-if="formData.className">
                <el-form-item label="班级名称 :" prop="className">
                  {{formData.className}}
                </el-form-item>
              </el-col>



            </el-form>
          </el-col>

        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center mt20">

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
  import api from "./basicstudentUrl";
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
      // 手机号码校验
      var mobileNum = (rule, value, callback) => {
        var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(16[6-7]{1})|(19[8-9]{1}))+\d{8})$/;
        if (value != "" && reg.test(value)==false) {
          callback(new Error('手机号码格式错误'));
        } else {
          callback();
        }
      }
      // 固定电话校验
      var phoneNum = (rule, value, callback) => {
        var reg = /^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$/;
        if (value != "" && reg.test(value)==false) {
          callback(new Error('固定电话号码格式错误'));
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
      // 身份证校验
      var idCardNum = (rule, value, callback) => {
        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (value != "" && reg.test(value)==false) {
          callback(new Error('身份证号码格式错误'));
        } else {
          callback();
        }
      }
      return {
        conf : {
            gradeId : "",
            classId : ""
        },
        pickTime: {
        },
        gradeId : "",
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        personNationCodeOptions: [{"label": "请选择", "name": ""}], personNationCode: null,
        idCardTypeCodeOptions: [{"label": "请选择", "name": ""}], idCardTypeCode: null,
        politicalAffiliationCodeOptions: [{"label": "请选择", "name": ""}], politicalAffiliationCode: null,
        healthCodeOptions: [{"label": "请选择", "name": ""}], healthCode: null,
        religionCodeOptions: [{"label": "请选择", "name": ""}], religionCode: null,
        bloodTypeCodeOptions: [{"label": "请选择", "name": ""}], bloodTypeCode: null,
        imagePathFileList: [],
        imagePathFileType: '',
        genderOptions: [{"label": "请选择", "name": ""}],
        ynOptions: [{"label": "请选择", "name": ""}], isOnlyChild: null,
        studentStatusCodeOptions: [{"label": "请选择", "name": ""}], studentStatusCode: null,
        studentSourceCodeOptions: [{"label": "请选择", "name": ""}], studentSourceCode: null,
        formData: {
          studentId:null,
          studentNum: "",
          studentNationalSetNum: "",
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
          idCardValidDt: "",
          politicalAffiliationCode: "",
          healthCode: "",
          religionCode: "",
          bloodTypeCode: "",
          headPicture: "",
          isOnlyChild: "",
          schoolId: "",
          schoolName: "",
          classId: "",
          className: "",
          contactPhoneNum: "",
          telPhoneNum: "",
          contactAddress: "",
          postNum: "",
          contactEmail: "",
          studentStatusCode: "",
          studentSourceCode: "",
          idCardNum : ""
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          studentNum: [
            {required: true, message: "请您输入学号", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentNationalSetNum: [
            {required: true, message: "请您输入国家统一学籍编码", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userName: [
            {required: true, message: "请您输入姓名", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userNameEn: [
            {validator: charEn, trigger: "blur"},

          ],
          userNamePinyin: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},
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
          idCardNum :[
              {max: 255, message: "最多能输入255个字", trigger: "blur"},
              {validator: idCardNum, trigger: "blur"},

          ],
          idCardTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          idCardValidDt: [],
          politicalAffiliationCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          healthCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          religionCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          bloodTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          headPicture: [

          ],
          isOnlyChild: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

          ],
          schoolId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          schoolName: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          classId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          className: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          contactPhoneNum: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: mobileNum, trigger: "blur"},

          ],
          telPhoneNum: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: mobileNum, trigger: "blur"},

          ],
          contactAddress: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          postNum: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],

          contactEmail: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: email, trigger: "blur"},

          ],
          studentStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentSourceCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
        }
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
      let _this = this;
      this.pickTime =  {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      this.SET_IS_LOADING(false);
      this.getDetail(this.$route.params.id);
      console.log(this.schoolInfo)
      this.formData.schoolId = this.schoolInfo.schoolOrgId;
      this.formData.schoolName = this.schoolInfo.schoolOrgName;
      if(this.pageState != "detail"){
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
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
              });
            }
          }, res => {
            this.$message.error(res.data.message);
          });
          commonApi.getCodeIntType("studentStatus").then(res => {
            let viewList = res.data.data || [];
            for (let studentStatusItem of viewList) {
              this.studentStatusCodeOptions.push({
                "label": studentStatusItem.codeDesc,
                "name": studentStatusItem.codeId
              });
            }
          }, res => {
            this.$message.error(res.data.message);
          });
          commonApi.getCodeIntType("studentSource").then(res => {
            let viewList = res.data.data || [];
            for (let studentSourceItem of viewList) {
              this.studentSourceCodeOptions.push({
                "label": studentSourceItem.codeDesc,
                "name": studentSourceItem.codeId
              });
            }
          }, res => {
            this.$message.error(res.data.message);
          });
      }
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      example(){
        this.formData = {"studentId":null,"studentNum":"345","studentNationalSetNum":"54654664","userName":"东方闪电","userNameEn":"sdfsdf","userNamePinyin":"asdas","userNameBefore":"水电费公司","gender":"M","birthDt":"2019-03-30 09:00","birthArea":"水电费","placeOriginArea":"过渡","personNationCode":"Han HA","regionArea":"水电费","idCardTypeCode":"IDCARD","idCardValidDt":"2019-03-30 08:00","politicalAffiliationCode":"02","healthCode":"good","religionCode":"orthodox","bloodTypeCode":"BLOODTYPE_AB","headPicture":"","isOnlyChild":"Y","schoolId":"8ee6d402367648ff84726ff712b916da","schoolName":"大大小小","classId":"b747472d434745a1a0a66d81846039d8","className":"初二级7班","contactPhoneNum":"15001565458","telPhoneNum":"15001565458","contactAddress":"水电费","postNum":"2342324","contactEmail":"asdas@163.com","studentStatusCode":"inschool","studentSourceCode":"normal","idCardNum":"441481198512256320"}
      },
      treeCall(event){
        this.gradeId = event.grade.id;
        //this.formData.gradeName = event.grade.name;
        console.log(event)
        this.formData.classId = event.class.id;
        this.formData.className = event.class.name;

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
        if(!this.gradeId){
          this.$message.error("请选择年级");
          return ;
        }
        if(!this.formData.classId){
          this.$message.error("请选择班级");
          return ;
        }
        const set = this.$refs;
        this.isLoaded = true;

        set[formName].validate(valid => {
          console.log(this.formData)
          if (this.pageState === "edit" && valid) {
        this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
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
          this.SET_IS_LOADING(true);
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              //this.formData = {"studentId":null,"studentNum":"345","studentNationalSetNum":"54654664","userName":"东方闪电","userNameEn":"sdfsdf","userNamePinyin":"asdas","userNameBefore":"水电费公司","gender":"M","birthDt":"2019-03-30 09:00","birthArea":"水电费","placeOriginArea":"过渡","personNationCode":"Han HA","regionArea":"水电费","idCardTypeCode":"IDCARD","idCardValidDt":"2019-03-30 08:00","politicalAffiliationCode":"02","healthCode":"good","religionCode":"orthodox","bloodTypeCode":"BLOODTYPE_AB","imagePath":"","isOnlyChild":"Y","schoolId":"f161dffbe3f94c5a9a7394bd1965e8bb","schoolName":"大大小小","classId":"b747472d434745a1a0a66d81846039d8","className":"初二级7班","contactPhoneNum":"15001565458","telPhoneNum":"15001565458","contactAddress":"水电费","postNum":"2342324","contactEmail":"asdas@163.com","studentStatusCode":"inschool","studentSourceCode":"normal","idCardNum":"441481198512256320"}
              this.formData.schoolId = this.schoolInfo.schoolOrgId;
              this.formData.schoolName = this.schoolInfo.schoolOrgName;
              //this.conf.classId = this.formData.classId
              api.getClassData(this.formData.classId).then(res => {
                if (res.data.resultCode === "000000") {
                  /*this.conf.classId = res.data.data.classId
                  this.conf.gradeId = res.data.data.gradeId*/
                  this.pageState == "edit" && this.$refs['gradeClass'].setCurrent(res.data.data.gradeId,res.data.data.classId)
                }
              }, res => {
                this.$message.error(res.message);
              });
              this.SET_IS_LOADING(false);
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
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
