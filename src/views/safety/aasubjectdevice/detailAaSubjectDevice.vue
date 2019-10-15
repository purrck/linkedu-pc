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
            <el-form-item label=" :" prop="subjectId">
              <el-input v-model="formData.subjectId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="用户 :" prop="userName">
              <el-input v-model="formData.userName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="设备唯一id *  :" prop="macId">
              <el-input v-model="formData.macId" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="开启时间 :" prop="effectiveDt">
              <el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="失效时间 :" prop="expiryDt">
              <el-date-picker v-model="formData.expiryDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="设备状态 *  :" prop="deviceStatusCode">
              <el-select v-model="formData.deviceStatusCode" placeholder="请您选择">
                <el-option v-for="deviceStatusCodeItem in deviceStatusCodeOptions"
                           :key="deviceStatusCodeItem.name"
                           :label="deviceStatusCodeItem.label" :value="deviceStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上次登录时间 *  :" prop="lastLoginDt">
              <el-date-picker v-model="formData.lastLoginDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="设备型号 *  :" prop="mobileModel">
              <el-input v-model="formData.mobileModel" maxlength="32"></el-input>
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
            <el-form-item label="开启时间 :" prop="effectiveDt">
              <el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="失效时间 :" prop="expiryDt">
              <el-date-picker v-model="formData.expiryDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="设备状态 *  :" prop="deviceStatusCode">
              <el-select v-model="formData.deviceStatusCode" placeholder="请您选择">
                <el-option v-for="deviceStatusCodeItem in deviceStatusCodeOptions"
                           :key="deviceStatusCodeItem.name"
                           :label="deviceStatusCodeItem.label" :value="deviceStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="上次登录时间 *  :" prop="lastLoginDt">
              <el-date-picker v-model="formData.lastLoginDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
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


              <el-col :span="12" v-if="formData.subjectId">
                <el-form-item label=" :" prop="subjectId">
                  {{formData.subjectId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.deviceId">
                <el-form-item label="设备id :" prop="deviceId">
                  {{formData.deviceId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.userName">
                <el-form-item label="用户 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.macId">
                <el-form-item label="设备唯一id :" prop="macId">
                  {{formData.macId}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="开启时间 :" prop="effectiveDt">
                  {{formData.effectiveDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="失效时间 :" prop="expiryDt">
                  {{formData.expiryDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="设备状态 :" prop="deviceStatusCode"
                              :style="{'color':formData.deviceStatusCodeStr.split(';')[1]}">
                  {{formData.deviceStatusCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="上次登录时间 :" prop="lastLoginDt">
                  {{formData.lastLoginDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.mobileModel">
                <el-form-item label="设备型号 :" prop="mobileModel">
                  {{formData.mobileModel}}
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
  import api from "./aasubjectdeviceUrl";
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

        deviceStatusCodeOptions: [{"label": "全部", "name": ""}], deviceStatusCode: null,
        data: "",
        formData: {
          deviceId: '',
          effectiveDt: "",
          expiryDt: "",
          deviceStatusCode: "",
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
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          macId: [
            {required: true, message: "请您输入设备唯一id", trigger: "blur"},
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          effectiveDt: [],
          expiryDt: [],
          deviceStatusCode: [
            {required: true, message: "请您输入设备状态", trigger: "blur"},
            {max: 1, message: "最多能输入1个字", trigger: "blur"},

          ],
          lastLoginDt: [
            {required: true, message: "请您输入上次登录时间", trigger: "blur"},

          ],
          mobileModel: [
            {required: true, message: "请您输入设备型号", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

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
       commonApi.getCodeIntType("deviceStatus").then(res => {
        let viewList = res.data.data || [];
        for (let deviceStatusItem of viewList) {
          this.deviceStatusCodeOptions.push({
            "label": deviceStatusItem.codeDesc,
            "name": deviceStatusItem.codeId
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
