<template>
  <div class="GrantTranAgency">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="机构ID:" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.transferId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="机构名称:" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.transferId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="机构状态:" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.entityOrgStatusCode" placeholder="请您选择">
              <el-option v-for="(item,index) in agencyTypeCodeOptions" :label="item.label" :value="item.name"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
      </el-header>
      <div class="bt border-color-e8e8e8 mt10 mb10"></div>

      <el-main class="pt-15">
        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center space-between">


            <div class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p f12" style="color: #93BF88;"></i>
                <span class="c707070">已选择 <span class="c93BF88 bold"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="c93BF88 bold"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju f12" onclick="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
            <div>

              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="del">
                <i class="iconfont icon-icon_tingyong_caozuo f12 cfff"></i> 禁止
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="del">
                <i class="iconfont icon-icon_tianjia f12 cfff"></i> 添加机构
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
            <el-table-column prop="granttranAgencyId" label="机构ID" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="agencyName" label="机构名称" sortable="custom" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.agencyName" class="one-line">{{scope.row.agencyName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="peoplePhonenum" label="授权数" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="updatedDt" label="最近授权时间" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="carId" label="联系方式" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="agencyTypeCode" label="状态" sortable="custom" align="center"></el-table-column>
            <el-table-column label="操作" fixed="right" width="240">
              <template slot-scope="scope">
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.granttranAgencyId)"><i
                    class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.granttranAgencyId)"><i
                    class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.granttranAgencyId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="禁止" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.granttranAgencyId)"><i
                    class="iconfont icon-icon_tc_tingyong ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="审核" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.granttranAgencyId)"><i
                    class="iconfont icon-icon_shenhe ml5 f20 c999999"></i></span>
                  </el-popover>
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
  import api from "./studgranttranagencyUrl";
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
        agencyTypeCodeOptions: [{"label": "全部", "name": ""}],
        agencyTypeCodeValue: null,
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        form: {
          transferId: null,
        },
        searchForm: {

          transferId: null,

        },
        data: "",
        onSwitchStatus: true,
        offSwitchStatus: false,
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          transferId: null,

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
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("agencyType").then(res => {
        let viewList = res.data.data || [];
        for (let agencyTypeItem of viewList) {
          this.agencyTypeCodeOptions.push({
            "label": agencyTypeItem.codeDesc,
            "name": agencyTypeItem.codeId
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
      console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.granttranAgencyId
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
        let opath = '/safety/detailGrantTranAgency/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        //safety safetyEdu basedata
        let opath = '/safety/editGrantTranAgency/detail/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailGrantTranAgency/detail/' + id;
        this.$router.push({path: opath})
      },
      toAnother(id, path) {
        let opath = '/safety/' + path + '?granttranAgencyId=' + id;
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
