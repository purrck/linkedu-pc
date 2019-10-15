<template>
  <div class="CoursePlan">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
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
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju f12" @click="toTotal" style="color: #93BF88;"></i>
              </div>
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
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <div class="flex  row">
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.coursePlanId)"><i
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
import api from './courseplanUrl'
import commonApi from '@/api/common/common'

export default {
  data () {
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
      coursePlanCodeOptions: [{'label': '全部', 'name': ''}],
      coursePlanCodeValue: null,
      form: {},
      searchForm: {},
      data: '',
      multipleSelection: [],
      params: {
        page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
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

    commonApi.getCodeIntType('coursePlan').then(res => {
      let viewList = res.data.data || []
      for (let coursePlanItem of viewList) {
        this.coursePlanCodeOptions.push({
          'label': coursePlanItem.codeDesc,
          'name': coursePlanItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.coursePlanId
      })
    },
    handleSizeChange (size) {
      this.params.limit = size
      this.setCurrentPage(this.$route.fullPath, this.params)
      this.isLoaded = true
      this.getList()
    },
    handleCurrentChange (currentPage) {
      this.params.page = currentPage
      this.setCurrentPage(this.$route.fullPath, this.params)
      this.isLoaded = true
      this.getList()
    },
    // 分页按找正常序列开始
    typeIndex (index) {
      return index + this.params.limit * (this.params.page - 1) + 1
    },
    sortChange (obj) {
      this.params.orderByField = obj.prop
      this.params.isAsc = obj.order == 'ascending'
      this.setCurrentPage(this.$route.fullPath, this.params)
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
      this.params.page = 1
      for (let key in this.searchForm) {
        this.params[key] = this.searchForm[key]
      }
      this.isLoaded = true
      this.getList()
    },

    //删除表格当前行
    rowDel (id) {
      this.dialogDelete = true
      this.multipleSelection = [id]
    },
    //删除
    toTotal () {
      let opath = '/safety/CoursePlanTotal'
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
