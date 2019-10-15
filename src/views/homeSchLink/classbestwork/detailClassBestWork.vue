<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="作品名称 :" prop="workTitle">
              <el-input class="input-v2-rao" v-model="formData.workTitle"
                        maxlength="128"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作品图 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生作者 :" prop="studentUserId">
              <send-object :header="header" @finish="finish"></send-object>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生作者姓名 :" prop="studentName">
             <el-input v-model="formData.studentName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布时间 :" prop="workDt">
              <el-date-picker class="date-v2-rao" v-model="formData.workDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作品类别 :" prop="workTypeCode">
              <el-select class="select-v2-rao" v-model="formData.workTypeCode" placeholder="请您选择">
                <el-option v-for="workTypeCodeItem in workTypeCodeOptions"
                           :key="workTypeCodeItem.name"
                           :label="workTypeCodeItem.label" :value="workTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="workStatusCode">
              <el-select class="select-v2-rao" v-model="formData.workStatusCode" placeholder="请您选择">
                <el-option v-for="workStatusCodeItem in workStatusCodeOptions"
                           :key="workStatusCodeItem.name"
                           :label="workStatusCodeItem.label" :value="workStatusCodeItem.name">
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
            <el-form-item label="作品名称 :" prop="workTitle">
              <el-input class="input-v2-rao" v-model="formData.workTitle"
                        maxlength="128"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作品图 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发布时间 :" prop="workDt">
              <el-date-picker class="date-v2-rao" v-model="formData.workDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作品类别 :" prop="workTypeCode">
              <el-select class="select-v2-rao" v-model="formData.workTypeCode" placeholder="请您选择">
                <el-option v-for="workTypeCodeItem in workTypeCodeOptions"
                           :key="workTypeCodeItem.name"
                           :label="workTypeCodeItem.label" :value="workTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态 :" prop="workStatusCode">
              <el-select class="select-v2-rao" v-model="formData.workStatusCode" placeholder="请您选择">
                <el-option v-for="workStatusCodeItem in workStatusCodeOptions"
                           :key="workStatusCodeItem.name"
                           :label="workStatusCodeItem.label" :value="workStatusCodeItem.name">
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
                  {{formData.workTitle}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.workTitle">
                    <el-form-item label="作品名称 :" prop="workTitle">
                      <span v-if="formData.workTitle">{{formData.workTitle}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="作品图 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="发布时间 :" prop="workDt">
                      <span v-if="formData.workDt"> {{formData.workDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="作品类别 :" prop="workTypeCode">
                            <span v-if="formData.workTypeCodeStr"
                                  :style="{'color':formData.workTypeCodeStr.split(';')[1]}">{{formData.workTypeCodeStr.split(';')[0]}}</span>
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
  import api from "./classbestworkUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import SendObject from "../../../components/sendObject/testSendObject";

  export default {
    components: {SendObject,editor, upload, uploads},
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
                isCheckAll: false,
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
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '年级',
                subTitleType: 'grade',
                nextType: 'class',
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
                nextType: 'students',
                isActive: false,
                url: ''
              },
            ]
          },{
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
                single: true,
                isActive: false,
                url: ''
              },
            ]
          },
        ],
        imagePathFileList: [],
        imagePathFileType: '',
        workTypeCodeOptions: [{"label": "全部", "name": ""}], workTypeCode: null,
        workStatusCodeOptions: [{"label": "全部", "name": ""}], workStatusCode: null,
        formData: {
          bestWorkId: '',
          classId: '',
          className: '',
          workTitle: "",
          studentUserId: "",
          imagePath: "",
          workDt: "",
          workTypeCode: "",
          workStatusCode: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          studentUserId:
            [
              {required: true, message: "请您选择学生", trigger: "blur"},
            ],
          workTitle:
            [
              {max: 128, message: "最多能输入128个字", trigger: "blur"},

            ],
          imagePath:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          workDt:
            [],
          workTypeCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          workStatusCode:
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
      commonApi.getCodeIntType("workType").then(res => {
        let viewList = res.data.data || [];
        for (let workTypeItem of viewList) {
          this.workTypeCodeOptions.push({
            "label": workTypeItem.codeDesc,
            "name": workTypeItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("workStatus").then(res => {
        let viewList = res.data.data || [];
        for (let workStatusItem of viewList) {
          this.workStatusCodeOptions.push({
            "label": workStatusItem.codeDesc,
            "name": workStatusItem.codeId
          });
        }
      });
    },
    methods: {
      finish(res) {
        console.log(res);

        this.formData.classId = res.header[2].children[0].checked;
        this.formData.className = res.header[3].children[0].subTitle;
        // this.formData.studentId = res.header[3].children[0].checked
        this.formData.studentUserId = res.header[3].children[0].checked;
        res.header[3].children[0].children.forEach(res => {
          if (res.id === this.formData.studentUserId) {
            this.formData.studentName = res.name;
          }
        });
        //parentUserId className classId
        // this.formData.classId = res.header[2].children[0].checked;
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
      //获取图片上传信息
      uploadData(res) {
        this.formData.imagePath = res;
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
