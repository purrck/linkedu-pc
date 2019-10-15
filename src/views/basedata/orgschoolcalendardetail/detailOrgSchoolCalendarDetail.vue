<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="校历 :" prop="calendarId">
              <el-input class="input-v2-rao" v-model="formData.calendarId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学校机构 :" prop="schoolOrgId">
              <el-input class="input-v2-rao" v-model="formData.schoolOrgId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学校机构 :" prop="schoolOrgName">
              <el-input class="input-v2-rao" v-model="formData.schoolOrgName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学段 :" prop="segmentId">
              <el-input class="input-v2-rao" v-model="formData.segmentId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学段 :" prop="segmentName">
              <el-input class="input-v2-rao" v-model="formData.segmentName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="年级 :" prop="gradeId">
              <el-input class="input-v2-rao" v-model="formData.gradeId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="年级 :" prop="gradeName">
              <el-input class="input-v2-rao" v-model="formData.gradeName"
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
            <el-form-item label="学期周次 :" prop="weekSchoolTerm">
              <el-input class="input-v2-rao" v-model="formData.weekSchoolTerm"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="安排类型 :" prop="calendarTypeCode">
              <el-select class="select-v2-rao" v-model="formData.calendarTypeCode" placeholder="请您选择">
                <el-option v-for="calendarTypeCodeItem in calendarTypeCodeOptions"
                           :key="calendarTypeCodeItem.name"
                           :label="calendarTypeCodeItem.label" :value="calendarTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日期(年月日) :" prop="calendarDt">
              <el-date-picker class="date-v2-rao" v-model="formData.calendarDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="过期 :" prop="isOverdue">
              <el-select class="select-v2-rao" v-model="formData.isOverdue" placeholder="请您选择">
                <el-option v-for="isOverdueItem in ynOptions" :key="isOverdueItem.name"
                           :label="isOverdueItem.label" :value="isOverdueItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">

          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="安排类型 :" prop="calendarTypeCode">
              <el-select class="select-v2-rao" v-model="formData.calendarTypeCode" placeholder="请您选择">
                <el-option v-for="calendarTypeCodeItem in calendarTypeCodeOptions"
                           :key="calendarTypeCodeItem.name"
                           :label="calendarTypeCodeItem.label" :value="calendarTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="过期 :" prop="isOverdue">
              <el-select class="select-v2-rao" v-model="formData.isOverdue" placeholder="请您选择">
                <el-option v-for="isOverdueItem in ynOptions" :key="isOverdueItem.name"
                           :label="isOverdueItem.label" :value="isOverdueItem.name">
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
                  {{formData.calendarTypeCode}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.segmentName">
                    <el-form-item label="学段 :" prop="segmentName">
                      <span v-if="formData.segmentName">{{formData.segmentName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.gradeName">
                    <el-form-item label="年级 :" prop="gradeName">
                      <span v-if="formData.gradeName">{{formData.gradeName}}</span>
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
                    <el-form-item label="安排类型 :" prop="calendarTypeCode">
                            <span v-if="formData.calendarTypeCodeStr"
                                  :style="{'color':formData.calendarTypeCodeStr.split(';')[1]}">{{formData.calendarTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="日期(年月日) :" prop="calendarDt">
                      <span v-if="formData.calendarDt"> {{formData.calendarDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="过期 :" prop="isOverdue">
                      <el-switch v-model="formData.isOverdue == 'Y'" disabled></el-switch>
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
  import api from "./orgschoolcalendardetailUrl";
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

        calendarTypeCodeOptions: [{"label": "全部", "name": ""}], calendarTypeCode: null,
        ynOptions: [{"label": "全部", "name": ""}], isOverdue: null,
        formData: {
          calendarDetailId: '',
          calendarTypeCode: "",
          isOverdue: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          calendarId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          schoolOrgId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          schoolOrgName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          segmentId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          segmentName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          gradeId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          gradeName:
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
          calendarTypeCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          calendarDt:
            [],
          isOverdue:
            [
              {max: 2, message: "最多能输入2个字", trigger: "blur"},

            ],
          sequnceNum:
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

    created() {
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("calendarType").then(res => {
        let viewList = res.data.data || [];
        for (let calendarTypeItem of viewList) {
          this.calendarTypeCodeOptions.push({
            "label": calendarTypeItem.codeDesc,
            "name": calendarTypeItem.codeId
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


  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
