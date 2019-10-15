
                  
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师id :" prop="teacherId">
                      <el-input class="input-v2-rao" v-model="formData.teacherId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="教师 :" prop="teacherName">
                      <el-input class="input-v2-rao" v-model="formData.teacherName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="教师用户id :" prop="teacherUserId">
                      <el-input class="input-v2-rao" v-model="formData.teacherUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="职位 :" prop="teacherPositionName">
                      <el-input class="input-v2-rao" v-model="formData.teacherPositionName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="干系说明 :" prop="content"
                                  class="orgIntroduction">
                      <editor v-model="formData.content" :true-height="350"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="职位 :" prop="teacherPositionName">
                      <el-input class="input-v2-rao" v-model="formData.teacherPositionName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="干系说明 :" prop="content"
                                  class="orgIntroduction">
                      <editor v-model="formData.content" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>

          </el-form>
        </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                      {{formData.teacherName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherPositionName">
                          <el-form-item label="职位 :" prop="teacherPositionName">
                            <span v-if="formData.teacherPositionName">{{formData.teacherPositionName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.content">
                          <el-form-item label="干系说明 :" prop="content">
                            <span v-if="formData.content" v-html="formData.content"></span>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.sequnceNum">
                          <el-form-item label="序号 :" prop="sequnceNum">
                            <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
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
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="medium"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./schoolaccountabilitypersonUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  //import preview from '@/util/preview';
  export default {
      components: {editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        formData:{
              accountabilityPersonId:'',
              teacherPositionName :"",
              content :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              teacherId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherPositionName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              content :
              [
                  {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

              ],
              sequnceNum :
              [
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
   // directives: {preview},
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

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
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
