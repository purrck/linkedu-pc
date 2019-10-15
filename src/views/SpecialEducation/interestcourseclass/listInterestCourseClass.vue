<template>
  <div class="InterestCourseClass">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">


          <el-form-item label="兴趣班:" prop="interestCourseClassId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.interestCourseClassName" maxlength="30"></el-input>
          </el-form-item>

          <!--<el-form-item label="兴趣班:" prop="interestCourseClassStatusCode" class="w140">-->
          <!--<el-select class="select-v2-rao" v-model="searchForm.interestCourseClassName" placeholder="请您选择">-->
          <!--<el-option v-for="interestCourseClassStatusCodeItem in className"-->
          <!--:key="interestCourseClassStatusCodeItem.name"-->
          <!--:label="interestCourseClassStatusCodeItem.label" :value="interestCourseClassStatusCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="兴趣班 :" prop="classStudentStatusCode">-->
          <!--<el-select class="select-v2-rao" v-model="searchForm.interestCourseClassName" placeholder="请您选择">-->
          <!--<el-option v-for="classStudentStatusCodeItem in data.records"-->
          <!--:key="classStudentStatusCodeItem.name"-->
          <!--:label="classStudentStatusCodeItem.label" :value="classStudentStatusCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->


          <!--<el-form-item label="兴趣班">-->
          <!--<el-select class="select-v2-rao p100" @change="getClassName()" popper-class="select-popper-v2-rao" v-model="formData.interestCourseClassId"-->
          <!--placeholder="请您选择" >-->
          <!--<el-option value="">-->
          <!--请您选择-->
          <!--</el-option>-->
          <!--<el-option v-for="(item,index) in data" :key="item.interestCourseClassId"-->
          <!--:label="item.interestCourseClassName"  :value="item.interestCourseClassId" >-->
          <!--&lt;!&ndash;                    <div>{{item.interestCourseClassName}}</div>&ndash;&gt;-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->


          <el-form-item label="科目:" prop="subjectName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.subjectName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="兴趣班状态:" prop="interestCourseClassStatusCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.interestCourseClassStatusCode" placeholder="请您选择">
              <el-option v-for="interestCourseClassStatusCodeItem in interestCourseClassStatusCodeOptions"
                         :key="interestCourseClassStatusCodeItem.name"
                         :label="interestCourseClassStatusCodeItem.label"
                         :value="interestCourseClassStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="学年:"  prop="schoolYear" class="w140">-->
          <!--<el-input class="input-v2-rao" v-model="searchForm.schoolYear" maxlength="30"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="学期:" prop="schoolTerm" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.schoolTerm" placeholder="请您选择">
              <el-option value="">
                全部
              </el-option>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


          <!--<el-form-item label="学期 :" prop="schoolTerm">-->
          <!--<el-select style="width: 298px;" v-model="searchForm.schoolTerm" placeholder="请选择">-->
          <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->


          <!--<el-form-item label="学期:"  prop="schoolTerm" class="w140">-->
          <!--<el-input class="input-v2-rao" v-model="searchForm.schoolTerm" maxlength="30"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="开始时间:"  prop="effectiveDt" class="w140">-->
          <!--<el-input class="input-v2-rao" v-model="searchForm.effectiveDt" maxlength="30"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="开始时间 :" prop="effectiveDt">
            <el-date-picker class="date-v2-rao" v-model="searchForm.effectiveDt" type="datetime"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd HH:mm"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="学生人数限制:" prop="studyStudentLimit" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.studyStudentLimit" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!--            <el-button type="primary" @click="resetForm('searchForm')" class="button-v2-rao b93BF88">重置</el-button>-->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>

      <el-main class="pt-15">
        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center space-between">

            <div class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
            <el-button type="primary" size="small" class="button-v2-rao b93BF88 " @click="toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
            <el-button type="primary" size="small" class="button-v2-rao bFA6557" @click="toDel"
                       :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="interestCourseClassName" align="center" label="兴趣班" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.interestCourseClassName" class="one-line">{{scope.row.interestCourseClassName}}
                </div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!--<el-table-column prop="subjectName" align="center" label="科目" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.subjectName" class="one-line">{{scope.row.subjectName}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="imagePath" align="center" label="图片">
              <template slot-scope="scope">
                <div v-if="scope.row.imagePath">
                  <img :src="scope.row.imagePath" alt="" height="100px" class="scope-img">
                </div>
                <div v-if="!scope.row.imagePath">无</div>
              </template>
            </el-table-column>
            <el-table-column prop="interestCourseClassStatusCode" label="状态" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.interestCourseClassStatusCodeStr.split(';')[1]}"
                                  v-if="scope.row.interestCourseClassStatusCodeStr">{{scope.row.interestCourseClassStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="schoolYear" align="center" label="学年" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.schoolYear" class="one-line">{{scope.row.schoolYear}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="schoolTerm" align="center" label="学期" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.schoolTerm==1" class="one-line">上学期</div>-->
            <!--<div v-else-if="scope.row.schoolTerm==2" class="one-line">下学期</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--                  <el-table-column prop="segmentName" align="center" label="学段" sortable="custom">-->
            <!--                    <template slot-scope="scope">-->
            <!--                      <div v-if="scope.row.segmentName" class="one-line">{{scope.row.segmentName}}</div>-->
            <!--                      <div v-else>无</div>-->
            <!--                    </template>-->
            <!--                  </el-table-column>-->
            <el-table-column prop="gradeName" align="center" label="年级" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.gradeName" class="one-line">{{scope.row.gradeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!--<el-table-column prop="effectiveDt" align="center" label="开始时间" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.effectiveDt" class="one-line">{{scope.row.effectiveDt}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="expiryDt" align="center" label="截止时间" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.expiryDt" class="one-line">{{scope.row.expiryDt}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="classHourTotal" align="center" label="总课时数" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.classHourTotal" class="one-line">{{scope.row.classHourTotal}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!--<el-table-column prop="feeAmount" align="center" label="费用" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.feeAmount" class="one-line">{{scope.row.feeAmount}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="studyStudentLimit" align="center" label="人数限制" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.studyStudentLimit" class="one-line">{{scope.row.studyStudentLimit}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="studyStudentReal" align="center" label="报读人数" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.studyStudentReal" class="one-line">{{scope.row.studyStudentReal}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!--                  <el-table-column prop="onlineCourseName" align="center" label="线上课程" sortable="custom">-->
            <!--                    <template slot-scope="scope">-->
            <!--                      <div v-if="scope.row.onlineCourseName" class="one-line">{{scope.row.onlineCourseName}}</div>-->
            <!--                      <div v-else>无</div>-->
            <!--                    </template>-->
            <!--                  </el-table-column>-->
            <el-table-column prop="teacherName" align="center" label="任课教师" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.teacherName" class="one-line">{{scope.row.teacherName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300">
              <template slot-scope="scope">

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.interestCourseClassId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.interestCourseClassId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.interestCourseClassId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="兴趣班学生" trigger="hover">
                      <span slot="reference"
                            @click.stop="toStudents(scope.row.interestCourseClassId ,`listInterestCourseClassStudent`,scope.row.interestCourseClassName)"><i
                        class="iconfont icon-student ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="兴趣班计划" trigger="hover">
                      <span slot="reference"
                            @click.stop="toAnother(scope.row.interestCourseClassId ,`listInterestCourseClassPlan`,scope.row.interestCourseClassName,scope.row.segmentId,scope.row.gradeId,scope.row.schoolYear,scope.row.schoolTerm,)"><i
                        class="iconfont icon-icon_anpai ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="兴趣班学生考勤" trigger="hover">
                      <span slot="reference"
                            @click.stop="toCkeck(scope.row.interestCourseClassId ,`listInterestCourseClassStudentCheck`,scope.row.interestCourseClassName)"><i
                        class="iconfont icon-check ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                       :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <el-dialog title="" :visible.sync="dialogDelete" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="dialogDeleteComfireHandler"
                     :loading="isDel">是
          </el-button>
          <el-button type="primary" class="b93BF88" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>

  </div>
</template>

<script>
  import api from "./interestcourseclassUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';

  export default {
    directives: {preview},
    data() {
      return {
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        interestCourseClassStatusCodeOptions: [{"label": "全部", "name": ""}],
        classStudentStatusCodeOptions: [{"label": "全部", "name": ""}],
        options: [{
          value: '1',
          label: '上学期'
        }, {
          value: '2',
          label: '下学期'
        }],
        form: {
          interestCourseClassId: null,
          interestCourseClassName: null,
          subjectName: null,
          interestCourseClassStatusCodeValue: null,
          schoolYear: null,
          schoolTerm: null,
          effectiveDt: null,
          studyStudentLimit: null,
        },
        searchForm: {
          interestCourseClassId: null,
          interestCourseClassName: null,
          subjectName: null,
          interestCourseClassStatusCode: null,
          schoolYear: null,
          schoolTerm: null,
          effectiveDt: null,
          studyStudentLimit: null,
        },
        data: "",
        multipleSelection: [],
        params: {
           page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          schoolId: null,
          interestCourseClassId: null,
          interestCourseClassName: null,
          subjectName: null,
          interestCourseClassStatusCode: null,
          schoolYear: null,
          schoolTerm: null,
          effectiveDt: null,
          studyStudentLimit: null,
        },
        className: [],
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
      }
    },

    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      commonApi.getCodeIntType("interestCourseClassId").then(res => {
        console.log(res)
        let viewList = res.data.data || [];
        for (let classStudentStatusItem of viewList) {
          this.classStudentStatusCodeOptions.push({
            "label": classStudentStatusItem.codeDesc,
            "name": classStudentStatusItem.codeId
          });
        }
      });
    },
    mounted() {
      this.getCurrentPage(this.$route.path, this.params)
      this.getList();

      commonApi.getCodeIntType("interestCourseClassStatus").then(res => {
        let viewList = res.data.data || [];
        for (let interestCourseClassStatusItem of viewList) {
          this.interestCourseClassStatusCodeOptions.push({
            "label": interestCourseClassStatusItem.codeDesc,
            "name": interestCourseClassStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.interestCourseClassId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending";
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.params.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.fetchList(this.params).then(res => {
          this.data = res.data.data;
          this.isLoaded = false;
          this.data.records.map(item => {
            this.className.push(item.interestCourseClassName)
          })

        }, res => {
          this.$message.error(res.message);
        });
      },

      search() {
        this.params.page = 1;
        for (let key in this.searchForm) {
          this.params[key] = this.searchForm[key]
        }
        this.isLoaded = true;
        this.getList();
      },

      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true;
        this.multipleSelection = [id];
      },
      //删除
      toDel() {
        if (this.$refs.schooltable.selection.length == 0) {
          this.msgShow = true;
          setTimeout(() => {
            this.msgShow = false;
          }, 800)
          return;
        }
        this.dialogDelete = true;
      },
      dialogDeleteComfireHandler() {
        this.isDel = true;
        api.batchDelObj(this.multipleSelection).then(res => {
          this.isDel = false;
          this.dialogDelete = false;
          if (res.data.resultCode == "000000") {
            this.$message.success("删除成功");
            this.getList();
          }
        })
        this.isDel = false;

      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/SpecialEducation/detailInterestCourseClass/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/SpecialEducation/InterestCourseClassTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/SpecialEducation/detailInterestCourseClass/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/SpecialEducation/detailInterestCourseClass/detail/' + id;
        this.$router.push({path: opath})
      },
      toAnother(id, path, name, segmentId, gradeId, schoolYear, schoolTerm) {
        let opath = '/SpecialEducation/' + path + '?interestCourseClassId=' + id + '&interestCourseClassName=' + name + '&segmentId=' + segmentId + '&gradeId=' + gradeId + '&schoolYear=' + schoolYear + '&schoolTerm=' + schoolTerm;
        this.$router.push({path: opath})
      },
      toCkeck(id, path, name) {
        let opath = '/SpecialEducation/' + path + '?interestCourseClassId=' + id + '&interestCourseClassName=' + name;
        this.$router.push({path: opath})
      },
      toStudents(id, path, name) {
        let opath = '/SpecialEducation/' + path + '?interestCourseClassId=' + id + '&interestCourseClassName=' + name;
        this.$router.push({path: opath})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .tips-school {
    position: absolute;
    top: 40%;
    left: 47%;

  }

  .select-all {
    margin: 0 0 5px;
  }

  .selected-box {
    background: #F0F0F0;
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;

    img {
      vertical-align: -4px;
    }

  }
</style>
