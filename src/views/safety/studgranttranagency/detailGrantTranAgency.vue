<template>
  <div>
    <div class="edit-box">


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">


            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  <span v-if="formData.agencyName">{{formData.agencyName}}</span>
                </div>
                <div class="detail-item-v2">

                  <div class="p50">
                    <el-form-item label="商标 :" prop="isGotInfo">
                      <img src="http://183.6.116.27:33/group1/M00/00/0B/wKgCwVw8JhiAQX-yACUdkbsv_EM357.png" alt="" width="200">
                    </el-form-item>
                  </div>

                </div>
              </div>
              <div class="p100">
                <div class="detail-title-v2 ">
                  机构信息
                </div>
                <div class="detail-item-v2">

                  <div class="p33" v-if="formData.peopleName">
                    <el-form-item label="机构ID :" prop="agencyId">
                      <span v-if="formData.peopleName">{{formData.agencyId}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="机构类型 :" prop="agencyTypeCode">
                      <span v-if="formData.agencyTypeCodeStr"
                            :style="{'color':formData.agencyTypeCodeStr.split(';')[1]}">{{formData.agencyTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>


                  <div class="p33" v-if="formData.peopleName">
                    <el-form-item label="联系人 :" prop="peopleName">
                      <span v-if="formData.peopleName">{{formData.peopleName}}</span>
                    </el-form-item>
                  </div>


                  <div class="p33" v-if="formData.peoplePhonenum">
                    <el-form-item label="联系电话 :" prop="peoplePhonenum">
                      <span v-if="formData.peoplePhonenum">{{formData.peoplePhonenum}}</span>
                    </el-form-item>
                  </div>


                  <div class="p33" v-if="formData.peopleRemark">
                    <el-form-item label="授权状态 :" prop="peopleRemark">
                      <el-switch v-model="formData.isGotInfo == 'Y'" disabled></el-switch>
                    </el-form-item>
                  </div>


                  <div class="p33">
                    <el-form-item label="最近授权 :" prop="isGotInfo">
                      <span v-if="formData.peoplePhonenum">{{formData.peoplePhonenum}}</span>
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
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
                   size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./studgranttranagencyUrl";
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

        agencyTypeCodeOptions: [{"label": "全部", "name": ""}], agencyTypeCode: null,
        ynOptions: [{"label": "全部", "name": ""}], isGotInfo: null,
        formData: {
          granttranAgencyId: '',
          agencyTypeCode: "",
          agencyId: "",
          agencyName: "",
          peopleName: "",
          gender: "",
          peoplePhonenum: "",
          peopleCid: "",
          peopleRemark: "",
          verificationNums: "",
          carId: "",
          isGotInfo: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          agencyTypeCode: [
            {required: true, message: "请您输入机构类型", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          agencyId: [
            {required: true, message: "请您输入机构", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          agencyName: [
            {required: true, message: "请您输入机构", trigger: "blur"},
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
      commonApi.getCodeIntType("agencyType").then(res => {
        let viewList = res.data.data || [];
        for (let agencyTypeItem of viewList) {
          this.agencyTypeCodeOptions.push({
            "label": agencyTypeItem.codeDesc,
            "name": agencyTypeItem.codeId
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
