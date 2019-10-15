

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="12">
                    <el-form-item label="埋点id :" prop="pointId">
                      <el-input class="input-v2-rao" v-model="formData.pointId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点位置 :" prop="pointSite">
                      <el-input class="input-v2-rao" v-model="formData.pointSite"
                                maxlength="255"></el-input>
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
                    <el-form-item label="开始时间 :" prop="pointBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.pointBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="持续时间 :" prop="pointEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.pointEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="点击次数 :" prop="pointClicks">
                      <el-input class="input-v2-rao" v-model="formData.pointClicks"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="事件组id :" prop="pointGroupId">
                      <el-input class="input-v2-rao" v-model="formData.pointGroupId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="事件组追踪id :" prop="pointTrackId">
                      <el-input class="input-v2-rao" v-model="formData.pointTrackId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户 id:" prop="userId">
                      <el-input class="input-v2-rao" v-model="formData.userId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户名 :" prop="userName">
                      <el-input class="input-v2-rao" v-model="formData.userName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="12">
                    <el-form-item label="埋点id :" prop="pointId">
                      <el-input class="input-v2-rao" v-model="formData.pointId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="埋点位置 :" prop="pointSite">
                      <el-input class="input-v2-rao" v-model="formData.pointSite"
                                maxlength="255"></el-input>
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
                    <el-form-item label="开始时间 :" prop="pointBeginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.pointBeginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="持续时间 :" prop="pointEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.pointEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="点击次数 :" prop="pointClicks">
                      <el-input class="input-v2-rao" v-model="formData.pointClicks"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="事件组id :" prop="pointGroupId">
                      <el-input class="input-v2-rao" v-model="formData.pointGroupId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="事件组追踪id :" prop="pointTrackId">
                      <el-input class="input-v2-rao" v-model="formData.pointTrackId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户id :" prop="userId">
                      <el-input class="input-v2-rao" v-model="formData.userId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户名 :" prop="userName">
                      <el-input class="input-v2-rao" v-model="formData.userName"
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
                      {{formData.pointId}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.pointId">
                          <el-form-item label="埋点id :" prop="pointId">
                            <span v-if="formData.pointId">{{formData.pointId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.pointSite">
                          <el-form-item label="埋点位置 :" prop="pointSite">
                            <span v-if="formData.pointSite">{{formData.pointSite}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="设备类型 :" prop="pointDeviceTypeCode">
                            <span v-if="formData.pointDeviceTypeCodeStr"
                                  :style="{'color':formData.pointDeviceTypeCodeStr.split(';')[1]}">{{formData.pointDeviceTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="开始时间 :" prop="pointBeginDt">
                            <span v-if="formData.pointBeginDt"> {{formData.pointBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="持续时间 :" prop="pointEndDt">
                            <span v-if="formData.pointEndDt"> {{formData.pointEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.pointClicks">
                          <el-form-item label="点击次数 :" prop="pointClicks">
                            <span v-if="formData.pointClicks">{{formData.pointClicks}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.pointGroupId">
                          <el-form-item label="事件组id :" prop="pointGroupId">
                            <span v-if="formData.pointGroupId">{{formData.pointGroupId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.pointTrackId">
                          <el-form-item label="事件组追踪id :" prop="pointTrackId">
                            <span v-if="formData.pointTrackId">{{formData.pointTrackId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.userId">
                          <el-form-item label="用户 :" prop="userId">
                            <span v-if="formData.userId">{{formData.userId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="用户 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
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
  import api from "./analysispointinfoUrl";
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

        pointDeviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        pointDeviceTypeCode : null,
        formData:{
              pointInfoId:'',
              pointId :"",
              pointSite :"",
              pointDeviceTypeCode :"",
              pointBeginDt :"",
              pointEndDt :"",
              pointClicks :"",
              pointGroupId :"",
              pointTrackId :"",
              userId :"",
              userName :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              pointId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pointSite :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              pointDeviceTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pointBeginDt :
              [

              ],
              pointEndDt :
              [

              ],
              pointClicks :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              pointGroupId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pointTrackId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              userId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              userName :
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
   // directives: {preview},
    created() {
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("pointDeviceType").then(res => {
            let viewList = res.data.data || [];
            for (let pointDeviceTypeItem of viewList) {
              this.pointDeviceTypeCodeOptions.push({
                "label": pointDeviceTypeItem.codeDesc,
                "name": pointDeviceTypeItem.codeId
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
