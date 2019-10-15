

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="头像 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="姓名 :" prop="visitorName">
                      <el-input class="input-v2-rao" v-model="formData.visitorName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="证件类型 :" prop="cardTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.cardTypeCode" placeholder="请您选择">
                        <el-option v-for="cardTypeCodeItem in cardTypeCodeOptions"
                                   :key="cardTypeCodeItem.name"
                                   :label="cardTypeCodeItem.label" :value="cardTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="证件编号 :" prop="cardNum">
                      <el-input class="input-v2-rao" v-model="formData.cardNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="电话 :" prop="visitorPhonenum">
                      <el-input class="input-v2-rao" v-model="formData.visitorPhonenum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="来访时间 :" prop="visitedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.visitedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="访问卡号 :" prop="visitCardNum">
                      <el-input class="input-v2-rao" v-model="formData.visitCardNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="来访事由 :" prop="remark">
                      <el-input class="input-v2-rao" v-model="formData.remark"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="是否家长 :" prop="isParent">
                      <el-select class="select-v2-rao" v-model="formData.isParent" placeholder="请您选择">
                        <el-option v-for="isParentItem in ynOptions" :key="isParentItem.name"
                                   :label="isParentItem.label" :value="isParentItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所类型 :" prop="placeTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.placeTypeCode" placeholder="请您选择">
                        <el-option v-for="placeTypeCodeItem in placeTypeCodeOptions"
                                   :key="placeTypeCodeItem.name"
                                   :label="placeTypeCodeItem.label" :value="placeTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所id :" prop="placeId">
                      <el-input class="input-v2-rao" v-model="formData.placeId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所 :" prop="placeName">
                      <el-input class="input-v2-rao" v-model="formData.placeName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="离开时间 :" prop="leftDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.leftDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="访问卡号 :" prop="visitCardNum">
                      <el-input class="input-v2-rao" v-model="formData.visitCardNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="来访事由 :" prop="remark">
                      <el-input class="input-v2-rao" v-model="formData.remark"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="是否家长 :" prop="isParent">
                      <el-select class="select-v2-rao" v-model="formData.isParent" placeholder="请您选择">
                        <el-option v-for="isParentItem in ynOptions" :key="isParentItem.name"
                                   :label="isParentItem.label" :value="isParentItem.name">
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
                <!--<div class="detail-title-v2 ">-->
                      <!--{{formData.imagePath}}-->
                <!--</div>-->
                <div class="detail-item-v2">

                        <div class="p100">
                          <el-form-item label="头像 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.visitorName">
                          <el-form-item label="姓名 :" prop="visitorName">
                            <span v-if="formData.visitorName">{{formData.visitorName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="证件类型 :" prop="cardTypeCode">
                            <span v-if="formData.cardTypeCodeStr"
                                  :style="{'color':formData.cardTypeCodeStr.split(';')[1]}">{{formData.cardTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.cardNum">
                          <el-form-item label="证件编号 :" prop="cardNum">
                            <span v-if="formData.cardNum">{{formData.cardNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.visitorPhonenum">
                          <el-form-item label="电话 :" prop="visitorPhonenum">
                            <span v-if="formData.visitorPhonenum">{{formData.visitorPhonenum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="来访时间 :" prop="visitedDt">
                            <span v-if="formData.visitedDt"> {{formData.visitedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="离开时间 :" prop="leftDt">
                            <span v-if="formData.leftDt"> {{formData.leftDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.visitCardNum">
                          <el-form-item label="访问卡号 :" prop="visitCardNum">
                            <span v-if="formData.visitCardNum">{{formData.visitCardNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.remark">
                          <el-form-item label="来访事由 :" prop="remark">
                            <span v-if="formData.remark">{{formData.remark}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="是否家长 :" prop="isParent">
                            <el-switch v-model="formData.isParent == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.parentName">
                          <el-form-item label="家长 :" prop="parentName">
                            <span v-if="formData.parentName">{{formData.parentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="场所类型 :" prop="placeTypeCode">
                            <span v-if="formData.placeTypeCodeStr"
                                  :style="{'color':formData.placeTypeCodeStr.split(';')[1]}">{{formData.placeTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.placeName">
                          <el-form-item label="场所 :" prop="placeName">
                            <span v-if="formData.placeName">{{formData.placeName}}</span>
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
  import api from "./schoolvisitrecordUrl";
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
        cardTypeCodeOptions: [{"label": "全部", "name": ""}],
        cardTypeCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isParent : null,
        placeTypeCodeOptions: [{"label": "全部", "name": ""}],
        placeTypeCode : null,
        formData:{
              visitRecordId:'',
              leftDt :"",
              visitCardNum :"",
              remark :"",
              isParent :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              visitorName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              cardTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              cardNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              visitorPhonenum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},
                  {validator: validation.mobileNum, trigger: "blur"},

              ],
              visitedDt :
              [

              ],
              visitCardNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              remark :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

              ],
              isParent :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              placeTypeCode :
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
          commonApi.getCodeIntType("cardType").then(res => {
            let viewList = res.data.data || [];
            for (let cardTypeItem of viewList) {
              this.cardTypeCodeOptions.push({
                "label": cardTypeItem.codeDesc,
                "name": cardTypeItem.codeId
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
          commonApi.getCodeIntType("placeType").then(res => {
            let viewList = res.data.data || [];
            for (let placeTypeItem of viewList) {
              this.placeTypeCodeOptions.push({
                "label": placeTypeItem.codeDesc,
                "name": placeTypeItem.codeId
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
