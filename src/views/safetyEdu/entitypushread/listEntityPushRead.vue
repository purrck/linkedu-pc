<template>
  <div class="EntityPushRead">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="信息:" prop="entityName">
            <el-input class="input-v2-rao" v-model="searchForm.entityName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="信息类型:" prop="entityType">
            <el-input class="input-v2-rao" v-model="searchForm.entityType" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="已阅读:" prop="isRead">
            <el-select class="select-v2-rao" v-model="searchForm.isRead" placeholder="请您选择">
              <el-option v-for="isReadItem in ynOptions"
                         :key="isReadItem.name"
                         :label="isReadItem.label" :value="isReadItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" prop="pushReadStatusCode">
            <el-select class="select-v2-rao" v-model="searchForm.pushReadStatusCode" placeholder="请您选择">
              <el-option v-for="pushReadStatusCodeItem in pushReadStatusCodeOptions"
                         :key="pushReadStatusCodeItem.name"
                         :label="pushReadStatusCodeItem.label" :value="pushReadStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别:" prop="pushReadLevelCode">
            <el-select class="select-v2-rao" v-model="searchForm.pushReadLevelCode" placeholder="请您选择">
              <el-option v-for="pushReadLevelCodeItem in pushReadLevelCodeOptions"
                         :key="pushReadLevelCodeItem.name"
                         :label="pushReadLevelCodeItem.label" :value="pushReadLevelCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>

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
            <el-table-column prop="imagePath" align="center" label="图标">
              <template slot-scope="scope">
                <div v-if="scope.row.imagePath">
                  <img :src="scope.row.imagePath" alt="" height="100px" class="scope-img">
                </div>
                <div v-if="!scope.row.imagePath">无</div>
              </template>
            </el-table-column>
            <el-table-column prop="entityName" align="center" label="信息" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.entityName" class="one-line">{{scope.row.entityName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="entityTypeName" align="center" label="信息类型" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.entityTypeName" class="one-line">{{scope.row.entityTypeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="pushedDt" label="推送时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="studentName" align="center" label="子女" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.studentName" class="one-line">{{scope.row.studentName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="parentName" align="center" label="推送家长" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.parentName" class="one-line">{{scope.row.parentName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="isRead" label="已阅读" align="center" sortable="custom">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isRead == 'Y'" disabled></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="readDt" label="阅读时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="readParentName" align="center" label="阅读家长" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.readParentName" class="one-line">{{scope.row.readParentName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="pushReadStatusCode" label="状态" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.pushReadStatusCodeStr.split(';')[1]}"
                                  v-if="scope.row.pushReadStatusCodeStr">{{scope.row.pushReadStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="pushReadLevelCode" label="级别" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.pushReadLevelCodeStr.split(';')[1]}"
                                  v-if="scope.row.pushReadLevelCodeStr">{{scope.row.pushReadLevelCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <div class="flex  row">

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.pushReadId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.pushReadId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
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
  import api from "./entitypushreadUrl";
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
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        pushReadStatusCodeOptions: [{"label": "全部", "name": ""}],
        pushReadStatusCodeValue: null,
        pushReadLevelCodeOptions: [{"label": "全部", "name": ""}],
        pushReadLevelCodeValue: null,
        form: {
          entityName: null,
          entityType: null,
          ynValue: null,
          pushReadStatusCodeValue: null,
          pushReadLevelCodeValue: null,
        },
        searchForm: {
          entityName: null,
          entityType: null,
          isRead: null,
          pushReadStatusCode: null,
          pushReadLevelCode: null,
        },
        data: "",
        onSwitchStatus: true,
        offSwitchStatus: false,
        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          entityName: null,
          entityType: null,
          isRead: null,
          pushReadStatusCode: null,
          pushReadLevelCode: null,
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
    mounted() {
      this.getCurrentPage(this.$route.path, this.params)
      this.getList();

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
      commonApi.getCodeIntType("pushReadStatus").then(res => {
        let viewList = res.data.data || [];
        for (let pushReadStatusItem of viewList) {
          this.pushReadStatusCodeOptions.push({
            "label": pushReadStatusItem.codeDesc,
            "name": pushReadStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("pushReadLevel").then(res => {
        let viewList = res.data.data || [];
        for (let pushReadLevelItem of viewList) {
          this.pushReadLevelCodeOptions.push({
            "label": pushReadLevelItem.codeDesc,
            "name": pushReadLevelItem.codeId
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
          return item.pushReadId
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
        api.fetchListV1(this.params).then(res => {

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
        api.batchDelObj({userId: "", ids: this.multipleSelection}).then(res => {
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
      toTotal() {
        let opath = '/safety/EntityPushReadTotal';
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailEntityPushRead/detail/' + id;
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
