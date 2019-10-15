<template>
  <div class="SchoolSecurityCheckResult">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="巡检路线:" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.checkRouteId" placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in options1"
                         :key="entityOrgStatusCodeItem.value"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡检点:" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.placeId   " placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in options2"
                         :key="entityOrgStatusCodeItem.value"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡检状态:" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.resultStatusCode   " placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in options3"
                         :key="entityOrgStatusCodeItem.value"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="巡检人:" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.checkedUserName" placeholder="巡检人"></el-input>
          </el-form-item>

          <el-form-item label="关键字:" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.keyword" placeholder="关键字"></el-input>
          </el-form-item>
<!--          <el-form-item label="日期:" class="w140 select-v2-rao">-->
<!--            <el-date-picker class="date-v2-rao" v-model="searchForm.createdDt" value-format="yyyy-MM-dd HH:mm"-->
<!--                            type="date" placeholder="日期"></el-date-picker>-->
<!--          </el-form-item>-->

          <el-form-item label="实际巡检日期:" class="w280">
            <el-date-picker v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" placeholder="实际巡检日期"></el-date-picker>
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
                <i class="iconfont icon-icon_shanchu_p f12" style="color: #93BF88;"></i>
                <span class="c707070">已选择 <span class="fold c93BF88">{{multipleSelection.length}}</span> 项</span>
              </div>
              <div>
                <span class="c707070">共搜索到 <span class="fold c93BF88">{{data.total}}</span> 条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i>
              </div>
            </div>
            <!--<el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">-->
            <!--<i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增-->
            <!--</el-button>-->
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557"
                       :disabled="!multipleSelection.length > 0" @click="toDel">
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
            <el-table-column prop="checkDt" label="日期" sortable="custom"  align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.ruleCheckDt" class="one-line">{{scope.row.ruleCheckDt.substr(0,10)}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="routeName" label="巡检线路" sortable="custom"  align="center"></el-table-column>
            <el-table-column prop="placeName" label="巡检点" sortable="custom"  align="center">
              <template slot-scope="scope" >
                <div v-if="scope.row.placeName" class="one-line">{{scope.row.placeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="checkedUserName" label="巡检人" sortable="custom"  align="center"></el-table-column>
            <el-table-column prop="ruleCheckDt" label="规定巡检日期" sortable="custom"  align="center"></el-table-column>
            <el-table-column prop="checkDt" label="实际巡检日期" sortable="custom"  align="center"></el-table-column>

            <!--<el-table-column prop="checkPlanName" label="安全巡检计划" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.checkPlanName" class="one-line">{{scope.row.checkPlanName}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column prop="checkedDt" label="巡检时间" sortable="custom"></el-table-column>-->
            <el-table-column prop="dangerTypeCodeStr" label="异常类型" sortable="custom"  align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.dangerTypeCodeStr" :style="{color :scope.row.dangerTypeCodeStr.split(';')[1]}">{{scope.row.dangerTypeCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isExceptionStr"  label="状态" sortable="custom"  align="center">
              <template slot-scope="scope">
                <!--<el-switch v-model="scope.row.isException === 'Y'" disabled></el-switch>-->
                <!--:style="{color :scope.row.resultStatusCodeStr.split(';')[1]}"-->
                <span v-if="scope.row.resultStatusCodeStr"
                     >{{scope.row.resultStatusCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="60">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference" @click.stop="toDetail(scope.row.checkResultId)">
                      <i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
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
  import api from './schoolsecuritycheckresultUrl'
  import commonApi from '@/api/common/common'
  import {getTheSchoolInspectionPoint, getTheSchoolRoute} from '@/api/basedata/schoolBaseApi'

  export default {
    data() {
      return {
        options1: [{'label': '全部', 'value': ''}],
        options2: [{'label': '全部', 'value': ''}],
        // options2: [],
        // options3: [],
        options3: [{'label': '全部', 'value': ''}],
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
        ynOptions: [{'label': '全部', 'name': ''}],
        ynValue: null,
        form: {
          checkPlanId: null,
        },
        searchForm: {
          checkRouteId:'',
          placeId:'',
          resultStatusCode:'',
          checkedUserName:'',
          keyword:'',
          daterange:null,
          checkPlanId: '',
          startTime:'',
          endTime:'',
        },
        data: '',
        onSwitchStatus: true,
        offSwitchStatus: false,
        multipleSelection: [],
        params: {   //接口参数
           page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          checkPlanId: null,

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
      this.init()
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList()

      commonApi.getCodeIntType('resultStatus').then(res => {
        // this.options3 = this.coverData(res.data.data, 'codeDesc', 'codeId')
        this.options3 = this.options3.concat(this.coverData(res.data.data, 'codeDesc', 'codeId'))
      })
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
      init() {
        getTheSchoolInspectionPoint().then(res => {
          // this.options2 = this.coverData(res.data.data, 'placeName', 'securityPlaceId')
          this.options2 = this.options2.concat(this.coverData(res.data.data, 'placeName', 'securityPlaceId'))
        })
        getTheSchoolRoute().then(res => {
          // this.options1 = this.coverData(res.data.data, 'routeName', 'checkRouteId')
          this.options1 = this.options1.concat(this.coverData(res.data.data, 'routeName', 'checkRouteId'))
        })
      },
      coverData(originData, label, value) {
        let data = originData || []
        return data.map(item => {
          return {
            label: item[label],
            value: item[value]
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.checkResultId
        })
      },
      handleSizeChange(size) {
        this.params.limit = size
        this.isLoaded = true
        this.getList()
      },
      handleCurrentChange(currentPage) {
        this.setCurrentPage(this.$route.path, currentPage)
        this.params.page = currentPage
        this.isLoaded = true
        this.getList()
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop
        this.params.isAsc = obj.order == 'ascending' ? true : false
        this.isLoaded = true
        this.getList()
      },
      getList() {
        api.fetchList(this.params).then(res => {
          this.data = res.data.data
          this.isLoaded = false
        }, res => {
          this.$message.error(res.message)
        })
      },

      search() {
        // console.log(this.searchForm)
        // this.searchForm.startTime='';
        // this.searchForm.endTime='';
        // alert('s')
        this.params.page = 1;
        this.searchForm.startTime = this.searchForm.daterange&&this.searchForm.daterange[0];
        this.searchForm.endTime = this.searchForm.daterange&&this.searchForm.daterange[1];
        for (let key in this.searchForm) {
          if (typeof this.searchForm[key] !== 'object') {
            this.params[key] = this.searchForm[key]
          }
        }
        this.isLoaded = true
        this.getList()
      },

      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true
        this.multipleSelection = [id]
      },
      //删除
      del() {
        if (this.$refs.schooltable.selection.length == 0) {
          this.msgShow = true
          setTimeout(() => {
            this.msgShow = false
          }, 800)
          return
        }
        this.dialogDelete = true
      },
      dialogDeleteComfireHandler() {
        this.isDel = true
        api.batchDelObj(this.multipleSelection).then(res => {
          this.isDel = false
          this.dialogDelete = false
          if (res.data.resultCode == '000000') {
            this.$message.success('删除成功')
            this.getList()
          }
        }, res => {
          this.isDel = false
          //this.$message.error(res.data.message);
        })
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false
      },
      toDel() {
        if (this.multipleSelection.length === 0) {
          this.$message.error('请您选择要删除的数据')
        } else {
          this.$confirm('该操作将会删除，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.isLoaded = true
            api.batchDelObj(this.multipleSelection).then(res => {
              if (res.data.resultCode == '000000') {
                this.$message.success('删除成功')
                this.getList()
              }
            }, res => {
              this.$message.error(res.data.message)
            })
          })
        }
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/safety/detailSchoolSecurityCheckResult/add/' + 0
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/safety/detailSchoolSecurityCheckResult/edit/' + id
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailSchoolSecurityCheckResult/detail/' + id
        this.$router.push({path: opath})
      }
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
