<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)"
                class="bF5F5F5">

    <el-main class="pt0">

      <el-button type="primary" size="small" class="button-v2-rao b93BF88 ">
        活动详情
      </el-button>
      <el-row class="mb10">
        <el-col :span="10">
          <div class="phoneModel-wrap">
            <div class="phoneModel-content">
              <div class="phone-main" id="activityPage">
                <!--<iframe id="coursePage" width="100%" height="667" scrolling="no" frameborder="0"
                        :src="`http://192.168.2.138:8080/#/course?token=${access_token}&courseId=${courseId}`"></iframe>-->
              </div>
            </div>
          </div>

        </el-col>

        <el-col v-show="!showSend" :span="14">
          <div class="edit-box">
            <div v-if="pageState === 'resources'">
              <el-form :label-position="'right'" class="edit-form"
                       label-width="120px" ref="formData" :inline="false" :model="formDataResources" size="small">
                <el-col :span="24">
                  <el-form-item label="活动名称 :">
                    {{formData.topic}}
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="">
                    <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 "
                               @click="fabu">
                      发布
                    </el-button>
                    <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
                               size="small"
                               @click="goBack">返回
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>

            </div>
            <div v-if="pageState === 'add'">

              <el-form :label-position="'right'" class="edit-form edit-form-rao"
                       label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
                <el-col :span="24">
                  <el-form-item label="活动名称 *  :" prop="activityId">

                    <el-select size="mini" class="select-v2-rao" popper-class="select-popper-v2-rao"
                               v-model="formData.activityId" placeholder="请选择" maxlength="32">
                      <el-option
                        label="无"
                        value=""
                      ></el-option>
                      <el-option
                        v-for="item in courseNames.records"
                        :key="item.entityId"
                        :label="item.entityName"
                        :value="item.entityId"
                      >
                        <div @click="activityClick(item)">{{item.entityName}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="活动地点 :" prop="location">
                    <el-input class="input-v2-rao" v-model="formData.location"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="人数限制 :" prop="requestedUserNum">
                    <el-input class="input-v2-rao" v-model="formData.requestedUserNum"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="报名时间 :" prop="enrollDate" class="orgIntroduction">
                    <el-date-picker
                      v-model="enrollDate"
                      type="daterange"
                      range-separator="至"
                      :picker-options="pickTime"
                      value-format="yyyy-MM-dd HH:mm"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="签到时间 :" prop="checkinDate" class="orgIntroduction">
                    <el-date-picker
                      v-model="checkinDate"
                      :picker-options="pickTime2"
                      type="daterange"
                      range-separator="至"
                      value-format="yyyy-MM-dd HH:mm"
                      start-placeholder="开始时间"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="活动时间 :" prop="activeDate" class="orgIntroduction">
                    <el-date-picker
                      v-model="activeDate"
                      type="daterange"
                      :picker-options="pickTime4"
                      range-separator="至"
                      value-format="yyyy-MM-dd HH:mm"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="主办单位 :" prop="coOrganization">
                    <el-input class="input-v2-rao" v-model="formData.coOrganization"
                              maxlength="64"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="协办单位 :" prop="coOrganizerInfo">
                    <el-input class="input-v2-rao" v-model="formData.coOrganizerInfo"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="联系人员 :" prop="contactName">
                    <el-input class="input-v2-rao" v-model="formData.contactName"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="联系人方式 :" prop="contactPhone">
                    <el-input class="input-v2-rao" v-model="formData.contactPhone"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="">
                    <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 "
                               @click="sendTo">
                      下一步
                    </el-button>

                    <el-button v-if="pageState === 'add'" size="small" type="primary"
                               class="fush-btn button-v2-rao b93BF88"
                               :loading="formLoading"
                               @click="submit('formData')">保存
                    </el-button>

                    <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
                               size="small"
                               @click="goBack">返回
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>

            <div v-if="pageState === 'edit' ">
              <el-form :label-position="'right'" class="edit-form edit-form-rao"
                       label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                <el-col :span="24">
                  <el-form-item label="活动名称 *  :" prop="activityId">

                    <el-select size="mini" class="select-v2-rao" popper-class="select-popper-v2-rao"
                               v-model="formData.activityId" placeholder="请选择" maxlength="32">
                      <el-option
                        label="无"
                        value=""
                      ></el-option>
                      <el-option
                        v-for="item in courseNames.records"
                        :key="item.entityId"
                        :label="item.entityName"
                        :value="item.entityId"
                      >
                        <div @click="activityClick(item)">{{item.entityName}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="活动地点 :" prop="location">
                    <el-input class="input-v2-rao" v-model="formData.location"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="人数限制 :" prop="requestedUserNum">
                    <el-input class="input-v2-rao" v-model="formData.requestedUserNum"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="报名时间 :" prop="enrollDate" class="orgIntroduction">
                    <el-date-picker
                      v-model="enrollDate"
                      type="daterange"
                      :picker-options="pickTime"
                      range-separator="至"
                      value-format="yyyy-MM-dd HH:mm"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="签到时间 :" prop="checkinDate" class="orgIntroduction">
                    <el-date-picker
                      v-model="checkinDate"
                      type="daterange"
                      :picker-options="pickTime2"
                      range-separator="至"
                      value-format="yyyy-MM-dd HH:mm"
                      start-placeholder="开始时间"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="活动时间 :" prop="activeDate" class="orgIntroduction">
                    <el-date-picker
                      v-model="activeDate"
                      :picker-options="pickTime4"
                      type="daterange"
                      range-separator="至"
                      value-format="yyyy-MM-dd HH:mm"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="主办单位 :" prop="coOrganization">
                    <el-input class="input-v2-rao" v-model="formData.coOrganization"
                              maxlength="64"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="协办单位 :" prop="coOrganizerInfo">
                    <el-input class="input-v2-rao" v-model="formData.coOrganizerInfo"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="联系人员 :" prop="contactName">
                    <el-input class="input-v2-rao" v-model="formData.contactName"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="联系人方式 :" prop="contactPhone">
                    <el-input class="input-v2-rao" v-model="formData.contactPhone"
                              maxlength="255"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="" prop="contactInfo">
                    <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 "
                               @click="sendTo">
                      下一步
                    </el-button>
                    <el-button v-if="pageState === 'edit'" size="small" type="primary"
                               class="fush-btn button-v2-rao b93BF88"
                               :loading="formLoading"
                               @click="submit('formData')">保存
                    </el-button>

                    <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
                               size="small"
                               @click="goBack">返回
                    </el-button>
                  </el-form-item>
                </el-col>

              </el-form>
            </div>

            <div v-if="pageState === 'detail' || pageState === 'shenhe'">

              <el-row>
                <!-- 详细查看 -->
                <el-form :label-position="'right'" label-width="120px"
                         :inline="false" :model="formData" size="small" class="flex row wrap">
                  <div class="p100">
                    <div class="detail-title-v2 mr0">
                      活动信息
                    </div>
                    <div class="detail-item-v2">

                      <div class="p50">
                        <el-form-item label="活动名称 :" prop="intro">
                          <span>{{formData.activityTopic}}</span>
                        </el-form-item>
                      </div>

                      <div class="p50">
                        <el-form-item label="发布时间 :" prop="intro">
                          <span>{{formData.createdDt}}</span>
                        </el-form-item>
                      </div>

                      <div class="p50">
                        <el-form-item label="活动状态 :" prop="intro">
                          <span>{{formData.entityOrgStatusCodeStr.split(";")[0]}}</span>
                        </el-form-item>
                      </div>

                      <div class="p50">
                        <el-form-item label="活动地点 :" prop="intro">
                          <span>{{formData.location}}</span>
                        </el-form-item>
                      </div>

                      <div class="p100">
                        <el-form-item label="人数限制 :" prop="mainContent">
                          {{formData.requestedUserNum}}
                        </el-form-item>
                      </div>

                      <div class="p100">
                        <el-form-item label="报名时间 :" prop="mainContent">
                          {{formData.enrollBeginDt}} 至 {{formData.enrollEndDt}}
                        </el-form-item>
                      </div>

                      <div class="p100">
                        <el-form-item label="签到时间 :" prop="mainContent">
                          {{formData.checkinBeginDt}} 至 {{formData.checkinEndDt}}
                        </el-form-item>
                      </div>

                      <div class="p100">
                        <el-form-item label="活动时间 :" prop="mainContent">
                          {{formData.effectiveDt}} 至 {{formData.expiryDt}}
                        </el-form-item>
                      </div>


                      <div class="p50">
                        <el-form-item label="主办单位 :" prop="publishedDt">
                          <span> {{formData.coOrganization}}</span>
                        </el-form-item>
                      </div>
                      <div class="p50">
                        <el-form-item label="协办单位 :" prop="startDt">
                          <span>{{formData.coOrganizerInfo}}</span>
                        </el-form-item>
                      </div>
                      <div class="p50">
                        <el-form-item label="联系人员 :" prop="expiredDt">
                          <span>{{formData.contactName}}</span>
                        </el-form-item>
                      </div>
                      <div class="p50">
                        <el-form-item label="联系方式 :" prop="location">
                          <span>{{formData.contactPhone}}</span>
                        </el-form-item>
                      </div>
                      <!--<div class="p100">
                        <el-form-item label="发送对象 :" prop="contactInfo">
                          <span>小学>一年级/广东省>广州市>天河区,海  <a href="">详情</a></span>
                        </el-form-item>
                      </div>-->

                      <!--<div class="p100">
                        <el-form-item label="图片 :" prop="imagePath">
                          <img :src="formData.imagePath" width="120" />
                        </el-form-item>
                      </div>-->

                      <div class="p100"
                           v-show="formData.activityPlanStatusCode == 'published' || formData.activityPlanStatusCode == 'reject'">
                        <el-form-item label="审核结果 :" prop="contactInfo">
                          <span>{{formData.activityPlanStatusCodeStr}}</span>
                        </el-form-item>
                      </div>
                      <div class="p100"
                           v-show="formData.activityPlanStatusCode == 'published' || formData.activityPlanStatusCode == 'reject'">
                        <el-form-item label="审核说明 :" prop="contactInfo">
                          <span>{{formData.auditOpinion}}</span>
                        </el-form-item>
                      </div>

                      <div class="p100" v-show="pageState != 'shenhe'">
                        <el-form-item label="">
                          <qr-code :text="`activityPlanId&${formData.activityPlanId}`" :logoSrc="src2" :size="200"
                                   :margin="0" v-show="false"
                                   class="imgQr"></qr-code>
                          <el-button type="primary" size="small" @click="mingdan"
                                     class="button-v2-rao border-color-cccccc c93BF88 bfff">查看参与名单
                          </el-button>
                          <el-button type="primary" size="small" @click="erweima('.imgQr','活动签到表')"
                                     class="button-v2-rao border-color-cccccc c93BF88 bfff">下载签到二维码
                          </el-button>
                        </el-form-item>
                      </div>

                      <div class="p100" v-show="pageState != 'shenhe'">
                        <el-form-item label="">
                          <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 "
                                     @click='goBack'>
                            返回
                          </el-button>
                          <el-button v-show="formData.entityOrgStatusCode == 'opening'" @click="tingyong"
                                     :loading="tingyongLoading" type="primary" size="small"
                                     class="button-v2-rao border-color-cccccc c000000 bfff">停用
                          </el-button>
                        </el-form-item>
                      </div>

                      <div class="p100" v-show="pageState == 'shenhe'">
                        <el-form-item label="">
                          <el-button type="primary" :loading="shenheLoading" size="small"
                                     class="button-v2-rao border-color-cccccc c000000 bfff" @click="shenhe">通过
                          </el-button>
                          <el-button :loading="bohuiLoading" type="primary" size="small"
                                     class="el-button--small-icon  button-v2-rao b93BF88 " @click='bohui'>
                            驳回
                          </el-button>

                        </el-form-item>
                      </div>


                    </div>
                  </div>
                </el-form>
              </el-row>
            </div>


          </div>
        </el-col>

        <el-col v-show="showSend" :span="14" class="bfff mt50"  style="padding: 40px;">
          <SendObject :header="header" @finish="finish"></SendObject>
          <div class="text-center mt20">
            <el-button type="primary" :loading="saveLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "save2">
              保存
            </el-button>
            <el-button type="primary" :loading="shenheLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "sendShenhe">
              提交审核
            </el-button>
            <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff" @click="goBack">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>

    <el-dialog title="驳回" :before-close="bohuiCancelHandler" :center="true" :visible.sync="dialogTableVisiblebohui">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea4" class="select-v2-rao">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bohui" :loading="bohuiLoading">确 定</el-button>
        <el-button @click="bohuiCancelHandler">取 消</el-button>

      </div>
    </el-dialog>

    <el-dialog title="审核" :before-close="shenheCancelHandler" :center="true" :visible.sync="dialogTableVisible">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea3" class="select-v2-rao">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shenhe" :loading="shenheLoading">确 定</el-button>
        <el-button @click="shenheCancelHandler">取 消</el-button>
      </div>
    </el-dialog>

    <!--<canvas id="canvas"></canvas>-->
  </el-container>
</template>

<script>
  import api from "./activityinfoUrl";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import PhoneModel from "@/components/phoneModel";
  import {mapGetters, mapMutations} from 'vuex';
  import qrCode from 'vue-qr';
  import SendObject from "../../../components/sendObject/testSendObject";

  export default {
    components: {SendObject, PhoneModel, editor, upload, uploads, qrCode},
    data() {
      //let isExample = false
      return {
        src2: require('../../../assets/img/icon-logo-1.png'),
        sca2: 0.25,
        isExample: false,
        showSend: false,
        enrollDate: [],
        header: [
          {
            title: '1、通知角色/学段',
            isActive: true,
            code: 'segment',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '角色',
                subTitleType: 'role',
                nextType: 'grade',
                single:true,
                isActive: false,
                url: '/userapp/base/codeInt/list?codetypeId=userType'
              },
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                nextType: 'grade',
                isActive: false,
                url: '/sm/base/schoolSegmentAd/segmentGrade?type=1'
              }
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'grade',
            children: [
              {
                checked: [],
                children: [],
                subTitleType: 'grade',
                nextType: 'grade',
                subTitle: '年级',
                isActive: false,
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'class',
            children: [
              {
                checked: [],
                children: [],
                subTitleType: 'class',
                nextType: 'none',
                subTitle: '人员',
                isActive: false,
              },
            ]
          },
        ],
        checkinDate: [],
        activeDate: [],
        dialogTableVisiblebohui: false,
        saveLoading: false,
        isFinish: false,
        textarea4: "",
        textarea3: "",
        bohuiLoading: false,
        shenheLoading: false,
        tingyongLoading: false,
        dialogTableVisible: false,
        courseNames: [
          {
            codeDesc: "消防全使用办法",
            codeId: "1"
          },
          {
            codeDesc: "消防全使用办法1",
            codeId: "1"
          }

        ],
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        imagePathFileList: [],
        imagePathFileType: '',
        actypeCodeOptions: [{"label": "全部", "name": ""}], actypeCode: null,
        acstatusCodeOptions: [{"label": "全部", "name": ""}], acstatusCode: null,
        ynOptions: [{"label": "全部", "name": ""}], isPublic: null,
        publicServiceCodeOptions: [{"label": "全部", "name": ""}], publicServiceCode: null,
        virtualCurrencyCodeOptions: [{"label": "全部", "name": ""}], virtualCurrencyCode: null,
        formDataResources: {},
        formData: {
          activityId: "",
          location: "",
          enrollDate: "",
          expiryDt: "",
          effectiveDt: "",
          entityOrganizationScopeVO: {
            entityOrgStatusCode: "",
            entityId: "",
            entityType: ""
          }
        },
        pickTime: {},
        rules: {
          activityId:
            [
              {required: true, message: "请您选择活动名称", trigger: "blur"},
              {max: 255, message: "最多能输入255个字", trigger: "blur"},
            ],
          enrollDate: [
            {required: true, message: "请您选择活动报名时间", trigger: "blur"},
          ],
          checkinDate: [
            {required: true, message: "请您选择活动签到时间", trigger: "blur"},
          ],
          activeDate: [
            {required: true, message: "请您选择活动开始时间", trigger: "blur"},
          ],
          location:
            [
              {required: true, max: 255, message: "请填写活动地点", trigger: "blur"}
            ],
          initiator:
            [
              {required: true, message: "请您输入主办单位", trigger: "blur"},
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],

        }
      }
    },
    computed: {
      ...mapGetters(["isLoading", "access_token"]),
      pageState() {
        return this.$route.query.type;
      },
      activityPlanId() {
        return this.$route.query.activityPlanId;
      },
      entityOrgId() {
        return this.$route.query.entityOrgId
      }
    },
    watch: {
      enrollDate(val) {
        this.formData.enrollBeginDt = val[0];
        this.formData.enrollEndDt = val[1];
        this.formData.enrollDate = val;
        return val
      },
      checkinDate(val) {
        this.formData.checkinBeginDt = val[0];
        this.formData.checkinEndDt = val[1];
        this.formData.checkinDate = val;
        return val
      },
      activeDate(val) {
        this.formData.effectiveDt = val[0];
        this.formData.expiryDt = val[1];
        this.formData.activeDate = val;
        return val
      },
    },
    created() {
      this.formData.activityId = this.entityOrgId
      let _this = this;
      this.pickTime = {
        disabledDate(time) {
          return time.getTime() < new Date().getTime();
        }
      }
      this.pickTime2 = {
        disabledDate(time) {
          return time.getTime() <= new Date(_this.formData.enrollEndDt).getTime();
        }
      }
      this.pickTime4 = {
        disabledDate(time) {
          return time.getTime() <= new Date(_this.formData.checkinEndDt).getTime();
        }
      }

      //this.SET_IS_LOADING(true);
      if (this.pageState == 'add' || this.pageState == 'edit') {
        this.getList();
      }

      if (this.pageState == 'resources') {
        this.getObjYunYing(this.entityOrgId);
      } else if (this.pageState != 'add') {
        this.getDetail(this.entityOrgId);
      }


    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      initCodes() {
        commonApi.getCodeIntType("actype").then(res => {
          let viewList = res.data.data || [];
          for (let actypeItem of viewList) {
            this.actypeCodeOptions.push({
              "label": actypeItem.codeDesc,
              "name": actypeItem.codeId
            });
          }
        });
        commonApi.getCodeIntType("acstatus").then(res => {
          let viewList = res.data.data || [];
          for (let acstatusItem of viewList) {
            this.acstatusCodeOptions.push({
              "label": acstatusItem.codeDesc,
              "name": acstatusItem.codeId
            });
          }
        });
        commonApi.getCodeIntType("boolean_yn").then(res => {
          let viewList = res.data.data || [];
          for (let ynItem of viewList) {
            this.ynOptions.push({
              "label": ynItem.codeDesc,
              "name": ynItem.codeId
            });
          }
        });
        commonApi.getCodeIntType("publicService").then(res => {
          let viewList = res.data.data || [];
          for (let publicServiceItem of viewList) {
            this.publicServiceCodeOptions.push({
              "label": publicServiceItem.codeDesc,
              "name": publicServiceItem.codeId
            });
          }
        });
        commonApi.getCodeIntType("virtualCurrency").then(res => {
          let viewList = res.data.data || [];
          for (let virtualCurrencyItem of viewList) {
            this.virtualCurrencyCodeOptions.push({
              "label": virtualCurrencyItem.codeDesc,
              "name": virtualCurrencyItem.codeId
            });
          }
        });
      },
      erweima(selector, name) {
        // 通过选择器获取img元素
        // qrCode.toCanvas()
        var img = document.querySelector(selector).getElementsByTagName("img")[0]
        console.log(document.querySelector(selector).getElementsByTagName("img"));
        // 将图片的src属性作为URL地址
        var url = img.src
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download = name || '下载图片名称'
        a.href = url

        a.dispatchEvent(event)
      },
      activityClick(item) {
        console.log(item);
        document.getElementById("activityPage").innerHTML = ""
        let b = "http://192.168.2.60:8099";

        if (window.location.host == "192.168.2.60:2099") {
          b = "http://192.168.2.60:9099"
        }
        if (window.location.host == "47.106.35.119") {
          b = "http://47.106.35.119:5188"
        }
        let a = document.createElement("iframe")
        a.src = `${b}/#/activity?token=${this.access_token}&activityId=${item.entityId}`
        a.width="300"
        a.height="504"
        a.scrolling = "no"
        a.frameborder = "0"
        document.getElementById("activityPage").appendChild(a)

        this.formData.imagePath = item.imagePath
        this.formData.imagePath = item.imagePath
        this.formData.activityTopic = item.entityName


        if (this.pageState === 'edit') {
          this.formData.entityOrganizationScopeVO = {
            entityId: item.entityId,
            entityOrgId: this.entityOrgId,
            entityType: item.entityType,
            entityOrgStatusCode: "editing"
          }
        }
        if (this.pageState === 'add') {
          this.formData.entityOrganizationScopeVO.entityId = item.entityId
          this.formData.entityOrganizationScopeVO.entityType = item.entityType
        }

      },
      getList() {
        api.entityActivityinfoList({
          entityType: "activityinfo",
          limit: "9999",
          page: "1"
        }).then(res => {
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          } else {
            this.courseNames = res.data.data;
          }

          this.SET_IS_LOADING(false);
        }, res => {
          this.$message.error(res.message);
          this.SET_IS_LOADING(false);
        });
      },
      fabu() {
        this.$router.push({
          path: '/safetyEdu/edu_detailActivityDetailSchool?type=add'
        })
      },
      shenheCancelHandler() {
        this.shenheLoading = false;
        this.dialogTableVisible = false;
      },
      bohuiCancelHandler() {
        this.bohuiLoading = false;
        this.dialogTableVisiblebohui = false;
      },
      bohuiOpen() {
        this.dialogTableVisiblebohui = true;
      },
      bohui() {
        this.bohuiLoading = true;
        api.updateStatus({
          entityOrgIds: [this.entityOrgId],
          entityOrgStatusCode: "rejected"
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.$message.success("驳回成功");
            this.dialogTableVisiblebohui = false;
            this.$router.push({
              path: "/safetyEdu/edu_activity"
            })
          }
          this.bohuiLoading = false;
        }, res => {
          this.bohuiLoading = false;
          this.$message.error(res.message);
        })
      },
      shenhe() {
        this.shenheLoading = true;
        api.updateStatus({
          entityOrgIds: [this.entityOrgId],
          entityOrgStatusCode: "opening"
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.$message.success("审核通过");
            this.dialogTableVisible = false;
            this.$router.push({
              path: "/safetyEdu/edu_activity"
            })
          }
          this.shenheLoading = false;
        }, res => {
          this.shenheLoading = false;
          this.$message.error(res.message);
        })
      },
      tongguo() {
        this.dialogTableVisible = true;

      },
      tingyong() {
        this.tingyongLoading = true;
        api.updateStatus({
          entityOrgIds: [this.entityOrgId],
          entityOrgStatusCode: "finished"
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.$message.success("停用成功");
            this.$router.push({
              path: "/safetyEdu/edu_activity"
            })
          }
          this.tingyongLoading = false;
        }, res => {
          this.tingyongLoading = false;
          this.$message.error(res.message);
        })
      },
      mingdan() {
        this.$router.push({
          path: "/safetyEdu/activityMingdan",
          query: {
            entityOrgId: this.entityOrgId
          }
        })
      },
      sendTo() {
        //this.formData["activityPlanStatusCode"] = "editing"
        //this.formData["imagePath"] = "123"
        //this.formData["content"] = "123"
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.showSend = true
          }
        })
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;

        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            if (!this.formData.entityOrganizationScopeVO) {
              this.formData.entityOrganizationScopeVO = {
                entityId: this.formData.entityId,
                entityOrgId: this.formData.entityOrgId,
                entityType: this.formData.entityType,
                entityOrgStatusCode: this.formData.entityOrgStatusCode
              }
            }
            this.formLoading = true;
            api.activityPlansAdEdit(this.formData).then(res => {
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
            this.formData.entityOrganizationScopeVO.entityOrgStatusCode = "editing"
            this.formLoading = true;
            api.activityPlansAd(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("发布成功");
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
      getObjYunYing(paramsId) {
        if (this.pageState == 'resources') {
          api.getObjYunYing(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
            } else {
              this.$message.error(res.data.message);
            }
            this.isLoaded = false;
            this.SET_IS_LOADING(false);
          })
        }
      },
      getDetail(paramsId) {

        if (this.pageState !== 'add') {
          api.activityDetail(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              api.getObj(paramsId).then(res1 => {
                if (res1.data.resultCode === "000000") {
                  for (let key in res.data.data) {
                    if (key == "effectiveDt") {
                      res.data.data['effectiveDt'] = res1.data.data['effectiveDt']
                    }
                    res1.data.data[key] = res.data.data[key]
                  }

                  this.formData = res1.data.data
                } else {
                  this.$message.error(res.data.message);
                }
                this.isLoaded = false;
              })
            }
            this.isLoaded = false;
            this.SET_IS_LOADING(false);
          })

        }


      },
      goBack() {
        this.$router.go(-1);
      },
      sendShenhe(){

        if(!this.isFinish){
          this.$message.error("请点击完成选择");
          return
        }
        this.shenheLoading = true;
        this.formData.entityOrganizationScopeVO['entityOrgStatusCode'] = 'approving'
        if(this.pageState == "add"){
          api.activityPlansAd(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$router.push({
                path:"/safetyEdu/edu_activity"
              })
              this.$message.success("发布成功");
            } else {
              this.$message.error(res.data.message);
            }
            this.shenheLoading = false;
          })
        }

        if(this.pageState == "edit"){
          api.activityPlansAdEdit(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$message.success("修改成功");
              this.$router.push({
                path:"/safetyEdu/edu_activity"
              })
            } else {
              this.$message.error(res.data.message);
            }
            this.shenheLoading = false;
          })
        }
      },
      save2(){

        if(!this.isFinish){
          this.$message.error("请点击完成选择");
          return
        }
        this.saveLoading = true;
        this.formData.entityOrganizationScopeVO['entityOrgStatusCode'] = 'editing'
        if(this.pageState === "add"){
          api.activityPlansAd(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$router.push({
                path:"/safetyEdu/edu_activity"
              })
              this.$message.success("发布成功");
            } else {
              this.$message.error(res.data.message);
            }
            this.saveLoading = false;
          })
        }

        if(this.pageState == "edit"){
          api.activityPlansAdEdit(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$router.push({
                path:"/safetyEdu/edu_activity"
              })
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.message);
            }
            this.saveLoading = false;
          })
        }
      },
      finish(data){
        console.log(data)
        this.isFinish = true;
        this.$message.success("选择成功");
        //this.formData["scope"] = JSON.stringify(data);

        this.formData.entityOrganizationScopeVO['roleId'] = data.role[0]
        this.formData.entityOrganizationScopeVO['gradeIds'] = data.grade
        this.formData.entityOrganizationScopeVO['classIds'] = data.class

        this.isFinish = true;

      },
      example() {
        this.formData = {
          "activityId": "6b51edbbaee6425e9e4af0550c6219d7",
          "location": "88989",
          "expiryDt": "2019-05-11 00:00",
          "effectiveDt": "2019-05-01 00:00",
          "entityOrganizationScopeVO": {
            "entityOrgStatusCode": "editing",
            "entityId": "6b51edbbaee6425e9e4af0550c6219d7",
            "entityType": "activityinfo"
          },
          "activityTopic": "hello",
          "requestedUserNum": "787",
          "enrollBeginDt": "2019-04-22 00:00",
          "enrollEndDt": "2019-04-25 00:00",
          "checkinBeginDt": "2019-04-26 00:00",
          "checkinEndDt": "2019-04-30 00:00",
          "coOrganizationName": "88",
          "coOrganizerInfo": "8",
          "contactName": "8888",
          "contactPhone": "787"
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .edit-box {
    width: auto;
    background: #fff;
    margin: 40px;
    flex: 1;
  }

  .phoneModel-wrap {
    width: 325px;
    height: 556px;
    margin: 50px auto 0px;
    padding: 24px 20px;
    box-sizing: border-box;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 30px;
    background-color: #ccc;
    .phoneModel-content{
      background-color: #fff;
      margin-bottom: -11px;
      height: 100%;
    }
    .phone-main {
      background-color: #fff;

      overflow: hidden;

      .title {
        color: #474747;
        font-size: 21px;
      }

      .author-bar {
        margin: 10px 0;
        display: flex;
        font-size: 12px;
        color: #999;

        .author {
          margin-right: 5px;
        }

        .flex1 {
          flex: 1;
          justify-content: flex-end;
        }
      }

      .phone-content {
        border-radius: 8px;
        img {
          width: 100%;
        }
      }
    }
  }

</style>
