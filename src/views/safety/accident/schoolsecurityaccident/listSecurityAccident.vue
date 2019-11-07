<template>
  <div class="SecurityAccident">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="">
          <el-form-item label="事故标题:" prop="accidentTitle" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.accidentTitle" maxlength="30" placeholder="请输入事故标题"></el-input>
          </el-form-item>
          <el-form-item label="事故地点:" prop="happenedAddress" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.happenedAddress" maxlength="30" placeholder="请输入事故地点"></el-input>
          </el-form-item>

          <el-form-item label="事故类型:" prop="accidentTypeCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.accidentTypeCode" placeholder="请您选择">
              <el-option v-for="accidentTypeCodeItem in accidentTypeCodeOptions"
                         :key="accidentTypeCodeItem.name"
                         :label="accidentTypeCodeItem.label" :value="accidentTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事故级别" class="w140">
            <el-select v-model="searchForm.accidentLevelCode" placeholder="请选择事故级别">
              <el-option
                v-for="item in accidentLevelCodeOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="事故状态" class="w140">
            <el-select v-model="searchForm.accidentStatusCode" placeholder="请选择事故状态">
              <el-option
                v-for="item in accidentStatusCodeOptions"
                :key="item.name"
                :label="item.label"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <!--<el-form-item label="事故影响范围" class="w140">-->
            <!--<el-select v-model="searchForm.accidentInfluenceCode" placeholder="请选择事故范围">-->
              <!--<el-option-->
                <!--v-for="item in optionsList4"-->
                <!--:key="item.name"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="上报时间:" prop="effectiveDt" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.effectiveDt" type="date"
                            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="处理截止时间:" prop="expiryDt" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.expiryDt" type="date"
                            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <!--<el-form-item label="事故类型:" prop="accidentTypeCode">-->
          <!--<el-select class="select-v2-rao" v-model="searchForm.accidentTypeCode" placeholder="请您选择">-->
          <!--<el-option v-for="accidentTypeCodeItem in accidentTypeCodeOptions"-->
          <!--:key="accidentTypeCodeItem.name"-->
          <!--:label="accidentTypeCodeItem.label" :value="accidentTypeCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="事故状态:" prop="accidentStatusCode">-->
          <!--<el-select class="select-v2-rao" v-model="searchForm.accidentStatusCode" placeholder="请您选择">-->
          <!--<el-option v-for="accidentStatusCodeItem in accidentStatusCodeOptions"-->
          <!--:key="accidentStatusCodeItem.name"-->
          <!--:label="accidentStatusCodeItem.label" :value="accidentStatusCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
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
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju f12" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
            <!--<el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">-->
            <!--<i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length > 0">-->
            <!--<i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除-->
            <!--</el-button>-->
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="accidentTitle" align="center" label="事故标题" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.accidentTitle" class="one-line">{{scope.row.accidentTitle}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="effectiveDt" label="上报时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="expiryDt" label="处理截止时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="accidentTypeCode" label="事故类型" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.accidentTypeCodeStr.split(';')[1]}"
                                  v-if="scope.row.accidentTypeCodeStr">{{scope.row.accidentTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="accidentLevelCode" label="事故级别" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.accidentLevelCodeStr.split(';')[1]}"
                                  v-if="scope.row.accidentLevelCodeStr">{{scope.row.accidentLevelCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="happenedAddress" align="center" label="发生地点" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.happenedAddress" class="one-line">{{scope.row.happenedAddress}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="accidentStatusCode" label="事故状态" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.accidentStatusCodeStr.split(';')[1]}"
                                  v-if="scope.row.accidentStatusCodeStr">{{scope.row.accidentStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.accidentId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="事故人员名单" trigger="hover">
                      <span slot="reference" @click.stop="toAnother(`/safety/listSecurityAccidentStudent?accidentId=${scope.row.accidentId}&accidentTitle=${scope.row.accidentTitle}`)"><i
                        class="iconfont icon-icon_mingdan ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="事故处理" trigger="hover">
                      <span slot="reference" @click.stop="toAnother(`/safety/listSecurityAccidentProcess?accidentId=${scope.row.accidentId}&accidentTitle=${scope.row.accidentTitle}`)"><i
                        class="iconfont icon-icon_gerenziliao_p ml5 f20 c999999"></i></span>
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
import api from './schoolsecurityaccidentUrl'
import commonApi from '@/api/common/common'
import {coverData} from '@/util/util'

export default {
  data () {
    return {
      optionsList1: [{label: '测试', value: 'test'}],
      optionsList2: [{label: '测试', value: 'test'}],
      optionsList3: [{label: '测试', value: 'test'}],
      optionsList4: [{'label': '全部', 'value': ''}],
      // optionsList4: [{label: '测试', value: 'test'}],
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
      accidentTypeCodeOptions: [{'label': '全部', 'name': ''}],
      accidentTypeCodeValue: null,
      accidentLevelCodeOptions: [{'label': '全部', 'name': ''}],
      accidentLevelCodeValue: null,
      accidentStatusCodeOptions: [{'label': '全部', 'name': ''}],
      accidentStatusCodeValue: null,
      form: {
        accidentId: null,
        accidentTitle: null,
        effectiveDt: null,
        accidentTypeCodeValue: null,
        accidentLevelCodeValue: null,
        accidentStatusCodeValue: null,
      },
      searchForm: {
        accidentInfluenceCode: '',
        accidentId: null,
        accidentTitle: null,
        effectiveDt: null,
        accidentTypeCode: null,
        accidentLevelCode: null,
        accidentStatusCode: null,
      },
      data: '',
      multipleSelection: [],
      params: {
        page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
        accidentId: null,
        accidentTitle: null,
        effectiveDt: null,
        accidentTypeCode: null,
        accidentLevelCode: null,
        accidentStatusCode: null,
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

    commonApi.getCodeIntType('accidentType').then(res => {
      let viewList = res.data.data || []
      for (let accidentTypeItem of viewList) {
        this.accidentTypeCodeOptions.push({
          'label': accidentTypeItem.codeDesc,
          'name': accidentTypeItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('accidentLevel').then(res => {
      let viewList = res.data.data || []
      for (let accidentLevelItem of viewList) {
        this.accidentLevelCodeOptions.push({
          'label': accidentLevelItem.codeDesc,
          'name': accidentLevelItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('accidentStatus').then(res => {
      let viewList = res.data.data || []
      for (let accidentStatusItem of viewList) {
        this.accidentStatusCodeOptions.push({
          'label': accidentStatusItem.codeDesc,
          'name': accidentStatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('accidentInfluence').then(res => {
      // this.optionsList4 = coverData(res.data.data, 'codeDesc', 'codeId')
      this.optionsList4 = this.optionsList4.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
    })
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.accidentId
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
      // console.log(this.searchForm);
      this.isLoaded = true
      this.getList()
    },

    //删除表格当前行
    rowDel (id) {
      this.dialogDelete = true
      this.multipleSelection = [id]
    },
    //删除
    toDel () {
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
      api.batchDelObj(this.multipleSelection).then(res => {
        this.isDel = false
        this.dialogDelete = false
        if (res.data.resultCode == '000000') {
          this.$message.success('删除成功')
          this.getList()
        }
      })
      this.isDel = false

    },
    dialogDeleteCancelHandler () {
      this.dialogDelete = false
    },
    toAdd () {
      //safety safetyEdu basedata
      let opath = '/safety/detailSecurityAccidentadd/' + 0
      this.$router.push({path: opath})
    },
    toTotal () {
      let opath = '/safety/SecurityAccidentTotal'
      this.$router.push({path: opath})
    },
    toEdit (id) {
      let opath = '/safety/detailSecurityAccidentedit/' + id
      this.$router.push({path: opath})
    },
    toDetail (id) {
      let opath = '/safety/detailSecurityAccidentdetail/' + id
      this.$router.push({path: opath})
    },
    toAnother (path) {
      this.$router.push({path})
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
