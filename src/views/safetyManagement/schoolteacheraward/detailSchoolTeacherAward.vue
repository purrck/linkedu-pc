
                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="奖励 :" prop="awardTitle">
                      <el-input class="input-v2-rao" v-model="formData.awardTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 奖励 colName:award_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="奖励说明 :" prop="awardContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.awardContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 奖励说明 colName:award_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="奖励级别 :" prop="teacherAwardLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherAwardLevelCode" placeholder="请您选择">
                        <el-option v-for="teacherAwardLevelCodeItem in teacherAwardLevelCodeOptions"
                                   :key="teacherAwardLevelCodeItem.name"
                                   :label="teacherAwardLevelCodeItem.label" :value="teacherAwardLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 奖励级别 colName:teacher_award_level_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="奖励类型 :" prop="teacherAwardTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherAwardTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherAwardTypeCodeItem in teacherAwardTypeCodeOptions"
                                   :key="teacherAwardTypeCodeItem.name"
                                   :label="teacherAwardTypeCodeItem.label" :value="teacherAwardTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 奖励类型 colName:teacher_award_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="奖励状态 :" prop="teacherAwardStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherAwardStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherAwardStatusCodeItem in teacherAwardStatusCodeOptions"
                                   :key="teacherAwardStatusCodeItem.name"
                                   :label="teacherAwardStatusCodeItem.label" :value="teacherAwardStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 奖励状态 colName:teacher_award_status_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="获奖时间 :" prop="awardDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.awardDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 获奖时间 colName:award_dt sqlType:TIMESTAMP notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="奖励 :" prop="awardTitle">
                      <el-input class="input-v2-rao" v-model="formData.awardTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="奖励说明 :" prop="awardContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.awardContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="奖励级别 :" prop="teacherAwardLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherAwardLevelCode" placeholder="请您选择">
                        <el-option v-for="teacherAwardLevelCodeItem in teacherAwardLevelCodeOptions"
                                   :key="teacherAwardLevelCodeItem.name"
                                   :label="teacherAwardLevelCodeItem.label" :value="teacherAwardLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="奖励类型 :" prop="teacherAwardTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherAwardTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherAwardTypeCodeItem in teacherAwardTypeCodeOptions"
                                   :key="teacherAwardTypeCodeItem.name"
                                   :label="teacherAwardTypeCodeItem.label" :value="teacherAwardTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="奖励状态 :" prop="teacherAwardStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherAwardStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherAwardStatusCodeItem in teacherAwardStatusCodeOptions"
                                   :key="teacherAwardStatusCodeItem.name"
                                   :label="teacherAwardStatusCodeItem.label" :value="teacherAwardStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="获奖时间 :" prop="awardDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.awardDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
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
                      {{formData.awardTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.awardTitle">
                          <el-form-item label="奖励 :" prop="awardTitle">
                            <span v-if="formData.awardTitle">{{formData.awardTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.awardContent">
                          <el-form-item label="奖励说明 :" prop="awardContent">
                            <span v-if="formData.awardContent" v-html="formData.awardContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="奖励级别 :" prop="teacherAwardLevelCode">
                            <span v-if="formData.teacherAwardLevelCodeStr"
                                  :style="{'color':formData.teacherAwardLevelCodeStr.split(';')[1]}">{{formData.teacherAwardLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="奖励类型 :" prop="teacherAwardTypeCode">
                            <span v-if="formData.teacherAwardTypeCodeStr"
                                  :style="{'color':formData.teacherAwardTypeCodeStr.split(';')[1]}">{{formData.teacherAwardTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="奖励状态 :" prop="teacherAwardStatusCode">
                            <span v-if="formData.teacherAwardStatusCodeStr"
                                  :style="{'color':formData.teacherAwardStatusCodeStr.split(';')[1]}">{{formData.teacherAwardStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="获奖时间 :" prop="awardDt">
                            <span v-if="formData.awardDt"> {{formData.awardDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
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
  import api from "./schoolteacherawardUrl";
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

        teacherAwardLevelCodeOptions: [{"label": "全部", "name": ""}],
        teacherAwardLevelCode : null,
        teacherAwardTypeCodeOptions: [{"label": "全部", "name": ""}],
        teacherAwardTypeCode : null,
        teacherAwardStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherAwardStatusCode : null,
        formData:{
              teacherAwardId:'',
              awardTitle :"",
              awardContent :"",
              teacherAwardLevelCode :"",
              teacherAwardTypeCode :"",
              teacherAwardStatusCode :"",
              awardDt :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              awardTitle :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              awardContent :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              teacherAwardLevelCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherAwardTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherAwardStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              awardDt :
              [

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
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("teacherAwardLevel").then(res => {
            let viewList = res.data.data || [];
            for (let teacherAwardLevelItem of viewList) {
              this.teacherAwardLevelCodeOptions.push({
                "label": teacherAwardLevelItem.codeDesc,
                "name": teacherAwardLevelItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherAwardType").then(res => {
            let viewList = res.data.data || [];
            for (let teacherAwardTypeItem of viewList) {
              this.teacherAwardTypeCodeOptions.push({
                "label": teacherAwardTypeItem.codeDesc,
                "name": teacherAwardTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherAwardStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherAwardStatusItem of viewList) {
              this.teacherAwardStatusCodeOptions.push({
                "label": teacherAwardStatusItem.codeDesc,
                "name": teacherAwardStatusItem.codeId
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
