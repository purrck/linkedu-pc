
                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="车牌号 *  :" prop="carNum">
                      <el-input class="input-v2-rao" v-model="formData.carNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 车牌号 colName:car_num sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="进入时间 *  :" prop="inDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.inDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 进入时间 colName:in_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="出去时间 :" prop="outDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.outDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 出去时间 colName:out_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="异常停车 :" prop="isParkingException">
                      <el-select class="select-v2-rao" v-model="formData.isParkingException" placeholder="请您选择">
                        <el-option v-for="isParkingExceptionItem in ynOptions" :key="isParkingExceptionItem.name"
                                   :label="isParkingExceptionItem.label" :value="isParkingExceptionItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 异常停车 colName:is_parking_exception sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="异常停车照片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 异常停车照片 colName:image_path sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="出去时间 :" prop="outDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.outDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="异常停车 :" prop="isParkingException">
                      <el-select class="select-v2-rao" v-model="formData.isParkingException" placeholder="请您选择">
                        <el-option v-for="isParkingExceptionItem in ynOptions" :key="isParkingExceptionItem.name"
                                   :label="isParkingExceptionItem.label" :value="isParkingExceptionItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="异常停车照片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
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
                        <div class="p50" v-if="formData.carNum">
                          <el-form-item label="车牌号 :" prop="carNum">
                            <span v-if="formData.carNum">{{formData.carNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="进入时间 :" prop="inDt">
                            <span v-if="formData.inDt"> {{formData.inDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="出去时间 :" prop="outDt">
                            <span v-if="formData.outDt"> {{formData.outDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="异常停车 :" prop="isParkingException">
                            <el-switch v-model="formData.isParkingException == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>


                        <div class="p100">
                          <el-form-item label="异常停车照片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
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
  import api from "./teachercarinoutUrl";
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
        isParkingException : null,
        imagePathFileList :[],
        imagePathFileType:'',
        formData:{
              carInoutId:'',
              outDt :"",
              isParkingException :"",
              imagePath :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              carNum :
              [
                  {required: true, message: "请您输入车牌号", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              inDt :
              [
                  {required: true, message: "请您输入进入时间", trigger: "blur"},

              ],
              outDt :
              [

              ],
              isParkingException :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

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
