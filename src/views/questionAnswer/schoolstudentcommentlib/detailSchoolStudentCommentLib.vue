
                      
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="表扬 *  :" prop="isPraise">
                      <el-select class="select-v2-rao" v-model="formData.isPraise" placeholder="请您选择">
                        <el-option v-for="isPraiseItem in ynOptions" :key="isPraiseItem.name"
                                   :label="isPraiseItem.label" :value="isPraiseItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 表扬 colName:is_praise sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="批评 *  :" prop="isCriticize">
                      <el-select class="select-v2-rao" v-model="formData.isCriticize" placeholder="请您选择">
                        <el-option v-for="isCriticizeItem in ynOptions" :key="isCriticizeItem.name"
                                   :label="isCriticizeItem.label" :value="isCriticizeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 批评 colName:is_criticize sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评语 *  :" prop="commentContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.commentContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 评语 colName:comment_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="评分 :" prop="commentScore">
                      <el-input class="input-v2-rao" v-model="formData.commentScore"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 评分 colName:comment_score sqlType:FLOAT notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="适用次数 :" prop="usedTimes">
                      <el-input class="input-v2-rao" v-model="formData.usedTimes"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 适用次数 colName:used_times sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 序号 colName:sequnce_num sqlType:INTEGER notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="表扬 *  :" prop="isPraise">
                      <el-select class="select-v2-rao" v-model="formData.isPraise" placeholder="请您选择">
                        <el-option v-for="isPraiseItem in ynOptions" :key="isPraiseItem.name"
                                   :label="isPraiseItem.label" :value="isPraiseItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="批评 *  :" prop="isCriticize">
                      <el-select class="select-v2-rao" v-model="formData.isCriticize" placeholder="请您选择">
                        <el-option v-for="isCriticizeItem in ynOptions" :key="isCriticizeItem.name"
                                   :label="isCriticizeItem.label" :value="isCriticizeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="评语 *  :" prop="commentContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.commentContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="评分 :" prop="commentScore">
                      <el-input class="input-v2-rao" v-model="formData.commentScore"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="适用次数 :" prop="usedTimes">
                      <el-input class="input-v2-rao" v-model="formData.usedTimes"
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
                      {{formData.isPraise}}
                </div>
                <div class="detail-item-v2">

                        <div class="p50">
                          <el-form-item label="表扬 :" prop="isPraise">
                            <el-switch v-model="formData.isPraise == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>


                        <div class="p50">
                          <el-form-item label="批评 :" prop="isCriticize">
                            <el-switch v-model="formData.isCriticize == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.commentContent">
                          <el-form-item label="评语 :" prop="commentContent">
                            <span v-if="formData.commentContent" v-html="formData.commentContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.commentScore">
                          <el-form-item label="评分 :" prop="commentScore">
                            <span v-if="formData.commentScore">{{formData.commentScore}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.usedTimes">
                          <el-form-item label="适用次数 :" prop="usedTimes">
                            <span v-if="formData.usedTimes">{{formData.usedTimes}}</span>
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
  import api from "./schoolstudentcommentlibUrl";
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

        studentCommentTypeCodeOptions: [{"label": "全部", "name": ""}],
        studentCommentTypeCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isPraise : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isCriticize : null,
        formData:{
              commentLibId:'',
              isPraise :"",
              isCriticize :"",
              commentContent :"",
              commentScore :"",
              usedTimes :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              isPraise :
              [
                  {required: true, message: "请您输入表扬", trigger: "blur"},
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              isCriticize :
              [
                  {required: true, message: "请您输入批评", trigger: "blur"},
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              commentContent :
              [
                  {required: true, message: "请您输入评语", trigger: "blur"},
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              commentScore :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              usedTimes :
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
   // directives: {preview},
    created() {
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("studentCommentType").then(res => {
            let viewList = res.data.data || [];
            for (let studentCommentTypeItem of viewList) {
              this.studentCommentTypeCodeOptions.push({
                "label": studentCommentTypeItem.codeDesc,
                "name": studentCommentTypeItem.codeId
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
