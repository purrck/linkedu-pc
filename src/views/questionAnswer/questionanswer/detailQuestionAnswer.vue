
                        
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="问题 :" prop="questionId">
                      <el-input class="input-v2-rao" v-model="formData.questionId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 问题 colName:question_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="问题 :" prop="questionTitle">
                      <el-input class="input-v2-rao" v-model="formData.questionTitle"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 问题 colName:question_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="回答内容 *  :" prop="answerContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.answerContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 回答内容 colName:answer_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="附件 :" prop="filePath">
                      <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
                    </el-form-item>
                  </el-col>
<!-- 附件 colName:file_path sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="回答内容 *  :" prop="answerContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.answerContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="附件 :" prop="filePath">
                      <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="赞成 :" prop="approvedNum">
                      <el-input class="input-v2-rao" v-model="formData.approvedNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="反对 :" prop="disapprovedNum">
                      <el-input class="input-v2-rao" v-model="formData.disapprovedNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="被采纳 :" prop="isAccept">
                      <el-select class="select-v2-rao" v-model="formData.isAccept" placeholder="请您选择">
                        <el-option v-for="isAcceptItem in ynOptions" :key="isAcceptItem.name"
                                   :label="isAcceptItem.label" :value="isAcceptItem.name">
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
                      {{formData.answerContent}}
                </div>
                <div class="detail-item-v2">

                        <div class="p100" v-if="formData.answerContent">
                          <el-form-item label="回答内容 :" prop="answerContent">
                            <span v-if="formData.answerContent" v-html="formData.answerContent"></span>
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
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="回答人 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="回答时间 :" prop="answerDt">
                            <span v-if="formData.answerDt"> {{formData.answerDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.approvedNum">
                          <el-form-item label="赞成 :" prop="approvedNum">
                            <span v-if="formData.approvedNum">{{formData.approvedNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.disapprovedNum">
                          <el-form-item label="反对 :" prop="disapprovedNum">
                            <span v-if="formData.disapprovedNum">{{formData.disapprovedNum}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="被采纳 :" prop="isAccept">
                            <el-switch v-model="formData.isAccept == 'Y'" disabled></el-switch>
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
  import api from "./questionanswerUrl";
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

        filePathFileList :[],
        filePathFileType:'',
        ynOptions :[{"label": "全部", "name": ""}],
        isAccept : null,
        formData:{
              answerId:'',
              answerContent :"",
              filePath :"",
              approvedNum :"",
              disapprovedNum :"",
              isAccept :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              questionId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              questionTitle :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              answerContent :
              [
                  {required: true, message: "请您输入回答内容", trigger: "blur"},
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              filePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

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
