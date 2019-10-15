
                                            
<template>
  <div>
    <div class="edit-box">


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                      {{formData.imagePath}}
                </div>
                <div class="detail-item-v2">

                        <div class="p100">
                          <el-form-item label="图标 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.entityName">
                          <el-form-item label="信息 :" prop="entityName">
                            <span v-if="formData.entityName">{{formData.entityName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.entityTypeName">
                          <el-form-item label="信息类型 :" prop="entityTypeName">
                            <span v-if="formData.entityTypeName">{{formData.entityTypeName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="推送时间 :" prop="pushedDt">
                            <span v-if="formData.pushedDt"> {{formData.pushedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="子女 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.parentName">
                          <el-form-item label="推送家长 :" prop="parentName">
                            <span v-if="formData.parentName">{{formData.parentName}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="已阅读 :" prop="isRead">
                            <el-switch v-model="formData.isRead == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="阅读时间 :" prop="readDt">
                            <span v-if="formData.readDt"> {{formData.readDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.readParentName">
                          <el-form-item label="阅读家长 :" prop="readParentName">
                            <span v-if="formData.readParentName">{{formData.readParentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="状态 :" prop="pushReadStatusCode">
                            <span v-if="formData.pushReadStatusCodeStr"
                                  :style="{'color':formData.pushReadStatusCodeStr.split(';')[1]}">{{formData.pushReadStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="级别 :" prop="pushReadLevelCode">
                            <span v-if="formData.pushReadLevelCodeStr"
                                  :style="{'color':formData.pushReadLevelCodeStr.split(';')[1]}">{{formData.pushReadLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.pushReadRemark">
                          <el-form-item label="备注 :" prop="pushReadRemark">
                            <span v-if="formData.pushReadRemark">{{formData.pushReadRemark}}</span>
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
  import api from "./entitypushreadUrl";
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

        imagePathFileList :[],
        imagePathFileType:'',
        ynOptions :[{"label": "全部", "name": ""}], isRead : null,
        pushReadStatusCodeOptions: [{"label": "全部", "name": ""}], pushReadStatusCode : null,
        pushReadLevelCodeOptions: [{"label": "全部", "name": ""}], pushReadLevelCode : null,
        formData:{
              pushReadId:'',
              isRead :"",
              readDt :"",
              readParentName :"",
              readParentId :"",
              readParentUserId :"",
              pushReadStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              imagePath :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

              ],
              entityName :
              [
                  {required: true, message: "请您输入信息", trigger: "blur"},
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              entityId :
              [
                  {required: true, message: "请您输入信息id", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              entityType :
              [
                  {required: true, message: "请您输入信息类型", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              entityTypeName :
              [
                  {required: true, message: "请您输入信息类型", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              parentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              parentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              parentUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              readParentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              readParentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              readParentUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pushReadStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pushReadLevelCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              pushReadRemark :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

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
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("pushReadStatus").then(res => {
            let viewList = res.data.data || [];
            for (let pushReadStatusItem of viewList) {
              this.pushReadStatusCodeOptions.push({
                "label": pushReadStatusItem.codeDesc,
                "name": pushReadStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("pushReadLevel").then(res => {
            let viewList = res.data.data || [];
            for (let pushReadLevelItem of viewList) {
              this.pushReadLevelCodeOptions.push({
                "label": pushReadLevelItem.codeDesc,
                "name": pushReadLevelItem.codeId
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
