

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col v-show="false" :span="12">
                    <el-form-item label="宿舍id :" prop="dormitoryId">
                      <el-input disabled class="input-v2-rao" v-model="formData.dormitoryId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="宿舍编号 :" prop="dormitoryNum">
                      <el-input disabled class="input-v2-rao" v-model="formData.dormitoryNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="宿舍 :" prop="dormitoryName">
                      <el-input disabled class="input-v2-rao" v-model="formData.dormitoryName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="教师id :" prop="teacherId">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.teacherId"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="教师 :" prop="teacherName">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.teacherName"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="教师用户id :" prop="teacherUserId">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.teacherUserId"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->



                  <el-col :span="12">
                    <el-form-item label="管理职责 :" prop="dormitoryTeacherDutyCode">
                      <el-select class="select-v2-rao" v-model="formData.dormitoryTeacherDutyCode" placeholder="请您选择">
                        <el-option v-for="dormitoryTeacherDutyCodeItem in dormitoryTeacherDutyCodeOptions"
                                   :key="dormitoryTeacherDutyCodeItem.name"
                                   :label="dormitoryTeacherDutyCodeItem.label" :value="dormitoryTeacherDutyCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
            <el-col :span="8">
              <el-form-item label="教师 :" prop="classMasterTeacherName" class="w280">
                <role-dialog :url="'/user/teacherAd/page'" ref="teacher" :type="'teacher'" :params="{page:1,limit:10}"
                             @callback="jsCallback">选择
                </role-dialog>
              </el-form-item>
            </el-col>
                  <el-col :span="12">
                    <el-form-item label="宿舍老师状态:" prop="dormitoryTeacherStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.dormitoryTeacherStatusCode" placeholder="请您选择">
                        <el-option v-for="dormitoryTeacherStatusCodeItem in dormitoryTeacherStatusCodeOptions"
                                   :key="dormitoryTeacherStatusCodeItem.name"
                                   :label="dormitoryTeacherStatusCodeItem.label" :value="dormitoryTeacherStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话 :" prop="contactPhonenum">
                <el-input class="input-v2-rao" v-model="formData.contactPhonenum"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>
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
                    <el-form-item label="序号 :" prop="">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>

          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="12">
                    <el-form-item label="管理职责 :" prop="dormitoryTeacherDutyCode">
                      <el-select class="select-v2-rao" v-model="formData.dormitoryTeacherDutyCode" placeholder="请您选择">
                        <el-option v-for="dormitoryTeacherDutyCodeItem in dormitoryTeacherDutyCodeOptions"
                                   :key="dormitoryTeacherDutyCodeItem.name"
                                   :label="dormitoryTeacherDutyCodeItem.label" :value="dormitoryTeacherDutyCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="宿舍老师状态:" prop="dormitoryTeacherStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.dormitoryTeacherStatusCode" placeholder="请您选择">
                        <el-option v-for="dormitoryTeacherStatusCodeItem in dormitoryTeacherStatusCodeOptions"
                                   :key="dormitoryTeacherStatusCodeItem.name"
                                   :label="dormitoryTeacherStatusCodeItem.label" :value="dormitoryTeacherStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="联系电话 :" prop="contactPhonenum">
                      <el-input class="input-v2-rao" v-model="formData.contactPhonenum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
            <el-col :span="8">
              <el-form-item label="教师 :" prop="classMasterTeacherName" class="w280">
                <role-dialog :url="'/user/teacherAd/page'" ref="teacher" :type="'teacher'" :params="{page:1,limit:10}"
                             @callback="jsCallback">选择
                </role-dialog>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开始时间 :" prop="effectiveDt">
                <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm"
                                :picker-options="pickTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="截止时间 :" prop="expiryDt">
                <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm"
                                :picker-options="pickTime"></el-date-picker>
              </el-form-item>
            </el-col>
                  <el-col :span="12">
                    <el-form-item label="序号 :" prop="">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
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
                      {{formData.dormitoryNum}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.dormitoryNum">
                          <el-form-item label="宿舍编号 :" prop="dormitoryNum">
                            <span v-if="formData.dormitoryNum">{{formData.dormitoryNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.dormitoryName">
                          <el-form-item label="宿舍 :" prop="dormitoryName">
                            <span v-if="formData.dormitoryName">{{formData.dormitoryName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="管理职责 :" prop="dormitoryTeacherDutyCode">
                            <span v-if="formData.dormitoryTeacherDutyCodeStr"
                                  :style="{'color':formData.dormitoryTeacherDutyCodeStr.split(';')[1]}">{{formData.dormitoryTeacherDutyCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="宿舍老师状态 :" prop="dormitoryTeacherStatusCode">
                            <span v-if="formData.dormitoryTeacherStatusCodeStr"
                                  :style="{'color':formData.dormitoryTeacherStatusCodeStr.split(';')[1]}">{{formData.dormitoryTeacherStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="开始时间 :" prop="effectiveDt">
                            <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止时间 :" prop="expiryDt">
                            <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.contactPhonenum">
                          <el-form-item label="联系电话 :" prop="contactPhonenum">
                            <span v-if="formData.contactPhonenum">{{formData.contactPhonenum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.sequnceNum">
                          <el-form-item label="序号 :" prop="sequnceNum">
                            <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
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
  import api from "./basicschooldormitoryteacherUrl";
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

        dormitoryTeacherDutyCodeOptions: [{"label": "全部", "name": ""}],
        dormitoryTeacherDutyCode : null,
        dormitoryTeacherStatusCodeOptions: [{"label": "全部", "name": ""}],
        dormitoryTeacherStatusCode : null,
        formData:{
              dormitoryTeacherId:'',
              dormitoryTeacherDutyCode :"",
              dormitoryTeacherStatusCode :"",
              effectiveDt :"",
              expiryDt :"",
              contactPhonenum :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              dormitoryId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              dormitoryNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              dormitoryName :
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
              dormitoryTeacherDutyCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              dormitoryTeacherStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              effectiveDt :
              [

              ],
              expiryDt :
              [

              ],
              contactPhonenum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},
                  {validator: validation.mobileNum, trigger: "blur"},

              ],
              sequnceNum :
              [
                  {validator: validation.number, trigger: "blur"},

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
      this.formData.dormitoryId=this.$route.params.id
      this.formData.dormitoryNum=this.$route.query.dormitoryNum
      this.formData.dormitoryName=this.$route.query.dormitoryName
      // // console.log(this.$route)
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("dormitoryTeacherDuty").then(res => {
            let viewList = res.data.data || [];
            for (let dormitoryTeacherDutyItem of viewList) {
              this.dormitoryTeacherDutyCodeOptions.push({
                "label": dormitoryTeacherDutyItem.codeDesc,
                "name": dormitoryTeacherDutyItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("dormitoryTeacherStatus").then(res => {
            let viewList = res.data.data || [];
            for (let dormitoryTeacherStatusItem of viewList) {
              this.dormitoryTeacherStatusCodeOptions.push({
                "label": dormitoryTeacherStatusItem.codeDesc,
                "name": dormitoryTeacherStatusItem.codeId
              });
            }
          });
    },
    methods: {
      jsCallback(event) {
        // console.log(event)
        this.formData.teacherId = event.teacherId
        this.formData.teacherName = event.userName;
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
