
                              
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师实践 *  :" prop="practiceTitle">
                      <el-input class="input-v2-rao" v-model="formData.practiceTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师实践 colName:practice_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="实践内容 :" prop="practiceContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.practiceContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 实践内容 colName:practice_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="附件 :" prop="filePath">
                      <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
                    </el-form-item>
                  </el-col>
<!-- 附件 colName:file_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="实践开始时间 *  :" prop="practiceBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.practiceBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 实践开始时间 colName:practice_begin_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="实践结束时间 :" prop="practiceEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.practiceEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 实践结束时间 colName:practice_end_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="实践类型 :" prop="teacherPracticeTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPracticeTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherPracticeTypeCodeItem in teacherPracticeTypeCodeOptions"
                                   :key="teacherPracticeTypeCodeItem.name"
                                   :label="teacherPracticeTypeCodeItem.label" :value="teacherPracticeTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 实践类型 colName:teacher_practice_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="实践状态 :" prop="teacherPracticeStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPracticeStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherPracticeStatusCodeItem in teacherPracticeStatusCodeOptions"
                                   :key="teacherPracticeStatusCodeItem.name"
                                   :label="teacherPracticeStatusCodeItem.label" :value="teacherPracticeStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 实践状态 colName:teacher_practice_status_code sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师实践 *  :" prop="practiceTitle">
                      <el-input class="input-v2-rao" v-model="formData.practiceTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="实践内容 :" prop="practiceContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.practiceContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="附件 :" prop="filePath">
                      <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="实践开始时间 *  :" prop="practiceBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.practiceBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="实践结束时间 :" prop="practiceEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.practiceEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="实践类型 :" prop="teacherPracticeTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPracticeTypeCode" placeholder="请您选择">
                        <el-option v-for="teacherPracticeTypeCodeItem in teacherPracticeTypeCodeOptions"
                                   :key="teacherPracticeTypeCodeItem.name"
                                   :label="teacherPracticeTypeCodeItem.label" :value="teacherPracticeTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="实践状态 :" prop="teacherPracticeStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPracticeStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherPracticeStatusCodeItem in teacherPracticeStatusCodeOptions"
                                   :key="teacherPracticeStatusCodeItem.name"
                                   :label="teacherPracticeStatusCodeItem.label" :value="teacherPracticeStatusCodeItem.name">
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
                      {{formData.practiceTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.practiceTitle">
                          <el-form-item label="教师实践 :" prop="practiceTitle">
                            <span v-if="formData.practiceTitle">{{formData.practiceTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.practiceContent">
                          <el-form-item label="实践内容 :" prop="practiceContent">
                            <span v-if="formData.practiceContent" v-html="formData.practiceContent"></span>
                          </el-form-item>
                        </div>


                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.filePath">
                          <el-form-item label="附件 :" prop="filePath">
                            <i class="iconfont icon-xls"
                               v-if="filePathFileType=='xls'||filePathFileType=='xlsx'"></i>
                            <i class="iconfont icon-doc"
                               v-if="filePathFileType=='doc'||filePathFileType=='docx'"></i>
                            <i class="iconfont icon-ppt"
                               v-if="filePathFileType=='ppt'||filePathFileType=='pptx'"></i>
                            <i class="iconfont icon-txt"
                               v-if="filePathFileType=='pdf'||filePathFileType=='png'||filePathFileType=='jpg'||filePathFileType=='gif'||filePathFileType=='jpeg'"></i>
                            <i class="iconfont icon-avi"
                               v-if="filePathFileType=='mp4'||filePathFileType=='avi'||filePathFileType=='rmvb'||filePathFileType=='rm'||filePathFileType=='mov'"></i>
                            <i class="iconfont icon-mp3" v-if="filePathFileType=='mp3'"></i>
                            {{formData.filePath}}
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="实践开始时间 :" prop="practiceBeginDt">
                            <span v-if="formData.practiceBeginDt"> {{formData.practiceBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="实践结束时间 :" prop="practiceEndDt">
                            <span v-if="formData.practiceEndDt"> {{formData.practiceEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="实践类型 :" prop="teacherPracticeTypeCode">
                            <span v-if="formData.teacherPracticeTypeCodeStr"
                                  :style="{'color':formData.teacherPracticeTypeCodeStr.split(';')[1]}">{{formData.teacherPracticeTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="实践状态 :" prop="teacherPracticeStatusCode">
                            <span v-if="formData.teacherPracticeStatusCodeStr"
                                  :style="{'color':formData.teacherPracticeStatusCodeStr.split(';')[1]}">{{formData.teacherPracticeStatusCodeStr.split(';')[0]}}</span>
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
  import api from "./schoolteacherpracticeUrl";
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
        filePathFileList :[],
        filePathFileType:'',
        teacherPracticeTypeCodeOptions: [{"label": "全部", "name": ""}],
        teacherPracticeTypeCode : null,
        teacherPracticeStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherPracticeStatusCode : null,
        formData:{
              teacherPracticeId:'',
              practiceTitle :"",
              practiceContent :"",
              imagePath :"",
              filePath :"",
              practiceBeginDt :"",
              practiceEndDt :"",
              teacherPracticeTypeCode :"",
              teacherPracticeStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              practiceTitle :
              [
                  {required: true, message: "请您输入教师实践", trigger: "blur"},
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              practiceContent :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              filePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              practiceBeginDt :
              [
                  {required: true, message: "请您输入实践开始时间", trigger: "blur"},

              ],
              practiceEndDt :
              [

              ],
              teacherPracticeTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherPracticeStatusCode :
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
          commonApi.getCodeIntType("teacherPracticeType").then(res => {
            let viewList = res.data.data || [];
            for (let teacherPracticeTypeItem of viewList) {
              this.teacherPracticeTypeCodeOptions.push({
                "label": teacherPracticeTypeItem.codeDesc,
                "name": teacherPracticeTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("teacherPracticeStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherPracticeStatusItem of viewList) {
              this.teacherPracticeStatusCodeOptions.push({
                "label": teacherPracticeStatusItem.codeDesc,
                "name": teacherPracticeStatusItem.codeId
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
      getFileMessage(res) {
        let obj = res;
        // console.log('File基本信息');
        //// console.log(obj);
        this.formData.filePath = res.urlurl;
        this.formData.url = res.urlurl;
        this.formData.sizes = res.size;
        this.formData.folderId = this.$route.params.id;
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
