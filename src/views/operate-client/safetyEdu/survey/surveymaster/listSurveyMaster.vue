<template>
  <div class="SurveyMaster">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" >
          <el-form-item label="名称:" prop="surveyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.surveyName" maxlength="30"
                      placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="分类:" prop="surveyId" class="w140">
            <el-select v-model="searchForm.surveyType" placeholder="请选择分类">
              <el-option
                v-for="item in optionsList1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" prop="surveyId" class="w140">
            <el-select v-model="searchForm.marketStatus" placeholder="请选择状态">
              <el-option
                v-for="item in optionsList2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期范围:" prop="surveyId" class="w280">
            <el-date-picker class="date-v2-rao" v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm"
                            type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            placeholder="请输入日期"></el-date-picker>
          </el-form-item>
          <!--<el-form-item label="至:" prop="surveyId" class="w140">-->
          <!--<el-date-picker class="date-v2-rao" v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm" type="date"-->
          <!--placeholder="请输入日期"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="发布人" class="w140">-->
          <!--<el-input v-model="searchForm.userName" placeholder="请输入发布人"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="发布对象:" prop="surveyId">-->
          <!--<el-select v-model="searchForm.model" placeholder="请输入标题">-->
          <!--<el-option-->
          <!--v-for="item in optionsList"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
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

            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel"
                       :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao bFFB54C"
                       @click="tingyong" :disabled="!multipleSelection.length">
              <i class="iconfont icon-icon_tc_tingyong f12 cfff"></i> 停用
            </el-button>

            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="toAdd">
              <i class="iconfont icon-icon_tianjia f12 cfff"></i> 新建
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="toQie">
              <i class="iconfont icon-icon_liebiao f12 cfff"></i> 切换
            </el-button>
          </el-col>
        </el-row>
        <el-row v-show="!showTable" class="card-box" style="margin-right: -20px;">
          <el-col :span="4" v-for="(item,index) in data.records" :key="index" class="spick">
            <el-card class="card" :body-style="{ padding: '0px'}">
              <div>
                <div class="img-box">
                  <img :src="item.imagePath" ALT="."/>
                </div>
                <div class="card-content-box">
                  <div style="padding:  0 15px">
                    <div class="card-title c93BF88">{{item.surveyName}}</div>
                    <div class="card-other flex row space-between">
                      <span class="card-time c93BF88"><i class="iconfont icon-icon_time1"></i>{{item.updatedDt}}</span>
                      <span class="card-status">{{item.status}}</span>
                    </div>
                    <div class="card-type">
                      <span>问卷分类: </span>
                      <span v-if="item.surveyType">{{item.surveyType}}</span>
                    </div>
                  </div>
                  <div class="bottom clearfix">
                    <div class="pull-center">
                      <el-button type="" size="mini" class="mt10" @click="toDetail(item.entityOrgId)">查看</el-button>
                      <el-button type="" size="mini" class="mt10" v-if="item.acstatusCode == 'b'"
                                 @click="rowJingyong(item.entityOrgId)">停用
                      </el-button>
                      <el-button type="" size="mini" class="mt10" @click="toEdit(item.entityOrgId)">编辑</el-button>
                      <el-button type="" size="mini" class="mt10" v-if="item.acstatusCode == 'a'"
                                 @click="shenhe(item.entityOrgId)">审核
                      </el-button>
                      <el-button type="" size="mini" class="mt10" @click="rowDel(item.entityOrgId)">删除</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div v-show="showTable" class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="surveyName" align="center" label="问卷标题" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.surveyName" class="one-line">{{scope.row.surveyName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="surveyType" align="center" label="分类" sortable="custom">
            </el-table-column>
            <el-table-column prop="updatedDt" align="center" label="发布时间" sortable="custom">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.statusStr" :style="{color: scope.row.statusStr.split(';')[1]}">
                  {{scope.row.statusStr.split(';')[0]}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.surveyId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover"
                            v-if="(scope.row.status.includes('2')) || scope.row.status.includes('3')">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.surveyId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover"
                            v-if="(scope.row.status.includes('2')) || scope.row.status.includes('3') || scope.row.status.includes('5')">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.surveyId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="停用" trigger="hover"
                            v-if="scope.row.status.includes('4')">
                  <span slot="reference"
                        @click.stop="disabledItem(scope.row.surveyId)"><i
                    class="iconfont icon-icon_tingyong_bai_ca ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="审核" trigger="hover"
                            v-if="scope.row.status.includes('1')">
                  <span slot="reference"
                        @click.stop="toCheck(scope.row.surveyId)"><i
                    class="iconfont icon-mingdan ml5 f20 c999999"></i></span>
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

      <el-dialog title="" :visible.sync="dialogTingyong" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否确认停用?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="dialogDisabledHandle"
                     :loading="isDel">是
          </el-button>
          <el-button type="primary" class="b93BF88" @click="dialogTingyong = false">否</el-button>
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
  import api from './surveymasterUrl'
  import commonApi from '@/api/common/common'
  import {coverData} from '@/util/util'

  export default {
    data() {
      return {
        dialogTingyong: false,
        optionsList1: [],
        optionsList2: [],
        optionsList: [
          {label: '测试数据', value: 'test'}
        ],
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        showTable: true,
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
        form: {
          surveyId: null,
        },
        searchForm: {
          surveyId: null,
          daterange: [],
          surveyType: '',
          marketStatus: ''
        },
        data: '',
        multipleSelection: [],
        params: {
           page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          surveyId: null,
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      // alert(2);
      //let schoolId = this.$route.query.schoolOrgId;
      //this.params.schoolId = schoolId;
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
      commonApi.getCodeIntType('surveyType').then(res => {
        this.optionsList1 = coverData(res.data.data, 'codeDesc', 'codeId')
      })
      commonApi.getCodeIntType('marketStatus').then(res => {
        this.optionsList2 = coverData(res.data.data, 'codeDesc', 'codeId')
        this.optionsList2.forEach(item => {
          item.label = item.label.split(';')[0]
        })
      })
      this.getList()

    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.surveyId
        })
      },
      handleSizeChange(size) {
        this.params.limit = size
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true
        this.getList()
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true
        this.getList()
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop
        this.params.isAsc = obj.order == 'ascending'
        this.setCurrentPage(this.$route.fullPath, this.params)
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
        this.params.page = 1
        for (let key in this.searchForm) {
          this.params[key] = typeof this.searchForm[key] !== 'object' && this.searchForm[key]
        }
        this.params.timeStart = this.searchForm.daterange && this.searchForm.daterange[0]
        this.params.timeEnd = this.searchForm.daterange && this.searchForm.daterange[1]
        this.isLoaded = true
        this.getList()
      },

      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true
        this.multipleSelection = [id]
      },
      //删除
      toDel() {
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
        })
        this.isDel = false

      },
      disabledItem(id) {
        this.dialogTingyong = true
        this.multipleSelection = [id]
      },
      tingyong() {
        if (this.$refs.schooltable.selection.length === 0) {
          this.msgShow = true
          setTimeout(() => {
            this.msgShow = false
          }, 800)
          return
        }
        this.dialogTingyong = true
      },
      toQie() {
        this.showTable = !this.showTable
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/safetyEdu/detailSurveyMasterOp/add/' + 0
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/safetyEdu/SurveyMasterTotal'
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/safetyEdu/editSurveyMasterOp/' + id
        console.log(opath)
        this.$router.push({path: opath, query: {id}})
      },
      toDetail(id) {
        let opath = '/safetyEdu/detailSurveyMasterOp/detail/' + id
        this.$router.push({path: opath})
      },
      toCheck(id) {
        let opath = '/safetyEdu/detailSurveyMasterOp/check/' + id
        this.$router.push({path: opath})
      },
      dialogDisabledHandle() {
        api.disabled(this.multipleSelection).then(res => {
          console.log(res)
          if (res.data.resultCode === '000000') {
            this.getList()
            this.dialogTingyong = false
            this.$message.success('停用成功')
          } else {
            this.$message.error(res.data.message)
          }
        })
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
