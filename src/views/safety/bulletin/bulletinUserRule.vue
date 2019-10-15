<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form" :model="selectForm" :inline="true" size="small" >
        <el-form-item label="通知标题">
          <el-input v-model="selectForm.bulletinTitle" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item>
          <!--<el-button class="filter-item" type="primary"  icon="search" @click="handleFilter" @keyup.enter.native="handleFilter">搜索</el-button>-->
          <el-button class="filter-item" type="primary"  icon="search" @click="handleFilter">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button class=" filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit" >添加</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleGroupDelete" type="danger" icon="delete">批量删除</el-button>
    </div>
    <el-table :key='tableKey' border
              :data="list"
              highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
<!--      <el-table-column align="center" label="通知对象范围">
        <template slot-scope="scope">
          <span>{{ scope.row.bulletinRuleId }}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="通知" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.bulletinId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="通知标题">
        <template slot-scope="scope">
          <span>{{ scope.row.bulletinTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户类型">
        <template slot-scope="scope">
          <!--<span>{{ scope.row.userTypeCode }}</span>-->
          <span v-for="item in userTypeCodeList" v-if="scope.row.userTypeCode==item.itemName">{{item.itemAttribute}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="用户归属ids">
        <template slot-scope="scope">
          <span>{{ scope.row.userBelongedIds }}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="用户归属">
        <template slot-scope="scope">
          <span>{{ scope.row.userBelongedNames }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户数">
        <template slot-scope="scope">
          <span>{{ scope.row.usersNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.sequnceNum }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="机构">
        <template slot-scope="scope">
          <span>{{ scope.row.appOrgId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="应用">
        <template slot-scope="scope">
          <span>{{ scope.row.appId }}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="周期">
        <template slot-scope="scope">
          <span>{{ scope.row.periodInfo }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="">
        <template slot-scope="scope">
          <span>{{ scope.row.isDeleted }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="">
        <template slot-scope="scope">
          <span>{{ scope.row.createdBy }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="">
        <template slot-scope="scope">
          <span>{{ scope.row.createdDt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedBy }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedDt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="">
        <template slot-scope="scope">
          <span>{{ scope.row.version }}</span>
        </template>
      </el-table-column>-->

<!--      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button  size="small" type="success" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button  size="mini" type="danger"
                     @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="通知对象范围" prop="username" v-show="false">
          <el-input v-model="form.bulletinRuleId" placeholder="通知对象范围"></el-input>
        </el-form-item>
        <el-form-item label="通知" prop="username" v-if="false">
          <el-input v-model="form.bulletinId" placeholder="通知"></el-input>
        </el-form-item>
        <el-form-item label="通知标题" prop="username">
          <el-input v-model="form.bulletinTitle" placeholder="通知标题"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="username">
          <el-input v-model="form.userTypeCode" placeholder="用户类型"></el-input>
        </el-form-item>
<!--        <el-form-item label="用户归属ids" prop="username">
          <el-input v-model="form.userBelongedIds" placeholder="用户归属ids"></el-input>
        </el-form-item>-->
        <el-form-item label="用户归属" prop="username">
          <el-input v-model="form.userBelongedNames" placeholder="用户归属"></el-input>
        </el-form-item>
        <el-form-item label="用户数" prop="username" v-if="false">
          <el-input v-model="form.usersNum" placeholder="用户数"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="username">
          <el-input v-model="form.sequnceNum" placeholder="序号"></el-input>
        </el-form-item>
<!--        <el-form-item label="机构" prop="username">
          <el-input v-model="form.appOrgId" placeholder="机构"></el-input>
        </el-form-item>
        <el-form-item label="应用" prop="username">
          <el-input v-model="form.appId" placeholder="应用"></el-input>
        </el-form-item>-->
        <el-form-item label="周期" prop="username">
          <el-input v-model="form.periodInfo" placeholder="周期"></el-input>
        </el-form-item>
<!--        <el-form-item label="" prop="username">
          <el-input v-model="form.isDeleted" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="form.createdBy" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="form.createdDt" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="form.updatedBy" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="form.updatedDt" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="form.version" placeholder=""></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, addObj, putObj, delObj, batchDelObj } from '@/api/safety/bulletin/bulletinUserRule'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_tbl_bulletin_user_rule',
    directives: {
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        tableLloading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        selectForm:{
          page: 1,
          limit: 10
        },
        rules: {
        },
        form: {
        },
        dialogFormVisible: false,
        dialogStatus: '',
        tbl_bulletin_user_rule_add: false,
        tbl_bulletin_user_rule_upd: false,
        tbl_bulletin_user_rule_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        userTypeCodeList: [
          { itemName: '1', itemAttribute: '校领导' },
          { itemName: '2', itemAttribute: '安全员' },
          { itemName: '3', itemAttribute: '教师' },
          { itemName: '4', itemAttribute: '班主任' },
          { itemName: '5', itemAttribute: '家长' }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList()
      this.tbl_bulletin_user_rule_add = this.permissions['tbl_bulletin_user_rule_add']
      this.tbl_bulletin_user_rule_upd = this.permissions['tbl_bulletin_user_rule_upd']
      this.tbl_bulletin_user_rule_del = this.permissions['tbl_bulletin_user_rule_del']
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(row) {
        delObj(row.bulletinRuleId)
          .then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
      },
      handleEdit(row, index)
      {
        this.form = row
        this.dialogFormVisible = true
      },
      //批量删除方法
      handleGroupDelete() {
        const arr = []
        if (this.multipleSelection.length <= 0) {
          alert('请至少选择一条数据！')
          return
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].bulletinRuleId)
          }
          batchDelObj(arr)
            .then(response => {
              this.dialogFormVisible = false
              this.getList()
            })
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleCreate() {
        this.form = {};
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleFilter(val) {
        this.selectForm.limit = this.listQuery.limit
        this.selectForm.page = 1
        this.listQuery = this.selectForm
        this.getList()
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
    }
  }
</script>
