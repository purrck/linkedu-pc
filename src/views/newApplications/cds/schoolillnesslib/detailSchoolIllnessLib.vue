
                      
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="疾病名称 :" prop="illnessName">
                      <el-input class="input-v2-rao" v-model="formData.illnessName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 疾病名称 colName:illness_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="描述 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 描述 colName:description sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疾病类型 :" prop="illnessTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.illnessTypeCode" placeholder="请您选择">
                        <el-option v-for="illnessTypeCodeItem in illnessTypeCodeOptions"
                                   :key="illnessTypeCodeItem.name"
                                   :label="illnessTypeCodeItem.label" :value="illnessTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 疾病类型 colName:illness_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疾控级别 :" prop="illnessControlLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.illnessControlLevelCode" placeholder="请您选择">
                        <el-option v-for="illnessControlLevelCodeItem in illnessControlLevelCodeOptions"
                                   :key="illnessControlLevelCodeItem.name"
                                   :label="illnessControlLevelCodeItem.label" :value="illnessControlLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 疾控级别 colName:illness_control_level_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="处理方式 :" prop="illnessProcessModeCode">
                      <el-select class="select-v2-rao" v-model="formData.illnessProcessModeCode" placeholder="请您选择">
                        <el-option v-for="illnessProcessModeCodeItem in illnessProcessModeCodeOptions"
                                   :key="illnessProcessModeCodeItem.name"
                                   :label="illnessProcessModeCodeItem.label" :value="illnessProcessModeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 处理方式 colName:illness_process_mode_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疾病分辨 :" prop="illnessDistinguishVideo">
                      <uploads :data="formData.illnessDistinguishVideo" @fileMessage="getVideoMessage"/>
                    </el-form-item>
                  </el-col>
<!-- 疾病分辨 colName:illness_distinguish_video sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疾病治疗 :" prop="illnessTreatmentVideo">
                      <uploads :data="formData.illnessTreatmentVideo" @fileMessage="getVideoMessage"/>
                    </el-form-item>
                  </el-col>
<!-- 疾病治疗 colName:illness_treatment_video sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 序号 colName:sequnce_num sqlType:INTEGER notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="疾病名称 :" prop="illnessName">
                      <el-input class="input-v2-rao" v-model="formData.illnessName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="描述 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="疾病类型 :" prop="illnessTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.illnessTypeCode" placeholder="请您选择">
                        <el-option v-for="illnessTypeCodeItem in illnessTypeCodeOptions"
                                   :key="illnessTypeCodeItem.name"
                                   :label="illnessTypeCodeItem.label" :value="illnessTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="疾控级别 :" prop="illnessControlLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.illnessControlLevelCode" placeholder="请您选择">
                        <el-option v-for="illnessControlLevelCodeItem in illnessControlLevelCodeOptions"
                                   :key="illnessControlLevelCodeItem.name"
                                   :label="illnessControlLevelCodeItem.label" :value="illnessControlLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处理方式 :" prop="illnessProcessModeCode">
                      <el-select class="select-v2-rao" v-model="formData.illnessProcessModeCode" placeholder="请您选择">
                        <el-option v-for="illnessProcessModeCodeItem in illnessProcessModeCodeOptions"
                                   :key="illnessProcessModeCodeItem.name"
                                   :label="illnessProcessModeCodeItem.label" :value="illnessProcessModeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="疾病分辨 :" prop="illnessDistinguishVideo">
                      <uploads :data="formData.illnessDistinguishVideo" @fileMessage="getVideoMessage"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="疾病治疗 :" prop="illnessTreatmentVideo">
                      <uploads :data="formData.illnessTreatmentVideo" @fileMessage="getVideoMessage"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
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
                      {{formData.illnessName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.illnessName">
                          <el-form-item label="疾病名称 :" prop="illnessName">
                            <span v-if="formData.illnessName">{{formData.illnessName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.description">
                          <el-form-item label="描述 :" prop="description">
                            <span v-if="formData.description" v-html="formData.description"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="疾病类型 :" prop="illnessTypeCode">
                            <span v-if="formData.illnessTypeCodeStr"
                                  :style="{'color':formData.illnessTypeCodeStr.split(';')[1]}">{{formData.illnessTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="疾控级别 :" prop="illnessControlLevelCode">
                            <span v-if="formData.illnessControlLevelCodeStr"
                                  :style="{'color':formData.illnessControlLevelCodeStr.split(';')[1]}">{{formData.illnessControlLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="处理方式 :" prop="illnessProcessModeCode">
                            <span v-if="formData.illnessProcessModeCodeStr"
                                  :style="{'color':formData.illnessProcessModeCodeStr.split(';')[1]}">{{formData.illnessProcessModeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p100">
                          <el-form-item label="疾病分辨 :" prop="illnessDistinguishVideo">
                            <video width="500" controls ref="illnessDistinguishVideoVideo">
                              <source :src="formData.illnessDistinguishVideo" type="video/mp4" v-if="formData.illnessDistinguishVideo">
                            </video>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="疾病治疗 :" prop="illnessTreatmentVideo">
                            <video width="500" controls ref="illnessTreatmentVideoVideo">
                              <source :src="formData.illnessTreatmentVideo" type="video/mp4" v-if="formData.illnessTreatmentVideo">
                            </video>
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
  import api from "./schoolillnesslibUrl";
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
        illnessTypeCodeOptions: [{"label": "全部", "name": ""}],
        illnessTypeCode : null,
        illnessControlLevelCodeOptions: [{"label": "全部", "name": ""}],
        illnessControlLevelCode : null,
        illnessProcessModeCodeOptions: [{"label": "全部", "name": ""}],
        illnessProcessModeCode : null,
        illnessDistinguishVideoFileList :[],
        illnessDistinguishVideoFileType:'',
        illnessTreatmentVideoFileList :[],
        illnessTreatmentVideoFileType:'',
        formData:{
              illnessLibId:'',
              illnessName :"",
              imagePath :"",
              description :"",
              illnessTypeCode :"",
              illnessControlLevelCode :"",
              illnessProcessModeCode :"",
              illnessDistinguishVideo :"",
              illnessTreatmentVideo :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              illnessName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 512, message: "最多能输入512个字", trigger: "blur"},

              ],
              description :
              [
                  {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

              ],
              illnessTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              illnessControlLevelCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              illnessProcessModeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              illnessDistinguishVideo :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              illnessTreatmentVideo :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              sequnceNum :
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
          commonApi.getCodeIntType("illnessType").then(res => {
            let viewList = res.data.data || [];
            for (let illnessTypeItem of viewList) {
              this.illnessTypeCodeOptions.push({
                "label": illnessTypeItem.codeDesc,
                "name": illnessTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("illnessControlLevel").then(res => {
            let viewList = res.data.data || [];
            for (let illnessControlLevelItem of viewList) {
              this.illnessControlLevelCodeOptions.push({
                "label": illnessControlLevelItem.codeDesc,
                "name": illnessControlLevelItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("illnessProcessMode").then(res => {
            let viewList = res.data.data || [];
            for (let illnessProcessModeItem of viewList) {
              this.illnessProcessModeCodeOptions.push({
                "label": illnessProcessModeItem.codeDesc,
                "name": illnessProcessModeItem.codeId
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
      getVideoMessage(res) {
        let obj = res;
        // console.log('Video基本信息');
        //// console.log(obj);
        this.formData.illnessDistinguishVideo = res.urlurl;
        this.formData.url = res.urlurl;
        this.formData.sizes = res.size;
        this.formData.folderId = this.$route.params.id;
      },
      getVideoMessage(res) {
        let obj = res;
        // console.log('Video基本信息');
        //// console.log(obj);
        this.formData.illnessTreatmentVideo = res.urlurl;
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
