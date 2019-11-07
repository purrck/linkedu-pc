
<template>
  <el-container
    v-loading="isLoading"
    element-loading-custom-class="home-loading"
    style="min-height: 600px"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="bF5F5F5"
  >
    <el-main>
      <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增学科信息</el-button>
      <el-button
        v-if="pageState === 'edit'"
        type="primary"
        class="button-v2-rao b93BF88 mb10"
      >编辑学科信息</el-button>
      <el-button
        v-if="pageState === 'detail'"
        type="primary"
        class="button-v2-rao b93BF88 mb10"
      >详情学科信息</el-button>
      <div>
        <div class="edit-box bfff">
          <div v-if="pageState === 'add'">
            <div class="clearfix" v-for="(item,index) in lotClassList" :key="index">
              <el-form
                :label-position="'right'"
                class="schoolForm-rao"
                label-width="200px"
                ref="formData"
                :inline="false"
                :model="item"
                :rules="rules"
                size="small"
              >
                <el-col :span="8">
                  <el-form-item label="学段">
                    <el-select
                      class="select-v2-rao"
                      popper-class="select-popper-v2-rao"
                      v-model="item.segmentId"
                      prop="segmentId"
                      placeholder="请您选择"
                      @change="segmentChange"
                    >
                      <el-option value>请您选择</el-option>
                      <el-option
                        v-for="(data,index) in segmentList"
                        :key="index"
                        :label="data.name"
                        :value="data.id"
                      >
                        <div @click="segmentClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-show="item.gradeList.length">
                  <el-form-item label="年级">
                    <el-select
                      class="select-v2-rao"
                      popper-class="select-popper-v2-rao"
                      v-model="item.gradeId"
                      placeholder="请您选择"
                      @change="gradeChange"
                    >
                      <el-option value>请您选择</el-option>
                      <el-option
                        v-for="(data,index) in item.gradeList"
                        :key="index"
                        :label="data.name"
                        :value="data.id"
                      >
                        <div @click="gradeClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8" v-show="item.subjectList.length">
                  <el-form-item label="学科">
                    <el-select
                      class="select-v2-rao"
                      popper-class="select-popper-v2-rao"
                      v-model="item.subjectId"
                      placeholder="请您选择"
                      @change="subjectChange"
                    >
                      <el-option value>请您选择</el-option>
                      <el-option
                        v-for="(data,index) in item.subjectList"
                        :key="index"
                        :label="data.name"
                        :value="data.id"
                      >
                        <div @click="subjectClick(index,item)">{{data.name}}</div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <div class="clearfix"></div>
              </el-form>
            </div>
            <div class="clearfix">
              <el-button type="primary" class="mt10" size="small" @click="addItem">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i>新增
              </el-button>
            </div>
          </div>

          <div v-if="pageState === 'edit'">
            <el-form
              :label-position="'right'"
              class="schoolForm-rao"
              label-width="200px"
              ref="formData"
              :inline="false"
              :model="formData"
              :rules="rules"
              size="small"
            >
              <!--<el-col :span="12">
                     <el-form-item label="学校id :" prop="schoolId">
                                    <el-input v-model="formData.schoolId" maxlength="32" disabled></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="学校名 :" prop="schoolName">
                                    <el-input v-model="formData.schoolName" maxlength="32" disabled></el-input>
                    </el-form-item>
              </el-col>-->

              <!--<pj-segment-grade-subject :conf="conf" @callback="treeCall"></pj-segment-grade-subject>-->

              <div class="clearfix" v-for="(item,index) in lotClassList" :key="index">
                <el-form
                  :label-position="'right'"
                  class="schoolForm-rao"
                  label-width="200px"
                  ref="formData"
                  :inline="false"
                  :model="item"
                  :rules="rules"
                  size="small"
                >
                  <el-col :span="8">
                    <el-form-item label="学段">
                      <el-select
                        class="select-v2-rao"
                        popper-class="select-popper-v2-rao"
                        v-model="item.segmentId"
                        prop="segmentId"
                        placeholder="请您选择"
                        @change="segmentChange"
                      >
                        <el-option value>请您选择</el-option>
                        <el-option
                          v-for="(data,index) in segmentList"
                          :key="index"
                          :label="data.name"
                          :value="data.id"
                        >
                          <div @click="segmentClick(index,item)">{{data.name}}</div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-show="item.gradeList.length">
                    <el-form-item label="年级">
                      <el-select
                        class="select-v2-rao"
                        popper-class="select-popper-v2-rao"
                        v-model="item.gradeId"
                        placeholder="请您选择"
                        @change="gradeChange"
                      >
                        <el-option value>请您选择</el-option>
                        <el-option
                          v-for="(data,index) in item.gradeList"
                          :key="index"
                          :label="data.name"
                          :value="data.id"
                        >
                          <div @click="gradeClick(index,item)">{{data.name}}</div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-show="item.subjectList.length">
                    <el-form-item label="学科">
                      <el-select
                        class="select-v2-rao"
                        popper-class="select-popper-v2-rao"
                        v-model="item.subjectId"
                        placeholder="请您选择"
                        @change="subjectChange"
                      >
                        <el-option value>请您选择</el-option>
                        <el-option
                          v-for="(data,index) in item.subjectList"
                          :key="index"
                          :label="data.name"
                          :value="data.id"
                        >
                          <div @click="subjectClick(index,item)">{{data.name}}</div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <div class="clearfix"></div>
                </el-form>
              </div>

              <div class="clearfix"></div>
            </el-form>
          </div>

          <div v-if="pageState === 'detail'">
            <el-row>
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                <!-- 详细查看 -->
                <el-form
                  :label-position="'right'"
                  class
                  label-width="165px"
                  :inline="true"
                  :model="formData"
                  size="small"
                >
                  <el-col :span="8" v-if="formData.segmentName">
                    <el-form-item label="学段名 :" prop="segmentName">{{formData.segmentName}}</el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="formData.gradeName">
                    <el-form-item label="年级名 :" prop="gradeName">{{formData.gradeName}}</el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="formData.subjectName">
                    <el-form-item label="学科名 :" prop="subjectName">{{formData.subjectName}}</el-form-item>
                  </el-col>
                </el-form>
              </el-col>
            </el-row>
          </div>
          <div class="clearfix"></div>

          <div class="text-center">
            <el-button type="primary" class="mr80" size="small" @click="goBack">返回</el-button>
            <el-button
              v-if="pageState === 'edit'"
              type="primary"
              class="mr80"
              :loading="formLoading"
              size="small"
              @click="submit('formData')"
            >更新</el-button>
            <el-button
              v-if="pageState === 'add'"
              type="primary"
              class="mr80"
              :loading="formLoading"
              size="small"
              @click="submit('formData')"
            >发布</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import api from "./basicschoolsegmentsubjectUrl";
import validation from "@/util/validate2";
import commonApi from "@/api/common/common";
import editor from "@/components/editor/editor";
import upload from "@/components/upload/uploadFileV1";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      lotClassList: [
        {
          schoolId: "",
          schoolName: "",
          schoolSegmentSubjectId: "",
          segmentId: "",
          segmentName: "",
          gradeId: "",
          gradeName: "",
          subjectId: "",
          subjectName: "",
          segmentList: [],
          gradeList: [],
          subjectList: []
        }
      ],
      watcher: null,
      data: {
        segment: {},
        grade: {},
        subject: {}
      },
      msg: {
        segmentId: "",
        segmentName: "",
        gradeId: "",
        gradeName: "",
        subjectId: "",
        subjectName: ""
      },
      segmentList: [],
      gradeList: [],
      subjectList: [],
      conf: {
        segmentId: "",
        gradeId: "",
        subjectId: ""
      },
      xuantian: false, //选填信息
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),
      segmentList: [],
      gradeList: [],
      subjectList: [],
      formData: {
        schoolId: "",
        schoolName: "",
        schoolSegmentSubjectId: "",
        segmentId: "",
        segmentName: "",
        gradeId: "",
        gradeName: "",
        subjectId: "",
        subjectName: ""
      },
      pickTime: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      rules: {
        schoolId: [{ max: 32, message: "最多能输入32个字", trigger: "blur" }],
        schoolName: [{ max: 32, message: "最多能输入32个字", trigger: "blur" }],
        segmentId: [{ required: true, message: "请选择学段", trigger: "blur" }],
        segmentName: [
          { max: 255, message: "最多能输入255个字", trigger: "blur" }
        ],
        gradeId: [{ max: 32, message: "最多能输入32个字", trigger: "blur" }],
        gradeName: [{ max: 16, message: "最多能输入16个字", trigger: "blur" }],
        subjectId: [{ max: 32, message: "最多能输入32个字", trigger: "blur" }],
        subjectName: [
          { max: 32, message: "最多能输入32个字", trigger: "blur" }
        ],
        sequnceNum: [{ validator: validation.number, trigger: "blur" }]
      }
    };
  },
  watch: {
    watcher(val) {
      // console.log(val);
    }
  },
  computed: {
    ...mapGetters(["schoolInfo", "isLoading"]),
    pageState() {
      return this.$route.params.type;
    }
  },
  components: { editor, upload },
  created() {
    this.SET_IS_LOADING(false);
    this.getDetail(this.$route.params.id, () => {});

    this.formData.schoolId = this.schoolInfo.schoolOrgId;
    this.formData.schoolName = this.schoolInfo.schoolOrgName;
    this.getSchoolSubjectTree();
  },
  methods: {
    ...mapMutations(["SET_IS_LOADING"]),
    addItem() {
      this.lotClassList.push({
        schoolId: "",
        schoolName: "",
        schoolSegmentSubjectId: "",
        segmentId: "",
        segmentName: "",
        gradeId: "",
        gradeName: "",
        subjectId: "",
        subjectName: "",
        segmentList: [],
        gradeList: [],
        subjectList: []
      });
    },
    treeCall(event) {
      // console.log(event);

      this.formData.subjectId = event.subject.id;
      this.formData.segmentId = event.segment.id;
      this.formData.gradeId = event.grade.id;
      this.formData.subjectName = event.subject.name;
      this.formData.segmentName = event.segment.name;
      this.formData.gradeName = event.grade.name;
    },
    //图片上传
    uploadData(res) {
      this.formData.imagePath = res;
    },

    //选填信息
    xuantianHandler() {
      this.xuantian = this.xuantian ? false : true;
    },
    submit(formName) {
      for (let i = 0; i < this.lotClassList.length; i++) {
        if (!this.lotClassList[i].segmentId) {
          this.$message.error("请选择学段");
          return;
        }
        if (!this.lotClassList[i].gradeId) {
          this.$message.error("请选择年级");
          return;
        }
        if (!this.lotClassList[i].subjectId) {
          this.$message.error("请选择学科");
          return;
        }
      }
      const set = this.$refs;
      this.isLoaded = true;

      if (this.pageState === "edit") {
        this.formLoading = true;
        this.lotClassList.map(item => {
          this.formData.gradeId = item.gradeId;
          this.formData.gradeName = item.gradeName;
          this.formData.segmentId = item.segmentId;
          this.formData.segmentName = item.segmentName;
          this.formData.subjectId = item.subjectId;
          this.formData.subjectName = item.subjectName;
        });
        api.putObj(this.formData).then(
          res => {
            if (res.data.resultCode === "000000") {
              this.formLoading = false;
              this.$message.success("修改成功");
              this.goBack();
            } else {
              //this.$message.error(res.data.message);
              this.formLoading = false;
            }
          },
          res => {
            this.$message.error("加载失败");
            this.formLoading = false;
          }
        );
      } else if (this.pageState === "add") {
        this.formLoading = true;

        let _a = [];
        this.lotClassList.map(item => {
          _a.push({
            gradeId: item.gradeId,
            gradeName: item.gradeName,
            segmentId: item.segmentId,
            segmentName: item.segmentName,
            subjectId: item.subjectId,
            subjectName: item.subjectName
          });
        });
        api.addPiliang(_a).then(
          res => {
            if (res.data.resultCode === "000000") {
              this.formLoading = false;
              this.$message.success("修改成功");
              this.goBack();
            } else {
              this.$message.error(res.data.message);
              this.formLoading = false;
            }
          },
          res => {
            this.$message.error("加载失败");
            this.formLoading = false;
          }
        );
      }

      this.isLoaded = false;
    },
    getDetail(paramsId, callback) {
      if (this.pageState !== "add") {
        this.SET_IS_LOADING(true);
        api.getObj(paramsId).then(
          res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data;

              this.conf.subjectId = this.formData.subjectId;
              this.conf.segmentId = this.formData.segmentId;
              this.conf.gradeId = this.formData.gradeId;
              this.formData.schoolId = this.schoolInfo.schoolOrgId;
              this.formData.schoolName = this.schoolInfo.schoolOrgName;
            }
            this.isLoaded = false;
            callback();
            this.SET_IS_LOADING(false);
          },
          res => {
            this.$message.error(res.message);
          }
        );
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    getSchoolSubjectTree() {
      commonApi.getSchoolSubjectTree().then(res => {
        res.data.data.children.map((item, index) => {
          item["pid"] = `${index}`;
          item.children.map((item1, index1) => {
            item1["pid"] = `${index1}`;
            item1.children.map((item2, index2) => {
              item2["pid"] = `${index2}`;
            });
          });
        });
        this.segmentList = res.data.data.children;

        this.segmentList.map((item, index) => {
          if (item.id == this.conf.segmentId) {
            this.conf.segmentName = item.name;
            this.data.segment["name"] = item.name;
            this.data.segment["id"] = item.id;

            this.lotClassList[0].segmentId = item.id;
            this.lotClassList[0].segmentName = item.name;

            item.children.map((item1, index1) => {
              if (item1.name == "grade") {
                //this.gradeList = item1.children
                this.lotClassList[0].gradeList = item1.children;
              }
              if (item1.name == "subject") {
                //this.subjectList = item1.children
                this.lotClassList[0].subjectList = item1.children;
              }
            });
              alert(123)
            consoe.log(this.lotClassList[0].gradeList)
            consoe.log(this.lotClassList[0].subjectList)
            this.lotClassList[0].gradeList.map((item1, index1) => {
              if (item1.id == this.conf.gradeId) {
                /*this.conf.gradeName = item1.name
                                    this.data.grade['name'] = item1.name
                                    this.data.grade['id'] = item1.id*/
                this.lotClassList[0].gradeName = item1.name;
                this.lotClassList[0].gradeId = item1.id;
              }
            });
            this.lotClassList[0].subjectList.map((item1, index1) => {
              if (item1.id == this.conf.subjectId) {
                this.conf.subjectName = item1.name;
                this.lotClassList[0].subjectName = item1.name;
                this.lotClassList[0].subjectId = item1.id;
                this.data.subject["name"] = item1.name;
                this.data.subject["id"] = item1.id;
              }
            });
            alert(123)
            consoe.log(this.lotClassList[0].subjectList)

            //this.$emit("callback",this.data)
            this.watcher = this.data;
          }
        });
      });
    },
    gradeChange(event) {
        // console.log(event)
      if (event == "") {
        this.conf.gradeName = "";
        this.conf.gradeId = "";
        this.data.grade["name"] = this.conf.gradeName;
        this.data.grade["id"] = this.conf.gradeId;
        //this.$emit("callback",this.data)
        this.watcher = this.data;
      }
    },
    gradeClick(index, data) {
      data.gradeName = data.gradeList[index].name;
      this.conf.gradeName = data.gradeList[index].name;
      this.conf.gradeId = data.gradeList[index].id;

      this.data.grade["name"] = this.conf.gradeName;
      this.data.grade["id"] = this.conf.gradeId;
      //this.$emit("callback",this.data)
      this.watcher = this.data;
    },
    subjectChange(event) {
        // console.log(event);
      if (event == "") {
        this.conf.subjectId = "";
        this.conf.subjectName = "";
        this.data.subject["name"] = this.conf.subjectName;
        this.data.subject["id"] = this.conf.subjectId;
        //this.$emit("callback",this.data)
        this.watcher = this.data;
      }
    },
    subjectClick(index, data) {
      data.subjectName = data.subjectList[index].name;
      this.conf.subjectName = data.subjectList[index].name;
      this.conf.subjectId = data.subjectList[index].id;

      this.data.subject["name"] = this.conf.subjectName;
      this.data.subject["id"] = this.conf.subjectId;
      //this.$emit("callback",this.data)
      this.watcher = this.data;
    },
    segmentChange(event) {
      this.conf.subjectId = "";
      this.conf.subjectName = "";
      this.conf.gradeName = "";
      this.conf.gradeId = "";
      if (event == "") {
        this.gradeList = [];
        this.subjectList = [];
        this.data.grade["name"] = "";
        this.data.grade["id"] = "";
        this.data.subject["name"] = "";
        this.data.subject["id"] = "";
        this.data.segment["name"] = "";
        this.data.segment["id"] = "";
        //this.$emit("callback",this.data)
        this.watcher = this.data;
      }
    },
    segmentClick(index, data) {
      data.segmentName = this.segmentList[index].name;
      this.conf.segmentName = this.segmentList[index].name;
      this.conf.segmentId = this.segmentList[index].id;
      this.segmentList[index].children.map((item, index) => {
        if (item.name == "grade") {
          data.gradeList = item.children;
        }
        if (item.name == "subject") {
          data.subjectList = item.children;
        }
      });
      this.data.segment["name"] = this.conf.segmentName;
      this.data.segment["id"] = this.conf.segmentId;
      this.data.grade["name"] = "";
      this.data.grade["id"] = "";
      this.data.subject["name"] = "";
      this.data.subject["id"] = "";
      this.watcher = this.data;
      //this.$emit("callback",this.data)
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-quickly {
  width: 166px;
  border: 1px solid #d8d8d8;

  a.current {
    background: #4a9388;
    color: #fff;
  }

  a {
    padding: 10px 0 10px 15px;
    font-size: 14px;
    display: block;

    img {
      padding-right: 8px;
      vertical-align: -4px;
    }
  }
  a:hover {
    text-decoration: none;
  }
}
.el-form-item--small.el-form-item {
  margin-bottom: 25px;
}

.ml80 {
  margin-left: 80px;
}

.width100 {
  width: 100%;
}

.form-table {
  margin-top: 20px;
}

.bm-view {
  width: 760px;
  height: 300px;
  margin-top: 10px;
}
</style>
