<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState == 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="投诉记录id :" prop="complaintId">
              <el-input v-model="formData.complaintId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="投诉编号 :" prop="complaintNums">
              <el-input v-model="formData.complaintNums" maxlength="100"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="投诉客户id :" prop="complaintUserId">
              <el-input v-model="formData.complaintUserId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="投诉客户名称 :" prop="complaintUserName">
              <el-input v-model="formData.complaintUserName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="回复内容 :" prop="replyContent">
              <el-input v-model="formData.replyContent" maxlength="4000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="回复日期 :" prop="replyDt">
              <el-date-picker v-model="formData.replyDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="回复人 :" prop="replyUserId">
              <el-input v-model="formData.replyUserId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="回复人姓名 :" prop="replyUserName">
              <el-input v-model="formData.replyUserName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="处理状态 :" prop="replyStatusCode">
              <el-select v-model="formData.replyStatusCode" placeholder="请您选择">
                <el-option v-for="replyStatusCodeItem in replyStatusCodeOptions"
                           :key="replyStatusCodeItem.name"
                           :label="replyStatusCodeItem.label" :value="replyStatusCodeItem.name">
                </el-option>
              </el-select>
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
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="回复内容 :" prop="replyContent">
              <el-input v-model="formData.replyContent" maxlength="4000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="回复日期 :" prop="replyDt">
              <el-date-picker v-model="formData.replyDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="处理状态 :" prop="replyStatusCode">
              <el-select v-model="formData.replyStatusCode" placeholder="请您选择">
                <el-option v-for="replyStatusCodeItem in replyStatusCodeOptions"
                           :key="replyStatusCodeItem.name"
                           :label="replyStatusCodeItem.label" :value="replyStatusCodeItem.name">
                </el-option>
              </el-select>
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
            <el-form :label-position="'right'" class="edit-form" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12">
                <el-form-item label="回复日期 :" prop="replyDt">
                  {{formData.replyDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="处理状态 :" prop="replyStatusCode">
                  <span v-if="formData.replyStatusCodeStr">
                    {{formData.replyStatusCodeStr.split(';')[0]}}
                  </span>
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>

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
  import api from "./complaintreplyUrl";
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

        replyStatusCodeOptions: [{"label": "全部", "name": ""}], replyStatusCode: null,
        data: "",
        formData: {
          replyId: '',
          replyContent: "",
          replyDt: "",
          replyStatusCode: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          complaintId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          complaintNums: [
            {max: 100, message: "最多能输入100个字", trigger: "blur"},

          ],
          complaintUserId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          complaintUserName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          replyContent: [
            {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

          ],
          replyDt: [],
          replyUserId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          replyUserName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          replyStatusCode: [
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
       commonApi.getCodeIntType("replyStatus").then(res => {
        let viewList = res.data.data || [];
        for (let replyStatusItem of viewList) {
          this.replyStatusCodeOptions.push({
            "label": replyStatusItem.codeDesc,
            "name": replyStatusItem.codeId
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
              this.formData.replyContent = this.data.replyContent;
              this.formData.replyDt = this.data.replyDt;
              this.formData.replyStatusCode = this.data.replyStatusCode;
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
