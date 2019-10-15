<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState == 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <!--          <el-col :span="12">-->
          <!--            <el-form-item label="机构部门模板 *  :" prop="orgDepartTempId">-->
          <!--              <el-input v-model="formData.orgDepartTempId" maxlength="32"></el-input>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->


          <el-col :span="12">
            <el-form-item label="机构部门模板 *  :" prop="orgDepartTempName">
              <el-input v-model="formData.orgDepartTempName" maxlength="32" disabled></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="部门名称 *  :" prop="tempDepartName">
              <el-input v-model="formData.tempDepartName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上级部门 :" prop="parentId">
              <el-input v-model="formData.parentId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上级部门 :" prop="parentName">
              <el-input v-model="formData.parentName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="部门描述 *  :" prop="description">
              <el-input v-model="formData.description" maxlength="2000"></el-input>
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
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="12">
            <el-form-item label="机构部门模板 *  :" prop="orgDepartTempName">
              <el-input v-model="formData.orgDepartTempName" maxlength="32" disabled></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="部门名称 *  :" prop="tempDepartName">
              <el-input v-model="formData.tempDepartName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上级部门 :" prop="parentId">
              <el-input v-model="formData.parentId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上级部门 :" prop="parentName">
              <el-input v-model="formData.parentName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="部门描述 *  :" prop="description">
              <el-input v-model="formData.description" maxlength="2000"></el-input>
            </el-form-item>
          </el-col>

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
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.tempDepartId">
                <el-form-item label="模板部门 :" prop="tempDepartId">
                  {{formData.tempDepartId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.orgDepartTempId">
                <el-form-item label="模板 :" prop="orgDepartTempId">
                  {{formData.orgDepartTempId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.orgDepartTempName">
                <el-form-item label="模板名称 :" prop="orgDepartTempName">
                  {{formData.orgDepartTempName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.tempDepartName">
                <el-form-item label="部门名称 :" prop="tempDepartName">
                  {{formData.tempDepartName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.parentId">
                <el-form-item label="上级部门 :" prop="parentId">
                  {{formData.parentId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.parentName">
                <el-form-item label="上级部门 :" prop="parentName">
                  {{formData.parentName}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.description">
                <el-form-item label="部门描述 :" prop="description">
                  {{formData.description}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.sequnceNum">
                <el-form-item label="序号 :" prop="sequnceNum">
                  {{formData.sequnceNum}}
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

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="'/basedata/listTempPosition?tempDepartId='+formData.tempDepartId+'&tempDepartName='+formData.tempDepartName">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>模板部门
                  </router-link>
                </li>
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
  import api from "./orgdeparttempdepartUrl";
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

        data: "",
        formData: {
          tempDepartId: '',
          tempDepartName: "",
          parentId: "",
          parentName: "",
          description: "",
          sequnceNum: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          // orgDepartTempId: [
          //   {required: true, message: "请您输入模板", trigger: "blur"},
          //   {max: 32, message: "最多能输入32个字", trigger: "blur"},
          // ],
          orgDepartTempName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          tempDepartName: [
            {required: true, message: "请您输入部门名称", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          parentId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          parentName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          description: [
            {required: true, message: "请您输入部门描述", trigger: "blur"},
            {max: 2000, message: "最多能输入2000个字", trigger: "blur"},

          ],
          sequnceNum: [
            {required: true, message: "请您输入序号", trigger: "blur"},
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
    components: {editor, upload},
    created() {
      this.getDetail(this.$route.params.id);
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
            this.formData.orgDepartTempId = this.$route.query.orgDepartTempId
            this.formData.orgDepartTempName = this.$route.query.orgDepartTempName
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
              this.formData.tempDepartId = this.data.tempDepartId;
              this.formData.orgDepartTempId = this.data.orgDepartTempId;
              this.formData.orgDepartTempName = this.data.orgDepartTempName;
              this.formData.tempDepartName = this.data.tempDepartName;
              this.formData.parentId = this.data.parentId;
              this.formData.parentName = this.data.parentName;
              this.formData.description = this.data.description;
              this.formData.sequnceNum = this.data.sequnceNum;
              this.formData.appOrgId = this.data.appOrgId;
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        } else {
          let query = this.$route.query;
          for (let item in query) {
            this.formData[item] = query[item]
          }
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
