
                              
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="报修信息 :" prop="repairInfoName">
                      <el-input class="input-v2-rao" v-model="formData.repairInfoName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 报修信息 colName:repair_info_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="备注 :" prop="repairInfoRemark"
                                  class="orgIntroduction">
                      <editor v-model="formData.repairInfoRemark" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 备注 colName:repair_info_remark sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="物品类型 :" prop="itemTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.itemTypeCode" placeholder="请您选择">
                        <el-option v-for="itemTypeCodeItem in itemTypeCodeOptions"
                                   :key="itemTypeCodeItem.name"
                                   :label="itemTypeCodeItem.label" :value="itemTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 物品类型 colName:item_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="区域id :" prop="placeId">
                      <el-input class="input-v2-rao" v-model="formData.placeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 区域id colName:place_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="发生区域 :" prop="placeName">
                      <el-input class="input-v2-rao" v-model="formData.placeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 发生区域 colName:place_name sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="报修信息 :" prop="repairInfoName">
                      <el-input class="input-v2-rao" v-model="formData.repairInfoName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="备注 :" prop="repairInfoRemark"
                                  class="orgIntroduction">
                      <editor v-model="formData.repairInfoRemark" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="截至日期 :" prop="repairEndDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.repairEndDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="报修状态 :" prop="repairStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.repairStatusCode" placeholder="请您选择">
                        <el-option v-for="repairStatusCodeItem in repairStatusCodeOptions"
                                   :key="repairStatusCodeItem.name"
                                   :label="repairStatusCodeItem.label" :value="repairStatusCodeItem.name">
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
                      {{formData.repairInfoName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.repairInfoName">
                          <el-form-item label="报修信息 :" prop="repairInfoName">
                            <span v-if="formData.repairInfoName">{{formData.repairInfoName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.repairInfoRemark">
                          <el-form-item label="备注 :" prop="repairInfoRemark">
                            <span v-if="formData.repairInfoRemark" v-html="formData.repairInfoRemark"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="起始日期 :" prop="repairBeginDt">
                            <span v-if="formData.repairBeginDt"> {{formData.repairBeginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截至日期 :" prop="repairEndDt">
                            <span v-if="formData.repairEndDt"> {{formData.repairEndDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.placeName">
                          <el-form-item label="发生区域 :" prop="placeName">
                            <span v-if="formData.placeName">{{formData.placeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="发起人 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
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
                    <router-link :to="`/basedata/listRepairRecord?repairInfoId=`+
                                  formData.repairInfoId">
                      <i class="iconfont icon-icon_liebiao"></i>维修记录
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
  import api from "./repairinfoUrl";
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

        imagePathFileList :[],
        imagePathFileType:'',
        repairStatusCodeOptions: [{"label": "全部", "name": ""}],
        repairStatusCode : null,
        itemTypeCodeOptions: [{"label": "全部", "name": ""}],
        itemTypeCode : null,
        formData:{
              repairInfoId:'',
              repairInfoName :"",
              imagePath :"",
              repairInfoRemark :"",
              repairEndDt :"",
              repairStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              repairInfoName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              repairInfoRemark :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              itemTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              placeId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              placeName :
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
          commonApi.getCodeIntType("repairStatus").then(res => {
            let viewList = res.data.data || [];
            for (let repairStatusItem of viewList) {
              this.repairStatusCodeOptions.push({
                "label": repairStatusItem.codeDesc,
                "name": repairStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("itemType").then(res => {
            let viewList = res.data.data || [];
            for (let itemTypeItem of viewList) {
              this.itemTypeCodeOptions.push({
                "label": itemTypeItem.codeDesc,
                "name": itemTypeItem.codeId
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
