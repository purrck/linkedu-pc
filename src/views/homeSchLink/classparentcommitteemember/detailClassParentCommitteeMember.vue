<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="家委类型 :" prop="parentClassCommitteeCode">
              <el-select @change="parentClassCommitteeName" class="select-v2-rao" v-model="formData.parentClassCommitteeCode" placeholder="请您选择" >
                <el-option v-for="parentClassCommitteeCodeItem in parentClassCommitteeCodeOptions"
                           :key="parentClassCommitteeCodeItem.name"
                           :label="parentClassCommitteeCodeItem.label" :value="parentClassCommitteeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家委名称 :" prop="parentClassCommitteeName">
              <el-input class="input-v2-rao"  v-model="formData.parentClassCommitteeName"
                        maxlength="32"></el-input>
              <!--<span v-show="false">{{parentClassCommitteeName}}</span>-->
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="选择家长 :" prop="parentUserId" class="orgIntroduction">
              <!--<el-input class="input-v2-rao" v-model="formData.parentId"-->
              <!--maxlength="32"></el-input>-->
              <send-object :header="header" @finish="finish" ></send-object>
            </el-form-item>
          </el-col>

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
          <el-col :span="24">
            <el-form-item label="家长 :" prop="parentName">
              <el-input class="input-v2-rao" v-model="formData.parentName"
                        disabled maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="家委职责 :" prop="parentClassCommitteeDuty"
                          class="orgIntroduction">
              <editor v-model="formData.parentClassCommitteeDuty" :true-height="350"/>
            </el-form-item>
          </el-col>

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
            <el-form-item label="状态 :" prop="parentCommitteeMemberStatusCode">
              <el-select class="select-v2-rao" v-model="formData.parentCommitteeMemberStatusCode" placeholder="请您选择">
                <el-option v-for="parentCommitteeMemberStatusCodeItem in parentCommitteeMemberStatusCodeOptions"
                           :key="parentCommitteeMemberStatusCodeItem.name"
                           :label="parentCommitteeMemberStatusCodeItem.label"
                           :value="parentCommitteeMemberStatusCodeItem.name">
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
            <el-form-item label="状态 :" prop="parentCommitteeMemberStatusCode">
              <el-select class="select-v2-rao" v-model="formData.parentCommitteeMemberStatusCode" placeholder="请您选择">
                <el-option v-for="parentCommitteeMemberStatusCodeItem in parentCommitteeMemberStatusCodeOptions"
                           :key="parentCommitteeMemberStatusCodeItem.name"
                           :label="parentCommitteeMemberStatusCodeItem.label"
                           :value="parentCommitteeMemberStatusCodeItem.name">
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
                  {{formData.parentClassCommitteeCode}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50">
                    <el-form-item label="家委类型 :" prop="parentClassCommitteeCode">
                            <span v-if="formData.parentClassCommitteeCodeStr"
                                  :style="{'color':formData.parentClassCommitteeCodeStr.split(';')[1]}">{{formData.parentClassCommitteeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" >
                    <el-form-item label="家委名称 :" prop="parentClassCommitteeName">
                      <span v-if="formData.parentClassCommitteeName">{{formData.parentClassCommitteeName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="家委职责 :" prop="parentClassCommitteeDuty">
                      <span v-if="formData.parentClassCommitteeDuty" v-html="formData.parentClassCommitteeDuty"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" >
                    <el-form-item label="家长 :" prop="parentName">
                      <span v-if="formData.parentName">{{formData.parentName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" >
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
                    <el-form-item label="状态 :" prop="parentCommitteeMemberStatusCode">
                            <span v-if="formData.parentCommitteeMemberStatusCodeStr"
                                  :style="{'color':formData.parentCommitteeMemberStatusCodeStr.split(';')[1]}">{{formData.parentCommitteeMemberStatusCodeStr.split(';')[0]}}</span>
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
  import api from "./classparentcommitteememberUrl";
  import dutyApi from "../classparentcommitteeduty/classparentcommitteedutyUrl";
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
        showSend: false,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
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
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '年级',
                subTitleType: 'grade',
                single: true,
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
                single: true,
                subTitleType: 'class',
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
                single: true,
                isActive: false,
                url: ''
              },
            ]
          },
          {
            title: '5、选择家长',
            isActive: false,
            code: 'parents',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '家长',
                subTitleType: 'parents',
                single: true,
                isActive: false,
                url: ''
              },
            ]
          },
        ],
        parentClassCommitteeCodeOptions: [], parentClassCommitteeCode: null,
        parentCommitteeMemberStatusCodeOptions: [{"label": "全部", "name": ""}], parentCommitteeMemberStatusCode: null,
        formData: {
          parentCommitteeMemberId: '',
          effectiveDt: "",
          expiryDt: "",
          parentName: "",
          className: "",
          studentName: "",
          parentClassCommitteeName:'',
          parentUserId: "",
          parentCommitteeMemberStatusCode: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          classId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          className:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          parentClassCommitteeId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          parentClassCommitteeCode:
            [
              {required: true, message: "请您选择家委类型", trigger: "blur"},
            ],
          parentClassCommitteeName:
            [
              {required: true, message: "请您选择家委名称", trigger: "blur"},
            ],
          parentUserId:
            [
              {required: true, message: "请您选择学生家长", trigger: "blur"},
            ],
          parentClassCommitteeDuty:
            [
              {max: 2048, message: "最多能输入2048个字", trigger: "blur"},

            ],
          effectiveDt:
            [],
          parentCommitteeMemberStatusCode:
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
      commonApi.getCodeIntType("parentClassCommittee").then(res => {
        let viewList = res.data.data || [];
        for (let item of viewList) {
          this.parentClassCommitteeCodeOptions.push({
            "label": item.codeDesc,
            "name": item.codeId
          });
        }
      });
      commonApi.getCodeIntType("parentCommitteeMemberStatus").then(res => {
        let viewList = res.data.data || [];
        for (let item of viewList) {
          this.parentCommitteeMemberStatusCodeOptions.push({
            "label": item.codeDesc,
            "name": item.codeId
          });
        }
      });
    },
    methods: {
      finish(res) {
        // console.log(res);

        this.formData.studentUserId = res.header[3].children[0].checked;
        res.header[3].children[0].children.forEach(res => {
          if (res.id === this.formData.studentUserId) {
            this.formData.studentName = res.name;
          }
        });
        this.formData.classId = res.header[2].children[0].checked;
        this.formData.className = res.header[3].children[0].subTitle;
        this.formData.parentUserId = res.header[4].children[0].checked;
        res.header[4].children[0].children.forEach(res => {
          if (res.id === this.formData.parentUserId) {
            this.formData.parentName = res.name;
          }
        });

        // dutyApi.fetchList({page:1,limit:999,gradeNames:this.formData.className}).then(res=>{
        //   if(res.data.resultCode==='000000'){
        //
        //   }
        // });

        this.formData.parentClassCommitteeDuty = '123';
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
      parentClassCommitteeName(){
        let code = this.formData.parentClassCommitteeCode;
        let name = this.parentClassCommitteeCodeOptions.find(res=>{
          if(res.name === code) {
            return res;
          }
        }).label;
        this.formData.parentClassCommitteeName = name;
      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
            }
            this.isLoaded = false;
            this.showSend=true;
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


  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
