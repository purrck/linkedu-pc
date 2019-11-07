
                          
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="职称级别 *  :" prop="positionalTitleLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.positionalTitleLevelCode" placeholder="请您选择">
                        <el-option v-for="positionalTitleLevelCodeItem in positionalTitleLevelCodeOptions"
                                   :key="positionalTitleLevelCodeItem.name"
                                   :label="positionalTitleLevelCodeItem.label" :value="positionalTitleLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 职称级别 colName:positional_title_level_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="获得时间 *  :" prop="gotDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.gotDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 获得时间 colName:got_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="获得地点 *  :" prop="gotAddress">
                      <el-input class="input-v2-rao" v-model="formData.gotAddress"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 获得地点 colName:got_address sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="是否聘任 *  :" prop="isAppointPosition">
                      <el-select class="select-v2-rao" v-model="formData.isAppointPosition" placeholder="请您选择">
                        <el-option v-for="isAppointPositionItem in ynOptions" :key="isAppointPositionItem.name"
                                   :label="isAppointPositionItem.label" :value="isAppointPositionItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 是否聘任 colName:is_appoint_position sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="职称级别 *  :" prop="positionalTitleLevelCode">
                      <el-select class="select-v2-rao" v-model="formData.positionalTitleLevelCode" placeholder="请您选择">
                        <el-option v-for="positionalTitleLevelCodeItem in positionalTitleLevelCodeOptions"
                                   :key="positionalTitleLevelCodeItem.name"
                                   :label="positionalTitleLevelCodeItem.label" :value="positionalTitleLevelCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="获得时间 *  :" prop="gotDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.gotDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="获得地点 *  :" prop="gotAddress">
                      <el-input class="input-v2-rao" v-model="formData.gotAddress"
                                maxlength="255"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="是否聘任 *  :" prop="isAppointPosition">
                      <el-select class="select-v2-rao" v-model="formData.isAppointPosition" placeholder="请您选择">
                        <el-option v-for="isAppointPositionItem in ynOptions" :key="isAppointPositionItem.name"
                                   :label="isAppointPositionItem.label" :value="isAppointPositionItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="职称状态 :" prop="teacherPositionalTitleStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherPositionalTitleStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherPositionalTitleStatusCodeItem in teacherPositionalTitleStatusCodeOptions"
                                   :key="teacherPositionalTitleStatusCodeItem.name"
                                   :label="teacherPositionalTitleStatusCodeItem.label" :value="teacherPositionalTitleStatusCodeItem.name">
                        </el-option>
                      </el-select>
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
                      {{formData.positionalTitleLevelCode}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50">
                          <el-form-item label="职称级别 :" prop="positionalTitleLevelCode">
                            <span v-if="formData.positionalTitleLevelCodeStr"
                                  :style="{'color':formData.positionalTitleLevelCodeStr.split(';')[1]}">{{formData.positionalTitleLevelCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="获得时间 :" prop="gotDt">
                            <span v-if="formData.gotDt"> {{formData.gotDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.gotAddress">
                          <el-form-item label="获得地点 :" prop="gotAddress">
                            <span v-if="formData.gotAddress">{{formData.gotAddress}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="是否聘任 :" prop="isAppointPosition">
                            <el-switch v-model="formData.isAppointPosition == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="职称状态 :" prop="teacherPositionalTitleStatusCode">
                            <span v-if="formData.teacherPositionalTitleStatusCodeStr"
                                  :style="{'color':formData.teacherPositionalTitleStatusCodeStr.split(';')[1]}">{{formData.teacherPositionalTitleStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.sequnceNum">
                          <el-form-item label="序号 :" prop="sequnceNum">
                            <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
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
  import api from "./schoolteacherpositionaltitleUrl";
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

        positionalTitleLevelCodeOptions: [{"label": "全部", "name": ""}],
        positionalTitleLevelCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isAppointPosition : null,
        teacherPositionalTitleStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherPositionalTitleStatusCode : null,
        formData:{
              positionalTitleId:'',
              positionalTitleLevelCode :"",
              gotDt :"",
              gotAddress :"",
              isAppointPosition :"",
              teacherPositionalTitleStatusCode :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              positionalTitleLevelCode :
              [
                  {required: true, message: "请您输入职称级别", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              gotDt :
              [
                  {required: true, message: "请您输入获得时间", trigger: "blur"},

              ],
              gotAddress :
              [
                  {required: true, message: "请您输入获得地点", trigger: "blur"},
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              isAppointPosition :
              [
                  {required: true, message: "请您输入是否聘任", trigger: "blur"},
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

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
          commonApi.getCodeIntType("positionalTitleLevel").then(res => {
            let viewList = res.data.data || [];
            for (let positionalTitleLevelItem of viewList) {
              this.positionalTitleLevelCodeOptions.push({
                "label": positionalTitleLevelItem.codeDesc,
                "name": positionalTitleLevelItem.codeId
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
          commonApi.getCodeIntType("teacherPositionalTitleStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherPositionalTitleStatusItem of viewList) {
              this.teacherPositionalTitleStatusCodeOptions.push({
                "label": teacherPositionalTitleStatusItem.codeDesc,
                "name": teacherPositionalTitleStatusItem.codeId
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
