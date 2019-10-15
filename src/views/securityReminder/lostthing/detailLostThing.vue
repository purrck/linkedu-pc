
                                    
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="失物名称 *  :" prop="lostThingName">
                      <el-input class="input-v2-rao" v-model="formData.lostThingName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 失物名称 colName:lost_thing_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="上报时间 :" prop="lostThingReportDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.lostThingReportDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 上报时间 colName:lost_thing_report_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="拾取人类型 :" prop="pickupUserTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.pickupUserTypeCode" placeholder="请您选择">
                        <el-option v-for="pickupUserTypeCodeItem in pickupUserTypeCodeOptions"
                                   :key="pickupUserTypeCodeItem.name"
                                   :label="pickupUserTypeCodeItem.label" :value="pickupUserTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 拾取人类型 colName:pickup_user_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="拾取人用户id :" prop="pickupUserId">
                      <el-input class="input-v2-rao" v-model="formData.pickupUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 拾取人用户id colName:pickup_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="拾取人姓名 :" prop="pickupUserName">
                      <el-input class="input-v2-rao" v-model="formData.pickupUserName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 拾取人姓名 colName:pickup_user_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="拾取时间 :" prop="pickupDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.pickupDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 拾取时间 colName:pickup_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="认领地址 *  :" prop="applyAddress">
                      <el-input class="input-v2-rao" v-model="formData.applyAddress"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 认领地址 colName:apply_address sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="失物名称 *  :" prop="lostThingName">
                      <el-input class="input-v2-rao" v-model="formData.lostThingName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="失物状态码 *  :" prop="lostThingStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.lostThingStatusCode" placeholder="请您选择">
                        <el-option v-for="lostThingStatusCodeItem in lostThingStatusCodeOptions"
                                   :key="lostThingStatusCodeItem.name"
                                   :label="lostThingStatusCodeItem.label" :value="lostThingStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="认领人类型 :" prop="applyedUserType">
                      <el-input class="input-v2-rao" v-model="formData.applyedUserType"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="认领人用户i :" prop="applyedUserId">
                      <el-input class="input-v2-rao" v-model="formData.applyedUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="认领人姓名 :" prop="applyedUserName">
                      <el-input class="input-v2-rao" v-model="formData.applyedUserName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="认领时间 :" prop="applyedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.applyedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="已阅读 :" prop="readTimes">
                      <el-input class="input-v2-rao" v-model="formData.readTimes"
                                maxlength="11"></el-input>
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
                      {{formData.lostThingName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.lostThingName">
                          <el-form-item label="失物名称 :" prop="lostThingName">
                            <span v-if="formData.lostThingName">{{formData.lostThingName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="失物状态码 :" prop="lostThingStatusCode">
                            <span v-if="formData.lostThingStatusCodeStr"
                                  :style="{'color':formData.lostThingStatusCodeStr.split(';')[1]}">{{formData.lostThingStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="上报时间 :" prop="lostThingReportDt">
                            <span v-if="formData.lostThingReportDt"> {{formData.lostThingReportDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="拾取人类型 :" prop="pickupUserTypeCode">
                            <span v-if="formData.pickupUserTypeCodeStr"
                                  :style="{'color':formData.pickupUserTypeCodeStr.split(';')[1]}">{{formData.pickupUserTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.pickupUserName">
                          <el-form-item label="拾取人姓名 :" prop="pickupUserName">
                            <span v-if="formData.pickupUserName">{{formData.pickupUserName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="拾取时间 :" prop="pickupDt">
                            <span v-if="formData.pickupDt"> {{formData.pickupDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.applyAddress">
                          <el-form-item label="认领地址 :" prop="applyAddress">
                            <span v-if="formData.applyAddress">{{formData.applyAddress}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.applyedUserType">
                          <el-form-item label="认领人类型 :" prop="applyedUserType">
                            <span v-if="formData.applyedUserType">{{formData.applyedUserType}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.applyedUserName">
                          <el-form-item label="认领人姓名 :" prop="applyedUserName">
                            <span v-if="formData.applyedUserName">{{formData.applyedUserName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="认领时间 :" prop="applyedDt">
                            <span v-if="formData.applyedDt"> {{formData.applyedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.readTimes">
                          <el-form-item label="已阅读 :" prop="readTimes">
                            <span v-if="formData.readTimes">{{formData.readTimes}}</span>
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
  import api from "./lostthingUrl";
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

        lostThingStatusCodeOptions: [{"label": "全部", "name": ""}],
        lostThingStatusCode : null,
        imagePathFileList :[],
        imagePathFileType:'',
        pickupUserTypeCodeOptions: [{"label": "全部", "name": ""}],
        pickupUserTypeCode : null,
        formData:{
              lostThingId:'',
              lostThingName :"",
              lostThingStatusCode :"",
              imagePath :"",
              applyedUserType :"",
              applyedUserId :"",
              applyedUserName :"",
              applyedDt :"",
              readTimes :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              lostThingName :
              [
                  {required: true, message: "请您输入失物名称", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              lostThingReportDt :
              [

              ],
              pickupUserTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pickupUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pickupUserName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pickupDt :
              [

              ],
              applyAddress :
              [
                  {required: true, message: "请您输入认领地址", trigger: "blur"},
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
   // directives: {preview},
    created() {
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("lostThingStatus").then(res => {
            let viewList = res.data.data || [];
            for (let lostThingStatusItem of viewList) {
              this.lostThingStatusCodeOptions.push({
                "label": lostThingStatusItem.codeDesc,
                "name": lostThingStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("pickupUserType").then(res => {
            let viewList = res.data.data || [];
            for (let pickupUserTypeItem of viewList) {
              this.pickupUserTypeCodeOptions.push({
                "label": pickupUserTypeItem.codeDesc,
                "name": pickupUserTypeItem.codeId
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
