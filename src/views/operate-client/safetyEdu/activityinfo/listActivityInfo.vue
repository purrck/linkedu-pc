<template>
  <div class="ActivityInfo">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="">
          <el-form-item label="标题" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.topic" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="类型" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.securityEducationTypeCode" placeholder="请选择">
              <el-option
                v-for="item in actypeCodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.acstatus" placeholder="请选择">
              <el-option
                v-for="item in acstatusCodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="至" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm" type="date" placeholder="结束日期" ></el-date-picker>
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
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju f12" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao bFFB54C" @click="tingyong" :disabled="!multipleSelection.length">
              <i class="iconfont icon-icon_tc_tingyong f12 cfff"></i> 停用
            </el-button>

            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
              <i class="iconfont icon-icon_tianjia f12 cfff"></i> 新建
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toQie">
              <i class="iconfont icon-icon_liebiao f12 cfff"></i> 切换
            </el-button>
          </el-col>
        </el-row>

        <el-row v-show="showTable" class="card-box" style="margin-right: -20px;" >
          <el-col :span="4"  v-for="(item,index) in data.records" :key="index"   class="spick">
            <el-card class="card" :body-style="{ padding: '0px'}">
              <div>
                <div class="img-box">
                  <img :src="item.imagePath && item.imagePath.split(',')[0]"  ALT="."/>
                </div>
                <div class="card-content-box">
                  <div style="padding:  0 15px">
                    <div class="card-title c93BF88">{{item.topic}}</div>
                    <div class="card-other flex row space-between">
                      <span class="card-time c93BF88"><i class="iconfont icon-icon_time1"></i>{{item.createdDt}}</span>
                      <span class="card-status">{{item.actypeCodeCodeStr&&item.actypeCodeCodeStr.split(';')[0]}}</span>
                    </div>
                    <div class="card-type">
                      <span>活动分类: </span>
                      <span v-if="item.acstatusCodeStr">{{item.acstatusCodeStr.split(';')[0]}}</span>
                    </div>
                  </div>
                  <div class="bottom clearfix">
                    <div class="pull-center">
                      <!--<el-button type="" size="mini" class="mt10" @click="toDetail(item.id)">查看</el-button>
                      <el-button type="" size="mini" class="mt10" v-if="item.acstatusCode == 'b'" @click="rowJingyong(item.id)">停用</el-button>
                      <el-button type="" size="mini" class="mt10" @click="toEdit(item.id)">编辑</el-button>
                      <el-button type="" size="mini" class="mt10" v-if="item.acstatusCode == 'a'" @click="shenhe(item.id)">审核</el-button>
                      <el-button type="" size="mini" class="mt10" @click="rowDel(item.id)">删除</el-button>-->

                      <el-button v-show="item.acstatusCode == 'published' || item.acstatusCode == 'finished' || item.acstatusCode == 'rejected' || item.acstatusCode == 'opening' || item.acstatusCode == 'editing' || item.acstatusCode == 'approving'" type="" size="mini" class="mt10" @click="toDetail(item.id)">查看</el-button>
                      <el-button v-show="item.acstatusCode == 'published' || item.acstatusCode == 'opening'" type="" size="mini" class="mt10" @click="rowJingyong(item.id)">停用</el-button>
                      <el-button v-show="item.acstatusCode == 'rejected' || item.acstatusCode == 'editing'" type="" size="mini" class="mt10" @click="toEdit(item.id)">编辑</el-button>
                      <el-button v-show="item.acstatusCode == 'approving'" type="" size="mini" class="mt10" @click="shenhe(item.id)">审核</el-button>
                      <el-button v-show="item.acstatusCode == 'finished' || item.acstatusCode == 'rejected' || item.acstatusCode == 'editing'" type="" size="mini" class="mt10" @click="rowDel(item.id)">删除</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div v-show="!showTable" class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="topic" align="center" label="活动标题" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.topic" class="one-line">{{scope.row.topic}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="actypeCode" label="活动类型" align="center" sortable="custom">
              <template slot-scope="scope">
                <span :style="{color:scope.row.securityEducationTypeCodeStr.split(';')[1]}" v-if="scope.row.securityEducationTypeCodeStr">{{scope.row.securityEducationTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="createdDt" label="发布时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="userName" label="发布人" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="acstatusCode" label="状态" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.acstatusCodeStr" :style="{color: scope.row.acstatusCodeStr.split(';')[1]}">{{scope.row.acstatusCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <div class="flex  row">

                  <el-popover v-show="scope.row.acstatusCode == 'reject' || scope.row.acstatusCode == 'editing'" placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.id)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover v-show="scope.row.acstatusCode == 'pass' || scope.row.acstatusCode == 'available' || scope.row.acstatusCode == 'published' || scope.row.acstatusCode == 'finished' || scope.row.acstatusCode == 'reject' || scope.row.acstatusCode == 'opening' || scope.row.acstatusCode == 'editing' || scope.row.acstatusCode == 'approving'" placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.id)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.acstatusCode == 'finished' || scope.row.acstatusCode == 'reject' || scope.row.acstatusCode == 'editing'" placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.id)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.acstatusCode == 'approving'" placement="top-start" popper-class="popover-v2-rao" title="审核" trigger="hover">
                    <span slot="reference"
                        @click.stop="shenhe(scope.row.id)"><i
                    class="iconfont icon-icon_shenhe ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.acstatusCode == 'pass' || scope.row.acstatusCode == 'available' || scope.row.acstatusCode == 'published' || scope.row.acstatusCode == 'opening'" placement="top-start" popper-class="popover-v2-rao" title="停用" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowJingyong(scope.row.id)"><i
                    class="iconfont icon-icon_tc_tingyong ml5 f20 c999999"></i></span>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right mt15">
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
          <p class="text-center fs-16 color333 mt-20">是否停用?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="button-v2-rao border-color-cccccc c000000 bfff" @click="dialogTingyongComfireHandler" :loading="loadingTingyong">是</el-button>
          <el-button type="primary" class="button-v2-rao b93BF88" @click="dialogTingyongCancelHandler">否</el-button>
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
import api from './activityinfoUrl'
import commonApi from '@/api/common/common'

export default {
  data () {
    return {
      optionsList: [
        {
          label: '测试',
          value: 'test'
        }
      ],
      dialogTingyong : false,
      loadingTingyong : false,
      isLoaded: true,
      showTable: false,
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
      actypeCodeOptions: [{'label': '全部', 'name': ''}],
      actypeCodeValue: null,
      acstatusCodeOptions: [{'label': '全部', 'name': ''}],
      acstatusCodeValue: null,
      ynOptions: [{'label': '全部', 'name': ''}],
      ynValue: null,
      publicServiceCodeOptions: [{'label': '全部', 'name': ''}],
      publicServiceCodeValue: null,
      virtualCurrencyCodeOptions: [{'label': '全部', 'name': ''}],
      virtualCurrencyCodeValue: null,
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
  activated() {
    //只刷新数据，不改变整体的缓存
    // console.log('重新活跃路由');
    let query = this.$route.query;
    for (let item in query) {
      this.params[item] = query[item]
    }
    this.getList()
  },
  created () {
    //let schoolId = this.$route.query.schoolOrgId;
    //this.params.schoolId = schoolId;
  },
  mounted () {
    this.getCurrentPage(this.$route.fullPath, this.params)
    this.getList()
    commonApi.getCourseType().then(res=>{
      let resData = res.data.data
    })
    commonApi.getCodeIntType('securityEducationType').then(res => {
      let viewList = res.data.data || []
      for (let actypeItem of viewList) {
        this.actypeCodeOptions.push({
          'label': actypeItem.codeDesc,
          'name': actypeItem.codeId
        })
      }
    });
    commonApi.getCodeIntType('acstatus').then(res => {
      let viewList = res.data.data || []
      for (let acstatusItem of viewList) {
        this.acstatusCodeOptions.push({
          'label': acstatusItem.codeDesc,
          'name': acstatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('boolean_yn').then(res => {
      let viewList = res.data.data || []
      for (let ynItem of viewList) {
        this.ynOptions.push({
          'label': ynItem.codeDesc,
          'name': ynItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('publicService').then(res => {
      let viewList = res.data.data || []
      for (let publicServiceItem of viewList) {
        this.publicServiceCodeOptions.push({
          'label': publicServiceItem.codeDesc,
          'name': publicServiceItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('virtualCurrency').then(res => {
      let viewList = res.data.data || []
      for (let virtualCurrencyItem of viewList) {
        this.virtualCurrencyCodeOptions.push({
          'label': virtualCurrencyItem.codeDesc,
          'name': virtualCurrencyItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
  },
  methods: {
    rowJingyong(id){
        this.dialogTingyong = true;
        this.multipleSelection = [id];

      },
    dialogTingyongComfireHandler(){
      if(this.$refs.schooltable.selection.some(item => {
        return item.acstatusCode != "opening"
      })){
        this.$message.error("只有已发布才可以停用");
        return
      }

      this.loadingTingyong = true;
      api.updateStatusByActivityIdSet({
            activityIdSet : this.multipleSelection,
            enabled : false
          }).then(res => {
        this.isDel = false;
        this.dialogDelete = false;
        if (res.data.resultCode == "000000") {
          this.$message.success("停用成功");
          this.getList();
          this.dialogTingyong = false;
        }
        this.loadingTingyong = false;
      }, res => {
              this.SET_IS_LOADING(false);

              this.$message.error(res.message);
            })
    },
    dialogTingyongCancelHandler(){
      this.dialogTingyong = false;
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.id
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
        if(!res.data.hasOwnProperty("data")){
          res.data['data']= {"total":0,"size":10,"pages":0,"current":1,"records":[]}
        }

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
        }else{
          this.$message.error(res.data.message)
        }
      })
      this.isDel = false

    },
    dialogDeleteCancelHandler () {
      this.dialogDelete = false
    },
    tingyong(){
      if (this.$refs.schooltable.selection.length === 0) {
        this.msgShow = true;
        setTimeout(() => {
          this.msgShow = false;
        }, 800)
        return;
      }
      this.dialogTingyong = true;
    },
    toQie () {
      this.showTable = !this.showTable
    },
    toAdd () {
      //safety safetyEdu basedata
      let opath = '/safetyEdu/detailActivityInfoOp/add/' + 0
      this.$router.push({path: opath})
    },
    toTotal () {
      let opath = '/safetyEdu/ActivityInfoTotal'
      this.$router.push({path: opath})
    },
    toEdit (id) {
      let opath = '/safetyEdu/detailActivityInfoOp/edit/' + id
      this.$router.push({path: opath})
    },
    shenhe (id) {
      let opath = '/safetyEdu/detailActivityInfoOp/check/' + id
      this.$router.push({path: opath})
    },
    toDetail (id) {
      let opath = '/safetyEdu/detailActivityInfoOp/detail/' + id
      this.$router.push({path: opath})
    },
    check (id) {
      let opath = '/safetyEdu/detailActivityInfoOp/check/' + id
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
