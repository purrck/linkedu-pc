<template>
  <div class="OrgSchoolCalendar">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="机构校历:" prop="calendarId">
            <el-input class="input-v2-rao" v-model="searchForm.calendarId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学校机构:" prop="schoolOrgId">
            <el-input class="input-v2-rao" v-model="searchForm.schoolOrgName" maxlength="30"></el-input>
          </el-form-item>


<!--          <el-form-item label="学段:" prop="segmentId">-->
<!--            <el-input class="input-v2-rao" v-model="searchForm.segmentId" maxlength="30"></el-input>-->
<!--          </el-form-item>


@change="changeSeg"

-->
          <el-form-item label="学段:" prop="segmentId" class="w140">
            <el-select v-model="searchForm.segmentId" placeholder="请选择学段" @change="changeSeg">
              <el-option
                v-for="item in optionsList2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="gradeId" class="w140">
            <el-select v-model="searchForm.gradeId" placeholder="请选择年级">
              <el-option
                v-for="item in optionsList3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="年级:" prop="gradeId">-->
<!--            <el-input class="input-v2-rao" v-model="searchForm.gradeId" maxlength="30"></el-input>-->
<!--          </el-form-item>-->



<!--          <el-form-item label="学年:" prop="schoolYear">-->
<!--            <el-input class="input-v2-rao" v-model="searchForm.schoolYear" maxlength="30"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="学期:" prop="gradeId" class="w140">
            <el-select v-model="searchForm.schoolTerm" placeholder="请选择年级">
              <el-option
                v-for="item in term"
                :key="item.value"
                :label="item.codeDesc"
                :value="item.codeId">
              </el-option>
            </el-select>
          </el-form-item>

<!--          <el-form-item label="学期:" prop="schoolTerm">-->
<!--            <el-input class="input-v2-rao" v-model="searchForm.schoolTerm" maxlength="30"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="开始日期:" prop="effectiveDt">
            <el-date-picker class="date-v2-rao" v-model="searchForm.startTime" type="date"
                            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期:" prop="expiryDt">
            <el-date-picker class="date-v2-rao" v-model="searchForm.endTime" type="date"
                            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
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
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju f12" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
            <!--<el-button type="primary" size="small" class="el-button&#45;&#45;small-icon  button-v2-rao b93BF88 " @click= "toAdd">-->
              <!--<i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="small" class="el-button&#45;&#45;small-icon button-v2-rao bFA6557" @click="toDel"-->
                       <!--:disabled="!multipleSelection.length > 0">-->
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
            <el-table-column prop="schoolOrgName" label="学校" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="segmentName" label="学段" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="gradeName" align="center" label="年级" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.gradeName" class="one-line">{{scope.row.gradeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="schoolYear" label="年次" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.schoolYear">{{scope.row.schoolYear}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="schoolTermStr" label="学期" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.schoolTermStr">{{scope.row.schoolTermStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="weekSchoolTerm" label="学期周次" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.weekSchoolTerm">{{scope.row.weekSchoolTerm}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="effectiveDt" label="学期开始" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.effectiveDt">{{scope.row.effectiveDt}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="expiryDt" label="学期结束" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.expiryDt">{{scope.row.expiryDt}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="calendarTypeCodeStr" label="类型" align="center" sortable="custom">
              <template slot-scope="scope">
                <span v-if="scope.row.calendarTypeCodeStr" :style="{color: scope.row.calendarTypeCodeStr.split(';')[1]}">{{scope.row.calendarTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
              <template slot-scope="scope">
                <div class="flex  row">

                  <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">-->
                    <!--<span slot="reference"-->
                          <!--@click.stop="toEdit(scope.row.calendarId)"><i-->
                      <!--class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>-->
                  <!--</el-popover>-->

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.calendarId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="日程安排" trigger="hover">
                    <span slot="reference"
                          @click.stop="toSchedule(scope.row)"><i
                      class="iconfont icon-icon_time1-copy ml5 f20 c999999"></i></span>
                  </el-popover>

<!--                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">-->
<!--                  <span slot="reference"-->
<!--                        @click.stop="rowDel(scope.row.calendarId)"><i-->
<!--                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>-->
<!--                  </el-popover>-->

                  <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="机构校历详细安排" trigger="hover">-->
                  <!--<span slot="reference"-->
                  <!--@click.stop="toAnother(scope.row.calendarId ,``)"><i-->
                  <!--class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>-->
                  <!--</el-popover>-->
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
import api from './orgschoolcalendarUrl'
import commonApi from '@/api/common/common'
import {coverData} from "../../../util/util";
//学校端 日历
export default {
  data () {
    return {
      optionsList2: [{'label': '全部', 'name': ''}],
      optionsList3: [{'label': '全部', 'name': ''}],
      isLoaded: true,
      dialogDelete: false,
      isDel: false,
      msgShow: false,
      dialogVisible: false,
      dialogFormVisible: false,
      dialogStatus: '',
      paramsId: '',
      term:{},//存储搜素框的上或者下学期
      terms:{},
      textMap: {
        update: '编辑',
        detail: '详情',
        create: '创建'
      },
      calendarTypeCodeOptions: [{'label': '全部', 'name': ''}],
      calendarTypeCodeValue: null,
      calendarStatusCodeOptions: [{'label': '全部', 'name': ''}],
      calendarStatusCodeValue: null,
      ynOptions: [{'label': '全部', 'name': ''}],
      ynValue: null,
      form: {
        calendarId: null,
        schoolOrgId: null,
        segmentId: null,
        gradeId: null,
        schoolYear: null,
        schoolTerm: null,
        effectiveDt: null,
        expiryDt: null,
      },
      searchForm: {
        calendarId: null,
        schoolOrgId: null,
        segmentId: '',
        gradeId: '',
        schoolYear: null,
        schoolTerm: null,
        effectiveDt: null,
        expiryDt: null,
          //学段的下拉框
          entityName: '',
          surveyId: '',
          // segmentId: null,
          // gradeId: null,
          // timeEnd: '',
          // timeStart: '',
        startTime:'',
        endTime:'',
      },

      data: '',
      multipleSelection: [],
      params: {
        page: 1,
        limit: 10,
        calendarId: null,
        schoolOrgId: null,
        segmentId: '',
        gradeId: null,
        schoolYear: null,
        schoolTerm: null,
        effectiveDt: null,
        expiryDt: null,
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
    console.log('重新活跃路由');
    let query = this.$route.query;
    for (let item in query) {
      this.params[item] = query[item]
    }
    this.getList()
  },
  created () {
    //let schoolId = this.$route.query.schoolOrgId;
    //this.params.schoolId = schoolId;

    commonApi.commonRequest('/userapp/base/segmentGrade?type=1','get',).then(res => {
      console.log(res)
      this.optionsList2 = coverData(res.data.data, 'name', 'id')
    })
    commonApi.commonRequest('/userapp/base/segmentGrade?type=2','get',{id:this.params.segmentId}).then(res => {
      console.log(res)
      this.optionsList3 = coverData(res.data.data, 'name', 'id')
    })

    this.getTerm();

  },
  mounted () {
    this.getCurrentPage(this.$route.fullPath, this.params)
    this.getList()

    commonApi.getCodeIntType('calendarType').then(res => {
      let viewList = res.data.data || []
      for (let calendarTypeItem of viewList) {
        this.calendarTypeCodeOptions.push({
          'label': calendarTypeItem.codeDesc,
          'name': calendarTypeItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('calendarStatus').then(res => {
      let viewList = res.data.data || []
      for (let calendarStatusItem of viewList) {
        this.calendarStatusCodeOptions.push({
          'label': calendarStatusItem.codeDesc,
          'name': calendarStatusItem.codeId
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
  },
  methods: {
    getTerm () {
      api.getTerm().then(res => {
        // console.log(res)
        this.term=res.data.data;
        this.isLoaded = false
      }, res => {
        this.$message.error(res.message)
      })
    },

    changeSeg(formName) {
      this.searchForm.gradeId = null;
      commonApi.commonRequest('/userapp/base/segmentGrade?type=2','get',{id:this.searchForm.segmentId}).then(res => {
        this.optionsList3 = coverData(res.data.data, 'name', 'id')
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
    // changeSeg(formName) {
    //   this.searchForm.gradeId = null;
    //   commonApi.commonRequest('/userapp/base/segmentGrade?type=2','get',{id:this.searchForm.segmentId}).then(res => {
    //     this.optionsList3 = coverData(res.data.data, 'name', 'id')
    //   })
    // },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.calendarId
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

        this.data = res.data.data;
        this.terms=res.data.data.records;
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
        }
      })
      this.isDel = false

    },
    dialogDeleteCancelHandler () {
      this.dialogDelete = false
    },
    toAdd () {
      //safety safetyEdu basedata
      let opath = '/basedata/detailOrgSchoolCalendarXs/add/' + 0
      this.$router.push({path: opath})
    },
    toTotal () {
      // let opath = '/basedata/OrgSchoolCalendarTotal';
      // this.$router.push({path: opath})
    },
    toEdit (id) {
      let opath = '/basedata/detailOrgSchoolCalendarXs/edit/' + id
      this.$router.push({path: opath})
    },
    toDetail (id) {
      let opath = '/basedata/detailOrgSchoolCalendarXs/detail/' + id
      this.$router.push({path: opath})
    },
    toSchedule (items) {
      let obj = {};
      for(let it in items) {
        if(it === 'segmentId'||it ==='gradeId'||it ==='schoolTerm'){
          obj[it] = items[it];
        }
        if(it === 'effectiveDt'){
          obj['month'] =  items[it].substr(5,2)>10?items[it].substr(5,2):items[it].substr(6,1);
        }
        if(it === 'schoolYear'){
          let seprate = items[it].split('-');
          obj['schoolYearStart'] = seprate[0];
          obj['schoolYearEnd'] = seprate[1];
        }
      }
      let opath = '/basedata/listOrgSchoolCalendarDetailXs';
      this.$router.push({path: opath,query:{params:decodeURIComponent(JSON.stringify(obj))}});
    },
    toAnother (id, path) {
      // listOrgSchoolCalendarDetail
      let opath = '/basedata/' + path + '?calendarId=' + id
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
