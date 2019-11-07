<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState == 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
          <el-col :span="12">
            <el-form-item label="文件夹 :" prop="folderId">
              <el-input v-model="formData.folderName" disabled maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="文件 *  :" prop="filePath">
              <uploads :data="formData.filePath"  @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="文件名 *  :" prop="fileName">
              <el-input v-model="formData.fileName"  maxlength="256"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="大小 *  :" prop="sizes">
              <el-input v-model="formData.sizes" disabled maxlength="23"></el-input>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState == 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="文件夹 :" prop="folderId">
              <el-input v-model="formData.folderName" disabled maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="文件 *  :" prop="filePath">
              <uploads :data="formData.filePath"  @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="文件名 *  :" prop="fileName">
              <el-input v-model="formData.fileName"  maxlength="256"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="大小 *  :" prop="sizes">
              <el-input v-model="formData.sizes" disabled maxlength="23"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState == 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="edit-form" label-width="165px"
                     ref="formData" :inline="true" :model="formData" :rules="rules" size="small">

              <el-col :span="12" v-if="formData.fileName">
                <el-form-item label="文件名 :" prop="fileName">
                  {{formData.fileName}}
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="文件类型 :" prop="filePath" v-if="formData.filePath">
                  {{formData.filePath.split('/')[formData.filePath.split('/').length-1].split('.')[1]}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.url">
                <el-form-item label="地址 :" prop="url">
                  {{formData.url}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.sizes">
                <el-form-item label="大小 :" prop="sizes">
                  {{toMb(formData.sizes)}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.folderId">
                <el-form-item label="文件夹 :" prop="folderId">
                  {{formData.folderName}}
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">

          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState == 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState == 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./euploadfileUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        appCodeOptions: [{"label": "全部", "name": ""}], appCode: null,
        typeCodeOptions: [{"label": "全部", "name": ""}], typeCode: null,
        formatCodeOptions: [{"label": "全部", "name": ""}], formatCode: null,
        filePathFileList: [],
        ynOptions: [{"label": "全部", "name": ""}], isSynchronous: null,
        data: "",
        folderId: "",
        formData: {
          fileId: '',
          fileName: "",
          filePath: "",
          url: "",
          sizes: "",
          acmPassword: "",
          isSynchronous: "", //是否同步
          folderId:'',
          folderName: this.$route.query.name,
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {}
      }
    },
    computed: {

      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor, upload, uploads},
    created() {
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("app").then(res => {
        let viewList = res.data.data || [] || [];
        for (let appItem of viewList) {
          this.appCodeOptions.push({
            "label": appItem.codeDesc,
            "name": appItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("type").then(res => {
        let viewList = res.data.data || [] || [];
        for (let typeItem of viewList) {
          this.typeCodeOptions.push({
            "label": typeItem.codeDesc,
            "name": typeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("format").then(res => {
        let viewList = res.data.data || [] || [];
        for (let formatItem of viewList) {
          this.formatCodeOptions.push({
            "label": formatItem.codeDesc,
            "name": formatItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [] || [];
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
      toMb: function (e) {
        if ((e / 1024 / 1024) < 1) {
          return (e / 1024).toString().substr(0,4) + 'KB'
        } else {
          return (e / 1024 / 1024).toString().substr(0,4) + 'MB'
        }
      },
      //图片上传
      getFileMessage(res) {
        let obj = res;
        // console.log('图片基本信息');
        // console.log(obj);
        // this.formData.fileName = res.urlurl.split('/')[res.urlurl.split('/').length-1];
        this.formData.filePath = res.urlurl;
        this.formData.url = res.urlurl;
        this.formData.sizes = res.size;
        this.formData.folderId = this.$route.params.id;
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
          if (this.pageState === "edit" && valid) {
                this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode == "000000") {
                this.formLoading = false;
                this.$message.success("添加成功");
                this.$router.go(-1)
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
              if (res.data.resultCode == "000000") {
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

      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode == "000000") {
              this.data = res.data.data;
              this.formData = res.data.data;
              this.formData.folderName = this.$route.query.name;
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }else{
          this.formData.folderId = this.$route.params.id;
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
