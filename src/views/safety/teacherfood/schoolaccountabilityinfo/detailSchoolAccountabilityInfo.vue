
                            
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="事件 *  :" prop="accountabilityInfoTitle">
                      <el-input class="input-v2-rao" v-model="formData.accountabilityInfoTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发生时间 *  :" prop="happenedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.happenedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="描述 *  :" prop="content"
                                  class="orgIntroduction">
                      <editor v-model="formData.content" :true-height="350"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="事件报告 :" prop="filePath">
                      <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="适用追究规则id :" prop="accountabilityRuleId">
                      <el-input class="input-v2-rao" v-model="formData.accountabilityRuleId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="适用追究规则 :" prop="accountabilityRuleTitle">
                      <el-input class="input-v2-rao" v-model="formData.accountabilityRuleTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处罚方式 :" prop="punishModelCode">
                      <el-select class="select-v2-rao" v-model="formData.punishModelCode" placeholder="请您选择">
                        <el-option v-for="punishModelCodeItem in punishModelCodeOptions"
                                   :key="punishModelCodeItem.name"
                                   :label="punishModelCodeItem.label" :value="punishModelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处罚金额 :" prop="punishAmount">
                      <el-input class="input-v2-rao" v-model="formData.punishAmount"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="事件状态 :" prop="accountabilityInfoStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.accountabilityInfoStatusCode" placeholder="请您选择">
                        <el-option v-for="accountabilityInfoStatusCodeItem in accountabilityInfoStatusCodeOptions"
                                   :key="accountabilityInfoStatusCodeItem.name"
                                   :label="accountabilityInfoStatusCodeItem.label" :value="accountabilityInfoStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="事件 *  :" prop="accountabilityInfoTitle">
                      <el-input class="input-v2-rao" v-model="formData.accountabilityInfoTitle"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发生时间 *  :" prop="happenedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.happenedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="描述 *  :" prop="content"
                                  class="orgIntroduction">
                      <editor v-model="formData.content" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="事件报告 :" prop="filePath">
                      <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处罚方式 :" prop="punishModelCode">
                      <el-select class="select-v2-rao" v-model="formData.punishModelCode" placeholder="请您选择">
                        <el-option v-for="punishModelCodeItem in punishModelCodeOptions"
                                   :key="punishModelCodeItem.name"
                                   :label="punishModelCodeItem.label" :value="punishModelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="处罚金额 :" prop="punishAmount">
                      <el-input class="input-v2-rao" v-model="formData.punishAmount"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="事件状态 :" prop="accountabilityInfoStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.accountabilityInfoStatusCode" placeholder="请您选择">
                        <el-option v-for="accountabilityInfoStatusCodeItem in accountabilityInfoStatusCodeOptions"
                                   :key="accountabilityInfoStatusCodeItem.name"
                                   :label="accountabilityInfoStatusCodeItem.label" :value="accountabilityInfoStatusCodeItem.name">
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
                      {{formData.accountabilityInfoTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.accountabilityInfoTitle">
                          <el-form-item label="事件 :" prop="accountabilityInfoTitle">
                            <span v-if="formData.accountabilityInfoTitle">{{formData.accountabilityInfoTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="发生时间 :" prop="happenedDt">
                            <span v-if="formData.happenedDt"> {{formData.happenedDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.content">
                          <el-form-item label="描述 :" prop="content">
                            <span v-if="formData.content" v-html="formData.content"></span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.filePath">
                          <el-form-item label="事件报告 :" prop="filePath">
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
                        <div class="p50" v-if="formData.accountabilityRuleTitle">
                          <el-form-item label="适用追究规则 :" prop="accountabilityRuleTitle">
                            <span v-if="formData.accountabilityRuleTitle">{{formData.accountabilityRuleTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="处罚方式 :" prop="punishModelCode">
                            <span v-if="formData.punishModelCodeStr"
                                  :style="{'color':formData.punishModelCodeStr.split(';')[1]}">{{formData.punishModelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.punishAmount">
                          <el-form-item label="处罚金额 :" prop="punishAmount">
                            <span v-if="formData.punishAmount">{{formData.punishAmount}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="事件状态 :" prop="accountabilityInfoStatusCode">
                            <span v-if="formData.accountabilityInfoStatusCodeStr"
                                  :style="{'color':formData.accountabilityInfoStatusCodeStr.split(';')[1]}">{{formData.accountabilityInfoStatusCodeStr.split(';')[0]}}</span>
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
                    <router-link :to="`/basedata/listSchoolAccountabilityPerson?accountabilityInfoId=`+
                                  formData.accountabilityInfoId">
                      <i class="iconfont icon-icon_liebiao"></i>责任追究干系人员
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
  import api from "./schoolaccountabilityinfoUrl";
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
        punishModelCodeOptions: [{"label": "全部", "name": ""}],
        punishModelCode : null,
        accountabilityInfoStatusCodeOptions: [{"label": "全部", "name": ""}],
        accountabilityInfoStatusCode : null,
        formData:{
              accountabilityInfoId:'',
              accountabilityInfoTitle :"",
              happenedDt :"",
              imagePath :"",
              content :"",
              filePath :"",
              punishModelCode :"",
              punishAmount :"",
              accountabilityInfoStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              accountabilityInfoTitle :
              [
                  {required: true, message: "请您输入事件", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              happenedDt :
              [
                  {required: true, message: "请您输入发生时间", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              content :
              [
                  {required: true, message: "请您输入描述", trigger: "blur"},
                  {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

              ],
              filePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              accountabilityRuleId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              accountabilityRuleTitle :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              punishModelCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              punishAmount :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              accountabilityInfoStatusCode :
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
          commonApi.getCodeIntType("punishModel").then(res => {
            let viewList = res.data.data || [];
            for (let punishModelItem of viewList) {
              this.punishModelCodeOptions.push({
                "label": punishModelItem.codeDesc,
                "name": punishModelItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("accountabilityInfoStatus").then(res => {
            let viewList = res.data.data || [];
            for (let accountabilityInfoStatusItem of viewList) {
              this.accountabilityInfoStatusCodeOptions.push({
                "label": accountabilityInfoStatusItem.codeDesc,
                "name": accountabilityInfoStatusItem.codeId
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
