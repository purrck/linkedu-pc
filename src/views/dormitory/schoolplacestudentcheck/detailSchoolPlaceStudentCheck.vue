
                                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="学生id :" prop="studentId">
                      <el-input class="input-v2-rao" v-model="formData.studentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学生 :" prop="studentName">
                      <el-input class="input-v2-rao" v-model="formData.studentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="学生用户id :" prop="studentUserId">
                      <el-input class="input-v2-rao" v-model="formData.studentUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="时间 :" prop="happenedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.happenedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="摄影头截图 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="设备类型 :" prop="deviceTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.deviceTypeCode" placeholder="请您选择">
                        <el-option v-for="deviceTypeCodeItem in deviceTypeCodeOptions"
                                   :key="deviceTypeCodeItem.name"
                                   :label="deviceTypeCodeItem.label" :value="deviceTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="设备号 :" prop="deviceNum">
                      <el-input class="input-v2-rao" v-model="formData.deviceNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="是否异常 :" prop="isException">
                      <el-select class="select-v2-rao" v-model="formData.isException" placeholder="请您选择">
                        <el-option v-for="isExceptionItem in ynOptions" :key="isExceptionItem.name"
                                   :label="isExceptionItem.label" :value="isExceptionItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所id :" prop="placeId">
                      <el-input class="input-v2-rao" v-model="formData.placeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所 :" prop="placeName">
                      <el-input class="input-v2-rao" v-model="formData.placeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="是否异常 :" prop="isException">
                      <el-select class="select-v2-rao" v-model="formData.isException" placeholder="请您选择">
                        <el-option v-for="isExceptionItem in ynOptions" :key="isExceptionItem.name"
                                   :label="isExceptionItem.label" :value="isExceptionItem.name">
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
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.leaveEnter">
                          <el-form-item label="进出 :" prop="leaveEnter">
                            <span v-if="formData.leaveEnter">{{formData.leaveEnter}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="时间 :" prop="happenedDt">
                            <span v-if="formData.happenedDt"> {{formData.happenedDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="摄影头截图 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="设备类型 :" prop="deviceTypeCode">
                            <span v-if="formData.deviceTypeCodeStr"
                                  :style="{'color':formData.deviceTypeCodeStr.split(';')[1]}">{{formData.deviceTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.deviceNum">
                          <el-form-item label="设备号 :" prop="deviceNum">
                            <span v-if="formData.deviceNum">{{formData.deviceNum}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="是否异常 :" prop="isException">
                            <el-switch v-model="formData.isException == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.placeName">
                          <el-form-item label="场所 :" prop="placeName">
                            <span v-if="formData.placeName">{{formData.placeName}}</span>
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
  import api from "./schoolplacestudentcheckUrl";
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
        deviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        deviceTypeCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isException : null,
        formData:{
              studentHisId:'',
              isException :"",
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
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              happenedDt :
              [

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              deviceTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              deviceNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              isException :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              placeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              placeName :
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
          commonApi.getCodeIntType("deviceType").then(res => {
            let viewList = res.data.data || [];
            for (let deviceTypeItem of viewList) {
              this.deviceTypeCodeOptions.push({
                "label": deviceTypeItem.codeDesc,
                "name": deviceTypeItem.codeId
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
