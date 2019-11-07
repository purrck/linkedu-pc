
                              
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="维修时间 :" prop="repairDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.repairDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 维修时间 colName:repair_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="维修完成时间 :" prop="complatedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.complatedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 维修完成时间 colName:complated_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="维修内容 :" prop="repairContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.repairContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 维修内容 colName:repair_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="维修人id :" prop="repairUserId">
                      <el-input class="input-v2-rao" v-model="formData.repairUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 维修人id colName:repair_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="维修人 :" prop="repairUserName">
                      <el-input class="input-v2-rao" v-model="formData.repairUserName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 维修人 colName:repair_user_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="是否完结 :" prop="isComplated">
                      <el-select class="select-v2-rao" v-model="formData.isComplated" placeholder="请您选择">
                        <el-option v-for="isComplatedItem in ynOptions" :key="isComplatedItem.name"
                                   :label="isComplatedItem.label" :value="isComplatedItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 是否完结 colName:is_complated sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="维修订单号 :" prop="payOrderNo">
                      <el-input class="input-v2-rao" v-model="formData.payOrderNo"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 维修订单号 colName:pay_order_no sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="维修费 :" prop="cost">
                      <el-input class="input-v2-rao" v-model="formData.cost"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 维修费 colName:cost sqlType:DECIMAL notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="是否已支付 :" prop="isPayed">
                      <el-select class="select-v2-rao" v-model="formData.isPayed" placeholder="请您选择">
                        <el-option v-for="isPayedItem in ynOptions" :key="isPayedItem.name"
                                   :label="isPayedItem.label" :value="isPayedItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 是否已支付 colName:is_payed sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="维修时间 :" prop="repairDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.repairDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="维修内容 :" prop="repairContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.repairContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="是否完结 :" prop="isComplated">
                      <el-select class="select-v2-rao" v-model="formData.isComplated" placeholder="请您选择">
                        <el-option v-for="isComplatedItem in ynOptions" :key="isComplatedItem.name"
                                   :label="isComplatedItem.label" :value="isComplatedItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="维修订单号 :" prop="payOrderNo">
                      <el-input class="input-v2-rao" v-model="formData.payOrderNo"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="维修费 :" prop="cost">
                      <el-input class="input-v2-rao" v-model="formData.cost"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="是否已支付 :" prop="isPayed">
                      <el-select class="select-v2-rao" v-model="formData.isPayed" placeholder="请您选择">
                        <el-option v-for="isPayedItem in ynOptions" :key="isPayedItem.name"
                                   :label="isPayedItem.label" :value="isPayedItem.name">
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
                      {{formData.repairDt}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50">
                          <el-form-item label="维修时间 :" prop="repairDt">
                            <span v-if="formData.repairDt"> {{formData.repairDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.repairContent">
                          <el-form-item label="维修内容 :" prop="repairContent">
                            <span v-if="formData.repairContent" v-html="formData.repairContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.repairUserName">
                          <el-form-item label="维修人 :" prop="repairUserName">
                            <span v-if="formData.repairUserName">{{formData.repairUserName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="是否完结 :" prop="isComplated">
                            <el-switch v-model="formData.isComplated == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.payOrderNo">
                          <el-form-item label="维修订单号 :" prop="payOrderNo">
                            <span v-if="formData.payOrderNo">{{formData.payOrderNo}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.cost">
                          <el-form-item label="维修费 :" prop="cost">
                            <span v-if="formData.cost">{{formData.cost}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="是否已支付 :" prop="isPayed">
                            <el-switch v-model="formData.isPayed == 'Y'" disabled></el-switch>
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
  import api from "./repairrecordUrl";
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

        ynOptions :[{"label": "全部", "name": ""}],
        isComplated : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isPayed : null,
        formData:{
              repairRecordId:'',
              repairDt :"",
              repairContent :"",
              isComplated :"",
              payOrderNo :"",
              cost :"",
              isPayed :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              repairDt :
              [

              ],
              complatedDt :
              [

              ],
              repairContent :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              repairUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              repairUserName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              isComplated :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              payOrderNo :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              cost :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              isPayed :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

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
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
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
