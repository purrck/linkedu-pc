<template>
  <div class="SchoolSecurityCheckPlan">
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
          <el-form-item label="巡检周期:" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.frequencyTypeCode" placeholder="请您选择">
              <el-option v-for="frequencyTypeCodeItem in frequencyTypeCodeOptions"
                         :key="frequencyTypeCodeItem.name"
                         :label="frequencyTypeCodeItem.label" :value="frequencyTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人:" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.userName" maxlength="30" placeholder="负责人"></el-input>
          </el-form-item>
          <!--<el-form-item label="创建人:" class="w140">-->
            <!--<el-input class="input-v2-rao" v-model="searchForm.routeName" maxlength="30" placeholder="创建人"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="关键词:" class="w140">-->
            <!--<el-input class="input-v2-rao" v-model="searchForm.adminDepartName" maxlength="30" placeholder="关键词"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="巡检时间:" class="w280">
            <el-date-picker v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm" type="daterange" range-separator="至"
                            placeholder="实际巡检日期"></el-date-picker>
          </el-form-item>

          <el-form-item >
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
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i>
              </div>
            </div>
            <el-button type="primary" size="small" class="button-v2-rao el-button--small-icon b93BF88 " @click="toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>

            <el-button type="primary" size="small" class="button-v2-rao el-button--small-icon bFA6557" :disabled="!multipleSelection.length > 0" @click="toDel">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>

          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true" @sort-change="sortChange">
            <el-table-column align="center" type="selection" width="65" ></el-table-column>
            <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="65"></el-table-column>
            <!--<el-table-column align="center" prop="routeName" label="巡检计划" sortable="custom">-->
              <!--<template slot-scope="scope">-->
                <!--<div v-if="scope.row.routeName" class="one-line">{{scope.row.routeName}}</div>-->
                <!--<div v-else>无</div>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" prop="routeName" label="巡检路线" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.routeName" class="one-line">{{scope.row.routeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="frequencyTypeCode" label="巡检周期" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.frequencyTypeCode === 'day'" class="one-line">日</div>
                <div v-else-if="scope.row.frequencyTypeCode === 'week'" class="one-line">周</div>
                <div v-else-if="scope.row.frequencyTypeCode === 'month'" class="one-line">月</div>
                <div v-else-if="scope.row.frequencyTypeCode === 'week'" class="one-line">年</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="userName" label="路线负责人" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.userName" class="one-line">{{scope.row.userName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="planStartDt" label="开始时间" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.planStartDt" class="one-line">{{scope.row.planStartDt}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="planEndDt" label="结束时间" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.planEndDt" class="one-line">{{scope.row.planEndDt}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="planedUserName" label="创建人" sortable="custom"></el-table-column>
            <el-table-column align="center" prop="planedDt" label="创建时间" sortable="custom"></el-table-column>
            <el-table-column align="center" label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                  <span slot="reference" @click.stop="toEdit(scope.row.checkPlanId)"><i class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.checkPlanId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.checkPlanId)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
                <!---->
                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="安全巡检结果" trigger="hover">-->
                  <!--<span slot="reference" @click.stop="toAnother(scope.row.checkPlanId ,`listSchoolSecurityCheckResult`)"><i class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>-->
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
          <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="dialogDeleteComfireHandler" :loading="isDel">是</el-button>
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
import api from './schoolsecuritycheckplanUrl'
import commonApi from '@/api/common/common'
import {getTheSchoolInspectionPoint, getTheSchoolRoute} from '@/api/basedata/schoolBaseApi'

export default {
  data () {
    return {
      options1: [{'label': '全部', 'value': ''}],
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
      frequencyTypeCodeOptions: [{'label': '全部', 'name': ''}],
      frequencyTypeCodeValue: null,
      checkPlanStatusCodeOptions: [{'label': '全部', 'name': ''}],
      checkPlanStatusCodeValue: null,
      form: {
        checkPlanId: null,
        routeName: null,
        adminDepartName: null,
        userName: null,
        frequencyTypeCodeValue: null,
        checkPlanStatusCodeValue: null,
      },
      searchForm: {
        daterange:'',
        userName:'',
        frequencyTypeCode:'',
        checkRouteId:'',

        // checkPlanId: '',
        // routeName:  '',
        // adminDepartName:  '',
        // userName:  '',
        // frequencyTypeCodeValue:  '',
        // checkPlanStatusCodeValue:  '',

      },
      data: '',
      multipleSelection: [],
      params: {   //接口参数
         page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
        checkPlanId: null,
        routeName: null,
        adminDepartName: null,
        userName: null,
        frequencyTypeCode: null,
        checkPlanStatusCode: null,

      }
    }
  },
  computed: {
    indexMethod () {
      return (this.params.limit * (this.params.page - 1)) + 1
    }
  },
  created () {
    //let schoolId = this.$route.query.schoolOrgId;
    //this.params.schoolId = schoolId;
  },
  mounted () {
    this.getCurrentPage(this.$route.fullPath, this.params)
    this.getList()

    getTheSchoolRoute().then(res => {
      this.options1 = this.options1.concat(this.coverData(res.data.data, 'routeName', 'checkRouteId'))
    })

    commonApi.getCodeIntType('frequencyType').then(res => {
      let viewList = res.data.data || []
      for (let frequencyTypeItem of viewList) {
        this.frequencyTypeCodeOptions.push({
          'label': frequencyTypeItem.codeDesc,
          'name': frequencyTypeItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('checkPlanStatus').then(res => {
      let viewList = res.data.data || []
      for (let checkPlanStatusItem of viewList) {
        this.checkPlanStatusCodeOptions.push({
          'label': checkPlanStatusItem.codeDesc,
          'name': checkPlanStatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
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
    coverData (originData, label, value) {
      let data = originData || []
      return data.map(item => {
        return {
          label: item[label],
          value: item[value]
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.checkPlanId
      })
    },
    handleSizeChange (size) {
      this.params.limit = size
      this.isLoaded = true
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.setCurrentPage(this.$route.path, currentPage)
      this.params.page = currentPage
      this.isLoaded = true
      this.getList()
    },
    // 分页按找正常序列开始
    typeIndex (index) {
      return index + this.params.limit * (this.params.page - 1) + 1
    },
    sortChange (obj) {
      this.params.orderByField = obj.prop
      this.params.isAsc = obj.order == 'ascending' ? true : false
      this.isLoaded = true
      this.getList()
    },
    getList () {
      api.fetchList(this.params).then(res => {
        this.data = res.data.data
        this.isLoaded = false
      }, res => {
        this.$message.error(res.message)
      })
    },

    search () {
      this.params.page = 1;
      for (let key in this.searchForm) {
        this.params[key] = typeof this.searchForm[key] !== 'object' && this.searchForm[key]
      }
      this.params.startTime = this.searchForm.daterange && this.searchForm.daterange[0];
      this.params.endTime = this.searchForm.daterange && this.searchForm.daterange[1];
      // console.log(this.searchForm.daterange[0]+'0000000000000000000000000000')
      this.isLoaded = true
      this.getList()
    },

    //删除表格当前行
    rowDel (id) {
      this.dialogDelete = true
      this.multipleSelection = [id]
    },
    //删除
    del () {
      if (this.$refs.schooltable.selection.length == 0) {
        this.msgShow = true
        setTimeout(() => {
          this.msgShow = false
        }, 800)
        return
      }
      this.dialogDelete = true
    },
    dialogDeleteComfireHandler () {
      this.isDel = true
      api.schoolSecurityCheckPlanAd(this.multipleSelection).then(res => {
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
    dialogDeleteCancelHandler () {
      this.dialogDelete = false
    },
    toDel () {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请您选择要删除的数据')
      } else {
        this.$confirm('该操作将会删除x，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoaded = true
          api.schoolSecurityCheckPlanAd(this.multipleSelection).then(res => {
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
    toAdd () {
      //safety safetyEdu basedata
      let opath = '/safety/detailSchoolSecurityCheckPlan/add/' + 0
      this.$router.push({path: opath})
    },
    toEdit (id) {
      let opath = '/safety/detailSchoolSecurityCheckPlan/edit/' + id
      this.$router.push({path: opath})
    },
    toDetail (id) {
      let opath = '/safety/detailSchoolSecurityCheckPlan/detail/' + id
      this.$router.push({path: opath})
    },
    toAnother (id, path) {
      let opath = '/safety/' + path + '+?checkPlanId=' + id;
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
