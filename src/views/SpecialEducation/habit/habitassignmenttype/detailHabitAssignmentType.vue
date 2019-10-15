

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="类型名称 *  :" prop="assignmentTypeTitle">
                      <el-input class="input-v2-rao" v-model="formData.assignmentTypeTitle"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="上级类型  :" prop="parentTypeId">
                      <!--<el-input class="input-v2-rao" v-model="formData.parentTypeId"-->
                                <!--maxlength="32"></el-input>-->
                      <el-select v-model="formData.parentTypeId" class="select-v2-rao">
                        <el-option :label="item.assignmentTypeTitle" :value="item.assignmentTypeId" :key="item.assignmentTypeId" v-for="item in optionList"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="任务说明 *  :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="被选次数 :" prop="selectedNum">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.selectedNum"-->
                                <!--maxlength="11"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="序号 :" prop="sequnceNum">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.sequnceNum"-->
                                <!--maxlength="11"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
                  <el-col :span="24">
                    <el-form-item label="上级类型  :" prop="parentTypeId">
                      <!--<el-input class="input-v2-rao" v-model="formData.parentTypeId"-->
                      <!--maxlength="32"></el-input>-->
                      <el-select v-model="formData.parentTypeId" class="select-v2-rao">
                        <el-option :label="item.assignmentTypeTitle" :value="item.assignmentTypeId" :key="item.assignmentTypeId" v-for="item in optionList"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="图片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="任务说明 *  :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="被选次数 :" prop="selectedNum">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.selectedNum"-->
                                <!--maxlength="11"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->

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
                      {{formData.assignmentTypeTitle}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.assignmentTypeTitle">
                          <el-form-item label="任务类型 :" prop="assignmentTypeTitle">
                            <span v-if="formData.assignmentTypeTitle">{{formData.assignmentTypeTitle}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="图片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.description">
                          <el-form-item label="任务说明 :" prop="description">
                            <span v-if="formData.description" v-html="formData.description"></span>
                          </el-form-item>
                        </div>

                        <!--<div class="p50" v-if="formData.selectedNum">-->
                          <!--<el-form-item label="被选次数 :" prop="selectedNum">-->
                            <!--<span v-if="formData.selectedNum">{{formData.selectedNum}}</span>-->
                          <!--</el-form-item>-->
                        <!--</div>-->
                        <!--<div class="p50" v-if="formData.sequnceNum">-->
                          <!--<el-form-item label="序号 :" prop="sequnceNum">-->
                            <!--<span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>-->
                          <!--</el-form-item>-->
                        <!--</div>-->
                </div>
              </div>
            </el-form>
          </el-col>

            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="menu-quickly">
                <ul>
                  <li>
                    <router-link :to="`/specialEdu/listHabitAssignment?assignmentTypeId=`+
                                  formData.assignmentTypeId">
                      <i class="iconfont icon-icon_liebiao"></i>任务
                    </router-link>
                  </li>
                </ul>
              </div>
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
  import api from "./habitassignmenttypeUrl";
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
        optionList: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        imagePathFileList :[],
        imagePathFileType:'',
        formData:{
              assignmentTypeId:'',
              imagePath :"",
              description :"",
              selectedNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              assignmentTypeTitle :
              [
                  {required: true, message: "请您输入任务类型", trigger: "blur"},
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              parentTypeId :
              [
                  // {required: true, message: "请您输入上级类型id", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

              ],
              description :
              [
                  {required: true, message: "请您输入任务说明", trigger: "blur"},
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              selectedNum :
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
      api.fetchList({page:1,limit:999}).then(res=>{
        let arr1 = [];
        let resData  = res.data.data.records.forEach(res=>{
          if(!res.parentTypeId){
            arr1.push(res);
          }
        })
        let arr = [{assignmentTypeTitle:'无',assignmentTypeId:''}];
        this.optionList = arr.concat(arr1);
      })
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
