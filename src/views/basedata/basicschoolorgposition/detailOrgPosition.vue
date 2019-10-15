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


          <el-col :span="12">
            <el-form-item label="模板职位 :" prop="tempPositionId">
              <el-input v-model="formData.tempPositionId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="模板部门 :" prop="tempDepartId">
              <el-input v-model="formData.tempDepartId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">-->
            <!--<el-form-item label="部门 *  :" prop="departId">-->
              <!--<el-input v-model="formData.departId" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="部门 *  :" prop="departName">-->
              <!--<el-input v-model="formData.departName" maxlength="64"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="职位 *  :" prop="positionName">
              <el-input v-model="formData.positionName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">
            <el-form-item label="姓名 :" prop="userName">
              <el-input v-model="formData.userName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>-->


          <el-col :span="12">
            <el-form-item label="手机号 :" prop="telPhoneNum">
              <el-input v-model="formData.telPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="教师 :" prop="userName">
                <el-col :span="18">

              <el-input v-model="formData.userName" maxlength="32" disabled></el-input>
              </el-col>
              <el-col :span="6">
                  <role-dialog :url="'/user/teacherAd/page'" :params="{page:1,limit:10}" @callback="jsCallback">选择</role-dialog>
              </el-col>
          </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="用户id :" prop="userId">
              <el-input v-model="formData.userId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="描述 :" prop="description">
              <el-input v-model="formData.description" maxlength="2000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="序号 :" prop="sequnceNum">
              <el-input v-model="formData.sequnceNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="人员状态 :" prop="positionStatusCode">
              <el-select v-model="formData.positionStatusCode" placeholder="请您选择">
                <el-option v-for="positionStatusCodeItem in positionStatusCodeOptions"
                           :key="positionStatusCodeItem.name"
                           :label="positionStatusCodeItem.label" :value="positionStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="开始时间 :" prop="effectiveDt">
              <el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="截止时间 :" prop="expiryDt">
              <el-date-picker v-model="formData.expiryDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState == 'edit'" class="p80">
        <el-form :label-position="'right'"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="职位 *  :" prop="positionName">
              <el-input v-model="formData.positionName" disabled="disabled" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">
            <el-form-item label="姓名 :" prop="userName">
              <el-input v-model="formData.userName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>-->


          <el-col :span="12">
            <el-form-item label="手机号 :" prop="telPhoneNum">
              <el-input v-model="formData.telPhoneNum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="教师 :" prop="userName">
                <el-col :span="18">

              <el-input v-model="formData.userName" maxlength="32" disabled></el-input>
              </el-col>
              <el-col :span="6">
                  <el-button type="primary" size="small" @click="selectTeaChar" class="button-v2-rao border-color-cccccc c000000 bfff">选择</el-button>
                  <!--<role-dialog :url="'/user/teacherAd/page'" :params="{page:1,limit:10}" @callback="jsCallback">选择</role-dialog>-->
              </el-col>
          </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="人员状态 :" prop="positionStatusCode">
              <el-select v-model="formData.positionStatusCode" placeholder="请您选择">
                <el-option v-for="positionStatusCodeItem in positionStatusCodeOptions"
                           :key="positionStatusCodeItem.name"
                           :label="positionStatusCodeItem.label" :value="positionStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="描述 :" prop="description">
              <editor v-model="formData.description" :true-height="350"/>
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
            <el-form :label-position="'right'" class="" label-width="165px"
                     :inline="true" :model="formData" size="small">





              <el-col :span="12" v-if="formData.departName">
                <el-form-item label="部门 :" prop="departName">
                  {{formData.departName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.positionName">
                <el-form-item label="职位 :" prop="positionName">
                  {{formData.positionName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.userName">
                <el-form-item label="姓名 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.telPhoneNum">
                <el-form-item label="手机号 :" prop="telPhoneNum">
                  {{formData.telPhoneNum}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="人员状态 :" prop="positionStatusCode"
                              :style="{'color':formData.positionStatusCodeStr.split(';')[1]}">
                  {{formData.positionStatusCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.description">
                <el-form-item label="描述 :" prop="description">
                  <div v-html="formData.description"></div>
                </el-form-item>
              </el-col>




              


            </el-form>
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
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./basicschoolorgpositionUrl";
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

        positionStatusCodeOptions: [{"label": "全部", "name": ""}], positionStatusCode: null,
        data: "",
        formData: {
          positionId:null,
          positionName: "",
          userName: "",
          telPhoneNum: "",
          teacherId: "",
          description: "",
          sequnceNum: "",
          positionStatusCode: "",
          effectiveDt: "",
          expiryDt: "",
          teacherName : ""
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          tempPositionId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          tempDepartId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          departId: [
            {required: true, message: "请您输入部门", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          departName: [
            {required: true, message: "请您输入部门", trigger: "blur"},
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          positionName: [
            {required: true, message: "请您输入职位", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          telPhoneNum: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: validation.mobileNum, trigger: "blur"},

          ],
          teacherId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          description: [
            {max: 2000, message: "最多能输入2000个字", trigger: "blur"},

          ],
          sequnceNum: [
            {validator: validation.number, trigger: "blur"},

          ],
          positionStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          effectiveDt: [],
          expiryDt: [],
        }
      }
    },
    computed: {

      pageState() {
        return this.$route.query.type;
      },
      departId(){
        return this.$route.query.departId
      }
    },
    components: {editor, upload},
    created() {
      this.formData.departId = this.departId;
      this.getDetail(this.departId);
      commonApi.getCodeIntType("positionStatus").then(res => {
        let viewList = res.data.data || [];
        for (let positionStatusItem of viewList) {
          this.positionStatusCodeOptions.push({
            "label": positionStatusItem.codeDesc,
            "name": positionStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      selectTeaChar(){
        this.$callTeacherDialog({
            callback : (msg) => {
              this.formData.userName = msg.userName;
                this.formData.teacherId = msg.teacherId;
            }
        })
      },
      jsCallback(event){
        this.formData.userId = event.userId;
          this.formData.userName = event.userName;
                this.formData.teacherId = event.teacherId;
            },
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
      goBack() {
        this.$router.go(-1);
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
            if (res.data.resultCode == "000000") {

              res.data.data['teacherId'] = res.data.data.teacherId || "";
              //res.data.data['teacherName'] = res.data.data.teacherName || "";
              this.data = res.data.data;
              this.formData = res.data.data;


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


  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }


</style>
