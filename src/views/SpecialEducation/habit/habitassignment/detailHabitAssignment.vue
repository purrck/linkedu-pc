
                                                  
<template>
  <div>
    <div class="edit-box">


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                      {{formData.assignmentTypeTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.assignmentTypeTitle">
                          <el-form-item label="任务类型名 :" prop="assignmentTypeTitle">
                            <span v-if="formData.assignmentTypeTitle">{{formData.assignmentTypeTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.assignmentName">
                          <el-form-item label="任务名称 :" prop="assignmentName">
                            <span v-if="formData.assignmentName">{{formData.assignmentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="发起时间 :" prop="assignedDt">
                            <span v-if="formData.assignedDt"> {{formData.assignedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="任务状态 :" prop="assignmentStatusCode">
                            <span v-if="formData.assignmentStatusCodeStr"
                                  :style="{'color':formData.assignmentStatusCodeStr.split(';')[1]}">{{formData.assignmentStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="任务周期 :" prop="assignmentPeriodCode">
                            <span v-if="formData.assignmentPeriodCodeStr"
                                  :style="{'color':formData.assignmentPeriodCodeStr.split(';')[1]}">{{formData.assignmentPeriodCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.flowerValue">
                          <el-form-item label="奖励红花数 :" prop="flowerValue">
                            <span v-if="formData.flowerValue">{{formData.flowerValue}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.content">
                          <el-form-item label="任务内容 :" prop="content">
                            <span v-if="formData.content">{{formData.content}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生姓名 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.parentName">
                          <el-form-item label="家长姓名 :" prop="parentName">
                            <span v-if="formData.parentName">{{formData.parentName}}</span>
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
                    <router-link :to="`/basedata/listHabitAssignmentRecord?assignmentId=`+
                                  formData.assignmentId">
                      <i class="iconfont icon-icon_liebiao"></i>任务完成记录
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
  import api from "./habitassignmentUrl";
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

        assignmentStatusCodeOptions: [{"label": "全部", "name": ""}],
        assignmentStatusCode : null,
        assignmentPeriodCodeOptions: [{"label": "全部", "name": ""}],
        assignmentPeriodCode : null,
        imagePathFileList :[],
        imagePathFileType:'',
        formData:{
              assignmentId:'',
              assignmentName :"",
              assignmentStatusCode :"",
              assignmentPeriodCode :"",
              flowerValue :"",
              content :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              assignmentTypeId :
              [
                  {required: true, message: "请您输入任务类型id", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              assignmentTypeTitle :
              [
                  {required: true, message: "请您输入任务类型名", trigger: "blur"},
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              assignmentName :
              [
                  {required: true, message: "请您输入任务名称", trigger: "blur"},
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              assignedDt :
              [
                  {required: true, message: "请您输入发起时间", trigger: "blur"},

              ],
              assignmentStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              assignmentPeriodCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              flowerValue :
              [
                  {required: true, message: "请您输入奖励红花数", trigger: "blur"},
                  {validator: validation.number, trigger: "blur"},

              ],
              content :
              [
                  {max: 512, message: "最多能输入512个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

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
          commonApi.getCodeIntType("assignmentStatus").then(res => {
            let viewList = res.data.data || [];
            for (let assignmentStatusItem of viewList) {
              this.assignmentStatusCodeOptions.push({
                "label": assignmentStatusItem.codeDesc,
                "name": assignmentStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("assignmentPeriod").then(res => {
            let viewList = res.data.data || [];
            for (let assignmentPeriodItem of viewList) {
              this.assignmentPeriodCodeOptions.push({
                "label": assignmentPeriodItem.codeDesc,
                "name": assignmentPeriodItem.codeId
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
