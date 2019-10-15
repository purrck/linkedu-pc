<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="用户:">
            <el-input v-model="searchForm.userName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="应用:">
            <el-input v-model="searchForm.appId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="终端类型:">
            <el-select v-model="searchForm.appdeviceTypeCode" placeholder="请您选择">
              <el-option v-for="appdeviceTypeCodeItem in appdeviceTypeCodeOptions"
                         :key="appdeviceTypeCodeItem.name"
                         :label="appdeviceTypeCodeItem.label" :value="appdeviceTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下载时间:">
            <el-date-picker v-model="searchForm.downloadDt" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="登录次数:">
            <el-input v-model="searchForm.loginTimes" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="上次应用时间:">
            <el-date-picker v-model="searchForm.lastUsedDt" type="date" placeholder="选择日期"></el-date-picker>
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
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户" sortable="custom" >
              <template slot-scope="scope">
                <div v-if="scope.row.userName">{{scope.row.userName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="appName" label="应用" sortable="custom" >
              <template slot-scope="scope">
                <div v-if="scope.row.appName">{{scope.row.appName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column label="终端类型">
              <template slot-scope="scope">
                <span :style="{color:scope.row.appdeviceTypeCodeStr.split(';')[1]}"
                      v-if="scope.row.appdeviceTypeCodeStr">{{scope.row.appdeviceTypeCodeStr.split(';')[0]}}</span>
                <span  v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="versionInfo" label="版本" sortable="custom" >
              <template slot-scope="scope">
                <div v-if="scope.row.versionInfo">{{scope.row.versionInfo}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="downloadDt" label="下载时间" sortable="custom"
                             ></el-table-column>
            <el-table-column prop="loginTimes" label="登录次数" sortable="custom" >
              <template slot-scope="scope">
                <div v-if="scope.row.loginTimes">{{scope.row.loginTimes}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="lastUsedDt" label="上次应用时间" sortable="custom"
                             ></el-table-column>
            <el-table-column prop="experience" label="体验说明" sortable="custom" >
              <template slot-scope="scope">
                <div v-if="scope.row.experience">{{scope.row.experience}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="token" label="token" sortable="custom" >
              <template slot-scope="scope">
                <div v-if="scope.row.token">{{scope.row.token}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="350" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="primary"
                           class="tableEditButton"
                           @click.stop="toEdit(scope.row.id)">
                  编辑
                </el-button>
                <el-button size="small" type="primary"
                           @click="toDetail(scope.row.id)">
                  详情
                </el-button>
                <el-button size="small" type="danger"
                           @click="rowDel(scope.row.id)">删除
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
  import api from "./appusersUrl";
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
        appdeviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        appdeviceTypeCodeValue: null,
        form: {
          userName: null,
          appId: null,
          appdeviceTypeCodeValue: null,
          downloadDt: null,
          loginTimes: null,
          lastUsedDt: null,
        },
        searchForm: {

          userName: null,
          appId: null,
          appdeviceTypeCodeValue: null,
          downloadDt: null,
          loginTimes: null,
          lastUsedDt: null,

        },
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          userName: null,
          appId: null,
          appdeviceTypeCode: null,
          downloadDt: null,
          loginTimes: null,
          lastUsedDt: null,

        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      this.params.appId = this.$route.query.appId;
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

      commonApi.getCodeIntType("appdeviceType").then(res => {
        let viewList = res.data.data || [];
        for (let appdeviceTypeItem of viewList) {
          this.appdeviceTypeCodeOptions.push({
            "label": appdeviceTypeItem.codeDesc,
            "name": appdeviceTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.id
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
        //safety safetyEdu basedata
        let opath = '/basedata/detailAppUsers/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailAppUsers/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailAppUsers/detail/' + id;
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
