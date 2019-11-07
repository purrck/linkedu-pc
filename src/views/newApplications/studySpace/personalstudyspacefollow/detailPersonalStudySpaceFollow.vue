
                    
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="空间 :" prop="studySpaceId">
                      <el-input class="input-v2-rao" v-model="formData.studySpaceId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 空间 colName:study_space_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="被关注用户id :" prop="baseUserId">
                      <el-input class="input-v2-rao" v-model="formData.baseUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 被关注用户id colName:base_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="被关注用户 :" prop="baseUserName">
                      <el-input class="input-v2-rao" v-model="formData.baseUserName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 被关注用户 colName:base_user_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="关注人id :" prop="userId">
                      <el-input class="input-v2-rao" v-model="formData.userId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 关注人id colName:user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="关注人 :" prop="userName">
                      <el-input class="input-v2-rao" v-model="formData.userName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 关注人 colName:user_name sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="关注时间 :" prop="followedBeiginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.followedBeiginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="解关时间 :" prop="followedColseDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.followedColseDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="关注中 :" prop="isCurrentFollow">
                      <el-select class="select-v2-rao" v-model="formData.isCurrentFollow" placeholder="请您选择">
                        <el-option v-for="isCurrentFollowItem in ynOptions" :key="isCurrentFollowItem.name"
                                   :label="isCurrentFollowItem.label" :value="isCurrentFollowItem.name">
                        </el-option>
                      </el-select>
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
                      {{formData.baseUserName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.baseUserName">
                          <el-form-item label="被关注用户 :" prop="baseUserName">
                            <span v-if="formData.baseUserName">{{formData.baseUserName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.userName">
                          <el-form-item label="关注人 :" prop="userName">
                            <span v-if="formData.userName">{{formData.userName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="关注时间 :" prop="followedBeiginDt">
                            <span v-if="formData.followedBeiginDt"> {{formData.followedBeiginDt}}</span>
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
  import api from "./personalstudyspacefollowUrl";
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

        ynOptions :[{"label": "全部", "name": ""}],
        isCurrentFollow : null,
        formData:{
              spaceFollowId:'',
              followedBeiginDt :"",
              followedColseDt :"",
              isCurrentFollow :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              studySpaceId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              baseUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              baseUserName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              userId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              userName :
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
   // directives: {preview},
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
