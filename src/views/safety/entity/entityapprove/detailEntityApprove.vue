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
            <el-form-item label="信息类型 *  :" prop="entityTypeId">
              <el-input v-model="formData.entityTypeId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="信息类型 :" prop="entityCnName">
              <el-input v-model="formData.entityCnName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="信息类型 :" prop="entityEnName">
              <el-input v-model="formData.entityEnName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="信息实体 *  :" prop="entityId">
              <el-input v-model="formData.entityId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="信息实体 *  :" prop="entityName">
              <el-input v-model="formData.entityName" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="信息实体版本 *  :" prop="entityVersion">
              <el-input v-model="formData.entityVersion" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="审批前状态 *  :" prop="preStatus">
              <el-input v-model="formData.preStatus" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="审批后状态 *  :" prop="nextStatus">
              <el-input v-model="formData.nextStatus" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="审批信息 *  :" prop="approveContent">
              <el-input v-model="formData.approveContent" maxlength="512"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="审批时间 :" prop="approvedDt">
              <el-date-picker v-model="formData.approvedDt" type="datetime" placeholder="选择日期"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="审批人 :" prop="userId">
              <el-input v-model="formData.userId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="审批人 :" prop="userName">
              <el-input v-model="formData.userName" maxlength="32"></el-input>
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
            <el-form-item label="审批信息 *  :" prop="approveContent">
              <el-input v-model="formData.approveContent" maxlength="512"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="审批时间 :" prop="approvedDt">
              <el-date-picker v-model="formData.approvedDt" type="datetime" placeholder="选择日期"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'" class='mh500' >
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">

              <el-col :span="12" v-if="formData.preStatus">
                <el-form-item label="审批前状态 :" prop="preStatus">
                  {{formData.preStatus}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.nextStatus">
                <el-form-item label="审批后状态 :" prop="nextStatus">
                  {{formData.nextStatus}}
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="formData.approveContent">
                <el-form-item label="审批信息 :" prop="approveContent">
                  {{formData.approveContent}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.approvedDt">
                <el-form-item label="审批时间 :" prop="approvedDt">
                  {{formData.approvedDt}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.userName">
                <el-form-item label="审批人 :" prop="userName">
                  {{formData.userName}}
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
  import api from "./entityapproveUrl";
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

        formData: {
          approveId: '',
          approveContent: "",
          approvedDt: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          entityTypeId: [
            {required: true, message: "请您输入信息类型", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityCnName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          entityEnName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          entityId: [
            {required: true, message: "请您输入信息实体", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityName: [
            {required: true, message: "请您输入信息实体", trigger: "blur"},
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          entityVersion: [
            {required: true, message: "请您输入信息实体版本", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          preStatus: [
            {required: true, message: "请您输入审批前状态", trigger: "blur"},
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          nextStatus: [
            {required: true, message: "请您输入审批后状态", trigger: "blur"},
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          approveContent: [
            {required: true, message: "请您输入审批信息", trigger: "blur"},
            {max: 512, message: "最多能输入512个字", trigger: "blur"},

          ],
          approvedDt: [],
          userId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userName: [
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
    },
    methods: {
      //图片上传
      uploadData(res) {
        this.formData.imagePath = res;
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
          } else if (this.pageState === 'add' && valid) {
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
              this.formData = res.data.data


              this.formData.approvedDt = this.data.approvedDt;


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

  .width100 {
    width: 100%;
  }

  .form-table {
    margin-top: 20px;
  }

  .bm-view {
    width: 760px;
    height: 300px;
    margin-top: 10px;
  }
</style>
