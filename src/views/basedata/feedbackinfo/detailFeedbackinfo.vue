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
            <el-form-item label="问题标题 *  :" prop="title">
              <el-input v-model="formData.title" maxlength="255"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="问题类型 :" prop="feedType">
              <el-input v-model="formData.feedType" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="问题分类 :" prop="feedColumn">
              <el-input v-model="formData.feedColumn" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="反馈时间 :" prop="feedDt">
              <el-date-picker v-model="formData.feedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="置顶 :" prop="isTop">
              <el-select v-model="formData.isTop" placeholder="请您选择">
                <el-option v-for="isTopItem in ynOptions" :key="isTopItem.name"
                           :label="isTopItem.label" :value="isTopItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="序号 :" prop="sequence">
              <el-input v-model="formData.sequence" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="status">
              <el-input v-model="formData.status" maxlength="255"></el-input>
            </el-form-item>
          </el-col>



          <el-col :span="24" class="orgIntroduction" >
            <el-form-item label="问题内容 :" prop="detailInfo">
              <editor v-model="formData.detailInfo" :true-height="250"></editor>
            </el-form-item>
          </el-col>


          <el-col :span="23" class="orgIntroduction">
            <el-form-item label="回答内容 :" prop="replyInfo">
              <editor v-model="formData.replyInfo"  :true-height="250"></editor>
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
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="问题类型 :" prop="feedType">
              <el-input v-model="formData.feedType" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="问题分类 :" prop="feedColumn">
              <el-input v-model="formData.feedColumn" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="反馈时间 :" prop="feedDt">
              <el-date-picker v-model="formData.feedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="问题标题 *  :" prop="title">
              <el-input v-model="formData.title" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24" class="orgIntroduction" >
            <el-form-item label="问题内容 :" prop="detailInfo">
              <editor v-model="formData.detailInfo" :true-height="250"></editor>
            </el-form-item>
          </el-col>


          <el-col :span="23" class="orgIntroduction">
            <el-form-item label="回答内容 :" prop="replyInfo">
              <editor v-model="formData.replyInfo"  :true-height="250"></editor>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="日访问数 :" prop="dayRead">
              <el-input v-model="formData.dayRead"  disabled maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="周访问数 :" prop="weekRead">
              <el-input v-model="formData.weekRead" disabled maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="月访问数 :" prop="monthRead">
              <el-input v-model="formData.monthRead" disabled maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="总访问数 :" prop="allRead">
              <el-input v-model="formData.allRead" disabled maxlength="11"></el-input>
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
                <el-form-item label="问题标题 *  :" prop="title">
                  <span>{{formData.title}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="问题类型 :" prop="feedType">
                  <span>{{formData.feedType}}</span>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="问题分类 :" prop="feedColumn">
                  <span>{{formData.feedColumn}}</span>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="置顶 :" prop="isTop">
                  <span>{{formData.isTop}}</span>

                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="序号 :" prop="sequence">
                  <span>{{formData.sequence}}</span>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="状态 :" prop="status">
                  <span>{{formData.status}}</span>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="反馈时间 :" prop="feedDt">
                  {{formData.feedDt}}
                </el-form-item>
              </el-col>

              <el-col :span="24" class="orgIntroduction" >
                <el-form-item label="问题内容 :" prop="detailInfo">
                  <span v-html="formData.detailInfo"></span>
                </el-form-item>
              </el-col>


              <el-col :span="23" class="orgIntroduction">
                <el-form-item label="回答内容 :" prop="replyInfo">
                  <span v-html="formData.replyInfo"></span>
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
  import api from "./feedbackinfoUrl";
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

        ynOptions: [{"label": "全部", "name": ""}], isTop: null,
        data: "",
        formData: {
          id: '',
          feedType: "",
          feedColumn: "",
          feedDt: "",
          title: "",
          detailInfo: "",
          dayRead: "",
          weekRead: "",
          monthRead: "",
          allRead: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          feedType: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          feedColumn: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          feedDt: [],
          title: [
            {required: true, message: "请您输入问题标题", trigger: "blur"},
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          detailInfo: [
            {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

          ],
          isTop: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          sequence: [
            {validator: validation.number, trigger: "blur"},

          ],
          status: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          replyInfo: [
            {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

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
