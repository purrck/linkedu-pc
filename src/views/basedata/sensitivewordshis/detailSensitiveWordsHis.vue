<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="用户 *  :" prop="userId">
              <el-input class="input-v2-rao" v-model="formData.userId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="姓名 :" prop="userName">
              <el-input class="input-v2-rao" v-model="formData.userName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label=" 内容 *  :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提交时间 :" prop="commitedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.commitedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="服务地址 :" prop="serverAddress"
                          class="orgIntroduction">
              <editor v-model="formData.serverAddress" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="远程地址 :" prop="remoteAddress"
                          class="orgIntroduction">
              <editor v-model="formData.remoteAddress" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label=" :" prop="uri"
                          class="orgIntroduction">
              <editor v-model="formData.uri" :true-height="350"/>
            </el-form-item>
          </el-col>
        </el-form>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.userName">
                    <el-form-item label="姓名 :" prop="userName">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.content">
                    <el-form-item label=" 内容 :" prop="content">
                      <span v-if="formData.content" v-html="formData.content"></span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="提交时间 :" prop="commitedDt">
                      <span v-if="formData.commitedDt"> {{formData.commitedDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.serverAddress">
                    <el-form-item label="服务地址 :" prop="serverAddress">
                      <span v-if="formData.serverAddress" v-html="formData.serverAddress"></span>
                    </el-form-item>
                  </div>


                  <div class="p100" v-if="formData.remoteAddress">
                    <el-form-item label="远程地址 :" prop="remoteAddress">
                      <span v-if="formData.remoteAddress" v-html="formData.remoteAddress"></span>
                    </el-form-item>
                  </div>


                  <div class="p100" v-if="formData.uri">
                    <el-form-item label=" :" prop="uri">
                      <span v-if="formData.uri" v-html="formData.uri"></span>
                    </el-form-item>
                  </div>

                </div>
              </div>
            </el-form>
          </el-col>

        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./sensitivewordshisUrl";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'

  export default {
    components: {editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        formData: {
          hisId: '',
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          userId:
            [
              {required: true, message: "请您输入用户", trigger: "blur"},
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          userName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          content:
            [
              {required: true, message: "请您输入 内容", trigger: "blur"},
              {max: 20000, message: "最多能输入20000个字", trigger: "blur"},

            ],
          commitedDt:
            [],
          serverAddress:
            [
              {max: 21845, message: "最多能输入21845个字", trigger: "blur"},

            ],
          remoteAddress:
            [
              {max: 21845, message: "最多能输入21845个字", trigger: "blur"},

            ],
          uri:
            [
              {max: 21845, message: "最多能输入21845个字", trigger: "blur"},

            ],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
    created() {
      this.getDetail(this.$route.params.id);
    },
    methods: {
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
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          } else if (this.pageState === 'add' && valid) {
            this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
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
            }
            this.isLoaded = false;
          })
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .edit-box {
    padding: 40px;
    width: auto;

    .detail-title-v2 {
      background: #f5f5f5;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      margin-right: 40px;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 25px 25px 0 25px;
    }

  }



  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
