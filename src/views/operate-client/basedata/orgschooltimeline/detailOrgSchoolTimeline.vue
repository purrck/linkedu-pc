<template>
  <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
    <el-main>
        <div class="edit-box bfff">
          <div v-if="pageState === 'add'">
            <el-form
              :label-position="'right'"
              class="edit-form"
              label-width="120px"
              ref="formData"
              :rules="rules"
              :inline="false"
              :model="formData"
              size="small"
            >
              <el-col :span="24">
                <el-form-item label="作息名称 :" prop="timelineName">
                  <el-input class="input-v2-rao" v-model="formData.timelineName" placeholder="作息名称"></el-input>
                </el-form-item>

                <el-form-item label="学校 :" prop="schoolOrgId">
                  <el-select
                    class="select-v2-rao"
                    v-model="formData.schoolOrgId"
                    placeholder="请选择学校"
                    @change="schoolChange"
                  >
                    <el-option
                      v-for="item in optionsList1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="年次 :" prop="schoolYearStart" class="form-item-inline">
                  <el-select
                    class="select-v2-rao"
                    v-model="formData.schoolYearStart"
                    placeholder="开始年次"
                  >
                    <el-option
                      v-for="(item,index) of yearList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label=" " prop="schoolYearEnd" class="form-item-inline2">
                  <el-select class="select-v2-rao" v-model="formData.schoolYearEnd" placeholder="结束年次">
                    <el-option
                      v-for="(item,index) of yearList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="学期 :" prop="schoolTerm">
                  <el-select class="select-v2-rao" v-model="formData.schoolTerm" placeholder="请选择学期">
                    <el-option
                      v-for="(item ,index) of optionsList2"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="学级 :" prop="segmentId" class="form-item-inline">
                  <el-select
                    class="select-v2-rao"
                    v-model="formData.segmentId"
                    placeholder="请选择学段"
                    @change="segmentChange"
                  >
                    <el-option
                      v-for="item in optionsList3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label=" " prop="gradeId" class="form-item-inline2">
                  <el-select class="select-v2-rao" v-model="formData.gradeId" placeholder="请选择年级">
                    <el-option
                      v-for="item in optionsList4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="描述 :" prop="remark">
                  <editor style="width: 520px;" :true-height="350" v-model="formData.remark"></editor>
                </el-form-item>
              </el-col>
            </el-form>
          </div>

          <div v-if="pageState === 'edit'">
            <el-form
              :label-position="'right'"
              class="edit-form"
              label-width="120px"
              ref="formData"
              :inline="false"
              :rules="rules"
              :model="formData"
              size="small"
            >
              <el-col :span="24">
                <el-form-item label="作息名称 :" prop="timelineName">
                  <el-input class="input-v2-rao" v-model="formData.timelineName" placeholder="作息名称"></el-input>
                </el-form-item>

                <el-form-item label="学校 :" prop="schoolOrgId">
                  <el-select
                    class="select-v2-rao"
                    disabled
                    v-model="formData.schoolOrgId"
                    placeholder="请选择学校"
                  >
                    <el-option
                      v-for="item in optionsList1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="年次 :" prop="schoolYearStart" class="form-item-inline">
                  <el-select
                    class="select-v2-rao"
                    disabled
                    v-model="formData.schoolYearStart"
                    placeholder="开始年次"
                  >
                    <el-option
                      v-for="(item,index) of yearList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label prop="schoolYearEnd" class="form-item-inline2">
                  <el-select
                    class="select-v2-rao"
                    disabled
                    v-model="formData.schoolYearEnd"
                    placeholder="结束年次"
                  >
                    <el-option
                      v-for="(item,index) of yearList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="学期 :" prop="schoolTerm">
                  <el-select
                    class="select-v2-rao"
                    disabled
                    v-model="formData.schoolTerm"
                    placeholder="请选择学期"
                  >
                    <el-option
                      v-for="(item ,index) of optionsList2"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="学级 :" prop="segmentId" class="form-item-inline">
                  <el-select
                    class="select-v2-rao"
                    disabled
                    v-model="formData.segmentId"
                    placeholder="请选择学段"
                    @change="segmentChange"
                  >
                    <el-option
                      v-for="item in optionsList3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="gradeId" class="form-item-inline2">
                  <el-select
                    class="select-v2-rao"
                    disabled
                    v-model="formData.gradeId"
                    placeholder="请选择年级"
                  >
                    <el-option
                      v-for="item in optionsList4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="描述 :" prop="remark">
                  <editor :true-height="350" v-model="formData.remark"></editor>
                </el-form-item>
              </el-col>
            </el-form>
          </div>

          <div v-if="pageState === 'detail'">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- 详细查看 -->
                <el-form
                  :label-position="'right'"
                  label-width="120px"
                  :inline="false"
                  :model="formData"
                  size="small"
                  class="flex row wrap">
                  <div class="p100">
                    <div class="detail-title-v2">{{formData.segmentName}}</div>
                    <div class="detail-item-v2">
                      <div class="p50" v-if="formData.schoolOrgName">
                        <el-form-item label="学校机构 :" prop="schoolOrgName">
                          <span v-if="formData.schoolOrgName">{{formData.schoolOrgName}}</span>
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
                      <div class="p50" v-if="formData.schoolYear">
                        <el-form-item label="学年 :" prop="schoolYear">
                          <span v-if="formData.schoolYear">{{formData.schoolYear}}</span>
                        </el-form-item>
                      </div>
                      <div class="p50" v-if="formData.schoolTerm">
                        <el-form-item label="学期 :" prop="schoolTerm">
                          <span v-if="formData.schoolTerm">{{formData.schoolTerm}}</span>
                        </el-form-item>
                      </div>
                      <div class="p50" v-if="formData.remark">
                        <el-form-item label="备注 :" prop="remark">
                          <span v-if="formData.remark" v-html="formData.remark"></span>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </el-form>
              </el-col>
            </el-row>
          </div>
          <div class="text-center mt-30">
            <el-button
              v-if="pageState === 'edit'"
              type="primary"
              class="fush-btn button-v2-rao b93BF88"
              :loading="formLoading"
              size="small"
              @click="submit('formData')"
            >更新</el-button>
            <el-button
              v-if="pageState === 'add'"
              type="primary"
              class="fush-btn button-v2-rao b93BF88"
              :loading="formLoading"
              size="small"
              @click="submit('formData')"
            >发布</el-button>
            <el-button
              type="primary"
              class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
              size="small"
              @click="goBack"
            >返回</el-button>
          </div>
        </div>
     </el-main>
  </el-container>
</template>

<script>
import api from "./orgschooltimelineUrl";
import validation from "@/util/validate2";
import commonApi from "@/api/common/common";
import editor from "@/components/editor/editor";
import upload from "@/components/upload/uploadFileV1";
import uploads from "@/components/upload/uploadFile";
import { coverData } from "@/util/util";

export default {
  components: { editor, upload, uploads },
  data() {
    return {
      yearList: [],
      optionsList1: [
        { label: "硕希望实验小学", value: "580df6d6c0a802137a30f614fcb1d90d" }
      ],
      optionsList2: [
        { label: "第一学期", value: "1" },
        { label: "第二学期", value: "2" }
      ],
      optionsList3: [],
      optionsList4: [],
      optionsList5: [],
      formLoading: false,
      isLoaded: false,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      ynOptions: [{ label: "全部", name: "" }],
      isCurrent: null,
      formData: {
        timelineId: "",
        isCurrent: "",
        remark: "",
        sequnceNum: "",
        schoolTerm: "",
        schoolYearStart: "",
        schoolYearEnd: "",
        gradeId: "",
        gradeName: "",
        segmentId: "",
        segmentName: "",
        schoolOrgName: "",
        schoolOrgId: "",
        schoolTerm: "",
      },
      pickTime: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      rules: {
        timelineName: [
          { required: true, message: "请您输入学校日常作息", trigger: "blur" },
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        schoolOrgId: [
          { required: true, message: "请您输入学校机构", trigger: "blur" },
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        // schoolYear: [
        //   { required: true, message: "请您输入学年", trigger: "blur" },
        //   { max: 32, message: "最多能输入32个字", trigger: "blur" }
        // ],
        schoolYearStart: [
          { required: true, message: "请您输入开始年次", trigger: "blur" },
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        schoolYearEnd: [
          { required: true, message: "请您输入结束年次", trigger: "blur" },
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        schoolTerm: [
          { required: true, message: "请您输入学期", trigger: "blur" },
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        segmentId: [
          { required: true, message: "请您输入学段", trigger: "blur" },
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        gradeId: [
          { required: true, message: "请您输入年级", trigger: "blur" },
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        // isCurrent:
        //   [
        //     {required: true, message: '请您输入当前应用', trigger: 'blur'},
        //     {max: 2, message: '最多能输入2个字', trigger: 'blur'},
        //   ],
        remark: [{ max: 512, message: "最多能输入512个字", trigger: "blur" }]
        // sequnceNum:
        //   [
        //     {validator: validation.number, trigger: 'blur'},
        //   ],
      }
    };
  },
  computed: {
    pageState() {
      return this.$route.params.type;
    }
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.yearList.push({
        label: `${2018 + i}年`,
        value: `${2018 + i}`
      });
    }
    commonApi.getAllSchool().then(res => {
      res.data.data.records.forEach(item => {
        this.optionsList1.push({
          label: item.schoolOrgName,
          value: item.schoolOrgId
        });
      });
    });

    this.getDetail(this.$route.params.id);
    commonApi.getCodeIntType("boolean_yn").then(res => {
      let viewList = res.data.data || [];
      for (let ynItem of viewList) {
        this.ynOptions.push({
          label: ynItem.codeDesc,
          name: ynItem.codeId
        });
      }
    });
  },
  methods: {
    submit(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        this.formData.schoolOrgName = this.optionsList1.find(
          item => item.value === this.formData.schoolOrgId
        ).label;
        this.formData.segmentName = this.optionsList3.find(
          item => item.value === this.formData.segmentId
        ).label;
        this.formData.gradeName = this.optionsList4.find(
          item => item.value === this.formData.gradeId
        ).label;
        // console.log(this.formData);
        if (this.pageState === "edit" && valid) {
          this.formLoading = true;
          api.putObj(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.formLoading = false;
              this.$message.success("修改成功");
              this.goBack();
            } else {
              this.$message.error(res.data.message);
              this.formLoading = false;
            }
          });
        } else if (this.pageState === "add" && valid) {
          this.formLoading = true;
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.formLoading = false;
              this.$message.success("修改成功");
              this.goBack();
            } else {
              this.$message.error(res.data.message);
              this.formLoading = false;
            }
          });
        }
      });
      this.isLoaded = false;
    },
    getDetail(paramsId) {
      if (this.pageState !== "add") {
        this.isLoaded = true;
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === "000000") {
            this.formData = res.data.data;
          }
          this.isLoaded = false;
          this.$set(
            this.formData,
            "schoolYearStart",
            this.formData.schoolYear.split("-")[0]
          );
          this.$set(
            this.formData,
            "schoolYearEnd",
            this.formData.schoolYear.split("-")[1]
          );
          if(this.pageState === "edit") {
            const {segmentId, gradeId, schoolOrgId} = this.formData;
            this.schoolChange(schoolOrgId);
            this.segmentChange(segmentId)
          }
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    segmentChange(type) {
      // this.formData.gradeId = type ? this.formData.gradeId : "";
      this.optionsSelectData.children.forEach(item => {
        if (item.id === this.formData.segmentId) {
          this.optionsList4 = coverData(item.children, "name", "id");
        }
      });
    },
    schoolChange(schoolOrgId) {
      commonApi.getClassTreeBySchool(schoolOrgId).then(res => {
        this.optionsSelectData = res.data.data;
        this.optionsList3 = coverData(res.data.data.children, "name", "id");
         if(this.pageState === "edit") {
            const {segmentId} = this.formData;
            this.segmentChange(segmentId)
          }
      });
    }
  }
};
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
  margin: 0 15px;
}
</style>
