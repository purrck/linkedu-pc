<template>
  <div>
    <button type="button" v-show="false"
            v-clipboard:copy="itemUrl"
            v-clipboard:success="onCopy"
            ref="copy"
            v-clipboard:error="onError">Copy!
    </button>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="文件名:">
            <el-input v-model="searchForm.fileName" maxlength="30"></el-input>
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
                    class="table-rao checkbox-rao" ref="schooltable" :stripe="true" @sort-change="sortChange"
                    @cell-click="copyLink">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="fileName" label="文件名" sortable="custom" width="400"></el-table-column>
            <el-table-column prop="filePath" label="地址" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.filePath" style="text-decoration: underline">
                {{scope.row.filePath}}
                </span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="url" label="绝对地址" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<span v-if="scope.row.url">-->
            <!--{{scope.row.url}}-->
            <!--</span>-->
            <!--<span v-else>无</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="sizes" label="大小" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.sizes">{{toMb(scope.row.sizes)}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="folderId" label="文件夹" sortable="custom" width="200"></el-table-column>-->
            <el-table-column label="操作" width="350">
              <template slot-scope="scope">
                <el-button size="small" type="primary"
                           class="tableEditButton"
                           @click.stop="toEdit(scope.row.fileId)">
                  编辑
                </el-button>
                <el-button size="small" type="primary"
                           @click="toDetail(scope.row.fileId)">
                  详情
                </el-button>
                <el-button size="small" type="danger"
                           @click="rowDel(scope.row.fileId)">删除
                </el-button>
                <el-button size="small" type="primary"
                           @click="downFlie(scope.row)">
                  下载文件
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
      <div class="tips-school tips-rao" v-show="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>


  </div>
</template>

<script>
  import api from "./euploadfileUrl";
  import api2 from "../filefolder/filefolderUrl";
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
        folderName: '',
        paramsId: '',
        itemUrl: '',
        textMap: {
          update: '编辑',
          detail: '详情',
          create: '创建'
        },
        appCodeOptions: [{"label": "全部", "name": ""}],
        appCodeValue: null,
        typeCodeOptions: [{"label": "全部", "name": ""}],
        typeCodeValue: null,
        formatCodeOptions: [{"label": "全部", "name": ""}],
        formatCodeValue: null,
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        form: {
          fileName:
            null,
        },
        searchForm: {
          fileName:
            null,
        },
        data: "",

        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          fileName:
            null,
        }
      }
    },
    watch: {},
    created() {
      let folderId = this.$route.query.folderId;
      this.params.folderId = folderId;
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
      this.getObj();

      commonApi.getCodeIntType("app").then(res => {
        let viewList = res.data.data || [] || [];
        for (let appItem of viewList) {
          this.appCodeOptions.push({
            "label": appItem.codeDesc,
            "name": appItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("type").then(res => {
        let viewList = res.data.data || [] || [];
        for (let typeItem of viewList) {
          this.typeCodeOptions.push({
            "label": typeItem.codeDesc,
            "name": typeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("format").then(res => {
        let viewList = res.data.data || [] || [];
        for (let formatItem of viewList) {
          this.formatCodeOptions.push({
            "label": formatItem.codeDesc,
            "name": formatItem.codeId
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
    methods: {
      toMb: function (e) {
        if ((e / 1024 / 1024) < 1) {
          return (e / 1024).toString().substr(0, 4) + 'KB'
        } else {
          return (e / 1024 / 1024).toString().substr(0, 4) + 'MB'
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.fileId
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
        this.params.isAsc = obj.order == "ascending" ? "asc" : "desc";
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      copyLink(event) {
        console.log(arguments[3].target.innerText);
        this.itemUrl = arguments[3].target.innerText;
        if (this.itemUrl.indexOf('/') !== -1) {
          this.$refs.copy.click()
        }
      },
      onCopy() {
        this.$xxMsg({
          msg: '复制成功', css: {
            position: "fixed",
            top: "40%",
            left: "47%"
          }
        })
        // this.getList();
      },
      onError() {
        this.$xxMsg({
          msg: '复制失败', css: {
            position: "fixed",
            top: "40%",
            left: "47%"
          }
        })
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
      getObj() {
        api2.getObj(this.params.folderId).then(res => {
          this.folderName = res.data.data.folderName
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
      downFlie(row) {
        let iframe = document.createElement("a")
        iframe.style.display = "none";
        iframe.href = row.filePath;
        iframe.download = 'download'
        console.log(iframe);
        iframe.click()
      },
      //删除
      del() {
        if (this.multipleSelection.length === 0) {
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
        let opath = '/basedata/editEuploadfile/add/' + this.$route.query.folderId + '?name=' + this.folderName;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/editEuploadfile/edit/' + id + '?name=' + this.folderName;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/editEuploadfile/detail/' + id + '?name=' + this.folderName;
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
