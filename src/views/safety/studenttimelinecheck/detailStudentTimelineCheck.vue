<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="学生id :" prop="studentId">
              <el-input class="input-v2-rao" v-model="formData.studentId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生 :" prop="studentName">
              <el-input class="input-v2-rao" v-model="formData.studentName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生用户id :" prop="studentUserId">
              <el-input class="input-v2-rao" v-model="formData.studentUserId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学年 :" prop="schoolYear">
              <el-input class="input-v2-rao" v-model="formData.schoolYear"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学期 :" prop="schoolTerm">
              <el-input class="input-v2-rao" v-model="formData.schoolTerm"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学年周次 :" prop="weekSchoolYear">
              <el-input class="input-v2-rao" v-model="formData.weekSchoolYear"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="续期周次 :" prop="weekSchoolTerm">
              <el-input class="input-v2-rao" v-model="formData.weekSchoolTerm"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="考勤日期 :" prop="calendarDt">
              <el-date-picker class="date-v2-rao" v-model="formData.calendarDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="正常 :" prop="isNormal">
              <el-select class="select-v2-rao" v-model="formData.isNormal" placeholder="请您选择">
                <el-option v-for="isNormalItem in ynOptions" :key="isNormalItem.name"
                           :label="isNormalItem.label" :value="isNormalItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="正常请假 :" prop="isApprovedLeave">
              <el-select class="select-v2-rao" v-model="formData.isApprovedLeave" placeholder="请您选择">
                <el-option v-for="isApprovedLeaveItem in ynOptions" :key="isApprovedLeaveItem.name"
                           :label="isApprovedLeaveItem.label" :value="isApprovedLeaveItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="timelineCheckStatusCode">
              <el-select class="select-v2-rao" v-model="formData.timelineCheckStatusCode" placeholder="请您选择">
                <el-option v-for="timelineCheckStatusCodeItem in timelineCheckStatusCodeOptions"
                           :key="timelineCheckStatusCodeItem.name"
                           :label="timelineCheckStatusCodeItem.label" :value="timelineCheckStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="考勤方式 :" prop="timelineCheckBytypeCode">
              <el-select class="select-v2-rao" v-model="formData.timelineCheckBytypeCode" placeholder="请您选择">
                <el-option v-for="timelineCheckBytypeCodeItem in timelineCheckBytypeCodeOptions"
                           :key="timelineCheckBytypeCodeItem.name"
                           :label="timelineCheckBytypeCodeItem.label" :value="timelineCheckBytypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="考勤异常类型 :" prop="timelineCheckExceptionCode">
              <el-select class="select-v2-rao" v-model="formData.timelineCheckExceptionCode" placeholder="请您选择">
                <el-option v-for="timelineCheckExceptionCodeItem in timelineCheckExceptionCodeOptions"
                           :key="timelineCheckExceptionCodeItem.name"
                           :label="timelineCheckExceptionCodeItem.label" :value="timelineCheckExceptionCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="正常 :" prop="isNormal">
              <el-select class="select-v2-rao" v-model="formData.isNormal" placeholder="请您选择">
                <el-option v-for="isNormalItem in ynOptions" :key="isNormalItem.name"
                           :label="isNormalItem.label" :value="isNormalItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="正常请假 :" prop="isApprovedLeave">
              <el-select class="select-v2-rao" v-model="formData.isApprovedLeave" placeholder="请您选择">
                <el-option v-for="isApprovedLeaveItem in ynOptions" :key="isApprovedLeaveItem.name"
                           :label="isApprovedLeaveItem.label" :value="isApprovedLeaveItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="timelineCheckStatusCode">
              <el-select class="select-v2-rao" v-model="formData.timelineCheckStatusCode" placeholder="请您选择">
                <el-option v-for="timelineCheckStatusCodeItem in timelineCheckStatusCodeOptions"
                           :key="timelineCheckStatusCodeItem.name"
                           :label="timelineCheckStatusCodeItem.label" :value="timelineCheckStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="考勤方式 :" prop="timelineCheckBytypeCode">
              <el-select class="select-v2-rao" v-model="formData.timelineCheckBytypeCode" placeholder="请您选择">
                <el-option v-for="timelineCheckBytypeCodeItem in timelineCheckBytypeCodeOptions"
                           :key="timelineCheckBytypeCodeItem.name"
                           :label="timelineCheckBytypeCodeItem.label" :value="timelineCheckBytypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="考勤异常类型 :" prop="timelineCheckExceptionCode">
              <el-select class="select-v2-rao" v-model="formData.timelineCheckExceptionCode" placeholder="请您选择">
                <el-option v-for="timelineCheckExceptionCodeItem in timelineCheckExceptionCodeOptions"
                           :key="timelineCheckExceptionCodeItem.name"
                           :label="timelineCheckExceptionCodeItem.label" :value="timelineCheckExceptionCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap ">
              <div class="p100">
                <div class="detail-title-v2 mr0">
                  学生信息
                </div>
                <div class="detail-item-v2 ml-30 ">
                  <div class="p50 mb-20" v-if="formData.studentName">
                    <div class="img flex row x-center">
                      <img :src="formData.studentHeadPicture" alt=""
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
              <div class="p100">
                <div class="detail-title-v2 mr0">
                  考勤信息
                </div>
                <div class="detail-item-v2">

                  <div class="p33">
                    <el-form-item label="考勤日期 :" prop="calendarDt">
                      <span v-if="formData.calendarDt"> {{formData.calendarDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p33">
                    <el-form-item label="到校时间 :" prop="calendarDt">
                      <span v-if="formData.schoolArrivalTime"> {{formData.schoolArrivalTime}}</span>
                    </el-form-item>
                  </div>
                  <div class="p33">
                    <el-form-item label="离校时间 :" prop="calendarDt">
                      <span v-if="formData.schoolDepartureTime"> {{formData.schoolDepartureTime}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="状态 :" prop="timelineCheckStatusCode">
                      <span v-if="formData.timelineCheckExceptionCode">{{formData.timelineCheckExceptionCode}}</span>
                    </el-form-item>
                  </div>

                </div>
              </div>


            </el-form>

          <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">-->
            <!--<div class="menu-quickly">-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<router-link :to="`/basedata/listStudentTimelineCheckDetail?timelineCheckId=`+-->
                                  <!--formData.timelineCheckId">-->
                    <!--<i class="iconfont icon-icon_liebiao"></i>每天考勤明细-->
                  <!--</router-link>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</el-col>-->
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
  import api from "./studenttimelinecheckUrl";
  import validation from "@/util/validate2";
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

        ynOptions: [{"label": "全部", "name": ""}], isNormal: null,
        isApprovedLeave: null,
        timelineCheckStatusCodeOptions: [{"label": "全部", "name": ""}], timelineCheckStatusCode: null,
        timelineCheckBytypeCodeOptions: [{"label": "全部", "name": ""}], timelineCheckBytypeCode: null,
        timelineCheckExceptionCodeOptions: [{"label": "全部", "name": ""}], timelineCheckExceptionCode: null,
        formData: {
          timelineCheckId: '',
          isNormal: "",
          isApprovedLeave: "",
          timelineCheckStatusCode: "",
          timelineCheckBytypeCode: "",
          timelineCheckExceptionCode: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          studentId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          studentName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          studentUserId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          schoolYear:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          schoolTerm:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          weekSchoolYear:
            [
              {validator: validation.number, trigger: "blur"},

            ],
          weekSchoolTerm:
            [
              {validator: validation.number, trigger: "blur"},

            ],
          calendarDt:
            [],
          isNormal:
            [
              {max: 2, message: "最多能输入2个字", trigger: "blur"},

            ],
          isApprovedLeave:
            [
              {max: 2, message: "最多能输入2个字", trigger: "blur"},

            ],
          timelineCheckStatusCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          timelineCheckBytypeCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          timelineCheckExceptionCode:
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
      commonApi.getCodeIntType("timelineCheckStatus").then(res => {
        let viewList = res.data.data || [];
        for (let timelineCheckStatusItem of viewList) {
          this.timelineCheckStatusCodeOptions.push({
            "label": timelineCheckStatusItem.codeDesc,
            "name": timelineCheckStatusItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("timelineCheckBytype").then(res => {
        let viewList = res.data.data || [];
        for (let timelineCheckBytypeItem of viewList) {
          this.timelineCheckBytypeCodeOptions.push({
            "label": timelineCheckBytypeItem.codeDesc,
            "name": timelineCheckBytypeItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("timelineCheckException").then(res => {
        let viewList = res.data.data || [];
        for (let timelineCheckExceptionItem of viewList) {
          this.timelineCheckExceptionCodeOptions.push({
            "label": timelineCheckExceptionItem.codeDesc,
            "name": timelineCheckExceptionItem.codeId
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
            console.log(res);
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



  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
