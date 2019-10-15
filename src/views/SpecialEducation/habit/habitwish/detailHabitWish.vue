<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <!--<el-col :span="24">-->
          <!--<el-form-item label="心愿类型 *  :" prop="wishTypeId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.wishTypeId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="心愿名称 *  :" prop="wishName">
              <el-input class="input-v2-rao" v-model="formData.wishName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">

            <el-form-item label="心愿类型 *  :" prop="wishTypeId">
              <!--<el-input class="input-v2-rao" v-model="formData.parentTypeId"-->
              <!--maxlength="32"></el-input>-->
              <el-select v-model="formData.wishTypeId" class="select-v2-rao">
                <el-option :label="item.wishTypeName" :value="item.wishTypeId" :key="item.wishTypeId"
                           v-for="item in optionList"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="心愿状态 :" prop="wishStatusCode">
              <el-select class="select-v2-rao" v-model="formData.wishStatusCode" placeholder="请您选择">
                <el-option v-for="wishStatusCodeItem in wishStatusCodeOptions"
                           :key="wishStatusCodeItem.name"
                           :label="wishStatusCodeItem.label" :value="wishStatusCodeItem.name">
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
            <el-form-item label="内容详情 :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="兑换花值 *  :" prop="flowerValue">
              <el-input class="input-v2-rao" v-model="formData.flowerValue"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布时间 :" prop="publishedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.publishedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
            <!--<el-form-item label="适用范围 :" prop="scope"-->
                          <!--class="orgIntroduction">-->
              <!--<editor v-model="formData.scope" :true-height="350"/>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="心愿名称 *  :" prop="wishName">
              <el-input class="input-v2-rao" v-model="formData.wishName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="心愿状态 :" prop="wishStatusCode">
              <el-select class="select-v2-rao" v-model="formData.wishStatusCode" placeholder="请您选择">
                <el-option v-for="wishStatusCodeItem in wishStatusCodeOptions"
                           :key="wishStatusCodeItem.name"
                           :label="wishStatusCodeItem.label" :value="wishStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
            <!--<el-form-item label="内容详情 :" prop="content"-->
                          <!--class="orgIntroduction">-->
              <!--<editor v-model="formData.content" :true-height="350"/>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="24">
            <el-form-item label="兑换花值 *  :" prop="flowerValue">
              <el-input class="input-v2-rao" v-model="formData.flowerValue"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="适用范围 :" prop="scope"
                          class="orgIntroduction">
              <editor v-model="formData.scope" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="被选次数 :" prop="selectedNum">
              <el-input class="input-v2-rao" v-model="formData.selectedNum"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="序号 :" prop="sequnceNum">
              <el-input class="input-v2-rao" v-model="formData.sequnceNum"
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
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.wishTypeName">
                    <el-form-item label="心愿类型 :" prop="wishTypeName">
                      <span v-if="formData.wishTypeName">{{formData.wishTypeName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.wishName">
                    <el-form-item label="心愿 :" prop="wishName">
                      <span v-if="formData.wishName">{{formData.wishName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="心愿状态 :" prop="wishStatusCode">
                            <span v-if="formData.wishStatusCodeStr"
                                  :style="{'color':formData.wishStatusCodeStr.split(';')[1]}">{{formData.wishStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="图片 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                    </el-form-item>
                  </div>


                  <div class="p100" v-if="formData.content">
                    <el-form-item label="内容详情 :" prop="content">
                      <span v-if="formData.content" v-html="formData.content"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.flowerValue">
                    <el-form-item label="兑换花值 :" prop="flowerValue">
                      <span v-if="formData.flowerValue">{{formData.flowerValue}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="发布时间 :" prop="publishedDt">
                      <span v-if="formData.publishedDt"> {{formData.publishedDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.scope">
                    <el-form-item label="适用范围 :" prop="scope">
                      <span v-if="formData.scope" v-html="formData.scope"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.selectedNum">
                    <el-form-item label="被选次数 :" prop="selectedNum">
                      <span v-if="formData.selectedNum">{{formData.selectedNum}}</span>
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
  import api from "./habitwishUrl";
  import apiType from "../habitwishtype/habitwishtypeUrl";
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
        optionList: [],
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        wishStatusCodeOptions: [{"label": "全部", "name": ""}],
        wishStatusCode: null,
        imagePathFileList: [],
        imagePathFileType: '',
        formData: {
          wishId: '',
          wishName: "",
          wishTypeId: "",
          wishStatusCode: "",
          imagePath: "",
          content: "",
          flowerValue: "",
          scope: "",
          selectedNum: "",
          sequnceNum: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          wishTypeId:
            [
              {required: true, message: "请您输入心愿类型", trigger: "blur"},
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          wishTypeName:
            [
              {max: 128, message: "最多能输入128个字", trigger: "blur"},

            ],
          wishName:
            [
              {required: true, message: "请您输入心愿", trigger: "blur"},
              {max: 64, message: "最多能输入64个字", trigger: "blur"},

            ],
          wishStatusCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          imagePath:
            [
              {max: 256, message: "最多能输入256个字", trigger: "blur"},

            ],
          content:
            [
              {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

            ],
          flowerValue:
            [
              {required: true, message: "请您输入兑换花值", trigger: "blur"},
              {validator: validation.number, trigger: "blur"},

            ],
          publishedDt:
            [],
          scope:
            [
              {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

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
      apiType.fetchList({page: 1, limit: 999}).then(res => {
        let arr = [];
        this.optionList =res.data.data.records;
      })
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("wishStatus").then(res => {
        let viewList = res.data.data || [];
        for (let wishStatusItem of viewList) {
          this.wishStatusCodeOptions.push({
            "label": wishStatusItem.codeDesc,
            "name": wishStatusItem.codeId
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
