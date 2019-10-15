

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="敏感词内容 *  :" prop="sensitiveContent">
                      <el-input class="input-v2-rao" v-model="formData.sensitiveContent"
                                maxlength="100"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="操作 :" prop="sensitiveOptionCode">
                      <el-select class="select-v2-rao" v-model="formData.sensitiveOptionCode" placeholder="请您选择">
                        <el-option v-for="sensitiveOptionCodeItem in sensitiveOptionCodeOptions"
                                   :key="sensitiveOptionCodeItem.name"
                                   :label="sensitiveOptionCodeItem.label" :value="sensitiveOptionCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="预备替换内容 :" prop="sensitiveReplace">
                      <el-input class="input-v2-rao" v-model="formData.sensitiveReplace"
                                maxlength="100"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="状态 :" prop="sensitiveStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.sensitiveStatusCode" placeholder="请您选择">
                        <el-option v-for="sensitiveStatusCodeItem in sensitiveStatusCodeOptions"
                                   :key="sensitiveStatusCodeItem.name"
                                   :label="sensitiveStatusCodeItem.label" :value="sensitiveStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="分类 :" prop="sensitiveTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.sensitiveTypeCode" placeholder="请您选择">
                        <el-option v-for="sensitiveTypeCodeItem in sensitiveTypeCodeOptions"
                                   :key="sensitiveTypeCodeItem.name"
                                   :label="sensitiveTypeCodeItem.label" :value="sensitiveTypeCodeItem.name">
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
                    <el-form-item label="敏感词内容 *  :" prop="sensitiveContent">
                      <el-input class="input-v2-rao" v-model="formData.sensitiveContent"
                                maxlength="100"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="操作 :" prop="sensitiveOptionCode">
                      <el-select class="select-v2-rao" v-model="formData.sensitiveOptionCode" placeholder="请您选择">
                        <el-option v-for="sensitiveOptionCodeItem in sensitiveOptionCodeOptions"
                                   :key="sensitiveOptionCodeItem.name"
                                   :label="sensitiveOptionCodeItem.label" :value="sensitiveOptionCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="预备替换内容 :" prop="sensitiveReplace">
                      <el-input class="input-v2-rao" v-model="formData.sensitiveReplace"
                                maxlength="100"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="状态 :" prop="sensitiveStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.sensitiveStatusCode" placeholder="请您选择">
                        <el-option v-for="sensitiveStatusCodeItem in sensitiveStatusCodeOptions"
                                   :key="sensitiveStatusCodeItem.name"
                                   :label="sensitiveStatusCodeItem.label" :value="sensitiveStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="分类 :" prop="sensitiveTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.sensitiveTypeCode" placeholder="请您选择">
                        <el-option v-for="sensitiveTypeCodeItem in sensitiveTypeCodeOptions"
                                   :key="sensitiveTypeCodeItem.name"
                                   :label="sensitiveTypeCodeItem.label" :value="sensitiveTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

          </el-form>
        </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            {{formData.sensitiveContent}}
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.sensitiveContent">
                          <el-form-item label="敏感词内容 :" prop="sensitiveContent">
                            <span v-if="formData.sensitiveContent">{{formData.sensitiveContent}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="操作 :" prop="sensitiveOptionCode">
                            <span v-if="formData.sensitiveOptionCodeStr"
                                  :style="{'color':formData.sensitiveOptionCodeStr.split(';')[1]}">{{formData.sensitiveOptionCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.sensitiveReplace">
                          <el-form-item label="预备替换内容 :" prop="sensitiveReplace">
                            <span v-if="formData.sensitiveReplace">{{formData.sensitiveReplace}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="状态 :" prop="sensitiveStatusCode">
                            <span v-if="formData.sensitiveStatusCodeStr"
                                  :style="{'color':formData.sensitiveStatusCodeStr.split(';')[1]}">{{formData.sensitiveStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="分类 :" prop="sensitiveTypeCode">
                            <span v-if="formData.sensitiveTypeCodeStr"
                                  :style="{'color':formData.sensitiveTypeCodeStr.split(';')[1]}">{{formData.sensitiveTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.sensitiveHitCount">
                          <el-form-item label="敏感词匹配次数 :" prop="sensitiveHitCount">
                            <span v-if="formData.sensitiveHitCount">{{formData.sensitiveHitCount}}</span>
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
                   :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./sensitivewordsUrl";
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

        sensitiveOptionCodeOptions: [{"label": "全部", "name": ""}], sensitiveOptionCode : null,
        sensitiveStatusCodeOptions: [{"label": "全部", "name": ""}], sensitiveStatusCode : null,
        sensitiveTypeCodeOptions: [{"label": "全部", "name": ""}], sensitiveTypeCode : null,
        formData:{
              sensitiveId:'',
              sensitiveContent :"",
              sensitiveOptionCode :"",
              sensitiveReplace :"",
              sensitiveStatusCode :"",
              sensitiveTypeCode :"",
              sensitiveHitCount :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              sensitiveContent :
              [
                  {required: true, message: "请您输入敏感词内容", trigger: "blur"},
                  {max: 100, message: "最多能输入100个字", trigger: "blur"},

              ],
              sensitiveOptionCode :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              sensitiveReplace :
              [
                  {max: 100, message: "最多能输入100个字", trigger: "blur"},

              ],
              sensitiveStatusCode :
              [
                  {max: 16, message: "最多能输入16个字", trigger: "blur"},

              ],
              sensitiveTypeCode :
              [
                  {max: 16, message: "最多能输入16个字", trigger: "blur"},

              ],
              sensitiveHitCount :
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
          commonApi.getCodeIntType("sensitiveOption").then(res => {
            let viewList = res.data.data || [];
            for (let sensitiveOptionItem of viewList) {
              this.sensitiveOptionCodeOptions.push({
                "label": sensitiveOptionItem.codeDesc,
                "name": sensitiveOptionItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("sensitiveStatus").then(res => {
            let viewList = res.data.data || [];
            for (let sensitiveStatusItem of viewList) {
              this.sensitiveStatusCodeOptions.push({
                "label": sensitiveStatusItem.codeDesc,
                "name": sensitiveStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("sensitiveType").then(res => {
            let viewList = res.data.data || [];
            for (let sensitiveTypeItem of viewList) {
              this.sensitiveTypeCodeOptions.push({
                "label": sensitiveTypeItem.codeDesc,
                "name": sensitiveTypeItem.codeId
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



  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
