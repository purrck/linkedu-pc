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
            <el-form-item label="用户 :" prop="userId">
              <el-input v-model="formData.userId" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="用户 :" prop="userName">
              <el-input v-model="formData.userName" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="应用 :" prop="appId">
              <el-input v-model="formData.appId" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="应用 :" prop="appName">
              <el-input v-model="formData.appName" maxlength="255"></el-input>
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
            <el-form-item label="版本 :" prop="versionInfo">
              <el-input v-model="formData.versionInfo" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="下载时间 :" prop="downloadDt">
              <el-date-picker v-model="formData.downloadDt" type="datetime" placeholder="选择日期"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="登录次数 :" prop="loginTimes">
              <el-input v-model="formData.loginTimes" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上次应用时间 :" prop="lastUsedDt">
              <el-date-picker v-model="formData.lastUsedDt" type="datetime" placeholder="选择日期"
                              :picker-options="pickTime"></el-date-picker>
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
            <el-form-item label="登录次数 :" prop="loginTimes">
              <el-input v-model="formData.loginTimes" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上次应用时间 :" prop="lastUsedDt">
              <el-date-picker v-model="formData.lastUsedDt" type="datetime" placeholder="选择日期"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="体验说明 :" prop="experience">
              <el-input v-model="formData.experience" maxlength="4000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="token :" prop="token">
              <el-input v-model="formData.token" maxlength="64"></el-input>
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

              <el-col :span="12" v-if="formData.userName">
                <el-form-item label="用户 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.appName">
                <el-form-item label="应用 :" prop="appName">
                  {{formData.appName}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.appdeviceTypeCode">
                <el-form-item label="终端类型 :" prop="appdeviceTypeCode"
                              :style="{'color':formData.appdeviceTypeCodeStr.split(';')[1]}">
                  {{formData.appdeviceTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.versionInfo">
                <el-form-item label="版本 :" prop="versionInfo">
                  {{formData.versionInfo}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.downloadDt">
                <el-form-item label="下载时间 :" prop="downloadDt">
                  {{formData.downloadDt}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.loginTimes">
                <el-form-item label="登录次数 :" prop="loginTimes">
                  {{formData.loginTimes}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.lastUsedDt">
                <el-form-item label="上次应用时间 :" prop="lastUsedDt">
                  {{formData.lastUsedDt}}
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="formData.experience">
                <el-form-item label="体验说明 :" prop="experience">
                  {{formData.experience}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.token">
                <el-form-item label="token :" prop="token">
                  {{formData.token}}
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
  import api from "./appusersUrl";
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

        appdeviceTypeCodeOptions: [{"label": "全部", "name": ""}], appdeviceTypeCode: null,
        formData: {
          id: '',
          loginTimes: "",
          lastUsedDt: "",
          experience: "",
          token: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          userId: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          userName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          appId: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          appName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          appdeviceTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          versionInfo: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          downloadDt: [],
          loginTimes: [],
          lastUsedDt: [],
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
