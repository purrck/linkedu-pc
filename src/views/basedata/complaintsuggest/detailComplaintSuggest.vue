<template>
  <div>
    <div class="edit-box">

      <div v-if="pageState == 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="edit-form" label-width="165px"
                     :inline="true" :model="formData" size="small">

              <el-col :span="12">
                <el-form-item label="投诉日期 :" prop="complaintDt">
                  {{formData.complaintDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="投诉原因 :" prop="complaintCasueCode">
                  <!--{{formData.complaintCasueCodeStr.split(';')[0]}}-->
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投诉状态 :" prop="complaintStatusCode">
                  <!--{{formData.complaintStatusCodeStr.split(';')[0]}}-->
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="投诉描述 :" prop="complaintStatusCode">
                  <!--{{formData.complaintStatusCodeStr.split(';')[0]}}-->
                  {{formData.complaintContent}}
                </el-form-item>
              </el-col>


            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li><a href="javascript:void(0)" class="current"><img src="~@/assets/img/menu_quickly/icon_wteacher.png" width="20"/>基本信息</a>
                <!--<li><router-link :to="`/basedata/detailComplaintReply/detail/${formData.complaintId}`"><img src="~@/assets/img/menu_quickly/icon_studentinfo.png" width="20"/>回执详情</router-link></li>-->
                <li><router-link :to="`/basedata/listComplaintReply?complaintId=${formData.complaintId}`"><img src="~@/assets/img/menu_quickly/icon_studentinfo.png" width="20"/>回执详情</router-link></li>
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
  import api from "./complaintsuggestUrl";
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
        // getFileUrl: commonApi.getFileUrl(),
        // getImageUrl: commonApi.getImageUrl(),

        complaintCasueCodeOptions: [{"label": "全部", "name": ""}], complaintCasueCode: null,
        complaintStatusCodeOptions: [{"label": "全部", "name": ""}], complaintStatusCode: null,
        ynOptions: [{"label": "全部", "name": ""}], isReplied: null,
        complaintUserTypeCodeOptions: [{"label": "全部", "name": ""}], complaintUserTypeCode: null,
        appTypeCodeOptions: [{"label": "全部", "name": ""}], appTypeCode: null,
        data: "",
        formData: {
          complaintId: '',
          complaintStatusCode: "",
          isReplied: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          complaintNums: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          complaintUserId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          complaintUserName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          complaintUserContact: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          complaintClientMac: [
            {max: 256, message: "最多能输入256个字", trigger: "blur"},

          ],
          complaintDt: [],
          entityId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityName: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          entityType: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          complaintCasueCode: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

          ],
          complaintContent: [
            {max: 900, message: "最多能输入900个字", trigger: "blur"},

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
      commonApi.getCodeIntType("complaintCasue").then(res => {
        let viewList = res.data.data || [];
        for (let complaintCasueItem of viewList) {
          this.complaintCasueCodeOptions.push({
            "label": complaintCasueItem.codeDesc,
            "name": complaintCasueItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("complaintStatus").then(res => {
        let viewList = res.data.data || [];
        for (let complaintStatusItem of viewList) {
          this.complaintStatusCodeOptions.push({
            "label": complaintStatusItem.codeDesc,
            "name": complaintStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
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
      commonApi.getCodeIntType("complaintUserType").then(res => {
        let viewList = res.data.data || [];
        for (let complaintUserTypeItem of viewList) {
          this.complaintUserTypeCodeOptions.push({
            "label": complaintUserTypeItem.codeDesc,
            "name": complaintUserTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("appType").then(res => {
        let viewList = res.data.data || [];
        for (let appTypeItem of viewList) {
          this.appTypeCodeOptions.push({
            "label": appTypeItem.codeDesc,
            "name": appTypeItem.codeId
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
            if (res.data.resultCode == "000000") {
              this.data = res.data.data;
              this.formData = res.data.data;
              this.formData.complaintStatusCode = this.data.complaintStatusCode;
              this.formData.isReplied = this.data.isReplied;
              this.formData.version = this.data.version;
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
