

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="评价级别 *  :" prop="studentCommentLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.studentCommentLevelCode" placeholder="请您选择">
                        <el-option v-for="studentCommentLevelCodeItem in studentCommentLevelCodeOptions"
                                   :key="studentCommentLevelCodeItem.name"
                                   :label="studentCommentLevelCodeItem.label" :value="studentCommentLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评语 *  :" prop="commentContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.commentContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :many="1" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="周期 :" prop="learnCycleCode">
                      <el-select class="select-v2-rao" v-model="formData.learnCycleCode" placeholder="请您选择">
                        <el-option v-for="learnCycleCodeItem in learnCycleCodeOptions"
                                   :key="learnCycleCodeItem.name"
                                   :label="learnCycleCodeItem.label" :value="learnCycleCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评语时间 :" prop="commentedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.commentedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
            <el-form-item label="适用范围 :" prop="gradeIds" class="orgIntroduction">
              <send-object :header="header" @finish="finish"></send-object>
            </el-form-item>
          </el-col>
                  <el-col :span="24">
                    <el-form-item label="学科 :" prop="subjectName">
                      <el-input class="input-v2-rao"  v-model="formData.subjectName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学生 :" prop="studentName">
                      <el-input class="input-v2-rao" disabled v-model="formData.studentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>





          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="已读 :" prop="isRead">
                      <el-select class="select-v2-rao" v-model="formData.isRead" placeholder="请您选择">
                        <el-option v-for="isReadItem in ynOptions" :key="isReadItem.name"
                                   :label="isReadItem.label" :value="isReadItem.name">
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
                      {{formData.studentCommentLevelCode}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50">
                          <el-form-item label="评价级别 :" prop="studentCommentLevelCode">
                            <span v-if="formData.studentCommentLevelCodeStr"
                                  :style="{'color':formData.studentCommentLevelCodeStr.split(';')[1]}">{{formData.studentCommentLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.commentContent">
                          <el-form-item label="评语 :" prop="commentContent">
                            <span v-if="formData.commentContent" v-html="formData.commentContent"></span>
                          </el-form-item>
                        </div>


                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="周期 :" prop="learnCycleCode">
                            <span v-if="formData.learnCycleCodeStr"
                                  :style="{'color':formData.learnCycleCodeStr.split(';')[1]}">{{formData.learnCycleCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="评语时间 :" prop="commentedDt">
                            <span v-if="formData.commentedDt"> {{formData.commentedDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="已读 :" prop="isRead">
                            <el-switch v-model="formData.isRead == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.feedbackContent">
                          <el-form-item label="家长反馈 :" prop="feedbackContent">
                            <span v-if="formData.feedbackContent" v-html="formData.feedbackContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.parentName">
                          <el-form-item label="家长 :" prop="parentName">
                            <span v-if="formData.parentName">{{formData.parentName}}</span>
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
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师姓名 :" prop="teacherName">
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
  import api from "./classstudentcommentUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
    import SendObject from "@/components/sendObject/testSendObject";
  export default {
      components: {editor, upload, uploads,SendObject},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        studentCommentLevelCodeOptions: [{"label": "全部", "name": ""}], studentCommentLevelCode : null,
        imagePathFileList :[],
        imagePathFileType:'',
        learnCycleCodeOptions: [{"label": "全部", "name": ""}], learnCycleCode : null,
        ynOptions :[{"label": "全部", "name": ""}], isRead : null,
        formData:{
              studentCommentId:'',
              isRead :"",
              feedbackContent :"",
              parentId :"",
              className : "",
              classId : "",
              studentUserId : ""
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        header: [
          {
            title: '1、学段',
            isActive: true,
            code: 'segment',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                nextType: 'grade',
                single: true,
                isActive: false,
                url: '/userapp/base/segmentGrade?type=1'
              },
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'grade',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '年级',
                subTitleType: 'grade',
                single: true,
                nextType: 'class',
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'class',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '班级',
                single: true,
                subTitleType: 'class',
                nextType: 'students',
              },
            ]
          },
          {
            title: '4、选择学生',
            isActive: false,
            code: 'students',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学生',
                single: true,
                subTitleType: 'students',
                nextType: 'parents',
              },
            ]
          },
          // {
          //   title: '5、选择家长',
          //   isActive: false,
          //   code: 'parents',
          //   children: [
          //     {
          //       isCheckAll: true,
          //       checked: [],
          //       children: [],
          //       subTitle: '家长',
          //       subTitleType: 'parents',
          //       nextType: 'none',
          //       isActive: false,
          //       url: ''
          //     },
          //   ]
          // },
        ],
        rules : {
              studentCommentLevelCode :
              [
                  {required: true, message: "请您输入评价级别", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              commentContent :
              [
                  {required: true, message: "请您输入评语", trigger: "blur"},
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              learnCycleCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              commentedDt :
              [

              ],
              subjectName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentName :
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
          commonApi.getCodeIntType("studentCommentLevel").then(res => {
            console.log(res.data)
            let viewList = res.data.data || [];
            for (let studentCommentLevelItem of viewList) {
              this.studentCommentLevelCodeOptions.push({
                "label": studentCommentLevelItem.codeDesc,
                "name": studentCommentLevelItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("learnCycle").then(res => {
            let viewList = res.data.data || [];
            for (let learnCycleItem of viewList) {
              this.learnCycleCodeOptions.push({
                "label": learnCycleItem.codeDesc,
                "name": learnCycleItem.codeId
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
    	finish(res) {
        //classId  className studentId studentUserId studentName
        console.log(res.header);
        // || res.header[2].children[0].childr
        this.formData.classId = res.header[2].children[0].checked;
        this.formData.className = res.header[3].children[0].subTitle;
        // this.formData.studentId = res.header[3].children[0].checked
        this.formData.studentUserId = res.header[3].children[0].checked;

        res.header[3].children[0].children.forEach(res => {
          if (res.id === this.formData.studentUserId) {
            this.formData.studentName = res.name;

          }
        });
        this.$forceUpdate()
      },
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
