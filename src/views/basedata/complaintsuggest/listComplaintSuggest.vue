<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="投诉记录id:">
            <el-input v-model="searchForm.complaintId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="投诉客户名称:">
            <el-input v-model="searchForm.complaintUserName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="投诉客户联系方式:">
            <el-input v-model="searchForm.complaintUserContact" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="投诉对象类型:">
            <el-input v-model="searchForm.entityType" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="投诉原因:">
            <el-select v-model="searchForm.complaintCasueCodeValue" placeholder="请您选择">
              <el-option v-for="complaintCasueCodeItem in complaintCasueCodeOptions"
                         :key="complaintCasueCodeItem.name"
                         :label="complaintCasueCodeItem.label" :value="complaintCasueCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投诉状态:">
            <el-select v-model="searchForm.complaintStatusCodeValue" placeholder="请您选择">
              <el-option v-for="complaintStatusCodeItem in complaintStatusCodeOptions"
                         :key="complaintStatusCodeItem.name"
                         :label="complaintStatusCodeItem.label" :value="complaintStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已处理回复:">
            <el-select v-model="searchForm.ynValue" placeholder="请您选择">
              <el-option v-for="isRepliedItem in ynOptions"
                         :key="isRepliedItem.name"
                         :label="isRepliedItem.label" :value="isRepliedItem.name">
              </el-option>
            </el-select>
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
              <div class="result text-right">
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
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="complaintNums" label="投诉编号" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.complaintNums">{{scope.row.complaintNums}}</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="complaintUserName" label="投诉客户名称" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="complaintUserContact" label="投诉客户联系方式" sortable="custom"
                             width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.complaintUserContact">{{scope.row.complaintUserContact}}</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="complaintClientMac" label="投诉客户端编码" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.complaintClientMac">{{scope.row.complaintClientMac}}</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="complaintDt" label="投诉日期" sortable="custom"
                             width="200"></el-table-column>
            <el-table-column prop="entityName" label="投诉对象" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.entityName">{{scope.row.entityName}}</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="entityType" label="投诉对象类型" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.entityType">{{scope.row.entityType}}</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column label="投诉原因">
              <!--<template slot-scope="scope">-->
             <!---->
                <!--&lt;!&ndash;<span :class="scope.row.complaintCasueCode"&ndash;&gt;-->
                      <!--&lt;!&ndash;:style="{color:sscope.row.complaintCasueCodeStr.split(';')[1]}">{{scope.row.complaintCasueCode.split(';')[0]}}</span>&ndash;&gt;-->
              <!--</template>-->
              <template slot-scope="scope">
                <span v-if="scope.row.complaintCasueCode">{{scope.row.complaintCasueCode}}</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column label="投诉状态">
              <!--<template slot-scope="scope">-->
                <!--&lt;!&ndash;<span :class="scope.row.complaintStatusCode"&ndash;&gt;-->
                      <!--&lt;!&ndash;:style="{color:sscope.row.complaintStatusCodeStr.split(';')[1]}">{{scope.row.complaintStatusCode.split(';')[0]}}</span>&ndash;&gt;-->
              <!--</template>-->
              <template slot-scope="scope">
                <span v-if="scope.row.complaintStatusCode">{{scope.row.complaintStatusCode}}</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="isReplied" label="已处理回复" sortable="custom">
              <template slot-scope="scope">
                <div >
                  <el-switch v-model="scope.row.isReplied == 'Y'" disabled></el-switch>
                </div>

              </template>
            </el-table-column>
            <el-table-column label="操作"width="280"  fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="primary"
                           @click="toDetail(scope.row.complaintId)">
                  详情
                </el-button>
                <el-button size="small" type="danger"
                           @click="rowDel(scope.row.complaintId)">删除
                </el-button>
                <el-button size="small" type="primary"  @click="toOther(scope.row.complaintId)">
                  投诉回执
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
  import api from "./complaintsuggestUrl";
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
        complaintCasueCodeOptions: [{"label": "全部", "name": ""}],
        complaintCasueCodeValue: null,
        complaintStatusCodeOptions: [{"label": "全部", "name": ""}],
        complaintStatusCodeValue: null,
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        complaintUserTypeCodeOptions: [{"label": "全部", "name": ""}],
        complaintUserTypeCodeValue: null,
        appTypeCodeOptions: [{"label": "全部", "name": ""}],
        appTypeCodeValue: null,
        form: {
          complaintId:
            null,
          complaintUserName:
            null,
          complaintUserContact:
            null,
          entityType:
            null,
          complaintCasueCodeValue: null,
          complaintStatusCodeValue: null,
          ynValue: null,
        },
        searchForm: {
          complaintId:
            null,
          complaintUserName:
            null,
          complaintUserContact:
            null,
          entityType:
            null,
          complaintCasueCodeValue: null,
          complaintStatusCodeValue: null,
          ynValue:
            null,
        }
        ,
        data: "",
        onSwitchStatus: true,
        offSwitchStatus: false,
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          complaintId:
            null,
          complaintUserName:
            null,
          complaintUserContact:
            null,
          entityType:
            null,
          complaintCasueCode:
            null,
          complaintStatusCode:
            null,
          isReplied:
            null,
        }
      }
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
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("complaintCasue").then(res => {
        let viewList = res.data.data || [];
        for (let complaintCasueItem of viewList) {
          this.complaintCasueCodeOptions.push({
            "label": complaintCasueItem.codeDesc,
            "name": complaintCasueItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("complaintStatus").then(res => {
        let viewList = res.data.data || [];
        for (let complaintStatusItem of viewList) {
          this.complaintStatusCodeOptions.push({
            "label": complaintStatusItem.codeDesc,
            "name": complaintStatusItem.codeId
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
      commonApi.getCodeIntType("complaintUserType").then(res => {
        let viewList = res.data.data || [];
        for (let complaintUserTypeItem of viewList) {
          this.complaintUserTypeCodeOptions.push({
            "label": complaintUserTypeItem.codeDesc,
            "name": complaintUserTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("appType").then(res => {
        let viewList = res.data.data || [];
        for (let appTypeItem of viewList) {
          this.appTypeCodeOptions.push({
            "label": appTypeItem.codeDesc,
            "name": appTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.complaintId
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
        let opath = '/basedata/detailComplaintSuggest/add/' + 0;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailComplaintSuggest/detail/' + id;
        this.$router.push({path: opath})
      },
      toOther(id) {
        let opath = '/basedata/listComplaintReply?complaintId=' + id;
        this.$router.push({path: opath})
      },
      getcomplaintDtStr(row) {
        return row.complaintDtStr;
      },
      getcomplaintCasueCodeStr(row) {
        return row.complaintCasueCodeStr;
      },
      getcomplaintStatusCodeStr(row) {
        return row.complaintStatusCodeStr;
      },
      getisRepliedStr(row) {
        return row.isRepliedStr;
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
