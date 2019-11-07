
                              
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师 :" prop="teacherName">
                      <el-input class="input-v2-rao" v-model="formData.teacherName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师 colName:teacher_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="证书号码 *  :" prop="teacherCertificateNum">
                      <el-input class="input-v2-rao" v-model="formData.teacherCertificateNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 证书号码 colName:teacher_certificate_num sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="资格种类 :" prop="teacherCertificateTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherCertificateTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherCertificateTypeCodeItem in teacherCertificateTypeCodeOptions"
                                   :key="teacherCertificateTypeCodeItem.name"
                                   :label="teacherCertificateTypeCodeItem.label" :value="teacherCertificateTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 资格种类 colName:teacher_certificate_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="任教学科 :" prop="subjectName">
                      <el-input class="input-v2-rao" v-model="formData.subjectName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 任教学科 colName:subject_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="认证时间 :" prop="identifyDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.identifyDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 认证时间 colName:identify_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="认证机构 :" prop="identifyByOrg">
                      <el-input class="input-v2-rao" v-model="formData.identifyByOrg"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 认证机构 colName:identify_by_org sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="证书号码 *  :" prop="teacherCertificateNum">
                      <el-input class="input-v2-rao" v-model="formData.teacherCertificateNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="资格种类 :" prop="teacherCertificateTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherCertificateTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherCertificateTypeCodeItem in teacherCertificateTypeCodeOptions"
                                   :key="teacherCertificateTypeCodeItem.name"
                                   :label="teacherCertificateTypeCodeItem.label" :value="teacherCertificateTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="任教学科 :" prop="subjectName">
                      <el-input class="input-v2-rao" v-model="formData.subjectName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="认证时间 :" prop="identifyDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.identifyDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="认证机构 :" prop="identifyByOrg">
                      <el-input class="input-v2-rao" v-model="formData.identifyByOrg"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="资格状态 :" prop="teacherCertificateStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherCertificateStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherCertificateStatusCodeItem in teacherCertificateStatusCodeOptions"
                                   :key="teacherCertificateStatusCodeItem.name"
                                   :label="teacherCertificateStatusCodeItem.label" :value="teacherCertificateStatusCodeItem.name">
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
                      {{formData.teacherName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherCertificateNum">
                          <el-form-item label="证书号码 :" prop="teacherCertificateNum">
                            <span v-if="formData.teacherCertificateNum">{{formData.teacherCertificateNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="资格种类 :" prop="teacherCertificateTypeCode">
                            <span v-if="formData.teacherCertificateTypeCodeStr"
                                  :style="{'color':formData.teacherCertificateTypeCodeStr.split(';')[1]}">{{formData.teacherCertificateTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.subjectName">
                          <el-form-item label="任教学科 :" prop="subjectName">
                            <span v-if="formData.subjectName">{{formData.subjectName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="认证时间 :" prop="identifyDt">
                            <span v-if="formData.identifyDt"> {{formData.identifyDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.identifyByOrg">
                          <el-form-item label="认证机构 :" prop="identifyByOrg">
                            <span v-if="formData.identifyByOrg">{{formData.identifyByOrg}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="资格状态 :" prop="teacherCertificateStatusCode">
                            <span v-if="formData.teacherCertificateStatusCodeStr"
                                  :style="{'color':formData.teacherCertificateStatusCodeStr.split(';')[1]}">{{formData.teacherCertificateStatusCodeStr.split(';')[0]}}</span>
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
  import api from "./schoolteachercertificateUrl";
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

        teacherCertificateTypeCodeOptions: [{"label": "全部", "name": ""}],
        teacherCertificateTypeCode : null,
        imagePathFileList :[],
        imagePathFileType:'',
        teacherCertificateStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherCertificateStatusCode : null,
        formData:{
              teacherCertificateId:'',
              teacherCertificateNum :"",
              teacherCertificateTypeCode :"",
              subjectName :"",
              imagePath :"",
              identifyDt :"",
              identifyByOrg :"",
              teacherCertificateStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              teacherName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherCertificateNum :
              [
                  {required: true, message: "请您输入证书号码", trigger: "blur"},
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              teacherCertificateTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              identifyDt :
              [

              ],
              identifyByOrg :
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
          commonApi.getCodeIntType("teacherCertificateType").then(res => {
            let viewList = res.data.data || [];
            for (let teacherCertificateTypeItem of viewList) {
              this.teacherCertificateTypeCodeOptions.push({
                "label": teacherCertificateTypeItem.codeDesc,
                "name": teacherCertificateTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherCertificateStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherCertificateStatusItem of viewList) {
              this.teacherCertificateStatusCodeOptions.push({
                "label": teacherCertificateStatusItem.codeDesc,
                "name": teacherCertificateStatusItem.codeId
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
