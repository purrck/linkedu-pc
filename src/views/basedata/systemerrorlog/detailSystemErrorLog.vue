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
            <el-form-item label="发生时间 :" prop="happenedDt">
              <el-date-picker v-model="formData.happenedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="错误日志 :" prop="errorContent">
              <el-input v-model="formData.errorContent" maxlength="2147483647"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="发生类名 :" prop="commandClass">
              <el-input v-model="formData.commandClass" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="是否已处理 :" prop="isHandled">
              <el-select v-model="formData.isHandled" placeholder="请您选择">
                <el-option v-for="isHandledItem in ynOptions" :key="isHandledItem.name"
                           :label="isHandledItem.label" :value="isHandledItem.name">
                </el-option>
              </el-select>
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
            <el-form-item label="是否已处理 :" prop="isHandled">
              <el-select v-model="formData.isHandled" placeholder="请您选择">
                <el-option v-for="isHandledItem in ynOptions" :key="isHandledItem.name"
                           :label="isHandledItem.label" :value="isHandledItem.name">
                </el-option>
              </el-select>
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
            <el-form :label-position="'right'" class=" " label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.logId">
                <el-form-item label="系统错误日志 :" prop="logId">
                  {{formData.logId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.happenedDt">
                <el-form-item label="发生时间 :" prop="happenedDt">
                  {{formData.happenedDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.isHandled">
                <el-form-item label="是否已处理 :" prop="isHandled">
                  <div v-if="formData.isHandled == 'Y'">
                    <el-switch v-model="formData.onSwitchStatus" disabled></el-switch>
                  </div>
                  <div v-else>
                    <el-switch v-model="formData.offSwitchStatus" disabled></el-switch>
                  </div>
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

              <el-col :span="24" v-if="formData.commandClass">
                <el-form-item label="发生类名 :" prop="commandClass">
                  {{formData.commandClass}}
                </el-form-item>
              </el-col>

              <div style="width: 100%;float: left;">
                <label class="el-form-item__label" style="width: 165px;">错误日志 :</label>
              </div>
              <div class="el-form-item__content" style="padding-left: 175px">
                {{formData.errorContent}}
              </div>

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
  import api from "./systemerrorlogUrl";
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

        ynOptions: [{"label": "全部", "name": ""}], isHandled: null,
        data: "",
        formData: {
          logId: '',
          isHandled: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          happenedDt: [],
          errorContent: [],
          commandClass: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          isHandled: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

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

            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1)

      }
    }
  }
</script>
<style lang="scss" scoped>






  .ml80 {
    margin-left: 80px;
  }


</style>
