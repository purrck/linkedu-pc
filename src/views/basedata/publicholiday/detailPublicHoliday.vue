<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="国家 :" prop="countryId">
              <el-input class="input-v2-rao" v-model="formData.countryId"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="假期名称 :" prop="holidayName">
              <el-input class="input-v2-rao" v-model="formData.holidayName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="假期描述 :" prop="holidayDesc">
              <el-input class="input-v2-rao" v-model="formData.holidayDesc"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开始日期 :" prop="holidayStartDt">
              <el-date-picker class="date-v2-rao" v-model="formData.holidayStartDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="截止日期 :" prop="holidayEndDt">
              <el-date-picker class="date-v2-rao" v-model="formData.holidayEndDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否放假 :" prop="isOnHoliday">
              <el-select class="select-v2-rao" v-model="formData.isOnHoliday" placeholder="请您选择">
                <el-option v-for="isOnHolidayItem in ynOptions" :key="isOnHolidayItem.name"
                           :label="isOnHolidayItem.label" :value="isOnHolidayItem.name">
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
            <el-form-item label="国家 :" prop="countryId">
              <el-input class="input-v2-rao" v-model="formData.countryId"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="假期名称 :" prop="holidayName">
              <el-input class="input-v2-rao" v-model="formData.holidayName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="假期描述 :" prop="holidayDesc">
              <el-input class="input-v2-rao" v-model="formData.holidayDesc"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开始日期 :" prop="holidayStartDt">
              <el-date-picker class="date-v2-rao" v-model="formData.holidayStartDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="截止日期 :" prop="holidayEndDt">
              <el-date-picker class="date-v2-rao" v-model="formData.holidayEndDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否放假 :" prop="isOnHoliday">
              <el-select class="select-v2-rao" v-model="formData.isOnHoliday" placeholder="请您选择">
                <el-option v-for="isOnHolidayItem in ynOptions" :key="isOnHolidayItem.name"
                           :label="isOnHolidayItem.label" :value="isOnHolidayItem.name">
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
                  {{formData.holidayName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.countryId">
                    <el-form-item label="国家 :" prop="countryId">
                      <span v-if="formData.countryId">{{formData.countryId}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.holidayName">
                    <el-form-item label="假期名称 :" prop="holidayName">
                      <span v-if="formData.holidayName">{{formData.holidayName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.holidayDesc">
                    <el-form-item label="假期描述 :" prop="holidayDesc">
                      <span v-if="formData.holidayDesc">{{formData.holidayDesc}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="开始日期 :" prop="holidayStartDt">
                      <span v-if="formData.holidayStartDt"> {{formData.holidayStartDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="截止日期 :" prop="holidayEndDt">
                      <span v-if="formData.holidayEndDt"> {{formData.holidayEndDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="是否放假 :" prop="isOnHoliday">
                      <el-switch v-model="formData.isOnHoliday == 'Y'" disabled></el-switch>
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
  import api from "./publicholidayUrl";
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

        ynOptions: [{"label": "全部", "name": ""}], isOnHoliday: null,
        formData: {
          holidayId: '',
          countryId: "",
          holidayName: "",
          holidayDesc: "",
          holidayStartDt: "",
          holidayEndDt: "",
          isOnHoliday: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          countryId:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          holidayName:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          holidayDesc:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          holidayStartDt:
            [],
          holidayEndDt:
            [],
          isOnHoliday:
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
