
<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">


          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">




										<el-col :span="24">
                    <el-form-item many='1' v-show='false' >
                      <el-input class="input-v2-rao" name="securityOrganizationId" v-model="formData.securityOrganizationId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>


                  <el-col :span="24">
                    <el-form-item many='1' label="联系人 *  :" prop="contactName">
                      <el-input  class="input-v2-rao" v-model="formData.contactName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="联系电话 *  :" prop="contactPhonenum">
                      <el-input class="input-v2-rao" v-model="formData.contactPhonenum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="头像 :" prop="imagePath">
                      <upload :many=1 v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="更新时间 :" prop="refreshedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.refreshedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">

                  </el-col>
          </el-form>
        </div>


      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="联系人 *  :" prop="contactName">
              <el-input class="input-v2-rao" v-model="formData.contactName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系电话 *  :" prop="contactPhonenum">
              <el-input class="input-v2-rao" v-model="formData.contactPhonenum"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="头像 :" prop="imagePath">
              <upload  v-on:uploadData="uploadData" :many="1" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="更新时间 :" prop="refreshedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.refreshedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">

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
                  {{formData.contactName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.contactName">
                    <el-form-item label="联系人 :" prop="contactName">
                      <span v-if="formData.contactName">{{formData.contactName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.contactPhonenum">
                    <el-form-item label="联系电话 :" prop="contactPhonenum">
                      <span v-if="formData.contactPhonenum">{{formData.contactPhonenum}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="头像 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="更新时间 :" prop="refreshedDt">
                      <span v-if="formData.refreshedDt"> {{formData.refreshedDt}}</span>
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
  import api from "./securityorganizationcontactUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
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

        imagePathFileList: [],
        imagePathFileType: '',
        formData: {
          organizationContactId: '',
          securityOrganizationId: '',
          contactName: "",
          contactPhonenum: "",
          imagePath: "",
          refreshedDt: "",
          sequnceNum: "",
        },


        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              contactName :
              [
                  {required: true, message: "请您输入联系人", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              contactPhonenum :
              [
                  {required: true, message: "请您输入联系电话", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},
                  {validator: validation.mobileNum, trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 32000, message: "请添加头像", trigger: "blur"},

              ],
              refreshedDt :
              [

              ],
              sequnceNum :
              [
                  {validator: validation.number, trigger: "blur"},

            ],
          contactPhonenum:
            [
              {required: true, message: "请您输入联系电话", trigger: "blur"},
              {validator: validation.mobileNum, trigger: "blur"},
            ],
          imagePath:
            [
              {required: true, message: "请添加头像", trigger: "blur"},
            ],
          refreshedDt:
            [],
          sequnceNum:
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
    created() {
      this.getDetail(this.$route.params.id);


      this.formData.securityOrganizationId=this.$route.params.id

      // // console.log(this.formData.securityOrganizationId)
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
                this.$message.success("添加成功");
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
      //获取图片上传信息
      uploadData(res) {
        this.formData.imagePath = res;
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
