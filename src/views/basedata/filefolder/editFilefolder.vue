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
            <el-form-item label="文件夹 *  :" prop="folderName">
              <el-input v-model="formData.folderName" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="图标 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="描述 :" prop="description">
              <el-input v-model="formData.description" maxlength="2000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问密码 :" prop="setPassword">
              <el-input v-model="formData.setPassword" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="私有 :" prop="isSelf">
              <el-select v-model="formData.isSelf" placeholder="请您选择">
                <el-option v-for="isSelfItem in ynOptions" :key="isSelfItem.name"
                           :label="isSelfItem.label" :value="isSelfItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问问题 :" prop="setQuestion">
              <el-input v-model="formData.setQuestion" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问答案 :" prop="setAnswer">
              <el-input v-model="formData.setAnswer" maxlength="255"></el-input>
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
            <el-form-item label="文件夹 *  :" prop="folderName">
              <el-input v-model="formData.folderName" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="图标 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="描述 :" prop="description">
              <el-input v-model="formData.description" maxlength="2000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="文件个数 :" prop="filesNum">
              <el-input v-model="formData.filesNum" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问密码 :" prop="setPassword">
              <el-input v-model="formData.setPassword" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="私有 :" prop="isSelf">
              <el-select v-model="formData.isSelf" placeholder="请您选择">
                <el-option v-for="isSelfItem in ynOptions" :key="isSelfItem.name"
                           :label="isSelfItem.label" :value="isSelfItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问问题 :" prop="setQuestion">
              <el-input v-model="formData.setQuestion" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问答案 :" prop="setAnswer">
              <el-input v-model="formData.setAnswer" maxlength="255"></el-input>
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

              <el-col :span="12" v-if="data.folderName">
                <el-form-item label="文件夹 :" prop="folderName">
                  {{data.folderName}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.description">
                <el-form-item label="描述 :" prop="description">
                  {{data.description}}
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="图标 :" prop="imagePath">
                  <img :src="data.imagePath" alt="" width="84px" >
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="data.filesNum">
                <el-form-item label="文件个数 :" prop="filesNum">
                  {{data.filesNum}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.setPassword">
                <el-form-item label="访问密码 :" prop="setPassword">
                  {{data.setPassword}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="私有 :" prop="isSelf">
                  <div >
                    <el-switch v-model="data.isSelf == 'Y'" disabled></el-switch>
                  </div>

                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="data.setQuestion">
                <el-form-item label="访问问题 :" prop="setQuestion">
                  {{data.setQuestion}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.setAnswer">
                <el-form-item label="访问答案 :" prop="setAnswer">
                  {{data.setAnswer}}
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <router-link to="" class="current">
                  <img src="~@/assets/img/menu_quickly/icon_studentinfo.png" width="20"/>基本信息
                </router-link>
                <router-link :to="'/basedata/listEuploadfile?folderId='+formData.folderId" >
                  <img src="~@/assets/img/icon_add.png" width="20"/>其下文件
                </router-link>
              </ul>
            </div>
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
  import api from "./filefolderUrl";
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
        imagePathFileList: [],
        ynOptions: [{"label": "全部", "name": ""}], isSelf: null,
        data: "",
        formData: {
          folderId: '',
          folderName: "",
          imagePath: "",
          description: "",
          filesNum: "",
          setPassword: "",
          isSelf: "",
          setQuestion: "",
          setAnswer: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          folderName: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
            {required: true, message: "请您输入文件夹", trigger: "blur"},
          ],
          imagePath: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
          ],
          description: [
            {max: 2000, message: "只能输入2000个字", trigger: "blur"},
          ],
          setPassword: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
          ],
          isSelf: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
          ],
          setQuestion: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
          ],
          setAnswer: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
          ],
        }
      }
    },
    computed: {

      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor,upload},
    created() {
      this.getDetail(this.$route.params.id);
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
          if (this.pageState === "edit" && valid) {
                this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode == "000000") {
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
            if (res.data.resultCode === "000000") {
              this.data = res.data.data;
              this.formData = res.data.data;
              if (this.data.imagePath != "" && this.data.imagePath != null) {
                var imagePathFileInfo = {
                  "name": this.data.imagePath,
                  "url": this.data.imagePath
                };
                this.imagePathFileList.push(imagePathFileInfo);
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
