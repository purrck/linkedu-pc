

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="设备考勤规则 :" prop="checkRuleName">
                      <el-input class="input-v2-rao" v-model="formData.checkRuleName"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所类型 :" prop="placeTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.placeTypeCode" placeholder="请您选择">
                        <el-option v-for="placeTypeCodeItem in placeTypeCodeOptions"
                                   :key="placeTypeCodeItem.name"
                                   :label="placeTypeCodeItem.label" :value="placeTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="考勤做些类型 :" prop="timelineTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.timelineTypeCode" placeholder="请您选择">
                        <el-option v-for="timelineTypeCodeItem in timelineTypeCodeOptions"
                                   :key="timelineTypeCodeItem.name"
                                   :label="timelineTypeCodeItem.label" :value="timelineTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息开始前(分钟) :" prop="beforeRule">
                      <el-input class="input-v2-rao" v-model="formData.beforeRule"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息开始前处理方式 :" prop="beforeProcessCheckCode">
                      <el-select class="select-v2-rao" v-model="formData.beforeProcessCheckCode" placeholder="请您选择">
                        <el-option v-for="beforeProcessCheckCodeItem in beforeProcessCheckCodeOptions"
                                   :key="beforeProcessCheckCodeItem.name"
                                   :label="beforeProcessCheckCodeItem.label" :value="beforeProcessCheckCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息开始前处理数据 :" prop="beforeTimelineCheckExceptionCode">
                      <el-select class="select-v2-rao" v-model="formData.beforeTimelineCheckExceptionCode" placeholder="请您选择">
                        <el-option v-for="beforeTimelineCheckExceptionCodeItem in beforeTimelineCheckExceptionCodeOptions"
                                   :key="beforeTimelineCheckExceptionCodeItem.name"
                                   :label="beforeTimelineCheckExceptionCodeItem.label" :value="beforeTimelineCheckExceptionCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息时间内处理方式 :" prop="inProcessCheckCode">
                      <el-select class="select-v2-rao" v-model="formData.inProcessCheckCode" placeholder="请您选择">
                        <el-option v-for="inProcessCheckCodeItem in inProcessCheckCodeOptions"
                                   :key="inProcessCheckCodeItem.name"
                                   :label="inProcessCheckCodeItem.label" :value="inProcessCheckCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息时间内处理数据 :" prop="inTimelineCheckExceptionCode">
                      <el-select class="select-v2-rao" v-model="formData.inTimelineCheckExceptionCode" placeholder="请您选择">
                        <el-option v-for="inTimelineCheckExceptionCodeItem in inTimelineCheckExceptionCodeOptions"
                                   :key="inTimelineCheckExceptionCodeItem.name"
                                   :label="inTimelineCheckExceptionCodeItem.label" :value="inTimelineCheckExceptionCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息截止后(分钟) :" prop="afterRule">
                      <el-input class="input-v2-rao" v-model="formData.afterRule"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息截止后处理方式 :" prop="afterProcessCheckCode">
                      <el-select class="select-v2-rao" v-model="formData.afterProcessCheckCode" placeholder="请您选择">
                        <el-option v-for="afterProcessCheckCodeItem in afterProcessCheckCodeOptions"
                                   :key="afterProcessCheckCodeItem.name"
                                   :label="afterProcessCheckCodeItem.label" :value="afterProcessCheckCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息截止后处理数据 :" prop="afterTimelineCheckExceptionCode">
                      <el-select class="select-v2-rao" v-model="formData.afterTimelineCheckExceptionCode" placeholder="请您选择">
                        <el-option v-for="afterTimelineCheckExceptionCodeItem in afterTimelineCheckExceptionCodeOptions"
                                   :key="afterTimelineCheckExceptionCodeItem.name"
                                   :label="afterTimelineCheckExceptionCodeItem.label" :value="afterTimelineCheckExceptionCodeItem.name">
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

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="设备考勤规则 :" prop="checkRuleName">
                      <el-input class="input-v2-rao" v-model="formData.checkRuleName"
                                maxlength="64"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="场所类型 :" prop="placeTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.placeTypeCode" placeholder="请您选择">
                        <el-option v-for="placeTypeCodeItem in placeTypeCodeOptions"
                                   :key="placeTypeCodeItem.name"
                                   :label="placeTypeCodeItem.label" :value="placeTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="考勤做些类型 :" prop="timelineTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.timelineTypeCode" placeholder="请您选择">
                        <el-option v-for="timelineTypeCodeItem in timelineTypeCodeOptions"
                                   :key="timelineTypeCodeItem.name"
                                   :label="timelineTypeCodeItem.label" :value="timelineTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息开始前(分钟) :" prop="beforeRule">
                      <el-input class="input-v2-rao" v-model="formData.beforeRule"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息开始前处理方式 :" prop="beforeProcessCheckCode">
                      <el-select class="select-v2-rao" v-model="formData.beforeProcessCheckCode" placeholder="请您选择">
                        <el-option v-for="beforeProcessCheckCodeItem in beforeProcessCheckCodeOptions"
                                   :key="beforeProcessCheckCodeItem.name"
                                   :label="beforeProcessCheckCodeItem.label" :value="beforeProcessCheckCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息时间内处理方式 :" prop="inProcessCheckCode">
                      <el-select class="select-v2-rao" v-model="formData.inProcessCheckCode" placeholder="请您选择">
                        <el-option v-for="inProcessCheckCodeItem in inProcessCheckCodeOptions"
                                   :key="inProcessCheckCodeItem.name"
                                   :label="inProcessCheckCodeItem.label" :value="inProcessCheckCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息时间内处理数据 :" prop="inTimelineCheckExceptionCode">
                      <el-select class="select-v2-rao" v-model="formData.inTimelineCheckExceptionCode" placeholder="请您选择">
                        <el-option v-for="inTimelineCheckExceptionCodeItem in inTimelineCheckExceptionCodeOptions"
                                   :key="inTimelineCheckExceptionCodeItem.name"
                                   :label="inTimelineCheckExceptionCodeItem.label" :value="inTimelineCheckExceptionCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息截止后(分钟) :" prop="afterRule">
                      <el-input class="input-v2-rao" v-model="formData.afterRule"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息截止后处理方式 :" prop="afterProcessCheckCode">
                      <el-select class="select-v2-rao" v-model="formData.afterProcessCheckCode" placeholder="请您选择">
                        <el-option v-for="afterProcessCheckCodeItem in afterProcessCheckCodeOptions"
                                   :key="afterProcessCheckCodeItem.name"
                                   :label="afterProcessCheckCodeItem.label" :value="afterProcessCheckCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="作息截止后处理数据 :" prop="afterTimelineCheckExceptionCode">
                      <el-select class="select-v2-rao" v-model="formData.afterTimelineCheckExceptionCode" placeholder="请您选择">
                        <el-option v-for="afterTimelineCheckExceptionCodeItem in afterTimelineCheckExceptionCodeOptions"
                                   :key="afterTimelineCheckExceptionCodeItem.name"
                                   :label="afterTimelineCheckExceptionCodeItem.label" :value="afterTimelineCheckExceptionCodeItem.name">
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
                      {{formData.checkRuleName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.checkRuleName">
                          <el-form-item label="设备考勤规则 :" prop="checkRuleName">
                            <span v-if="formData.checkRuleName">{{formData.checkRuleName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="场所类型 :" prop="placeTypeCode">
                            <span v-if="formData.placeTypeCodeStr"
                                  :style="{'color':formData.placeTypeCodeStr.split(';')[1]}">{{formData.placeTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="考勤做些类型 :" prop="timelineTypeCode">
                            <span v-if="formData.timelineTypeCodeStr"
                                  :style="{'color':formData.timelineTypeCodeStr.split(';')[1]}">{{formData.timelineTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.beforeRule">
                          <el-form-item label="作息开始前(分钟) :" prop="beforeRule">
                            <span v-if="formData.beforeRule">{{formData.beforeRule}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="作息开始前处理方式 :" prop="beforeProcessCheckCode">
                            <span v-if="formData.beforeProcessCheckCodeStr">{{formData.beforeProcessCheckCodeStr}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="作息开始前处理数据 :" prop="beforeTimelineCheckExceptionCode">
                            <span v-if="formData.beforeTimelineCheckExceptionCodeStr"
                                  :style="{'color':formData.beforeTimelineCheckExceptionCodeStr.split(';')[1]}">{{formData.beforeTimelineCheckExceptionCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="作息时间内处理方式 :" prop="inProcessCheckCode">
                            <span v-if="formData.inProcessCheckCodeStr">{{formData.inProcessCheckCodeStr}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="作息时间内处理数据 :" prop="inTimelineCheckExceptionCode">
                            <span v-if="formData.inTimelineCheckExceptionCodeStr"
                                  :style="{'color':formData.inTimelineCheckExceptionCodeStr.split(';')[1]}">{{formData.inTimelineCheckExceptionCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.afterRule">
                          <el-form-item label="作息截止后(分钟) :" prop="afterRule">
                            <span v-if="formData.afterRule">{{formData.afterRule}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="作息截止后处理方式 :" prop="afterProcessCheckCode">
                            <span v-if="formData.afterProcessCheckCodeStr">{{formData.afterProcessCheckCodeStr}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="作息截止后处理数据 :" prop="afterTimelineCheckExceptionCode">
                            <span v-if="formData.afterTimelineCheckExceptionCodeStr"
                                  :style="{'color':formData.afterTimelineCheckExceptionCodeStr.split(';')[1]}">{{formData.afterTimelineCheckExceptionCodeStr.split(';')[0]}}</span>
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
  import api from "./schoolplacetimecheckruleUrl";
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

        placeTypeCodeOptions: [{"label": "全部", "name": ""}],
        placeTypeCode : null,
        timelineTypeCodeOptions: [{"label": "全部", "name": ""}],
        timelineTypeCode : null,
        beforeProcessCheckCodeOptions: [{"label": "全部", "name": ""}],
        beforeProcessCheckCode : null,
        beforeTimelineCheckExceptionCodeOptions: [{"label": "全部", "name": ""}],
        beforeTimelineCheckExceptionCode : null,
        inProcessCheckCodeOptions: [{"label": "全部", "name": ""}],
        inProcessCheckCode : null,
        inTimelineCheckExceptionCodeOptions: [{"label": "全部", "name": ""}],
        inTimelineCheckExceptionCode : null,
        afterProcessCheckCodeOptions: [{"label": "全部", "name": ""}],
        afterProcessCheckCode : null,
        afterTimelineCheckExceptionCodeOptions: [{"label": "全部", "name": ""}],
        afterTimelineCheckExceptionCode : null,
        formData:{
              checkRuleId:'',
              checkRuleName :"",
              placeTypeCode :"",
              timelineTypeCode :"",
              beforeRule :"",
              beforeProcessCheckCode :"",
              inProcessCheckCode :"",
              inTimelineCheckExceptionCode :"",
              afterRule :"",
              afterProcessCheckCode :"",
              afterTimelineCheckExceptionCode :"",
              sequnceNum :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              checkRuleName :
              [
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              placeTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              timelineTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              beforeRule :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              beforeProcessCheckCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              beforeTimelineCheckExceptionCode :
              [
                  {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

              ],
              inProcessCheckCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              inTimelineCheckExceptionCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              afterRule :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              afterProcessCheckCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              afterTimelineCheckExceptionCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

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
          commonApi.getCodeIntType("placeType").then(res => {
            let viewList = res.data.data || [];
            for (let placeTypeItem of viewList) {
              this.placeTypeCodeOptions.push({
                "label": placeTypeItem.codeDesc,
                "name": placeTypeItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("timelineType").then(res => {
            let viewList = res.data.data || [];
            for (let timelineTypeItem of viewList) {
              this.timelineTypeCodeOptions.push({
                "label": timelineTypeItem.codeDesc,
                "name": timelineTypeItem.codeId
              });
            }
          });

          commonApi.getCodeIntType("timelineCheckException").then(res => {
            let viewList = res.data.data || [];
            for (let beforeTimelineCheckExceptionItem of viewList) {
              this.beforeTimelineCheckExceptionCodeOptions.push({
                "label": beforeTimelineCheckExceptionItem.codeDesc,
                "name": beforeTimelineCheckExceptionItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("timelineCheckException").then(res => {
            let viewList = res.data.data || [];
            for (let inTimelineCheckExceptionItem of viewList) {
              this.inTimelineCheckExceptionCodeOptions.push({
                "label": inTimelineCheckExceptionItem.codeDesc,
                "name": inTimelineCheckExceptionItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("processCheck").then(res => {
            let viewList = res.data.data || [];
            for (let beforeProcessCheckItem of viewList) {
              this.beforeProcessCheckCodeOptions.push({
                "label": beforeProcessCheckItem.codeDesc,
                "name": beforeProcessCheckItem.codeId
              });
            }
            this.inProcessCheckCodeOptions = this.afterProcessCheckCodeOptions = this.beforeProcessCheckCodeOptions
          });
          commonApi.getCodeIntType("timelineCheckException").then(res => {
            let viewList = res.data.data || [];
            for (let afterTimelineCheckExceptionItem of viewList) {
              this.afterTimelineCheckExceptionCodeOptions.push({
                "label": afterTimelineCheckExceptionItem.codeDesc,
                "name": afterTimelineCheckExceptionItem.codeId
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
            let resD = res.data.data
            if (res.data.resultCode === "000000") {
              if(resD.beforeProcessCheckCode&&!resD.beforeProcessCheckCodeStr){
                let str = this.beforeProcessCheckCodeOptions.find(res=> {
                  return res.name === resD.beforeProcessCheckCode
                })
                resD.beforeProcessCheckCodeStr = str.label
              }
              if(resD.inProcessCheckCode&&!resD.inProcessCheckCodeStr){
                let str = this.beforeProcessCheckCodeOptions.find(res=> {
                  return res.name === resD.beforeProcessCheckCode
                })
                resD.inProcessCheckCodeStr = str.label
              }
              if(resD.afterProcessCheckCode&&!resD.afterProcessCheckCodeStr){
                let str = this.beforeProcessCheckCodeOptions.find(res=> {
                  return res.name === resD.beforeProcessCheckCode
                })
                resD.afterProcessCheckCodeStr = str.label
              }
              this.formData = res.data.data

            }
            // console.log(this.formData)
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
