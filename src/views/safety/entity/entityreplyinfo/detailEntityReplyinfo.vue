<template>
  <div>
    <div class="edit-box">


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.entityId">
                <el-form-item label="信息 :" prop="entityId">
                  {{formData.entityId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.replyId">
                <el-form-item label="信息评论 :" prop="replyId">
                  {{formData.replyId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.parentId">
                <el-form-item label="上级id :" prop="parentId">
                  {{formData.parentId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.userId">
                <el-form-item label="用户 :" prop="userId">
                  {{formData.userId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.userName">
                <el-form-item label="用户 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.content">
                <el-form-item label="评论内容 :" prop="content">
                  {{formData.content}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="发布时间 :" prop="publishedDt">
                  {{formData.publishedDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.publishedIp">
                <el-form-item label="发布ip :" prop="publishedIp">
                  {{formData.publishedIp}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="推荐 :" prop="isRecommend">
                  <div v-if="formData.isRecommend == 'Y'">
                    <el-switch v-model="formData.onSwitchStatus" disabled></el-switch>
                  </div>
                  <div v-else>
                    <el-switch v-model="formData.offSwitchStatus" disabled></el-switch>
                  </div>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="引用 :" prop="isQuoted">
                  <div v-if="formData.isQuoted == 'Y'">
                    <el-switch v-model="formData.onSwitchStatus" disabled></el-switch>
                  </div>
                  <div v-else>
                    <el-switch v-model="formData.offSwitchStatus" disabled></el-switch>
                  </div>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="转发 :" prop="isForwarded">
                  <div v-if="formData.isForwarded == 'Y'">
                    <el-switch v-model="formData.onSwitchStatus" disabled></el-switch>
                  </div>
                  <div v-else>
                    <el-switch v-model="formData.offSwitchStatus" disabled></el-switch>
                  </div>
                </el-form-item>
              </el-col>


              <el-col :span="24">
                <el-form-item label="图片 :" prop="imagePath">
                  <img :src="formData.imagePath" alt="" width="100px">
                </el-form-item>
              </el-col>


              <el-col :span="24">
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


              <el-col :span="12" v-if="formData.entityType">
                <el-form-item label="信息类型 :" prop="entityType">
                  {{formData.entityType}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.entityName">
                <el-form-item label="信息类型 :" prop="entityName">
                  {{formData.entityName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.appOrgId">
                <el-form-item label="机构 :" prop="appOrgId">
                  {{formData.appOrgId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.appId">
                <el-form-item label="应用 :" prop="appId">
                  {{formData.appId}}
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
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./entityreplyinfoUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        ynOptions: [{"label": "全部", "name": ""}], isRecommend: null,
        ynOptions: [{"label": "全部", "name": ""}], isQuoted: null,
        ynOptions: [{"label": "全部", "name": ""}], isForwarded: null,
        imagePathFileList: [],
        imagePathFileType: '',
        filePathFileList: [],
        filePathFileType: '',
        data: "",
        formData: {
          replyId: '',
          content: "",
          publishedDt: "",
          publishedIp: "",
          isRecommend: "",
          isQuoted: "",
          isForwarded: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          entityId: [
            {required: true, message: "请您输入信息", trigger: "blur"},
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          userId: [
            {required: true, message: "请您输入用户", trigger: "blur"},
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          userName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          content: [
            {required: true, message: "请您输入评论内容", trigger: "blur"},
            {max: 2000, message: "最多能输入2000个字", trigger: "blur"},

          ],
          publishedDt: [],
          publishedIp: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          isRecommend: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

          ],
          isQuoted: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

          ],
          isForwarded: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

          ],
          imagePath: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          filePath: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          entityType: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          entityName: [
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
    components: {editor, upload},
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
      }, res => {
        this.$message.error(res.data.message);
      });
       commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
       commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
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
      //编辑器
      getEditorValue(val) {
        this.formData.content = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
        this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === '000000') {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === 'add' && valid) {
                this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === '000000') {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
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


      imagePathRemove(file, fileList) {
      },

      imagePathSucc(response, file) {
        this.formData.imagePath = response.data.data;
      },

      filePathRemove(file, fileList) {
      },

      filePathSucc(response, file) {
        this.formData.filePath = response.data.data;
      },


      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === '000000') {
              this.data = res.data.data;
              this.formData = res.data.data;

              if (this.data.imagePath != "" && this.data.imagePath != null) {
                var imagePathFileInfo = {
                  "name": this.data.imagePath,
                  "url": this.data.imagePath
                };
                this.imagePathFileList.push(imagePathFileInfo);
              }


              if (this.data.filePath != "" && this.data.filePath != null) {
                var filePathFileInfo = {
                  "name": this.data.filePath,
                  "url": this.data.filePath
                };
                this.filePathFileList.push(filePathFileInfo);
              }

            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>






  .ml80 {
    margin-left: 80px;
  }


</style>
