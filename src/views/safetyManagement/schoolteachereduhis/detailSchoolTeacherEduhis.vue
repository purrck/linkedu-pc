
                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="学历证 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 学历证 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学历级别 *  :" prop="educationLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.educationLevelCode" placeholder="请您选择">
                        <el-option v-for="educationLevelCodeItem in educationLevelCodeOptions"
                                   :key="educationLevelCodeItem.name"
                                   :label="educationLevelCodeItem.label" :value="educationLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 学历级别 colName:education_level_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学历证号 *  :" prop="educationCertificateNum">
                      <el-input class="input-v2-rao" v-model="formData.educationCertificateNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学历证号 colName:education_certificate_num sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="毕业学校 *  :" prop="educationSchoolName">
                      <el-input class="input-v2-rao" v-model="formData.educationSchoolName"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 毕业学校 colName:education_school_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="开始日期 *  :" prop="eduBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.eduBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 开始日期 colName:edu_begin_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="截止日期 *  :" prop="eduEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.eduEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 截止日期 colName:edu_end_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学历状态 :" prop="teacherEduhisStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherEduhisStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherEduhisStatusCodeItem in teacherEduhisStatusCodeOptions"
                                   :key="teacherEduhisStatusCodeItem.name"
                                   :label="teacherEduhisStatusCodeItem.label" :value="teacherEduhisStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 学历状态 colName:teacher_eduhis_status_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 序号 colName:sequnce_num sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="学历证 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学历级别 *  :" prop="educationLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.educationLevelCode" placeholder="请您选择">
                        <el-option v-for="educationLevelCodeItem in educationLevelCodeOptions"
                                   :key="educationLevelCodeItem.name"
                                   :label="educationLevelCodeItem.label" :value="educationLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学历证号 *  :" prop="educationCertificateNum">
                      <el-input class="input-v2-rao" v-model="formData.educationCertificateNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="毕业学校 *  :" prop="educationSchoolName">
                      <el-input class="input-v2-rao" v-model="formData.educationSchoolName"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="开始日期 *  :" prop="eduBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.eduBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="截止日期 *  :" prop="eduEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.eduEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学历状态 :" prop="teacherEduhisStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherEduhisStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherEduhisStatusCodeItem in teacherEduhisStatusCodeOptions"
                                   :key="teacherEduhisStatusCodeItem.name"
                                   :label="teacherEduhisStatusCodeItem.label" :value="teacherEduhisStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="32"></el-input>
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
                      {{formData.imagePath}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="学历证 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="学历级别 :" prop="educationLevelCode">
                            <span v-if="formData.educationLevelCodeStr"
                                  :style="{'color':formData.educationLevelCodeStr.split(';')[1]}">{{formData.educationLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.educationCertificateNum">
                          <el-form-item label="学历证号 :" prop="educationCertificateNum">
                            <span v-if="formData.educationCertificateNum">{{formData.educationCertificateNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.educationSchoolName">
                          <el-form-item label="毕业学校 :" prop="educationSchoolName">
                            <span v-if="formData.educationSchoolName">{{formData.educationSchoolName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="开始日期 :" prop="eduBeginDt">
                            <span v-if="formData.eduBeginDt"> {{formData.eduBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止日期 :" prop="eduEndDt">
                            <span v-if="formData.eduEndDt"> {{formData.eduEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="学历状态 :" prop="teacherEduhisStatusCode">
                            <span v-if="formData.teacherEduhisStatusCodeStr"
                                  :style="{'color':formData.teacherEduhisStatusCodeStr.split(';')[1]}">{{formData.teacherEduhisStatusCodeStr.split(';')[0]}}</span>
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
  import api from "./schoolteachereduhisUrl";
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

        imagePathFileList :[],
        imagePathFileType:'',
        educationLevelCodeOptions: [{"label": "全部", "name": ""}],
        educationLevelCode : null,
        teacherEduhisStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherEduhisStatusCode : null,
        formData:{
              teacherEduhisId:'',
              imagePath :"",
              educationLevelCode :"",
              educationCertificateNum :"",
              educationSchoolName :"",
              eduBeginDt :"",
              eduEndDt :"",
              teacherEduhisStatusCode :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              imagePath :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              educationLevelCode :
              [
                  {required: true, message: "请您输入学历级别", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              educationCertificateNum :
              [
                  {required: true, message: "请您输入学历证号", trigger: "blur"},
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              educationSchoolName :
              [
                  {required: true, message: "请您输入毕业学校", trigger: "blur"},
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              eduBeginDt :
              [
                  {required: true, message: "请您输入开始日期", trigger: "blur"},

              ],
              eduEndDt :
              [
                  {required: true, message: "请您输入截止日期", trigger: "blur"},

              ],
              teacherEduhisStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              sequnceNum :
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
          commonApi.getCodeIntType("educationLevel").then(res => {
            let viewList = res.data.data || [];
            for (let educationLevelItem of viewList) {
              this.educationLevelCodeOptions.push({
                "label": educationLevelItem.codeDesc,
                "name": educationLevelItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherEduhisStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherEduhisStatusItem of viewList) {
              this.teacherEduhisStatusCodeOptions.push({
                "label": teacherEduhisStatusItem.codeDesc,
                "name": teacherEduhisStatusItem.codeId
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
