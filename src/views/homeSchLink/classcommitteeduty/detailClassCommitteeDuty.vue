<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
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
          <!--改造成senObj-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="学段 :" prop="segmentName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.segmentName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="适合年级 :" prop="gradeIds"-->
          <!--class="orgIntroduction">-->
          <!--<editor v-model="formData.gradeIds" :true-height="350"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="适用范围 :" prop="gradeIds"  class="orgIntroduction">
              <send-object :header="header" @finish="finish" ></send-object>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="职责说明 :" prop="dutyContent"
                          class="orgIntroduction">
              <editor v-model="formData.dutyContent" :true-height="350"/>
            </el-form-item>
          </el-col>
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
            <el-form-item label="适用范围 :" prop="gradeIds"  class="orgIntroduction">
              <send-object :header="header" @finish="finish" v-if="showSend"></send-object>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="职责说明 :" prop="dutyContent"
                          class="orgIntroduction">
              <editor v-model="formData.dutyContent" :true-height="350"/>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
            <!--<el-form-item label="序号 :" prop="sequnceNum">-->
              <!--<el-input class="input-v2-rao" v-model="formData.sequnceNum"-->
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
                  {{formData.segmentName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.segmentName">
                    <el-form-item label="学段 :" prop="segmentName">
                      <span v-if="formData.segmentName">{{formData.segmentName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.gradeNames">
                    <el-form-item label="适合年级 :" prop="gradeNames">
                      <span v-if="formData.gradeNames" v-html="formData.gradeNames"></span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="班委类型 :" prop="classCommitteeCode">
                            <span v-if="formData.classCommitteeCodeStr"
                                  :style="{'color':formData.classCommitteeCodeStr.split(';')[1]}">{{formData.classCommitteeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.dutyContent">
                    <el-form-item label="职责说明 :" prop="dutyContent">
                      <span v-if="formData.dutyContent" v-html="formData.dutyContent"></span>
                    </el-form-item>
                  </div>

                  <!--<div class="p50" v-if="formData.sequnceNum">-->
                    <!--<el-form-item label="序号 :" prop="sequnceNum">-->
                      <!--<span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
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
  import api from "./classcommitteedutyUrl";
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
                nextType: 'class',
                isActive: false,
                url: '/userapp/base/segmentGrade?type=2'
              },
            ]
          },
        ],
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        classCommitteeCodeOptions: [{"label": "全部", "name": ""}], classCommitteeCode: null,

        formData: {
          classCommitteeId: '',
          segmentId: "",
          segmentName: "",
          gradeIds: "",
          gradeNames: "",
          classCommitteeCode: "",
          dutyContent: "",
          sequnceNum: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          schoolId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          schoolName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          segmentId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],

          gradeIds:
            [
              {required: true, message: "请您输入年级", trigger: "blur"},
              {max: 1024, message: "最多能输入1024个字", trigger: "blur"},
            ],

          classCommitteeCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          dutyContent:
            [
              {max: 4000, message: "最多能输入4000个字", trigger: "blur"},

            ],
          sequnceNum:
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
    },
    methods: {
      finish(val) {
        let resData = val.header;
        let temp = [];
        this.formData.segmentId = resData[0].children[0].checked;
        resData[1].children.forEach(res => {
          temp = temp.concat(res.checked);
        });
        this.formData.gradeIds = temp.toString();
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
                this.$message.success("新增成功");
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
              let arr = this.formData.gradeIds.split(',');
              // console.log(arr);
              this.header[0].children[0].checked = this.formData.segmentId;
              this.header[1].children[0].checked = arr;
              this.showSend=true;
              this.$forceUpdate();
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
