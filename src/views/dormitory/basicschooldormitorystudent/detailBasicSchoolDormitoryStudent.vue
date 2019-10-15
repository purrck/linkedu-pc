

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col v-show="false" :span="24">
                    <el-form-item label="宿舍id :" prop="dormitoryId">
                      <el-input class="input-v2-rao" v-model="formData.dormitoryId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
            <el-col :span="12">
              <el-form-item label="宿舍编号 :" prop="dormitoryNum">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryNum"
                          maxlength="64"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="宿舍名称 :" prop="dormitoryName">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryName"
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-show="false" :span="24">
              <el-form-item label="房间id :" prop="dormitoryRoomId">
                <el-input class="input-v2-rao" v-model="formData.dormitoryRoomId"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房间 :" prop="dormitoryRoomNum">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryRoomNum"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="学生id :" prop="studentId">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.studentId"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="学生 :" prop="studentName">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.studentName"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->



            <!--<el-col :span="24">-->
              <!--<el-form-item label="已选择学生 :" prop="studentName">-->
                <!--<el-input-->
                  <!--type="textarea"-->
                  <!--:rows="5"-->
                  <!--placeholder="已选择的学生"-->
                  <!--disabled-->
                  <!--v-model="formData.studentNames">-->
                <!--</el-input>-->

                  <!--<el-col :span="24">-->
                    <!--<el-form-item label="学生用户id :" prop="studentUserId">-->
                      <!--<el-input class="input-v2-rao" v-model="formData.studentUserId"-->
                                <!--maxlength="32"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="12">
                    <el-form-item label="主要联系人 :" prop="isContact">
                      <el-select class="select-v2-rao" v-model="formData.isContact" placeholder="请您选择">
                        <el-option v-for="isContactItem in ynOptions" :key="isContactItem.name"
                                   :label="isContactItem.label" :value="isContactItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="住宿状态 :" prop="accommodationStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.accommodationStatusCode" placeholder="请您选择">
                        <el-option v-for="accommodationStatusCodeItem in accommodationStatusCodeOptions"
                                   :key="accommodationStatusCodeItem.name"
                                   :label="accommodationStatusCodeItem.label" :value="accommodationStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="入住时间 :" prop="startDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.startDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="到期时间 :" prop="endDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.endDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

            <el-col :span="24">
              <el-form-item label="学生选择 :" prop="studentUserIds"  class="orgIntroduction">
                <send-object :header="header" @finish="finish" ></send-object>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="已选择学生 :" prop="studentName">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="已选择的学生"
                  disabled
                  v-html="showNames">
                </el-input>

                <!--                <el-input class="input-v2-rao" v-model="formData.studentName"-->
                <!--                          disabled   maxlength="32"></el-input>-->
              </el-form-item>
            </el-col>

          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

            <el-col  :span="12">
              <el-form-item label="宿舍编号 :" prop="dormitoryNum">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryNum"
                          maxlength="64"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="宿舍名称 :" prop="dormitoryName">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryName"
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-show="false" :span="24">
              <el-form-item label="房间id :" prop="dormitoryRoomId">
                <el-input class="input-v2-rao" v-model="formData.dormitoryRoomId"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房间 :" prop="dormitoryRoomNum">
                <el-input disabled class="input-v2-rao" v-model="formData.dormitoryRoomNum"
                          maxlength="32"></el-input>
              </el-form-item>
            </el-col>

                  <el-col :span="12">
                    <el-form-item label="主要联系人 :" prop="isContact">
                      <el-select class="select-v2-rao" v-model="formData.isContact" placeholder="请您选择">
                        <el-option v-for="isContactItem in ynOptions" :key="isContactItem.name"
                                   :label="isContactItem.label" :value="isContactItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="住宿状态 :" prop="accommodationStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.accommodationStatusCode" placeholder="请您选择">
                        <el-option v-for="accommodationStatusCodeItem in accommodationStatusCodeOptions"
                                   :key="accommodationStatusCodeItem.name"
                                   :label="accommodationStatusCodeItem.label" :value="accommodationStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="入住时间 :" prop="startDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.startDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="到期时间 :" prop="endDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.endDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      ></el-date-picker>
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

                        <div class="p50">
                          <el-form-item label="主要联系人 :" prop="isContact">
                            <el-switch v-model="formData.isContact == 'Y'" disabled></el-switch>
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
                        <div class="p50">
                          <el-form-item label="住宿状态 :" prop="accommodationStatusCode">
                            <span v-if="formData.accommodationStatusCodeStr"
                                  :style="{'color':formData.accommodationStatusCodeStr.split(';')[1]}">{{formData.accommodationStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="入住时间 :" prop="startDt">
                            <span v-if="formData.startDt"> {{formData.startDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="到期时间 :" prop="endDt">
                            <span v-if="formData.endDt"> {{formData.endDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.dormitoryRoomNum">
                          <el-form-item label="房间 :" prop="dormitoryRoomNum">
                            <span v-if="formData.dormitoryRoomNum">{{formData.dormitoryRoomNum}}</span>
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
  import api from "./basicschooldormitorystudentUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import SendObject from "../../../components/sendObject/testSendObject";

  //import preview from '@/util/preview';
  export default {
    components: {
      SendObject,
      editor,
      upload,
      uploads,
    },
    data() {
      return {
        header:[
          {
            title: '1、学段',
            isActive: true,
            code: 'segment',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                nextType: 'grade',
                single: false,
                isActive: false,
                url: '/userapp/base/segmentGrade?type=1'
              },
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'grade',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '年级',
                subTitleType: 'grade',
                nextType: 'class',
                single: false,
                isActive: false,
                url: '/userapp/base/segmentGrade?type=2'
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'class',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '班级',
                single: false,
                subTitleType: 'class',
                nextType: 'students',
                isActive: false,
                url: ''
              },
            ]
          },
          {
            title: '4、选择学生',
            isActive: false,
            code: 'students',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '学生',
                subTitleType: 'students',
                nextType: 'parents',
                single: false,
                isActive: false,
                url: ''
              },
            ]
          },
        ],

        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        ynOptions :[{"label": "全部", "name": ""}],
        isContact : null,
        accommodationStatusCodeOptions: [{"label": "全部", "name": ""}],
        accommodationStatusCode : null,
        formData:{
              accommodationId:'',
              isContact :"",
              dormitoryNum :"",
              dormitoryName :"",
              accommodationStatusCode :"",
              startDt :"",
              endDt :"",
              dormitoryRoomId :"",
              dormitoryRoomNum :"",
          studentUserIds:null,
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              dormitoryId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              isContact :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              dormitoryNum :
              [
                  {max: 64, message: "最多能输入64个字", trigger: "blur"},

              ],
              dormitoryName :
              [
                  {max: 100, message: "最多能输入100个字", trigger: "blur"},

              ],
              // accommodationStatusCode :
              // [
              //     {validator: validation.number, trigger: "blur"},
              //
              // ],
              startDt :
              [

              ],
              endDt :
              [

              ],
              dormitoryRoomId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              dormitoryRoomNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
        },
        showName:[],
        showNames:null,
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
   // directives: {preview},
    created() {
      this.formData.dormitoryRoomId=this.$route.params.id
      this.formData.dormitoryId=this.$route.query.dormitoryId
      this.formData.dormitoryNum=this.$route.query.dormitoryNum
      this.formData.dormitoryName=this.$route.query.dormitoryName
      this.formData.dormitoryRoomNum=this.$route.query.dormitoryRoomNum

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
          commonApi.getCodeIntType("accommodationStatus").then(res => {
            let viewList = res.data.data || [];
            for (let accommodationStatusItem of viewList) {
              this.accommodationStatusCodeOptions.push({
                "label": accommodationStatusItem.codeDesc,
                "name": accommodationStatusItem.codeId
              });
            }
          });
    },
    methods: {
      finish(res) {
        this.showNames=''
        this.showName=[];
        let arr = [];
        for (let item in res.header[3].children) {
          // console.log(res.header[3].children[item]);
          let ori = res.header[3].children[item].checked
          arr = arr.concat(ori)
        }
        this.formData.studentUserIds = arr;
        // this.formData.classId = res.header[2].children[0].checked;
        // res.header[3].children[0].children.forEach(res => {
        //   if (this.formData.studentUserId.indexOf(res.id)!==-1) {
        //     this.formData.studentUserId.push(res.name);
        //   }
        // });
        for (let i=0;i<res.header[3].children.length;i++){
          for (let j=0;j<res.header[3].children[i].checked.length;j++){  //allchildren
            for (let k=0;k<res.header[3].children[i].children.length;k++){
              if (res.header[3].children[i].checked[j]===res.header[3].children[i].children[k].id){
                console.log(res.header[3].children[i].children[k].name)
                this.showName = this.showName.concat(res.header[3].children[i].children[k].name)
              }
            }
          }
        }
        this.showNames=this.showName.join()
        console.log(this.formData.studentUserIds);

        //parentUserId className classId
        // this.formData.parentUserId = res.header[4].children[0].checked;
        // res.header[4].children[0].children.forEach(res => {
        //   if (res.id === this.formData.parentUserId) {
        //     this.formData.parentName = res.name;
        //   }
        // });
      },



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
