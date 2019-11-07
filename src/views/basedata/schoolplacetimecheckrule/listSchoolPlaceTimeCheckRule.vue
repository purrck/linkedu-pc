<template>
  <div class="SchoolPlaceTimeCheckRule">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="设备考勤规则:" prop="checkRuleName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.checkRuleName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="场所类型:" prop="placeTypeCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.placeTypeCode" placeholder="请您选择">
              <el-option v-for="placeTypeCodeItem in placeTypeCodeOptions"
                         :key="placeTypeCodeItem.name"
                         :label="placeTypeCodeItem.label" :value="placeTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考勤做些类型:" prop="timelineTypeCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.timelineTypeCode" placeholder="请您选择">
              <el-option v-for="timelineTypeCodeItem in timelineTypeCodeOptions"
                         :key="timelineTypeCodeItem.name"
                         :label="timelineTypeCodeItem.label" :value="timelineTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <el-button type="primary" @click="resetForm('searchForm')" class="button-v2-rao b93BF88">重置</el-button>
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
                <i class="iconfont icon-icon_shuju"  style="color: #93BF88;"></i>
              </div>
            </div>
            <el-button type="primary" size="small" class="button-v2-rao b93BF88 " @click="toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
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
            <el-table-column prop="checkRuleName" align="center" label="设备考勤规则" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.checkRuleName" class="one-line">{{scope.row.checkRuleName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="placeTypeCode" label="场所类型" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.placeTypeCodeStr.split(';')[1]}"
                                  v-if="scope.row.placeTypeCodeStr">{{scope.row.placeTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="timelineTypeCode" label="考勤做些类型" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.timelineTypeCodeStr.split(';')[1]}"
                                  v-if="scope.row.timelineTypeCodeStr">{{scope.row.timelineTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="beforeRule" align="center" label="作息开始前(分钟)" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.beforeRule" class="one-line">{{scope.row.beforeRule}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="beforeProcessCheckCode" label="作息开始前处理方式" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.beforeProcessCheckCodeStr">{{scope.row.beforeProcessCheckCodeStr}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="inProcessCheckCode" label="作息时间内处理方式" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.inProcessCheckCodeStr">{{scope.row.inProcessCheckCodeStr}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="afterRule" align="center" label="作息截止后(分钟)" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.afterRule" class="one-line">{{scope.row.afterRule}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="afterProcessCheckCode" label="作息截止后处理方式" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.afterProcessCheckCodeStr">{{scope.row.afterProcessCheckCodeStr}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="scope">

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.checkRuleId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.checkRuleId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.checkRuleId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
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
  import api from "./schoolplacetimecheckruleUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';

  export default {
    directives: {preview},
    data() {
      return {
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        placeTypeCodeOptions: [{"label": "全部", "name": ""}],
        timelineTypeCodeOptions: [{"label": "全部", "name": ""}],
        beforeProcessCheckCodeOptions: [{"label": "全部", "name": ""}],
        beforeTimelineCheckExceptionCodeOptions: [{"label": "全部", "name": ""}],
        inProcessCheckCodeOptions: [{"label": "全部", "name": ""}],
        inTimelineCheckExceptionCodeOptions: [{"label": "全部", "name": ""}],
        afterProcessCheckCodeOptions: [{"label": "全部", "name": ""}],
        afterTimelineCheckExceptionCodeOptions: [{"label": "全部", "name": ""}],
        form: {
          checkRuleName: null,
          placeTypeCodeValue: null,
          timelineTypeCodeValue: null,
        },
        searchForm: {
          checkRuleName: null,
          placeTypeCode: null,
          timelineTypeCode: null,
        },
        data: "",
        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
          checkRuleName: null,
          placeTypeCode: null,
          timelineTypeCode: null,
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
    },
    mounted() {
      commonApi.getCodeIntType("processCheck").then(res => {
        let viewList = res.data.data || [];
        for (let beforeProcessCheckItem of viewList) {
          this.beforeProcessCheckCodeOptions.push({
            "label": beforeProcessCheckItem.codeDesc,
            "name": beforeProcessCheckItem.codeId
          });
        }
        this.inProcessCheckCodeOptions = this.afterProcessCheckCodeOptions = this.beforeProcessCheckCodeOptions
        this.getList();

      });
      commonApi.getCodeIntType("placeType").then(res => {
        let viewList = res.data.data || [];
        for (let placeTypeItem of viewList) {
          this.placeTypeCodeOptions.push({
            "label": placeTypeItem.codeDesc,
            "name": placeTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("timelineType").then(res => {
        let viewList = res.data.data || [];
        for (let timelineTypeItem of viewList) {
          this.timelineTypeCodeOptions.push({
            "label": timelineTypeItem.codeDesc,
            "name": timelineTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("beforeTimelineCheckException").then(res => {
        let viewList = res.data.data || [];
        for (let beforeTimelineCheckExceptionItem of viewList) {
          this.beforeTimelineCheckExceptionCodeOptions.push({
            "label": beforeTimelineCheckExceptionItem.codeDesc,
            "name": beforeTimelineCheckExceptionItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("inTimelineCheckException").then(res => {
        let viewList = res.data.data || [];
        for (let inTimelineCheckExceptionItem of viewList) {
          this.inTimelineCheckExceptionCodeOptions.push({
            "label": inTimelineCheckExceptionItem.codeDesc,
            "name": inTimelineCheckExceptionItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("afterTimelineCheckException").then(res => {
        let viewList = res.data.data || [];
        for (let afterTimelineCheckExceptionItem of viewList) {
          this.afterTimelineCheckExceptionCodeOptions.push({
            "label": afterTimelineCheckExceptionItem.codeDesc,
            "name": afterTimelineCheckExceptionItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.checkRuleId
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
        })
        this.isDel = false;
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      getList() {
        api.fetchList(this.params).then(res => {

          let resDs = res.data.data || {}
          let records = resDs.records || []
          if (res.data.resultCode === "000000") {
            for(let resD of records) {
              if(resD.beforeProcessCheckCode&&!resD.beforeProcessCheckCodeStr){
                let str = this.dealCode(resD.beforeProcessCheckCode)
                resD.beforeProcessCheckCodeStr = str
              }
              if(resD.inProcessCheckCode&&!resD.inProcessCheckCodeStr){
                let str = this.dealCode(resD.inProcessCheckCode)
                resD.inProcessCheckCodeStr = str
              }
              if(resD.afterProcessCheckCode&&!resD.afterProcessCheckCodeStr){
                let str = this.dealCode(resD.afterProcessCheckCode)
                resD.afterProcessCheckCodeStr = str
              }
            }
            this.data = resDs;
          }
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      dealCode (code) {
        // // console.log(code)
        // // console.log(this.beforeProcessCheckCodeOptions)
        let str = this.beforeProcessCheckCodeOptions.find(res=> {
          return res.name === code
        })
        console.error(str)
        return str && str.label || '未知'
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/basedata/detailSchoolPlaceTimeCheckRule/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/basedata/SchoolPlaceTimeCheckRuleTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailSchoolPlaceTimeCheckRule/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailSchoolPlaceTimeCheckRule/detail/' + id;
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
