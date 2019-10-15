

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="食品 :" prop="poductId">
                      <el-input class="input-v2-rao" v-model="formData.poductId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="食品 :" prop="poductName">
                      <el-input class="input-v2-rao" v-model="formData.poductName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="食品类型 :" prop="poductTypeId">
                      <el-input class="input-v2-rao" v-model="formData.poductTypeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="食品类型 :" prop="poductTypeName">
                      <el-input class="input-v2-rao" v-model="formData.poductTypeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="供应商 :" prop="poductSupplierId">
                      <el-input class="input-v2-rao" v-model="formData.poductSupplierId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="供应商 :" prop="poductSupplierName">
                      <el-input class="input-v2-rao" v-model="formData.poductSupplierName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="供货日期 :" prop="poductDayDt">
                      <el-input class="input-v2-rao" v-model="formData.poductDayDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="使用开始时间 :" prop="effectiveDt">
                      <el-input class="input-v2-rao" v-model="formData.effectiveDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="使用截止时间 :" prop="expiryDt">
                      <el-input class="input-v2-rao" v-model="formData.expiryDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="食品状态 :" prop="poductDailyStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.poductDailyStatusCode" placeholder="请您选择">
                        <el-option v-for="poductDailyStatusCodeItem in poductDailyStatusCodeOptions"
                                   :key="poductDailyStatusCodeItem.name"
                                   :label="poductDailyStatusCodeItem.label" :value="poductDailyStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="数量 :" prop="quantityTotal">
                      <el-input class="input-v2-rao" v-model="formData.quantityTotal"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="单位 :" prop="quantityUnit">
                      <el-input class="input-v2-rao" v-model="formData.quantityUnit"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
<el-col :span="24">
                    <el-form-item label="食品 :" prop="poductId">
                      <el-input class="input-v2-rao" v-model="formData.poductId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="食品 :" prop="poductName">
                      <el-input class="input-v2-rao" v-model="formData.poductName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="食品类型 :" prop="poductTypeId">
                      <el-input class="input-v2-rao" v-model="formData.poductTypeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="食品类型 :" prop="poductTypeName">
                      <el-input class="input-v2-rao" v-model="formData.poductTypeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="供应商 :" prop="poductSupplierId">
                      <el-input class="input-v2-rao" v-model="formData.poductSupplierId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="供应商 :" prop="poductSupplierName">
                      <el-input class="input-v2-rao" v-model="formData.poductSupplierName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="供货日期 :" prop="poductDayDt">
                      <el-input class="input-v2-rao" v-model="formData.poductDayDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="使用开始时间 :" prop="effectiveDt">
                      <el-input class="input-v2-rao" v-model="formData.effectiveDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="使用截止时间 :" prop="expiryDt">
                      <el-input class="input-v2-rao" v-model="formData.expiryDt"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="商品唯一码 :" prop="uniqueNumScan">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.uniqueNumScan"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="24">
                    <el-form-item label="食品状态 :" prop="poductDailyStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.poductDailyStatusCode" placeholder="请您选择">
                        <el-option v-for="poductDailyStatusCodeItem in poductDailyStatusCodeOptions"
                                   :key="poductDailyStatusCodeItem.name"
                                   :label="poductDailyStatusCodeItem.label" :value="poductDailyStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="数量 :" prop="quantityTotal">
                      <el-input class="input-v2-rao" v-model="formData.quantityTotal"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="单位 :" prop="quantityUnit">
                      <el-input class="input-v2-rao" v-model="formData.quantityUnit"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="24">
                    <el-form-item label="食品状态 :" prop="poductDailyStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.poductDailyStatusCode" placeholder="请您选择">
                        <el-option v-for="poductDailyStatusCodeItem in poductDailyStatusCodeOptions"
                                   :key="poductDailyStatusCodeItem.name"
                                   :label="poductDailyStatusCodeItem.label" :value="poductDailyStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="数量 :" prop="quantityTotal">
                      <el-input class="input-v2-rao" v-model="formData.quantityTotal"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="单位 :" prop="quantityUnit">
                      <el-input class="input-v2-rao" v-model="formData.quantityUnit"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>-->

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
                      {{formData.poductName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.poductName">
                          <el-form-item label="食品 :" prop="poductName">
                            <span v-if="formData.poductName">{{formData.poductName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.poductTypeName">
                          <el-form-item label="食品类型 :" prop="poductTypeName">
                            <span v-if="formData.poductTypeName">{{formData.poductTypeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.poductSupplierName">
                          <el-form-item label="供应商 :" prop="poductSupplierName">
                            <span v-if="formData.poductSupplierName">{{formData.poductSupplierName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.poductDayDt">
                          <el-form-item label="供货日期 :" prop="poductDayDt">
                            <span v-if="formData.poductDayDt">{{formData.poductDayDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.effectiveDt">
                          <el-form-item label="使用开始时间 :" prop="effectiveDt">
                            <span v-if="formData.effectiveDt">{{formData.effectiveDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.expiryDt">
                          <el-form-item label="使用截止时间 :" prop="expiryDt">
                            <span v-if="formData.expiryDt">{{formData.expiryDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="商品唯一码 :" prop="uniqueNumScan">
                            <vue-qr :text="`warehousing&${formData.schoolPoductDailyId}`" :size="150"
                                    :margin="0"
                                    :logoSrc="src2" :logoScale="sca2"
                                    v-if="formData.uniqueNumScan"></vue-qr>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="食品状态 :" prop="poductDailyStatusCode">
                            <span v-if="formData.poductDailyStatusCodeStr"
                                  :style="{'color':formData.poductDailyStatusCodeStr.split(';')[1]}">{{formData.poductDailyStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.quantityTotal">
                          <el-form-item label="数量 :" prop="quantityTotal">
                            <span v-if="formData.quantityTotal">{{formData.quantityTotal}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.quantityUnit">
                          <el-form-item label="单位 :" prop="quantityUnit">
                            <span v-if="formData.quantityUnit">{{formData.quantityUnit}}</span>
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
  import api from "./schoolpoductdailyUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
    import VueQr from 'vue-qr';
  export default {
      components: {VueQr, editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        src2: require('../../../../assets/img/icon-logo-1.png'),
        sca2: 0.25,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        poductDailyStatusCodeOptions: [{"label": "全部", "name": ""}], poductDailyStatusCode : null,
        formData:{
              schoolPoductDailyId:'',
              poductDailyStatusCode :"",
              quantityTotal :"",
              quantityUnit :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              poductId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              poductName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              poductTypeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              poductTypeName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              poductSupplierId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              poductSupplierName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              poductDayDt :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              effectiveDt :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              expiryDt :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              uniqueNumScan :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              poductDailyStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              quantityTotal :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              quantityUnit :
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
          commonApi.getCodeIntType("poductDailyStatus").then(res => {
            let viewList = res.data.data || [];
            for (let poductDailyStatusItem of viewList) {
              this.poductDailyStatusCodeOptions.push({
                "label": poductDailyStatusItem.codeDesc,
                "name": poductDailyStatusItem.codeId
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
