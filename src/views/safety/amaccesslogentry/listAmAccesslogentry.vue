<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="服务地址:">
            <el-input v-model="searchForm.serverAddress" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="远程地址:">
            <el-input v-model="searchForm.remoteAddress" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label=":">
            <el-input v-model="searchForm.uri" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="开始时间:">
            <el-input v-model="searchForm.startTime" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="用户:">
            <el-input v-model="searchForm.subjectId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="行为:">
            <el-input v-model="searchForm.accesslogId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="地理位置:">
            <el-input v-model="searchForm.gpsInfo" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="手机型号:">
            <el-input v-model="searchForm.mobileModel" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="移动运营商:">
            <el-select v-model="searchForm.netTypeCodeValue" placeholder="请您选择">
              <el-option v-for="netTypeCodeItem in netTypeCodeOptions"
                         :key="netTypeCodeItem.name"
                         :label="netTypeCodeItem.label" :value="netTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机串码:">
            <el-input v-model="searchForm.macAddress" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="经度:">
            <el-input v-model="searchForm.longitude" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="纬度:">
            <el-input v-model="searchForm.latitude" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="应用版本:">
            <el-input v-model="searchForm.appVersion" maxlength="30"></el-input>
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
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="serverAddress" label="服务地址" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="remoteAddress" label="远程地址" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="uri" label="uri" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="startTime" label="开始时间" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="duration" label="调用时长" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="subjectId" label="用户" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="accesslogId" label="行为" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="gpsInfo" label="地理位置" sortable="custom" width="200"></el-table-column>
            <el-table-column prop="mobileModel" label="手机型号" sortable="custom" width="200"></el-table-column>
            <el-table-column label="移动运营商">
              <template slot-scope="scope">
                <span v-if="scope.row.netTypeCodeStr" :style="{color:scope.row.netTypeCodeStr.split(';')[1]}">{{scope.row.netTypeCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="macAddress" label="手机串码" sortable="custom" width="200"></el-table-column>
            <!--<el-table-column prop="longitude" label="经度" sortable="custom" width="200"></el-table-column>-->
            <!--<el-table-column prop="latitude" label="纬度" sortable="custom" width="200"></el-table-column>-->
            <el-table-column prop="appVersion" label="应用版本" sortable="custom" width="200"></el-table-column>
            <el-table-column label="操作" width="280" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="primary"
                           @click="toDetail(scope.row.accesslogentryId)">
                  详情
                </el-button>
                <el-button size="small" type="danger"
                           @click="rowDel(scope.row.accesslogentryId)">删除
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
  import api from "./amaccesslogentryUrl";
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
        netTypeCodeOptions: [{"label": "全部", "name": ""}],
        netTypeCodeValue: null,
        form: {
          serverAddress:
            null,
          remoteAddress:
            null,
          uri:
            null,
          startTime:
            null,
          subjectId:
            null,
          accesslogId:
            null,
          gpsInfo:
            null,
          mobileModel:
            null,
          netTypeCodeValue: null,
          macAddress:
            null,
          longitude:
            null,
          latitude:
            null,
          appVersion:
            null,
        },
        searchForm: {
          serverAddress:
            null,
          remoteAddress:
            null,
          uri:
            null,
          startTime:
            null,
          subjectId:
            null,
          accesslogId:
            null,
          gpsInfo:
            null,
          mobileModel:
            null,
          netTypeCodeValue: null,
          macAddress:
            null,
          longitude:
            null,
          latitude:
            null,
          appVersion:
            null,
        }
        ,
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          serverAddress:
            null,
          remoteAddress:
            null,
          uri:
            null,
          startTime:
            null,
          subjectId:
            null,
          accesslogId:
            null,
          gpsInfo:
            null,
          mobileModel:
            null,
          netTypeCode:
            null,
          macAddress:
            null,
          longitude:
            null,
          latitude:
            null,
          appVersion:
            null,
        }
      }
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("netType").then(res => {
        let viewList = res.data.data || [];
        for (let netTypeItem of viewList) {
          this.netTypeCodeOptions.push({
            "label": netTypeItem.codeDesc,
            "name": netTypeItem.codeId
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
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.accesslogentryId
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
          if (res.data.resultCode === '000000') {
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
              if (res.data.resultCode === '000000') {
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
        let opath = '/safety/detailAmAccesslogentry/add/' + 0;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailAmAccesslogentry/detail/' + id;
        this.$router.push({path: opath})
      },
      getnetTypeCodeStr(row) {
        return row.netTypeCodeStr;
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
