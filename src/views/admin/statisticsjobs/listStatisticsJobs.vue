<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="统计分析:">
            <el-input v-model="searchForm.jobKey" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="sql:">
            <el-input v-model="searchForm.jobSql" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="统计图形式:">
            <el-select v-model="searchForm.charTypeCode" placeholder="请您选择">
              <el-option v-for="charTypeCodeItem in charTypeCodeOptions"
                         :key="charTypeCodeItem.name"
                         :label="charTypeCodeItem.label" :value="charTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计规则名称:">
            <el-input v-model="searchForm.jobName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询
            </el-button>
          </el-form-item>
        </el-form>

      </el-header>
      <el-main class="pt-15">
        <el-row class="select-all">
          <el-col :span="24" class="text-right mb-10">
            <el-button type="info" class="btn-rao" plain @click="toAdd"><img
              src="~@/assets/img/icon-add@2x.png" width="20" plain/> 添加
            </el-button>
            <el-button type="info" class="btn-rao" plain @click="del"><img
              src="~@/assets/img/icon_del@2x.png" width="20" plain/> 删除
            </el-button>

          </el-col>
        </el-row>

        <div class="selected-box mb-15">
          <el-row>
            <el-col :span="12">
              <img src="~@/assets/img/icon-selected.png" width="20"/> 已选择 <span class="myColor bold">{{multipleSelection.length}}</span>
              项目
            </el-col>
            <el-col :span="12">
              <div class="result text-right" @click="$router.push('/safety/statisticsjobsTotal')">
                共搜索到 <span class="myColor bold">{{data.total}}</span> 条数据 <img
                src="~@/assets/img/icon-user-total.png" style="vertical-align: -1px;"/>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-rao checkbox-rao" ref="schooltable" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="jobKey" label="统计分析" sortable="custom" width="200"></el-table-column>
            <el-table-column label="执行频率">
              <template slot-scope="scope" v-if="scope.row.frequencyCodeStr">
                <span :style="{color:scope.row.frequencyCodeStr.split(';')[1]}">{{scope.row.frequencyCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="performedDt" label="执行时间" sortable="custom"
                             width="200"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope" v-if="scope.row.statisticsJobStatusCodeStr">
                <span :style="{color:scope.row.statisticsJobStatusCodeStr.split(';')[1]}">{{scope.row.statisticsJobStatusCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column label="表现形式">-->
            <!--<template slot-scope="scope" v-if="scope.row.charTypeCodeStr">-->
            <!--<span :style="{color:scope.row.charTypeCodeStr.split(';')[1]}">{{scope.row.charTypeCodeStr.split(';')[0]}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="jobName" label="统计规则名称" sortable="custom" width="200"></el-table-column>
            <el-table-column label="操作" width="280" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="primary"
                           class="tableEditButton el-button--small-icon"
                           @click.stop="toEdit(scope.row.jobKey)">
                  编辑
                </el-button>
                <el-button size="small" type="primary"
                           class="el-button--small-icon"
                           @click="toDetail(scope.row.jobKey)">
                  详情
                </el-button>
                <el-button size="small" type="danger" class="el-button--small-icon"
                           @click="rowDel(scope.row.jobKey)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination background :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                       :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="dialogDelete" center width="22%">
        <div class="text-center">
          <img src="~@/assets/img/dialog-delete.png"/>
          <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteComfireHandler" :loading="isDel">是</el-button>
          <el-button type="primary" @click="dialogDeleteCancelHandler">否</el-button>
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
  import api from "./statisticsjobsUrl";
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
        frequencyCodeOptions: [{"label": "全部", "name": ""}],
        frequencyCodeValue: null,
        statisticsJobStatusCodeOptions: [{"label": "全部", "name": ""}],
        statisticsJobStatusCodeValue: null,
        charTypeCodeOptions: [{"label": "全部", "name": ""}],
        charTypeCodeValue: null,
        form: {

          jobKey:
            null,
          jobSql:
            null,
          charTypeCodeValue: null,
          jobName:
            null,

        },
        searchForm: {

          jobKey:
            null,
          jobSql:
            null,
          charTypeCodeValue: null,
          jobName:
            null,

        }
        ,
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          jobKey:
            null,
          jobSql:
            null,
          charTypeCode:
            null,
          jobName:
            null,

        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {

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

      commonApi.getCodeIntType("frequency").then(res => {
        let viewList = res.data.data || [] || [];
        for (let frequencyItem of viewList) {
          this.frequencyCodeOptions.push({
            "label": frequencyItem.codeDesc,
            "name": frequencyItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("statisticsJobStatus").then(res => {
        let viewList = res.data.data || [] || [];
        for (let statisticsJobStatusItem of viewList) {
          this.statisticsJobStatusCodeOptions.push({
            "label": statisticsJobStatusItem.codeDesc,
            "name": statisticsJobStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("charType").then(res => {
        let viewList = res.data.data || [] || [];
        for (let charTypeItem of viewList) {
          this.charTypeCodeOptions.push({
            "label": charTypeItem.codeDesc,
            "name": charTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.jobKey
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage
        this.setCurrentPage(this.$route.fullPath, this.params);
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
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        api.fetchList(this.params).then(res => {
          //for (let i of res.data.records) {
          //i.isAudio = false;
          //}
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

      closeBox() {
        this.dialogFormVisible = false
        // this.getList()
      },
      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true;
        this.multipleSelection = [id];
      },
      //删除
      del() {
        if (this.multipleSelection.length == 0) {
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
      toDel() {
        if (this.multipleSelection.length == 0) {
          this.$message.error("请您选择要删除的数据");
        } else {
          this.$confirm("该操作将会删除x，是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            this.isLoaded = true;
            api.batchDelObj(this.multipleSelection).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message.success("删除成功");
                this.getList();
              }
            }, res => {
              this.$message.error(res.data.message);
            });
          });
        }
      },
      toAdd() {
        let opath = '/admin/detailStatisticsJobs/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/admin/detailStatisticsJobs/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/admin/detailStatisticsJobs/detail/' + id;
        this.$router.push({path: opath})
      },
      getfrequencyCodeStr(row) {
        return row.frequencyCodeStr;
      },
      getperformedDtStr(row) {
        return row.performedDtStr;
      },
      getstatisticsJobStatusCodeStr(row) {
        return row.statisticsJobStatusCodeStr;
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
    margin: 0px 0 5px;
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
