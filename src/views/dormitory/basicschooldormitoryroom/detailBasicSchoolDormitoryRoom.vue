

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

            <el-col :span="12">
              <el-form-item label="宿舍编号 :" prop="dormitoryNum">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryNum"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="宿舍名称 :" prop="dormitoryName">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryName"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>
                  <el-col :span="12">
                    <el-form-item label="房间号 :" prop="dormitoryRoomNum">
                      <el-input class="input-v2-rao" v-model="formData.dormitoryRoomNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col v-show="false" :span="12">
                    <el-form-item label="宿舍id :" prop="dormitoryId">
                      <el-input disabled class="input-v2-rao" v-model="formData.dormitoryId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="学生人数 :" prop="studentNum">
                      <el-input class="input-v2-rao" v-model="formData.studentNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="可入住最大人数 :" prop="maxUser">
                      <el-input class="input-v2-rao" v-model="formData.maxUser"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="12">
                    <el-form-item label="房间号 :" prop="dormitoryRoomNum">
                      <el-input class="input-v2-rao" v-model="formData.dormitoryRoomNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="学生人数 :" prop="studentNum">
                      <el-input class="input-v2-rao" v-model="formData.studentNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="可主人数 :" prop="maxUser">
                      <el-input class="input-v2-rao" v-model="formData.maxUser"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
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
                      {{formData.dormitoryRoomNum}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.dormitoryRoomNum">
                          <el-form-item label="房间号 :" prop="dormitoryRoomNum">
                            <span v-if="formData.dormitoryRoomNum">{{formData.dormitoryRoomNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.dormitoryNum">
                          <el-form-item label="宿舍编号 :" prop="dormitoryNum">
                            <span v-if="formData.dormitoryNum">{{formData.dormitoryNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.dormitoryName">
                          <el-form-item label="宿舍名称 :" prop="dormitoryName">
                            <span v-if="formData.dormitoryName">{{formData.dormitoryName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentNum">
                          <el-form-item label="学生人数 :" prop="studentNum">
                            <span v-if="formData.studentNum">{{formData.studentNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.maxUser">
                          <el-form-item label="可主人数 :" prop="maxUser">
                            <span v-if="formData.maxUser">{{formData.maxUser}}</span>
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

            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="menu-quickly">
                <ul>
                  <li>
                    <router-link :to="`/basedata/listBasicSchoolDormitoryStudent?dormitoryRoomId=`+
                                  formData.dormitoryRoomId">
                      <i class="iconfont icon-icon_liebiao"></i>学生住宿
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
  import api from "./basicschooldormitoryroomUrl";
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

        formData:{
              dormitoryRoomId:'',
              dormitoryRoomNum :"",
              studentNum :"",
              maxUser :"",
              sequnceNum :"",
          dormitoryName:null,
          dormitoryNum:null,
          dormitoryId:null,
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              dormitoryRoomNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              dormitoryId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              dormitoryNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              dormitoryName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              maxUser :
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
      this.formData.dormitoryId=this.$route.params.id
      this.formData.dormitoryNum=this.$route.query.dormitoryNum
      this.formData.dormitoryName=this.$route.query.dormitoryName
      this.getDetail(this.$route.params.id);
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
