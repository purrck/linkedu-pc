
                                      
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="小组 :" prop="groupId">
                      <el-input class="input-v2-rao" v-model="formData.groupId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 小组 colName:group_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="分组 :" prop="setId">
                      <el-input class="input-v2-rao" v-model="formData.setId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 分组 colName:set_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生id :" prop="studentId">
                      <el-input class="input-v2-rao" v-model="formData.studentId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生id colName:student_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生用户id :" prop="studentUserId">
                      <el-input class="input-v2-rao" v-model="formData.studentUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生用户id colName:student_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="学生 :" prop="studentName">
                      <el-input class="input-v2-rao" v-model="formData.studentName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 学生 colName:student_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 序号 colName:sequnce_num sqlType:INTEGER notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="职责 :" prop="groupUserDutyCode">
                      <el-select class="select-v2-rao" v-model="formData.groupUserDutyCode" placeholder="请您选择">
                        <el-option v-for="groupUserDutyCodeItem in groupUserDutyCodeOptions"
                                   :key="groupUserDutyCodeItem.name"
                                   :label="groupUserDutyCodeItem.label" :value="groupUserDutyCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 职责 colName:group_user_duty_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="备注 :" prop="remark">
                      <el-input class="input-v2-rao" v-model="formData.remark"
                                maxlength="256"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 备注 colName:remark sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="加入时间 :" prop="joinedDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.joinedDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 加入时间 colName:joined_dt sqlType:TIMESTAMP notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="职责 :" prop="groupUserDutyCode">
                      <el-select class="select-v2-rao" v-model="formData.groupUserDutyCode" placeholder="请您选择">
                        <el-option v-for="groupUserDutyCodeItem in groupUserDutyCodeOptions"
                                   :key="groupUserDutyCodeItem.name"
                                   :label="groupUserDutyCodeItem.label" :value="groupUserDutyCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="备注 :" prop="remark">
                      <el-input class="input-v2-rao" v-model="formData.remark"
                                maxlength="256"></el-input>
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
                      {{formData.studentName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.sequnceNum">
                          <el-form-item label="序号 :" prop="sequnceNum">
                            <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="职责 :" prop="groupUserDutyCode">
                            <span v-if="formData.groupUserDutyCodeStr"
                                  :style="{'color':formData.groupUserDutyCodeStr.split(';')[1]}">{{formData.groupUserDutyCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.remark">
                          <el-form-item label="备注 :" prop="remark">
                            <span v-if="formData.remark">{{formData.remark}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="加入时间 :" prop="joinedDt">
                            <span v-if="formData.joinedDt"> {{formData.joinedDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
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
  import api from "./studentgroupuserUrl";
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

        groupUserDutyCodeOptions: [{"label": "全部", "name": ""}],
        groupUserDutyCode : null,
        formData:{
              groupUserId:'',
              sequnceNum :"",
              groupUserDutyCode :"",
              remark :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              groupId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              setId :
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
              studentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              sequnceNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
              groupUserDutyCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              remark :
              [
                  {max: 256, message: "最多能输入256个字", trigger: "blur"},

              ],
              joinedDt :
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
          commonApi.getCodeIntType("groupUserDuty").then(res => {
            let viewList = res.data.data || [];
            for (let groupUserDutyItem of viewList) {
              this.groupUserDutyCodeOptions.push({
                "label": groupUserDutyItem.codeDesc,
                "name": groupUserDutyItem.codeId
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
