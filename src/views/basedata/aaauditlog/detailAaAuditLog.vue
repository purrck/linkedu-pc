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
            <el-form-item label="类 :" prop="className">
              <el-input v-model="formData.className" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="操作内容 :" prop="message">
              <el-input v-model="formData.message" maxlength="4000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="操作级别 :" prop="auditLevel">
              <el-input v-model="formData.auditLevel" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="操作时间 :" prop="auditDate">
              <el-date-picker v-model="formData.auditDate" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"

                              :picker-options="pickTime"></el-date-picker>
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


              <el-col :span="12" v-if="formData.auditLogId">
                <el-form-item label="id :" prop="auditLogId">
                  {{formData.auditLogId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.className">
                <el-form-item label="类 :" prop="className">
                  {{formData.className}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.message">
                <el-form-item label="操作内容 :" prop="message">
                  {{formData.message}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.auditLevel">
                <el-form-item label="操作级别 :" prop="auditLevel">
                  {{formData.auditLevel}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.auditDate">
                <el-form-item label="操作时间 :" prop="auditDate">
                  {{formData.auditDate}}
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
  import api from "./aaauditlogUrl";
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
          auditLogId: '',
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          className: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          message: [
            {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

          ],
          auditLevel: [
            {max: 50, message: "最多能输入50个字", trigger: "blur"},

          ],
          auditDate: [],
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

              this.formData.auditLogId = this.data.auditLogId;


              this.formData.className = this.data.className;


              this.formData.message = this.data.message;


              this.formData.auditLevel = this.data.auditLevel;


              this.formData.auditDate = this.data.auditDate;


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


</style>
