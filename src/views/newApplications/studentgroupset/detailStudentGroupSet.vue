
                                            
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="分组 :" prop="setName">
                      <el-input class="input-v2-rao" v-model="formData.setName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 分组 colName:set_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="分组类型 :" prop="groupTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.groupTypeCode" placeholder="请您选择">
                        <el-option v-for="groupTypeCodeItem in groupTypeCodeOptions"
                                   :key="groupTypeCodeItem.name"
                                   :label="groupTypeCodeItem.label" :value="groupTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 分组类型 colName:group_type_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="分组时间 :" prop="setCreatedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.setCreatedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 分组时间 colName:set_created_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="小组数 :" prop="groupNum">
                      <el-input class="input-v2-rao" v-model="formData.groupNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 小组数 colName:group_num sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="组员数 :" prop="studentNum">
                      <el-input class="input-v2-rao" v-model="formData.studentNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 组员数 colName:student_num sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="组员数上限 :" prop="studentNumSize">
                      <el-input class="input-v2-rao" v-model="formData.studentNumSize"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 组员数上限 colName:student_num_size sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="自由加入 :" prop="isFreeJoin">
                      <el-select class="select-v2-rao" v-model="formData.isFreeJoin" placeholder="请您选择">
                        <el-option v-for="isFreeJoinItem in ynOptions" :key="isFreeJoinItem.name"
                                   :label="isFreeJoinItem.label" :value="isFreeJoinItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 自由加入 colName:is_free_join sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="说明 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>
<!-- 说明 colName:description sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="分组状态 :" prop="groupSetStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.groupSetStatusCode" placeholder="请您选择">
                        <el-option v-for="groupSetStatusCodeItem in groupSetStatusCodeOptions"
                                   :key="groupSetStatusCodeItem.name"
                                   :label="groupSetStatusCodeItem.label" :value="groupSetStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 分组状态 colName:group_set_status_code sqlType:VARCHAR notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="分组 :" prop="setName">
                      <el-input class="input-v2-rao" v-model="formData.setName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="分组类型 :" prop="groupTypeCode">
                      <el-select class="select-v2-rao" v-model="formData.groupTypeCode" placeholder="请您选择">
                        <el-option v-for="groupTypeCodeItem in groupTypeCodeOptions"
                                   :key="groupTypeCodeItem.name"
                                   :label="groupTypeCodeItem.label" :value="groupTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="分组时间 :" prop="setCreatedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.setCreatedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="小组数 :" prop="groupNum">
                      <el-input class="input-v2-rao" v-model="formData.groupNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="组员数 :" prop="studentNum">
                      <el-input class="input-v2-rao" v-model="formData.studentNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="组员数上限 :" prop="studentNumSize">
                      <el-input class="input-v2-rao" v-model="formData.studentNumSize"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="自由加入 :" prop="isFreeJoin">
                      <el-select class="select-v2-rao" v-model="formData.isFreeJoin" placeholder="请您选择">
                        <el-option v-for="isFreeJoinItem in ynOptions" :key="isFreeJoinItem.name"
                                   :label="isFreeJoinItem.label" :value="isFreeJoinItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="说明 :" prop="description"
                                  class="orgIntroduction">
                      <editor v-model="formData.description" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="分组状态 :" prop="groupSetStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.groupSetStatusCode" placeholder="请您选择">
                        <el-option v-for="groupSetStatusCodeItem in groupSetStatusCodeOptions"
                                   :key="groupSetStatusCodeItem.name"
                                   :label="groupSetStatusCodeItem.label" :value="groupSetStatusCodeItem.name">
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
                      {{formData.setName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.setName">
                          <el-form-item label="分组 :" prop="setName">
                            <span v-if="formData.setName">{{formData.setName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="分组类型 :" prop="groupTypeCode">
                            <span v-if="formData.groupTypeCodeStr"
                                  :style="{'color':formData.groupTypeCodeStr.split(';')[1]}">{{formData.groupTypeCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="分组时间 :" prop="setCreatedDt">
                            <span v-if="formData.setCreatedDt"> {{formData.setCreatedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.groupNum">
                          <el-form-item label="小组数 :" prop="groupNum">
                            <span v-if="formData.groupNum">{{formData.groupNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentNum">
                          <el-form-item label="组员数 :" prop="studentNum">
                            <span v-if="formData.studentNum">{{formData.studentNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentNumSize">
                          <el-form-item label="组员数上限 :" prop="studentNumSize">
                            <span v-if="formData.studentNumSize">{{formData.studentNumSize}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="自由加入 :" prop="isFreeJoin">
                            <el-switch v-model="formData.isFreeJoin == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>


                        <div class="p100" v-if="formData.description">
                          <el-form-item label="说明 :" prop="description">
                            <span v-if="formData.description" v-html="formData.description"></span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="分组状态 :" prop="groupSetStatusCode">
                            <span v-if="formData.groupSetStatusCodeStr"
                                  :style="{'color':formData.groupSetStatusCodeStr.split(';')[1]}">{{formData.groupSetStatusCodeStr.split(';')[0]}}</span>
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
                    <router-link :to="`/studentgroup/listStudentGroup?setId=`+
                                  formData.setId">
                      <i class="iconfont icon-icon_liebiao"></i>小组
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
  import api from "./studentgroupsetUrl";
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

        groupTypeCodeOptions: [{"label": "全部", "name": ""}],
        groupTypeCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isFreeJoin : null,
        groupSetStatusCodeOptions: [{"label": "全部", "name": ""}],
        groupSetStatusCode : null,
        formData:{
              setId:'',
              setName :"",
              groupTypeCode :"",
              setCreatedDt :"",
              groupNum :"",
              studentNum :"",
              studentNumSize :"",
              isFreeJoin :"",
              description :"",
              groupSetStatusCode :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              setName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              groupTypeCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              setCreatedDt :
              [

              ],
              groupNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              studentNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              studentNumSize :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              isFreeJoin :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              description :
              [
                  {max: 2048, message: "最多能输入2048个字", trigger: "blur"},

              ],
              groupSetStatusCode :
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
          commonApi.getCodeIntType("groupType").then(res => {
            let viewList = res.data.data || [];
            for (let groupTypeItem of viewList) {
              this.groupTypeCodeOptions.push({
                "label": groupTypeItem.codeDesc,
                "name": groupTypeItem.codeId
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
          commonApi.getCodeIntType("groupSetStatus").then(res => {
            let viewList = res.data.data || [];
            for (let groupSetStatusItem of viewList) {
              this.groupSetStatusCodeOptions.push({
                "label": groupSetStatusItem.codeDesc,
                "name": groupSetStatusItem.codeId
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
