<template>
  <div>
    <div class="flex row bF5F5F5">
      <phone-model class="phone-model" :data="formData"></phone-model>
      <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

            <el-col :span="24">
              <el-form-item label="活动名称 *  :" prop="topic">
                <el-select size="mini" class="select-v2-rao" popper-class="select-popper-v2-rao"
                           v-model="formData.topic" placeholder="请选择" maxlength="32">
                  <el-option
                    label="无"
                    value=""
                  ></el-option>
                  <el-option
                    v-for="item in courseNames"
                    :key="item.codeId"
                    :label="item.codeDesc"
                    :value="item.codeId"
                  ></el-option>
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
              <el-form-item label="人数限制 :" prop="location">
                <el-input class="input-v2-rao" v-model="formData.location"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="活动时间 :" prop="startDt" class="orgIntroduction">
                <el-date-picker class="date-v2-rao" v-model="formData.startDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
                至
                <el-date-picker class="date-v2-rao" v-model="formData.expiredDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="报名时间 :" prop="enrollStartDt" class="orgIntroduction">
                <el-date-picker class="date-v2-rao" v-model="formData.enrollStartDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
                至
                <el-date-picker class="date-v2-rao" v-model="formData.enrollExpiredDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="主办单位 :" prop="commonwealOrganizationName">
                <el-input class="input-v2-rao" v-model="formData.commonwealOrganizationName"
                          maxlength="64"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="协办单位 :" prop="sponsorsInfo">
                <el-input class="input-v2-rao" v-model="formData.sponsorsInfo"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人员 :" prop="contactInfo">
                <el-input class="input-v2-rao" v-model="formData.contactInfo"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人方式 :" prop="contactInfo">
                <el-input class="input-v2-rao" v-model="formData.moblie"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>

          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

            <el-col :span="24">
              <el-form-item label="活动名称 *  :" prop="topic">
                <el-input class="input-v2-rao" v-model="formData.topic"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="活动地点 :" prop="location">
                <el-input class="input-v2-rao" v-model="formData.location"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="人数限制 :" prop="location">
                <el-input class="input-v2-rao" v-model="formData.location"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="活动时间 :" prop="startDt" class="orgIntroduction">
                <el-date-picker class="date-v2-rao" v-model="formData.startDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
                至
                <el-date-picker class="date-v2-rao" v-model="formData.expiredDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="报名时间 :" prop="enrollStartDt" class="orgIntroduction">
                <el-date-picker class="date-v2-rao" v-model="formData.enrollStartDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
                至
                <el-date-picker class="date-v2-rao" v-model="formData.enrollExpiredDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickTime">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="主办单位 :" prop="commonwealOrganizationName">
                <el-input class="input-v2-rao" v-model="formData.commonwealOrganizationName"
                          maxlength="64"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="协办单位 :" prop="sponsorsInfo">
                <el-input class="input-v2-rao" v-model="formData.sponsorsInfo"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人员 :" prop="contactInfo">
                <el-input class="input-v2-rao" v-model="formData.contactInfo"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="联系人方式 :" prop="contactInfo">
                <el-input class="input-v2-rao" v-model="formData.moblie"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>

          </el-form>
        </div>

        <div v-if="pageState === 'detail'">
          <el-row>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 mr0">
                  活动信息
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.topic">
                    <el-form-item label="活动名称 :" prop="topic">
                      <span v-if="formData.topic">{{formData.topic}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.intro">
                    <el-form-item label="活动简介 :" prop="intro">
                      <span v-if="formData.intro">{{formData.intro}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.mainContent">
                    <el-form-item label="活动内容 :" prop="mainContent">
                      <span v-if="formData.mainContent" v-html="formData.mainContent"></span>
                    </el-form-item>
                  </div>


                  <div class="p100">
                    <el-form-item label="标志图 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="发布时间 :" prop="publishedDt">
                      <span v-if="formData.publishedDt"> {{formData.publishedDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="活动时间 :" prop="startDt">
                      <span v-if="formData.startDt"> {{formData.startDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="截止时间 :" prop="expiredDt">
                      <span v-if="formData.expiredDt"> {{formData.expiredDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.location">
                    <el-form-item label="活动地点 :" prop="location">
                      <span v-if="formData.location">{{formData.location}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.contactInfo">
                    <el-form-item label="联系人信息 :" prop="contactInfo">
                      <span v-if="formData.contactInfo">{{formData.contactInfo}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="状态 :" prop="acstatusCode">
                            <span v-if="formData.acstatusCodeStr"
                                  :style="{'color':formData.acstatusCodeStr.split(';')[1]}">{{formData.acstatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="是否开放 :" prop="isPublic">
                      <el-switch v-model="formData.isPublic == 'Y'" disabled></el-switch>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="报名时间 :" prop="enrollStartDt">
                      <span v-if="formData.enrollStartDt"> {{formData.enrollStartDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="报名结束时间 :" prop="enrollExpiredDt">
                      <span v-if="formData.enrollExpiredDt"> {{formData.enrollExpiredDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.commonwealOrganizationId">
                    <el-form-item label="主办单位 :" prop="commonwealOrganizationId">
                      <span v-if="formData.commonwealOrganizationId">{{formData.commonwealOrganizationId}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.commonwealOrganizationName">
                    <el-form-item label="主办单位 :" prop="commonwealOrganizationName">
                      <span v-if="formData.commonwealOrganizationName">{{formData.commonwealOrganizationName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.sponsorsInfo">
                    <el-form-item label="赞助商 :" prop="sponsorsInfo">
                      <span v-if="formData.sponsorsInfo" v-html="formData.sponsorsInfo"></span>
                    </el-form-item>
                  </div>


                  <div class="p100" v-if="formData.coOrganizerInfo">
                    <el-form-item label="协办单位 :" prop="coOrganizerInfo">
                      <span v-if="formData.coOrganizerInfo" v-html="formData.coOrganizerInfo"></span>
                    </el-form-item>
                  </div>

                </div>
              </div>
            </el-form>
          </el-row>
        </div>

        <SendObject :header="header" @finish="finish"></SendObject>

        <div class="text-center mt-30">
          <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="sendTo">
            下一步
          </el-button>
          <el-button v-if="pageState === 'edit'" size="small" type="primary" class="fush-btn button-v2-rao b93BF88"
                     :loading="formLoading"
                     @click="submit('formData')">更新
          </el-button>
          <el-button v-if="pageState === 'add'" size="small" type="primary" class="fush-btn button-v2-rao b93BF88"
                     :loading="formLoading"
                     @click="submit('formData')">发布
          </el-button>

          <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                     @click="goBack">返回
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./activityinfoUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import PhoneModel from "@/components/phoneModel";
  import SendObject from "../../../components/sendObject/index";

  export default {
    components: {SendObject, PhoneModel, editor, upload, uploads},
    data() {
      return {
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
        formLoading: false,
        showSend: false,
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
        formData: {
          id: '',
          topic: "",
          intro: "",
          mainContent: "",
          imagePath: "",
          actypeCode: "",
          initiator: "",
          startDt: "",
          expiredDt: "",
          location: "",
          contactInfo: "",
          acstatusCode: "",
          isPublic: "",
          enrollStartDt: "",
          enrollExpiredDt: "",
          commonwealOrganizationId: "",
          commonwealOrganizationName: "",
          sponsorsInfo: "",
          coOrganizerInfo: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          topic:
            [
              {required: true, message: "请您输入活动名称", trigger: "blur"},
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          intro:
            [
              {max: 140, message: "最多能输入140个字", trigger: "blur"},

            ],
          mainContent:
            [],
          imagePath:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          actypeCode:
            [
              {max: 16, message: "最多能输入16个字", trigger: "blur"},

            ],
          initiator:
            [
              {required: true, message: "请您输入主办单位", trigger: "blur"},
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          startDt:
            [],
          expiredDt:
            [],
          location:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          contactInfo:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          acstatusCode:
            [
              {max: 16, message: "最多能输入16个字", trigger: "blur"},

            ],
          isPublic:
            [
              {max: 2, message: "最多能输入2个字", trigger: "blur"},

            ],
          enrollStartDt:
            [],
          enrollExpiredDt:
            [],
          commonwealOrganizationId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          commonwealOrganizationName:
            [
              {max: 64, message: "最多能输入64个字", trigger: "blur"},

            ],
          sponsorsInfo:
            [
              {max: 21845, message: "最多能输入21845个字", trigger: "blur"},

            ],
          coOrganizerInfo:
            [
              {max: 21845, message: "最多能输入21845个字", trigger: "blur"},

            ],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
    created() {
      this.getDetail(this.$route.params.id);
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
    methods: {
       sendTo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.showSend = true;
          }
        });
        // this.$router.push({
        //   path: "/safetyEdu/activitySend"
        // })
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
      finish(val){
        this.index++
        this.isFinish = true;
        this.formData.scope = val.header;
        this.formData.roleId = val.header[0].children[0].checked;;
        this.formData.segmentIds = val.header[0].children[1].checked;
        let resData = val.header;
        let temp = [];

        resData[1].children.forEach(res => {
          temp = temp.concat(res.checked);
        })
        this.formData.gradeIds = temp;

        let claTem = [];
        resData[2].children.forEach(res => {
          claTem = claTem.concat(res.checked);
        });
        // console.log('claTem');
        // console.log(claTem);
        this.formData.classIds = claTem;
      },
      uploadData(res) {
        this.formData.imagePath = res;
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
    width: auto;
    background: #fff;
    margin: 40px;
    flex: 1;
  }

  .phone-model {
    margin: 40px 115px 0 75px;
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
