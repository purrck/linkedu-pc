

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="12">
                    <el-form-item label="功能区 :" prop="functionName">
                      <el-input class="input-v2-rao" v-model="formData.functionName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点名称 :" prop="pointName">
                      <el-input class="input-v2-rao" v-model="formData.pointName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点类型 :" prop="pointTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.pointTypeCode" placeholder="请您选择">
                        <el-option v-for="pointTypeCodeItem in pointTypeCodeOptions"
                                   :key="pointTypeCodeItem.name"
                                   :label="pointTypeCodeItem.label" :value="pointTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="提交方式 :" prop="postTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.postTypeCode" placeholder="请您选择">
                        <el-option v-for="postTypeCodeItem in postTypeCodeOptions"
                                   :key="postTypeCodeItem.name"
                                   :label="postTypeCodeItem.label" :value="postTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备类型 :" prop="pointDeviceTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.pointDeviceTypeCode" placeholder="请您选择">
                        <el-option v-for="pointDeviceTypeCodeItem in pointDeviceTypeCodeOptions"
                                   :key="pointDeviceTypeCodeItem.name"
                                   :label="pointDeviceTypeCodeItem.label" :value="pointDeviceTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点规则 :" prop="pointRuleCode">
                      <el-select class="select-v2-rao" v-model="formData.pointRuleCode" placeholder="请您选择">
                        <el-option v-for="pointRuleCodeItem in pointRuleCodeOptions"
                                   :key="pointRuleCodeItem.name"
                                   :label="pointRuleCodeItem.label" :value="pointRuleCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注 :" prop="remark">
                      <el-input class="input-v2-rao" v-model="formData.remark"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="12">
                    <el-form-item label="功能区 :" prop="functionName">
                      <el-input class="input-v2-rao" v-model="formData.functionName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点名称 :" prop="pointName">
                      <el-input class="input-v2-rao" v-model="formData.pointName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点类型 :" prop="pointTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.pointTypeCode" placeholder="请您选择">
                        <el-option v-for="pointTypeCodeItem in pointTypeCodeOptions"
                                   :key="pointTypeCodeItem.name"
                                   :label="pointTypeCodeItem.label" :value="pointTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="提交方式 :" prop="postTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.postTypeCode" placeholder="请您选择">
                        <el-option v-for="postTypeCodeItem in postTypeCodeOptions"
                                   :key="postTypeCodeItem.name"
                                   :label="postTypeCodeItem.label" :value="postTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备类型 :" prop="pointDeviceTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.pointDeviceTypeCode" placeholder="请您选择">
                        <el-option v-for="pointDeviceTypeCodeItem in pointDeviceTypeCodeOptions"
                                   :key="pointDeviceTypeCodeItem.name"
                                   :label="pointDeviceTypeCodeItem.label" :value="pointDeviceTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点规则 :" prop="pointRuleCode">
                      <el-select class="select-v2-rao" v-model="formData.pointRuleCode" placeholder="请您选择">
                        <el-option v-for="pointRuleCodeItem in pointRuleCodeOptions"
                                   :key="pointRuleCodeItem.name"
                                   :label="pointRuleCodeItem.label" :value="pointRuleCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注 :" prop="remark">
                      <el-input class="input-v2-rao" v-model="formData.remark"
                                maxlength="255"></el-input>
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
                      {{formData.functionName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.functionName">
                          <el-form-item label="功能区 :" prop="functionName">
                            <span v-if="formData.functionName">{{formData.functionName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.pointName">
                          <el-form-item label="埋点名称 :" prop="pointName">
                            <span v-if="formData.pointName">{{formData.pointName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="埋点类型 :" prop="pointTypeCode">
                            <span v-if="formData.pointTypeCodeStr"
                                  :style="{'color':formData.pointTypeCodeStr.split(';')[1]}">{{formData.pointTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="提交方式 :" prop="postTypeCode">
                            <span v-if="formData.postTypeCodeStr"
                                  :style="{'color':formData.postTypeCodeStr.split(';')[1]}">{{formData.postTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="设备类型 :" prop="pointDeviceTypeCode">
                            <span v-if="formData.pointDeviceTypeCodeStr"
                                  :style="{'color':formData.pointDeviceTypeCodeStr.split(';')[1]}">{{formData.pointDeviceTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="埋点规则 :" prop="pointRuleCode">
                            <span v-if="formData.pointRuleCodeStr"
                                  :style="{'color':formData.pointRuleCodeStr.split(';')[1]}">{{formData.pointRuleCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.remark">
                          <el-form-item label="备注 :" prop="remark">
                            <span v-if="formData.remark">{{formData.remark}}</span>
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
  import api from "./analysispointUrl";
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

        pointTypeCodeOptions: [{"label": "全部", "name": ""}],
        pointTypeCode : null,
        postTypeCodeOptions: [{"label": "全部", "name": ""}],
        postTypeCode : null,
        pointDeviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        pointDeviceTypeCode : null,
        pointRuleCodeOptions: [{"label": "全部", "name": ""}],
        pointRuleCode : null,
        formData:{
              pointId:'',
              functionName :"",
              pointName :"",
              pointTypeCode :"",
              postTypeCode :"",
              pointDeviceTypeCode :"",
              pointRuleCode :"",
              remark :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              functionName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pointName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pointTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              postTypeCode :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              pointDeviceTypeCode :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              pointRuleCode :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              remark :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

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
          commonApi.getCodeIntType("pointType").then(res => {
            let viewList = res.data.data || [];
            for (let pointTypeItem of viewList) {
              this.pointTypeCodeOptions.push({
                "label": pointTypeItem.codeDesc,
                "name": pointTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("postType").then(res => {
            let viewList = res.data.data || [];
            for (let postTypeItem of viewList) {
              this.postTypeCodeOptions.push({
                "label": postTypeItem.codeDesc,
                "name": postTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("pointDeviceType").then(res => {
            let viewList = res.data.data || [];
            for (let pointDeviceTypeItem of viewList) {
              this.pointDeviceTypeCodeOptions.push({
                "label": pointDeviceTypeItem.codeDesc,
                "name": pointDeviceTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("pointRule").then(res => {
            let viewList = res.data.data || [];
            for (let pointRuleItem of viewList) {
              this.pointRuleCodeOptions.push({
                "label": pointRuleItem.codeDesc,
                "name": pointRuleItem.codeId
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
