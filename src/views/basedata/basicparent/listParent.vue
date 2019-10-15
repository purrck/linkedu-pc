<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="姓名:">
            <el-input class="input-v2-rao" v-model="searchForm.userName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input class="input-v2-rao" v-model="searchForm.contactPhoneNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input class="input-v2-rao" v-model="searchForm.telPhoneNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="证件号:">
            <el-input class="input-v2-rao" v-model="searchForm.idCardNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="QQ号:">
            <el-input class="input-v2-rao" v-model="searchForm.qqNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:">
            <el-input class="input-v2-rao" v-model="searchForm.contactEmail" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>
      <el-main class="pt-15">


        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">

            <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i>
              </div>
            </div>
            <div>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 "
                         @click="toAdd">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="downAllParent">导出全部家长信息
              </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="downEmpty">下载表格模版
              </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="toImport">导入表格
              </el-button>
            </div>
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" sortable="custom">
              <template slot-scope="scope">
                <div @click="titleClick(scope.row.parentId)">{{scope.row.userName}}</div>
              </template>
            </el-table-column>
            <el-table-column label="身份证件类型">
              <template slot-scope="scope">
                <span>{{scope.row.idCardTypeCodeStr&&scope.row.idCardTypeCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="idCardNum" label="身份证件号" sortable="custom"></el-table-column>
            <el-table-column prop="contactPhoneNum" label="联系电话" sortable="custom"></el-table-column>
            <el-table-column prop="telPhoneNum" label="手机号" sortable="custom"></el-table-column>
            <el-table-column prop="qqNum" label="qq 号" sortable="custom"></el-table-column>
            <el-table-column prop="contactEmail" label="电子邮箱" sortable="custom"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.parentId)"><i
                    class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="toEdit(scope.row.parentId)"> <i
                    class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.parentId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]"
                       :page-size="data.size" :total="data.total"
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
  import api from "./basicparentUrl";
  import commonApi from "@/api/common/common";
  import {downloadFiles} from "@/util/util";

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
        idCardTypeCodeOptions: [{"label": "全部", "name": ""}],
        idCardTypeCodeValue: null,
        form: {
          userName:
            null,
          contactPhoneNum:
            null,
          telPhoneNum:
            null,
          contactAddress:
            null,
        },
        searchForm: {
          userName:
            null,
          contactPhoneNum:
            null,
          telPhoneNum:
            null,
          contactAddress:
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
          userName:
            null,
          contactPhoneNum:
            null,
          telPhoneNum:
            null,
          contactAddress:
            null,
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.isLoaded = true;
      this.getList()
    },
    created() {
      let schoolId = this.$route.query.schoolOrgId;
      let classId = this.$route.query.classId;
      this.params.schoolId = schoolId;
      this.params.classId = classId;
    },
    mounted() {
      //this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("idCardType").then(res => {
        let viewList = res.data.data || [];
        for (let idCardTypeItem of viewList) {
          this.idCardTypeCodeOptions.push({
            "label": idCardTypeItem.codeDesc,
            "name": idCardTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      downEmpty() {
        window.location.href = "/static/excel/家长数据导入.xls"
      },
      downAllParent() {
        api.exports().then(res=>{
          console.log(res);
          downloadFiles(res.data,'家长信息')
        })
      },

      titleClick(parentId) {
        this.$detailDialog({
          url: `/user/parentAd/${parentId}`,
          items: [
            {
              key: "userName",
              name: "姓名"
            },
            {
              key: "idCardTypeCodeStr",
              name: "身份证件类型"
            },
            {
              key: "idCardNum",
              name: "证件号"
            },
            {
              key: "telPhoneNum",
              name: "手机号"
            },
            {
              key: "contactPhoneNum",
              name: "联系电话"
            },
            {
              key: "qqNum",
              name: "qq 号"
            },
            {
              key: "contactEmail",
              name: "电子邮箱"
            },
            {
              key: "postNum",
              name: "邮政编码"
            },
            {
              key: "contactAddress",
              name: "通讯地址"
            }
          ]
        })
      },
      toImport() {
        this.$router.push({
          name: 'importFile', query: {
            roleType: "parent"
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.parentId
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
        let opath = '/basedata/detailParent/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailParent/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailParent/detail/' + id;
        this.$router.push({path: opath})
      },
      getidCardTypeCodeStr(row) {
        return row.idCardTypeCodeStr;
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
