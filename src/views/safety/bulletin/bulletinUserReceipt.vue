<template>
<el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
  <div class="app-container calendar-list-container p100">
    <el-header style="height: auto">
    <div class="filter-container">
      <el-form ref="form" :model="selectForm" :inline="true" size="small" >
        <el-form-item label="回执人">
          <el-input class="input-v2-rao" v-model="selectForm.receiptName" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input class="input-v2-rao" v-model="selectForm.userName" maxlength="32"></el-input>
        </el-form-item>
        <!--<el-form-item label="关键词">
          <el-input class="input-v2-rao" v-model="selectForm.bulletinTitle" maxlength="32"></el-input>
        </el-form-item>-->
        <el-form-item label="回执日期：">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="selectForm.receiptDt" type="date"
                            placeholder="回执日期" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            <!--<el-date-picker type="date" placeholder="开始日期" value-format="yyyy-MM-dd HH:mm" v-model="selectForm.effectiveDt" style="width: 100%;"
                            :picker-options="pickTime"></el-date-picker>-->
          <!--<el-col :span="2" class="text-center">至</el-col>
          <el-col :span="11" prop="expiryDt">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="selectForm.expiryDt" type="date"
                            placeholder="结束日期" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
          </el-col>-->
        </el-form-item>
        <el-form-item>
          <!--<el-button class="filter-item" type="primary"  icon="search" @click="handleFilter" @keyup.enter.native="handleFilter">搜索</el-button>-->
          <el-button class="button-v2-rao b93BF88" type="primary" @click="handleFilter">搜索</el-button>
        </el-form-item>
      </el-form>
      <!--<el-button class=" filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit" >添加</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleGroupDelete" type="danger" icon="delete">批量删除</el-button>-->
    </div>
    </el-header>

    <div class="bt border-color-e8e8e8 mt10 mb10"></div>
    <el-main class="pt-15">
    <el-table :key='tableKey' border
              :data="data.records" :table-loading="tableLloading"
              highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" class="table-v2-rao"
                header-row-class-name="table-header-v2-rao">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column align="center" label="回执人">
        <template slot-scope="scope">
          <span>{{ scope.row.receiptName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="回执人角色">
        <template slot-scope="scope">
          <span>{{ scope.row.studentParentTypeCodeStr&&scope.row.studentParentTypeCodeStr.split(";")[0]  }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="回执日期">
        <template slot-scope="scope">
          <span>{{ scope.row.receiptDt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学生姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学段">
        <template slot-scope="scope">
          <span>{{ scope.row.segmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年级">
        <template slot-scope="scope">
          <span>{{ scope.row.gradeName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级">
        <template slot-scope="scope">
          <span>{{ scope.row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="回执签名" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.imagePath }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="回执内容">
        <template slot-scope="scope">
          <span>{{ scope.row.receiptContent }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="周期" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.periodInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="查看" popper-class="popover-v2-rao" trigger="hover">
                <span slot="reference" @click="handleView(scope.row.bulletinReceiptId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
              </el-popover>
            <!--<el-button  size="small" type="info" @click="handleView(scope.row.bulletinReceiptId)">查看</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="paging text-right mt10">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-main>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
<!--        <el-form-item label="通知回执" prop="username">
          <el-input v-model="form.bulletinReceiptId" placeholder="通知回执"></el-input>
        </el-form-item>
        <el-form-item label="通知" prop="username">
          <el-input v-model="form.bulletinId" placeholder="通知"></el-input>
        </el-form-item>-->
<!--        <el-form-item label="通知标题" prop="username" v-if="false">
          <el-input v-model="form.bulletinTitle" placeholder="通知标题"></el-input>
        </el-form-item>-->
<!--        <el-form-item label="用户" prop="username">
          <el-input v-model="form.userId" placeholder="用户"></el-input>
        </el-form-item>-->
<!--        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="form.userName" placeholder="用户姓名"></el-input>
        </el-form-item>-->
        <el-form-item label="回执姓名" prop="receiptName">
          <el-input v-model="form.receiptName" placeholder="回执姓名"></el-input>
        </el-form-item>
        <el-form-item label="回执日期" prop="username" v-if="false">
          <el-input v-model="form.receiptDt" placeholder="回执日期"></el-input>
        </el-form-item>
<!--        <el-form-item label="回执签名" prop="username" v-if="false">
          <el-input v-model="form.imagePath" placeholder="回执签名"></el-input>
        </el-form-item>-->
        <el-form-item label="回执内容" prop="receiptContent">
          <el-input v-model="form.receiptContent" placeholder="回执内容"></el-input>
        </el-form-item>
<!--        <el-form-item label="机构" prop="username">
          <el-input v-model="form.appOrgId" placeholder="机构"></el-input>
        </el-form-item>
        <el-form-item label="应用" prop="username">
          <el-input v-model="form.appId" placeholder="应用"></el-input>
        </el-form-item>-->
<!--        <el-form-item label="周期" prop="username">
          <el-input v-model="form.periodInfo" placeholder="周期"></el-input>
        </el-form-item>-->
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
</el-container>
</template>

<script>
  import { fetchList, addObj, putObj, delObj, batchDelObj } from '@/api/safety/bulletin/bulletinUserReceipt'

  import{
    bulletinUserReceiptAdPage
  } from '@/api/safety/bulletin/bulletinInfo'
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'table_tbl_bulletin_user_receipt',
    directives: {
    },
    data() {
      return {
        data : [],
        list: [],
        total: null,
        listLoading: true,
        tableLloading: false,
        listQuery: {
          page: 1,
          limit: 8,
          bulletinId: ''
        },
        selectForm: {
          page: 1,
          limit: 10
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        rules: {
          receiptName: [
            { required: true, message: '请输入回执姓名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          receiptContent: [
            { required: true, message: '请输入回执内容', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ]
        },
        form: {
        },
        dialogFormVisible: false,
        dialogStatus: '',
        tbl_bulletin_user_receipt_add: false,
        tbl_bulletin_user_receipt_upd: false,
        tbl_bulletin_user_receipt_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'isLoading'
      ]),
      bulletinId(){
        return this.$route.query.bulletinId;
      },
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
      this.tbl_bulletin_user_receipt_add = this.permissions['tbl_bulletin_user_receipt_add']
      this.tbl_bulletin_user_receipt_upd = this.permissions['tbl_bulletin_user_receipt_upd']
      this.tbl_bulletin_user_receipt_del = this.permissions['tbl_bulletin_user_receipt_del']
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      handleView(bulletinReceiptId){
        this.$router.push({ path: '/safety/viewBulletinInfoDetail', query: { bulletinReceiptId:bulletinReceiptId,type:'huizhi' }})
      },
      getList() {
          this.listQuery.bulletinId = this.bulletinId
        this.listLoading = true
        bulletinUserReceiptAdPage(this.listQuery).then(response => {
          this.data = response.data.data
          this.total = response.data.total
          //this.bulletinId = this.listQuery.bulletinId
          this.listLoading = false
          this.SET_IS_LOADING(false)
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
        // console.log(val);
      },
      handleDelete(row) {
        delObj(row.bulletinReceiptId)
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
            arr.push(this.multipleSelection[i].bulletinReceiptId)
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
      handleEdit(row, index)
      {
        this.form = row;
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
