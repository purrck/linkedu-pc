<template>
  <div class="entityOrganizationRange-wrap">
    <el-header>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="发送给家长" name="first"></el-tab-pane>
        <el-tab-pane label="发送对象范围" name="second"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main v-if="activeTab === 'first'">
      <div v-for="(item, index) of classList.children" :key="index" style="display: flex; height: 40px;align-items: center;">
        <div>{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <el-checkbox-group v-model="item.chekedList">
          <el-checkbox v-for="(itx,idx) of item.children" :label="itx.id" :key="idx">
            {{itx.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div style="margin-top: 50px;">
        <el-button type="primary" @click="submitCheckedClassList">提交</el-button>
      </div>
    </el-main>
    <el-main class="pt-15" v-if="activeTab === 'second'">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="用户类型:">
            <el-select v-model="userTypeCode">
              <el-option v-for="(item, index) of userTypes" :label="item.codeDesc" :value="item.codeId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户归属:">
            <el-input v-model="belongName" placeholder="用户归属"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-row class="select-all">
        <el-col :span="24" class="text-right mb-10">
          <!--<el-button type="info" class="btn-rao" plain @click="toAdd"><img-->
          <!--src="~@/assets/img/icon-add@2x.png" width="20" plain/> 添加-->
          <!--</el-button>-->
          <el-button type="info" class="btn-rao" plain @click="del"><img
            src="~@/assets/img/icon_del@2x.png" width="20" plain/> 删除
          </el-button>
          <!--<el-button type="info" class="btn-rao" plain><img src="~@/assets/img/icon-return@2x.png"-->
          <!--width="20" plain/> 撤回-->
          <!--</el-button>-->
        </el-col>
      </el-row>

      <div class="selected-box mb-15" v-if="activeTab === 'second'">
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

      <div class="table" v-if="activeTab === 'second'">
        <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                  @selection-change="handleSelectionChange"
                  class="table-rao checkbox-rao" ref="schooltable" :stripe="true" @sort-change="sortChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
          <el-table-column prop="entityType" label="用户类型" sortable="custom" align="center" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.userTypeCodeStr" :style="{color: scope.row.userTypeCodeStr.split(';')[1]}">{{scope.row.userTypeCodeStr.split(';')[0]}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="belongName" label="用户归属" sortable="custom" align="center" width="200"></el-table-column>
          <!--<el-table-column prop="entityTypeName" label="教育类型" sortable="custom" align="center"></el-table-column>-->
          <el-table-column prop="entityName" label="教育内容" sortable="custom" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="danger" @click="rowDel(scope.row.entityOrgRuleId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <div class="paging text-right" v-if="activeTab === 'second'">
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

<script>/**
 * userName: 'DengShen'
 * createTime: '2019/1/25 11:42'
 */
import {bulletinUserRuleAdSchoolInfoWithOutSegment} from '@/api/safety/bulletin/bulletinInfo'
import api from './entityorganizationUrl'
import common from '@/api/common/common'

export default {
  name: 'entityOrganizationRange',
  props: {},
  components: {},
  computed: {},
  data () {
    return {
      belongName: '',
      entityOrgId: null, // 列表的主键ID
      userTypeCode: '',
      userTypes: [
        {label: '家长', value: '123'}
      ],
      classList: {},
      checkClassList: [],
      activeTab: 'second',
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
      }
    }
  },
  mounted () {
    this.entityOrgId = this.$route.params
    this.params.entityOrgId = this.$route.params.id
    this.init()
    this.$nextTick(() => {
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
    init () {
      console.log(`entityOrganizationRange is running...`)
      bulletinUserRuleAdSchoolInfoWithOutSegment().then(res => {
        res.data.data.children.map(item => {
          item.chekedList = []
        })
        this.classList = res.data.data
      })
      common.getCodeIntType('userType').then(res => {
        this.userTypes = res.data.data
      })
      this.getList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.entityOrgRuleId
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
      const that = this
      api.getRangeList(that.params).then(res => {
        console.log(res)
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
      this.params.entityOrgId = this.entityOrgId.id
      this.params.userTypeCode = this.userTypeCode
      this.params.belongName = this.belongName
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
      this.isDel = true
      api.batchDelObjRange(this.multipleSelection).then(res => {
        this.isDel = false
        this.dialogDelete = false
        if (res.data.resultCode === '000000') {
          this.$message.success('删除成功')
          this.params.page = 1
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

    submitCheckedClassList () {
      let obj = {
        entityOrgId: this.entityOrgId.id,
        organizationUserRules: []
      }
      let subObj = {
        userTypeCode: 'D',
        belongIds: []
      }
      this.classList.children.forEach(item => {
        if (item.chekedList) {
          for (let i = 0; i < item.chekedList.length; i++) {
            subObj.belongIds.push(item.chekedList[i])
          }
        }
      })
      obj.organizationUserRules.push(subObj)

      console.log(obj)
      api.addClassList(obj).then(res => {
        this.activeTab = 'second'
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .entityOrganizationRange-wrap {

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

  .selected-num {
    color: #509A8F;
    font-weight: bold;
  }


  .el-form-item {
    margin-right: 0;
  }

  .width180 {
    width: 180px;
  }

  .fr {
    margin: 10px 0;
    padding-left: 20px;
  }


</style>
