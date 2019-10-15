
                    
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="菜谱类型 *  :" prop="menuTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.menuTypeCode" placeholder="请您选择">
                        <el-option v-for="menuTypeCodeItem in menuTypeCodeOptions"
                                   :key="menuTypeCodeItem.name"
                                   :label="menuTypeCodeItem.label" :value="menuTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="菜谱 *  :" prop="menuName">
                      <el-input class="input-v2-rao" v-model="formData.menuName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 *  :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="描述 *  :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="价格 :" prop="price">
                      <el-input class="input-v2-rao" v-model="formData.price"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="菜谱类型 *  :" prop="menuTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.menuTypeCode" placeholder="请您选择">
                        <el-option v-for="menuTypeCodeItem in menuTypeCodeOptions"
                                   :key="menuTypeCodeItem.name"
                                   :label="menuTypeCodeItem.label" :value="menuTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="菜谱 *  :" prop="menuName">
                      <el-input class="input-v2-rao" v-model="formData.menuName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 *  :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="描述 *  :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="价格 :" prop="price">
                      <el-input class="input-v2-rao" v-model="formData.price"
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
                      {{formData.menuTypeCode}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50">
                          <el-form-item label="菜谱类型 :" prop="menuTypeCode">
                            <span v-if="formData.menuTypeCodeStr"
                                  :style="{'color':formData.menuTypeCodeStr.split(';')[1]}">{{formData.menuTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.menuName">
                          <el-form-item label="菜谱 :" prop="menuName">
                            <span v-if="formData.menuName">{{formData.menuName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.description">
                          <el-form-item label="描述 :" prop="description">
                            <span v-if="formData.description" v-html="formData.description"></span>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.price">
                          <el-form-item label="价格 :" prop="price">
                            <span v-if="formData.price">{{formData.price}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.sequnceNum">
                          <el-form-item label="序号 :" prop="sequnceNum">
                            <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
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
                    <router-link :to="`/basedata/listSchoolMenuProduct?menuId=`+
                                  formData.menuId">
                      <i class="iconfont icon-icon_liebiao"></i>学校菜谱食材
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listSchoolMenuDaily?menuId=`+
                                  formData.menuId">
                      <i class="iconfont icon-icon_liebiao"></i>学校今日菜谱
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
  import api from "./schoolmenuUrl";
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

        menuTypeCodeOptions: [{"label": "全部", "name": ""}], menuTypeCode : null,
        imagePathFileList :[],
        imagePathFileType:'',
        formData:{
              menuId:'',
              menuTypeCode :"",
              menuName :"",
              imagePath :"",
              description :"",
              price :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              menuTypeCode :
              [
                  {required: true, message: "请您输入菜谱类型", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              menuName :
              [
                  {required: true, message: "请您输入菜谱", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {required: true, message: "请您输入图片", trigger: "blur"},
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              description :
              [
                  {required: true, message: "请您输入描述", trigger: "blur"},
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              price :
              [
                  {validator: validation.number, trigger: "blur"},

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
          commonApi.getCodeIntType("menuType").then(res => {
            let viewList = res.data.data || [];
            for (let menuTypeItem of viewList) {
              this.menuTypeCodeOptions.push({
                "label": menuTypeItem.codeDesc,
                "name": menuTypeItem.codeId
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
