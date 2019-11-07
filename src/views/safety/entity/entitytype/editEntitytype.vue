<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'edit' || pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="实体名(英) :" prop="entityCnName">
              <el-input v-model="formData.entityCnName" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="实体名(中) :" prop="entityEnName">
              <el-input v-model="formData.entityEnName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="标识图 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="可分享 :" prop="isCanShare">
              <el-select v-model="formData.isCanShare" placeholder="请您选择">
                <el-option v-for="isCanShareItem in isCanShareOptions" :key="isCanShareItem.name"
                           :label="isCanShareItem.label" :value="isCanShareItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="可点评 :" prop="isCanReply">
              <el-select v-model="formData.isCanReply" placeholder="请您选择">
                <el-option v-for="isCanReplyItem in isCanShareOptions" :key="isCanReplyItem.name"
                           :label="isCanReplyItem.label" :value="isCanReplyItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="可收藏 :" prop="isCanCollect">
              <el-select v-model="formData.isCanCollect" placeholder="请您选择">
                <el-option v-for="isCanCollectItem in isCanShareOptions" :key="isCanCollectItem.name"
                           :label="isCanCollectItem.label" :value="isCanCollectItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="搜索索引 :" prop="searchIndex">
              <el-input v-model="formData.searchIndex" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="图集 :" prop="isHaveImages">
              <el-select v-model="formData.isHaveImages" placeholder="请您选择">
                <el-option v-for="isHaveImagesItem in isCanShareOptions" :key="isHaveImagesItem.name"
                           :label="isHaveImagesItem.label" :value="isHaveImagesItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">-->
            <!--<el-form-item label="对应表名 :" prop="tableName">-->
              <!--<el-input v-model="formData.tableName" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="主键字段 :" prop="tablePrimary">-->
              <!--<el-input v-model="formData.tablePrimary" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="分享数字段 :" prop="shareNumField">-->
              <!--<el-input v-model="formData.shareNumField" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="点评数字段 :" prop="replyNumField">-->
              <!--<el-input v-model="formData.replyNumField" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="收藏数字段 :" prop="collectNumField">-->
              <!--<el-input v-model="formData.collectNumField" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="点赞数字段 :" prop="likeNumField">-->
              <!--<el-input v-model="formData.likeNumField" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
            <!--<el-form-item label="点踩数字段 :" prop="unlikeNumField">-->
              <!--<el-input v-model="formData.unlikeNumField" maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="支持广告 :" prop="isSupportAdvert">
              <el-select v-model="formData.isSupportAdvert" placeholder="请您选择">
                <el-option v-for="isSupportAdvertItem in isCanShareOptions" :key="isSupportAdvertItem.name"
                           :label="isSupportAdvertItem.label" :value="isSupportAdvertItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     ref="formData" :inline="true" :model="formData" :rules="rules" size="small">

              <el-col :span="12" v-if="formData.entityCnName">
                <el-form-item label="实体名(英) :" prop="entityCnName">
                  {{formData.entityCnName}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.entityEnName">
                <el-form-item label="实体名(中) :" prop="entityEnName">
                  {{formData.entityEnName}}
                </el-form-item>
              </el-col>


              <el-col :span="24">
                <el-form-item label="标识图 :" prop="imagePath">
                  <img :src="formData.imagePath" alt="" width="84px" v-preview>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="可分享 :" prop="isCanShare">
                  <div >
                    <el-switch v-model="formData.isCanShare == 'Y'" disabled></el-switch>
                  </div>

                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="可点评 :" prop="isCanReply">
                  <div>
                    <el-switch v-model="formData.isCanReply == 'Y'" disabled></el-switch>
                  </div>

                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="可收藏 :" prop="isCanCollect">
                  <div >
                    <el-switch v-model="formData.isCanCollect == 'Y'" disabled></el-switch>
                  </div>

                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.searchIndex">
                <el-form-item label="搜索索引 :" prop="searchIndex">
                  {{formData.searchIndex}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="图集 :" prop="isHaveImages">
                  <div>
                    <el-switch v-model="formData.isHaveImages == 'Y'" disabled></el-switch>
                  </div>

                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.tableName">
                <el-form-item label="对应表名 :" prop="tableName">
                  {{formData.tableName}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.tablePrimary">
                <el-form-item label="主键字段 :" prop="tablePrimary">
                  {{formData.tablePrimary}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.shareNumField">
                <el-form-item label="分享数字段 :" prop="shareNumField">
                  {{formData.shareNumField}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.replyNumField">
                <el-form-item label="点评数字段 :" prop="replyNumField">
                  {{formData.replyNumField}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.collectNumField">
                <el-form-item label="收藏数字段 :" prop="collectNumField">
                  {{formData.collectNumField}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.likeNumField">
                <el-form-item label="点赞数字段 :" prop="likeNumField">
                  {{formData.likeNumField}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.unlikeNumField">
                <el-form-item label="点踩数字段 :" prop="unlikeNumField">
                  {{formData.unlikeNumField}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="支持广告 :" prop="isSupportAdvert">
                  <div>
                    <el-switch v-model="formData.isSupportAdvert == 'Y'" disabled></el-switch>
                  </div>

                </el-form-item>
              </el-col>


            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">

          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./entitytypeUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        onSwitchStatus: true,
        offSwitchStatus: false,
        imagePath: [], //单独使用一个图片变量
        imagePathFileList: [],
        isCanShareOptions: [{"label": "全部", "name": ""}], isCanShare: null,
        isCanReplyOptions: [{"label": "全部", "name": ""}], isCanReply: null,
        isCanCollectOptions: [{"label": "全部", "name": ""}], isCanCollect: null,
        isHaveImagesOptions: [{"label": "全部", "name": ""}], isHaveImages: null,
        isSupportAdvertOptions: [{"label": "全部", "name": ""}], isSupportAdvert: null,
        data: "",
        getImageUrl: "",
        formData: {
          entityTypeId: '',
          entityCnName: "",
          entityEnName: "",
          imagePath: "",
          isCanShare: "",
          isCanReply: "",
          isCanCollect: "",
          searchIndex: "",
          isHaveImages: "",
          tableName: "",
          tablePrimary: "",
          shareNumField: "",
          replyNumField: "",
          collectNumField: "",
          likeNumField: "",
          unlikeNumField: "",
          isSupportAdvert: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          entityCnName: [
            {required: true, max: 128, message: "只能输入128个字", trigger: "blur"},
          ],
          entityEnName: [
            {required: true, max: 64, message: "只能输入64个字", trigger: "blur"},
          ],
          imagePath: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
          ],
          isCanShare: [
            {required: true, max: 2, message: "只能输入2个字", trigger: "blur"},
          ],
          isCanReply: [
            {required: true, max: 2, message: "只能输入2个字", trigger: "blur"},
          ],
          isCanCollect: [
            {required: true, max: 2, message: "只能输入2个字", trigger: "blur"},
          ],
          searchIndex: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          isHaveImages: [
            {required: true, max: 2, message: "只能输入2个字", trigger: "blur"},
          ],
          tableName: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          tablePrimary: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          shareNumField: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          replyNumField: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          collectNumField: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          likeNumField: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          unlikeNumField: [
            {required: true, max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          isSupportAdvert: [
            {required: true, max: 1, message: "只能输入1个字", trigger: "blur"},
          ],
        }
      }
    },
    computed: {

      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor,upload},
    created() {
      this.getDetail(this.$route.params.id);
       commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [] || [];
        for (let ynItem of viewList) {
          this.isCanShareOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });


    },
    methods: {
      //图片上传
      uploadData(res) {
        // console.log(3)
        // console.log(res)
        this.formData.imagePath = res;
        // console.log(this.formData.imagePath)
      },
      //编辑器
      getEditorValue(val) {
        this.formData.content = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState == "edit") {
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === '000000') {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState == "add") {
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === '000000') {
                this.formLoading = false;
                this.$message.success("添加成功");
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
                // this.$router.go(-1)
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }
        })
        this.isLoaded = false;

      },


      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === '000000') {
              this.data = res.data.data;
              this.formData = this.data;
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>


  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }


</style>
