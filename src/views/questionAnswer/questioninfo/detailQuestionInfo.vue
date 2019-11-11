
                                                              
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="标题 *  :" prop="questionTitle">
                      <el-input class="input-v2-rao" v-model="formData.questionTitle"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 标题 colName:question_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="内容 *  :" prop="content">
                      <el-input class="input-v2-rao" v-model="formData.content"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 内容 colName:content sqlType:VARCHAR notnull:false -->
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
                    <el-form-item label="问题类型 :" prop="questionTypeId">
                      <el-input class="input-v2-rao" v-model="formData.questionTypeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 问题类型 colName:question_type_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="问题类型 :" prop="questionTypeName">
                      <el-input class="input-v2-rao" v-model="formData.questionTypeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 问题类型 colName:question_type_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学科 :" prop="subjectId">
                      <el-input class="input-v2-rao" v-model="formData.subjectId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学科 colName:subject_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学科 :" prop="subjectName">
                      <el-input class="input-v2-rao" v-model="formData.subjectName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学科 colName:subject_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生id :" prop="studentId">
                      <el-input class="input-v2-rao" v-model="formData.studentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生id colName:student_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生用户id :" prop="studentUserId">
                      <el-input class="input-v2-rao" v-model="formData.studentUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生用户id colName:student_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生 :" prop="studentName">
                      <el-input class="input-v2-rao" v-model="formData.studentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生 colName:student_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="悬赏来源 :" prop="rewardByUserCode">
                      <el-select class="select-v2-rao" v-model="formData.rewardByUserCode" placeholder="请您选择">
                        <el-option v-for="rewardByUserCodeItem in rewardByUserCodeOptions"
                                   :key="rewardByUserCodeItem.name"
                                   :label="rewardByUserCodeItem.label" :value="rewardByUserCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 悬赏来源 colName:reward_by_user_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="悬赏 :" prop="rewardPrice">
                      <el-input class="input-v2-rao" v-model="formData.rewardPrice"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 悬赏 colName:reward_price sqlType:DECIMAL notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="标题 *  :" prop="questionTitle">
                      <el-input class="input-v2-rao" v-model="formData.questionTitle"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="内容 *  :" prop="content">
                      <el-input class="input-v2-rao" v-model="formData.content"
                                maxlength="32"></el-input>
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
                    <el-form-item label="问题类型 :" prop="questionTypeId">
                      <el-input class="input-v2-rao" v-model="formData.questionTypeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="问题类型 :" prop="questionTypeName">
                      <el-input class="input-v2-rao" v-model="formData.questionTypeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="问题状态 :" prop="questionStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.questionStatusCode" placeholder="请您选择">
                        <el-option v-for="questionStatusCodeItem in questionStatusCodeOptions"
                                   :key="questionStatusCodeItem.name"
                                   :label="questionStatusCodeItem.label" :value="questionStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="最近回答时间 :" prop="recentAnswerDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.recentAnswerDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="阅读 :" prop="readNum">
                      <el-input class="input-v2-rao" v-model="formData.readNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="回答 :" prop="answerNum">
                      <el-input class="input-v2-rao" v-model="formData.answerNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="悬赏来源 :" prop="rewardByUserCode">
                      <el-select class="select-v2-rao" v-model="formData.rewardByUserCode" placeholder="请您选择">
                        <el-option v-for="rewardByUserCodeItem in rewardByUserCodeOptions"
                                   :key="rewardByUserCodeItem.name"
                                   :label="rewardByUserCodeItem.label" :value="rewardByUserCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="悬赏 :" prop="rewardPrice">
                      <el-input class="input-v2-rao" v-model="formData.rewardPrice"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="关注 *  :" prop="followNum">
                      <el-input class="input-v2-rao" v-model="formData.followNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="收藏 :" prop="collectionNum">
                      <el-input class="input-v2-rao" v-model="formData.collectionNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="标签 :" prop="tags">
                      <el-input class="input-v2-rao" v-model="formData.tags"
                                maxlength="128"></el-input>
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
                      {{formData.questionTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.questionTitle">
                          <el-form-item label="标题 :" prop="questionTitle">
                            <span v-if="formData.questionTitle">{{formData.questionTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.content">
                          <el-form-item label="内容 :" prop="content">
                            <span v-if="formData.content">{{formData.content}}</span>
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
                        <div class="p50" v-if="formData.questionTypeId">
                          <el-form-item label="问题类型 :" prop="questionTypeId">
                            <span v-if="formData.questionTypeId">{{formData.questionTypeId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.questionTypeName">
                          <el-form-item label="问题类型 :" prop="questionTypeName">
                            <span v-if="formData.questionTypeName">{{formData.questionTypeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="问题状态 :" prop="questionStatusCode">
                            <span v-if="formData.questionStatusCodeStr"
                                  :style="{'color':formData.questionStatusCodeStr.split(';')[1]}">{{formData.questionStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="发问时间 :" prop="publishedDt">
                            <span v-if="formData.publishedDt"> {{formData.publishedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="最近回答时间 :" prop="recentAnswerDt">
                            <span v-if="formData.recentAnswerDt"> {{formData.recentAnswerDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.subjectName">
                          <el-form-item label="学科 :" prop="subjectName">
                            <span v-if="formData.subjectName">{{formData.subjectName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="提问人 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.tags">
                          <el-form-item label="标签 :" prop="tags">
                            <span v-if="formData.tags">{{formData.tags}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.readNum">
                          <el-form-item label="阅读 :" prop="readNum">
                            <span v-if="formData.readNum">{{formData.readNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.answerNum">
                          <el-form-item label="回答 :" prop="answerNum">
                            <span v-if="formData.answerNum">{{formData.answerNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="悬赏来源 :" prop="rewardByUserCode">
                            <span v-if="formData.rewardByUserCodeStr"
                                  :style="{'color':formData.rewardByUserCodeStr.split(';')[1]}">{{formData.rewardByUserCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.rewardPrice">
                          <el-form-item label="悬赏 :" prop="rewardPrice">
                            <span v-if="formData.rewardPrice">{{formData.rewardPrice}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.followNum">
                          <el-form-item label="关注 :" prop="followNum">
                            <span v-if="formData.followNum">{{formData.followNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.collectionNum">
                          <el-form-item label="收藏 :" prop="collectionNum">
                            <span v-if="formData.collectionNum">{{formData.collectionNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.tags">
                          <el-form-item label="标签 :" prop="tags">
                            <span v-if="formData.tags">{{formData.tags}}</span>
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
                    <router-link :to="`/basedata/listQuestionAnswer?questionId=`+
                                  formData.questionId">
                      <i class="iconfont icon-icon_liebiao"></i>回答
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listQuestionInvite?questionId=`+
                                  formData.questionId">
                      <i class="iconfont icon-icon_liebiao"></i>邀请回答
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
  import api from "./questioninfoUrl";
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
        questionStatusCodeOptions: [{"label": "全部", "name": ""}],
        questionStatusCode : null,
        rewardByUserCodeOptions: [{"label": "全部", "name": ""}],
        rewardByUserCode : null,
        formData:{
              questionId:'',
              questionTitle :"",
              content :"",
              imagePath :"",
              filePath :"",
              questionTypeId :"",
              questionTypeName :"",
              questionStatusCode :"",
              recentAnswerDt :"",
              readNum :"",
              answerNum :"",
              rewardByUserCode :"",
              rewardPrice :"",
              followNum :"",
              collectionNum :"",
              tags :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              questionTitle :
              [
                  {required: true, message: "请您输入标题", trigger: "blur"},
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              content :
              [
                  {required: true, message: "请您输入内容", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              filePath :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              questionTypeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              questionTypeName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              subjectName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              rewardByUserCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              rewardPrice :
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
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("questionStatus").then(res => {
            let viewList = res.data.data || [];
            for (let questionStatusItem of viewList) {
              this.questionStatusCodeOptions.push({
                "label": questionStatusItem.codeDesc,
                "name": questionStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("rewardByUser").then(res => {
            let viewList = res.data.data || [];
            for (let rewardByUserItem of viewList) {
              this.rewardByUserCodeOptions.push({
                "label": rewardByUserItem.codeDesc,
                "name": rewardByUserItem.codeId
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
        console.log('File基本信息');
        //console.log(obj);
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
