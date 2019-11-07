
                                
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="用户类型 :" prop="userTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.userTypeCode" placeholder="请您选择">
                        <el-option v-for="userTypeCodeItem in userTypeCodeOptions"
                                   :key="userTypeCodeItem.name"
                                   :label="userTypeCodeItem.label" :value="userTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 用户类型 colName:user_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="空间标题 :" prop="spaceTitle">
                      <el-input class="input-v2-rao" v-model="formData.spaceTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 空间标题 colName:space_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="主图 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 主图 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="背景图 :" prop="bgImagePath">
                      <el-input class="input-v2-rao" v-model="formData.bgImagePath"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 背景图 colName:bg_image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="空间口号 :" prop="spaceSlogan">
                      <el-input class="input-v2-rao" v-model="formData.spaceSlogan"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 空间口号 colName:space_slogan sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="是否开放 :" prop="isOpen">
                      <el-select class="select-v2-rao" v-model="formData.isOpen" placeholder="请您选择">
                        <el-option v-for="isOpenItem in ynOptions" :key="isOpenItem.name"
                                   :label="isOpenItem.label" :value="isOpenItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 是否开放 colName:is_open sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="空间标题 :" prop="spaceTitle">
                      <el-input class="input-v2-rao" v-model="formData.spaceTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="主图 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="空间口号 :" prop="spaceSlogan">
                      <el-input class="input-v2-rao" v-model="formData.spaceSlogan"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="是否开放 :" prop="isOpen">
                      <el-select class="select-v2-rao" v-model="formData.isOpen" placeholder="请您选择">
                        <el-option v-for="isOpenItem in ynOptions" :key="isOpenItem.name"
                                   :label="isOpenItem.label" :value="isOpenItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="关注 :" prop="followNum">
                      <el-input class="input-v2-rao" v-model="formData.followNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="浏览 :" prop="readNum">
                      <el-input class="input-v2-rao" v-model="formData.readNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="点赞 :" prop="commendNum">
                      <el-input class="input-v2-rao" v-model="formData.commendNum"
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
                      {{formData.userName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="用户 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="用户类型 :" prop="userTypeCode">
                            <span v-if="formData.userTypeCodeStr"
                                  :style="{'color':formData.userTypeCodeStr.split(';')[1]}">{{formData.userTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.spaceTitle">
                          <el-form-item label="空间标题 :" prop="spaceTitle">
                            <span v-if="formData.spaceTitle">{{formData.spaceTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="主图 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.bgImagePath">
                          <el-form-item label="背景图 :" prop="bgImagePath">
                            <span v-if="formData.bgImagePath">{{formData.bgImagePath}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.spaceSlogan">
                          <el-form-item label="空间口号 :" prop="spaceSlogan">
                            <span v-if="formData.spaceSlogan">{{formData.spaceSlogan}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="开通时间 :" prop="openedDt">
                            <span v-if="formData.openedDt"> {{formData.openedDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="是否开放 :" prop="isOpen">
                            <el-switch v-model="formData.isOpen == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.followNum">
                          <el-form-item label="关注 :" prop="followNum">
                            <span v-if="formData.followNum">{{formData.followNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.readNum">
                          <el-form-item label="浏览 :" prop="readNum">
                            <span v-if="formData.readNum">{{formData.readNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.commendNum">
                          <el-form-item label="点赞 :" prop="commendNum">
                            <span v-if="formData.commendNum">{{formData.commendNum}}</span>
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
                    <router-link :to="`/basedata/listPersonalStudySpaceFollow?studySpaceId=`+
                                  formData.studySpaceId">
                      <i class="iconfont icon-icon_liebiao"></i>空间关注
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
  import api from "./personalstudyspaceUrl";
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

        userTypeCodeOptions: [{"label": "全部", "name": ""}],
        userTypeCode : null,
        imagePathFileList :[],
        imagePathFileType:'',
        ynOptions :[{"label": "全部", "name": ""}],
        isOpen : null,
        formData:{
              studySpaceId:'',
              spaceTitle :"",
              imagePath :"",
              spaceSlogan :"",
              isOpen :"",
              followNum :"",
              readNum :"",
              commendNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              userTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              spaceTitle :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              bgImagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              spaceSlogan :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

              ],
              isOpen :
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
          commonApi.getCodeIntType("userType").then(res => {
            let viewList = res.data.data || [];
            for (let userTypeItem of viewList) {
              this.userTypeCodeOptions.push({
                "label": userTypeItem.codeDesc,
                "name": userTypeItem.codeId
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
