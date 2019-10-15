<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <!--<el-form-item label="信息实体:">-->
          <!--<el-input v-model="searchForm.entityId" maxlength="30"></el-input>-->
          <!--</el-form-item>-->






          <el-form-item label="用户:">
            <el-input v-model="searchForm.userId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="赞踩:">
            <el-select v-model="searchForm.evaluateTypeCodeValue" placeholder="请您选择">
              <el-option v-for="evaluateTypeCodeItem in evaluateTypeCodeOptions"
                         :key="evaluateTypeCodeItem.name"
                         :label="evaluateTypeCodeItem.label" :value="evaluateTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="评级:">-->
          <!--<el-input v-model="searchForm.evaluateValue" maxlength="30"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="评价时间:">
            <el-date-picker v-model="searchForm.publishedDt" type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="pt-15">
        <el-row class="select-all">
          <el-col :span="24" class="text-right mb-10">
            <!--<el-button type="info" class="btn-rao" plain @click="del"><img-->
            <!--src="~@/assets/img/icon_del@2x.png" width="20" plain/> 删除-->
            <!--</el-button>-->
            <!--<el-button type="info" class="btn-rao" plain><img src="~@/assets/img/icon-return@2x.png"-->
            <!--width="20" plain/> 撤回-->
            <!--</el-button>-->
          </el-col>
        </el-row>

        <div class="selected-box mb-15">
          <el-row>
            <el-col :span="12">
              <img src="~@/assets/img/icon-selected.png" width="20"/> 已选择 <span class="myColor bold">{{multipleSelection.length}}</span>
              项目
            </el-col>
            <el-col :span="12">
              <div class="result text-right" @click="$router.push('/safety/entityevaluateTotal')">
                共搜索到 <span class="myColor bold">{{data.total}}</span> 条数据 <img
                src="~@/assets/img/icon-user-total.png" style="vertical-align: -1px;"/>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-rao checkbox-rao" ref="schooltable" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户" sortable="custom" width="200"></el-table-column>

            <el-table-column prop="entityName" label="信息内容" sortable="custom"></el-table-column>
            <el-table-column prop="entityTypeName" label="信息类别" sortable="custom" width="200"></el-table-column>

            <!--<el-table-column prop="content" label="内容" sortable="custom" width="200"></el-table-column>-->
            <el-table-column label="赞踩">
              <template slot-scope="scope">
                <span v-if="scope.row.evaluateTypeCodeStr" :style="{color:scope.row.evaluateTypeCodeStr.split(';')[1]}">{{scope.row.evaluateTypeCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="evaluateValue" label="评级" sortable="custom" width="200"></el-table-column>-->
            <el-table-column prop="publishedDt" label="评价时间" sortable="custom"
                             width="200"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button size="small" type="primary"
                           @click="toDetail(scope.row.evaluateId)">
                  详情
                </el-button>
                <!--<el-button size="small" type="danger"-->
                <!--@click="rowDel(scope.row.evaluateId)">删除-->
                <!--</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination background :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
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

  </div>
</template>

<script>
  import api from './entityevaluateUrl'
  import commonApi from '@/api/common/common'

  export default {
    data() {
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
        evaluateTypeCodeOptions: [{'label': '全部', 'name': ''}],
        evaluateTypeCodeValue: null,
        form: {
          entityId:
            null,
          userId:
            null,
          evaluateTypeCodeValue: null,
          evaluateValue:
            null,
          publishedDt:
            null,
        },
        searchForm: {
          entityId:
            null,
          userId:
            null,
          evaluateTypeCodeValue: null,
          evaluateValue:
            null,
          publishedDt:
            null,
        }
        ,
        data: '',
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          entityId:
            null,
          userId:
            null,
          evaluateTypeCode:
            null,
          evaluateValue:
            null,
          publishedDt:
            null,
        }
      }
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)

      this.getList()

      commonApi.getCodeIntType('evaluateType').then(res => {
        let viewList = res.data.data || []
        for (let evaluateTypeItem of viewList) {
          this.evaluateTypeCodeOptions.push({
            'label': evaluateTypeItem.codeDesc,
            'name': evaluateTypeItem.codeId
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
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.evaluateId
        })
      },
      handleSizeChange(size) {
        this.params.limit = size
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
        this.params.isAsc = obj.order == 'ascending' ? true : false
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true
        this.getList()
      },
      getList() {
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
      search() {
        this.params.page = 1
        for (let key in this.searchForm) {
          this.params[key] = this.searchForm[key]
        }
        this.isLoaded = true
        this.getList()
      },
      closeBox() {
        this.dialogFormVisible = false
        // this.getList()
      },
      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true
        this.multipleSelection = [id]
      },
      //删除
      del() {
        if (this.multipleSelection.length == 0) {
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
          if (res.data.resultCode === '000000') {
            this.$message.success('删除成功')
            this.getList()
          }
        }, res => {
          this.isDel = false
          //this.$message.error(res.data.message);
        })
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false
      },
      toDel() {
        if (this.multipleSelection.length == 0) {
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
      toAdd() {
        let opath = '/safety/detailEntityEvaluate/add/' + 0
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailEntityEvaluate/detail/' + id
        this.$router.push({path: opath})
      },
      getevaluateTypeCodeStr(row) {
        return row.evaluateTypeCodeStr
      },
      getpublishedDtStr(row) {
        return row.publishedDtStr
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
