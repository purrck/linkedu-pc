

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="食品商品名称 *  :" prop="productName">
                      <el-input class="input-v2-rao" v-model="formData.productName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 *  :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="食品类型 :" prop="productTypeId">
                      <!--<el-input class="input-v2-rao" v-model="formData.productTypeId"-->
                                <!--maxlength="32"></el-input>-->
                      <el-select class="select-v2-rao" v-model="formData.productTypeId" placeholder="请您选择">
                        <el-option v-for="item in productTypeIdOptions"
                                   :key="item.value"
                                   :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="食品类型 :" prop="productTypeName">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.productTypeName"-->
                                <!--maxlength="32"></el-input>-->
                      <!---->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="24">
                    <el-form-item label="供应商 :" prop="productSupplierId">
                      <!--<el-input class="input-v2-rao" v-model="formData.productSupplierId"-->
                                <!--maxlength="32"></el-input>-->
                      <el-select class="select-v2-rao" v-model="formData.productSupplierId" placeholder="请您选择">
                        <el-option v-for="item in productSupplierOptions"
                                   :key="item.value"
                                   :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="供应商 :" prop="productSupplierName">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.productSupplierName"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="24">
                    <el-form-item label="描述 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="食品商品 *  :" prop="productName">
                      <el-input class="input-v2-rao" v-model="formData.productName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 *  :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="描述 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
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
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.productName">
                          <el-form-item label="食品商品 :" prop="productName">
                            <span v-if="formData.productName">{{formData.productName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
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

                        <div class="p100" v-if="formData.description">
                          <el-form-item label="描述 :" prop="description">
                            <span v-if="formData.description" v-html="formData.description"></span>
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
  import api from "./productinfoUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {coverData} from '@/util/util'

  export default {
      components: {editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        imagePathFileList :[],
        productSupplierOptions :[],
        productTypeIdOptions :[],
        imagePathFileType:'',
        formData:{
              productId:'',
              productTypeId:'',
              productName :"",
              productSupplierId:"",
              imagePath :"",
              description :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              productName :
              [
                  {required: true, message: "请您输入食品商品", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {required: true, message: "请您输入图片", trigger: "blur"},
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              productTypeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              productTypeName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              productSupplierId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              productSupplierName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              description :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

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
      commonApi.commonRequest('/sm/foodSecurity/productSupplierAd/page','get',{page:1,limit:999}).then(res=>{
        this.productSupplierOptions = coverData(res.data.data.records, 'productSupplierName', 'productSupplierId')
      })
      commonApi.commonRequest('/sm/foodSecurity/productTypeAd/page','get',{page:1,limit:999}).then(res=>{
        this.productTypeIdOptions = coverData(res.data.data.records, 'productTypeName', 'productTypeId')
      })


      if(this.$route.params.id!=='0'){
        this.getDetail(this.$route.params.id);
      }else{
        let query = this.$route.query;
        for (let item in query) {
          this.formData[item] = query[item]
          console.log(this.formData[item])

        }
      }
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
