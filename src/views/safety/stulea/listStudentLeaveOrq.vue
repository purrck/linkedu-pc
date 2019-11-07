<template>
  <div class="StudentLeave">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="请假类型:" class="w140" prop="studentLeaveTypeCode">
            <el-select class="select-v2-rao" v-model="searchForm.studentLeaveTypeCode " placeholder="请您选择">
              <el-option v-for="studentLeaveTypeCodeItem in studentLeaveTypeCodeOptions"
                         :key="studentLeaveTypeCodeItem.name"
                         :label="studentLeaveTypeCodeItem.label" :value="studentLeaveTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请假状态:" class="w140" prop="studentLeaveStatusCode">
            <el-select class="select-v2-rao" v-model="searchForm.studentLeaveStatusCode" placeholder="请您选择">
              <el-option v-for="studentLeaveStatusCodeItem in studentLeaveStatusCodeOptions"
                         :key="studentLeaveStatusCodeItem.name"
                         :label="studentLeaveStatusCodeItem.label"
                         :value="studentLeaveStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请假人:" class="w140" prop="userName">
            <el-input class="input-v2-rao" v-model="searchForm.userName" maxlength="30"></el-input>
          </el-form-item>

          <el-form-item label="学生请假:" class="w140" prop="studentName">
            <el-input class="input-v2-rao" v-model="searchForm.studentName" maxlength="30"></el-input>

          </el-form-item>

          <el-form-item label="请假开始时间:" prop="effectiveDtStart" class="w140">
            <el-date-picker class="date-v2-rao " v-model="searchForm.effectiveDtStart" type="date"
                            :picker-options="pickTime2" value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="至:" prop="effectiveDtEnd" class="w140">
            <el-date-picker class="date-v2-rao w140" v-model="searchForm.effectiveDtEnd" type="date"
                            :picker-options="pickTime" value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao  b93BF88" @click="search">查询</el-button>
            <!--<el-button type="primary" @click="resetForm('searchForm')" class="button-v2-rao b93BF88">重置-->
<!--            </el-button>-->
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
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"
                   @click="$router.push('/safety/studentLeaveTotal')"></i>
              </div>
            </div>
            <!--<el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">-->
            <!--<i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增-->
            <!--</el-button>-->
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557"
                       :disabled="multipleSelection.length===0" @click="toDel">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>

          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao"
                    :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65"
                             align="center"></el-table-column>
            <el-table-column label="类别" align="center">
              <template slot-scope="scope">
                                <span :style="{color:scope.row.studentLeaveTypeCodeStr.split(';')[1]}"
                                      v-if="scope.row.studentLeaveTypeCodeStr">{{scope.row.studentLeaveTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="studentName" label="学生" sortable="custom" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.studentName" class="one-line">{{scope.row.studentName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="className" label="班级" sortable="custom" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.className" class="one-line">{{scope.row.className}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="effectiveDt" label="开始时间" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="expiryDt" label="结束时间" sortable="custom" align="center"></el-table-column>

            <el-table-column prop="realEffectiveDt" label="实际开始时间"  sortable="custom"
                             align="center"></el-table-column>
            <el-table-column prop="realExpiryDt" label="实际结束时间"  sortable="custom"
                             align="center"></el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                                <span :style="{color:scope.row.studentLeaveStatusCodeStr.split(';')[1]}"
                                      v-if="scope.row.studentLeaveStatusCodeStr">{{scope.row.studentLeaveStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="60">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看"
                            trigger="hover">
                                    <span slot="reference" @click.stop="toDetail(scope.row.leaveId)"><i
                                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size"
                       :total="data.total"
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
          <el-button type="primary" class="border-color-cccccc c000000 bfff"
                     @click="dialogDeleteComfireHandler" :loading="isDel">是
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
  import api from "./studentleaveUrl";
  import commonApi from "@/api/common/common";
  import {str2Time} from "@/util/util"

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
        studentLeaveStatusCodeOptions: [{"label": "全部", "name": ""}],
        studentLeaveStatusCodeValue: null,
        studentLeaveTypeCodeOptions: [{"label": "全部", "name": ""}],
        studentLeaveTypeCodeValue: null,
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        form: {
          studentName: null,
          effectiveDt: null,
          expiryDt: null,
          studentLeaveStatusCodeValue: null,
          studentLeaveTypeCodeValue: null,
        },
        searchForm: {
          studentName: null,
          effectiveDtStart: '',
          effectiveDtEnd: '',
          effectiveDt: null,
          expiryDt: null,
          studentLeaveTypeCode :null,  //请假类型
      //Api/sm/attendance/studentLeaveAd/page?page=1&limit=10&studentLeaveTypeCode=2&pageType=1&effectiveDtStart=&effectiveDtEnd=
          studentLeaveStatusCodeValue: null,
          studentLeaveTypeCodeValue: null,

        },
        data: "",
        pickTime: {},
        pickTime2: {},
        onSwitchStatus: true,
        offSwitchStatus: false,
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          studentName: null,
          effectiveDt: null,
          expiryDt: null,
          studentLeaveStatusCode: null,   //請假類型
          studentLeaveTypeCode: null,

        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      },
    },
    watch: {},
    created() {
      let that = this;
      that.pickTime = {
        disabledDate(time) {
          let start = that.searchForm.effectiveDtStart;
          return time.getTime() < str2Time(start);
        }
      };
      that.pickTime2 = {
        disabledDate(time) {
          let start = that.searchForm.effectiveDtEnd;
          return time.getTime() > str2Time(start);
        }
      }
      // // console.log(Date.now())

    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("studentLeaveStatus").then(res => {
        let viewList = res.data.data || [];
        for (let studentLeaveStatusItem of viewList) {
          // // console.log(studentLeaveStatusItem);
          //此处产品说去掉编辑中状态筛选
          if (studentLeaveStatusItem.codeDesc !== "编辑中") {
            this.studentLeaveStatusCodeOptions.push({
              "label": studentLeaveStatusItem.codeDesc,
              "name": studentLeaveStatusItem.codeId
            });
          }
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("studentLeaveType").then(res => {
        let viewList = res.data.data || [];
        for (let studentLeaveTypeItem of viewList) {
          this.studentLeaveTypeCodeOptions.push({
            "label": studentLeaveTypeItem.codeDesc,
            "name": studentLeaveTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
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
    methods: {

      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.leaveId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.isLoaded = true;
        this.getList();
      },

      handleCurrentChange(currentPage) {
        this.setCurrentPage(this.$route.path, currentPage)
        this.params.page = currentPage;
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending" ? true : false;
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        this.params.pageType = 2;
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
        // console.log(this.searchForm.studentLeaveTypeCode+'++++++++++++++++++++++++++++++')
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
        }, res => {
          this.isDel = false;
          //this.$message.error(res.data.message);
        });
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/safety/detailStudentLeave/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/safety/detailStudentLeave/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailStudentLeave/detail/' + id;
        this.$router.push({path: opath})
      }
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
