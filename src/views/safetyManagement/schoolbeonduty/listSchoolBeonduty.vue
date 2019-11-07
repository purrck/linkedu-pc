


<template>
  <div class="SchoolBeonduty">
    <el-container
      v-loading="isLoaded"
      element-loading-custom-class="home-loading"
      style="min-height: 600px"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
      <el-header style="height: auto">
        <el-form
          ref="searchForm"
          :model="searchForm"
          :inline="true"
          size="small"
          class="select-form"
        >
          <el-form-item label="值周值日:" prop="beondutyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.beondutyId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学年周次:" prop="weekSchoolYear" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.weekSchoolYear" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学期周次:" prop="weekSchoolTerm" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.weekSchoolTerm" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="开始日期:" prop="calendarBeginDt" class="w140">
            <el-date-picker
              class="date-v2-rao"
              v-model="searchForm.calendarBeginDt"
              type="date"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="学年:" prop="schoolYear" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.schoolYear" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学期:" prop="schoolTerm" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.schoolTerm" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="假期期间:" prop="isHoliday" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.isHoliday" placeholder="请您选择">
              <el-option
                v-for="isHolidayItem in ynOptions"
                :key="isHolidayItem.name"
                :label="isHolidayItem.label"
                :value="isHolidayItem.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值班评分:" prop="markScore" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.markScore" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="取消:" prop="isCancel" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.isCancel" placeholder="请您选择">
              <el-option
                v-for="isCancelItem in ynOptions"
                :key="isCancelItem.name"
                :label="isCancelItem.label"
                :value="isCancelItem.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <el-button
              type="primary"
              @click="resetForm('searchForm')"
              class="button-v2-rao b93BF88"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>

      <el-main class="pt-15">
        <el-row class="mb10">
          <el-col :span="14" class="text-left mb-10 flex row x-center space-between">
            <div>
              <el-header style="display:flex;justify-content:space-around;">
                <div style="background:#F56C6C;" class="circle">
                  <span class="white">1</span>
                </div>
              </el-header>
              <!-- <el-footer></el-footer> -->
              <span>实物总数</span>
            </div>
            <div>
              <el-header style="display:flex;justify-content:space-around;">
                <div style="background:#409EFF;" class="circle">
                  <span class="white">2</span>
                </div>
              </el-header>
              <span>已领失物</span>
            </div>
            <div>
              <el-header style="display:flex;justify-content:space-around;">
                <div style="background:#E6A23C;" class="circle">
                  <span class="white">3</span>
                </div>
              </el-header>
              <span>未领失物</span>
            </div>
            <div>
              <el-header style="display:flex;justify-content:space-around;">
                <div style="background:#67C23A;" class="circle">
                  <span class="white">4</span>
                </div>
              </el-header>
              <span>近一周新增</span>
            </div>
          </el-col>
          <el-col :span="24" class="text-left mb-10 flex row btns x-center space-between">
            <div class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">
                  已选择
                  <span class="bold c93BF88">{{multipleSelection.length}}</span>项
                </span>
              </div>
              <div>
                <span class="c707070">
                  共搜索到
                  <span class="bold c93BF88">{{data.total}}</span>条数据
                </span>
                <i class="iconfont icon-icon_shuju" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="table">
          <el-table
            :data="data.records"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            class="table-v2-rao"
            ref="schooltable"
            header-row-class-name="table-header-v2-rao"
            :stripe="true"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="weekSchoolYear" align="center" label="学年周次" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.weekSchoolYear" class="one-line">{{scope.row.weekSchoolYear}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 学年周次 colName:Week_SCHOOL_YEAR sqlType:VARCHAR notnull:false -->
            <el-table-column prop="weekSchoolTerm" align="center" label="学期周次" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.weekSchoolTerm" class="one-line">{{scope.row.weekSchoolTerm}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 学期周次 colName:Week_SCHOOL_Term sqlType:VARCHAR notnull:false -->
            <el-table-column prop="calendarBeginDt" label="开始日期" align="center" sortable="custom"></el-table-column>
            <!-- 开始日期 colName:Calendar_Begin_DT sqlType:TIMESTAMP notnull:false -->
            <el-table-column prop="calendarEndDt" label="截止日期" align="center" sortable="custom"></el-table-column>
            <!-- 截止日期 colName:Calendar_End_DT sqlType:TIMESTAMP notnull:false -->
            <el-table-column prop="schoolYear" align="center" label="学年" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.schoolYear" class="one-line">{{scope.row.schoolYear}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 学年 colName:SCHOOL_YEAR sqlType:VARCHAR notnull:false -->
            <el-table-column prop="schoolTerm" align="center" label="学期" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.schoolTerm" class="one-line">{{scope.row.schoolTerm}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 学期 colName:SCHOOL_Term sqlType:VARCHAR notnull:false -->
            <el-table-column prop="isHoliday" label="假期期间" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.isHoliday == 'Y'" disabled style="color:#F56C6C">否</div>
                <div v-else style="color:#67C23A">是</div>
              </template>
            </el-table-column>
            <!-- 假期期间 colName:is_holiday sqlType:VARCHAR notnull:false -->
            <el-table-column prop="teacherNum" align="center" label="值班教师数量" sortable="custom">
              <template slot-scope="scope">
                <div
                  v-if="scope.row.teacherNum"
                  class="one-line"
                  style="cursor: pointer;color: #409EFF;"
                  @click="toDetail(scope.row.beondutyId)"
                >{{scope.row.teacherNum}}</div>
                <div v-else>无</div>
                <!-- <el-link v-if="scope.row.markScore" type='primary' class="one-line"  @click="toDetail(scope.row.beondutyId)">{{scope.row.teacherNum}}</el-link>
                <div v-else>无</div>-->
              </template>
            </el-table-column>
            <!-- 值班教师数量 colName:teacher_num sqlType:VARCHAR notnull:false -->
            <el-table-column prop="markScore" align="center" label="值班评分" sortable="custom">
              <template slot-scope="scope">
                <div
                  v-if="scope.row.markScore"
                  class="one-line"
                  style="cursor: pointer;color: #409EFF;"
                  @click="toDetail(scope.row.beondutyId)"
                >{{scope.row.markScore}}</div>
                <div v-else>无</div>
                <!-- <el-link v-if="scope.row.markScore" type='primary' class="one-line"  @click="toDetail(scope.row.beondutyId)">{{scope.row.markScore}}</el-link>
                <div v-else>无</div>-->
              </template>
            </el-table-column>
            <!-- 值班评分 colName:mark_score sqlType:FLOAT notnull:false -->
            <el-table-column prop="markContent" align="center" label="值班评价" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.markContent" class="one-line">{{scope.row.markContent}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 值班评价 colName:mark_content sqlType:VARCHAR notnull:false -->
            <el-table-column prop="isCancel" label="取消" align="center" sortable="custom">
              <template slot-scope="scope">
                <!-- <el-switch v-model="scope.row.isCancel == 'Y'" disabled></el-switch> -->
                <div v-if="scope.row.isHoliday == 'Y'" disabled style="color:#F56C6C">否</div>
                <div v-else style="color:#67C23A">是</div>
              </template>
            </el-table-column>
            <!-- 取消 colName:is_cancel sqlType:VARCHAR notnull:false -->
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <div style="display:flex;">
                  <div>
                    <el-popover
                      placement="top-start"
                      popper-class="popover-v2-rao"
                      title="编辑"
                      trigger="hover"
                    >
                      <span slot="reference" @click.stop="toEdit(scope.row.beondutyId)">
                        <i class="iconfont icon-icon_bianji ml5 f20 c999999"></i>
                      </span>
                    </el-popover>

                    <el-popover
                      placement="top-start"
                      popper-class="popover-v2-rao"
                      title="查看"
                      trigger="hover"
                    >
                      <span slot="reference" @click.stop="toDetail(scope.row.beondutyId)">
                        <i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i>
                      </span>
                    </el-popover>
                    <el-popover
                      placement="top-start"
                      popper-class="popover-v2-rao"
                      title="删除"
                      trigger="hover"
                    >
                      <span slot="reference" @click.stop="rowDel(scope.row.beondutyId)">
                        <i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i>
                      </span>
                    </el-popover>
                  </div>
                  <div>
                    <el-popover
                      placement="top-start"
                      popper-class="popover-v2-rao"
                      title="值周值日教师"
                      trigger="hover"
                    >
                      <span
                        slot="reference"
                        @click.stop="toAnother(scope.row.beondutyId ,`listSchoolBeondutyTeacher`)"
                      >
                        <i class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i>
                      </span>
                    </el-popover>

                    <el-popover
                      placement="top-start"
                      popper-class="popover-v2-rao"
                      title="值周值日教师记录"
                      trigger="hover"
                    >
                      <span
                        slot="reference"
                        @click.stop="toAnother(scope.row.beondutyId ,`listSchoolBeondutyCheck`)"
                      >
                        <i class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i>
                      </span>
                    </el-popover>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination
          class="pagination-v2-rao"
          :page-sizes="[10,20,30]"
          :page-size="data.size"
          :total="data.total"
          :current-page="data.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <el-dialog title :visible.sync="dialogDelete" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="border-color-cccccc c000000 bfff"
            @click="dialogDeleteComfireHandler"
            :loading="isDel"
          >是</el-button>
          <el-button type="primary" class="b93BF88" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20" />
        请至少选择一项内容!
      </div>
    </el-container>
  </div>
</template>

<script>
import api from "./schoolbeondutyUrl";
import commonApi from "@/api/common/common";
import preview from "@/util/preview";
export default {
  directives: { preview },
  data() {
    return {
      isLoaded: true,
      dialogDelete: false,
      isDel: false,
      msgShow: false,
      ynOptions: [{ label: "全部", name: "" }],
      ynOptions: [{ label: "全部", name: "" }],
      form: {
        beondutyId: null,
        weekSchoolYear: null,
        weekSchoolTerm: null,
        calendarBeginDt: null,
        schoolYear: null,
        schoolTerm: null,
        ynValue: null,
        markScore: null,
        ynValue: null
      },
      searchForm: {
        beondutyId: null,
        weekSchoolYear: null,
        weekSchoolTerm: null,
        calendarBeginDt: null,
        schoolYear: null,
        schoolTerm: null,
        isHoliday: null,
        markScore: null,
        isCancel: null
      },
      data: "",
      onSwitchStatus: true,
      offSwitchStatus: false,
      multipleSelection: [],
      params: {
        page: 1,
        limit: 10,
        beondutyId: null,
        weekSchoolYear: null,
        weekSchoolTerm: null,
        calendarBeginDt: null,
        schoolYear: null,
        schoolTerm: null,
        isHoliday: null,
        markScore: null,
        isCancel: null
      }
    };
  },
  computed: {
    indexMethod() {
      return this.params.limit * (this.params.page - 1) + 1;
    }
  },
  created() {
    let query = this.$route.query;
    for (let item in query) {
      this.params[item] = query[item];
    }
  },
  mounted() {
    this.getCurrentPage(this.$route.path, this.params);
    this.getList();

    commonApi.getCodeIntType("boolean_yn").then(
      res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            label: ynItem.codeDesc,
            name: ynItem.codeId
          });
        }
      },
      res => {
        this.$message.error(res.data.message);
      }
    );
    commonApi.getCodeIntType("boolean_yn").then(
      res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            label: ynItem.codeDesc,
            name: ynItem.codeId
          });
        }
      },
      res => {
        this.$message.error(res.data.message);
      }
    );
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      });
      this.isDel = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return item.beondutyId;
      });
    },
    handleSizeChange(size) {
      this.params.limit = size;
      this.setCurrentPage(this.$route.path, this.params);
      this.isLoaded = true;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.params.page = currentPage;
      this.setCurrentPage(this.$route.path, this.params);
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
      this.setCurrentPage(this.$route.path, this.params);
      this.isLoaded = true;
      this.getList();
    },
    getList() {
      api.fetchList(this.params).then(
        res => {
          this.data = res.data.data;
          this.isLoaded = false;
        },
        res => {
          this.$message.error(res.message);
        }
      );
    },

    search() {
      this.params.page = 1;
      for (let key in this.searchForm) {
        this.params[key] = this.searchForm[key];
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
    toTotal() {
      let opath = "/safetyManagement/SchoolBeondutyTotal";
      this.$router.push({ path: opath });
    },
    toEdit(id) {
      let opath = "/safetyManagement/detailSchoolBeonduty/edit/" + id;
      this.$router.push({ path: opath });
    },
    toDetail(id) {
      let opath = "/safetyManagement/detailSchoolBeonduty/detail/" + id;
      this.$router.push({ path: opath });
    },
    toAnother(id, path) {
      if (path === "listSchoolBeondutyTeacher") {
        let opath = "/safetyManagement/" + path + "?beondutyId=" + id;
        this.$router.push({ path: opath });
      } else {
        let opath = "/safetyManagement/" + path + "?beondutyId=" + id;
        this.$router.push({ path: opath });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.circle {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .white {
    color: white;
  }
}
.tips-school {
  position: absolute;
  top: 40%;
  left: 47%;
}

.select-all {
  margin: 0 0 5px;
}

.selected-box {
  background: #f0f0f0;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;

  img {
    vertical-align: -4px;
  }
}
</style>
