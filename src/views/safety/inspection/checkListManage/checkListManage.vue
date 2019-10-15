<template>
  <div class="checkListManage-wrap">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">

          <el-form-item label="巡检区:">
            <el-select class="select-v2-rao" v-model="searchForm.userName" placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"
                         :key="entityOrgStatusCodeItem.name"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡检点:">
            <el-select class="select-v2-rao" v-model="searchForm.userName" placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"
                         :key="entityOrgStatusCodeItem.name"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡检状态:">
            <el-select class="select-v2-rao" v-model="searchForm.userName" placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"
                         :key="entityOrgStatusCodeItem.name"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="巡检人:">
            <el-input v-model="searchForm.checker" placeholder="巡检人"></el-input>
          </el-form-item>

          <el-form-item label="关键字:">
            <el-input v-model="searchForm.keyword" placeholder="巡检人"></el-input>
          </el-form-item>
          <el-form-item label="日期:">

            <el-date-picker v-model="searchForm.date" value-format="yyyy-MM-dd HH:mm" type="date" placeholder="日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="实际巡检日期:">
            <el-date-picker v-model="searchForm.daterange" value-format="yyyy-MM-dd HH:mm" type="daterange" placeholder="实际巡检日期"></el-date-picker>
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
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">
            <div>
              <!--<el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">-->
              <!--<i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="del">-->
              <!--<i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="tingyong">-->
              <!--<i class="iconfont icon-icon_tingyong_bai_ca f12 cfff"></i> 停用-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="del">-->
              <!--<i class="iconfont icon-icon_qiyong_bai f12 cfff"></i> 启用-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="button-v2-rao bD8D8D8" @click="del">-->
              <!--<i class="iconfont icon-icon_qiyong_bai f12 cfff"></i> 灰色-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="del">-->
              <!--<i class="iconfont icon-icon_qiyong_bai f12 cfff"></i> 红色-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao bFFB54C" @click="del">-->
              <!--<i class="iconfont icon-icon_qiyong_bai f12 cfff"></i> 橙色-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff">白色</el-button>-->
            </div>
            <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i>
              </div>
            </div>
          </el-col>
        </el-row>


        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="schoolName" label="日期" sortable="custom"></el-table-column>
            <el-table-column prop="entityTypeName" label="巡检区域" sortable="custom"></el-table-column>
            <el-table-column prop="organizedTitle" label="巡检点" sortable="custom"></el-table-column>
            <el-table-column prop="entityName" label="巡检人" sortable="custom"></el-table-column>
            <el-table-column prop="organizedDt" label="规定巡检时间" sortable="custom"></el-table-column>
            <el-table-column prop="organizedDt" label="实际巡检时间" sortable="custom"></el-table-column>
            <el-table-column prop="organizedDt" label="异常类型" sortable="custom"></el-table-column>
            <el-table-column prop="organizedDt" label="状态" sortable="custom"></el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.entityOrgId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
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

      <el-dialog title="" :visible.sync="dialogtingyong" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否停用?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="button-v2-rao border-color-cccccc c000000 bfff" :loading="isDel">是</el-button>
          <el-button type="primary" class="button-v2-rao b93BF88">否</el-button>
        </div>
      </el-dialog>

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20" alt="请至少选择一项内容!"/>
        请至少选择一项内容!
      </div>
      <el-radio-group class="location-v2-rao">
        <el-radio-button label="top">通知管理</el-radio-button>
        <el-radio-button label="left" class="current">新增通知 <i class="el-input__icon el-icon-circle-close"></i></el-radio-button>
      </el-radio-group>

    </el-container>

  </div>
</template>

<script>
import commonApi from '@/api/common/common'
import api from './checkListManageUrl'

export default {
  data () {
    return {
      dialogtingyong: false,
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
      entityOriginTypeCodeOptions: [{'label': '全部', 'name': ''}],
      entityOriginTypeCodeValue: null,
      entityOrgStatusCodeOptions: [{'label': '全部', 'name': ''}],
      entityOrgStatusCodeValue: null,
      fixWidth: '',
      form: {
        entityOrgId:
          null,
        entityTypeName:
          null,
        entityName:
          null,
        organizedTitle:
          null,
        effectiveDt:
          null,
        entityOrgStatusCode: null,
      },
      searchForm: {
        entityOrgId:
          null,
        entityTypeName:
          null,
        entityName:
          null,
        organizedTitle:
          null,
        effectiveDt:
          null,
        entityOrgStatusCode: null,
      }
      ,
      data: {
        total: 0
      },
      multipleSelection: [],
      params: {   //接口参数
        page: 1,
        limit: 10,
        entityOrgId:
          null,
        entityTypeName:
          null,
        entityName:
          null,
        organizedTitle:
          null,
        effectiveDt:
          null,
        entityOrgStatusCode:
          null,
      }
    }
  },
  computed: {
    isPush () {
      //已发布
      if (this.$route.params.type === 'opening') {
        this.params.entityOrgStatusCode = this.$route.params.type
        this.fixWidth = '200'
        this.getList()
        return true
      } else { //全部
        this.fixWidth = '480'
        this.params.entityOrgStatusCode = null
        this.getList()

        return false
      }
    }
  },
  mounted () {
    this.getCurrentPage(this.$route.fullPath, this.params)
    commonApi.getCodeIntType('entityOriginType').then(res => {
      let viewList = res.data.data || []
      for (let entityOriginTypeItem of viewList) {
        this.entityOriginTypeCodeOptions.push({
          'label': entityOriginTypeItem.codeDesc,
          'name': entityOriginTypeItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('entityOrgStatus').then(res => {
      let viewList = res.data.data || []
      for (let entityOrgStatusItem of viewList) {
        this.entityOrgStatusCodeOptions.push({
          'label': entityOrgStatusItem.codeDesc,
          'name': entityOrgStatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    this.getList()
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.entityOrgId
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
      this.params.isAsc = obj.order === 'ascending'
      this.isLoaded = true
      this.getList()
    },
    getList () {
      api.fetchList(this.params).then(res => {
        //for (let i of res.data.records) {
        //i.isAudio = false;
        //}
        this.data = res.data.data
        this.isLoaded = false
      }, res => {
        this.$message.error(res.message)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    search () {
      this.params.page = 1
      for (let key in this.searchForm) {
        this.params[key] = this.searchForm[key]
      }
      this.isLoaded = true
      this.getList()
    },
    closeBox () {
      this.dialogFormVisible = false
      // this.getList()
    },
    //删除表格当前行
    rowDel (id) {
      this.dialogDelete = true
      this.multipleSelection = [id]
    },
    //删除
    del () {
      if (this.multipleSelection.length === 0) {
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
        if (res.data.resultCode === '000000') {
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
      if (this.multipleSelection.length === 0) {
        this.$message.error('请您选择要删除的数据')
      } else {
        this.$confirm('该操作将会删除x，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoaded = true
          api.batchDelObj(this.multipleSelection).then(res => {
            if (res.data.resultCode === '000000') {
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
      let opath = '/safety/courseDetail/add/' + 0
      this.$router.push({path: opath})
    },
    toEdit (id) {
      let opath = '/safety/courseDetail/edit/' + id
      this.$router.push({path: opath})
    },
    toDetail (id) {
      let opath = '/safety/checkListManageDetaildetail/' + id
      console.log(opath)
      this.$router.push({path: opath})
    },
    pushEntity (item) {
      let obj = {
        entityOrgId: item.entityOrgId,
        entityOrgStatusCode: 'opening',
      }

      api.putStatusObj(obj).then(res => {
        if (res.data.resultCode !== '000000') {
          this.$message.error(res.data.message)
        } else {
          this.$message.success('发布成功!')
          this.getList()
        }
      }, res => {
        this.$message.error(res.message)
      })
    },
    toRange (id) {
      let opath = '/safety/listEntityOrganizationRange/' + id
      this.$router.push({path: opath})
    },
    toObject (id) {
      let opath = '/safety/listEntityOrganizationObject/' + id
      this.$router.push({path: opath})
    },

    getorganizedDtStr (row) {
      return row.organizedDtStr
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .checkListManage-wrap {
    .btns {
      .btns-msg {
        margin-left: 0;
      }
    }
  }

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
