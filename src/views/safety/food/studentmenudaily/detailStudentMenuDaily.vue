<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="菜谱 *  :" prop="schoolMenuDailyId">
              <el-select class="select-v2-rao" v-model="formData.schoolMenuDailyId" placeholder="请您选择">
                <el-option v-for="item in menuOptions"
                           :key="item.value"
                           :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日期 :" prop="menuDayDt">
              <el-date-picker class="date-v2-rao" v-model="formData.menuDayDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生 :" prop="studentUserIds" class="orgIntroduction ">
              <send-object :header="header" @finish="finish"></send-object>
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
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.menuName">
                    <el-form-item label="菜谱 :" prop="menuName">
                      <span v-if="formData.menuName">{{formData.menuName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="图片 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.studentName">
                    <el-form-item label="学生 :" prop="studentName">
                      <span v-if="formData.studentName">{{formData.studentName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="日期 :" prop="menuDayDt">
                      <span v-if="formData.menuDayDt"> {{formData.menuDayDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="是否异常 :" prop="isException">
                      <el-switch v-model="formData.isException == 'Y'" disabled></el-switch>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.schoolName">
                    <el-form-item label="学校 :" prop="schoolName">
                      <span v-if="formData.schoolName">{{formData.schoolName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.segmentName">
                    <el-form-item label="学段 :" prop="segmentName">
                      <span v-if="formData.segmentName">{{formData.segmentName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.gradeName">
                    <el-form-item label="年级 :" prop="gradeName">
                      <span v-if="formData.gradeName">{{formData.gradeName}}</span>
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
  import api from "./studentmenudailyUrl";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import SendObject from "../../../../components/sendObject/testSendObject";
  import {coverData} from '@/util/util'
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
                single: false,
                isActive: false,
                url: ''
              },
            ]
          },
        ],
        imagePathFileList: [],
        menuOptions: [],
        imagePathFileType: '',
        ynOptions: [{"label": "全部", "name": ""}], isException: null,
        formData: {},
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          schoolMenuDailyId:
            [

            ],

          imagePath:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          studentIds:
            [

            ],

          studentUserIds:
            [

            ],
          menuDayDt:
            [],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
    created() {
      commonApi.commonRequest('/sm/foodSecurity/schoolMenuDailyAd/page', 'get', {page: 1, limit: 999}).then(res => {
        this.menuOptions = coverData(res.data.data.records, 'menuName', 'schoolMenuDailyId')
      })
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
    },
    methods: {
      finish(res) {
        // console.log(res);

        // this.formData.className = res.header[3].children[0].subTitle;
        // // this.formData.studentId = res.header[3].children[0].checked
        this.formData.studentUserIds = res.header[3].children[0].checked;
        res.header[3].children[0].children.forEach(res => {
          if (this.formData.studentUserIds.indexOf(res.id)!==-1) {
            this.formData.studentNames.push(res.name);
          }
        });
        //parentUserId className classId
        this.formData.classId = res.header[2].children[0].checked;
        this.formData.className = res.header[3].children[0].subTitle;

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
