<template>
  <div class="StudentFamilyVisit">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="学生家访:" prop="familyVisitId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.familyVisitId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="家访标题:" prop="familyVisitTitle" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.familyVisitTitle" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="执行时间:" prop="visitedBeginDt" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.visitedBeginDt" type="date"
                            value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="线上线下:" prop="familyVisitModeCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.familyVisitModeCode" placeholder="请您选择">
              <el-option v-for="familyVisitModeCodeItem in familyVisitModeCodeOptions"
                         :key="familyVisitModeCodeItem.name"
                         :label="familyVisitModeCodeItem.label" :value="familyVisitModeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家访状态:" prop="familyVisitStatusCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.familyVisitStatusCode" placeholder="请您选择">
              <el-option v-for="familyVisitStatusCodeItem in familyVisitStatusCodeOptions"
                         :key="familyVisitStatusCodeItem.name"
                         :label="familyVisitStatusCodeItem.label" :value="familyVisitStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="gradeName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.gradeName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="班级:" prop="className" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.className" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学生:" prop="studentName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.studentName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="教师:" prop="teacherName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.teacherName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
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
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
            <!--<el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel"-->
                       <!--:disabled="!multipleSelection.length > 0">-->
              <!--<i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除-->
            <!--</el-button>-->
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="familyVisitTitle" align="center" label="家访标题" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.familyVisitTitle" class="one-line">{{scope.row.familyVisitTitle}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="visitPurposeCode" label="家访目的" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.visitPurposeCodeStr.split(';')[1]}"
                                  v-if="scope.row.visitPurposeCodeStr">{{scope.row.visitPurposeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="userPreviewVO" align="center" label="学生"  width="160">
              <template slot-scope="scope">
                <div v-if="scope.row.studentUserPreviewVO" class="flex row center">
                  <div class="pr-10">
                    <img :src="scope.row.studentUserPreviewVO.headPicture" alt="" v-preview height="64" width="64">
                  </div>
                  <div class="flex space-between" style="height: 50px">
                    <span>{{scope.row.studentUserPreviewVO.firstName}}</span>
                    <span v-if="scope.row.userPreviewVO.gender==='M' ">男</span>
                    <span v-else>女</span>
                  </div>
                </div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="teacherName" align="center" label="教师" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.teacherName" class="one-line">{{scope.row.teacherName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="createdDt" label="发起时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="visitedBeginDt" label="执行时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="visitedEndDt" label="结束时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="familyVisitModeCode" label="线上线下" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.familyVisitModeCodeStr.split(';')[1]}"
                                  v-if="scope.row.familyVisitModeCodeStr">{{scope.row.familyVisitModeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="familyVisitStatusCode" label="家访状态" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.familyVisitStatusCodeStr.split(';')[1]}"
                                  v-if="scope.row.familyVisitStatusCodeStr">{{scope.row.familyVisitStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="refusedReason" align="center" label="拒绝原因" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.refusedReason" class="one-line">{{scope.row.refusedReason}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="visitedImNum" align="center" label="线上群id" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.visitedImNum" class="one-line">{{scope.row.visitedImNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="className" align="center" label="班级" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.className" class="one-line">{{scope.row.className}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <div class="flex  row">

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.familyVisitId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.familyVisitId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">-->
                  <!--<span slot="reference"-->
                        <!--@click.stop="rowDel(scope.row.familyVisitId)"><i-->
                    <!--class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>-->
                  <!--</el-popover>-->

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="学生家访记录" trigger="hover">
                      <span slot="reference"
                            @click.stop="toAnother(scope.row.familyVisitId ,`listStudentFamilyVisitResult`)"><i
                        class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>
                  </el-popover>
                </div>
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
  import api from "./studentfamilyvisitUrl";
  import commonApi from "@/api/common/common";

  export default {
    data() {
      return {
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        dialogVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        paramsId: '',
        textMap: {
          update: '编辑',
          detail: '详情',
          create: '创建'
        },
        visitPurposeCodeOptions: [{"label": "全部", "name": ""}],
        visitPurposeCodeValue: null,
        familyVisitModeCodeOptions: [{"label": "全部", "name": ""}],
        familyVisitModeCodeValue: null,
        familyVisitStatusCodeOptions: [{"label": "全部", "name": ""}],
        familyVisitStatusCodeValue: null,
        form: {
          familyVisitId: null,
          familyVisitTitle: null,
          visitedBeginDt: null,
          familyVisitModeCodeValue: null,
          familyVisitStatusCodeValue: null,
          gradeName: null,
          className: null,
          studentName: null,
          teacherName: null,
        },
        searchForm: {
          familyVisitId: null,
          familyVisitTitle: null,
          visitedBeginDt: null,
          familyVisitModeCode: null,
          familyVisitStatusCode: null,
          gradeName: null,
          className: null,
          studentName: null,
          teacherName: null,
        },
        data: "",
        multipleSelection: [],
        params: {
           page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          familyVisitId: null,
          familyVisitTitle: null,
          visitedBeginDt: null,
          familyVisitModeCode: null,
          familyVisitStatusCode: null,
          gradeName: null,
          className: null,
          studentName: null,
          teacherName: null,
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      //let schoolId = this.$route.query.schoolOrgId;
      //this.params.schoolId = schoolId;
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      // console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("visitPurpose").then(res => {
        let viewList = res.data.data || [];
        for (let visitPurposeItem of viewList) {
          this.visitPurposeCodeOptions.push({
            "label": visitPurposeItem.codeDesc,
            "name": visitPurposeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("familyVisitMode").then(res => {
        let viewList = res.data.data || [];
        for (let familyVisitModeItem of viewList) {
          this.familyVisitModeCodeOptions.push({
            "label": familyVisitModeItem.codeDesc,
            "name": familyVisitModeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("familyVisitStatus").then(res => {
        let viewList = res.data.data || [];
        for (let familyVisitStatusItem of viewList) {
          this.familyVisitStatusCodeOptions.push({
            "label": familyVisitStatusItem.codeDesc,
            "name": familyVisitStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.familyVisitId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
        this.setCurrentPage(this.$route.fullPath, this.params)
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
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        api.fetchList(this.params).then(res => {

          this.data = res.data.data;
          this.isLoaded = false;
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
        let opath = '/homeSchLink/detailStudentFamilyVisit/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/homeSchLink/StudentFamilyVisitTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/homeSchLink/detailStudentFamilyVisit/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/homeSchLink/detailStudentFamilyVisit/detail/' + id;
        this.$router.push({path: opath})
      },
      toAnother(id, path) {
        let opath = '/homeSchLink/' + path + '?familyVisitId=' + id;
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
