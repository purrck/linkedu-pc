<template>
  <div class="GrantTransfer">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small"
                 class="select-form">

          <el-form-item label="授权方式:" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.gtDelegateTypeCode" placeholder="请您选择">
              <el-option v-for="item in gtDelegateTypeCodeOptions" :key="item.value" :label="item.label"
                         :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授权状态:" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.gtStatusCode" placeholder="请您选择">
              <el-option v-for="item in gtStatusCodeOptions" :key="item.value" :label="item.label"
                         :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="被接送人姓名:" prop="studentName" class="w140">
            <el-input v-model="searchForm.studentName" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="授权人:" prop="userName" class="w140">
            <el-input v-model="searchForm.userName" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <!--<el-form-item label="被授权人:" prop="entityOrgId">-->
          <!--<el-input v-model="searchForm.entityOrgId" class="input-v2-rao" maxlength="30"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="授权时间:" class="w140">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="searchForm.effectiveDt"
                            type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
          </el-form-item>
          <el-form-item label="至" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.expiryDt" type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
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
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;" @click="toTotal"></i>
              </div>
            </div>
            <div>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel"
                         :disabled="!multipleSelection.length > 0">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao bFFB54C" @click="toDel"
                         :disabled="!multipleSelection.length > 0">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 撤销
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
            <el-table-column prop="transferId" label="授权ID" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.transferId" class="one-line">{{scope.row.transferId}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="studentName" align="center" label="被接送人" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.studentName" class="one-line">{{scope.row.studentName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="studentName" align="center" label="授权人" sortable="custom"></el-table-column>
            <el-table-column prop="studentName" align="center" label="被授权人" sortable="custom"></el-table-column>
            <el-table-column label="区分" align="center">
              <template slot-scope="scope">
                <span :style="{color:scope.row.gtDelegateTypeCodeStr.split(';')[1]}"
                      v-if="scope.row.gtDelegateTypeCodeStr">{{scope.row.gtDelegateTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>

            <el-table-column prop="effectiveDt" align="center" label="接送时间" sortable="custom"></el-table-column>

            <el-table-column prop="studentName" align="center" label="确认人" sortable="custom"></el-table-column>
            <!--<el-table-column label="上下学">-->
            <!--<template slot-scope="scope">-->
            <!--<span :style="{color:scope.row.gtScheduleTypeCodeStr.split(';')[1]}"-->
            <!--v-if="scope.row.gtScheduleTypeCodeStr">{{scope.row.gtScheduleTypeCodeStr.split(';')[0]}}</span>-->
            <!--<span v-else>无</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="publishedPhonenum" label="发起手机号" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.publishedPhonenum" class="one-line">{{scope.row.publishedPhonenum}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span :style="{color:scope.row.gtStatusCodeStr.split(';')[1]}" v-if="scope.row.gtStatusCodeStr">{{scope.row.gtStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="70" fixed="right">
              <template slot-scope="scope">
                <div class="flex center">
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.transferId)"><i
                    class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                </div>

                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">-->
                <!--<span slot="reference" @click.stop="rowDel(scope.row.transferId)"><i-->
                <!--class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->

                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="授权接送委托人信息" trigger="hover">-->
                <!--<span slot="reference" @click.stop="toAnother(scope.row.transferId ,`listGrantTranPeople`)"><i-->
                <!--class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->

                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="授权接送委托机构信息" trigger="hover">-->
                <!--<span slot="reference" @click.stop="toAnother(scope.row.transferId ,`listGrantTranAgency`)"><i-->
                <!--class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->
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
  import api from "./studentgranttransferUrl";
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
        gtStatusCodeOptions: [{"label": "全部", "name": ""}],
        gtStatusCodeValue: null,
        gtDelegateTypeCodeOptions: [{"label": "全部", "name": ""}],
        gtDelegateTypeCodeValue: null,
        gtScheduleTypeCodeOptions: [{"label": "全部", "name": ""}],
        gtScheduleTypeCodeValue: null,
        form: {
          transferId: null,
        },
        searchForm: {
          gtStatusCode: null,
          gtDelegateTypeCode: null,
          peopleName: null,
          studentName: null,
          userName: null,
          startTime: null,
          endTime: null,
          transferId: null,

        },
        data: "",
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

      commonApi.getCodeIntType("gtStatus").then(res => {
        let viewList = res.data.data || [];
        for (let gtStatusItem of viewList) {
          this.gtStatusCodeOptions.push({
            "label": gtStatusItem.codeDesc,
            "name": gtStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("gtDelegateType").then(res => {
        let viewList = res.data.data || [];
        for (let gtDelegateTypeItem of viewList) {
          this.gtDelegateTypeCodeOptions.push({
            "label": gtDelegateTypeItem.codeDesc,
            "name": gtDelegateTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("gtScheduleType").then(res => {
        let viewList = res.data.data || [];
        for (let gtScheduleTypeItem of viewList) {
          this.gtScheduleTypeCodeOptions.push({
            "label": gtScheduleTypeItem.codeDesc,
            "name": gtScheduleTypeItem.codeId
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
          return item.transferId
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
        let opath = '/safety/detailGrantTransfer/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        //safety safetyEdu basedata
        let opath = '/safety/grantTotal';
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailGrantTransfer/detail/' + id;
        this.$router.push({path: opath})
      },
      toAnother(id, path) {
        let opath = '/safety/' + path + '?transferId=' + id;
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
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;

    img {
      vertical-align: -4px;
    }
  }
</style>
