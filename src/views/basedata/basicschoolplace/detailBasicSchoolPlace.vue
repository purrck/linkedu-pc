

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col  :span="24">
                    <el-form-item label="学校名 :" prop="parentPlaceId">
                      <el-input disabled class="input-v2-rao" v-model="formData.schoolOrgName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
            <el-col v-show="false" :span="24">
              <el-form-item label="学校id :" prop="parentPlaceId">
                <el-input class="input-v2-rao" v-model="formData.schoolId"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-show="false" :span="24">
              <el-form-item label="主场所id :" prop="parentPlaceId">
                <el-input class="input-v2-rao" v-model="formData.parentPlaceId"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>

                  <el-col :span="24">
                    <el-form-item label="场所编号:" prop="placeNum">
                      <el-input class="input-v2-rao" v-model="formData.placeNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场地名称:" prop="placeName">
                      <el-input class="input-v2-rao" v-model="formData.placeName"
                                maxlength="100"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所类型:" prop="placeTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.placeTypeCode" placeholder="请您选择">
                        <el-option v-for="placeTypeCodeItem in placeTypeCodeOptions"
                                   :key="placeTypeCodeItem.name"
                                   :label="placeTypeCodeItem.label" :value="placeTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="三维坐标 :" prop="ucs">
                      <el-input class="input-v2-rao" v-model="formData.ucs"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="允许最大人数 :" prop="maxUser">
                      <el-input class="input-v2-rao" v-model="formData.maxUser"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col v-show="false" :span="24">
                    <el-form-item label="上级场所id :" prop="parentPlaceId">
                      <el-input class="input-v2-rao" v-model="formData.parentPlaceId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所编号 *  :" prop="placeNum">
                      <el-input class="input-v2-rao" v-model="formData.placeNum"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场地名称 *  :" prop="placeName">
                      <el-input class="input-v2-rao" v-model="formData.placeName"
                                maxlength="100"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所类型:" prop="placeTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.placeTypeCode" placeholder="请您选择">
                        <el-option v-for="placeTypeCodeItem in placeTypeCodeOptions"
                                   :key="placeTypeCodeItem.name"
                                   :label="placeTypeCodeItem.label" :value="placeTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="三维坐标 :" prop="ucs">
                      <el-input class="input-v2-rao" v-model="formData.ucs"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="允许最大人数 :" prop="maxUser">
                      <el-input class="input-v2-rao" v-model="formData.maxUser"
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
                      {{formData.placeNum}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="false">
                          <el-form-item label="上级场所id :" prop="parentPlaceId">
                            <span v-if="formData.parentPlaceId">{{formData.parentPlaceId}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.placeNum">
                          <el-form-item label="场所编号 :" prop="placeNum">
                            <span v-if="formData.placeNum">{{formData.placeNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.placeName">
                          <el-form-item label="场地名称 :" prop="placeName">
                            <span v-if="formData.placeName">{{formData.placeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="场所类型:" prop="placeTypeCode">
                            <span v-if="formData.placeTypeCodeStr"
                                  :style="{'color':formData.placeTypeCodeStr.split(';')[1]}">{{formData.placeTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.ucs">
                          <el-form-item label="三维坐标 :" prop="ucs">
                            <span v-if="formData.ucs">{{formData.ucs}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.maxUser">
                          <el-form-item label="允许最大人数 :" prop="maxUser">
                            <span v-if="formData.maxUser">{{formData.maxUser}}</span>
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
  import api from "./basicschoolplaceUrl";
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

        placeTypeCodeOptions: [{"label": "全部", "name": ""}],
        placeTypeCode : null,
        formData:{
              placeId:null,
          schoolOrgName:null,
          schoolId:null,
          parentPlaceIdl:null,
              // parentPlaceId :"",
              placeNum :null,
              placeName :null,
              placeTypeCode :null,
              ucs :null,
              maxUser :null,
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              parentPlaceId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              placeNum :
              [
                  {required: true, message: "请您输入场所编号", trigger: "blur"},
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              placeName :
              [
                  {required: true, message: "请您输入场地名称", trigger: "blur"},
                  {max: 100, message: "最多能输入100个字", trigger: "blur"},

              ],
              placeTypeCode :
              [
                {required: true, message: "请您选择场所", trigger: "blur"},

              ],
              ucs :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              maxUser :
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
   // directives: {preview},
    created() {
        // // console.log(this.$route)
      this.formData.schoolId=this.$route.params.id
      this.formData.schoolOrgName = this.$route.query.schoolOrgName
        this.formData.parentPlaceId = this.$route.query.parentPlaceId;
        this.$route.query
      this.getDetail(this.$route.params.id);
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
