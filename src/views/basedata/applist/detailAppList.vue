<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="12">
            <el-form-item label="应用 *  :" prop="appName">
              <el-input v-model="formData.appName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="标识图 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="文件 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="描述 :" prop="description">
              <el-input v-model="formData.description" maxlength="4000"></el-input>
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
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="应用 *  :" prop="appName">
              <el-input v-model="formData.appName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="标识图 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="文件 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="描述 :" prop="description">
              <el-input v-model="formData.description" maxlength="4000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="获取人次 :" prop="gotTimes">
              <el-input v-model="formData.gotTimes" maxlength="11"></el-input>
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
                  <span v-if="formData.appName">{{formData.appName}}</span>
                </el-form-item>
              </el-col>


              <el-col :span="24">
                <el-form-item label="标识图 :" prop="imagePath">
                  <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.filePath">
                <el-form-item label="文件 :" prop="filePath">
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

              <el-col :span="12" v-if="formData.description">
                <el-form-item label="描述 :" prop="description">
                  <span v-if="formData.description">{{formData.description}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.gotTimes">
                <el-form-item label="获取人次 :" prop="gotTimes">
                  <span v-if="formData.gotTimes">{{formData.gotTimes}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="交付时间 :" prop="expiryDt">
                  <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                </el-form-item>
              </el-col>


            </el-form>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="`/basedata/listAppUsers?appId=`+
                                    formData.appId">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>应用安装用户
                  </router-link>

                </li>
                <li>
                  <router-link :to="`/basedata/listAppRelatedContent?appId=`+
                                    formData.appId">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>应用关联文案
                  </router-link>

                </li>
                <li>
                  <router-link :to="`/basedata/listAppVersions?appId=`+
                                    formData.appId">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>应用版本
                  </router-link>

                </li>
                <li>
                  <router-link :to="`/basedata/listAppWelcomeTheme?appId=`+
                                    formData.appId">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>应用欢迎图集
                  </router-link>

                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center mb-15">
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
  import api from "./applistUrl";
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

        imagePathFileList: [],
        imagePathFileType: '',
        filePathFileList: [],
        filePathFileType: '',
        appdeviceTypeCodeOptions: [{"label": "全部", "name": ""}], appdeviceTypeCode: null,
        apptaskStatusCodeOptions: [{"label": "全部", "name": ""}], apptaskStatusCode: null,
        formData: {
          appId: '',
          appName: "",
          imagePath: "",
          filePath: "",
          description: "",
          gotTimes: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          appName: [
            {required: true, message: "请您输入应用", trigger: "blur"},
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          imagePath: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          filePath: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          description: [
            {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

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
      commonApi.getCodeIntType("apptaskStatus").then(res => {
        let viewList = res.data.data || [];
        for (let apptaskStatusItem of viewList) {
          this.apptaskStatusCodeOptions.push({
            "label": apptaskStatusItem.codeDesc,
            "name": apptaskStatusItem.codeId
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
        console.log('图片基本信息');
        console.log(obj);
        this.formData.imagePath = res.urlurl;
        this.formData.url = res.urlurl;
        this.formData.sizes = res.size;
        this.formData.folderId = this.$route.params.id;
      },

      getFileMessage(res) {
        let obj = res;
        console.log('图片基本信息');
        console.log(obj);
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
