<template>
  <div class="CourseChapter">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="名称:" prop="title">
            <el-input class="input-v2-rao" v-model="searchForm.title" maxlength="30" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="课时类型">
          <el-select size="small" class="select-v2-rao" v-model="searchForm.securityEducationTypeCode" placeholder="请选择课时类型">
                <el-option
                  v-for="item in optionsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
            <!--<el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-icon_tingyong_caozuo f12 cfff"></i> 停用
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-qiyong f12 cfff"></i> 启用
            </el-button>-->
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="title" align="center" label="课时名称" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.title" class="one-line">{{scope.row.title}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="chapterName" align="center" label="课时类型" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.securityEducationTypeCodeStr" class="one-line">{{scope.row.securityEducationTypeCodeStr.split(";")[0]}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="120">
              <template slot-scope="scope">
                <div class="flex  row">

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.resourceId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.resourceId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.resourceId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>

                  <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="启用" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.resourceId)"><i
                    class="iconfont icon-qiyong ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="停用" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.resourceId)"><i
                    class="iconfont icon-icon_tingyong_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>-->
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
import api from './coursechapterUrl'
import commonApi from '@/api/common/common'
import {coverData} from '@/util/util'
export default {
  data () {
    return {
      optionsList: [
        {label: '请选择', value: ''}
      ],
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
      chapterStatusCodeOptions: [{'label': '全部', 'name': ''}],
      chapterStatusCodeValue: null,
      sectionTypeCodeOptions: [{'label': '全部', 'name': ''}],
      sectionTypeCodeValue: null,
      form: {
        chapterName: null,
        courseId: null,
      },
      searchForm: {
        chapterName: null,
        courseId: null,
      },
      data: '',
      multipleSelection: [],
      params: {
         page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
        chapterName: null,
        courseId: null,
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
    this.params.resourceType = 2;
  },
  mounted () {
    commonApi.getCourseType().then(res=>{
      let resData = res.data.data
    })
    //this.getCurrentPage(this.$route.fullPath, this.params)
    commonApi.getCourseType('courseType4XQB').then(res=>{
      this.optionsList = this.optionsList.concat(coverData(res.data.data, 'name', 'id'))
    })
    this.getList()

    commonApi.getCodeIntType('chapterStatus').then(res => {
      let viewList = res.data.data || []
      for (let chapterStatusItem of viewList) {
        this.chapterStatusCodeOptions.push({
          'label': chapterStatusItem.codeDesc,
          'name': chapterStatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('sectionType').then(res => {
      let viewList = res.data.data || []
      for (let sectionTypeItem of viewList) {
        this.sectionTypeCodeOptions.push({
          'label': sectionTypeItem.codeDesc,
          'name': sectionTypeItem.codeId
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.resourceId
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
      api.batchDelObjNew({
        ids:this.multipleSelection,
        userId : ""
      }).then(res => {
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
      let opath = '/safetyEdu/detailCourseChapter?type=add&resourceType=courseType4XQB'
      this.$router.push({path: opath})
    },
    toTotal () {
      let opath = '/safetyEdu/CourseChapterTotal'
      this.$router.push({path: opath})
    },
    toEdit (id) {
      let opath = `/safetyEdu/detailCourseChapter?type=edit&resourceId=${id}&resourceType=courseType4XQB`
      this.$router.push({path: opath})
    },
    toDetail (id) {
      let opath = `/safetyEdu/detailCourseChapter?type=detail&resourceId=${id}`
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
