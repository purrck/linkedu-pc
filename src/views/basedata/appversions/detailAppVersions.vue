<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="应用 :" prop="appId">
              <el-input v-model="formData.appId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="应用 :" prop="appName">
              <el-input v-model="formData.appName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="应用安装程序 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="版本 :" prop="versionInfo">
              <el-input v-model="formData.versionInfo" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="终端类型 :" prop="appdeviceTypeCode">
              <el-select v-model="formData.appdeviceTypeCode" placeholder="请您选择">
                <el-option v-for="appdeviceTypeCodeItem in appdeviceTypeCodeOptions"
                           :key="appdeviceTypeCodeItem.name"
                           :label="appdeviceTypeCodeItem.label" :value="appdeviceTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="包名 :" prop="packageName">
              <el-input v-model="formData.packageName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="升级内容 :" prop="updateContent">
              <el-input v-model="formData.updateContent" maxlength="2000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="发布时间 :" prop="releasedDt">
              <el-date-picker v-model="formData.releasedDt" type="datetime" placeholder="选择日期"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="版本数 :" prop="versioncode">
              <el-select v-model="formData.versioncode" placeholder="请您选择">
                <el-option v-for="versioncodeItem in versioncodeOptions"
                           :key="versioncodeItem.name"
                           :label="versioncodeItem.label" :value="versioncodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="文件大小kb :" prop="fileSize">
              <el-input v-model="formData.fileSize" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="加密码 :" prop="md5Value">
              <el-input v-model="formData.md5Value" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">



          <el-col :span="12">
            <el-form-item label="版本号 :" prop="versionInfo">
              <el-input v-model="formData.versionInfo" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="edit-form" label-width="165px"
                     :inline="true" :model="formData" size="small">

              <el-col :span="12" v-if="formData.appName">
                <el-form-item label="应用 :" prop="appName">
                  {{formData.appName}}
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="formData.filePath">
                <el-form-item label="应用安装程序 :" prop="filePath">
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
              </el-col>

              <el-col :span="12" v-if="formData.versionInfo">
                <el-form-item label="版本 :" prop="versionInfo">
                  {{formData.versionInfo}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.appdeviceTypeCodeStr">
                <el-form-item label="终端类型 :" prop="appdeviceTypeCode"
                              :style="{'color':formData.appdeviceTypeCodeStr.split(';')[1]}">
                  {{formData.appdeviceTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.packageName">
                <el-form-item label="包名 :" prop="packageName">
                  {{formData.packageName}}
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="formData.updateContent">
                <el-form-item label="升级内容 :" prop="updateContent">
                  {{formData.updateContent}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.releasedDt">
                <el-form-item label="发布时间 :" prop="releasedDt">
                  {{formData.releasedDt}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.usedTimes">
                <el-form-item label="使用人次 :" prop="usedTimes">
                  {{formData.usedTimes}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.approvedNum">
                <el-form-item label="喜欢人数 :" prop="approvedNum">
                  {{formData.approvedNum}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.opposedNum">
                <el-form-item label="不喜欢人数 :" prop="opposedNum">
                  {{formData.opposedNum}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.versioncodeStr">
                <el-form-item label="版本数 :" prop="versioncode" :style="{'color':formData.versioncodeStr.split(';')[1]}">
                  {{formData.versioncodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.fileSize">
                <el-form-item label="文件大小kb :" prop="fileSize">
                  {{formData.fileSize}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.md5Value">
                <el-form-item label="加密码 :" prop="md5Value">
                  {{formData.md5Value}}
                </el-form-item>
              </el-col>


            </el-form>
          </el-col>

        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./appversionsUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'

  export default {
    components: {editor, upload, uploads},
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        filePathFileList: [],
        filePathFileType: '',
        appdeviceTypeCodeOptions: [{"label": "全部", "name": ""}], appdeviceTypeCode: null,
        versioncodeOptions: [{"label": "全部", "name": ""}], versioncode: null,
        formData: {
          appVersionsId: '',
          filePath: "",
          usedTimes: "",
          approvedNum: "",
          opposedNum: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          appId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          appName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          filePath: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          versionInfo: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          appdeviceTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          packageName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          updateContent: [
            {max: 2000, message: "最多能输入2000个字", trigger: "blur"},

          ],
          releasedDt: [],
          versioncode: [
            {validator: validation.number, trigger: "blur"},

          ],
          fileSize: [
            {validator: validation.number, trigger: "blur"},

          ],
          md5Value: [
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
      commonApi.getCodeIntType("appdeviceType").then(res => {
        let viewList = res.data.data || [];
        for (let appdeviceTypeItem of viewList) {
          this.appdeviceTypeCodeOptions.push({
            "label": appdeviceTypeItem.codeDesc,
            "name": appdeviceTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("version").then(res => {
        let viewList = res.data.data || [];
        for (let versionItem of viewList) {
          this.versioncodeOptions.push({
            "label": versionItem.codeDesc,
            "name": versionItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      //图片上传
      uploadData(res) {
        this.formData.imagePath = res;
      },

      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === "edit" && valid) {
                this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add" && valid) {
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
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }
        })
        this.isLoaded = false;

      },


      getFileMessage(res) {
        let obj = res;
        // console.log('图片基本信息');
        // console.log(obj);
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
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 166px;
    border: 1px solid #d8d8d8;

    a.current {
      background: #4A9388;
      color: #fff
    }

    a {
      padding: 10px 0 10px 15px;
      font-size: 14px;
      display: block;

      img {
        padding-right: 8px;
        vertical-align: -4px;
      }

    }

    a:hover {
      text-decoration: none;
    }

  }

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }

  .width100 {
    width: 100%;
  }

  .form-table {
    margin-top: 20px;
  }

  .bm-view {
    width: 760px;
    height: 300px;
    margin-top: 10px;
  }
</style>
