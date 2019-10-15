

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


                  <el-col :span="24">
                    <el-form-item label="菜谱 *  :" prop="menuId">
                      <el-select class="select-v2-rao" v-model="formData.menuId" placeholder="请您选择">
                        <el-option v-for="item in menuOptions"
                                   :key="item.value"
                                   :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="食品商品类型 *  :" prop="productTypeId">
                      <el-select class="select-v2-rao" v-model="formData.productTypeId" placeholder="请您选择">
                        <el-option v-for="item in productTypeIdOptions"
                                   :key="item.value"
                                   :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

            <el-col :span="24">
              <el-form-item label="菜谱 *  :" prop="menuId">
                <el-select class="select-v2-rao" v-model="formData.menuId" placeholder="请您选择">
                  <el-option v-for="item in menuOptions"
                             :key="item.value"
                             :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="食品商品类型 *  :" prop="productTypeId">
                <el-select class="select-v2-rao" v-model="formData.productTypeId" placeholder="请您选择">
                  <el-option v-for="item in productTypeIdOptions"
                             :key="item.value"
                             :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
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
                      {{formData.productTypeName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.menuName">
                          <el-form-item label="菜谱 :" prop="menuName">
                            <span v-if="formData.menuName">{{formData.menuName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.productTypeName">
                          <el-form-item label="食品 :" prop="productTypeName">
                            <span v-if="formData.productTypeName">{{formData.productTypeName}}</span>
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
  import api from "./schoolmenuproductUrl";
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
        menuOptions: [],
        productTypeIdOptions: [],
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        formData:{
          menuId: "",
          productTypeId: "",
          schoolMenuProductId:'',
          sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              menuId :
              [
                  {required: true, message: "请您输入菜谱", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},
              ],

              productTypeId :
              [
                  {required: true, message: "请您输入食品", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

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
    created() {
      this.getDetail(this.$route.params.id);
      commonApi.commonRequest('/sm/foodSecurity/schoolMenuAd/page','get',{page:1,limit:999}).then(res=>{
        this.menuOptions = coverData(res.data.data.records, 'menuName', 'menuId')
      })
      commonApi.commonRequest('/sm/foodSecurity/productTypeAd/page','get',{page:1,limit:999}).then(res=>{
        this.productTypeIdOptions = coverData(res.data.data.records, 'productTypeName', 'productTypeId')
      })
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
