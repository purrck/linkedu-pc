<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="学生id *  :" prop="studentId" class="w300">
              <el-input class="input-v2-rao" v-model="formData.studentId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学生 :" prop="studentName" class="w300">
              <el-input class="input-v2-rao" v-model="formData.studentName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="请假 *  :" prop="leaveTitle" class="w300">
              <el-input class="input-v2-rao" v-model="formData.leaveTitle" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="开始时间 *  :" prop="effectiveDt" class="w300">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="截止时间 *  :" prop="expiryDt" class="w300">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="请假类型 *  :" prop="studentLeaveTypeCode" class="w300">
              <el-select class="select-v2-rao" v-model="formData.studentLeaveTypeCode" placeholder="请您选择">
                <el-option v-for="studentLeaveTypeCodeItem in studentLeaveTypeCodeOptions"
                           :key="studentLeaveTypeCodeItem.name"
                           :label="studentLeaveTypeCodeItem.label" :value="studentLeaveTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="附件图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="请假内容 *  :" prop="content" class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="请假 *  :" prop="leaveTitle" class="w300">
              <el-input class="input-v2-rao" v-model="formData.leaveTitle" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="开始时间 *  :" prop="effectiveDt" class="w300">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="截止时间 *  :" prop="expiryDt" class="w300">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="请假天数 :" prop="dayNum" class="w300">
              <el-input class="input-v2-rao" v-model="formData.dayNum" maxlength="9"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="请假状态 :" prop="studentLeaveStatusCode" class="w300">
              <el-select class="select-v2-rao" v-model="formData.studentLeaveStatusCode" placeholder="请您选择">
                <el-option v-for="studentLeaveStatusCodeItem in studentLeaveStatusCodeOptions"
                           :key="studentLeaveStatusCodeItem.name"
                           :label="studentLeaveStatusCodeItem.label" :value="studentLeaveStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="请假类型 *  :" prop="studentLeaveTypeCode" class="w300">
              <el-select class="select-v2-rao" v-model="formData.studentLeaveTypeCode" placeholder="请您选择">
                <el-option v-for="studentLeaveTypeCodeItem in studentLeaveTypeCodeOptions"
                           :key="studentLeaveTypeCodeItem.name"
                           :label="studentLeaveTypeCodeItem.label" :value="studentLeaveTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="附件图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="需要领导批复 :" prop="isNeedLeaderApprove" class="w300">
              <el-select class="select-v2-rao" v-model="formData.isNeedLeaderApprove" placeholder="请您选择">
                <el-option v-for="isNeedLeaderApproveItem in ynOptions" :key="isNeedLeaderApproveItem.name"
                           :label="isNeedLeaderApproveItem.label" :value="isNeedLeaderApproveItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="审批人 :" prop="approvedUserId" class="w300">
              <el-input class="input-v2-rao" v-model="formData.approvedUserId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="审批人 :" prop="approvedUserName" class="w300">
              <el-input class="input-v2-rao" v-model="formData.approvedUserName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="请假内容 *  :" prop="content" class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-form :label-position="'right'" label-width="120px"
                   :inline="false" :model="formData" size="small" class="flex wrap row">
            <div class="p50">
              <div class="detail-title-v2 ">
                请假学生信息
              </div>
              <div class="detail-item-v2 ml-30">
                <div class="p50 mb-20" v-if="formData.studentName">
                  <div class="img flex row x-center">
                    <img :src="formData.studentHeadPicture||require('../../../assets/img/icon-headImg.png')" alt=""
                         width="64" height="64" style="border-radius: 64px">
                    <div class="ml-20">
                      <div class="up mb10 f18"><span>{{formData.studentName}}</span>
                        <!--<i class="icon-icon_nvsheng iconfont" style="color:#ff97D6"></i>-->
                      </div>
                      <div class="down f14">
                        <span class="mr-10">{{formData.schoolName}}</span> <span>{{formData.className}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p50">
              <div class="detail-title-v2 mr0">
                请假人信息
              </div>
              <div class="detail-item-v2 ml-30 ">
                <div class="p50 mb-20" v-if="formData.userName">
                  <div class="img flex row x-center">
                    <img :src="formData.parentHeadPicture||require('../../../assets/img/icon-headImg.png')" alt=""
                         width="64" height="64" style="border-radius: 64px">
                    <div class="ml-20">
                      <div class="up mb10 f18"><span>{{formData.userName}}</span> <i
                        class="icon-icon_nan iconfont"></i></div>
                      <div class="down f14">
                        <span class="mr-10">{{formData.relationShip}}</span>
                        <!--<span>{{formData.moblie}}</span>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p100 " >
              <div class="detail-title-v2 mr0">
                请假信息
              </div>
              <div class="detail-item-v2 ">
                <div class="flex row pb25">
                  <div  v-for="img in formData.imagPathList" v-show="formData.imagPathList">
                    <img :src="img" alt="" style="width: 200px;height: 200px;">
                  </div>
                  <div>
                    <el-form-item label="请假类型 :" prop="gtScheduleTypeCode">
                      <span v-if="formData.studentLeaveTypeCodeStr"
                            :style="{'color':formData.studentLeaveTypeCodeStr.split(';')[1]}">{{formData.studentLeaveTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                    <el-form-item label="请假时间 :" prop="effectiveDt">
                      <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>&nbsp;&nbsp;至&nbsp;&nbsp;
                      <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                    </el-form-item>

                    <el-form-item label="请假说明 :" prop="publishedPhonenum">
                      <span v-if="formData.content">{{formData.content}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="p100 " v-if="pageType === 'xj'">
              <div class="detail-title-v2 ">
                销假信息
              </div>
              <div class="detail-item-v2">
                <div class="flex row pb25">
                  <div  v-for="img in formData.imagPathList" v-show="formData.imagPathList">
                    <img :src="img" alt="" style="width: 200px;height: 200px;">
                  </div>
                  <div>
                    <el-form-item label="销假时间 :" prop="orgEffectiveDt">
                      <span v-if="formData.orgEffectiveDt  "> {{formData.orgEffectiveDt}}</span>&nbsp;&nbsp;至&nbsp;&nbsp;
                      <span v-if="formData.orgExpiryDt"> {{formData.orgExpiryDt}}</span>
                    </el-form-item>

                    <el-form-item label="实际请假时间 :" prop="realEffectiveDt">
                      <span v-if="formData.realEffectiveDt  "> {{formData.realEffectiveDt}}</span>&nbsp;&nbsp;至&nbsp;&nbsp;
                      <span v-if="formData.realExpiryDt"> {{formData.realExpiryDt}}</span>
                    </el-form-item>

                    <el-form-item label="销假说明 :" prop="orgContent">
                      <span v-if="formData.orgContent">{{formData.orgContent}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="p100">
              <div class="detail-title-v2 mr0">
                审核信息
              </div>
              <div class="detail-item-v2">

                <div class="p33">
                  <el-form-item label="班主任 :" prop="effectiveDt">
                    <span v-if="formData.classMasterTeacherName"> {{formData.classMasterTeacherName}}</span>
                  </el-form-item>
                </div>

                <div class="p33">
                  <el-form-item label="电话 :" prop="effectiveDt">
                    <span v-if="formData.classMasterTeacherPhone"> {{formData.classMasterTeacherPhone}}</span>
                  </el-form-item>
                </div>

                <div class="p33">
                  <el-form-item label="审核结果 :" prop="studentLeaveStatusCodeStr">
                    <span v-if="formData.studentLeaveStatusCodeStr"> {{formData.studentLeaveStatusCodeStr.split(';')[0]}}</span>
                  </el-form-item>
                </div>

                <div class="p33">
                  <el-form-item label="审核时间 :" prop="approvedDt">
                    <span v-if="formData.approvedDt"> {{formData.approvedDt}}</span>
                  </el-form-item>
                </div>

                <!--<div class="p33">-->
                  <!--<el-form-item label="审核说明 :" prop="effectiveDt">-->
                    <!--<span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>-->
                  <!--</el-form-item>-->
                <!--</div>-->

              </div>
            </div>
          </el-form>
        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./studentleaveUrl";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'

  export default {
    components: {editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        studentLeaveStatusCodeOptions: [{"label": "全部", "name": ""}], studentLeaveStatusCode: null,
        studentLeaveTypeCodeOptions: [{"label": "全部", "name": ""}], studentLeaveTypeCode: null,
        imagePathFileList: [],
        imagePathFileType: '',
        ynOptions: [{"label": "全部", "name": ""}], isNeedLeaderApprove: null,
        formData: {
          leaveId: '',
          leaveTitle: "",
          content: "",
          parentImg: "",
          studentImg: "",
          effectiveDt: "",
          expiryDt: "",
          dayNum: "",
          studentLeaveStatusCode: "",
          studentLeaveTypeCode: "",
          imagePath: "",
          isNeedLeaderApprove: "",
          approvedUserId: "",
          approvedUserName: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          studentId: [
            {required: true, message: "请您输入学生id", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          leaveTitle: [
            {required: true, message: "请您输入请假", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          content: [
            {required: true, message: "请您输入请假内容", trigger: "blur"},
            {max: 2000, message: "最多能输入2000个字", trigger: "blur"},

          ],
          effectiveDt: [
            {required: true, message: "请您输入开始时间", trigger: "blur"},

          ],
          expiryDt: [
            {required: true, message: "请您输入截止时间", trigger: "blur"},

          ],
          studentLeaveTypeCode: [
            {required: true, message: "请您输入请假类型", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          imagePath: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
        }
      }
    },
    computed: {

      pageState() {
        return this.$route.params.type;
      },
      pageType() {
        let type = this.formData.orgEffectiveDt;
        if (type) {
          return 'xj';
        } else {
          return 'qj';
        }
      }
    },
    created() {
      // this.getDetail('01ca2e4a732b4081b8116d7223ec2ed2');
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("studentLeaveStatus").then(res => {
        let viewList = res.data.data || [];
        for (let studentLeaveStatusItem of viewList) {
          this.studentLeaveStatusCodeOptions.push({
            "label": studentLeaveStatusItem.codeDesc,
            "name": studentLeaveStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("studentLeaveType").then(res => {
        let viewList = res.data.data || [];
        for (let studentLeaveTypeItem of viewList) {
          this.studentLeaveTypeCodeOptions.push({
            "label": studentLeaveTypeItem.codeDesc,
            "name": studentLeaveTypeItem.codeId
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
                //this.$message.error(res.data.message);
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
