
                                
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="处分名称 *  :" prop="punishmentTitle">
                      <el-input class="input-v2-rao" v-model="formData.punishmentTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 处分名称 colName:punishment_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="处分类型 *  :" prop="teacherPunishmentTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPunishmentTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherPunishmentTypeCodeItem in teacherPunishmentTypeCodeOptions"
                                   :key="teacherPunishmentTypeCodeItem.name"
                                   :label="teacherPunishmentTypeCodeItem.label" :value="teacherPunishmentTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 处分类型 colName:teacher_punishment_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="处分级别 *  :" prop="teacherPunishmentLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPunishmentLevelCode" placeholder="请您选择">
                        <el-option v-for="teacherPunishmentLevelCodeItem in teacherPunishmentLevelCodeOptions"
                                   :key="teacherPunishmentLevelCodeItem.name"
                                   :label="teacherPunishmentLevelCodeItem.label" :value="teacherPunishmentLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 处分级别 colName:teacher_punishment_level_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="处分原因 *  :" prop="punishmentContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.punishmentContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 处分原因 colName:punishment_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="处分日期 :" prop="punishmentDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.punishmentDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 处分日期 colName:punishment_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="处分文号 :" prop="punishmentFileNum">
                      <el-input class="input-v2-rao" v-model="formData.punishmentFileNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 处分文号 colName:punishment_file_num sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="处分名称 *  :" prop="punishmentTitle">
                      <el-input class="input-v2-rao" v-model="formData.punishmentTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处分类型 *  :" prop="teacherPunishmentTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPunishmentTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherPunishmentTypeCodeItem in teacherPunishmentTypeCodeOptions"
                                   :key="teacherPunishmentTypeCodeItem.name"
                                   :label="teacherPunishmentTypeCodeItem.label" :value="teacherPunishmentTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处分级别 *  :" prop="teacherPunishmentLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPunishmentLevelCode" placeholder="请您选择">
                        <el-option v-for="teacherPunishmentLevelCodeItem in teacherPunishmentLevelCodeOptions"
                                   :key="teacherPunishmentLevelCodeItem.name"
                                   :label="teacherPunishmentLevelCodeItem.label" :value="teacherPunishmentLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处分原因 *  :" prop="punishmentContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.punishmentContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="处分日期 :" prop="punishmentDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.punishmentDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处分文号 :" prop="punishmentFileNum">
                      <el-input class="input-v2-rao" v-model="formData.punishmentFileNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处分撤消日期 :" prop="punishmentCancleDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.punishmentCancleDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处分撤消文号 :" prop="punishmentCancleFileNum">
                      <el-input class="input-v2-rao" v-model="formData.punishmentCancleFileNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="状态 :" prop="teacherPunishmentStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPunishmentStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherPunishmentStatusCodeItem in teacherPunishmentStatusCodeOptions"
                                   :key="teacherPunishmentStatusCodeItem.name"
                                   :label="teacherPunishmentStatusCodeItem.label" :value="teacherPunishmentStatusCodeItem.name">
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
                      {{formData.punishmentTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.punishmentTitle">
                          <el-form-item label="处分名称 :" prop="punishmentTitle">
                            <span v-if="formData.punishmentTitle">{{formData.punishmentTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="处分类型 :" prop="teacherPunishmentTypeCode">
                            <span v-if="formData.teacherPunishmentTypeCodeStr"
                                  :style="{'color':formData.teacherPunishmentTypeCodeStr.split(';')[1]}">{{formData.teacherPunishmentTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="处分级别 :" prop="teacherPunishmentLevelCode">
                            <span v-if="formData.teacherPunishmentLevelCodeStr"
                                  :style="{'color':formData.teacherPunishmentLevelCodeStr.split(';')[1]}">{{formData.teacherPunishmentLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.punishmentContent">
                          <el-form-item label="处分原因 :" prop="punishmentContent">
                            <span v-if="formData.punishmentContent" v-html="formData.punishmentContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="处分日期 :" prop="punishmentDt">
                            <span v-if="formData.punishmentDt"> {{formData.punishmentDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.punishmentFileNum">
                          <el-form-item label="处分文号 :" prop="punishmentFileNum">
                            <span v-if="formData.punishmentFileNum">{{formData.punishmentFileNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="处分撤消日期 :" prop="punishmentCancleDt">
                            <span v-if="formData.punishmentCancleDt"> {{formData.punishmentCancleDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.punishmentCancleFileNum">
                          <el-form-item label="处分撤消文号 :" prop="punishmentCancleFileNum">
                            <span v-if="formData.punishmentCancleFileNum">{{formData.punishmentCancleFileNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="状态 :" prop="teacherPunishmentStatusCode">
                            <span v-if="formData.teacherPunishmentStatusCodeStr"
                                  :style="{'color':formData.teacherPunishmentStatusCodeStr.split(';')[1]}">{{formData.teacherPunishmentStatusCodeStr.split(';')[0]}}</span>
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
  import api from "./schoolteacherpunishmentUrl";
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

        teacherPunishmentTypeCodeOptions: [{"label": "全部", "name": ""}],
        teacherPunishmentTypeCode : null,
        teacherPunishmentLevelCodeOptions: [{"label": "全部", "name": ""}],
        teacherPunishmentLevelCode : null,
        teacherPunishmentStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherPunishmentStatusCode : null,
        formData:{
              teacherPunishmentId:'',
              punishmentTitle :"",
              teacherPunishmentTypeCode :"",
              teacherPunishmentLevelCode :"",
              punishmentContent :"",
              punishmentDt :"",
              punishmentFileNum :"",
              punishmentCancleDt :"",
              punishmentCancleFileNum :"",
              teacherPunishmentStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              punishmentTitle :
              [
                  {required: true, message: "请您输入处分名称", trigger: "blur"},
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              teacherPunishmentTypeCode :
              [
                  {required: true, message: "请您输入处分类型", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherPunishmentLevelCode :
              [
                  {required: true, message: "请您输入处分级别", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              punishmentContent :
              [
                  {required: true, message: "请您输入处分原因", trigger: "blur"},
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              punishmentDt :
              [

              ],
              punishmentFileNum :
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
   // directives: {preview},
    created() {
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("teacherPunishmentType").then(res => {
            let viewList = res.data.data || [];
            for (let teacherPunishmentTypeItem of viewList) {
              this.teacherPunishmentTypeCodeOptions.push({
                "label": teacherPunishmentTypeItem.codeDesc,
                "name": teacherPunishmentTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherPunishmentLevel").then(res => {
            let viewList = res.data.data || [];
            for (let teacherPunishmentLevelItem of viewList) {
              this.teacherPunishmentLevelCodeOptions.push({
                "label": teacherPunishmentLevelItem.codeDesc,
                "name": teacherPunishmentLevelItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherPunishmentStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherPunishmentStatusItem of viewList) {
              this.teacherPunishmentStatusCodeOptions.push({
                "label": teacherPunishmentStatusItem.codeDesc,
                "name": teacherPunishmentStatusItem.codeId
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
