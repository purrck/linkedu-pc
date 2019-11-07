<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <!--<el-col :span="24">-->
          <!--<el-form-item label="班级 :" prop="classId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.classId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="班委id :" prop="classCommitteeId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.classCommitteeId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="班委类型 :" prop="classCommitteeCode">
              <el-select class="select-v2-rao" v-model="formData.classCommitteeCode" placeholder="请您选择">
                <el-option v-for="classCommitteeCodeItem in classCommitteeCodeOptions"
                           :key="classCommitteeCodeItem.name"
                           :label="classCommitteeCodeItem.label" :value="classCommitteeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="适用范围 :" prop="studentUserId" class="orgIntroduction">
              <send-object :header="header" @finish="finish"></send-object>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
          <!--<el-form-item label="年级 :" prop="gradeName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.gradeName"-->
          <!--disabled="true" maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="班级 :" prop="className">
              <el-input class="input-v2-rao" v-model="formData.className"
                        disabled maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生 :" prop="studentName">
              <el-input class="input-v2-rao" v-model="formData.studentName"
                        disabled maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
          <!--<el-form-item label="学生id :" prop="studentId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.studentId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="学生用户id :" prop="studentUserId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.studentUserId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="开始时间 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="截止时间 :" prop="expiryDt">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="committeeMemberStatusCode">
              <el-select class="select-v2-rao" v-model="formData.committeeMemberStatusCode" placeholder="请您选择">
                <el-option v-for="committeeMemberStatusCodeItem in committeeMemberStatusCodeOptions"
                           :key="committeeMemberStatusCodeItem.name"
                           :label="committeeMemberStatusCodeItem.label" :value="committeeMemberStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="开始时间 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="截止时间 :" prop="expiryDt">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="committeeMemberStatusCode">
              <el-select class="select-v2-rao" v-model="formData.committeeMemberStatusCode" placeholder="请您选择">
                <el-option v-for="committeeMemberStatusCodeItem in committeeMemberStatusCodeOptions"
                           :key="committeeMemberStatusCodeItem.name"
                           :label="committeeMemberStatusCodeItem.label" :value="committeeMemberStatusCodeItem.name">
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
                  {{formData.classCommitteeCode}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50">
                    <el-form-item label="班委类型 :" prop="classCommitteeCode">
                            <span v-if="formData.classCommitteeCodeStr"
                                  :style="{'color':formData.classCommitteeCodeStr.split(';')[1]}">{{formData.classCommitteeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.studentName">
                    <el-form-item label="学生 :" prop="studentName">
                      <span v-if="formData.studentName">{{formData.studentName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="开始时间 :" prop="effectiveDt">
                      <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="截止时间 :" prop="expiryDt">
                      <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="状态 :" prop="committeeMemberStatusCode">
                            <span v-if="formData.committeeMemberStatusCodeStr"
                                  :style="{'color':formData.committeeMemberStatusCodeStr.split(';')[1]}">{{formData.committeeMemberStatusCodeStr.split(';')[0]}}</span>
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
                   :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./classcommitteememberUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import SendObject from "../../../components/sendObject/testSendObject";

  export default {
    components: {SendObject, editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
        header: [
          {
            title: '1、学段',
            isActive: true,
            code: 'segment',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                nextType: 'grade',
                single: true,
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
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '年级',
                subTitleType: 'grade',
                single: true,
                nextType: 'class',
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'class',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '班级',
                single: true,
                subTitleType: 'class',
                nextType: 'students',
              },
            ]
          },
          {
            title: '4、选择学生',
            isActive: false,
            code: 'students',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学生',
                single: true,
                subTitleType: 'students',
                nextType: 'parents',
              },
            ]
          },
          // {
          //   title: '5、选择家长',
          //   isActive: false,
          //   code: 'parents',
          //   children: [
          //     {
          //       isCheckAll: true,
          //       checked: [],
          //       children: [],
          //       subTitle: '家长',
          //       subTitleType: 'parents',
          //       nextType: 'none',
          //       isActive: false,
          //       url: ''
          //     },
          //   ]
          // },
        ],

        classCommitteeCodeOptions: [], classCommitteeCode: null,
        committeeMemberStatusCodeOptions: [{"label": "全部", "name": ""}], committeeMemberStatusCode: null,
        formData: {
          committeeMemberId: '',
          effectiveDt: "",
          expiryDt: "",
          committeeMemberStatusCode: "",
          classCommitteeCode: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          classId:
            [
              {required: true, message: "请您选择班级", trigger: "blur"},
            ],
          className:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          classCommitteeId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          classCommitteeCode:
            [
              {required: true, message: "请您选择班委类型", trigger: "blur"},
            ],
          studentId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          studentName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          studentUserId:
            [
              {required: true, message: "请您选择相应学生", trigger: "blur"},
            ],
          effectiveDt:
            [],
          expiryDt:
            [],
          committeeMemberStatusCode:
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
    created() {
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("classCommittee").then(res => {
        let viewList = res.data.data || [];
        for (let classCommitteeItem of viewList) {
          this.classCommitteeCodeOptions.push({
            "label": classCommitteeItem.codeDesc,
            "name": classCommitteeItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("committeeMemberStatus").then(res => {
        let viewList = res.data.data || [];
        for (let committeeMemberStatusItem of viewList) {
          this.committeeMemberStatusCodeOptions.push({
            "label": committeeMemberStatusItem.codeDesc,
            "name": committeeMemberStatusItem.codeId
          });
        }
      });
    },
    methods: {
      finish(res) {
        //classId  className studentId studentUserId studentName
        // console.log(res.header);
        // || res.header[2].children[0].childr
        this.formData.classId = res.header[2].children[0].checked;
        this.formData.className = res.header[3].children[0].subTitle;
        // this.formData.studentId = res.header[3].children[0].checked
        this.formData.studentUserId = res.header[3].children[0].checked;
        res.header[3].children[0].children.forEach(res => {
          if (res.id === this.formData.studentUserId) {
            this.formData.studentName = res.name;
          }
        });
        this.$forceUpdate()
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
