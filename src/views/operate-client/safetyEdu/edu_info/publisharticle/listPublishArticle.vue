<template>
  <div class="listPublishArticleV2-wrap">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="资讯分类:" >
            <el-select clearable class="select-v2-rao w140" v-model="searchForm.columnId" @change="change" placeholder="请您选择">
              <el-option v-for="(item, index) of classifications"
                         :key="index"
                         :label="item.columnName"
                         :value="item.columnId">
              </el-option>
            </el-select>
            <el-select  clearable class="w140 select-v2-rao" v-model="searchForm.childColumnId" placeholder="请您选择">
              <el-option v-for="(item, index) of subjectClassifications"
                         :key="index"
                         :label="item.columnName"
                         :value="item.columnId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="资讯状态:" class="w140">
            <el-select clearable class="select-v2-rao" v-model="searchForm.status" placeholder="请您选择">
              <el-option v-for="(item, index) of status"
                         :key="index"
                         :label="item.label"
                         :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="作者:" class="w140">
            <el-input clearable v-model="searchForm.author" placeholder="作者"></el-input>
          </el-form-item>

          <el-form-item label="关键字:" class="w140">
            <el-input clearable v-model="searchForm.title" placeholder="关键字"></el-input>
          </el-form-item>

          <el-form-item label="发布时间:" class="w280">
            <el-date-picker clearable type="daterange" range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" placeholder="搜索发布时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="topExpDate" ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="button-hover-rao b93BF88 border-color-93BF88" @click="search">查询
            </el-button>
            <!--<el-button type="primary" @click="resetForm('searchForm')" class="button-hover-rao b93BF88 border-color-93BF88">重置</el-button>-->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt-10 mb10"></div>


      <el-main class="pt-15">
        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">

            <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_yixuanzhe" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;" @click="$router.push({path: `/safetyEdu/listPublishArticleTotalOp`})"></i>
              </div>
            </div>
            <div>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="del" :disabled="multipleSelection.length === 0">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
              <!--<el-button type="primary" size="small" class="el-button&#45;&#45;small-icon button-v2-rao b93BF88 " @click="tingyong">-->
              <!--<i class="iconfont icon-icon_tingyong_bai_ca f12 cfff"></i> 停用-->
              <!--</el-button>-->
              <!--<el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="del">-->
              <!--<i class="iconfont icon-icon_qiyong_bai f12 cfff"></i> 启用-->
              <!--</el-button>-->
            </div>
          </el-col>
        </el-row>
        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <!--<el-table-column prop="sequnceNum" label="序号" sortable="custom"></el-table-column>-->
            <!--<el-table-column prop="entityTypeName" label="用户类别"></el-table-column>-->
            <el-table-column prop="columnName" label="资讯类别" sortable="custom"></el-table-column>

            <el-table-column prop="childColumnName" label="子类别"></el-table-column>
            <el-table-column prop="title" label="标题" sortable="custom"></el-table-column>
            <el-table-column prop="publishedDt" label="发布时间" sortable="custom"></el-table-column>
            <el-table-column prop="editor" label="发布人" sortable="custom"></el-table-column>
            <el-table-column prop="checker" label="审核人" sortable="custom"></el-table-column>
            <el-table-column prop="status" label="状态" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.statusStr" :style="{color: scope.row.statusStr.split(';')[1]}">{{scope.row.statusStr.split(';')[0]}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="详情" trigger="hover"  >
                  <span slot="reference" @click.stop="toTheRoute(`detail`, scope.row.articleId)">
                    <i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i>
                  </span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover" v-if="scope.row.status !== 'published'&&scope.row.status !== 'under_review'">
                  <span slot="reference" @click.stop="toTheRoute(`edit`, scope.row.articleId)">
                    <i class="iconfont icon-icon_bianji ml5 f20 c999999"></i>
                  </span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover" v-if="scope.row.status !== 'published' && scope.row.status !== 'under_review'">
                  <span slot="reference">
                       <i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999" @click="deleteRow(scope.row.articleId)"></i>
                  </span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="撤回" trigger="hover" v-if="scope.row.status === 'published'">
                  <span slot="reference">
                      <i class="iconfont icon-icon_cehui_caozuo ml5 f20 c999999" title="撤回" @click="recall(scope.row.articleId)"></i>
                  </span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="置顶" trigger="hover" v-if="scope.row.isToTop !== 1 && scope.row.status === 'published'">
                  <span slot="reference">
                    <i class="iconfont icon-icon_zhiding ml5 f20 c999999" @click="toTopHandle(scope.row.articleId)"></i>
                  </span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="取消置顶" trigger="hover" v-if="scope.row.isToTop===1">
                  <span slot="reference">
                    <i class="iconfont icon-icon_quxiaozhiding ml5 f20 c999999" @click="cancelTop(scope.row.articleId)"></i>
                  </span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="审核" trigger="hover" v-if="scope.row.status === 'under_review'">
                  <span slot="reference">
                                    <i class="iconfont icon-icon_shenhe ml5 f20 c999999" @click="check(scope.row.articleId)"></i>
                  </span>
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
      <el-dialog title="提示" :visible.sync="dialogDelete" center width="22%">
        <div class="text-center">
          <img src="~@/assets/img/dialog-delete.png"/>
          <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteComfireHandler" :loading="isDel">是</el-button>
          <el-button type="primary" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>

    <!--置顶有效期-->
    <el-dialog
      title="置顶设置"
      :visible.sync="topExpDateVisible"
      center
      width="20%">
      <div style="display: flex;align-items: center;justify-content: center;">
        <p style="white-space: nowrap; margin-right: 5px;">有效期: </p>
        <el-date-picker type="daterange" range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" placeholder="搜索发布时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="topExpDate" style="width: 100%;"></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="topExpDateVisible = false">取 消</el-button>
        <el-button type="primary" @click="topExpDateHandleClose">确 定</el-button>
      </span>
    </el-dialog>

    <!--置顶冲突-->
    <el-dialog
      title="置顶提示"
      :visible.sync="topConflictVisible"
      center
      width="20%">
      <span>此栏目已有一条资讯置顶，是否(<span style="color: #93BF88;">{{topConflictVisibleText}}</span>)确定替换为置顶?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="topConflictVisible = false">取 消</el-button>
        <el-button type="primary" @click="topConflictHandleClose">确 定</el-button>
      </span>
    </el-dialog>

    <!--取消置顶-->
    <el-dialog
      title="提示"
      :visible.sync="cancelTopVisible"
      :title="''"
      center
      width="20%">
      <div style="text-align: center;">
        <span class="iconfont icon-icon_querenzhiding_h" style="font-size: 30px;color: red;"></span>
      </div>
      <div style="text-align: center;font-size: 18px;color: #000;margin-top: 10px;">是否确认取消置顶？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelTopVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelTopHandleClose">确 定</el-button>
      </span>
    </el-dialog>

    <!--删除提示-->
    <el-dialog title="提示" :visible.sync="deleteVisible" center width="22%">
      <div class="text-center">
        <img src="~@/assets/img/dialog-delete.png"/>
        <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteRowHandleClose">是</el-button>
        <el-button type="primary" @click="deleteVisible = false">否</el-button>
      </div>
    </el-dialog>

    <!--撤回提示-->
    <el-dialog title="提示" :visible.sync="recallVisible" center width="22%">
      <div class="text-center">
        <img src="~@/assets/img/dialog-delete.png"/>
        <p class="text-center fs-16 color333 mt-20">是否确认撤回?</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recallHandleClose">是</el-button>
        <el-button type="primary" @click="recallVisible = false">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * userName: 'DengShen'
 * createTime: '2019/2/21 10:47'
 */
import api from './publisharticleUrl'
import commonApi from '@/api/common/common'

export default {
  name: 'listPublishArticle',
  props: {},
  components: {},
  computed: {},
  data () {
    return {
      sendObjects: [],
      status: [],
      classifications: [],
      subjectClassifications: [],
      recallVisible: false,
      articleId: '',
      isLoaded: true,
      dialogDelete: false,
      isDel: false,
      msgShow: false,
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
        childColumnId: '',
        title: '',
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
      data: '',
      multipleSelection: [],
      params: {   //接口参数
         page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
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
      },
      cancelTopVisible: false,
      topExpDateVisible: false,
      topExpDate: [],
      topConflictVisible: false,
      topConflictVisibleText: '',
      deleteVisible: false,
      optionsList: [
        {label: '学生', value: '1'},
        {label: '老师', value: '2'}
      ],
      formData: {
        sendObj: []
      },
      tableData: [{id: 1}, {id: 2}],
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      pageSizes: [10, 20, 50, 100]
    }
  },
  mounted () {
    this.init()
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
    init () {
      // this.getCurrentPage(this.$route.fullPath, this.params)
      api.getColumnSelect().then(res => {
        this.classifications = res.data&&res.data.data || []
      })
      commonApi.getCodeIntType('publishStatus').then(res => {
        let viewList = res.data.data || []
        for (let entityOriginTypeItem of viewList) {
          this.status.push({
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
    toTopHandle (articleId) {
      this.topExpDateVisible = true
      this.articleId = articleId
      // api.toTop({articleId}).then(res => {
      //   this.articleId = articleId
      //   let {flag} = res.data.data
      //   if (flag) {
      //     this.topExpDateVisible = true
      //   } else {
      //     this.topConflictVisible = true
      //     this.topConflictVisibleText = res.data.data.originTitle
      //   }
      // })
    },
    cancelTop (articleId) {
      this.cancelTopVisible = true
      this.articleId = articleId
    },
    cancelTopHandleClose () {
      this.cancelTopVisible = false
      api.cancelTop({articleId: this.articleId}).then(res => {
        this.$message.success('取消置顶成功')
        this.init()
      })
    },
    topExpDateHandleClose () {
      if (!this.topExpDate) {
        return
      }
      api.toTop({articleId: this.articleId, topStartTime: this.topExpDate[0], topEndTime: this.topExpDate[1]}).then(res => {
        this.$message.success('置顶成功')
        this.topExpDateVisible = false
        this.topExpDate = []
        this.init()
      })
    },
    topConflictHandleClose () {
      this.topConflictVisible = false
      this.topExpDateVisible = true
    },
    deleteRowHandleClose () {
      api.batchDelObj(this.multipleSelection).then(res => {
        console.log(res)
        this.deleteVisible = false
        this.$message.success('删除成功')
        this.getList()
      })

    },
    toTheRoute (type, id) {
      let path = `/safetyEdu/detailPublishArticleOp/${type}/${id}`
      console.log(path)
      this.$router.push({path})
    },
    deleteRow (id) {
      console.log(id)
      this.deleteVisible = true
      this.multipleSelection = [id]
    },
    recall (articleId) {
      this.recallVisible = true
      this.articleId = articleId
    },
    recallHandleClose () {
      api.recall({articleId: this.articleId}).then(res => {
        this.recallVisible = false
        this.getList()
      })
    },
    check (articleId) {
      api.commit({articleId}).then(res => {
        console.log(res)
        this.toTheRoute('check', articleId)
      })
    },
    change (val) {
      this.searchForm.childColumnId = ''
      this.subjectClassifications = this.classifications.find(item => {
        return item.columnId === val
      }).childrenColumns || []
    },
    deleteSelection () {
      console.log(this.multipleSelection)
      this.deleteVisible = true
    },


    // copy


    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.articleId
      })
    },
    handleSizeChange (size) {
      this.params.limit = size
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    search () {
      this.params.publishedDtStar = this.topExpDate[0]
      this.params.publishedDtEnd = this.topExpDate[1]
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
      this.toTheRoute('add', 0)
    },
    toEdit (id) {
      this.toTheRoute('edit', id)
    },
    toDetail (id) {
      this.toTheRoute('detail', id)
    }
  }
}
</script>
<style lang="scss" scoped>

  .tips-school {
    position: absolute;
    top: 40%;
    left: 47%;

  }

  .select-all {
    margin: 0px 0 5px;
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
<style lang="scss" rel="stylesheet/scss" scoped>
  .listPublishArticleV2-wrap {
    .container {
      padding: 30px;
      background-color: #fff;

      .header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &__form {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          span {
            white-space: nowrap;
            margin-right: 5px;
          }

          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }

      .header-handle {
        margin-top: 10px;
        height: 80px;
        display: flex;
        align-items: center;
        border-top: 1px solid #E8E8E8;

        & > button {
          margin-right: 10px;
        }

        &--status {
          margin-left: 10px;
          flex: 1;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          background-color: #F5FAF4;
          border-radius: 4px;
        }
      }

      .table-content {
        .table-custom {

        }

        .pagination {
          margin-top: 30px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }

  }
</style>
