<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="用户群组 *  :" prop="groupId">
              <el-input v-model="formData.groupId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="用户群组名 *  :" prop="groupName">
              <el-input v-model="formData.groupName" maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="用户群组名 *  :" prop="groupName">
              <el-input v-model="formData.groupName" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="地址1 :" prop="address1">
              <el-input v-model="formData.address1" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="地址2 :" prop="address2">
              <el-input v-model="formData.address2" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="邮政编码 :" prop="postalCode">
              <el-select v-model="formData.postalCode" placeholder="请您选择">
                <el-option v-for="postalCodeItem in postalCodeOptions"
                           :key="postalCodeItem.name"
                           :label="postalCodeItem.label" :value="postalCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上级群组 :" prop="groupParentId">
              <el-input v-model="formData.groupParentId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="群组类型 :" prop="groupType">
              <el-input v-model="formData.groupType" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="群组标签 :" prop="groupLabel">
              <el-input v-model="formData.groupLabel" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'" class='mh500'>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="edit-form" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.groupId">
                <el-form-item label="用户群组 :" prop="groupId">
                  {{formData.groupId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.groupName">
                <el-form-item label="用户群组名 :" prop="groupName">
                  {{formData.groupName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.address1">
                <el-form-item label="地址1 :" prop="address1">
                  {{formData.address1}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.address2">
                <el-form-item label="地址2 :" prop="address2">
                  {{formData.address2}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.postalCode">
                <el-form-item label="邮政编码 :" prop="postalCode"
                              v-if="formData.postalCodeStr"
                              :style="{'color':formData.postalCodeStr.split(';')[1]}">
                  {{formData.postalCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.groupParentId">
                <el-form-item label="上级群组 :" prop="groupParentId">
                  {{formData.groupParentId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.groupType">
                <el-form-item label="群组类型 :" prop="groupType">
                  {{formData.groupType}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.groupLabel">
                <el-form-item label="群组标签 :" prop="groupLabel">
                  {{formData.groupLabel}}
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
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./aagroupUrl";
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

        postalCodeOptions: [{"label": "全部", "name": ""}], postalCode: null,
        data: "",
        formData: {
          groupId: '',
          groupName: "",
          address1: "",
          address2: "",
          postalCode: "",
          groupParentId: "",
          groupType: "",
          groupLabel: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          groupName: [
            {required: true, message: "请您输入用户群组名", trigger: "blur"},
            {max: 50, message: "最多能输入50个字", trigger: "blur"},

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
      commonApi.getCodeIntType("postal").then(res => {
        let viewList = res.data.data || [];
        for (let postalItem of viewList) {
          this.postalCodeOptions.push({
            "label": postalItem.codeDesc,
            "name": postalItem.codeId
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

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
                ()
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
                this.$router.go(-1)
                ()
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
              this.formData = res.data.data

              this.formData.groupId = this.data.groupId;


              this.formData.groupName = this.data.groupName;


              this.formData.address1 = this.data.address1;


              this.formData.address2 = this.data.address2;


              this.formData.postalCode = this.data.postalCode;


              this.formData.groupParentId = this.data.groupParentId;


              this.formData.groupType = this.data.groupType;


              this.formData.groupLabel = this.data.groupLabel;


              this.formData.appOrgId = this.data.appOrgId;


              this.formData.appId = this.data.appId;

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






  .ml80 {
    margin-left: 80px;
  }


</style>
