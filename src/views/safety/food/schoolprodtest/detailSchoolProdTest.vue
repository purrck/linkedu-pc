
                      
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="食品检验任务 *  :" prop="prodTestTitle">
                      <el-input class="input-v2-rao" v-model="formData.prodTestTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="送检时间 *  :" prop="submmitedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.submmitedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验机构 *  :" prop="prodTestOrgName">
                      <el-input class="input-v2-rao" v-model="formData.prodTestOrgName"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验机构联系人 :" prop="orgContactName">
                      <el-input class="input-v2-rao" v-model="formData.orgContactName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验机构联系电话 :" prop="orgContactPhoneNum">
                      <el-input class="input-v2-rao" v-model="formData.orgContactPhoneNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="食品检验任务 *  :" prop="prodTestTitle">
                      <el-input class="input-v2-rao" v-model="formData.prodTestTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="送检时间 *  :" prop="submmitedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.submmitedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验机构 *  :" prop="prodTestOrgName">
                      <el-input class="input-v2-rao" v-model="formData.prodTestOrgName"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验机构联系人 :" prop="orgContactName">
                      <el-input class="input-v2-rao" v-model="formData.orgContactName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验机构联系电话 :" prop="orgContactPhoneNum">
                      <el-input class="input-v2-rao" v-model="formData.orgContactPhoneNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验状态 :" prop="testStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.testStatusCode" placeholder="请您选择">
                        <el-option v-for="testStatusCodeItem in testStatusCodeOptions"
                                   :key="testStatusCodeItem.name"
                                   :label="testStatusCodeItem.label" :value="testStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="检验结果 :" prop="testResult"
                                  class="orgIntroduction">
                      <editor v-model="formData.testResult" :true-height="350"/>
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
                      {{formData.prodTestTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.prodTestTitle">
                          <el-form-item label="食品检验任务 :" prop="prodTestTitle">
                            <span v-if="formData.prodTestTitle">{{formData.prodTestTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="送检时间 :" prop="submmitedDt">
                            <span v-if="formData.submmitedDt"> {{formData.submmitedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.prodTestOrgName">
                          <el-form-item label="检验机构 :" prop="prodTestOrgName">
                            <span v-if="formData.prodTestOrgName">{{formData.prodTestOrgName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.orgContactName">
                          <el-form-item label="检验机构联系人 :" prop="orgContactName">
                            <span v-if="formData.orgContactName">{{formData.orgContactName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.orgContactPhoneNum">
                          <el-form-item label="检验机构联系电话 :" prop="orgContactPhoneNum">
                            <span v-if="formData.orgContactPhoneNum">{{formData.orgContactPhoneNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="检验状态 :" prop="testStatusCode">
                            <span v-if="formData.testStatusCodeStr"
                                  :style="{'color':formData.testStatusCodeStr.split(';')[1]}">{{formData.testStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.testResult">
                          <el-form-item label="检验结果 :" prop="testResult">
                            <span v-if="formData.testResult" v-html="formData.testResult"></span>
                          </el-form-item>
                        </div>

                </div>
              </div>
            </el-form>
          </el-col>

            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="menu-quickly">
                <ul>
                  <li>
                    <router-link :to="`/basedata/listSchoolProdTestItem?prodTestId=`+
                                  formData.prodTestId">
                      <i class="iconfont icon-icon_liebiao"></i>食品检验产品
                    </router-link>
                  </li>
                </ul>
              </div>
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
  import api from "./schoolprodtestUrl";
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

        testStatusCodeOptions: [{"label": "全部", "name": ""}], testStatusCode : null,
        formData:{
              prodTestId:'',
              prodTestTitle :"",
              submmitedDt :"",
              prodTestOrgName :"",
              orgContactName :"",
              orgContactPhoneNum :"",
              testStatusCode :"",
              testResult :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              prodTestTitle :
              [
                  {required: true, message: "请您输入食品检验任务", trigger: "blur"},
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              submmitedDt :
              [
                  {required: true, message: "请您输入送检时间", trigger: "blur"},

              ],
              prodTestOrgName :
              [
                  {required: true, message: "请您输入检验机构", trigger: "blur"},
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              orgContactName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              orgContactPhoneNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},
                  {validator: validation.mobileNum, trigger: "blur"},

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
          commonApi.getCodeIntType("testStatus").then(res => {
            let viewList = res.data.data || [];
            for (let testStatusItem of viewList) {
              this.testStatusCodeOptions.push({
                "label": testStatusItem.codeDesc,
                "name": testStatusItem.codeId
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
