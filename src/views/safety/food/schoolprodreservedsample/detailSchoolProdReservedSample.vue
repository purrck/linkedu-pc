<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="学校食品 :" prop="schoolProductDailyId">
              <el-input class="input-v2-rao" v-model="formData.schoolProductDailyId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="食品 :" prop="productId">
              <el-input class="input-v2-rao" v-model="formData.productId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="食品 :" prop="productName">
              <el-input class="input-v2-rao" v-model="formData.productName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="食品类型 :" prop="productTypeId">
              <el-input class="input-v2-rao" v-model="formData.productTypeId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="食品类型 :" prop="productTypeName">
              <el-input class="input-v2-rao" v-model="formData.productTypeName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商 :" prop="productSupplierId">
              <el-input class="input-v2-rao" v-model="formData.productSupplierId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="供应商 :" prop="productSupplierName">
              <el-input class="input-v2-rao" v-model="formData.productSupplierName"
                        maxlength="32"></el-input>
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
                  {{formData.productName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.productName">
                    <el-form-item label="食品 :" prop="productName">
                      <span v-if="formData.productName">{{formData.productName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.productTypeName">
                    <el-form-item label="食品类型 :" prop="productTypeName">
                      <span v-if="formData.productTypeName">{{formData.productTypeName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.productSupplierName">
                    <el-form-item label="供应商 :" prop="productSupplierName">
                      <span v-if="formData.productSupplierName">{{formData.productSupplierName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.quantityTotal">
                    <el-form-item label="留样数量 :" prop="quantityTotal ">
                      <span v-if="formData.quantityTotal">{{formData.quantityTotal+formData.quantityUnit}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.reservedDt">
                    <el-form-item label="留样时间 :" prop="reservedDt">
                      <span v-if="formData.reservedDt">{{formData.reservedDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.expiryDt">
                    <el-form-item label="销毁时间 :" prop="expiryDt">
                      <span v-if="formData.expiryDt">{{formData.expiryDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="唯一码 :" prop="uniqueNumScan">
                      <vue-qr :text="formData.uniqueNumScan" height="200" width="200"
                              v-if="formData.uniqueNumScan"></vue-qr>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="留样状态 :" prop="reservedSampleStatusCode">
                            <span v-if="formData.reservedSampleStatusCodeStr"
                                  :style="{'color':formData.reservedSampleStatusCodeStr.split(';')[1]}">{{formData.reservedSampleStatusCodeStr.split(';')[0]}}</span>
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
  import api from "./schoolprodreservedsampleUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch,} from 'vue-baidu-map';
  import VueQr from 'vue-qr';

  export default {
    components: {
      BaiduMap,
      BmNavigation,
      BmMarker,
      BmInfoWindow,
      BmGeolocation,
      BmLocalSearch,
      VueQr,
      editor,
      upload,
      uploads
    },
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        reservedSampleStatusCodeOptions: [{"label": "全部", "name": ""}], reservedSampleStatusCode: null,
        formData: {
          reservedSampleId: '',
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          schoolProductDailyId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          productId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          productName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          productTypeId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          productTypeName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          productSupplierId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          productSupplierName:
            [
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
      commonApi.getCodeIntType("reservedSampleStatus").then(res => {
        let viewList = res.data.data || [];
        for (let reservedSampleStatusItem of viewList) {
          this.reservedSampleStatusCodeOptions.push({
            "label": reservedSampleStatusItem.codeDesc,
            "name": reservedSampleStatusItem.codeId
          });
        }
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
