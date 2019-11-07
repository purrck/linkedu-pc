
                            
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="重大疫情 *  :" prop="title">
                      <el-input class="input-v2-rao" v-model="formData.title"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 重大疫情 colName:title sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疾病id :" prop="illnessLibId">
                      <el-input class="input-v2-rao" v-model="formData.illnessLibId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 疾病id colName:illness_lib_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疾病名称 :" prop="illnessName">
                      <el-input class="input-v2-rao" v-model="formData.illnessName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 疾病名称 colName:illness_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="发生时间 :" prop="happenedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.happenedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 发生时间 colName:happened_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="截止时间 :" prop="finishedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.finishedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 截止时间 colName:finished_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="发病学生数 :" prop="studentNum">
                      <el-input class="input-v2-rao" v-model="formData.studentNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 发病学生数 colName:student_num sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疫情说明 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 疫情说明 colName:description sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="疫情状态 :" prop="epidemicSituationStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.epidemicSituationStatusCode" placeholder="请您选择">
                        <el-option v-for="epidemicSituationStatusCodeItem in epidemicSituationStatusCodeOptions"
                                   :key="epidemicSituationStatusCodeItem.name"
                                   :label="epidemicSituationStatusCodeItem.label" :value="epidemicSituationStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 疫情状态 colName:epidemic_situation_status_code sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="重大疫情 *  :" prop="title">
                      <el-input class="input-v2-rao" v-model="formData.title"
                                maxlength="128"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="疾病id :" prop="illnessLibId">
                      <el-input class="input-v2-rao" v-model="formData.illnessLibId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发生时间 :" prop="happenedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.happenedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="截止时间 :" prop="finishedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.finishedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="发病学生数 :" prop="studentNum">
                      <el-input class="input-v2-rao" v-model="formData.studentNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="疫情说明 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="疫情状态 :" prop="epidemicSituationStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.epidemicSituationStatusCode" placeholder="请您选择">
                        <el-option v-for="epidemicSituationStatusCodeItem in epidemicSituationStatusCodeOptions"
                                   :key="epidemicSituationStatusCodeItem.name"
                                   :label="epidemicSituationStatusCodeItem.label" :value="epidemicSituationStatusCodeItem.name">
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
                      {{formData.title}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.title">
                          <el-form-item label="重大疫情 :" prop="title">
                            <span v-if="formData.title">{{formData.title}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.illnessName">
                          <el-form-item label="疾病名称 :" prop="illnessName">
                            <span v-if="formData.illnessName">{{formData.illnessName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="发生时间 :" prop="happenedDt">
                            <span v-if="formData.happenedDt"> {{formData.happenedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止时间 :" prop="finishedDt">
                            <span v-if="formData.finishedDt"> {{formData.finishedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentNum">
                          <el-form-item label="发病学生数 :" prop="studentNum">
                            <span v-if="formData.studentNum">{{formData.studentNum}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.description">
                          <el-form-item label="疫情说明 :" prop="description">
                            <span v-if="formData.description" v-html="formData.description"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="疫情状态 :" prop="epidemicSituationStatusCode">
                            <span v-if="formData.epidemicSituationStatusCodeStr"
                                  :style="{'color':formData.epidemicSituationStatusCodeStr.split(';')[1]}">{{formData.epidemicSituationStatusCodeStr.split(';')[0]}}</span>
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
                    <router-link :to="`/basedata/listSchoolEpidemicSituationStudent?epidemicSituationId=`+
                                  formData.epidemicSituationId">
                      <i class="iconfont icon-icon_liebiao"></i>重大疫情覆盖学生
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listSchoolEpidemicSituationTeacher?epidemicSituationId=`+
                                  formData.epidemicSituationId">
                      <i class="iconfont icon-icon_liebiao"></i>重大疫情处理小组
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="`/basedata/listSchoolEpidemicSituationProcess?epidemicSituationId=`+
                                  formData.epidemicSituationId">
                      <i class="iconfont icon-icon_liebiao"></i>重大疫情处理
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
  import api from "./schoolepidemicsituationUrl";
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

        epidemicSituationStatusCodeOptions: [{"label": "全部", "name": ""}],
        epidemicSituationStatusCode : null,
        formData:{
              epidemicSituationId:'',
              title :"",
              illnessLibId :"",
              happenedDt :"",
              finishedDt :"",
              studentNum :"",
              description :"",
              epidemicSituationStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              title :
              [
                  {required: true, message: "请您输入重大疫情", trigger: "blur"},
                  {max: 128, message: "最多能输入128个字", trigger: "blur"},

              ],
              illnessLibId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              illnessName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              happenedDt :
              [

              ],
              finishedDt :
              [

              ],
              studentNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              description :
              [
                  {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

              ],
              epidemicSituationStatusCode :
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
          commonApi.getCodeIntType("epidemicSituationStatus").then(res => {
            let viewList = res.data.data || [];
            for (let epidemicSituationStatusItem of viewList) {
              this.epidemicSituationStatusCodeOptions.push({
                "label": epidemicSituationStatusItem.codeDesc,
                "name": epidemicSituationStatusItem.codeId
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
