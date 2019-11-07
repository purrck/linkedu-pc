
                              
<template>
  <div>
    <div class="edit-box">
      <div style="border: red solid 1px;width: 250px; position: absolute; top: 300px; right: 60px;">
      <div style="height: 30px;" v-for="record in records.records" :key="record.schoolName" >
        {{record.schoolName}} ,  {{record.recommendDt}}
      </div>
      </div>
      <div v-if="pageState === 'add'">
        <el-form
          :label-position="'right'"
          class="edit-form"
          label-width="120px"
          ref="formData"
          :inline="false"
          :model="formData"
          :rules="rules"
          size="small"
        >
          <el-col :span="24">
            <el-form-item label="文章标题 *  :" prop="articleTitle">
              <el-input class="input-v2-rao" v-model="formData.articleTitle" maxlength="128"></el-input>
            </el-form-item>
          </el-col>
          <!-- 文章标题 colName:article_title sqlType:VARCHAR notnull:false -->
          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath" />
            </el-form-item>
          </el-col>
          <!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
          <el-col :span="24">
            <el-form-item label="文章内容 *  :" prop="content" class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350" />
            </el-form-item>
          </el-col>
          <!-- 文章内容 colName:content sqlType:VARCHAR notnull:false -->
        </el-form>
      </div>
     
      <div v-if="pageState === 'edit'">
        <el-form
          :label-position="'right'"
          class="edit-form"
          label-width="120px"
          ref="formData"
          :inline="false"
          :model="formData"
          :rules="rules"
          size="small"
        >
          <el-col :span="24">
            <el-form-item label="文章标题 *  :" prop="articleTitle">
              <el-input class="input-v2-rao" v-model="formData.articleTitle" maxlength="128"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文章内容 *  :" prop="content" class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="状态 :" prop="personalArticleStatusCode">
              <el-select
                class="select-v2-rao"
                v-model="formData.personalArticleStatusCode"
                placeholder="请您选择"
              >
                <el-option
                  v-for="personalArticleStatusCodeItem in personalArticleStatusCodeOptions"
                  :key="personalArticleStatusCodeItem.name"
                  :label="personalArticleStatusCodeItem.label"
                  :value="personalArticleStatusCodeItem.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="个人置顶 :" prop="isPersonalRecommend">
              <el-select
                class="select-v2-rao"
                v-model="formData.isPersonalRecommend"
                placeholder="请您选择"
              >
                <el-option
                  v-for="isPersonalRecommendItem in ynOptions"
                  :key="isPersonalRecommendItem.name"
                  :label="isPersonalRecommendItem.label"
                  :value="isPersonalRecommendItem.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="序号 :" prop="sequnceNum">
              <el-input class="input-v2-rao" v-model="formData.sequnceNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="阅读 :" prop="readTimesNum">
              <el-input class="input-v2-rao" v-model="formData.readTimesNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="点赞 :" prop="praiseTimesNum">
              <el-input class="input-v2-rao" v-model="formData.praiseTimesNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="踩 :" prop="dislikeTimesNum">
              <el-input class="input-v2-rao" v-model="formData.dislikeTimesNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="评论 :" prop="commentTimesNum">
              <el-input class="input-v2-rao" v-model="formData.commentTimesNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form
              :label-position="'right'"
              label-width="120px"
              :inline="false"
              :model="formData"
              size="small"
              class="flex row wrap"
            >
              <div class="p100">
                <div class="detail-title-v2">{{formData.articleTitle}}</div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.articleTitle">
                    <el-form-item label="文章标题 :" prop="articleTitle">
                      <span v-if="formData.articleTitle">{{formData.articleTitle}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="图片 :" prop="imagePath">
                      <img :src="formData.imagePath" alt width="100px" v-show="formData.imagePath" />
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.content">
                    <el-form-item label="文章内容 :" prop="content">
                      <span v-if="formData.content" v-html="formData.content"></span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="发布时间 :" prop="publishedDt">
                      <span v-if="formData.publishedDt">{{formData.publishedDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.userName">
                    <el-form-item label="发布人 :" prop="userName">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="个人置顶 :" prop="isPersonalRecommend">
                      <el-switch v-model="formData.isPersonalRecommend == 'Y'" disabled></el-switch>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.sequnceNum">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.readTimesNum">
                    <el-form-item label="阅读 :" prop="readTimesNum">
                      <span v-if="formData.readTimesNum">{{formData.readTimesNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.praiseTimesNum">
                    <el-form-item label="点赞 :" prop="praiseTimesNum">
                      <span v-if="formData.praiseTimesNum">{{formData.praiseTimesNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.dislikeTimesNum">
                    <el-form-item label="踩 :" prop="dislikeTimesNum">
                      <span v-if="formData.dislikeTimesNum">{{formData.dislikeTimesNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.commentTimesNum">
                    <el-form-item label="评论 :" prop="commentTimesNum">
                      <span v-if="formData.commentTimesNum">{{formData.commentTimesNum}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly" >
              <ul>
                <li>
                  <!-- <router-link
                    :to="`/newApplications/listPersonalArticleRecommend?articleId=`+
                                  formData.articleId"
                  > -->
                    <i class="iconfont icon-icon_liebiao" ></i>文章机构推荐
                 <!--  </router-link> -->
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button
          v-if="pageState === 'edit'"
          type="primary"
          class="fush-btn button-v2-rao b93BF88"
          :loading="formLoading"
          size="medium"
          @click="submit('formData')"
        >更新</el-button>
        <el-button
          v-if="pageState === 'add'"
          type="primary"
          class="fush-btn button-v2-rao b93BF88"
          :loading="formLoading"
          size="medium"
          @click="submitSave('formData')"
        >保存</el-button>
        <el-button
          v-if="pageState === 'add'"
          type="primary"
          class="fush-btn button-v2-rao b93BF88"
          :loading="formLoading"
          size="medium"
          @click="submit('formData')"
        >发布</el-button>
        <el-button
          type="primary"
          class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
          size="medium"
          @click="goBack"
        >返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "./personalarticleUrl";
import validation from "@/util/validate2";
import commonApi from "@/api/common/common";
import editor from "@/components/editor/editor";
import upload from "@/components/upload/uploadFileV1";
import uploads from "@/components/upload/uploadFile";
//import preview from '@/util/preview';
export default {
  components: { editor, upload, uploads },
  data() {
    return {
      records:[],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      imagePathFileList: [],
      imagePathFileType: "",
      personalArticleStatusCodeOptions: [{ label: "全部", name: "" }],
      personalArticleStatusCode: null,
      ynOptions: [{ label: "全部", name: "" }],
      isPersonalRecommend: null,
      formData: {
        articleId: "",
        articleTitle: "",
        imagePath: "",
        content: "",
        personalArticleStatusCode: "",
        isPersonalRecommend: "",
        sequnceNum: "",
        readTimesNum: "",
        praiseTimesNum: "",
        dislikeTimesNum: "",
        commentTimesNum: ""
      },
      pickTime: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      rules: {
        articleTitle: [
          { required: true, message: "请您输入文章标题", trigger: "blur" },
          { max: 128, message: "最多能输入128个字", trigger: "blur" }
        ],
        imagePath: [
          { max: 255, message: "最多能输入255个字", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请您输入文章内容", trigger: "blur" },
          { max: 4000, message: "最多能输入4000个字", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    pageState() {
      return this.$route.params.type;
    }
  },
  // directives: {preview},
  created() {
    this.getRecommed(this.$route.params);
    
    this.getDetail(this.$route.params.id);
    commonApi.getCodeIntType("personalArticleStatus").then(res => {
      let viewList = res.data.data || [];
      for (let personalArticleStatusItem of viewList) {
        this.personalArticleStatusCodeOptions.push({
          label: personalArticleStatusItem.codeDesc,
          name: personalArticleStatusItem.codeId
        });
      }
    });
    commonApi.getCodeIntType("boolean_yn").then(res => {
      let viewList = res.data.data || [];
      for (let ynItem of viewList) {
        this.ynOptions.push({
          label: ynItem.codeDesc,
          name: ynItem.codeId
        });
      }
    });
  },
  methods: {
    getRecommed(params) {
      params.articleId = params.id,
      api.fetchCom(params).then(res => {
          if (res.data.resultCode === "000000") {
            this.records = res.data.data;
          }
        });
      
        /* api.fetchCom(params).then(res => {
          if (res.data.resultCode === "000000") {
            
            this.records = res.data.data;
            // console.log(this.records)
          }
        }); */
      
    },

    submit(formName) {
      const set = this.$refs;
      this.isLoaded = true;
      set[formName].validate(valid => {
        if (this.pageState === "edit" && valid) {
          this.formLoading = true;
          api.putObj(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.formLoading = false;
              this.$message.success("修改成功");
              this.goBack();
            } else {
              this.$message.error(res.data.message);
              this.formLoading = false;
            }
          });
        } else if (this.pageState === "add" && valid) {
          this.formLoading = true;
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.formLoading = false;
              this.$message.success("修改成功");
              this.goBack();
            } else {
              this.$message.error(res.data.message);
              this.formLoading = false;
            }
          });
        }
      });
      this.isLoaded = false;
    },
    // 保存
    submitSave(formName){
      this.formLoading = true;
      this.formData.personalArticleStatusCode = 'editing';
        api.addObj(this.formData).then(res => {
          if (res.data.resultCode === "000000") {
            this.formLoading = false;
            this.$message.success("修改成功");
            this.goBack();
          } else {
            this.$message.error(res.data.message);
            this.formLoading = false;
          }
        });
    },
    //获取图片上传信息
    uploadData(res) {
      this.formData.imagePath = res;
    },
    getDetail(paramsId) {
      if (this.pageState !== "add") {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === "000000") {
            this.formData = res.data.data;
          }
          this.isLoaded = false;
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
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
  margin: 0 15px;
}
</style>
