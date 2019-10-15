<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="建议 :" prop="suggestionTitle">
              <el-input class="input-v2-rao" v-model="formData.suggestionTitle"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建议内容 :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建议时间 :" prop="suggestedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.suggestedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建议状态 :" prop="menuSuggestionStatusCode">
              <el-select class="select-v2-rao" v-model="formData.menuSuggestionStatusCode" placeholder="请您选择">
                <el-option v-for="menuSuggestionStatusCodeItem in menuSuggestionStatusCodeOptions"
                           :key="menuSuggestionStatusCodeItem.name"
                           :label="menuSuggestionStatusCodeItem.label" :value="menuSuggestionStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="建议 :" prop="suggestionTitle">
              <el-input class="input-v2-rao" v-model="formData.suggestionTitle"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建议内容 :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="建议时间 :" prop="suggestedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.suggestedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建议状态 :" prop="menuSuggestionStatusCode">
              <el-select class="select-v2-rao" v-model="formData.menuSuggestionStatusCode" placeholder="请您选择">
                <el-option v-for="menuSuggestionStatusCodeItem in menuSuggestionStatusCodeOptions"
                           :key="menuSuggestionStatusCodeItem.name"
                           :label="menuSuggestionStatusCodeItem.label" :value="menuSuggestionStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教师 :" prop="teacherId">
              <el-input class="input-v2-rao" v-model="formData.teacherId"
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
                  {{formData.suggestionTitle}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.suggestionTitle">
                    <el-form-item label="建议 :" prop="suggestionTitle">
                      <span v-if="formData.suggestionTitle">{{formData.suggestionTitle}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="图片 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                    </el-form-item>
                  </div>


                  <div class="p100" v-if="formData.content">
                    <el-form-item label="建议内容 :" prop="content">
                      <span v-if="formData.content" v-html="formData.content"></span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="建议时间 :" prop="suggestedDt">
                      <span v-if="formData.suggestedDt"> {{formData.suggestedDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="建议状态 :" prop="menuSuggestionStatusCode">
                            <span v-if="formData.menuSuggestionStatusCodeStr"
                                  :style="{'color':formData.menuSuggestionStatusCodeStr.split(';')[1]}">{{formData.menuSuggestionStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.teacherName">
                    <el-form-item label="教师 :" prop="teacherName">
                      <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="教师类型 :" prop="teacherTypeCode">
                            <span v-if="formData.teacherTypeCodeStr"
                                  :style="{'color':formData.teacherTypeCodeStr.split(';')[1]}">{{formData.teacherTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.teacherPositionName">
                    <el-form-item label="教师职位 :" prop="teacherPositionName">
                      <span v-if="formData.teacherPositionName">{{formData.teacherPositionName}}</span>
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
  import api from "./teachermenusuggestionUrl";
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

        imagePathFileList: [],
        imagePathFileType: '',
        menuSuggestionStatusCodeOptions: [{"label": "全部", "name": ""}], menuSuggestionStatusCode: null,
        teacherTypeCodeOptions: [{"label": "全部", "name": ""}], teacherTypeCode: null,
        formData: {
          menuSuggestionId: '',
          suggestionTitle: "",
          imagePath: "",
          content: "",
          suggestedDt: "",
          menuSuggestionStatusCode: "",
          teacherId: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          suggestionTitle:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          imagePath:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          content:
            [
              {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

            ],
          suggestedDt:
            [],
          menuSuggestionStatusCode:
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
    created() {
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("menuSuggestionStatus").then(res => {
        let viewList = res.data.data || [];
        for (let menuSuggestionStatusItem of viewList) {
          this.menuSuggestionStatusCodeOptions.push({
            "label": menuSuggestionStatusItem.codeDesc,
            "name": menuSuggestionStatusItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("teacherType").then(res => {
        let viewList = res.data.data || [];
        for (let teacherTypeItem of viewList) {
          this.teacherTypeCodeOptions.push({
            "label": teacherTypeItem.codeDesc,
            "name": teacherTypeItem.codeId
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
