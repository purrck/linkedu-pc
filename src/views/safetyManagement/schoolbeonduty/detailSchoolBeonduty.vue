
                              
<template>
  <div>
    <div class="edit-box">

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="假期期间 *  :" prop="isHoliday">
                      <el-select class="select-v2-rao" v-model="formData.isHoliday" placeholder="请您选择">
                        <el-option v-for="isHolidayItem in ynOptions" :key="isHolidayItem.name"
                                   :label="isHolidayItem.label" :value="isHolidayItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="值班教师数量 :" prop="teacherNum">
                      <el-input class="input-v2-rao" v-model="formData.teacherNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="值班评分 :" prop="markScore">
                      <el-input class="input-v2-rao" v-model="formData.markScore"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="值班评价 :" prop="markContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.markContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="取消 :" prop="isCancel">
                      <el-select class="select-v2-rao" v-model="formData.isCancel" placeholder="请您选择">
                        <el-option v-for="isCancelItem in ynOptions" :key="isCancelItem.name"
                                   :label="isCancelItem.label" :value="isCancelItem.name">
                        </el-option>
                      </el-select>
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
                      {{formData.weekSchoolYear}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.weekSchoolYear">
                          <el-form-item label="学年周次 :" prop="weekSchoolYear">
                            <span v-if="formData.weekSchoolYear">{{formData.weekSchoolYear}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.weekSchoolTerm">
                          <el-form-item label="学期周次 :" prop="weekSchoolTerm">
                            <span v-if="formData.weekSchoolTerm">{{formData.weekSchoolTerm}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="开始日期 :" prop="calendarBeginDt">
                            <span v-if="formData.calendarBeginDt"> {{formData.calendarBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止日期 :" prop="calendarEndDt">
                            <span v-if="formData.calendarEndDt"> {{formData.calendarEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.schoolYear">
                          <el-form-item label="学年 :" prop="schoolYear">
                            <span v-if="formData.schoolYear">{{formData.schoolYear}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.schoolTerm">
                          <el-form-item label="学期 :" prop="schoolTerm">
                            <span v-if="formData.schoolTerm">{{formData.schoolTerm}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="假期期间 :" prop="isHoliday">
                            <el-switch v-model="formData.isHoliday == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.teacherNum">
                          <el-form-item label="值班教师数量 :" prop="teacherNum">
                            <span v-if="formData.teacherNum">{{formData.teacherNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.markScore">
                          <el-form-item label="值班评分 :" prop="markScore">
                            <span v-if="formData.markScore">{{formData.markScore}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.markContent">
                          <el-form-item label="值班评价 :" prop="markContent">
                            <span v-if="formData.markContent" v-html="formData.markContent"></span>
                          </el-form-item>
                        </div>


                        <div class="p50">
                          <el-form-item label="取消 :" prop="isCancel">
                            <el-switch v-model="formData.isCancel == 'Y'" disabled></el-switch>
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
                    <router-link :to="`/basedata/listSchoolBeondutyTeacher?beondutyId=`+
                                  formData.beondutyId">
                      <i class="iconfont icon-icon_liebiao"></i>值周值日教师
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listSchoolBeondutyCheck?beondutyId=`+
                                  formData.beondutyId">
                      <i class="iconfont icon-icon_liebiao"></i>值周值日教师记录
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
  import api from "./schoolbeondutyUrl";
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

        ynOptions :[{"label": "全部", "name": ""}],
        isHoliday : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isCancel : null,
        formData:{
              beondutyId:'',
              isHoliday :"",
              teacherNum :"",
              markScore :"",
              markContent :"",
              isCancel :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
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
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
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
