
                                                      
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="信件标题 *  :" prop="principalMailTitle">
                      <el-input class="input-v2-rao" v-model="formData.principalMailTitle"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 信件标题 colName:principal_mail_title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="信件内容 *  :" prop="principalMailContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.principalMailContent" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 信件内容 colName:principal_mail_content sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="信件类型 *  :" prop="principalMailTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.principalMailTypeCode" placeholder="请您选择">
                        <el-option v-for="principalMailTypeCodeItem in principalMailTypeCodeOptions"
                                   :key="principalMailTypeCodeItem.name"
                                   :label="principalMailTypeCodeItem.label" :value="principalMailTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 信件类型 colName:principal_mail_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="阅读时间 :" prop="readDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.readDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 阅读时间 colName:read_dt sqlType:TIMESTAMP notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="已读 :" prop="isRead">
                      <el-select class="select-v2-rao" v-model="formData.isRead" placeholder="请您选择">
                        <el-option v-for="isReadItem in ynOptions" :key="isReadItem.name"
                                   :label="isReadItem.label" :value="isReadItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="阅读时间 :" prop="readDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.readDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="已回执 :" prop="isReceipt">
                      <el-select class="select-v2-rao" v-model="formData.isReceipt" placeholder="请您选择">
                        <el-option v-for="isReceiptItem in ynOptions" :key="isReceiptItem.name"
                                   :label="isReceiptItem.label" :value="isReceiptItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="回执时间 :" prop="receiptDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.receiptDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="回执内容 :" prop="receiptContent"
                                  class="orgIntroduction">
                      <editor v-model="formData.receiptContent" :true-height="350"/>
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
                      {{formData.principalMailTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.principalMailTitle">
                          <el-form-item label="信件标题 :" prop="principalMailTitle">
                            <span v-if="formData.principalMailTitle">{{formData.principalMailTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.principalMailContent">
                          <el-form-item label="信件内容 :" prop="principalMailContent">
                            <span v-if="formData.principalMailContent" v-html="formData.principalMailContent"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="信件类型 :" prop="principalMailTypeCode">
                            <span v-if="formData.principalMailTypeCodeStr"
                                  :style="{'color':formData.principalMailTypeCodeStr.split(';')[1]}">{{formData.principalMailTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="已读 :" prop="isRead">
                            <el-switch v-model="formData.isRead == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="阅读时间 :" prop="readDt">
                            <span v-if="formData.readDt"> {{formData.readDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="已回执 :" prop="isReceipt">
                            <el-switch v-model="formData.isReceipt == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="回执时间 :" prop="receiptDt">
                            <span v-if="formData.receiptDt"> {{formData.receiptDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.gradeName">
                          <el-form-item label="年级 :" prop="gradeName">
                            <span v-if="formData.gradeName">{{formData.gradeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.parentName">
                          <el-form-item label="家长 :" prop="parentName">
                            <span v-if="formData.parentName">{{formData.parentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherName ">
                          <el-form-item label="校长姓名 :" prop="teacherName ">
                            <span v-if="formData.teacherName ">{{formData.teacherName }}</span>
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
  import api from "./principalmailboxUrl";
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

        principalMailTypeCodeOptions: [{"label": "全部", "name": ""}],
        principalMailTypeCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isRead : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isReceipt : null,
        formData:{
              principalMailId:'',
              isRead :"",
              readDt :"",
              isReceipt :"",
              receiptDt :"",
              receiptContent :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              principalMailTitle :
              [
                  {required: true, message: "请您输入信件标题", trigger: "blur"},
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

              ],
              principalMailContent :
              [
                  {required: true, message: "请您输入信件内容", trigger: "blur"},
                  {max: 2000, message: "最多能输入2000个字", trigger: "blur"},

              ],
              principalMailTypeCode :
              [
                  {required: true, message: "请您输入信件类型", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              readDt :
              [

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
          commonApi.getCodeIntType("principalMailType").then(res => {
            let viewList = res.data.data || [];
            for (let principalMailTypeItem of viewList) {
              this.principalMailTypeCodeOptions.push({
                "label": principalMailTypeItem.codeDesc,
                "name": principalMailTypeItem.codeId
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
