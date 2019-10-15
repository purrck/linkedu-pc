<template>
  <div class="Course">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="">

          <el-form-item label="名称:" prop="name" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.name" maxlength="30" placeholder="请输入标题"></el-input>
          </el-form-item>

          <el-form-item class="w140" label="课时类型:">
            <el-select size="small" v-model="searchForm.securityEducationTypeCode" placeholder="请选择课时类型">
              <el-option
                v-for="item in optionsList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间" class="w280">
            <el-date-picker v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm" type="daterange" range-separator="至"
                            start-placeholder="请选择时间"
                            end-placeholder="请选择时间" placeholder=""></el-date-picker>
          </el-form-item>

          <el-form-item label="状态:" prop="courseStatusCode" class="w140">
            <el-select v-model="searchForm.courseStatusCode" placeholder="请选择状态">
              <el-option
                v-for="item in optionsList1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="发布人">
            <el-input v-model="searchForm.name" placeholder="请输入发布人"></el-input>
          </el-form-item>-->
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
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557"  :disabled="!multipleSelection.length > 0"
                       @click="tingyong">
              <i class="iconfont icon-icon_tingyong_caozuo f12 cfff" ></i> 停用
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
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
            <!--<el-table-column prop="courseSn" align="center" label="编号" sortable="custom">-->
            <!--<template slot-scope="scope">-->
            <!--<div v-if="scope.row.courseSn" class="one-line">{{scope.row.courseSn}}</div>-->
            <!--<div v-else>无</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="name" align="center" label="课程名称" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.name" class="one-line">{{scope.row.name}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="securityEducationTypeCode" align="center" label="课程类型" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.securityEducationTypeCodeStr" class="one-line" :style="{color: scope.row.securityEducationTypeCodeStr.split(';')[1]}">{{scope.row.securityEducationTypeCodeStr.split(';')[0]}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="createdDt" label="发布时间" align="center" sortable="custom"></el-table-column>

            <el-table-column prop="courseStatucCode" align="center" label="状态" >
              <template slot-scope="scope">
                <div v-if="scope.row.courseStatusCodeStr" :style="{color: scope.row.courseStatusCodeStr.split(';')[1]}" class="one-line">{{scope.row.courseStatusCodeStr.split(';')[0]}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="120">
              <template slot-scope="scope">
                <div class="flex  row">
                  <!--v-show="scope.row.courseStatusCode == 'reject'||scope.row.courseStatusCode=='editing'||scope.row.courseStatusCode=='disable'"-->
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.courseId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover v-show="scope.row.courseStatusCode == 'disable' || scope.row.courseStatusCode == 'pass' || scope.row.courseStatusCode == 'available' || scope.row.courseStatusCode == 'published' || scope.row.courseStatusCode == 'finished' || scope.row.courseStatusCode == 'reject' || scope.row.courseStatusCode == 'opening' || scope.row.courseStatusCode == 'editing' || scope.row.courseStatusCode == 'approving'" placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.courseId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.courseStatusCode == 'disable' || scope.row.courseStatusCode == 'finished' || scope.row.courseStatusCode == 'reject' || scope.row.courseStatusCode == 'editing'" placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.courseId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.courseStatusCode == 'approving'" placement="top-start" popper-class="popover-v2-rao" title="审核" trigger="hover">
                    <span slot="reference"
                          @click.stop="shenhe(scope.row.courseId)"><i
                      class="iconfont icon-icon_shenhe ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.courseStatusCode == 'pass' || scope.row.courseStatusCode == 'available' || scope.row.courseStatusCode == 'published' || scope.row.courseStatusCode == 'opening'" placement="top-start" popper-class="popover-v2-rao" title="停用" trigger="hover">
                  <span slot="reference"
                        @click.stop="toTingyong(scope.row.courseId)"><i
                    class="iconfont icon-icon_tc_tingyong ml5 f20 c999999"></i></span>
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
  import api from './courseUrl'
  import commonApi from '@/api/common/common'
  import {mapGetters} from 'vuex'
  import {coverData} from '@/util/util'
  export default {
    data () {
      return {
        optionsList: [
          {label: '请选择', value: ''}
        ],
        optionsList1: [
          {label: '请选择', value: ''}
        ],
        typeScep:[],
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        dialogVisible: false,
        loadingTingyong : false,
        dialogFormVisible: false,
        dialogStatus: '',
        dialogTingyong : false,
        paramsId: '',
        textMap: {
          update: '编辑',
          detail: '详情',
          create: '创建'
        },
        form: {
          courseId: null,
          courseSn: null,
          name: null,
          subjectId: null,
          keyword: null,
          status: null,
        },
        searchForm: {
          courseId: null,
          courseSn: null,
          name: null,
          subjectId: null,
          courseStatusCode: null,
          keyword: null,
          status: null,
        },
        data: '',
        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
          courseType: 2,
          orderByField: 'createdDt',
          isAsc: false,
          courseId: null,
          courseSn: null,
          name: null,
          subjectId: null,
          keyword: null,
          status: null,
        }
      }
    },
    computed: {
      ...mapGetters(['schoolInfo']),
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
      commonApi.getCourseType('courseType4XQB').then(res=>{
        this.optionsList = this.optionsList.concat(coverData(res.data.data, 'name', 'id'))
      })

      // commonApi.getCodeIntType('securityEducationType').then(res => {
      //   this.optionsList = this.optionsList.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
      // })
      commonApi.getCodeIntType('courseStatus').then(res => {
        this.optionsList1 = this.optionsList1.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
        this.optionsList1.forEach(item => {
          item.label = item.label.split(';')[0]
        })
      })
      console.log(this.schoolInfo)
      //let schoolId = this.$route.query.schoolOrgId;
      //this.params.schoolId = schoolId;
    },
    mounted () {
      //this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList()

    },
    methods: {

      shenhe(courseId){
        let opath = `/safetyEdu/detailCourseOp/shenhe/${courseId}`
        this.$router.push({path: opath})
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
      toTingyong(id){
        this.dialogTingyong = true;
        this.multipleSelection = [id];
      },
      dialogTingyongCancelHandler(){

        this.dialogTingyong = false;
        this.loadingTingyong = false;
      },
      dialogTingyongComfireHandler(){
        if(this.$refs.schooltable.selection.some(item => {
          return item.courseStatusCode != "available" && item.courseStatusCode != "pass"
        })){
          this.$message.error("只有已发布才可以停用");
          return
        }
        this.loadingTingyong = true;
        let _a = {
          ids : this.multipleSelection,
          userId:""
        };
        api.tingyong(_a).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("停用成功");
            this.getList();

          }
          this.loadingTingyong = false;
          this.dialogTingyong = false;
        }, res => {
          this.loadingTingyong = false;
          this.$message.error(res.message);

        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val.map(item => {
          return item.courseId
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
        let opath = '/safetyEdu/detailCourseOp/add/' + 0+'?courseType=courseType4XQB'
        this.$router.push({path: opath})
      },
      toTotal () {
        let opath = '/safetyEdu/CourseTotal'
        this.$router.push({path: opath})
      },
      toEdit (id) {
        let opath = '/safetyEdu/detailCourseOp/edit/' + id+'?courseType=courseType4XQB'
        this.$router.push({path: opath})
      },
      toDetail (id) {
        let opath = '/safetyEdu/detailCourseOp/detail/' + id
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
