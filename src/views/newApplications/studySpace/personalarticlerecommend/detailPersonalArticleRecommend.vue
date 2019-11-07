

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="文章id :" prop="articleId">
                      <el-input class="input-v2-rao" v-model="formData.articleId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 文章id colName:article_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="标题 :" prop="articleTitle">
                      <el-input class="input-v2-rao" v-model="formData.articleTitle"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 标题 colName:article_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="推荐人 :" prop="userId">
                      <el-input class="input-v2-rao" v-model="formData.userId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>

<!-- 推荐人 colName:user_name sqlType:VARCHAR notnull:false -->
                  <el-col v-show="false" :span="24">
                    <el-form-item label="推荐时间 :" prop="recommendDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.recommendDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 推荐时间 colName:recommend_dt sqlType:TIMESTAMP notnull:false -->

<!-- 机构id colName:school_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="机构 :" prop="schoolName">
                      <el-select class="select-v2-rao" v-model="schoolId" placeholder="请您选择">
                        <el-option v-for="schoolNameItem in schoolNames"
                                  :key="schoolNameItem.id"
                                  :label="schoolNameItem.label" :value="schoolNameItem.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 机构 colName:school_name sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="推荐状态 :" prop="articleRecommendStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.articleRecommendStatusCode" placeholder="请您选择">
                        <el-option v-for="articleRecommendStatusCodeItem in articleRecommendStatusCodeOptions"
                                   :key="articleRecommendStatusCodeItem.name"
                                   :label="articleRecommendStatusCodeItem.label" :value="articleRecommendStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="机构 :" prop="schoolName">
                      <el-input class="input-v2-rao" v-model="formData.schoolName"
                                maxlength="128"></el-input>
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
                      {{formData.articleTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.articleTitle">
                          <el-form-item label="标题 :" prop="articleTitle">
                            <span v-if="formData.articleTitle">{{formData.articleTitle}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="推荐人 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="推荐时间 :" prop="recommendDt">
                            <span v-if="formData.recommendDt"> {{formData.recommendDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="推荐状态 :" prop="articleRecommendStatusCode">
                            <span v-if="formData.articleRecommendStatusCodeStr"
                                  :style="{'color':formData.articleRecommendStatusCodeStr.split(';')[1]}">{{formData.articleRecommendStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.schoolName">
                          <el-form-item label="机构 :" prop="schoolName">
                            <span v-if="formData.schoolName">{{formData.schoolName}}</span>
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
  import api from "./personalarticlerecommendUrl";
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

        articleRecommendStatusCodeOptions: [{"label": "全部", "name": ""}],
        schoolNames: [{"label":"全部","id":""}],
        articleRecommendStatusCode : null,
        formData:{
              articleRecommendId:'',
              articleRecommendStatusCode :"",
              schoolId: null,
              schoolName :"",
        },
        schoolId: null,
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              articleId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              articleTitle :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              userId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              userName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              recommendDt :
              [

              ],
              schoolId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              schoolName :
              [
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

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
          commonApi.getCodeIntType("articleRecommendStatus").then(res => {
            let viewList = res.data.data || [];
            for (let articleRecommendStatusItem of viewList) {
              this.articleRecommendStatusCodeOptions.push({
                "label": articleRecommendStatusItem.codeDesc,
                "name": articleRecommendStatusItem.codeId
              });
            }
          });

          // 机构推荐
          commonApi.getAllSchool().then(res => {
              let viewListsl = res.data.data || [];
              for (let schoolNameItem of viewListsl.records) {
                this.schoolNames.push({
                  "label": schoolNameItem.schoolOrgName,
                  "id": schoolNameItem.schoolOrgId
                });
              }
            }, res => {
              this.$message.error(res.data.message);
            });
    },
    watch: {
      schoolId(newf,oldf){
        this.formData.schoolId = newf;
      }
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
