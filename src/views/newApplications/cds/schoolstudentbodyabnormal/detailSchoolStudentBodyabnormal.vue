
                                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="异常情况 :" prop="title">
                      <el-input class="input-v2-rao" v-model="formData.title"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 异常情况 colName:title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="身体异常类型 :" prop="bodyabnormalTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.bodyabnormalTypeCode" placeholder="请您选择">
                        <el-option v-for="bodyabnormalTypeCodeItem in bodyabnormalTypeCodeOptions"
                                   :key="bodyabnormalTypeCodeItem.name"
                                   :label="bodyabnormalTypeCodeItem.label" :value="bodyabnormalTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 身体异常类型 colName:bodyabnormal_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="异常情况 :" prop="bodyabnormalContent">
                      <el-input class="input-v2-rao" v-model="formData.bodyabnormalContent"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 异常情况 colName:bodyabnormal_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生id :" prop="studentId">
                      <el-input class="input-v2-rao" v-model="formData.studentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生id colName:student_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="上报时间 :" prop="bodyabnormalDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.bodyabnormalDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 上报时间 colName:bodyabnormal_dt sqlType:TIMESTAMP notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="异常情况 :" prop="title">
                      <el-input class="input-v2-rao" v-model="formData.title"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="身体异常类型 :" prop="bodyabnormalTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.bodyabnormalTypeCode" placeholder="请您选择">
                        <el-option v-for="bodyabnormalTypeCodeItem in bodyabnormalTypeCodeOptions"
                                   :key="bodyabnormalTypeCodeItem.name"
                                   :label="bodyabnormalTypeCodeItem.label" :value="bodyabnormalTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="异常情况 :" prop="bodyabnormalContent">
                      <el-input class="input-v2-rao" v-model="formData.bodyabnormalContent"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="上报时间 :" prop="bodyabnormalDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.bodyabnormalDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="已无异常 :" prop="isClosed">
                      <el-select class="select-v2-rao" v-model="formData.isClosed" placeholder="请您选择">
                        <el-option v-for="isClosedItem in ynOptions" :key="isClosedItem.name"
                                   :label="isClosedItem.label" :value="isClosedItem.name">
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
                      {{formData.title}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.title">
                          <el-form-item label="异常情况 :" prop="title">
                            <span v-if="formData.title">{{formData.title}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="身体异常类型 :" prop="bodyabnormalTypeCode">
                            <span v-if="formData.bodyabnormalTypeCodeStr"
                                  :style="{'color':formData.bodyabnormalTypeCodeStr.split(';')[1]}">{{formData.bodyabnormalTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.bodyabnormalContent">
                          <el-form-item label="异常情况 :" prop="bodyabnormalContent">
                            <span v-if="formData.bodyabnormalContent">{{formData.bodyabnormalContent}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="上报时间 :" prop="bodyabnormalDt">
                            <span v-if="formData.bodyabnormalDt"> {{formData.bodyabnormalDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="已无异常 :" prop="isClosed">
                            <el-switch v-model="formData.isClosed == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="上报人 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
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
  import api from "./schoolstudentbodyabnormalUrl";
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
        bodyabnormalTypeCodeOptions: [{"label": "全部", "name": ""}],
        bodyabnormalTypeCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isClosed : null,
        formData:{
              bodyabnormalId:'',
              title :"",
              imagePath :"",
              bodyabnormalTypeCode :"",
              bodyabnormalContent :"",
              bodyabnormalDt :"",
              isClosed :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              title :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 512, message: "最多能输入512个字", trigger: "blur"},

              ],
              bodyabnormalTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              bodyabnormalContent :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              studentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              bodyabnormalDt :
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
          commonApi.getCodeIntType("bodyabnormalType").then(res => {
            let viewList = res.data.data || [];
            for (let bodyabnormalTypeItem of viewList) {
              this.bodyabnormalTypeCodeOptions.push({
                "label": bodyabnormalTypeItem.codeDesc,
                "name": bodyabnormalTypeItem.codeId
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
