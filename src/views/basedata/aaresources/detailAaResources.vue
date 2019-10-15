<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="访问资源 *  :" prop="resourceName">
              <el-input v-model="formData.resourceName" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="资源路径 :" prop="resourcePath">
              <el-input v-model="formData.resourcePath" maxlength="100"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="资源类型 *  :" prop="resourceType">
              <el-input v-model="formData.resourceType" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="有效时间 :" prop="effectiveFrom">
              <el-date-picker v-model="formData.effectiveFrom" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="截止时间 :" prop="effectiveTo">
              <el-date-picker v-model="formData.effectiveTo" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="需要登录级别 :" prop="reqLoginLevel">
              <el-input v-model="formData.reqLoginLevel" maxlength="23"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="属于群组 *  :" prop="belongTo">
              <el-input v-model="formData.belongTo" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="日志启动 *  :" prop="logEnabled">
              <el-input v-model="formData.logEnabled" maxlength="23"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="操作日子 *  :" prop="logTransaction">
              <el-input v-model="formData.logTransaction" maxlength="23"></el-input>
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
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="访问资源 *  :" prop="resourceName">
              <el-input v-model="formData.resourceName" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="资源路径 :" prop="resourcePath">
              <el-input v-model="formData.resourcePath" maxlength="100"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="资源类型 *  :" prop="resourceType">
              <el-input v-model="formData.resourceType" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="有效时间 :" prop="effectiveFrom">
              <el-date-picker v-model="formData.effectiveFrom" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="截止时间 :" prop="effectiveTo">
              <el-date-picker v-model="formData.effectiveTo" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="需要登录级别 :" prop="reqLoginLevel">
              <el-input v-model="formData.reqLoginLevel" maxlength="23"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="属于群组 *  :" prop="belongTo">
              <el-input v-model="formData.belongTo" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="日志启动 *  :" prop="logEnabled">
              <el-input v-model="formData.logEnabled" maxlength="23"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="操作日子 *  :" prop="logTransaction">
              <el-input v-model="formData.logTransaction" maxlength="23"></el-input>
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


              <el-col :span="12" v-if="formData.resourcesId">
                <el-form-item label="访问资源 :" prop="resourcesId">
                  {{formData.resourcesId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.resourceName">
                <el-form-item label="访问资源 :" prop="resourceName">
                  {{formData.resourceName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.resourcePath">
                <el-form-item label="资源路径 :" prop="resourcePath">
                  {{formData.resourcePath}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.resourceType">
                <el-form-item label="资源类型 :" prop="resourceType">
                  {{formData.resourceType}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.effectiveFrom">
                <el-form-item label="有效时间 :" prop="effectiveFrom">
                  {{formData.effectiveFrom}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.effectiveTo">
                <el-form-item label="截止时间 :" prop="effectiveTo">
                  {{formData.effectiveTo}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.reqLoginLevel">
                <el-form-item label="需要登录级别 :" prop="reqLoginLevel">
                  {{formData.reqLoginLevel}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.belongTo">
                <el-form-item label="属于群组 :" prop="belongTo">
                  {{formData.belongTo}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.logEnabled">
                <el-form-item label="日志启动 :" prop="logEnabled">
                  {{formData.logEnabled}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.logTransaction">
                <el-form-item label="操作日子 :" prop="logTransaction">
                  {{formData.logTransaction}}
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
  import api from "./aaresourcesUrl";
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
          resourcesId:null,
          resourceName: "",
          resourcePath: "",
          resourceType: "",
          effectiveFrom: "",
          effectiveTo: "",
          reqLoginLevel: "",
          belongTo: "",
          logEnabled: "",
          logTransaction: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          resourceName: [
            {required: true, message: "请您输入访问资源", trigger: "blur"},
            {max: 50, message: "最多能输入50个字", trigger: "blur"},

          ],
          resourcePath: [
            {max: 100, message: "最多能输入100个字", trigger: "blur"},

          ],
          resourceType: [
            {required: true, message: "请您输入资源类型", trigger: "blur"},
            {max: 50, message: "最多能输入50个字", trigger: "blur"},

          ],
          effectiveFrom: [],
          effectiveTo: [],
          reqLoginLevel: [
            {validator: validation.number, trigger: "blur"},

          ],
          belongTo: [
            {required: true, message: "请您输入属于群组", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          logEnabled: [
            {required: true, message: "请您输入日志启动", trigger: "blur"},
            {validator: validation.number, trigger: "blur"},

          ],
          logTransaction: [
            {required: true, message: "请您输入操作日子", trigger: "blur"},
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

              this.formData.resourcesId = this.data.resourcesId;


              this.formData.resourceName = this.data.resourceName;


              this.formData.resourcePath = this.data.resourcePath;


              this.formData.resourceType = this.data.resourceType;


              this.formData.effectiveFrom = this.data.effectiveFrom;


              this.formData.effectiveTo = this.data.effectiveTo;


              this.formData.reqLoginLevel = this.data.reqLoginLevel;


              this.formData.belongTo = this.data.belongTo;


              this.formData.logEnabled = this.data.logEnabled;


              this.formData.logTransaction = this.data.logTransaction;


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
