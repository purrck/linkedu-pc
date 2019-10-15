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


              <el-col :span="12" v-if="formData.subjectId">
                <el-form-item label="用户 :" prop="subjectId">
                  {{formData.subjectId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.loginId">
                <el-form-item label="登录 :" prop="loginId">
                  {{formData.loginId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.userName">
                <el-form-item label="用户 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.loginValue">
                <el-form-item label="登录值 :" prop="loginValue">
                  {{formData.loginValue}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.loginName">
                <el-form-item label="登录名 :" prop="loginName">
                  {{formData.loginName}}
                </el-form-item>
              </el-col>


              <el-col :span="12"  v-if="formData.otherLoginCodeStr">
                <el-form-item label="其他认证平台 :" prop="otherLoginCode"
                              :style="{'color':formData.otherLoginCodeStr.split(';')[1]}">
                  {{formData.otherLoginCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.effectiveDt">
                <el-form-item label="开始时间 :" prop="effectiveDt">
                  {{formData.effectiveDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.expiryDt">
                <el-form-item label="截止时间 :" prop="expiryDt">
                  {{formData.expiryDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.otherLoginStatusCode">
                <el-form-item label="登录状态 :" prop="otherLoginStatusCode"
                              :style="{'color':formData.otherLoginStatusCodeStr.split(';')[1]}">
                  {{formData.otherLoginStatusCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.joinLoginDt">
                <el-form-item label="加入登录时间 :" prop="joinLoginDt">
                  {{formData.joinLoginDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12"  v-if="formData.lastLoginDt">
                <el-form-item label="最近登录时间 :" prop="lastLoginDt">
                  {{formData.lastLoginDt}}
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
  import api from "./aasubjectotherloginUrl";
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

        otherLoginCodeOptions: [{"label": "全部", "name": ""}], otherLoginCode: null,
        otherLoginStatusCodeOptions: [{"label": "全部", "name": ""}], otherLoginStatusCode: null,
        data: "",
        formData: {
          loginId: '',
          effectiveDt: "",
          expiryDt: "",
          otherLoginStatusCode: "",
          joinLoginDt: "",
          lastLoginDt: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          subjectId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          loginValue: [
            {required: true, message: "请您输入登录值", trigger: "blur"},
            {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

          ],
          loginName: [
            {required: true, message: "请您输入登录名", trigger: "blur"},
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          otherLoginCode: [
            {required: true, message: "请您输入其他认证平台", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          effectiveDt: [],
          expiryDt: [],
          otherLoginStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          joinLoginDt: [],
          lastLoginDt: [],
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
       commonApi.getCodeIntType("otherLogin").then(res => {
        let viewList = res.data.data || [];
        for (let otherLoginItem of viewList) {
          this.otherLoginCodeOptions.push({
            "label": otherLoginItem.codeDesc,
            "name": otherLoginItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
       commonApi.getCodeIntType("otherLoginStatus").then(res => {
        let viewList = res.data.data || [];
        for (let otherLoginStatusItem of viewList) {
          this.otherLoginStatusCodeOptions.push({
            "label": otherLoginStatusItem.codeDesc,
            "name": otherLoginStatusItem.codeId
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

      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === '000000') {
              this.data = res.data.data;
              this.formData = this.data;
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
