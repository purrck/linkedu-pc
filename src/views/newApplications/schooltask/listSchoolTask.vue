
<template>
  <div class="SchoolTask">
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

          <el-form-item label="任务:" prop="taskTitle" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.taskTitle" maxlength="30"></el-input>
          </el-form-item>

          <el-form-item label="任务类型:" prop="groupTypeCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.taskTypeCode" placeholder="请您选择">
              <el-option
                v-for="taskTypeCodeItem in taskTypeCodeOptions"
                :key="taskTypeCodeItem.name"
                :label="taskTypeCodeItem.label"
                :value="taskTypeCodeItem.name"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务状态:" prop="schoolTaskStatusCode" class="w140">
            <el-select
              class="select-v2-rao"
              v-model="searchForm.schoolTaskStatusCode"
              placeholder="请您选择"
            >
              <el-option
                v-for="schoolTaskStatusCodeItem in schoolTaskStatusCodeOptions"
                :key="schoolTaskStatusCodeItem.name"
                :label="schoolTaskStatusCodeItem.label"
                :value="schoolTaskStatusCodeItem.name"
              ></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="开始时间:" prop="effectiveDt" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.effectiveDt" type="date"
                            value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>
          </el-form-item>


          <!-- 开始时间 colName:Effective_Dt sqlType:TIMESTAMP notnull:false -->

            <el-form-item label="结束时间 :" prop="expiryDt" class="w140">
              <el-date-picker class="date-v2-rao" v-model="searchForm.expiryDt" type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </el-form-item>


          <!-- 结束时间 colName:Expiry_Dt sqlType:TIMESTAMP notnull:false -->
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
            <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
            <el-button
              type="primary"
              size="small"
              class="button-v2-rao bFA6557"
              @click="toDel"
              :disabled="!multipleSelection.length > 0"
            >
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
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

            <el-table-column prop="taskTitle" align="center" label="任务" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.taskTitle" class="one-line">{{scope.row.taskTitle}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 任务 colName:task_title sqlType:VARCHAR notnull:false -->
            <el-table-column prop="taskTypeCode" label="任务类型" align="center" sortable="custom">
              <template slot-scope="scope">
                <span
                  :style="{color:scope.row.taskTypeCodeStr.split(';')[1]}"
                  v-if="scope.row.taskTypeCodeStr"
                >{{scope.row.taskTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <!-- 任务类型 colName:task_type_code sqlType:VARCHAR notnull:false -->
            <el-table-column prop="taskContent" align="center" label="任务内容" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.taskContent" class="one-line">{{scope.row.taskContent}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 任务内容 colName:task_content sqlType:VARCHAR notnull:false -->
            <el-table-column prop="isNeedFile" label="需要上传文件" align="center" sortable="custom">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isNeedFile == 'Y'" disabled></el-switch>
              </template>
            </el-table-column>
            <!-- 需要上传文件 colName:is_need_file sqlType:VARCHAR notnull:false -->
            <el-table-column prop="effectiveDt" label="开始时间" align="center" sortable="custom"></el-table-column>
            <!-- 开始时间 colName:Effective_Dt sqlType:TIMESTAMP notnull:false -->
            <el-table-column
              prop="schoolTaskStatusCode"
              label="任务状态"
              align="center"
              sortable="custom"
            >
              <template slot-scope="scope">
                <span
                  :style="{color:scope.row.schoolTaskStatusCodeStr.split(';')[1]}"
                  v-if="scope.row.schoolTaskStatusCodeStr"
                >{{scope.row.schoolTaskStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <!-- 任务状态 colName:school_task_status_code sqlType:VARCHAR notnull:false -->
            <el-table-column prop="toUserNum" align="center" label="任务人数" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.toUserNum" class="one-line">{{scope.row.toUserNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 任务人数 colName:to_user_num sqlType:INTEGER notnull:false -->
            <el-table-column prop="doneUserNum" align="center" label="完成任务人数" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.doneUserNum" class="one-line">{{scope.row.doneUserNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 完成任务人数 colName:done_user_num sqlType:INTEGER notnull:false -->
            <el-table-column prop="expiryDt" label="任务结束时间" align="center" sortable="custom"></el-table-column>
            <!-- 任务结束时间 colName:xpiry_dt sqlType:TIMESTAMP notnull:false -->
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  popper-class="popover-v2-rao"
                  title="查看"
                  trigger="hover"
                >
                  <span slot="reference" @click.stop="toDetail(scope.row.taskId)">
                    <i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i>
                  </span>
                </el-popover>
                <el-popover v-if="scope.row.schoolTaskStatusCode == 'editing'"
                  placement="top-start"
                  popper-class="popover-v2-rao"
                  title="删除"
                  trigger="hover"
                >
                  <span slot="reference" @click.stop="rowDel(scope.row.taskId)">
                    <i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i>
                  </span>
                </el-popover>

                <el-popover
                  placement="top-start"
                  popper-class="popover-v2-rao"
                  title="校内任务学生"
                  trigger="hover"
                >
                  <span
                    slot="reference"
                    @click.stop="toAnother(scope.row.taskId ,`listSchoolTaskUserHis`)"
                  >
                    <i class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i>
                  </span>
                </el-popover>
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
import api from "./schooltaskUrl";
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
      taskTypeCodeOptions: [{ label: "", name: "" }],
      taskFileTypeCodeOptions: [{ label: "", name: "" }],
      ynOptions: [{ label: "", name: "" }],
      taskFrequencyCodeOptions: [{ label: "", name: "" }],
      schoolTaskStatusCodeOptions: [{ label: "", name: "" }],
      form: {
        taskId: null,
        taskTitle: null,
        ynValue: null,
        schoolTaskStatusCodeValue: null
      },
      searchForm: {
        taskId: null,
        taskTitle: null,
        isNeedFile: null,
          taskTypeCode: null,
        schoolTaskStatusCode: null,
          effectiveDt: null,
          expiryDt: null,

      },
      data: "",
      onSwitchStatus: true,
      offSwitchStatus: false,
      multipleSelection: [],
      params: {
        page: 1,
        limit: 10,
        taskId: null,
        taskTitle: null,
        isNeedFile: null,
        schoolTaskStatusCode: null
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

    commonApi.getCodeIntType("taskType").then(
      res => {
        let viewList = res.data.data || [];
        for (let taskTypeItem of viewList) {
          this.taskTypeCodeOptions.push({
            label: taskTypeItem.codeDesc,
            name: taskTypeItem.codeId
          });
        }
      },
      res => {
        this.$message.error(res.data.message);
      }
    );
    commonApi.getCodeIntType("taskFileType").then(
      res => {
        let viewList = res.data.data || [];
        for (let taskFileTypeItem of viewList) {
          this.taskFileTypeCodeOptions.push({
            label: taskFileTypeItem.codeDesc,
            name: taskFileTypeItem.codeId
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
    commonApi.getCodeIntType("taskFrequency").then(
      res => {
        let viewList = res.data.data || [];
        for (let taskFrequencyItem of viewList) {
          this.taskFrequencyCodeOptions.push({
            label: taskFrequencyItem.codeDesc,
            name: taskFrequencyItem.codeId
          });
        }
      },
      res => {
        this.$message.error(res.data.message);
      }
    );
    commonApi.getCodeIntType("schoolTaskStatus").then(
      res => {
        let viewList = res.data.data || [];
        for (let schoolTaskStatusItem of viewList) {
          this.schoolTaskStatusCodeOptions.push({
            label: schoolTaskStatusItem.codeDesc,
            name: schoolTaskStatusItem.codeId
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
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return item.taskId;
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
    toDel() {
      if (this.$refs.schooltable.selection.length == 0) {
        this.msgShow = true;
        setTimeout(() => {
          this.msgShow = false;
        }, 800);
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
      });
      this.isDel = false;
    },
    dialogDeleteCancelHandler() {
      this.dialogDelete = false;
    },
    toAdd() {
      //safety safetyEdu basedata
      let opath = "/newApplications/detailSchoolTask/add/" + 0;
      this.$router.push({ path: opath });
    },
    toTotal() {
      let opath = "/newApplications/SchoolTaskTotal";
      this.$router.push({ path: opath });
    },
    toDetail(id) {
      let opath = "/newApplications/detailSchoolTask/detail/" + id;
      this.$router.push({ path: opath });
    },
    toAnother(id, path) {
      let opath = "/newApplications/" + path + "?taskId=" + id;
      this.$router.push({ path: opath });
    }
  }
};
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
  background: #f0f0f0;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;

  img {
    vertical-align: -4px;
  }
}
</style>
