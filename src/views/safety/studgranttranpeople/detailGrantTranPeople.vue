<template>
  <div>
    <div class="edit-box">


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">


            <!--{{formData.peopleName}}-->
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">

                  <div class="p50" v-if="formData.peopleName">
                    <el-form-item label="姓名 :" prop="peopleName">
                      <span v-if="formData.peopleName">{{formData.peopleName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.gender">
                    <el-form-item label="性别 :" prop="gender">
                      <span v-if="formData.gender">{{formData.gender}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.peoplePhonenum">
                    <el-form-item label="手机号 :" prop="peoplePhonenum">
                      <span v-if="formData.peoplePhonenum">{{formData.peoplePhonenum}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.peopleCid">
                    <el-form-item label="身份证 :" prop="peopleCid">
                      <span v-if="formData.peopleCid">{{formData.peopleCid}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.peopleRemark">
                    <el-form-item label="特征 :" prop="peopleRemark">
                      <span v-if="formData.peopleRemark">{{formData.peopleRemark}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.verificationNums">
                    <el-form-item label="验证码 :" prop="verificationNums">
                      <span v-if="formData.verificationNums">{{formData.verificationNums}}</span>
                    </el-form-item>
                  </div>


                  <div class="p50">
                    <el-form-item label="已经转发 :" prop="isTransmit">
                      <el-switch v-model="formData.isTransmit == 'Y'" disabled></el-switch>
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
        <el-button type="primary"  class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
                   size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./studgranttranpeopleUrl";
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

        ynOptions: [{"label": "全部", "name": ""}], isTransmit: null,
        formData: {
          granttranPeopleId: '',
          peopleName: "",
          gender: "",
          peoplePhonenum: "",
          peopleCid: "",
          peopleRemark: "",
          verificationNums: "",
          isTransmit: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          peopleName: [
            {required: true, message: "请您输入姓名", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          gender: [
            {required: true, message: "请您输入性别", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          peoplePhonenum: [
            {required: true, message: "请您输入手机号", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},
            {validator: validation.mobileNum, trigger: "blur"},

          ],
          peopleCid: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          peopleRemark: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          verificationNums: [
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
                //this.$message.error(res.data.message);
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
