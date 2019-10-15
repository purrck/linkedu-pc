
                    
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="标题 :" prop="messageTmpTitle">
                      <el-input class="input-v2-rao" v-model="formData.messageTmpTitle"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 标题 colName:message_tmp_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="提醒内容 :" prop="messageTmpContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.messageTmpContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 提醒内容 colName:message_tmp_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="内容状态 :" prop="messageTmpStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.messageTmpStatusCode" placeholder="请您选择">
                        <el-option v-for="messageTmpStatusCodeItem in messageTmpStatusCodeOptions"
                                   :key="messageTmpStatusCodeItem.name"
                                   :label="messageTmpStatusCodeItem.label" :value="messageTmpStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 内容状态 colName:message_tmp_status_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="提醒适合类型 :" prop="messageTmpTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.messageTmpTypeCode" placeholder="请您选择">
                        <el-option v-for="messageTmpTypeCodeItem in messageTmpTypeCodeOptions"
                                   :key="messageTmpTypeCodeItem.name"
                                   :label="messageTmpTypeCodeItem.label" :value="messageTmpTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 提醒适合类型 colName:message_tmp_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="发布时间 :" prop="publishedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.publishedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 发布时间 colName:published_dt sqlType:TIMESTAMP notnull:false -->
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
                    <el-form-item label="标题 :" prop="messageTmpTitle">
                      <el-input class="input-v2-rao" v-model="formData.messageTmpTitle"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="提醒内容 :" prop="messageTmpContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.messageTmpContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="内容状态 :" prop="messageTmpStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.messageTmpStatusCode" placeholder="请您选择">
                        <el-option v-for="messageTmpStatusCodeItem in messageTmpStatusCodeOptions"
                                   :key="messageTmpStatusCodeItem.name"
                                   :label="messageTmpStatusCodeItem.label" :value="messageTmpStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="提醒适合类型 :" prop="messageTmpTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.messageTmpTypeCode" placeholder="请您选择">
                        <el-option v-for="messageTmpTypeCodeItem in messageTmpTypeCodeOptions"
                                   :key="messageTmpTypeCodeItem.name"
                                   :label="messageTmpTypeCodeItem.label" :value="messageTmpTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发布时间 :" prop="publishedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.publishedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="被使用 :" prop="usedTimesNum">
                      <el-input class="input-v2-rao" v-model="formData.usedTimesNum"
                                maxlength="11"></el-input>
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
                      {{formData.messageTmpTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.messageTmpTitle">
                          <el-form-item label="标题 :" prop="messageTmpTitle">
                            <span v-if="formData.messageTmpTitle">{{formData.messageTmpTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.messageTmpContent">
                          <el-form-item label="提醒内容 :" prop="messageTmpContent">
                            <span v-if="formData.messageTmpContent" v-html="formData.messageTmpContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="内容状态 :" prop="messageTmpStatusCode">
                            <span v-if="formData.messageTmpStatusCodeStr"
                                  :style="{'color':formData.messageTmpStatusCodeStr.split(';')[1]}">{{formData.messageTmpStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="提醒适合类型 :" prop="messageTmpTypeCode">
                            <span v-if="formData.messageTmpTypeCodeStr"
                                  :style="{'color':formData.messageTmpTypeCodeStr.split(';')[1]}">{{formData.messageTmpTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="发布时间 :" prop="publishedDt">
                            <span v-if="formData.publishedDt"> {{formData.publishedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.usedTimesNum">
                          <el-form-item label="被使用 :" prop="usedTimesNum">
                            <span v-if="formData.usedTimesNum">{{formData.usedTimesNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.sequnceNum">
                          <el-form-item label="序号 :" prop="sequnceNum">
                            <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
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
  import api from "./schoolsecuritymessagetmpUrl";
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
        messageTmpStatusCodeOptions: [{"label": "全部", "name": ""}],
        messageTmpStatusCode : null,
        messageTmpTypeCodeOptions: [{"label": "全部", "name": ""}],
        messageTmpTypeCode : null,
        formData:{
              messageTmpId:'',
              messageTmpTitle :"",
              imagePath :"",
              messageTmpContent :"",
              messageTmpStatusCode :"",
              messageTmpTypeCode :"",
              publishedDt :"",
              usedTimesNum :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              messageTmpTitle :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              messageTmpContent :
              [
                  {max: 2048, message: "最多能输入2048个字", trigger: "blur"},

              ],
              messageTmpStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              messageTmpTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              publishedDt :
              [

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
          commonApi.getCodeIntType("messageTmpStatus").then(res => {
            let viewList = res.data.data || [];
            for (let messageTmpStatusItem of viewList) {
              this.messageTmpStatusCodeOptions.push({
                "label": messageTmpStatusItem.codeDesc,
                "name": messageTmpStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("messageTmpType").then(res => {
            let viewList = res.data.data || [];
            for (let messageTmpTypeItem of viewList) {
              this.messageTmpTypeCodeOptions.push({
                "label": messageTmpTypeItem.codeDesc,
                "name": messageTmpTypeItem.codeId
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
