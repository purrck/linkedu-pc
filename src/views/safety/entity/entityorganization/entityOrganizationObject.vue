<template>
  <div class="entityOrganizationObject-wrap">
    <el-header style="height: auto">
      <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
        <el-form-item>
          <el-form-item label="用户类型:">
            <el-select v-model="searchForm.userTypeCode" clearable>
              <el-option v-for="(item, index) of userTypes" :label="item.codeDesc" :value="item.codeId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户归属:">
            <el-input v-model="searchForm.belongName" placeholder="用户归属" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户姓名:">
            <el-input v-model="searchForm.userName" placeholder="用户姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户状态:">
            <el-input v-model="searchForm.userStatus" placeholder="用户状态" clearable></el-input>
          </el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="pt-15">
      <el-row class="select-all">
        <el-col :span="24" class="text-right mb-10">
          <!--<el-button type="info" class="btn-rao" plain @click="toAdd">-->
            <!--<img src="~@/assets/img/icon-add@2x.png" width="20" plain/> 添加-->
          <!--</el-button>-->
          <el-button type="info" class="btn-rao" plain @click="del"><img
            src="~@/assets/img/icon_del@2x.png" width="20" plain/> 删除
          </el-button>
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
            <div class="result text-right">
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
          <el-table-column type="userName" label="用户姓名" align="center">
            <template slot-scope="scope">
             <div>{{scope.row.userName}}</div>
            </template>
          </el-table-column>

          <el-table-column type="userStatus" label="用户状态"  align="center">
            <template slot-scope="scope" v-if="scope.row.entityOrgUserStatusCodeStr">
              <div :style="{color: scope.row.entityOrgUserStatusCodeStr.split(';')[1]}">{{scope.row.entityOrgUserStatusCodeStr.split(';')[0]}}</div>
            </template>
          </el-table-column>
          <el-table-column type="userStatus" label="用户类型"  align="center">
            <template slot-scope="scope" v-if="scope.row.userTypeCodeStr">
              <div :style="{color: scope.row.userTypeCodeStr.split(';')[1]}">{{scope.row.userTypeCodeStr.split(';')[0]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button size="small" type="danger" @click="rowDel(scope.row.entityOrgId)">删除</el-button>
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
  </div>
</template>

<script>
/**
 * userName: 'DengShen'
 * createTime: '2019/1/25 11:43'
 */
import common from '@/api/common/common'
import api from './entityorganizationUrl'

export default {
  name: 'entityOrganizationObject',
  props: {},
  components: {},
  computed: {},
  data () {
    return {
      userStatus: '',
      userName: '',
      belongName: '',
      entityOrgId: null, // 列表的主键ID
      userTypeCode: '',
      userTypes: [
        {label: '家长', value: '123'}
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
      entityOriginTypeCodeOptions: [{'label': '全部', 'name': ''}],
      entityOriginTypeCodeValue: null,
      entityOrgStatusCodeOptions: [{'label': '全部', 'name': ''}],
      entityOrgStatusCodeValue: null,
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
        entityOrgStatusCodeValue: null,
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
        entityOrgStatusCodeValue: null,
      },
      multipleSelection: [],
      data: null,
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
      }
    }
  },
  mounted () {
    this.init()
    this.params.entityOrgId = this.$route.params.id
    this.$nextTick(() => {
    })
  },
  methods: {
    init () {
      // console.log(this.$route)
      // console.log(`entityOrganizationRange is running...`)
      common.getCodeIntType('userType').then(res => {
        this.userTypes = res.data.data
      })
      this.getList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.entityOrgUserId
      })
    },
    handleSizeChange (size) {
      this.params.limit = size
      this.isLoaded = true
      this.getList()
    },
    handleCurrentChange (currentPage) {
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
      this.params.isAsc = obj.order == 'ascending' ? true : false
      this.isLoaded = true
      this.getList()
    },
    getList () {
      const that = this;
      api.fetchListObj(that.params).then(res => {
        that.data = res.data.data
        that.isLoaded = false
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
      if (this.multipleSelection.length == 0) {
        this.msgShow = true
        setTimeout(() => {
          this.msgShow = false
        }, 800)
        return
      }
      this.dialogDelete = true
    },
    dialogDeleteComfireHandler () {
      // console.log(this.multipleSelection)
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
    toAdd () {
      let opath = '/safety/detailEntityOrganization/add/' + 0
      this.$router.push({path: opath})
    },
    toEdit (id) {
      let opath = '/safety/detailEntityOrganization/edit/' + id
      this.$router.push({path: opath})
    },
    toDetail (id) {
      let opath = '/safety/detailEntityOrganization/detail/' + id
      this.$router.push({path: opath})
    },
    toRange (id) {
      let opath = '/safety/detailEntityOrganizationRange/' + id
      this.$router.push({path: opath})
    },
    toObject (id) {
      let opath = '/safety/detailEntityOrganizationObject/' + id
      this.$router.push({path: opath})
    },

    getorganizedDtStr (row) {
      return row.organizedDtStr
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .entityOrganizationObject-wrap {

  }
</style>
