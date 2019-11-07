
                                              
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="学生id *  :" prop="studentId">
                      <el-input class="input-v2-rao" v-model="formData.studentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生id colName:student_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疾病id *  :" prop="illnessLibId">
                      <el-input class="input-v2-rao" v-model="formData.illnessLibId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 疾病id colName:illness_lib_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="是否确诊 :" prop="isConfirmed">
                      <el-select class="select-v2-rao" v-model="formData.isConfirmed" placeholder="请您选择">
                        <el-option v-for="isConfirmedItem in ynOptions" :key="isConfirmedItem.name"
                                   :label="isConfirmedItem.label" :value="isConfirmedItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 是否确诊 colName:is_confirmed sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="发病时间 :" prop="happenedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.happenedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 发病时间 colName:happened_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="截止时间 :" prop="finishedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.finishedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 截止时间 colName:finished_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="处理方式 :" prop="illnessProcessModeCode ">
                      <el-input class="input-v2-rao" v-model="formData.illnessProcessModeCode "
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 处理方式 colName:illness_process_mode_code  sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生生病状态 :" prop="studentIllnessStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.studentIllnessStatusCode" placeholder="请您选择">
                        <el-option v-for="studentIllnessStatusCodeItem in studentIllnessStatusCodeOptions"
                                   :key="studentIllnessStatusCodeItem.name"
                                   :label="studentIllnessStatusCodeItem.label" :value="studentIllnessStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 学生生病状态 colName:student_illness_status_code sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="疾病id *  :" prop="illnessLibId">
                      <el-input class="input-v2-rao" v-model="formData.illnessLibId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="是否确诊 :" prop="isConfirmed">
                      <el-select class="select-v2-rao" v-model="formData.isConfirmed" placeholder="请您选择">
                        <el-option v-for="isConfirmedItem in ynOptions" :key="isConfirmedItem.name"
                                   :label="isConfirmedItem.label" :value="isConfirmedItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发病时间 :" prop="happenedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.happenedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="截止时间 :" prop="finishedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.finishedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处理方式 :" prop="illnessProcessModeCode ">
                      <el-input class="input-v2-rao" v-model="formData.illnessProcessModeCode "
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学生生病状态 :" prop="studentIllnessStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.studentIllnessStatusCode" placeholder="请您选择">
                        <el-option v-for="studentIllnessStatusCodeItem in studentIllnessStatusCodeOptions"
                                   :key="studentIllnessStatusCodeItem.name"
                                   :label="studentIllnessStatusCodeItem.label" :value="studentIllnessStatusCodeItem.name">
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
                      {{formData.studentName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.illnessName">
                          <el-form-item label="疾病 :" prop="illnessName">
                            <span v-if="formData.illnessName">{{formData.illnessName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="是否确诊 :" prop="isConfirmed">
                            <el-switch v-model="formData.isConfirmed == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>


                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="发病时间 :" prop="happenedDt">
                            <span v-if="formData.happenedDt"> {{formData.happenedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止时间 :" prop="finishedDt">
                            <span v-if="formData.finishedDt"> {{formData.finishedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="发布人 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.illnessProcessModeCode ">
                          <el-form-item label="处理方式 :" prop="illnessProcessModeCode ">
                            <span v-if="formData.illnessProcessModeCode ">{{formData.illnessProcessModeCode }}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="学生生病状态 :" prop="studentIllnessStatusCode">
                            <span v-if="formData.studentIllnessStatusCodeStr"
                                  :style="{'color':formData.studentIllnessStatusCodeStr.split(';')[1]}">{{formData.studentIllnessStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.gradeName">
                          <el-form-item label="年级 :" prop="gradeName">
                            <span v-if="formData.gradeName">{{formData.gradeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
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
  import api from "./schoolstudentillnessUrl";
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

        ynOptions :[{"label": "全部", "name": ""}],
        isConfirmed : null,
        imagePathFileList :[],
        imagePathFileType:'',
        studentIllnessStatusCodeOptions: [{"label": "全部", "name": ""}],
        studentIllnessStatusCode : null,
        formData:{
              studentIllnessId:'',
              illnessLibId :"",
              isConfirmed :"",
              imagePath :"",
              happenedDt :"",
              finishedDt :"",
              illnessProcessModeCode  :"",
              studentIllnessStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              studentId :
              [
                  {required: true, message: "请您输入学生id", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              illnessLibId :
              [
                  {required: true, message: "请您输入疾病id", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              isConfirmed :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 512, message: "最多能输入512个字", trigger: "blur"},

              ],
              happenedDt :
              [

              ],
              finishedDt :
              [

              ],
              illnessProcessModeCode  :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentIllnessStatusCode :
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
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("studentIllnessStatus").then(res => {
            let viewList = res.data.data || [];
            for (let studentIllnessStatusItem of viewList) {
              this.studentIllnessStatusCodeOptions.push({
                "label": studentIllnessStatusItem.codeDesc,
                "name": studentIllnessStatusItem.codeId
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
