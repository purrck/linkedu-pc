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
            <el-form-item label=" *  :" prop="uri">
              <el-input v-model="formData.uri" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="名称 :" prop="name">
              <el-input v-model="formData.name" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="需要监控 :" prop="isNeedAcc">
              <el-select v-model="formData.isNeedAcc" placeholder="请您选择">
                <el-option v-for="isNeedAccItem in ynOptions" :key="isNeedAccItem.name"
                           :label="isNeedAccItem.label" :value="isNeedAccItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问终端类型 :" prop="uriTypeCode">
              <el-select v-model="formData.uriTypeCode" placeholder="请您选择">
                <el-option v-for="uriTypeCodeItem in uriTypeCodeOptions"
                           :key="uriTypeCodeItem.name"
                           :label="uriTypeCodeItem.label" :value="uriTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="描述 :" prop="description">
              <el-input v-model="formData.description" maxlength="1024"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="参数规则 :" prop="paramsRules">
              <el-input v-model="formData.paramsRules" maxlength="1024"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="模块 :" prop="moduleName">
              <el-input v-model="formData.moduleName" maxlength="128"></el-input>
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
            <el-form-item label="名称 :" prop="name">
              <el-input v-model="formData.name" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="需要监控 :" prop="isNeedAcc">
              <el-select v-model="formData.isNeedAcc" placeholder="请您选择">
                <el-option v-for="isNeedAccItem in ynOptions" :key="isNeedAccItem.name"
                           :label="isNeedAccItem.label" :value="isNeedAccItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="访问终端类型 :" prop="uriTypeCode">
              <el-select v-model="formData.uriTypeCode" placeholder="请您选择">
                <el-option v-for="uriTypeCodeItem in uriTypeCodeOptions"
                           :key="uriTypeCodeItem.name"
                           :label="uriTypeCodeItem.label" :value="uriTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="描述 :" prop="description">
              <el-input v-model="formData.description" maxlength="1024"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="参数规则 :" prop="paramsRules">
              <el-input v-model="formData.paramsRules" maxlength="1024"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="模块 :" prop="moduleName">
              <el-input v-model="formData.moduleName" maxlength="128"></el-input>
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
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.uri">
                <el-form-item label=" :" prop="uri">
                  {{formData.uri}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.name">
                <el-form-item label="名称 :" prop="name">
                  {{formData.name}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="需要监控 :" prop="isNeedAcc">
                  <div v-if="formData.isNeedAcc == 'Y'">
                    <el-switch v-model="formData.onSwitchStatus" disabled></el-switch>
                  </div>
                  <div v-else>
                    <el-switch v-model="formData.offSwitchStatus" disabled></el-switch>
                  </div>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="访问终端类型 :" prop="uriTypeCode"
                              v-if="formData.uriTypeCodeStr"
                              :style="{'color':formData.uriTypeCodeStr.split(';')[1]}">
                  {{formData.uriTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.description">
                <el-form-item label="描述 :" prop="description">
                  {{formData.description}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.paramsRules">
                <el-form-item label="参数规则 :" prop="paramsRules">
                  {{formData.paramsRules}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.moduleName">
                <el-form-item label="模块 :" prop="moduleName">
                  {{formData.moduleName}}
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
  import api from "./accessmetricsuriUrl";
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

        ynOptions: [{"label": "全部", "name": ""}], isNeedAcc: null,
        uriTypeCodeOptions: [{"label": "全部", "name": ""}], uriTypeCode: null,
        data: "",
        formData: {
          uri: null,
          name: "",
          isNeedAcc: "",
          uriTypeCode: "",
          description: "",
          paramsRules: "",
          moduleName: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          name: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          isNeedAcc: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

          ],
          uriTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          description: [
            {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

          ],
          paramsRules: [
            {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

          ],
          moduleName: [
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
      commonApi.getCodeIntType("uriType").then(res => {
        let viewList = res.data.data || [];
        for (let uriTypeItem of viewList) {
          this.uriTypeCodeOptions.push({
            "label": uriTypeItem.codeDesc,
            "name": uriTypeItem.codeId
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
              this.formData.uri = res.data.data;

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
